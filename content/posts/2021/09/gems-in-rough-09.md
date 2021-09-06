---
layout: singlepost
title: "Gems in the rough #9"
subtitle: "Better video embeds, CFP improvements, “passtro” on Astro"
description: "A few more nerdy thoughts for SSG fans"
author: Bryce Wray
date: 2021-09-05T14:35:00-05:00
lastmod: 2021-09-06T10:28:00-05:00
discussionId: "2021-09-gems-in-rough-09"
featured_image: "gemstones-glass-1462395_4000x2667.jpg"
featured_image_width: 4000
featured_image_height: 2667
featured_image_alt: "Rough blue gemstone on a black background"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/qimono-1962238/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1462395">Arek Socha</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1462395">Pixabay</a></span>
---

Each entry in the "Gems in the rough" series is a collection of tips, explanations, and/or idle observations which I hope will be at least somewhat useful to those of you with websites built by [static site generators (SSGs)](https://jamstack.org/generators).
{.blueBox}

## Privacy-respecting YouTube embeds

Since it's highly unlikely you spend time perusing *any* website's privacy policy, much less *this* site's, I wanted to note here a little change I made to the [latter](/privacy) a few days ago. When I first posted the policy last year, it was pretty bare-bones because, frankly, I didn't yet understand how invasive certain items could be. Fortunately, that particular ignorance didn't last long; less than a week later, I added a "Notes about external services" section, which included the following:

> <span class="h3">Embedded videos</span>
>
> I no longer embed YouTube or other sites’ videos, since they can and do transmit personal information through cookies. In the two instances where I formerly did---“[Some curmudgeonish thoughts](/posts/2018/11/some-curmudgeonish-thoughts)” and “[Coherence and COVID-19](/posts/2020/03/coherence-covid-19)”---I replaced them with clearly identified links to their original locations, and footnoted each link with a reference and link to this privacy policy.

While it was satisfying to protect my visitors from those cookies, it was simultaneously galling that I no longer could provide the content enhancement that properly chosen video embeds can offer. And, yes, I later learned there's a (sorta-)no-cookies YouTube domain but, until recently, I was unaware there was a way to use it for what appeared to be a normal embed---*i.e.*, a video frame with an overlaid "play" button---without plenty of manual labor for which, at least until my [recent retirement](/posts/2021/09/transition), I simply didn't have time.

As a result, I was delighted a few weeks back when I happened upon "[Faster YouTube embeds in Eleventy](https://sia.codes/posts/lite-youtube-embed-eleventy/)" by [Sia Karamalegos](https://github.com/siakaramalegos/). While it was (as the title implies) concerned mostly with doing higher-performance video embeds, it also showed me a way to have those embeds *without* worrying about the cookies. Ms. Karamalegos's article described how to use the [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) package to provide just that. I promptly implemented her solution and was able to restore those two aforementioned YouTube video embeds, plus add any others in the future as I wish.

For example, adding the following to the [Markdown](https://daringfireball.net/projects/markdown) in a suitably configured [Eleventy](https://11ty.dev) site:

```twig
{% set videoTitle = "Every programming tutorial" %}
{% set videoId = "MAlSjtxy5ak" %}
{% include "layouts/partials/lite-youtube.njk" %}
```

.&nbsp;.&nbsp;.&nbsp;produces this embed of a short video which just happens to be one of my favorites because its sarcastic point is **so** spot-on:

{{< lite-youtube videoTitle="Every programming tutorial" videoId="MAlSjtxy5ak" >}}

I altered the code a little bit to add the disclaimer after each video, which I believe keeps this site in good shape where the [GDPR](https://gdpr-info.eu/) and other related privacy measures are concerned. I made this additional change after noting the concerns expressed in "[Embed YouTube videos without cookies](https://axbom.com/embed-youtube-videos-without-cookies/)" by [Per Axbom](https://twitter.com/axbom). In short: just using the (sorta-)no-cookies YouTube domain isn't enough; it's also necessary to advise your visitors that actually **playing** an embed from that domain, the domain name notwithstanding, **still** loads cookies.

Incidentally, this works in [Hugo](https://gohugo.io), too, and even more compactly in your Markdown content. Just create a Hugo [shortcode](https://gohugo.io/content-management/shortcodes/) with the same items that Ms. Karamalegos’s article prescribes for an Eleventy partial---with obvious adjustments for Hugo's [Go](https://go-lang.org)-based templating that I won't describe in this space---and insert it in your Markdown (here, the shortcode file is called *lite-youtube.html*, so we call it with `lite-youtube`):

```md
{{</* lite-youtube videoTitle="Every programming tutorial" videoId="MAlSjtxy5ak" */>}}
```

## Faster CFP builds

Cloudflare continues to make back-end changes in [Cloudflare Pages](https://pages.cloudflare.com) so it'll be a good place for one's static website to live. Until recently, the build process took far too long on each new push to a site's CFP-linked online repository, as [I noted in a previous "Gems in the rough" post](/posts/2021/08/gems-in-rough-08/#using-speedlify-to-compare-vendors).

The specific part of the process that racked up the biggest delay each time was the initialization of the build environment, typically taking at least two to three minutes on its own even before the build then proceeded to, um, **build** the site and then deploy it to the Cloudflare network. But some particular fix came into play around the middle of August, after which that segment of each build began clocking in at just around thirty to forty seconds. So, now, a total build time for one of my CFP-linked repos will usually be slightly over a minute.

While that's still about twice as slow as the same repo will build on [Vercel](https://vercel.com), apparently due to how Vercel caches previously uploaded content, the CFP folks are aware of that continuing disparity and say they're not done ramping up the build speed. Consider my eyes peeled. Speaking of which&nbsp;.&nbsp;.&nbsp;.

## “Passtro” on Astro for now

I've given two [recent](/posts/2021/08/gems-in-rough-08/) [mentions](/posts/2021/08/boy-oh-grandboy) to the interesting [Astro](https://astro.build) SSG project, which is still quite new and raw. Unfortunately, I realized that it's **so** raw, and changing so rapidly, that I can't keep up with it; so I'm going to take a pass on further work in Astro for the time being. It may also be that my admittedly limited skill set simply excludes me from Astro's targeted user base and, if so, that's absolutely fair. Be assured I have nothing but good feelings for this project and its wonderful community. I will remain a curious Astro-watcher and hope that, perhaps, I can rejoin its fold at some point.
