---
title: "Forward PaaS"
subtitle: "Trying Cloudflare Workers and KV storage"
description: "How I’m testing the waters on an up-and-coming platform-as-a-service (PaaS) offering."
author: Bryce Wray
date: 2020-10-11T13:20:00-05:00
lastmod: 2020-10-22T13:15:00-05:00
#draft: true
discussionId: "2020-10-forward-paas"
featured_image: jj-ying-8bghKxNU1j0-unsplash_4032x3024.jpg
featured_image_width: 4032
featured_image_height: 3024
featured_image_alt: "Photo concept of high-bandwidth computer networking: Strands of glowing cables representing fiber-optical cables"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@jjying?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">JJ Ying</a>; <a href="https://unsplash.com/s/photos/network?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

It will come as no surprise to my regular readers that I like New Shiny, especially where this little old website is concerned. Well, I’ve succumbed again, for at least a test drive of an interesting [platform as a service (PaaS)](https://en.wikipedia.org/wiki/Platform_as_a_service) offering from [Cloudflare](https://cloudflare.com).

## Workers sites and Workers KV

{{< imgc src="Cloudflare_Workers_scrshot_2020-10-20_2526x1440.png" alt="Screen capture of Cloudflare Workers web page" width="2526" height="1440" >}}

[Cloudflare Workers](https://workers.cloudflare.com/) have been around [since 2017](https://blog.cloudflare.com/introducing-cloudflare-workers/). They allow developers to put code at the “edge” of Cloudflare’s worldwide [reverse-proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/) [content delivery network (CDN)](https://en.wikipedia.org/wiki/Content_delivery_network), letting users worldwide see faster results since it puts the content “closer” to those users.

A year later, Cloudflare [introduced Workers KV](https://blog.cloudflare.com/introducing-workers-kv/) (the *KV* stands for *key-value*), a way of providing *storage*, mainly for databases as well as code, out on the “edge.” Then, last year, as explained in a [blog post by Rita Kozlov](https://blog.cloudflare.com/workers-sites/), Cloudflare began pushing this setup as a way to put static websites online, [using the Workers KV “edge” storage to host such sites’ files](https://blog.cloudflare.com/extending-the-workers-platform/).

It’s important to note that, while a Cloudflare Worker is free, using KV to store your website files [costs at least $5/month for a Workers Unlimited Plan](https://workers.cloudflare.com/#plans).[^1] By “at least,” I mean you have to stay within certain bandwidth limits. Your site almost certainly wouldn’t exceed them but, still, it’s something to keep in mind.

With the three hosts I described in “[A normal person’s guide to static website hosting](/posts/2020/09/normal-persons-guide-static-website-hosting),” deploying content is as simple and quick as pushing a commit to your chosen online repository. With Cloudflare Workers, you have to use Cloudflare’s `wrangler` command-line interface (CLI) tools (which I’d compare favorably to [Firebase](https://firebase.google.com)’s CLI tools). I’m currently mitigating this through a [GitHub Action](https://github.com/features/actions),  an approach similar to what I described in “[O say can you CI/CD?](/posts/2020/06/o-say-can-you-ci-cd)” and “[Ignition sequence start](/posts/2020/09/ignition-sequence-start)”; but none of this is for normal, non-nerdy folks.

(For those who care: the GitHub Action is at the end of this post.)

There’s another minor issue, but it’s also fairly easily resolved although it took me several days to find the answer, eventually with help from two extremely kind gentlemen. (Thanks again, [Kenton Varda](https://stackoverflow.com/users/2686899/kenton-varda) and [Brian Li](https://brianli.com/)!) Here’s the deal: if you put a *regular* site behind Cloudflare, the service automatically caches the usual static assets (in my site’s case, CSS and font files, since [Cloudinary](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/dqunpyaeqiizezj6lbdu) [handles nearly all of the images](/posts/2020/07/transformed)) so they’ll load faster after the first time. But, [with a Cloudflare Workers site, it doesn’t work that way *by default*](https://stackoverflow.com/questions/64254291/cache-control-headers-in-a-cloudflare-workers-site), so you have to add a little JavaScript to make it happen.[^2] Again, it’s not for non-nerds, at least not right now.

## Stay tuned

Since I wasn’t quite sure upfront how this would work for me, I bought only one month of the Workers Unbundled plan; so we’ll see in a few weeks whether I stick with this or move the site back to one of the other hosts I’ve used. At this writing, the performance numbers I’m seeing are impressive.

---- 

## Appendix: A CFW + KV GHA—OK?

As promised above, here’s that GitHub Action I use to publish the site to my Cloudflare Worker and its KV storage. You’ll find no great difference between it and the GitHub Action I put in “[Ignition sequence start](/posts/2020/09/ignition-sequence-start)” for publishing to Firebase—with the possible exception of the fact that I’m using a [Cloudflare-created GitHub Action](https://github.com/cloudflare/wrangler-action) to handle the `wrangler` stuff. Of course, the value of `secrets.CF_API_TOKEN` is stored in the repo’s **Secrets** settings in GitHub.

```yaml
name: CI-Hugo-site-to-Cloudflare-Workers

on:
  push:
    branches:
      - master

env:
  HUGO_VERSION: 0.76.5 #steps below will pick extended version

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Checkout master branch
        uses: actions/checkout@master
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

[^1]:	The alternative would be to have a *conventionally* stored “bucket” on, say, Google Cloud Platform or Amazon S3—but *that’s* not truly free, either. And, even then, I suspect accessing content stored in that fashion and putting it out on the “edge” would be slower than the edge-*based* KV storage.

[^2]:	This goes into the `index.js` file that the `wrangler` tool “reads” during each build of the site.