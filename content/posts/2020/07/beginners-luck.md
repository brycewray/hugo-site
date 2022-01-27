---
layout: singlepost
tags: post
title: "Beginner’s luck"
subtitle: "New Eleventy and Hugo starter sets"
description: "Helping more people get going with two great SSGs."
author: Bryce Wray
date: 2020-07-27T16:30:00-05:00
lastmod: 2021-03-26T07:35:00-06:00
discussionId: "2020-07-chasing-100-tips-optimizing-website"
featured_image: susan-holt-simpson-H7SCRwU1aiM-unsplash_4608x3072.jpg
featured_image_width: 4608
featured_image_height: 3072
featured_image_alt: "Colorful toy alphabet blocks"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@shs521?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Susan Holt Simpson</a>; <a href="https://unsplash.com/s/photos/toy-blocks?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

---

Rarely does a day go by that I don't read of yet another person deciding to move his or her website to one of the two [static site generators (SSGs)](https://staticgen.com) closest to my heart: [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io).

Good going, aforementioned "yet another person."

To do my part in helping to lure more folks to one of these two happy places, I'm pleased to announce that I've created two new **starter sets**, [one for Eleventy](https://github.com/brycewray/eleventy_solo_starter) and [one for Hugo](https://github.com/brycewray/hugo_solo), based on my site.

I've also converted my existing Hugo-based version of the Eleventy repo (*i.e.*, the one from which [Vercel](https://vercel.com) builds this site) to being [another starter set](https://github.com/brycewray/hugo_site_css-grid).[^exLoc] (Why two Hugo starter sets? I'll explain that shortly.)

[^exLoc]: **Update, 2021-02-20**: Today, I moved it from its [former location](https://github.com/brycewray/hugo_site_css-grid).

## Starter *vs.* non-starter

First, let me deal with one even more salient question: what exactly is a starter set where SSGs are concerned?

In my starter sets’ cases, at least, the term refers to a site repo that has been pared down to a sufficiently minimal set of content and configuration so that, while someone new to the SSG can load and run it, he or she then can also customize it without having to delete a ton of unneeded stuff.

[A few months back](/posts/2020/04/different-modes-different-code/), I made public the Hugo and [Gatsby](https://gatsbyjs.org) versions of this site's repo. This was a follow-up to my having made my Eleventy repo public [last December](/posts/2019/12/code-comfort-eleventy-webpack/) (the [webpack](https://webpack.js.org)-based version I had for a while) and [two months ago](/posts/2020/05/going-solo-eleventy/) (the current, non-webpack version). I thus hoped the choice among the three repos I'd used would be as helpful to me as I have found it to see others’ repos.

The problem with that approach was, as I noted in the repos’ README files, each definitely wasn't a starter set **although** it could be *used* as one---if, of course, one was willing to go through and carve away all my content. (Yeah, right.)

Then, more recently, I pared back both the Hugo and Gatsby versions to a very small number of posts, hoping that would simplify things. Still, the posts that did remain were the actual content rather than more generic (and *very* short) posts, and thus the repos remained not truly "starter-ish."

In addition to that, I had *no* reduced-size repo for helping folks interested in Eleventy, and that *really* griped my cookies because that's the SSG in which I most want to spur newbies’ interest.

So, I spent the better part of this weekend fixing this problem, resulting in those three new starter repos (well, two new starter repos and a third repo *repurposed as* a starter repo).

Each of the three repos has only a small number of posts, each with pretty generic front matter and content, but with a few tips of how to include things like images and code blocks. I have "generic-ized" each repo so that it doesn't come with my name, logo, and site URL all over the place; it also doesn't have [webmentions](https://indieweb.org/webmention) support so you won't have to worry about all the code involved with that.[^wmsHelp]

[^wmsHelp]: For those who *do* want to add webmentions, you may want to check out my recent five-part series on doing just that, beginning with [Part 1](/posts/2020/04/webmentions-three-ssgs-1/). If you'd already seen those posts when I first issued them, please note that---given the changes I've made since then to various repos to which I'd linked from those posts---I have now moved the linked files to [their own repo](https://github.com/brycewray/files-webmentions) for archival purposes, as is now explained at the start of each of the five posts in the series.

## Two for Hugo&nbsp;.&nbsp;.&nbsp;.

Repeating the earlier question: why do I have *two* Hugo starters?

You see, there are many folks who gravitate toward Hugo **because**, out of the box, it doesn't require JavaScript and/or [npm](https://npmjs.org) dependencies. On the other hand, some like to see Hugo with additional capabilities added *with* JavaScript and npm dependencies. That's why I decided to give the two sides a choice. Both repos use [Hugo's built-in image processing](https://gohugo.io/content-management/image-processing/) to provide responsive images, but they differ on how they handle styling:

- The [*hugo_twcss* repo](https://github.com/brycewray/hugo_twcss) uses, as does this site, [PostCSS](https://postcss.org) and the highly popular [Tailwind CSS](https://tailwindcss.com)---both of which do require JavaScript and dependencies.

- The [*hugo_solo* repo](https://github.com/brycewray/hugo_solo) is JavaScript- and dependencies-free, and uses [SCSS](https://sass-lang.com/) through [Hugo Pipes](https://gohugo.io/hugo-pipes/scss-sass/).

## &nbsp;.&nbsp;.&nbsp;. and none for Gatsby

And now, we get to the elephant in the room.

Where's the Gatsby version of all this?

Well, um, there isn't one.

I did *try* to create one but, as has been my usual experience with Gatsby (as recounted [here](/posts/2019/12/sorta-strange-ssg-trip)), it didn't go all that well. Let's just say Gatsby in dev mode was its usually finicky and glitchy self.[^GatsbyUsers]  Fortunately, with [many Gatsby starters out there already](https://www.gatsbyjs.org/showcase/), the lack of one more isn't going to hurt anybody.

[^GatsbyUsers]: As I've said before, I'm fully aware that there are uncounted Gatsby users out there, especially the [React](https://reactjs.org)-savviest among them, who have zero trouble using Gatsby. And they can have it.

(I will keep the current [Gatsby repo](https://github.com/brycewray/gatsby_site_css-grid) up there for the curious, but plan few or no changes to it going forward. I've decided that the wisest thing I can do with that repo is to, quoting [the perhaps unintentionally sad sign stenciled on the launch pad where the Apollo 1 astronauts were killed in 1967](https://www.atlasobscura.com/places/launch-complex-34), *ABANDON IN PLACE*.)

## Plenty of good choices out there

Gatsby isn't the only SSG blessed with numerous starter sets out there for your learning pleasure. There are [tons for the considerably more venerable Hugo](https://gohugo.io/showcase/), and [a decent and growing number for the much younger Eleventy](https://www.11ty.dev/docs/starter/).

In any event, I hope that my new little efforts in this regard will help anyone who, as was true for me not all that long ago, is trying to find the path to a better website-management experience that I believe either Eleventy or Hugo will provide.

**Update, 2020-12-19**: Each starter set has its own online demo on Vercel (formerly on Netlify), linked from its repo.
{.yellowBox}

**Update, 2020-03-26**: See also [this update](/posts/2021/03/beginners-luck-update/) on what has turned out to be a growing number of starter sets for Eleventy and Hugo.
{.yellowBox}
