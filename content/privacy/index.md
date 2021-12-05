---
title: "Privacy policy"
description: "Information regarding this site and its vendors."
author: Bryce Wray
date: 2020-08-02T09:00:00-05:00
lastmod: 2021-10-21T09:02:00-05:00
---

This site and its owner **do NOT** store your personal information **in any way**. However, the site does use certain **externally hosted** services, each of which has its own privacy policies and methods of complying with applicable privacy regulations.

## Notes about external services

### Cloudflare

This site's traffic goes through [Cloudflare](https://cloudflare.com) and is configured to use its Web Analytics tool, which [Cloudflare claims](https://blog.cloudflare.com/privacy-first-web-analytics/) doesn’t track individual users and doesn’t leave cookies.

### Fathom Analytics

This site uses [Fathom Analytics](https://usefathom.com), which [does not store your personal data in any way](https://usefathom.com/blog/anonymization). Please refer also to my article, "[Fathom Analytics: count on it](/posts/2020/06/fathom-analytics-count-on-it)."

### Google Fonts

When I learned that the use of [Google Fonts](https://fonts.google.com) *served from* Google will transmit a visitor's apparently **not** anonymized IP address[^Issue1495] to Google, I quit using this product (and suggesting to others that they use it) and, instead, served from my own site any typefaces that aren't part of the so-called "[system fonts stack](/posts/2018/10/web-typography-part-2)."

[^Issue1495]: For the discussion that convinced me to go this route after my initial skepticism about its necessity, see the Google Fonts GitHub issue, "[GDPR compliance](https://github.com/google/fonts/issues/1495)."

### Twitter

I do not *embed* tweets, since doing so makes the embedded tweets transmit personal information through cookies. Instead, each tweet is shown as a screen capture linked to its original location.[^delTweet] For accessibility-respecting purposes, each such screen capture has a plain-text version of the tweet's content in its [ALT attribute](https://en.wikipedia.org/wiki/Alt_attribute).

[^delTweet]: The link is the last one I knew to be active, so a *deleted* tweet obviously won't appear at such a link.

### YouTube

This site uses [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) to provide YouTube embeds that respect your privacy. For details concerning how this works, see Sia Karamalegos's article, "[Faster YouTube embeds in Eleventy](https://sia.codes/posts/lite-youtube-embed-eleventy/)," on which this site's related templating is based.
