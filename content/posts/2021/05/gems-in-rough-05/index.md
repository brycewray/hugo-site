---
title: "Gems in the rough #5"
description: "More notes, notions, and nitpicks about managing one’s personal website."
author: Bryce Wray
date: 2021-05-30T13:16:00-05:00
---

Once more, let's venture bravely into the miscellaneous info one gathers while tinkering with, and learning about, websites built by [static site generators](https://jamstack.org/generators) (SSGs) such as [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io).

---

## CSP: good, but gotchas

More often than I probably should, I run this site through [webpagetest.org](https://webpagetest.org) to see what I can improve. I'm usually checking mainly for performance ratings, but recently I decided to see if I could improve the security score, which was typically poor. I soon learned that, yes, I could, but it would take some doing.

In the process, I learned about [Mozilla Observatory](https://observatory.mozilla.org), which is to security testing what [Lighthouse](https://developers.google.com/web/tools/lighthouse) is to performance testing. I followed Observatory's guidelines and, gradually, was able to make big improvements in the site's security score. Down the line, I may write a separate post about how to go about this; but, for now, I'll just note that I had to make two key changes in order to have a strict [**content security policy**](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP):

- **Zero inline styling** (*e.g.*, `style=`) --- I had purged most of it recently for other reasons, anyway; but, now, it's all gone "[and nothing of value was lost](https://english.stackexchange.com/questions/5679/what-is-the-origin-of-the-phrase-and-nothing-of-value-was-lost)."
- **No CSP-violating JavaScript** --- Once I had the CSP in place, I noticed it was unhappy with the [Alpine](https://github.com/alpinejs/alpine) JavaScript framework on which I'd begun basing the site's navigation menu a few months back. As it turned out, the only workaround for the current version of Alpine would've been to [loosen the CSP with an `unsafe-eval` setting](https://github.com/alpinejs/alpine/issues/237). That earned a quick "Nope" from me. The result was a return to having a CSS-only nav menu, albeit a better one[^newMenu] than I'd previously used.

[^newMenu]:  It's based on a [video tutorial](https://www.youtube.com/watch?v=SIzi9z8mrTk) by [Angela Delise](https://www.angeladelise.com/).

## It's all about the cache

In recent months, I've issued two different posts ([one about Hugo sites](/posts/2021/02/tailwind-head-hugo-pipes/) and [one about Eleventy sites](/posts/2021/03/tailwind-head-eleventy/)) explaining how you can use internal CSS --- *i.e.*, put all your CSS inside your HTML's `head` section rather than having one or more separate *external* CSS files. Although I went that route with this site for a few weeks, I've now reverted to the external CSS approach because, unlike internal CSS, it [takes full advantage of browser caching](https://gtmetrix.com/leverage-browser-caching.html). As Google's [Sam Thorogood](https://whistlr.info/) explained a few months ago in "[Love your cache](https://web.dev/love-your-cache/)," you should optimize for the second load.

## The continuing PostCSS 8 saga

[PostCSS](https://postcss.org) is an amazing product that can give "CSS super-powers" to web developers. However, it's also a house of cards, in the form of the hundreds (thousands?) of plugins it's spawned; and it's clearer by the month that many of those cards got shuffled rather nastily with last year's [update to PostCSS 8](https://evilmartians.com/chronicles/postcss-8-plugin-migration).

One of the most widely used PostCSS plugins is [postcss-preset-env](https://preset-env.cssdb.org/). It includes many capabilities which could otherwise require the use of numerous other plugins, but it [remains broken in PostCSS 8](https://github.com/csstools/postcss-preset-env/issues/191). I'd been using postcss-preset-env mainly to do what one can get with two separate plugins, [autoprefixer](https://github.com/postcss/autoprefixer) and [postcss-nesting](https://github.com/csstools/postcss-nesting), so I've replaced it with those.[^presetStarters]

[^presetStarters]: For the most part, my most recent use of postcss-preset-env was in some of my [starter sets](/posts/2021/03/beginners-luck-update/).

Another PostCSS 8-incompatible plugin I had to replace is [postcss-clean](https://github.com/leodido/postcss-clean) for minifying CSS output. Instead, I'm now using [postcss-csso](https://github.com/lahmatiy/postcss-csso).[^sassOnly]

[^sassOnly]: Since the site is Sass-based at this writing, I *could* just use Sass's [built-in minification](https://sass-lang.com/documentation/cli/dart-sass#style) if postcss-csso also becomes a problem, but the latter is more efficient.

## Hugo's problems continue

Here's the latest on where the Hugo SSG stands regarding some shortcomings I mentioned in earlier articles:

- [No compatibility yet](https://github.com/gohugoio/hugo/issues/8343) with the [JIT mode](https://tailwindcss.com/docs/just-in-time-mode) in [Tailwind CSS](https://tailwindcss.com) 2.1+.
- [Not yet using Dart Sass](https://github.com/gohugoio/hugo/issues/8299), rather than the [deprecated LibSass](https://sass-lang.com/blog/libsass-is-deprecated), for [Sass/SCSS](https://sass-lang.com) support.
- No fix yet to [punctuation glitches](https://github.com/yuin/goldmark/issues/180) in the [goldmark](https://github.com/yuin/goldmark) parser Hugo uses to handle [Markdown](https://daringfireball.net/projects/markdown). \[**Update, 2022-03-02**: This third problem **was resolved** on February 28, 2022, with the release of [Hugo 0.93.0](https://github.com/gohugoio/hugo/releases/tag/v0.93.0). It included the first goldmark version, 1.4.7, with the code from a [pull request](https://github.com/yuin/goldmark/pull/280) that fixed all the cases I'd reported.]

While [Hugo's status as a single binary](https://discourse.gohugo.io/t/what-will-2021-bring-for-hugo/31098/5) can be a good thing when one doesn't want to deal with the many dependencies (as in the aforementioned PostCSS weirdness) required by most other popular SSGs, that also can suck in cases like these because the user, unable to "get under the hood," has to wait for remedies from the Hugo dev team and the developers of various external packages on which Hugo relies.
