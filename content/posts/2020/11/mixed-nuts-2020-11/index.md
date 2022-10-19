---
title: "Mixed nuts • November, 2020"
description: "Follow my erratic mind, if you dare, as it proves anew that it deserves that adjective."
author: Bryce Wray
tags: [personal, meta, mass-media, css, caching, website-performance, website-hosting, cdns, netlify, vercel, cloudflare, cloudflare-workers, writing-applications, ulysses]
date: 2020-11-07T10:10:00-06:00
---

Given the course of recent events in our storm-tossed existence, both here in the United States and elsewhere, it seems a good time to whip out another set of those miscellaneous observations I typically call "mixed nuts" (most recent such assortment was [this example](/posts/2020/09/mixed-nuts-2020-09/))&nbsp;.&nbsp;.&nbsp;.

----

Regardless of which country you inhabit or which party (if any) you follow, you can be sure of this about elections: the good guys always want all legally qualified citizens to vote *and* want all the votes to be counted, no matter how long it takes.

*Trying to sell your house? Don't rely on those "we-buy-it-quick-so-you-can-get-out" companies, hereafter referred to as* ZeeCOs. *Folks I know contracted with a ZeeCO to buy their old house so they could get a new one. Just days before the dual closings, the ZeeCO suddenly backed out because the neighborhood's homeowners’ association (HOA) was being sued for reasons that had zero effect on the [saleability](https://dictionary.cambridge.org/us/dictionary/english/saleable) of these folks’ old house.[^1] Fortunately, they made other arrangements and still got the new house, but they'd learned never to trust ZeeCOs.*

O, for the return of *real* cable news channels, fashioned after the way they operated before the mid-1990s, back when they actually spent most of their 24-hour cycles *reporting* and (mostly) separated editorial comments into a blissfully few specific panel shows.

*Although this site is [now more than two years old](/posts/2020/09/two-but-not-terrible), only recently have I grasped the [importance of making a website properly cache its static assets](https://gtmetrix.com/leverage-browser-caching.html) --- so, for example, your browser doesn't have to reload the CSS file every time you go from one of my pages to another. Thus, it was my pleasant surprise, on this site's recent, temporary return to the [Hugo](https://gohugo.io) static site generator (SSG), to discover how easy Hugo makes this process, thanks to its [fingerprinting capability](https://gohugo.io/hugo-pipes/fingerprint/). With [Eleventy](https://11ty.dev), you need some additional, external trickiness about which I learned and will be writing in the near future.*

While writing a few days ago in [Ulysses](https://ulysses.app), I suddenly found I couldn't add footnotes, among other usually available elements, within "sheets" (as they're called in Ulysses-ese) created with the latest version. Reported to Big U Support. Turned out that, somehow, I'd switched Ulysses to vanilla [Markdown](https://daringfireball.net/projects/markdown) rather than its default flavor, Markdown XL. Oops. Just noting it in case other Ulysses users run into similar problems.

*My "lurch" among [Jamstack](https://jamstack.wtf)-savvy website hosts [over](/posts/2020/07/goodbye-hello/) [the](/posts/2020/07/goodbye-hello-part-2/) [last](/posts/2020/08/goodbye-hello-part-3/) [few](/posts/2020/09/goodbye-hello-part-4/) [months](/posts/2020/09/goodbye-hello-part-5/) makes it clear that, of the "automatic" hosts[^2], [Vercel](https://vercel.com)'s free tier has by far the best combination of superior worldwide performance (especially because of the [recent enhancements](https://vercel.com/blog/new-edge-dev-infrastructure) to its [Edge Network](https://vercel.com/docs/edge-network/overview)) and clean, no-fuss maintenance. That said, my [experiment](/posts/2020/10/forward-paas/) with [Cloudflare Workers sites](https://workers.cloudflare.com) and [Workers KV storage](https://developers.cloudflare.com/workers/learning/how-kv-works) was extremely interesting from a geekiness standpoint and, were I to drop Vercel for some reason, a Cloudflare Workers site --- although **not** free --- would be the very close second choice.*

**Update**: Cloudflare's subsequent announcement of a **free** tier for Cloudflare Workers KV storage followed by my successful test of that tier's performance further changed the equation, as explained in the updates I've since made to "[Forward PaaS](/posts/2020/10/forward-paas/)."
{.yellowBox}

[^1]:	If you think HOAs don't often get sued, you're kidding yourself.

[^2]:	By "automatic" host, I mean one that deploys your website every time you push a change to the site's remote repository. By contrast, you have to set up your own continuous deployment --- *e.g.*, a [GitHub Action](https://github.com/features/actions/) --- to deploy a [Firebase](https://firebase.google.com) site or a [Cloudflare Workers site](https://workers.cloudflare.com) that way.
