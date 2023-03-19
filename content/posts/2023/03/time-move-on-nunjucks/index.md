---
title: "Time to move on from Nunjucks?"
description: "Here are some points to consider about how you should build and maintain Eleventy sites going forward."
author: Bryce Wray
date: 2023-03-18T21:44:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

When I [first](/posts/2019/09/why-left-hugo-eleventy/) started using the [Eleventy](https://11ty.dev) [static site generator](https://jamstack.org/generators) (SSG) back in 2019, I built my project with the [Nunjucks](https://mozilla.github.io/nunjucks) templating language, mainly because that seemed to appear most frequently in the Eleventy documentation's own examples, as well as others I found on the web.

But the times, they may be a-changin’.

<!--more-->

Eleventy has always led the SSG pack in templating flexibility, with support for [numerous languages](https://11ty.dev/docs/languages/). Then, a few months ago, Eleventy creator [Zach Leatherman](https://zachleat.com) upped the ante with **WebC**. [Its GitHub repo](https://github.com/11ty/webc) describes WebC as a "framework-independent standalone HTML serializer for generating markup for [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)" *[link added]*. As [W. Evan Sheehan](https://darthmall.net/) explained in "[Introduction to WebC](https://11ty.rocks/posts/introduction-webc/)":

> It aggregates component-level CSS and JavaScript, allowing developers to keep their styles and scripts together with the markup as single[-]file components, the way you may be used to if you work with JavaScript frameworks such as [Svelte](https://svelte.dev/) or [Vue](https://vuejs.org/).

It may well be that, in time, WebC will become Eleventy's most familiar templating language, taking the spot long held by Nunjucks. And that's probably just as well, because Nunjucks is a project bearing the signs of neglect.

Earlier this month, during an interview on [Episode #266](https://changelog.com/jsparty/266) of the [*JS Party* podcast](https://changelog.com/jsparty/), Leatherman compared Nunjucks' condition to that of the somewhat similar [Liquid](https://liquidjs.com/) templating engine:

> I think that WebC will be seen as a successor to some of these template syntaxes that aren't maintained very well anymore, as the maintainers sort of move on. . . . Liquid is very well-maintained. Nunjucks, not so much.

Mozilla's [Nunjucks repo](https://github.com/mozilla/nunjucks) had its [latest release (v3.2.3)](https://github.com/mozilla/nunjucks/releases/tag/v3.2.3) on June 2, 2022 (although its [`package.json`](https://github.com/mozilla/nunjucks/blob/master/package.json) was last updated in early 2021), but a look through the [`docs`](https://github.com/mozilla/nunjucks/tree/master/docs) portion of the repo shows many files and directories that are ancient by web dev standards. Some date back to February, 2015.

So what does all this mean for you as an Eleventy user?

If you're **starting** an Eleventy-based website, you should resist the temptation to follow the lead of many long-extant web sources which recommend templating with Nunjucks. Although Eleventy probably will support Nunjucks for some time to come, you'll do yourself a favor by, instead, selecting one of the following alternatives, and likely in this order of importance:

- WebC
- Liquid
- [JavaScript](https://www.11ty.dev/docs/languages/javascript/)

On the other hand, if you have an **existing** Eleventy project that's replete with Nunjucks, that likelihood of continuing Nunjucks support will come in especially handy. Still, for the long run, you might want to consider converting it over to one of the above. Initially, Liquid might be the easiest choice, given the similarities between its syntax and that of Nunjucks. This should give you time to decide whether, eventually, to try more powerful templating options like WebC --- especially as Leatherman continues to add to its feature set --- or JavaScript.

Whatever you decide, be sure to watch the advance of WebC (and not just for Eleventy, since WebC is framework-independent). As Web Components continue to grow in popularity while frameworks come and go, you'll want to build your sites in ways that will survive the a-changin' times.
