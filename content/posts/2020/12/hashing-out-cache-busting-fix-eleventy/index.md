---
title: "Hashing out a cache-busting fix for Eleventy"
description: "Some of the code behind my previous post."
author: Bryce Wray
tags: [web-development, static-site-generators, ssgs, css, postcss, eleventy, caching, image-processing, javascript, website-hosting, netlify, vercel, render, firebase, cloudflare, cloudflare-workers, sass-scss, tailwind-css]
date: 2020-12-15T17:00:00-06:00
---

**Update, 2022-09-19**: Go ahead and read this post’s [two](/posts/2020/11/using-postcss-cache-busting-eleventy/) [predecessors](/posts/2020/12/cache-busting-eleventy-take-two/), followed by this post, for perspective --- **but** then go to [this one](/posts/2022/09/cache-busting-eleventy-simpler-way-sass/) for a **much** simpler, **much** cleaner alternative.
{.yellowBox}

*Up-front disclaimer: No proverbial horses were beaten to death (at least, not by me) during the writing of the following --- although I could see how you might get a different impression.*

Since a few days ago, when I initially published "[Cache-busting in Eleventy, take two](/posts/2020/12/cache-busting-eleventy-take-two/)" as a way of apologizing for the abortive solution I'd offered in "[Using PostCSS for cache-busting in Eleventy](/posts/2020/11/using-postcss-cache-busting-eleventy/)," I've thought it might be more helpful if I gave at least some of the actual code rather than pushing people to the [starter site](https://github.com/brycewray/eleventy_solo_starter) whose appearance is based on this one. So that'll be the purpose of this piece.

Here's a brief bit of catchup, to clarify things for those who have read neither of those articles and/or have no idea why they should care about the articles’ subject matter:

- It's best to set up caching of your site's static assets, specifically the CSS file or files it uses, to improve the experience for your visitors.
- As of now, this caching must be set up manually in the [Eleventy](https://11ty.dev) [static site generator](https://jamstack.org/generators/) used by this site.
- After I found a particular [PostCSS](https://postcss.org) plugin lacking for this purpose despite my earlier hopes for it, I was able to come up with a different method which I've incorporated into both this site and the starter site.

## Five steps

Before I give you the actual code, here's what we're doing, as noted in "Cache-busting in Eleventy, take two":

1. Concatenate our CSS files.
2. Create an [MD5](https://en.wikipedia.org/wiki/MD5) hash of the concatenated content. This hash will be appended to the name of the site's final CSS file at build time.
3. Write two files out to the project: (a.) a JSON file in the `_data` directory which will "tell" the [Eleventy data cascade](https://www.11ty.dev/docs/data-cascade/) the name of the final CSS file; and (b.) a text file in the root directory which feeds the CSS file name to the PostCSS file-output command in the `package.json` scripts.
4. Use that PostCSS command to write the appropriately named CSS file to the `_site` folder which the host uses to build the site.
5. Use the site's `head` partial template (`head.js`) to tell each page on the site to refer to the CSS file by that special file name.

## The starting CSS

Before I get to the part about accomplishing those five things, I'll first repeat that the project's `/src/assets/css/index.css` file looks like this:

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

Here, the `@import` statements (enabled by the [postcss-import](https://npmjs.com/package/postcss-import) package) bring in the contents of separate CSS files, as well as [Tailwind CSS](https://tailwindcss.com) files, into one file that PostCSS will further process later on.

With that understood, let's start addressing the five steps.

## The hash-maker

First, at the project top level, comes `cssdate.js`[^whyDate], which accomplishes the first three of the five steps.

[^whyDate]: Incidentally, the reason this file is called `cssdate.js` rather than, say, `csshash.js` is because I initially thought the final hash would be based on the timestamp, as I explained in "Cache-busting in Eleventy, take two." I probably should've changed it but never got around to it. Perhaps I can consider the name an historical artifact.

```js
// Detect when any CSS files change

const fs = require('fs')
const md5 = require('md5')
const globAll = require('glob-all')
const DATAFILE = '_data/csshash.json'
const PCSSFILE = 'csshash'
cssFiles = globAll.sync([
	'src/assets/css/*.css'
])

var cssMd5Total = 0
var cssContent = ''

for(i=0; i<cssFiles.length; i++) {
	cssContent += (fs.readFileSync(cssFiles[i]))
}
cssMd5Total = md5(cssContent)
console.log(`CSS MD5 result =`, cssMd5Total)

var jsonValue = `{
	"index.css": "index-${cssMd5Total}.css"
}`
fs.writeFileSync(DATAFILE, jsonValue)

var txtValue = `index-${cssMd5Total}.css`
fs.writeFileSync(PCSSFILE, txtValue)
// ...the latter because, otherwise, you get the following error:
// The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView.
```

This file:

- Loops through all the site's CSS files.
- Concatenates them.
- Uses `md5` to create a hash of the result.
- Writes a JSON file to the project's `_data` directory. The file's sole content is a single object; its *key* is `index.css`; and its *value* is `index-` concatenated with the hash and then `.css`.
- Writes a text file to the project's top level. The file's only content is the same as the *value* in the JSON file.

## Site scripts

From there, the focus shifts to the scripts in the project's `package.json` file (I'll include only the scripts, since there obviously is a *lot* more stuff in that file):

```json
	"scripts": {
		"clean": "rm -rf _site",
		"hasher": "node cssdate.js",
		"start": "npm-run-all clean hasher --parallel dev:*",
		"dev:postcss": "postcss src/assets/css/index.css -o _site/css/$(cat csshash) --config ./postcss.config.js -w",
		"dev:eleventy": "ELEVENTY_ENV=development npx @11ty/eleventy --watch --quiet",
		"dev:svrx": "svrx",
		"build": "NODE_ENV=production npm-run-all clean hasher --parallel prod:*",
		"prod:postcss": "postcss src/assets/css/index.css -o _site/css/$(cat csshash) --config ./postcss.config.js",
		"prod:eleventy": "ELEVENTY_ENV=production npx @11ty/eleventy --output=./_site",
		"testProd:svrx": "svrx",
		"testProd:postcss": "postcss src/assets/css/index.css -o _site/css/$(cat csshash) --config ./postcss.config.js -w",
		"testProd:eleventy": "ELEVENTY_ENV=production npx @11ty/eleventy --output=./_site --watch",
		"setProd": "NODE_ENV=production",
		"testbuild": "NODE_ENV=production npm-run-all clean hasher --parallel testProd:*"
	},
```

To be specific:

- `hasher` runs that `cssdate.js` file we just covered. As you can see, `hasher` is part of the `start`, `build`, and `testbuild` scripts.
- Each of the scripts ending in `:postcss` (which one gets run depends on whether I run `start`, `testbuild`, or `build`) invokes the [postcss-cli](https://npmjs.com/package/postcss-cli) package to:
	- Read and process the `index.css` file (which, remember, includes all those `@import`s).
	- Write the resulting CSS to the `_site/css/` output folder (`_site` is the default folder where an Eleventy site exists when built) and name the file whatever is the content of that `csshash` text file that `cssdate.js` wrote to the project's top level.

**Important**: Note that the process completes itself **only** during actual site **builds**, and **not** in the `dev` or `testbuild` scripts --- which means that, for version control purposes (*i.e.*, changes you can commit in Git), actual site builds are the only times that all the applicable changes will occur. Thus, you may want to `gitignore` the top-level file `csshash` (but **not** `csshash.js`) and the files `/_data/csshash.json` and `/_data/year.json`.
{.yellowBox}

## The head template

That leaves only setting the Eleventy `head.js` template to call the CSS file by the hash-enriched name, the *value* of which it reads by addressing the `index.css` *key* in that one object in `_data/csshash.json`.

```js
<link rel="preload" as="style" href="/css/${data.csshash['index.css']}" />
<link rel="stylesheet" href="/css/${data.csshash['index.css']}" type="text/css" />
```

## Not TMI?

So many times I've seen things --- often new products that struck me as being odd --- and dismissed them as "a solution in search of a problem." I hope this article doesn't fit that description where many of you are concerned; and, of greater importance, I hope it helps you in managing your own Eleventy-based site.

**Note, 2020-12-17**: If you use [Netlify](https://netlify.com), be sure you **turn off** its post-processing of your CSS, which I've found can bollix up this method. *(My repos’ code already handles such processing anyway.)* You can do it either through the Netlify GUI (**Build &amp; deploy** &gt; **Post processing** &gt; **Asset optimization**) or through use of an appropriately configured top-level `netlify.toml` file such as what I've now added to the starter set. Whether other hosts’ settings would be similarly disruptive, I can't say; the only ones on which I've tested this method so far are [Cloudflare Workers](https://workers.cloudflare.com), [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/), [Firebase](https://firebase.google.com), Netlify, [Render](https://render.com), and [Vercel](https://vercel.com).
{.yellowBox}
