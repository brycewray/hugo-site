---
#layout: singlepost
tags: post
title: "Fetching remote stuff with Hugo 0.90+"
subtitle: "Fewer HTTP requests are better"
description: "It’s a marriage made in heaven: the Cloudinary free tier and Hugo Pipes’ new ability to grab remote items."
author: Bryce Wray
date: 2021-12-11T12:41:00-06:00
lastmod: 2021-12-15T12:27:00-06:00
#initTextEditor: Ulysses
discussionId: "2021-12-fetching-remote-stuff-hugo-0-90-plus"
featured_image: dog-fetching-stick-6724085_5184x3456.jpg
featured_image_width: 5184
featured_image_height: 3456
featured_image_alt: "A dog fetching a stick"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/annapowa-17446403/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6724085">Anna Powałowska</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6724085">Pixabay</a></span>
---

The [release earlier this week of version 0.90.0](https://github.com/gohugoio/hugo/releases/tag/v0.90.0) of the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG) suddenly made its [Hugo Pipes](https://gohugo.io/hugo-pipes) asset pipeline considerably more powerful by adding, for the first time, the ability to fetch and process *remote* assets. Previously, Hugo Pipes could work with only *local* assets—*i.e.*, files actually in a Hugo project’s repository. Now, as the 0.90.0 release notes explained:

> The support for remote `Resources` in `resources.Get` has been a feature in great demand. This means that you can fetch remote files (images, JSON files, RSS feeds, [etc.]) and use them in Hugo Pipes functions as [if] they were local.

My initial reaction was: well, that’s surely cool, but I doubt I’ll ever need that functionality in my own relatively limited use[^1] of Hugo. Then, yesterday, a tweet by long-renowned Hugo expert [Régis Philibert](https://github.com/regisphilibert) gave me second thoughts:

{{< tweet user="regisphilibert" id="1469417024518565900" >}}

And, lo and behold, it hit me this morning: this new ability by Hugo to fetch remote stuff meant, now, I could use [Base64](https://en.wikipedia.org/wiki/Base64)-encoded [low-quality image placeholders](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders) (LQIPs) in my image-handling shortcode (most recently described in “[Go big or Go home? The sequel](/posts/2021/11/go-big-go-home-sequel)”).

So what, you say? Well, this is what: now, the shortcode could ***halve*** its image-related [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) to my free [Cloudinary](https://cloudinary.com) account.[^2] [Since HTTP requests are render-blocking, it’s always better to have fewer of them](https://blog.hubspot.com/marketing/reduce-http-requests).

You see, up to then, the shortcode got each image’s LQIP by having Cloudinary generate a tiny, 20-pixel-wide version of the original image. While that worked well enough for client-side viewing, it also meant that, for *each* image, I was sending two HTTP requests to Cloudinary: one for the original image and one for the LQIP.

However, starting with Hugo 0.90.x, Hugo Pipes can go right out to Cloudinary, pull down that 20-pixel-wide image, and instantly translate it into Base64-encoded data that fits right into my HTML. Since this is all happening during the site-building process, visitors not only *don’t* encounter a slowdown in the image-handling but also *don’t* make that extra HTTP request for a separate file.

Rather than bore you with the entire shortcode, given that I just got through doing that [a few posts ago](/posts/2021/11/go-big-go-home-sequel), I’ll simply show you the parts that changed.[^4]

```go-html-template
{{/* These two variables are new */}}
{{- $LQIPdata := printf "%s%s%s" $cloudiBase $LQIPholder $src -}}
{{- $LQIP_get := resources.Get $LQIPdata -}}

<style{{ if eq .Site.Params.Host "CFP" }} nonce="DhcnhD3khTMePgXw"{{- end -}}>.imgB-{{ $imgBd5 }} {background: url(data:image/jpeg;base64,{{ $LQIP_get.Content | base64Encode }}); background-size: cover; background-repeat: no-repeat;}</style>
<div class="{{ $divClass }} bg-center" aspect-ratio="{{ $width }} / {{ $height }}">
```

Here’s what’s going on:

- The `$LQIPdata` variable declaration uses concatenation to supply the Cloudinary-based LQIP’s URL.
- `$LQIP_get` is where the Hugo 0.90.x magic comes in, as the newly souped-up Hugo Pipes functionality `Get`s that LQIP directly from Cloudinary.
- In the `style` tag, `$LQIP_get.Content | base64Encode` converts the result of `$LQIP_get` into Base64-encoded data and uses it as the `style`’s `background`.[^5]

For something that I originally thought wouldn’t ring my chimes, this new power in Hugo Pipes turns out to be pretty frickin’ amazing. Whether I’ll find additional uses for it is unclear, but I already consider it a winner. And I can only imagine the cool stuff that it will enable for the real experts out there in the Hugo-verse.

[^1]:	That is, as compared to that of the regulars in the [Hugo Discourse forum](https://discourse.gohugo.io).

[^2]:	For more on how I started using Cloudinary’s generous free tier to host this site’s images, please see also my post, “[Transformed](/posts/2020/07/transformed).”

[^4]:	You also may wish to refer to “[Gems in the rough #11](/posts/2021/11/gems-in-rough-11),” in which I explained the reason for that `style` stuff in the code segment.

[^5]:	If you compare this to the earlier version of the shortcode, please note that I’m using `background` here rather than the previous `background-image`. That’s because, this time, the HTML is calling to data rather than an image file. Also, I put the `background-size` and `background-repeat` information in the `style`, rather than using previously set utility classes, because—well, it just worked better that way, and for reasons I honestly don’t know.
