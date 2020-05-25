---
layout: layouts/posts/singlepost.11ty.js
tags: post
title: "Going solo with Eleventy"
subtitle: "Losing webpack, regaining Tailwind CSS"
description: "As the saying goes, less is more."
author: Bryce Wray
date: 2020-05-09T09:45:00-05:00
lastmod: 2020-05-10T12:15:00-05:00
discussionId: "2020-05-going-solo-eleventy"
---

You know how it is. You go in a certain direction for a while, perhaps through adversity, only to reach a point and ask yourself, "And exactly *why* I am doing this, again?"

(Well, if you *don't* know how that is: trust me, kids, you'll reach that point if you live long enough.)

Back in [December](/posts/2019/12/packing-up), I began running this site on a combination of [Eleventy](https://11ty.dev) and the [webpack](https://webpack.js.org) [software bundler](https://www.freecodecamp.org/news/lets-learn-how-module-bundlers-work-and-then-write-one-ourselves-b2e3fe6c88ae/). This came after I'd spent a few weeks with the webpack-powered [Gatsby](https://gatsbyjs.org) and reached the conclusion that I could get eighty to ninety percent of the same performance and flexibility out of an Eleventy/webpack combo while enjoying it---especially Eleventy---*’way* more than the sometimes maddening Gatsby.

But, then, some funny things happened on my way to [SSG](https://staticgen.com) bliss.

## A pruning process

In the ensuing months, I removed two of the biggest reasons for having added webpack in the first place:

- I dropped [SASS/SCSS](https://sass-lang.com) for [PostCSS](https://postcss.org) while [experimenting briefly](/posts/2020/01/two-cheers-tailwind) with [Tailwind CSS](https://tailwindcss.com). While I didn't warm up (then) to Tailwind, I liked PostCSS a lot and decided to stick with it. And while you certainly *could* use webpack to incorporate PostCSS with Eleventy, it wasn't *necessary* to do so.

- [Hero images](https://en.wikipedia.org/wiki/Hero_image), once a mainstay of this site, were the [next to go](/posts/2020/02/so-much-for-heroes) after it became clear the hassles of trying to provide the proper sizes and, in particular, file formats weren't worth the effort when compared to those images' actual utility. Only those few images necessary to tell certain posts' stories remained, and their spartan quantities and nature constituted wastes of all the webpack code that processed them---relatively slowly---on each build.[^Time]

[^Time]: This wasn't just a matter of keeping me from twiddling my thumbs every time I made changes to the site. Limiting build times is important---especially since the Netlify free tier has a limit of 300 minutes a month; and, recently, I've been using [Zapier zaps](https://zapier.com/help/create/basics/create-zaps) to auto-build the site each midnight, Central time, to keep its [webmentions](https://alistapart.com/article/webmentions-enabling-better-communication-on-the-internet/) more frequently updated. The Eleventy/webpack combo typically took roughly two minutes per build, meaning over sixty minutes a month *even if I didn't change anything else on the site*---and, to be sure, I am *always* changing things, even things you may never notice.

Then, in what I hoped would be a learning experience for not only me but also others out there in [GitHub](https://github.com) land, I [produced near-duplicate repositories](/posts/2020/04/different-modes-different-code) of this site in its two previous SSGs, [Hugo](https://gohugo.io) and Gatsby. The experience with the Hugo repo was particularly eye-opening, because by necessity it *had* to be webpack-free. Yet, I had been able to re-make this site down to almost the last detail without a whiff of webpack---and all that goes with webpack: namely, a big ol' bundle of JavaScript code on every download.

And I began to wonder just how much I really needed webpack---and whether my site-development process might actually be better *without* it.

## Flying solo?

In a similar vein but **not** because of webpack one way or the other, I was unhappy with the size of the CSS I was delivering with each page; and my background attempts to shrink it through old-fashioned editing and rewriting hadn't gone well. (I'd also tried more automated approaches but had failed with them, too.)

Still, one intriguing thing I'd learned from the Tailwind experiment was the amazing power of [PurgeCSS](https://purgecss.com), when combined with PostCSS, to shrink even the multi-megabyte CSS loads of a Tailwind config down to just a few kilobytes at production. That was three to four times smaller than my "handmade" CSS after each had undergone the same [minification](https://blog.logrocket.com/the-complete-best-practices-for-minifying-css/) process during a build to production.

My more recent rethinking process coincided with a renewal of at least curiosity about Tailwind, which [in February](https://github.com/tailwindcss/tailwindcss/releases/tag/v1.2.0) became compatible with [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) ([this post](/posts/2018/11/grid-locked-no-more) from November, 2018, tells why that mattered to me) and [just a few days ago](https://github.com/tailwindcss/tailwindcss/releases/tag/v1.4.0) also began *including* PurgeCSS right out of the box.

Anyway, I'll get back to the Tailwind front in a bit.

In the background during all this, I'd noticed that Eleventy itself was getting additional and more powerful [plugins](https://11ty.dev/docs/plugins) and, with newer Eleventy versions both since I'd started using it and those to come in the near future, greater capabilities.

All this gradually made it clear to me that, if I made some reasonably sensible config changes, I could build an Eleventy-based repo that probably could do everything the Eleventy/webpack one could, but *without* webpack. It would be an interesting experiment, anyway; and, even if I couldn't make it go the distance, the real site could still exist on the unaltered Eleventy/webpack repo.

With that safe haven in mind, I cloned the existing repo and started the process of **un**packing webpack from it. Just as I'd called the existing repo `eleventy_bundler` to signify that it was joined at the proverbial hip to webpack, I named this new one `eleventy_solo`.

## Image processing: birth of a notion

At first, things went pretty smoothly. I whacked all the webpack config files, added this site's typefaces much as I had done to the Hugo repo (since I no longer was using the [npm](https://nodejs.dev/an-introduction-to-the-npm-package-manager) package [typefaces](https://www.npmjs.com/package/typefaces) with webpack to deliver them), and used more conventional, *non*-bundler ways to provide the JavaScript that was absolutely necessary.

(In the latter case, I even finally got to replace the [instant.page](https://www.npmjs.com/package/instant.page) [preloader](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/) utility with what I consider to be its superior competitor, [Flying Pages](https://www.npmjs.com/package/flying-pages). Speed is good, higher speed is better.)

However, I soon ran into what appeared to be an insurmountable roadblock to my ever being able to make `eleventy_solo` anything but a locally running experiment: I couldn't find a workable way to process the few images the site still has.

With the Eleventy/webpack combo, I'd used the [responsive-loader](https://www.npmjs.com/package/responsive-loader) webpack add-on to create and then process [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images), and the [lazysizes](https://github.com/aFarkas/lazysizes) library to make them "[lazy-load](https://en.wikipedia.org/wiki/Lazy_loading)" on nearly all browsers. My hope had been to replace them in `eleventy_solo` with some Eleventy plugins but, for reasons I still don't understand, I couldn't get those plugins to work successfully in the new repo.

So, while I had everything else working pretty well, I was still delivering only one size of each image, and an unprocessed (generally too large) image file at that. And, if I really did ever want to make `eleventy_solo` *the* repo for this site, I wasn't about to let *that* be the best I could do.

Then I got to thinking about how `responsive-loader` and other webpack loaders of that nature work---chiefly, through collecting image files into arrays, running them through various image-processing JavaScript libraries, and copying the resulting files out to the appropriate output destination (`/_site/images/` in my site's case). I wondered: what if I simply wrote some JavaScript to do the same and set it up to run in each build script? What did I have to lose other than time---and, perhaps, my dignity when others saw my inevitably spaghetti-ish code?

That's how a script called `imgxfm.js` was born. After an embarrassingly high number of false starts, I got it working with the [sharp](https://github.com/lovell/sharp) library to produce multiple sizes, and the desired formats, of image files and plop them into `/_site/images/` as I wanted.

`imgxfm.js` didn't *always* produce *smaller* files, especially where the largest iterations of certain `.png` files were concerned, but in the vast majority of cases it accomplished this well enough for my purposes. Most of the site's larger images are `.jpg` files, which it handled just fine, so I was satisfied with the overall result.

The commit in which `imgxfm.js` first appeared was called "Image processing while waiting for plugin to be ready"; but, once this little file was reliably doing what I wanted on each build, I realized it was no longer a stand-in. The star of the show had failed to arrive at the performance hall on time (albeit through no fault of his own), so I let the scraggly stand-in take his place; and, scraggly though he was, he did just fine and pleased the crowd just the same.

<div class="yellowBox">
	<p><strong><em>Update, 2020-05-10&nbsp;.&nbsp;.&nbsp;.</em></strong><br />
	Late last night, I finally was able to start using a <strong>real</strong> image-processing plugin&mdash;<code>eleventy-plugin-local-respimg</code> by <a href="https://github.com/Snugug">Sam Richard</a>&mdash;and thus replace <code>imgxfm.js</code>. Because this plugin does quite a bit more, and does it so much better, than my script, the build times are now a bit slower than I describe later, <strong>but</strong> it&rsquo;s worth it to have a much better, much more capable image-processing solution! (And I extend a big thanks to <a href="https://github.com/rickthehat">Rick G.</a> for <a href="https://github.com/chromeos/static-site-scaffold-modules/issues/16#issuecomment-626250527">tipping me off</a> as to why I&rsquo;d previously been unable to use Mr. Richard's excellent plugin.)</p>
</div>

## "An API for your design system"

But how did Tailwind get back into the picture?

Well, one lunchtime, I decided out of curiosity to check up on what's been going on in the Tailwind universe. While I read articles about it from time to time, I also like to watch video tutorials to see if there is something I've missed about this popular framework.

This day, my search brought up a video of a presentation that Tailwind creator [Adam Wathan](https://adamwathan.me/going-full-time-on-tailwind-css/) gave at [last year's Laracon US event](https://laravel-news.com/talks-and-photos-laracon-us-2019). The talk was called "[Tailwind CSS Best Practice Patterns](https://www.youtube.com/watch?v=J_7_mnFSLDg)." Perhaps the most interesting point Mr. Wathan made, early on, was&nbsp;.&nbsp;.&nbsp;.

*"Tailwind is an [API](https://en.wikipedia.org/wiki/Application_programming_interface) for your design system."*

I'd never thought of it that way before. Intrigued by the concept, I decided to give Tailwind another try; so, now, `eleventy_solo` would be not only *minus* webpack but also *plus* Tailwind.

As a result, even while I was still battling the aforementioned image-processing issues, I borrowed files from old commits dating back to my previous experiment with Tailwind. Of course, that was back when all my templates were in [Nunjucks](https://mozilla.github.io/nunjucks/), before my [recent changeover to all-.11ty.js templating](/posts/2020/04/full-11ty-js-monty), so it wasn't just a matter of drag-and-drop: I spent quite a few hours just rejiggering conditionals and other elements to work in .11ty.js, regardless of the presence or absence of Tailwind.

But, in the end, I felt this retrenching, like the jettisoning of webpack, made a lot of sense. Just as I'd done with the other repos, I planned on making this one public if/when I deemed it mostly ready for prime time, and I suspected that the majority of folks with curiosity in Eleventy **(a.)** might not *want* to deal with webpack and **(b.)** almost surely *would* have more interest in the increasingly popular Tailwind than in my pedestrian CSS.

## A solo performance

Late in the day on May 7, I finally had things ready *enough*, and "told" [Netlify](https://netlify.com) to do a new build---but, this time, from `eleventy_solo` rather than `eleventy_bundler` as it had been set to do since [five months ago](/posts/2019/12/packing-up). On the first try, a glitch occurred and halted the build. Fortunately, in such a case, Netlify just errors out and leaves your existing site in place. Then, after running my `testbuild` script from `package.json` locally to figure out what was wrong, I got things to go through a little while later.[^PurgeInProd]

[^PurgeInProd]: There was one more false start when, after getting the build to work for the first time, my eager inspection of the resulting CSS showed it was a porky 1.6 MB *even after* the usual minification and GZipping---meaning PurgeCSS hadn't worked. However, I soon realized that it was because I'd forgotten to set the *final* build's environment variable to *PRODUCTION* rather than *DEVELOPMENT* (on which I'd received [great and patient advice from none other than Mr. Wathan himself](https://github.com/tailwindcss/tailwindcss/issues/1675#issuecomment-623159742)). Once that was fixed, the next build went through just fine and the real site's CSS had dropped to just under 7 KB. Bingo.

Thus, here we are. This site now runs on Eleventy only, not Eleventy and webpack. Yet, it still has responsive and processed images as well as all the good stuff that PostCSS makes possible, *but* now also the re-added Tailwind. The magic of PurgeCSS-inside-Tailwind makes the delivered CSS a fraction of my old CSS's bulk. And, speaking of smaller deliveries, the JavaScript is about one-fourteenth of its size when webpack was involved, despite providing even *more* goodies (*e.g.*, Flying Pages as opposed to instant.page).

Oh, yes: build time is now routinely well under a minute, while `eleventy_bundler`’s build times generally hovered around  a minute-forty but sometimes went as high as two-and-a-half minutes. Since this greater speed also extends to my local dev efforts, I am happy to recover those cumulative minutes and hours going forward.

While the [new repo is now public](https://github.com/brycewray/eleventy_solo) for your viewing and spitballing pleasure, its [predecessor](https://github.com/brycewray/eleventy_bundler) also remains in place for anyone who's still interested in getting Eleventy and webpack to make beautiful music together.[^Updates]

[^Updates]: Please understand that, as with the Hugo and Gatsby repos, I'm not *promising* to keep the previous Eleventy/webpack repo up to date with this one where content and features are concerned. I may in fact do so *sometimes* for bleeps and giggles; but I'm not *committing* to it.

And that's fine. I just hope such folks will realize that Eleventy plays a pretty sweet tune all by itself, and its repertoire and orchestra are getting ever bigger and better.