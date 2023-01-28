---
title: "Eleventy and Hugo: comparing and contrasting"
description: "Trying to choose between the two best static site generators? See if these points address your personal hot buttons."
author: Bryce Wray
date: 2020-12-28T11:45:00-06:00
---

To quote Mick Jagger and Keith Richards [from over fifty years ago](https://en.wikipedia.org/wiki/You_Can%27t_Always_Get_What_You_Want):

> You can't always get what you want<br />
> But if you try sometimes, well, you might find<br />
> You get what you need[^legalLyricsYCAGWYW]

[^legalLyricsYCAGWYW]: "You Can't Always Get What You Want," written by Mick Jagger and Keith Richards. Lyrics &copy; Abkco Music, Inc.

In that somewhat philosophical vein, let's take a look at my two favorite [static site generators](https://jamstack.org/generators) (SSGs), [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io). Specifically, let's compare and contrast them.

Why?

Well, if you're one of those "normal people" for whom I wrote [two](/posts/2020/09/normal-persons-guide-static-websites/) [earlier](/posts/2020/09/normal-persons-guide-static-website-hosting/) SSG-related articles, and to whom I recommended these two as the gold standards of their kind, you may have yet to decide which is the better for you, your workflow, and your personal website/blog --- whether it's extant, still just a "nice-to-have," or somewhere in between.

*(By the way: from here on, I'll conceitedly assume you've already read those two articles; so, if you haven't, please check them out first.)*

So, in the spirit of [another, much older song](https://en.wikipedia.org/wiki/Anything_You_Can_Do_(I_Can_Do_Better)): let's see where each SSG can say to the other, "Anything you can do, I can do better.”[^legalLyricsAYCDICDB] And, please understand, I **don't** pretend this constitutes an exhaustive list in any way. Instead, these are just the things that strike me as likely to matter to you, based on over two years of using Hugo and about a year-and-a-half of using Eleventy (off-and-on in both cases).

[^legalLyricsAYCDICDB]: "Anything You Can Do (I Can Do Better),"  written by Irving Berlin. Lyrics &copy; BMG Rights Management, Concord Music Publishing LLC.

I'll split this into three sections: where the two SSGs are more or less equal, just so we can make clear the items about which you *don't* need to worry in choosing one over the other; where Hugo beats Eleventy; and where Eleventy beats Hugo.

## Where they're a "pick-’em"

The two are pretty much equal in the following respects&nbsp;.&nbsp;.&nbsp;.

### Reliance on Markdown for content

You write your main content in [Markdown](https://daringfireball.net/projects/markdown) (plain text with special characters added to provide formatting and other niceties, as I explained in [my own little Markdown intro](/posts/2019/03/mark-it-down/) early last year), and each SSG uses templates to convert it into web pages. Each piece of content comes with *front matter* that looks something like this (the following has some pieces for Hugo and some for Eleventy, since I like to repurpose my stuff from time to time):

```md
---
#layout: layouts/posts/singlepostherofit.njk
tags:
- post
title: "Two, but not terrible"
description: "“Reminiscin’” as this site celebrates its second birthday."
author: Bryce Wray
date: 2020-09-15T06:20:00-05:00
#lastmod
discussionId: "2020-09-two-but-not-terrible"
featured_image: sahin-sezer-dincer-YhoQj_EUi50-unsplash_5063x3375.jpg
featured_image_width: 5063
featured_image_height: 3375
featured_image_alt: "Monochrome photograph of an hourglass sitting on a tree log"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@sahinsezerdincer?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Şahin Sezer Dinçer</a>; <a href="https://unsplash.com/s/photos/hourglass?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---
```

### Flexible site structure

It's always a shock to me when I run into SSGs that force you to arrange your posts in ways you don't want. After all, many folks wanting to get started with SSGs are coming from [WordPress](https://wordpress.org) and probably want to import old posts that may have URLs like *example.com/myposts/2016/11/how-i-felt-at-midnight-tonight*. Some SSGs (and frameworks with SSG-ish capabilities) *don't let you do that*; but Eleventy and Hugo don't impose such arbitrariness upon you. If you want posts arranged by years/months like the example above (as well as this here website, I should note), they both let you do it that way --- or just about any other, within reason.

### Large, helpful online communities

Hugo and Eleventy have many enthusiastic and knowledgeable fans who regularly inhabit their respective online communities --- whether it's [Hugo's Discourse forum](https://discourse.gohugo.io) or [Eleventy's Discord server](https://www.11ty.dev/news/discord/).

In the case of the Hugo forum, I *highly* recommend you try to find answers within the documentation (see also my next point, however) before you ask any questions. The good thing is that the forum itself has a great search function, and --- given Hugo's been around since 2013 --- it's likely you'll find that somebody has already asked something very similar to what you want to know.

### Not-so-great documentation

With the good comes the not-so-good. Neither Hugo nor Eleventy has truly newbie-friendly documentation. Indeed, I've found no SSG out there that does; so be forewarned.

*Side note*: I brought this up in "[Lessons learned](/posts/2019/07/lessons-learned/)" and, to my surprise, [received a verbal smack-down in the Hugo community forum over a year later](https://discourse.gohugo.io/t/has-hugo-become-too-complex/29609/23) because I'd had the temerity to criticize Hugo's (and other SSGs’) documentation without offering improvements of my own. I thought the other guy's reasoning a bit odd --- after all, it's one thing to know documentation is hard to follow but quite another to have the deep knowledge, much less writing chops, needed to *fix* it --- but I replied, in part:

> Ever since I wrote that post, I actually **have** given many thoughts to pitching in and helping in the way to which you're referring. What has always stopped me is the realization that those items whose documentation needs the most help require me to know far more than I do, or have time to learn, about the fine points (and/or more complex parts) of Hugo.[^contribCFW]

[^contribCFW]: Nonetheless, spurred by the offended individual's complaint, I did decide to try providing some Hugo documentation, at least in those embarrassingly few cases in which I know whereof I speak. To sample the workings of the Hugo docs process, I submitted a little explanation of how to set up a Hugo-based [Cloudflare Workers](https://workers.cloudflare.com) site. That was weeks ago and the pull request, although auto-verified in GitHub as acceptable for merging with the existing Hugo docs repository, has yet to receive **any** response whatsoever. I thus remain high and dry --- but, hey, I tried.

## Where Hugo beats Eleventy

### OotB

This may greatly simplify your choice. If the term *out-of-the-box* (OotB) appeals to you, you can stop reading now. Hugo is your SSG. Hugo is an *app* --- a single binary, in geek-ese --- and, if you choose, you can use it entirely on its own to build a nice website. On the other hand, using Eleventy to achieve the same result requires also using various software *dependencies*, so you have to keep not only Eleventy but also all those packages maintained, which can result in various and sundry unwanted consequences.

To me, this is Hugo's biggest advantage, even more so than its vaunted build speed about which I'll be talking in a bit. Here are just some of the capabilities that are *built into* Hugo, no plugins or other stuff required unless otherwise noted:

- **Image processing** --- Hugo lets you manipulate images so that they're sufficiently [responsive](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).
- **Markdown parsing** --- Hugo comes with the [goldmark](https://github.com/yuin/goldmark) parser, known for its performance and compliance with the popular [CommonMark](https://commonmark.org/) standard. (If you prefer to use Hugo's former parser choice, [Blackfriday](https://github.com/russross/blackfriday), you still can do so by making [appropriate settings](https://gohugo.io/getting-started/configuration-markup#blackfriday) in your site's Hugo [configuration file](https://gohugo.io/getting-started/configuration/). However, you'll probably find goldmark perfectly acceptable.)
- **Assets pipeline** --- [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/) makes possible a variety of other capabilities, including:
	- [Fingerprinting](https://en.wikipedia.org/wiki/Fingerprint_(computing)) and [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). My main use case for this is for [cache-busting](https://tomanistor.com/blog/cache-bust-that-asset) my CSS through the fingerprinting capability (as explained in "[Using PostCSS for cache-busting in Eleventy](/posts/2020/11/using-postcss-cache-busting-eleventy/)," although the Eleventy-related part of that post didn't age well).
	- [Sass/SCSS](https://sass-lang.com).[^libSass] Please note that Sass/SCSS support [requires the *extended* version of Hugo](https://discourse.gohugo.io/t/should-i-use-hugo-extended-for-a-new-hugo-project/13954/7), and it must be running in both your local dev environment and on your chosen host. I recommend always using the extended version anyway, so you'll always have the choice of going the Sass/SCSS route if you want. (As I'll explain later in "Themes," it's best to rely on a good theme when you start with Hugo, and many of the available ones use Sass/SCSS, so that's another reason for always going with Hugo's extended version.)
	- [PostCSS](https://postcss.org). However, using PostCSS actually does get you into needing *some* dependencies, particularly if you wish to use the popular [Tailwind CSS](https://tailwindcss.com) framework --- but it's a *choice*, not a requirement. If you want to see the difference, check my two Hugo starter sets: [hugo_twcss](https://github.com/brycewray/hugo_twcss)[^renamed], which uses PostCSS to enable Tailwind CSS; and the more barebones, dependencies-free [hugo_solo](https://github.com/brycewray/hugo_solo), which uses Sass/SCSS. If you try both, you'll see that hugo_solo builds sites *much* more quickly than hugo_twcss, which leads me to the next point&nbsp;.&nbsp;.&nbsp;.

[^libSass]: **Updated 2020-12-31**: Hugo's Sass/SCSS support **prior to v.0.80.0, released today**, was based on the [recently deprecated](https://sass-lang.com/blog/libsass-is-deprecated) LibSass library, which is incompatible with some newer Sass/SCSS features like the `@use` command and, given the deprecation, will become increasingly outdated over time. Fortunately, the v.0.80.0 release is the first which also works with the Sass/SCSS library which has a future, [Dart Sass](https://sass-lang.com/dart-sass) --- although, for now, this requires a somewhat involved installation process which the Hugo team hopes to improve sometime in early 2021. Even if you're using Sass/SCSS with a Hugo version earlier than v.0.80.0, be assured that this situation may not "bite" you for some time to come, if ever; but this is at least a useful data point for that decision process.

[^renamed]: This repo was formerly known as *hugo_site_css-grid*.

### Staggering build speed

The [Hugo home page](https://gohugo.io) proudly proclaims Hugo as "the world's fastest framework for building websites," and can do so completely honestly. Hugo's build speed is truly astonishing --- creating a multi-hundred-page site in a second *or less* --- especially if you've ever seen how molasses-drenched some other SSGs’ build processes seem to be by comparison. (If you *do* have to use some dependencies, such as with  PostCSS and Tailwind CSS, the overall time slows down a little but the *Hugo site-building part* of it remains head-snappingly quick.)

Hugo's almost iconic build speed comes from the [Go language](https://go.dev)  on which Hugo is built. However, that foundation is not entirely a positive, as I'll explain later.

### Themes

Hugo has theming, and Eleventy doesn't. By selecting one of the many available [Hugo themes](https://themes.gohugo.io/), it's easy for a Hugo novice to get a site/blog up and running, *and* make it look nice, in a very short amount of time.

**One caveat I must offer** (as I always do for people who are new to Hugo) is that, **before** you get started with Hugo, you should look through those themes and pick one that seems more or less like how you think you'd like your site to look and "feel." Once you do that, you can get under the hood and see how the theme author got Hugo to do this thing or that. That also protects you, at least in the beginning, from one of Hugo's weak points, Go-based templating (again, I'll explain later).

**Update, 2022-07-19**: About a year-and-a-half after writing the above, I had [second thoughts](/posts/2022/07/really-getting-started-hugo/) about it.
{.box}

### Time zone handling

This one may seem trivial (even [OCD](https://iocdf.org/about-ocd/)-ish) to you, but Hugo accepts your post dates and times *as you specify them* in your content's front matter. By contrast, Eleventy defaults to [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), so you have to get into its configuration to work around that. Since I often am writing and posting articles late at night here in Texas but in the early morning according to UTC, I appreciate this degree of control. I want something dated December 31, 2020, according to where I was when I posted it, to *appear* with that date --- even if I posted it at a second before midnight Central Standard Time (5:59:59 AM on January 1, 2021, in UTC).

## Where Eleventy beats Hugo

### Templating flexibility

One essential element of dealing with an SSG is the templating it uses to turn your content into web pages. Hugo's templates are all Go-based, but Eleventy works with templates done in [multiple languages](https://www.11ty.dev/docs/languages/), including many that are quite readable by even the aforementioned "normal people" for whom this particular article was intended.

It's hard to overstate Eleventy's advantage on this particular item. While Hugo's amazing build speed comes from being Go-based, so also does the greater seeming opacity of editing its templates. Unless you're a Go wizard, which means you're definitely not one of those "normal people," you can quickly find editing (much less creating) Hugo templates to be a headache. And it won't get a lot better over time, especially if/when you're familiar with other templating languages; Go is a very different animal, and therefore so is Hugo templating. Powerful? Yes. Intuitive? Not impossible, but also not likely.

So, as I counseled previously: if you choose Hugo as your SSG, it's wise to pick one of the many available themes since, in the vast majority of cases thereof, somebody else has already done the heavy Go lifting for you.

### Easier to make it your own

So we've seen that Hugo's blazing build speed comes from the same thing --- Go --- that makes its templating potentially hellish. In somewhat similar fashion, we can also say that the same characteristic that makes Eleventy very much *not* an out-of-the-box solution --- its being essentially a collection of [npm](https://npmjs.com) JavaScript packages --- also makes it much easier to adapt so it'll suit *your* wishes and needs.

(Of course, that's only if you're willing to get under the hood, adding and configuring packages. If you're *not* so inclined, that goes back to what I said about Hugo being the SSG you should use.)

As Eleventy's creator, Zach Leatherman, said when he [introduced the SSG](https://www.zachleat.com/web/introducing-eleventy/) nearly three years ago:

> Always bet on JavaScript. JavaScript gives you access to npm. The npm ecosystem is large. Crazy large. And it's only growing in popularity. According to modulecounts.com, npm has almost three times the modules of its second place competitor, Maven Central (Java). When you want to add functionality, it's a good bet that a module exists on npm.

Here's just one example. With this adaptability, you can enjoy a wider choice of Markdown parsers, as opposed to the two that Hugo supports (and it considers one of the two, Blackfriday, to be deprecated). The one that Eleventy documentation recommends is [markdown-it](https://www.npmjs.com/package/markdown-it), but [there are others](https://css-tricks.com/choosing-right-markdown-parser/), with their own respective advantages; and, if a parser is available on npm, it almost certainly can work with Eleventy.

Curious? Check some of the many [Eleventy starter projects](https://www.11ty.dev/docs/starter/) and see the many, varied ways they use the mind-boggling number of available packages to make some magic.

**Note**: It's believed that Eleventy soon will reach version 1.0.x, which is likely to involve some breaking changes; and, as you can suspect, such "breaking" is going to include how Eleventy works with those other packages. If you have an existing Eleventy site when this new version goes live, before upgrading your main site to that new version you should first test it thoroughly, ideally within at least one *test* site on your chosen host.
{.box}

## A no-lose coin-flip?

Perhaps this piece will nudge you toward which of these two excellent SSGs is best for your needs, if you're torn between them. The good thing is that, given the right approach to each, you really can't go wrong with either. Whether you elect Eleventy or go Hugo, you'll be developing and building your site with a top-flight SSG.
