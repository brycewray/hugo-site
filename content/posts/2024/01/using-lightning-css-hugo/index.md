---
title: "Using Lightning CSS with Hugo"
description: "Does Hugo natively support Lightning CSS? No, but there’s a neat workaround for that."
author: Bryce Wray
date: 2024-01-18T13:33:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

Web developers have been ooh-ing and aah-ing for a while now over [Lightning CSS](https://lightningcss.dev/), and well they should. It promises *and delivers* amazingly fast and comprehensive processing of CSS, making poor old [PostCSS](https://postcss.org) look like a comparative piker. In fact, Lightning's stellar performance is even getting it [baked into an upcoming release of Tailwind CSS](https://tailwindcss.com/blog/2023-07-18-tailwind-connect-2023-recap).

The only problem with this coolness for [Hugo](https://gohugo.io) users like me has been that Lightning CSS appears to be strictly for JavaScript-based projects. Fortunately, after stewing over this for a while, I've learned there's a workaround.

<!--more-->

You may be aware that Hugo has long featured [hooks to PostCSS](https://gohugo.io/hugo-pipes/postcss/) as part of the [Hugo Pipes asset pipeline](https://gohugo.io/hugo-pipes/introduction/). While no such connection exists as yet for the far newer Lightning CSS, that access to PostCSS provides a clever way around the issue. This may be particularly helpful for Hugo-using Tailwind fans once TWCSS makes its aforementioned jump to Lightning, but you can use it right now with good old basic CSS.

You see, there's a PostCSS plugin that lets you use Lightning's capabilities: [postcss-lightningcss](https://github.com/onigoetz/postcss-lightningcss).

**<span class="red">Important update, 2024-01-19</span>**: I originally wrote above that this Lightning/PostCSS combo couldn't [bundle files together through `@import` statements](https://lightningcss.dev/bundling.html) unless I added yet another PostCSS plugin, postcss-import --- but I was wrong. The problem was that I hadn't noticed a key [Hugo Pipes option, `inlineImports`](https://gohugo.io/hugo-pipes/postcss/#options), which defaults to `false`. Once I fixed that, Lightning/PostCSS could do `@import`s entirely on its own, without postcss-import. **<span class="red">Therefore, I have edited this post accordingly, including correcting the code below.</span>**
{.box}

Here's how I have it set up within the site. First, there are the add-ons themselves, with the following lines constituting my entire `package.json` at this time:

```json
{
	"devDependencies": {
		"postcss": "^8.4.33",
		"postcss-cli": "^11.0.0",
		"postcss-lightningcss": "^1.0.0"
	}
}
```

Then, within `postcss.config.js` at the top of the Hugo project:

```js
const postcssLightningcss = require("postcss-lightningcss");

module.exports = {
	plugins: [
		postcssLightningcss({
			browsers: ">= 2%",
			lightningcssOptions: {
				cssModules: false,
				drafts: {
					nesting: true,
				}
			}
		}),
	]
}
```

**Later update**: I changed the `browsers` line from the value in this post's initial publication --- `">= .25%"` --- after determining that the styling resulting from that value merely inflated the CSS without providing any real benefit to just about any likely visitor.
{.box}

That's pretty much it. The `lcss` theme just has CSS files --- chiefly a `critical.css` for the above-the-fold stuff and an `index.css` for everything else, with both `@import`-ing the appropriate CSS partials --- and a minimal quantity of Hugo partial templates that call the specific files as follows:

```go-html-template{filename="head-criticalcss.html" bigdiv=true}
{{- $opts := dict "inlineImports" true -}}
{{- $fonts := resources.Get "css/fonts.css" | postCSS -}}
{{- with $fonts }}
	<link rel="preload" as="font" href="/fonts/LibreFranklin-Roman-VariableFont_subset.woff2" type="font/woff2" crossorigin>
	<link rel="preload" as="font" href="/fonts/LibreFranklin-Italic-VariableFont_subset.woff2" type="font/woff2" crossorigin>
	<style media="screen">{{ .Content | safeCSS }}</style>
{{- end }}
{{- $css := resources.Get "css/critical.css" | postCSS $opts }}
{{- with $css }}
	<style media="screen">{{ .Content | safeCSS }}</style>
{{- end }}
```

```go-html-template{filename="head-css-unscoped.html" bigdiv=true}
{{- $opts := dict "inlineImports" true -}}
{{- $css := resources.Get "css/index.css" | postCSS $opts -}}
{{- if hugo.IsProduction -}}
	{{- $css = $css | fingerprint -}}
{{- end -}}
{{- with $css }}
	<link rel="preload" href="{{ $css.RelPermalink }}" as="style"{{- if hugo.IsProduction -}} integrity="{{ $css.Data.Integrity }}" crossorigin{{- end -}}>
	<link rel="stylesheet" href="{{ $css.RelPermalink }}" type="text/css" media="screen"{{- if hugo.IsProduction -}} integrity="{{ $css.Data.Integrity }}" crossorigin{{- end -}}>
{{- end }}

{{- /* for those who've requested CSS for printing */ -}}
{{- $printCSS := resources.Get "css/print.css" | postCSS -}}
{{- if hugo.IsProduction -}}
	{{- $printCSS = $printCSS | fingerprint -}}
{{- end -}}
{{- with $printCSS -}}
	<link rel="stylesheet" href="{{ $printCSS.RelPermalink }}" type="text/css" media="print"{{- if hugo.IsProduction -}} integrity="{{ $printCSS.Data.Integrity }}"{{- end -}}>
{{- end }}
```

From there, I run my usual Hugo dev or build commands and everything just works. Although using *ordinary* PostCSS stuff with Hugo can often be sluggish (likely due to PostCSS's JavaScript overhead), the Lightning/PostCSS combo's speed is amazing. In fact, in Hugo's dev mode, Lightning/PostCSS seems to work within Hugo Pipes about as quickly as *Dart Sass*, which I wouldn't have believed if I hadn't seen it for myself. Keep in mind that what Lightning is doing here involves bundling, [transpilation](https://lightningcss.dev/transpilation.html), and [intelligent minification](https://lightningcss.dev/minification.html) --- all at, yep, lightning speed.

I am impressed, and think you might be, as well. I also suspect, or at least hope, this augurs well for the [Hugo team's future efforts](https://discourse.gohugo.io/t/hugo-pipes-and-tailwind-s-upcoming-oxide-engine/47802) to make the Lightning-enhanced Tailwind work as smoothly with Hugo as the current Tailwind has since [last May's release of Hugo v.0.112.0](https://github.com/gohugoio/hugo/releases/tag/v0.112.0). We Shall See.™
