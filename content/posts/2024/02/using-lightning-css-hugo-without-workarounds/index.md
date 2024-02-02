---
title: "Using Lightning CSS with Hugo — without workarounds"
description: "With a little tinkering, there’s no need for that PostCSS plugin I recently mentioned."
author: Bryce Wray
date: 2024-02-02T10:12:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

A couple of weeks back, I [wrote](/posts/2024/01/using-lightning-css-hugo/) about how you could use a [PostCSS](https://postcss.org) plugin, [postcss-lightningcss](https://github.com/onigoetz/postcss-lightningcss), to get the [Rust](https://www.rust-lang.org/)-based [Lightning CSS](https://lightningcss.dev/) working in [Hugo](https://gohugo.io). However, before long, I wondered how I might connect Hugo and Lightning CSS more directly, so I could bypass the inevitable slowdowns from the JavaScript-laden PostCSS.

The solution at which I finally arrived may look somewhat like a Franken-config; but, if you're willing to install a few more packages and do some scripting in `package.json`, read on for some coolness.

<!--more-->

There never was any doubt that you could directly add the original [lightningcss](https://github.com/parcel-bundler/lightningcss/) package itself to a Hugo project (or any other, for that matter). The problem was in getting Hugo and Lightning CSS to work together, especially in development.

And, truth be told, even the approach I'm going to describe herein doesn't really accomplish that.

Instead, I point [Lightning CSS's CLI package](https://lightningcss.dev/docs.html#from-the-cli) at a directory of CSS files and let it do its thing: [bundling](https://lightningcss.dev/bundling.html), [transpilation](https://lightningcss.dev/transpilation.html), and [intelligent minification](https://lightningcss.dev/minification.html). (I have set the latter to occur only in production.) The resulting files wind up in *another* directory, where Hugo accesses them while building the project website. 

That works well enough for production, but what about when you're in development mode and making changes to your CSS files? Well, since Lightning CSS has no built-in "watching" capability (although people have been [asking](https://github.com/parcel-bundler/lightningcss/issues/126) for it since 2022), I used [npm-watch](https://github.com/M-Zuber/npm-watch) for that purpose.

So here's how it all works for a site with a theme called "lcss."

First, you have a file structure like this:

```plaintext
.
└── themes
		└── lcss
				└── assets
						└── css-original
								└── partials <-- folder of CSS files
								└── critical.css
								└── index.css
```

Why is that last folder called `css-original` rather than just `css`? Because this is the folder where we'll add our CSS files for Lightning CSS to convert into the ones for Hugo to use, and **those** will end up in `themes/lcss/assets/css/`.[^ignoreCSS] The `critical.css` file `@import`s specific files in `themes/lcss/assets/css-original/partials` to create the critical CSS, injected into each page's `head`, to handle above-the-fold and site-wide content. The `index.css` file also `@import`s partials, albeit different ones, from that same folder.

[^ignoreCSS]:  By the way, I suggest you add the `themes/lcss/assets/css/` folder (or your project's equivalent thereof) to your .gitignore file, since that folder will be regenerated every time you change anything in the `css-original` folder and, if not ignored, will complicate your version control for no good reason.

Then we have the scripting and packages:

```json{filename="package.json" bigdiv=true}
{
	"watch": {
		"build:lcss": {
			"patterns": [
				"themes/lcss/assets/css-original"
			],
			"extensions": "css,scss",
			"quiet": true,
			"runOnChangeOnly": false
		}
	},
	"scripts": {
		"clean:hugo": "rimraf public",
		"clean:lcss": "rimraf themes/lcss/assets/css",
		"dev:hugo": "hugo server",
		"prod:hugo": "hugo --minify",
		"start": "NODE_ENV=development npm-run-all clean:* build:lcss --parallel dev:hugo watch",
		"build:lcss": "lightningcss --minify --bundle --targets '>= 2%' themes/lcss/assets/css-original/*.css --output-dir themes/lcss/assets/css",
		"build:prelim": "NODE_ENV=production npm-run-all clean:* build:lcss prod:hugo",
		"build": "npm-run-all build:prelim move-excerpts search",
		"watch": "npm-watch"
	},
	"devDependencies": {
		"lightningcss-cli": "^1.23.0",
		"npm-run-all": "^4.1.5",
		"npm-watch": "^0.11.0",
		"rimraf": "^5.0.5"
	}
}
```

What kind of performance does it achieve in development mode? Well, you get a little overhead from npm-watch (and the [nodemon](https://nodemon.io/) package behind it), but this "bare" Lightning CSS configuration still is ’way faster than the Lightning CSS-via-PostCSS config I previously described.

Here are some comparisons from this site's Hugo project running locally on [my system](/posts/2023/07/making-good-move/). In each case, the *reload time* refers to how quickly the project rebuilds the site after I change the global `font-family` setting for `html` and `body` in a "watched" partial. I gave each test multiple iterations, so each reload time is an average thereof. Just for grins, I also ran this using Embedded [Dart Sass](https://sass-lang.com/dart-sass/), for which [Hugo's built-in asset pipeline is optimized](https://gohugo.io/hugo-pipes/transpile-sass-to-css/).

| Setup | Reload time |
|---|---|
| "Bare" Lightning CSS | 232 ms |
| Lightning CSS via PostCSS | 1158 ms |
| Embedded Dart Sass | 53 ms |
{.ulysses}

Clearly, **nothing** is going to outrace the Hugo/Dart Sass combo in development mode; but, for those Hugo users who wish to avoid Sass in general and the need to [install Embedded Dart Sass](https://gohugo.io/functions/resources/tocss/#dart-sass) in particular, Lightning CSS *without* the shackles of PostCSS may well come close enough --- while also providing several features that Sass lacks.