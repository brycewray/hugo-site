---
title: "Catching up with Hugo releases"
description: "Lots of changes, including a “million-pages release,” have come down the pike."
author: Bryce Wray
date: 2024-05-06T09:21:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

I do my best to keep this site running on the latest released version (or dot-release, as the case may be) of the [Hugo](https://gohugo.io) static site generator (SSG). So it was with a bit of abashment when I realized that it had been nearly a year since I'd written anything about some of the changes which have come in Hugo's various releases. In this post, I'll make amends for that by going through *all* the releases which have occurred in the interim.

<!--more-->

The last full Hugo release I covered here was [v.0.114.0](https://github.com/gohugoio/hugo/releases/tag/v0.114.0), released <span class="nobrk">2023-06-19</span>. As I [wrote the next day](/posts/2023/06/using-dart-sass-hugo-saga-continues/), v.0.114.0 fixed an issue which had arisen from a major change in the [Dart Sass](https://github.com/sass/dart-sass/releases) repository.

From there, I have remained mum on changes and updates in Hugo itself, so let's get to work fixing that right now. *(By the way: to be consistent with what follows, let's note that v.0.114.0 had one subsequent dot-release.)*

## v.0.115.0

Released <span class="nobrk">2023-06-29</span>, [v.0.115.0](https://github.com/gohugoio/hugo/releases/tag/v0.115.0) allowed permalink configuration for section and taxonomy pages.

Subsequent dot-releases: four.

## v.0.116.0

Hugo [v.0.116.0](https://github.com/gohugoio/hugo/releases/tag/v0.116.0) first appeared <span class="nobrk">2023-07-31</span>. Its two most noteworthy changes were the default location of `cacheDir`, where Hugo stores its file caches, and enabling the `where` logical function to support regular expressions with a newly added `like` operator.

Subsequent dot-releases: one.

## v.117.0

Coming only a week later on <span class="nobrk">2023-08-07</span>, [v.0.117.0](https://github.com/gohugoio/hugo/releases/tag/v0.117.0) introduced a new [`.Page.RenderShortcodes` method](https://gohugo.io/methods/page/rendershortcodes/).[^example]

[^example]: For an example of the type of problem the method was intended to solve, see [this thread](https://discourse.gohugo.io/t/the-short-code-way-of-including-md-cause-headings-missed/22511) from the Hugo Discourse forum.

Subsequent dot-releases: none.

## v.0.118.0

The major enhancement that [v.0.118.0](https://github.com/gohugoio/hugo/releases/tag/v0.118.0) (<span class="nobrk">2023-08-31</span>) provided was proper support in Markdown for CJK characters. The release also made welcome improvements to how one creates either a new site or a new theme.

Subsequent dot-releases: two --- most notably [v.0.118.2](https://github.com/gohugoio/hugo/releases/tag/v0.118.2), also from <span class="nobrk">2023-08-31</span>, which finished fixing an issue that v.0.118.0 had introduced regarding building on either [Netlify](https://netlify.com) or [Vercel](https://vercel.com).

## v.0.119.0

Some important Go security fixes constituted the main driver behind the <span class="nobrk">2023-09-24</span> release of [v.0.119.0](https://github.com/gohugoio/hugo/releases/tag/v0.119.0). However, it also included a couple of additions to Hugo's image-processing powers: a `.Process` method and filter (which proved useful for many Hugo commands relating to image processing); and an `.Opacity` filter.

Subsequent dot-releases: none.

## v.0.120.0

Hugo [v.0.120.0](https://github.com/gohugoio/hugo/releases/tag/v0.120.0), released <span class="nobrk">2023-10-30</span>, was mainly a full refresh of its many dependencies; but it  also included another new image-processing filter (`.Padding`) as well as a new `debug.Timer` function, for use in development, to seek out bottlenecks in templates' performance.

Subsequent dot-releases: four.

## v.0.121.0

Primarily a bug-fixing and dependencies-updating release, [v.0.121.0](https://github.com/gohugoio/hugo/releases/tag/v0.121.0) appeared <span class="nobrk">2023-12-05</span>.

Subsequent dot-releases: two.

## v.0.122.0

For those who'd long wanted to see Hugo work with LaTex or Tex typesetting in Markdown, [v.0.122.0](https://github.com/gohugoio/hugo/releases/tag/v0.122.0) (<span class="nobrk">2024-01-26</span>) finally gave them that capability.

Subsequent dot-releases: one.

## v.0.123.0: the "million-pages release"

Hugo's Bjørn Erik Pedersen had hinted for some months on the Hugo Discourse forum that he was working on a souped-up version of the SSG, one he was nicknaming the "million-pages release." It was first shown to us unwashed masses <span class="nobrk">2024-02-19</span> as [v.0.123.0](https://github.com/gohugoio/hugo/releases/tag/v0.123.0). The nickname came mainly from how the new version would keep large items from slowing it down, by shifting them out of memory when they weren't in use.

Pedersen had indicated in advance that the "million-pages release" would include some breaking changes, and the v.0.123.0 release notes also said the release was "a rewrite of the Hugo core." It's therefore not surprising that it had **eight** subsequent dot-releases to fix the inevitable bugs that one must expect after such a significant release.

## v.0.124.0

Compared to its more attention-getting predecessor, [v.0.124.0](https://github.com/gohugoio/hugo/releases/tag/v0.124.0) (<span class="nobrk">2024-03-16</span>) was a pretty quiet release that dealt mainly with a Go security fix and configuration of segments in template rendering.

Subsequent dot-releases: one.

## v.0.125.0

Finally, we come to what is the current major version as of when I first issued this post: Hugo [v.0.125.0](https://github.com/gohugoio/hugo/releases/tag/v0.125.0), released <span class="nobrk">2024-04-16</span>. It added two nerdily interesting new templating features and a new `Luminance` method for assessing an image's colors.

Subsequent dot-releases: six as of the initial issuance of this post.

----

All righty, then. I apologize for my laxness in staying up with Hugo's progress over the last year, particularly since it's what makes this site "Go" (pardon the pun). I'll try to do better in the future.
