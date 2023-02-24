---
title: "Sorta scoped styling in Hugo, take two"
description: "I had the right idea but not the right approach. Here’s a better one."
author: Bryce Wray
date: 2023-01-19T15:52:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

I gave up on my [earlier](/posts/2022/06/sorta-scoped-styling-hugo/), [Rube Goldberg](https://en.wikipedia.org/wiki/Rube_Goldberg_machine)-esque attempt to achieve [scoped styling](https://css-tricks.com/saving-the-day-with-scoped-css/) after finding it too convoluted to maintain. Fortunately, I've now stumbled on a much simpler way to get there.

<!--more-->

<strong class="red">Important</strong>: Be sure to check the [**Update** at the bottom](/posts/2023/01/sorta-scoped-styling-hugo-take-two/#update-2023-01-29).
{.box}

## Anal-ysis

As I explained in last year's "[Sorta scoped styling in Hugo](/posts/2022/06/sorta-scoped-styling-hugo/)," I wanted to achieve some form of scoped styling within this [Hugo](https://gohugo.io)-powered website. That goal was laudable, but the same couldn't be said about the sadly anal approach I chose for achieving it:

- First, I tagged each of my hundreds of posts according to which content types they contained --- *e.g.*, code blocks, video embeds, and so on.
- Next, I broke down my one big [Sass](https://sass-lang.com) styling file, `index.scss`, into many separate files specific to the content types. And, when I say *specific*, I mean it: I had one file for a post that had both images and social media embeds, another for a post with all those **and** tables, and on it went. Going even further down the rabbit hole, I decided that each file would **then** [`@use`](https://sass-lang.com/documentation/at-rules/use) one or more [Sass partials](https://sass-lang.com/guide#topic-4) to do its work. By the time I'd finished, I had over two dozen Sass files in play. Jeeeeeeez.
- Finally, within the site repo's `head.html` [Hugo partial](https://gohugo.io/templates/partials/), I added conditionals that would present the tag(s)-appropriate Sass file(s) for each post.

While all of this worked, I soon abandoned it, as I described in a subsequent update:

> Consider this now an abandoned experiment. I went with it for a couple of weeks, but, in the end, decided to revert to my previous definitely-**not**-scoped configuration after seeing that *this* method hampered attempts to make certain styling changes --- that is, *without* invoking chaos which wasn't worth my time to resolve. Perhaps you'll have better luck with it.

## Blind squirrel, meet acorn

Then, a few days ago, while experimenting with a [Tailwind CSS](https://tailwindcss.com) theme for [another post](/posts/2023/01/static-mastodon-toots-hugo-tailwind-css-edition/), I stumbled onto a method that also worked **yet** *didn't* require the tags, or the ridiculously large spider's web of Sass files, or the associated hassle. While I initially did it just to limit the size of the Tailwind file, I soon realized it also was a superior, much more idiot-proof way to get the scoped styling I'd previously tried to achieve in Sass.

It broke down like this.

- Based on the Sass partials I'd already been using, I created Hugo `head` partials (sub`head`s, you might say) for each of the following types of content:
	- Code, both code blocks and inline code (like `this`)
	- Web fonts
	- Footnotes
	- [Home page](/) content
	- Embeds of YouTube videos
	- Embeds of [Mastodon](https://joinmastodon.org) content
	- The site's [HTML sitemap](/sitemap/)
	- Tables
- For each such Hugo partial, I used a conditional to identify the content in question. For example, some partials use Hugo's [`findRE` function](https://gohugo.io/functions/findre/) to locate specific HTML output within the [`.Content`](https://gohugo.io/variables/page/#page-variables), while others (such as the one for the home page) check for a page's [`.Title`](https://gohugo.io/variables/page/#page-variables).
- I converted some Sass partials to regular, standalone Sass files.
- Each Hugo partial's conditional, if satisfied, would then call the appropriate standalone Sass file and run it through [Hugo Pipes](https://gohugo.io/hugo-pipes/scss-sass/) to produce the final CSS for the website.
- Of course, as before, there would be global styling, supplied by two Sass files --- one for the web fonts and one for the remaining globally needed styles. This modular approach will make it easier later, should I decide either to use a different set of web fonts or opt instead for the [system fonts stack](/posts/2018/10/web-typography-part-2/).

Here's a simplified[^CFP] version of one of the Hugo "sub`head`" partials, the `head-css-social.html` file which looks for Mastodon embeds. The only difference in the conditional between the production output and the local-development (`if .Site.IsServer`) output is that the former is compressed.

[^CFP]: The real one has stuff specific to my use of a [Content Security Policy](https://content-security-policy.com), so I deleted it from this example in order to limit the visual clutter.

```go-html-template
{{- $compOutput := (dict "outputStyle" "compressed") -}}

{{- $cssSocial := "" -}}
{{- $optionsSocial := (dict "transpiler" "dartsass" "targetPath" "css/social.css") -}}
{{- $optionsSocialComp := merge $optionsSocial $compOutput -}}

{{- if (findRE `<blockquote class="toot-blockquote"` .Content 1) -}}
	{{- if hugo.IsProduction -}}
		{{- $cssSocial = resources.Get "scss/social.scss" | resources.ToCSS $optionsSocialComp | fingerprint "md5" -}}
		<link rel="preload" as="style" href="{{ $cssSocial.RelPermalink }}">
		<link rel="stylesheet" href="{{ $cssSocial.RelPermalink }}" type="text/css">
	{{- else if .Site.IsServer -}}
		{{- $cssSocial = resources.Get "scss/social.scss" | resources.ToCSS $optionsSocial | fingerprint "md5" -}}
		<link rel="preload" as="style" href="{{ $cssSocial.RelPermalink }}">
		<link rel="stylesheet" href="{{ $cssSocial.RelPermalink }}" type="text/css">
	{{- end }}
{{- end }}
```

. . . and here's how the main `head.html` partial calls them all:

```go-html-template
{{- partialCached "head-css-fonts.html" . }}
{{- partial "head-css-social.html" . -}}
{{- partial "head-css-code.html" . }}
{{- partial "head-css-tables.html" . }}
{{- partial "head-css-lite-yt.html" . }}
{{- partial "head-css-footnotes.html" . -}}
{{- partial "head-css-home.html" . -}}
{{- partial "head-css-sitemap.html" . }}
{{- partial "head-css-search.html" . }}
{{- partialCached "head-css.html" . }}
```

(To save some processing power during development, I can use Hugo's [`partialCached`](https://gohugo.io/functions/partialcached/) function with the first and last entries because they apply to every page on the site and, thus, neither have nor need content-seeking conditionals.)

Unlike the ordeal of months ago, putting all this into practice took literally only a few minutes per each separate type of content (the similarities among the various Hugo partials made it even easier to create new ones), thanks in no small part to the always amazing speed and stability of Hugo.

As for whether the results were worth it: use your browser's Inspector tool as you skim through the site; and notice how the CSS files load, and *which* CSS files load, based on what's on each page. While this isn't (yet) a true [critical CSS](https://web.dev/extract-critical-css/) approach, it shows a dependencies-free way to get closer to one.

----

## *Update, 2023-01-29*

Over the next couple of weekends, I put in some more thinking and research about this. It turns out the better solution is to put the critical CSS in *internal* CSS (wherein the styling is in a `style` block within the `head` section), while loading all the conditional styling as external CSS files.[^critical] Thus, now, my `head.html` template needs only:

[^critical]: Of course, the key to that is identifying which styling truly is critical for every page on the site. I'll likely refine that over time, but some of the easy choices were the nav bar header, footer, and (as of this writing) web fonts. Beyond that --- which is where the ongoing refinements will come into play --- it got a bit more complicated.

```go-html-template
{{- partialCached "head-criticalcss.html" . -}}
{{- partial "head-css.html" . -}}
```

The first of those, `head-criticalcss.html`, looks like this:

```go-html-template
{{- $css := "" -}}
{{- $optionsCSSCritical := (dict "outputStyle" "compressed" "transpiler" "dartsass") -}}
{{- $css = resources.Get "scss/critical.scss" | resources.ToCSS $optionsCSSCritical -}}
{{- with $css }}
	<style>{{ .Content | safeCSS }}</style>
{{- end }}
```

And, as for `head-css.html`, it puts **all** those earlier conditionals in one file and gradually builds the external CSS files:

```go-html-template
{{- $css := "" -}}
{{- $cssOptions := dict "outputStyle" "compressed" "transpiler" "dartsass" -}}
{{- $condition := "" -}}
{{- $fileName := "" -}}
{{- $conditionSocial := false -}}
{{- $conditionCode := false -}}
{{- $conditionArtCode := false -}}
{{- $conditionTables := false -}}
{{- $conditionLiteYT := false -}}
{{- $conditionBillboard := false -}}
{{- $conditionArticle := false -}}
{{- $conditionPostsSingle := false -}}
{{- $conditionPostsList := false -}}
{{- $conditionFootnotes := false -}}
{{- $conditionHome := false -}}
{{- $conditionSitemap := false -}}
{{- $conditionSearchBtn := false -}}
{{- $conditionSearchForm := false -}}
{{- $conditionDetails := false -}}
{{- $condition404 := false -}}
{{- if (findRE `<blockquote class="toot-blockquote"` .Content 1) -}}{{- $conditionSocial = true -}}{{- end -}}
{{- if (findRE `<div class="highlight"` .Content 1) -}}{{- $conditionCode = true -}}{{- end -}}
{{- if and (findRE `(<code)` .Content 1) (not (findRE `<div class="highlight"` .Content 1)) -}}{{- $conditionArtCode = true -}}{{- end -}}
{{- if (findRE `<table` .Content 1) -}}{{- $conditionTables = true -}}{{- end -}}
{{- if (findRE `<lite-youtube` .Content 1) -}}{{- $conditionLiteYT = true -}}{{- end -}}
{{- if (and (ne .Title "Home page") (ne .Title "Sitemap (HTML form)") (ne .Title "Posts")) -}}{{- $conditionBillboard = true -}}{{- end -}}
{{- if (and (and (ne .Title "Search the site") (ne .Title "Posts")) (or (eq .Section "posts") (eq .Title "About me") (eq .Title "Privacy policy") (eq .Title "Want to reach me?"))) -}}{{- $conditionArticle = true -}}{{- end -}}
{{- if (and (eq .Section "posts") (ne .Title "Posts")) -}}{{- $conditionPostsSingle = true -}}{{- end -}}
{{- if (eq .Title "Posts") -}}{{- $conditionPostsList = true -}}{{- end -}}
{{- if (findRE `class="footnote-ref"` .Content 1) -}}{{- $conditionFootnotes = true -}}{{- end -}}
{{- if (eq .Title "Home page") -}}{{- $conditionHome = true -}}{{- end -}}
{{- if (eq .Title "Sitemap (HTML form)") -}}{{- $conditionSitemap = true -}}{{- end -}}
{{- if (ne .Title site.Params.SearchTitle) -}}{{- $conditionSearchBtn = true -}}{{- end -}}
{{- if (eq .Title site.Params.SearchTitle) -}}{{- $conditionSearchForm = true -}}{{- end -}}
{{- if (findRE `<details>` .Content 1) -}}{{- $conditionDetails = true -}}{{- end -}}
{{- if (eq .Title "404 Page not found") -}}{{- $condition404 = true -}}{{- end -}}

{{- $cssTypes := slice -}}{{/* init big slice */}}
{{- $cssTypes = append slice (slice $conditionSocial "social") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionCode "code") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionArtCode "artcode") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionTables "tables") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionLiteYT "lite-yt-embed") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionBillboard "billboard") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionArticle "article") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionPostsSingle "posts-single") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionPostsList "posts-list") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionFootnotes "footnotes") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionHome "home") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionSitemap "sitemaphtml") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionSearchBtn "search-btn") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionSearchForm "search-form") $cssTypes -}}
{{- $cssTypes = append slice (slice $conditionDetails "details") $cssTypes -}}
{{- $cssTypes = append slice (slice $condition404 "fourohfour") $cssTypes -}}

{{- range $cssTypes -}}
	{{- $condition = index . 0 -}}
	{{- $fileName = index . 1 -}}
	{{- if eq $condition true -}}
		{{- $cssOptions := merge $cssOptions (dict "targetPath" (print "css/" $fileName ".css" )) -}}
		{{- $css = resources.Get (print "scss/" $fileName ".scss") | resources.ToCSS $cssOptions -}}
		{{- if hugo.IsProduction -}}
			{{- $css = $css | fingerprint "md5" -}}
		{{- end }}
		<link rel="preload" href="{{ $css.RelPermalink }}" as="style">
		<link rel="stylesheet" href="{{ $css.RelPermalink }}" type="text/css">
	{{ end -}}
{{- end -}}
```

**Note**: I've updated this post several times in recent days and, rather than leave inaccurate info in it from my previous efforts, I've chosen to keep only the update you see above.
{.box}
