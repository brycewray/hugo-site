---
title: "Sorta scoped styling in Hugo, take two"
description: "I had the right idea but not the right approach. Here’s a better one."
author: Bryce Wray
date: 2023-01-19T15:52:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

I gave up on my [earlier](/posts/2022/06/sorta-scoped-styling-hugo/), [Rube Goldberg](https://www.rubegoldberg.org/all-about-rube/a-cultural-icon/)-esque attempt to achieve [scoped styling](https://css-tricks.com/saving-the-day-with-scoped-css/) after finding it too convoluted to maintain. Fortunately, I've now stumbled on a much simpler way to get there.

<!--more-->

<strong class="red">Update from the future</strong>: Rather than leave in place my original post supplemented by its subsequent and confusing oh-never-mind-do-it-*this*-way revision, I've reworked this to keep the good parts but throw out the erroneous parts. My apologies to those who were confused in the interim.
{.box}

## Anal-ysis

As I explained in last year's "[Sorta scoped styling in Hugo](/posts/2022/06/sorta-scoped-styling-hugo/)," I wanted to achieve some form of scoped styling within this [Hugo](https://gohugo.io)-powered website. That goal was laudable, but the same couldn't be said about the sadly anal approach I chose for achieving it:

- First, I tagged each of my hundreds of posts according to which content types they contained --- *e.g.*, code blocks, video embeds, and so on.
- Next, I broke down my one big [Sass](https://sass-lang.com) styling file, `index.scss`, into many separate files specific to the content types. And, when I say *specific*, I mean it: I had one file for a post that had both images and social media embeds, another for a post with all those **and** tables, and on it went. Going even further down the rabbit hole, I decided that each file would **then** [`@use`](https://sass-lang.com/documentation/at-rules/use) one or more [Sass partials](https://sass-lang.com/guide#topic-4) to do its work. By the time I'd finished, I had over two dozen Sass files in play. Jeeeeeeez.
- Finally, within the site repo's `head.html` [Hugo partial](https://gohugo.io/templates/partials/), I added conditionals that would present the tag(s)-appropriate Sass file(s) for each post.

While all of this worked, I soon abandoned it, as I described in a subsequent update:

> Consider this now an abandoned experiment. I went with it for a couple of weeks, but, in the end, decided to revert to my previous definitely-**not**-scoped configuration after seeing that *this* method hampered attempts to make certain styling changes --- that is, *without* invoking chaos which wasn't worth my time to resolve. Perhaps you'll have better luck with it.

## Blind squirrel, meet acorn

Then, while experimenting with a [Tailwind CSS](https://tailwindcss.com) theme for [another post](/posts/2023/01/static-mastodon-toots-hugo-tailwind-css-edition/), I stumbled onto a method that also worked **yet** *didn't* require the tags, or the ridiculously large spider's web of styling files, or the associated hassle. While I initially did it just to limit the size of the Tailwind file, I soon realized it also was a much more idiot-proof way to get the scoped styling I'd previously sought.

It broke down like this.

- Decide which styling is sufficiently site-wide as to be considered [critical CSS](https://web.dev/extract-critical-css/), and let a `head-criticalcss.html` partial put it in the `head` as *internal CSS*, thus loading as quickly as possible.[^concat]
- Create small, modular styling files --- *e.g.*, Sass partials, although this method can be used in vanilla CSS, too --- with rules that are specific to various types of content.
- In a `head-css.html` partial, use conditionals to identify the content in question within a given page, automatically determining which styling a page does (and doesn't) need. Each conditional, if satisfied, then calls the appropriate modular styling file and runs it through [Hugo Pipes](https://gohugo.io/hugo-pipes/scss-sass/) to produce the final CSS.

**Update from the future**: After additional research, I decided to make the critical CSS a separate file, loaded before the other styling files, rather than serving it as internal CSS. Since this site is always served via HTTP/2 at minimum, this should cause little or no performance penalty. More important is that it enables full caching of the critical CSS from page to page, as opposed to the very real performance penalties incurred through use of larger and completely *un*cached HTML.
{.box}

[^concat]: Although Dart Sass's [`@use` rule](https://sass-lang.com/documentation/at-rules/use) makes it easy to access multiple Sass partials from within a `critical.scss` file, Hugo allows you to accomplish roughly the same thing with vanilla CSS. For example, you could put your modular CSS files in `assets/css/partials/`, name them so that alphanumerical sorting will tell Hugo Pipes in which order to process them (such as `001_reset.css`, `010_vars.css`, `020_global.css`, *etc.*), and use the following to concatenate them:\
`{{ $css := (resources.Match "css/partials/0*.css") | resources.Concat "critical.css" }}`\
*(Thanks as always to Joe Mooring of the Hugo team for [helping me with this](https://discourse.gohugo.io/t/css-and-import/42901/4).)*

Thus, I added this to my `head.html` partial:

```go-html-template
{{- partialCached "head-criticalcss.html" . -}}
{{- partial "head-css.html" . -}}
```

The first of those, `head-criticalcss.html`, looks like this:

{{< labeled-highlight lang="go-html-template" filename="head-criticalcss.html" >}}
{{- $css := "" -}}
{{- $optionsCSSCritical := (dict "outputStyle" "compressed" "transpiler" "dartsass") -}}
{{- $css = resources.Get "scss/critical.scss" | resources.ToCSS $optionsCSSCritical -}}
{{- with $css }}
	<style>{{ .Content | safeCSS }}</style>
{{- end }}
{{</ labeled-highlight >}}

And, as for `head-css.html`, it puts **all** those earlier conditionals in one file, selecting the correct styling files for Hugo to use on a page:

{{< labeled-highlight lang="go-html-template" filename="head-css.html" >}}
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
{{</ labeled-highlight >}}
