---
#layout: singlepost
title: "Gems in the rough #15"
description: "CFP Fast Builds update, Hugo/goldmark typography, another Tailwind-on-Hugo solution."
author: Bryce Wray
date: 2022-03-03T15:05:00-06:00
lastmod: 2022-05-10T10:08:00-05:00
#initTextEditor: iA Writer
discussionId: "2022-03-gems-in-rough-15"
featured_image: "gemstones-sung-jin-cho-0d3qxUozE-0-unsplash_7315x4881.jpg"
featured_image_width: 7315
featured_image_height: 4881
featured_image_alt: "Colorful gemstones"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@mbuff?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sung Jin Cho</a>; <a href="https://unsplash.com/s/photos/gemstones?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

Each entry in the “Gems in the rough” series is a collection of tips, explanations, and/or idle observations which I hope will be at least somewhat useful to those of you with websites built by [static site generators](https://jamstack.org/generators) (SSGs).
{.blueBox}

## CFP's "Fast Builds" fix nears full release

[Late last year](/posts/2021/12/gems-in-rough-12/#beta-testing-cfps-fast-builds), [Cloudflare Pages](https://pages.cloudflare.com) began a closed beta test of its new *Fast Builds*  infrastructure, an attempt to replace the glitchy, ultra-slow setup which had plagued CFP-based sites for months. To get access, a CFP user had to request access on the Cloudflare Discord community; and I signed up ASAP after learning about it. Ever since, the Fast Builds process has been working pretty much like a champ for me, sometimes coming within ten seconds of the speeds the same repo can get on the speed champ, [Vercel](https://vercel.com), even though the CFP version, in my repo's case, **also** runs a [Cloudflare Worker](https://workers.cloudflare.com) in front of it.

On February 23, Cloudflare opened the beta to all CFP users---allowing them to enable Fast Builds in their Cloudflare dashboards---and said the new infrastructure would be fully released as CFP's standard setup starting April 1 (no April Fool's joke intended, I presume). While I wish it hadn't taken so long for the CFP folks to get this straight, there's no question they've already made CFP one of the top two or three hosting solutions for SSG-based websites, especially for free-tier users like me. And, truthfully, the time involved in fixing the builds issues isn't bad, considering this platform's relative youth compared to its numerous competitors: Cloudflare [launched CFP as a beta in late 2020](https://blog.cloudflare.com/cloudflare-pages/) and then [released it to GA status only last April](https://blog.cloudflare.com/cloudflare-pages-ga/). Most of the Other Guys have been doing it for quite a bit longer.

**Update, 2022-05-10**: While it didn't make the April 1 deadline, Cloudflare [announced today](https://blog.cloudflare.com/cloudflare-pages-build-improvements/) that the infrastructure fixes are now generally available.
{.yellowBox}
## Hugo/goldmark typography glitch finally solved

[Over a year ago](/posts/2021/01/gems-in-rough-02/#possessed), I first wrote here about a bug that was affecting the [Hugo](https://gohugo.io/) SSG's ability to convert [Markdown](https://daringfireball.net/projects/markdown) into HTML. The bug was not in Hugo itself, but rather was in the `Typographer` extension to the [goldmark](https://github.com/yuin/goldmark) Markdown parser which Hugo uses. For example, the bug would cause this Markdown&nbsp;.&nbsp;.&nbsp;.

```md
John's dog is named Sam. The Smiths' dog is named Rover.
```

.&nbsp;.&nbsp;. to appear as:

<p class="punctuationExample">John&rsquo;s dog is named Sam. The Smiths&apos; dog is named Rover.</p>

.&nbsp;.&nbsp;. rather than this correct version (note the single curly quotation mark after *Smiths*):

<p class="punctuationExample">John&rsquo;s dog is named Sam. The Smiths&rsquo; dog is named Rover.</p>

There were a few other cases like this, but all shared the same problem: an inability to close a set of curly quotation marks (double or single) under certain circumstances.

A few weeks earlier, I had filed [an issue](https://github.com/yuin/goldmark/issues/180) about this bug on the goldmark repository. I also put up a [demo page](https://gm-typographer.vercel.app/) to illustrate the problem more clearly, after the goldmark maintainer explained (in a comment within the issue) that English wasn't his primary language and, thus, he would appreciate help from outside.

Well, I'm pleased to report that [Nate Moore](https://twitter.com/n_moore) of the [Astro](https://astro.build/) team came to the rescue with a [pull request](https://github.com/yuin/goldmark/pull/280) that **fixed the problem** as of goldmark v.1.4.7, to which Hugo upgraded in this week's [release of Hugo 0.93.0](https://github.com/gohugoio/hugo/releases/tag/v0.93.0). So, if you share my preference for typing your Markdown for a Hugo site without requiring your text editor and/or OS to provide these typographical niceties, just move up to the latest Hugo version and you're good to go.

## Using Tailwind CSS 3.x with Hugo

The [post I wrote a few months back](/posts/2021/11/making-tailwind-jit-work-hugo/) about how to make [Tailwind CSS](https://tailwindcss.com/)'s [just-in-time (JIT) mode](https://v2.tailwindcss.com/docs/just-in-time-mode) work with Hugo didn't age well. At the time, Tailwind 2.x was the current version, and the procedure and code I described did enable Hugo to use that version. What I didn't know at that time was that [Tailwind **3.x**](https://tailwindcss.com/blog/tailwindcss-v3) was just around the corner, and it turned out to be a totally different ballgame making that one compatible with Hugo.

The good news is that, just as other Hugo users provided the savvy workarounds which enabled me to write that first post, still others have stepped into the breach to make Hugo work with Tailwind 3.x; and the **better** news is that what appears for now[^HugoTW] to be the best procedure is considerably less "hacky" than the one about which I wrote before. I plan to write a post about it soon; but, in the meantime, you can cheat by reading [this Dev.to article by Jonas Duri](https://dev.to/jonas_duri/how-to-use-tailwindcss-30-without-external-npm-scripts-just-hugo-pipes-2lg9), on which I'll rely heavily in that endeavor. I'll have a slightly revised version of his approach (as shown in the [proof-of-concept repository](https://github.com/Gioni06/hugo-pipes-tailwind-3/) to which his article links), based on more extensive CSS, but the main idea will be the same. **One important note**: if you try his solution in the meantime, please note that your device (and whichever web hosting vendor you use) will need to be running [Node.js](https://nodejs.org) version **16.x or higher**, in order to avoid the ["missing `stdin`"](https://github.com/Gioni06/hugo-pipes-tailwind-3/issues/1) problem which Mr. Duri's solution otherwise solves quite effectively.

[^HugoTW]: That is, until there's an official solution in the form of a Hugo version that needs no help, "hacky" or otherwise, in handling the Tailwind JIT functionality.
