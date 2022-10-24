---
title: "Gems in the rough #17"
description: "A GitHub Discussions oddity, Netlify Edge Functions, feed readers with built-in browsers."
author: Bryce Wray
date: 2022-04-28T15:26:00-05:00
#initTextEditor: iA Writer
---

{{% disclaimer %}}

Each entry in the “Gems in the rough” series is a collection of tips, explanations, and/or idle observations which I hope will be at least somewhat useful to those of you with websites built by [static site generators](https://jamstack.org/generators) (SSGs).
{.box}

## Getting giscus going again

I [noted](/posts/2022/03/gems-in-rough-16/#trying-giscus) in the previous "[Gems in the rough](/posts/2022/03/gems-in-rough-16/)" that I was trying the [giscus](https://giscus.app) commenting system. giscus uses the [GitHub Discussions](https://docs.github.com/en/discussions) API and brings in comments from Discussions that it automatically creates on your site's repository.

At the time I issued that post, I had no expectation of migrating the site to a different repo. Still, even after [I did](/posts/2022/04/winds-change/), I figured, *Ah, no problem, I'll just [transfer the Discussions](https://docs.github.com/en/discussions/managing-discussions-for-your-community/managing-discussions#transferring-a-discussion) from the previous repo to the new one, and everything will work again.*

Well, I was half-right.

Yes, if you transfer the Discussions to the new repo, the website will still have the same comments as when it was on the old repo (presuming, of course, that you have properly configured the new repo to use giscus). The problem came in the transfer process. I tried for days and couldn't get it to work. Every time I attempted it, GitHub gave me an error message saying that what I was attempting wasn't possible "at this time."

Finally, yesterday, giscus maintainer [Sage Abdullah](https://github.com/laymonage) [figured it out](https://github.com/github/feedback/discussions/3381#discussioncomment-2655388). Within a few minutes, I was able to get those Discussions transferred across and, with them, their comments restored to the appropriate pages in the site.[^qualityQuantity]

[^qualityQuantity]: There aren't many, I know, but I still wanted them to appear. Several folks had taken the time to interact, and thus I figured that restoring the questions or thoughts they'd left for me was the least I could do.

I then posted word of this to a few Discords where I thought it might be useful; and, for the same reason, I will reproduce some of that post here:

> If you use the giscus service . . . for commenting on your website, its reliance on GitHub Discussions means that comments are tied to the repo where your website’s code exists. **If you change the site to a different repo**, the Discussions must be transferred to that repo; otherwise, they won’t appear in the new repo’s giscus-equipped website. **However**, as of now, that’s not possible **unless** you change each Discussion's category away from the giscus-recommended category of “Announcements.” **Then** you can transfer each Discussion to the new repo, **and** change it **back** to an “Announcements” Discussion — and all your comments magically come back in the new place.

**However**, I'd missed the most sensible solution of all: give the GitHub Discussions their **own separate repo** and point giscus to it from, well, whichever repo may be hosting this site at whatever time. (Thanks to the Astro team's [Sarah Rainsberger](https://twitter.com/sarah11918) for the idea!) So, now, the comments live in [a `comments` repo](https://github.com/brycewray/comments), where they should be eternally safe from my fickleness.

**Later update**: Turned out that, while the previous comments and reactions were indeed back on the site, it wasn't possible for anyone to enter **new** ones --- **until** (and, again, I have Sarah Rainsberger to thank for giving me the word that things were amiss) I went back into the giscus website and obtained a new set of variables for the `comments` repo. **Now** it all works again. So that's one more thing you have to do in such a case.
{.box}

## Netlify Edge Functions

On April 19, [Netlify](https://netlify.com) [announced](https://www.netlify.com/blog/announcing-serverless-compute-with-edge-functions/) it had become the latest of the Jamstack-savvy hosts to provide edge-computing functions in the form of [Netlify Edge Functions](https://www.netlify.com/products/#netlify-edge-functions), which currently are in beta. Unlike how Netlify's competitors have done it, this entry in the Edge Race [uses Deno](https://deno.com/blog/netlify-edge-functions-on-deno-deploy) --- at least theoretically providing better performance and more successful interactivity with various web development frameworks, although that obviously will remain to be seen.

That same day, [Eleventy](https://11ty.dev) creator/maintainer [Zach Leatherman](https://zachleat.com) --- who [Netlify now has working on Eleventy on a full-time basis](https://www.netlify.com/blog/growing-our-open-source-contributions/) --- [announced](https://www.11ty.dev/blog/eleventy-edge/) [Eleventy Edge](https://www.11ty.dev/docs/plugins/edge/), a plugin that teams Eleventy 2.0.0-canary.7 or higher and Netlify Edge Functions "to add dynamic content to . . . Eleventy templates."

## Feed readers and built-in browsers

While this section isn't really about web dev, I bring it up here because, during my recent (but now-[reversed](/posts/2022/05/mulling-over-migration/#a-sheepish-u-turn)) [site migration](/posts/2022/04/winds-change/) to [Astro](https://astro.build), I spent a lot of time tinkering with my [RSS](https://en.wikipedia.org/wiki/RSS) and [JSON](https://jsonfeed.org) feeds[^AstroFeed]. That occasioned my testing the new repository's feeds on the RSS reader apps I use, one of which is the subject here.

[^AstroFeed]: Those feeds still constitute a work in progress, while I wait to see whether the Astro team will make certain feature changes when Astro's currently ultra-tight development schedule permits.

One thing I do almost every day is keep at least one feed-reader app open but minimized while I'm coding or writing, and then check it periodically to see what's been added to the many feeds I follow. I have two feed-reader apps, sync'd via iCloud and running on both macOS and iOS: [News Explorer](https://betamagic.nl/products/newsexplorer.html) (paid) and [NetNewsWire](https://netnewswire.com/) (FOSS). Until a few days ago, I typically used News Explorer for this task, primarily because it has a built-in web browser and NetNewsWire doesn't.

One day, I became curious about NetNewsWire's lack of this seemingly obvious feature, so I did a search. Soon, I'd changed my mind after reading a [2019 blog post](https://inessential.com/2019/09/04/on_the_many_netnewswire_feature_requests) by NetNewsWire's creator, Brent Simmons, about this very topic. Of the many good points he raised, the one that quickly altered my thinking about this question was:

> [With a built-in browser,] your ad blockers and privacy extensions won't run. . . . That means that viewing a web page in NetNewsWire would be less secure and more annoying than viewing the same page in [a secured browser].

(I'd already realized how janky web pages look in News Explorer, what with so many pop-up ads and garbage that my various browsers all hide; but I hadn't sufficiently considered the security angle.)

And to the argument that long-ago versions of the app **did** have built-in browsing, he correctly replied:

> . . . times have changed. Many websites are hostile these days. In 2005, this feature was fine  ---  but these days it's totally not.

NetNewsWire has since added a built-in *reader* option, using the open-source [Mercury parser](https://github.com/postlight/mercury-parser). In the same 2019 post, Simmons already anticipated this development, noting that it would provide only an item's **content** "without all the extra junk that is *not* the article you want to read."

So, for now, I'm with NetNewsWire and I suggest the same for you if you're in the Apple ecosphere. NetNewsWire has always been a great RSS reader app, it's actively and lovingly maintained, *and* it protects your privacy better than many of its seemingly more capable competitors. (Also: you can't beat the price.)
