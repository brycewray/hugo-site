---
title: "Things worth watching in the Astro and Eleventy pipelines"
description: "Keep an eye out, as developers for two major JS-based SSGs work actively to resolve shortcomings."
author: Bryce Wray
date: 2022-12-20T11:43:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Regardless of how I may be building this site at any given time, I always keep an eye on what's happening with the JavaScript-based [Astro](https://astro.build) and [Eleventy](https://11ty.dev) [static site generators](https://jamstack.org/generators) (SSGs), each of which has, at one time or another, been the tool of choice here. It now appears that the developers for each are working on fixing certain major stuff that badly needs such tender loving care.

<!--more-->

## Astro and collections

It's easy to organize and manage content in Eleventy through [*collections*](https://www.11ty.dev/docs/collections/) --- *e.g.*, your posts, as opposed to other content on your site --- and, early in the development history of Astro, it had collections, too. However, that capability went away as Astro changed; and workarounds for it, often using the [`Astro.glob()` function](https://docs.astro.build/en/reference/api-reference/#astroglob), proved more complicated and, in some cases, problematic (as [I've described](/posts/2022/10/accepting-reality-astro/)).

That's why I'm pleased to see that [collections are coming back to Astro as of v.1.7.0](https://docs.astro.build/en/guides/content-collections/), albeit in "experimental" status at this writing. I'll hope that this feature (a.) stays around this time and (b.) proves to be as stable and enjoyable to use as was its predecessor.

## Eleventy and ES modules

One of Eleventy's biggest "I-love-it-but" aspects for even its most devoted fans has long been its inability to use [ES modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/). While many users probably never butt into the problem, more adventurous souls quickly find that some packages they'd like to use with Eleventy are rather opinionated about being ESM-only (or, at least, so these packages' documentation suggests). This grows only more troublesome over time, since ES modules have been around since 2015. Although a few hacks have been proposed here and there to make Eleventy more ESM-friendly, no official solution has come from the Eleventy repo itself --- at least, not yet.

But, now, I've seen that ESM support is coming in Eleventy 3.0, according to a
[recent comment](https://github.com/11ty/eleventy/pull/2575#issuecomment-1339684878) by Eleventy creator/maintainer Zach Leatherman. Of course, Eleventy *2.0* is still in "canary" stage, albeit quite stable in my opinion, but Leatherman [also noted](https://github.com/11ty/eleventy/issues/2675#issuecomment-1338239010) it'll go to production early in 2023; and, soon thereafter, some early builds of Eleventy 3.0 should start to appear. Following on this year's addition of first-class support for web components through the introduction of [WebC](https://www.11ty.dev/docs/languages/webc/), the gaining at long last of ESM support --- not to mention whatever else is coming in Eleventy 3.0 --- is almost certain to give Eleventy a significant boost in the ongoing battle for mindshare among JS-based SSGs.
