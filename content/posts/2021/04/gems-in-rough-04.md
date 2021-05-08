---
layout: singlepost
title: "Gems in the rough #4"
subtitle: "More assorted short takes about building websites"
description: "Here a drib, there a drab, everywhere a drib-drab of web dev miscellany."
author: Bryce Wray
date: 2021-04-09T04:40:00-05:00
lastmod: 2021-04-22T12:46:00-05:00
#draft: false
discussionId: "2021-04-gems-in-rough-04"
featured_image: "gems-1400682_3364x2696.jpg"
featured_image_width: 3364
featured_image_height: 2696
featured_image_alt: "Collection of semi-precious stones on a dark background"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/brett_hondow-49958/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1400682">Brett Hondow</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1400682">Pixabay</a></span>
---

Yes, friends, [once again](/posts/2021/03/gems-in-rough-03) we're going to go through a few instances of folderol, borderline fulmination, and perhaps foolishness about developing stuff for Ye Olde Webbe.

**Update, 2021-04-15**: After an initial miscommunication gave me the wrong impression about the thinking higher up, I learned that I won't be doing the [Next.js](https://nextjs.org)-related Day Job work mentioned below, after all. However, I'm leaving this post as-is for archival purposes and [for the sake of transparency](/posts/2019/10/otoh).
{.yellowBox}

---

## Uniform CSS: Sass + utility-first

No sooner did I write [my most recent post](/posts/2021/04/speaking-up-for-sass), which was about the continuing appeal of the [Sass CSS preprocessor](https://sass-lang.com) even in this time when the [utility-first CSS approach](https://blog.usejournal.com/utility-first-css-ridiculously-fast-front-end-development-for-almost-every-design-503130d8fefc) seems to be exploding in popularity, than I discovered to my surprise that there's about to be a marriage of the two&nbsp;.&nbsp;.&nbsp;.

{{< imgc src="screen-cap-Uniform-CSS-2021-04-08_2498x1618.png" alt="Screen capture of the Uniform CSS website as of 2021-04-08" width="2498" height="1618" >}}

[Uniform CSS](https://uniformcss.com) looks very similar to the highly touted [Tailwind CSS](https://tailwindcss.com), but the interesting part is that Uniform CSS is **built entirely in Sass**. It's [promoted as producing smaller final CSS](https://uniformcss.com/docs/managing-file-size/#how-uniform-compares) than most other competing frameworks. Note that the Uniform CSS website, [GitHub repo](https://github.com/ThinkUniform/UniformCSS), and [documentation](https://uniformcss.com/docs/overview/) are all in pre-release form at this writing (*e.g.*,  the [npm package](https://www.npmjs.com/package/uniformcss) isn't up to date with what's in the repo). In the meantime, Uniform CSS has a [Codepen playground](https://codepen.io/UniformCSS/pen/poNNqaE) where you can give it a try.

Speaking of Tailwind, more on that in a bit.

## Next.js needs Vercel

In the Day Job, I've begun work on rebuilding my employer's websites in [Vercel](https://vercel.com)'s [Next.js framework](https://nextjs.org) (yes, I got approval for what I mentioned in "[Next steps?](/posts/2021/03/next-steps)"). A word to the wise: while Next.js is superb and getting better all the time, you should use it with Vercel's website hosting if at all possible. Some of Next's coolest features, notably the image optimization features [introduced last year](https://nextjs.org/blog/next-10), really need Vercel's special back-end tooling to work their best---or, in some cases, at all.[^VercelMktg] (You'll find a disquieting number of related posts on [Stack Overflow](https://stackoverflow.com), among other places.)

[^VercelMktg]: I guess they're not kidding around with that top-of-screen message in the Next.js website: "Deploy on the platform made for Next.js."

Since the environment I'm using for the Day Job work is based in a very-much-**not**-Vercel hosting platform and that choice (not mine) is non-negotiable, that leaves me somewhat higher and drier than I'd hoped to be. For now, I'm running the image processing through [Cloudinary](https://cloudinary.com)'s [free tier](https://cloudinary.com/pricing) and excellent [React component](https://github.com/cloudinary/cloudinary-react/). Whether we can stay within the free tier once we go to production is TBD, but I'll cross that mined bridge when I come to it.

## Major algorithm change due in May from Google

Just a quick reminder for you: sometime next month, Google will make a significant change in its search algorithm, as [first announced last November](https://developers.google.com/search/blog/2020/11/timing-for-page-experience). I suggest you read that linked article to learn not only (a.) how this change will focus Google even more on "rewarding" better-performing sites but also (b.) some ways you can make sure your site is (and/or remains) one of them.

## The utility of&nbsp;.&nbsp;.&nbsp;.&nbsp;utility

Oh, yes, about Tailwind&nbsp;.&nbsp;.&nbsp;.

In "[Speaking up for Sass](/posts/2021/04/speaking-up-for-sass)," I (foot)noted that one of the reasons I'd moved this site off Tailwind CSS and back to Sass was because, in that aforementioned Day Job web dev work, I'd picked Sass for the styling and didn't want to be jumping back and forth between one method at work and another at home. The *reason* I'd selected Sass was because I felt that, when my inevitable successor takes over the code base, it would be better for him/her if we hadn't chosen a Styling Flavor of the Month.

However, in the days since, I've continued to research the choice. I've found that, increasingly, dev team leads are encouraging adoption of utility-first CSS, exactly for the purpose of making it *easier* for successors to take over existing code. These advocates' shared point is that, for someone new to a code base, it's easier to figure out how to make changes if one doesn't have to worry about all the existing interrelationships among the base's various web pages and styling cascades.

While my choice of [Sass combined with CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support) was intended to minimize such problems, I re-considered it in light of this argument and realized that I'd best listen to the experts. So I'm refactoring the Next.js-based work to use Tailwind---especially with the new [JIT functionality](/posts/2021/03/jit-game-changer-tailwind-css) that's [now built into Tailwind core](https://blog.tailwindcss.com/tailwindcss-2-1)---and, thus, have also taken this site back to Tailwind.[^sassAfterAll]

[^sassAfterAll]: Or, at least that was the case as of the original publication of this post. However, after the Day Job's about-face that I mentioned at the top, I no longer had that as a reason to use Tailwind; so I reverted the site's styling to Sass, which I find easier to manage. I know Tailwind fans will find that hard to believe, but that's how it is.