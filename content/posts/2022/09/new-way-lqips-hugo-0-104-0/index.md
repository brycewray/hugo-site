---
title: "A new way to generate LQIPs in Hugo 0.104.0"
description: "An interesting addition to this SSG’s image-processing arsenal helps you accommodate users viewing your site under suboptimal conditions."
author: Bryce Wray
date: 2022-09-23T13:33:00-05:00
#draft: true
initTextEditor: iA Writer
---

With today's [release](https://github.com/gohugoio/hugo/releases/tag/v0.104.0) of version 0.104.0 of the [Hugo](https://gohugo.io) static site generator (SSG), there's a new and perhaps better way to generate low-quality image placeholders (LQIPs).

As you probably already know, using an LQIP as an image's background allows those with slower connectivity and devices to get at least a representation of a full image while that image is still downloading.

My go-to approach for LQIP-building has been, for each image, to [Base64](https://en.wikipedia.org/wiki/Base64)-encode a tiny version of that image and then load it as the background. The tiny reproduction would obviously be extremely blurred as it was stretched out to the real image's width and height, producing the familiar "blur-up" effect when the real image appeared (fading in via CSS).

Then, today, the release of Hugo 0.104.0 added a [`.Colors` method](https://gohugo.io/content-management/image-processing/#colors) to Hugo's existing image-processing capabilities. As the documentation says (and remember that a [*slice*](https://gohugo.io/functions/slice/) is what Hugo, and the [Go](https://go.dev) language on which it is based, calls what most other SSGs and languages call an *array*):

> `.Colors` returns a slice of [hex string](https://htmlcolorcodes.com/) with the dominant colors in the image[,] using a simple histogram method.

*(Link added.)*

For example, given this image:

{{< imgh src="my-pet-cat_3264x2448.jpg" alt="Photo of a cat named Shakespeare sitting on a window sill" >}}

. . . here's the slice you get from `.Colors`:

```plaintext
#1d1816,#cac7c0,#978779
```

Those are the colors, in hex format, that `.Colors` picked out as the main ones in the image. The number of colors obviously varies from image to image, and it can be as low as one. Note that one-item slice will be problematic if you try to code so that an image's `.Colors`-derived LQIP has a background that's a [linear gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient), because the `linear-gradient` function requires at least two colors. Thus, you'll want to add a test for a one-color return from `.Colors` so you can [append](https://gohugo.io/functions/append/) to the slice an extra color --- perhaps a safe one like black --- if need be.

So, with Hugo 0.104.0 and up, you can try something like the following, in which `$src` represents the real image file:

```go-html-template
{{- $LQIP_colors := $src.Colors -}}
{{- if (lt ($LQIP_colors | len) 2) -}}
	{{- $LQIP_colors = $LQIP_colors | append "#000000" -}}
{{- end -}}
{{- $LQIP_bkgd := delimit ($LQIP_colors) ", " -}}
{{- $style := print "background: linear-gradient(" $LQIP_bkgd "); background-size: cover; background-repeat: no-repeat;" -}}
```

After specifying that `$LQIP_colors` is the return from `$src.Colors`, we have the conditional for handling a one-color return: "if the length of `$LQIP_colors` is less than *2*, `append` to `$LQIP_colors` the color black (`#000000`)." Right after that, we:
- Create `$LQIP_bkgd`, which is a string containing the contents of `$LQIP_colors`, with each pair separated by a `delimit`-ing comma and space. That's for . . .
- . . . `$style`, the CSS we'll provide to the eventual `div` in which the real image will be contained.[^CSP]

[^CSP]: If you have a strict [Content Security Policy](https://content-security-policy.com) and need to work around the issue of inline styling, you might want to examine the admittedly more complicated [original](https://github.com/brycewray/hugo_site/blob/main/layouts/shortcodes/imgh.html) from which I extracted this example.

Finally, be sure to check the `$.Colors` [example page](https://staticbattery.com/), and its [source code](https://github.com/bep/gallerydeluxe), mentioned in the 0.104.0 release notes.