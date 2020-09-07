---
layout: layouts/posts/singlepostherofit.11ty.js
tags: post
title: On Edge
subtitle: Ch-ch-ch-ch-Chromium
description: "Microsoft’s decision about Edge is important on many levels."
author: Bryce Wray
date: 2018-12-07T19:35:00
# lastmod
discussionId: "2018-12-on-edge"
featured_image: MS-Edge-logo-and-bkgd_1920x1080.jpg
featured_image_width: 1920
featured_image_height: 1080
featured_image_alt: Logos for Microsoft Edge and Chromium
featured_image_caption: |
  <span class="caption">Images: <a href="https://www.deviantart.com/">DeviantArt</a>; <a href="https://www.chromium.org/">The Chromium Projects</a></span>
---

Earlier this week, there were [reports](https://www.windowscentral.com/microsoft-building-chromium-powered-web-browser-windows-10) that Microsoft was going to dump the [EdgeHTML engine](https://en.wikipedia.org/wiki/EdgeHTML) that has powered its [Edge browser](https://www.microsoft.com/en-us/windows/microsoft-edge) since its introduction in the summer of 2015, when Windows 10 also debuted. Yesterday, [Microsoft officially confirmed](https://blogs.windows.com/windowsexperience/2018/12/06/microsoft-edge-making-the-web-better-through-more-open-source-collaboration/) that it’s moving toward basing Edge on Chromium and, thus, on the same [Blink engine](https://www.chromium.org/blink) as one finds under the hood in Chrome.

In short: soon, making something work and look a certain way on the [runaway market leader](https://en.wikipedia.org/wiki/Usage_share_of_web_browsers), Chrome, should assure it also works and looks the same in Edge. In theory, at least, that should simplify things for web designers and web devs. I emphasize: _in theory_. More on that in a little bit.

While Edge [originally was supposed to be standards-compliant](https://www.theregister.co.uk/2015/07/20/microsoft_edge_good_for_web_sucky_standards/), it hasn’t quite kept up with the other guys as standards change and performance improves. That’s true partly because, unlike those other browsers with their frequent updates, Edge generally gets major updates only twice a year—when a new version of Windows 10 emerges from Redmond. That, too, is changing. Once this transition to Chromium-based development is complete, Edge will no longer be tied to Windows 10 features updates and, therefore, should get updated as often as needed to keep up. This, of course, presumes Microsoft intends to do that; for now, let us assume that it does.

Perhaps the most surprising part of the news for some readers was that, as a result of this uncoupling, Edge will no longer be Windows 10-only but, in fact, will be made available also for users of Windows 7, Windows 8, and even macOS. The timing of the latter, in particular, remains to be seen. But, given how many enterprise customers are still using Windows 7, that potentially could be a very big deal, _if_ (very big “if”) Microsoft makes a major effort to convince those customers that it’s really worth it to switch.

(Please note that these changes refer only to desktop versions of Edge. None of this information affects the Edge browsers on iOS and Android. Any web browser that Apple allows on the iOS App Store [has to be based on Webkit](https://www.howtogeek.com/184283/why-third-party-browsers-will-always-be-inferior-to-safari-on-iphone-and-ipad/), as is iOS’s native browser, Safari; and the Android version of Edge already is [based on Blink](https://www.zdnet.com/article/edge-in-name-only-android-and-ios-web-browser/), as is Android’s native browser, Chrome.)

## Your point is&nbsp;.&nbsp;.&nbsp;. ?

Since the news broke and, especially, since Microsoft confirmed it, I have seen several well-thought-out articles about the change. I especially recommend that you check out [this one](https://ferdychristant.com/the-state-of-web-browsers-f5a83a41c1cb) and [this one](https://love2dev.com/blog/project-anaheim/). You may also want to read the Mozilla Foundation’s [obviously Firefox-oriented take](https://blog.mozilla.org/blog/2018/12/06/goodbye-edge/).

And, yes, I do have a few thoughts about all this, partly in reaction to _others’_ comments and partly just on my own.

## Back to a too-few-cooks web?

One of the most immediate strains I saw in the reactions was an almost visceral recoil at the news, essentially along the lines of: “Oh, no, the bad old days are coming back.”

Those expressing this view compared it to the [late 1990s](https://en.wikipedia.org/wiki/Browser_wars#First_Browser_War:_1995-2001), when one often would see sites bearing logos that said things like “Best viewed in [Netscape Navigator](https://www.engadget.com/2014/05/10/history-of-netscape/)” or “Best viewed in Internet Explorer.” The lack of compliance with browser standards—partially due to browser-makers’ understandable impatience with the pace of those standards’ development—made it a hit-or-miss proposition whether a site you wanted to view would be OK on the browser you’d chosen. And, with Internet Explorer built into Windows to an extent that it would eventually [become a key part of an antitrust suit](https://www.nytimes.com/2000/04/04/business/us-vs-microsoft-overview-us-judge-says-microsoft-violated-antitrust-laws-with.html), IE finally won that particular war.

So, why the comparison? Because, at this writing, the Blink-powered Chrome has a mammoth share of the worldwide browser market, just as IE did around the turn of the century. The meager showing that Webkit has, by comparison, would dwindle nearly to non-existence were it not for all those iOS devices out there; and the [Gecko engine](https://developer.mozilla.org/en-US/docs/Mozilla/Gecko) used in Firefox is fading at what that browser’s adherents consider to be an alarming rate. So, with Edge now adopting Blink as its engine, too, that means one particular engine will be even closer to the domination that IE once had.

Remembering those “IE is the web” unpleasant times all too well, I share some of the concerns that others have expressed concerning the possibility of Blink hegemony. **However**: while the Netscape _vs._ IE battle of long ago involved dueling _non_-compliance with standards, there now are robust HTML and CSS standards (advanced by equally robust groups) with which browser manufacturers seem determined to maintain compliance.

Of course, companies like Google, Microsoft, and Apple contribute a lot of money and resources to those standards groups, so it can be argued that there’s already been a “takeover” and, as a result, we little people will have to hope these big kahunas continue to believe it’s in their respective interests to maintain that support. I think they will, not out of the goodness of their hearts but rather due to sheer greed. The web was only in its infancy from a money-making standpoint when IE killed Netscape; but, now, because of the need to keep trillions of e-commerce dollars flowing smoothly, there is far too much money to be made through browsers’ and standards’ being more or less in agreement. With their respective business models where the web is concerned, these giant corporations should be especially motivated to stay the course.

I hope, I hope.

## Easier web design and dev work?

One of the other reactions to this news that I’ve noted, especially from among some [web devs](https://www.reddit.com/r/webdev/) and [web designers](https://www.reddit.com/r/web_design/) on Reddit, was a feeling that this would simplify their jobs somewhat, especially given the aforementioned tendency of Edge to lag behind the other browsers where feature updates are concerned. Now, so some felt, they could worry about one fewer engine, one fewer browser, when designing and developing for the web.

Well, ahem, not quite. And this would be true even if none of this news had happened.

Only in certain, isolated cases where you _absolutely know_ which browser(s) your visitors will be using is it wise for you to design and develop for only one or two browsers—and browser versions. In particular, if your content is B2B-targeted, you need to accommodate even stuff like IE. Many corporate IT departments firmly lock down their users to not only older versions of Windows but also IE—and not always even the latest version thereof (IE 11, which still comes with Windows 10). If you want to reach those users, you have to design and develop for them, too.

Supporting multiple browser engines—even if there is a Really Big Dog engine among them that’s about to get even bigger—ain’t always fun, but it goes with the territory; and I firmly believe it will continue to do so, especially for sites that are commercial in nature.

## Edge case

Given that Microsoft’s engineers were [only recently spotted getting involved in Chromium](https://www.windowscentral.com/microsoft-engineers-contributing-development-chrome-windows-10-arm), it’s probably unlikely we’ll see the Chromium-based Edge in the wild for some time; but it’s coming, and perhaps sooner than we think. After all, we don’t _know_ that they haven’t been working on it in some [“skunkworks” project](https://en.wikipedia.org/wiki/Skunkworks_project) inside Microsoft. Only when it does begin to appear will we start to know whether it matters—which leads to one more point. 

There’s one final observation I’ve read and with which I agree. The simple truth is that, in the end, the whole Edge-to-Blink transition may be a big _meh_. If the only thing that the new Edge offers is the “Edge look” on top of Chromium’s guts, it’s unclear what this browser’s [USP](https://whatis.techtarget.com/definition/unique-selling-point-USP) would be.

Why would a Chrome user or Firefox user switch?

What would compel someone starting with a fresh new Windows PC to choose the new Edge over Chrome, which is as synonymous with the web today as IE was fifteen years or so ago?

Those are the kinds of questions with which Microsoft will be dealing in the months ahead. Its answer before was “standards,” and that ended up being not enough. We’ve all heard the joke about the current Edge (and, before it, IE): it’s what Windows users use to download Chrome. Only the next few months will tell us whether that’s changed.