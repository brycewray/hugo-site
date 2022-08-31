---
title: "Thinking about syncing"
description: "Some opinions I’ve formed while doing a semi-deep dive into cloud sync on macOS."
author: Bryce Wray
date: 2022-02-04T10:03:00-06:00
---

I’ve spent the last few weeks researching cloud [sync](https://en.wikipedia.org/wiki/File_synchronization) for my own setup, which is macOS-based. Here are some of my conclusions, just in case they may be of use to anyone else.

---

**If you don’t need to share any files with anyone or any other device, you don’t truly need cloud sync**. If sync functionality comes built into your OS the way [iCloud](https://www.apple.com/icloud/) is part of macOS, fine; but make use of it only if you just want to share stuff (including photos, I should note). It truly serves no other good purpose.

Of course, the previous consideration has nothing to do with **backup** — which *everyone* should do.

Love it or hate it, **[Dropbox](https://dropbox.com) is still the flagship cloud sync provider**. It’s still faster, its technology is still superior to the others’, and it works better with fewer quirks. **That said**, it’s too expensive; it bugs you too often with requests to do something (say, to upgrade to a more expensive Dropbox subscription level); it’s not nearly secure enough; and I suspect the publicly traded Dropbox is spending more time trying to please Wall Street than continually improving its offerings.

I do use Google Drive, but almost entirely because it’s the only way, through Google Photos, that my wife and I can automatically share our iPhone-taken photos as one big library we can view. (Still waiting for Apple to provide a workable solution for iCloud-based photos; not expecting one any time soon.) **Taken strictly as a *file* sync service for macOS, Google Drive — [particularly with the changes Google introduced in 2021](https://gizmodo.com/everything-you-need-to-know-about-google-drives-big-cha-1847421108) — leaves a lot to be desired**, especially when compared to Dropbox.

**[OneDrive](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage) on a Mac is just screwed up**. (It’s fine on Windows, however.) Unless you utterly have to use it because of the need to share files with Windows users and/or you already have it as part of a [Microsoft 365](https://www.microsoft.com/en-us/microsoft-365) subscription (formerly Office 365) for use of Microsoft Office products, save yourself the trouble of trying to make OneDrive and macOS play nicely together. Life is too short.

Although Apple keeps making commitments to improving its services portfolio, it still has a long way to go in making iCloud something that could win if it *weren’t* part of the big Apple sandwich for iOS and macOS. Its file-saving methods are opaque, and its performance is often weird at best and non-functional at worst. **In a fair fight with other cloud sync providers for the hearts and minds of iOS and macOS users, iCloud wouldn’t survive long**.

Fawning reviews of certain lesser known cloud sync providers are ridiculously ubiquitous, for a very good reason: **they do a [bleep]-ton of affiliate marketing**. This explains much of the love you see expressed for [Sync.com](https://sync.com) and [pCloud](https://pcloud.com), in particular. Yes, Sync.com’s end-to-end encryption and pCloud’s speed are wonderful, but you still can do much better than either. Don’t bother with these providers unless you like dealing with Sync.com’s slowness and pCloud’s quirkiness (don’t get me started). And I would add that most if not all other second-tier cloud sync providers, regardless of the affiliate-pushed reviews you’ll see for them, are likely not worth your time, either, for reasons which vary by provider.

---

Finally, I can also give some advice on a somewhat related subject. There are a few apps out there which allow you to mount a cloud sync service’s storage as a networked pseudo-drive, rather than sync with files that live on your device’s local storage. The idea is that you can store a lot more stuff than your local storage will allow, since files so stored are *only* in the cloud. I tried three such apps: [CloudMounter](https://cloudmounter.net), [Mountain Duck](https://mountainduck.io), and the promising but beta-level-buggy [Strongsync](https://expandrive.com/strongsync/). While each has its use case and is geekily interesting, **each also has just enough quirks that I’d fear for the safety of my files**.[^1] After all, each cloud sync service expects you to use *its* app, not a third-party app, to deal with whatever you store on the service; guess how little help you’ll get from that service if one of these apps FUBARs your content on the service.

[^1]:	Some of the quirks are just plain annoying, such as how CloudMounter’s and Mountain Duck’s otherwise intriguing encryption features change files’ modification dates. Not cool.
