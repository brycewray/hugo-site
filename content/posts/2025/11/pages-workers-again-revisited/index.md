---
title: "From Pages to Workers (again): revisited"
description: "Getting the straight story from one who definitely knows what’s what at Cloudflare."
author: Bryce Wray
date: 2025-11-24T14:44:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Earlier this year, I had [some](/posts/2025/05/pages-workers-again/) [things](/posts/2025/07/hugo-sites-cloudflare-workers-or-not/) to say about a [Cloudflare announcement](https://blog.cloudflare.com/full-stack-development-on-cloudflare-workers/) concerning its Cloudflare Workers (CFW) platform and, more to the points I was making, the Cloudflare Pages (CFP) product on which this site had lived for a good while. It now turns out that I may have misunderstood things at the time, so this post is my attempt to fix things somewhat.

<!--more-->

My concerns came from this statement, a few paragraphs down in the Cloudflare announcement:

> Now that Workers supports both serving static assets **and** server-side rendering, you should **start with Workers**. Cloudflare Pages will continue to be supported, but, going forward, all of our investment, optimizations, and feature work will be dedicated to improving Workers. We aim to make Workers the best platform for building full-stack apps, building upon your feedback of what went well with Pages and what we could improve. *[Emphases are Cloudflare's.]*

I considered this to be the announcement's buried lede, and ended up summarizing it thusly:

> In short: the CFP platform is now largely in maintenance mode, while its parent platform, CFW, is where Cloudflare will be investing its future dev efforts.

All that brings me to today, when I saw a [Hacker News thread](https://news.ycombinator.com/item?id=46034281) about a [TechLife post](https://techlife.blog/posts/hugo-static-site-on-cloudflare/) concerning using Hugo with CFP. I added the following comment to the thread (the opening paragraph is a quote from one of my earlier posts on the subject):

> In an announcement \[0\] earlier this year, Cloudflare essentially put Cloudflare Pages on life support and began advising potential CFP users to build sites on the newly enhanced Cloudflare Workers platform instead.
> 
> I later wrote about this, particularly as it related to Hugo users.\[1\]\[2\]
> 
> \[0\]: https://blog.cloudflare.com/full-stack-development-on-cloudflare-workers/
> 
> \[1\]: https://www.brycewray.com/posts/2025/05/pages-workers-again/
> 
> \[2\]: https://www.brycewray.com/posts/2025/07/hugo-sites-cloudflare-workers-or-not/

Not long thereafter, I saw that my comment had received a reply from none other than Cloudflare's [Kenton Varda](https://github.com/kentonv):

> This is a bit of a misunderstanding.
> 
> We are not sunsetting Pages. We are taking all the Pages-specific features and turning them into general Workers features \-\- which we should have done in the first place. At some point \-\- when we can do it with zero chance of breakage \-\- we will auto-migrate all Pages projects to this new implementation, essentially merging the platforms. We're not ready to auto-migrate yet, but if you're willing to do a little work you can manually migrate most Pages projects to Workers today. If you'd rather not, that's fine, you can keep using Pages and wait for the auto-migration later.

Given his key role in the CFW project (as of this writing, he is its Tech Lead and has been for quite some time), that's pretty much coming from the proverbial horse's mouth!

I responded to thank him for the clarification, while also noting that I wish Cloudflare had run that key paragraph past him before sending me, and others, into subsequent confusion about its meaning:

> . . . which sounds (at least to me) more like an "either/or" situation, and a "Pages-is-going-into-maintenance mode" situation, than your answer suggests. But perhaps that's just how I took it.

Finally: I will continue to keep those two earlier posts on this site, only with notes pointing to this post --- not so much as a *mea culpa* or anything like that but, rather, just in the hope of providing a more complete look at the whole thing.
