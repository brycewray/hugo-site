---
#layout: singlepost
tags:
- post
title: "Beta-testing Cloudflare Pages"
description: "I take a look at a new, possibly game-changing website-hosting platform and find some early glitchiness, but also plenty of potential."
author: Bryce Wray
date: 2021-01-27T12:30:00-06:00
lastmod: 2022-03-28T13:52:00-05:00
#draft: false
discussionId: "2021-01-beta-testing-cloudflare-pages"
featured_image: "markus-spiske-KeFyYzxqmH0-unsplash_5760x3840.jpg"
featured_image_width: 5760
featured_image_height: 3840
featured_image_alt: "Closeup of a monitor showing computer code"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@markusspiske?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Markus Spiske</a>; <a href="https://unsplash.com/s/photos/web-development?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

[Cloudflare](https://cloudflare.com) announced a few weeks ago in a [blog post](https://blog.cloudflare.com/cloudflare-pages/) that it was moving into the build-your-website-on-the-[Jamstack](https://jamstack.org) arena currently inhabited by the likes of [Netlify](https://netlify.com), [Vercel](https://vercel.com), [Render](https://render.com), and, more recently, [DigitalOcean](https://www.digitalocean.com/products/app-platform/). Hosts like these build your website automatically every time you push changes to a connected online [Git](https://git-scm.com) repository, rather than forcing you to put together your own build chain as is required by the slightly older [Cloudflare Workers Sites](https://workers.cloudflare.com/sites) as well as Google's [Firebase](https://firebase.google.com).

That said, it's obvious from looking at the [documentation](https://developers.cloudflare.com/pages/) that Cloudflare Pages is built on a lot of the same "plumbing" as are Workers Sites. That's good news. Workers Sites, thanks to Cloudflare's [Workers KV storage](https://developers.cloudflare.com/workers/learning/how-kv-works), put websites’ content out on the network's worldwide "edge" with Cloudflare's [hundreds of points of presence (PoPs)](https://www.cloudflare.com/network/) and, thus, enhance those sites’ performance.

Intrigued by what I perceived as the promise of Cloudflare Pages (hereafter abbreviated as *CFP*), I signed up for its beta program on the day of the announcement; and, earlier this week, I finally gained access. Here's a summary of my first impressions. Please keep in mind as you read these, as well as any other such preliminary reviews you may find right now, that **this product is in beta**.

## Slow build process

I have two for-testing-only repositories that I use on multiple vendors, so tests among them are as "apples-*vs.*-apples" as possible. One is based on [Hugo](https://gohugo.io) and the other on [Eleventy](https://11ty.dev).

I figured building the Hugo-based site might be more problematic since the build process couldn't simply rely on a `package.json` file's dependencies list, as in the case of the Eleventy-based site. In truth, once I followed the documentation sufficiently, the Hugo site's build went fine, with one exception: CFP's default Hugo version at the time I was testing was a relatively ancient 0.54.0. Fortunately, the CFP UI lets you add environment variables to the build process, so I added one that set `HUGO_VERSION` to `0.80.0` (the current Hugo version as of this post's initial publication). While the docs didn't specify that particular variable as an option, it worked; and, to CFP's credit, it grabbed the *extended* version of Hugo, which is necessary for the SCSS I use in that particular repo.

The Eleventy-based repo did, indeed, build with no problems due to the build process's reading and following the `package.json` file.

So much for the good stuff about the build process; now for the bad stuff. Right now, the beta build process is **really slow**.

**Update, 2021-02-12**: Since I initially published this post, Cloudflare has significantly improved the build speeds. More on that below.
{.yellowBox}

Here's a breakdown of the first successful build for each repo, with each time segment in `min:sec` form. The titles for each action are directly from the CFP logs for these builds, except that I capitalized "Git" and the logs didn't.

### Hugo

*(Note that this repo uses only SCSS, while the other repo includes PostCSS and Tailwind CSS, so it's understandable that this one builds more quickly than the other.)*

- Initializing build environment: 2:31
- Cloning Git repository: 0:03
- Building application: 0:07
- Deploying to Cloudflare's global network: 0:25
- **Total build time: 3:07**

### Eleventy

- Initializing build environment: 3:07
- Cloning Git repository: 0:04
- Building application: 0:53
- Deploying to Cloudflare's global network: 0:19
- **Total build time: 4:24**

### Comparisons

So how do these compare with CFP's eventual competitors? Here's how a virtually identical[^notSameRepo] Eleventy-based repo did on its most recent builds on them:

[^notSameRepo]: It's not *the* same repo that I use with the other hosts because that repo is already set up for Cloudflare Workers, and the [Cloudflare Pages documentation suggests that's a bad idea](https://developers.cloudflare.com/pages/migrations/migrating-from-workers). I thus cloned that repo and removed all the Workers stuff, after which I used the "new" repo with only CFP.

- **Netlify**: 0:26
- **Vercel**: 0:23
- **Render**: 0:37
- **DigitalOcean App Platform**: 0:40

As for the less "automatic" ones that I handle via [GitHub Actions](https://github.com/features/actions):

- **Cloudflare Workers Sites**: 1:55
- **Firebase**: 1:24

So, clearly, the CFP folks have a lot of work to do on this part of it; and, based on a conversation I had with a Cloudflare staffer on the [Cloudflare Workers Discord server](https://blog.cloudflare.com/meet-the-workers-team-over-discord/), they're all too aware of that.

**Update, 2021-02-12**: Yesterday afternoon, Cloudflare pushed a change that dramatically cut the **total** build times. For a newer Hugo-based test site I've put on Cloudflare Pages, build now happens in about 45 seconds. While this is still slower than several of the competitors, the trend is definitely in the right direction.
{.yellowBox}

## Fine online performance

However, once you do get your repo past that slow build, the resulting site does very well online. Here are some of the results I got for the Eleventy-based repo, and please be assured these are *very* good as compared to how a virtually identical repo does on Vercel, Netlify, Render, DigitalOcean App Platform, Cloudflare Workers Sites, and Firebase.

- **webpagetest.org**, median from three runs
	- **Site: California  (EC2).**
	- [Time to first byte](https://web.dev/time-to-first-byte/): 75 milliseconds.
	- Document complete: 311 milliseconds.
	- Document fully loaded: 337 milliseconds.
	- [First contentful paint](https://web.dev/first-contentful-paint/): 381 milliseconds.
	- [Speed index](https://web.dev/speed-index/): 471 milliseconds.
	- [Largest contentful paint](https://web.dev/lcp/): 931 mulliseconds.

- **GTMetrix**, second of two runs
	- **Site: San Antonio, Texas.**
	- Time to first byte: 144 milliseconds.
	- Onload time: 350 milliseconds.
	- First contentful paint: 364 milliseconds.
	- Time to interactive: 365 milliseconds.
	- Speed index: 0.5 seconds.
	- Largest contentful paint: 1.0 second.

- **Dotcom-Monitor Dotcom-Tools**
	- **Site: San Francisco.**
		- [Google PageSpeed](https://developers.google.com/speed/docs/insights/v5/about) performance score: 100.
		- Load time, first visit: 0.5 seconds.
		- Load time, second visit: 0.7 seconds.
		- First contentful paint: 0.5 seconds.
		- Time to interactive: 0.5 seconds.
		- Speed index: 0.6 seconds.
		- First meaningful paint: 0.5 seconds.
	- **Site: Northern Virginia.**
		- Google PageSpeed performance score: 100.
		- Load time, first visit: 1.1 seconds.
		- Load time, second visit: 0.5 seconds.
		- First contentful paint: 1.5 seconds.
		- Time to interactive: 1.5 seconds.
		- Speed index: 1.6 seconds.
		- First meaningful paint: 1.5 seconds.
	- **Site: London.**
		- Google PageSpeed performance score: 100.
		- Load time, first visit: 1.0 seconds.
		- Load time, second visit: 0.9 seconds.
		- First contentful paint: 0.9 seconds.
		- Time to interactive: 0.9 seconds.
		- Speed index: 1.2 seconds.
		- First meaningful paint: 0.9 seconds.
	- **Site: Mumbai.**
		- Google PageSpeed performance score: 100.
		- Load time, first visit: 2.0 seconds.
		- Load time, second visit: 1.0 seconds.
		- First contentful paint: 1.3 seconds.
		- Time to interactive: 1.3 seconds.
		- Speed index: 2.1 seconds.
		- First meaningful paint: 1.3 seconds.
	- **Site: Brisbane.**
		- Google PageSpeed performance score: 100.
		- Load time, first visit: 1.5 seconds.
		- Load time, second visit: 0.3 seconds.
		- First contentful paint: 0.9 seconds.
		- Time to interactive: 0.9 seconds.
		- Speed index: 1.1 seconds.
		- First meaningful paint: 0.9 seconds.

One thing that CFP doesn't yet let you do (and, to Cloudflare's credit, you're warned about it in the CFP docs) is set up cache-handling for static assets. I suspect that will come, especially since there are ways to do it in Cloudflare Workers Sites, but it's not there yet.

## Getting ready to lead?

Once Cloudflare gets CFP's build processes up to snuff, CFP should give its competitors a serious run for their respective money, especially when you consider its free tier's [generous limits](https://developers.cloudflare.com/pages/platform/limits). (The Netlify free tier, in particular, doesn't fare well in that comparison.) With the built-in advantages of Cloudflare's CDN and what Cloudflare has already established for Workers Sites and KV storage, the Cloudflare Pages offering should be able to make some major waves as it joins what already is a highly competitive group.

---

***Slightly related side note***: Looks like Render is completing its [previously touted](https://community.render.com/t/cdn-vendor-change-timing-and-choice/71) CDN vendor transition to [Fastly](https://fastly.com). Earlier this week, as part of testing CFP, I compared the `ping` times of my CFP test sites with those of my comparable sites on other vendors. When I got to the Render-based site, I noticed that the returning data mentioned `render.map.fastly.net`. In my own tests so far, I could definitely see improved performance over what I was getting a few weeks back. While Render still has some issues that prevent me from rating it higher in this hosting category, its move to Fastly (a move which may still be unfinished for some accounts) is an unalloyed win.
