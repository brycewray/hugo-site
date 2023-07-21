---
title: "Using Hugo Pipes with Cloudinary"
description: "Or, how I now can have my image-handling cake and eat it, too."
author: Bryce Wray
date: 2023-07-16T17:19:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
imgs:
- my-pet-cat_3264x2448.jpg
---

**Update, 2023-07-18**: As I will explain in a [subsequent post](/posts/2023/07/big-unbundle/), I've reverted to using [*global* resources rather than page resources](https://gohugo.io/hugo-pipes/introduction/) --- *i.e.*, all local images are now stored in the site project's `assets/images/` directory --- so a look at the [site repository](https://github.com/brycewray/hugo-site) won't show a setup that conforms to the approach I describe in this post.\
\
Also, while that approach **does** work, it apparently increases the build time for a Hugo project, especially given the sometimes underpowered servers used by some hosting vendors' free tiers. Therefore, if you adopt it for your own project, you may want to limit your fetching of remote images, thus keeping build times from becoming excessive.\
\
Finally, I have corrected the content of the final code block so that it corresponds to the local-first premise explained within; unfortunately, it didn't in the initial versions of this post.
{.box}

My [most](/posts/2023/04/better-code-image-processing-hugo/) [recent](/posts/2023/05/better-code-image-processing-hugo-render-hook-edition/) posts about using the [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/) asset pipeline for [image processing](https://gohugo.io/content-management/image-processing/) rested on one assumption: you're willing to keep all your images locally in your Hugo project repository so they could serve as [page resources](https://gohugo.io/content-management/page-resources/). But what if you prefer to use third-party image processing, either instead of or as a supplement to Hugo's? Does that eliminate the coolness of Hugo Pipes?

Oh, my, no. Quite the contrary.

<!--more-->

Allow me a couple of introductory notes about this post:
- The image-processing third party I'll be discussing is [Cloudinary](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/dqunpyaeqiizezj6lbdu).[^affil] I've used its free tier for nearly three years.
- I'll save time (yours and mine) by assuming you've already read those earlier posts to which I linked above.

[^affil]: Affiliate link.

In correctly handling responsive images, it's important to know and specify the aspect ratio of each image and/or its surrounding `div`, which requires detecting the image's [width and height](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio). That's why both my shortcode and render hook for processing local images depended on [Hugo's ability to detect a "resourced" image's width and height](https://gohugo.io/content-management/image-processing/#image-rendering).

So, when using a shortcode for Cloudinary's image processing rather than Hugo's, I've previously had to provide the width and height manually; *e.g.*:

```go-html-template
{{</* imgc src="my-test-image_1920x1080.jpg" width=1920 height=1080 alt="A test" */>}}
```

It was troublesome, but tolerable. Yet, it would be a show-stopper for using a render hook --- which is how I've been handling most of my images since writing the [related post](/posts/2023/05/better-code-image-processing-hugo-render-hook-edition/) a few weeks ago --- because Hugo allows sending [only a small number of parameters to the hook](https://gohugo.io/templates/render-hooks/#render-hooks-for-headings-links-and-images), and I'd already run through that quantity.

So, if I were to re-re-reconsider using Cloudinary for some of the site's image processing, I'd have to do one of two things: (a.) forego that all-too-convenient render hook method (*i.e.*, revert to using a shortcode) for each remote image; or (b.) figure out a way to make Hugo detect the width and height of even remote images, not just local ones.

Implementing either option would require some degree of tedium, although a lot of it would be eased by good ol' search-and-replace. But only Option (b.) also included a nerdy puzzle to solve --- and, hey, I couldn't resist *that*, now, could I? So I didn't.

Unlike what I usually encounter with many other puzzles, nerdy and otherwise, my first guess on this one proved to be accurate (although implementing it took some days of battling footguns in my code): *if Hugo Pipes could "see" the remote image as just another resource, it should be able to detect the image's width and height just as it would if the image were purely local*. After all, Hugo's been able to [grab remote resources since the release of Hugo 0.90.0](/posts/2021/12/fetching-remote-stuff-hugo-0-90-plus/) in December, 2021.

I'd then have to implement this in three separate places:

- The render hook.
- The shortcode, still necessary for certain images[^phn] that require more parameters than I can feed the render hook.
- The partial template which auto-generates the CSS for each image's low-quality image placeholder (LQIP) and gradient image placeholder (GIP).

[^phn]: Most typically, this is for screen captures from phones, which I don't want to style the same as I do other images.

That last one would be a particularly tricky fix, because it now would have to work with both local and remote images. But working on it gave me another idea that would let me take this even further: if I *could* make that template work with both types of images, what if I could do the same with the render hook and the shortcode, as well?

After all, you can have only one `render-image.html` template at a time, so any approach short of that would force me to swap out render hooks based on the images' sources, a prospect that my testing proved to be as untenable as it sounds. Besides, I knew there would be a few cases where I'd want to keep using local images, too --- *e.g.*, the original posts that were *about* processing local images! And, while I'd maintained two separate shortcodes for the two types of image sources, a single, smarter shortcode would make that unnecessary.

In the end, here's how I made it work:

1. Every Markdown file which calls at least one image now contains additional front matter that lists each called image's file name.\
For example, here's what I used for a [2021 post](/posts/2021/10/new-outlook-ends-old-aggravation-mac-users/) that included four images:
{{< highlight yaml "linenos=false" >}}
imgs:
- 2021-10-11_screenshot_Outlook-on-Windows_segment_1610x512.png
- 2021-10-10_screenshot_old-Outlook-on-Mac_01_segment_1292x432.png
- 2021-10-10_screenshot_old-Outlook-on-Mac_02_segment_1505x512.png
- 2021-10-10_screenshot_new-Outlook-on-Mac_segment_1696x752.png
{{< /highlight >}}
1. Whenever a Markdown file calls an image (through either the render hook or the shortcode), Hugo determines whether the image is a page resource.
	- If it is, the image goes through Hugo's native image processing. (Thus, a local image is the default, taking precedence over a remote version.)
	- If the image is not a page resource, Hugo polls Cloudinary for the image and, if it finds it, fetches it from there *but* also still converts it to a resource from which it then creates both an LQIP and a GIP as well as those placeholders' associated styling.
	- If the image is in *neither* location (*i.e.*, I've screwed up and failed to make the image file either a page resource or an upload to Cloudinary), Hugo provides a little message noting the image's unavailability.\
Ideally, I'll test ahead of time and see that message before you ever would; but it also could happen if Cloudinary had a hiccup during the site-building process. The main thing is that this measure keeps an AWOL image from crashing Hugo during either development or a production-side build.

In addition to making the render hook work with either local or remote images, this has, indeed, allowed me to cut down to just one image-processing shortcode, `img.html`, rather than having to use `imgh.html` for local images and `imgc.html` for Cloudinary-hosted[^otherVendors] images.

[^otherVendors]: I would imagine that the Cloudinary-related parts of these template files could be tweaked to allow for other image-hosting vendors, such as imgix and Cloudflare. However, since I lack experience using other vendors for this purpose, I can't offer any suggestions regarding such adjustments.

For example, here's `img.html` in use with my usual go-to image for this kind of post[^commentsGo]:

[^commentsGo]: {{% mdcode-fn %}}

```md
{{</* img src="my-pet-cat_3264x2448.jpg" alt="Photo of a cat named Shakespeare sitting on a window sill" */>}}
```

. . . which gives you:

{{< img src="my-pet-cat_3264x2448.jpg" alt="Photo of a cat named Shakespeare sitting on a window sill" >}}

Now, without further ado, here's the relevant code.[^styling] Of course, you must insert your own Cloudinary "cloud name" in the `$myCloud` variable to make this work for your Hugo project.

[^styling]: If you need to figure out the CSS classes involved (other than the auto-generated one that's specific to each image), feel free to check the [site repo](https://github.com/brycewray/hugo-site).

{{< labeled-highlight lang="go-html-template" filename="render-image.html" >}}
{{/*
  For some additional background on this file, see:
  https://www.brycewray.com/posts/2023/05/better-code-image-processing-hugo-render-hook-edition/
*/}}
{{- $respSizes := slice "320" "640" "960" "1280" "1600" "1920" -}}
{{- $alt := .Text -}}
{{- $caption := .Title -}}
{{- $myCloud := "brycewray-com" -}}
{{/* ^^^ Fill in your own Cloudinary cloud name! */}}
{{- $cloudiBase := print "https://res.cloudinary.com/" $myCloud "/image/upload/" -}}
{{- $xFmPart1 := "f_auto,q_auto,w_" -}}
{{- $xFmPart2 := ",x_0,z_1/" -}}
{{- $src := .Destination -}}
{{- $imgBd5 := md5 $src -}}
{{- $dataSzes := "(min-width: 1024px) 100vw, 50vw" -}}
{{- $holder := "GIP" -}}
{{- $imgClass := "w-full h-auto shadow animate-fade" -}}

{{- if .Page.Resources.GetMatch $src -}}
	{{ with .Page.Resources.GetMatch $src }}
		{{- $hint := "photo" -}}
		{{- $filter := "box" -}}
		{{- $divClass := print "relative bg-center bigImgDiv imgB-" $imgBd5 "-" $holder -}}
		{{- $imgRsc := . -}}
		{{- $actualImg := $imgRsc.Resize (print "640x jpg " $filter) -}}
		<div class="{{ $divClass }}" data-pagefind-ignore>
			<picture data-pagefind-ignore>
				<source type="image/webp" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $imgRsc.Width . -}}
							{{- if $i }}, {{ end -}}{{- ($imgRsc.Resize (print . "x webp " $hint " " $filter) ).RelPermalink }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" sizes="{{ $dataSzes }}" />
				<source type="image/jpeg" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $imgRsc.Width . -}}
							{{- if $i }}, {{ end -}}{{- ($imgRsc.Resize (print . "x jpg " $filter) ).RelPermalink }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" sizes="{{ $dataSzes }}" />
				<img class="{{ $imgClass }}" src="{{ $actualImg.RelPermalink }}" width="{{ $imgRsc.Width }}" height="{{ $imgRsc.Height }}" alt="{{ $alt }}" title="{{ $alt }}" loading="lazy" data-pagefind-ignore />
			</picture>
		</div>
	{{- end -}}
{{- else if (resources.GetRemote (print $cloudiBase $src)) -}}
	{{- $divClass := print "relative bg-center bigImgDiv imgB-" $imgBd5 "-" $holder -}}
	<div class="{{ $divClass }}" data-pagefind-ignore>
	{{- with .Page.Params.imgs }}
		{{- $imgToGet := print $cloudiBase $src -}}
		{{- with $imgToGet -}}
			{{- with resources.GetRemote . -}}
				{{- $width := .Width -}}
				{{- $height := .Height -}}
				<img class="{{ $imgClass }}" src="{{ $cloudiBase }}{{ $xFmPart1 }}600{{ $xFmPart2 }}{{ $src }}" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $width . -}}
							{{- if $i }}, {{ end -}}{{- $cloudiBase -}}{{ $xFmPart1 }}{{ . }}{{- $xFmPart2 -}}{{- $src }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" alt="{{ $alt }}" title="{{ $alt }}" width="{{ $width }}" height="{{ $height }}" loading="lazy" sizes="{{ $dataSzes }}" data-pagefind-ignore />
			{{- end -}}
		{{- end -}}
	{{- end -}}
	</div>
{{- else -}}
	<p class="ctr legal"><em>Image unavailable, local or remote.</em></p>
{{- end -}}
{{- with $caption -}}<p class="imghCaption">{{ $caption | $.Page.RenderString }}</p>{{- end }}
{{</ labeled-highlight >}}

{{< labeled-highlight lang="go-html-template" filename="img.html" >}}
{{- $respSizes := slice "320" "640" "960" "1280" "1600" "1920" -}}
{{- $src := .Get "src" -}}
{{- $alt := .Get "alt" -}}
{{- $myCloud := "brycewray-com" -}}
{{/* ^^^ Fill in your own Cloudinary cloud name! */}}
{{- $cloudiBase := print "https://res.cloudinary.com/" $myCloud "/image/upload/" -}}
{{- $xFmPart1 := "f_auto,q_auto,w_" -}}
{{- $xFmPart2 := ",x_0,z_1/" -}}
{{- $holder := "GIP" -}}{{/* default placeholder */}}
{{- if .Get "holder" -}}{{- $holder = .Get "holder" -}}{{- end -}}
{{- $phn := false -}}
{{- if .Get "phn" -}}{{- $phn = .Get "phn" -}}{{- end -}}
{{- $hint := "photo" -}}
{{- if .Get "hint" -}}{{- $hint = .Get "hint" -}}{{- end -}}
{{- /*
	hint is applicable only to webp:
	https://gohugo.io/content-management/image-processing/#hint
*/ -}}
{{- $filter := "box" -}}{{/* default filter */}}
{{- if .Get "filter" -}}{{- $filter = .Get "filter" -}}{{- end -}}
{{- $simple := false -}}
{{- if .Get "simple" -}}{{- $simple = .Get "simple" -}}{{- end -}}

{{- $imgBd5 := md5 $src -}}
{{- $divClass := "relative bg-center" -}}
{{- if not $phn -}}
	{{- $divClass = print $divClass " bigImgDiv imgB-" $imgBd5 "-" $holder -}}
	{{/*
		The `imgB-`[hash]-GIP` class is
		generated in a `head` partial;
		here, we need only get the class's name,
		using the same method as in that partial
		(md5-ing the image file name).
	*/}}
{{- end -}}
{{- $imgClass := "w-full animate-fade shadow" -}}
{{- if $phn -}}
	{{- $imgClass = "img-phn ctrImg animate-fade shadow" -}}
{{- end -}}
{{- $dataSzes := "(min-width: 1024px) 100vw, 50vw" -}}

{{- if .Page.Resources.GetMatch $src -}}
	{{ with .Page.Resources.GetMatch $src }}
		{{- $imgRsc := . -}}
		{{- $actualImg := $imgRsc.Resize (print "640x jpg " $filter) -}}
		{{- if eq $simple false -}}
		<div class="{{ $divClass }}" data-pagefind-ignore>
		{{- end }}
			<picture data-pagefind-ignore>
				<source type="image/webp" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $imgRsc.Width . -}}
							{{- if $i }}, {{ end -}}{{- ($imgRsc.Resize (print . "x webp " $hint " " $filter) ).RelPermalink }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" sizes="{{ $dataSzes }}" />
				<source type="image/jpeg" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $imgRsc.Width . -}}
							{{- if $i }}, {{ end -}}{{- ($imgRsc.Resize (print . "x jpg " $filter) ).RelPermalink }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" sizes="{{ $dataSzes }}" />
				<img class="h-auto{{ if eq $simple false }} {{ $imgClass }}{{ end }}" src="{{ $actualImg.RelPermalink }}" width="{{ $imgRsc.Width }}" height="{{ $imgRsc.Height }}" alt="{{ $alt }}" title="{{ $alt }}" loading="lazy" data-pagefind-ignore />
			</picture>
		{{- if eq $simple false -}}
		</div>
		{{- end -}}
	{{- end -}}
{{- else if (resources.GetRemote (print $cloudiBase $src)) -}}
	{{- if eq $simple false -}}
	<div class="{{ $divClass }}" data-pagefind-ignore>
	{{- end }}
	{{- with .Page.Params.imgs }}
		{{- $imgToGet := print $cloudiBase $src -}}
		{{- with $imgToGet -}}
			{{- with resources.GetRemote . -}}
				{{- $width := .Width -}}
				{{- $height := .Height -}}
				<img class="h-auto{{ if eq $simple false }} {{ $imgClass }}{{ end }}" src="{{ $cloudiBase }}{{ $xFmPart1 }}600{{ $xFmPart2 }}{{ $src }}" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $width . -}}
							{{- if $i }}, {{ end -}}{{- $cloudiBase -}}{{ $xFmPart1 }}{{ . }}{{- $xFmPart2 -}}{{- $src }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" alt="{{ $alt }}" title="{{ $alt }}" width="{{ $width }}" height="{{ $height }}" loading="lazy" sizes="{{ $dataSzes }}" data-pagefind-ignore />
			{{- end -}}
		{{- end -}}
	{{- end -}}
	{{- if eq $simple false -}}
	</div>
	{{- end }}
{{- else -}}
	<p class="ctr legal"><em>Image unavailable, local or remote.</em></p>
{{- end }}
{{</ labeled-highlight >}}

{{< labeled-highlight lang="go-html-template" filename="head-imgs-css.html" >}}
{{- $myCloud := "brycewray-com" -}}
{{/* ^^^ Fill in your own Cloudinary cloud name! */}}
{{- $cloudiBase := print "https://res.cloudinary.com/" $myCloud "/image/upload/" -}}
{{- $imgToGet := "" -}}
{{- $imgRsc := "" -}}
{{- $width := "" -}}
{{- $height := "" -}}

{{- with .Params.imgs }}
	<style media="screen">
	{{- range . -}}
		{{- $src := . -}}
		{{- $imgBd5 := md5 . -}}
		{{- if $.Page.Resources.GetMatch $src -}}
			{{- $imgRsc := $.Page.Resources.GetMatch $src -}}
			{{- $BkgdStyleEnd := print "; background-size: cover; background-repeat: no-repeat; aspect-ratio: " $imgRsc.Width " / " $imgRsc.Height ";" -}}
			{{- $GIP_colors := $imgRsc.Colors -}}
			{{- if (lt ($GIP_colors | len) 2) -}}
				{{- $GIP_colors = $GIP_colors | append "#000000" -}}
			{{- end -}}
			{{- $GIP_bkgd := delimit ($GIP_colors) ", " -}}
			{{- $BkgdStyleGIP := print "background: linear-gradient(" $GIP_bkgd ")" $BkgdStyleEnd }}
			.imgB-{{ $imgBd5 }}-GIP {
				{{ $BkgdStyleGIP | safeCSS }}
			}
			{{- $LQIP_img := $imgRsc.Resize "20x jpg q20" -}}
			{{- $LQIP_b64 := $LQIP_img.Content | base64Encode -}}
			{{- $BkgdStyleLQIP := print "background: url(data:image/jpeg;base64," $LQIP_b64 ")" $BkgdStyleEnd }}
			.imgB-{{ $imgBd5 }}-LQIP {
				{{ $BkgdStyleLQIP | safeCSS }}
			}
		{{- else if (resources.GetRemote (print $cloudiBase $src)) -}}
			{{- $imgToGet = print $cloudiBase $src -}}
			{{- with $imgToGet -}}
				{{- with resources.GetRemote . -}}
					{{- $imgRsc = . -}}
					{{- $imgRscDir := print "images/remote/" $src  -}}
					{{- $imgRsc = $imgRsc.Content | resources.FromString $imgRscDir -}}
					{{- /* ^^^ https://discourse.gohugo.io/t/using-getremote-on-image-puts-the-resource-in-root/36397 */ -}}
					{{- $width = .Width -}}
					{{- $height = .Height -}}
					{{- $GIP_colors := .Colors -}}
					{{- $imgBd5 := md5 $src -}}
					{{- $BkgdStyleEnd := print "; background-size: cover; background-repeat: no-repeat; aspect-ratio: " $width " / " $height ";" -}}
					{{- if (lt ($GIP_colors | len) 2) -}}
						{{- $GIP_colors = $GIP_colors | append "#000000" -}}
					{{- end -}}
					{{- $GIP_bkgd := delimit ($GIP_colors) ", " -}}
					{{- $BkgdStyleGIP := print "background: linear-gradient(" $GIP_bkgd ")" $BkgdStyleEnd -}}
					{{- $LQIP_img := $imgRsc.Resize "20x jpg q20" -}}
					{{- $LQIP_b64 := $LQIP_img.Content | base64Encode -}}
					{{- $BkgdStyleLQIP := print "background: url(data:image/jpeg;base64," $LQIP_b64 ")" $BkgdStyleEnd }}
					.imgB-{{ $imgBd5 }}-LQIP {
						{{ $BkgdStyleLQIP | safeCSS }}
					}
					.imgB-{{ $imgBd5 }}-GIP {
						{{ $BkgdStyleGIP | safeCSS }}
					}
				{{- end }}
			{{- end }}
		{{- end }}
	{{- end }}
	</style>
{{- end }}
{{</ labeled-highlight >}}
