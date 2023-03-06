---
title: "New in Hugo: easier writing"
description: "How Hugo 0.81.0 lets me do more in Markdown."
author: Bryce Wray
date: 2021-02-27T11:35:00-06:00
---

A few days ago, the [Hugo](https://gohugo.io) dev team [issued the latest version](https://gohugo.io/news/0.81.0-relnotes/) of this site's [static site generator](https://jamstack.org/generators/) (SSG). Hugo 0.81.0 added a number of goodies, as you would expect from a "dot-zero" upgrade, but one in particular has simplified my writing for this site.

Perhaps it's more accurate to say that the addition restored something I'd thought I couldn't have any more: the use of **attributes** within the site's [Markdown](https://daringfireball.net/projects/markdown) content to simplify the invocation of CSS classes.

For those of you who haven't used this capability before, let me explain.

## A boxing exercise

Back when this site was on [Eleventy](https://11ty.dev), I could write the following Markdown, invoking the site's `box` CSS class with an curly-bracketed attribute at the end:

```md
**Important**: This is a paragraph that goes in a box so it'll attract attention.{.box}
```

.&nbsp;.&nbsp;. and this would be the result:

**Important**: This is a paragraph that goes in a box so it'll attract attention.
{.box}

The alternative would be actually writing HTML within the Markdown, but that wasn't as convenient when it was necessary to add things like links and formatting:

```html
<p class="box"><strong>This</strong> is bold and <em>this</em> is italicized/obliqued, and <a href="https://gohugo.io/documentation" rel="noopener">this link</a> goes to the Hugo documentation, while <a href="/posts/2021/02/simplify-simplify">this post link</a> goes to the site&rsquo;s recent <strong>&ldquo;Simplify, simplify&rdquo;</strong> post.</p>
```

.&nbsp;.&nbsp;. instead of just writing this in Markdown:

```md
**This** is bold and *this* is italicized/obliqued, and [this link](https://gohugo.io/documentation) goes to the Hugo documentation, while [this post link](/posts/2021/02/simplify-simplify/) goes to the site's recent **"Simplify, simplify”** post.{.box}
```

.&nbsp;.&nbsp;. to get the same result:

**This** is bold and *this* is italicized/obliqued, and [this link](https://gohugo.io/documentation) goes to the Hugo documentation, while [this post link](/posts/2021/02/simplify-simplify/) goes to the site's recent **"Simplify, simplify”** post.
{.box}

In Eleventy, I enjoyed this convenience through use of the [Markdown-it-attrs plugin](https://github.com/GerHobbelt/markdown-it-attrs) for the [Markdown-it parser](https://github.com/markdown-it/markdown-it). In Eleventy, you essentially put together your chosen parser with whatever plugins it needs to do what you want --- footnoting, "smart" punctuation, and, yes, handling styling attributes.

When I came back to Hugo, I figured I'd lost this convenience because Hugo's built-in Markdown parser, [goldmark](https://github.com/yuin/goldmark), is [limited to allowing attributes for only headings](https://github.com/yuin/goldmark#parser-options).[^blackFriday] I compensated by putting together [shortcodes](https://gohugo.io/content-management/shortcodes/) to insert the two classes I most frequently had used with attributes in Eleventy: the aforementioned `box` class for my "Hey-look-at-this" items and the `imgcCaption`[^oldName] class I used for captions under in-body images. It wasn't as convenient, but it worked:

[^blackFriday]: You also can configure Hugo to use its previous Markdown parser, [Blackfriday](https://github.com/russross/blackfriday), but it doesn't do the attributes thing *at all*. Moreover, Blackfriday support in Hugo is being deprecated in the not-too-distant future.

[^oldName]: In Eleventy, I'd called this class `lazypicturecaption` as a reference to the `lazypicture` shortcode I used in concert with lazy-loading-specific JavaScript to produce responsive images. In Hugo, I've dispensed with that JavaScript, using an `imgc` shortcode for responsive images (relying instead on browsers’ native lazy-loading) --- hence, the different name in Hugo for what essentially is the same thing, namely a caption-styling CSS class.

```md
{{</* imgc src="BW-holding-Kennedy-first-night__crop_1008x712.jpg" alt="Bryce Wray holds his new granddaughter, Kennedy Beck, on the night of her birth" width="1008" height="712" */>}}

{{%/* imgcCapt %}}Your faithful correspondent holds his first grandchild for the first time, on the first night of her life. Enough "firsts" for you there?{{% /imgcCapt */%}}
```

.&nbsp;.&nbsp;. to produce the following result (borrowed from last year's ["Welcome, sweet little early bird"](/posts/2020/03/welcome-sweet-little-early-bird/) post about the slightly premature birth of our granddaughter, who's nearing her first birthday):

{{< imgc src="BW-holding-Kennedy-first-night__crop_1008x712.jpg" alt="Bryce Wray holds his new granddaughter, Kennedy Beck, on the night of her birth" width=1008 height=712 >}}

Your faithful correspondent holds his first grandchild for the first time, on the first night of her life. Enough “firsts” for you there?
{.imgcCaption}

## Hugo 0.81.0 as a labor-saving device

But then Hugo 0.81.0 arrived, with [enhanced attribute support](https://gohugo.io/news/0.81.0-relnotes/#attribute-lists-after-markdown-blocks) that goes well beyond that from goldmark itself:

> Hugo already supports adding attribute lists (e.g CSS classes) after titles. We now also allow adding attribute lists after Markdown blocks, e.g. tables, lists, paragraphs etc. *[sic]*

To get that working in Hugo as of v.0.81.0, just make appropriate edits to your config file's [`markup` section](https://gohugo.io/getting-started/configuration-markup#goldmark). For example, here's how I have `markup` set in this site's `config.yaml` file (note that `block` is `true`, which enables what I'm discussing in this article):

```yaml
markup:
  highlight:
    guessSyntax: true
    noClasses: false
    tabWidth: 2
  goldmark:
    extensions:
      linkify: false
    parser:
      attribute:
        block: true
        title: true
      autoHeadingID: true
			# otherwise, can't use (e.g.) "Content" as a heading
    renderer:
      unsafe: true
      # only to allow for inline HTML and/or JS
      # ... other desired settings are defaults
```

So, now, all I have to do to get that same caption is:

```md
Your faithful correspondent holds his first grandchild for the first time, on the first night of her life. Enough "firsts" for you there?
{.imgcCaption}
```

The only difference from how I did it in the Eleventy/plugins combo is that, in Hugo, it requires a line feed between the end of what you're styling and the attribute (in this case, `{.imgcCaption}` to specify use of the `imgcCaption` CSS class). Hardly a biggie. (With the Eleventy setup, you can put a line feed there, too, so that's even better for cross-site/cross-repo purposes, for those of you like me who are so inclined.)

## A little thing to some, but&nbsp;.&nbsp;.&nbsp;.

To others, this enhancement may seem trivial. For me, it makes it easier and faster to write, especially when I'm doing a more technical piece that requires multiple `box` instances to focus your attention on gotchas, or when I'm adding updates to older posts (as I often do).

I certainly can write stuff in HTML when needed. I've been doing it for a quarter of a century. Still: if I can do the same thing in Markdown, and far more quickly, why not?

So, thanks to this new enhanced attributes capability (and some fairly painless searching/replacing within the appropriate posts), I was able to retire both the `box` and `imgcCapt` shortcodes in favor of the simpler, more quickly typed attributes for the CSS classes they invoked. And, as I have need to call more CSS from Markdown over time, this capability will continue to make that a comparative breeze.

Easier and faster `===` better. I'm grateful to the Hugo dev team for adding this functionality to Hugo in version 0.81.0 --- and will be in the future every time I can add, **HTML-free**, some boxed text, or an image caption, or any *other* item that needs special handling in CSS.
