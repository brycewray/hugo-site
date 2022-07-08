---
title: "More tips for using giscus"
description: "How to lessen the load or, at least, make it easier to bear."
author: Bryce Wray
date: 2022-07-07T22:14:00-05:00
#draft: true
#initTextEditor: iA Writer
---

**N.B.**: This follow-up to "[Tips for using giscus](/posts/2022/05/tips-using-giscus/)" assumes you already read the original and are acquainted with both posts' shared subject: the [giscus](https://giscus.app) commenting system, which uses the [GitHub Discussions](https://docs.github.com/en/discussions) Search API. If you **haven't** read that first one, please do so before proceeding.
{.yellowBox}

Two of the biggest performance hits you'll encounter in using giscus are due to its being (a.) a JavaScript-heavy [Next.js](https://nextjs.org) app and (b.) remotely hosted --- well, it does have a [*self*-hosted option](https://github.com/giscus/giscus/blob/main/SELF-HOSTING.md), but that looks like a bear to install and maintain. While you can't (otherwise) eliminate either of those, there are a couple of things you can do to lessen their impact.

## Don't show it by default

The Next.js app will load a bunch of JavaScript on page-load **if** you don't *lazy-load* giscus [as I suggested in the first post](http://192.168.254.10:3000/posts/2022/05/tips-using-giscus/#get-lazy); but, even with lazy loading set, it'll still dump all that JS on the user when that part of the page comes into view. The only way around that is not to *let* that part come into view **unless** the user wants it. The way I'm handling this is with the HTML [`detail`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) and [`summary`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) elements. As [MDN](https://developer.mozilla.org/en-US/) explains:

> The `<details>` HTML element creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state. A summary or label must be provided using the `<summary>` element.
>
> A disclosure widget is typically presented onscreen using a small triangle which rotates (or twists) to indicate open/closed status, with a label next to the triangle. The contents of the `<summary>` element are used as the label for the disclosure widget.

However, you can get a little more creative and use CSS/SCSS to style these elements so that it looks like a **View/hide comments** *button*, as you can see at the bottom of this post.

Here's an abbreviated version of my [Hugo](https://gohugo.io)-based `comments-giscus.html` template as of this writing:

```go-html-template
<details class="comments">
	<summary class="ctr pokey">
		<strong>View/hide comments</strong>
	</summary>
	<div class="giscus-comments">
		<script src="https://giscus.app/client.js"
			{{/*
			... and all your specific settings,
			which we'll skip here to save space
			*/}}
		>
		</script>
		<p class="ctr pokey sansSerif">
			Commenting by <strong><a href="https://giscus.app" target="_blank" rel="nofollow">giscus</a></strong>.
		</p>
	</div>
</details>
``` 

. . . and the SCSS for the `details` and `summary`:

```scss
@use 'variables' as var;
// This `@use` statement refers to an
// SCSS partial, `_variables.scss`.
// The statement and the subsequent
// variables it enables below --- such as
// `var.$blue` --- require the use of 
// **Dart Sass**. If you're still using the
// Hugo default of Libsass, remove the
// `var.` before each `$` (**and**,
// of course, declare the vars someplace).  

details.comments > summary {
	list-style: none;
	color: var.$white;
	border-radius: 6px;
	margin: 0 auto;
	border: 1px solid var.$darkblue;
	background-color: var.$darkblue;
	padding: 0.5em 0.25em;
	width: 20em;
	&:hover {
		cursor: pointer;
		background-color: var.$blue;
		@media screen and (prefers-color-scheme: dark) {
			border: 1px solid var.$blueLightBtn;
			background-color: var.$blueLightBtn;
		}
	}
	@media screen and (prefers-color-scheme: dark) {
		border: 1px solid var.$code-color-blueLight-dark-mode;
		background-color: var.$code-color-blueLight-dark-mode;
		color: var.$black;
	}
}

details.comments > summary::marker,
details.comments > summary::-webkit-details-marker {
	display: none;
}
```

This way, the user must **choose** to show the comments area, and the JS load comes into play *only* if that occurs. To see for yourself how it all works, open the **Network** tab in your browser's Inspector tool and then play with the **View/hide comments** pseudo-button down below.

## Give the browser a head-start

To facilitate slightly faster linking to the giscus app's remote host, just insert these [**resource hints**](https://www.w3.org/TR/resource-hints/) in each page's `head` (such as through a `head.html` [partial template](https://gohugo.io/templates/partials/), as I've done in this site):

```html
<link rel="preconnect" href="https://giscus.app">
<link rel="dns-prefetch" href="https://giscus.app">
```

Why *both* `preconnect` and `dns-prefetch`? As web.dev [explains](https://web.dev/preconnect-and-dns-prefetch/#resolve-domain-name-early-with-reldns-prefetch):

>  [Browser support for `dns-prefetch`](https://caniuse.com/#search=dns-prefetch) is slightly different from [`preconnect` support](https://caniuse.com/#search=preconnect), so `dns-prefetch` can serve as a fallback for browsers that don't support `preconnect`.

Notably --- and weirdly --- Firefox is one browser that **still** doesn't support `preconnect`, and its support for `dns-prefetch` is limited to connections *not* using the secure `https` protocol (which now excludes nearly all URLs one should even consider visiting). However, given Firefox's small [market share](https://gs.statcounter.com/browser-market-share), the suggested use of `preconnect` and `dns-prefetch` should help most users, while Firefox will simply ignore these two resource hints.