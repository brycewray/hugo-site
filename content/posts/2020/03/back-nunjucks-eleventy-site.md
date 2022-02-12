---
layout: singlepost
tags: post
title: "Back to Nunjucks for my Eleventy site"
subtitle: "Taking a course of lesser resistance"
description: "Why I’ve decided for now to backtrack from JavaScript-only templating in Eleventy."
author: Bryce Wray
date: 2020-03-22T14:30:00-05:00
lastmod: 2021-05-16T10:24:00-05:00
discussionId: "2020-03-back-nunjucks-eleventy-site"
featured_image: Nunjucks-template-screen-capture-2020-02_edit_1280x881.jpg
featured_image_width: 1280
featured_image_height: 881
featured_image_alt: "Nunjucks template file displayed in Visual Studio Code"
#featured_image_caption: This was my own screen capture
---

{{< disclaimer >}}

As even a casual perusal of some recent posts to this site could easily make clear, I have become a real fanboy for the [Eleventy](https://11ty.dev) [static site generator (SSG)](https://staticgen.com), which I use to create and maintain the site. It offers a tremendous number of advantages over the competition, and one of those advantages is the simplicity of *templating*.

For those of you who have no clue what that means and/or why you should give a rip, here's an extremely simplified explanation.

Adding content to an SSG-generated[^SSGgen] website like this one usually involves giving the SSG a plain-text file, which the SSG then runs through a template to transform it into a web page. For example, the template may look like the bare bones of the [HTML](https://en.wikipedia.org/wiki/html) for a web page but with one or more special "placeholder" variables for the plain-text file's content. When the SSG does its thing, it turns this combination of the plain-text file and template into web content.

[^SSGgen]: Saying "SSG-generated" is like saying "ATM machine" or "PIN number," but I think it's clearer and more accurate than saying "SSG-based."

However, not all SSGs are created equal in this regard.

## Watch your language

More often than not, an SSG will accept templating in only one specific computer language. So, if you know diddly about that language and can't readily pick it up from viewing the code of other people's sites (where those sites’ code is even publicly viewable in the first place, as [this site's code is](https://github.com/brycewray/eleventy_bundler)), it doesn't matter what cool things that SSG could have done for you; you're going to find using it a pain.

No, what you want is an SSG that gives you plenty of templating choices. That, friends, [Eleventy does](https://11ty.dev/docs/templates), big-time---right down to even good old vanilla HTML, if you're so inclined. Of course, some of the choices offer more power than others, and therefore, again, it's even better to have choices.

Most of the [Eleventy documentation](https://11ty.dev/docs) seems to assume the use of the flexible, JavaScript-based [Nunjucks](https://mozilla.github.io/nunjucks/) templating language, so it's not uncommon for an Eleventy newbie to go with it at the outset. I surely did for my first few months of running this site via Eleventy.

One of the other templating choices is pure JavaScript itself, handled through .11ty.js files (presumably to avoid confusion with just plain .js files, such as those used for [configuration](https://11ty.dev/docs/config) purposes). In the beginning, I viewed that option with some curiosity but, since the Eleventy documentation doesn't give as many concrete examples for it as for Nunjucks and I couldn't find code from any other Eleventy users that followed that method, I let it be.

Then, about a month ago, I saw word on the Eleventy [Twitter feed](https://twitter.com/Eleven_ty) of a fellow named [Reuben Lillie](https://reubenlillie.com), who had created his site almost entirely with .11ty.js templating. Even cooler: his [code](https://gitlab.com/reubenlillie/reubenlillie.com) is stupendously well-documented. If you're often disappointed by the documentation in other public repositories’ code, Mr. Lillie's will make you cry for joy.

I was intrigued, and---with help from not only Mr. Lillie but also fellow Eleventy *aficionado* [Peter deHaan](https://about.me/peterdehaan)---spent a few weeks working to change my templating from .njk files to .11ty.js files. I finally went live with this templating last Sunday.

## Ignorance of the code is no excuse

However, it didn't take me long to realize that I simply don't know enough JavaScript to implement a *full* switchover. Mr. Lillie and Mr. deHaan had tried to help me with the issues I encountered[^HelpNeeded] but, in the end, I still was left with multiple key templates in .njk. It wasn't so terrible, but, well, the intent had been to switch, completely. And I couldn't.

[^HelpNeeded]: Notably, I couldn't successfully translate the Nunjucks template for my [posts list pages](/posts) into a properly [paginated](https://11ty.dev/docs/pagination) "feed" (so to speak) using .11ty.js templating. I also couldn't figure out how to make a pure-vanilla-JavaScript version of Max Böck's [superb webmentions-handling Nunjucks code](https://mxb.dev/blog/using-webmentions-on-static-sites/), which I'd shamelessly copied for my own purposes; as a result, I temporarily reverted to using [Talkyard](https://www.talkyard.io) for commenting---which I **still** recommend for general commenting purposes, mind you---because it was easy to insert the necessary Talkyard-provided code into the appropriate .11ty.js template. Incidentally, I removed webmentions (and old pre-webmentions comments) a few days later, so that issue is now moot.

Plus, I soon realized that, *because* of my inability to do much with the .11ty.js templates other than slavishly follow others’ examples (and keep begging smarter people for help they didn't have time to give), I wouldn't be able to do much with .11ty.js templates going forward. By contrast, I'd frequently tinkered behind the scenes with the .njk templates to see what I could do to make small improvements.

So, after a few days with the sort-of-.11ty.js-based templating setup, I decided to go back to Nunjucks.

## Hoping for another try

I *remain* very interested in the *idea* of going fully to .11ty.js templates, but will have to wait until the Eleventy documentation more fully supports it with examples for schnooks like me.

If you, too, would like to see that, please note that Mr. Lillie is interested in providing such documentation that could, with the approval of Eleventy creator [Zach Leatherman](https://zachleat.com), become part of the official docs.

I hope that happens sooner rather than later. If it does, and if Mr. Lillie's docs are *half* as good as the documentation he put in his own code---wowzers.
