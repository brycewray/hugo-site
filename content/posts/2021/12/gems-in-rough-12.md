---
layout: singlepost
title: "Gems in the rough #12"
subtitle: "Another swift dip into nerddom"
description: "Speedier CFP builds, HTML sitemaps."
author: Bryce Wray
date: 2021-12-26T10:07:00-06:00
#lastmod:
#initTextEditor: iA Writer
discussionId: "2021-12-gems-in-rough-12"
featured_image: "gemstones-sung-jin-cho-0d3qxUozE-0-unsplash_7315x4881.jpg"
featured_image_width: 7315
featured_image_height: 4881
featured_image_alt: "Colorful gemstones"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@mbuff?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sung Jin Cho</a>; <a href="https://unsplash.com/s/photos/gemstones?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

Each entry in the "Gems in the rough" series is a collection of tips, explanations, and/or idle observations which I hope will be at least somewhat useful to those of you with websites built by [static site generators (SSGs)](https://jamstack.org/generators).
{.blueBox}

This one will be a quickie, a fact which I doubt will ruffle anyone's feathers. I've been uncharacteristically web-quiet during the middle of this month due to several personal matters which have absorbed my attention. However, with the coast slightly clearer today, I'm passing along these items for your consideration.

## Beta-testing CFP’s fast builds

The main gripe I've had with the [Cloudflare Pages](https://pages.cloudflare.com) (CFP) platform, as often noted in this here space, is how agonizingly slow its typical build time has become in recent months. A project that CFP used to build in about forty-five to fifty seconds now takes several **minutes** just to initialize the build environment, much less complete the build itself. I'd seen numerous promises that the CFP team was working on fixing this anomaly, but I was rapidly losing patience with the progress on that fix.

Then, a few days ago, I learned on the [Cloudflare Workers Developers Discord community](https://discord.gg/cloudflaredev)[^Workers] that a CFP "fast builds" fix was now in beta-testing. I eagerly submitted my three CFP-based projects for the beta, and the Cloudflare Pages team blessed them accordingly. Here's what I subsequently reported on Discord, comparing CFP's handling of the three projects’ repositories to that of the always quick-building [Vercel](https://vercel.com):

[^Workers]: CFP runs "atop" [Cloudflare Workers](https://workers.cloudflare.com).

> Very impressed with what I'm seeing. Did minor edits to each repo and pushed; each build environment initialization generally took about two seconds, not minutes, and here's how each overall build process compared with simultaneous processes (same push in each case) on Vercel:
> 1. *[Repo #1, the [Hugo](https://gohugo.io)-based version of this site]* — Vercel: 17 seconds; CFP: 38 seconds.
> 2. *[Repo #2, the [Eleventy](https://11ty.dev)-based version of this site]* — Vercel: 36 seconds; CFP: 51 seconds.
> 3. *[Repo #3, an Eleventy-based project I use to test multiple hosting vendors]* — Vercel: 49 seconds; CFP: 49 seconds.
> This is more like what we were seeing with CFP months ago. 👍  Hope this test goes super-well for everyone else and the fix goes GA ASAP.[^GAterm]

[^GAterm]: *GA*, in this case, means *general availability*.

The upshot: to CFP aficionados---and also any who may be curious about giving the platform a try but are understandably leery about the drawbacks of CFP's current build process---I say, "Hang in there. Help is on the way. I've seen it and it works."

## Remember the sitemap

Got this in the [ol’ emailbox](/contact) the other day amid some otherwise very nice comments from this person:

> I've been browsing your blog and displaying 5 post/page makes it a pain!

Of course, he was referring to my [paginated list of posts](/posts). Fortunately, I had a quick fix for him:

> Have you tried the HTML sitemap that's linked from the bottom of each page on the site? That way, you don't have to suffer through the paginated result. :-)

He soon replied:

> Thanks for the Sitemap Tip, it fulfills my needs perfectly.

So I repeat that suggestion here, hoping that you, too, find that [HTML sitemap](/sitemap) helpful. One other suggestion: make sure your own website has something like this. You never know what visitors may need.
