---
title: "Tying up some recent loose ends"
description: "Because it’s reasonable to assume you might have missed some or all of these updates, I’ve gathered them into a pile for your inspection."
author: Bryce Wray
tags: [meta, web-development, static-site-generators, ssg, giscus, version-control, git, hugo, css, sass-scss, go-golang, image-processing, site-search, pagefind, accessibility, online-privacy, social-media, twitter, astro]
date: 2022-10-11T08:55:00-05:00
#draft: true
initTextEditor: iA Writer
---

Of course, you folks don't check my site to see all the little updates I make as information changes. I'm sure that's particularly true for those who view my content only through my site's [RSS](/index.xml) and [JSON](/index.json) feeds. So, here's a catch-all post to advise you of a few such additions to *fairly* recent posts.[^sagas]

[^sagas]: I'm purposely excluding "sagas" --- *i.e.*, cases in which updates to earlier posts took the form of one or more entirely separate *additional* posts, such as my attempts to make use of custom-domain support in iCloud Mail --- since even my feeds-only readers should be getting those, anyway.

In each part below, the first date shown is the post's *original* date of publication. I reproduced each update mostly as it actually appears in its respective post, the date of which will determine the order in which it appears below.

*(Incidentally: before we proceed, please understand that I **won't** be updating **this** post if I make further updates to any of the posts mentioned below. This one is what it's going to be.)*

----

## Commenting with giscus

