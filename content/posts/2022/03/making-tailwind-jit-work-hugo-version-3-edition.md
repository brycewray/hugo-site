---
layout: singlepost
title: "Making Tailwind JIT work with Hugo, the Version 3 edition"
subtitle: "Another version, another end run"
description: "A Hugo fix for Tailwind CSS v.3—with a surprise bonus."
author: Bryce Wray
date: 2022-03-06T16:16:00-06:00
#lastmod:
discussionId: "2022-03-making-tailwind-jit-work-hugo-version-3-edition"
featured_image: "2021-11-21_screenshot_TWCSS-on-Hugo_enlgd_3254x1564.png"
featured_image_width: 3254
featured_image_height: 1564
featured_image_alt: "Screen capture from Hugo showing HTML with Tailwind CSS styles"
#featured_image_caption:
---

{{% disclaimer %}}

This is a follow-up to my post from a few months back, "[Making Tailwind JIT work with Hugo](/posts/2021/11/making-tailwind-jit-work-hugo/)." The code I suggested in that post worked fine when [Tailwind CSS](https://tailwindcss.com) was still in Version 2.x, but things got a little more complicated when [Tailwind 3.0 appeared](https://tailwindcss.com/blog/tailwindcss-v3) just a few weeks later.

So, [as Daffy Duck would say](https://looneytunes.fandom.com/wiki/Rabbit_Fire_(transcript)), "let's try that again." And, spoiler alert: if you prefer to style your [Hugo](https://gohugo.io) site with [Sass/SCSS](https://sass-lang.com), I'll have some good and surprising news for you, too.

## A recap of JIT-on-Hugo woes

Perhaps you've already read the earlier post and thus don't need a total recap of the problem that occasioned it; but, just in case, here's a TL;DR version:

- [The release of Tailwind 2.1](https://tailwindcss.com/blog/just-in-time-the-next-generation-of-tailwind-css) added **just-in-time (JIT) functionality** to the framework. This eliminated one of its biggest drawbacks up to that point. Before then, Tailwind would generate gigantic CSS files which required an occasionally problematic *purging* process to become suitable for distribution. With JIT---at that time, an opt-in feature---Tailwind created only enough CSS to handle whichever files you were having it "watch." In short, its CSS now was starting small and building up, rather than starting elephantine and trying to shrink.
- This was a great improvement, but some apps didn't play so cheerfully with Tailwind JIT, and one of them was Hugo. Tailwind-with-JIT either would lock up Hugo or cause it to crash, in each case because Tailwind couldn't find a [`stdin`](https://www.computerhope.com/jargon/s/stdin.htm) file. This would later turn out to be an issue with [PostCSS](https://postcss.org), on which Tailwind typically depends.
- A few months later, Hugo user [Praveen Juge](https://github.com/praveenjuge) cooked up an ingenious workaround, about which he wrote in "[Use Tailwind JIT with Hugo](https://praveenjuge.com/blog/use-tailwind-jit-with-hugo/)." It made use of a Tailwind 2.x capability that allowed **not** using PostCSS, thus avoiding the problem.
- However, Juge's approach, which he demonstrated in a [deliberately bare-bones Hugo project](https://github.com/praveenjuge/hugo-tailwind-jit), presented some issues when I tried adding it to an existing Hugo repo.
- Then, as I explained in that aforementioned [earlier post](/posts/2021/11/making-tailwind-jit-work-hugo/), I poked around with Hugo, Juge's approach, and Tailwind 2.x until I managed to make everything work together. I didn't care at all for the way this method forced me to restructure my CSS[^CSSmess] but, hey, it produced the final result I wanted.

[^CSSmess]: Please understand that this unwanted result was **not** due to Juge's method, but rather because of the pecularities of how [`postcss-import`](https://github.com/postcss/postcss-import) and Tailwind worked together. And, yes, even though we were going around Tailwind in this endeavor, `postcss-import` was still in play.

That's where things stood as of November 1, 2021. Then, a little over a month later, Tailwind Labs released Tailwind **3.0**, with JIT now an opt-*out* feature; but JIT still wasn't truly Hugo-okay without the Juges-inspired workaround. Testing revealed that the solution I'd described, slightly adjusted, was still workable. Yet, I remained convinced there should be a better way, one that didn't require what I considered to be mangling of my CSS file structure.[^HugoOfficial]

[^HugoOfficial]: This is in the absence of a truly official fix on Hugo's end, which continues to be pushed further out into the project's [milestones](https://github.com/gohugoio/hugo/milestones).

## Breakthroughs

In January, the releases of Tailwind CSS [3.0.10](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.0.10) and its [tweak](https://github.com/tailwindlabs/tailwindcss/issues/6894) in [3.0.11](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.0.11) finally gave Tailwind users the [ability to get past the `stdin` issue](https://github.com/tailwindlabs/tailwindcss/pull/6876). That is, it did **if** they were using **[Node.js](https://nodejs.org) v.16.x**.

Why that last caveat? As my earlier post on the subject recounted, it turned out that the `stdin` glitch with some apps stemmed from Tailwind's use of Node's `fs.statSync()` method. While [Node v.14.x was supposed to have been better in this respect](https://github.com/tailwindlabs/tailwindcss/issues/6894#issuecomment-1017133875), it's [since turned out](https://github.com/Gioni06/hugo-pipes-tailwind-3/issues/1) that, at least for the whole Tailwind-JIT-on-Hugo mess, Node 16+ allows everything to be sweetness and light.

Well, almost. You knew that was coming, didn't you?

With all of these adjustments in place, Hugo and Tailwind JIT now worked together fine **in production**. However, Juges soon [reported](https://github.com/gohugoio/hugo/issues/8343#issuecomment-1006287938) that, if using this setup in **development**, Hugo "doesn't watch for \[CSS] file changes." This indicated that the [Hugo Pipes assets pipeline](https://gohugo.io/hugo-pipes/) wasn't "seeing" what Tailwind was doing whenever there were edits to the site's CSS.

Fortunately, [Jonas Duri](https://github.com/Gioni06) had been following the whole saga and, soon thereafter, [wrote on Dev.to](https://dev.to/jonas_duri/how-to-use-tailwindcss-30-without-external-npm-scripts-just-hugo-pipes-2lg9) to offer a solution and an accompanying [sample repo](https://github.com/Gioni06/hugo-pipes-tailwind-3). I encourage you to read his article and view the repo for a fuller picture, but here is a quick summary of how his extremely clever method works:

- Use Tailwind as a PostCSS plugin, after all. This is a friendlier method for Hugo Pipes' purposes than going a non-PostCSS route because it lets your project manage the CSS through `resources.PostCSS`, as the Hugo gods intended.[^faster]
- Then, to force Hugo Pipes to trigger a site rebuild when your CSS changes, make Hugo do the following:
	- Interact with your CSS input file (*e.g.*, `assets/css/index.css`) as if it were a *template*, via Hugo's [`resources.ExecuteAsTemplate` pipe](https://gohugo.io/hugo-pipes/resource-from-template/).
	- Generate a random string with each Tailwind generation of the CSS file and pass it into the resulting template as part of the CSS file's name. Duri's method uses the [`now.UnixMilli` function](https://gohugo.io/functions/unix/) (present since [Hugo 0.88.0](https://github.com/gohugoio/hugo/releases/tag/v0.88.0)), to inject a time-based string.

[^faster]: I might add that, at least **apparently**, it also makes the whole Tailwind-on-Hugo dev process a little faster than with Juge's original "Tailwind-without-PostCSS" approach. Perhaps that's because it is, indeed, going through the preternaturally fast Hugo Pipes.

Brilliant. Bravo.

I finally got around to trying this method a few days ago. While production builds went lickity-split as always, I noticed that attempting it on a large Hugo project in development mode resulted in a seeming "hang" **and**, most alarmingly, extremely high activity (and resulting high temperatures) for my computer's CPU. Fortunately, I soon found an explanation and remedy, in the form of a [GitHub comment by Ingo Struck](https://github.com/gohugoio/hugo/issues/8343#issuecomment-1019383325):

> When using&nbsp;.&nbsp;.&nbsp;. \[this method], I would recommend that you put this into a **separate [partial](https://gohugo.io/templates/partials/)** that is included using [`partialCached`](https://gohugo.io/troubleshooting/build-performance/#cached-partials). Otherwise the build times grow for larger sites due to excessive rebuilds. With a separate partial this could be reduced to one rebuild per cycle (or per cycle and language). *\[Emphasis and links added.]*[^partialC]

[^partialC]: Incidentally: `partialCached` is an especially valuable Hugo tool for any project that's gotten big over time, dramatically reducing the development time on both Hugo and your device. Let's say you're working on your site with `hugo server` running, causing lots of rebuilds as you change various files. If you have a partial template (*e.g.*, for your site's navigation menu) that never changes from one build to the next, there's no point in forcing Hugo to rebuild it every single time. And, on a large site, you can only imagine how **non**-cached Tailwind stuff, with all those thousands of entries across God knows how many template (and resulting HTML) files, will tax your computer. Struck's use of `partialCached`, here, was superbly apt.

Struck's comment proved to be the final bit of information I needed to put together what follows.

## The code

I'll give you two versions of the `css.html` partial; they vary according to the *production*-side CSS output. One produces **external** CSS, while the other produces **internal** CSS---*i.e.*, `head`-based `<style></style>` stuff. In *development*, each works off Duri's method and produces an external CSS file with a name that changes every time you change any of the CSS that Tailwind is processing.

First, the version for *external* CSS in production:

```go-html-template
{{ $styles := resources.Get "css/index.css" }}
{{ $styles = $styles | resources.PostCSS }}
{{ if hugo.IsProduction }}
  {{ $styles = $styles | minify | fingerprint | resources.PostProcess }}
{{ else }}
  {{ $styles = $styles | resources.ExecuteAsTemplate (printf "css/index.dev.%v.css" now.UnixMilli) .}}
{{ end }}
<link href="{{ $styles.RelPermalink }}" rel="stylesheet" />
```

And then, the one for *internal* CSS in production:

```go-html-template
{{ $styles := resources.Get "css/index.css" }}
{{ $styles = $styles | resources.PostCSS }}
{{ if hugo.IsProduction }}
  {{- with $styles -}}
    <style>{{- .Content | safeCSS -}}</style>
  {{- end -}}
{{ else }}
  {{ $styles = $styles | resources.ExecuteAsTemplate (printf "css/index.dev.%v.css" now.UnixMilli) .}}
  <link href="{{ $styles.RelPermalink }}" rel="stylesheet" />
{{ end }}
```

To wrap up, regardless of which `css.html` partial you're using, you now just put the following in your site's `head` and you're home free:

```go-html-template
{{ partialCached "css.html" . }}
```

As before, the `postcss.config.js` file for the project looks like this (with the [`postcss-import`](https://github.com/postcss/postcss-import) package installed, of course):

```js
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
  }
}
```

And, for me, one of the biggest benefits of doing Tailwind-on-Hugo this way is the freedom to ditch the uglified CSS conflagration I described in my earlier post in favor of something similar to this  simplified[^importPath] example:

[^importPath]: I still have to include the full project path to each bespoke CSS file for the sake of `postcss-import` (at least it "knows" where the `tailwindcss` files are). I don't know if that would be different if I didn't have `postcss.config.js` in the project root.

```css
/* the contents of index.css */
@import '/themes/twcss/assets/css/codeblocks.css';
@import 'tailwindcss/base';
@import '/themes/twcss/assets/css/global.css';
@import '/themes/twcss/assets/css/myutils.css';
@import '/themes/twcss/assets/css/nav.css';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

.&nbsp;.&nbsp;. with the various CSS components all in their own separate files as I prefer.

## A surprise for Sass supporters

Finally, here's that extra I promised you Sass-on-Hugo fans: a slight variation on this approach **also** makes it possible to use **Dart Sass** on Hugo, with **any** Hugo-supporting hosting vendor! That's a biggie[^DartSassEmbedded]---as I'll explain in a future post, after I finish running a few more tests to make sure my eyes aren't deceiving me.

Stay tuned.

[^DartSassEmbedded]: In the meantime: in case you haven't been following the long-running discussion about using Dart Sass with Hugo instead of the [deprecated LibSass](https://sass-lang.com/blog/libsass-is-deprecated), check [this Hugo Discourse thread](https://discourse.gohugo.io/t/using-dart-sass-hugo-and-netlify/37099) for starters.
