---
layout: layouts/posts/singlepostherofit.11ty.js
tags: post
title: Grid-locked no more
subtitle: Doing a 180 on CSS Grid
description: "While I still think using frameworks is OK, I decided the best way to learn CSS Grid was to use it."
author: Bryce Wray
date: 2018-11-28T15:00:00
lastmod: 2019-10-03T00:20:00
discussionId: "2018-11-grid-locked-no-more"
featured_image: railing-4274523_6000x4000.jpg
featured_image_width: 6000
featured_image_height: 4000
featured_image_alt: Clear view of sky above fencing
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/analogicus-8164369/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4274523">analogicus</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4274523">Pixabay</a></span>
---

As [Emily Litella](https://en.wikipedia.org/wiki/Emily_Litella) said it so well: “Never mind.”

I said in my [last post](/posts/2018/11/getting-framed) that I’d use [Bootstrap 4](https://getbootstrap.com) for this site while learning [CSS Grid](https://www.w3schools.com/css/css_grid.asp) over time. Then, only a few days later, I decided there was no time like the present.

And I didn’t mean just learning CSS Grid; I meant choosing it over Bootstrap. Which was exactly what I said I _wouldn’t_ do, couldn’t do any time soon.

_Screeeeech!_ went the imaginary brakes and tires, as I did a fast 180.

## Dude, can’t you stick to anything?

So what changed my mind so completely—and so quickly?

First, remember this sentence from near the end of that post:

> Mind you, I remain open to new possibilities&nbsp;.&nbsp;.&nbsp;.&nbsp;Newer and truly better ways of doing things fascinate me; they absolutely don’t scare me away.

And I meant it.

Then, in the process of learning about CSS Grid, I decided to read articles and view videos by several of its key advocates, most notably [Jen Simmons](http://jensimmons.com), [Rachel Andrew](https://rachelandrew.co.uk), and [Kevin Powell](https://www.kevinpowell.co). They’re widely known for their insights into web design and development, including the need to keep learning new ways of doing things we web-heads have been doing for a long, long time. Simmons’s [Layout Land videos](https://www.youtube.com/layoutland), in particular, helped me understand the basics of CSS Grid much more quickly than I think would’ve been possible otherwise.

I thought over their points long and hard, and one key observation by Simmons from [this article](http://jensimmons.com/post/feb-28-2017/benefits-learning-how-code-layouts-css) hit home with me (to the extent that I thought, “Man, I wish I’d read this _before_ I wrote that post, especially the last part about hoping the next Bootstrap version will include CSS Grid”):

> .&nbsp;.&nbsp;.&nbsp;it’s time to stop assuming your page layout design process looks like this: 1) Pick a third-party framework; 2) Pick one of the layouts that comes with that framework; 3) Limit all your ideas to what that framework can do.
> 
> We don’t need that crutch anymore.

> I know a _lot_ of people will think the “best” way to use CSS Grid will be to download the new version of Bootstrap (version 5! now with Grid!), or to use any one of a number of CSS Grid layout frameworks that people are inevitably going to make later this year.&nbsp;.&nbsp;.&nbsp;. But I don’t. The more I use CSS Grid, the more convinced I am that there is no benefit to be had by adding a layer of abstraction over it. CSS Grid is the layout framework. Baked right into the browser.

Thus, feeling only mildly sheepish _(baaaaa)_ about my previous position on CSS Grid _vs._ Bootstrap, I prepared to venture forth and give it a shot. That meant, only a few weeks after converting this [Hugo](https://gohugo.io)-based site from its original incarnation (based on CSS and other code from the [Hugo-version Tale theme](https://themes.gohugo.io/tale-hugo/)) to Bootstrap 4, I would be converting it again, this time to CSS Grid.

## Why boot Bootstrap?

While that move didn’t _necessarily_ require flat-out eliminating Bootstrap code from my site—after all, I still have a few Tale-based bits of [GoLang](https://golang.org) code here and there that keep Hugo happy, so I’m certainly not too proud to keep helpful bits around from past work—I knew keeping that CSS foundation around while also writing CSS to work with the Grid ways of doing things would confuse me.

You see, I’d inevitably run into things I _thought_ were CSS Grid’s “fault” but, in fact, would’ve happened just because the Bootstrap CSS and JS code, too, was sitting there in the background. The only way to make sure that whatever I was seeing was because of _my_ code was to make sure it all _was_ my code.

## Who’s on first?

But there was more to this particular re-jiggering of the site’s CSS than just casting off the seeming safety of Bootstrap and taking a dive into CSS Grid. I also wanted to follow the [mobile-first design](https://www.uxpin.com/studio/blog/a-hands-on-guide-to-mobile-first-design/) method, which I’d long admired in principle but had never put into practice.

To be sure, I’d relied on media queries to make sure everything worked fine on various screen sizes and devices, but I’d been in big-screen-first mode. No, that wasn’t the way to go, either; so I committed to making all my media queries be for screens _bigger_ than a breakpoint, not _smaller_. Going forward, the _default_ CSS would be for the little screens, not the big ones.

## The two letters that make us cringe: IE

Finally, while I was at it and essentially starting from scratch (again), I figured I also may as well tackle the uncomfortable subject of [making stuff work on Internet Explorer](https://docs.microsoft.com/en-us/internet-explorer/ie11-deploy-guide/tips-and-tricks-to-manage-ie-compatibility). And I don’t mean just IE 11, the version that Microsoft still ships with Windows; I mean as far back as I could go without, um, losing my mind. That turned out to be [IE 8](https://en.wikipedia.org/wiki/Internet_Explorer_8). (Upon reading that last sentence, you probably just muttered, “Oh, God,” or words to that effect.)

In doing this part in particular, I was guided by several HTML/CSS luminaries’ writings and videos—including, yes, Jen Simmons’s, Rachel Andrew’s, and Kevin Powell’s—that stressed the most important thing to keep in mind for accommodating such legacy software was to give its users the _best possible user experience_. It’s not necessary to give them everything that current browsers and devices can, mainly because you _can’t_, but you _can_ give them everything they really need to have a decent experience with whatever you’re trying to present. Of course, this site isn’t exactly on the cutting edge, so that was less difficult than you might think, although there were a few times I wanted to pull out my mostly absent hair.

(Oh, and did I mention that most of this study and the work that resulted occurred over Thanksgiving? Great holiday fun, eh? Why, yes, in fact, I _am_ a delight at parties. _Snork_.)

So, with my mission clearly established, off the “scabs” came the “bandages,” and off I went.

## What did I learn?

Since you can see this post, and the site works, and I’m still alive to write this, obviously I got done with the task. I **do not** pretend the CSS is as clean as it needs to be, or reflects any “mastery” of CSS Grid, or justifies any other such high-falutin’ assumption on my part. It’ll get better, but this was a first shot. If you’re reading this, say, months from now, I’d hope it’ll be a lot less messy. Also, and this is true for the site’s various versions and not just the latest, the CSS file you see referenced in the source code—called _ofotigrid.css_ at this writing—actually gets built from multiple SCSS files, so don’t read too much into some of the ordering of it all; however, I _am_ proud that I was able to cut the total number of those SCSS files from eleven to six, thus making the final CSS file considerably shorter than each of its predecessors.

(By the way: I changed the nav menu’s background color from light blue to dark blue because, when I did so while testing the visibility of links in the menu, I realized I liked it better that way and decided to keep it going forward.)

So, bottom line: what came from all this just on the “It’s a learning experience” level? Among other things&nbsp;.&nbsp;.&nbsp;.

- **Yeah, Grid really is cool**—I said in the aforementioned previous post that I knew CSS Grid was cool. That was based on what I’d read about it from some of its adherents. But _knowing_ it was quite different from _seeing_ it in practice, making my very own HTML/CSS _schtuff_ easier. Well, _mostly_ easier&nbsp;.&nbsp;.&nbsp;.
- **Some things still are easier in Bootstrap**—Mind you, it wasn’t that bad. For example, re-doing the cards I use for the two newest entries on my [posts page](/posts) was a bit challenging at first, but I simply extended to the non-Bootstrap cards the customization I’d already done to their Bootstrap counterparts. And a similar, do-to-this-what-I-did-to-the-Bootstrap-version process fixed the “Read more” buttons on that same page. But the new non-Bootstrap nav menu, although just as responsive as its predecessor, took quite a bit more doing. Of course, some would say, “Well, you’re just learning the _right_ way, now.” Whatever. Incidentally, I am beholden to Kevin Powell for [this video](https://www.youtube.com/watch?v=8QKOaTYvYUA) and [this CodePen](https://codepen.io/kevinpowell/pen/jxppmr), on which I based this iteration of that menu. I had to abandon a few of the neater things about the menu, especially where smaller devices were concerned, _because_&nbsp;.&nbsp;.&nbsp;.
- **IE 9 is even dumber than I’d feared**—As little regard as I had for IE 9 before, I have even less now.    
	And that feeling goes ’way beyond the “Oh, gee, I didn’t know IE 9 couldn’t do a YouTube embed” level. That, I actually could understand (and, before you suggest it, I tried the various years-old ways around it that you can find with a Google search, and none of them seem to work anymore).    
	No, you see, I didn’t know IE 9 was too dumb to understand _media queries_! Upon learning this, I first thought, “Well, at least that means it will _ignore_ what’s in a media query”—but, of course, it couldn’t be that easy. Nope; quite the contrary. Since it doesn’t know what a media query is, IE 9 reads _all_ CSS, regardless of whether it’s in a media query. You’d think that wouldn’t be such a hassle if one is doing everything from a mobile-first standpoint, which by all rights should mean that the large-screen instructions go last and thus are all IE 9 will finally honor; but, in practice, it didn’t always work quite so neatly. (I’m sure I probably could’ve done it better in that regard, of course; I’m telling you only how it went this particular first time through the wringer.)    
	And, yeah, I know there are some ways to hide things from IE 9, but in the end I decided to forego them simply for the sake of time (and to avoid further exasperation). A somewhat easy way out would have been a totally separate CSS file for only IE 9 and earlier (_shudder_), but I purposely decided against that kinda stuff because that’s [considered a no-no](https://www.w3.org/community/webed/wiki/Optimizing_content_for_different_browsers:_the_RIGHT_way) which doesn’t fit the whole [progressive enhancement _vs._ graceful degradation conundrum](https://www.w3.org/wiki/Graceful_degradation_versus_progressive_enhancement) (with the former obviously superior to the latter, although IE 9-level browsers make that a challenge). I do still have IE-specific instructions in the HTML `<head>` section so IE 9 and earlier will use [HTML5 Shiv](https://github.com/aFarkas/html5shiv/) and thus not be totally ignorant of HTML5, but that’s still okay. At least, I think so.    
	On a related note&nbsp;.&nbsp;.&nbsp;.
- **Supporting older browsers makes your CSS code a lot bigger**—This one is simple to explain. Until we can assume every browser out there understands _rems_ as opposed to _ems_, much less frickin’ media queries or CSS Grid, we have to add code that older, dumber browsers understand so they can at least try to approximate the desired result that newer browsers achieve more efficiently.    
	The procedure is fairly simple: for each item, you put in the obsolete-browsers CSS first, then follow it with the modern-browsers CSS. That works because the obsolete browser will ignore the modern-browsers CSS and thus implement the obsolete-browsers CSS, while the modern browser will understand both but will implement the modern-browser CSS because it came last and, thus, overrode the obsolete-browser CSS.    
	One example is using `display: table` and `display: table-cell` for parent and child elements, respectively, to simulate what `display: grid` and `display: grid-item` get you in Grid, so you end up typing the `table`-related code and following it with the `grid`-related code. But, as a quick view of my code will tell you, stuff like that is only the beginning. Oh, man, is it ever.

Overall, I found the change both positive and interesting, some little nits notwithstanding. I will keep learning and tightening the code appropriately. As a result, I hope, I will get a little smarter and both this site _and_ its code will improve. To quote the late Stan Lee: _Excelsior!_ (Ever&nbsp;upward!)