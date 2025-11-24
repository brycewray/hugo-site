---
title: "From Pages to Workers (again)"
description: "After I learn of changes in Cloudflare’s priorities, this site’s deployment process goes backward down memory lane."
author: Bryce Wray
date: 2025-05-27T16:59:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

**Note**: After reading this, please see my [later post on this subject](/posts/2025/11/pages-workers-again-revisited).
{.box}

This site has lived on [Cloudflare Pages](https://developers.cloudflare.com/pages/) (CFP) for most of the last four years, having been initially on [Cloudflare Workers](https://workers.cloudflare.com) (CFW) as a "Workers site" after stays on several other web hosts. I'd gained the distinct impression that CFP was the path on which Cloudflare intended to stay where hosting static websites was concerned.

This morning, I learned not only that this was no longer the case but also that I'd "missed the memo" about it, and from a good while ago at that. A few hours of docs-reading and tinkering later, I had migrated the site back to running on a Cloudflare Worker. (Cloudflare doesn't call them "Workers sites" anymore.)

<!--more-->

## A buried lede

Every morning, one of my usual practices is to look through the [Hugo](https://gohugo.io) [Discourse forum](https://discourse.gohugo.io) to see what's going on in Hugo-ville. Today's visit brought me up short with a [discussion](https://discourse.gohugo.io/t/hugo-support-in-cloudflare-workers/54866) of recent Cloudflare changes and their effect on Hugo users' hosting on it. Nearly two months earlier, Cloudflare had issued a [blog post](https://blog.cloudflare.com/full-stack-development-on-cloudflare-workers/) that was mostly about enhancements to CFW. I had seen the post --- the Cloudflare Blog is among many I follow via RSS --- but apparently hadn't scrolled down far enough to catch what I now consider its buried lede, at least for CFP users such as I:

> Now that Workers supports both serving static assets **and** server-side rendering, you should **start with Workers**. Cloudflare Pages will continue to be supported, but, going forward, all of our investment, optimizations, and feature work will be dedicated to improving Workers. We aim to make Workers the best platform for building full-stack apps, building upon your feedback of what went well with Pages and what we could improve. *[Emphases are Cloudflare's.]*

In short: the CFP platform is now largely in maintenance mode, while its parent platform, CFW, is where Cloudflare will be investing its future dev efforts.

I was chagrined, but also got the message. Even though someone on the Cloudflare Discord later told me that I could probably keep things as they are for now, the same person also said that migrating the site to CFW still would be the wisest choice. As I would later mention elsewhere on Discord:

> I know CF **says** that existing Pages projects are OK, but it hasn't been that long since CF was urging people to transition from Workers projects to Pages projects, and now the opposite seems to be the case . . . Not crazy about having to *[migrate]*, but would rather move with the CF tide than be on a maintenance-only platform.

## From CFP back to CFW

This meant I'd have to make some changes. And, as the saying goes, there was bad news and good news.

The bad news: Hugo is not among the [recommended frameworks](https://developers.cloudflare.com/workers/frameworks/). Indeed, all of the current list's members are JavaScript-based, so one might pessimistically suppose Hugo will be excluded for a while. Also: while there definitely is [Cloudflare documentation for migrating from CFP to CFW](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/), following it is no walk in the park.

The good news: Hugo's amazingly helpful [Joe Mooring](https://github.com/jmooring) had created an [example repository](https://github.com/jmooring/hosting-cloudflare-worker) which showed how to do this, right down to a custom build script and the necessary configuration file. So I adapted those for my site's purposes, created a new CFW project which would handle my site's contents, and did the usual site-swapping DNS stuff to point my domain to that Worker rather than a CFP project.

One aspect that initially slowed the migration process was the site's existing use of a [Pages Function](https://developers.cloudflare.com/pages/functions/) to manage my [Content Security Policy](https://content-security-policy.com/) and the [caching of static assets](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl). That was a problem because a Pages Function actually **is** a Worker, so you can't just move it, unchanged, into another Worker and expect good results. Fortunately, Cloudflare's [`wrangler` utility](https://developers.cloudflare.com/workers/wrangler/), used for doing a ton of stuff with both CFW and CFP, can [compile the Pages Function code](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/#pages-functions-with-a-functions-folder) into a single file that works within a properly [configured](https://developers.cloudflare.com/workers/wrangler/configuration/) Worker.

The only remaining tricky thing for me was that, since October, 2023, I'd been [doing my Hugo builds locally and then deploying the results directly to CFP](/posts/2023/10/direct-deployments-quicker-slicker/), which I'd found ’waaaaay faster than the usual method of pushing changes to a linked online repository and then waiting for a cloud infrastructure to build and deploy the site. In addition, my way had been letting me push changes to the online repo **without** having to rebuild online as well, which was a more comforting way to manage version control. Thus, I ended up doing even a little more local retooling but got it to work by (1.) [disconnecting](https://developers.cloudflare.com/workers/ci-cd/builds/#disconnecting-builds) the online repo from the CFW project and (2.) changing my local script to deploy to the CFW project rather than, as before, the CFP project.

## It still ain't broke

During all of this rigamarole today, I did give some serious thought to whether I might be better off simply heading back to one of the previous hosts I'd used, rather than hoping Cloudflare doesn't make it even more complicated down the line to host my humble little site (for the big zero dollars a month I pay for it, of course).

In the end, I stuck with Cloudflare, simply because it quickly became clear that, annoyances notwithstanding, none of the alternatives was truly any better. Besides, I'd still have to deal with various idiosyncrasies, regardless of which host I chose. It wasn't quite a case of "If it ain't broke..." --- since, after all, I'd started the day assuming it wasn't "broke" as a CFP site, only to end up deciding otherwise --- but it was close enough.
