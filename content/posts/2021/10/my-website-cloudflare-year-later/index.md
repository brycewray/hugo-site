---
title: "My website and Cloudflare, a year later"
description: "It’s perhaps not so much “love/hate” as it is geeky curiosity combined with an old guy’s impatience."
author: Bryce Wray
date: 2021-10-22T14:00:00-05:00
---

It's been a year now since the first time I used [Cloudflare](https://cloudflare.com) assets to host this [SSG](https://jamstack.org/generators)-based website, and I'm still trying to decide what I think about that.

In the beginning of my involvement with Cloudflare, I [deployed the site](/posts/2020/10/forward-paas/) using [Cloudflare Workers](https://workers.cloudflare.com). Not long after, [Cloudflare introduced](https://blog.cloudflare.com/cloudflare-pages/) its [Cloudflare Pages](https://pages.cloudflare.com) platform, clearly aimed at taking away market share from SSG-friendly hosting vendors such as [Netlify](https://netlify.com) and [Vercel](https://vercel.com). Cloudflare Pages [came out of beta status](https://blog.cloudflare.com/cloudflare-pages-ga/) a few months later and, since then, I've shifted the site back and forth between Vercel and CFP fairly regularly.

Here are some of my current feelings about Cloudflare Pages --- what keeps me coming back to it, and what sometimes drives me away.

## What keeps me coming back

### CDN, CDN, CDN

You know the old line about "[standing on the shoulders of giants](https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants)." There are no truer words when it comes to Cloudflare Pages, which benefits greatly from the platform on which it rides.

There's no question that what I like the most about using CFP is Cloudflare's global content delivery network (CDN). A CDN is only as good as how many points of presence (PoPs) it has and how well they work. Cloudflare has [*hundreds* of PoPs worldwide](https://www.cloudflare.com/network/), with more coming online all the time, and continues to [put ever-greater quantities of customers’ content](https://stratechery.com/2021/cloudflare-on-the-edge/) out on the "edge." This translates to faster performance, regardless of where one's visitors may be.

By comparison, Vercel's [Edge Network](https://vercel.com/docs/concepts/edge-network/overview), basically a [collection of other vendors’ PoPs](https://vercel.com/docs/concepts/edge-network/regions), is impressive for its much smaller size but, as I noted in last year's ["Forward PaaS" article](/posts/2020/10/forward-paas/) about Cloudflare Workers sites (quoting an email reply I'd given to a reader):

> .&nbsp;.&nbsp;. it's hard to ignore that Cloudflare's PoP count vastly outdoes that of Vercel's. Therefore, as long as I have readers in as many parts of the globe as the analytics keep telling me I do, I feel obligated to put the content out there in a way that makes their experience as pleasant (or, at least, as non-laggy) as possible.

### Up-front Cloudflare Workers

CFP is based on Cloudflare Workers, but it also can be used with them to provide additional features. In my site's case, I've done so to provide headers for [browser-side caching](/posts/2021/05/headers-up/) and, more recently, a thorough [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP).

With Vercel, you can try to do that through a `vercel.json` file, but the problem comes when you want to apply conditional logic --- specifically, setting certain headers for certain things but not for others. After all, not every element of a site needs the same settings for caching and/or the CSP. More to the point: a really tight CSP where scripts are concerned involves the application of [hashes](https://content-security-policy.com/hash/) or [nonces](https://content-security-policy.com/nonce/), and there just is no way to do that with a JSON file. But if you put an appropriately coded Cloudflare Worker in front of your CFP-based site, it can take care of all this as follows:

- Identify files that need caching and apply your preferred settings.
- Replace hard-coded nonces with dynamic ones in your own code.
- Insert dynamic nonces in third-party scripts associated with your site.

While it's (always) a work in progress, you can see my spaghetti-ish implementation of such a Worker at [this GitHub repo](https://github.com/brycewray/cache-nonce-mix). I put up the repo as part of a Cloudflare contest I entered for the LOLs, but I hope you'll find it useful, too. As you'll see within the code, I gained a great deal of inspiration from others’ contributions ("shoulders of giants," again).

**Update, 2021-10-26**: Vercel announced today at the latest **[Next.js](https://nextjs.org) Conf** event that it was introducing **[Edge Functions](https://vercel.com/features/edge-functions)**. Although the Edge Functions functionality is in beta for now and its [examples](https://github.com/vercel/examples/tree/main/edge-functions) so far are entirely Next.js-based --- as you'd expect, given that Vercel is Next's creator --- it may well be that, soon, I'll be able to host the site on Vercel while using an Edge Function to do what I currently do with that CF Worker when the site is on Cloudflare Pages. If Cloudflare doesn't fix my gripes with Pages (see below) in fairly short order, such a move will be awfully tempting, my aforementioned CDN comparisons notwithstanding.
{.box}

## What makes me leave (sometimes)

### Snail-like builds

CFP's build times remain slow to the point of being ridiculous, mainly during the initialization of the build environment. At best, that part takes thirty to forty-five seconds, but more commonly it's measured in minutes. Several minutes. Only then does the actual build start. When you consider that Vercel usually can do the *entire build* in around thirty seconds, this makes the CFP process even more agonizingly slow by comparison.

This usually isn't a gigantic pain point. However, there *are* times when I must publish multiple changes within a fairly short stretch of time; *e.g.*, I issue a post, only to catch a typo or other error that had previously escaped my eyes despite a thorough, out-loud read-through. In those cases in particular, the wait for Build One to finish so I can trigger the similarly slow Build Two gripes my cookies, to use the technical term.

Of course, there also are the times that the builds simply fail --- and only after they've seemed to be just even slower than usual --- quite a few minutes later.

On the [Cloudflare Pages Discord server](https://discord.com/channels/595317990191398933/789155108529111069), various employees have noted that the CFP team is working hard to resolve this cantankerous build process, and I believe them. However, they've been saying it for months now, so I begin to wonder how high a priority this fix has within Cloudflare. After all, the company is constantly rolling out new projects and products. (Just look through the [Cloudflare Blog](https://blog.cloudflare.com)'s entries for the last few months.) There are only so many hours in the day and only so many developers to do the work on just the existing projects, much less those yet to come. I admire the company's almost contagious enthusiasm and respect its ambition, but limits are limits.

### Overly aggressive caching

This is a Cloudflare-specific gripe and not specifically about CFP. Cloudflare's caching giveth, and the caching taketh away --- or, more to the point, the caching holdeth on for too long. While I've tried to set it and code for it appropriately, there are times when I simply can't get the frigging thing to dump previous content (including CSS) in favor of what I've provided in an update. This proves especially maddening for use on the notoriously cache-sticky Safari, which [analytics tell me](https://usefathom.com/ref/ZKHYWX)[^FAlink] many of my visitors use. PEBKAC? Could be. But, short of the drastic step of dumping the entire cache from the Cloudflare dashboard, I haven't found a bulletproof solution as yet. It seems to be getting better, but Stuff Still Happens.

[^FAlink]: Affiliate link.

## Choices, choices

Incidentally: you may be thinking that what I should do is just host on Vercel and run the Vercel site through Cloudflare while also putting the Worker in front of it. That way, in theory, I'd have the network and CF Worker advantages of Cloudflare combined with the superior build performance of Vercel. Well, that's technically possible, but [Vercel strongly recommends against it](https://vercel.com/support/articles/using-cloudflare-with-vercel#with-proxy) for reasons with which I completely agree.

I suppose I should be glad --- and I am --- that SSG users such as I have  multiple hosting choices with all the tremendous technical advantages that we enjoy today. It's not so much FOMO as that I am always wondering whether I can do better. I'd have hoped such a semi-compulsion would go away as I age, but it hasn't so far. All that said: choices are good, even if they're not always easy.
