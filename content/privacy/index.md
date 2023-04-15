---
layout: privacy
title: "Privacy policy"
description: "Information regarding this site and its vendors."
author: Bryce Wray
date: 2020-08-02T09:00:00-05:00
---

This site and its owner **do NOT** store your personal information **in any way**. However, the site does use certain **externally hosted** services, each of which has its own privacy policies and methods of complying with applicable privacy regulations.

## Cloudflare

This site's traffic goes through [Cloudflare](https://cloudflare.com)[^VMW] and is configured to use its Web Analytics tool, which [Cloudflare claims](https://blog.cloudflare.com/privacy-first-web-analytics/) doesn’t track individual users and doesn’t leave cookies.

[^VMW]: This is true whether the site is hosted on [Cloudflare Pages](https://pages.cloudflare.com) or [Vercel](https://vercel.com); in the latter case, the site uses [Vercel Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware), which [is a "white-labeled" use of Cloudflare Workers](https://news.ycombinator.com/item?id=29003514).

## Cloudinary

[Cloudinary](https://cloudinary.com) hosts and serves some of the images on this site. A [Cloudinary Support article](https://support.cloudinary.com/hc/en-us/articles/360020207811-Does-Cloudinary-Store-Any-Cookies-) says that your viewing of any such images involves no storage or use of your personal data.

## Fathom Analytics

This site uses [Fathom Analytics](https://usefathom.com), which [does not store your personal data in any way](https://usefathom.com/blog/anonymization). Please refer also to my article, "[Fathom Analytics: count on it](/posts/2020/06/fathom-analytics-count-on-it/)."

## Google Fonts

When I learned that the use of [Google Fonts](https://fonts.google.com) *served from* Google will transmit a visitor's apparently **not** anonymized IP address[^Issue1495] to Google, I quit using this product (and suggesting to others that they use it) and, instead, served from my own site any typefaces that aren't part of the so-called "[system fonts stack](/posts/2018/10/web-typography-part-2/)."

[^Issue1495]: For the discussion that convinced me to go this route after my initial skepticism about its necessity, see the Google Fonts GitHub issue, "[GDPR compliance](https://github.com/google/fonts/issues/1495)."

## Mastodon

This site reproduces [Mastodon](https://join.mastodon.org) toots as purely static text and downloaded images with no tracking involved. Each toot is linked to its original location on the applicable Mastodon instance.

## YouTube

This site uses [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) to provide [YouTube](https://youtube.com) embeds that respect your privacy. For details concerning how this works, see Sia Karamalegos's article, "[Faster YouTube embeds in Eleventy](https://sia.codes/posts/lite-youtube-embed-eleventy/)," on which this site's related templating is based.
