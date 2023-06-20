---
title: "Using Hugo with Dart Sass: the saga continues"
description: "How Hugo 0.114.0 ended the recent and unexpected period of uncertainty over styling one’s website."
author: Bryce Wray
date: 2023-06-20T09:11:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

If you're a [Hugo](https://gohugo.io) user who's been on the proverbial desert island for a while, you might have missed a few weeks of unexpected drama over how Hugo works with [Dart Sass](https://sass-lang.com/dart-sass). Yesterday's [release of Hugo 0.114.0](https://github.com/gohugoio/hugo/releases/tag/v0.114.0) brought that drama to a close, as I subsequently explained through updates to numerous posts in this here website, but I thought those of you who *don't* breathlessly scan my site for such updates might want a rehash of the whole shebang.

<!--more-->

First, let me paint the pre-drama picture for how Hugo worked with Sass (Dart or otherwise), and I apologize in advance to those who've already read any of my previous ramblings[^ramblings] on this subject:

[^ramblings]: An example of said ramblings would be "[Using Dart Sass with Hugo](/posts/2022/03/using-dart-sass-hugo)" (<span class="nobrk">2022-03-08</span>), which could be considered the first chapter of the "saga" to which the title refers.

- Until a few years ago, using Hugo with Sass was a no-brainer, because Hugo included (and, even now, still includes) the [LibSass implementation](https://sass-lang.com/libsass) of Sass. However, LibSass has received no feature updates since November, 2018; and, in October, 2020, it [was deprecated](https://sass-lang.com/blog/libsass-is-deprecated). In the deprecation announcement, the Sass project urged all LibSass users to switch to Dart Sass.
- In November, 2020, [Hugo 0.80.0](https://github.com/gohugoio/hugo/releases/tag/v0.114.0) became the first Hugo version to support Dart Sass, but it could do so only in concert with the installation of an Embedded Dart Sass binary within the system `PATH` of the Hugo project's development or production environment.
- Further complicating the situation was that it took until [February, 2022](https://github.com/sass/dart-sass-embedded/releases/tag/1.49.5), before that binary was declared "stable."
- Soon thereafter, I began writing [some](/posts/2022/03/using-dart-sass-hugo-sequel/) [articles](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) [about](/posts/2022/05/using-dart-sass-hugo-nitty-gritty/) [how](/posts/2022/08/using-dart-sass-hugo-gitlab-edition/) to install and use the Embedded Dart Sass binary with Hugo. Also, last December, Hugo project member Joe Mooring issued a [comprehensive, related post](https://discourse.gohugo.io/t/using-the-dart-sass-transpiler/41878) on the [Hugo Discourse forum](https://discourse.gohugo.io).

Then came the drama.

- A 2023-05-22 [blog post](https://sass-lang.com/blog/rfc-embedded-protocol-2) from the Sass project explained that:
	- The repo for the *separate* Embedded Dart Sass binary was being archived and the binary itself frozen at its then-current version, [v.1.62.1](https://github.com/sass/dart-sass-embedded/releases/tag/1.62.1).
	- Future versions of Embedded Dart Sass would, instead, be packaged within the [Dart Sass binary](https://github.com/sass/dart-sass).
- The first such version of the Dart Sass binary was [v.1.63.0](https://github.com/sass/dart-sass/releases/tag/1.63.0), released <span class="nobrk">2023-06-07</span>. Those who, as I did, tried Hugo with this binary rather than the archived Embedded Dart Sass binary quickly found that it was largely useless in development mode, because it couldn't "watch" a project for changes; it only formatted everything on the initial load and then did no more. Thus, it was necessary to keep using Hugo with the archived/frozen Embedded Dart Sass binary until the Hugo team could come up with a fix.

. . . which they did yesterday, with the release of [v.0.114.0](https://github.com/gohugoio/hugo/releases/tag/v0.114.0). Now, you just put the Dart Sass binary into the `PATH` and everything works as it did before, with Hugo and Embedded Dart Sass in perfect sync. In fact, that sync is even sweeter, with update speeds occurring faster than before.

Thus, in the space of a few short weeks, the Hugo team has pulled off two impressive fixes where styling one's Hugo site is concerned:

- [Hugo 0.112.0](https://github.com/gohugoio/hugo/releases/tag/v0.112.0) (<span class="nobrk">2023-05-23</span>) [resolved](/posts/2023/06/hugo-tailwind-peace-at-last-maybe/) a long-standing problem with [Tailwind CSS](https://tailwindcss.com)'s baked-in Just-In-Time (JIT) compiler, ending the need to resort to numerous well-intentioned but hacky workarounds.
- And, as of yesterday, Hugo 0.114.0 ended the brief, but unpleasant episode caused by the Sass project's re-packaging decision. (The Hugo team [continues](https://github.com/gohugoio/hugo/issues/8299) [working](https://github.com/gohugoio/hugo/issues/10757) toward an even more comfortable solution for Dart Sass users.)

----

As a side note . . .

This return to more stable use of Dart Sass with Hugo could let you easily try out [native CSS nesting](https://drafts.csswg.org/css-nesting-1/) while you're waiting for broader browser support; just put it in *.scss* files rather than *.css* files. That's because Dart Sass --- at least, as of this writing[^SassCSSNesting] --- happily [transpiles](https://devopedia.org/transpiler) it into styling which *any* [reasonably modern](/posts/2022/06/ies-dead-jim/) browser can use right now.[^PostCSS]

[^SassCSSNesting]: However, if you want to use Sass with *.css* files for some reason, see also my post, "[Sass and the coming of native CSS nesting](/posts/2023/03/sass-coming-native-css-nesting/)," for hints regarding possible, future issues on that front. (I'd suggest just using *.scss* files for now and thus steering clear of any rough waters.)

[^PostCSS]: For that matter, so can [PostCSS](https://postcss.org) with the [postcss-nesting plugin](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting); but Hugo-with-Dart-Sass is **’waaaaaaay** faster than Hugo-with-PostCSS.

Of the major browser platforms, Chrome and Safari already support native CSS nesting; and it [appears](https://caniuse.com/css-nesting) Firefox will [join them](https://bugzilla.mozilla.org/show_bug.cgi?id=1648037) in that regard within a few weeks, first behind a flag in [Firefox 115](https://whattrainisitnow.com/release/?version=115) and then by default in [Firefox 116](https://whattrainisitnow.com/release/?version=116). Thus, you could add natively nested CSS to your Hugo project *now*, letting Dart Sass safely convert it until there's enough browser support for you to feel comfortable in using the CSS as-is with no Dart Sass help. Then, when that time arrives, just remove Dart Sass from the equation and you're good to go.
