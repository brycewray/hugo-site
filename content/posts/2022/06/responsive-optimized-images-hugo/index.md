---
title: "Responsive and optimized images with Hugo"
description: "How to take advantage of the amazingly capable image processing built into this SSG."
author: Bryce Wray
date: 2022-06-29T08:17:00-05:00
## majorupdate: 2024-05-04T09:43:00-05:00
#initTextEditor: iA Writer
---

**Update from the future**: I have considerably updated this 2022 post because I later made significant changes to the methods described in the **original** version of this post. In essence, I have taken [three](/posts/2022/09/new-way-lqips-hugo-0-104-0/) [other](/posts/2023/04/better-code-image-processing-hugo/) [posts](/posts/2023/05/better-code-image-processing-hugo-render-hook-edition/) from later, imported their best information while (I hope) improving it, and put it here so it'll all be in one package --- which, so past analytics have told me, consistently gets a major percentage of the site's visits. I've also noted in those three posts that the good stuff is now here.
{.box}

If you use any images on your website, you probably know how important it is to make them fully *responsive* and as *optimized* as possible so they provide an optimal user experience, regardless of screen size or connectivity. Fortunately, the [Hugo](https://gohugo.io) [static site generator](https://github.com/myles/awesome-static-generators) (SSG) comes with many impressive [image processing capabilities](https://gohugo.io/content-management/image-processing/) which can help you automate this to an amazing degree. Hugo can resize images of all sizes, convert them to multiple different formats, and perform many more image processing feats --- all much more quickly than can any other SSG.

Years ago, the availability of Hugo image processing was more restrictive concerning the images' location within a Hugo project. Specifically, they had to be [*page resources*](https://gohugo.io/content-management/image-processing/#page-resources), and thus in the same folder as the Markdown content calling them. While that's still perfectly fine, they now also can be [*global resources*](https://gohugo.io/content-management/image-processing/#global-resources), existing in either the project's `assets/` folder or any subfolder thereof.[^versionGlobal]

[^versionGlobal]: Despite searching through Hugo [release notes](https://github.com/gohugoio/hugo/releases) and various Hugo documentation updates, I was unable to determine exactly which version first supported this. All I could do was see that the related documentation itself changed sometime in the second half of 2020 to mention the acceptability of global resources for Hugo's image processing.

**Note**: I originally was old-school and preferred to keep textual content files separate from image files, and thus liked this flexibility quite a bit. Then, [a few weeks later](/posts/2022/07/bundling-up-rebuilding-my-hugo-site/), I changed to the page-resources approach after receiving some particularly savvy advice.
{.box}

For truly responsive images, you must define the *breakpoints*. These are viewport sizes, usually defined in pixels, for the browser to use in deciding *which* image to serve. Some articles you'll find out there --- as in the [references](#references) I'll list at the end --- take a more hard-coded approach to the breakpoints than I feel is necessary or appropriate. This probably is because of the sample code from older articles of this type, in which it's common to assign a variable to each of several breakpoints (*e.g.*, `$tiny` for a 500-pixel breakpoint, `$medium` for an 800-pixel one, *etc.*). Yes, you can do that and it'll work, but I suggest another method which I'll describe in a bit.

Still other articles make admittedly effective use of Hugo's [Markdown render hooks](https://gohugo.io/templates/render-hooks/) to change any standard `![Alt text](image.jpg)`-style Markdown to responsive/optimized images. In some cases, I prefer to take a *[shortcode](https://gohugo.io/content-management/shortcodes/)* approach, for the added control it offers through optional parameters you can specify. That said, there definitely also is merit in using the render hook approach in situations where you *don't* need access to quite so many of those optional parameters, so I will show you code for both approaches.

So now, let's move on with this post and the code it suggests for using Hugo to produce responsive, optimized images.

## What was I thinking?

Here's what I built the code to do, based on how I'd used a [Cloudinary](https://cloudinary.com)-using shortcode (more later on this site and Cloudinary):

- Let you use *either* the render hook approach *or* the shortcode approach, as is best for each image type and its placement. Later, I'll get into the factors on which you might make that choice.
- Rather than hard-coding breakpoint sizes into variables and then generating resized images based on those, just loop through a "slice" (array) and pull the breakpoints from them. This makes it easier to adjust the breakpoints when desired. It also produces more elegant code, IMHO.
- Provide the commonly seen "blur-up" effect while the full image loads. We do this by generating two types of *image placeholders*, each of which will have its place in what we'll do later:
  - One type is a tiny *low-quality image placeholder* (LQIP), which we encode as [Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) and magnify sufficiently to serve as the image div's background.
  - The other type is a *gradient image placeholder* (GIP), which --- as the name implies --- is a placeholder that is simply a gradient of a few colors from the original image.[^GIPcolors]
- Use the `picture` element to offer choices of WebP and JPG image file formats, giving browsers a choice between two storage-efficient versions of each generated image.[^CloudAuto]
- For other optimization, depend on Hugo's default settings, although it does have [quite a few other options](https://gohugo.io/content-management/image-processing/#imaging-configuration).

[^CloudAuto]: Cloudinary provided different formats automatically, based on the browser, through the `img` element. While that's pretty slick, the lack thereof isn't a deal-breaker for me.

[^GIPcolors]: The GIP is made possible by Hugo's [`.Colors` method](https://gohugo.io/content-management/image-processing/#colors), which was introduced with [Hugo v.104.0](https://github.com/gohugoio/hugo/releases/tag/v0.104.0) a few months after the original issuance of this post.

## The code and the comments

What follows will be three distinct code blocks for accomplishing all of the above:

- The first, `head-imgs-css.html` is a partial template for the `head`. Within my site, I call it from within the main `head.html` template. It looks up images within the page bundle and, for each, creates both an LQIP and a GIP.[^originalProb]
- The second is the code for the render hook. It **must** be called `render-image.html` and placed in the appropriate location as explained in the [documentation](https://gohugo.io/templates/render-hooks/). To make it work throughout the site, put it in `layouts/_default/_markup/`.\
\
An image render hook can support only three parameters: the image's file name (`$src`), the image's alt text (`$alt`), and an (optional) *title* parameter which, in my case, I mix with certain CSS to provide a caption for the image where appropriate. You can adapt the code to use the title parameter as you prefer, but I thought making it a caption was pretty handy.\
\
(By the way, because the render hook has no additional parameters, I set it to use the GIP; if you prefer using an LQIP, you can set that instead in the render hook's `$holder` variable.)
- The third is a shortcode, `img.html`, which (obviously) makes use of the shortcode approach to perform image processing. You would use this in situations where you have to specify more parameters than the render hook can offer. Remember what I said above about Hugo's long list of options for image processing.\
\
As a practical example, I use the shortcode method whenever I want to control whether an image has a shadow, or how large it will appear on a desktop-sized breakpoint (*e.g.*, I don't enlarge phone screenshots, as I do many other images), or various other aspects which simply aren't possible through the three parameters of the render hook method. You can add more of these controls as you wish; what you see in the shortcode are the ones which suit me.

[^originalProb]: This arrangement avoids the problem I created in the original version of this post, wherein this was done in the `body` rather than the `head`. It worked, but wasn't proper HTML. I am grateful to two other Hugo users --- [Daniel F. Dickinson](https://www.danielfdickinson.ca/) and someone I know only as [@mesetka on GitHub](https://github.com/mesetka) --- who [pointed me in the right direction](https://github.com/danielfdickinson/image-handling-mod-hugo-dfd/pull/72).

First, the partial for the `head` (as noted above, I call it from within my main `head.html` partial):

```go-html-template{filename="head-imgs-css.html" bigdiv=true}
{{- with .Resources.ByType "image" }}
	<style media="screen">
	{{- range . -}}
		{{- $src := . -}}
		{{- $imgBd5 := md5 .Name -}}
		{{- $BkgdStyleEnd := print " center / cover no-repeat; aspect-ratio: " $src.Width " / " $src.Height ";" -}}
		{{- $GIP_img := $src.Process "resize 20x jpg q20" -}}
		{{- /* ^^ documentation says we get better performance by shrinking first */ -}}
		{{- $GIP_colors := $GIP_img.Colors -}}
		{{- if (lt ($GIP_colors | len) 2) -}}
			{{- $GIP_colors = $GIP_colors | append "#000000" -}}
		{{- end -}}
		{{- $GIP_bkgd := delimit ($GIP_colors) ", " -}}
		{{- $BkgdStyleGIP := print "background: linear-gradient(" $GIP_bkgd ")" $BkgdStyleEnd -}}
		{{- $LQIP_img := $src.Process "resize 20x jpg q20" -}}
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

Then, the `render-image` template:

```go-html-template{filename="render-image.html" bigdiv=true}
{{- /*
	This gives **normal** Markdown images --- i.e., using the `![Alt](imageURL)` syntax (which VS Code auto-completes) --- nearly all functionality of the `img` shortcode, except that this: (a.) hard-codes the `holder`, `hint`, and `filter` parameters; and, (b.) assumes no use of either `phn` or `simple`. None of these additional items can be supplied via a render hook but, instead, would require use of the full `img` shortcode.

	See also:
	- https://gohugo.io/templates/render-hooks/
	- https://discourse.gohugo.io/t/get-a-remote-resource-with-its-url-defined-in-page-frontmatter/41690
*/ -}}
{{- $respSizes := slice "320" "640" "960" "1280" "1600" "1920" -}}
{{- $alt := .Text -}}
{{- $caption := .Title -}}
{{- $src := .Destination -}}
{{- $imgBd5 := md5 $src -}}
{{- $dataSzes := "(min-width: 1024px) 100vw, 50vw" -}}
{{- $holder := "GIP" -}}
{{- $hint := "photo" -}}
{{- $filter := "box" -}}
{{- $imgClass := "w-full h-auto shadow animate-fade" -}}
{{- $rscToMatch := print "images/" $src -}}

{{- if .Page.Resources.GetMatch $src -}}
	{{ with .Page.Resources.GetMatch $src }}
		{{- $divClass := print "relative bigImgDiv imgB-" $imgBd5 "-" $holder -}}
		{{- $imgRsc := . -}}
		{{- $actualImg := $imgRsc.Process (print "resize 640x jpg " $filter) -}}
		<div class="{{ $divClass }}" data-pagefind-ignore>
			<picture data-pagefind-ignore>
				<source type="image/webp" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $imgRsc.Width . -}}
							{{- if $i }}, {{ end -}}{{- ($imgRsc.Process (print "resize " . "x webp " $hint " " $filter) ).RelPermalink }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" sizes="{{ $dataSzes }}" />
				<source type="image/jpeg" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $imgRsc.Width . -}}
							{{- if $i }}, {{ end -}}{{- ($imgRsc.Process (print "resize " . "x jpg " $filter) ).RelPermalink }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" sizes="{{ $dataSzes }}" />
				<img class="{{ $imgClass }}" src="{{ $actualImg.RelPermalink }}" width="{{ $imgRsc.Width }}" height="{{ $imgRsc.Height }}" alt="{{ $alt }}" title="{{ $alt }}" loading="lazy" data-pagefind-ignore />
			</picture>
		</div>
	{{- end -}}
{{- else -}}
	<p class="ctr legal"><em>Image unavailable.</em></p>
{{- end -}}
{{- with $caption -}}<p class="imgCaption">{{ $caption | $.Page.RenderString }}</p>{{- end }}
```

And finally, the image-processing shortcode[^defaults] that handles both GIPs (the default here) and LQIPs, through the use of a `$holder` variable which specifies the `div`'s background type:

[^defaults]: Thanks to [Sujal Gurung](https://github.com/dinesh-58) for the excellent suggestion that I use Hugo's [`default` function](https://gohugo.io/functions/default/) for cleaner code than what I originally had here! Somehow, I'd missed reading about that one all this time.

```go-html-template{filename="img.html" bigdiv=true}
{{/* init vars */}}
{{- $respSizes := slice "320" "640" "960" "1280" "1600" "1920" -}}
{{- $src := .Get "src" -}}
{{- $alt := .Get "alt" -}}

{{- $holder := default "GIP" (.Get "holder") -}}
{{- $phn := default false (.Get "phn") -}}
{{- $hint := default "photo" (.Get "hint") -}}
{{- /* ^^ applicable only to webp: https://gohugo.io/content-management/image-processing/#hint */ -}}
{{- $filter := default "box" (.Get "filter") -}}
{{- $simple := default false (.Get "simple") -}}
{{- $rounds := default false (.Get "rounds") -}}

{{- $imgBd5 := md5 $src -}}
{{- $divClass := "relative" -}}
{{- if not $phn -}}
	{{- $divClass = print $divClass " bigImgDiv" -}}
	{{- if $rounds -}}
		{{- $divClass = print $divClass " rounded-bkgd" -}}
		{{/* For LQIPs behind rounded imgs (e.g., screen caps). */}}
	{{- end }}
	{{- $divClass = print $divClass " imgB-" $imgBd5 "-" $holder -}}
	{{/*
		The `imgB-`[hash]-GIP` class is
		generated in a `head` partial;
		here, we need only get the class's name,
		using the same method as in that partial
		(md5-ing the image file name).
	*/}}
{{- else -}}{{/* if $phn */}}
	{{- $divClass = print $divClass " bg-center" -}}
{{- end -}}
{{- $imgClass := "w-full animate-fade shadow" -}}
{{- if $phn -}}
	{{- $imgClass = "img-phn ctrImg animate-fade shadow" -}}
{{- end -}}
{{- $dataSzes := "(min-width: 1024px) 100vw, 50vw" -}}

{{- if .Page.Resources.GetMatch $src -}}
	{{ with .Page.Resources.GetMatch $src }}
		{{- $imgRsc := . -}}
		{{- $actualImg := $imgRsc.Process (print "resize 640x jpg " $filter) -}}
		{{- if eq $simple false -}}
		<div class="{{ $divClass }}" data-pagefind-ignore>
		{{- end }}
			<picture data-pagefind-ignore>
				<source type="image/webp" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $imgRsc.Width . -}}
							{{- if $i }}, {{ end -}}{{- ($imgRsc.Process (print "resize " . "x webp " $hint " " $filter) ).RelPermalink }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" sizes="{{ $dataSzes }}" />
				<source type="image/jpeg" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $imgRsc.Width . -}}
							{{- if $i }}, {{ end -}}{{- ($imgRsc.Process (print "resize " . "x jpg " $filter) ).RelPermalink }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" sizes="{{ $dataSzes }}" />
				<img class="h-auto{{ if eq $simple false }} {{ $imgClass }}{{ end }}" src="{{ $actualImg.RelPermalink }}" width="{{ $imgRsc.Width }}" height="{{ $imgRsc.Height }}" alt="{{ $alt }}" title="{{ $alt }}" loading="lazy" data-pagefind-ignore />
			</picture>
		{{- if eq $simple false -}}
		</div>
		{{- end -}}
	{{- end -}}
{{- else -}}
	<p class="ctr legal"><em>Image unavailable.</em></p>
{{- end }}
```

## Use and results

To invoke the render hook in Markdown, use it as shown[^commentsGo] (here, I'm using the optional title parameter to provide a caption):

```md{bigdiv=true}
![Here's our cat, Shakespeare, sitting on a window sill.\
This photo appears in multiple images-related posts here on [this website](/).")
```

[^commentsGo]: If you happen upon this site's repo out of curiosity and check out this post's Markdown file, you'll notice that this example's curly-bracketed boundaries also have wrapping `/*` and `*/`, respectively. That's because, otherwise, Hugo sees it as *real* code, not just a representation of it, and acts accordingly --- in this case, once again displaying the image. See also the [documentation](https://gohugo.io/content-management/syntax-highlighting/#highlight-hugogo-template-code).

To invoke the `img.html` shortcode in Markdown, use it like so[^commentsGo], although you'll note I haven't used nearly all the available parameters in this case:

```md{bigdiv=true}
{{</* img src="my-pet-cat_3264x2448.jpg" alt="Here's our cat, Shakespeare, sitting on a window sill." holder="GIP" */>}}
<p class="photoCaption">Here's our cat, Shakespeare, sitting on a window sill.<br />
This photo appears in multiple images-related posts here on <a href="/">this website</a>.</p>
```

Either produces the same result (render hook version shown so you can see the caption, for which I had to add a suitably styled paragraph with the shortcode):

![Photo of a cat named Shakespeare sitting on a window sill](my-pet-cat_3264x2448.jpg "Here's our cat, Shakespeare, sitting on a window sill.\
This photo appears in multiple images-related posts here on [this website](/).")

. . . from HTML like the following, which shows the automatically created hashed names for the Hugo-generated resized images:

```html{bigdiv=true}
<div class="relative bigImgDiv imgB-b5bc32dfa3c277a7b3e602ebef8c83ca-GIP" data-pagefind-ignore="">
	<picture data-pagefind-ignore="">
		<source type="image/webp" srcset="/posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_320x0_resize_q75_h2_box.webp 320w, /posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_640x0_resize_q75_h2_box.webp 640w, /posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_960x0_resize_q75_h2_box.webp 960w, /posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_1280x0_resize_q75_h2_box.webp 1280w, /posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_1600x0_resize_q75_h2_box.webp 1600w, /posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_1920x0_resize_q75_h2_box.webp 1920w" sizes="(min-width: 1024px) 100vw, 50vw">
		<source type="image/jpeg" srcset="/posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_320x0_resize_q75_box.jpg 320w, /posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_640x0_resize_q75_box.jpg 640w, /posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_960x0_resize_q75_box.jpg 960w, /posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_1280x0_resize_q75_box.jpg 1280w, /posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_1600x0_resize_q75_box.jpg 1600w, /posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_1920x0_resize_q75_box.jpg 1920w" sizes="(min-width: 1024px) 100vw, 50vw"><img class="w-full h-auto shadow animate-fade" src="/posts/2023/05/better-code-image-processing-hugo-render-hook-edition/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_640x0_resize_q75_box.jpg" width="3264" height="2448" alt="Photo of a cat named Shakespeare sitting on a window sill" title="Photo of a cat named Shakespeare sitting on a window sill" loading="lazy" data-pagefind-ignore="">
	</picture>
</div>
<p class="imgCaption">
	Here’s our cat, Shakespeare, sitting on a window&nbsp;sill.<br>This&nbsp;photo appears in multiple images-related posts here on <a href="/">this&nbsp;website</a>.
</p>
```

**Note**: In case you use your browser Inspector tool on the actual HTML from that image above, be advised that I coded this site image-processing code to use Hugo's `MitchellNetravali` filter rather than the Hugo default of `box`. Feel free to use your own choice from among Hugo's choice of filters.
{.box}

## Making comparisons

Long-time readers of this site will recall that, starting in [July, 2020](/posts/2020/07/transformed/), I began using the Cloudinary free tier to host virtually all of this site's images, after my development and build processes grew increasingly slower as I added more images to the site repo.

So why am I now backtracking to repo-hosted images?

You can be sure it's *not* because I have a problem with Cloudinary, because I've been very happy with that experience. Rather, I've chosen to "dogfood" these local-only approaches --- not merely because I think that's only fair but also because I wanted to put Hugo to the test, having long been curious about this particular Hugo power.

**Update from the future**: See also "[Thanks and goodbye, Cloudinary](/posts/2024/03/thanks-goodbye-cloudinary/)" <span class="nobrk">(2024-03-05)</span>.
{.box}

Besides, there's a lot of difference between Then and Now.

When the site [first began](/posts/2019/12/packing-up/) providing responsive images in late 2019, it was through a [webpack](https://webpack.js.org) plugin working with the [Eleventy](https://11ty.dev) SSG. As the site's inventory of images grew, so did its build times. Later, [when I stopped using webpack](/posts/2020/05/going-solo-eleventy/) and instead built the Eleventy site with `package.json` scripting, I came up with some JavaScript that used [sharp](https://github.com/lovell/sharp) to process the site's images. It worked well enough, but the build times grew longer. Only when I went to Cloudinary did I cease having to worry about that.

So do I now have to worry about it again? Nope. Today is a different story. Now, instead of that JavaScript-based mishmash, I'm using the [Go](https://go.dev)-based, all-in-one Hugo --- whose built-in image processing, like Hugo itself, is preternaturally fast.[^noHeroes]

[^noHeroes]: In the interest of a fair comparison, I do concede that, through much of the site's pre-Cloudinary time, it was using a large *hero image* on every post. However: (1.) the build times were slow even during periods when I would [take down the hero images](/posts/2020/02/so-much-for-heroes/); (2.) when I *was* using the hero images pre-Cloudinary, I used only downsampled, smaller versions rather than the full-size originals I could use with Cloudinary. (For the images I use now, I am using full-size originals once again, and Hugo handles them quickly and without complaint --- something I never dared to do with my old JavaScript-based process.) **In short**, this isn't an apples-*vs.*-apples matchup.

But everything in web dev claims to be "blazing fast," so let's look at some proof.

Yesterday, when I did a local `hugo build` of the site, including the post you're reading right now, I got:

```bash
									 |  EN
-------------------+-------
	Pages            |  219
	Paginator pages  |   39
	Non-page files   |    0
	Static files     |   69
	Processed images | 1489
	Aliases          |    1
	Sitemaps         |    1
	Cleaned          |   38

Total in 4134 ms
```

As you see, it all built in slightly over four seconds. (Some of those pre-Cloudinary builds used to take **several minutes**, even locally.)

However, to be fair, that was with all the images pre-generated by my earlier testing; so, then, I *deleted* them, forcing Hugo to *regenerate* all the images on the next build:

```bash
									 |  EN
-------------------+-------
	Pages            |  219
	Paginator pages  |   39
	Non-page files   |    0
	Static files     |   69
	Processed images | 1489
	Aliases          |    1
	Sitemaps         |    1
	Cleaned          |   37

Total in 69905 ms
```

In just under seventy seconds, Hugo rebuilt nearly 1,500 image files from scratch --- *and* the 200+-page site itself. Pretty slick.

**Note**: If you're similarly starting from scratch with many images, and/or you want to minimize issues on your site's host the first time you switch to this, [set your Hugo config file's `timeout` value](https://gohugo.io/getting-started/configuration/#timeout) to longer than the default of thirty seconds. After you get to the point where your builds are more incremental where the images are concerned, thirty seconds will be *’waaay* more than enough time, both locally and on the host.
{.box}

When I first used Hugo in 2018--2019, I knew little or nothing about its ability to do image processing and, even if I had known enough, I was much more reluctant back then to get under the hood with Go-type templating. Moreover, since then, Hugo has added two features, the absence of which I'd have considered show-stoppers:

- The ability to produce WebP images, added only about a year ago in Hugo [0.83.0](https://github.com/gohugoio/hugo/releases/tag/v0.83.0). (Of course, unlike with Cloudinary, the format choice is something I have to specify in the code rather than something Cloudinary-generated based on browser capabilities. For now, my selections of WebP and JPG will do.)
- The aforementioned global resources option, because --- again --- I like keeping images and text in separate places.

I also like the fact that, unlike my Cloudinary-using `imgc` shortcode, this entirely local image-processing code doesn't require manual entry of `width` and `height`, because Hugo gets them automatically from each image `$src` as `$src.Width` and `$src.Height`, respectively. (As you probably know, modern browsers use `width` and `height` to set the correct aspect ratio for images where styling doesn't otherwise handle it.)

**Update, 2022-07-26**: In the original version of this post, I used Hugo's [`imageConfig` function](https://gohugo.io/functions/images/#imageconfig) to get this information, only to learn later that it wasn't necessary (and, in fact, caused an issue or two when I made some other revisions in my own code not related to or included in the sample here) so I decided to drop it in favor of the already-there `.Width` and `.Height`. Simpler is better.
{.box}

## Closing observations and suggestions

Here are a few more things to keep in mind about using the code described herein.

The image quality is Hugo's default of 75%, although [this and other settings can be configured](https://gohugo.io/content-management/image-processing/#imaging-configuration), at least in the shortcode. (As the saying goes, "I have left that as an exercise for the user.") **But** I've been pleasantly surprised with this default, especially in comparison to the Cloudinary images these Hugo-generated images have replaced. While some are a bit larger, the vast majority are either roughly the same size or actually smaller, yet I can see little or no tangible difference.

I suggest that you **not** gitignore `resources/_gen/assets`, so your repo will include both the original image files *and* the Hugo-generated versions. That will save time in both local devs/builds and the online build process on most hosts. Just make sure the image files don't constitute such a load that you risk exceeding your repo host's limits, especially if you're using its free tier.

**However . . .**

If you're using my Hugo shortcode for [static Mastodon toots](/posts/2022/06/static-mastodon-toots-hugo/), you probably **should** continue to gitignore the results from that. If your `.gitignore` file reads as follows where the `resources` stuff is concerned, your repo will version-control the images but not the static toots, as I recommend:

```plaintext
resources/_gen/assets
resources/json
```

You see, since the generated images end up in `resources/_gen/images`, the first item will make sure those *are* version-controlled, as I'm suggesting, while ignoring other things in `resources/_gen/`. As for the static toots, those end up in `resources/json/` and thus, will *not* be version-controlled, as is my additional suggestion.

## References

Even if you don't use my code or anything similar, I hope this article has at least contributed to your understanding of Hugo's image processing prowess. Here are other selected articles about using Hugo for creating responsive images. I've listed them in order of their publish dates, oldest first. Note that even some which came *after* Hugo began allowing processing of images as global resources still referred erroneously to Hugo's earlier file-placement restrictions.

- Adam Wills, "Responsive Images in Hugo" (<span class="nobrk">2017-04-30</span>).[^deadlink]
- Nils Norman Haukås, "[Hugo: How to add support for responsive images trough image processing and page bundles <3](https://nilsnh.no/2018/06/10/hugo-how-to-add-support-for-responsive-images-trough-image-processing-and-page-bundles-3/)" (<span class="nobrk">2018-06-10</span>).
- Mathias Wellner, "Image Handling with Hugo" (<span class="nobrk">2018-10-30</span>).[^deadlink]
- Laura Kalbag, "[Processing Responsive Images with Hugo](https://laurakalbag.com/processing-responsive-images-with-hugo/)" (<span class="nobrk">2018-12-13</span>).
- [stereobooster](https://github.com/stereobooster), "[Responsive Images for Hugo](https://dev.to/stereobooster/responsive-images-for-hugo-dn9)" (<span class="nobrk">2019-06-16</span>).
- Alan W. Smith, "A Flexible Responsive Image Solution for Hugo" (<span class="nobrk">2019-11-07</span>).[^deadlink]
- Strict Panda, "[Using Image Processing to Load Images in Hugo](https://blog.strict-panda.com/post/image-processing-media-queries/)" (<span class="nobrk">2019-11-28</span>).
- Henrik Sommerfeld, "[Lazy Loading Images in Hugo](https://www.henriksommerfeld.se/lazy-loading-images-in-hugo/)" (<span class="nobrk">2020-02-05</span>).
- Charl P. Botha, "[Drop-in replacement for Hugo figure shortcode with responsive img srcset](https://cpbotha.net/2020/05/02/drop-in-replacement-for-hugo-figure-shortcode-with-responsive-img-srcset/)" (<span class="nobrk">2020-05-02</span>).
- Alex Lakatos, "[How To Add Image Processing to Your Hugo Website and Improve Performance](https://alexlakatos.com/web/2020/07/17/hugo-image-processing/)" (<span class="nobrk">2020-07-17</span>).
- Jan Steinke, "[Module for responsive images with image source sets for Hugo](https://blog.jan-steinke.de/en/posts/tech/01_hugo_module/)" (<span class="nobrk">2020-10-12</span>).
- Dave Bennett, "[Hugo Responsive Images With Markdown Render Hook](https://www.bennettnotes.com/notesnotes/hugo-responsive-images-with-markdown-render-hook/)" (<span class="nobrk">2021-08-04</span>).
- Tim van Werkhoven, "[Responsive images &amp; image grids for Hugo](https://www.vanwerkhoven.org/blog/2021/responsive_images_in_hugo_theme/)" (<span class="nobrk">2021-10-22</span>).
- Utkarsh Verma, "Using responsive images effortlessly with Hugo" (<span class="nobrk">2022-03-06</span>).[^deadlink]
- Joost van der Schee, "[Image compression for the lazy](https://hugocodex.org/blog/image-compression-for-the-lazy/)" (<span class="nobrk">2022-06-19</span>).

[^deadlink]: Article no longer online as of <span class="nobrk">2023-10-29</span>.
