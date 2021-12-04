---
layout: singlepost
tags: post
title: "Bundling JavaScript with Hugo and esbuild"
subtitle: "Gaining from Go"
description: "An example of how you could use Hugo’s phenomenally fast, built‑in bundling capabilities."
author: Bryce Wray
date: 2021-12-01T08:34:00-06:00
#lastmod: 2021-12-01T09:28:00-06:00 #forgot to remove "md5" from example code
#initTextEditor: Ulysses
discussionId: "2021-12-bundling-javascript-hugo-esbuild"
featured_image: matryoshka-dolls-ornament-3131097_4630x3126.jpg
featured_image_width: 4630
featured_image_height: 3126
featured_image_alt: "Bundling concept image: close-up view of Russian matryoshka nesting-stacking dolls"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/schwoaze-4023294/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3131097">Schwoaze</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3131097">Pixabay</a></span>
---

An **asset pipeline** allows software platforms to process certain kinds of files, such as CSS and JavaScript, for maximum efficiency. This is particularly helpful with software that generates web pages, since a website’s performance improves when the site is delivering fewer, smaller, more tightly organized files. It’s even better when an asset pipeline works with **bundler** code that further improves the efficient delivery of the files. For example, bundling can take multiple JavaScript files and convert them into a single, compressed downloadable with all the variables reprocessed as necessary to avoid any naming conflicts.[^1]

