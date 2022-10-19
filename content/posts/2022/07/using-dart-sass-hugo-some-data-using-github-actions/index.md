---
title: "Using Dart Sass with Hugo: some data on using GitHub Actions"
description: "After encountering some surprising results with my GHA-based method, I decided to do the math."
author: Bryce Wray
tags: [web-development, static-site-generators, ssgs, hugo, css, sass-scss, ci-cd, github-actions, website-hosting, cloudflare, cloudflare-pages, vercel, jamstack]
date: 2022-07-05T09:33:00-05:00
#initTextEditor: iA Writer
---

<span class="red">**Cutting to the chase . . .**</span>

If you have a [Hugo](https://gohugo.io) website hosted by [Vercel](https://vercel.com) and you followed my [earlier advice](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) about using a [GitHub Action](https://github.com/features/actions) (GHA) to deploy that site with [Embedded Dart Sass](https://sass-lang.com/blog/embedded-sass-is-live), it turns out you may be better off using either the [npm sass package](/posts/2022/03/using-dart-sass-hugo/) or a [shell script](/posts/2022/03/using-dart-sass-hugo-sequel/) --- each of which I explain in the links. To learn *why*, read on; but that's the bottom line.

----

In the process of using that GHA to deploy Ye Olde Hugo Site, here, I've noticed some curiosities --- especially where one particular hosting provider is concerned --- so I decided to collect some data, run some tests, and collect more data.

I did so on the only three [Jamstack](https://jamstack.org) hosting providers I recommend these days, in alphabetical order: [Cloudflare Pages](https://pages.cloudflare.com), this site's incumbent host as of the initial publication of this post; [Netlify](https://netlify.com); and Vercel, the site's backup host.

Now, the details.

## From speedster to snail

Soon after I began using the GHA-based method to deploy the site to both its primary target at CFP and its backup target at Vercel, I began noticing that Vercel's deploy speeds were lagging considerably behind those of CFP's. As those of you who've ever used Vercel with Hugo probably know, such sluggishness is exactly the opposite of what happens whenever you deploy a Hugo site using the [*normal* (non-GHA) Vercel process](https://vercel.com/docs/concepts/deployments/build-step): usually, Vercel **flies**. Thus, I went back through the site repo's GHA logs for the last few weeks, comparing the two hosts' respective deploy times --- and becoming more puzzled with each such examination.

Before I go on: truth be told, I included Netlify in this testing only briefly, at the end, mainly as a sanity check regarding the Vercel-specific data that I'll describe below. I found Netlify's performance pretty much as I'd expected from my previous use of that host to build the site with a GHA (about which I wrote [two years ago](/posts/2020/06/o-say-can-you-ci-cd/)): the total deploy time averaged just over a minute (68.25 seconds, to be exact), of which 35.5 seconds involved the act of actually **publishing** the Hugo-built site to the Netlify [CDN](https://en.wikipedia.org/wiki/Content_delivery_network). Given the [small size of Netlify's non-Enterprise-tier CDN](https://answers.netlify.com/t/is-there-a-list-of-where-netlifys-cdn-pops-are-located/855/2), that's not really impressive, but it still is consistent with previous tests I've run. Anyway: the point is, I was using Netlify only as one more point of comparison to see whether there might be something about just using a GHA that might be causing Vercel's woes (spoiler alert: nope).

In a further effort to nail down what was going on with the GHA-based process and Vercel, I tried *both* of the two most popular GHAs available for use with Vercel ([amondnet/vercel-action](https://github.com/amondnet/vercel-action) and [BetaHuhn/deploy-to-vercel-action](https://github.com/betahuhn/deploy-to-vercel-action)). Their respective results were sufficiently similar as to indicate that neither is the cause of the slowness I observed.[^BetaHuhn]

[^BetaHuhn]: In my [earlier article](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) about all this jazz, I used BetaHuhn/deploy-to-vercel-action within the recommended GHA for Vercel simply because I initially found this particular Action a bit less picky about its configuration, but these latest tests showed amondnet/vercel-action --- at least, once I finally got the hang of some of its differences --- is perfectly fine for these purposes, too.

Incidentally, this got noticeably worse after I began "dogfooding" my [`imgh` shortcode for Hugo's native image processing](/posts/2022/06/responsive-optimized-images-hugo/), rather than using [Cloudinary](https://cloudinary.com) as I'd done for [nearly two years](/posts/2020/07/transformed/). **Before** switching to `imgh`, a GHA-based deploy averaged a delta of 28.36% between Vercel and Cloudflare Pages: 63.01 seconds on Vercel *vs.* 49.08 seconds with CFP. **Afterward**, that gap jumped to **99.76%**, with Vercel coming in at 117.29 seconds and CFP at 58.71.[^outliers] (Again, these averages refer to *total* deploy times. We'll get more specific shortly.)

[^outliers]: To keep things fair and maintain meaningfulness for the data, I didn't count two outliers --- *i.e.*, cases of extremely long deploy times on Vercel. One of the outliers almost certainly was due to some oddity on the GitHub side (as nearly as I could tell from the GHA's log); the other was the *first* use of `imgh`, which taxed *both* Vercel and CFP far beyond the norm for these deploys.

Based on the test results:
- Usually, the Hugo-specific process of each deploy takes under 10 seconds for either Vercel or CFP, so they come out pretty much equal there.
- In addition, the "[runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners)" for the GitHub Actions seem not to be significant in affecting the respective deploy times.
- <span class="red">*The sticking point for Vercel appears to be in the segment of the deploy wherein it actually **publishes** the resulting website files to its CDN, and it clearly got much worse after I'd standardized on using `imgh` and locally hosting all my images.*</span>

## Protracted "publishes"

If you look at only the "publish" part of each GHA-based deploy, the disparity becomes even clearer. **Pre**-`imgh`, the delta between the two providers' average "publish" times was bad enough at 81.94% (35.74 seconds for Vercel *vs.* 19.65 for CFP); but, **post**-`imgh`, it mushroomed to **295.16%** (a whopping 81.73 seconds for Vercel *vs.* a barely-changed 20.68 for CFP).[^firstImgh] In other words: *with `imgh` in use, each GHA-based deploy took Vercel slightly over **one minute longer** to publish the site to its CDN than was the case for CFP and the vastly larger Cloudflare CDN.*

[^firstImgh]: In the final GHA-based deploy before I converted the site's image processing from Cloudinary to `imgh`, Vercel took 37 seconds of a 71-second total deploy time to publish to its CDN, while CFP took only 15 seconds of a 43-second total to publish. Then, the **first** time with `imgh` in place, each service had to suck up all those newly generated images, so the *overall* deploy times jumped quite a bit: Vercel to 273 seconds and CFP to 214, **although** the two services' actual *publish* times were radically different --- 113 seconds for Vercel but only 26 for CFP.

In case you're wondering: no, I have no idea whether this has something to do with the fact that Cloudflare owns and operates its CDN's points of presence (PoPs), while most if not all other Jamstack hosting vendors' CDNs consist of third-party PoPs. That determination is for others who are much smarter than I --- and possess far more inside info.

Here are two charts showing both the *pre*- and *post*-`imgh` "publish" performances for Vercel and Cloudflare Pages. While there are a few spikes here and there, you can see the overall trend of CFP's substantially outperforming Vercel on both sets of GHA-based "publish" events.

{{< imgc src="Pre-imgh_pubs_CFP-Vercel-GHAs-comparison_1800x1200.png"  alt="Chart comparing publish-to-CDN times from this site for Cloudflare Pages and Vercel prior to use of the “imgh” shortcode" width=1800 height=1200 >}}

<br />

{{< imgc src="Post-imgh_pubs_CFP-Vercel-GHAs-comparison_1800x1200.png"  alt="Chart comparing publish-to-CDN times from this site for Cloudflare Pages and Vercel with use of the “imgh” shortcode" width=1800 height=1200 >}}

## Workarounds for Hugo on Vercel

So, what can you do if your site is on Vercel and you (a.) want Hugo with Dart Sass[^deprecation] **but** (b.) also want to regain those swift Vercel deploys that you get without a GHA's involvement?

[^deprecation]: And, yes, you [definitely want Dart Sass, not Libsass](https://sass-lang.com/blog/libsass-is-deprecated).

I suggest you revert to the [standard, **non**-GHA Vercel process](https://vercel.com/docs/concepts/deployments/build-step) **and** do one of the following to get Dart Sass:

- [Use the npm sass package](/posts/2022/03/using-dart-sass-hugo/). Although doing it that way will result in slower local development (and the dependencies you must add with the use of any [Node.js](https://nodejs.org) package), it does avoid the problems caused by using a GHA to deploy to Vercel.
- [Use a shell script](/posts/2022/03/using-dart-sass-hugo-sequel/). It is a little more risky, in that one never knows whether Vercel may later bar its use[^ballpark], but it preserves the superior dev experience of using Embedded Dart Sass.

[^ballpark]: Quoting my analogy from [the post about using GHAs for this stuff](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/), in which "(A.)" refers to the GHA method and "(B.)" refers to the shell-script method: "It’s kinda like the difference between (A.) getting into a ballpark by buying a ticket and (B.) getting in by sneaking past an overly busy, preoccupied ticket-seller. Either way, you’re inside; but Option A is always suitable, while Option B works only until you get caught. (Okay, maybe that analogy is pushing it somewhat, but you understand what I’m saying.)" I would still urge reading [the whole post](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) to get the full context.

The latter method, shell-scripting, is how I'm continuing to use Vercel as this site's backup host. I'm glad to report that, this way, Vercel is its usual quick-like-a-bunny self again where my deploys are concerned.

----

## CFP build image update?

While I was finishing this post, I saw a [GitHub Discussions thread indicating that the Cloudflare Pages build image **may** get an update](https://github.com/cloudflare/pages-build-image/discussions/1). In the comments, I made a pitch for both a better version of Hugo --- the current CFP build image uses the [ancient *0.54.0*](https://github.com/gohugoio/hugo/releases/tag/v0.54.0), for God's sake --- **and** the option to specify Embedded Dart Sass through an environment variable, just as one now uses a `HUGO_VERSION` env var to pull a preferred, um, Hugo version *other than* 0.54.0. I'll keep you advised whether there's any progress on that front; but, as [Sidhartha Chatterjee](https://github.com/sidharthachatterjee) says at the top of the discussion:

> This is NOT a definite commitment to what we will deliver.

Still, if that *did* happen, it would completely eliminate the need for *any* end runs if you use Cloudflare Pages: you'd use the *normal* CFP deploy process, and everything would just work.
