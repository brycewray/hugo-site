---
title: "Accepting reality about Astro"
description: "It comes down to understanding that not every SSG, no matter how otherwise attractive, is a good fit for this site."
author: Bryce Wray
date: 2022-10-05T11:27:00-05:00
#draft: true
initTextEditor: iA Writer
---

The increasingly popular [Astro](https://astro.build) [static site generator](https://jamstack.org/generators) (SSG) has many stellar attributes, a staggeringly nice community[^Dylan], and a rapidly growing user base. It's been the subject of a number of my posts here, and I've even tried using it to build and maintain this site --- more than once, in fact.

[^Dylan]: I'll always be grateful for that community's response on [one very special day in my life](/posts/2021/08/boy-oh-grandboy/).

Unfortunately, it seems I can no longer do so.

<!--more-->

I thought Astro's [recent emergence from beta testing](https://astro.build/blog/astro-1/) would mean an end to how frequently it would be introducing breaking changes (which, of course, are likely with *any* beta). But, in trying to develop this site in Astro since then, I haven't found that to be the case:

- **Brittleness** --- Due mainly to [one particular issue](https://github.com/withastro/astro/issues/4533) that I've come to call the "show-stopper," I haven't been able to manage an Astro version of this site because using [`Astro.glob()`](https://docs.astro.build/en/reference/api-reference/#astroglob) to provide things as simple as "Previous post"/"Next post" links tends to cause call stack errors in development mode.[^Gatsby]
- **Slowness** --- Using [MDX](https://mdxjs.com) files in Astro [had seemed](/posts/2022/07/astro-move-to-mdx/) to be a fix to its patience-eroding dev-mode slowness with Markdown files that I reported [back in April](/posts/2022/04/astro-ready-your-blog/#developer-experience) and [again in May](/posts/2022/05/mulling-over-migration/#dx-suffers-on-larger-sites); but, during the frequent updates to the plugin that enables the Astro/MDX combo, that slowness has kept returning.

[^Gatsby]:  It's a bit too reminiscent of my [2019 agonies](/posts/2019/07/why-staying-with-hugo/) with using dev mode in [Gatsby](https://gatsbyjs.com). (Perhaps Gatsby is better now, but I have zero interest in making sure.)

In the end, as I told a reader who'd [written](/contact/) to me about this and other subjects:

> Even if the Astro team were to issue a permanent fix today for my show-stopper issue, the dev-side experience is still ’waaaay too slow when a site has hundreds of MDX files. They've fixed that more than once, but it seems to regress to molasses-level slowness --- *e.g.*, 5 to 10 seconds between an edit and the hot-refresh response --- every other new series of updates. As a result, particularly as compared to working with basic Markdown in [Eleventy](https://11ty.dev) or [Hugo](https://gohugo.io), I simply can't bear working in Astro dev mode any more.
>
> However, **to be fair**: the Astro folks obviously are focused on promoting it for normal commercial sites, most of which typically are going to be full of HTML/Astro files (hence no slowdown) rather than MDX files; and I can't blame them for such a mindset, because That's Where The Money Is<sup>™</sup> --- not in non-monetized, low-traffic, MDX-replete, nerdy blogs. 😀

*[Links added.]*

Working with Astro has (usually) been fun over the last year or so, but it's time I moved on from assuming Astro will work for sites like mine. It's a superb site-building tool, and the sky's the limit for the [company](https://astro.build/blog/the-astro-technology-company/) behind that tool; but the sad reality is that not every tool is intended for every job.

To the wonderful people in the Astro community:\
*ad astra*, Astronauts. 👋

**Update, 2022-10-10**: [Bjorn Lu](https://github.com/bluwy), a [Vite](https://vitejs.dev/) core team member and Astro "core resident," determined that the "show-stopper" issue is due to an interaction between Vite and Node.js; [his fix](https://github.com/vitejs/vite/pull/10401) should be reflected in a future version of Astro. I'll keep you advised.
{.box}

**Update, 2022-10-13**: With today's release of [Astro 1.5.0](https://github.com/withastro/astro/releases/tag/astro%401.5.0), it appears the fix for the "show-stopper" has been included. However, the poor, laggy DX continues with `Astro.glob()` --- which, of course, is a totally separate issue.
{.box}
