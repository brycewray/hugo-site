---
layout: layouts/posts/singlepost.11ty.js
tags: post
title: "The full .11ty.js monty"
subtitle: "Going all-JavaScript with my Eleventy site"
description: "Once again, I can’t resist a nerdy challenge."
author: Bryce Wray
date: 2020-04-15T17:30:00-05:00
#lastmod: TBD
discussionId: "2020-04-full-11ty-js-monty"
---

Well, wouldn't you know it? My [recent post](/posts/2020/03/back-nunjucks-eleventy-site) notwithstanding, this [Eleventy](https://11ty.dev)-/[webpack](https://webpack.js.org)-based site is now using nothing but [JavaScript-*only*](https://11ty.dev/docs/languages/javascript) [templating](https://11ty.dev/docs/templates). That means .11ty.js template files rather than [.njk](https://11ty.dev/docs/languages/nunjucks) ([Nunjucks](https://mozilla.github.io/nunjucks/)) files.

Curious about the code itself? Check out this site's [public repository](https://github.com/brycewray/eleventy_bundler) for the .11ty.js templating. If you want to see the previous Nunjucks stuff, feel free to nose around inside some of the repo's [public branches](https://github.com/brycewray/eleventy_bundler/branches). And, if you're of a mildly sadistic bent, the `nunjucks-to-11ty-js`, `another-to-11ty-js`, and `wm-11ty-js` branches in particular might amuse you as you watch me huff and puff my way through the conversion process.

For that matter: the `wm-11ty-js` branch actually is how I got to the point which allowed me to pull the Nunjucks-to-JavaScript switch on this here real site, rather than just futzing around with code on the local Mac. As I [noted previously](/posts/2020/03/back-nunjucks-eleventy-site):

> .&nbsp;.&nbsp;.&nbsp;it didn't take me long to realize that I simply don't know enough JavaScript to implement a *full* switchover. .&nbsp;.&nbsp;.&nbsp;in the end, I still was left with multiple key templates in .njk. It wasn't so terrible, but, well, the intent had been to switch, completely. And I couldn't.

That was what I wrote a few weeks ago. But, as my past posts have shown, your friendly post boy, here, takes his lumps from a first-time-around learning experience, nurses his wounds, and then keeps coming back until he gets it right---or, at least, as right as he can. So it was with [CSS Grid](/posts/2018/11/grid-locked-no-more), my "[dance](/posts/2019/12/sorta-strange-ssg-trip)" with multiple [SSGs](https://staticgen.com) in general and [Gatsby](/posts/2019/10/now-gatsby-geezer) in particular (before I [wised up and came back to Eleventy](/posts/2019/12/packing-up), of course), and [PostCSS](/posts/2020/01/two-cheers-tailwind).

And, yea verily, so it was with JavaScript-only templating.

## Sticking points

That first time through the mill last month, I got the vast majority of the site on .11ty.js templating. There were specific items which prompted my comment above about the "multiple key templates" I'd failed to convert.

### The paginated posts list

With this site now in the fifty-plus range where number of posts is concerned, I can't just put up one page that lists them *all*, even if I made it tiny type or something like that. That just wouldn't do. The [posts list](/posts) has to be a *paginated* list, auto-generating pages and auto-ordering listings as I add new posts.

I had carefully followed the [Eleventy site](https://11ty.dev)'s [great explanation](https://11ty.dev/docs/pagination) on making such a paginated list. Only problem: it's based on doing so in Nunjucks. And, since it's still unusual for an Eleventy site to be all-.11ty.js (and even those which are tend not to have paginated lists in their public repos), I couldn't find any good ways of doing it. I would have to figure it out.

And, oddly enough: I was able to do so chiefly because of my experience with [Gatsby](https://gatsbyjs.org)---especially my [recently](/posts/2020/04/different-modes-different-code) making public both Gatsby- and [Hugo](https://gohugo.io)-based repos of this site. While the all-JavaScript[^React] code for the Gatsby version of the paginated posts list wasn't directly transferrable, chiefly because of Gatsby's reliance on [GraphQL](https://graphql.org), there were enough similarities that I could find my way.

[^React]: Albeit that it was using [React](https://reactjs.org), of course, but that wasn't the obstacle it would've been a few months ago before the "[dance](/posts/2019/12/sorta-strange-ssg-trip)" somewhat toughened me to dealing with it.

### Webmentions

During the first run with *mostly* .11ty.js templating, I replaced [webmentions](https://css-tricks.com/indieweb-and-webmentions) by going back to [Talkyard](https://talkyard.io)-based commenting but, on returning (briefly) to all-Nunjucks templating, I just went without any comments-displaying method whatsoever.

To be sure, it's not like this is a widely read site on which vast hordes of visitors breathlessly await comments. (For the sake of a suffering humanity, I'd hope there *is* no such site, for that matter.) Still, if you search the Web for any kind words about *not* providing some commenting in a blog or similar, personal site, you won't find many. So I decided any all-.11ty.js approach would have to allow for webmentions, too. Unfortunately, again: I could find no code in that respect.[^WMJS]

[^WMJS]: At least, that was the case when I was doing this. I am sure there will be before long, if [Reuben Lillie has anything to say about it](https://gitlab.com/reubenlillie/eleventy-dot-js-blog/-/issues/20).

Because my Nunjucks-based templates and files for webmentions had been based on very specific examples---more on that near the end---this conversion process proved to be one of the more aggravating, especially when it came to [filtering](https://11ty.dev/docs/filters) the webmention dates so they wouldn't look something like `2019-12-23T15:42:32-0600`.[^Dates] When I got this part done, I knew I was nearly home.

[^Dates]: If you take a look at the very bottom of this site's footer and see an extended date there: well, that's not what I was trying to filter. In fact, according to the [webmention specs](https://w3.org/TR/webmention) concerning [microformats](https://developer.mozilla.org/en-US/docs/Web/HTML/microformats), *that* date is *supposed* to be formatted that way, especially so [webmention.io](https://webmention.io) will allow everything to work as it should.

#### One more thing about webmentions

Just as I [previously](/posts/2020/04/different-modes-different-code) noted, I don't promise to keep the Gatsby- and Hugo-based repos up to date with this one. While that originally referred only to my keeping the *posts* up to date, which actually isn't that hard, the re-addition of webmentions to this site now is another item which I'll make part of those repos *when* (and *if*) I can.

The amazingly capable [Chris Biscardi](https://www.christopherbiscardi.com/) has come up with a [Gatsby plugin](https://www.npmjs.com/package/gatsby-plugin-webmention) for this. It's not (yet?) listed in the [official Gatsby plugins section](https://gatsbyjs.org/plugins), which gives me some pause, but I'll probably check it out. If it's not the answer, I'll probably just try to adapt this site's .11ty.js webmentions-related code for use in that repo.[^Courtesy]

[^Courtesy]: Please don't cast bets on my ability to do so while I'm still in the room to hear the money being put down against it, OK? Basic courtesy, that's all I ask.

As for the Hugo repo, adding webmentions will probably be a little more hinky for two reasons:

- First, it's not a JavaScript-based repo, of course, so I doubt more than a tiny bit of what I've done will translate to it that well. Going from Nunjucks to "vanilla" JavaScript is one thing. Going from "vanilla" JavaScript to [Go](https://golang.org)---ah, that's a totally different clambake, folks.

- Second, there's no baked-in Hugo solution for it as there is for, say, [PostCSS](https://gohugo.io/hugo-pipes/postcss) or [syntax highlighting](https://gohugo.io/content-management/syntax-highlighting). However, the Hugo community is nothing if not resourceful, so there is the occasional [article](https://jvt.me/posts/2019/03/18/displaying-webmentions/) and [forum post](https://discourse.gohugo.io/t/anyone-for-webmention/10411) about incorporating webmentions in a Hugo site. I hope to find their information enough to guide me through the wilderness.

### “Nice-to-have”s

Beyond those two biggies, there were also the **[sitemap](/sitemap.xml)** and the **[RSS feed](/feed.xml)**.[^XMLstuff] Each was handled by Eleventy [plugins](https://11ty.dev/docs/plugins), and each of those plugins gave only Nunjucks-based code examples. Happily, doing so turned out to be reasonably easy, especially since I saved them for late in the process when I'd already worked through some other kerfuffles.

[^XMLstuff]: If your site lacks either or both of these, you need to get at least a sitemap. It's important for both [accessibility](https://usabilitygeek.com/guidelines-improve-usability-accessibility) and [SEO](https://moz.com/blog/xml-sitemaps). We can all debate [how relevant](https://sevaa.com/blog/2019/02/are-rss-feeds-still-relevant) [RSS](https://en.wikipedia.org/wiki/RSS) is these days, but the fact is that some people still like to use RSS readers. If we can still support Internet Explorer, we also can support RSS. The former *should* be dead but isn't (sadly); the latter *isn't* dead and, in my opinion, never should be.

## Credit where it's due

As I note in my repo's [README](https://github.com/brycewray/eleventy_bundler/blob/master/README.md):

> I don&rsquo;t claim to be an expert on **any** of this stuff&mdash;as even a casual reading of the site itself, not to mention this repo&rsquo;s contents, probably will demonstrate pretty quickly&nbsp;.&nbsp;.&nbsp;.

.&nbsp;.&nbsp;.&nbsp;but, that said, I do hope that this post and the repo---and, yes, even those aforementioned branches thereof---will help others with Eleventy-based sites who want to take a shot at all-.11ty.js templating.

I must once again extend my highest thanks and commendations to various folks for their extremely valuable help, online code examples, and/or superb community behavior (or, as some of them might spell it, *behaviour*). Four stand out in particular.

### Reuben Lillie

I [already noted](/posts/2020/03/back-nunjucks-eleventy-site) Mr. Lillie's great example in steering us Eleventy advocates toward the path of all-.11ty.js with [his own site](https://reubenlillie.com)'s [fantastically well-documented repo](https://gitlab.com/reubenlillie/reubenlillie.com/). Then, in the days after that post, he exceeded even the already optimistic expectations I'd formed after combing that repo for code guidance and exchanging some email and tweets with him.

Not only has he since put up an *additional* repo, [eleventy-dot-js-blog](https://gitlab.com/reubenlillie/eleventy-dot-js-blog), an all-.11ty.js Eleventy *starter* site ready for your cloning/forking pleasure; but he also gave me far more help than I deserve last weekend---a holiday weekend---as I tried to incorporate some of that new repo's code in a branch of this site.

He has rapidly become someone to watch in the Eleventy community, and a nicer and more helpful fellow you couldn't find. (That mindset seems to be a feature, not a bug, in the Eleventy community, which is yet another reason I enjoy Eleventy so much.)

### Max Böck and Sia Karamalegos

Mr. Böck's "[Static Indieweb pt2: using Webmentions](https://mxb.dev/blog/using-webmentions-on-static-sites/)" and Ms. Karamalegos's "[An In-Depth Tutorial of Webmentions + Eleventy](https://sia.codes/posts/webmentions-eleventy-in-depth/)," the latter based on the former, were the original sources of the Nunjucks-based webmentions templates I began using near the end of 2019. Thus, it was only natural that I returned to these amazingly informative posts when I chose to make .11ty.js versions of that code.

(Fortunately, I didn't have to bug them with questions online this time, as I did the first time around a few months back.)

It was utterly critical for me to understand what key sections of the original Nunjucks code were doing, and Mr. Böck's and Ms. Karamalegos's patient and well-worded explanations made that possible.

Believe me, any of you who may be considering webmentions in general and Eleventy-based webmentions in particular: if *I* could understand what they conveyed and implement it, *you* can, too.

### Zach Leatherman

And, of course, one must *always* acknowledge [the guy](https://zachleat.com) who, you know, [*created* Eleventy](https://www.zachleat.com/web/introducing-eleventy/) and works nearly every day on making it better, despite his having [just switched Day Jobs](https://www.zachleat.com/web/netlify/), to make it the coolest, friendliest, most easily configured SSG out there. No biggie.

But, seriously: that great Eleventy community I mentioned earlier seems to take its cues from Mr. Leatherman, whose friendly nature and quick wit make adopting Eleventy even more pleasant than it would be anyway. As I [wrote last December](/posts/2019/12/packing-up), Eleventy is "a good product built by a good person."

Eleventy is by no means the best-known of the SSGs, and [it is purposely *not* based on any framework](https://www.11ty.dev/docs/), so it can claim no built-in base of fanboy developers---as can Gatsby because of its ties to React, or as [Gridsome](https://gridsome.org)'s creators hope it will because of its ties to [Vue](https://vuejs.org). Thus, Mr. Leatherman's continuing achievement in building and enhancing Eleventy, along with the growth and *esprit de corps* of the Eleventy community, are even more impressive by comparison.

## Next up?

Having put this work to bed, I now will turn my attention to the task I mentioned earlier: making those Gatsby- and Hugo-based repos once again as close to this one as possible in both content and functionality.

The content part is pretty easy. I just add this post, and others as I write them (and adjust each for any tiny issues related to different SSGs' ways of handling things).

Getting *all* the functionality working will be the gooey part. However, it'll also be the fun part.

&nbsp;.&nbsp;.&nbsp;. I think.