---
title: "Hugo and Tailwind: peace at last (maybe)"
description: "A new enhancement to the most powerful SSG enables it to work smoothly with the most popular CSS framework — at least, until the latter’s next major release."
author: Bryce Wray
date: 2023-06-03T12:25:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

**Note**: This post also appears on [dev.to](https://dev.to/brycewray/hugo-and-tailwind-peace-at-last-maybe-4h25).
{.box}

In the beginning, there were the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG) and the [Tailwind CSS](https://tailwindcss.com) styling framework. Separately, they were great; but, when you tried to put them together, things got complicated. Now, it appears, that's been resolved. \[Pinky-swear.]

<!--more-->

Things first got weird between Hugo and Tailwind early in 2021, when v.2 of the latter [included a just-in-time (JIT) compiler](https://blog.tailwindcss.com/just-in-time-the-next-generation-of-tailwind-css). At first, JIT was opt-in, then opt-out, and, since v.3, has been thoroughly baked into Tailwind. The problem has been that Tailwind/JIT just didn't work all that smoothly with [Hugo Pipes](https://gohugo.io/hugo-pipes), Hugo's built-in assets-handling pipeline, especially during development.

In November, 2021, I [described](/posts/2021/11/making-tailwind-jit-work-hugo/) a community-created, albeit somewhat convoluted, procedure that got Hugo to work with Tailwind v.2. However, only a few weeks later, the Tailwind folks [brought out v.3](https://tailwindcss.com/blog/tailwindcss-v3). Again, the Hugo community adapted and, before long, I was able to [explain](/posts/2022/03/making-tailwind-jit-work-hugo-version-3-edition/) a smoother procedure that worked **if** paired with Tailwind v.3.0.11 or newer (within **v.3**, of course; more on that later). Still, these solutions admittedly were hacks, necessary only because the Hugo team hadn't yet managed to deliver an official fix for the glitch --- albeit not for lack of trying, to be fair.

That changed with the [recent release of Hugo v.0.112.0](https://github.com/gohugoio/hugo/releases/tag/v0.112.0). Its major enhancement was a new `build.cachebusters` option that was targeted at, finally, solving the whole Hugo/Tailwind/JIT problem. Here's a summary of how each product is to be configured as a result, given the example in that link.

- Hugo (in development mode):
	- Constantly updates the `hugo_stats.json` file, which automatically tracks the project's HTML tags, CSS classes, and IDs.
	- Uses the `build.cachebusters` settings, including for files "watched" by Tailwind, to tell Hugo when to update the dev server.
- Tailwind CSS:
	- "Watches" the `hugo_stats.json` file, as well as the other usual locations, to trigger JIT-based changes in the CSS output during Hugo's development mode.

**Update, 2023-06-05**: The example code provided in the Hugo v.0.112.0 release notes seems to assume the use of [Hugo Modules](https://gohugo.io/hugo-modules/). I initially thought that, if not using them, you wouldn't need the `module` settings to make this work. **However**, I've since [learned otherwise](https://discourse.gohugo.io/t/using-the-new-cachebusters-feature-with-a-theme/44700).
{.box}

And I can tell you that it works quite well. I'm currently working on a freelance project that pairs Tailwind v.3.x with suitably `cachebusters`-ed Hugo v.0.112.x (Hugo/Tailwind is the customer's preferred arrangement), and the interaction between the two is just as it should be between Tailwind and any site-building platform.[^hacks]

[^hacks]: I don't know whether the aforementioned Hugo/Tailwind hacks still work but, in any event, you don't need them any longer.

Outstanding news, right? So why did I put "(maybe)" in the title? And why did I use the "Pinky-swear" wink-wink in the intro?

Well, it's because Tailwind **v.4** can't be far off. Consider the cadence of the framework's major version releases:

- [v.1.0.0](https://github.com/tailwindlabs/tailwindcss/releases/tag/v1.0.0) --- <span class="nobrk">2019-05-13</span>.
- [v.2.0.0](https://github.com/tailwindlabs/tailwindcss/releases/tag/v2.0.0) --- <span class="nobrk">2020-11-18</span>, eighteen months after v.1.0.0.
- [v.3.0.0](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.0.0) --- <span class="nobrk">2021-12-09</span>, nearly thirteen months after v.2.0.0.

Thus, as of the initial publication of this post, it's been nearly eighteen months since the release of v.3.0.0. Note also that Tailwind creator Adam Wathan tweeted the following last November:

> Goals for Tailwind CSS v4.0:
>
> 🤏 Simplify mental model, fewer framework-specific concepts\
> 🪄 Less configuration, without less power\
> ✂️ Fewer dependencies\
>⚡️ 10x faster
>
> Aggressively defend against complexity, double down on robustness and stability 🤝
>
> <span class="legal">2:06 AM &bull; November 22, 2022 (UTC)</span>

All of these, along with certain references in replies to various issues reports on the [Tailwind CSS GitHub repository](https://github.com/tailwindlabs/tailwindcss), suggest one should expect a v.4 release sooner rather than later.

The history of major Tailwind releases has been that each new one requires some juggling to make it work properly with Hugo. It's been an "arms race" kind of thing. So, while Hugo v.0.112.x (and up) now gets along well with Tailwind v.3.x, we'll have to wait to see what happens with future releases of Tailwind --- and Hugo, for that matter.