Since the release of [version 0.43](https://gohugo.io/news/0.43-relnotes/) in July, 2018, the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG) has had a built-in asset pipeline, called [Hugo Pipes](https://gohugo.io/hugo-pipes/). It had plenty of capabilities at the start, but not true bundling. Then, two years later to the month, Hugo [version 0.74.0](https://gohugo.io/news/0.74.0-relnotes/) enhanced Hugo Pipes by adding the [esbuild bundler](https://esbuild.github.io/), referenced therein as `js.Build`. Like Hugo, esbuild is built on the screaming-fast [Go language](https://go.dev). Just as Go makes Hugo pretty much the fastest-building SSG there is, Go makes esbuild [many times faster than the JavaScript-based bundlers](https://esbuild.github.io/faq/#benchmark-details) which have dominated the field in recent years.[^2]

For example, let’s say you have a 150-page Hugo website. That’ll take less than a second to build. Then let’s say you add some JavaScript files to the site and bundle them using `js.Build`. There’s little or no difference in the build time. By comparison, if you were trying to use a typical JavaScript-based bundler, that build would probably run a minute or longer. Faster is better, especially since a normal development process involves a lot of builds while you get things as you want.

## A breakdown of the bundling

[Hugo’s official documentation for this specific functionality](https://gohugo.io/hugo-pipes/js/) is a bit hit-or-miss in my humble opinion, especially for someone who might be new to it all, so let me offer a simple example of how one might use `js.Build`. As I always say: if **I** can understand it, **you** can, too.

We’ll be bundling two JavaScript files:
- `lazyload_17-5-0.esm.js` is an [ES modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) (ESM) version of the [vanilla-lazyload](https://github.com/verlok/vanilla-lazyload) package for [lazy-loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading) images.
- `instantpage.js` is the [Instant.Page](https://instant.page/) utility, which *pre-fetches* your site’s internal links so they appear to load even more quickly on compatible desktop browsers.[^3]

The file from which we’ll be bundling is `/assets/js/index.js` (Hugo Pipes processes only files in the Hugo project’s or [theme](https://www.mikedane.com/static-site-generators/hugo/installing-using-themes/)’s `assets` directory):

```js
/*
	First, we import the two JS files that
	we're bundling. The `vanilla-lazyload`
	package exports a module, `LazyLoad`,
	so we import it directly.
*/
import LazyLoad from './assets/js/lazyload_17-5-0.esm.js'
import './assets/js/instantpage_5-1-0.js'
// The latter runs Instant.Page directly.

/*
	As for the `LazyLoad` module, we run it
	with one parameter.
	(https://github.com/verlok/vanilla-lazyload)
*/
var lazyLoadInstance = new LazyLoad({
  threshold: 150,
})
```

Then, in the [`baseof.html` template](https://gohugo.io/templates/base/#define-the-base-template) on which Hugo will build the site, we’ll instruct `js.Build` to:

- `Get` that `index.js` file.
- Bundle it into another file, named `bundle.js`, that’ll be in the final build’s `/js` directory.
- [Minify](https://en.wikipedia.org/wiki/Minification_(programming)) the bundle so it’ll load even more quickly, especially after the hosting vendor applies further compression (preferably [Brotli](https://en.wikipedia.org/wiki/Brotli)).
- [Fingerprint](https://gohugo.io/hugo-pipes/fingerprint/) the bundle with the [SHA-256 cryptographic hash function](https://en.wikipedia.org/wiki/SHA-2), so that its final name contains a long hash **and** changes at build time whenever there’s been any change in the code. This facilitates [browser-side cache-busting](https://javascript.plainenglish.io/what-is-cache-busting-55366b3ac022) for one’s visitors’ benefit. The reason I used SHA-256, the default for this feature in Hugo Pipes, was to enable [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) (SRI) and allow me to add the `integrity` part of the `script` call.

Here’s the resulting `baseof.html`:

```go-html-template
{{- $options := dict "targetPath" "js/bundle.js" -}}
{{- $jsBundle := resources.Get "js/index.js" | js.Build $options | resources.Minify | fingerprint -}}

<!DOCTYPE html>
<html lang="en" charset="utf-8">
  {{ partial "head.html" . }}
  <body>
    {{ partial "header.html" . }}
    <div id="content-main-hugo">
    {{- block "main" . -}}{{- end }}
    </div>
    {{- partial "footer.html" . }}
    <script src="{{ $jsBundle.RelPermalink }}" integrity="{{ $jsBundle.Data.Integrity }}" defer></script>
  </body>
</html>
```

## Other uses?

In addition to the simple example I’ve given here, there could be a variety of reasons you’d want to add JavaScript to a Hugo site by using `js.Build`. For example: if you prefer the appearance and configurability of [Prism.js](https://prismjs.com) syntax highlighting to that of Hugo’s [built-in](https://gohugo.io/content-management/syntax-highlighting/) [Chroma](https://github.com/alecthomas/chroma), you could employ `js.Build`, and appropriate CSS, to use Prism.js instead of Chroma.[^4] The point of this post was not to suggest *which* JavaScript (if any) you should add to a Hugo site, but rather to show how easy and efficient the process can be with Hugo Pipes and `js.Build`. Happy bundling.

[^1]:	Although it’s specific to the [webpack](https://webpack.js.org) bundler, you may enjoy the explanation in [Victor Zhou](https://github.com/vzhou842)’s 2019 article, “[Why Webpack? (or, How Not to Serve Javascript)](https://victorzhou.com/blog/why-you-should-use-webpack/),” of why bundling is such a good idea.

[^2]:	One possible exception to that would be the newer [Vite](https://vitejs.dev), which **also** [uses esbuild](https://vitejs.dev/guide/why.html#slow-server-start) (for “pre-bundling”) even though it’s primarily JavaScript-based.

[^3]:	This pre-fetching process, also offered by software such as [Flying Pages](https://github.com/gijo-varghese/flying-pages) and [quicklink](https://github.com/GoogleChromeLabs/quicklink), is similar to how the [Gatsby](https://gatsbyjs.com) SSG [works with internal links to improve perceived site performance](https://www.gatsbyjs.com/guides/why-are-gatsby-sites-fast/).

[^4]:	There are some gotchas in doing that unless you [turn off Chroma](https://discourse.gohugo.io/t/disabling-built-in-chroma/33364). Also, using Prism.js with Hugo means *client-side* handling of syntax highlighting; that can result in an inferior UX, especially for visitors with slower connections (much less those not using JavaScript, whether by choice or because their workplaces complicate the choice). This is as opposed to how most JavaScript-based SSGs use Prism, which usually results in the same preferred *server-side* syntax highlighting that you get with the Hugo/Chroma combo.
