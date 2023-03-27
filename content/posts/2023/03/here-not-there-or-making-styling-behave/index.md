---
title: "Here, not there — or, making styling behave"
description: "While making boldfaced and slanted text a little easier to detect, I end up with (S)CSS that looks nasty but gets the job done."
author: Bryce Wray
date: 2023-03-19T15:25:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

**Note**: This post also appears on [dev.to](https://dev.to/brycewray/here-not-there-or-making-styling-behave-43ia).
{.box}

All I wanted to do was make my bold and slanted text instances a little easier to see, as I'd seen done on others' sites. But, man, did that ever end up involving some convoluted-looking styling. On the chance that you might need to do something similar, here are the details.

<!--more-->

**Note**: Before I proceed, I must acknowledge [Stefan Judis](https://www.stefanjudis.com)'s article, "[How to select elements that are not children of other elements in CSS](https://www.stefanjudis.com/snippets/how-to-select-elements-that-are-not-children-of-other-elements-in-css/)," without which I'd have been lost as a goose in what I'm about to describe.
{.box}

Using sans-serif fonts, like this site is doing as of the initial publication of this post, can make some styling combinations hard to see under certain viewing conditions. While this is true for slanted text, it surprisingly can happen with boldfaced text, too, especially if one is viewing in dark mode.

(Obviously, where slanted text is concerned, what we're talking about with many sans-serif web fonts is *obliquing* rather than the more commonly mentioned *italicization*. However, since I suspect readers will be more familiar with calling slanted text "italics" than calling it "oblique," I'll use the former term from here on. Also: equally obviously, *truly* italicized text, like <em class="serif">this serif example</em>, is a completely separate consideration.)

I've noticed some sites, such as [Chris Coyier's](https://chriscoyier.net/), use some subtle styling to make bolds and italics stand out slightly from surrounding plain text, so I decided to try that on this site. I thought at first that it would be fairly simple: just set each variation to be a little darker in light mode and a little lighter in dark mode.

. . . But, not so.

First, I had to take into account the possible *pairing* of boldfaced and italicized text, ***like this***.

Then, I remembered I'd also need to provide for all these variations to work within a blockquote, which starts out looking a little different than the surrounding plain text:

> Here is a blockquote with **bold**, *italic*, and ***bold italic*** text.

And, finally, there was the matter of making sure the specified color differences didn't futz with colors that I didn't *want* to change, such as [within *links* **like** ***this*** one to my home page](/) and within the `red` class I occasionally use for things like the **Important**, below:

<strong class="red">Important</strong>: This is a really big deal, so you should pay attention to it.
{.box}

But if you were to suspect this would require a mountain of gnarly CSS --- or, as of now, [Sass/SCSS](https://sass-lang.com) --- you'd be only half-correct. Gnarly? Oh, yeah. But a mountain? Nope.

Before we get into the actual SCSS involved, note that the color variables to which it refers come from this (and, yes, I'm shamelessly cribbing those `$twcss` colors from the [Tailwind CSS](https://tailwindcss.com) [color palette](https://tailwindcss.com/docs/customizing-colors) and then adding a couple more courtesy of [Eric Meyer's Color Blender tool](https://meyerweb.com/eric/tools/color-blend)):

```scss
// These are relevant excerpts from
// a partial called `_variables.scss`.

$twcss: {
	gray-50: #f9fafb,
	gray-100: #f3f4f6,
	gray-200: #e5e7eb,
	gray-300: #d1d5db,
	gray-350: #b7bcc5,
	gray-400: #9ca3af,
	gray-500: #6b7280,
	gray-600: #4b5563,
	gray-650: #414b5a,
	gray-700: #374151,
	gray-800: #1f2937,
	gray-900: #111827
};
```

With those variables set, here we go. (You may want to copy the code into a text editor for more comfortable, scroll-free viewing.)

```scss
// These are relevant excerpts from
// my `articles.scss` file, which
// comes into play only when a
// page has the `article` element.

@charset 'utf-8';
@use 'partials/variables' as var;

article {

	// First, we assign colors to
	// boldfaced and italicized text
	// that is **not** in the class
	// `red`, **not** inside a link,
	// and **not** within a blockquote
	// (we'll get to blockquotes below).
	//
	// Note that we cover not only
	// <strong> but also <b>, and
	// not only <em> but also <i>;
	// in addition, we take care of
	// groupings --- <strong><em>,
	// <em><strong>, <b><i>,
	// and <i><b>.

	strong:not(.red *):not(a *):not(blockquote *),
	b:not(.red *):not(a *):not(blockquote *),
	em:not(.red *):not(a *):not(blockquote *),
	i:not(.red *):not(a *):not(blockquote *),
	em strong:not(.red *):not(a *):not(blockquote *),
	strong em:not(.red *):not(a *):not(blockquote *),
	i b:not(.red *):not(a *):not(blockquote *),
	b i:not(.red *):not(a *):not(blockquote *) {
		color: map-get(var.$twcss, gray-800); // (vs. gray-700)
		@media (prefers-color-scheme: dark) {
			color: map-get(var.$twcss, gray-200); // (vs. gray-300)
		}
	}

	// Now we deal with the blockquotes,
	// including links within them. Here,
	// we assign colors to boldfaced and
	// italicized text that **is** within
	// a blockquote but is **not** inside
	// a link. (We cover the same tags
	// and groupings as before.)
	//
	// In essence, we're giving this
	// normally grayed-out text some
	// color treatments to differ slightly
	// from usual blockquote styling.

	strong:is(blockquote *):not(a *),
	b:is(blockquote *):not(a *),
	em:is(blockquote *):not(a *),
	i:is(blockquote *):not(a *),
	em strong:is(blockquote *):not(a *),
	strong em:is(blockquote *):not(a *),
	i b:is(blockquote *):not(a *),
	b i:is(blockquote *):not(a *) {
		color: map-get(var.$twcss, gray-650); // (vs. gray-600)
		@media (prefers-color-scheme: dark) {
			color: map-get(var.$twcss, gray-350); // (vs. gray-400)
		}
	}
}
```

Would I want to fool with such spaghetti-ish stuff on a regular basis? Oh, my, no. But when you need it, you need it and, fortunately: (a.) [any valid CSS works in Sass](https://sass-lang.com/guide); and (b.) modern browsers' CSS support [has](https://webkit.org/blog/3615/css-selectors-inside-selectors-discover-matches-not-and-nth-child/) [advanced](https://hacks.mozilla.org/2020/12/and-now-for-firefox-84/) [sufficiently](https://blog.chromium.org/2020/12/chrome-88-digital-goods-lighting.html) over the years to handle situations like this one.
