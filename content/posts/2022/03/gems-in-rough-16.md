---
#layout: singlepost
title: "Gems in the rough #16"
#subtitle: "Or, what else has been going on?"
description: "Eleventy 2.x (yes, already), trying giscus, another shameless plug."
author: Bryce Wray
date: 2022-03-11T09:55:00-06:00
lastmod: 2022-03-17T10:39:00-05:00
#initTextEditor: Ulysses
discussionId: "2022-03-gems-in-rough-16"
featured_image: "gemstones-sung-jin-cho-0d3qxUozE-0-unsplash_7315x4881.jpg"
featured_image_width: 7315
featured_image_height: 4881
featured_image_alt: "Colorful gemstones"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@mbuff?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sung Jin Cho</a>; <a href="https://unsplash.com/s/photos/gemstones?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

Each entry in the “Gems in the rough” series is a collection of tips, explanations, and/or idle observations which I hope will be at least somewhat useful to those of you with websites built by [static site generators](https://jamstack.org/generators) (SSGs).
{.blueBox}

I think this is probably the earliest in any month that I’ve ever gotten to five posts. Not that quantity equals quality, to be sure, but just sayin’. So, while I’ve been spending most of the month so far in [Hugo](https://gohugo.io/)-related posts, what else has been going on in SSG-land?

## Eleventy’s new dev server

Since the [Eleventy](https://11ty.dev/) SSG [became his full-time role](/posts/2022/02/gems-in-rough-14/#eleventy-goes-full-time), Eleventy creator [Zach Leatherman](https://zachleat.com/) has been busy with a number of enhancements to the project. One in particular is the need to replace [Browsersync](https://browsersync.io/) as Eleventy’s built-in development server, due to that package’s [serious security issues](https://github.com/11ty/eleventy/issues/2213). I had expected he would simply pick a different one, but—[“Sha-*zayum*!”](https://www.metv.com/stories/did-gomer-pyle-say-shazam-because-of-the-comic-book-character-probably-yeah)—he’s come up with [one of his own](https://github.com/11ty/eleventy-dev-server). The only thing is: to adhere to [SemVer](https://semver.org/) guidelines, it’ll require a new major version; so, not long after [Eleventy reached v.1.x](https://github.com/11ty/eleventy/releases/tag/v1.0.0), it’ll soon be going to *v.2.x*.

The new dev server should be a great improvement. The current “canary” version of Eleventy, using this server, loads only a few kilobytes of extra JavaScript. That’s as compared to *hundreds* of kilobytes with Browsersync—and without all the nasty “red alert”-level warnings that Browsersync typically kicks up at launch. Those often cause new users in particular to wonder, erroneously but understandably, what in blue blazes they did wrong.

What does this mean for existing Eleventy-based websites? Leatherman says only those sites with specific needs for (and/or ties to) Browsersync code should need fixes for breaking changes—and, for those instances, he’s cooking up a [plugin](https://github.com/11ty/eleventy-server-browsersync) to let such sites continue to use Browsersync even with v.2.x. Other Eleventy sites should transition nearly seamlessly to the new server. Of course, that’s what testing is for, so we’ll see how that goes; but everything looks very promising at this point.

Leatherman announced these upcoming changes and demo’d the new dev server in his most recent weekly video for the [Eleventy YouTube channel](https://www.youtube.com/channel/UCskGTioqrMBcw8pd14_334A)—something else for which he has far more bandwidth now that he’s all-Eleventy, all-the-time.

## Trying giscus

As of the initial publication of this post, I’m trying a commenting system called [giscus](https://giscus.app). It’s based on [Utterances](https://utteranc.es). Both rely on GitHub APIs. While Utterances uses the Search API for GitHub Issues, giscus uses the Search API for the newer, more feature-rich, and seemingly more polished [GitHub Discussions](https://docs.github.com/en/discussions).[^1] (Of course, these projects’ dependence on GitHub also means that, as of now, each use thereof requires a GitHub login. Indeed, I couldn’t even find the **word** *guest* anywhere within the GitHub Discussions documentation.)

It was [Patrick Kollitsch](https://github.com/davidsneighbour)—often better known online as [davidsneighbour](https://twitter.com/davidsneighbour)—who advised me via email to give giscus a shot. As I replied to him:

> Back in 2020, I did a [post about commenting options for static sites](/posts/2020/10/conversation-piece/) (and one of those mentioned was Utterances, which inspired giscus). I chose not too long after that to go to my current reply-via-email setup, because I read on another fellow’s site that he did it that way because[^2] he found such interactions with readers were more meaningful. Since, I’ve found this to be true on my site, too. That said: if you’ve read enough of my stuff, you know that I’m always attracted by Shiny New (or sorta New) Things, so I may just give giscus a look-see.

.&nbsp;.&nbsp;. and so I am doing just that. I had one commenting system or another on my site for about two years until that change last year and, now, here we are again—at least for now.

To be sure, I’m *not* taking away the reply-by-email button/link, which will stick around regardless of what I decide long-term about continuing with giscus. In the meantime, you have *two* ways to react to each post. Your faithful correspondent always welcomes your thoughts.

**Note**: Because of giscus’s reliance on the existing GitHub Discussions feature set, there currently is only one level of nesting; so, if a thread gets “heavy,” it may not be readily obvious who’s replying to whom.
{.yellowBox}

## Another shameless plug

A follow-up to something I [mentioned](/posts/2022/02/shameless-plug-time/) a few weeks ago: the nice folks at CloudCannon kindly asked me to write another piece for them, and the latest such effort is now live on their blog: “[The Ultimate Guide to Hugo Sections](https://cloudcannon.com/blog/the-ultimate-guide-to-hugo-sections/).” As I subsequently noted in a reply to my retweet of the article’s original announcement:

{{< stweetv2 "1502062544764162054" >}}

And there’s more to come in the near future.

I’m busy.

That’s good.

[^1]:	giscus is more actively developed, too, from what I can tell.

[^2]:	Yep, that’s too many *because*s so close together. Sorry. I was in a hurry.
