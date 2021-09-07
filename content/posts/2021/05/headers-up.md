---
layout: singlepost
title: "Headers up"
subtitle: "Managing caching and FLOC"
description: "Here’s a Cloudflare Worker for handling headers with Cloudflare Pages."
author: Bryce Wray
date: 2021-05-01T11:43:00-05:00
lastmod: 2021-06-20T10:49:00-05:00
discussionId: "2021-05-headers-up"
featured_image: "server-room-90389_4818x3212.jpg"
featured_image_width: 4818
featured_image_height: 3212
featured_image_alt: "Floor view of data center showing numerous racks of servers"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/kewl-24755/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=90389">kewl</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=90389">Pixabay</a></span>
---

As I wrote [a few months ago](/posts/2021/01/beta-testing-cloudflare-pages), [Cloudflare Pages](https://pages.cloudflare.com)---which has since [emerged from beta testing](https://blog.cloudflare.com/cloudflare-pages-ga/)---is yet another in a growing list of [places](/posts/2020/09/normal-persons-guide-static-website-hosting) where you can host [static websites](/posts/2020/09/normal-persons-guide-static-websites). Back then, I dinged it for not giving you the ability to edit the [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) of a Pages site's content so you can control how a browser [caches](https://web.dev/http-cache/) that content for better performance.

Cloudflare Pages still lacks that ability at this writing. When you ask Pages-knowledgeable folks about it, the typical answer is that you should put a [Cloudflare Worker](https://workers.cloudflare.com) "in front of" a Pages site and manage its headers that way. Although I'd dabbled with Workers [before](/posts/2020/10/forward-paas), it was only as a way of using [Cloudflare Workers sites](https://developers.cloudflare.com/workers/platform/sites) and not in conjunction with Pages sites, so I didn't know how to proceed.

At least, I didn't until the other day, when I got an extremely helpful answer in the [Cloudflare Workers Discord channel](https://blog.cloudflare.com/meet-the-workers-team-over-discord/). It gave me enough of a start that, over the following hours, I could piece together a solution that, uh, worked.

## Full frontal

Here's what I said on that Discord channel:

> Many comments here and elsewhere suggest putting a CF Worker in front of a Pages site to handle things like headers. I have yet to find any documentation that explains exactly how the "in front of" part works---it's as if that's assumed knowledge. Is there a dead-simple example to which somebody could point me?

Within a few moments, I received this response[^styleEdit] from "NaturallyLexan," who appears to be not a Cloudflare employee but, rather, an extremely helpful developer:

[^styleEdit]: Edited for style.

> Sorry, long explanation ahead: basically, when you add a DNS record [in Cloudflare] to your domain---for example, a CNAME record that takes all requests at `https://example.com` and sends them on to `https://yoursite.pages.dev`---you can enable a proxy, using the little [orange cloud icon]. This means that Cloudflare can intercept any requests to your site, to apply its products. If you then add a worker route to `https://example.com` and `https://example.com/*`, any request going to your root domain will be sent to your Worker. Depending on the code of your worker, it can do many things. In the instance you are suggesting, it will fetch the resource requested from `https://yoursite.pages.dev`, apply the headers, [and] then return the requested content back to the original user, as fast as possible.

I gratefully replied:

> Thanks, @NaturallyLexan. That helps a lot.

. . . and so it did. Let's unpack what he/she told me.

In this scenario, your website's DNS is managed in Cloudflare, where your DNS settings screen shows info like this:

{{< imgc src="screen-cap-cloudflare-DNS_edit_1040x609.png" alt="Cloudflare DNS settings display" width="1040" height="609" >}}

You'll see here that there are two entries[^DNSitems] with the little orange cloud icon and the word "Proxied" under "Proxy status," each referring to an item under "Content" that ends in `.pages.dev` (the default subdomain for a Cloudflare Pages site before one assigns a custom domain to it). With these settings, every hit on the site gets *proxied*---essentially, intercepted---so Cloudflare can do things with it.

[^DNSitems]: Why two entries? One was for the root domain of `brycewray.com` and a second one was for its `www` subdomain.

If you simply leave such settings as they are and do no more, this enables Cloudflare to cache the site's content for faster delivery, employ protection against [DDoS attacks](https://en.wikipedia.org/wiki/Denial-of-service_attack), and so forth. But, with a Cloudflare Worker also set up to catch the hits, that's where things get even more interesting.

## Let's not FLOC together

My original reason for caring about all this was because I really wanted a way to edit a Pages site's *existing* HTTP headers, specifically for `Cache-Control`. But, in recent days, I learned of a relatively new header that I wanted to *add*.

In case you haven't yet heard, there's a big flap in Websitedom over Google's new tracking method, **[FLOC](https://www.howtogeek.com/724441/what-is-googles-floc-and-how-will-it-track-you-online/)** (Federated Learning of Cohorts). I am **not** a FLOC fan by any means; so, when I found a blog post called "[Opting your Website out of Google's FLOC Network](https://paramdeo.com//blog/opting-your-website-out-of-googles-floc-network)," I quickly followed its instructions and added a no-FLOC header to my existing site. At that time, the site was on [Vercel](https://vercel.com), which makes such header edits easy through use of a [`vercel.json` configuration file](https://vercel.com/docs/configuration) in the project's top level.[^moreOnFLOC]

[^moreOnFLOC]: In fairness, I must also note that there are [opposing views](https://seirdy.one/2021/04/16/permissions-policy-floc-misinfo.html) on the need for this.

Consequently, I now had another reason to learn how to manage a Pages site's HTTP headers.

## It just Works

Anyway, here's the Cloudflare Worker[^thanksWorker] I tested successfully during a *brief* move of my site to Pages earlier this week (at the end, I'll get into *why* it was brief):

[^thanksWorker]: This borrows heavily from a somewhat related [Stack Overflow answer](https://stackoverflow.com/a/56069077/) by [Simon_Weaver](https://stackoverflow.com/users/16940/simon-weaver), whose contribution I appreciate tremendously. It also is slightly derivative of some of the [examples](https://developers.cloudflare.com/workers/examples) in the [Cloudflare Workers developer docs](https://developers.cloudflare.com/workers/)---although I wish they had some simpler ones for folks like me.

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let response = await fetch(request)

  let ttl = undefined
  let cache = caches.default
  let url = new URL(request.url)
  let shouldCache = false

  const filesRegex = /(.*\.(ac3|avi|bmp|br|bz2|css|cue|dat|doc|docx|dts|eot|exe|flv|gif|gz|ico|img|iso|jpeg|jpg|js|json|map|mkv|mp3|mp4|mpeg|mpg|ogg|pdf|png|ppt|pptx|qt|rar|rm|svg|swf|tar|tgz|ttf|txt|wav|webp|webm|webmanifest|woff|woff2|xls|xlsx|xml|zip))$/

  if (url.pathname.match(filesRegex)) {
    shouldCache = true
    ttl = 2678400
  }

  let newHeaders = new Headers(response.headers)
  newHeaders.set("Permissions-Policy", "interest-cohort=()”)
  if (ttl) {
    newHeaders.set("Cache-Control", "max-age=" + ttl)
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  })
}
```

Once you have a Worker in place on your site, you then [specify the *routes*](https://developers.cloudflare.com/workers/platform/routes) on which it'll run. Within a few moments, it'll take effect and the Worker will be doing its thing.

This accomplished the following on my site during that test:

- Set the caching to 2,678,400 seconds (thirty-one days) for any file with a name ending with one of the numerous extensions in the `filesRegex` constant.[^earlierExample] Those extensions cover any conceivable type of static file I could imagine wanting a browser to cache.
- Adds a `Permissions-Control` header with the setting `interest-cohort=()`. As the [aforementioned blog post](https://paramdeo.com//blog/opting-your-website-out-of-googles-floc-network) explained, this tells Google your site won't participate in FLOC.

[^earlierExample]: The `filesRegex` part is based on the help I [received last year](https://stackoverflow.com/questions/64254291/cache-control-headers-in-a-cloudflare-workers-site) from Cloudflare's [Kenton Varda](https://twitter.com/kentonvarda) with what then was my Cloudflare Workers site.

## Results, yes, but&nbsp;.&nbsp;.&nbsp;.

When I ran the updated site through a browser Inspector, I saw the Worker was doing what I'd wanted: all the desired headers were as they should be, where they should be.

Problem is, the site performance wasn't that great on Pages as compared to the other hosts, notably [Vercel](https://vercel.com) and [Render](https://render.com), on which I'd had the site recently.

I hoped things would improve with subsequent hits---*i.e.*, as the Cloudflare network cached the site contents---but that wasn't the case.[^WorkerResult] So, within a few minutes, I took the site back off Pages.

[^WorkerResult]: I checked the site's native `.pages.dev` domain (untouched by the Worker, due to the routes-related settings) and compared it to what I was seeing with it in my domain, and didn't see any significant difference; so I don't **think** the Worker's actions were at fault, but it's not impossible, and I want you to keep that in mind as you consider whether to use this Worker with a Pages site.

Some comments I see from time to time on the aforementioned Cloudflare Discord channel suggest that the performance hits I noticed are simply part of the continuing growing pains for Pages, which is still a very new offering and for which I continue to have high hopes---especially if we get to the point where, as is the case with its competitors, one can easily manage headers and other settings much more simply. Otherwise, it'll never be a [good place for non-nerds to host their sites](/posts/2020/09/normal-persons-guide-static-website-hosting). 

All that said: for those who want to give Pages a try **and** want to have the control over HTTP headers that still isn't available in the product, the Worker shown above will do the job. [I welcome any improvements you can suggest for it.](/contact)