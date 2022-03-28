---
layout: singlepost
title: "Cache-busting in Eleventy, take two"
#subtitle: "This time, a solution that really (?) works"
description: "Sometimes, semi-bespoke is best."
author: Bryce Wray
date: 2020-12-11T16:55:00-06:00
lastmod: 2021-05-29T12:21:00-05:00
draft: false
discussionId: "2020-12-cache-busting-eleventy-take-two"
featured_image: "broken-glass-549087_4000x3000.jpg"
featured_image_width: 4000
featured_image_height: 3000
featured_image_alt: "Broken window pane with sunlight shining through hole in glass"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/humusak-137455/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=549087">jan mesaros</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=549087">Pixabay</a></span>
---

*Before reading this article, please review "[Using PostCSS for cache-busting in Eleventy](/posts/2020/11/using-postcss-cache-busting-eleventy/)" (despite how flawed its proposed solution turned out to be) for details on the importance of cache-busting your CSS and why Eleventy---at least, as of this writing---needs some external help with performing that function. In any event, I think you'll get a lot more out of **this** article if you've first read **that** one; and, so that I can omit some explainers and thus keep this already long article from being even longer, I will assume you've already done so.*

----

Okay, let's try this again, shall we?

First, I reiterate my sincere apologies for the glitches involved in my first run at explaining how to perform cache-busting in the [Eleventy](https://11ty.dev) static site generator (SSG) through use of a [PostCSS](https://postcss.org) plugin, [PostCSS Hash](https://npmjs.com/package/postcss-hash). Believe me when I tell you that I truly thought I'd found The Answer to a problem that can be vexing for us Eleventy fanboys and fangirls. Reality, as it so often does, decided to go a different way than I'd hoped.

Second, please understand that the plugin I mentioned in that article does, in fact, work as advertised. It's just that it doesn't *always* work as advertised, depending on one's CSS setup. The issue into which I careened turns out to be an old one, supposedly killed off in 2018, but I somehow found a way to drag its corpse out of the crypt. More on that shortly.

## The glitch that stole cache-mas

Before I get into how I discovered what was wrong with the info I'd previously presented, let me explain how I handle CSS for [this site's repository](https://github.com/brycewray/eleventy_solo) as well as the [repo](https://github.com/brycewray/eleventy_solo_starter) for the [starter site](https://eleventy-solo-starter.netlify.app)[^bLuck] that's based on this site, because that's important for understanding how the plugin in question *could* have been fine under other circumstances.

[^bLuck]: See "[Beginner's luck](/posts/2020/07/beginners-luck/)" for my original announcement of that starter site.

While you certainly *can* do everything for your site with just one original CSS file, I tend to break my CSS into multiple files (for example, `prismjs.css` is dedicated to formatting code blocks) and then use PostCSS to *import* and *combine* them into one final file for the site to use. It not only makes it easier to organize styles; it also is the approach [recommended](https://tailwindcss.com/docs/using-with-preprocessors#build-time-imports) in [Tailwind CSS](https://tailwindcss.com)'s documentation. Thus, my repo's `/src/assets/css/index.css` file currently[^fontsCSS] looks like this:

[^fontsCSS]: The only exception is that, during those times when the site is using the [system fonts stack](/posts/2018/10/web-typography-part-2/) rather than any web fonts, the `@import 'fonts.css'` statement isn't there.

```css
/*! purgecss start ignore */
@import 'fonts.css';
@import 'nav.css';
@import 'prismjs.css';
@import 'tailwindcss/base';
@import 'layout.css';
@import 'tailwindcss/components';
/*! purgecss end ignore */
@import 'tailwindcss/utilities';
```

So what's the problem? Well, that's where I ran into that SNAFU I mentioned with PostCSS Hash. It was initially reported in July, 2018, as that plugin's [Issue #2](https://github.com/dacodekid/postcss-hash/issues/2).

In short: if you're using just *one* CSS file, the plugin works as it should, which means changing the final CSS file's *name* every time you change the file itself; **but** if you're *importing* files as I've described above, changing *them* **doesn't** cause changes in the final file's name---thus defeating the whole purpose of using PostCSS Hash for cache-busting.

The code in a [follow-up, merged pull request](https://github.com/dacodekid/postcss-hash/pull/3) was supposed to have fixed this, but that wasn't my experience. (In fairness to the plugin and its creator, perhaps this fix to PostCSS Hash worked with older versions of PostCSS; I obviously can't say one way or the other.)

I initially thought it might have something to do with the order in which I was positioning the plugin within the `postcss.config.js` configuration file. I'd started out with its being the *first* plugin of the several in the config, so I then tried putting it *last*. I quickly found out the hard way that, although this worked just fine in local testing, it blew up big time in real builds out on the web: the process created a CSS file with a different name than what Eleventy was expecting when it built the rest of the site, so it was [404](https://en.wikipedia.org/wiki/HTTP_404) city and, as a result, the site's appearance was in total disarray. As you can well imagine, I backtracked on that approach in a matter of minutes. I also tried other sequences for the plugins, but in vain.[^CFWfree]

[^CFWfree]: There actually was one, and only one, sort-of-good thing that came from the anxious minutes when I was trying to fix the screwed-up online build. Because of the numerous fix attempts I uploaded over a short period of time, [Cloudflare](https://cloudflare.com) alerted me that the site, then a [Cloudflare Workers](https://workers.cloudflare.com) site, was nearing the limit on daily write operations for the recently announced free tier. That told me something I'd been trying to determine in various tests: what, if anything, I was losing if I used the free tier rather than the (usually) $5/month plan. I'd found the actual site performance to be pretty much the same between the two plans; but now I saw that, on days like this one when I needed to do a *lot* of site builds, the free tier came up short.

*Well, son, so much for that previous post you wrote about this*, I told myself. I put a *mea culpa*-ish note at the top of it, advising briefly of the problems I'd found and suggesting use of an [interim solution](https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/) to which I also resorted until I could find---or figure out---a better way.[^urlHash]

[^urlHash]: In case you're wondering why I didn't simply rewrite *that* post rather than keeping it mostly intact while adding *this* one, it's because its title already included "PostCSS Hash." As a result, its *URL* included "postcss-hash"---and [changing URLs is an extremely bad idea](https://www.w3.org/Provider/Style/URI). Could I have simply kept the URL while changing the title? Yes; I create the URLs manually. However, I always keep each post's title and URL very similar; and, besides, I'd consider it misleading or, at best, strange if the URL contained "postcss-hash" and the title didn't.

## Back to the caching board

Over the next few days, I repeated my earlier process of researching the specific problem of cache-busting on Eleventy. The first time around, I'd found one article particularly helpful due to the depth of detail it gave the subject: Roy Revelt's "[Our Cache Busting Setup on Eleventy](https://codsen.com/articles/our-cache-busting-setup-on-eleventy/)." So, although I went back through all the other articles I'd read on the initial loop, I kept returning to Revelt's article when I ran into dead ends elsewhere. Here are the key points I learned from it either the first time through or during this second iteration:

- The aforementioned interim solution---which involves appending a query string to the `index.css` file name, resulting in a name like `index.css?v=1604094309`---isn't advisable because "URL parameters can get discarded anywhere in the file journey."
- The ideal result (although even this article counseled for something easier) is that the final CSS file name is built from hashing of the *contents*.

The latter is as opposed to a *timestamp*-based approach, in which the file name's extra segment comes from a [Unix timestamp](https://www.epochconverter.com) corresponding to the file's last-modified date and time. At first, when I was just playing around with things locally, I thought a timestamp actually *would* be the answer. Indeed, I figured that all I had to do was write some build-time code that would add up all the imported CSS files’ Unix timestamps and somehow affix that to the `index` part of the final CSS name. If none of the files changed, the combined timestamps wouldn't change; so, I wondered, why wouldn't that get the job done?

Well, after I had just such code running, it took only a couple of online tests for me to see why.

It's because, every time you do an *online* build on your host of choice, that process re-creates *all* the CSS files and, thus, changes *all* their timestamps. Now, perhaps you're saying, "But won't that still be fine? After all, you just want to get the visitor's browser to 'think' that the CSS file is new." Well, that's just it: the timestamps change even if the final CSS file *isn't* new. Remember that the whole idea is to let the browser cache the CSS file for quickest possible use *until* you really make a change. Making the browser download the CSS file every time you do a build, even if you haven't changed the CSS at all, is nonsensical.

## Different path, similar answer

That realization led me back toward the solution which I'd hoped PostCSS Hash would provide. It was clear that the previously understood *final* result still was the desirable one; I just had to get there some way other than with PostCSS Hash.

So convinced, I went back to "Our Cache Busting Setup on Eleventy" for some more conceptual stuff and to study the tactics that Revelt used. After a few misses, here's the admittedly derivative solution I devised, with all of the following occurring at build time:

1. Concatenate all the CSS files I'm importing.
2. Create an [MD5](https://en.wikipedia.org/wiki/MD5) hash of the concatenated content. This hash will be appended to the name of the site's final CSS file at build time.
3. Write two files out to the project: (a.) a JSON file in the `_data` directory which, like the `manifest.json` file in PostCSS Hash (as explained in that [previous article](/posts/2020/11/using-postcss-cache-busting-eleventy)) will "tell" the [Eleventy data cascade](https://www.11ty.dev/docs/data-cascade/) the name of the final CSS file; and (b.) a text file in the root directory which feeds the CSS file name to the PostCSS file-output command in the `package.json` scripts.
4. Use that PostCSS command to write the appropriately named CSS file to the `_site` folder which the host uses to build the site.
5. Use the site's `head.js` partial template to tell each page on the site to refer to the CSS file by that special file name.

As I've mentioned before, I have a private test repo that I use for evaluating various website hosts’ performance.[^hostsTest] To make sure I didn't go live on *this* repo with the fix before I knew that it really worked---*i.e.*, to make sure I didn't screw the pooch here *again*---I briefly repurposed it for running this setup.

[^hostsTest]: As of the initial publication of this post, those hosting platforms are, in alphabetical order: [Cloudflare Workers Sites](https://workers.cloudflare.com/sites); [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/); [Firebase Hosting](https://firebase.google.com/products/hosting); [Netlify](https://netlify.com); [Render](https://render.com); and [Vercel](https://vercel.com).

To my delight, it worked! And, by "it worked," I mean that the hash at the end of the final CSS file's name:

- Was the same as on my local setup.
- Changed whenever I'd changed any of the `@import`ed CSS files.
- Changed *only* when I'd changed any of the `@import`ed CSS files.
- Was successfully called within the final `head` for each page's HTML.
- Was the same after each host completed its build process. This was important because---as I'd seen during my use of that interim query string solution---build configurations and processes vary among hosts and so, under certain conditions, can produce results that might not necessarily work for you.

**Caution**: Chastened as I am by my recent whiff, I do **not** pretend that these tests, either locally or on actual hosting environments, can necessarily be accurate for **every** conceivable computing situation. That's why I put the "(?)" in the subtitle. All I can say for sure is that this solution works for me locally and on multiple hosts using various configurations where the previous, PostCSS Hash-based solution failed to be reliable. But, as always, YMMV. Also, **please note** that the process completes itself **only** during actual site **builds**, and **not** in dev mode (or the `testbuild` script I use, either, so be aware of that if you're looking at my code)---which means that, for version control purposes (*i.e.*, changes you can commit in Git), actual site builds are the only times that all the applicable changes will occur.
{.yellowBox}

## To fork or not&nbsp;to&nbsp;fork&nbsp;.&nbsp;.&nbsp;.

Once I had this working to my satisfaction, I implemented it on the [starter set](https://github.com/brycewray/eleventy_solo_starter), too. So, if you're just getting started with Eleventy, please feel free to fork that repo. However, if you already have an Eleventy-based site, by all means make whatever other use you can of this cache-busting solution. In either case, I heartily suggest you read "[Our Cache Busting Setup on Eleventy](https://codsen.com/articles/our-cache-busting-setup-on-eleventy/)" so you have a better understanding of the thinking behind all this.

In the starter set repo, the files of note are:

- `cssdate.js`, which runs at build time and creates the JSON and text files needed.
- `package.json`---and, specifically, these scripts therein:
	- `hasher` (which runs `cssdate.js`)
	- `start`
	- `dev:postcss`
	- `build`
	- `prod:postcss`
	- `testbuild`
	- `testProd:postcss`
- `/src/_includes/partials/head.js`, the partial template which "tells" the site to use the hashed name when referring to the CSS file.

In the three `package.json` scripts whose names end with `postcss`, the key part for each is: \
`postcss src/assets/css/index.css -o _site/css/$(cat csshash)`\
.&nbsp;.&nbsp;. which tells PostCSS to take the project's `index.css` file (with all the `@imports` involved) and output the result with whatever name comes out of the `csshash` file which `cssdate.js` writes to the project's root level.

I hope that this solution, and this description of how I got to it, will at least somewhat make up for my unwittingly leading you down a primrose path in the previous article about this subject.

Happy cache-busting---for real this time, I hope.

**Note, 2020-12-17**: If you use [Netlify](https://netlify.com), be sure you **turn off** its post-processing of your CSS, which I've found can bollix up this method. *(My repos’ code already handles such processing anyway.)* You can do it either through the Netlify GUI (**Build &amp; deploy** &gt; **Post processing** &gt; **Asset optimization**) or through use of an appropriately configured top-level `netlify.toml` file such as what I've now added to the starter set. Whether other hosts’ settings would be similarly disruptive, I can't say; the only ones on which I've tested this method so far are [Cloudflare Workers](https://workers.cloudflare.com), [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/), [Firebase](https://firebase.google.com), Netlify, [Render](https://render.com), and [Vercel](https://vercel.com).
{.yellowBox}
