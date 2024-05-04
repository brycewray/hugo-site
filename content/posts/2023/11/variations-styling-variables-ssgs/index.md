---
title: "Variations on styling variables in SSGs"
description: "The CSS-or-Sass question about styling variables is a lot simpler to answer when you’re building your site the right way."
author: Bryce Wray
date: 2023-11-26T16:29:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Ever since [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) became a thing back in the 2010s, users of [Sass](https://sass-lang.com) have wondered how much of a fill-in they could be for [Sass variables](https://sass-lang.com/documentation/variables/). While you certainly can opt to use only one of these styling variable types, your best bet likely is a wise combination of both. That's especially true if you're building your website the smart way, by using a Sass-savvy static site generator (SSG).

<!--more-->

Before I proceed, let me acknowledge that the correct term is *CSS custom property* rather than *CSS variable*, but most folks seem to use the latter term when talking about the thing, so let's just give in and call it a *CSS variable*. Besides, that'll make it easier to understand the comparisons to follow.

Although some web development gurus say one should use *either* CSS variables *or* Sass variables --- with the first group apparently becoming more numerous by the month --- each type of styling variable has its place. And, thanks to how easy it usually is to enable Sass on an SSG, you definitely can make use of both types. In fact, you should.

Here's a simple rule of thumb. **If you're going to use JavaScript to alter a value at the browser's run-time, store the value in a CSS variable; otherwise, store it in a Sass variable.**

Why? Well, other than the obvious reason that you *can't* alter a Sass variable at run-time, it's also because storing anything in a Sass variable gives the browser less work to do, since the value is provided by the Sass compilation process (which, again, is "no-brainer"-level automatic in a typically configured SSG). The less work the browser has to do, the more efficiently the browser can deliver your page.

So, let's say you're using a variable, such as `font-family`, that shouldn't change in the browser under any circumstances. That should be a Sass variable:

```scss
$sans-serif: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

html, body {
	font-family: $sans-serif;
}
```

But, if you need a variable whose value will (or can) change based on some run-time event --- as is the case with this page's JavaScript-based toggle between light and dark modes --- that has to be a CSS variable. With that in mind, here's an example of how to use *both* variable types, each where it makes more sense:

```scss
// These values won't change,
// so they're in Sass variables.
$bkgd-light: #fefefe;
$bkgd-dark: #202020;

// But this one will, so it's
// in a CSS variable...
html, body {
	background-color: var(--bkgd);
}

// ... the value of which changes
// conditionally (based on the
// user-selected `data-theme`)
// to the appropriate one of
// the Sass variable values.
[data-theme="light"] {
	--bkgd: #{$bkgd-light};
}
[data-theme="dark"] {
	--bkgd: #{$bkgd-dark};
}
```

**Note**: As you can see above, using a Sass variable **inside** a CSS variable [requires *interpolation*](https://sass-lang.com/documentation/breaking-changes/css-vars/) (the wrapping `#{` and `}`).
{.box}

[Sass still has a lot to offer](/posts/2021/04/speaking-up-for-sass/) even now, despite the ongoing advances of vanilla CSS. Using Sass whenever it's the better fit is a sound strategy to follow in your web development process.
