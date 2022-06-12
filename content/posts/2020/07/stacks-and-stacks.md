---
#layout: singlepost
tags:
- post
- code
title: "Stacks and stacks"
description: "Comparing the site’s “tech stacks,” one year apart."
author: Bryce Wray
date: 2020-07-05T10:40:00-05:00
lastmod: 2022-04-03T21:35:00-05:00
discussionId: "2020-07-stacks-and-stacks"
featured_image: stones-stack-3841920_6000x4000.jpg
featured_image_width: 6000
featured_image_height: 4000
featured_image_alt: "A stack of smooth stones on a beach near an ocean"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/fotoblend-87167/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3841920">Willfried Wende</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3841920">Pixabay</a></span>

---

Thought I'd take this (U.S.) holiday weekend to do a brief comparison of this site's current "tech stack" with what I was using a year ago today. Since the site wasn't yet using `package.json`  in 2019, this is a little trickier than it would be otherwise, but I appear to have it reconstructed.

So, for your geeky pleasure, here goes nothing.

----

## Static site generator (SSG)

2019-07-05: [Hugo](https://gohugo.io) 0.55.6. At the time, I *thought* I was about to chuck Hugo for [Gatsby](https://gatsbyjs.org). [Didn't quite go that way](/posts/2019/07/why-staying-with-hugo/). For full details on my oft-shifting SSG loyalties --- the "Dance" --- in the latter half of 2019 in particular, see my [2019 year-end wrap-up](/posts/2019/12/sorta-strange-ssg-trip/).

2020-07-05: [Eleventy](https://11ty.dev) 0.11.0.

## OSs used for local dev

2019-07-05: macOS. iOS would join the mix only a few days later, thanks to [my adoption](/posts/2019/07/roger-copy/) of the superb [Working Copy](https://workingcopyapp.com).

2020-07-05: macOS, iOS.

## Website host

2019-07-05: [Netlify](https://netlify.com).

2020-07-05: [Vercel](https://vercel.com). My [most recent post](/posts/2020/07/goodbye-hello/) explains the process that led me to Vercel, with the actual switchover occurring just this past week.

## Repository in use

2019-07-05: `hugo_site_css-grid`.[^renamed]

[^renamed]: I've since renamed this repo `hugo_twcss` and [repurposed it](/posts/2020/07/beginners-luck/) as a Hugo starter set.

2020-07-05: `eleventy_solo`.

## Online repo host

2019-07-05: [Bitbucket](https://bitbucket.org).

2020-07-05: [GitHub](https://github.com).

## Repo's online status

2019-07-05: Private.

2020-07-05: Public.

## Local repo management tools

2019-07-05: [Sourcetree](https://www.sourcetreeapp.com/).

2020-07-05: [Fork](https://git-fork.com/) for macOS, [Visual Studio Code](https://code.visualstudio.com/), and --- when the mood strikes me --- just plain ol’ Git CLI commands in a terminal window.

## Primary text editor for posts

2019-07-05: [iA Writer](https://ia.net/writer/).

2020-07-05: *Same*.

## Primary text editor for coding and config

2019-07-05: Visual Studio Code.

2020-07-05: *Same*.

## Primary local terminal apps

2019-07-05: macOS's built-in Terminal app.

2020-07-05: [iTerm2](https://www.iterm2.com/) and Visual Studio Code.

## Domain registrar

2019-07-05: [Namecheap](https://namecheap.com).

2020-07-05: [Google Domains](https://domains.google.com).[^domains]

[^domains]: In fact, I started with Google Domains only in the last two weeks. I initiated the transfer of all my domains on June 22, and they'd moved successfully by June 28. (It takes a few days under *ideal circumstances*, folks, so **don't** wait until the last minute if a change of registrars involves anything time-sensitive.)

## Total posts on site

2019-07-05: 21.

2020-07-05: 69 (as of this one).

## Commenting platform

2019-07-05: [Talkyard](https://www.talkyard.io).

2020-07-05: [Webmentions](https://indieweb.org).

## Normal build length (secs.)

2019-07-05: 10--20.

2020-07-05: 45--60. Please understand that the difference is mainly in how much image processing I'm now doing (see next three items). If I were doing an apples-to-apples comparison, bare-bones Hugo to bare-bones Eleventy, Hugo would still be faster but not by *that* much.

## Build-time image processing

2019-07-05: None.

2020-07-05: `imgxfm.js` script, based on the [sharp](https://github.com/lovell/sharp) library.

## Serving responsive images?

2019-07-05: No.

2020-07-05: Yes.

## Auto-serving multiple image formats?

(In other words, am I sending .webp to [browsers that can handle it](https://caniuse.com/#search=webp) and .jpg and .png to those that can't?)

2019-07-05: No.

2020-07-05: Yes.

## Local image editors

2019-07-05: [Affinity Photo](https://affinity.serif.com/en-us/photo/) and [Affinity Designer](https://affinity.serif.com/en-us/designer/).

2020-07-05: *Same*.

## Site typography

2019-07-05: System fonts.

2020-07-05: *Same*. I did, however, spend about half of the year between these two configs using either (a.) fonts imported via the [npm Typefaces package](https://npmjs.com/package/typefaces/) or (b.) [Google Fonts](https://fonts.google.com/)-provided typefaces. I finally decided a couple of days ago to revert to [only system fonts](/posts/2018/10/web-typography-part-2/) after tiring of trying to compensate for the minor, but notable, performance hits that the other typefaces’ delivery methods imposed.[^zachFonts]

[^zachFonts]: I *am* aware there are ways to handle that, as [Zach Leatherman explained so well](https://www.zachleat.com/web/comprehensive-webfonts/) in 2016, but he obviously is ’waaaay smarter than I am and I don't have either the knowledge or guts to give the recommended methods a try. Maybe someday, but not now.

## Support for dark mode?

2019-07-05: No.

2020-07-05: Yes. See also [this post](/posts/2019/09/thinking-dark-thoughts/).

## Official site grandchildren *(OK, humor&nbsp;me)*

2019-07-05: None.

2020-07-05: [One](/posts/2020/03/welcome-sweet-little-early-bird/).
