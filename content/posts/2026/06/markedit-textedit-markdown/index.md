---
title: "MarkEdit: a TextEdit that knows Markdown"
description: "Apple may never give us this answer to a long-standing itch; but, fortunately, someone else did."
author: Bryce Wray
date: 2026-06-20T16:21:00-05:00
# draft: true
# initTextEditor: MarkEdit # default --- change if needed
---

We macOS users have long been familiar with using Apple's included [TextEdit](https://support.apple.com/guide/textedit/welcome/mac) app for, as the name suggests, editing plain-text files. However, we macOS users who also like using [Markdown](https://daringfireball.net/projects/markdown) have found TextEdit lacking --- it can open and edit such files, of course, but it can't do Markdown-ish things in them --- and wished Apple would make it Markdown-savvy. While there's no indication Apple ever intends to do that, the good news is that there now is a FOSS app, [MarkEdit](https://github.com/MarkEdit-app/MarkEdit), which is essentially TextEdit that speaks Markdown. And that may well be good enough.

<!--more-->

The vast majority of my Markdown-editing endeavors over the last few years, especially for this website, have been spent in [iA Writer](https://ia.net/writer), and I suspect that will continue to be the case long-term.[^update] That said, I wrote this post mostly in MarkEdit, and found the experience to be a good one.

[^update]: Incidentally, as I write, iA Writer has just reached [v.8.0](https://ia.net/topics/search-to-navigate). To my surprise, I received the upgrade for free even though it's been *over seven years* since I bought the macOS version of iA Writer as v.5-something-or-other.

{{< img src="MarkEdit_screenshot_1920x1270.png" alt="Screen capture of MarkEdit application on macOS" rounds=true >}}

Other than its ability to be "Markdown-savvy TextEdit," another of MarkEdit's key advantages is that it's a native macOS app. To put that another way, it doesn't rely on [Electron](https://www.electronjs.org/) or any other bloated framework. This keeps it small (four MB as installed), light and quick, even on older Macs --- although it's mainly for newer ones, albeit with special, additional versions for macOS iterations from several years ago. MarkEdit also works, looks, and feels like a *real* macOS app. As its GitHub page explains:

> UI controls remain native to macOS in both aesthetics and behavior, including force-touch word lookup, inline predictions, and Writing Tools.

~~Oh, and for those like me who care about such things: it appears MarkEdit is *not* (yet?) vibe-coded. How long that will continue to be the case, I obviously can't know; but, for now, MarkEdit seems to be a human(s)-built endeavor.~~

**Correction**: I looked again at MarkEdit's GitHub repo and saw that multiple LLMs are in the [list of contributors](https://github.com/MarkEdit-app/MarkEdit/graphs/contributors). *[Sigh.]* My apologies for the mistaken and now stricken-through assumption above.
{.box}

Incidentally: to date, although the original TextEdit is on iOS/iPadOS as well as macOS, MarkEdit is macOS-only.

---

One other (and unrelated) item while I have your much-appreciated attention . . .

I've spoken here a number of times about how I converted my old Intel iMac to Linux. [Most recently](/posts/2026/03/mixed-nuts-17/), my Linux distribution of choice was the [Arch](https://archlinux.org)-based [CachyOS](https://cachyos.org), after I'd spent over two years with [Fedora](https://fedoraproject.org). But, while I still think CachyOS itself is pretty interesting, I've now reversed course and gone back to Fedora because of the [craziness](https://www.securityweek.com/atomic-arch-supply-chain-attack-hits-1500-aur-packages/) --- still ongoing as of this writing --- that we've seen in the [Arch Users Repository (AUR)](https://aur.archlinux.org) over the last few weeks. Yes, I knew and observed the correct procedures for safely using the AUR; and, besides, I really wasn't using the AUR all that much anyway (just two packages, one of which is [provided by no less than 1Password](https://support.1password.com/install-linux/#arch-linux)); but I simply felt better and safer in going back to Fedora. At my age, I'll gladly pass up a little performance for greater peace of mind.
