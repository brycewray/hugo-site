---
layout: singlepost
tags: post
title: "Webmentions in three SSGs: Part 3"
description: "Part 3 of a five-part series about incorporating the IndieWeb into three different static site generators (SSGs)—in this case, Hugo."
author: Bryce Wray
date: 2020-04-28T16:40:00-05:00
lastmod: 2021-05-16T10:28:00-05:00
discussionId: "2020-04-webmentions-three-ssgs-3"
featured_image: "marko-pekic-IpLa37Uj2Dw-unsplash_3542x2362.jpg"
featured_image_width: 3542
featured_image_height: 2362
featured_image_alt: "Communications concept - Red pay telephone booths"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@floating_point?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Marko Pekić</a>; <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

{{< disclaimer >}}

**Note**: This is Part 3 of a five-part series about how you can set up [webmentions](https://indieweb.org/Webmention) in websites built by three different [static site generators](https://staticgen.com): [Eleventy](https://11ty.dev) (the subject of [Part 2](/posts/2020/04/webmentions-three-ssgs-2/)), [Hugo](https://gohugo.io) (the subject of this part), and [Gatsby](https://gatsbyjs.org) (covered in detail in [Part 4](/posts/2020/04/webmentions-three-ssgs-4/)). In the [conclusion](/posts/2020/04/webmentions-three-ssgs-5/), you'll find a bibliography of the best articles I found on the subject of this series. All of the articles link (even if only through tiny [GitHub](https://github.com) logos) to their authors’ code. They were invaluable to this effort, and I encourage you to take particular notice of them and their authors.
{.yellowBox}

**Added note, 2020-07-26**: I have now archived the various configuration files linked within this series within a [GitHub repo](https://github.com/brycewray/files-webmentions) of their own and changed the links accordingly, so as to make them immune to ongoing changes in the repos originally linked from this series.
{.yellowBox}

In the [introduction](/posts/2020/04/webmentions-three-ssgs-1/) to this five-part series, I gave you a quick run-through about the [IndieWeb](https://indieweb.org) and the general setup of webmentions. In [Part 2](/posts/2020/04/webmentions-three-ssgs-2/), the subject was how you implement webmentions specifically in the [Eleventy](https://11ty.dev) SSG. Now, here in Part 3, we'll talk about implementing them in the [Hugo](https://gohugo.io) SSG.

Of the three repos, I worked on the [Hugo repo](https://github.com/brycewray/hugo_site_css-grid) before the [Gatsby repo](https://github.com/brycewray/gatsby_site_css-grid), because I figured (wrongly) that webmention-izing it to match the [Eleventy repo](https://github.com/brycewray/eleventy_bundler) would be more difficult than doing so for the Gatsby repo, so I wanted to get it over with. I based this assumption on the fact that both the Eleventy and Gatsby repos ran on [JavaScript](https://js.org), while the Hugo repo was overwhelmingly [Go](https://go.dev)-based.

In short: everything I'd learned up to that point involved JavaScript code and, with the Hugo repo, suddenly I'd be starting from scratch.

Or so I thought.

Fortunately, just as I'd already found ways to integrate JavaScript with the Hugo repo when adding [PostCSS](https://postcss.org) to it, it turned out there still would be use for some of the JS I'd borrowed/stolen for the Eleventy repo. Even better, it proved easier than I'd expected---not easy, but easier than I'd expected---to translate some of the JS to Hugo-flavored Go when that became utterly necessary.

## Hugo: Fetching webmentions

There's plenty of [data-massaging capability built into Hugo](https://gohugo.io/templates/data-templates/), so I wasn't so worried about how I'd handle that end of the process. My concern was how I'd go out to webmention.io and *grab* the data in the first place.

After I'd read a few articles and reviewed the associated code, I realized the best approach was, again, JavaScript-based. That ended up as [`/assets/js/webmentions.js`](https://github.com/brycewray/files-webmentions/blob/master/hugo_site_css-grid/assets/js/webmentions.js) which was based mostly on [Paul Kinlan](https://paul.kinlan.me/using-web-mentions-in-a-static-sitehugo/)'s work but also, to a limited extent, on the code by [Max Böck](https://mxb.dev/blog/using-webmentions-on-static-sites/) and [Sia Karamalegos](https://sia.codes/posts/webmentions-eleventy-in-depth/) that I used in the Eleventy repo.

Kinlan's code took a different approach: rather than fetching and then aggregating all the site's currently available webmentions into one JSON file, it downloaded into `/data/` a separate JSON file of webmentions for *each page* that had received them. To keep the files straight, the code applied [MD5 hashing](https://en.wikipedia.org/wiki/MD5) to the URL for each page with webmentions, then gave that page's JSON file the same hashed name.

Or, at least it would if it *could* fetch the webmentions from webmention.io. And therein lay the biggest problem I faced with the Hugo repo.

You see, one thing you have to "present" to webmention.io to "prove" that your site "deserves" to grab the webmentions is an *authentication token*. In the Eleventy site, you can easily handle this by creating a file, `/.env`, for storing such so-called [*environment variables*](https://en.wikipedia.org/wiki/Environment_variable) out of sight (**don't** source-control such a file; instead, add it to your `.gitignore`) but exposing them to other code through generic names such as `WEBMENTION_IO_TOKEN`. In an SSG like Eleventy or Gatsby that uses [Node.js](https://nodejs.org), that works because of a widely used [npm](https://npmjs.com) package called [`dotenv`](https://www.npmjs.com/package/dotenv).[^EnvVarsGatsby]

[^EnvVarsGatsby]: But Gatsby still made it, um, interesting, as you'll see in [Part 4](/posts/2020/04/webmentions-three-ssgs-4/).

Fine, I wondered, but how to do this in Hugo? Yes, I already had the repo using JavaScript because of PostCSS, but this was another matter. I was trying to get a non-Node-JS app to accept an environment variable from Node.js.

For a while, it looked as if the only working method would require including the token in plain sight in a `GET`-style query string: *e.g.*, something like `https://webmention.io/api/mentions.jf2?domain=brycewray.com&token=1234567890123`. Not a good idea, as you can imagine.

Finally, after hours of sifting through similar issues reports from Hugo users, I found the answer: setting up the appropriate [`/package.json`](https://github.com/brycewray/files-webmentions/blob/master/hugo_site_css-grid/package.json)-based scripts to run `/assets/js/webmention.js` **after** a command that would first run `dotenv` and, thus, "force-feed" it the environment variable! For example, the `/package.json` line[^NPMRun] for fetching webmentions in development mode was:

[^NPMRun]: This is invoked by the `npm run start` or `npm run build` script, as appropriate for your use case, in conjunction with the necessary Hugo script.

```json
"dev:wmFetch": "node -r dotenv/config assets/js/webmentions.js"
```

**Note**: If you deploy a repo like this through [Netlify](https://netlify.com), that `/.env` file is irrelevant in production, since the proper procedure is to [let Netlify handle sending an environment variable](https://docs.netlify.com/configure-builds/environment-variables/#declare-variables) at the appropriate time. Other than during development, I use that file only for executing "production" builds on my local setup in the testing process through the `testbuild` script in `/package.json`.


## Hugo: Displaying webmentions

After that, the only major thing left was creating a Hugo "partial"---[`/layouts/partials/webmentions.html`](https://github.com/brycewray/files-webmentions/blob/master/hugo_site_css-grid/layouts/partials/webmentions.html)---which would make the data presentable. I relied heavily on the Eleventy [`/_data/webmentions.js`](https://github.com/brycewray/files-webmentions/blob/master/eleventy_bundler/_data/webmentions.js) as my guide for writing the Go-flavor Hugo code to make this happen.

I expected the biggest hassle in that final part of the "webmention-izing Hugo" project would be getting Hugo to recognize the MD5-hashed URLs of the respective JSON files. Not so. Fortunately, Hugo has [built-in support for MD5](https://gohugo.io/functions/md5/#readout). And, in the end, I actually appreciated the whole approach because it simplified the process of identifying *which* set of webmentions went with each respective web page.

That left only:

- Putting a call to that partial in the [`/layouts/posts/single.html`](https://github.com/brycewray/files-webmentions/blob/master/hugo_site_css-grid/layouts/posts/single.html) template.

- Creating [`/layouts/partials/footer-wm.html`](https://github.com/brycewray/files-webmentions/blob/master/hugo_site_css-grid/layouts/partials/footer-wm.html), which was another footer partial like the original [`/layouts/partials/footer.html`](https://github.com/brycewray/files-webmentions/blob/master/hugo_site_css-grid/layouts/partials/footer.html) **except** that it included the necessary [microformats](https://indieweb.org/microformats) info for the site.

- Editing [`/layouts/default/baseof.html`](https://github.com/brycewray/files-webmentions/blob/master/hugo_site_css-grid/layouts/_default/baseof.html), the site's simplest but most important template, so that it would call to that webmentions-savvy footer partial on every page *except* for any pages within the paginated [posts list](/posts).

- As with the Eleventy repo, making appropriate edits to the webmentions.css file---in this case, [`/assets/css/webmentions.css`](https://github.com/brycewray/files-webmentions/blob/master/hugo_site_css-grid/assets/css/webmentions.css). In fact, the CSS was the same, so that was just a matter of copying the file from one repo's appropriate location to the other's.

Done.

## Next up: Gatsby

So, it was on to the [Gatsby repo](https://github.com/brycewray/gatsby_site_css-grid), which I naïvely believed would be a *relative* piece of cake. All I'd have to do was make a few changes to the JS from my Eleventy repo (see [Part 2](/posts/2020/04/webmentions-three-ssgs-2/) of this series). Right? Hmm?

Ahhh, not exactly, Space Cadet. Follow me to [Part 4](/posts/2020/04/webmentions-three-ssgs-4/)---if you have the stomach for witnessing a bloody struggle.
