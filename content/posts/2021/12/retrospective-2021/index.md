---
title: "Retrospective: 2021"
description: "Reflections on some of the items discussed here in the outgoing year."
author: Bryce Wray
date: 2021-12-29T15:43:00-06:00
lastmod: 2022-07-22T21:46:00-05:00
#initTextEditor: Ulysses
discussionId: "2021-12-retrospective-2021"
---

Here’s my annual summary of the outgoing year’s posts. Please note that I’m handling this edition quite differently from how I reflected back on my writings of [2019](/posts/2019/12/sorta-strange-ssg-trip/) and [2020](/posts/2020/12/through-with-2020/). Since this year is when I first began linking an [HTML sitemap](/sitemap)[^1] from the bottom of each page, I’ll spare you the post-by-post description given by the previous year-enders and, instead, give you a more general look at some of my over-arching topics for 2021.

<hr />

It probably wouldn’t surprise even a more casual reader of my site that my two favorite [static site generators](https://jamstack.org/generators) (SSGs), [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io), got a *lot* of my mentions during 2021 — as I suspect they will in 2022 — but they were mainly background players for the primary topics, one of which was the ongoing evolution of **site-hosting platforms for static websites**. In January, I [first talked](/posts/2021/01/beta-testing-cloudflare-pages/) about a subject on which I’d touch quite often as the year evolved: [Cloudflare Pages](https://pages.cloudflare.com) (CFP). At that time, this platform was still in beta, and felt like it, but I had little doubt CFP was going to be important. Although it was glitchy through much of the year, as I [griped in October](/posts/2021/10/my-website-cloudflare-year-later/) while comparing it to [Vercel](https://vercel.com), CFP now seems poised to emerge from a lot of that, soon, thanks to some currently-in-beta fixes (noted [earlier this week](/posts/2021/12/gems-in-rough-12/)). By year’s end, CFP had succeeded Vercel as this site’s default venue, roughly a year-and-a-half after [Vercel did the same](/posts/2020/07/goodbye-hello/) to [Netlify](https://netlify.com).

I spent a good deal of time in 2021’s posts talking about **CSS** in general and, in particular, the increasingly popular [Tailwind CSS](https://tailwindcss.com) styling framework, which began the year still in Version 1.x. My first stab at Tailwind in 2021 was a [February explanation](/posts/2021/02/tailwind-head-hugo-pipes/) of how to insert it into a Hugo site’s `head`. I followed that up with a [March piece](/posts/2021/03/tailwind-head-eleventy/) about how to do the same for an Eleventy site. But, by then, the Tailwind team had shocked the web development world by introducing, as chronicled [here](/posts/2021/03/jit-game-changer-tailwind-css/), the Just-in-Time (JIT) engine that was an opt-in feature of Version 2.x and, by year’s end, an opt-out feature of Version 3.x. One thing Tailwind’s JIT did **not** make easier was using Tailwind with Hugo, which I covered to some extent here and there throughout the year. While I attempted to help that with November’s “[Making Tailwind JIT work with Hugo](/posts/2021/11/making-tailwind-jit-work-hugo/)” — obviously based on numerous others’ smart work over previous months — the basic Tailwind JIT/Hugo conundrum remains something that eventually will be best solved by the Hugo team itself.

All that Tailwind stuff aside, good ol’ [Sass](https://sass-lang.com) is still a major player in the webpage-styling biz, as I [wrote back in April](/posts/2021/04/speaking-up-for-sass/). In fact, given the ongoing quirky relationship between Tailwind and Hugo, I’ve reverted to using Sass to style this site whenever it lives in a Hugo project.

Concerning the more wide-ranging topic of **front-end development**, I also spent some time [using the Vite tool in conjunction with Eleventy](/posts/2021/07/eleventy-vite-elite), although I soon reverted to my non-Vite method after encountering a few nits. I think those may soon be resolved by the intriguing [Slinkity](https://slinkity.dev) project about which I [first wrote in October](/posts/2021/10/gems-in-rough-10/#the-slinkity-project). I’d [earlier been interested](/posts/2021/08/gems-in-rough-08/) in the [Astro](https://astro.build) project, which is still attracting a great deal of dev community love; but I [decided later](/posts/2021/09/gems-in-rough-09/#passtro-on-astro-for-now) to wait until it’s more mature before I try anything major with it.

Also on the front-end front (?):
- I [worked in the React-based Next.js framework](/posts/2021/03/next-steps/) when, for a few weeks, I had the mistaken impression I’d be using it to rebuild my then-employer’s WordPress-based websites. While that effort came a cropper, the experience was an interesting one: I learned things that, months later, helped me better understand the workings of the Next-ish Astro.
- The SSG starter projects I’d begun with the [original “Beginner’s luck” in 2020](/posts/2020/07/beginners-luck/) grew in number in 2021, as described in [three](/posts/2021/03/beginners-luck-update/) [follow-up](/posts/2021/06/beginners-luck-3-adding-zola-starter/) [posts](/posts/2021/07/beginners-luck-4-vite-edition/), only to wind up [suspended in September](/posts/2021/09/beginners-luck-5-suspended-starters/) after I tired of the never-ending need to keep them updated and working.

The subject of one’s **personal cybersecurity** occupied me quite a bit in mid-2021, manifesting itself in “[Two paths to password management](/posts/2021/06/two-paths-password-management),” “[1Password hits the fan](/posts/2021/08/1password-hits-fan),” and “[Taming time-based one-time passwords (TOTPs)](/posts/2021/09/taming-time-based-one-time-passwords-totps/).” I hope they convinced any doubters or procrastinators that we all should aggressively manage the passwords on which our online activities depend.

The year also saw a number of entries in two ongoing series of short takes on multiple subjects: “Mixed nuts,” the longer-running of the two, with observations on pretty much whatever may pique my interest at any time; and “Gems in the rough,” whose content is more firmly tech-related. And, of course, there was the annual [“Curmudgeonish thoughts” offering](/posts/2021/11/curmudgeonish-thoughts-2021/) in November.

On the personal front in 2021, many of the year’s events for my family and me were sad ones — death-related — about which I chose (and choose) not to write here. However, happily, we also witnessed the beginning of a new life with the [August birth of **grandchild #2**](/posts/2021/08/boy-oh-grandboy/). Then, the following month, [I **retired**](/posts/2021/09/transition/) after ’way too many years in the workplace.

<hr />

I thank you, as always, for your [comments and observations](/contact/), as well as your valuable time and attention. May your 2022 be outstanding, and I hope you’ll find time during it to stop by here and see what’s up. I will try, also as always, to make such visits worth your while.

[^1]:	That sitemap is derived automatically with code I first described in last May’s “[Help your website get discovered](/posts/2021/05/help-your-website-get-discovered/).”
