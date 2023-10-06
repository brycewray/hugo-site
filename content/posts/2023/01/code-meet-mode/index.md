---
title: "Code, meet mode"
description: "As part of a site touchup, I bow to popular wishes and make code blocks look friendlier."
author: Bryce Wray
date: 2023-01-23T12:56:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

If you include code blocks in your website content, as I often do here, do you style them to meet your visitors' preferences? Oh, you say you don't *know* what those preferences are? Well, don't feel too bad; neither did I, until a couple of days ago.

<!--more-->

Recently, I decided to make some stylistic changes to this site; and it occurred to me that, while at it, I should think about how I presented code blocks herein. Up to then, I'd relied mostly on a [Chroma](https://github.com/alecthomas/chroma) stylesheet [auto-generated](https://gohugo.io/content-management/syntax-highlighting/#generate-syntax-highlighter-css) by [Hugo](https://gohugo.io).

The only thing about doing that, however, is that you first have to select from a [styles gallery](https://xyproto.github.io/splash/docs/); and I'd always opted for styles with dark-mode code blocks.[^Prism] In other words, the code blocks were light-shaded text on dark-background blocks, even though the site's CSS [automatically](/posts/2019/09/thinking-dark-thoughts/) makes everything else here conform to the visitor's chosen display mode, light or dark. Since I see a lot of this sort of thing on many other websites, I didn't worry too much about it --- or, at least, I didn't until I got curious and wondered what others out there might like to see.

[^Prism]: This situation isn't markedly different when I'm maintaining the site with [Eleventy](https://11ty.dev), during which time I use styling based on one of [numerous themes](https://prismjs.com/download.html#themes=prism) available from the [Prism.js website](https://prismjs.com).

That's why, this past Saturday on Mastodon, I posted a poll about the subject, asking:

> When reading a code block in your chosen viewing mode (light or dark), which of these should the code block always do?

Although the poll got only 139 votes over its twenty-four-hour life, it had roughly these percentages from the beginning:

| Response                | Result |
| ----------------------- | ---------- |
| Match my chosen mode    | **79.9%**  |
| Have a dark background  | **20.1%**  |
| Have a light background | **‌[Zero]**     |
{.ulysses}

These results made it pretty clear to me what I should do.

Thus, the appearance of the site's code blocks, like that of pretty much every other element herein, now matches your chosen display mode. Also: to confirm the results met accessibility guidelines, I used [WebAIM](https://webaim.org/)'s online tools for checking the contrast of both [text](https://webaim.org/resources/contrastchecker/) and [links](https://webaim.org/resources/linkcontrastchecker/).[^links]

[^links]: The links' appearance comes into play with *inline* code (*e.g.*, `a link to the `[`Hugo website`](https://gohugo.io)) rather than code blocks, but --- again --- I was under the hood, anyway, and figured I might as well handle that stuff, too.

My code always has its flaws but, from here on, perhaps at least it will be pleasant to view.

<!--
https://mstdn.social/@BryceWrayTX/109727880716272847

Text:
	Poll for those who read code blocks on Ye Olde Webbe . . . and PLEASE BOOST for better data. Thanks in advance!

The question:
	When reading a code block in your chosen viewing mode (light or dark), which of these should the code block always do?

#Poll #Developer #Development #WebDev #CSS #Sass #Code #Accessibility

Final results:
	- Match my chosen mode: 79.9% (screen: 80%)
	- Have a dark background:   20.1% (screen: 20%)
	- Have a light background:      0% (screen:  0%)
Total votes: 139 people
24-hour poll issued 2023-01-21--09-23-06CST

| Response                | Result |
| ----------------------- | ---------- |
| Match my chosen mode    | **79.9%**  |
| Have a dark background  | **20.1%**  |
| Have a light background | **0%**     |
{.ulysses}
-->

