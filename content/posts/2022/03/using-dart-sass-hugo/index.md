---
title: "Using Dart Sass with Hugo"
description: "Until hosts allow Embedded Dart Sass in their build processes, here’s a not-too-hacky workaround for Sass-on-Hugo fans."
author: Bryce Wray
date: 2022-03-08T11:09:00-06:00
---

**Update, 2022‑03‑09**: Things changed dramatically the day after I originally wrote this, so there's a [sequel](/posts/2022/03/using-dart-sass-hugo-sequel/) you'll definitely want to read after this one.
{.yellowBox}

{{% disclaimer %}}

As promised at the end of my [previous post](/posts/2022/03/making-tailwind-jit-work-hugo-version-3-edition/) *(please read that first if you haven't already, and then come back here)*, I used what I learned in that exercise to try an experiment which worked --- and it constitutes excellent news for [Hugo](https://gohugo.io) users who prefer to style their sites with [Sass](https://sass-lang.com).

First, as almost always seems necessary, I'll provide some back story.

## The LibSass problem

In October, 2020, the Sass project [deprecated the LibSass implementation](https://sass-lang.com/blog/libsass-is-deprecated) on which [Hugo Pipes](https://gohugo.io/hugo-pipes) depends to provide Sass support. Two key points in the deprecation announcement were:

- Going forward, LibSass will receive no additional feature updates, but rather only fixes for major bugs and security issues. As a result, since LibSass has received no feature updates since November, 2018, LibSass users --- and LibSass-dependent apps like Hugo --- are now nearly three-and-a-half years behind the curve where Sass features are concerned.
- All LibSass users should switch to [Dart Sass](https://sass-lang.com/dart-sass).

On many if not most other [static site generators](https://jamstack.org/generators) (SSGs), moving to Dart Sass is a fairly simple matter (other than whatever Sass code changes it might require, of course): one needs only to use the [standard Sass package](https://github.com/sass/sass). However, since LibSass is baked into Hugo, the only answer [appears to be](https://discourse.gohugo.io/t/question-are-there-plans-to-support-dart-sass-and-its-newly-introduced-use-modular-system/21882) in the form of [Embedded Dart Sass](https://github.com/sass/dart-sass-embedded), present in one's `path`. And, while that's doable on a website developer's personal device, getting it into a hosting vendor's build process is another matter, one [which remains unsolved](https://discourse.gohugo.io/t/using-dart-sass-hugo-and-netlify/37099) at this writing.

## A stab in the dark

While running through the Tailwind-fix part of the previous article, I got to thinking: why not just use that standard Sass package with Hugo? I'd seen no other articles or forum comments about doing it that way. In either case, Tailwind or standard Sass, you're using an [`npm`](https://www.npmjs.com/) package so, if it's good enough for the proverbial goose&nbsp;.&nbsp;.&nbsp;.

I gave it a shot, and am delighted to tell you that it works!

Be advised that, unlike the Tailwind-3-on-Hugo workaround, this one for Dart-Sass-on-Hugo needs [`package.json` ](https://docs.npmjs.com/creating-a-package-json-file) scripting. While some might find that a bother, I prefer to put it in the category of "Let's avoid criticizing the talking dog's grammar, but rather just be glad he can frickin' **talk** in the first place." And, on the **good** side: this method, unlike the Tailwind-3-on-Hugo solution, **doesn't** require creating a specially fingerprinted CSS file just so Hugo will refresh the development server when files change, since the `package.json` script has both Sass and Hugo constantly refreshing as needed.

So, let's get to the nerdy goodness, shall we?

## Setting up Dart Sass in your Hugo project

### Node, `npm`, and `package.json`

First of all, if you don't even use [node modules](https://nodejs.org/api/modules.html) in any of your projects (Hugo or otherwise), you may need to [install `npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). From here on, I'll assume you've already done so.

If your Sass-using Hugo project has no `package.json` file as yet, go into the project and run this `npm` command to create that file:

```bash
npm init -y
```

Now you're set to proceed. Install the packages you'll need for the code to follow:

```bash
npm i -D npm-run-all rimraf sass
```

Then, open `package.json` and make its `scripts` object look as follows:

```json
"scripts": {
	"clean": "rimraf public",
	"devsass": "sass --no-source-map assets/scss/index.scss assets/css/index.css",
	"prodsass": "sass --no-source-map assets/scss/index.scss assets/css/index.css --style=compressed",
	"start": "NODE_ENV=development npm-run-all clean devsass --parallel dev:*",
	"build": "NODE_ENV=production npm-run-all clean prodsass prod:hugo",
	"dev:sass": "npm run devsass -- --watch",
	"dev:hugo": "hugo server",
	"prod:hugo": "hugo --gc --minify"
},
```

What do all those scripts do? While the following explanation doesn't cover the scripts in order, its sequence may make it easier to understand their interaction:

- The scripts near the bottom that start with either `dev:` or `prod:` make Sass and Hugo, respectively, do their usual thing in the appropriate mode, whether development or production. They're called by&nbsp;.&nbsp;.&nbsp;.
- .&nbsp;.&nbsp;. `start` (for development) and `build` (for production), with each using `npm-run-all` to run multiple scripts with one command.
- `devsass` is for development mode, and uses Sass to generate the `assets/css/index.css` file[^ignore] for Hugo Pipes to "see."[^themes] `prodsass` is like `devsass`, except for production, and thus we give it `devsass`'s functionality **plus** minifying the generated CSS.[^minify]
- And, just for good measure, `clean` deletes[^rimraf] any `public` folder that a previous Hugo build might have left behind. This obviously is irrelevant for production --- although definitely **quite** relevant for development --- but I always include it to avoid occasional flashes of weirdness. It doesn't hurt anything and, besides, Ya Nevah Know.

[^ignore]: Incidentally, you may want to add `./assets/css/index.css` to your project's top-level [`.gitignore` file](https://git-scm.com/docs/gitignore), since there's no need to track this temporarily generated file; in the `build` script, the `prodsass` part generates it at the host on each build.

[^themes]: This file location within the scripts assumes you're not using a theme. If you are, adjust this accordingly. For example, with a theme named `mytheme`, you'd change each `assets/css/index.css` reference to `themes/mytheme/assets/css/index.css`.

[^minify]: As you can see in the `prod:hugo` script, we're already minifying the generated HTML in production. Thus, if you're using **internal** CSS, you can get by with just one `devsass`-like script, rather than separate `devsass` and `prodsass` scripts. However, with **external** CSS, you do need both of those scripts.

[^rimraf]: `clean` uses the [`rimraf` package](https://github.com/isaacs/rimraf), a cross-platform version of the [`rm -rf` deletion command](https://en.wikipedia.org/wiki/Rm_(Unix)) from \*n*x-like OSs such as Linux and macOS. Using `rimraf` rather than `rm -rf` provides the same action for users of all platforms, even Windows.

To run this in development, type `npm run start` in your terminal. For the build command at your host, set it to `npm run build`.[^hostBuild] **But**, before you do either, there's one more thing to do, and that's giving Hugo the necessary **templating** for all of this to work.

[^hostBuild]: If you neglect this and leave the Hugo repo's build command as, say, the more standard choices of `hugo` or `hugo --gc --minify`, the build on the host will fail because Hugo won't get that generated CSS for processing in the `scss.html` partial template described in this post.

### The `scss.html` partial

As in the [two](/posts/2021/11/making-tailwind-jit-work-hugo/) [posts](/posts/2022/03/making-tailwind-jit-work-hugo-version-3-edition/) about Tailwind-3-on-Hugo, you'll want to create a separate [partial template ("partial")](https://gohugo.io/templates/partials/) --- we'll name it `scss.html` --- and call it with the [`partialCached` function](https://gohugo.io/functions/partialcached/). This will make both development and production far less taxing on your system and the host's. The `scss.html` partial will contain the SCSS/CSS-handling you'd otherwise do elsewhere (perhaps the site-wide `baseof.html` or a `head.html` partial), where you'll replace that code with:

```go-html-template
{{ partialCached "scss.html" . }}
```

Almost done! Now we finish up by offering two different versions of the `scss.html` partial: one for **external** CSS, and one for **internal** CSS. You simply use whichever version best fits the way you like to style your site.

First, the version for **external** CSS:

```go-html-template
{{ $styles := resources.Get "css/index.css" }}
{{ if hugo.IsProduction }}
	{{ $styles = $styles | resources.Minify | fingerprint }}
{{ end }}
<link href="{{ $styles.RelPermalink }}" rel="stylesheet" />
```

Then, the version for **internal** CSS:

```go-html-template
{{ $styles := resources.Get "css/index.css" }}
{{ if hugo.IsProduction }}
	{{ with $styles }}
		<style>{{- .Content | safeCSS -}}</style>
	{{ end }}
{{ else }}
	<link href="{{ $styles.RelPermalink }}" rel="stylesheet" />
{{ end }}
```

**Note**: In case it would help, I've also put up a minimal [demo repo](https://github.com/brycewray/hugo-npm-sass) and [site](https://hugo-npm-sass.vercel.app/) based on this code.
{.yellowBox}

## The fight for mindshare

These workarounds for Tailwind-JIT-on-Hugo and Dart-Sass-on-Hugo may seem awfully kludgy, especially to those Hugo users who typically eschew any dealings with extra [software dependencies](https://xkcd.com/2347/). Still, these methods (or, one would hope, better ones yet to come from brighter folks than I) could play a significant role in Hugo's prospects for at least the near future, if not beyond.

To have its best chance of attracting both new and seasoned developers in this competitive market, Hugo should be compatible with tools to which devs are already committed or, at least, attracted. Perhaps solutions along the lines of those described in this series of posts can help Hugo compete more effectively for web dev mindshare, especially against trendier, JavaScript-based SSGs which seamlessly use both Tailwind-with-JIT and Dart Sass.
