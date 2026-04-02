---
title: "Hugo’s new CSS powers"
description: "A recent update can make it easier than ever to style your site, depending on how you want to do that styling."
author: Bryce Wray
date: 2026-04-02T12:19:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

As I mentioned in my [previous post](/posts/2026/03/mixed-nuts-17/), I was intrigued when the release of [Hugo](https://gohugo.io) [v.0.158.0](https://github.com/gohugoio/hugo/releases/tag/v0.158.0) introduced its [`css.Build`](https://gohugo.io/functions/css/build/#article) function. The new powers that resulted are worth a look when you consider all the aspects of styling a site you've built, or plan to build, on Hugo. Still, the enhancements have certain limitations of which you'll also want to be aware.

<!--more-->

When forming the styling structure for a Hugo-based website, you have a variety of options. CSS itself has gained many additional features over the years, and browsers have improved to handle them.

For example, it wasn't so long ago that simply nesting your CSS like this . . .

```css
.my-div {
	background-color: #ffffaa;

	h1 {
		font-size: 2rem;
		color: #005500;
	}

	p {
		font-size: 0.75rem;
	}
}
```

. . . required [pre-processing](https://developer.mozilla.org/en-US/docs/Glossary/CSS_preprocessor) through [Sass](https://sass-lang.com) or [post-processing](https://www.cssmine.com/ebook/postprocessing) through something like [PostCSS](https://postcss.org) or [Lightning CSS](https://lightningcss.com); but, now, you can deliver CSS in production just like you see above, and any browser compatible with [Baseline 2023](https://web.dev/baseline/2023) will display it as you intend. **However**, unless you're sure everyone in your site's target audience is using a sufficiently updated browser, you have to adapt your site's production styling accordingly --- manually by using only pre-2023 vanilla CSS, or automatically through Sass-processed CSS or using a post-processor to [*transpile*](https://crystallize.com/answers/tech-dev/compiling-vs-transpiling) modern CSS for compatibility with older browsers. That post-processing is one way that `css.Build` shines (mostly; more on that in a little while).

Unless your site's styling is very simple, you may want to [organize your CSS into multiple files](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Organizing#break_large_stylesheets_into_multiple_smaller_ones). If so, you then must determine how best to deliver all that CSS in production. Of course, your HTML can just link to multiple stylesheets, but it's often better to combine multiple CSS files, especially for [critical CSS](https://www.smashingmagazine.com/2015/08/understanding-critical-css/#what-is-critical-css), into one production-side *bundle*. That, too, formerly required one or more external packages, but CSS-bundling is another advantage `css.Build` can give you.

Also, you almost certainly want to *minify* your CSS for production. Although Hugo's long been able to do that for CSS, as it [does for other delivered files](https://gohugo.io/functions/resources/minify/), `css.Build` now provides another way to do it for just CSS.

All that said, `css.Build` has some gotchas which you'll need to take into account when assessing whether this feature can be your sole "helper" where CSS is concerned rather than having to use, say, Sass in development and/or PostCSS on the production side.

What it comes down to is that you must make a judgment call about which newer-style CSS features your site may require. Since `css.Build` works atop the [esbuild package](https://github.com/evanw/esbuild), the best source for what `css.Build` can and can't do in this regard is the actual [CSS-specific documentation](https://esbuild.github.io/content-types/#css) for esbuild itself; this information lists the features for which esbuild performs either transpilation or [browser-prefixing](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix). And, even when armed with this knowledge, you still must **test** how/whether `css.Build` converts all the newer-style CSS you wish to deploy.

For those items which esbuild (and, thus, `css.Build`) currently can't convert to your liking, you're left with two choices: (a.) add some post-processing that will fill in the gaps; or (b.) decide to target only those browser versions that "know" those CSS items. While deciding, you'll appreciate the convenience of tools like the [Browserslist playground](https://browsersl.ist/) and the [Baseline](https://web.dev/baseline/)-specific [list of supported browsers](https://web-platform-dx.github.io/web-features/supported-browsers/).[^B2024]

[^B2024]: For my own lightly visited, non-commercial site with its relatively simple styling, I've determined that [Baseline 2024](https://web.dev/baseline/2024) will suffice; but those of you with more heavily visited sites, especially if they're commercial in nature, may well want to use additional post-processing to accommodate older and/or less commonly used browser versions.

<!--https://discourse.gohugo.io/t/hugo-v0-158-0-released/56868/6-->

Such limitations notwithstanding, `css.Build`'s other capabilities that I mentioned above can reduce or eliminate your needs for other CSS processors. Bundling and minification work right out of the box. And, best of all, `css.Build` works *very* quickly, which is an especially big advantage during development. The bigger your site and the more CSS you're using, the more you'll appreciate the speed of `css.Build`.

Perhaps, after thinking through all this, you decide `css.Build` might just work for your site. Other than those specific CSS gotchas we already mentioned above, what else, if anything, would you lose by going with just a vanilla-CSS-and-`css.Build` solution? To help answer that, let's conclude by looking at the alternatives as you would use them in Hugo:

- **Sass pre-processing** (involves writing `.scss` or `.sass` files, rather than `.css` files)
	- Requires [use of the Dart Sass binary](https://gohugo.io/functions/css/sass/#dart-sass) (**but** works smoothly and very quickly with [Hugo Pipes](https://gohugo.io/hugo-pipes/)).
	- Provides no browser-prefixing. Remember, it's a **pre**-processor. For that, you need to use Sass **and** a post-processor, which adds more complexity and likely slows down your work, especially in development.
	- Lets you nest your styling , but [currently](https://sass-lang.com/blog/sass-and-native-nesting/) doesn't support native CSS nesting --- which may not matter to you if your styling code is all-Sass anyway.
	- Provides bundling through Sass's [`@use`](https://sass-lang.com/documentation/at-rules/use/) command.
	- Performs minification through the ["compressed" `outputStyle` option](https://gohugo.io/functions/css/sass/#outputstyle).
	- Offers [math functions](https://sass-lang.com/documentation/modules/math/), [logical functions](https://sass-lang.com/documentation/syntax/special-functions/#if), and [mixins](https://sass-lang.com/documentation/at-rules/mixin/) --- some or all of which either [already are](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units/Using_math_functions#advanced_css_math_functions), or [might](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/if) [become](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Custom_functions_and_mixins), part of Baseline CSS at some point in the not-too-distant future.

- **PostCSS post-processing**
	- [Works well with Hugo Pipes](https://gohugo.io/functions/css/postcss/) but, due to PostCSS's JavaScript foundation, is **much** slower than the other options described here.
	- Uses various [plugins](https://postcss.org/docs/postcss-plugins) to:
		- Perform transpilation, polyfills, and browser-prefixing for older browsers.
		- Provide bundling through a plugin's interpretation of CSS's [`@import`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import) command.
		- Perform minification.

- **Lightning CSS post-processing**
	- Must be ["shoehorned" into Hugo](/posts/2024/02/using-lightning-css-hugo-without-workarounds/). Also, Lightning CSS [has no file-"watching" capability](https://github.com/parcel-bundler/lightningcss/issues/126) for use during development, so that, too, must be part of the "shoehorning."[^JS] To be fair, though, the Rust-based Lightning CSS is very fast (although not as fast as either `css.Build` or Dart Sass) when properly "shoehorned."
	- Performs transpilation, polyfills, and browser-prefixing for older browsers.
	- Provides bundling through Lightning CSS's interpretation of CSS's `@import` command.
	- Performs minification.

[^JS]: This is as opposed to how Lightning CSS works with some other static site generators, [especially](https://lightningcss.dev/docs.html#with-vite) if [Vite](https://vite.dev/) is involved.
