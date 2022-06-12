---
tags:
- post
- code
title: "Mulling over migration?"
description: "Some tips about moving your website to Astro."
author: Bryce Wray
date: 2022-05-07T13:15:00-05:00
#lastmod:
#draft: true
#initTextEditor: MMDC5
discussionId: "2022-05-mulling-over-migration"
featured_image: "bird-migration-4023842_3164x2108.jpg"
featured_image_width: 3164
featured_image_height: 2108
featured_image_alt: "Migratory birds flying with clouds in background"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/kranich17-11197573/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4023842">Kranich17</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4023842">Pixabay</a></span>
---

The response I've received to my recent posts about the [Astro](https://astro.build) [static site generator](https://jamstack.org/generators) (SSG) suggests there are a **lot** of you out there considering moving your own websites to it. While I already gave [my thoughts](/posts/2022/04/astro-ready-your-blog/) about how Astro compares to the other SSGs with which I have experience, I figured you'd also find it useful if I gave you some tips about the sorts of changes you'd face in such a move. I am speaking here mainly about moving from a site that's currently on either [Eleventy](https://11ty.dev) or [Hugo](https://gohugo.io), although you likely can adapt this information to the migration of a site built with another SSG.

## Modifying your Markdown

One of the first and most obvious challenges you'll face in an \[x]-to-Astro move is how you must change your site's Markdown files when you bring them over.

### The `setup` item

At the top of each file's front matter, you'll have to add a `setup` item with one or more entries.[^setup] For example, here's how it could look for the post you're reading now:

[^setup]: Well, I **say** you must add a `setup` item. I suppose if you utterly don't want to have a layout, much less add any components, you don't have to use it; Astro will still build a page from the Markdown file. However, I can't imagine you don't want at least *some* layout.

```md
---
setup: |
  import Layout from '@layouts/Post.astro'
  import Box from '@components/Box.astro'
```

I created the `Box` component for, say, an item[^attrs] like this:

**Note**: This colorful box calls your attention to this item.
{.yellowBox}

. . . called as follows:

```md
<Box cssClass="yellowBox">
**Note**: This colorful box calls your attention to this item.
</Box>
```

[^attrs]: In Eleventy and Hugo, you'd handle this `Box` stuff through *attributes*, a capability which is built into Hugo's [goldmark](https://github.com/yuin/goldmark) parser and added to Eleventy's [markdown-it](https://github.com/markdown-it/markdown-it) parser through a [plugin](https://github.com/arve0/markdown-it-attrs)).  This is not yet available in Astro if you're using its default [remark](https://github.com/remarkjs/remark) parser, because the [appropriate plugin](https://github.com/arobase-che/remark-attr) is [incompatible with the current version of remark](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins). (I haven't tried Astro with a different parser, except in very small-scale, one-file-at-a-time tinkering with things like [micromark](https://github.com/micromark/micromark) and [marked](https://github.com/markedjs/marked) to make RSS and JSON feeds work better with Astro.)


### Shortcodes to components

If you've used shortcodes in [Eleventy](https://11ty.dev/docs/shortcodes) or [Hugo](https://gohugo.io/content-management/shortcodes/) to inject items into Markdown, you'll need to convert them to Astro components which you then will import into the Markdown, as shown in the second code block above with the `Box` component.

Probably the best example I can give you from my own experience is my [static tweets shortcode](/posts/2022/02/static-tweets-eleventy-hugo/#in-hugo), which I [turned into an Astro component](/posts/2022/04/static-tweets-astro/#build-the-component). I have yet to find a shortcode that couldn't be "component-ized." If I can do it, so can you.

### Change isn't always a constant

The good news is that there are plenty of things in your existing Markdown you **won't** have to change:

- In general, Markdown still functions as always. `**This should be bold**` results in a bold-faced "**This should be bold**," `#` makes a line an `h1`, and so on.
- You can keep the front matter's existing `date` or other self-specified metadata (such as `lastmod`, which I use to indicate when I last modified a file after its initial publication). In short, correct [YAML](https://yaml.org/) won't cause a problem. (On the other hand, *FUBARed* YAML causes a problem in just about **any** SSG.)
- You can still specify `draft: true`, as in Hugo [by default](https://gohugo.io/getting-started/usage/#draft-future-and-expired-content) and Eleventy through [fairly simple configuration](/posts/2021/06/gems-in-rough-06/#your-own-eleventy-time-machine), to prevent a file from being built when it's not ready for publication. This is especially helpful if you have to commit the file to the site's public repository, such as [when you're using multiple devices to handle the file](/posts/2019/07/roger-copy/), before you want it to be "live" for the world.

## DX suffers on larger sites

If your current site has only a few pages, you'll find Astro's dev server refreshes the browser quickly enough to suit you. However, after your content gets up to and beyond about the 100-page level, even a fairly simple content edit will cause the refresh to take several seconds when you save the file you're changing, and the lag will get longer as the site gets bigger.[^styling]

The Astro devs are aware of the issue --- perhaps related to [Astro's interaction with Vite](https://astro.build/blog/astro-021-preview/#hello-vite) --- but it's unknown when it'll be fixed. Thus, with a larger site, you may want to get used to writing your content *outside of* development mode and, only then, activating the Astro dev server to check the new page's appearance.

[^styling]: However, editing CSS or SCSS doesn't cause the same dragginess.

## It's still beta, remember

One critical thing to remember is that there still are a few weeks to go before the [planned release to GA of Astro v.1.0](https://astro.build/blog/astro-1-beta-release/); so, **until then, Astro remains in beta** and you should assume there will be glitches, fixes, changes, hurried documentation revisions, and the other items that typically accompany that status.

Speaking of which&nbsp;.&nbsp;.&nbsp;.

## A sheepish U-turn

Forgive me for burying the proverbial lede but, today, two weeks after [moving this site from Hugo to Astro](/posts/2022/04/winds-change/), I moved it *back* --- at least for the time being.

I reluctantly made this choice after running into a few particular Astro glitches which turned out to be more limiting, and required more sweating over workarounds with which I'm only slightly familiar, than I'd anticipated. (There also were some external, **non**-Astro-related factors which played a significant role in tipping my hand, but they're not really germane to this discussion.)

This setback notwithstanding, I remain optimistic about the Astro platform, and will keep experimenting with Astro, being active in its unbelievably nice community (if those folks can tolerate me and my fickleness, that is), and hoping for a chance to re-implement it here in the not-too-distant future.

**Note**: Although it's unrelated to the subject of this piece, you may be interested to know that I wrote this, at least in part, using the [v.5 beta version](https://multimarkdown.zendesk.com/hc/en-us/community/posts/4606313740051-Where-to-download-the-beta-) of the venerable [MultiMarkdown Composer](https://multimarkdown.com/). Also, it appears that the equally venerable [iA Writer](https://ia.net/writer), my most frequent daily driver for these posts, [soon will have a v.6 release](https://twitter.com/iAWriter/status/1522306304492118018). Each new major version will have been a long while coming; it was back in 2017 that MMDC reached v.4.0 and iA Writer reached v.5.0 (for iOS, at least, while the Mac version arrived in 2018).
{.yellowBox}
