---
layout: singlepost
title: "Down with flabby fonts"
description: "How to subset large web font files to improve your site’s performance."
author: Bryce Wray
date: 2021-08-08T14:00:00-05:00
lastmod: 2022-03-23T08:22:00-05:00
discussionId: "2021-08-down-with-flabby-fonts"
featured_image: "typography-1069409_6000x4000.jpg"
featured_image_width: 6000
featured_image_height: 4000
featured_image_alt: "Closeup view of type sheet showing type specifications"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/fill-8988/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1069409">Florian Pircher</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1069409">Pixabay</a></span>
---

{{< disclaimer >}}

Consider this a blast from the past, just the not-too-distant past.

Last year, I issued the [initial offering](/posts/2020/12/gems-in-rough/) of what became a series of "Gems in the rough" posts with tips for my fellow and sister static website nerds. Near the end of that post, I described a procedure for cutting web fonts down to size, so as to make them a smaller (and thus faster) download for your visitors.

Because I keep seeing the appearance of *non*-downsized fonts in the code of more websites than I care to consider, I thought I'd give that segment a post of its own, albeit with a few edits here and there to account for current realities.

*So return with us now to that thrilling post segment of yesteryear&nbsp;.&nbsp;.&nbsp;.[^LoneRanger]*

[^LoneRanger]: H/t to the [fabled intro for *The Lone Ranger*](https://en.wikipedia.org/wiki/Lone_Ranger#Introductions).

## Very Inter-esting

As of the initial publication of this post, this site uses the [Inter font](https://rsms.me/inter), and specifically the [variable](https://web.dev/variable-fonts/) version thereof (which, from here, I'll call "Inter VF”). Inter is a beautiful sans-serif font that looks a lot like San Francisco, the native system font on Apple devices.

{{< imgc src="2021-09-01_screen-cap_Inter_2164x698.png" alt="Sample of the Inter web font" width="2164" height="698" >}}

The problem is that, due to the vast number of [glyphs](https://en.wikipedia.org/wiki/Glyph) it contains, Inter can be a *really* large download. So you want to make sure you *[subset](https://dev.to/benjaminblack/save-your-users-data-by-subsetting-web-fonts-5eo9)* it, extracting only those parts your site will actually use, and then use your CSS to tell the site to *use* only those parts. This is referring specifically to Inter VF because I think using *just* the variable-font version, which can provide all the styles you want, is more sensible than having to do the following procedure with *multiple* conventional (static) font files:

1. Download the full variable-font version of Inter ([its repository's "Releases" page](https://github.com/rsms/inter/releases/) should always have the latest). It's a TrueType font (.ttf), but that's OK. In the next step, you'll fix that.
2. To subset, install and use the [Python](https://python.org) `fonttools` library [as explained by Michael Herold](https://michaeljherold.com/2015/05/04/creating-a-subset-font/). For example, here's the command I use to change the Inter VF TrueType font to the .woff2 web font file I want (the file naming is based on the Inter v.3.19 font I used):

```python
pyftsubset Inter.ttf \
--unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" \
--layout-features="kern,liga" \
--flavor="woff2" \
--output-file="Inter-3-19_subset_2021-06-18.woff2"
```

3. Set your CSS to use Inter VF for all your font weights (we'll tell it how to handle slanted text in a moment), as shown here in the `fonts_Inter.css` file I `@import` with [PostCSS](https://postcss.org) for my site's final CSS:

```css
/* === Inter, variable === */
/* ===
references:
https://thetrevorharmon.com/blog/how-to-prepare-and-use-variable-fonts-on-the-web
https://rwt.io/typography-tips/getting-bent-current-state-italics-variable-font-support
=== */
/* latin */
@font-face {
  font-family: 'Inter';
  font-weight: 1 999;
  font-style: normal;
  font-display: swap;
  /* optional is best for first-run CLS checks; swap looks better on one-hit */
  src: url('/assets/fonts/Inter-3-19_subset_2021-06-18.woff2') format('woff2-variations');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

4. Finally, counter the weirdness of how Inter VF handles slanted (obliqued) text in different browsers.[^oblBr] In my `intervf.css` file (also `@import`ed into the final CSS), I have found the following to work for all the major current browsers, and please note that some of this is due to my use of [Tailwind CSS](https://tailwindcss.com):

[^oblBr]: Like many sans-serif fonts, particularly variable versions thereof, Inter VF doesn't do *true* italics; instead, it does *obliques*.

```css
/* === handling Inter VF obliquing */
.italic, i, cite, em, var, address, dfn, h3, h5 {  /* dealing with Inter VF */
  font-variation-settings: 'slnt' -8;
  /* previous is needed by Chromium and Safari; its presence makes Firefox "over-slant" Inter VF, so we override that below with the media query for Firefox */
  font-style: oblique 8deg;
  /* previous is needed by Firefox and Safari; it apparently has no effect on Chromium */
}

@supports (-moz-appearance: none) {
  .italic, i, cite, em, var, address, dfn, h3, h5 {
    /* font-variation-settings: normal; */
    font-style: normal;
  }
}
/* === end, handling Inter VF obliquing */
```

## Slim, Jim

*Back to the present&nbsp;.&nbsp;.&nbsp;.*

I encourage you to get comfortable with the subsetting procedure described here. After all, there are a lot of other great web fonts for the grabbing, and virtually all of them can use the slimming-down process this involves.[^subsetDiffs] It's not easy to put yourself on a diet when that's needed, but following these steps will make it a snap to de-fat your fonts.

[^subsetDiffs]: Besides, your site may have totally different needs where the characters-to-be-included-in-the-subset are concerned, so it makes sense to learn this procedure and adapt it for not only different fonts but also different subsetting.
