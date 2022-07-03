---
title: "Using Dart Sass with Hugo: some data on using GitHub Actions"
description: "After encountering some surprising results with my recently described GHA-based method, I decided to do the math."
author: Bryce Wray
date: 2022-07-05T13:00:00-05:00
draft: true
#initTextEditor: iA Writer
---

Here's some additional information on a subject I've covered several times over the last few months, namely how to deploy a [Hugo](https://gohugo.io) site with [Embedded Dart Sass](https://sass-lang.com/blog/embedded-sass-is-live) through the use of a [GitHub Action](https://github.com/features/actions) (GHA).

In the process of using [this method](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) to deploy this site, I've noticed some things which I found curious --- particularly where one hosting provider is concerned --- so I decided to collect some data, run some tests, and collect more data.

I did these tests on the only three [Jamstack](https://jamstack.org) hosting providers I recommend these days, in alphabetical order: **[Cloudflare Pages](https://pages.cloudflare.com)** (this site's incumbent host as of the initial publication of this post); **[Netlify](https://netlify.com)**; and **[Vercel](https://vercel.com)**.

----

Soon after I began using the GHA-based method to deploy the site to both its primary target at Cloudflare Pages and its backup target at Vercel, I began noticing that Vercel's deploy speeds were lagging considerably behind those of CFP's. As those of you who've ever used Vercel with Hugo probably know, such sluggishness is exactly the opposite of what happens whenever you deploy a Hugo site using the *normal* (non-GHA) Vercel process: usually, Vercel flies. Thus, I went back through the site repo's GHA logs for the last weeks, comparing the times involved for each by both hosts and becoming more perplexed as I went.

Before I go on: truth be told, I included Netlify in this testing only briefly, at the end, mainly as a sanity check regarding the data I gathered about Vercel that I'll describe below. I found Netlify's performance pretty much as I'd expected from my previous use of that host to build the site with a GHA (about which I wrote [two years ago](/posts/2020/06/o-say-can-you-ci-cd/)): the total deploy time averaged just over a minute (68.25 seconds, to be exact), of which an average of 35.5 seconds involved the act of actually **publishing** the Hugo-built site to the Netlify [CDN](https://en.wikipedia.org/wiki/Content_delivery_network). Given the [small size of Netlify's non-Enterprise-tier CDN](https://answers.netlify.com/t/is-there-a-list-of-where-netlifys-cdn-pops-are-located/855/2), that's not really impressive, but it still is consistent with previous tests I've run. Anyway: the point is, I was using Netlify only as one more point of comparison to see if there was something specifically in the process of just using a GHA that might be causing Vercel's woes (spoiler alert: nope).

In a further effort to nail down what was going on with the GHA-based process and Vercel, I tried *both* of the two most popular GHAs available for use with Vercel ([amondnet/vercel-action](https://github.com/amondnet/vercel-action) and [BetaHuhn/deploy-to-vercel-action](https://github.com/betahuhn/deploy-to-vercel-action)). Their respective results were sufficiently similar as to indicate that neither is the cause of the slowness I observed.[^BetaHuhn]

[^BetaHuhn]: In my [earlier article](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) about all this jazz, I used BetaHuhn/deploy-to-vercel-action within the recommended GHA for Vercel simply because I initially found this particular Action a bit less picky about its configuration, but these latest tests showed amondnet/vercel-action --- at least, once I finally got the hang of some of its differences --- is perfectly fine for these purposes, too.

Incidentally, this got noticeably worse after I began "dogfooding" my [`imgh` shortcode for Hugo's native image processing](/posts/2022/06/responsive-optimized-images-hugo/), rather than using [Cloudinary](https://cloudinary.com) as I'd done for [nearly two years](/posts/2020/07/transformed/). **Before** switching to `imgh`, a GHA-based deploy averaged a delta of 28.36% between Vercel and Cloudflare Pages: 63.01 seconds on Vercel *vs.* 49.08 seconds with CFP.[^noNetlify] **Afterward**, that gap jumped to **99.76%**, with Vercel coming in at 117.29 seconds and CFP at 58.71.[^outliers]

[^noNetlify]: This part of the testing was only CFP-*vs.*-Vercel, so I have no Netlify-related data for it; the latter came only briefly at the end of the testing, when I tried in vain to see whether there was something unique about using a GHA, in general, which could be responsible for the slowness of a GHA-based deploy to Vercel. While that does remain a possibility, the testing with Netlify didn't point me in that direction.

[^outliers]: To keep things fair and maintain meaningfulness for the data, I didn't count three outliers --- *i.e.*, cases of extremely long deploy times on Vercel --- two of which almost certainly were due to some oddity on the GitHub side (as nearly as I could tell from the GHA's log) while the other was the *first* use of `imgh`, which taxed both Vercel and CFP far beyond the norm for these deploys.

My tests show that, usually, the Hugo-specific process of each deploy takes under 10 seconds for either Vercel or CFP, so they come out pretty much equal there. *The sticking point for Vercel appears to be in the segment of the deploy wherein it actually **publishes** the resulting website files to its CDN.*

The last GHA-based deploy prior to `imgh`, Vercel took 37 seconds (of a 71-second total) to publish to its CDN while CFP took only 15 seconds (of a 43-second total) to do the same, even though the Cloudflare CDN has *many* more points of presence (PoPs) than does Vercel's.[^infra] The first time with `imgh` in place, each service had to suck up all those newly generated images, so the *overall* deploy times jumped quite a bit: Vercel to 273 seconds and CFP to 214, **although** the two services' actual *publish* times were radically different --- 113 seconds for Vercel but only 26 for CFP.

[^infra]: I have no idea whether it matters that Cloudflare really owns and operates its own CDN, while Vercel's is built on third parties' PoPs --- mainly Amazon. (The latter is true for other Jamstack hosting vendors, for that matter.)

In the 21 **subsequent** `imgh`-using deploys (*i.e.*, not counting that one super-slow deploy in which each vendor first absorbed all the new image files), this disparity got no better for Vercel: the average publish time was 82.52 seconds for Vercel and just 20.81 seconds for CFP. In other words, *each GHA-based deploy takes Vercel slightly over **one minute longer** to publish the site to its CDN than is the case for CFP and the vastly larger Cloudflare CDN.*

Here are two charts showing both the *pre*- and *post*-`imgh` performances for Vercel and Cloudflare Pages. While these represent *total* deploy times rather than the more isolated publish times, and although there are a few spikes here and there, you can see the overall trend of CFP's substantially outperforming Vercel on both sets of GHA-based deploys.

{{< imgh src="Pre-imgh_CFP-Vercel-GHAs-comparison_1800x1200.png"  alt="Chart comparing deploy times from this site for Cloudflare Pages and Vercel prior to use of the “imgh” shortcode" >}}

<br />

{{< imgh src="Post-imgh_CFP-Vercel-GHAs-comparison_1800x1200.png"  alt="Chart comparing deploy times from this site for Cloudflare Pages and Vercel with use of the “imgh” shortcode" >}}

## A Node.js-based workaround

So, what can you do if your site is on Vercel and you (a.) want Hugo with Dart Sass[^deprecation] **but** (b.) also want to regain those swift Vercel deploys that you get without a GHA's involvement? All I can suggest at this point would be reverting to the standard, **non**-GHA Vercel process --- and that means foregoing Embedded Dart Sass and, instead, using the [npm sass package](https://github.com/sass/sass) as I [described a few months ago](/posts/2022/03/using-dart-sass-hugo/). Although doing it that way will result in slower local development (and the dependencies you must add with the use of any [Node.js](https://nodejs.org) package), it does avoid any problems caused by using a GHA. For that matter, it also should be more future-proof, since you *won't* have to worry about any possibility that Vercel might shut the door on GHA-based deploys down the line.

[^deprecation]: And, yes, you [definitely want Dart Sass, not Libsass](https://sass-lang.com/blog/libsass-is-deprecated).
