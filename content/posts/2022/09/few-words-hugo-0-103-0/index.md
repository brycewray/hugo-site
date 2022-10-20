---
title: "A few words about Hugo 0.103.0"
description: "Here’s some info that’s worth knowing — especially if you use CI/CD to deploy your website."
author: Bryce Wray
tags: [web-development, static-site-generators, ssg, hugo, ci-cd, website-hosting, netlify, linux, social-media, twitter]
date: 2022-09-15T14:39:00-05:00
#draft: true
initTextEditor: iA Writer
---

[Today's release of v.0.103.0](https://github.com/gohugoio/hugo/releases/tag/v0.103.0) of the [Hugo](https://gohugo.io) static site generator (SSG) came with a couple of wrinkles that may merit your attention.

## What's in a name?

As a result of [this GitHub issue](https://github.com/gohugoio/hugo/issues/10073), Hugo now uses a different naming scheme for its archives --- **but**, as the release notes explain:

> To avoid breakage when running on Netlify and similar, we create aliases for the most commonly downloaded [Linux archives] on the old format and will continue to do so in the foreseeable future.

So, if you build your Hugo site via [CI/CD](https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html) that downloads and installs a Linux binary of Hugo --- as is true for the [script that builds this site](https://github.com/brycewray/hugo_site/blob/main/.github/workflows/CFP-deploy.yaml) when it's Hugo-based --- you might want to consider changing your scripts to reflect this new reality. Yes, those "foreseeable future" aliases will make sure existing build scripts don't break, **but** it also never hurts to stay current.

One more thing about this: the name changes also apply to **non**-Linux binaries you might normally [install](https://gohugo.io/getting-started/installing/#quick-install) locally, so this could affect your *local* development process regardless of whether you use CI/CD for site deployment.

## 404s and dev mode

Another change introduced in Hugo 0.103.0 is what the release notes called ["proper 404 support" during the use of the Hugo dev server](https://gohugo.io/getting-started/configuration/#404-server-error-page).

Previously, attempts to go to a non-existent page within a Hugo repo [would result in a "404 page not found" error](https://github.com/gohugoio/hugo/issues/874), rather than displaying the site's expected 404 error *page*. Thus, if you wanted to see your 404 page, such as while editing its content or appearance, you had to go to its actual URL. This was as compared to just entering a bogus local link, which is the "see-your-404" SOP for nearly all other popular SSGs. Now, with 0.103.0 and up, Hugo catches up with the competitors on this score after what, as the Hugo Twitter account [said](https://twitter.com/GoHugoIO/status/1570456388182364160), had been "some years."
