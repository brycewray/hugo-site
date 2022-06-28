---
title: "Tailwind-to-head with Eleventy"
description: "This follow-up to an earlier article about Hugo Pipes shows how to get internal CSS in an Eleventy site — and with no build tools required."
author: Bryce Wray
date: 2021-03-20T17:07:00-05:00
lastmod: 2021-07-04T21:56:00-05:00
discussionId: "2021-03-tailwind-head-eleventy"
---

Last month, I posted "[Tailwind-to-head with Hugo Pipes](/posts/2021/02/tailwind-head-hugo-pipes/)," an explanation of how to achieve internal CSS --- styles injected into the HTML `head` rather than existing in a separate .css file --- in a [Hugo](https://gohugo.io)-based site. In particular, this procedure involved CSS from the popular [Tailwind CSS](https://tailwindcss.com) framework, although I also showed how to do it with [SCSS](https://sass-lang.com). Each method was easy because of Hugo's built-in asset pipeline, [Hugo Pipes](https://gohugo.io/hugo-pipes).

By contrast, [Eleventy](https://11ty.dev), the other popular [static site generator](https://jamstack.org/generators) I typically recommend, has no such asset pipeline. As a result, more tech-savvy Eleventy users (and, given Eleventy's popularity among the web dev crowd, they are legion) often try to achieve similar results through use of build tools like [webpack](https://webpack.js.org), [Parcel](https://parceljs.org), and [Gulp](https://gulpjs.com), among others.

The thing is, using those suckers can be a hassle, regardless of one's abilities. Besides, I try to push simpler solutions whenever possible, as  I [did last year when I converted this site from an Eleventy/webpack setup to one that was Eleventy-only](/posts/2020/05/going-solo-eleventy/).

So I got to thinking: what if we just achieved it through an Eleventy project's `package.json` file? What if we used `package.json` scripting to serve as an asset pipeline of sorts for Eleventy?

After all, we've [already seen](/posts/2021/03/gems-in-rough-03/) how to do that with SCSS, using the [`sass` distribution](https://npmjs.com/package/sass) that enables SCSS use in Eleventy. How much more difficult, I wondered, could it be to do the same via the [PostCSS](https://postcss.org) tool required for use of Tailwind?[^featImg]

[^featImg]: I even borrowed the featured image (for social posts, even when the site's current configuration isn't showing featured images) from the earlier "Tailwind-to-head in Hugo Pipes" post since its subject and this post's subject are essentially so similar. You can call it being lazy; I prefer to say I was "leveraging the image's thematic synergy." (Hey, I didn't spend 30 years in tech marketing for nothing, you know.)

Fortunately, the answer turned out to be: "not so difficult" --- at least, that was the case once I stopped doing dumb things. I'll spare you *that* sob story and cut to the chase.

## The `package.json` part

First of all, let's cover the `package.json` scripting (I'll save space by not including the `testbuild` scripts I also use for my own nerdy purposes):

```json
  "scripts": {
    "clean": "rimraf _site src/_includes/css",
    "start": "NODE_ENV=development npm-run-all clean --parallel dev:*",
    "build": "NODE_ENV=production npm-run-all clean postcss-build --parallel prod:*",
    "postcss-build": "postcss src/assets/css/index.css -o src/_includes/css/index.css --config ./postcss.config.js",
    "dev:postcss": "postcss src/assets/css/index.css -o _site/css/index.css --config ./postcss.config.js -w",
    "dev:eleventy": "ELEVENTY_ENV=development npx @11ty/eleventy --watch --quiet --serve",
    "prod:postcss": "postcss src/assets/css/index.css -o src/_includes/css/index.css --config ./postcss.config.js",
    "prod:eleventy": "ELEVENTY_ENV=production npx @11ty/eleventy --output=./_site"
  },
```

**Update, 2021‑03‑24**: I corrected the script `dev:eleventy`, above, so that it includes the `--serve` parameter rather than the `--watch` parameter; as I was [reminded on Twitter](https://twitter.com/marcfilleul/status/1374840637112131589) and is [explained in the Eleventy documentation](https://www.11ty.dev/docs/usage/#re-run-eleventy-when-you-save), `serve` includes the "watching" process, so it's unnecessary to have **both** `--watch` and `serve`. Sorry that I missed this earlier, which probably happened because I previously was using a separate BrowserSync instance and, thus, the code from which I was copying at the time didn't have (or need) the `--serve` parameter for Eleventy.
{.yellowBox}

Now let's see what all those scripts do when you invoke either development mode (`npm run start`) or production mode (`npm run build`). Here's the resulting sequence of actions; they're more alike than not alike, so I'll combine them into one list:

1. Tell the process whether it's in development or production mode.
2. Delete stuff left behind from previous deployments. (The [`rimraf` package](https://github.com/isaacs/rimraf) makes this more friendly across different OSs than the more macOS- and \*n\*x-specific `rm -rf`.)
3. In production mode **only**, run PostCSS to write a CSS file in the [site-wide **includes** directory](https://www.11ty.dev/docs/config/#directory-for-includes). This is where we'll get the CSS that we're going to inject in the `head`.[^whyStep]

[^whyStep]: This step makes sure there *is* a CSS file there, since the previous step killed anything from your earlier work. While you can code around a no-file-there situation, you could end up with ugly, CSS-less pages. Why bother? This solves the problem.

4. From here, we do all of the following simultaneously (using the `--parallel` option in the [`npm-run-all`](https://github.com/mysticatea/npm-run-all) tool):

	a. Run PostCSS to write a CSS file in the place where the given environment expects to see it (that's right: if you're in production mode, we're doing this again to be safe). I already told you the location for the production environment; for the dev environment, it'll be `/css/index.css` in the final overall site location (for which `_site` is the Eleventy default). In development mode **only**, PostCSS also will watch for your edits to the source files and rewrite the CSS file accordingly.

	b. Run Eleventy to write your site's HTML files. In development mode **only**, Eleventy will also run a local [BrowserSync](https://browsersync.io)-based web server which will watch for your edits to the source files (templates, Markdown, *etc.*) and rewrite/serve the HTML files accordingly.

That's it for `package.json`. How do we then go get that CSS for the actual HTML pages themselves? Let's head to the site-wide `head`.[^siteHead]

[^siteHead]: At least, I'm **assuming** you have the same `head` for your site through your templating process. If you **don't**, this'll be a bit hairier for you; but, if you've gone to the trouble to assign different `heads` to different pages for some reason, I doubt you really need my help with all this in the first place.

## How `head` handles it

In the `head`, we tell Eleventy where to look for the CSS and how to use it. In essence, we want to instruct the `head` as follows:

1. Tell it whether we're in development or production mode.
2. If we're in development mode, link to the site's `/css/index.css` file. (Since we **are** in dev mode, we're not worried about that extra render-blocking resource.)
3. If we're in production mode, inject the contents of the project's `src/_includes/index.css` file between `<style>` and `</style>`.

In my Eleventy repos, I use both Nunjucks and pure-JavaScript (`.11ty.js`) templating, so I'll show you how to include these instructions in each. Those of you who use other templating approaches from among [Eleventy's numerous offerings](https://11ty.dev/docs/languages) can adapt for your use the following examples (most likely the Nunjucks examples, especially if you're using the Liquid templating language).

### In Nunjucks templating

So Nunjucks can detect the environment, you first must create a file in the Eleventy project's [global data directory](https://www.11ty.dev/docs/data-global/) (usually `/_data`) to expose this information to Nunjucks. In this example, we'll create the file `/_data/projEnv.js` with the following content:

```js
module.exports = {
  environment: process.env.ELEVENTY_ENV
}
```

(You may want to read in the Eleventy documentation about [how to expose environment variables](https://www.11ty.dev/docs/data-js/#example-exposing-environment-variables).)

Now, at the top of the `head.njk` template file, add:

```html
{% set eleventyEnv = projEnv.environment %}
```

Then, down in the section where you'd want to call your CSS, add:

```html
{% if eleventyEnv == "production" %}
  <style>{% include 'css/index.css' ignore missing %}</style>
{% else %}
  <link rel="stylesheet" href="/css/index.css" type="text/css" />
{% endif %}
```

The `include` statement starts in the site-wide **includes** directory, so it's pulling from where PostCSS created the production-mode CSS file.

### In JavaScript-only templating

Unlike what we did in the Nunjucks templating, there's no need for specially exposing the environment setting in JavaScript-only templating: the JavaScript we'll add will "read" it from the `package.json` scripting.[^envDiff] Thus, we can proceed directly to `head.js`[^ReubenLillie], in which you add the following at the top:

[^ReubenLillie]: This file structure is based on the work of [Reuben Lillie](https://reubenlillie.com), as I've [described before](/posts/2020/04/full-11ty-js-monty/).

[^envDiff]: It's worth noting that Nunjucks will detect the *Eleventy* environment while this JavaScript will detect the *Node.js* environment. However, we specify both environments in the `package.json` scripts, so we get the desired results either way.

```js
const fs = require('fs')
var internalCSS = ''
var internalCSSPath = 'src/_includes/css/index.css'
if (process.env.NODE_ENV === 'production') {
  if(fs.existsSync(internalCSSPath)) {
    internalCSS = fs.readFileSync(internalCSSPath)
  }
}
```

Then, down in the section where you'd want to call your CSS, add:

```html
${ process.env.NODE_ENV === 'production'
  ? `<style>${internalCSS}</style>`
  : `<link rel="stylesheet" href="/css/index.css" type="text/css" />`
}
```

## "Hey, not so fast"

Those of you who are the least bit OCD-ish about continuity may be wondering, "Um, didn't you say [a few weeks ago](/posts/2021/02/simplify-simplify/) that you'd changed this site over to Hugo and SCSS so you could get away from not only Tailwind but pretty much everything with software dependencies?"

Yes. Yes, I did. So what happened? Well, simply, things changed for me after that --- quite a bit, in fact.

Here's the TL;DR version:

- As I've [noted previously](/posts/2021/03/next-steps/), it now appears the Day Job will entail my working a lot more with, you got it, dependencies-heavy development --- in JavaScript and HTML, specifically. *(**Update, 2021‑04‑15**: After an initial miscommunication gave me the wrong impression about the thinking higher up, I learned that I won't be doing this work, after all. However, I'm leaving this segment in place for archival purposes and [for the sake of transparency](/posts/2019/10/otoh/).)*
- For my part, this is actually a good thing, because it means we may finally get to do what I've been advising since 2019, which would shed a ton of technical debt while greatly improving our websites’ performance. Discussions and resulting decisions remain in the future, but things are looking promising.
- I also [am intrigued](/posts/2021/03/jit-game-changer-tailwind-css/) by the [announcement](https://blog.tailwindcss.com/just-in-time-the-next-generation-of-tailwind-css) --- and the performance I've personally witnessed --- of the new, experimental just-in-time compiler for Tailwind. It makes Tailwind in a dev environment **much** faster, almost as fast as working in SCSS but with the advantages of [utility-first CSS](https://tailwindcss.com/docs/utility-first).

Accordingly, I've decided to dip my toes back into the piranha tank of dependencies-heavy development, with the hope that I continue to be ambulatory thereafter.

All of the above being the case, I also decided that I'd benefit more (consider it cross-training, if you will) from doing my personal stuff in a JavaScript-based SSG once again rather than Hugo with its basis in the [Go language](https://go.dev).

And, while I briefly considered trying to convert my site over to [Next.js](https://nextjs.org) since that's the framework we may very well adopt at the Day Job for the corporation's sites, I found it far more trouble than it was worth for a simple Markdown-based site like this one.[^nested]

[^nested]: Let's just say that you don't want to start from scratch, knowledge-wise, and try to make a Next.js site understand a path like `/posts/2021/03/this-is-my-post-title`. It's actually pretty easy if you're dealing with HTML-in-JS files, thanks to the really clever routing built into Next, but not so much with Markdown files. It's not lost on me that nearly every blogging example for Next.js you can find out there has its Markdown files in only *one* level. But *nested* levels? Ha.

.&nbsp;.&nbsp;. which, of course, has "[danced](/posts/2019/12/sorta-strange-ssg-trip/)" me back to Eleventy and Tailwind, albeit Tailwind with the JIT compiler. So there y'go.
