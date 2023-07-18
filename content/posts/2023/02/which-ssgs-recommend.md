---
title: "Which SSGs I recommend"
description: "Here’s a recap of my thoughts about the best tools for building and maintaining personal websites."
author: Bryce Wray
date: 2023-02-03T09:22:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Participating in social media (even [Mastodon](https://joinmastodon.org)) can be a bummer at times, but it also can be encouraging. One source of such encouragement for me is seeing people asking how they can start building their own blogs, or websites, or whatever they want to call the things. The point is, they want to [own their stuff](/posts/2022/11/own-your-stuff/). That encourages me greatly, especially since I'm always pleased to offer my suggestions concerning such worthy endeavors.

<!--more-->

In last October's "[Blasts from the past](/posts/2022/10/blasts-from-past/)," I linked back to many previous posts about some of the subjects I've covered most frequently. One of those topics is the use of [static site generators](https://jamstack.org/generators) (SSGs) to build and maintain websites; and, in the relevant section of "Blasts from the past," I took that opportunity to summarize my recommendations about *which* SSGs one should consider.

Since then, I've seen a number of online requests for such recommendations, so the remainder of this post is a repeat of that section of "Blasts from the past," including its links to my related content.

----

## An SSG for your site

If you need to pick an SSG for maintaining your personal blog, my suggestion remains what it long has been: a "pick-’em" between [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io). How can you choose between them? After all, both produce equally fast websites, all other things being equal, so visitors' perceived performance is also a "pick-’em." From there, I'd break it down this way:

- If you're really into JavaScript (or want to be), go with Eleventy. You'll be much more comfortable there.
- If you want the greatest flexibility in templating, Eleventy is a no-brainer choice.
- If you want maximum speed in *development* mode, go with the staggeringly fast Hugo. Be prepared to get comfortable with its wonky templating, however.
- If you **don't** want to deal with plugins and dependencies, go with Hugo. Eleventy is a combination --- albeit an expertly assembled/maintained combination --- of [Node.js](https://nodejs.org) packages, while Hugo is a single binary with "batteries included."
- If you want to add features of your own choosing, go with Eleventy. This is where the Node.js universe has the advantage **if** you're willing to deal with all those added packages. (Hugo isn't nearly as extensible but, precisely for that reason, also is less brittle.)
- If your site has, or is going to have, a **lot** of content --- I'm talking thousands of pages or more --- go with Hugo. Although Eleventy *can* be used for mammoth sites, Hugo's sheer power makes them less onerous to manage, especially in dev mode.[^milpages]
- If your site is going to have multi-language content, go with Hugo, which has built-in support for that.

[^milpages]: Hugo's chief maintainer, Bjørn Erik Pedersen, has been hinting in recent months at a future update that will allow managing a site with "millions" of pages. While I doubt that anyone reading this needs that kind of power, it never hurts to have plenty of overhead room, so to speak.

What about the oft-mentioned [Astro](https://astro.build)? Although I retain very good feelings about Astro and the outstanding people behind it, I've personally found developing in Astro can still be annoyingly slow on a site with more than thirty or forty [MDX](https://mdxjs.com) files. However, if yours is smaller than that and likely to stay that way for a while, you may find the Node.js-based Astro your cup of tea, doubly so if you're at least somewhat familiar with coding for tools such as [Next.js](https://nextjs.org).

As for [Gatsby](https://gatsbyjs.com), the only other SSG I've ever used to manage this site, you can do so much better. Save yourself the trouble.

*(I advise newcomers to this site that the unintentional irony within the first few titles comes from my infamous 2019 "Dance" among various SSGs.)*

- "[Why I'm staying with Hugo](/posts/2019/07/why-staying-with-hugo/)" <span class="nobrk">(2019-07-14)</span>.
- "[Lessons learned](/posts/2019/07/lessons-learned/)" <span class="nobrk">(2019-07-21)</span>.
- "[Why I left Hugo for Eleventy](/posts/2019/09/why-left-hugo-eleventy/)" <span class="nobrk">(2019-09-08)</span>.
- "[Back with Hugo](/posts/2019/09/back-with-hugo/)" <span class="nobrk">(2019-09-20)</span>.
- "[Now I'm a Gatsby geezer](/posts/2019/10/now-gatsby-geezer/)" <span class="nobrk">(2019-10-27)</span>.
- "[Packing up](/posts/2019/12/packing-up/)" <span class="nobrk">(2019-12-08)</span>.
- "[Sorta StranGe (SSG) trip](/posts/2019/12/sorta-strange-ssg-trip/)" <span class="nobrk">(2019-12-27)</span>.
- "[A normal person's guide to static websites](/posts/2020/09/normal-persons-guide-static-websites/)" <span class="nobrk">(2020-09-12)</span>.
- "[Eleventy and Hugo: comparing and contrasting](/posts/2020/12/eleventy-hugo-comparing-contrasting/)" <span class="nobrk">(2020-12-28)</span>.
- "[Simplify, simplify](/posts/2021/02/simplify-simplify/)" <span class="nobrk">(2021-02-06)</span>.
- "[Is Astro ready for your blog?](/posts/2022/04/astro-ready-your-blog/)" <span class="nobrk">(2022-04-24)</span>.
- "[The winds of change](/posts/2022/04/winds-change/)" <span class="nobrk">(2022-04-26)</span>.
- "[Mulling over migration?](/posts/2022/05/mulling-over-migration/)" <span class="nobrk">(2022-05-07)</span>.
- "[Cloudflare dev docs and the switch from Gatsby back to Hugo](/posts/2022/05/cloudflare-dev-docs-hugo-gatsby/)" <span class="nobrk">(2022-05-27)</span>.
- "[Impressions from HugoConf 2022](/posts/2022/07/impressions-hugoconf-2022/)" (2022-07-11).
- "[The 'staying with Hugo' post, three years later](/posts/2022/07/staying-hugo-post-three-years-later/)" <span class="nobrk">(2022-07-14)</span>.
- "[Really getting started with Hugo](/posts/2022/07/really-getting-started-hugo/)" (2022-07-19).
- "[Accepting reality about Astro](/posts/2022/10/accepting-reality-astro/)" <span class="nobrk">(2022-10-05)</span>.
