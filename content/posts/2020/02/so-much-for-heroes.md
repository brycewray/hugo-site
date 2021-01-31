---
layout: layouts/posts/singlepostherofit.njk
tags: post
title: "So much for heroes"
subtitle: "The Big Picture regarding big pictures"
description: "A few days of dithering over images leads to a clean break."
author: Bryce Wray
date: 2020-02-01T09:50:00-06:00
lastmod: 2021-01-31T09:40:00-06:00
discussionId: "2020-02-so-much-for-heroes"
featured_image: paint-splatter-2224800_3648x2736.jpg
featured_image_width: 3648
featured_image_height: 2736
featured_image_alt: "Paint brushes and colorful, splattered paint"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/evondue-4996403/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2224800">evondue</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2224800">Pixabay</a></span>
---

{{% yellowBox %}}**Update, 2021-01-30**: A few months later, I [reinstated the hero images](/posts/2020/05/thousand-words-indeed). Nearly a year after the original post, [I decided](/posts/2021/01/leaner-new-look) I'd been right the first time, although for totally different reasons. All that zigging and zagging notwithstanding, I am leaving this in place for archival purposes as well as for the sake of [transparency](/posts/2019/10/otoh). In addition, you may find some value in the discussion herein concerning image processing.{{% /yellowBox %}}

Who needs heroes? Not this site, I've decided.

Of course, I'm referring to a [hero *image*](https://www.optimizely.com/optimization-glossary/hero-image/)---a massive photo or other graphic element that constitutes much if not all of the "above-the-fold" content on the typical website these days.

If you're among my few (but beloved, I assure you) regular readers and this is your latest visit since before I first issued this post, you're probably wondering, "Hey, where's the usual great, big, honkin’ stock photo he always puts up here underneath the post title and all that stuff?" For example, it'd usually look something like this (taken from a pre-today incarnation of [this post](/posts/2019/11/curmudgeonish-2019)):

{{< imgc src="2020-01-31--curmudgeonishish-2019_1280x726.jpg" alt="Screen capture of “hero image” from “Some curmudgeonish thoughts, 2019 edition,” as it appeared before the site redesign" width="1280" height="726" >}}

Not today, though. In fact, you might want to open another browser tab or window and check around the rest of the site, except for the home page. You'll see that this isn't an aberration.

It's a new look.

And it's here because of stuff I learned---and a decision I made.

## Oh, what a tangled WebP&nbsp;.&nbsp;.&nbsp;.

