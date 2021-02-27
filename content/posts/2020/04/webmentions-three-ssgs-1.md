---
layout: layouts/posts/singlepostherofit.njk
tags: post
title: "Webmentions in three SSGs • Part 1"
subtitle: "Getting started with IndieWebbin’ in general"
description: "The intro to a five-part series about incorporating webmentions into three different static site generators (SSGs)."
author: Bryce Wray
date: 2020-04-28T16:30:00-05:00
lastmod: 2020-09-16T09:00:00-05:00
discussionId: "2020-04-webmentions-three-ssgs-1"
featured_image: group-chat-photoillustration-3354365_4928x2855.jpg
featured_image_width: 4928
featured_image_height: 2855
featured_image_alt: "Photoillustration of a multi-participant web chat"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/geralt-9301/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3354365">Gerd Altmann</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3354365">Pixabay</a></span>
---

**Original opening note**: This is the Introduction to a five-part series about how you can set up [webmentions](https://indieweb.org/webmention) in websites built by three different [static site generators](https://staticgen.com) (SSGs): [Eleventy](https://11ty.dev), [Hugo](https://gohugo.io), and [Gatsby](https://gatsbyjs.org). In the [conclusion](/posts/2020/04/webmentions-three-ssgs-5), you'll find a bibliography of the best articles I found on the subject of this series. All of the articles link (even if only through tiny [GitHub](https://github.com) logos) to their authors’ code. They were invaluable to this effort, and I encourage you to take particular notice of them and their authors.
{.yellowBox}

**Added note, 2020-07-26**: I have now archived the various configuration files linked within this series within a [GitHub repo](https://github.com/brycewray/files-webmentions) of their own and changed the links accordingly, so as to make them immune to ongoing changes in the repos originally linked from this series.
{.yellowBox}

**Added note, 2020-09-16**: The site no longer uses webmentions.
{.yellowBox}

It's an [often-misattributed](https://www.artsy.net/article/artsy-editorial-four-iconic-quotes-artists) phrase: "Good artists copy; great artists steal." Well, in the case of your faithful correspondent, here, it's more a case of "Great coders code; mediocre coders borrow shamelessly." But, if I didn't, I couldn't keep this site going, so shameless I shall continue to be.

A few months ago, I first learned of the [IndieWeb](https://indieweb.org) movement and, more to the point, [webmentions](https://indieweb.org/Webmention). In case you're new to this stuff, too, the idea behind webmentions is that people should own their own web content because it's unwise to depend on third parties---even apparently financially healthy ones---to keep that content safe for the future. Having your own personal website is part of that idea, but having webmention functionality *on* that site is another major puzzle piece.

When I [converted](/posts/2019/12/packing-up) this site to an [Eleventy](https://11ty.dev)-/[webpack](https://webpack.js.org)-based platform a few months back, I also began a tentative, gradual integration of webmentions into the site.[^FullWM] As [mentioned before](/posts/2020/04/full-11ty-js-monty), I leaned heavily (out of my usual necessity) on code and articles by others who'd mastered this on their own sites. That's when I knew I'd be writing this post; but I'll get to that in a moment.

[^FullWM]: Incidentally, I freely acknowledge that this site hasn't gone *fully* webmention-friendly. That would involve not only showing webmentions it receives but also facilitating the *sending* of them directly from the site itself. So far, I haven't seen fit to go [that route](https://indieweb.org/Webmention-developer), although it (sort of) remains on my mental agenda.

## Sharing time

A few weeks ago, I [decided](/posts/2020/04/different-modes-different-code) to launch public repositories of this site as it would be executed in its former [static site generators](https://staticgen.com) (SSGs),  [Hugo](https://gohugo.io) and [Gatsby](https://gatsbyjs.org). I hoped these would serve somewhat as a "[Rosetta Stone](https://en.wikipedia.org/wiki/Rosetta_Stone)" in that all three would result in the same final site, so people interested in switching from one SSG to another could say, "Ah, yeah, I see: in *this* one you use *this* code to get there, and in the *other* one you use *that* code. That makes sense."

Although I said at the time that I'd be wary about keeping those repos up to date with this one for more than just additional posts as they came along---*i.e.*, as opposed to making *configuration* changes---my challenge- and tinkering-loving brain wasn't having any of that.

Accordingly, when I enhanced this site's webmentions capabilities recently so that it now shows more kinds of webmentions, I couldn't resist doing the same for the other two repos. And, this past Saturday, I was able to post the necessary changes to them.

**This series is for sharing some of what I learned in the process**. That's especially true where the Hugo and Gatsby repos were concerned, because getting them up to speed, notably the Gatsby repo, required quite a bit more futzing as compared to doing it in the Eleventy repo. I therefore decided to use this series as a way of providing help for anyone else who might want to add webmentions to a website based on any of these three SSGs.

### Chase scenes

Does this series amount to the articles I wish I could've read before I started? No, but I do hope it will help you avoid some of the things that had me metaphorically beating my head against the computer screen for several nights in a row trying to find answers.

In particular, I found it *really* difficult to follow the logic in certain articles’ related code. I ended up "chasing" variables, constants, and statements from other files---and sourly muttering things like "Where'd *that* come from?" and "What's *that* got to do with what's supposed to be happening here?" and "Wait a minute; what happened to the step *before* this part?"

As I often say: if *I* can do this, *you* can do this. That's especially true if you have a decent base in [JavaScript](https://js.org) (and, for Hugo's sake, [Go](https://golang.org)); but, even if you don't, I hope what's contained in and linked from this series will help you reach a happy place, so your webmentions will get fetched regularly and then appear on your site as they should.

And no chase scenes involved, I hope.

## Getting started: The *very* basics

It's not within the scope of this series to give you *extensive* details about the general niceties of making your site compatible with webmentions in the first place. Fortunately, [IndieWebify.Me](https://indiewebify.me) not only is pretty much the canonical location for that, but also makes it easy.

To facilitate the capture of webmentions for my site, I chose to use a combination of two free, hosted services: [webmention.io](https://webmention.io), which is an endpoint for receiving webmentions for web pages registered with it; and [Bridgy](https://brid.gy), which "watches" social media sites for responses to its registered users’ pages and sends the responses back to those pages as webmentions. Each service has pretty simple instructions for how to sign up with and start using it. In my case, I did the following for each repo:

1. Added the necessary **[microformats](https://indieweb.org/microformats)** information to the site footer. This essentially acts like a "beacon" to other sites, "announcing" pages’ titles, descriptions, and more. The other sites can then "respond."

2. Added to the site's universal `<HEAD>` section the appropriate `link rel="webmention"` and `link rel="pingback"` HTML. This enables webmention.io to collect webmentions and "[pingbacks](https://en.wikipedia.org/wiki/Pingback)" for the site pages.

So that's the generic webmention-ization process I followed, *but* keep in mind that all it does is start fetching your webmentions for you out on webmention.io. The nitty-gritty yet to come is when *you* subsequently fetch them *from* webmention.io and make them actually appear on *your* site. How you can do it varies from SSG to SSG, hence this series.

We'll start with Eleventy in [Part 2](/posts/2020/04/webmentions-three-ssgs-2), move on to Hugo in [Part 3](/posts/2020/04/webmentions-three-ssgs-3), and get to Gatsby in [Part 4](/posts/2020/04/webmentions-three-ssgs-4). That'll be followed in the conclusion, [Part 5](/posts/2020/04/webmentions-three-ssgs-5), with a wrap-up---**and** that previously referenced bibliography for the series.

I'd urge you to read them in order so as to get the whole picture, **but** I surely understand you may want to read about only the SSG you're using. If so, maybe you could skim the other two and spend most of your time on the part that interests you most, but I still think it would be best to skim/read *in order*, if possible.

See you in [Part 2](/posts/2020/04/webmentions-three-ssgs-2). [Be there. Aloha.](https://www.quotes.net/mquote/751727)