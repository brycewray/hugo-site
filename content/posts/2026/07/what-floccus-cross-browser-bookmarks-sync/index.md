---
title: "What the Floccus?!? — or, another look at cross-browser bookmarks sync"
description: "My new choice turns out to be not new at all."
author: Bryce Wray
date: 2026-07-14T14:28:00-05:00
# draft: true
# initTextEditor: MarkEdit # default --- change if needed
---

I wrote [nearly three years ago](/posts/2023/08/cross-browser-bookmarks-sync-bookmacster/) about wanting to simplify the chore of keeping bookmarks synchronized across multiple web browsers. While I've tried various possible solutions, I'm now on another. And, to my embarrassment, it seems actually to have been around well before some of the others I'd tried; I just hadn't heard of it until recently. In case you haven't, either, I invite you to meet [Floccus](https://floccus.org/).

<!--more-->

## Our story so far . . .

Before I tell you about Floccus, I'll rehash my aforementioned 2023 post about syncing bookmarks.

Up to that point, I had long been using [xBrowserSync](https://github.com/xbrowsersync/app) for this purpose, but that choice had grown increasingly unsatisfactory for a variety of reasons, not the least of which was that xBrowserSync was no longer under active development. That sadly remains true: the latest version is still v.1.5.2 from **mid-2020**. Making this worse is that, since then, the whole [Manifest V3 drama](https://developer.chrome.com/docs/extensions/develop/migrate) has ensured that any browser extension of such vintage probably won't work with any reasonably up-to-date Blink-based browser (*e.g.*, Google Chrome, Microsoft Edge, Brave, and Opera, among many others). Eventually, that's likely to be the case, also, for Gecko-based browsers like Firefox and its numerous forks.

I'd also hoped to include Safari in the sync, which wasn't possible with xBrowserSync chiefly because of [Safari's limitations concerning extensions in general](https://www.howtogeek.com/safari-is-missing-your-favorite-extensions/). So, after briefly trying the venerable and highly capable [BookMacster](https://sheepsystems.com/products/bookmacster.html), I wound up using [Raindrop.io](https://raindrop.io). It's a different kettle of fish altogether, in that it stores bookmarks in its own app and UI rather than working with a browser's typical bookmarks-storage process.

Although that served my needs well enough for nearly three years, I finally realized a few weeks ago that the Raindrop.io approach, while certainly quite competent and usable, just wasn't my cup of tea. In the end, what I *still* wanted was what had originally attracted me to xBrowserSync in the first place: the ability to make all the browsers I use --- well, at least, the Blink-based browsers and Firefox, since Safari was and is a lost cause on this front --- share in their *own* storage and bookmark bars exactly the same bookmarks, including all the numerous, multi-leveled folders thereof, I'd built over the years.

## What the Floccus?!?

And, then, I learned of Floccus. It's a [very actively developed FOSS project](https://github.com/floccusaddon/floccus), appears to have been around since the mid-2010s (!) even though it was new to *me* for some embarrassing reason, and --- so far --- has worked very well for me.

Mind you, "for me" is referring to desktop browsing, because I care very little about bookmark-syncing involving mobile devices; as long as I can sync across Blink-based and Gecko-based browsers on multiple desktop OSs, I'm good. However, for those of you who *do* want to sync bookmarks with mobile devices, Floccus offers a slightly different, Raindrop.io-ish path through its apps for iOS and Android.[^iOSMac]

[^iOSMac]: In fact, at least one user has even tried running the Floccus iOS app on Apple Silicon Macs as a way of melding Floccus functionality with the desktop version of Safari, albeit with [only limited success](https://github.com/floccusaddon/floccus/issues/2040).

As for where your bookmark storage will "live" for syncing purposes, Floccus works with various self-hosted platforms as well as Google Drive and Dropbox. It even can use a Git repository, whether only locally hosted or on GitHub, GitLab, and such. Floccus also can sync open browser tabs, but I have no need to try that capability.

The following video, from the YouTube channel of Floccus creator [Marcel Klehr](https://github.com/marcelklehr), gives you a brief overview (and I do apologize for its somewhat annoying narration-by-AI, something that's increasingly hard to avoid out there in WebVideoLand):

{{< lite-youtube videoTitle="Floccus - Sync bookmarks privately everywhere" videoId="DFE3MFYT1jM" >}}

## Relief for an admitted bookmark hoarder

As I noted above, Floccus's tab-syncing powers don't interest me; this is mainly because I'm not a tab hoarder, unlike what seems to be true for many folks I encounter online.[^shudder] I might, however, be accurately termed a *bookmark* hoarder. My growing collection of bookmarks, and their incorporation within the bookmark bars of my daily-driver browsers, combine to form a must-have aspect of how I use the web. Floccus makes that just a little easier, and that's proving to be enough to keep me happy with it. Perhaps you will find it an equally satisfying addition to your own browsing toolbox.

[^shudder]: Reading others' comments about keeping hundreds or thousands of open browser tabs, much less for weeks or months on end, gives me the same kind of inner shudder as when I see a screenshot of an email app with a badge indicating the user has thousands of unread emails. Yikes.
