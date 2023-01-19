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

----

Unlike the ordeal of months ago, putting all this into practice took literally only a few minutes per each separate type of content (the similarities among the various Hugo partials made it even easier to create new ones), thanks in no small part to the always amazing speed and stability of Hugo.

As for whether the results were worth it: use your browser's Inspector tool as you skim through the site; and notice how the CSS files load, and *which* CSS files load, based on what's on each page. While this isn't (yet) a true [critical CSS](https://web.dev/extract-critical-css/) approach, it shows a dependencies-free way to get closer to one.
