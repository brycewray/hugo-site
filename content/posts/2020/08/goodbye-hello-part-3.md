---
layout: layouts/posts/singlepostherofit.njk
tags: post
title: "Goodbye and hello • Part 3"
subtitle: "Performance is a heckuva drug"
description: "Earlier considerations aside, I move the site to Vercel for a second time."
author: Bryce Wray
date: 2020-08-21T17:05:00-05:00
lastmod: 2020-09-05T09:00:00-05:00
discussionId: "2020-08-goodbye-hello-3"
featured_image: oscar-sutton-pBrHNFqcX-M-unsplash_3888x2592.jpg
featured_image_width: 4608
featured_image_height: 2592
featured_image_alt: "Exhaust flame resulting from a sport car’s turbo boost"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@o5ky?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Oscar Sutton</a>; <a href="https://unsplash.com/s/photos/fast-speed?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

{{% yellowBox %}}**Note**: This originally took the form of an addendum to the original "[Goodbye and hello](/posts/2020/07/goodbye-hello)" post; but I soon realized this was the classic case of shooting at a moving target, so I decided to give each move its own post (using the appropriate addendum as the text), while leaving the original pretty much as it once was.{{% /yellowBox %}}

Perhaps by now you've read how I [moved the site](/posts/2020/07/goodbye-hello-part-2) back to [Netlify](https://netlify.com), its long-time home, following the [initial move](/posts/2020/07/goodbye-hello) to [Vercel](https://vercel.com). If so, you know it was largely a sentimental decision, born out of my having missed being a part, even if a small one, of the Netlify community.

Well, that's nice and all, but&nbsp;.&nbsp;.&nbsp;.

.&nbsp;.&nbsp;.&nbsp;I undid the undoing today and **returned** the site to Vercel.[^fastReturn]

[^fastReturn]: Since I was going back off Netlify DNS to Google DNS, the return was stunningly quicker than the earlier move the other way---as in, minutes rather than hours.

Why?

- It's not exactly a "need for speed" thing, but I'm impressed by how considerably Vercel has [amped up its Edge Network infrastructure in recent weeks](https://vercel.com/blog/new-edge-dev-infrastructure). And, unlike Netlify's free tier, Vercel's free tier gives cheapos such as Yours Truly the full advantage of top-tier performance. I don't know **why** but, hey, gift horses’ mouths and all that stuff.

- By contrast, the performance of Netlify's free tier seems to be dragging even more lately---particularly in the [TTFB](https://en.wikipedia.org/wiki/Time_to_first_byte) category. ([Waterfalls, waterfalls, waterfalls](https://web.dev/identify-resources-via-network-panel/).) That said,I can certainly understand if Netlify chooses not to put significant resources toward the freebie level. It's all business, of course. Fair enough.

- There's also the simple fact that I admire the opinions of the extremely smart guys who run Fathom Analytics, who are [moving their site to Vercel later this year](https://usefathom.com/blog/tech-stack). Learning that (which was after I'd moved back to Netlify, in my own defense) probably was the first thing that got me to re-thinking my re-think, if you will.

So we'll see if I stick around this time. I hope this is not going to be the site-hosting equivalent of [last year's SSG "dance."](/posts/2019/12/sorta-strange-ssg-trip) And, if you're one of my few but highly appreciated regular visitors, I'm sure you share that hope.

{{% yellowBox %}}**Note**: [To be continued](/posts/2020/09/goodbye-hello-part-4) (sigh).{{% /yellowBox %}}