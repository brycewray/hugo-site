---
layout: singlepost
tags: post
title: "Getting framed"
subtitle: "Why I still use Bootstrap"
description: "Reasons why one might still want to use a CSS framework."
author: Bryce Wray
date: 2018-11-14T09:15:00-06:00
lastmod: 2020-11-26T09:05:00-05:00
discussionId: "2018-11-getting-framed"
featured_image: "ricardo-gomez-angel-7bzbyafVTYg-unsplash_2859x1888.jpg"
featured_image_width: 2859
featured_image_height: 1888
featured_image_alt: "Construction site for a building, with construction workers climbing and working within"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@ripato?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Ricardo Gomez Angel</a>; <a href="https://unsplash.com/s/photos/construction?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

In an ideal world, web developers would never use [CSS frameworks](https://www.keycdn.com/blog/front-end-frameworks). There would be ample time, patience, and money for building everything from scratch to suit every single site to a tee. All load times would be instantaneous, and all browsers would be compatible with whatever a web dev chose to do.

Breaking news: we don't live in an ideal world.

Each client wants its site or site modifications finished yesterday, to perfection, and for free---not necessarily in that order, but you get the point. Site-load time, including the [infamous Time to First Byte (TTFB)](https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing#slow_time_to_first_byte), is critical. And, while browsers have advanced a lot in the last three or four years, [not everybody is using the latest and greatest](http://gs.statcounter.com/browser-version-market-share) and, besides, [there are still some CSS shortcomings among even recent browser versions](https://www.w3schools.com/cssref/css3_browsersupport.asp).

**Note**: I, uh, kinda [re-thought this](/posts/2018/11/grid-locked-no-more/) a few days later, but go ahead and read this one first so you'll have some perspective on that post.
{.yellowBox}

## Frickin’ frameworks?

While what I've just pointed out would seem to be not just common sense but "duh"-level common sense, I've read a lot of web-based articles and comments that go all "[No true Scotsman](https://rationalwiki.org/wiki/No_True_Scotsman)" on the notion of a web dev's using a framework. This is especially true for those who are touting the seeming superiority of the [CSS Grid Layout Module](https://www.w3schools.com/css/css_grid.asp) (usually just called _CSS Grid_) over the best-known framework out there, [Bootstrap](https://getbootstrap.com):

- ".&nbsp;.&nbsp;. I get that I could have just used Bootstrap and called it a day .&nbsp;.&nbsp;. but .&nbsp;.&nbsp;. [I wanted to be excited about layout on the web again](https://open.nytimes.com/bootstrap-to-css-grid-87b3f5f830e4)&nbsp;.&nbsp;.&nbsp;."
- "For the first time ever we have a proper layout system available natively in the browser, which gives us a ton of benefits. [Compared to Bootstrap] .&nbsp;.&nbsp;. not only can you create layouts that previously wasn't [_sic_] possible without introducing JavaScript, but [your code will be easier to maintain and understand](https://hackernoon.com/how-css-grid-beats-bootstrap-85d5881cf163)."
- "[Why did I stop using Bootstrap?](https://blog.theodo.fr/2018/03/stop-using-bootstrap-layout-thanks-to-css-grid/) Bootstrap is too verbose .&nbsp;.&nbsp;. Things get even worse when you add responsiveness .&nbsp;.&nbsp;. or when you want to move your blocks around. Bootstrap's grids are limited to 12 columns. By default, Bootstrap has 10-pixel paddings that are complex to override. Bootstrap has to be downloaded by the users, which slows down your website."

Interestingly enough, that last article I excerpted soon starts telling you what else you have to add in your CSS to achieve what a framework would do anyway. So, let's start my rebuttal there.

## The case for Bootstrap

- **It lets you do more, and do it more quickly**---Sometimes you need to create [buttons](http://getbootstrap.com/docs/4.1/components/buttons/), or [cards](http://getbootstrap.com/docs/4.1/components/card/), or [alerts](http://getbootstrap.com/docs/4.1/components/alerts/ "Alerts”), or [responsive nav bars](http://getbootstrap.com/docs/4.1/components/navbar/), or a dozen other things. And create them _quickly_. A minimal amount of code does those in Bootstrap 4. CSS Grid doesn't include and, to be fair, isn't intended for doing any of those things out of the box; but they're all built into Bootstrap 4, and they're easy to modify if you don't like the Bootstrap defaults.
- **It's more compatible**---As much as we who do web _schtuff_ might wish otherwise, not everyone either does, or even has the option to, use the latest and greatest. There are literally thousands, if not millions, of corporate users whose IT departments limit their web browsing to the hated but still extant Internet Explorer, usually because of the presence of in-house applications which require it. [CSS Grid doesn't do diddly](https://caniuse.com/#feat=css-grid) for those folks. But [Bootstrap 4 does](https://stackoverflow.com/a/52036271), especially if you use [HTML5 Shiv](https://stackoverflow.com/questions/48246476/does-bootstrap-4-need-html5shiv) for those poor ba---uh, people---who are forced (or, in certain countries, choosing) to use something as ancient as Internet Explorer 9 or earlier. As with my [observations last month](https://brycewray.com/posts/2018/10/client-too-smart/) about the need to accept a lowest-common-denominator approach to B2B email, I think a real-world approach to web dev still requires coding for more than just the aforementioned latest and greatest.
- **It's not as limited as you've heard**---I'll give you just one example. One of the biggest whines you'll hear about Bootstrap 4 from the CSS Grid _aficionados_ is that "everything is limited to a twelve-column grid!" Oh, the humanity. Well, thanks to [the inclusion of Flexbox in Bootstrap 4](https://www.w3schools.com/bootstrap4/bootstrap_flex.asp), that whine is [baloney](https://stackoverflow.com/questions/31944691/bootstrap-5-column-layout), [balderdash](https://www.cattlegrid.info/2018/06/21/5-column-layout-with-bootstrap-4.html), and [horse hockey](https://stackoverflow.com/questions/21955088/7-equal-columns-in-bootstrap). It just takes a little tinkering, which is fine. Hey, [CSS Grid requires plenty of tinkering](https://zellwk.com/blog/remember-css-grid-properties/), too. If I have to tinker anyway, I'd rather start with a solid foundation under me.
- **It's available via CDN**---Those who complain that browsers have to download Bootstrap 4 aren't wrong, but the smartest way to handle that is through its [CDN offering](https://www.bootstrapcdn.com). In fact, it's quite possible that Bootstrap's CSS and JavaScript code will load via its CDN more quickly than would all the CSS and JS that a non-framework-based site needs to match an otherwise identical Bootstrap-based site! (And, yes, it's true that CSS Grid itself is built into the browsers _that support it_, thus requiring no download. But, as I mentioned above, the "that support it" part doesn't include enough browsers and browser versions for real-world dev.)

## Maybe in the future, but for now&nbsp;.&nbsp;.&nbsp;.

Of course, Bootstrap 4 [isn't the only game in town when it comes to CSS frameworks](https://tutorialzine.com/2018/05/10-lightweight-css-frameworks-you-should-know-about). It's just got the most of what I want with the least pain and time involved---for now.

Mind you, I remain open to new possibilities. Remember, I'd never even done an SSG site until two months before I wrote this. Newer and truly better ways of doing things fascinate me; they absolutely don't scare me away.

Indeed, the day before I started writing this, I spent a few hours learning about and playing with the very interesting and, I think, promising [Bulma](https://bulma.io), in case I wanted to convert this site to it from Bootstrap. While I was able to reproduce the vast majority of the current site in Bulma, I ran into just enough things that the relatively new Bulma didn't do, or didn't do as well in my opinion, that I decided to stick with Old Faithful. Six months from now, Bulma, or some other framework, might well Get There. We'll see.

As for CSS Grid, it's undeniably cool. As time and events allow, I will learn about it even while I continue to use Bootstrap; perhaps a future version of Bootstrap even will include it (albeit with whatever modifications, perhaps even kludges, it would take to make CSS Grid somehow work with older browser versions), just as Bootstrap 4 already includes Flexbox.

In the meantime, in our non-ideal world: when the decision is totally up to me, I'm Bootstrappin’.

<br />

**Note**: Many thanks to Carol Skelly for "[Bootstrap (Flexbox) is still better than CSS Grid for creating layouts](https://medium.com/wdstack/bootstrap-is-still-better-than-css-grid-for-creating-layouts-522b7baf0411)," and Maria Antonietta Perna for "[The CSS Grid layout vs. CSS frameworks debate](https://www.sitepoint.com/css-grid-layout-vs-css-frameworks-debate/)."
{.yellowBox}
