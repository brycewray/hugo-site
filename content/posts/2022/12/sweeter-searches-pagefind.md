---
title: "Sweeter searches with Pagefind"
description: "A few minutes spent editing a config file can make your site’s search results much more useful for your visitors."
author: Bryce Wray
date: 2022-12-08T08:14:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

**Note**: This post also appears on [dev.to](https://dev.to/brycewray/sweeter-searches-with-pagefind-194o).
{.box}

If you lurk in some of the same tech forums that I do, you'll see a lot of griping about the declining quality of online search. Who'd have ever thought that contorting search results, stuffing them with ads, inadequately curating them for quality, and otherwise caring only about their financial upside could have proved so counterproductive? ("Me," you and I can yell in unison.)

Fortunately, while there are limits to how much you'll be able to improve your experience with online search in general, you *can* optimize your own website's search capabilities. That's assuming, of course, that your website is built with a [static site generator](https://jamstack.org/generators) (SSG), as I've recommended here over the years, and *has* search capabilities in the first place. If it lacks search, you can fix that readily enough with the free [Pagefind](https://pagefind.app) tool about which I [wrote](/posts/2022/07/pagefind-quite-find-site-search/) earlier this year.

<!--more-->

As newer versions of Pagefind appear, its powers grow; and one of those enhancements has enabled me to make [this site's search results](/search/) better --- specifically, by *cutting out* stuff which really didn't belong. I'll give a couple of examples herein, explaining the respective procedures for my two favorite SSGs, [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io).

## Taking out the trash

Before I go there, however, let's talk about exactly how you can make Pagefind exclude things you want excluded. Pagefind examines your site's actual HTML, so you can use multiple methods to identify items for exclusion.

First, you can add **`data-pagefind-ignore`** to something's opening HTML tag. You'd do this in your chosen SSG's templating. For example, I exclude the site's [HTML sitemap](/sitemap/) with:

```html
<div class="sitemap-Container" data-pagefind-ignore>
```

While the `data-pagefind-ignore` exclusion capability was in Pagefind from the beginning, a more recent enhancement has been the addition of the [**`exclude_selectors`** instruction](https://pagefind.app/docs/config-options/#exclude-selectors) for use in the [site-wide Pagefind configuration file](https://pagefind.app/docs/config-sources/) (in my repos' case, that's `pagefind.yml`). As I'll show you below, it gives you the power to exclude items even when you can't directly edit the HTML as you can in templates.

### Footnote references

It's no secret to my regular readers that I like to use footnotes. The problem that presented for Pagefind search results was the appearance of numerical *footnote references*. These are the superscripted numbers that go in the main text and link down to the actual footnotes. Without dealing with these footnote references, one might see things like this in search results:

> This1 is where a footnote appears in the main text.

. . . since there'd been a <sup>1</sup> next to *This* in the original sentence that Pagefind had located.

Fixing this is where `exclude_selectors` comes into play, since writing your main text in Markdown doesn't allow you to edit footnotes' HTML directly.[^directly]

[^directly]: Well, technically, you could do so *if* you did your footnotes completely manually --- since you can mix HTML in your Markdown --- but that would be a major pain *and* completely waste the exemplary footnote-handling likely offered by your SSG.

In Eleventy, a footnote's HTML begins like this if one is using the most typical footnotes-ready Markdown setup, *i.e.*, the [`markdown-it` parser](https://github.com/markdown-it/markdown-it) combined with the [`markdown-it-footnote` plugin](https://github.com/markdown-it/markdown-it-footnote):

```html
<sup class="footnote-ref">
```

. . . so you'd put this in an Eleventy repo's `pagefind.yml`:

{{< labeled-highlight lang="yaml" filename="pagefind.yml" >}}
exclude_selectors:
  - "[class='footnote-ref']"
{{</ labeled-highlight >}}

As for Hugo with its built-in [goldmark Markdown parser](https://github.com/yuin/goldmark) and included Footnote extension, a footnote's HTML begins like this (here, it's the first footnote in a page):

```html
<sup id="fnref:1">
```

. . . thus needing the following for a Hugo repo's `pagefind.yml`:

{{< labeled-highlight lang="yaml" filename="pagefind.yml" >}}
exclude_selectors:
  - "[id^='fnref']"
{{</ labeled-highlight >}}

### Code blocks

As this post shows, I also like to include *code blocks*, and on occasion they can be, um, *large*. You might think it would be a good idea to include those in site searches, but my experience has been that they get in the way of more plain-English results. After all, code blocks can have many ordinary words for which someone might be searching but expecting very *un*-code-block-ish results. Since I annotate many of my code blocks with comments-as-documentation, this can further exacerbate the potential problem.

Thus, we once again employ `exclude_selectors`.

In Eleventy --- assuming one is using the [official Eleventy syntax highlighting plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/), as I would recommend --- a code block begins with something like this (here, the code itself is JavaScript, since the `class` varies according to the language being highlighted):

```html
<pre class="language-js">
```

. . . so now our Eleventy `pagefind.yml` will have:

{{< labeled-highlight lang="yaml" filename="pagefind.yml" >}}
exclude_selectors:
  - "[class='footnote-ref']"
  - "[class^='language']"
{{</ labeled-highlight >}}

In Hugo and its built-in [Chroma syntax highlighting](https://github.com/alecthomas/chroma), a code block begins with:

```html
<div class="highlight">
```

. . . which means our Hugo `pagefind.yml` now needs:

{{< labeled-highlight lang="yaml" filename="pagefind.yml" >}}
exclude_selectors:
  - "[id^='fnref']"
  - "[class='highlight']"
{{</ labeled-highlight >}}
<br />

----

*For more information on managing how Pagefind provides search results for your visitors, consult the [Pagefind documentation](https://pagefind.app/).*
