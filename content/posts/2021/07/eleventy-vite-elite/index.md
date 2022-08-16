---
title: "Eleventy plus Vite = elite"
description: "Re-bundling, but without the pain of webpack."
author: Bryce Wray
date: 2021-07-24T10:46:00-05:00
lastmod: 2022-07-22T21:46:00-05:00
discussionId: "2021-07-eleventy-vite-elite"
---

{{% disclaimer %}}

In the last few days, I've had the pleasure of seeing just how well two of today's hottest names in web development work together.

I speak, of course, of the [Eleventy](https://11ty.dev) [static site generator](https://jamstack.org/generators) (SSG) and the [Vite](https://vitejs.dev) [front end development](https://en.wikipedia.org/wiki/Front-end_web_development) tool.

In case you haven't yet had your lesson in pronouncing *Vite*, it's the French word for *fast*, and it rhymes with *neat*. And *sweet*. And *elite*. I find the latter rhyme especially appropriate because uniting the excellence of **El**eventy with the brilliant performance of V**ite** produces what can be a truly elite solution for building [static websites](/posts/2020/09/normal-persons-guide-static-websites/).

Indeed, I am so sold on it that the site now runs off my [`eleventy_vite`](https://github.com/brycewray/eleventy_vite) repository, rather than the still-extant [`eleventy_solo`](https://github.com/brycewray/eleventy_solo) repo on which it had lived, off and on, for over a year.

How all this came about is our tale for today, friends and neighbors.

**Update, 2021‑08‑22**: Since the repo change had the unwanted but unavoidable effect of losing the Git history in `eleventy_solo`, I have since cloned `eleventy_solo` and added Vite to the resulting `eleventy_site` repo; I now run the site off that repo, instead. Then, today, I switched **back** to my own bespoke setup, away from the Eleventy/Vite configuration described herein. The latter proved to be problematic during local development, particularly when I needed to test changes on devices on my local network. The mixing of the Eleventy and Vite processes just didn't go well with that. However, I retain my great admiration for Vite, and will hope for a better Eleventy/Vite solution down the line. Perhaps it'll come from [one particular plugin that requires the yet-to-come Eleventy 1.x](https://snugug.com/musings/eleventy-plus-vite/). As always, I'll retain this post and [the similarly-themed one which follows](/posts/2021/07/beginners-luck-4-vite-edition/) for [archival purposes](/posts/2019/10/otoh/).
{.yellowBox}

## Curiosity killed the cache

A few days ago, a reader named Chad Henry contacted me about my 2020 article, "[Using PostCSS for cache-busting in Eleventy](/posts/2020/11/using-postcss-cache-busting-eleventy)." In that post and two [follow-up](/posts/2020/12/cache-busting-eleventy-take-two) [pieces](/posts/2020/12/hashing-out-cache-busting-fix-eleventy), I discussed the need, and explained methods, for a website to keep its visitors’ [browser caches](https://www.bigcommerce.com/ecommerce-answers/what-browser-cache-and-why-it-important/) from storing older versions of the site's CSS whenever that code changes.

In short: if the browser sees a file called *index.css*, it's going to assume it's the same *index.css* it already saw, and cached, on a previous visit. As a result, the browser won't use the site's **current** *index.css* if the file has changed since that visit. The way to do the desired "cache-busting" typically involves changing the CSS file name, usually by appending a [hash](https://www.sentinelone.com/cybersecurity-101/hashing/) of its content, every time there are any changes in the CSS. Ideally, the site automatically generates such name changes at build time *and* injects them within the site's HTML in such a way that everything just works. (That is: you don't want the HTML still to be referring to *index-2eXy57Qa.css* if the CSS file's **newly** generated name is *index-34Dk83Af.css*.)

My eventual solution for all this, as I explained in "[Hashing out a cache-busting fix for Eleventy](/posts/2020/12/hashing-out-cache-busting-fix-eleventy/)," was a JavaScript file, called `csshash.js` (originally `cssdate.js`, but that's another story), which the repo's `package.json` would run at build time to (a.) generate a new name for the site's CSS file whenever its content had changed and (b.) inject the name into the site-wide `head`.

Of course, it's not just CSS files that present such problems. Whenever the content of any normally cached file changes, that file requires cache-busting. So, what Chad wanted to know was: did I have similar methods to offer regarding cache-busting of JavaScript files?

I told him:

> Actually, right now, I don’t have any such examples, **but** I’ve been thinking along those same lines, because I now use a couple of JS files I’ve been manually cache-busting (through changing their names) for a few days — which is a pain, especially since I often don’t remember to do it until **after** I’ve already built the site, requiring me to re-build — so I may very well have an article about cache-busting other files soon. My initial, pre-research inclination would be to use a process similar to what I described in that article. **In theory**, I’d imagine it would be fine (and not in the “this-is-fine” meme[^meme] sense), but I won’t know until I have a chance to try it out.

[^meme]: [https://knowyourmeme.com/memes/this-is-fine](https://knowyourmeme.com/memes/this-is-fine).

Chad replied that, in his search for answers, he'd been looking at [another Eleventy-based repo](https://github.com/yinkakun/eleventy-duo) with built-in cache-busting of CSS and JS files:

> One thing with the example theme is that it seems to use webpack. I find webpack hard to understand at times, so I was looking for a different approach.

Ah, yes, [webpack](https://webpack.js.org) --- that household-name-class *bundler* tool which can be both the most powerful weapon and the largest headache a web dev can encounter.

Incidentally, in case you're unaware of the purpose of a bundler, here's a greatly simplified explanation.[^Zhou] A bundler works at build time for a website or web app to combine certain separate assets, like CSS or JS files, into one *bundle* --- with hashed file name --- per file type, references to which it then injects into the website's HTML. That's trickier than it sounds because the bundler also automatically reconciles any conflicts among variables in the multiple JS files. The bundling process helps the website's performance because it can deliver the same content in fewer downloadable files.

[^Zhou]: I would also refer you, as I've done before, to Victor Zhou's "[Why Webpack? (or, How Not to Serve JavaScript)](https://victorzhou.com/blog/why-you-should-use-webpack/)," which covers the subject well, albeit from an early-2019 and highly webpack-centric perspective.

As a result, instead of having this in your HTML:

```html
<!-- in the HEAD -->
<link type="stylesheet/text" href="/assets/css/file1.css">
<link type="stylesheet/text" href="/assets/css/file2.css">
<link type="stylesheet/text" href="/assets/css/file3.css">

<!-- at the end of the BODY -->
<script src="/assets/js/widgets-handler.js"></script>
<script src="/assets/js/mobile-menu-helper.js"></script>
<script src="/assets/js/image-effects.js"></script>
```

.&nbsp;.&nbsp;. you can have something like this:

```html
<!-- in the HEAD -->
<link type="stylesheet/text" href="/assets/main.9425fffc.css">

<!-- at the end of the BODY -->
<script src="/assets/main.b44a9abe.js"></script>
```

Anyway, I told Chad:

> Yeah, I used webpack for a while ([https://www.brycewray.com/posts/2019/12/packing-up](https://www.brycewray.com/posts/2019/12/packing-up)), but later decided ([https://www.brycewray.com/posts/2020/05/going-solo-eleventy](https://www.brycewray.com/posts/2020/05/going-solo-eleventy)) to leave the bundler route. Hoping I don’t end up needing that again — although I must admit geeky interest in Vite. Trying to restrain myself.

Given the title and opening of this article, you can readily guess that I was unsuccessful in such restraint. (But I'll get to that.)

I worked for a few hours to create a `csshash.js`-like solution for JavaScript cache-busting. The result, the unimaginatively named [`jshash.js`](https://github.com/brycewray/eleventy_solo/blob/main/jshash.js) (and a few extra adjustments here and there on the repo), did indeed get the job done. However, it was neither [elegant](https://softwareengineering.stackexchange.com/questions/97912/how-do-you-define-elegant-code) nor [DRY](https://dzone.com/articles/is-your-code-dry-or-wet), and I now had *two* JS files running at build time just to hash *three* files.[^1]

Hmm. I'd been down this road before.

## Tedious tooling

My initial use of Eleventy began over Labor Day weekend, 2019. This was a few weeks after the [first](/posts/2019/07/why-staying-with-hugo/) of several unsuccessful attempts to "get" the [Gatsby](https://gatsbyjs.com) SSG --- although I did briefly succeed with it [later that year](/posts/2019/10/now-gatsby-geezer/), only to [go back to Eleventy soon thereafter](/posts/2019/12/packing-up/).

The first time with Eleventy, I wanted to convert the site from a [Hugo](https://gohugo.io)-based setup on which I'd used [Sass/SCSS](https://sass-lang.com) for styling. Only thing was: Eleventy, from the beginning, has been intended as something that you configure to function as needed, and that includes one's [asset pipeline](https://mxb.dev/blog/eleventy-asset-pipeline/). I'd gotten spoiled by how Hugo's built-in [Hugo Pipes](https://gohugo.io/hugo-pipes/) functionality had made compiling Sass to CSS so effortless but, at that time, I couldn't find any examples of how to accomplish it in Eleventy. A few searches later, I started using the [Gulp](https://gulpjs.com) [task runner](https://medium.com/tiny-code-lessons/javascript-task-runners-explained-c4762728bda), plus some plugins, to give Eleventy similar Sass-to-CSS compilation capabilities.

Those several times during 2019 that I tried or used Gatsby had shown me how much it gained from being joined at the hip with the webpack bundler tool; so, near the end of 2019, I grafted webpack and Eleventy together and, as described in "[Packing up](/posts/2019/12/packing-up/)," introduced my combo to the site in the `eleventy_bundler` repo (which, although [still available](https://github.com/brycewray/eleventy_bundler) for viewing by the curious, is only a shadow of its former self).

This served until the second quarter of 2020. Then, tired of dealing with the increasing hassles of webpack configuration but unable to find a suitable replacement tool (including the much-touted [Parcel](https://parceljs.org)), I decided to drop webpack in favor of doing everything through scripts in `package.json` --- and, at the time, an image-processing script for build time that, later, [got replaced](/posts/2020/07/transformed/) in favor of using [Cloudinary](https://cloudinary.com).

After all, I figured, I really wasn't deriving enough benefit from webpack's bundling powers to justify keeping it. It was the proverbial case of killing a fly with a machine gun.

So, [in May, 2020](/posts/2020/05/going-solo-eleventy/), `eleventy_bundler` gave way to `eleventy_solo`.

At first, this bundler-less approach apparently simplified things greatly. I had no more need to futz with webpack configurations, there were fewer software dependencies involved, and so on.

However, it was a false kind of simplicity. I flat-out didn't worry about cache-busting back then. Only later in 2020, when I became more aware of its importance, would I begin properly scripting for it.

In the year-plus following the switch away from webpack, my `package.json` scripting became pretty convoluted. It *worked*, mind you, but I found myself often searching for ways to do things "manually" that a bundler tool would do. Moreover, as in the embarrassing SNAFU I described in a later edit to "[Using PostCSS for cache-busting in Eleventy](/posts/2020/11/using-postcss-cache-busting-eleventy/)," some solutions I chose turned out to be not so great.

Fast-forward to earlier this week --- and my still all-too-"manual" approach to cache-busting both CSS and JS (especially the JS) at build time.

I realized that, yes, the time had come to integrate a bundler once again.

## A better bundler

To be sure, I *wasn't* going back to webpack. Its complexity alone was enough to dissuade me; but I also recalled all too well how, out of curiosity one day last fall, I had tried updating the old `eleventy_bundler` repo [from webpack version 4 to version 5](https://webpack.js.org/migrate/5/), only to be scared away by tons of breaking changes --- many of which were insoluble because of numerous remaining incompatibilities between version 5 and certain plugins that I needed.

A year earlier, I might've opted instead for the supposedly easier and smarter Parcel bundler, but it hadn't impressed me in the first place. I never found it to be as "automatic" and "configuration-free" with my repo tests as its adherents always claimed it to be.

No, this time, I was going to give Vite a try.

{{< imgh src="ViteJS-home-page-2021-07-23_2522x1428.png" alt="Vite website home page as of 2021-07-23" >}}

Vite, the brainchild of [Vue.js](https://vuejs.org) creator [Evan You](https://evanyou.me/), is a bundler built atop another bundler, the blazing fast [esbuild](https://esbuild.github.io/). However, Vite, whose first version was based to some extent on the [Rollup](https://rollupjs.org) bundler, can bundle many more types of files out of the box (although, as I'll later note, it currently has problems in that regard). That makes it considerably more practical for web developers, especially since its configuration is far less complicated than that of esbuild. And, thanks to its [Go](https://go.dev)-based esbuild underpinnings, Vite also is an order of magnitude faster than not only webpack but also Parcel and pretty much all other JavaScript-based bundlers.

Over the last few months, I'd read and heard many good things about the ease and speed of Vite, but my previous searches for Eleventy/Vite combos hadn't produced much help. While Vite isn't *that* new, it nonetheless had yet to be a large factor in the Eleventy community.

Fortunately, by this particular day that I was once again researching the subject, I saw two key links:

- Simon East's *Medium* article, "[Clean SASS and JS with Eleventy in 2021 (Using Vite)](https://medium.com/@SimonEast/clean-sass-and-js-with-eleventy-in-2021-using-vite-98747500d8f8)," which relied heavily on&nbsp;.&nbsp;.&nbsp;.
- Fotis Papado&shy;georgo&shy;poulos's repo, [`eleventy-with-vite`](https://github.com/fpapado/eleventy-with-vite), which is self-announced as "a template (or demo) for integrating Vite with Eleventy."

I'd seen `eleventy-with-vite` before and perused some of its code, but until that day had feared it might not work with my existing site and, thus, figured it wasn't worth the try.

This time, after reading Mr. East's article and re-re-reviewing Mr. Papado&shy;georgo&shy;poulos's repo, I decided to give it a shot.

### Baby steps

First, I cloned just the `eleventy-with-vite` repo itself --- *i.e.*, without mixing any of my stuff with it. I called the cloned repo `eleventy_vite` to distinguish it from `eleventy_solo`. I played with it for a while, running it through its paces. So far, so good: both dev and build modes worked as advertised.

Then, I added [Tailwind CSS](https://tailwindcss.com), following Tailwind's [own documentation for using it with Vite](https://tailwindcss.com/docs/guides/vue-3-vite), and was stunned by how cleanly and well everything worked right away. Unlike how I'd gotten Tailwind working in `eleventy-solo`, there was no need for tortured [PostCSS](https://postcss.org) commands in my `package.json`.

Emboldened, I began copying over stuff from `eleventy_solo`.

First came my CSS, and my specific Tailwind configuration with it. No problem. Everything worked well.

Next, I added my Eleventy templating and configuration code. In the `.eleventy.js` config file, I made sure to mix in certain specifics from `eleventy-with-vite` that made the Eleventy/Vite partnership workable while *not* bringing over anything that would cause trouble for Vite. Again, all was fine.

Finally, I brought in my content --- all of it. With other tools that I'd used in the past, such moves would result in cascading crashes which would bring me to a frustrating stop. This time (except for a few self-inflicted issues that Vite's usually helpful error messages helped me fix in just a few minutes), that simply didn't happen.

For the second time during all this, I was stunned, this time by the ease and *non*-destructive results of the process. I'd thought it would take me days, maybe weeks, to come up with an Eleventy/Vite repo that could support the website. In fact, it had taken just a few hours.

I was pleasantly surprised also to see that, in addition to the cache-busting I expected, Vite's [hot module replacement](https://vitejs.dev/guide/features.html#hot-module-replacement) feature enabled me to do on-the-fly editing of any JavaScript files it was "watching." This was true even for the `tailwind.config.js` configuration file! (Of course, it *wasn't* "watching" the `.eleventy.js` file because, essentially, it didn't "know" about it, so editing **that** still required a restart as always.)

Once I had **everything** running successfully in `eleventy_vite` in dev mode, I pushed the repo to GitHub and connected it to [Vercel](https://vercel.com) to see how it worked on the real web (I'd already checked the build process locally, but that's not the same). There was nary a hiccup.

I mulled it over for a couple of hours; then I went back into my Vercel setup and [switched my domain](https://vercel.com/docs/custom-domains) from `eleventy_solo` to `eleventy_vite` --- thus making `eleventy-vite` the new repo for the site. Again, this was only a few hours after I'd **started** the whole process by cloning `eleventy-with-vite`!

Incidentally: although I urge you to read [Mr. East's article](https://medium.com/@SimonEast/clean-sass-and-js-with-eleventy-in-2021-using-vite-98747500d8f8) and look at [Mr. Papado&shy;georgo&shy;poulos's repo](https://github.com/fpapado/eleventy-with-vite) for yourself, I suggest you also spend a little time with [`eleventy-vite`](https://github.com/brycewray/eleventy_vite) to see how the code --- some of which still has a lot of the original commenting from `eleventy-with-vite` --- makes it all work with my code and content.

**Note**: I may have a follow-up post that delves into this more fully with actual code samples, much as I ended my CSS cache-busting posts troika with [such a piece](/posts/2020/12/hashing-out-cache-busting-fix-eleventy/); but this one surely is already long enough as it is, and there's a **lot** of code to cover in such a post.
{.yellowBox}

## Good, but not perfect

All was not blissful, however. I did run into a couple of annoyances, both of which remain unsolved as of this post's original publication.

One came when I implemented my usual [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) on the site. Although everything seemed normal, I saw error messages in the browser Inspector that indicated some code in the repo was violating the CSP's [`script-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) directive. Turns out it's a [known issue](https://github.com/brillout/vite-plugin-ssr/issues/39) with a Vite plugin, also included with `eleventy-with-vite`, that provides special polyfill support for [legacy browsers](https://caniuse.com/?search=modules); but it appears to affect *only* those browsers, and I really don't support them anyway --- the site is on Tailwind CSS 2.x, which [also doesn't support them](https://tailwindcss.com/docs/browser-support) --- so I'm not worrying about it.

The other falls in the "ah, well, I wish it could do it but, for now, it can't" category. In addition to Vite's handling the bundling/cache-busting of my CSS and JS files, I'd hoped to let it do the same with font files and maybe even a local image or two (*e.g.*, [favicon files](https://en.wikipedia.org/wiki/Favicon) or the logo [SVGs](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) which appear in the site-wide header and footer). As I mentioned earlier: right out of the box, Vite bundles [numerous file formats](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts), including most image formats and [WOFF2 font files](https://fileinfo.com/extension/woff2).[^2] However, [apparently due to something wacky in recent versions of Vite 2.x](https://github.com/vitejs/vite/issues/2375), that doesn't work as it should.  While Vite successfully generates hashed/bundled versions of the files, it doesn't list them in the resulting [`manifest.json`](https://vitejs.dev/config/#build-manifest).[^3] That matters because such listings would've enabled Eleventy to "find" the files using their auto-generated names. So, until that's resolved, I'll go on cache-busting those specific types of files "manually," as before. It's no biggie, but rather something I hope will get fixed soon.

## Carrot and stick?

When somebody asks me a technical question that intrigues me, there's no telling just far down the proverbial rabbit hole I'll dig as a result.

Such was the case with the process I described herein. It started with a reader's innocent question about how to cache-bust JS files. First, I simply speculated on a hack-ish way I might do it. From there, I progressed to actually implementing that method. Then, my curiosity too much to resist, I experimented with an Eleventy/Vite setup. Finally, I converted all of this site over to Eleventy/Vite.

Sometimes, lucky rabbits find carrots. So far, the Eleventy/Vite combo is proving to be a tasty morsel. I'll keep you advised as to my progress, including most definitely if this new way of handling the site should turn out unexpectedly to be more stick than carrot.

**Update, 2021‑07‑25**: I now have an Eleventy/Vite starter set online; see "[Beginner's luck #4: the Vite edition](/posts/2021/07/beginners-luck-4-vite-edition/)."
{.yellowBox}

[^1]:	Of the hashed files, two are JS "helper" files which keep both the image "lazy-loading" functionality and the recently added all-Tailwind nav menu from violating the site's [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) --- specifically, its [`script-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) part.

[^2]:	With webpack, you need to set up special "[loaders](https://webpack.js.org/loaders/)" for various file formats, which is still another way Vite cleans webpack's clock for a busy web dev.

[^3]:	To confirm that it was Vite's fault and not related to the Eleventy/Vite combo and/or any of my own sometimes questionable code, I ["scaffolded" a bare-bones Vite repo](https://vitejs.dev/guide/#scaffolding-your-first-vite-project), imported a font file and an image file, and got the same results: hashed/bundled files, but no reference to them in `manifest.json`.
