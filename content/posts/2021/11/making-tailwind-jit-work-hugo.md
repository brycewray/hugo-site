---
layout: singlepost
title: "Making Tailwind JIT work with Hugo"
subtitle: "Building on others’ superb workarounds"
description: "What to do until Tailwind CSS’s JIT mode works OoTB with Hugo."
author: Bryce Wray
date: 2021-11-01T12:08:00-05:00
lastmod: 2022-03-23T08:19:00-05:00
discussionId: "2021-11-making-tailwind-jit-work-hugo"
featured_image: "2021-11-21_screenshot_TWCSS-on-Hugo_enlgd_3254x1564.png"
featured_image_width: 3254
featured_image_height: 1564
featured_image_alt: "Screen capture from Hugo showing HTML with Tailwind CSS styles"
#featured_image_caption:
---

{{% disclaimer %}}

Earlier this year, the [announcement](https://blog.tailwindcss.com/just-in-time-the-next-generation-of-tailwind-css) of [Tailwind CSS](https://tailwindcss.com)'s [just-in-time (JIT) mode](https://tailwindcss.com/docs/just-in-time-mode) was followed closely by the subsequent and deflating word that this cool feature wouldn't work with the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG). The Hugo team immediately started trying to fix that issue but, as of this writing, still hasn't been able to deliver a solution.

In the ensuing months, some Tailwind aficionados among Hugo users latched onto a snappy workaround devised by a member of the Hugo user community. While this clever end run proved effective, the description its inventor provided was lacking in some details. As a result, I encountered difficulty in using it with any but the most basic Hugo repos. In other words, adding it to an *existing* repo, especially one with a certain degree of build complexity, was daunting.

This post describes how I finally remedied that.

Within, I'll cover:

- The problem, or why Tailwind JIT normally doesn't work with Hugo
- The workaround for this problem
- The remaining issues involved and how I (think I) solved them

## Tailwind JIT and Hugo: the problem

Within hours after the announcement of Tailwind JIT, reports of trouble came into the [Hugo Discourse forum](https://discourse.gohugo.io/t/tailwind-jit-and-hugo-purge-issues/31802) and the [special Tailwind JIT repo](https://github.com/tailwindlabs/tailwindcss-jit/issues/22). (While users of other apps reported issues, I'll concentrate here on the effects seen in Hugo.)

If one had a Hugo project where Tailwind had been working fine and then set it to enable JIT, Hugo would either hang up during the development process or error out, often with a message that began with `Error: ENOENT: no such file or directory, stat` and complained about the absence of a [`stdin`](https://www.computerhope.com/jargon/s/stdin.htm) file. (More on that specific error shortly.)[^spaceChars]

[^spaceChars]: While many of the reports related to certain projects’ use of directories with spaces in their names, the problems weren't limited to just those. I, for one, had show-stopping issues with JIT-enabled Hugo repos even though I never use spaces in the names of any of my projects’ directories or files.

To his great credit, [Bjørn Erik Pedersen](https://github.com/bep), Hugo's chief developer, immediately realized the significance of making the popular Tailwind framework's hottest new feature fully available from within Hugo, and [began working](https://discourse.gohugo.io/t/tailwind-jit-and-hugo-purge-issues/31802/7) to implement a fix. However, as the months have gone by, that fix has slipped from one Hugo version "milestone" to another---from 0.82 to 0.89 as of this post's initial publication.

Now, let me backtrack briefly to that `stdin`-specific error message I mentioned above, because it relates to the proposed fixes I'm about to discuss. Five months after JIT-related SNAFUs became a thing, GitHub user [ENT8R](https://github.com/ENT8R) [proposed this explanation](https://github.com/mhanberg/jekyll-postcss/issues/22#issuecomment-903290240) within the "Issues" section of the [`jekyll-postcss` plugin's GitHub repo](https://github.com/mhanberg/jekyll-postcss):

> I think the issue is that this plugin passes a string with "stdin" to the PostCSS configuration. While this might be true for this plugin, Tailwind assumes that this parameter is an existing file to check for modifications to run the JIT engine, which leads to this error.
> This error is likely triggered by Tailwind [making use of](https://github.com/tailwindlabs/tailwindcss/blob/4daa86a293fdd0a4e31ec4fd40036e9a1ce64a9e/src/jit/lib/setupContextUtils.js#L321) `fs.statSync(decodeURIComponent(pathname)).mtimeMs` where specifically `fs.statSync(decodeURIComponent("stdin")).mtimeMs` leads to the error messages&nbsp;.&nbsp;.&nbsp;. if there is no file called "stdin" in the current working directory.

In short: the conventional and even [Tailwind-recommended](https://tailwindcss.com/docs/installation#installing-tailwind-css-as-a-post-css-plugin) method of using Tailwind---wielding it chiefly through [PostCSS](https://postcss.org)---wasn't playing nicely *with* PostCSS due to this `stdin`-related problem. Understanding that is important for getting your mind around where we're going below.

## Workaround efforts

Multiple Hugo users have proposed workarounds for the issue while waiting for a resolution from Pedersen and his fellow maintainers. In my casual observation of Hugo Discourse traffic concerning these suggestions, the one that seems to have gained the most traction was described in [Praveen Juge](https://praveenjuge.com/)'s "[Use Tailwind JIT with Hugo](https://praveenjuge.com/blog/use-tailwind-jit-with-hugo/)" post. It was accompanied by his [hugo-tailwind-jit repo](https://github.com/praveenjuge/hugo-tailwind-jit).

In essence, Juge's workaround involved using the [Tailwind command line interface](https://tailwindcss.com/docs/installation#using-tailwind-cli) (CLI), called directly from within a project's `node_modules` structure, to do all the usual Tailwind JIT things **without** invoking the PostCSS CLI, and thus without causing Hugo any problems. If we can assume ENT8R was correct in blaming the glitch on the interaction between PostCSS and Tailwind JIT, Juge's suggestion was a logical fix.

However, there was still more to do.

You see, Juge's post described, and his repo included, a bare-bones Hugo/Tailwind project. The content didn't explain how to make Tailwind JIT work with existing Hugo projects, such as several I had, which included bespoke CSS rules and files *in addition to* those specific to Tailwind CSS. When I tried to convert those projects to use Juge's workaround, I kept running into certain odd glitches.

Here's one such weird thing I encountered, just so you can get the picture. In my [Eleventy](https://11ty.dev)-based/JIT-using repo, I'd used the following `index.css` file[^noKruft] along with the [`postcss-import` plugin](https://github.com/postcss/postcss-import) to combine Tailwind's CSS with my own:

[^noKruft]: I've edited it slightly for easier reading, especially to remove things I'd commented out or which actually weren't of use (*e.g.*, `purgecss`-related statements, which Tailwind JIT rendered pointless).

```css
@import 'reset.css';
@import 'prismjs.css';
@import 'tailwindcss/base';
@import 'global.css';
@import 'utility.css';
@import 'tables.css';
@import 'footnotes.css';
@import 'nav.css';
@import 'lazyload.css';
@import 'lite-yt-embed.css';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

But that approach, or anything remotely like it, just wouldn't fly in the workaround-equipped Hugo repo. Essentially, either (a.) Hugo couldn't get past the Tailwind-related part of the `package.json` scripts or (b.) Tailwind would ignore anything after the `@import 'tailwindcss/base';` statement. Either way, I was hosed.

A few nights ago, I began to give it another try, and decided that this time I would stay with it until I'd wrestled the SOB to the mat. Having done so with only a *little* huffing and puffing, I'll now tell you how I made it work.

## Filling in the gaps

Here are the key points I discovered.

### Assimilation rather than importation

Using the Tailwind CLI in this way apparently requires using `@tailwind` directives (which is optional if you use Tailwind through PostCSS). This precludes a **fully** successful use of `@import` statements in one's CSS, even with `postcss-import` installed. Yes, you're still using PostCSS; you're just not running Tailwind through its `postcss.config.js` file.

As noted above, the Tailwind CLI ignores any `@import`s after you bring in any of the Tailwind CSS rules.[^whyImports] Instead, you have to make sure that any bespoke CSS which follows the Tailwind CSS will be within **[layers](https://tailwindcss.com/docs/functions-and-directives#layer)** for the Tailwind `base`, `utilities`, and `components` CSS files.

[^whyImports]: And, in any event, `postcss-import` itself won't accept `@import`s coming after **non**-`@import`s, so it's essentially a moot subject when `@tailwind` rules are required, as they seem to be with the Tailwind CLI.

When I (finally) figured out this part, I moved the vast majority of my bespoke CSS rules from separate files into one file, `tw.css`, with the [`tailwind` directive](https://tailwindcss.com/docs/functions-and-directives#tailwind) and several `@layer` directives. It begins as follows:

```css
/* tw.css */
@import '/themes/twjit/assets/css/reset.css';
@import '/themes/twjit/assets/css/chroma_native_tweaked.css';
@import '/themes/twjit/assets/css/chroma_fix-all.css';
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* ============================
  START, from original global.css
  ============================= */
  html {
    scroll-padding-top: 80px;
  }
```

.&nbsp;.&nbsp;. and so on down the line. The `@import`ed files **above** the first `@tailwind` statement do, indeed, get into the final CSS file. Again, anything `@import`ed after that **won't**, so that's why `@layer` is the way to go.[^InterVF]

[^InterVF]: For web font users, I should note that the use of the [Inter](https://rsms.me/inter) variable font is more complicated to configure in this setup compared to a Tailwind JIT setup that doesn't involve the workaround. This is because **one** Inter variable font file serves for **both** regular and italic/oblique styles, and it takes some extra CSS to make that work correctly with Firefox and Safari where italics/obliques are concerned (Chromium-based browsers have no problem with it). The placement of that CSS can be problematic in this particular setup. I've made it work, but it's tricky: basically, I put the CSS for the Inter font file **before** the `@import` statements and the Firefox- and Safari-specific CSS **after** all the `@layer` statements. YMMV, as is so often true for CSS.

### Making it work with Hugo Pipes

In pre-JIT times, the project in question used [Hugo Pipes](https://gohugo.io/hugo-pipes/) to process the resulting CSS for [fingerprinting](https://gohugo.io/hugo-pipes/fingerprint/) and [compression](https://gohugo.io/hugo-pipes/minification/) with the following statements in the `head.html` partial:

```html
<!-- CSS from PostCSS -->
{{ $css := resources.Get "css/index.css" }}
{{ $css := $css | resources.PostCSS (dict "outputStyle" "compressed") | fingerprint }}
```

That had worked just fine when the `package.json` scripting looked like this:

```json
"clean": "rm -rf public",
"start": "npm-run-all clean --parallel dev:*",
"dev:hugo": "hugo server",
"build": "NODE_ENV=production npm-run-all clean --parallel prod:*",
"prod:hugo": "hugo --gc --minify"
```

.&nbsp;.&nbsp;. because, back then, PostCSS (**not** the Tailwind CLI) was taking the aforementioned `@import`-laden CSS, converting it as needed, and then letting Hugo Pipes finish the job.

It didn't take too many failures for me to see that using the Tailwind CLI way wasn't going to mesh with such a procedure. The main issue was that the Hugo Pipes stuff in `head.html` would fail because, at that point in the process, there **wasn't** yet an `index.css` file for it to process.

Here's the `package.json` scripting that finally did work.[^rimraf]

[^rimraf]: I substituted the [`rimraf` package](https://github.com/isaacs/rimraf) for `rm -rf` to provide greater cross-platform compatibility.

```json
"clean": "rimraf public && rimraf ./themes/twjit/assets/css/index/css",
"start": "TAILWIND_MODE=watch NODE_ENV=development npm-run-all clean prelim:twcss --parallel dev:*",
"build": "NODE_ENV=production npm-run-all clean prelim:twcss prod:*",
"prelim:twcss": "./node_modules/tailwindcss/lib/cli.js -i ./themes/twjit/assets/css/tw.css -o ./themes/twjit/assets/css/index.css --jit",
"dev:twcssw": "./node_modules/tailwindcss/lib/cli.js -i ./themes/twjit/assets/css/tw.css -o ./themes/twjit/assets/css/index.css --jit -w",
"dev:hugo": "hugo server",
"prod:twcss": "./node_modules/tailwindcss/lib/cli.js -i ./themes/twjit/assets/css/tw.css -o ./themes/twjit/assets/css/index.css --jit --minify",
"prod:hugo": "hugo --gc --minify"
```

As for what's happening therein:

1. I initially tried what had worked in the PostCSS-based scripting. That was the use of the same `index.css` file for both input (`-i`) and output (-`o`). However, that produced unsatisfactory results with the Tailwind CLI. Consequently, I set this up with `tw.css` as the input file and `index.css` as a **separate** output file. I then added the `index.css` file to the project's [.gitignore file](https://git-scm.com/docs/gitignore) since there was no point in tracking this continually changing, dynamically generated file.
2. In both development and production, the  `prelim:twcss` script runs the Tailwind JIT process **first**, to create an **initial** version of `index.css` **before** Hugo Pipes can start working with it. This avoids the "I can't find `index.css`, so I quit" problem.
3. In development (`start`), `dev:twcss` and `dev:hugo` run simultaneously, with the former "watching" the CSS and the latter "watching"  pretty much everything else.
4. In production (`build`), `prod:twcss` and `prod:hugo` act like their `dev` counterparts **except**, of course, that there's no "watching" happening.

With Hugo Pipes thus always given an `index.css` file to process, we can easily handle that part in `head.html`:

```html
{{ $css := resources.Get "css/index.css" | resources.PostCSS | fingerprint "md5" }}
<link rel="preload" as="style" href="{{ $css.RelPermalink }}">
<link rel="stylesheet" href="{{ $css.RelPermalink }}" type="text/css">
```

There's no minifying done here, this time, because we already did that for the CSS with the Tailwind CLI's `--minify` flag.

## A wrap-up on the workaround

I've noted in recent months that I was disappointed with three particular dearths on Hugo's part. The first two dealt with styling: (1.) updated [Sass](https://sass-lang.com) support; and (2.) Tailwind JIT support. This workaround eliminates (2.) and, truth be known, kinda makes me not care so much, now, about (1.).[^GMark] Until there's a truly official resolution to the conflict between Hugo and Tailwind JIT, I've found the setup described herein to be perfectly acceptable.

[^GMark]: The third area where I find Hugo currently lacking isn't the fault of the Hugo maintainers but, rather, goes back to an [ongoing shortcoming](https://github.com/yuin/goldmark/issues/180) of the [goldmark](https://github.com/yuin/goldmark) parser for [Markdown](https://daringfireball.net/projects/markdown). On a separate subject: the [Astro](https://astro.build) folks are now eying goldmark for **their** purposes, but I've made them aware of this issue and, indeed, [one of their devs is going to try fixing it](https://github.com/yuin/goldmark/issues/180#issuecomment-924338672) since the goldmark maintainer has [explained that he needs help with a solution](https://github.com/yuin/goldmark/issues/180#issuecomment-769640321). **Update, 2022-03-02**: This issue **was resolved** on February 28, 2022, with the release of [Hugo 0.93.0](https://github.com/gohugoio/hugo/releases/tag/v0.93.0). It included the first goldmark version, 1.4.7, with the code from a [pull request](https://github.com/yuin/goldmark/pull/280) that fixed all the cases I'd reported.

As always, I hope this info helps. While I don't claim in any way to be an authority on this admittedly nerdy stuff, I will be glad to [take any questions](/contact) you may have about it.
