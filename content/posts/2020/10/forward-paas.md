---
title: "Forward PaaS"
description: "Testing the waters on Cloudflare Workers and KV storage — an up-and-coming platform-as-a-service (PaaS) offering." # DO NOT use non-breaking hyphens; not all fonts have them
author: Bryce Wray
date: 2020-10-11T13:20:00-05:00
---

It will come as no surprise to my regular readers that I like New Shiny, especially where this little old website is concerned. Well, I've succumbed again, for at least a test drive of an interesting [platform as a service (PaaS)](https://en.wikipedia.org/wiki/Platform_as_a_service) offering from [Cloudflare](https://cloudflare.com).

## Workers sites and Workers KV

{{< imgh src="Cloudflare_Workers_scrshot_2020-10-20_2526x1440.png" alt="Screen capture of Cloudflare Workers web page" >}}

[Cloudflare Workers](https://workers.cloudflare.com/) have been around [since 2017](https://blog.cloudflare.com/introducing-cloudflare-workers/). They allow developers to put code at the "edge" of Cloudflare's worldwide [reverse-proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/) [content delivery network (CDN)](https://en.wikipedia.org/wiki/Content_delivery_network), letting users worldwide see faster results since it puts the content "closer" to those users.

A year later, Cloudflare [introduced Workers KV](https://blog.cloudflare.com/introducing-workers-kv/) (the *KV* stands for *key-value*), a way of providing *storage*, mainly for databases as well as code, out on the "edge." Then, last year, as explained in a [blog post by Rita Kozlov](https://blog.cloudflare.com/workers-sites/), Cloudflare began pushing this setup as a way to put static websites online, [using the Workers KV "edge" storage to host such sites’ files](https://blog.cloudflare.com/extending-the-workers-platform/).

A Cloudflare Worker is free; but, when I originally published this post, using KV to store your website files [cost at least $5/month for a Workers Bundled Plan](https://workers.cloudflare.com/#plans). (By "at least," I mean you have to stay within certain bandwidth limits. Your site probably wouldn't exceed them but, in case it ever gets a burst of viral popularity one day, you'd want to keep these limits in mind.) Then, in a [blog post](https://blog.cloudflare.com/workers-kv-free-tier/) issued on November 16, 2020, Cloudflare announced a new **free tier** for KV storage which, even better, increased the size limit on each KV storage value from 10&nbsp;MB to 25&nbsp;MB. This appeared to change the ballgame where hobbyists’ use of Workers sites is concerned.

That said, I was initially concerned that the free tier might come up short compared to the Workers Bundled Plan because the former still lacked a key performance capability --- specifically, lower first-hit latency --- that's included with the latter. However, I've since tested the free tier, and the results suggest the difference is negligible for a static site like this one, so I now *think* that shouldn't be a problem. In addition: just for messing around with a Workers site so you can see how it all works before you go all-in, the free plan is a great new option.

**Important**: Still, be sure that you test this fairly extensively with lots of changes before you commit your site to it, because this can result in more "requests" in a given amount of time than the free tier allows.
{.box}

With the three hosts I described in "[A normal person's guide to static website hosting](/posts/2020/09/normal-persons-guide-static-website-hosting/)," deploying content is as simple and quick as pushing a commit to your chosen online repository. With Cloudflare Workers, you have to use Cloudflare's `wrangler` command-line interface (CLI) tools (which I'd compare favorably to [Firebase](https://firebase.google.com)'s CLI tools). I'm currently mitigating this through a [GitHub Action](https://github.com/features/actions),  an approach similar to what I described in "[O say can you CI/CD?](/posts/2020/06/o-say-can-you-ci-cd/)" and "[Ignition sequence start](/posts/2020/09/ignition-sequence-start/)"; but none of this is for normal, non-nerdy folks.

(For those who care: the GitHub Action is at the end of this post. In fact, I provided two: one for the [Hugo](https://gohugo.io) static site generator (SSG), and one for the [Eleventy](https://11ty.dev) SSG.)

There's another minor issue, but it's also fairly easily resolved although it took me several days to find the answer, eventually with help from two extremely kind gentlemen. (Thanks again, [Kenton Varda](https://stackoverflow.com/users/2686899/kenton-varda) and [Brian Li](https://brianli.com/)!) Here's the deal: if you put a *regular* site behind Cloudflare, the service automatically caches the usual static assets (in my site's case, CSS and font files, since [Cloudinary](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/dqunpyaeqiizezj6lbdu) [handles nearly all of the images](/posts/2020/07/transformed/)) so they'll load faster after the first time. But, [with a Cloudflare Workers site, it doesn't work that way *by default*](https://stackoverflow.com/questions/64254291/cache-control-headers-in-a-cloudflare-workers-site), so you have to add a little JavaScript to the Worker's `index.js` file to make it happen. Again, it's not for non-nerds, at least not right now.

## Worth it

Since I wasn't quite sure upfront how this would work for me, I bought only one month of the Workers Bundled plan (before the announcement of the free tier) to give the whole thing a spin. The performance numbers, both on this site and a special testing-only site I have on multiple hosting vendors, were impressive; and I subsequently found the free tier to be impressive, as well, *as long as* I never had to make a lot of changes in a short period of time, in which case the free tier's limits start to bite. Since I do find myself doing that from time to time, I decided to stay with the paid plan. As I explained to someone via email a few weeks ago:

> I believe right now I've found a pretty good solution in the combination of Cloudflare Workers and the KV storage; the main thing I have to decide is whether I want to continue to pay five dollars a month for it. So far, I'm justifying that expense plus the five-a-month for FastComments and the 14-a-month for Fathom Analytics (although the latter is reduced by a small number of affiliate earnings) by telling myself, "Well, other guys have hobbies that cost a lot more a month than this," but we'll see if my credit card and I can continue to run with that. The fallback host choice is still Vercel, since its free tier is so "performant," as the Kewl Kids say these days, but it's hard to ignore that Cloudflare's *[point of presence (PoP)]* count vastly outdoes that of Vercel's. Therefore, as long as I have readers in as many parts of the globe as the analytics keep telling me I do, I feel obligated to put the content out there in a way that makes their experience as pleasant (or, at least, as non-laggy) as possible.

----

## Appendix: CFW + KV GHAs --- OK?

As promised above, here are the GitHub Actions for publishing the site, whether built by Hugo or by Eleventy, to my Cloudflare Worker and its KV storage. You'll find no great difference between them and the GitHub Actions I put in "[Ignition sequence start](/posts/2020/09/ignition-sequence-start/)" for publishing to Firebase --- with the possible exception of the fact that I'm using a [Cloudflare-created GitHub Action](https://github.com/cloudflare/wrangler-action) to handle the `wrangler` stuff. Of course, the value of `secrets.CF_API_TOKEN` is stored in the repo's **Secrets** settings in GitHub.

### For Hugo

```yaml
name: CI-Hugo-site-to-Cloudflare-Workers

on:
  push:
    branches:
      - main

env:
  HUGO_VERSION: 0.76.5 #steps below will pick extended version

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Checkout default branch
        uses: actions/checkout@v2
      - name: Download Hugo v${{ env.HUGO_VERSION }} Linux x64
        run: "wget https://github.com/gohugoio/hugo/releases/download/v${{ env.HUGO_VERSION }}/hugo_extended_${{ env.HUGO_VERSION }}_Linux-64bit.deb -O hugo_extended_${{ env.HUGO_VERSION }}_Linux-64bit.deb"
      - name: Install Hugo
        run: sudo dpkg -i hugo*.deb
      - name: Install dependencies
        run: npm install
      - name: Build site with Hugo
        run: npm run build
      - name: Publish
        uses: cloudflare/wrangler-action@1.3.0
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          # Other args should come from wrangler.toml and what's in ./workers-site/
```

### For Eleventy

```yaml
name: CI-Eleventy-site-to-Cloudflare-Workers

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Checkout default branch
        uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'
      - name: Install dependencies
        run: npm install
      - name: Build content
        run: npm run build
      - name: Publish
        uses: cloudflare/wrangler-action@1.3.0
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          # Other args should come from wrangler.toml and what's in ./workers-site/
```
