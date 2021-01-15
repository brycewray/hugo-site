---
layout: layouts/posts/singlepostherofit.njk
tags: post
title: "A thousand words, indeed"
subtitle: "Feelings about look-and-feel"
description: "How and why “hero images” have returned to this site."
author: Bryce Wray
date: 2020-05-22T18:00:00-05:00
lastmod: 2020-12-13T12:35:00-06:00
discussionId: "2020-05-thousand-words-indeed"
featured_image: colorful-flower-field-250016_4984x3607.jpg
featured_image_width: 4984
featured_image_height: 3607
featured_image_alt: "Colorful field of flowers under a beautiful blue sky"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/DeltaWorks-37465/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=250016">Kohji Asakawa</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=250016">Pixabay</a>
---

The phrase has been around [for about a century](https://grammarist.com/proverb/a-picture-is-worth-a-thousand-words/): "A picture is worth a thousand words."

Sometime, it's worth even more than words. And that's why there are big ol' pictures back at the top of each of this site's posts.

## Gone, but not forgotten

[Back in February](/posts/2020/02/so-much-for-heroes), I explained why, for the first time since this site's birth, each post was no longer including a featured image---a "[hero image](https://en.wikipedia.org/wiki/Hero_image)"---at its top. The gist of it was my feeling that having the images no longer justified the site performance hit, and the extensive pre-processing, that their presence required.

Near that post's end, I said:

> Will I miss the hero images? Perhaps. Maybe some of you will, too. And I did think they added a nice feel to things at times. Nonetheless, I hope this decision .&nbsp;.&nbsp;&nbsp;. will ensure that each visitor's browsing experience will be the best possible.

So, yes, I did leave myself some "outs" there.

While not a single visitor complained about the featured images' departure, in time I did miss them. But I'm a big (old) boy, and I figured I'd get over it, especially since the site presumably would work better without them.

Recently, though, I decided that, especially in these [troubled times](/posts/2020/03/coherence-covid-19), I not only *wanted* but also flat-out *needed* to see big, (usually) pretty pictures atop my posts once again. By coincidence, I simultaneously [realized](/posts/2020/05/mixed-nuts-2020-05) that this site in even its sparest form was never going to [rank among *the* fastest](https://www.11ty.dev/leaderboard/perf/) in the stable of [Eleventy](https://11ty.dev)-using sites.

That gave me some leeway.

As long as I didn't get crazy *and* I made a few sensible choices here and there concerning the site's structure and build processes, I could bring back the images while still keeping *decent* performance.

The site just had to go on a diet. If we were going to put a big piece of pie on each page again, we had to trim some other things to make up for it.

## Change of diet

So here's what happened.

- **Lazy-loading**---After having used the [LazySizes](https://github.com/afarka/lazysizes) library for [lazy-loading](https://en.wikipedia.org/wiki/Lazy_loading) images, I opted instead for [LazyLoad](https://www.andreaverlicchi.eu/lazyload/), sometimes called "[vanilla-lazyload](https://www.npmjs.com/package/vanilla-lazyload)." It does everything I require of this kind of code, but is a smaller download and also seems to be a more efficient steward of browser resources.[^LLDev]

[^LLDev]: I also greatly admire and appreciate the friendly and positive way that LazyLoad's dev, [Andrea Verlicchi](https://www.andreaverlicchi.eu/), handles issue reports to LazyLoad's [GitHub repo](https://github.com/verlok/lazyload).

- **Responsiveness**---After I [took the site off webpack](/posts/2020/05/going-solo-eleventy), I used an Eleventy plugin to create [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) and inject the appropriate [`<picture>` HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) into site pages. However, with the return of the hero images, a typical build to [Netlify](https://netlify.com) ballooned well past the four-minute mark. Since the Netlify free plan is for 300 build minutes per month, and my site typically has quite a few builds a month, I needed another answer. That turned out to be a combo of two previous efforts of my own: the [Sharp](https://github.com/lovell/sharp)-powered `imgxfm.js` build-time script for creating responsive images (including highly efficient [WebP](https://developers.google.com/speed/webp)-formatted images for compatible browsers), and the `lazy-picture.js` [shortcode](https://11ty.dev/docs/shortcodes) for simplifying placement of those images in my posts.

- **[System fonts](/posts/2018/10/web-typography-part-2)**---The first fifteen months of this site's existence, I'd been content to stick with the so-called "[system font stack](/posts/2018/10/web-typography-part-2)" and reap the performance benefits thereof. Then, with the integration of [webpack](https://webpack.js.org) [last December](/posts/2019/12/packing-up), the site used web fonts for the first time. For the first couple of weeks after [dumping webpack](/posts/2020/05/going-solo-eleventy), I kept the web fonts, first by self-hosting them and then briefly delivering them straight from [Google Fonts](https://fonts.google.com). But my [re-embrace](/posts/2020/05/going-solo-eleventy) of [Tailwind CSS](https://tailwindcss.com)---which defaults to that same "system font stack"---presented a perfect opportunity to go back to it, so I did.<br />**Update, 2020-08-08**: I later opted to return to web fonts (albeit self-hosted once again, for reasons explained in [this post](/posts/2020/08/google-fonts-privacy)) realizing I still preferred a standard appearance for the site across all devices and OSs. This also freed me from worrying about the [occasional glitches that Chromium-based browsers exhibit](https://www.coywolf.news/webmaster/chrome-81-breaks-system-fonts-bold/) when handling macOS system fonts.

## Nothing more than feelings?

From the earliest days of this site, I've said the following on the [home page](/):

> I hope you find this site a source of various little nuggets of helpful info, and occasionally a laugh or two---even if I hadn't intended it, but especially if I had.

To that, I now add the wish that you find pleasure in the presence of the featured images. Sometimes we just need to take a moment at look at a picture that's pretty, or interesting, or thought-provoking. Or all of those. Sometimes we just need to feel good about something being where it is, even if it has no practical value.

And, as another way of trying to make you feel better: I uncharacteristically kept this post well under a thousand words (counting footnotes). 

Or, counting that big, colorful item at the top of the page, perhaps I should make that "well under *two* thousand words."