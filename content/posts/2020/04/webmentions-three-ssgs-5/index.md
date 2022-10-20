---
title: "Webmentions in three SSGs: Part 5"
description: "Conclusion of a five-part series about incorporating the IndieWeb into three different static site generators (SSGs)."
author: Bryce Wray
tags: [web-development, static-site-generators, ssg, indieweb, webmentions, eleventy, gatsby, hugo, html]
date: 2020-04-28T16:50:00-05:00
---

{{% disclaimer %}}

**Note**: This is the conclusion of a five-part series about how you can set up [webmentions](https://indieweb.org/Webmention) in websites built by three different [static site generators](https://staticgen.com): [Eleventy](https://11ty.dev) (the subject of [Part 2](/posts/2020/04/webmentions-three-ssgs-2/)), [Hugo](https://gohugo.io) (the subject of [Part 3](/posts/2020/04/webmentions-three-ssgs-3/)), and [Gatsby](https://gatsbyjs.org) (covered in detail in [Part 4](/posts/2020/04/webmentions-three-ssgs-4/)).
{.yellowBox}

**Added note, 2020-07-26**: I have now archived the various configuration files linked within this series within a [GitHub repo](https://github.com/brycewray/files-webmentions) of their own and changed the links accordingly, so as to make them immune to ongoing changes in the repos originally linked from this series.
{.yellowBox}

[Yes, Virginia](https://en.wikipedia.org/wiki/Yes,_Virginia,_there_is_a_Santa_Claus), there *is* an end to this series.

Especially for those of you who took my [Part 1](/posts/2020/04/webmentions-three-ssgs-1/) recommendation to heart and read, or at least skimmed, through it all and in order: I apologize for the length of this series. Still, it could've been worse. I originally wrote it as *one long post* before deciding to break that up into five parts (intro, Eleventy-specific part, Hugo-specific part, Gatsby-specific part, and this wrap-up). When I realized that most people would want this information as it relates to only *one* of these SSGs, I knew I had to break it up into parts.

But, even so, even in parts: why so *many* details?

Because I'd been there.

As a result of my own struggles in finding answers, much less *explicable* ones, during this effort of putting webmentions into not only my [Eleventy-based site repository](https://github.com/brycewray/eleventy_bundler) but also my [Hugo-based](https://github.com/brycewray/hugo_site_css-grid) and [Gatsby-based](https://github.com/brycewray/gatsby_site_css-grid) public repos, I considered it more valuable to get everything in, rather than be brief for brevity's sake. (As if I ever do that, anyway, y'know.)

So, maybe, only a very small percentage of my already small complement of readers will ever see, much less use, the content. But, for those who *really, really need it*: there you go. I hope it helps.


## Bibliography for the series

Finally, here's that bibliography I've been flogging for all four parts up to now.

*Everybody* interested in implementing webmentions in static sites should find this useful, even if they don't specifically use any of the three SSGs I mentioned. Every developer article in this list has a link to the person's public repo, which I found *at least* as helpful as the article itself. As always, I sit on the shoulders of people who are *far* smarter than I, and I am immensely grateful to them.

Also, it'll often surprise me what I pick up from how others’ code works, especially when the thing I learn isn't even what prompted my search in the first place. Serendipity is cool.

### IndieWeb/webmentions (Part 1)

- [Bridgy](https://brid.gy) and its [FAQs page masquerading as an About page](https://brid.gy/about).

- [IndieWebCamp site](https://indieweb.org) and its [wiki](https://indieweb.org/IndieWeb), particularly the page "[Getting Started](https://indieweb.org/Getting_Started)."

- [IndieWebify.me: A guide to getting you on the IndieWeb](https://indiewebify.me).

- [webmention.io](https://webmention.io).

### Eleventy sites (Part 2)

- [Max Böck](https://mxb.dev), "[Static IndieWeb pt2: Using Webmentions](https://mxb.dev/blog/using-webmentions-on-static-sites/)."

- [Sia Karamalegos](https://sia.codes), "[An In-Depth Tutorial of Webmentions + Eleventy](https://sia.codes/posts/webmentions-eleventy-in-depth/)."

### Hugo sites (Part 3)

- [Amit Gawande](https://www.amitgawande.com), "[IndieWebify Your Hugo Website](https://www.amitgawande.com/indiewebify-hugo-website/)."

- [Keith J. Grant](https://keithjgrant.com), "[Adding Webmention Support to a Static Site](https://keithjgrant.com/posts/2019/02/adding-webmention-support-to-a-static-site/)."

- [Paul Kinlan](https://paul.kinlan.me), "[Using Web Mentions in a static site (Hugo)](https://paul.kinlan.me/using-web-mentions-in-a-static-sitehugo/)."

- [Jamie Tanna](https://www.jvt.me), "[Displaying Webmentions on my Hugo website](https://www.jvt.me/posts/2019/03/18/displaying-webmentions/)."

- "[Anyone for Webmention?](https://discourse.gohugo.io/t/anyone-for-webmention/10411)" (from the [Hugo community forums](https://discourse.gohugo.io)).

### Gatsby sites (Part 4)

- [Chris Biscardi](https://www.christopherbiscardi.com), "[Building Gatsby Plugin Webmentions](https://www.christopherbiscardi.com/post/building-gatsby-plugin-webmentions)."

- [Sung M. Kim](https://sung.codes), "[Clientside Webmentions in Gatsby](https://sung.codes/blog/2020/02/17/clientside-webmentions-in-gatsby/)."

- [Chad Lee](https://www.chadly.net), "[Embracing the IndieWeb](https://www.chadly.net/embracing-the-indieweb/)."

- [Knut Melvær](https://www.knutmelvaer.no), "[Getting started with Webmentions in Gatsby](https://www.knutmelvaer.no/blog/2019/06/getting-started-with-webmentions-in-gatsby/)."
