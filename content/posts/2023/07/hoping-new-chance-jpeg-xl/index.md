---
title: "Hoping for a new chance for JPEG XL"
description: "A Cloudinary blog post makes a strong case for an image codec that deserves wider support — and soon will get it."
author: Bryce Wray
date: 2023-07-22T09:30:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

One of the many cool things about using [Cloudinary](https://cloudinary.com) to host and process website images is its [`f_auto` capability](https://cloudinary.com/documentation/image_optimization#automatic_format_selection_f_auto), which auto-selects the most appropriate image format for each browser. And a recent Cloudinary [blog post](https://cloudinary.com/blog/jpeg-xl-how-it-started-how-its-going) has revealed that `f_auto` will soon get even smarter.

<!--more-->

[Dr. Jon Sneyers](https://cloudinary.com/blog/author/jon_sneyers)'s "JPEG XL: How It Started, How It's Going" made an impressive pitch for the JPEG XL image codec. I urge you to read his post and see the details for yourself (including the links to his earlier posts about JPEG XL), but here's the gist: *in browsers that support the format*, JPEG XL is essentially a next-generation version of the hoary JPEG format and, as of now, may well be *the* most efficient way to deliver high-quality images to web browsers.

As you've probably guessed, it's the "in browsers that support the format" part of that statement which is problematic. Right now, that means basically *no* production-ready browsers.

For a year and a half, Chrome supported JPEG XL behind a flag[^FF], but last year it [dropped that support](https://bugs.chromium.org/p/chromium/issues/detail?id=1178058#c84), based on the reasoning that JPEG XL's low uptake in the market no longer merited the Chromium project's development time. (And, yes, that's a classic chicken-and-egg thing.) Given Chrome's massive global market share, things didn't look good at all for JPEG XL.

[^FF]: Firefox supports JPEG XL behind a flag, too, but only in its "Nightly" versions. [This bug report](https://bugzilla.mozilla.org/show_bug.cgi?id=1539075) is the one to watch, both for historical reasons and in trying to see whether that support will continue at all, much less in so limited a fashion.

Then, an announcement at last month's Apple Worldwide Developers Conference disclosed that Safari's incarnation in Apple's next major OS releases, coming later this year, *will* support JPEG XL --- and as a default, *not* behind a flag. Given how quickly iPhone users typically upgrade to the latest OS version, just those users will constitute a gigantic number of newly JPEG XL-compatible browser installations worldwide by year's end; and that's not even considering the similarly affected macOS and iPadOS users, too.

This change gave Dr. Sneyers, one of the original developers behind JPEG XL, optimism that the codec will now make a comeback and, indeed, regain support in Chrome. After reading Dr. Sneyers's post, I wondered whether this meant Cloudinary's `f_auto` transformation flag would provide JPEG XL to compatible Safari versions when those aforementioned Apple OS updates occur. His post ended with an invitation to reach out to him on the Cloudinary Discord server, so [I did](https://discord.com/channels/787073271974723615/1131610325519696033):

> `@_wb_` Just saw your writeup about JPEG XL. Great stuff. I share your hope it'll return to Chromium. Is it going to be available in `f_auto` when the new Apple OSs are released later this year?

He replied:

> Yes, we'll make it available as an `f_auto` option so you can deliver JXL[^jxl] to Safari or iOS apps while having JPEG/WebP/AVIF fallbacks for the other browsers.[^style]

[^jxl]: A JPEG XL file uses the extension *.jxl*.

[^style]: Edited for style.

This is even better news, and yet another reason I [can encourage use of Cloudinary](https://cloudinary.com) and other, similar digital asset management services. After all: for serving an image, the best experience a website can offer is one in which a user's browser gets the best[^best] format it can accept. And, while some website-building tools[^Hugo] can do that on their own through either built-in methods or add-ons, it's a capability that likely will continue to be more easily provided through external actors like Cloudinary.

[^best]: By "best," I mean the strongest combination of image quality and file-size efficiency. That way, you get the best of both worlds: the nicest-looking image *and* the quickest possible download time.

[^Hugo]: While I have written a number of pieces here about how to do that with the [Hugo](https://gohugo.io) website generator tool's built-in image processing, Hugo's *efficient* image-output choices are limited --- and likely will remain so for the foreseeable future --- to GIF, the original JPEG, PNG, and WebP. To deliver newer codecs like JPEG XL, a Hugo website will have to use external means (or, more simply, provide .jxl files manually).

Although I hate writing an ending paragraph that includes a vapid nothing-burger like "time will tell," I have no choice in this case: only time will tell whether any other browsers --- and especially the big kahuna, Chrome --- will take up the challenge and support JPEG XL at all, much less as a default. But I surely hope they will. The web would be better for it.

**Update, 2023-09-20**: Cloudinary's `f_auto` transformation now includes JPEG XL but, at least for now, that has to be enabled on your account ("cloud") through a support request. According to Jon Sneyers via that same Discord session to which I linked above, "This is because[,] in the current pricing model, creating more variants costs you more transformations and we want to avoid surprise bills."\
\
As of the release of 2023-09-18 of iOS/iPadOS 17, iDevices are JPEG XL-compatible; for Macs, that compatibility will come with the 2023-09-26 release of macOS Sonoma (macOS 14).
{.box}
