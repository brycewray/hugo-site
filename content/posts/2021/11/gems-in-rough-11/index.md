---
title: "Gems in the rough #11"
description: "Dueling announcements, CSP-allowed CSS, fun with LQIPs."
author: Bryce Wray
date: 2021-11-19T11:27:00-06:00
---

Each entry in the "Gems in the rough" series is a collection of tips, explanations, and/or idle observations which I hope will be at least somewhat useful to those of you with websites built by [static site generators (SSGs)](https://jamstack.org/generators).
{.blueBox}

## News from Vercel and Cloudflare

When this site is on [Cloudflare Pages](https://pages.cloudflare.com), as it is at this writing, it sits behind a [Cloudflare Worker](https://workers.cloudflare.com) that provides the site a variety of features I couldn't otherwise give it, such as on another host like [Vercel](https://vercel.com). (More about that Worker further down.)

On October 26, Vercel [announced](https://twitter.com/vercel/status/1453034541463916549) it was introducing a new functionality, [Edge Functions](https://vercel.com/features/edge-functions), which would work like Cloudflare Workers. This made perfect sense because, as Vercel personnel confirmed soon afterward, Edge Functions are **based on** Cloudflare Workers. At this writing, they remain (1.) in beta and (2.) available for only [Next.js](https://nextjs.org) users; but both conditions should change soon.

Then, on November 17, Cloudflare had a "Hold my beer"-kinda [announcement](https://blog.cloudflare.com/cloudflare-pages-goes-full-stack/) during its [Full Stack Week event](https://blog.cloudflare.com/full-stack-week-2021/): it was making Cloudflare Pages a "full-stack" platform, with much tighter integration with a variety of Cloudflare products including, of course, the Workers product on which it always has been based. While this, too, is in beta at this writing, it does hold a gigantic amount of promise for enabling a lot more power, with a lot less pain (or futzing around, perhaps), in the CFP developer experience.

## Dynamic styling *and* security

In two separate posts earlier this year, I gave you details about that aforementioned Cloudflare Worker. Specifically:

- "[Headers up](/posts/2021/05/headers-up/)" explained that I was using the Worker to provide proper browser-side caching of the site's assets.

- Last month's "[My website and Cloudflare, a year later](/posts/2021/10/my-website-cloudflare-year-later)" mentioned that the Worker now also allows implementation of a tighter [Content Security Policy](https://content-security-policy.com) (CSP) through dynamic insertion of [nonces](https://content-security-policy.com/nonce/).

The tightness of that CSP prohibits something which can be useful: inline CSS styles. Earlier this week, I realized I had a particular need for dynamic styles (more on that shortly), so I added some code to the Worker for another nonce-related use. The following part of the Worker[^YTstuff] now [makes it CSP-OK](https://content-security-policy.com/examples/allow-inline-style/) to add a `style` dynamically **if** the style has a nonce:

```js
style-src 'nonce-${nonce}' 'self' https://*.brycewray.com https://*.youtube-nocookie.com data:;
```

[^YTstuff]: The part about `https://*.youtube-nocookie.com` is because of the styling in the [YouTube embeds](/posts/2021/09/gems-in-rough-09/#privacy-respecting-youtube-embeds).

As for *why* I wanted that dynamically added style, read on.

## Enabling LQIP-based blur-up

When [lazy-loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading) images, I like to provide that *blur-up* effect you often see with [Gatsby](https://www.gatsbyjs.com), Next.js, and other platforms which utilize [low-quality image placeholders](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders) (LQIPs). Essentially, you first provide a tiny version of the full image, expanded out to the full width of the `div` the image will occupy, thus producing a blurry starting item, and then fade in ("blur up") the full image as it loads. This avoids a blank spot during the load, yet also provides a pleasing effect in the interim.

That's easily done by having the full image housed within a `div` whose background is that LQIP. This typically is done with inline styling which changes dynamically on a per-image basis. I had once implemented this via the site's `imgc` **shortcode**, whether in [Eleventy](https://11ty.dev/docs/shortcodes) or [Hugo](https://gohugo.io/content-management/shortcodes/). However, I found that's a no-go with a tight CSP --- and now you understand my interest in that new nonce-handling in the Cloudflare Worker, which allowed me to add the following capabilities to `imgc`:

- Use of [MD5](https://en.wikipedia.org/wiki/MD5) generates a random hash of the image's file name.
- There's now a dynamically generated CSS class named `imgB-` followed by the hash. The class has only one item, specifying the LQIP[^typoFix] as `background-image` for whatever uses the rule.
- The wrapping `div` includes this class.

[^typoFix]: Not the full image, as I erroneously stated in the initial publication of this post.

If you want to see the resulting HTML from how `imgc` works, use your browser's **View Source** capability[^notInsp] and see the code for this post's featured image. Refresh the page and you'll see that the `imgB-` rule's nonce value changes each time. That's the whole point, and it thus makes everything fine where the CSP's `style-src` portion is concerned.

[^notInsp]: I say to use **View Source** rather than the Inspector because, on some browsers, using the Inspector won't show you the nonce value.
