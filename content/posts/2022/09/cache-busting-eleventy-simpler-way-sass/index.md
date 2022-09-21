---
title: "Cache-busting in Eleventy: a simpler way with Sass"
description: "Nearly two years after I thrashed around with code to accomplish this, two relatively new plugins make it a breeze — and with automatic Sass compilation, to boot."
author: Bryce Wray
date: 2022-09-19T16:34:00-05:00
#draft: true
initTextEditor: iA Writer # default --- change if needed
---

**Note**: This post also appears on [dev.to](https://dev.to/brycewray/cache-busting-in-eleventy-a-simpler-way-with-sass-10h3).
{.yellowBox}

If you use the [Eleventy](https://11ty.dev) static site generator (SSG) and [Sass](https://sass-lang.com) to build your website, read on for some cool stuff.

Back in late 2020, I [wrote](/posts/2020/11/using-postcss-cache-busting-eleventy/) [three](/posts/2020/12/cache-busting-eleventy-take-two/) [posts](/posts/2020/12/hashing-out-cache-busting-fix-eleventy/) about how to perform "cache-busting" on an Eleventy site's CSS, which ensures the vast majority of web browsers will reliably show your most up-to-date styling. In the end, I suggested a method that accomplished this through a combination of `package.json` scripting and build-time JavaScript runs. It worked, but it was somewhat of a time drag during dev mode. Besides, it's a lot clunkier than how one can do it in [Hugo](https://gohugo.io) via that SSG's built-in asset pipeline, [Hugo Pipes](https://gohugo.io/hugo-pipes/scss-sass/). Thus, I've continued to look for a better way.

Today, I found it.

It comes in the form of two recently introduced Eleventy plugins by [Kentaro Imai](https://github.com/kentaroi): [`eleventy-sass`](https://github.com/kentaroi/eleventy-sass) and [`eleventy-plugin-rev`](https://github.com/kentaroi/eleventy-plugin-rev). The former provides Sass-to-CSS compilation, and the latter adds filters you can access to provide *versioning*-based filename changes for cache-busting.

It's as simple as this. First, go to your Eleventy project directory and install the two plugins from npm:

```plaintext
npm i -D eleventy-sass eleventy-plugin-rev
```

Then register them in the project's config file, usually a top-level `.eleventy.js` file, as in this simplified example (see the [`eleventy-sass` documentation](https://github.com/kentaroi/eleventy-sass) for more details about available options):

```js
const pluginRev = require("eleventy-plugin-rev");
const eleventySass = require("eleventy-sass");

module.exports = function(eleventyConfig) {

	eleventyConfig.addPlugin(pluginRev);
	eleventyConfig.addPlugin(eleventySass, {
		rev: true
	});

	/*
		other Eleventy config as usual...
	*/
}
```

Finally, add the following to your template for the site-wide `head` tag (the following assumes you have an `index.scss` file within `src/styles/`):

```html
<link rel="stylesheet" href="{{ "/styles/index.css" | rev }}" type="text/css" />
```

That's all!

Compared to my method from 2020, this requires **no** weird gyrations in `package.json` and **no** build-time machinations in JavaScript. It's so much cleaner and simpler.

Now, on each run of Eleventy, the combo of `eleventy-sass` and `eleventy-plugin-rev` will create a CSS file with a hashed filename that changes every time you make a change to `index.scss` **or** any [partials](https://sass-lang.com/guide#topic-4) that `index.scss` might `@use`. (And you'll want to `@use`, **not** `@import`, because the Sass-to-CSS compilation in `eleventy-sass` is done with [Dart Sass](https://sass-lang.com/dart-sass), rather than the [deprecated](https://sass-lang.com/blog/libsass-is-deprecated) LibSass.)

Incidentally: in my own testing of this setup in dev mode, Eleventy's `--incremental` flag keeps the dev server's refresh functionality from calling the renamed CSS file when you alter the SCSS (and therefore cause that renaming to occur). Also, I found this to be true with both Eleventy 1.x and the still-in-development Eleventy 2.x; so I'd suggest not using `--incremental` if you don't want to have to do a dev server refresh every time you make an SCSS change.

That little gripe aside, I encourage all Eleventy/Sass users to consider adopting this quick config improvement, courtesy of some neat coding by Kentaro Imai. It's ’waaay cleaner than any other Sass-using, cache-busting solution for Eleventy that I've yet encountered, and you can have it up and running in just a few minutes.
