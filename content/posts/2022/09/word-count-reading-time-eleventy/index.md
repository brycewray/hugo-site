---
title: "Word count and reading time in Eleventy"
description: "Want to give your readers an idea of what’s ahead? Here’s some code to make that no biggie."
author: Bryce Wray
tags: [web-development, static-site-generators, ssg, eleventy, hugo, javascript, html]
date: 2022-09-20T14:21:00-05:00
#draft: true
#initTextEditor: iA Writer
---

There are numerous articles out there which give you what I consider fairly convoluted procedures for adding *word count* and *reading time* statistics to your posts in the [Eleventy](https://11ty.dev) static site generator (SSG).

So, how'd you like something simpler? Something you can do *strictly* within a [Nunjucks](https://mozilla.github.io/nunjucks) template? (Except for one teensy little Eleventy [filter](https://www.11ty.dev/docs/filters/), that is.)

Here you go.

First, here's a template file derived from[^original] my [`billboard.njk`](https://github.com/brycewray/eleventy_site/blob/main/src/_includes/layouts/partials/billboard.njk):

[^original]: The original, linked template file has a little more text-filtering due to the specific contents in my repo. You might check it to get some idea about how to handle your own special gotchas.

```jinja
{% set regExpCode = r/<pre class=(.|\n)*?<\/pre>/gm %}
{% set fixedContent = content | replace(regExpCode, "") | striptags %}
{% set wordCount = fixedContent | wordcount %}
{% set readingRate = 225 %}
{% set readingTime = (wordCount/readingRate) | round %}
{% if readingTime < 1 %}{% set readingTime = 1 %}{% endif %}
<p>
	{{ wordCount | numCommas }} words • Reading time: {{ readingTime }} minute{% if readingTime > 1 %}s{% endif %}
</p>
```

Let's break down what's happening here, and keep in mind that everything below (but for, again, one tiny exception) involves stuff built into Nunjucks.

- The `set regExpCode` line creates a [regular expression](https://en.wikipedia.org/wiki/Regular_expression) for the HTML that Eleventy wraps around code blocks (at least, that's true if you're handling syntax highlighting through the most typical methods; but, if you're doing it differently, adjust the regex accordingly).
- The `set fixedContent` line makes a `fixedContent` variable, which soon will be used in deriving the word count, and uses `replace` with the `regExpCode` variable to delete all code-block-related HTML from `fixedContent`. Then, it uses the Nunjucks `striptags` filter to carve the remaining HTML down to just text. (That neatly takes care of any inline images, among other things.)
- The `set wordCount` line uses the `wordcount` filter to, well, you can guess.
- The `set readingRate` line assigns *225* as the number of words per minute we'll use in calculating the reading time. If you have a preferred number, substitute it here.
- The `set readingTime` line divides `wordCount` by `readingRate` and then `round`s it to the nearest integer. (But, since really short posts might end up with `readingTime` as *0* based on that `round`ing, the `if readingTime < 1` line fixes that.)
- Finally, in the paragraph, we:
	- Filter `wordCount` through `numCommas` (that's the aforementioned exception, about which more shortly).
	- Provide `readingTime`, followed by either *minute* or *minutes* (depending on whether the value of `readingTime` exceeds *1*).

The only other thing this requires is the formatting of the `wordCount` so that it has the proper commas for English rendering thereof --- accomplished above by use of the `numCommas` filter, which comes from this snippet within the Eleventy [config file](https://www.11ty.dev/docs/config/):

```js
  eleventyConfig.addFilter("numCommas", function(value) {
		return value.toLocaleString()
	});
```

<br />

----

*By the way, this also can be done in the [Hugo](https://gohugo.io) SSG, using various features that come with Hugo out of the box:*


```go-html-template
{{- /*
	h/t to Joe Mooring's answer in
	https://discourse.gohugo.io/t/count-word-function-customized-to-exclude-code/34380
*/ -}}
{{- $wordCount := replaceRE `(?s)<div class="highlight">.*?</div>` "" .Content | countwords -}}
{{- $readingTime := div (float $wordCount) 225 | math.Ceil -}}
{{- $wordCountFmt := lang.FormatNumberCustom 0 $wordCount -}}
<p>
	{{ $wordCountFmt }} words &bull; Reading time: {{ $readingTime }} minute{{- if (gt $readingTime 1) -}}s{{- end -}}{{- end -}}
</p>
```
