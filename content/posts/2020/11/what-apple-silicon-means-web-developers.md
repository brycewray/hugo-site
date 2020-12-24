---
layout: layouts/posts/singlepostherofit.njk
title: "What Apple Silicon means for web developers"
subtitle: "The Mac’s new world is amazing, but . . ."
description: "As Apple takes the Mac to the final frontier, here’s what web devs should consider."
author: Bryce Wray
date: 2020-11-20T16:25:00-06:00
#lastmod:
#draft: false
discussionId: "2020-11-what-apple-silicon-means-web-developers"
featured_image: Apple_new-macbookpro-wallpaper-screen_11102020_1984x1118.jpg
featured_image_width: 1984
featured_image_height: 1118
featured_image_alt: "Partially opened MacBook Pro laptop"
featured_image_caption: |
  <span class="caption">Image: <a href="https://www.apple.com/newsroom/2020/11/introducing-the-next-generation-of-mac/">Apple, Inc.</a></span>
---

It's common to see web developers using laptops and desktops that run [macOS](https://www.apple.com/macos/). The presence of the Apple logo on a web dev's computer, if not covered by seemingly uncounted numbers of stickers the dev has acquired during his or her travels (hey, remember when people actually *traveled* to developer events?), sometimes seems to be a safe presumption.

And why not? Since the web runs on [\*nix](https://en.wikipedia.org/wiki/Unix-like), there is a significant incentive to build websites while using an operating system that combines enormous user-friendliness with a \*nix-like foundation. (To be specific, macOS is based on [BSD](https://en.wikipedia.org/wiki/Berkeley_Software_Distribution), but that's another story.)

This choice of OSs has become considerably more interesting in recent days with the introduction of [Apple's first Mac models](https://support.apple.com/en-us/HT211814)---Mac Mini, MacBook Air, and the 13-inch version of the MacBook Pro---whose central processing units (CPUs) are created by Apple itself. And, while what we're seeing now constitute only the beginning of a transition from Intel-created CPUs to Apple Silicon, [it's clear the move is a *big* win](https://www.zdnet.com/article/apple-silicon-m1-is-everything-apple-promised-so-whats-next/).

The processors are enabling precisely the gains that Apple has promised ever since [announcing](https://www.apple.com/newsroom/2020/06/apple-announces-mac-transition-to-apple-silicon/) Apple Silicon-based Macs back in June. Compared to their Intel-based predecessors, these new Macs are tremendously faster, more power-efficient, and more RAM-efficient. They're even able to emulate Intel-optimized software so it runs at least as well as on the Intel-based Macs they're replacing, and often *better*.

So Apple Silicon-based Macs (which, for brevity's sake, I'll call *ASBMs* for the remainder of this piece) clearly are where macOS-friendly web devs should be spending their dollars going forward, right?

Well&nbsp;.&nbsp;.&nbsp;. perhaps not just yet, and certainly not as their *only* development hardware. Let's discuss.

## Not virtually all there

With all of this going for ASBMs, what could possibly go wrong?

For now, the missing puzzle piece for ASBMs where Mac-using web devs are concerned is a way to run *[virtualization](https://opensource.com/resources/virtualization)* apps---mainly, for running Windows.[^Linux]

[^Linux]: It helps for running [Linux](https://linux.org), too, if your site targets Linux users (although there are so many different Linux distributions, that can still get problematic); but, for desktop users, you're pretty well covered with just Windows and macOS.

The simple truth is: the vast majority of computer users run Windows, especially in settings where Apple devices are considered too expensive. Thus, nearly all web devs have to make their sites appear and work properly on Windows, so they have to be able to *view* their sites on Windows. On an Intel-based Mac, that's where virtualization comes in. For example, on my Intel-based 2017 Mac, I do this through Windows running in [Parallels Desktop](https://parallels.com/desktop). On an ASBM, you can't get there from here---yet.

To be sure, an ASBM certainly can run macOS *versions* of all the major non-obsolete[^noIE] browsers that run on Windows, but that's no substitute for really running their Windows versions.

[^noIE]: Yes, I'm dissing the wretched Internet Explorer. It's a pitiful excuse for a web browser where performance, compatibility, and security are concerned. [Even the company that created IE thinks you should avoid it](https://techcommunity.microsoft.com/t5/windows-it-pro-blog/the-perils-of-using-internet-explorer-as-your-default-browser/ba-p/331732).

Efforts are underway to make virtualization work on ASBMs. We don't know when those will come to fruition. Until then, one can't go ASBM-only while still web-dev'ing for a Windows-dominated world, so the obvious answer in the interim is to have (or have access to) a regular Windows-running PC. Another possibility is to use an online virtual Windows PC, such as with a subscription from [Shadow](https://shadow.tech), but over time that could cost you even more than owning a modest Windows PC.

(By the way, I'm purposely *not* getting into the [x86](https://en.wikipedia.org/wiki/X86)-vs.-[ARM](https://en.wikipedia.org/wiki/ARM_architecture) discussion regarding the whole Windows-on-ASBMs thing. Those who are sufficiently nerdy already know about it, and those who aren't never will care.)

## What about mobile devices?

In case you're wondering: doing web dev for *mobile* devices, as opposed to desktop and laptop computers, actually can be somewhat less problematic.

*For the most part*, the mobile form of Chrome works the same on both Android (where it's usually the default browser) and iOS. I say, "for the most part," because Apple requires every iOS browser to use the same WebKit engine as Safari, rather than the engine it uses on Android. However, in my personal testing (YMMV), I've found no significant differences in the results, all other things---such as screen sizes---being equal.[^mobDif] Also, the default browser on Samsung phones is based on the same engine as the Android version of Chrome.

[^mobDif]: To be sure, what differences I *have* seen between Chrome-on-Android and Chrome-on-iOS don't compare to the glitches that can occur between a macOS version of a browser and its Windows counterpart.

Of course, if you're a web dev who doesn't *use* iOS, you then have to figure out how to test for Safari, the iOS default browser. Still, I'd guess it's a lot easier for such a web dev to determine a way around that, perhaps by simply borrowing a pal's iOS device when necessary, as compared to the desktop-oriented dilemma I've discussed herein.

## Looking forward to amazing things

If the performance and efficiency gains we've observed so far from ASBMs are any indication, we can expect that, *when* virtualization-of-Windows on ASBMs is available, it'll be amazingly good. Until that brighter day to come, a web dev who chooses to go with an ASBM will have to keep a Windows box somewhere in the mix.

It'll get better, folks. What Apple has shown us so far indicates we'll get there. We just have to be patient.