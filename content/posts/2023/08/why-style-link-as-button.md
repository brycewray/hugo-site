---
title: "Why to style a link as a button"
description: "Fixing a long-standing sin against accessibility — and, as it turns out, against correct HTML."
author: Bryce Wray
date: 2023-08-16T16:13:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

This is one of those posts where I: (a.) explain that this website had some screwed-up code; (b.) note that I've fixed that code; and (c.) tell you how to make the fix, just in case you have a website with a similar problem. And, in this case, the screwed-up code was not only anti-accessibility but also lousy HTML.

<!--more-->

The **Reply via email** button at the bottom of every post on the site has, until today, been structured roughly as follows:

```html
<contact-button>
	<a
		href="[link]"
	>
		<button>
			<svg>
				[Email icon]
			</svg>
			<div>
				Reply via email
			</div>
		</button>
	</a>
</contact-button>
```

The problem with that, as I learned today, was having a button inside an anchor link. This amounted to two major sins.

First, it's **bad HTML**. The HTML5 specification says the [`a` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element) cannot contain [interactive content](https://html.spec.whatwg.org/multipage/dom.html#interactive-content-2), one example of which is the `button` element.

Second, it's **bad for accessibility**. One can readily imagine how a button inside a link could play havoc with the use of assistive technology. The following excerpt from "[Links VS Buttons: A Perennial Problem](https://www.digitala11y.com/links-vs-buttons-a-perennial-problem/)" really nails it down:

> Use buttons when the [user action] causes a change in either [the back end] or the [front end] of the website[; f]or example, submitting a form, [or] opening a pop-up or a modal or a [panel] on the same page.
>
> Use links when the [user action] doesn't affect the website at all. In this, the users are just readers or spectators of the site[; f]or example, to navigate to the next page or an external source after viewing the content of the page.
>
> This is just usability. When it comes to accessibility, when an element looks like a button or link, use the respective markup to mark its role. That would help . . . assistive technologies like screen readers and speech[-]recognition software . . . to expose appropriate roles to the users.

*[Edited for style.]*

The solution to all this was to style the link to *look like* a button **and** use its markup to identify the link's `role` as `"button"`:

```html
<contact-button>
	<a
		href="[link]"
		class="contactButton"
		role="button"
	>
		<svg>
			[Email icon]
		</svg>
		<div>
			Reply via email
		</div>
	</a>
</contact-button>
```

So, if your website has any `button` elements wrapped inside any `a` elements, that's the way to resolve such issues. It's nice, (relatively[^CSS]) easy, *and* the right thing to do.

[^CSS]: The styling is the main thing that keeps it from being more than "relatively" easy; but, at least in my case, it wasn't too hard to adapt the former `button` element's styling to the `contactButton` class I then assigned to the `a` element.
