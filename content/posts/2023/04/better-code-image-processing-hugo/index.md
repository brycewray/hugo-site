---
title: "Better code for image processing in Hugo"
description: "My earlier hack worked, but produced some nasty HTML. Fortunately, two other Hugo users had a better idea."
author: Bryce Wray
date: 2023-04-05T09:29:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
imgs:
- my-pet-cat_3264x2448.jpg
---

With a big enough hammer, you definitely can cram a square peg into a round hole. At least, you can **if** you don't care too much about the resulting damage to the peg and the hole --- maybe even the hammer --- but that doesn't make it a good idea.

Some pegs, holes, and hammers were harmed during my contortions within the [Hugo](https://gohugo.io) static site generator (SSG) to create CSS that (a.) *would* provide good backgrounds for my site's responsive images but (b.) would *not* violate the site's [Content Security Policy](https://content-security-policy.com) (CSP). I wasn't happy about the collateral damage, but thought I had no choice.

. . . that is, until two other Hugo users pointed me toward a better way.

<!--more-->

## Sinful choices

Last year, I wrote two articles about how to use Hugo's [built-in powers for image processing](https://gohugo.io/content-management/image-processing/):

- "[Responsive and optimized images with Hugo](/posts/2022/06/responsive-optimized-images-hugo/)."
- "[A new way to generate LQIPs in Hugo](/posts/2022/09/new-way-lqips-hugo-0-104-0/)."

**The code in each of those is now outdated**; at the end of this post, I'll provide replacements.

The short story about each post, at least where today's story is concerned, is that the respective [shortcode](https://gohugo.io/content-management/shortcodes/) it described would generate not only images but also the CSS that would style their background `div`s with either low-quality image placeholders (LQIPs) or, later, gradient-based LQIPs --- which, I have since accepted, should be known as *gradient image placeholders* (GIPs). To keep the CSS class unique to each image's background `div`, the shortcode built a hash off the image file name and appended the hash to the end of the class's name, *e.g.*:

```bash
imgB-b5bc32dfa3c277a7b3e602ebef8c83ca
```

This allowed me to apply image-specific `div` styling through a CSS *class*, rather than [CSP-unfriendly](https://content-security-policy.com/style-src/) *inline* styling such as:

```html
<div style="background: linear-gradient(#363636,#c5bac4);">
```

While the approaches I described in these two posts definitely worked, they sinned against HTML/CSS Orthodoxy: for each image generated, they defined the background `div`'s unique CSS class inside the **`body` element**, rather than the `head` element as the Web Gods intended.

I knew this was a bad idea, even though it worked in every browser and environment in which I tested it. As time passed, I considered a possible fix that would involve JavaScript and `appendChild`, but doubted my limited ability to make such code successfully interchange data with the two decidedly *non*-JavaScript image-processing shortcodes. Thus, I let things sit as they were, hoping one day I might get smart enough to fix them.

## Enlightenment arrives

Spoiler alert: I never did get that smart.

Fortunately, two other Hugo users --- [Daniel F. Dickinson](https://www.danielfdickinson.ca/) and someone I currently know only as [@mesetka on GitHub](https://github.com/mesetka) --- [pointed me in the right direction](https://github.com/danielfdickinson/image-handling-mod-hugo-dfd/pull/72). The result turned out to be a surprisingly simple fix, once I wrapped my head around the idea.

1. I created a new [partial](https://gohugo.io/templates/partials/) for use within the `head`.
2. In the partial, I borrowed enough from the two image-processing shortcodes to:
	- Generate the hashed names for each background `div`'s **two** CSS classes --- one for LQIPs, one for GIPs. That way, I'd be covered for whichever background type I preferred. I differentiated the two class names by appending `-LQIP` or `-GIP`, as appropriate, to the end of each class name's already appended hash.
	- Where an LQIP is desired, generate that image.
	- Create the two classes.
3. Since this rendered repetitious much of what had been in the shortcodes, I cut the *two* shortcodes down to just *one* which can specify either type of background by calling the appropriate CSS class.

To Dickinson and @mesetka: once again, many thanks! The solution seems obvious to me now, but it took your comments to get me there.

I have invited (?) readers of those two earlier posts here so they can see The Better Way, starting below.

## The code

<strong class="red">Important</strong>: Because it makes use of [page resources](https://gohugo.io/content-management/page-resources/), this method needs a Hugo site that's organized in **page bundles**. In my limited testing, it does work with a site which has only its images-"bearing" Markdown files in page bundles (probably because of my use of [`with`](https://gohugo.io/functions/with/) as a safety measure); but [you're still better off, long-term, with a fully "bundled" site](/posts/2022/07/bundling-up-rebuilding-my-hugo-site/).
{.box}

Here are the two distinct code blocks involved in this rescue mission.

First, the partial for the `head` (called from within my main `head.html` partial):

```go-html-template{filename="head-imgs-css.html" bigdiv=true}
{{- with .Resources.ByType "image" }}
	<style media="screen">
	{{- range . -}}
		{{- $src := . -}}
		{{- $imgBd5 := md5 .Name -}}
		{{- $BkgdStyleEnd := print "; background-size: cover; background-repeat: no-repeat; aspect-ratio: " $src.Width " / " $src.Height ";" -}}
		{{- $GIP_img := $src.Process "resize 20x jpg q20" -}}
		{{- /* ^^ documentation says we get better performance by shrinking first */ -}}
		{{- $GIP_colors := $GIP_img.Colors -}}
		{{- if (lt ($GIP_colors | len) 2) -}}
			{{- $GIP_colors = $GIP_colors | append "#000000" -}}
		{{- end -}}
		{{- $GIP_bkgd := delimit ($GIP_colors) ", " -}}
		{{- $BkgdStyleGIP := print "background: linear-gradient(" $GIP_bkgd ")" $BkgdStyleEnd -}}
		{{- $LQIP_img := $src.Resize "20x jpg q20" -}}
		{{- $LQIP_b64 := $LQIP_img.Content | base64Encode -}}
		{{- $BkgdStyleLQIP := print "background: url(data:image/jpeg;base64," $LQIP_b64 ")" $BkgdStyleEnd }}
		.imgB-{{ $imgBd5 }}-GIP {
			{{ $BkgdStyleGIP | safeCSS }}
		}
		.imgB-{{ $imgBd5 }}-LQIP {
			{{ $BkgdStyleLQIP | safeCSS }}
		}
	{{- end }}
	</style>
{{ end }}
```

Then, the revised image-processing shortcode[^defaults] that now handles both GIPs (the default here) and LQIPs, through the use of a `$holder` variable which specifies the `div`'s background type:

[^defaults]: Thanks to [Sujal Gurung](https://github.com/dinesh-58) for the excellent suggestion that I use Hugo's [`default` function](https://gohugo.io/functions/default/) for cleaner code than what I originally had here! Somehow, I'd missed reading about that one all this time.

```go-html-template{filename="imgh.html" bigdiv=true}
{{- $respSizes := slice "320" "640" "960" "1280" "1600" "1920" -}}
{{- $src := .Page.Resources.GetMatch (.Get "src") -}}
{{- $alt := .Get "alt" -}}
{{- $holder := default "GIP" (.Get "holder") -}}
{{- $hint := default "photo" (.Get "hint") -}}
{{- /* ^^ applicable only to webp: https://gohugo.io/content-management/image-processing/#hint */ -}}
{{- $filter := default false (.Get "filter") -}}
{{- $imgBd5 := md5 $src -}}
{{- $divClass := print "relative bg-center imgB-" $imgBd5 "-" $holder -}}
{{- $imgClass := "w-full h-auto animate-fade" -}}
{{- $dataSzes := "(min-width: 1024px) 100vw, 50vw" -}}
{{- $actualImg := $src.Resize (printf "%s%s" "640x jpg " $filter) -}}

<div class="{{ $divClass }}">
	<picture>
		<source type="image/webp" srcset="
		{{- with $respSizes -}}
			{{- range $i, $e := . -}}
				{{- if ge $src.Width . -}}
					{{- if $i }}, {{ end -}}{{- ($src.Resize (print . "x webp " $hint " " $filter) ).RelPermalink }} {{ . }}w
				{{- end -}}
			{{- end -}}
		{{- end -}}" sizes="{{ $dataSzes }}" />
		<source type="image/jpeg" srcset="
		{{- with $respSizes -}}
			{{- range $i, $e := . -}}
				{{- if ge $src.Width . -}}
					{{- if $i }}, {{ end -}}{{- ($src.Resize (print . "x jpg " $filter) ).RelPermalink }} {{ . }}w
				{{- end -}}
			{{- end -}}
		{{- end -}}" sizes="{{ $dataSzes }}" />
		<img class="{{ $imgClass }}" src="{{ $actualImg.RelPermalink }}" width="{{ $src.Width }}" height="{{ $src.Height }}" alt="{{ $alt }}" title="{{ $alt }}" loading="lazy" />
	</picture>
</div>
```

**Note**: For more information on available [`hint`s](https://gohugo.io/content-management/image-processing/#hint) and [`filter`s](https://gohugo.io/functions/images/), refer to the appropriate Hugo documentation.
{.box}

If you want the styling mentioned in the shortcode, here's CSS you can drop into your own CSS or Sass files:

```css
.relative {
	position: relative;
}
.bg-center {
	background-position: center;
}
.w-full {
	width: 100%;
}
.h-auto {
	height: auto;
}
@keyframes fadeIn {
 0% {
	 opacity: 0;
 }
 to {
	 opacity: 1;
 }
}
.animate-fade {
	animation: fadeIn 750ms ease-in-out;
}
```

As was the case with each of this shortcode's respective predecessors, you invoke it with its name (minus the `.html` extension) followed by at least these parameters, separated by a space:

- `src` --- The name of an image file within the Markdown file's page bundle folder.
- `alt` --- Suitable `alt` text.
- *(Optional)* `holder` --- If you don't want to use the default image placeholder, specify the other choice here. In my case, GIP is the default. If you prefer LQIPs, make that your default.

For example, here's how I'd use `imgh.html` to have an LQIP for a file called `my-pet-cat_3264x2448.jpg`[^commentsGo]:

[^commentsGo]: {{% mdcode-fn %}}

```md{bigdiv=true}
{{</* imgh src="my-pet-cat_3264x2448.jpg" alt="Photo of a cat named Shakespeare sitting on a window sill" holder="LQIP" */>}}
```

In this case, it produces:

{{< img src="my-pet-cat_3264x2448.jpg" alt="Photo of a cat named Shakespeare sitting on a window sill" holder="LQIP" filter="box" >}}<!-- keep as `local` since post is about that -->

. . . but, **this** time, the CSS for its background is generated right where it should be: up in the HTML `head`, **not** down in the `body`.

And that's *without* my having abused any square pegs, round holes, or even hammers.
