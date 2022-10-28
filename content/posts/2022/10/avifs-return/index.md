---
title: "Added support for AVIFs"
description: "Thanks to recent updates to several Apple operating systems, the AVIF format is once again a reasonable choice for providing images on your website."
author: Bryce Wray
date: 2022-10-28T12:40:00-05:00
#draft: true
#initTextEditor: iA Writer
---

With my recent return to using [Cloudinary](https://cloudinary.com) to host and serve the vast majority of this site's images --- even though that's a much smaller quantity than was the case before the invocation of [CTCAJW Mode](/posts/2022/05/simplify-simplify-maybe-for-real-this-time/) --- I was back to using Cloudinary's `f_auto` (auto-format) parameter. It provides the appropriate image format for lightest delivery on a given browser/OS combination.

For a few months in 2021, Cloudinary made it possible for my particular account to provide the [AVIF](https://en.wikipedia.org/wiki/AVIF) format as one of those available via `f_auto`. AVIF files are known for [delivering high quality despite being smaller in size](https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/) than other formats. But, this past January, [I requested that this be stopped](/posts/2022/01/gems-in-rough-13/#a-wave-off-on-avifs) because, particularly on iPhones and iPads at the time, the AVIF-decoding process was rough on CPUs and batteries.

Then, yesterday, I asked Cloudinary to re-activate AVIF support for my use of `f_auto`, because of two changes which have occurred since last January:

- The site no longer uses "hero images" due to, again, CTCAJW Mode; so, even on a browser/OS combo where AVIF support makes it huff and puff, a page on this site **isn't** going to start off loading a big honkin' photo, much less one that's in AVIF. And, better yet . . .
- Effective with the recent major updates to macOS, iOS, and iPadOS, the Safari browser [does properly support AVIF](https://caniuse.com/?search=avif). All other truly relevant browsers and platforms have supported AVIF for some time, so this additional support should reduce or eliminate any remaining drawbacks of delivering AVIF files.[^updates]

[^updates]: Always remember that [it's wise to keep your web browser as up-to-date as possible](https://www.cisa.gov/uscert/publications/securing-your-web-browser).

Cloudinary granted my request later that day; so, on the site's pages which do have some images, you now get even more of a break on image download size with my use of `f_auto` than was previously the case.

**Note**: Incidentally, this wouldn't have possible if I'd continued to [provide the site's images](/posts/2022/06/responsive-optimized-images-hugo/) through [Hugo](https://gohugo.io)'s [built-in image processing capabilities](https://gohugo.io/content-management/image-processing), which [won't be supporting the AVIF format any time soon](https://github.com/gohugoio/hugo/issues/7837).
{.box}