As part of the [conversion](/posts/2019/12/packing-up) of this site to an [Eleventy](https://11ty.dev)/[webpack](https://webpack.js.org) combo, I determined to do a better job where providing [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) is concerned. In the beginning, I accomplished this through use of [responsive-loader](https://github.com/herrstucki/responsive-loader), but that gave me only different sizes of JPGs and PNGs to serve visitors. There was no provision for the Google-created [WebP](https://developers.google.com/speed/webp) format which, although it's [been around for nearly a decade](https://web.archive.org/web/20101004134848/http://code.google.com/intl/no/speed/webp/docs/c_study.html) and is much more efficient than either JPG or PNG in most cases, has only recently gained support among a sufficient number of *non*-Chrome browsers to make it worth providing, in my opinion.[^ChrShare]

[^ChrShare]: Of course, between Google Chrome's already massive market share and the adoption by the Windows-default Microsoft Edge of the [Chromium](https://www.chromium.org) engine, that provided even more incentive to serve WebP-format images.

I decided to do something about that. So, since responsive-loader doesn't support WebP as an output format, I ended up wiring the npm package [imagemin-webp-webpack-plugin](https://github.com/iampava/imagemin-webp-webpack-plugin), [among](https://github.com/imagemin/imagemin-webp) [others](https://github.com/Klathmon/imagemin-webpack-plugin), into the site's webpack config.

A weekend's worth of false starts later, I had the sequence just right and, on build, the setup converted each JPG or PNG image in `/src/images/` to up to four different sizes in the image's original format *plus* WebP. Then, finally, I retooled an [Eleventy shortcode](https://www.11ty.dev/docs/shortcodes/) I'd written so that it would produce, rather than just an `<img>` with a `data-srcset` (to conform to the needs of the [lazysizes](https://github.com/aFarkas/lazysizes) library), a `<picture>` which would give each browser its choice of sizes and formats. Browsers which couldn't handle WebP files would fall back to each file's original format, whether JPG or PNG.

It seemed simple enough. But I gave you a hint above as to why it came a-cropper---"Webp .&nbsp;.&nbsp;. is much more efficient than either JPG or PNG **in most cases**" (emphasis added this time around).

Obviously, "in most cases" [!=](https://sciencetrends.com/does-not-equal-sign-what-does) "all the time"; and therein lay the problem.

## The diet wasn't working

When I saw that some of the files actually were *larger* in WebP format---especially when I ran the site's `testbuild` script (see the [site repo](https://github.com/brycewray/eleventy_bundler)'s README file for more details)---I wondered how that could be.

It didn't take long to find out.

I won't get into all the details, but the skinny on why the WebP images *weren't* always skinnier than their counterparts is that, simply put, you can't run an already-[lossy](https://techterms.com/definition/lossy) JPG or PNG file through the conversion to an also-lossy WebP file and *not* get a fatter file. This was especially true for images with a lot of [specular highlights](https://en.wikipedia.org/wiki/Specular_highlight)[^granular]; sometimes they *really* ballooned, because the conversion process went ape on those tiny details, adding many more pixels.

[^granular]: Examples of images that were especially problematic for this reason: road surfaces (because little bits of light gravel and other shiny crud appeared); and sunlit beach sand (because you could see individual sand granules, pebbles, and the like).

More maddeningly, it was just hit-or-miss enough that I couldn't reliably configure all the settings to prevent it. So, rather than "rewarding" WebP-compatible browsers with smaller-size graphics, in many cases I would be "punishing" them with bigger ones. Definitely not okay.

While figuring out what to do, I tried Google's versatile [`cwebp`](https://developers.google.com/speed/webp/docs/cwebp) (WebP encoder) tool. Although it, understandably, produced better results than my webpack config, I soon saw that the only reliable setup which *always* produced a WebP file that was smaller than the original JPG or PNG was when I had the *truly* original JPG or PNG. That is, I couldn't use a *processed* version of the original, or I'd almost always get a larger WebP file.

Only problem with that was, in many cases, I *had* no unprocessed version of the JPG or PNG file.

This was particularly true for nearly all of the stock images. For each, I had---in the interests of keeping file sizes lower, ironically enough---always downloaded a smaller image size than the maximum that the vendor offered. Now, it appeared, I'd have to go back and re-download each stock image at its maximum size, then use `cwebp` to resize it.

One. At. A. Time.

---and, often, with different settings for each. (By the way, I had no way of knowing that even the largest image offered by the vendor hadn't already been processed somehow. After all, these were JPG or PNG files, not [raw](https://en.wikipedia.org/wiki/Raw_image_format) files.)

It got worse. Often, I also had to convert the WebP version of a stock image at only *twenty or thirty percent quality* to achieve a smaller file size. To the credit of the WebP format, that ugly process *didn't* result in the horrible, [artifact](https://en.wikipedia.org/wiki/Compression_artifact)-laden mess you'd get if you reduced other formats’ files to so low a quality. Still, it was visibly not as clear as the JPG or PNG, especially when I compared the two on a high-resolution display.[^workLoRes]

[^workLoRes]: A WebP converted at such low quality looked passable on the old low-resolution monitor at work, but on the double- or triple-quality displays commonly used by today's smartphones, much less my iMac's 5K display---not so much.

So I had to decide what to do.

## Cutting to the chase

I first figured I had two choices:

- Keep the process and images I already had, accepting that I'd sometimes be delivering "fatter" WebP files.

- Go back and re-do nearly all the stock images, converting each one separately (and usually at low quality) to WebP.

However, in the early hours of yesterday morning, I revisited something I'd played with only in separate branches of my repo but never yet committed to the remotes: *doing without hero images altogether*.

I'd thought about it before because, frankly, I had tired of always having to find some stock photo to illustrate each and every post, particularly since I had to stick to free stock photos---yeah, right, the same free stock photos everyone else uses. And it's not as if I could always find an image that both fit the "hole" I had to give it and had at least some relation to the subject of the post.

Besides, as I kept telling myself: "Dude, what few people you have visiting here from time to time *don't* come here looking for the Picture of the Day. They come here looking for *information*. For *words*. If you want to stick images *inside* certain posts to *illustrate points*, that's a totally different matter.[^postsImgs] But this ain't [*Life Magazine*](https://en.wikipedia.org/wiki/Life_(magazine))."

[^postsImgs]: As of the day this was first posted, those posts with included images are: "[The client is too smart for you](/posts/2018/10/client-too-smart)”; "[Readable web type, pretty please](/posts/2018/10/web-typography-part-1)”; "[A stacked deck](/posts/2018/10/web-typography-part-2)”; "[Blox sux](/posts/2019/01/blox-sux)”; "[iA for IO?](/posts/2019/02/ia-for-io)”; "[Why I left Ulysses](/posts/2019/04/why-left-ulysses)”; "[Ahoy, 'Mate](/posts/2019/06/ahoy-mate)”; "[Independence](/posts/2019/07/independence)”; and "[Roger, Copy](/posts/2019/07/roger-copy).”

As a result, I created a new branch, retooled the site accordingly, and today published the redesigned, hero-image-less site you now see.

## Noise reduction: It's a *good* thing

It's ironic that one aspect of image processing has to do with reducing so-called [*noise*](https://www.cambridgeincolour.com/tutorials/image-noise.htm); because the "noise" of having the hero images (even the cute ones) became an end unto itself. In the end, that noise---and the growing technical debt, and growing expenditure of my already limited time, which now was going to come with it---had become unacceptable.

So, it's gone.

Will I miss the hero images? Perhaps. Maybe some of you will, too. And I did think they added a nice feel to things at times. Nonetheless, I hope this decision, like others[^decisions] I've made over the brief history of this site, will ensure that each visitor's browsing experience will be the best possible.

[^decisions]: For example: doing the site in a [static site generator](https://staticgen.com) in the first place; choosing [Netlify](https://netlify.com) to host it; and generating it through the [current Eleventy/webpack combo](/posts/2019/12/packing-up).

After all, *you* folks are the *real* heroes. You keep coming back. If that's not heroic, I don't know what is.
