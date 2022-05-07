---
title: "The winds of change"
description: "Switching to Astro, or tales of a migratory nerd."
author: Bryce Wray
date: 2022-04-26T09:35:00-05:00
#lastmod:
#initTextEditor: Ulysses
discussionId: "2022-04-winds-change"
featured_image: "windy-grass-nadiia-ploshchenko-f1WyHWxWUM8-unsplash_5184x3456.jpg"
featured_image_width: 0000
featured_image_height: 9999
featured_image_alt: "Windiness concept - blurry grass blowing in a strong wind"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@still_loony?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nadiia Ploshchenko</a>; <a href="https://unsplash.com/s/photos/wind?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

{{< disclaimer >}}

My proclamation in last month’s “[Simplify, simplify (again)](/posts/2022/03/simplify-simplify-again/)” that this website “is on [Hugo](https://gohugo.io) for the foreseeable future” didn’t hold water for long, even given the escape route I left myself in a corresponding footnote:

> Will I move it again? Ah, “never say, ‘never,’” and all that drivel. The [“dance”](/posts/2019/12/sorta-strange-ssg-trip/) has taught me not to be too sure about my answers to such questions.[^1]

Since sometime in September, 2020, I’d been moving the site back and forth between the Hugo and [Eleventy](https://11ty.dev) static site generators (SSGs). This had required me to maintain two separate repositories of mostly duplicate content, virtually identical styling, very *different* templates and shortcodes, *etc.*

And I was tired of it. Being a migratory nerd can be fun for only so long.

Thus, I really, truly thought I’d be content to let Hugo be the mainstay behind the site going forward. But, as I also noted at the time:

> I still need to stay current with What’s Kewl Among Web Developers. . . . Thus, I will continue to *experiment* with New Kewlness in other SSGs via, at least for now:
> - A new, smaller, sparer version of the site’s former Eleventy repo, likely equipped with the [Slinkity](https://slinkity.dev) plugin.
> - An [Astro](https://astro.build) repo. While Astro still is very much an early-stage project, it seems to have stabilized sufficiently that even this old fart can work with it without too much frustration.
>
> With any luck at all, this approach will enable me to maintain this site efficiently, yet still keep my eyes on what else is happening in WebDevLand. I’m crossing my fingers.

I’d tried Astro, briefly, last year but then [abandoned it](/posts/2021/09/gems-in-rough-09/#passtro-on-astro-for-now) because, in its earliest days, it was going through more breaking changes than my easily jostled marbles could handle. Still, I’d kept up with what was going on in the Astro project and, in the weeks leading up to “Simplify, simplify (again),” I’d resumed tinkering with it.

Anyway, that’s where things stood on March 22, when I initially published that post, and I went to bed that night feeling I’d really settled things.

Then, the very next morning, a Twitter feed I regularly follow (I even have it coming to my RSS reader app) delivered some unexpected news that, I now know in retrospect, changed the ballgame. As I noted later that day in an update to “Simplify, simplify (again)”:

> Slinkity creator/maintainer [Ben Holmes](https://twitter.com/BHolmesDev) [announced today](https://twitter.com/BHolmesDev/status/1506616758806802435) that he’s joining the Astro team, and [indicated](https://twitter.com/BHolmesDev/status/1506621649944260610) that he may hand off Slinkity to someone else after getting Slinkity to v.1.x. How these developments will affect my aforementioned “stay current” plan remains to be seen.

Fast-forward to this past Saturday afternoon—a month later to the day—when I tweeted:

{{< stweet "1517957419447508992" >}}


. . . and shortly thereafter, added *another* update to “Simplify, simplify (again)”:

> Well . . . “the foreseeable future” lasted only a month. After several days of serious experimentation with Astro, I moved the site there today. Will elaborate on all of this in a future post.

. . . which, as you’ve guessed by now, is what you’re reading.

So let me see if I can explain why, yet again, I switched website-maintenance platforms.

## Why Holmes’s move mattered

Astro wasn’t the only project I’d been following with interest the last few months. I was also intrigued by the promise of Holmes’s Slinkity project.

The Slinkity plugin works with the [custom template extensions feature](https://www.11ty.dev/docs/languages/custom/) within Eleventy 1.x+ to enable (a.) component-level development from various languages and (b.) UX-friendly partial hydration[^2]. These additions, combined with the server-side rendering (SSR) that Eleventy’s recently added [Serverless plugin](https://www.11ty.dev/docs/plugins/serverless/) makes possible, allow Eleventy to compete with the “big dudes” in ways it previously couldn’t.

While I didn’t (and don’t) have a use case for SSR on this site, I definitely have one for “componentized” development on it.

I’d gotten a nice taste of that coding approach [last year](/posts/2021/03/next-steps/) while working on a [Next.js](https://nextjs.org) project that I thought I’d get to do for the Day Job [of the time](/posts/2021/09/transition/); and, so, I looked forward to doing that kind of work in Eleventy, too. This remained true even after I made the decision last month to use Hugo, instead of Eleventy, for this site. I still planned to put the Eleventy/Slinkity combo into play in the newly slimmed-down “experimental” Eleventy repo. This would be mostly for tinkering purposes, but perhaps also for research for articles that other sites might ask me to write (*e.g.*, the ones I’ve been doing lately for [CloudCannon](https://cloudcannon.com)’s [blog](/posts/2022/02/shameless-plug-time/)).

Astro development is component-based from the get-go, which heightened my renewed interest in playing with that platform, too. Thus, beginning early this year, I’d begun spending a lot more time on the Astro [Discord](https://astro.build/chat). I renewed some old acquaintances from last year and tried to catch up on what I’d missed since last September.

But Holmes’s announcement on the morning of March 23 effectively kick-started my mind down the road toward at least the possibility of yet another site migration, this time to Astro. I have come to have tremendous respect, not only for his intellect and coding prowess, but also for his grasp of where website development is going. If I did, indeed, want to stay current, the direction he was taking sounded like a good one to follow.

Besides, as I already knew: all the really “hot” action among SSGs now is on the JavaScript side of the category, regardless of which specific SSG we may be discussing. No matter how many great features that Hugo gains (and it has gained many, especially in the last three years), and no matter how well it suits a content-heavy site like this one, that Go-based SSG still will be off in its own universe, slowly falling further away from the spotlight. Yet, it’s that very spotlight which will attract more readers to whatever I write, be it for this site or for others. As the old line goes: “They don’t teach you that in Sunday School, but it’s still true.”

So, within a few hours, the sentiment behind the footnote about my never saying “never” morphed into more than just idle curiosity. I would, at least, *try* to build an Astro site that had the bare functionality and styling of the Hugo-based site. From there, well, we’d see.

In fact, my experimentation had already begun. Two days before initially issuing the “Simplify, simplify (again)” post, I’d started a repo called `astro-site`. Or, perhaps, I should say that I started *another* repo called `astro-site`, because that was the name I’d given every previous Astro repo I’d done previously. Why? Because, even back last year when I began trying my luck with Astro, I decided to give the resulting repo a name that would be appropriate *if* I ever migrated this site to it.

As of the morning of March 23, this naming no longer seemed as presumptive as I’d originally thought. I’d snuffed the previous iterations of `astro-site` after running aground with earlier, glitchier versions of Astro; but this time, perhaps, this would be the one that really could at least approximate a real site-hoster for me.

## The grunt work

Partly due to some out-of-town family-related events as well as my writing work, both for this site and for CloudCannon, my work on `astro-site` in the ensuing month went in fits and starts. But it went.

The Astro team celebrated April 4–8 as “Launch Week,” and they began it with the [April 4 announcement](https://astro.build/blog/astro-1-beta-release/) that Astro 1.0 was now in beta and the official v.1.0 general availability date would be June 8. Shortly, I upgraded `astro-site`’s Astro version from v.0.26.0 to v.1.0.0-beta.0, and have stayed with the various 1.0.0-beta-“dot” versions ever since.

As the weeks moved on, I slowly progressed toward the goal of making `astro-site` website-ready, by:
- Creating components to do what shortcodes had accomplished in my Eleventy and Hugo repos.
- Massaging templating and SCSS to match the website’s existing styling.
- Setting up data-fetching to get my [paginated posts list](/posts/) working.
- Putting together the right configuration to give my content the same typography and automatic formatting as on the website.
- Struggling to get RSS and JSON feeds going.

Then, late last week, it came time to perform the *true* migration: bringing in the content. I copied *all* my Markdown files over from the website’s `hugo_site` repository and converted each for Astro’s purposes. After I resolved some self-inflicted glitches[^3] from that process, things went fairly smoothly from there. My final hurdle—as I indicated in “[Is Astro ready for your blog?](/posts/2022/04/astro-ready-your-blog/)”—was in getting the repo to produce both RSS and JSON feeds that would meet my requirements. I reached a workable solution by using [Jean-Philippe Monette](https://github.com/jpmonette)’s [`feed` package](https://github.com/jpmonette/feed).[^4]

The next day—Saturday, April 23—I spent a few hours reading through the site one last time, squashing a few non-“crashy” bugs here and there; and, by mid-afternoon, I realized it was time to, as the saying goes, “Ship it!” I went into my [Cloudflare](https://cloudflare.com) dashboard, took my domain off the `hugo_site` repo’s [Cloudflare Pages](https://pages.cloudflare.com) instance, and pointed it instead to the one for the `astro-site` repo. For the first time since [December, 2019](/posts/2019/12/packing-up/), my site was running on an SSG besides Eleventy or Hugo.

## Sewing up a loose end

There’s one additional thing I’d like to address from “Simplify, simplify (again),” and that’s a comment I made about why *at that time* I’d chosen to go with Hugo rather than Eleventy:

> . . . while I have an extremely high regard for [Eleventy] and its amazing community, I’ve recently sensed that the project may be evolving, perhaps inevitably, from “the easiest SSG” to “the most customizable SSG.” If so, the latter categorization renders my relatively simple site no longer the perfect fit for Eleventy that it once was.

I suspect that this statement caused a few episodes of eyebrow-arching out there, even among those who may also have seen the footnote I stuck right after it:

> Mind you, Hugo is no great ball of simplicity, either, nor would anyone claim that it is. However, it still seems a better match for a content-heavy site that doesn’t depend so much on web components, heavy infusions of JavaScript, *etc.*

In light of what I’ve done since, these two thoughts may seem even more nonsensical. All I can tell you is that, on March 22, they registered with me; and, yet, here we are. Perhaps I have one of the more oddly specific cases of [FOMO](https://www.merriam-webster.com/dictionary/FOMO) you’ll ever see. Only time will tell.

## And now?

As I wrap up this tell-all: no, I won’t even *suggest*, much less promise, that I will never again migrate this site to a different platform. I started to count the number of times that I’ve performed (or attempted) such a migration since I first launched the site in September, 2018; and, quite frankly, I could no longer even remember all the switches.[^5] That is a testimony to my nerdy curiosity, but definitely not to any degree of consistency.

Besides: it’s clear that my mind, especially the part where that nerdy curiosity is always lurking, has no concept of what *the foreseeable future* means. So, why pretend? I’ll stick with Astro until I change my mind again. And who knows when that’ll be? It might be next week. It might be next month. It might be next year. Or— Well, you get the idea. Whatever happens (and whenever it does), I hope to keep you informed and, perhaps, entertained. Thanks as always for your patient readership.

**Update, 2022-05-07**: And, sure enough, I brought it back to Hugo today (at least for now), as explained in “[Mulling over migration](/posts/2022/05/mulling-over-migration/#a-sheepish-u-turn)?”
{.yellowBox}

[^1]:	For those not familiar with my “dance” among different SSGs during 2019, just follow that link for the whole, sordid story.

[^2]:	To quote my explainer from “[Is Astro ready for your blog?](/posts/2022/04/astro-ready-your-blog/)”: “The concept of *hydration* involves sending out code which, on arrival at the browser, gets *hydrated* with data (think of how [astronauts used to immerse freeze-dried food in hot water to make it edible](https://hackaday.com/2021/12/29/astronaut-food-is-light-years-beyond-tang-and-freeze-dried-ice-cream/)). This makes it possible to convert a static web page to a dynamic one. The problem is that websites built on JavaScript-based platforms, until now, typically have dumped a lot of JavaScript code to be hydrated on their visitors’ devices, causing so-so performance and a less-than-satisfying user experience. The idea behind *partial* hydration is to let the developer choose to deliver only that JavaScript which is absolutely necessary, thus optimizing performance and the UX.”

[^3]:	Let’s just say that the experience taught me a valuable lesson about how much more seriously Astro takes front matter than does either Eleventy or Hugo.

[^4]:	I hope that, when the Astro team is freed up from the current push to deliver v.1.0 by the deadline, they’ll be able to give more attention to Astro’s feeds-handling. It’s small potatoes compared to the other problems they’ve solved brilliantly in recent months, but it matters.

[^5]:	Not even searching through my various repos’ Git histories gave me a sufficiently clear picture. That’s what I get for not always being sufficiently descriptive in my commit messages, right?
