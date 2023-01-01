---
title: "Blasts from the past"
description: "To save you the trouble, I revisit previous posts in search of useful info."
author: Bryce Wray
date: 2022-10-14T12:29:00-05:00
#draft: true
initTextEditor: iA Writer
---

As I noted a few days ago in "[Tying up some recent loose ends](/posts/2022/10/tying-up-some-recent-loose-ends/)," I labor under no illusions that you good folks out there are going to watch this site like a hawk for updates to previously posted content. In similar fashion, I know that only some of what's gone here before will get viewed *at all*.

Thus, if a newer visitor is to know about the older content, and particularly if such a visitor doesn't luck onto the exact combination of magic words that one's chosen search engine wants to see before providing a link to one of my posts, it behooves me to revisit some of the (I hope) helpful nuggets I've put here before.

<!--more-->

That's the purpose of this post.

As my regulars know, I write *often* about website development in general and static site generators (SSGs) in particular, and that will be obvious as you proceed.

For each item shown, I link to relevant posts, ordered chronologically by their original publication dates. Incidentally, what appears below may in fact have newer and/or additional information **not** included in any post listed with the item.

----

## An SSG for your site

If you need to pick an SSG for maintaining your personal blog, my suggestion remains what it long has been: a "pick-’em" between [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io). How can you choose between them? After all, both produce equally fast websites, all other things being equal, so visitors' perceived performance is also a "pick-’em." From there, I'd break it down this way:

- If you're really into JavaScript (or want to be), go with Eleventy. You'll be much more comfortable there.
- If you want the greatest flexibility in templating, Eleventy is a no-brainer choice.
- If you want maximum speed in *development* mode, go with the staggeringly fast Hugo. Be prepared to get comfortable with its wonky templating, however.
- If you **don't** want to deal with plugins and dependencies, go with Hugo. Eleventy is a combination --- albeit an expertly assembled/maintained combination --- of [Node.js](https://nodejs.org) packages, while Hugo is a single binary with "batteries included."
- If you want to add features of your own choosing, go with Eleventy. This is where the Node.js universe has the advantage **if** you're willing to deal with all those added packages. (Hugo isn't nearly as extensible but, precisely for that reason, also is less brittle.)
- If your site has, or is going to have, a **lot** of content --- I'm talking thousands of pages or more --- go with Hugo. Although Eleventy *can* be used for mammoth sites, Hugo's sheer power makes them less onerous to manage, especially in dev mode.[^milpages]
- If your site is going to have multi-language content, go with Hugo, which has built-in support for that.

[^milpages]: Hugo's chief maintainer, Bjørn Erik Pedersen, has been hinting in recent months at a future update that will allow managing a site with "millions" of pages. While I doubt that anyone reading this needs that kind of power, it never hurts to have plenty of overhead room, so to speak.

