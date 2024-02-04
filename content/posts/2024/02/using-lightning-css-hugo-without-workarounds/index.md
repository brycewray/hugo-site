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

**Update, 2024-02-04**: This post now contains additional explanatory details along with slightly updated (and, perhaps, improved) code.
{.box}

A couple of weeks back, I [wrote](/posts/2024/01/using-lightning-css-hugo/) about how you could use a [PostCSS](https://postcss.org) plugin, [postcss-lightningcss](https://github.com/onigoetz/postcss-lightningcss), to get the [Rust](https://www.rust-lang.org/)-based [Lightning CSS](https://lightningcss.dev/) working in [Hugo](https://gohugo.io). However, before long, I wondered how I might connect Hugo and Lightning CSS more directly, so I could bypass the inevitable slowdowns from the JavaScript-laden PostCSS.

The solution at which I finally arrived may look somewhat like a Franken-config; but, if you're willing to install a few more packages and do some scripting in `package.json`, read on for some coolness.

<!--more-->

## Getting there from here

There never was any doubt that you could directly add the original [lightningcss](https://github.com/parcel-bundler/lightningcss/) package itself to a Hugo project (or any other, for that matter). The problem was in getting Hugo and Lightning CSS to work together, especially in development.

And, truth be told, even the approach I'm going to describe herein doesn't really accomplish that.

Instead, I point [Lightning CSS's CLI package](https://lightningcss.dev/docs.html#from-the-cli) at a directory of CSS files and let it do its thing: [bundling](https://lightningcss.dev/bundling.html), [transpilation](https://lightningcss.dev/transpilation.html), and [intelligent minification](https://lightningcss.dev/minification.html). (I have set the latter to occur only in production.) The resulting files wind up in *another* directory, where Hugo accesses them while building the project website.

That works well enough for production, but what about when you're in development mode and making changes to your CSS files? Well, since Lightning CSS has no built-in "watching" capability (although people have been [asking](https://github.com/parcel-bundler/lightningcss/issues/126) for it since 2022), I used [npm-watch](https://github.com/M-Zuber/npm-watch) for that purpose.

## The code

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

Why is that last folder called `css-original` rather than just `css`? Because this is the folder where we'll add our CSS files for Lightning CSS to convert into the ones for Hugo to use, and **those** will end up in `themes/lcss/assets/css/`.[^ignoreCSS] The `critical.css` file `@import`s specific files in `themes/lcss/assets/css-original/partials` to create the critical CSS, injected into each page's `head`, to handle above-the-fold and site-wide content. The `index.css` file also `@import`s partials, albeit different ones, from that same folder.

[^ignoreCSS]:  By the way, I suggest you add the `themes/lcss/assets/css/` folder (or your project's equivalent thereof) to your .gitignore file, since that folder will be regenerated every time you change anything in the `css-original` folder and, if not ignored, will complicate your version control for no good reason.

Then we have the scripting and packages:

```json{filename="package.json" bigdiv=true}
{
	"config": {
		"targets": ">= 0.25%"
	},
	"watch": {
		"dev:lcss": {
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
		"start": "NODE_ENV=development npm-run-all clean:* dev:lcss --parallel dev:hugo watch",
		"dev:lcss": "lightningcss --bundle --targets \"$npm_package_config_targets\" themes/lcss/assets/css-original/*.css --output-dir themes/lcss/assets/css",
		"build:lcss": "lightningcss --minify --bundle --targets '>= 2%' themes/lcss/assets/css-original/*.css --output-dir themes/lcss/assets/css",
		"build": "NODE_ENV=production npm-run-all clean:* build:lcss prod:hugo",
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

Let's unpack what's going on in this file:

- The `config` object lets you specify the *[targeted browsers](https://lightningcss.dev/transpilation.html#browser-targets)* for Lightning CSS's transpilation process. The `targets` item takes any value that works with [Browserslist](https://github.com/browserslist/browserslist) --- with which you're likely already familiar If you've ever used the popular [autoprefixer](https://github.com/postcss/autoprefixer) tool from the PostCSS world. (Incidentally: when choosing your `targets` value, use the incredibly helpful [Browserslist playground page](https://browsersl.ist/).)\
\
Once you've set a value for `targets`, the `dev:lcss` script (more on that below) will feed it to the `--targets` flag, using the double-quotes-escaped ` \"$npm_package_config_targets\"` variable. Now, you could just do that more manually through, say, `--targets '>= 0.25%'` and no `config` object --- but I think the use of [`$npm_package_config`](https://frontend.irish/npm-config-variables) makes it a lot easier to manage your `targets` setting, including trying different settings to compare their effects on the generated CSS.

- The [`watch` object](https://github.com/M-Zuber/npm-watch?tab=readme-ov-file#synopsis) contains the information that npm-watch's `watch` script will need to do its job:
	- `"dev:lcss"` --- The script to run whenever the watched files change (again, more on that script below).
	- `"patterns"` --- The directory to watch.
	- `"extensions"` --- The kinds of files to watch.
	- `"quiet"` and `"runOnChangeOnly"` --- **How** I want it to run.
- The `dev:lcss` script gives the Lightning CSS CLI tool its instructions:
	- `--bundle` --- Read any `@import` statements and bundle the referenced CSS files. For example, given a `themes/lcss/assets/css-original/index.css` file:
{{< highlight css "linenos=false" >}}
@import 'resets.css';
@import 'variables.css';
@import 'global.css';
@import 'posts.css';
@import 'code-blocks.css';
{{< /highlight >}}
. . . the resulting `themes/lcss/assets/css/index.css` will contain the processed contents of all those `@import`ed files.
	- `-- targets` --- (As discussed above.)
	- Process the indicated files and put the resulting file(s) where we want. Here, we're telling it to (a.) process all the CSS files in `themes/lcss/assets/css-original` and (b.) output the results into `themes/lcss/assets/css`. Note that we're using `--output-dir`, which creates individual files, with names corresponding to their original forms, in that output directory. On the other hand, if we preferred to have just one output file with the combined contents of all the files from (a.), we'd use `-o` (or its equivalent, `--output-file`).
- Finally, the `watch` script simply runs npm-watch, which follows the instructions of the previously described `watch` object. Then, within the overarching `start` script for development, we run `watch` in parallel with our `dev:hugo` script by using the familiar [npm-run-all](https://github.com/mysticatea/npm-run-all) tool.

## Breaking off the shackles

The PostCSS aficionados among you may be wondering something along these lines: "That seems like a lot of hassle compared to what you showed in the first post on this subject. Is it all worth it?"[^PCSSfan]

[^PCSSfan]: After the first post, I heard from one highly skeptical person who clearly felt that PostCSS, if equipped with the [`postcss-preset-env` plugin](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env), was still good enough on its own --- much less without any need to involve Lightning CSS. I can only imagine what that same person might think about what I've explained in *this* post.

And, in the end, that surely is the point, isn't it? What kind of performance **does** all this enable for development mode?

Well, you get a little overhead from npm-watch (and the [nodemon](https://nodemon.io/) package behind it), but this "bare" Lightning CSS configuration still is far faster than the Lightning CSS-via-PostCSS config I previously described.

Here are some comparisons from this site's Hugo project running locally on [my system](/posts/2023/07/making-good-move/). In each case, the *reload time* refers to how quickly the project rebuilds the site after I change the global `font-family` setting for `html` and `body` in a "watched" partial. I gave each test multiple iterations, so each reload time is an average thereof. Just for grins, I also ran this using Embedded [Dart Sass](https://sass-lang.com/dart-sass/), for which [Hugo's built-in asset pipeline is optimized](https://gohugo.io/hugo-pipes/transpile-sass-to-css/).

| Setup | Reload time |
|---|---|
| "Bare" Lightning CSS | 232 ms |
| Lightning CSS via PostCSS | 1158 ms |
| Embedded Dart Sass | 53 ms |
{.ulysses}

Clearly, **nothing** is going to outrace the Hugo/Dart Sass combo in development mode; but, for those Hugo users who wish to avoid Sass in general and the need to [install Embedded Dart Sass](https://gohugo.io/functions/resources/tocss/#dart-sass) in particular, Lightning CSS *without* the shackles of PostCSS may well come close enough.[^LCSSvsSass]

[^LCSSvsSass]: Besides, Lightning CSS also provides several "smart" features that Sass lacks **unless** you also involve PostCSS plugins and their resulting slowdown; and, even then, you probably won't get the same functionality. For example: while autoprefixer does a decent job of adding vendor-prefixed fallbacks, I know of no PostCSS plugin, or combination of plugins, that can match Lightning CSS's [intelligent syntax lowering](https://lightningcss.dev/transpilation.html#syntax-lowering).
