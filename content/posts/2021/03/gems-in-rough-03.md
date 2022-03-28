---
layout: singlepost
title: "Gems in the rough #3"
description: "The latest installment of unrequested advice about tinkering with websites."
author: Bryce Wray
date: 2021-03-06T15:55:00-06:00
lastmod: 2022-02-12T11:30:00-06:00
#draft: false
discussionId: "2021-03-gems-in-rough-03"
featured_image: "gemstones-sung-jin-cho-0d3qxUozE-0-unsplash_7315x4881.jpg"
featured_image_width: 7315
featured_image_height: 4881
featured_image_alt: "Colorful gemstones"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@mbuff?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sung Jin Cho</a>; <a href="https://unsplash.com/s/photos/gemstones?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

As one gathers navel from one's lint, so also do I gather little bits of  information I hope will be helpful for those of you who, as I do, have found a hobby in fiddling with personal [SSG](https://jamstack.org/generators)-built websites. [Back in December](/posts/2020/12/gems-in-rough/), I began issuing such items as "Gems in the rough." Here be the latest thereof.

---

Some time back, I went through a [somewhat](/posts/2020/11/using-postcss-cache-busting-eleventy) [tortured](/posts/2020/12/cache-busting-eleventy-take-two) [series](/posts/2020/12/hashing-out-cache-busting-fix-eleventy/) of explaining how to cache-bust the CSS for a [Eleventy](https://11ty.dev)-based site which uses Tailwind CSS. Turns out that, if you're willing to use [SCSS](https://sass-lang.com) instead, you can skip the whole mess by using internal CSS---*i.e.*, where it's included site-wide in your HTML's `head` rather than as a separate file, as I [discussed a few weeks ago](/posts/2021/02/tailwind-head-hugo-pipes/) regarding Hugo's [asset pipeline](https://gohugo.io/hugo-pipes). Check out "[My Eleventy + SCSS/Sass Setup](https://www.belter.io/eleventy-sass-workflow/)" by [Duncan McDougall](https://twitter.com/duncanmcdougall) for all the coolness (and, to be fair, **he** credits **his** inspiration to [Andy Bell](https://twitter.com/piccalilli_)'s well-known [Hylia Starter Kit](https://hylia.website/)).

*Not a tip but just a note: I'm experimenting with other website-building apps and methods, due to some upcoming Day Job stuff. Since the Day Job is moving toward being a [React](https://reactjs.org) shop, I'm spending significant time in [Next.js](https://nextjs.org), in particular. As of now, that's the platform toward which I'm leaning as the best all-around recommendation when I get asked. Of course, the final decision ain't mine. [**Update, 2021-04-15**: After an initial miscommunication gave me the wrong impression of the thinking in higher places, the decision eventually went against me, so I won't be doing this after all.]*

Wondering which `display` setting you should use when calling a web font with `@font-face` CSS , especially for reducing [CLS](https://web.dev/cls/)? Some writers suggest `display: optional`. With that in place, a browser probably won't show the web font on first arriving at your site, but should when the user either refreshes that initial page or visits one or more subsequent pages in the site. This means that your visitors likely won't see the consistent appearance for which you installed the web font in the first place. Besides, you don't know whether someone actually **will** visit a subsequent page after finding the first one to which a search sent him/her. My advice: use `display: swap` and live with whatever CLS it causes **or** just settle for the totally CLS-free [system fonts stack approach](/posts/2018/10/web-typography-part-2/).

*Still keeping my eye on the [Cloudflare Pages](https://pages.cloudflare.com) beta test, which [now is an open beta](https://twitter.com/CloudflareDev/status/1366875729829400578). Build times are getting faster, but quite a few bugs must die before Pages will be safe for production use. For now, if you want a static site that lives on Cloudflare, stick with a [Workers site](https://developers.cloudflare.com/workers/platform/sites).*

If you've ever tried to figure out why you couldn't click on a link in a fixed-[position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) element, like a header or footer that you want to stay in the same place, the [CSS `z-index` property](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) is your friend. Keep adjusting that setting for all elements concerned until each appears as it should while allowing you to click links to your heart's content.
