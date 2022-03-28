---
layout: singlepost
tags: post
title: "Goodbye and hello • Part 4"
#subtitle: "The future is now, so to Render we go"
description: "My curiosity overcomes me and, yet again, I move the site."
author: Bryce Wray
date: 2020-09-05T09:00:00-05:00
lastmod: 2021-05-16T10:39:00-05:00
discussionId: "2020-09-goodbye-hello-4"
featured_image: "jeremy-thomas-E0AHdsENmDg-unsplash_5005x3417.jpg"
featured_image_width: 5005
featured_image_height: 3417
featured_image_alt: "Time exposure of a star field"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@jeremythomasphoto?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jeremy Thomas</a>; <a href="https://unsplash.com/s/photos/stars?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

{{< disclaimer >}}

Rather than continuing to pile addenda on the original "[Goodbye and hello](/posts/2020/07/goodbye-hello/)" post about how I moved this site from [Netlify](https://netlify.com) to [Vercel](https://vercel.com) some weeks back, I've turned those addenda into [separate](/posts/2020/07/goodbye-hello-part-2/) [posts](/posts/2020/08/goodbye-hello-part-3/), each dated according to when I'd added its content to the first post. When I look at others’ sites, I gather this is the more common---not to mention less mutually aggravating---way of explaining such changes to one's readers.

----

So, to recapitulate: after having kept this site on Netlify for its first twenty-one-and-a-half months of existence, I moved it to [Render](https://render.com) in late June, [to Vercel a day later](/posts/2020/07/goodbye-hello/), [back to Netlify a few weeks after that](/posts/2020/07/goodbye-hello-part-2/), and [*again* to Vercel three weeks hence](/posts/2020/08/goodbye-hello-part-3/).

All the while, as you could probably tell in the first "Goodbye and hello," I was keenly interested in Render; but I ended up deciding that Render's older, somewhat more polished competitors were better fits.

For a while, that was true.

Still, throughout all the gyrations among these hosts, I'd never quite gotten past the idea that Render was special---a vendor with a bright future, and something I needed to keep watching. I found myself drawn to at least daily checks of the [Render Slack community](https://render-community.slack.com/join/shared_invite/zt-fs26mwq8-P98fMK7axMHNny54c_yzcg#/), where Render techs---and, surprisingly often, even Render CEO/Founder Anurag Goel himself---provided help to not only Render users (both free-tier and paying) but also those simply seeking more info about Render.

## All hands: prepare to jump (again)

In recent days, the curiosity finally became too great.

As a result, I created identical microsites on Vercel, Netlify, and Render (identical so comparing them would be a case of "apples *vs.* apples *vs.* apples”); then, I set up [Zach Leatherman's Speedlify tool](https://github.com/zachleat/speedlify/) to scan them three times a day, measuring each microsite's respective performance.

As the days went by, a pattern emerged from the Speedlify results. While it didn't *always* win, the Render microsite *usually* won---this, despite the [vaunted advantages of Vercel's Global Edge Network](https://vercel.com/blog/new-edge-dev-infrastructure).[^1]

Having determined early on that I would let the data be my guide, I found the case to be narrow, but clear, for Render. And, so, yesterday, my site was back on Render for the first time since that initial, one-day ride in late June.

Of course, as is now achingly clear, whether I will let it *stay* there remains to be seen.

That said: at least as of this writing, I am optimistic. Unlike the other moves, this one wasn't followed by a vague sense of unease that, maybe, I should've waited a little longer before I placed my "bet" on this "horse."

It may not win every single race but, boy, does it have great days ahead of it, and I think I want to be around as it gets to them.

**Note**: Unfortunately, it turned out I hadn't done my due diligence, and so there's a---wait for it---[Part 5](/posts/2020/09/goodbye-hello-part-5/). (Arrgh.)
{.yellowBox}

[^1]:	Because of how hobbled Netlify's free tier is when compared to the free tiers of Render and Vercel, the Netlify microsite never really was in the ballgame. It served more as a point of comparison than anything else. The same was true for another identical microsite that I briefly had on [Firebase](https://firebase.google.com) at the beginning of the testing. I pulled it from the test after it became clear it almost never would exceed last place, and definitely never eclipse third place out of the (then) four competing microsites. Whether that's because of Firebase's [previously noted](/posts/2020/07/goodbye-hello/) lack of [Brotli compression](https://opensource.googleblog.com/2015/09/introducing-brotli-new-compression.html), I can't say.
