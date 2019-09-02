---
layout: layouts/posts/singlepost.njk
title: iA for IO?
tags: post
subtitle: Evaluating iA Writer for use with Hugo
description: "This is a brief consideration of using iA Writer in making Markdown files for this site’s posts."
author: Bryce Wray
date: 2019-02-03T09:25:00-06:00
#final_date: 2019-02-19T09:25:00-06:00
#lastmod: 2019-01-25T22:10:00-06:00
draft: false # note!
actual_path: /content/posts/2019/02/ia-for-io
discussionId: "2019-02-ia-for-io"
final_url: /posts/2019/02/ia-for-io
featured_image: /images/notebook-933362_1920x1280_60pct.jpg
featured_image_alt: Stylized photograph of notebook and, in blurry background, a pencil
featured_image_caption: "Image: Pixabay" # quotation marks to allow colon
---

My comments at the end of my [previous post](/posts/2019/01/blox-sux) aside, I have to say [iA Writer](https://www.ia.net/writer) can be a halfway decent editor for [Markdown](https://daringfireball.net/projects/markdown/), after all.

Once again, I'm **not** considering dropping [Ulysses](https://ulysses.app) from my small collection of much-loved apps that I utterly must have when the muse is with me and I feel like writing. It's just that I grow weary of the export-to-Markdown process inherent in writing something in Ulysses for this site, especially since I like to see my edits on my local version of the site as I save them to the target file.

(Yes, you **can** save directly to a Markdown file from Ulysses, but I get the impression that's not really the best-practices way you're supposed to do it, since so many reviews out there stress the "Don't worry about files, just go to the Ulysses Library and find all your stuff there" approach. That approach is, indeed, wonderful for my **non**-[Hugo](https://gohugo.io) writing, but not so much for this.)

So this is yet another look at iA Writer as a potential "daily driver" for use with Hugo (stretching the definition of *daily*, obviously, since I write these posts just whenever).

## Okay, I was YAMmering; sorry

Perhaps more to the point, I believe I was more concerned about how the TOML (like [YAML](https://yaml.org)) [front matter](https://gohugo.io/content-management/front-matter/) looked in the iA Writer Preview window than how Hugo would handle the final Markdown file. (As I [already explained](/posts/2018/09/why-finally-settled-ulysses), I get distracted by such things.) It turns out that doesn't matter. You don't have to enclose front matter in a ```code block``` for Hugo to know what to do with it---in fact, it doesn't know what to do with it if you **do** put it in a code block.

## Footnote follies

{{< figure src="/images/iA-Writer-inline-footnotes_1548x582.png" alt="Screen capture from iA Writer software showing how footnotes look in it" >}}


That said, iA Writer's inline footnotes, while fine for export from iA Writer, don't fit [Pandoc](https://pandoc.org) standards, which are baked into how Hugo "thinks" when converting Markdown to HTML for a site. So, while Pandoc-standard inline footnotes look bad in iA Writer, they work fine in Hugo.^["Inline notes are easier to write, since you don't have to pick an identifier and move down to type the note." See [here](https://github.com/Witiko/markdown/issues/3)---the source of that quote---for an example of what I mean.] However, that is something where Ulysses easily beats iA Writer for this stuff, since the inline footnotes in Ulysses---that is to say, all the ones I've included on [my other posts](/posts) before this one---work perfectly with Hugo. Same is true for [Typora](https://typora.io), as well.

## Status quo, or no?

Bottom line: I still haven't made up my mind about whether to go with a different editor for future Markdown work or stick with Ulysses for it as well as for my other creative writing (that WIP ain't finishing itself). However, if you are a Hugo user and you're trying to decide about which editor to use for your writing, I hope these thoughts have been helpful.

<br />
<hr />

*One more thing before I end this quickie: if you haven't already read [Chris Rosser](https://chrisrosser.net)'s [most recent review of iA Writer](https://chrisrosser.net/posts/2019/01/26/ia-writer-5-review/), I definitely urge you to do so. His workflow is quite different from mine since he actually coded his own text-to-HTML setup (whoa) but his observations are always keen and useful. "[Joe Bob says check it out](https://en.wikipedia.org/wiki/Joe_Bob_Briggs)."*