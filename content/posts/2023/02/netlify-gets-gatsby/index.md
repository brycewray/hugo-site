---
title: "Netlify gets Gatsby"
description: "The company behind a once-popular SSG becomes part of a competitor’s arsenal."
author: Bryce Wray
date: 2023-02-01T12:56:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

When Tom Brady [announced earlier today](https://www.espn.com/nfl/story/_/id/35568868/tom-brady-says-retiring-football-good) that he once again was retiring from the National Football League, I thought I'd experienced my day's quota of "Well-that-was-unexpected" moments.

Then, hours later, I was surprised anew: this time, it was because [Netlify](https://www.netlify.com) [was acquiring](https://www.netlify.com/press/netlify-acquires-gatsby-inc-to-accelerate-adoption-of-composable-web-architectures/) [Gatsby, Inc.](https://gatsbyjs.com), the company behind the Gatsby [static site generator](https://github.com/myles/awesome-static-generators) (SSG).

<!--more-->

Long-time readers here will remember Gatsby once briefly [ran this site](/posts/2019/10/now-gatsby-geezer/), albeit only after I'd [struggled with it multiple times](/posts/2019/12/sorta-strange-ssg-trip/). Gatsby, based on the [React](https://reactjs.org) library and designed for heavy use of [GraphQL](https://graphql.org), was hot stuff back then, but always suffered from slow site builds. As faster competitors have either emerged or improved since then, Gatsby hasn't aged well by comparison, and the market has spoken:

- ["Web frameworks and technologies" section](https://survey.stackoverflow.co/2022/#section-most-loved-dreaded-and-wanted-web-frameworks-and-technologies) of Stack Overflow's [2022 Developer Survey](https://survey.stackoverflow.co/2022/).
- ["Web frameworks" section](https://jamstack.org/survey/2022/#web-frameworks) of the [Jamstack Community Survey 2022](https://jamstack.org/survey/2022/).

Also: [Richard MacManus](https://thenewstack.io/author/richard/)'s [article](https://thenewstack.io/netlify-acquires-gatsby-its-struggling-jamstack-competitor/) about the acquisition characterized Gatsby as "struggling," although this likely was a reference more to the company (and its [Gatsby Cloud](https://www.gatsbyjs.com/products/cloud/hosting) hosting product, a direct competitor to Netlify and other such Jamstack hosts) than to the SSG itself. Anyway, it's an interesting take and I urge you to give it a look.

It's been clear for some time that Gatsby as a platform had been surpassed by [Next.js](https://nextjs.org), [Astro](https://astro.build), and [SvelteKit](https://kit.svelte.dev/) among others; but, still, I'll be curious to see which Gatsby code and other offerings will now make their way into those of Netlify.

----

## Update, 2023-08-23

It now appears that Netlify essentially is killing Gatsby in (sorta) slow motion, based on this Mastodon post/toot from [now-former Netlify employee](/posts/2023/07/good-news-cloudcannon-eleventy/) Zach Leatherman:

{{< stoot instance="fediverse.zachleat.com" id="110927844356705881" >}}

<!--
https://fediverse.zachleat.com/@zachleat/110927844356705881

Looks like the cat is out of the bag now, but still no official word from the company: https://twitter.com/FredKSchott/status/1693007599803752638

The top contributor to Gatsby: https://twitter.com/lekoarts_de/status/1685942410776342528

Another Gatsby employee: https://twitter.com/wardpeet/status/1693014604694061194

Saw also a public Slack post from the founder saying Gatsby was in “maintenance mode.”

[Twitter/X “box” with Fred K. Schott's image, from first link above]:

fks on X

There have been zero commits to the Gatsby repo in the last 24 days.

[Date of Zach's toot:]

1:29 PM • August 21, 2023 (UTC)

-->

The [full thread](https://fediverse.zachleat.com/@zachleat/110927844356705881) makes for interesting, if sad, reading.
