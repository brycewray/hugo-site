---
title: "Using Lightning CSS with Hugo: back to the workaround"
description: "Why a clear separation between dev mode and prod mode made sense."
author: Bryce Wray
date: 2024-02-18T13:14:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

[First](/posts/2024/01/using-lightning-css-hugo/), I added [Lightning CSS](https://lightningcss.dev) to my [Hugo](https://gohugo.io) site through a [plugin](https://github.com/onigoetz/postcss-lightningcss) for [PostCSS](https://postcss.org). [Then](/posts/2024/02/using-lightning-css-hugo-without-workarounds/), I opted for using a strictly CLI-based approach. [Most recently](/posts/2024/02/purgecss-joins-my-new-styling-stack/), I added [PurgeCSS](https://purgecss.com) to the resulting CLI-powered styling stack.

I've now decided to backtrack a bit --- I *would* say, "for sanity's sake," except that any of you who are past consumers of my content would recognize that as too ironic in my case, so I won't. Let's just say that it was for the sake of easier maintenance.

<!--more-->

Before I get into the "why" of this post, let me give you its "what" . . .

I've gone back to accessing the powers of Lightning CSS through a PostCSS plugin, **and** I'm now also bringing in PurgeCSS through a PostCSS [plugin](https://github.com/FullHuman/purgecss/pkgs/npm/postcss-purgecss) --- **but** all of this is in **production** mode **only**. On the other hand, during **development**, I'm keeping things quick by returning to what I previously described as "Embedded [Dart Sass](https://sass-lang.com/dart-sass/), for which [Hugo's built-in asset pipeline is optimized](https://gohugo.io/hugo-pipes/transpile-sass-to-css/)."

In fact, that quote comes from when I [compared the speeds of the three methods I'd tried](/posts/2024/02/using-lightning-css-hugo-without-workarounds/#breaking-off-the-shackles). For each case, this was in *development* mode, since the *build*-time differences among them not only were relatively small but mostly meaningless to me (*i.e.*, since I wasn't waiting for Hugo to rebuild a page while I changed the styling thereof). It was clear that, in development mode, Hugo and Sass always would be superior. Still, Sass couldn't match most of Lightning CSS's neat processing tricks, so my choice seemed clear.

Or, at least, it did *until* I began thinking about how complicated I'd made things.

As I explained in the earlier posts, the CLI-based method required keeping my *real* styling files in an `assets/css-originals` folder for Lightning CSS (and, later, PurgeCSS) to access for processing into the `assets/css` folder Hugo would "watch" in dev mode. However, because Lightning CSS lacks its own "watch" capabilities, I ended up using the [npm-watch](https://github.com/M-Zuber/npm-watch) package for that.

All of this meant I'd ended up with `package.json` scripts like this:

```json{bigdiv=true}
"dev:lcss": "lightningcss --bundle --targets \"$npm_package_config_targets\" themes/lcss/assets/css-original/*.css --output-dir themes/lcss/assets/css",
"start": "NODE_ENV=development npm-run-all clean:* dev:lcss --parallel dev:hugo watch"
```

As I acknowledged, I'd ended up with a "Franken-config"; and, its complexity aside, it also was much more external to normal Hugo workings than I preferred. In fact, in that way, it was even more of a workaround than had been using the PostCSS plugin. But was there a way to go back to a simpler, more "true Hugo" process while still keeping the advantages of Lightning CSS *and* not incurring the performance slowdowns of PostCSS?

The answer began to reveal itself while I researched the addition of PurgeCSS to the mix.

I ran across a [Hugo Discourse forum discussion](https://discourse.gohugo.io/t/trouble-with-purgecss/45501) from last year, in which [Joe Mooring](https://github.com/jmooring) of the Hugo project suggested the use of the [serve](https://github.com/vercel/serve) package for local viewing of production-mode Hugo content. Heretofore, I'd always just run `hugo server` with the `--production=environment` flag for such a purpose, but it turns out that doesn't play well with certain  Hugo functions (such as [`resources.PostProcess`](https://gohugo.io/functions/resources/postprocess/)). Besides, once I tried using serve with a Hugo build, I found I liked it better than my previous method; *e.g.*, it gave me a superior *and* more easily obtained preview of how my [search page](/search/) was going to look and function when posted to the web.

In short, *I'd fully separated development from production*. And I liked it better that way.

Then, yesterday, it hit me: just such a separation was the answer. Instead of trying to contort my config so that development mode would have all the styling powers of a production build, as I'd done up to that point, I'd simply handle styling in as bare-bones a way as possible in development, and then add all of the other stuff only in production. Then, with the serve package, I could get an absolutely precise look at the true, final result before actually deploying the site.

So here's what I'm now doing:

1. **In development**, I use Sass for my styling. This eliminates the need for a separate `css-original` folder, while also providing [Sass's own cool features](https://sass-lang.com/guide/) (and thus *not* requiring any dev-mode help from PostCSS).
2. **In production**, I do a Hugo build, running the Sass-transpiled CSS through PostCSS (also [well-wired into Hugo](https://gohugo.io/hugo-pipes/postcss/)), through which it gets the benefits of both Lightning CSS and PurgeCSS.
3. Finally, I use the serve package to preview the resulting build before deployment.

In my templating, the dev-prod separation results in something like this:

```go-html-template{bigdiv=true}
{{- $scssOptions := dict "transpiler" "dartsass" -}}
{{- $css := resources.Get "scss/index.scss" | toCSS $scssOptions -}}
{{- if hugo.IsProduction -}}
	{{- $css = $css | postCSS | fingerprint -}}
{{- end }}
```

. . . in concert with the PostCSS config:

```js{filename="postcss.config.js" bigdiv=true}
// all of this is for production only

const purgeCSS = require('@fullhuman/postcss-purgecss')
const postcssLightningcss = require("postcss-lightningcss")

module.exports = {
	plugins: [
		purgeCSS({
			config: "./purgecss.config.js"
		}),
		postcssLightningcss({
			browsers: "defaults", // per https://browsersl.ist/
			lightningcssOptions: {
				minify: true,
				cssModules: false,
				drafts: {
					nesting: true // for whenever Sass starts "emitting" it (https://www.brycewray.com/posts/2023/03/sass-coming-native-css-nesting/)
				}
			}
		})
	]
}
```

You'll note that the separate `purgecss.config.js` file is still around. It's grown somewhat since the [previous post](/posts/2024/02/purgecss-joins-my-new-styling-stack/#the-code), as I've found more items that need whitelisting, but it otherwise has retained the overall structure I originally described.

As for the `package.json` scripting, this change has freed me of the gyrations required to build a separate `assets/css` with the stuff for CLI-based tools to process. Instead, the Hugo/PostCSS connection handles that internally, and only in production.

In fact, if I chose, I now could do without `package.json` scripting altogether and just use ordinary Hugo commands. That said: for the time being, I'll stick with what I have. After all, it's not as if I could lose `package.json` itself, since I'm using packages that reside in `node_modules`.

It's early but, so far, I'm really pleased with how this turned out. It seems to be a true best-of-both-worlds, win-win kind of setup. Not only do I get to continue styling my site with CSS that's been enhanced by intelligent tools; I also once again have a simpler config *and* the fast dev-mode operation for which Hugo is renowned, yet with few or no penalties on Hugo's equally famous build speed.

**Update, 2024-02-19**: Well, I guess it was **too** early. A few hours after I initially issued this post, I ran into some aggravations that led to my returning to the "Franken-config" for a while, after which I decided on a strictly CSS/PostCSS approach --- *i.e.*, without Lightning CSS. (Because I thus could no longer rely on Lightning CSS's ability to `@import` separate CSS files into one, I resorted to using Hugo's [resources concatenation feature](https://gohugo.io/functions/resources/concat/) to eliminate dev-mode slowness. While I could have used Hugo's [`inlineImports` capability](https://gohugo.io/functions/resources/postcss/#options), its requirement for PostCSS would've resulted in much slower dev-mode performance.)\
\
And, just to be clear: the Sass/PostCSS config I described in this post definitely works, but I un-did it for reasons whose explanation *may* justify another post somewhere down the line. For now, suffice it to say that I grew unhappy with the apparently lackadaisical pace of updates and releases for several items on which the Sass/PostCSS config depended. I opted instead for a styling stack over which I could exercise more selection of, and control over, certain dependencies I'd otherwise have accessed downstream from other packages.
{.box}
