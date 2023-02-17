---
title: "Some of the future is now for CSS: a postscript"
description: "While there certainly are many use cases for CSS variables, my simple little site turns out not to be one of them."
author: Bryce Wray
date: 2023-02-15T08:56:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

<strong class="red">Note</strong>: Please see the **Update** at the bottom.
{.box}

I'm not sure if what I'm about to describe is a textbook proof why one shouldn't look a gift horse in the mouth. After all, the horse's teeth are actually pretty good. It's more a case of the lower-quality field on which I'd planned to let the horse run.

As you may know, I [modified this site](/posts/2023/02/some-future-now-css/) to make use of not only [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) ("CSS variables") but also, more notably, the [emerging CSS Nesting standard](https://drafts.csswg.org/css-nesting/) --- *i.e.*, as opposed to the site's more traditional use of [Sass](https://sass-lang.com) for both variables and nesting.

While I was pretty happy with how the CSS Nesting worked, I soon realized that managing CSS variables would be another matter.

<!--more-->

This is because CSS variables require a lot of care and forethought to keep your delivered CSS from being bloated. ([Kevin Powell](https://www.kevinpowell.co/) explained it extremely well in his 2019 article, "[Breaking CSS Custom Properties out of :root Might Be a Good Idea](https://css-tricks.com/breaking-css-custom-properties-out-of-root-might-be-a-good-idea/).") And, in the final analysis, I decided my simple little static site just didn't merit that much effort.

For one thing, many of the explanations you'll find out there for why CSS variables are so cool involve [using JavaScript to alter the variables' values at runtime](https://12daysofweb.dev/2021/css-custom-properties/#accessing-and-setting-custom-properties-with-javascript). I'm 99.9% sure I won't be doing that, regardless of whether the site is on [Hugo](https://gohugo.io) or [Eleventy](https://11ty.dev) at any given time.

For another, the way I've implemented ["sorta scoped" styling](/posts/2023/01/sorta-scoped-styling-hugo-take-two/) --- in which I inject critical CSS into each page's `head` while conditionally providing separate files on a per-page basis --- falls flat without the ability to share a *lot* of variables, specifically for colors. Again, this is the situation of which that Kevin Powell article warned. It's not a problem for Sass but, with CSS variables, you must strictly manage individual styling files' uses of those variables so you don't "ship" a ton of stuff in `:root` (meaning, on **every** page). I couldn't see a reason for the restructuring that would require, especially on the "sorta scoped" CSS files, since my tests showed it **still** would've resulted in a considerably fatter per-page download *vs.* the results if using Sass.

Thus, what I'd called the `newcss` theme now exists online only in the [repo](https://github.com/brycewray/hugo_site)'s Git history, after I'd learned not only what I'd hoped to learn but also a few more things I hadn't expected. In the process, I discovered that others' feature-packed farms are more appropriate homes where that wonderful gift horse, CSS variables, can frolic with abandon --- while my spare little spread is a perfectly fine home for good ol' Sass.

----

## *Update, 2023-02-17*

The above points notwithstanding, I decided to do that restructuring after all.

It turned out to be less trouble (albeit somewhat tedious) than I'd anticipated **and** allowed me to get at least one clear benefit out of using CSS variables because they, unlike Sass variables, can be redefined after their initial declaration. Here are some excerpts from my "sorta scoped" `code.css` file for styling code blocks:

```css
.chroma *, .code-inline * {
	color: var(--clr-lt, yellow);
	@media (prefers-color-scheme: dark) {
		color: var(--clr-dk, midnightblue);
	}
} /* fallback colors to catch var issues) */

/*
Now, for each subsequent entry,
we redefine `clr-lt` and `clr-dk`
as desired. 
*/

.chroma .err, .code-inline .err {
	--clr-lt: var(--twcss-red-700);
	--clr-dk: var(--twcss-red-300);
}

.chroma .kn, .code-inline .kn {
	--clr-lt: var(--twcss-cyan-700);
	--clr-dk: var(--twcss-cyan-300);
}

/*
. . . and so on down the list
of code possibilities. The end 
result is a shorter, easier-to-read
CSS file.

And, yes: those colors are lifted
from Tailwind CSS's color palette
(https://tailwindcss.com/docs/customizing-colors), 
as their variables' names suggest.
My Sass styling uses them, too.
*/
```

Don't misunderstand: I still maintain that my site (regardless of its build process) will likely never get the *full* benefits of using CSS custom properties. However, having managed the most onerous part of the transition between Sass variables and CSS variables where my styling files were concerned, I've decided to give CSS custom properties (and, with them, CSS Nesting) another go.
