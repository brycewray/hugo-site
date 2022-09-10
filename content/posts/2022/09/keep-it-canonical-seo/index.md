---
title: "Keep it canonical for SEO"
description: "Use canonical URLs to keep search engines straight on which content they should index."
author: Bryce Wray
date: 2022-09-07T16:08:00-05:00
#draft: true
#initTextEditor: iA Writer
---

When you deploy your static website to a typical Jamstack-savvy hosting vendor, your host generates the site within a subdomain for one of that host's top-level domains (which may be something ending in `.app` or `.dev`). This continues to exist as a "live" website even if you've assigned a custom domain to your site, as I have assigned the *brycewray.com* domain to this site.

With some hosts --- notably, [Netlify](https://netlify.com) and the [Digital Ocean App Platform](https://www.digitalocean.com/products/app-platform) --- the subdomain may be some randomly generated nonsense, resulting in a URL of, say, *wondrous-weasel-d38a82.netlify.app* (although you usually can edit this subdomain to be something less, um, weird). Other hosts may use the name of your originating Git project, as do [Cloudflare Pages](https://pages.cloudflare.com) and [Vercel](https://vercel.com).

For example, let's say you have a site on Cloudflare Pages and have assigned the domain *example.com* to the site. If the project's online repo is called *our-website-repo*, it would exist on the web as not only *example.com* but also something like *our-website-repo-8dx.pages.dev*. This presents you with a *potential* problem for your site's search engine optimization (SEO): you must ensure that, when Google and other search engines find your content, they'll "know" which one --- your "real" site at *example.com* or the *.pages.dev* version --- to feature in their respective indices. Otherwise, the SEO "search juice" might go to that other version and **not** to the desired location at *example.com*.

The good thing is, it's simple to avoid this problem: just provide a [**canonical URL**](https://developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls). This indication, which takes the form of a *canonical tag* in your HTML's `head` element, tells search engines which online instance of each page to index.

If you're building your site with a static site generator (SSG) or other method that creates pages through templating, this is fairly simple to do. In a more manually built site, you may have a lot of pages to edit.

Anyway, continuing with our *example.com* example (?), here are links to explain how to do this in my three favorite SSGs:

- [Astro](https://astro.build): An [`Astro.url`](https://docs.astro.build/en/reference/api-reference/#astrourl) code sample from the [Astro documentation](https://docs.astro.build).
- [Eleventy](https://11ty.dev): "[Absolute URLs](https://www.aleksandrhovhannisyan.com/blog/useful-11ty-filters/#4-absolute-urls)" from [Aleksandr Hovhannisyan](https://github.com/AleksandrHovhannisyan)'s article, "[A Set of Useful 11ty Filters](https://www.aleksandrhovhannisyan.com/blog/useful-11ty-filters/)."
- [Hugo](https://gohugo.io): "[Hugo SEO Best Practices](https://cloudcannon.com/community/learn/hugo-seo-best-practices/)," a tutorial I helped to write for [CloudCannon](https://cloudcannon.com). (Scroll down to the section, "Set the canonical URL.")

Take these simple steps to maximize the likelihood that the content of your real site, and not that of the site's oddly named twin out on the host's platform, will garner all the "search juice" it deserves.
