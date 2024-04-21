---
layout: privacy
title: "Privacy policy"
description: "Information regarding this site and its vendors."
author: Bryce Wray
date: 2020-08-02T09:00:00-05:00
---

This site and its owner **do NOT** store your personal information **in any way**. It neither deposits nor reads cookies, and leaves only one small setting in [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to retain your light-/dark-mode viewing preferences for any future visits you make to the site.[^switch]

[^switch]: See also "[It's tri-state switch time](/posts/2024/01/its-tri-state-switch-time/)."

In addition, the site uses certain **external services**, each of which has its own privacy policies and methods of complying with applicable privacy regulations.

## Cloudflare

This site is hosted on [Cloudflare Pages](https://pages.cloudflare.com) and is configured to use Cloudflare's Web Analytics tool, which [Cloudflare claims](https://blog.cloudflare.com/privacy-first-web-analytics/) doesn’t track individual users and doesn’t leave cookies.<!-- Additionally, any non-self-served web fonts on this site are provided by [Cloudflare Fonts](https://blog.cloudflare.com/cloudflare-fonts-enhancing-website-privacy-speed/), a service which processes Google Fonts not only to enhance performance but also to keep the fonts from violating your privacy --- [as they would if served by Google](/posts/2020/08/google-fonts-privacy/).-->

## giscus

The site's [giscus](https://giscus.app) commenting system, which is based on the [GitHub Discussions search API](https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions#search), performs no tracking.

## Mastodon

This site reproduces [Mastodon](https://join.mastodon.org) toots as purely static text and downloaded images with no tracking involved. Each toot is linked to its original location on the applicable Mastodon instance.

## YouTube

This site uses [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) to provide [YouTube](https://youtube.com) embeds that respect your privacy.[^Sia]

[^Sia]: I based this on Sia Karamalegos's article, "[Faster YouTube embeds in Eleventy](https://sia.codes/posts/lite-youtube-embed-eleventy/)" (although my site <span class="nobrk">uses Hugo</span>).
