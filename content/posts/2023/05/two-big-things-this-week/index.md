---
title: "Two big things this week"
description: "I’ve been watching platform news from Cloudflare and browser news from Apple."
author: Bryce Wray
date: 2023-05-18T15:46:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Developments from Cloudflare and Apple have occupied my attention in large measure this week. In this quickie, I'll seek to explain why.

<!--more-->

## Changes at Cloudflare

This is ["Developers Week 2023" at Cloudflare](https://blog.cloudflare.com/welcome-to-developer-week-2023/), and it's included a couple of announcements that I consider significant to folks like me who manage static websites.

- [A few days ago](/posts/2023/05/cloudflare-pages-more-attractive-home-hugo-sites/), I wrote about getting advance warning of one new thing that was on the way: a long-anticipated build image overhaul, called "v2," for [Cloudflare Pages](https://pages.cloudflare.com). At the time, it was in a private beta test in which I was participating; but one of this week's Cloudflare announcements was that the [CFP v2 beta was now public](https://blog.cloudflare.com/moderizing-cloudflare-pages-builds-toolbox/).
- CFP has always rested atop [Cloudflare Workers](https://workers.cloudflare.com), but until now the Cloudflare UI treated the CFP and CFW platforms as largely separate. That's changing, with a [new "unified developer experience"](https://blog.cloudflare.com/pages-and-workers-are-converging-into-one-experience/) that debuted yesterday. Part of that change involves the Workers platform's Quick Edit feature, which now uses Microsoft's [VS Code for the Web](https://code.visualstudio.com/docs/editor/vscode-web) to work pretty much like (you guessed it) [Visual Studio Code](https://code.visualstudio.com), providing a major improvement over its more clunky predecessor. Thus, if you use one or more CF Workers to provide your CFP-based site with functionality it wouldn't have had otherwise, you'll likely find this a huge win.

In the case of this site, I'd already decided to move it to the CFP v2 beta environment once that test went public --- *i.e.*, once v2 was sufficiently stable that the folks at Cloudflare were willing to put it into the UI as an opt-in --- so that's exactly what I've done. With the improvements in the v2 image, I was able to switch my deployment process away from the [GitHub Action](https://github.com/features/actions)-based workflow I'd used for exactly [a year to the day](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/).[^shellScript]

[^shellScript]: For certain items, however, I did have to use a [shell script](https://github.com/brycewray/hugo-site/blob/main/cfp-build.sh) as part of the UI build command. Nonetheless, especially since GitHub's build process has grown increasingly sluggish for me in recent months, I think I still come out ahead this way as opposed to what I had with the GHA-based workflow.

As for the CFW aspect: while I greatly admire the new enhancements, I'd actually gone ahead with switching the site from a Worker (to impose caching headers and enforce a strict Content Security Policy) to a [Cloudflare Pages Function](https://developers.cloudflare.com/pages/platform/functions/) with the same capabilities and nearly the same code. Regardless of the new-and-improved CFW UI, I prefer having this code in my local repo, where I can edit and version-control it to my heart's content, similar to what I did during a [recent test](/posts/2023/03/headers-up-vercel-edition/) of [Vercel](https://vercel.com) [middleware](https://vercel.com/docs/concepts/functions/edge-middleware).

## Safari and native CSS nesting

With today's [release of macOS 13.4](https://www.macrumors.com/2023/05/18/apple-releases-macos-ventura-13-4/), all compatible Apple devices now have access to [Safari 16.5](https://webkit.org/blog/14154/webkit-features-in-safari-16-5/). (I believe iOS and iPadOS devices had received it earlier, but I could be wrong about that; in any event, Apple also dropped new versions of those devices' OSs today, too, and they all definitely have this version of Safari.) That's important because, following the [release last month of Google Chrome 112](https://developer.chrome.com/blog/new-in-chrome-112/), it means that the current versions of two of the Big Three browser engines --- Blink for Chrome/Chromium and Webkit for Safari --- support [native CSS nesting](https://drafts.csswg.org/css-nesting-1/).[^market]

[^market]: True, Chrome's share of the browser market is ridiculously massive, but don't discount the importance of Safari's Webkit. It's the only browser engine Apple currently allows on any iDevices, and they constitute a massive quantity of the world's phones, especially in North America and Europe.

So, now, it's up to Mozilla to bring native CSS nesting compatibility to the Gecko engine which enables Firefox; [this](https://bugzilla.mozilla.org/show_bug.cgi?id=1648037) is the bug report to watch, as Mozilla engineers try to catch up with their competitors.

**Update, 2023-06-18**: Based on subsequent progress described in that [bug report](https://bugzilla.mozilla.org/show_bug.cgi?id=1648037), it now appears Firefox **will** soon add native CSS nesting. This capability will be available behind a flag in **Firefox 115**, to be released <span class="nobrk">2023-07-04</span>; and it'll be turned on by default in **Firefox 116**, to be released <span class="nobrk">2023-08-01</span> (release dates from the [Firefox Release Calendar](https://wiki.mozilla.org/index.php?title=Release_Management/Calendar&redirect=no)).
{.box}