The first of two posts about using the [giscus](https://giscus.app) commenting tool with one's website, "[Tips for using giscus](/posts/2022/05/tips-using-giscus/)" <span class="nobrk">(2022-05-10)</span>, warned of a bug in the [GitHub Discussions API](https://docs.github.com/en/discussions) that would confuse giscus if you had pages with similar titles. By "confuse," I meant that the same comment threads might appear on *multiple* pages with titles that began with similar strings --- *e.g.*, "Static tweets in [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io)" and "Static tweets in Eleventy and Hugo, Part II."

**Update, 2022-07-24**: That problem was [solved on <span class="nobrk">2022-07-23</span>](https://github.com/giscus/giscus/issues/508#issuecomment-1193106139) with a [fix that uses *hashing*](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#data-strict) as a workaround.
{.yellowBox}

## Git info

In "[Get good Git info from Hugo](/posts/2022/06/get-good-git-info-hugo/)" <span class="nobrk">(2022-06-01)</span>, I described how to use Hugo's built-in handling of [Git commit](https://git-scm.com/docs/git-commit) data to automate the process of providing Git-related information in one's Hugo posts.

**Update, 2022-10-07**: If you're interested in displaying **both** per-page Git info **and** whole-site Git info in your Hugo site, check the [solution](https://github.com/gohugoio/hugo/issues/9738#issuecomment-1086669372) suggested by Hugo expert/contributor [Joe Mooring](https://github.com/jmooring). Thanks to [Rodrigo Alcaraz de la Osa](https://twitter.com/fqmente) for the [Q&amp;A session](https://github.com/brycewray/comments/discussions/25) that led me toward this additional information!
{.yellowBox}

## Scoped styling in Hugo

One feature not built into Hugo, but which is often touted by advocates of various JavaScript-based site-building tools, is the automatic production of *scoped styling*. This functionality allows developers to minimize or eliminate the dreaded specificity issues which often go with CSS. I took a *semi*-automated shot at it in "[Sorta scoped styling in Hugo](/posts/2022/06/sorta-scoped-styling-hugo/)" <span class="nobrk">(2022-06-12)</span>, wherein I assigned one or more tags to each of my many posts and then set Hugo to give each post only the styling its tag(s) would dictate. It was as convoluted as it sounds, and it didn't take long before I'd given up the ship on it.

**Update, 2022-06-28**: Consider this now an abandoned experiment. I went with it for a couple of weeks, but, in the end, decided to revert to my previous definitely-**not**-scoped configuration after seeing that *this* method hampered attempts to make certain styling changes --- that is, *without* invoking chaos which wasn't worth my time to resolve. Perhaps you'll have better luck with it.
{.yellowBox}

## Image processing in Hugo

Using Hugo's powerful, built-in image processing was the subject of "[Responsive and optimized images with Hugo](/posts/2022/06/responsive-optimized-images-hugo/)" <span class="nobrk">(2022-06-29)</span>, which included a rather involved, annotated shortcode. I soon realized that I'd neglected a labor-saving aspect to that Hugo feature.

**Update, 2022-07-26**: In the original version of this post, I used Hugo's [`imageConfig` function](https://gohugo.io/functions/images/#imageconfig) to get an image's width and height for styling purposes, only to learn later that it wasn't necessary (and, in fact, caused an issue or two when I made some other revisions in my own code not related to or included in the sample here) so I decided to drop it in favor of the already-there `.Width` and `.Height`. Simpler is better.
{.yellowBox}

## Tabs, spaces, and .editorconfig

In "[The accessibility argument for tabs over spaces](/posts/2022/06/accessibility-argument-tabs-spaces/)" <span class="nobrk">(2022-06-30)</span>, I mentioned changes to the site's *[.editorconfig file](https://editorconfig.org/)* that would go with, as the post title mentioned, tabs over spaces. However, in providing the original example, I'd forgotten that not all file types would be happy with that.

**Update, 2022-07-04**: The .editorconfig file now included in this post is a revised version of what I originally posted. This takes into account certain troublesome file types --- especially YAML --- which *require* spaces, not tabs, for indents.
{.yellowBox}

## Pagefind

In its earliest forms, the amazing [Pagefind](https://pagefind.app) search tool, about which I wrote in "[Pagefind is quite a find for site search](/posts/2022/07/pagefind-quite-find-site-search/)" <span class="nobrk">(2022-07-28)</span>, worked only on macOS and Linux.

**Update, 2022-08-04**: [Now](https://github.com/CloudCannon/pagefind/releases/tag/v0.6.0), there is a Windows version, too.
{.yellowBox}

## Static tweets using Twitter's v2 API

Twitter prefers that you use Version 2 ("v2") of its API for embedding Twitter content in your site. I've written a number of posts this year on how to embed such content fully statically but, in the beginning, I had to [advise](/posts/2022/02/gems-in-rough-14/#learning-from-a-friendly-hat-tip) that this wasn't a good idea with the v2 API, which didn't yet support video URLs. Then, as I said in "[Static tweets: Twitter's v2 API and video](/posts/2022/08/static-tweets-twitters-v2-api-video/)" <span class="nobrk">(2022-08-21)</span>, I discovered this limitation no longer existed. As a result, I was planning to follow up with a post and accompanying code on doing static embeds of tweets using the v2 API. That intention lasted only a few hours, and I ended up doing a rare (and unusually acerbic) same-day update . . .

**Update, 2022-08-21**: Turns out that effort wouldn't be worth it; you still end up [having to use other APIs](https://twittercommunity.com/t/how-to-get-url-preview-of-link-shared-in-tweet/158649) to pull in what Twitter calls the "[Summary Card with Large Image](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image)" which one typically sees in a tweet that includes a URL to a suitably managed web page.\
In short . . . never mind. I'll stick with what I've got now. The v2 API may be what Twitter wants everyone to use, but it's both a major pain in the ass *and* not sufficient for proper embeds. To be fair, I know that's not what Twitter wants us to do with the v2 API. (On the other hand: after spending hour after hour staring at the v2 API's dev-unfriendly output and trying to find stuff in it, I'm fairly sure what I'd like Twitter to do with the v2 API.)
{.yellowBox}

## Astro

Although I gave it the old college try more than once this year, I found myself unable to continue satisfactorily with the popular [Astro](https://astro.build) for running this site. As I explained in "[Accepting reality about Astro](/posts/2022/10/accepting-reality-astro/)" <span class="nobrk">(2022-10-05)</span>, one of the key reasons for that is [one particular "show-stopper" issue](https://github.com/withastro/astro/issues/4533) which has caused an unacceptably brittle dev-mode experience for my own specific use case.

**Update, 2022-10-10**: [Bjorn Lu](https://github.com/bluwy), a [Vite](https://vitejs.dev/) core team member and Astro "core resident," determined that the "show-stopper" issue is due to an interaction between Vite and Node.js; [his fix](https://github.com/vitejs/vite/pull/10401) should be reflected in a future version of Astro. I'll keep you advised.
{.yellowBox}

. . . and so I will (albeit in the *original* post).
