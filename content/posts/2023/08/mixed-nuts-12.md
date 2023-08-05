---
title: "Mixed nuts #12"
description: "A number of things that are bouncing around these days inside my somewhat reasonable facsimile of a brain."
author: Bryce Wray
date: 2023-08-05T10:38:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
imgs:
- TP-Link-Archer-300-router-crop-2023-07-29_2403x1905.jpg
---

It's been nearly a year since the [most recent entry](/posts/2022/08/mixed-nuts-11/) in this kinda-sorta-series of posts that cover multiple subjects, some nerdy and some not. That's not why I'm issuing this one. Instead, my teeny little kernel of a mind has been tossing around thoughts on a few somewhat divergent topics, and I decided to air some of those thoughts. As one does.

<!--more-->

----

Lately, I've been forcing myself to use Firefox rather than Chrome, chiefly because of the [ongoing drama](https://news.ycombinator.com/item?id=36876301) over Chromium's Web Environment Integrity (WEI) API.[^Safari] I doubt seriously that all we anti-WEI nerds' protests will change any of the minds that need to be changed, but using Chrome right now messes with my *own* mind.[^Electron]

[^Electron]: And, yeah, I do know that, because of [Electron](https://www.electronjs.org/), Chromium is mixed up with many other things I use daily --- notably, VS Code --- but, in just about each such case, I don't have the same choice. Selecting one's daily-driver browser is quite another matter.

[^Safari]: Since I've often identified myself as an unapologetic Apple fanboy, you might wonder why I don't go with Safari, instead. The main problem is that Safari isn't, and never will be, compatible with [xBrowserSync](https://www.xbrowsersync.org/), on which I rely heavily with both Chrome and Firefox; besides, truth be known, I prefer the tabs-handling on Firefox. Obviously, I **test** all my web dev work on Chrome, Firefox, and Safari; but, unless/until the Chromium project cans WEI, my daily driver will be Firefox, except in those fortunately rare cases where I must use a poorly designed website that works with only Chrome. (And don't get me started on Brave, in case you're wondering why I don't use that browser for a *non*-WEI Chromium experience. Ain't happenin'. Long story.)

*As I [implied (?) recently](/posts/2023/07/good-news-cloudcannon-eleventy/), Netlify is no longer all that friendly to the Jamstack community that it essentially created from scratch a number of years ago; so I encourage you to read "[My Journey Away from the JAMstack](https://www.spicyweb.dev/farewell-jamstack/)," [Jared White](https://www.jaredwhite.com/)'s excellent op-ed on this and other related subjects. Having used the Jamstack since 2018 and intending to keep right on doing so as long as I can, I found myself nodding in agreement --- often sadly so --- with a great many of White's points.*

Fellow [Hugo](https://gohugo.io) users: in case you've somehow missed the info about it, the 2023 edition of the free, all-virtual **HugoConf** is happening in a few weeks. Register [here](https://hugoconf.io). You may also want to check my [writeup of last year's first-ever HugoConf](/posts/2022/07/impressions-hugoconf-2022/).

*Before deciding to upgrade to a new Mac a few weeks ago, I thought for a while about perhaps converting the old Mac to Linux, instead. I now know that wouldn't have worked all that well, after all. As I wrote in a footnoted update to my [post about that upgrade](/posts/2023/07/making-good-move/): "A few weeks later, once I had the new Mac, I did try Linux on the old Mac through several 'Live Drive' test runs. Turns out that several Linux distros don't play nicely with the old Mac's sound system* --- i.e., *to the point of producing no audio output whatsoever --- and my resulting research indicated a solution might be pretty messy *and* not at all stable."*

Back when I was waiting to receive the new Mac and its associated peripherals, I decided to see what internet connectivity options currently existed for my location. We'd been on a symmetrical 500 Mbps connection for several years, and I'd heard our provider, Frontier, was offering higher-bandwidth connections in our area. I assumed the next step or two up might cost more than I wanted to pay, but thought it wouldn't hurt to know the price. To my pleasant surprise, I learned that our account was eligible to move up to symmetrical 2.5 Gbps (or, as Frontier calls it, "2 Gig") but for considerably **less** per month than what we'd been paying for 500 Mbps. Needless to say, I told them, "Yes, please."

*However, when we got the service installed, its included for-rent router left somewhat to be desired. I now had a Mac with a 10 Gb Ethernet port, but the [eero Pro 6E](https://eero.com/shop/eero-pro-6e) that comes with Frontier's "2 Gig" service has only a 1 Gb Ethernet output. A few days of research later, I bought my own router to take fuller advantage of what the Frontier fiber was providing. I picked a [TP-Link Archer AXE300](https://www.tp-link.com/us/home-networking/wifi-router/archer-axe300/) and, holy cow, what a difference![^YTTV] (You might want to see my [AXE300 review on Amazon](https://www.amazon.com/gp/customer-reviews/R3E18AL43BRSOQ/ref=cm_cr_dp_d_rvw_ttl?ie=UTF8&ASIN=B0BCWBCY34).) I do concede that the AXE300 looks a bit like a drone* (below)*, so perhaps it's fortunate that it stays, usually behind a shut door, in what passes for my home office. I, for one, think it's actually somewhat cool-looking, but what do I know?*

[^YTTV]: Over and above the full wired goodness that my Mac now gets, there's also the matter of the strong WiFi signals that the AXE300 pumps throughout our house. Here's one example. With Frontier's 500 Mbps service and the (formerly) supplied [Arris NVG468MQ router](https://www.modemguides.com/shop/arris-nvg468mq/) located in the same place that the AXE300 now occupies, our living room TV's WiFi connection sometimes dropped well below 10 Mbps, as depicted in YouTube TV's ["Stats for Nerds" display](https://lifehacker.com/how-to-use-youtubes-stats-for-nerds-1846125645). This caused plenty of pixelation, "spinning-circle-icon" buffering aggravations, and so on. Even once I got the 2.5 Gbps service, the included eero Pro 6E router could deliver no better than about 40--50 Mbps (and sometimes quite a bit less) to the TV. Now, with the AXE300, the TV generally stays well above 60--70 Mbps and, on occasion, jumps considerably above *100* Mbps --- which, since the TV has only a 10/100BASE-T Ethernet port, means it's sometimes getting a signal over WiFi that's better than it'd be getting with a *wire*. Freakin' amazing.\
\
By the way: our iPad Pro, also a living room fixture, [has WiFi 6E compatibility](https://support.apple.com/kb/SP882?locale=en_US), so you can correctly assume it's getting a *huge* benefit out of the strong WiFi 6E signal that the AXE300 delivers --- *e.g.*, download speeds consistently above 1 Gbps. (Probably because it *is* WiFi, after all, and there are a number of walls and doors between the AXE300 and the iPad, the upload speeds are "only" around 350--500 Mbps.) *Also* freakin' amazing.

![A TP-Link Archer AXE300 router sitting on a desktop](TP-Link-Archer-300-router-crop-2023-07-29_2403x1905.jpg "Cloudinary")
