---
title: "Gems in the rough #6"
description: "Hiding “future” posts in Eleventy, life with Vercel (nearly) a year later, and other items that may interest static site generator users."
author: Bryce Wray
date: 2021-06-21T16:30:00-05:00
---

Introductory note for the uninitiated: each entry in the "Gems in the rough" series is a collection of tips, explanations, and/or idle observations which I hope will be at least somewhat useful to those of you with websites built by [static site generators (SSGs)](https://jamstack.org/generators).

## Your own Eleventy time machine

Some SSGs, such as [Hugo](https://gohugo.io) and [Jekyll](https://jekyllrb.com), allow you to build your site without including posts to which you've assigned future dates. This can come in handy for any number of reasons, such as when you want to use multiple devices to work on a post and sync it through pushes to the site's online repository.[^WorkingCopy] Although [Eleventy](https://11ty.dev) doesn't have an "ignore-the-future" capability out of the box, [Saneef H. Ansari](https://saneef.com)'s article, "[Hiding posts with future dates in Eleventy](https://saneef.com/tutorials/hiding-posts-with-future-dates-in-eleventy/)," describes an elegant way to add it. I even used it to "hide" this post until I was ready for you to see it.[^repo] **But**&nbsp;.&nbsp;.&nbsp;. just be sure that, if your site's config file includes the [Eleventy documentation's `html-minifier` example code](https://www.11ty.dev/docs/config/#transforms-example-minify-html-output) (as is the case for this site), you adjust it [as suggested by David Soards](https://github.com/11ty/eleventy/issues/653#issuecomment-716272434) or your builds will break with an error that includes the lyrical phrase, `outputPath.endsWith is not a function (TypeError)`. Fun stuff.

**Acknowledgement**: Thanks to [Raymond Camden](https://twitter.com/raymondcamden/status/1406277604504748035) for the link to Mr. Ansari's article!
{.yellowBox}

[^WorkingCopy]: This is essentially the workflow I described a couple of years ago in "[Roger, Copy](/posts/2019/07/roger-copy)," involving the use of the superb [Working Copy](https://workingcopyapp.com/) source-control app for iOS.

[^repo]: Of course, that *won't* obscure the presence of a "future" post on a site repo that's public, as is this site's repo: if people are so inclined, they can find it. In other words, don't act as if a "future" post pushed to a public repo is truly hidden. It's not. If you must push a "future" post to the repo but keep the post out of view until it's not "future" any more, you'll have to make the repo private.

## A year, off and on, with Vercel

It's now been almost a year since [this site began its "lurch" among various hosting vendors](/posts/2020/07/goodbye-hello/) after having been on [Netlify](https://netlify.com) from the beginning back in September, 2018. In no particular order, I've used [Render](https://render.com), [Firebase](https://firebase.google.com), [Cloudflare Workers sites](https://workers.cloudflare.com), [Cloudflare Pages](https://pages.cloudflare.com), and even Netlify once again, albeit briefly. However, none of them can quite hold a candle to [Vercel](https://vercel.com), the vendor to which I've most usually entrusted the site since the initial break with Netlify. I wish Vercel's [Edge Network](https://vercel.com/docs/edge-network/overview) had a lot more points of presence around the world and that Vercel hosting was easier to configure for things like HTTP headers[^VercelHTTP] but, those items aside, the unmatched speed and granite-like solidity of Vercel's build process make it the top dog in the group and keep me coming back.

[^VercelHTTP]: Don't get me wrong: [the process actually isn't that hard](https://vercel.com/docs/edge-network/headers). The issue I have in that regard is that it doesn't appear possible to set a Content Security Policy for only the site's web pages and **not** for its static assets as well (*i.e.*, to avoid ["Best Practices" gripes from Lighthouse](https://web.dev/lighthouse-best-practices/)), while such **is** possible with Cloudflare Pages through use of a Cloudflare Worker as I noted in "[Headers up](/posts/2021/05/headers-up/)." And, yes, I have asked --- in the [Vercel "Discussions" section on GitHub](https://github.com/vercel/vercel/discussions/6330) and on [Stack Overflow](https://stackoverflow.com/questions/67887283/vercel-json-how-to-exclude-multiple-directories-in-header-path-to-regexp).

## Dubya dubya dubya

Not since the late 1990s has it been "cool," or so it's seemed, for companies to promote their websites’ URLs with the "www" upfront. They just say, "Visit [whoever].com," and let it go at that. Perhaps influenced by that, I originally linked to this site only as "brycewray.com." However, it turns out there are [sound technical reasons](https://www.yes-www.org/why-use-www/) to use the "www" in there, too (and Vercel agrees for [its own network-specific reasons](https://vercel.com/docs/custom-domains#redirecting-www-domains)), so I've adopted that practice. Indeed, I have whichever hosting vendor I happen to be using at the moment use "www.brycewray.com" as the primary location to which all "brycewray.com" traffic is redirected, rather than *vice versa* as I formerly did. I also now include "www" in each page's [canonical URL](https://developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls) as specified in the `head` section of its HTML.

## Hugo 0.84.0 arrives

The latest version of Hugo, 0.84.0, [emerged on June 18](https://gohugo.io/news/0.84.0-relnotes/), with what the linked article described as "several configuration fixes and improvements that will be especially useful for themes." It also updates the included [goldmark](https://github.com/yuin/goldmark) [Markdown](https://daringfireball.net/projects/markdown) parser version to 1.3.8. What it doesn't do is fix any of the three problems that I noted in the [most recent edition of this "Gems in the rough" series](/posts/2021/05/gems-in-rough-05/):

- [Incompatibility](https://github.com/gohugoio/hugo/issues/8343) with the [JIT mode](https://tailwindcss.com/docs/just-in-time-mode) in [Tailwind CSS](https://tailwindcss.com) 2.1+.
- Using the [deprecated LibSass](https://sass-lang.com/blog/libsass-is-deprecated) rather than [Dart Sass](https://github.com/gohugoio/hugo/issues/8299) for [Sass/SCSS](https://sass-lang.com) support.
- [Punctuation glitches](https://github.com/yuin/goldmark/issues/180) in goldmark.

Mainly due to the first two, I have temporarily ceased updating my [two Hugo starter sets](/posts/2021/03/beginners-luck-update/), one of which would benefit greatly from Tailwind's JIT mode while the other would be better with Dart Sass rather than LibSass. Mind you, I harbor no illusions that the Hugo community will be broken-hearted by this decision. Still, when things change on either of these fronts, I'll act accordingly.

As for the third issue, I have **no** expectation that it will be resolved; I don't think the goldmark dev is interested in fixing it. The only alternative seems to be [reverting to the Blackfriday parser](https://gohugo.io/getting-started/configuration-markup/#blackfriday), which [goldmark replaced in Hugo 0.60.0](https://gohugo.io/news/0.60.0-relnotes/), but I can tell you that it's not a foolproof fix **even if** we could assume Hugo will continue to support Blackfriday indefinitely --- which we can't, because it won't. For one thing, my recent tests show that using Blackfriday with the current version of Hugo can result in occasional weirdness (*e.g.*, a footnote numbered *0* which wasn't even the first footnote in the document). Would using it with, say, a version *prior to* 0.60.0 allow Blackfriday to work properly? Perhaps. But Hugo's added many enhancements since the pre-0.60.0 days. I'm not going to tell the starter sets’ potential users to give up those goodies just for the proper punctuation that goldmark is incapable of providing.

**Update, 2021-08-05**: The [release of Hugo 0.87.0](https://gohugo.io/news/0.87.0-relnotes/) included the [deprecation of Blackfriday](https://github.com/gohugoio/hugo/commit/c7252224c4fecfe8321f31b901e2510d98b657c4).
{.yellowBox}

**Update, 2022-03-02**: The third issue **was resolved** on February 28, 2022, with the release of [Hugo 0.93.0](https://github.com/gohugoio/hugo/releases/tag/v0.93.0). It included the first goldmark version, 1.4.7, with the code from a [pull request](https://github.com/yuin/goldmark/pull/280) that fixed all the cases I'd reported.
{.yellowBox}
