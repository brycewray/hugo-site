---
title: "Using Hugo Pipes with Cloudinary: a follow-up"
description: "Here’s a more hosts-friendly way to take advantage of both the built-in Hugo asset pipeline and a digital assets management host."
author: Bryce Wray
date: 2023-07-23T10:14:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

<strong class="red">Update, 2024-03-05</strong>: See also "[Thanks and goodbye, Cloudinary](/posts/2024/03/thanks-goodbye-cloudinary/)."
{.box}

Soon after I issued "[Using Hugo Pipes with Cloudinary](/posts/2023/07/hugo-pipes-cloudinary/)," I found it necessary to add a warning about using the approach and code I'd covered in that post. In short, it wasn't too kind to the "sometimes underpowered servers used by some hosting vendors' free tiers," so I had to advise using it to only a limited degree.

While that advice remains true about the original method, I've now got an alternative that seems to solve the problem fairly neatly. With it in place, my builds go pretty much as quickly as they once did.

<!--more-->

Don't worry: I'm *not* going to rehash that whole post. Let's just leave it at this: its central idea was about using [Hugo](https://gohugo.io)'s built-in asset pipeline, [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/), in concert with [Cloudinary](https://cloudinary.com) to provide **both** Cloudinary-processed/-served images **and** special Hugo Pipes-powered goodies which normally would be limited to Hugo-processed images.

It worked just fine, especially in development mode on my local machine. The problem came whenever I'd push the site repository to GitHub, whereupon a [GitHub Action (GHA) "worker" would build the site](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) and shoot it to my site's host, [Cloudflare Pages](https://pages.cloudflare.com). Builds which had formerly taken well under ten seconds in the GHA "worker" --- and under three seconds locally --- suddenly grew much longer:

```bash
                   |  EN
-------------------+-------
  Pages            |  323
  Paginator pages  |   61
  Non-page files   |    4
  Static files     |   60
  Processed images |  162
  Aliases          |    1
  Sitemaps         |    1
  Cleaned          | 1395

Total in 26948 ms
```

. . . as compared to when I'd let Hugo handle *all* the images:

```bash
                   |  EN
-------------------+-------
  Pages            |  322
  Paginator pages  |   61
  Non-page files   |  118
  Static files     |   60
  Processed images | 1185
  Aliases          |    1
  Sitemaps         |    1
  Cleaned          |  420

Total in 6878 ms
```

It didn't take long to figure out why the host "worker" on GitHub was dragging, especially after I used Hugo's `--logLevel info` flag[^verbose] to see more details about both local and GHA-based builds:

[^verbose]: The `--verbose` flag also works but, if you use it, you'll get a warning that it'll be deprecated in the future and, thus, you should use `--logLevel`, instead.

```bash
INFO  copy static: syncing static files to /
INFO  build: running step "process" duration "30.319284ms"
INFO  build: running step "assemble" duration "402.24438ms"
INFO  build: running step "render" duration "15.084852494s"
INFO  build: running step "postProcess" duration "3.466052ms"

                   | EN
-------------------+------
  Pages            | 323
  Paginator pages  |  61
  Non-page files   |   4
  Static files     |  60
  Processed images | 162
  Aliases          |   1
  Sitemaps         |   1
  Cleaned          |  58

Total in 15549 ms
```

Fifteen seconds just for the "render" step! Jeeeeez. And this was *after* I'd tried some [caching measures](https://github.com/actions/cache) to fix this --- which, I assume, explains why it had dropped even that much as compared to the still-longer build earlier.

Since this was far longer than **entire builds** had formerly taken, I realized the newly sluggish rendering performance had to be because of the method I'd described in that aforementioned earlier post, involving numerous uses of Hugo Pipes to fetch Cloudinary-hosted images as remote resources and then use their data for various purposes.

Not good.

As I said above, I tried to mitigate this behavior in the GHA, but none of my stabs at the beast made much difference; so I added the warnings to the earlier post. Then I followed my own advice, meaning that I went back through the site project and set only a few images[^choices] to be Cloudinary-hosted.

[^choices]: In local dev, I determined which source, Hugo or Cloudinary, currently provides the better combination of file size and image quality for each image on the site. In most cases, it was Hugo's delivery of WebP, but there were some instances where Cloudinary's delivery of AVIF won out.

This helped --- but was unsatisfying. And I became even more unsatisfied with this half-measure after issuing yesterday's "[Hoping for a new chance for JPEG XL](/posts/2023/07/hoping-new-chance-jpeg-xl/)": it reminded me that, soon, I'd likely want to be pulling **more** images, not fewer, from Cloudinary.[^Safari] Thus, I needed to figure out a true fix for my method.

[^Safari]: Once Safari 17 goes live later this year and adds JPEG XL support to all those jillions of iPhones out there, I may want to use Cloudinary's `f_auto` feature to provide that codec to them and any other devices whose browsers may come to support it.

So I did.

The idea is simple:

- I keep *every* site image in the site repo. That means every image I plan to process with only Hugo as well as every image I plan to serve from Cloudinary.\
\
**But** . . .
- Rather than using Hugo Pipes to pull data from a Cloudinary-based image, I have Hugo Pipes use the repo's local version of that image, instead. That's ’waaaaay faster and, more to the point, enacts far less strain on the GHA's "worker."

Once I'd implemented this through appropriate code (still to come, below), the site's typical render and build times within the GHA "worker" became much more normal:

```bash
INFO  copy static: syncing static files to /
INFO  build: running step "process" duration "7.794523ms"
INFO  build: running step "assemble" duration "300.725411ms"
INFO  build: running step "render" duration "7.378575067s"
INFO  build: running step "postProcess" duration "2.958912ms"

                   |  EN
-------------------+-------
  Pages            |  325
  Paginator pages  |   62
  Non-page files   |    0
  Static files     |   60
  Processed images |  732
  Aliases          |    1
  Sitemaps         |    1
  Cleaned          | 1184

Total in 7753 ms
```

Before I give you the changed code, let me make an important note about the render-image hook. Unlike what I described in "[Better code for image processing in Hugo: the render hook edition](/posts/2023/05/better-code-image-processing-hugo-render-hook-edition/)," this now uses the `.Title` attribute **not** as an option for post-image captioning but, rather, to specify the image **processor** (`$proc`) --- either Hugo or Cloudinary. (For captioning, I've gone back to just adding captions manually in Markdown; it's not really that big a deal, since I don't use them that often.)

Invoking the render hook now can look like this (omitting the processor specification in the last part will revert to the default image processing, which is Hugo's):

```md
[Photo of a cat named Shakespeare sitting on a window sill]("my-pet-cat_3264x2448.jpg" "Cloudinary")
```

. . . while using the `img` shortcode can look like this (similarly, omitting the `proc` statement reverts to Hugo's image processing)[^commentsGo]:

[^commentsGo]: {{% mdcode-fn %}}

```md
{{</* img src="my-pet-cat_3264x2448.jpg" alt="Photo of a cat named Shakespeare sitting on a window sill" proc="Cloudinary" */>}}
```

So, once again, boys and girls, it's code time.[^defaults] I'll present the three files in the same order as before: the render-image hook; the `img` shortcode; and the partial template which injects image-specific CSS into the `head` of any page that contains any images.

[^defaults]: Thanks to [Sujal Gurung](https://github.com/dinesh-58) for the excellent suggestion that I use Hugo's [`default` function](https://gohugo.io/functions/default/) for cleaner code than what I originally had here! Somehow, I'd missed reading about that one all this time.

```go-html-template{filename="render-image.html" bigdiv=true}
{{/*
  For some additional background on this file, see:
  https://www.brycewray.com/posts/2023/05/better-code-image-processing-hugo-render-hook-edition/
*/}}
{{- $respSizes := slice "320" "640" "960" "1280" "1600" "1920" -}}
{{- $alt := .Text -}}
{{- $proc := .Title -}}
{{- $myCloud := "brycewray-com" -}}
{{/* ^^^ Fill in your own Cloudinary cloud name! */}}
{{- $cloudiBase := print "https://res.cloudinary.com/" $myCloud "/image/upload/" -}}
{{- $xFmPart1 := "f_auto,q_auto,w_" -}}
{{- $xFmPart2 := ",x_0,z_01/" -}}
{{- $src := .Destination -}}
{{- $imgBd5 := md5 $src -}}
{{- $dataSzes := "(min-width: 1024px) 100vw, 50vw" -}}
{{- $holder := "GIP" -}}
{{- $hint := "photo" -}}
{{- $filter := "box" -}}
{{- $divClass := print "relative bg-center bigImgDiv imgB-" $imgBd5 "-" $holder -}}
{{- $imgClass := "w-full h-auto shadow animate-fade" -}}

{{- if .Page.Resources.GetMatch $src -}}
	{{ with .Page.Resources.GetMatch $src }}
		{{- $imgRsc := . -}}
		{{- $width := $imgRsc.Width -}}
		{{- $height := $imgRsc.Height -}}
		{{- $actualImg := $imgRsc.Process (print "resize 640x jpg " $filter) -}}
		<div class="{{ $divClass }}" data-pagefind-ignore>
		{{- if eq $proc "Cloudinary" -}}
			{{- with $.Page.Params.imgs }}
				{{- $imgToGet := print $cloudiBase $src -}}
				{{- with $imgToGet -}}
					<img class="{{ $imgClass }}" src="{{ $cloudiBase }}f_auto,q_auto:eco,w_600{{ $xFmPart2 }}{{ $src }}" srcset="
					{{- with $respSizes -}}
						{{- range $i, $e := . -}}
							{{- if ge $width . -}}
								{{- if $i }}, {{ end -}}{{- $cloudiBase -}}f_auto,q_auto:eco,w_{{ . }}{{- $xFmPart2 -}}{{- $src }} {{ . }}w
							{{- end -}}
						{{- end -}}
					{{- end -}}" alt="{{ $alt }}" title="{{ $alt }}" width="{{ $width }}" height="{{ $height }}" loading="lazy" sizes="{{ $dataSzes }}" data-pagefind-ignore />
				{{- end -}}
			{{- end -}}
		{{- else -}}{{/* fall back to Hugo image processing */}}
			<picture data-pagefind-ignore>
				<source type="image/webp" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $width . -}}
							{{- if $i }}, {{ end -}}{{- ($imgRsc.Process (print "resize " . "x webp " $hint " " $filter) ).RelPermalink }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" sizes="{{ $dataSzes }}" />
				<source type="image/jpeg" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $width . -}}
							{{- if $i }}, {{ end -}}{{- ($imgRsc.Process (print "resize " . "x jpg " $filter) ).RelPermalink }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" sizes="{{ $dataSzes }}" />
				<img class="{{ $imgClass }}" src="{{ $actualImg.RelPermalink }}" width="{{ $width }}" height="{{ $height }}" alt="{{ $alt }}" title="{{ $alt }}" loading="lazy" data-pagefind-ignore />
			</picture>
		{{- end -}}
		</div>
	{{- end -}}
{{- else -}}
	<p class="ctr legal"><em>Image unavailable.</em></p>
{{- end -}}
```

```go-html-template{filename="img.html" bigdiv=true}
{{- $respSizes := slice "320" "640" "960" "1280" "1600" "1920" -}}
{{- $src := .Get "src" -}}
{{- $alt := .Get "alt" -}}
{{- $myCloud := "brycewray-com" -}}
{{/* ^^^ Fill in your own Cloudinary cloud name! */}}
{{- $cloudiBase := print "https://res.cloudinary.com/" $myCloud "/image/upload/" -}}
{{- $xFmPart1 := "f_auto,q_auto,w_" -}}
{{- $xFmPart2 := ",x_0,z_01/" -}}
{{- $holder := default "GIP" (.Get "holder") -}}
{{- $phn := default false (.Get "phn") -}}
{{- $hint := default "photo" (.Get "hint") -}}
{{- /* ^^ applicable only to webp: https://gohugo.io/content-management/image-processing/#hint */ -}}
{{- $filter := default "box" (.Get "filter") -}}
{{- $simple := default false (.Get "simple") -}}
{{- $proc := default "default" (.Get "proc") -}}
{{- /* ^^ Matters only if $proc ISN'T spec'd as "Cloudinary" */ -}}

{{- $imgBd5 := md5 $src -}}
{{- $divClass := "relative bg-center" -}}
{{- if not $phn -}}
	{{- $divClass = print $divClass " bigImgDiv imgB-" $imgBd5 "-" $holder -}}
	{{/*
		The `imgB-`[hash]-GIP` class is generated in a `head` partial;
		here, we need only get the class's name, using the same method
		as in that partial (md5-ing the image file name).
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
		{{- $width := $imgRsc.Width -}}
		{{- $height := $imgRsc.Height -}}
		{{- $actualImg := $imgRsc.Process (print "resize 640x jpg " $filter) -}}
		{{- if eq $simple false -}}
		<div class="{{ $divClass }}" data-pagefind-ignore>
		{{- end }}
		{{- if eq $proc "Cloudinary" -}}
			{{- with $.Page.Params.imgs }}
				{{- $imgToGet := print $cloudiBase $src -}}
				{{- with $imgToGet -}}
					<img class="h-auto{{ if eq $simple false }} {{ $imgClass }}{{ end }}" src="{{ $cloudiBase }}f_auto,q_auto:eco,w_600{{ $xFmPart2 }}{{ $src }}" srcset="
					{{- with $respSizes -}}
						{{- range $i, $e := . -}}
							{{- if ge $width . -}}
								{{- if $i }}, {{ end -}}{{- $cloudiBase -}}f_auto,q_auto:eco,w_{{ . }}{{- $xFmPart2 -}}{{- $src }} {{ . }}w
							{{- end -}}
						{{- end -}}
					{{- end -}}" alt="{{ $alt }}" title="{{ $alt }}" width="{{ $width }}" height="{{ $height }}" loading="lazy" sizes="{{ $dataSzes }}" data-pagefind-ignore />
				{{- end -}}
			{{- end -}}
		{{- else -}}{{/* fall back to Hugo image processing */}}
			<picture data-pagefind-ignore>
				<source type="image/webp" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $width . -}}
							{{- if $i }}, {{ end -}}{{- ($imgRsc.Process (print "resize " . "x webp " $hint " " $filter) ).RelPermalink }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" sizes="{{ $dataSzes }}" />
				<source type="image/jpeg" srcset="
				{{- with $respSizes -}}
					{{- range $i, $e := . -}}
						{{- if ge $width . -}}
							{{- if $i }}, {{ end -}}{{- ($imgRsc.Process (print "resize " . "x jpg " $filter) ).RelPermalink }} {{ . }}w
						{{- end -}}
					{{- end -}}
				{{- end -}}" sizes="{{ $dataSzes }}" />
				<img class="h-auto{{ if eq $simple false }} {{ $imgClass }}{{ end }}" src="{{ $actualImg.RelPermalink }}" width="{{ $width }}" height="{{ $height }}" alt="{{ $alt }}" title="{{ $alt }}" loading="lazy" data-pagefind-ignore />
			</picture>
		{{- end -}}
		{{- if eq $simple false -}}
		</div>
		{{- end }}
	{{- end -}}
{{- else -}}
	<p class="ctr legal"><em>Image unavailable.</em></p>
{{- end -}}
```

```go-html-template{filename="head-imgs-css.html" bigdiv=true}
{{- with .Params.imgs }}
	<style media="screen">
	{{- range . -}}
		{{- $src := . -}}
		{{- $rscToMatch := print "images/" $src -}}
		{{- $imgBd5 := md5 . -}}
		{{- if $.Page.Resources.GetMatch $src -}}
			{{- $imgRsc := $.Page.Resources.GetMatch $src -}}
			{{- $BkgdStyleEnd := print "; background-size: cover; background-repeat: no-repeat; aspect-ratio: " $imgRsc.Width " / " $imgRsc.Height ";" -}}
		{{- $GIP_img := $src.Process "resize 20x jpg q20" -}}
		{{- /* ^^ documentation says we get better performance by shrinking first */ -}}
		{{- $GIP_colors := $GIP_img.Colors -}}
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
		{{- end }}
	{{- end }}
	</style>
{{- end }}
```

**Update from the future**: By later [shifting the build process to my local system](/posts/2023/10/direct-deployments-quicker-slicker/) rather than relying on CI/CD "runners," I was able to go back to my [original approach](/posts/2023/07/hugo-pipes-cloudinary/) --- and, I might note, go back to **not** having to keep all site images in the repo. (I'm adding this note just in case any curious soul wonders why my in-repo code is so different from what I've explained and shown in this post.)
{.box}
