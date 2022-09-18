---
title: "The “crossorigin” conundrum"
description: "After days of getting results that I shouldn’t be getting, I’m sending up an SOS to anyone who can set me straight."
author: Bryce Wray
date: 2022-09-17T22:58:00-05:00
#draft: true
initTextEditor: iA Writer
---

One thing you'll often see explained on the web is that, if you [preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload) a web font to enhance your site's performance, [the `preload` statement must include `crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload#cors-enabled_fetches) or the font will be double-downloaded.

But what if you include `crossorigin` and the font **still** is downloaded twice?

That's an oddity I've been experiencing, and I hope somebody reading this will have the answer; because, for days, I've tried in vain to figure this out. Given the following HTML (formatted here for easier reading):

```html
<link
	rel="preload"
	as="font"
	href="/fonts/Inter-3-19_subset_2021-06-18.woff2"
	type="font/woff2"
	crossorigin
/>
<link
	rel="preload"
	as="style"
	href="/css/index.eadfd90b48f7358048ed511345ff6b9a.css"
/>
<link
	rel="stylesheet"
	href="/css/index.eadfd90b48f7358048ed511345ff6b9a.css"
	type="text/css"
/>
```

. . . and the following within the CSS:

```css
@font-face {
	font-family: 'Inter';
	font-weight: 1 999;
	font-style: normal;
	font-display: swap;
	src: url('/fonts/Inter-3-19_subset_2021-06-18.woff2') format('woff2-variations'), url('/fonts/Inter-3-19_subset_2021-06-18.woff2') format('woff2');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

. . . I don't understand why I get this result (this is a "waterfall" from [GTmetrix](https://gtmetrix.com)):

{{< imgh src="GTmetrix-waterfall-2022-09-17-0725CDT_1314x428.png" alt="Screen capture of “waterfall” data from a GTmetrix test of this website’s home page" >}}

. . . which shows that the `woff2` font file is loaded twice.

(And I've tried different fonts, each of which double-loads when I employ similar code, so it's not anything about the specific font file shown above.)

Help, please?? Thanks in advance.
