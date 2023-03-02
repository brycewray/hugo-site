---
title: "Shorter shortcuts through Nunjucks macros in Eleventy"
description: "While seeking a way to cut a three-line call down to one line, I found some great advice on using a sometimes-overlooked aspect of a popular templating language."
author: Bryce Wray
date: 2022-09-24T06:58:00-05:00
#draft: true
initTextEditor: iA Writer
---

A year ago this month, I [wrote](https://www.brycewray.com/posts/2021/09/gems-in-rough-09/) here about my appreciation for [some code by Sia Karamalegos](https://sia.codes/posts/lite-youtube-embed-eleventy/) that made it possible, even easy, to embed YouTube videos like so, and without all the usual nasty tracking:

{{< lite-youtube videoTitle="How to make Eyeballs that Follow You Around" videoId="TGe3pS5LqEw" >}}

That code generally looked something like this[^params] when used with the [Nunjucks](https://mozilla.github.io/nunjucks) templating language in the [Eleventy](https://11ty.dev) static site generator (SSG):

[^params]: As for the parameters, `videoTitle` is the video's listed full title, while `videoId` is the video's alphanumeric identifier which follows `?v=` at the end of its URL. For example, the video shown in these examples has the following URL:\
*https://www.youtube.com/watch?v=TGe3pS5LqEw*\
. . . and, thus, a `videoId` of *TGe3pS5LqEw*.

```twig
{% set videoTitle = "How to make Eyeballs that Follow You Around" %}
{% set videoId = "TGe3pS5LqEw" %}
{% include "layouts/partials/lite-youtube.njk" %}
```

But, as I additionally noted at the time, it could be reduced to just one line in the [Hugo](https://gohugo.io) SSG:

```go-html-template
{{</* lite-youtube videoTitle="How to make Eyeballs that Follow You Around" videoId="TGe3pS5LqEw" */>}}
```

Then, months later, I created an [Astro](https://astro.build) [component](https://github.com/brycewray/astro-site/blob/main/src/components/Lite-YouTube.astro) that also could be called by, yes, just one line:

```html
<LiteYT videoTitle="How to make Eyeballs that Follow You Around" videoId="TGe3pS5LqEw" />
```

So, from time to time, I wondered why it couldn't be possible to reduce this to a single-line call in Eleventy, too. But I didn't start looking in earnest until this week, at which time I ran into a subject on which I've spent surprisingly little time during my nerdy obsession with SSGs: **[Nunjucks macros](https://mozilla.github.io/nunjucks/templating.html#macro)**.

After reading some excellent content (see the "[Acknowledgements and related material](#acknowledgements-and-related-material)" at the bottom), I can give you this quickie solution. While it involves some setup that definitely **isn't** a one-liner, it allows subsequent one-line calls of macros just as if they were components in SSGs like Astro or [Next.js](https://nextjs.org). Please note that the main thrust of what follows came from a <span class="nobrk">2021-12-22</span> [comment](https://github.com/11ty/eleventy/issues/613#issuecomment-999637109) by [Ted Whitehead](https://github.com/tedw) within an Eleventy issue on GitHub, initially filed in 2019, about using Nunjucks macros within Markdown files.

One reason why this solution is so helpful is that, once you set it up as explained below, *every* applicable file can have one-line access to *all* your macros. That's because you can put *all* your macros in just one file --- because you define each macro separately within the file --- so, once you enable the Eleventy site to "see" that file, any content file you "bless" in the procedure below will be able to grab any macro therein.

## Do the config

First, in your Eleventy site's config file (probably a top-level `.eleventy.js` file), add a [collection](https://11ty.dev/docs/collections) that will expose the soon-to-be-written macros file to, in this case, all your Markdown files:

```js
eleventyConfig.addCollection("everything", (collectionApi) => {
	const macroImport = `{%- import "macros/index.njk" as macro with context -%}`
	let collMacros = collectionApi.getFilteredByGlob('src/**/*.md')
	collMacros.forEach((item) => {
		item.template.frontMatter.content = `${macroImport}\n${item.template.frontMatter.content}`
	})
	return collMacros
})
```

## Create the macros file

**Important**: The following step assumes the presence in your project of a suitable JavaScript file from the [`lite-youtube-embed` repo](https://github.com/paulirish/lite-youtube-embed). In the code below, it's in the Eleventy project's `src/assets/js/` location (hence referred to as `/assets/js` since, in this project, the top-level `src` is the [input directory](https://www.11ty.dev/docs/config/#input-directory)) and called *lite-yt-embed_0-2-0.js*.
{.box}

Then, in your Eleventy project's [`includes` directory](https://www.11ty.dev/docs/config/#directory-for-includes), add a `macros` folder and, within it, an `index.njk` file for holding all your macros. Here's such a file that contains a macro version of the YouTube-embedding code:

```twig
{%- macro liteYT(videoTitle, videoId) -%}
	<script src="/assets/js/lite-yt-embed_0-2-0.js"></script>
<lite-youtube videoid="{{ videoId }}" data-bg="url('https://i.ytimg.com/vi/{{ videoId }}/hqdefault.jpg')" {% if params %} params="{{ params }}"{% endif %}>
	<button type="button" class="lty-playbtn">
	<span class="lyt-visually-hidden">Play video: {{ videoTitle }}</span>
	</button>
</lite-youtube>
	<noscript>
		<p class="ctr legal tightLead"><em>[Video playback capability requires JavaScript to be&nbsp;enabled.]</em></p>
	</noscript>
	<p class="ctr legal tightLead"><strong class="red">Note</strong>: Clicking&nbsp;the&nbsp;video constitutes your consent to view&nbsp;it via&nbsp;YouTube (including&nbsp;cookies). To&nbsp;view&nbsp;it on the YouTube&nbsp;site instead, please&nbsp;use&nbsp;<a href="https://www.youtube.com/watch?v={{ videoId }}"  target="_blank" rel="noopener">this&nbsp;link</a>, which&nbsp;opens in&nbsp;a different browser&nbsp;window/tab.</p>
{%- endmacro -%}
```

**Note**: The specific indenting for the `lite-youtube` element, above, is on purpose. I found that, with normal indents applied to this element, the result within the Eleventy HTML after accessing the macro *from within Markdown* could include unexpected `p` elements wrapped around the output, causing less-than-desirable appearances. On the other hand, I didn't encounter this problem if accessing the macro from within another Nunjucks file (more about that kind of macro call further down). I'm guessing the Markdown-related SNAFU is related to how that `lite-youtube` element comes out of its parent JavaScript file.
{.box}

## Call the macro

With all that done, we now can go into a Markdown file and turn that formerly three-line call into just one, as was our original, [alligators-free](https://idioms.thefreedictionary.com/up+to+my+ass+in+alligators) intent when we first endeavored to drain the proverbial swamp:

```twig
{{ macro.liteYT("How to make Eyeballs that Follow You Around", "TGe3pS5LqEw") }}
```

If you define other macros in that `index.njk` file, you'll call each similarly, with `macro.` followed by its name (as specified in the `macro` statement within `index.njk`) and then any parameters you've written it to accept.

But what if you want to use the macro in any **Nunjucks** files? Well, even if you include `.njk` files in the global through a config like this:

```js
eleventyConfig.addCollection("everything", (collectionApi) => {
	const macroImport = `{%- import "macros/index.njk" as macro with context -%}`
	let collMacros = collectionApi.getFilteredByGlob([
		'src/**/*.md',
		'src/**/*.njk',
	])
	collMacros.forEach((item) => {
		item.template.frontMatter.content = `${macroImport}\n${item.template.frontMatter.content}`
	})
	return collMacros
})
```

. . . you'll still have to `import` it, first:

```twig
{% from 'macros/index.njk' import liteYT %}
{{ liteYT("How to make Eyeballs that Follow You Around", "TGe3pS5LqEw") }}
```

This is because, to quote that [comment from which I borrowed the code](https://github.com/11ty/eleventy/issues/613#issuecomment-999637109):

> Collections don’t include layouts or includes, which still require importing macros manually[.]

<br />

**Note**: On the other hand, if you're using any `.njk` files for *content* --- although I can't imagine *why* when Markdown is so much easier to write, but, hey . . . --- this config would allow you to do one-line calls in *those* Nunjucks files, as in the Markdown example.
{.box}

## Acknowledgements and related material

- Iain Bean, "[Flexible components in Eleventy with Nunjucks macros](https://iainbean.com/posts/2020/flexible-components-in-eleventy-with-nunjucks-macros/)" (<span class="nobrk">2020-12-04</span>).
- Jérôme Coupé, "[Modular code with Nunjucks and Eleventy](https://www.webstoemp.com/blog/modular-code-nunjucks-eleventy/)" (<span class="nobrk">2021-08-06</span>).
- Paul Irish, "[Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed#readme)" documentation (<span class="nobrk">date unknown</span>).
- Sia Karamalegos, "[Faster YouTube embeds in Eleventy](https://sia.codes/posts/lite-youtube-embed-eleventy/)" (<span class="nobrk">2021-04-07</span>).
- Trys Mudford, "[Encapsulated Eleventy/Nunjucks components with macros](https://www.trysmudford.com/blog/encapsulated-11ty-components/)" (<span class="nobrk">2021-02-19</span>).
- Thomas M. Semmler, "[Using parameters in your Eleventy includes with Nunjucks macros](https://helloyes.dev/blog/2021/using-parameters-in-your-eleventy-includes-with-nunjucks-macros/)" (<span class="nobrk">2021-08-10</span>).
- W. Evan Sheehan, "[Includes and Macros](https://darthmall.net/weblog/2021/includes-and-macros/)" (<span class="nobrk">2021-11-20</span>).
- "[How to use Nunjucks macro inside Markdown files?](https://github.com/11ty/eleventy/issues/613)" (Eleventy issue #613, initially posted <span class="nobrk">2019-07-16</span>).
- [Nunjucks documentation](https://mozilla.github.io/nunjucks/templating.html).
