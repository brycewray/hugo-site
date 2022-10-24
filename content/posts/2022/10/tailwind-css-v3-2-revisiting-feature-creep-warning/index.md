---
title: "Tailwind CSS v3.2: revisiting my “feature creep” warning"
description: "Only nine months after I suggested Tailwind might someday hit an unpleasant inflection point, that may now be happening."
author: Bryce Wray
date: 2022-10-22T08:43:00-05:00
#draft: true
#initTextEditor: iA Writer
---

**Note**: This post also appears on [dev.to](https://dev.to/brycewray/tailwind-css-v32-revisiting-my-feature-creep-warning-3ohm) and was the subject of a [Hacker News thread](https://news.ycombinator.com/item?id=33298806).
{.box}

Earlier this week, a [blog post](https://tailwindcss.com/blog/tailwindcss-v3-2) introduced [version 3.2](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.2.0) of the popular [Tailwind CSS](https://tailwindcss.com) styling framework.

The "absolutely *massive* amount of new stuff" the post trumpeted includes:

> - Multiple config files in one project using `@config`
> - Browser-support-based styling with `supports-*`
> - ARIA attribute variants
> - Data attribute variants
> - Max-width and dynamic breakpoints
> - Dynamic `group-*` and `peer-*` variants
> - Dynamic variants with `matchVariant`
> - Nested `group` and multiple `peer` support using variant modifiers
> - Container queries

. . . the details of which all sound impressive, to be sure. However, as I read about them, I was reminded of something I wrote near the end of the "[Should you adopt Tailwind 3?](/posts/2022/01/should-you-adopt-tailwind-3)" piece I did back in January for the [Stackbit blog](https://www.stackbit.com/blog/):

> Because of Tailwind's need to stay not simply relevant but also popular, the project is particularly vulnerable to the dangers of *feature creep*.  . . . [R]emember that the idea behind Tailwind, like every other utility-first CSS framework, is to *make styling easier*, especially for front-end developers who dislike getting under CSS's hood. The more capabilities that get added to Tailwind, the more complex Tailwind becomes. It may not yet be near a tipping point, but that's a danger for which the Tailwind team will have to be on the lookout.[^style]

[^style]: This includes a few edits for this site's style, as opposed to how it appeared both in the original form on the Stackbit blog and its contractually required re-publication here.

That was nine months ago. Although I surely wasn't expecting to be proven right this soon, all the new features in this v3.2 release of Tailwind, especially on top of the many other additions to Tailwind over the last two years in particular, add up to a project that now does seem, uh, a bit much.

I'll cut to the chase for all the aforementioned "front-end developers who dislike getting under CSS's hood"[^teams] . . .

[^teams]: And those who manage them, given that Tailwind is especially popular as a way of enforcing styles among corporate development teams --- where CSS expertise can vary widely.

The more features that get added to Tailwind, the more you have to **know** about CSS before you can **use** those features. Right? So why not just bite the bullet and learn to use CSS **without** the additional tooling (and weird, often lengthy additions to your HTML) that Tailwind and other utility-first styling frameworks require?[^Sass]

<strong class="red">Update, 2022-10-24</strong>: The Tailwind fans who responded to this article in the aforementioned [Hacker News thread](https://news.ycombinator.com/item?id=33298806) were especially annoyed by one phrase in that previous paragraph --- because they took it out of context. I **didn't** say Tailwind users don't know how to use CSS, and I **didn't** say that using Tailwind was an alternative to learning CSS. What I **did** say was (and I'll color-code the intended meaning): "So why not just bite the bullet and <span class="red">learn to use CSS **without** the additional tooling (and weird, often lengthy additions to your HTML)</span> that Tailwind and other utility-first styling frameworks require?"\
\
If that's not clear enough for anyone, I apologize that I can't further clarify it. *(And, may I note, the "you're ugly and your mother dresses you funny"-ish tone that a few of the HN responders chose to use didn't do them, or Tailwind's cause, any favors.)*
{.box}

**That said**: if you insist on using Tailwind because you utterly can't bear to deal with vanilla CSS (although [it's not really all that vanilla anymore](https://web.dev/state-of-css-2022/)), Tailwind v3.2 provides quite a bit more to cram into your ditty bag of styling powers. You'll have to decide when it reaches that inflection point where its use consumes more time and brainpower than it saves.

[^Sass]: For this site, I've used Tailwind off-and-on over the years, but kept returning to [Sass/SCSS](https://sass-lang.com) as a [more comfortable, bullet-proof styling method](/posts/2021/04/speaking-up-for-sass/) *vs.* what utility-first frameworks entail. (Then again, I've been working "under CSS's hood" for 20 years, so there's that.)
