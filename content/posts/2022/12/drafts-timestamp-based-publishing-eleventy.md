---
title: "Drafts and timestamp-based publishing in Eleventy"
description: "Exercise more control over when, and if, your posts appear."
author: Bryce Wray
date: 2022-12-21T11:44:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

The [Eleventy](https://11ty.dev) [static site generator](https://jamstack.org) (SSG) has many marvelous powers but, for those capabilities you want that it doesn't (yet) sport, you often have to add them yourself, either through pre-cooked plugins or your own code. This post is about the latter.

In this case, it's code that will give your Eleventy-based site two very nice features that come standard with some other SSGs: **drafts** and **timestamp-based publishing**. There already are quite a few articles out there (as [noted](#references) at the end of this one) about adding one or the other of these two features, but I've yet to find one that mentions both *and* uses currently available Eleventy goodies, so this will be an attempt to remedy that.

<!--more-->

## Why you want them

First, let's talk about these features and why you'd benefit from them, in case you've never previously encountered them. In short, each enables you to **control when you want content to appear**.

In drafts-supporting SSGs, you can use a content file's *front matter* to identify the file (*e.g.*, a post like this one) as being a draft. This tells the SSG that it shouldn't publish it yet. Thus, you can have such a file in the online repo from which your site is built and not worry about it becoming part of your site's live content.

Timestamp-based publishing is similar except that, in this case, it's --- you guessed it --- the file's timestamp (also [usually](https://www.11ty.dev/docs/dates/) in the front matter) which controls the content's appearance or lack thereof on the website. A "future" post won't appear if you build the site prior to the timestamp of that file. Mind you, this doesn't mean the file's content will magically appear on your website when its timestamp is no longer in the future; since we're talking about static site builds here, the content will appear only with the first build past that timestamp.[^pubRepo]

[^pubRepo]: Of course, if your repo is public, people *will* be able to find a draft and/or "future" post there if they know where to look; so, if that constitutes a problem for you, consider whether your repo should be private, instead.

What advantages do you gain from having these features?

- If you accidentally commit a draft post or "future post," you don't have to worry about its going live. \[Bleep\] Happens<sup>™</sup> --- so it's nice to have a safety net.
- You can enjoy the convenience of *multi-device* editing of content on a public repo without its getting published before you're ready (perhaps using a workflow like the one I described in 2019's "[Roger, Copy](/posts/2019/07/roger-copy/)," a review of the superb [Working Copy](https://workingcopy.app/) app for iOS and, now, iPadOS).[^noGitICloud]
- Similarly, it makes multi-*user* editing easier, in case your site is a collaborative effort.

[^noGitICloud]: This is particularly useful for Apple device users, like me, because [it's probably best not to mix Git and iCloud](https://stackoverflow.com/questions/35853139/can-git-and-icloud-drive-be-effectively-used-together).

## The code

**Update, 2022-12-22**: If you experience inconsistent behavior with the code provided below, try developing in Eleventy **without** the [`--incremental` switch](https://www.11ty.dev/docs/usage/#incremental-for-partial-incremental-builds), which as of this writing can cause issues in some versions.
{.box}

<strong class="red">Update, 2023-01-24</strong>: The Eleventy site now has [official documentation and code](https://www.11ty.dev/docs/quicktips/draft-posts/) which you'll likely find preferable to what's contained here. Although the official suggestion is obstensibly about only the draft status aspect and not the timestamping, the documentation notes, "You might imagine how this could be extended to add a publishing date feature too: to exclude content from builds before a specific date set in a post's front matter (or elsewhere in the data cascade)."
{.box}

Eleventy's [**computed data** feature](https://www.11ty.dev/docs/data-computed/) lets you (quoting the documentation) "inject Data properties into your data object that are based on other data values."

For our purposes here, we'll use `eleventyComputed` to determine each content file's worthiness for publication based on the file's draft status and timestamp. And, because we want Eleventy to make this happen through the project, we'll put the code in the project's *[global data directory](https://www.11ty.dev/docs/data-global/)*, making its results available to all of the project's templates. Typically, that directory is a top-level `_data` folder, so I'll use that placement in the code example below. [In order to work right](https://www.11ty.dev/docs/data-computed/#advanced-details), the file itself must be named `eleventyComputed.js`.[^noteReName]

[^noteReName]: In case you're already `eleventyComputed`-savvy and wonder why this code doesn't include an `eleventyComputed` statement, the name choice precludes that; see [Eleventy issue #1104](https://github.com/11ty/eleventy/issues/1104).

```js
// annotated contents of:
// _data/eleventyComputed.js

/*
	First, we decide whether to
	enable these features in
	**both** production and
	development modes or in
	**only** production. For this
	`bothModes` variable,
	`true` means both modes
	and `false` means prod-only.
	I've selected `true` because
	I like testing it locally.
*/
let bothModes = true

/*
	Now, we define the constant
	which checks whether a content
	file is a "future file," by
	comparing the file's `date`
	timestamp with the current
	date/time --- i.e., `Date.now()`.
*/
const isPageFromFuture = ({ date }) =>
	date.getTime() > Date.now()

/*
	Finally, we determine whether
	the file is OK to publish ---
	i.e., whether it gets assigned
	a permalink *and* can be part
	of any Eleventy collections
	(the latter matters for things
	like automated posts lists).
	The file must be *neither*
	a future file *nor* a draft file
	to be published.
	We wrap this test within a
	conditional which uses the
	`bothModes` selection.
*/
if (bothModes) {
	// prod and dev modes
	module.exports = {
		permalink: (data) => {
			const { permalink, page } = data
			if (isPageFromFuture(page) || data.draft) {
				return false
				// no permalink assigned
			}
			return permalink
		},
		eleventyExcludeFromCollections: (data) => {
			const { eleventyExcludeFromCollections, page } = data
			if (isPageFromFuture(page) || data.draft) {
				return true
				// excluded from collections
			}
			return eleventyExcludeFromCollections
		},
	}
} else {
	// prod only
	module.exports = {
		permalink: (data) => {
			const { permalink, page } = data
			if (process.env.ELEVENTY_ENV === "production" && (isPageFromFuture(page) || data.draft)) {
				return false
				// no permalink assigned
			}
			return permalink
		},
		eleventyExcludeFromCollections: (data) => {
			const { eleventyExcludeFromCollections, page } = data
			if (process.env.ELEVENTY_ENV === "production" && (isPageFromFuture(page) || data.draft)) {
				return true
				// excluded from collections
			}
			return eleventyExcludeFromCollections
		},
	}
}
```

## References

I've ordered these sources by each item's date of initial publication, starting with the oldest.

- Remy Sharp, "[Scheduled and draft 11ty posts](https://remysharp.com/2019/06/26/scheduled-and-draft-11ty-posts)" <span class="nobrk">(2019-06-26)</span>.
- Giustino Borzacchiello, "[How to create drafts in Eleventy](https://giustino.blog/how-to-drafts-eleventy/)" <span class="nobrk">(2020-01-04)</span>.
- Kyle Halleman, "[Creating drafts in Eleventy](https://mymanycoloredways.com/posts/2021/02/creating-drafts-in-eleventy/)" <span class="nobrk">(2021-02-09)</span>.
- John Kemp-Cruz, "[Creating Drafts In Eleventy](https://jkc.codes/blog/creating-drafts-in-eleventy/)" <span class="nobrk">(2021-08-06)</span>.
- Peter deHaan, [comment](https://github.com/11ty/eleventy/issues/2060#issuecomment-955777844) in [Eleventy issue #2060](https://github.com/11ty/eleventy/issues/2060) <span class="nobrk">(2021-10-31)</span>.
- Peter deHaan, [`11ty-drafts` GitHub repo](https://github.com/pdehaan/11ty-drafts) <span class="nobrk">(2021-10-31)</span>.
- Juneum, "[Draft Posts in Eleventy](https://juneum.com/articles/eleventy-drafts/)" <span class="nobrk">(2022-02-08)</span>.
- Raymond Camden, "[Support Draft Blog Posts in Eleventy](https://www.raymondcamden.com/2022/08/14/support-draft-blog-posts-in-eleventy)" <span class="nobrk">(2022-08-14)</span>.
