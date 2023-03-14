---
title: "Headers up: the Vercel edition"
description: "After a wait of nearly eighteen months, I finally have a Vercel Edge Function running on my non‑Next.js project."
author: Bryce Wray
date: 2023-03-14T04:31:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

[Vercel](https://vercel.com) [announced](https://twitter.com/vercel/status/1453034541463916549) in October, 2021, that it would be adding [Edge Functions](https://vercel.com/features/edge-functions) to its stable of products and features. However, at first, Vercel Edge Functions would work only on Vercel's [Next.js](https://nextjs.org) framework, with non-Next.js support --- including code examples to help developers --- slated for sometime in 2022.

Well, it's no longer 2022 but, at least for me, the wait has finally ended. So, if you, too, have been waiting impatiently to make use of Vercel Edge Functions on your non-Next.js project, this post may lift your spirits.

<!--more-->

## Edge-iness

Edge functions aren't just on Vercel but, rather, exist on multiple platforms under different names. For example, [Cloudflare Workers](https://workers.cloudflare.com) were introduced [in 2017](https://blog.cloudflare.com/introducing-cloudflare-workers/).

Like web content, a platform's edge functions exist on the "edges" --- *i.e.*, the worldwide points of presence (PoPs) --- of that platform's global content delivery network (CDN). This imposes far less latency than if the functions were on only one server that might be halfway around the world from a user. But, *unlike* content, edge functions also *run code* on the CDN's PoPs, providing a new run with each load or refresh of a web page. This can enable more dynamic capabilities for otherwise completely static websites.

Even after Vercel made it possible for non-Next.js projects to use Edge Functions, [I was unsatisfied](/posts/2022/05/gems-in-rough-18/#loose-ends) with the lack of relevant code examples. And I wasn't alone. Others had [begun asking for such examples](https://github.com/vercel/examples/issues/50) as early as a month after Vercel's original announcement of Edge Functions' availability.

By mid-2022, a small number of non-Next.js examples had trickled into Vercel's GitHub repository. However, I had no luck with adapting them to anything remotely similar to the Cloudflare Worker I'd begun using on my site months before the Vercel announcement, as explained in the first "[Headers up](/posts/2021/05/headers-up/)" post. While that Worker's original purpose had been only to control [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) for [caching purposes](https://web.dev/http-cache/), it had evolved over time so that it could also [enable me](/posts/2021/10/my-website-cloudflare-year-later/#up-front-cloudflare-workers) to inject [nonces](https://content-security-policy.com/nonce/) for an air-tight [Content Security Policy](https://content-security-policy.com) (CSP).

In multiple sessions over a period of months, I struggled in vain to duplicate the Worker's functionality in Vercel [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware). What drove me especially crazy was that, despite *knowing* [this was simply "white-labeled" Cloudflare Workers technology](https://news.ycombinator.com/item?id=29003514), I couldn't manage to use my Worker's code without crashing the resulting Edge Function, thus taking down whatever project I was attempting to run on Vercel.[^WorkerVsEF]

[^WorkerVsEF]: This is at least one way that the implementation of Cloudflare Workers is better than that of Vercel Edge Functions since, if my Worker crashes for some reason, it *won't* crash my project but, rather, will only cease providing its add-ons to the project.

I knew, of course, that the code couldn't be *exactly* the same. For example, while my Worker began with:

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/*
Functions to generate the nonce
on each page load
*/

async function handleRequest(request) {
```

. . . the `middleware.js`[^nameChg] file for Vercel would have to begin with:

[^nameChg]: In the early days, Vercel required the file's name to be `_middleware.js`/`.ts`, but that's not indicated in the [current documentation](https://vercel.com/docs/concepts/functions/edge-middleware/quickstart).

```js
/*
Functions to generate the nonce
on each page load
*/

export default async function handleRequest(request) {
```

## Try, try, try, try again

Then, a few nights ago, I decided to give the whole thing yet another go. The reason? I wanted to move my site to Vercel[^why] ***without*** weakening (or abandoning) the site's CSP, and the only way to accomplish that would be via an Edge Function.

[^why]: As for why, that's a story for another time, although my recent "[‘Publish or perish’ in 2023](/posts/2023/03/publish-or-perish-2023/)" may give you some clues.

I began cautiously, adapting one of the non-Next.js [examples](https://github.com/vercel/examples/tree/main/edge-middleware) to [inject simple headers](https://github.com/vercel/examples/tree/main/edge-middleware/add-header) such as:

```bash
x-test-from-middleware: true
```

. . . and, to my surprise and delight, everything worked. The Edge Function *didn't* crash and *did* show each header I specified. Even this simple result was more than I'd been able to accomplish in my earlier tests.

Gradually, I added some innocuous pieces of my original Worker code, such as for caching-related headers. It all still worked.

Then, emboldened by my apparent success after so many past failures, I tried dumping nearly the entire Worker code, including the nonces stuff, into `middleware.js` --- and the Edge Function crashed, taking down my project with it. (Obviously, the *real* site was still on [Cloudflare Pages](https://pages.cloudflare.com) during these tests; I wasn't *that* reckless, after all.)

I reverted `middleware.js` to the point where its Edge Function had worked, and began adding Worker code one or two lines at a time, trying to figure out what was causing the crash. Finally, late in the night, I discovered the culprit was this single line from the Worker code:

```js
  let cache = caches.default
```

. . . which understandably flummoxed Vercel, since [`caches.default` refers to a Cloudflare Workers API](https://developers.cloudflare.com/workers/runtime-apis/cache/). And, anyway, I saw this line didn't even serve a purpose in my Worker, much less in `middleware.js`! Thus, I simply deleted the problematic line and, *whammo*, my Vercel project had an Edge Function that performed the same tasks as had the Worker for my real site.

**Note**: To be safe, I later wrapped most of the code inside a [`try`...`catch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) so, if I later committed a typo or otherwise introduced a glitch, the Edge Function wouldn't crash.
{.box}

And that's how, the next day, after indulging in a social-media victory lap:

{{< stoot "mastodon.social" "110011486928150249" >}}

<!--
Managed at long last to get non-Next.js Edge Middleware working on Vercel. Had been frustrated in trying to convert a Cloudflare Worker for use with Vercel, mainly to create nonces for a Content Security Policy. Gave it yet another try yesterday and got the sucker to work. 🥳

https://github.com/brycewray/hugo-site/blob/main/middleware.js

#WebDev #Edge #Vercel #ContentSecurityPolicy

2023-03-12-1227CST (-1757UTC)

https://mastodon.social/@BryceWray/110011486928150249
-->

. . . I moved the site to Vercel while keeping all the functionality I'd had on Cloudflare Pages, thanks primarily[^obfus] to [my Edge Function](https://github.com/brycewray/hugo-site/blob/main/middleware.js).

[^obfus]: Over and above what the Edge Function allowed, I also wanted to duplicate on Vercel the [email address obfuscation](https://developers.cloudflare.com/support/more-dashboard-apps/cloudflare-scrape-shield/what-is-email-address-obfuscation/) Cloudflare had provided in every instance on the site where I gave my address --- namely, on the [contact page](/contact/) and in the "Reply via email" button at the bottom of each post. After finding a [related discussion](https://discourse.gohugo.io/t/email-address-obfuscation-techniques/1945) on the [Hugo Discourse forum](https://discourse.gohugo.io) and reviewing a reader's emailed comment on the same topic, I implemented the suggested solution. As of this writing, you can see it in my [posts template](https://github.com/brycewray/hugo-site/blob/main/layouts/posts/single.html) and a single-use [shortcode](https://github.com/brycewray/hugo-site/blob/main/layouts/shortcodes/encoded-email.html).

So, if you've considered using Vercel Edge Functions with your non-Next.js project, go ahead and give it your best shot. It may require some hassles before you can make it work, but take heart: it *can* be done.