What about the oft-mentioned [Astro](https://astro.build)? Although I retain very good feelings about Astro and the outstanding people behind it, I've personally found developing in Astro can still be annoyingly slow on a site with more than thirty or forty [MDX](https://mdxjs.com) files. However, if yours is smaller than that and likely to stay that way for a while, you may find the Node.js-based Astro your cup of tea, doubly so if you're at least somewhat familiar with coding for tools such as [Next.js](https://nextjs.org).

As for [Gatsby](https://gatsbyjs.com), the only other SSG I've ever used to manage this site, you can do so much better. Save yourself the trouble.

*(I advise newcomers to this site that the unintentional irony within the first few titles comes from my infamous 2019 "Dance" among various SSGs.)*

- "[Why I'm staying with Hugo](/posts/2019/07/why-staying-with-hugo/)" <span class="nobrk">(2019-07-14)</span>.
- "[Lessons learned](/posts/2019/07/lessons-learned/)" <span class="nobrk">(2019-07-21)</span>.
- "[Why I left Hugo for Eleventy](/posts/2019/09/why-left-hugo-eleventy/)" <span class="nobrk">(2019-09-08)</span>.
- "[Back with Hugo](/posts/2019/09/back-with-hugo/)" <span class="nobrk">(2019-09-20)</span>.
- "[Now I'm a Gatsby geezer](/posts/2019/10/now-gatsby-geezer/)" <span class="nobrk">(2019-10-27)</span>.
- "[Packing up](/posts/2019/12/packing-up/)" <span class="nobrk">(2019-12-08)</span>.
- "[Sorta StranGe (SSG) trip](/posts/2019/12/sorta-strange-ssg-trip/)" <span class="nobrk">(2019-12-27)</span>.
- "[A normal person's guide to static websites](/posts/2020/09/normal-persons-guide-static-websites/)" <span class="nobrk">(2020-09-12)</span>.
- "[Eleventy and Hugo: comparing and contrasting](/posts/2020/12/eleventy-hugo-comparing-contrasting/)" <span class="nobrk">(2020-12-28)</span>.
- "[Simplify, simplify](/posts/2021/02/simplify-simplify)" <span class="nobrk">(2021-02-06)</span>.
- "[Is Astro ready for your blog?](/posts/2022/04/astro-ready-your-blog/)" <span class="nobrk">(2022-04-24)</span>.
- "[The winds of change](/posts/2022/04/winds-change/)" <span class="nobrk">(2022-04-26)</span>.
- "[Mulling over migration?](/posts/2022/05/mulling-over-migration/)" <span class="nobrk">(2022-05-07)</span>.
- "[Cloudflare dev docs and the switch from Gatsby back to Hugo](/posts/2022/05/cloudflare-dev-docs-hugo-gatsby/)" <span class="nobrk">(2022-05-27)</span>.
- "[Impressions from HugoConf 2022](/posts/2022/07/impressions-hugoconf-2022/)" (2022-07-11).
- "[The 'staying with Hugo' post, three years later](/posts/2022/07/staying-hugo-post-three-years-later/)" <span class="nobrk">(2022-07-14)</span>.
- "[Really getting started with Hugo](/posts/2022/07/really-getting-started-hugo/)" (2022-07-19).
- "[Accepting reality about Astro](/posts/2022/10/accepting-reality-astro/)" <span class="nobrk">(2022-10-05)</span>.

## Jamstack-based website hosting

Getting your SSG-powered site actually on the web is best done through a [Jamstack](https://jamstack.org)-savvy hosting vendor, where you can automatically build your site on each change you push to your online [Git](https://git-scm.com) repository. Each such vendor puts your site on a content delivery network (CDN), ensuring your site's content is "closer" (and thus delivered more quickly) to your visitors, regardless of their locations.

The hosting vendor I've used for over a year now, and which I recommend, is [Cloudflare Pages](https://pages.cloudflare.com), which provides all the advantages of Jamstack-savvy hosting combined with the most extensive CDN in the field, especially given that it's on the free tier. I've also used the free tiers of [Netlify](https://netlify.com), [Vercel](https://vercel.com), [Render](https://render.com), and [Firebase](https://firebase.google.com) --- as well as a [Cloudflare Workers](https://workers.cloudflare.com) site, the predecessor of Cloudflare Pages.

- "[Publish or perish](/posts/2019/04/publish-or-perish/)" <span class="nobrk">(2019-04-11)</span>.
- "[O say can you CI/CD?](/posts/2020/06/o-say-can-you-ci-cd/)" <span class="nobrk">(2020-06-28)</span>.
- "[Goodbye and hello](/posts/2020/07/goodbye-hello/)" <span class="nobrk">(2020-07-02)</span> (plus its four sequels, each of which is linked to its successor).
- "[A normal person's guide to static website hosting](/posts/2020/09/normal-persons-guide-static-website-hosting/)" <span class="nobrk">(2020-09-26)</span>.
- "[Ignition sequence start](/posts/2020/09/ignition-sequence-start/)" <span class="nobrk">(2020-09-27)</span>.
- "[Forward Paas](/posts/2020/10/forward-paas/)" <span class="nobrk">(2020-10-11)</span>.
- "[Beta-testing Cloudflare Pages](/posts/2021/01/beta-testing-cloudflare-pages/)" <span class="nobrk">(2021-01-27)</span>.
- "[My website and Cloudflare, a year later](/posts/2021/10/my-website-cloudflare-year-later/)" <span class="nobrk">(2021-10-22)</span>.
- "[Gems in the rough #12](/posts/2021/12/gems-in-rough-12/)" <span class="nobrk">(2021-12-26)</span>.

## Styling your site

Over much if not most of this site's existence, I've styled it with [Sass](https://sass-lang.com), although I've also used (and admired the development behind) the hugely popular [Tailwind CSS](https://tailwindcss.com). There even was a time when I used only more-or-less basic CSS but with the [PostCSS](https://postcss.org) preprocessor, but I thought better of it later.

I prefer Sass because it comes with everything I need for styling, so I don't have to fuss with additional items and their potential breaking changes --- somewhat similar to that whole "batteries included" thing with Hugo that I mentioned earlier. However, where Hugo is concerned, using the current version of either Sass or Tailwind CSS can be problematic; so I've spent some time explaining how to get around those issues unless/until there are more official solutions.

- "[Getting framed](/posts/2018/11/getting-framed/)" <span class="nobrk">(2018-11-14)</span>.
- "[Grid-locked no more](/posts/2018/11/grid-locked-no-more/)" <span class="nobrk">(2018-11-28)</span>.
- "[Two cheers for Tailwind](/posts/2020/01/two-cheers-tailwind/)" <span class="nobrk">(2020-01-12)</span>.
- "[Going solo with Eleventy](/posts/2020/05/going-solo-eleventy/)" <span class="nobrk">(2020-05-09)</span>.
- "[Tailwind-to-head with Hugo Pipes](/posts/2021/02/tailwind-head-hugo-pipes/)" <span class="nobrk">(2021-02-02)</span>.
- "[JIT is a game-changer for Tailwind CSS](/posts/2021/03/jit-game-changer-tailwind-css/)" <span class="nobrk">(2021-03-19)</span>.
- "[Tailwind-to-head with Eleventy](/posts/2021/03/tailwind-head-eleventy/)" <span class="nobrk">(2021-03-20)</span>.
- "[Speaking up for Sass](/posts/2021/04/speaking-up-for-sass/)" <span class="nobrk">(2021-04-03)</span>.
- "[A zero-JavaScript navigation menu for Tailwind CSS](/posts/2021/09/zero-javascript-navigation-menu-tailwind-css/)" <span class="nobrk">(2021-09-15)</span>.
- "[Making Tailwind JIT work with Hugo](/posts/2021/11/making-tailwind-jit-work-hugo/)" <span class="nobrk">(2021-11-01)</span>.
- "[Should you adopt Tailwind 3?](/posts/2022/01/should-you-adopt-tailwind-3/)" <span class="nobrk">(2022-01-12)</span>.
- "[Making Tailwind JIT work with Hugo, the Version 3 edition](/posts/2022/03/making-tailwind-jit-work-hugo-version-3-edition/)" <span class="nobrk">(2022-03-06)</span>.
- "[Using Dart Sass with Hugo: the GitHub Actions edition](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/)" <span class="nobrk">(2022-05-17)</span>.
- "[Cache-busting in Eleventy: a simpler way with Sass](/posts/2022/09/cache-busting-eleventy-simpler-way-sass/)" <span class="nobrk">(2022-09-19)</span>.

## Web fonts

If you choose to use web fonts, **don't** use any **served by** Google Fonts, so as to avoid the tracking code that accompanies them from there. Instead, *download* their files and serve them from your site.

I also suggest using *variable* versions of web fonts, where possible, because they provide more styling choices but with smaller files and smaller *numbers of* files. That's even truer if you properly *subset* them to eliminate all but the characters you truly need.

And, hey: there's absolutely nothing wrong with using the *system fonts stack* --- relying on the fonts built into your visitors' operating systems and devices --- especially in this era when those fonts, and the devices displaying them, do so much better than in the past.

- "[A stacked deck](/posts/2018/10/web-typography-part-2/)" <span class="nobrk">(2018-10-25)</span>.
- "[Chasing 100: tips for optimizing your website](/posts/2020/07/chasing-100-tips-optimizing-website/)" <span class="nobrk">(2020-07-16)</span>.
- "[Google Fonts and privacy](/posts/2020/08/google-fonts-privacy/)" <span class="nobrk">(2020-08-08)</span>.
- "[Good stuff without Google](/posts/2020/08/good-stuff-without-google/)" <span class="nobrk">(2020-08-09)</span>.
- "[Down with flabby fonts](/posts/2021/08/down-with-flabby-fonts/)" <span class="nobrk">(2021-08-08)</span>.
- "[Adding the Libre Franklin variable web font](/posts/2022/10/adding-variable-version-libre-franklin/)" <span class="nobrk">(2022-10-04)</span>.

## Static embeds

It can enhance your site if you embed things like YouTube videos and tweets, but be careful: using the providers' default methods for such embeds will inflict a ton of sneaky tracking code on your visitors. The better way is to embed the content **fully statically**, providing virtually the same content and appearance but *without* the tracking.

**Note**: Due to changes in the status and/or availability of one or more Twitter APIs, perhaps due to the many corporate changes at Twitter itself following its purchase by Elon Musk, I have deprecated several posts, or sections thereof, concerning the fully static embedding of tweets within one's website. However, all the relevant URLs still work, and each provides a link for viewing its now-deprecated content.
{.box}

- "[Gems in the rough #9](/posts/2021/09/gems-in-rough-09/)" <span class="nobrk">(2021-09-05)</span>.
- "[Static tweets in Eleventy and Hugo](/posts/2022/02/static-tweets-eleventy-hugo/)" <span class="nobrk">(2022-02-07)</span>.
- "[Static tweets in Eleventy and Hugo: Part 2](/posts/2022/02/static-tweets-eleventy-hugo-part-2/)" <span class="nobrk">(2022-02-11)</span>.
- "[Gems in the rough #14](/posts/2022/02/gems-in-rough-14/)" <span class="nobrk">(2022-02-18)</span>.
- "[Static tweets in Astro](/posts/2022/04/static-tweets-astro/)" <span class="nobrk">(2022-04-06)</span>.
- "[Static Mastodon toots in Hugo](/posts/2022/06/static-mastodon-toots-hugo/)" <span class="nobrk">(2022-06-03)</span>.
- "[Static tweets in Hugo: an update](/posts/2022/06/static-tweets-hugo-update/)" <span class="nobrk">(2022-06-07)</span>.
- "[Static tweets in Hugo: a tale of two sources](/posts/2022/08/static-tweets-hugo-tale-two-sources/)" <span class="nobrk">(2022-08-02)</span>.
- "[Static tweets in Astro: the two-sources edition](/posts/2022/08/static-tweets-astro-two-sources-edition/)" <span class="nobrk">(2022-08-26)</span>.
- "[Static embeds in Eleventy](/posts/2022/08/static-embeds-eleventy/)" <span class="nobrk">(2022-08-27)</span>.
- "[Static Mastodon toots in Astro](/posts/2022/08/static-mastodon-toots-astro/)" <span class="nobrk">(2022-08-29)</span>.
- "[Take a load off](/posts/2022/09/take-load-off/)" <span class="nobrk">(2022-09-04)</span>.

## What's wrong with WordPress?

Those website maintainers who are familiar, even comfortable, with the WordPress content management system (CMS) can tend to get annoyed when we SSG users try to pull them over here and away from The Dark Side. Why, they ask, would I ever want to leave WordPress for an SSG?

It all comes down to *performance* and *security*.

1. A WordPress site is *dynamic* --- *i.e.*, every visit generates a page on-the-fly from a database --- and that makes it slower than a static site, which is just a set of pre-built, ready-to-view *static* files.
2. The database also makes a WordPress site less secure than an SSG-built site. Bad actors love nothing better than to crack a database that isn't sufficiently protected ("hardened"), which unfortunately describes many WordPress sites' databases and the platforms on which they exist.
3. To gain additional features, nearly every WordPress site uses plugins, sometimes a lot of them, and every additional plugin (a.) further slows down the dynamic page-building process and (b.) constitutes another potential security vulnerability, especially since many plugins are poorly coded and/or maintained.

**However** . . . if one **still** prefers WordPress just for its CMS capabilities, at least there are ways to make WordPress serve as an SSG[^WPSSG].

[^WPSSG]: For example, see "[Getting Started with WordPress Static Site Generators](https://snipcart.com/blog/wordpress-static-site-generator)."

- "[HardyPress: WP + SSG with a twist](/posts/2018/09/hardy-press-wp-ssg-with-twist/)" <span class="nobrk">(2018-09-15)</span>.
- "[Blox sux](/posts/2019/01/blox-sux/)" <span class="nobrk">(2019-01-19)</span>.
- "[Ec-static](/posts/2019/04/ec-static/)" <span class="nobrk">(2019-04-07).
- "[Chasing 100: tips for optimizing your website](/posts/2020/07/chasing-100-tips-optimizing-website/)" <span class="nobrk">(2020-07-16).
- "[A normal person's guide to static websites](/posts/2020/09/normal-persons-guide-static-websites/)" <span class="nobrk">(2020-09-12)</span>.
- "[Easy-peasy](/posts/2021/01/easy-peasy/)" <span class="nobrk">(2021-01-03)</span>.
