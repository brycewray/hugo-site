---
title: "Privacy policy"
description: "Information regarding this site and its vendors."
author: Bryce Wray
date: 2020-08-02T09:00:00-05:00
---

This site and its owner **do NOT** store your personal information **in any way**. However, the site does use certain **externally hosted** services, each of which has its own privacy policies and methods of complying with applicable privacy regulations.

## Cloudflare

This site's traffic goes through [Cloudflare](https://cloudflare.com) and is configured to use its Web Analytics tool, which [Cloudflare claims](https://blog.cloudflare.com/privacy-first-web-analytics/) doesn’t track individual users and doesn’t leave cookies.

## Fathom Analytics

This site uses [Fathom Analytics](https://usefathom.com), which [does not store your personal data in any way](https://usefathom.com/blog/anonymization). Please refer also to my article, "[Fathom Analytics: count on it](/posts/2020/06/fathom-analytics-count-on-it/)."

## giscus

The site's [giscus](https://giscus.app) commenting system, which is based on the [GitHub Discussions search API](https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions#search), performs no tracking.

## Google Fonts

When I learned that the use of [Google Fonts](https://fonts.google.com) *served from* Google will transmit a visitor's apparently **not** anonymized IP address[^Issue1495] to Google, I quit using this product (and suggesting to others that they use it) and, instead, served from my own site any typefaces that aren't part of the so-called "[system fonts stack](/posts/2018/10/web-typography-part-2/)."

[^Issue1495]: For the discussion that convinced me to go this route after my initial skepticism about its necessity, see the Google Fonts GitHub issue, "[GDPR compliance](https://github.com/google/fonts/issues/1495)."

## Mastodon

This site reproduces [Mastodon](https://join.mastodon.org) toots as purely static text and downloaded images with no tracking involved. Each toot is linked to its original location on the applicable Mastodon instance.

## Twitter

This site reproduces tweets as purely static text and downloaded images with no [Twitter](https://twitter.com) (or other) tracking involved. Each tweet is linked to its original location. Any Twitter-based image --- including the avatar --- that's included with a static tweet does include a Twitter cookie, but **no** trackers.

## YouTube

This site uses [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) to provide [YouTube](https://youtube.com) embeds that respect your privacy. For details concerning how this works, see Sia Karamalegos's article, "[Faster YouTube embeds in Eleventy](https://sia.codes/posts/lite-youtube-embed-eleventy/)," on which this site's related templating is based.
