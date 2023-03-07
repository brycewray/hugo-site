---
title: "Responsive and optimized images with Hugo"
description: "How to take advantage of the amazingly capable image processing built into this SSG."
author: Bryce Wray
date: 2022-06-29T08:17:00-05:00
#initTextEditor: iA Writer
---

If you use any images on your website, you probably know how important it is to make them fully *responsive* and as *optimized* as possible so they provide an optimal user experience, regardless of screen size or connectivity. Fortunately, the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG) comes with many impressive [image processing capabilities](https://gohugo.io/content-management/image-processing/) which can help you automate this to an amazing degree. Hugo can resize images of all sizes, convert them to multiple different formats, and perform many more image processing feats --- all much more quickly than can any other SSG.

Years ago, the availability of Hugo image processing was more restrictive concerning the images' location within a Hugo project. Specifically, they had to be [*page resources*](https://gohugo.io/content-management/image-processing/#page-resources), and thus in the same folder as the Markdown content calling them. While that's still perfectly fine, they now also can be [*global resources*](https://gohugo.io/content-management/image-processing/#global-resources), existing in either the project's `assets/` folder or any subfolder thereof.[^versionGlobal] I'm old-school and prefer to keep textual content files separate from image files, so I like this flexibility quite a bit.

[^versionGlobal]: Despite searching through Hugo [release notes](https://github.com/gohugoio/hugo/releases) and various Hugo documentation updates, I was unable to determine exactly which version first supported this. All I could do was see that the related documentation itself changed sometime in the second half of 2020 to mention the acceptability of global resources for Hugo's image processing.

**Update from the future**: [A few weeks later](/posts/2022/07/bundling-up-rebuilding-my-hugo-site/), I changed to the page-resources approach after receiving some particularly savvy advice.
{.box}

For truly responsive images, you must define the *breakpoints*. These are viewport sizes, usually defined in pixels, for the browser to use in deciding *which* image to serve. Some articles you'll find out there --- as in the [references](#references) I'll list at the end --- take a more hard-coded approach to the breakpoints than I feel is necessary or appropriate. This probably is because of the sample code from older articles of this type, in which it's common to assign a variable to each of several breakpoints (*e.g.*, `$tiny` for a 500-pixel breakpoint, `$medium` for an 800-pixel one, *etc.*). Yes, you can do that and it'll work, but I suggest another method which I'll describe in a bit.

Still other articles make admittedly effective use of Hugo's [Markdown render hooks](https://gohugo.io/templates/render-hooks/) to change any standard `[Alt text](image.jpg)`-style Markdown to responsive/optimized images; but I prefer to take a *[shortcode](https://gohugo.io/content-management/shortcodes/)* approach, for the added control it offers through optional parameters you can specify.

Still, that's enough griping on my part. It's time for me to put up or shut up --- with this post and the shortcode it suggests for using Hugo to produce responsive, optimized images.

## What was I thinking?

Here's what I built this shortcode to do, based on how I'd used its [Cloudinary](https://cloudinary.com)-using predecessor (more later on this site and Cloudinary):

- Rather than hard-coding breakpoint sizes into variables and then generating resized images based on those, just loop through a "slice" (array) and pull the breakpoints from them. This makes it easier to adjust the breakpoints when desired. It also produces more elegant code, IMHO.
- To provide the usual "blur-up" effect with a low-quality image placeholder (LQIP) while the full image loads, generate a tiny LQIP, encode it as [Base64](https://en.wikipedia.org/wiki/Base64), and magnify it enough to serve as the image div's background. (As you'll see, just exactly how we do that background styling can depend on other factors --- in the case of this site, which host it's currently using.)
- Use the `picture` element to offer choices of WebP and JPG image file formats, giving browsers a choice between two storage-efficient versions of each generated image.[^CloudAuto]
- For other optimization, depend on Hugo's default settings, although it does have [quite a few other options](https://gohugo.io/content-management/image-processing/#imaging-configuration).

[^CloudAuto]: Cloudinary provided different formats automatically, based on the browser, through the `img` element. While that's pretty slick, the lack thereof isn't a deal-breaker for me.

## The code and the comments

Here's an annotated version of a shortcode I call `imgh.html` (the *h* is for Hugo's native image processing, to distinguish this shortcode from its Cloudinary-using counterpart, `imgc.html`):

```go-html-template
{{- $respSizes := slice "320" "640" "960" "1280" "1600" "1920" -}}
{{/*
	These are breakpoints, in pixels.
	Adjust these to fit your use cases.
	Obviously, the more breakpoints,
	the more images you'll be producing.
	(Fortunately, Hugo does that
	**really** fast, as you'd expect,
	but watch out for any storage
	issues this can present either
	locally or in your online repo,
	especially if you have a really
	large number of original images.)
*/}}
{{- $imgBase := "images/" -}}
{{/*
	This will be from top-level `assets/images`,
	where we'll keep all images for Hugo's
	processing (this makes them "global
	resources," as noted in the documentation).
*/}}
{{- $src := resources.Get (printf "%s%s" $imgBase (.Get "src")) -}}
{{- $alt := .Get "alt" -}}
{{- $divClass := "" -}}{{/* Init'g */}}
{{/*
	The styling in $imgClass, below, makes
	an image fill the container horizontally
	and adjust its height automatically
	for that, and then fade in for the LQIP effect.
	Feel free to adjust your CSS/SCSS as desired.
*/}}
{{- $imgClass := "w-full h-auto animate-fade" -}}
{{- $dataSzes := "(min-width: 1024px) 100vw, 50vw" -}}
{{/*
	Now we'll create the 20-pixel-wide LQIP
	and turn it into Base64-encoded data, which
	is better for performance and caching.
*/}}
{{- $LQIP_img := $src.Resize "20x jpg" -}}
{{- $LQIP_b64 := $LQIP_img.Content | base64Encode -}}
{{/*
	$CFPstyle is for use in styling
	the div's background, as you'll see shortly.
*/}}
{{- $CFPstyle := printf "%s%s%s" "background: url(data:image/jpeg;base64," $LQIP_b64 "); background-size: cover; background-repeat: no-repeat;" -}}
{{/*
	Then, we create a 640-pixel-wide JPG
	of the image. This will serve as the
	"fallback" image for that tiny percentage
	of browsers that don't understand the
	HTML `picture` tag.
*/}}
{{- $actualImg := $src.Resize "640x jpg" -}}
{{/*
	Now we'll handle the LQIP background for the
	div that will contain the image content; the
	conditional at the top controls whether we're
	doing inline styling --- which is a no-no for
	a tight Content Security Policy (CSP). Here,
	it checks whether the host, as specified in the
	site config file, is Cloudflare Pages (where I
	use a Cloudflare Worker for that tight CSP).
	If so, it creates a new class, named
	with an md5 hash for the value of $src, that
	the div can use to provide the LQIP background.
	Otherwise, it inserts inline styling.
	**THEREFORE** . . .
	If you don't have a problem with inline styling,
	feel free to use only the second option and
	avoid the conditional altogether.
*/}}
{{- $imgBd5 := md5 $src -}}
{{- if eq .Site.Params.Host "CFP" -}}
	<style>
		.imgB-{{ $imgBd5 }} { {{ $CFPstyle | safeCSS }} }
	</style>
	<div class="relative imgB-{{ $imgBd5 }} bg-center">
{{- else -}}
	<div class="relative bg-center" style="{{ $CFPstyle | safeCSS }}">
{{- end -}}
{{/*
	Now we'll build the `picture` which modern
	browsers use to decide which image, and
	which format thereof, to show. Remember to
	put `webp` first, since the browser will use
	the first format it **can** use, and WebP files
	usually are smaller. After WebP, the fallback
	is the universally safe JPG format.
*/}}
	<picture>
		<source
			type="image/webp"
			srcset="
			{{- with $respSizes -}}
				{{- range $i, $e := . -}}
					{{- if ge $src.Width . -}}
						{{- if $i }}, {{ end -}}{{- ($src.Resize (printf "%sx%s" . " webp") ).RelPermalink }} {{ . }}w
					{{- end -}}
				{{- end -}}
			{{- end -}}"
			sizes="{{ $dataSzes }}"
		/>
		<source
			type="image/jpeg"
			srcset="
			{{- with $respSizes -}}
				{{- range $i, $e := . -}}
					{{- if ge $src.Width . -}}
						{{- if $i }}, {{ end -}}{{- ($src.Resize (printf "%sx%s" . " jpg") ).RelPermalink }} {{ . }}w
					{{- end -}}
				{{- end -}}
			{{- end -}}"
			sizes="{{ $dataSzes }}"
		/>
		<img class="{{ $imgClass }}"
			src="{{ $actualImg.RelPermalink }}"
			width="{{ $src.Width }}"
			height="{{ $src.Height }}"
			alt="{{ $alt }}"
			loading="lazy"
		/>
	</picture>
</div>
```

## Use and results

To invoke `imgh` in Markdown, use it like so[^commentsGo]:

[^commentsGo]: If you happen upon this site's repo out of curiosity and check out this post's Markdown file, you'll notice that each of these examples' curly-bracketed boundaries also have wrapping `/*` and `*/`, respectively. That's because, otherwise, Hugo sees it as *real* code, not just a representation of it, and acts accordingly --- in this case, once again displaying the image. I found this otherwise undocumented workaround in a [2015 comment](https://discourse.gohugo.io/t/a-way-to-mark-plain-text-and-stop-hugo-from-interpreting/1325/2) on the [Hugo Discourse forum](https://discourse.gohugo.io). This is similar to how [Eleventy](https://11ty.dev), when using [Nunjucks](https://mozilla.github.io/nunjucks/) templating, requires the use of `{% raw %}` and `{% endraw %}` for proper display of code blocks which contain certain combinations of characters. *(Full disclosure: this footnote is 99% recycled from last year's "[Go big or Go home?](/posts/2021/02/go-big-go-home/)" post, where the same issue came up.)*

```md
{{</* imgh src="my-pet-cat_3264x2448.jpg" alt="Photo of a cat named Shakespeare sitting on a window sill" */>}}
```

In this case, it produces:

{{< imgh src="my-pet-cat_3264x2448.jpg" alt="Photo of a cat named Shakespeare sitting on a window sill" filter="box" >}}

. . . from the resulting HTML, which shows the automatically created hashed names for the Hugo-generated resized images:

```html
<div class="relative imgB-b5bc32dfa3c277a7b3e602ebef8c83ca bg-center">
	<picture>
		<source type="image/webp" srcset="/posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_320x0_resize_q75_h2_box.webp 320w, /posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_640x0_resize_q75_h2_box.webp 640w, /posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_960x0_resize_q75_h2_box.webp 960w, /posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_1280x0_resize_q75_h2_box.webp 1280w, /posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_1600x0_resize_q75_h2_box.webp 1600w, /posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_1920x0_resize_q75_h2_box.webp 1920w" sizes="(min-width: 1024px) 100vw, 50vw">
		<source type="image/jpeg" srcset="/posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_320x0_resize_q75_box.jpg 320w, /posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_640x0_resize_q75_box.jpg 640w, /posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_960x0_resize_q75_box.jpg 960w, /posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_1280x0_resize_q75_box.jpg 1280w, /posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_1600x0_resize_q75_box.jpg 1600w, /posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_1920x0_resize_q75_box.jpg 1920w" sizes="(min-width: 1024px) 100vw, 50vw">
		<img class="w-full h-auto animate-fade" src="/posts/2022/06/responsive-optimized-images-hugo/my-pet-cat_3264x2448_hu0a98823da7db56e37a2cf4ddae586f7b_3793639_640x0_resize_q75_box.jpg" width="3264" height="2448" alt="Photo of a cat named Shakespeare sitting on a window sill" title="Photo of a cat named Shakespeare sitting on a window sill" loading="lazy">
	</picture>
</div>
```

## Making comparisons

Long-time readers of this site will recall that, starting in [July, 2020](/posts/2020/07/transformed/), I began using the Cloudinary free tier to host virtually all of this site's images, after my development and build processes grew increasingly slower as I added more images to the site repo.

So why am I now backtracking to repo-hosted images?

You can be sure it's *not* because I have a problem with Cloudinary, because I've been very happy with that experience. Rather, I've chosen to "dogfood" this shortcode --- not merely because I think that's only fair but also because I wanted to put Hugo to the test, having long been curious about this particular Hugo power.

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

I also like the fact that, unlike my Cloudinary-using `imgc` shortcode, `imgh` doesn't require manual entry of `width` and `height`, because Hugo gets them automatically from each image `$src` as `$src.Width` and `$src.Height`, respectively. (As you probably know, modern browsers use `width` and `height` to set the correct aspect ratio for images where styling doesn't otherwise handle it.)

**Update, 2022-07-26**: In the original version of this post, I used Hugo's [`imageConfig` function](https://gohugo.io/functions/images/#imageconfig) to get this information, only to learn later that it wasn't necessary (and, in fact, caused an issue or two when I made some other revisions in my own code not related to or included in the sample here) so I decided to drop it in favor of the already-there `.Width` and `.Height`. Simpler is better.
{.box}

## Closing observations and suggestions

Here are a few more things to keep in mind about using this shortcode.

The image quality is Hugo's default of 75%, although [this and other settings can be configured](https://gohugo.io/content-management/image-processing/#imaging-configuration). (As the saying goes, "I have left that as an exercise for the user.") **But** I've been pleasantly surprised with this default, especially in comparison to the Cloudinary images these Hugo-generated images have replaced. While some are a bit larger, the vast majority are either roughly the same size or actually smaller, yet I can see little or no tangible difference.

I suggest that you **not** gitignore `resources/_gen/assets`, so your repo will include both the original image files *and* the Hugo-generated versions. That will save time in both local devs/builds and the online build process on most hosts. Just make sure the image files don't constitute such a load that you risk exceeding your repo host's limits, especially if you're using its free tier.

**However . . .**

If you're using either of my Hugo shortcodes for [static](/posts/2022/02/static-tweets-eleventy-hugo/) [tweets](/posts/2022/02/static-tweets-eleventy-hugo-part-2/) or the one for [static Mastodon toots](/posts/2022/06/static-mastodon-toots-hugo/), you probably **should** continue to gitignore those. If your `.gitignore` file reads as follows where the `resources` stuff is concerned, your repo will version-control the images but not the static tweets/toots, as I recommend:

```plaintext
resources/_gen/assets
resources/json
```

You see, since the generated images end up in `resources/_gen/images`, the first item will make sure those *are* version-controlled, as I'm suggesting, while ignoring other things in `resources/_gen/`. As for the static tweets/toots, those end up in `resources/json/` and thus, will *not* be version-controlled, as is my additional suggestion.

## References

Even if you don't use `imgh` or anything like it, I hope this article has at least contributed to your understanding of Hugo's image processing prowess. Here are other selected articles about using Hugo for creating responsive images. I've listed them in order of their publish dates, oldest first. Note that even some which came *after* Hugo began allowing processing of images as global resources still referred erroneously to Hugo's earlier file-placement restrictions.

- Adam Wills, "[Responsive Images in Hugo](https://www.adamwills.io/blog/responsive-images-hugo/)" (<span class="nobrk">2017-04-30</span>).
- Nils Norman Haukås, "[Hugo: How to add support for responsive images trough image processing and page bundles <3](https://nilsnh.no/2018/06/10/hugo-how-to-add-support-for-responsive-images-trough-image-processing-and-page-bundles-3/)" (<span class="nobrk">2018-06-10</span>).
- Mathias Wellner, "[Image Handling with Hugo](https://mwellner.de/en/2018/10/30/image-handling-with-hugo/)" (<span class="nobrk">2018-10-30</span>).
- Laura Kalbag, "[Processing Responsive Images with Hugo](https://laurakalbag.com/processing-responsive-images-with-hugo/)" (<span class="nobrk">2018-12-13</span>).
- [stereobooster](https://github.com/stereobooster), "[Responsive Images for Hugo](https://dev.to/stereobooster/responsive-images-for-hugo-dn9)" (<span class="nobrk">2019-06-16</span>).
- Alan W. Smith, "[A Flexible Responsive Image Solution for Hugo](https://www.alanwsmith.com/posts/a-flexible-responsive-image-solution-for-hugo--20en8rdqh5do)" (<span class="nobrk">2019-11-07</span>).
- Strict Panda, "[Using Image Processing to Load Images in Hugo](https://blog.strict-panda.com/post/image-processing-media-queries/)" (<span class="nobrk">2019-11-28</span>).
- Henrik Sommerfeld, "[Lazy Loading Images in Hugo](https://www.henriksommerfeld.se/lazy-loading-images-in-hugo/)" (<span class="nobrk">2020-02-05</span>).
- Charl P. Botha, "[Drop-in replacement for Hugo figure shortcode with responsive img srcset](https://cpbotha.net/2020/05/02/drop-in-replacement-for-hugo-figure-shortcode-with-responsive-img-srcset/)" (<span class="nobrk">2020-05-02</span>).
- Alex Lakatos, "[How To Add Image Processing to Your Hugo Website and Improve Performance](https://alexlakatos.com/web/2020/07/17/hugo-image-processing/)" (<span class="nobrk">2020-07-17</span>).
- Jan Steinke, "[Module for responsive images with image source sets for Hugo](https://blog.jan-steinke.de/en/posts/tech/01_hugo_module/)" (<span class="nobrk">2020-10-12</span>).
- Dave Bennett, "[Hugo Responsive Images With Markdown Render Hook](https://www.bennettnotes.com/notes/hugo-responsive-images-with-markdown-render-hook/)" (<span class="nobrk">2021-08-08</span>).
- Tim van Werkhoven, "[Responsive images &amp; image grids for Hugo](https://www.vanwerkhoven.org/blog/2021/responsive_images_in_hugo_theme/)" (<span class="nobrk">2021-10-22</span>).
- Utkarsh Verma, "[Using responsive images effortlessly with Hugo](https://bitbanged.com/posts/using-responsive-images-effortlessly-with-hugo/)" (<span class="nobrk">2022-03-06</span>).
- Joost van der Schee, "[Image compression for the lazy](https://hugocodex.org/blog/image-compression-for-the-lazy/)" (<span class="nobrk">2022-06-19</span>).

**Update from the future**: I later went back to using Cloudinary to handle nearly all of the site's images. (The exceptions are: the one on this page, so you can see the `imgh` shortcode actually working; and the one on "[A new way to generate LQIPs in Hugo 0.104.0](/posts/2022/09/new-way-lqips-hugo-0-104-0/)," to illustrate the subject of that post.) This was mainly because: I no longer wanted to keep all those Hugo-generated image resources in my site repo; Cloudinary delivered them considerably faster than the website host and in more file formats than Hugo supports; and, in comparative testing, I could see *slightly* better quality in some of the images as rendered via Cloudinary as opposed to their Hugo-generated counterparts. A peripherally connected additional consideration was that I'd already begun using Cloudinary to [auto-generate my site's social media images](/posts/2022/10/automated-social-media-images-cloudinary-hugo/).
{.box}
