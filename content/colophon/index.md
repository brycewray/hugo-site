---
title: "Colophon"
description: "How I build this site."
author: Bryce Wray
date: 2024-06-02T11:38:00-05:00
# draft: true
---

Inspired by "[Slash Pages](https://slashpages.net/)," of which I first learned in Manuel "Manu" Moreale's "[Slashes](https://manuelmoreale.com/slashes)" (<span class="nobrk">2024-06-01</span>), this page describes how I build this site.

<!--more-->

This site has been online since September, 2018. I build and maintain it using the [Hugo](https://gohugo.io) static site generator. The site host is [Cloudflare Pages](https://pages.cloudflare.com). I do compatibility testing of the site on [Chromium](https://www.chromium.org/Home/)-based, [Webkit](https://webkit.org)-based, and [Gecko](https://developer.mozilla.org/en-US/docs/Glossary/Gecko)-based browsers, testing on screen sizes for both desktop computing and mobile devices.

The site's main typography changes from time to time as the mood (or guilt over making you download web fonts) strikes me, varying between either system fonts or a self-hosted variable web font, typically either Inter or Libre Franklin. On devices with screen sizes under 1024 pixels, I show only system fonts. I do this since those devices may be more likely to experience sub-optimal connectivity and thus would benefit from not having to download web fonts.

I style the site using bespoke CSS --- which I then process through either [Lightning CSS](https://lightningcss.dev) or [PostCSS](https://postcss.org) --- or [Sass](https://sass-lang.com) (also sometimes processed through PostCSS). The latter is always a tempting option because Hugo[^extended] works so well with it, while it takes some doing to make Hugo and Lightning CSS work together. I occasionally futz around with [Tailwind CSS](https://tailwindcss.com), especially when it comes out with some new features, but I seem inevitably to come running back to my own stuff because I keep running into edge cases --- yes, even on a simple site like this one --- for which TWCSS just isn't yet well-suited.

[^extended]: Note that only the *extended* version of Hugo has built-in Sass-compilation powers. That's why it's the only Hugo version I use, just in case.

I have spent many hours trying to make the site as accessible as possible, often using tools provided by [WebAIM](https://webaim.org/), a service provided by [Utah State University](https://usu.edu)'s Institute for Disability Research, Policy, and Practice. I strongly recommend other site owners refer to WebAIM and similar sites for help in this regard.

Similarly, the site functions very well either with or without JavaScript's being enabled in your browser, for those of you who prefer to browse JS-free. If you visit here with JavaScript disabled, the only abilities you'll lose are (1.) searching locally with Pagefind and (2.) changing the site's light/dark mode to suit you. In the former case, DuckDuckGo search serves as a backup; for the latter, the site will use your system's default light/dark setting.

Although I formerly used [Fathom Analytics](https://usefathom.com) (and am still still [affiliated](https://usefathom.com/ref/ZKHYWX) with it), I later decided the site's visitor count was too small to justify the expense, **although** I do miss it on those extremely rare cases where one of my posts goes semi-viral, which I can still detect through my use of limited but interesting Cloudflare's Web Analytics data. And, speaking of that, please also refer to my [privacy policy](/privacy/) for additional information.
