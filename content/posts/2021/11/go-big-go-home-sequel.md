---
#layout: singlepost
tags:
- post
- code
title: "Go big or Go home? The sequel"
description: "After a “D’oh!” moment, I refine a bespoke Hugo shortcode."
author: Bryce Wray
date: 2021-11-23T12:55:00-06:00
lastmod: 2021-11-28T09:54:00-06:00
#draft: false
discussionId: "2021-11-go-big-go-home-sequel"
featured_image: "markus-spiske-70Rir5vB96U-unsplash_5760x3840.jpg"
featured_image_width: 5760
featured_image_height: 3840
featured_image_alt: "Closeup of computer code on a display"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@markusspiske?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Markus Spiske</a>; <a href="/s/photos/computer-code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

The inspiration for this mercifully brief post was a metaphorical, "Why didn't I think of this before?”-kinda forehead-slap. And perhaps it should have been more than metaphorical.

Back in February, I wrote [an article](/posts/2021/02/go-big-go-home/) about my conversion of an [Eleventy](https://11ty.dev) [shortcode](https://11ty.dev/docs/shortcodes) to a [Go](https://go.dev)-based shortcode for [Hugo](https://gohugo.io). Each shortcode's purpose generated the necessary HTML for responsive handling of an image from my [Cloudinary](https://cloudinary.com) account. While the spaghetti-ish result for Hugo certainly worked, it was ’way more convoluted and hard to read than it needed to be. This post is an attempt to make up for that.

You see, I realized the other day that --- “[D'oh](https://simpsons.fandom.com/wiki/D%27oh)!” --- I'd taken far too literally the process of going from the Eleventy shortcode to its Hugo counterpart. The JavaScript-based Eleventy original was structured to build and then `return` a string, but that wasn't necessary for the Hugo shortcode since its result, by default, already **was** a string. It was as if I had promised you the recipe for a pumpkin pie but, instead, had told you how to **type** the recipe or, worse, how to spell it out by positioning strands of wet, uh, spaghetti. Maybe in the end you still got a pumpkin pie recipe, but with much more trouble --- and at the expense of a ridiculously messy kitchen counter.[^analogy]

[^analogy]: I do concede that this analogy may, amazingly, be even more convoluted than the Hugo shortcode I gave you in the earlier post.

Anyway, let's get to the real recipe. If you need help with the Hugo-/Go-specific syntax therein, please refer to the [original post](/posts/2021/02/go-big-go-home/) and its explanatory links.

```go-html-template
{{/* init the first set of vars */}}
{{- $respSizes := slice "300" "450" "600" "750" "900" "1050" "1200" "1350" "1500" -}}
{{- $src := .Get "src" -}}
{{- $alt := .Get "alt" -}}
{{- $width := .Get "width" -}}
{{- $height := .Get "height" -}}

{{/*
	I'm separating the Cloudinary-related vars
	for greater flexibility, especially in case
	somebody else wants to borrow this code for
	his/her own Cloudinary setup and
	transformation ("xFm") choices.
	For example, incorporating the first var
	($cloudName) into the second var ($cloudiBase)
	allows tailoring the shortcode to one's own
	Cloudinary account.
*/}}
{{- $cloudName := "brycewray-com" }}
{{- $cloudiBase := printf "%s%s%s" "https://res.cloudinary.com/" {{ $cloudName }} "/image/upload/" -}}
{{- $LQIPholder := "f_auto,q_1,w_20/" -}}
{{/* $xFmPart1 := "f_auto,q_auto:eco,w_" */}}
{{- $xFmPart2 := ",x_0,z_1/" -}}
{{/*
	Due to the colon in the `q_auto:eco` parameter,
	I type out the value of `$xFmPart1` below to
	avoid the "#ZgotmplZ" annoyance, which I couldn't
	resolve with `safeHTML` or other similar methods.
	See also:
	- https://gohugo.io/functions/safehtml/
	- https://gohugo.io/functions/safehtmlattr/
	- https://stackoverflow.com/questions/36382624/how-to-get-rid-of-zgotmplz-from-html-template-in-golang
	- https://pkg.go.dev/html/template#hdr-A_fuller_picture
*/}}

{{/*
	The following vars seem pointless when we're
	using this for only one type of image, but am
	keeping in case I ever decide to use other
	kinds of images again (e.g., full-sized "hero
	images" with their own specific requirements)
	and, thus, have good reason to select these
	items programmatically.
	Of course, CSS classes vary from site to site,
	but the ones shown here work for my site as of
	this writing.
*/}}
{{- $imgBd5 := md5 $src -}}
{{- $divClass := "relative" -}}
{{- $imgClass := printf "%s%s%s%s%s" "w-full h-auto aspect-" $width "/" $height " lazy" -}}
{{- $nscClass := "containedImage" -}}
{{- $dataSzes := "(min-width: 1024px) 100vw, 50vw" -}}

<div class="{{ $divClass }} bg-center bg-no-repeat bg-cover" style="background-image: url({{ $cloudiBase }}{{ $LQIPholder }}{{ $src }});" aspect-ratio="{{ $width }} / {{ $height }}">
  <img class="{{ $imgClass }}" src="{{ $cloudiBase }}f_auto,q_auto:eco,w_600{{ $xFmPart2 }}{{ $src }}"
  srcset="
  {{- range $i, $respSizes -}}
    {{- if ge $width . -}}
      {{- $cloudiBase -}}f_auto,q_auto:eco,w_{{ . }}{{- $xFmPart2 -}}{{- $src }} {{ . }}w{{ if $i }}, {{ end -}}
    {{- end -}}
  {{- end -}}" alt="{{ $alt }}" width="{{ $width }}" height="{{ $height }}" loading="lazy" sizes="{{ $dataSzes }}" />
  <noscript>
    <img class="{{ $nscClass }}" src="{{ $cloudiBase }}f_auto,q_auto:eco,w_600 {{ $xFmPart2 }}{{ $src }}" alt="{{ $alt }}" />
  </noscript>
</div>
```
