---
title: "Gems in the rough #8"
description: "Checking out Astro; comparing vendors."
author: Bryce Wray
date: 2021-08-04T16:30:00-05:00
---

Each entry in the "Gems in the rough" series is a collection of tips, explanations, and/or idle observations which I hope will be at least somewhat useful to those of you with websites built by [static site generators (SSGs)](https://jamstack.org/generators).
{.blueBox}

## Astro: still rough, but promising

{{< imgh src="Astro_social_2021-08-04_2024x1012.jpg" alt="Astro SSG’s “social media image” as of 2021-08-04" >}}

I've been spending a lot of time the last week or two playing with [Astro](https://astro.build), an interesting but still very beta-test-y (alpha-ish, at times) new SSG offering from the folks behind the [Snowpack](https://snowpack.dev) build tool and [Skypack](https://www.skypack.dev) software package delivery network. Right now, Astro is kind of like what you'd expect if  [Next.js](https://nextjs.org) and Snowpack had a baby.

You might want to see [Fireship](https://fireship.io/)'s [YouTube video about Astro](https://www.youtube.com/watch?v=dsTXcSeAZq8), which explains the ideas behind this SSG in Fireship's typically pithy way.

Astro's got a lot of promise, but for now it's also kinda frustrating in that a lot of the example code in the [documentation](https://docs.astro.build) simply doesn't work as it should --- or, at least, it doesn't for me. Astro also is pretty opinionated by design, which has its good points --- *e.g.*, fewer ways for certain procedures to go wrong --- but also can make it difficult to re-use some items that work perfectly well on other SSGs.

For example: in the [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io) SSGs, you can insert *shortcodes* into your [Markdown](https://daringfireball.net/projects/markdown) text. This lets you insert bits of code to do cool things, like image processing, that Markdown on its own won't allow. In Astro, the only way to include code in Markdown is to use a `.astro` file with a proprietary `<Markdown>` element and then intermix your code with that. It works, but this limitation means you're not likely to move years’ worth of shortcode-laden `.md` files over from another SSG. That's a **big** deal. (The Astro team is [considering](https://github.com/snowpackjs/astro/issues/491) allowing components in actual `.md` files, somewhat like how the [`.mdx` file format](https://mdxjs.com/) works, so this particular gotcha may improve soon.)

On the bright side, I should note that I was able to convert this site's `imgc` image-delivery shortcode to an `Imgc.astro` component that works perfectly well when dropped into a `.astro` page, so that process is pretty straightforward.

On the still brighter side, the Astro team is friendly to a fault, seems to listen to any and all feedback, and is quickly building a great and helpful community --- including its presence on Discord. This reminds me a lot of the early days of Eleventy (or, at least, what I gather those were like considering that I didn't get into Eleventy until it was already well over a year old; by contrast, the first public beta for Astro appeared only a few weeks ago). We'll see what comes of Astro, which is getting a lot of attention in the SSG world right now.

## Using Speedlify to compare vendors

I have a cloned repo of Zach Leatherman's [Speedlify project](https://github.com/zachleat/speedlify) for testing the performance of some sites I've built on different static site hosting vendors with the same repository. While I typically use a cron job to run the Speedlify test automatically, I sometimes also do a manual run after making a change to the test repo. This gives me a chance to check the relative build times for the hosts. On the most recent push to this repo earlier this week --- upgrading a few dependencies but otherwise making no changes --- I got the following build times, in minutes and seconds (and, for comparison's sake, note also the previous push's build times).

1. **[Vercel](https://vercel.com)**: 0:28. Previous: 0:34.
2. **[Render](https://render.com)**: 1:26. Previous: unknown (Render couldn't display logs from earlier builds).
3. **[Cloudflare Workers site](https://workers.cloudflare.com)** via [GitHub Actions](https://github.com/features/actions): 1:35. Previous: 1:20.
4. **[Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/)** via GitHub Actions: 1:47. Previous: 3:56 (my first build to ASWA).
5. **[Cloudflare Pages](https://pages.cloudflare.com)**: 2:48. Previous: 2:23.
6. **[Digital Ocean Apps Platform](https://www.digitalocean.com/products/app-platform/)**: 3:41. Previous: 2:08.

I have no idea why DOAP's build time was so slow this time, sparing Cloudflare Pages from being the slowest of the six for once; stuff happens. That said, it's a big black eye for both the last two in that their build times **without** GitHub Actions were considerably slower than the two above them which **did** use GitHub Actions.

As for the actual performance numbers I see in Speedlify, you can check my [test results](https://speedlify-tests.netlify.app/hosts-tests/) at any time *(but see my 2021-09-25 update further down)*. Speedlify stores only the ten most recent results, so the trends you see lack statistical significance; **but** I can make a couple of general observations about what I've been seeing:

- Cloudflare Pages and DOAP tend to be in the top two or three pretty consistently, while the Cloudflare Workers site and ASWA tend to be in the **bottom** two or three almost as consistently.
- Render and Vercel are somewhat erratic, varying wildly from top three to bottom three. I'm at a loss to know why.

**Update, 2021-08-14**: Digital Ocean has cut the monthly build limit for App Platform static websites from the original 400 minutes to **only 100** minutes.[^CICD] Accordingly, I have taken the test repo off Digital Ocean, so the Speedlify test results mentioned above consist of only five sites as of now.
{.yellowBox}

[^CICD]: Of course, I could use GitHub Actions to get around this, as I explained in last year's "[O say can you CI/CD?](/posts/2020/06/o-say-can-you-ci-cd/)" --- but, as a friend overseas would say, "I can't be arsed."

**Update, 2021-09-18**: Azure deleted my test ASWA site tonight (early on 2021-09-19 according to UTC) because, apparently, it doesn't allow free static sites, after all, unlike the other vendors mentioned here. Consequently, the Speedlify test results now have four sites.
{.yellowBox}

**Update, 2021-09-25**: I've turned off the cron jobs that run the test each day, so the results will be frozen going forward. It seemed nonsensical to keep running the tests since the list of sites was down to just four --- two of them Cloudflare-based.
{.yellowBox}
