---
title: "Hugo 0.126.x: speedy pages from data"
description: "The SSG velocity king adds another invaluable asset to its portfolio."
author: Bryce Wray
date: 2024-05-15T15:22:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

It's an article of faith and a point of fact that [Hugo](https://gohugo.io) is the fastest static site generator (SSG) out there. Now, as of [v.0.126.0](https://github.com/gohugoio/hugo/releases/tag/v0.126.0) (later touched up a bit in [v.0.126.1](https://github.com/gohugoio/hugo/releases/tag/v0.126.1)), it's gained yet another way to excel in that regard. Its newly added power, nearly six years in the making, may just make Hugo the tool of choice for building sites based on remote data.

<!--more-->

## Lots of pages from lots of remote data

Back in August, 2018, Hugo guru [Régis Philibert](https://github.com/regisphilibert) filed [Issue #5074](https://github.com/gohugoio/hugo/issues/5074) in the Hugo GitHub repository, to suggest the addition of a powerful new feature. In the issue, entitled "Build pages from data source," Philibert noted:

> Currently Hugo handles internal and external data source with getJSON/getCSV which is great for using data source in a template.
>
> But Hugo cannot, using a data set of items, build a page for each of them plus related list pages like it does from the current directory files.
>
> Here is a fresh start on specing this important step in the roadmap.

He went on to suggest how it could be done.

This thoughtful suggestion got the attention of Hugo's chief developer, [Bjørn Erik Pedersen](https://github.com/bep), who answered in part:

> Thanks for starting this discussion. I suspect we have to go some rounds on this to get to where we want.

That turned out to be a major understatement, as this was the dawn of what became a multi-year process toward something along what Philibert had proposed. By the time it finally emerged this week in [Hugo v.0.126.0](https://github.com/gohugoio/hugo/releases/tag/v0.126.0), it was called *content adapters*. As the [documentation](https://gohugo.io/content-management/content-adapters/) says, content adapters allow you "to dynamically add content when building your site."

Philibert's original example had been of a realtor office website that would pull various types of JSON data from remote sources. Soon after the feature went live this week, Hugo's [Joe Mooring](https://github.com/jmooring) created a new [Hugo Discourse](https://discourse.gohugo.io/) topic, "[Content adapter examples and performance](https://discourse.gohugo.io/t/content-adapter-examples-and-performance/49830)," regarding an example site which "uses content adapters to create pages from remote data sources." He further mentioned that, using the content adapters, the Hugo site would build four pages from one remote JSON file but, more impressively, another *20,000* pages from a different remote JSON file that was 49 MB in size --- and do so in just a few seconds. Better yet was that, since the Hugo site would still have the downloaded JSON file as a resource on subsequent builds (while obviously checking the remote original for any changes), such builds would be even faster.

In short: for any site needing to build pages off remote data sources, particularly large ones, the latest incarnation of Hugo would seem to be a perfect fit.

## Some neat stuff for your Markdown-ing pleasure

Also added in Hugo v.126.0 were *extras* for extensions to the [Goldmark parser](https://github.com/yuin/goldmark/) that turns Markdown into HTML. With them, you now can easily produce [inserted text](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins), [mark text](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark), subscripts, and superscripts **without** the need for manually typing HTML into your Markdown.

*Here are examples, each preceded by its appropriate Markdown:*

```md
++This is inserted text.++
```

++This is inserted text.++

**Note**: How the inserted text will appear depends on your browser settings and, of course, any CSS you might apply to the `ins`  element. [This MDN example](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins#try_it) shows how it could be formatted (with `del`) to enhance a display of versioning.
{.box}

```md
==This is mark text.==
```

==This is mark text.==

```md
The formula for water is H~2~O (that shows a subscript).
```

The formula for water is H~2~O (that shows a subscript).

```md
Microsoft Word's default for "1st" is "1^st^" --- which I find annoying, but at least it shows a superscript.
```

Microsoft Word's default for "1st" is "1^st^" --- which I find annoying, but at least it shows a superscript.

*By the way, the CSS I'm using here makes the subscript and superscript use the same baselines as their surrounding content, thus avoiding the janky line heights you often see when people use `sub` and `sup` in HTML:*

```css
sub, sup {
  font-size: 65%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
```
