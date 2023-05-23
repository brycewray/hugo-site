---
title: "More palatable palettes with OKLCH"
description: "Although support is still limited, it’s not too early to begin using The Next Big Thing in CSS color."
author: Bryce Wray
date: 2023-05-23T12:56:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Momentum is building in Web Dev World for a relatively new CSS *color model*, **[OKLCH](https://www.w3.org/TR/css-color-4/#ok-lab)**, that promises to take fuller advantage of both newer display types and the way our eyes really work. While it'll be a good while before you can be almost certain a typical device/browser combo will support this color model, proper use of fallbacks will let you safely start using it now in your website.

<!--more-->

From the web's beginnings in the 1990s, colors on the web have typically been shown with hex notation of red-green-blue (RGB) colors, such as `#ff0000` for the brightest red or `#00ff00` for the brightest green. Of course, those weren't *really* the brightest colors but, rather, the best that RGB/hex could indicate.

Moreover, such notations weren't that intuitive for non-developers to understand when trying to translate colors of, say, logos to RGB/hex-safe versions. Even worse, as monitors (and, later, phone displays) became able to display more color combinations, RGB/hex just wasn't enough to do the job, so other color models came on the scene as the years passed.

About a decade ago, many CSS gurus began urging web devs to use the [HSL](https://www.w3.org/TR/css-color-4/#the-hsl-notation) (hue-saturation-lightness) model, saying it was a lot easier for their non-dev colleagues to understand and more like the way humans themselves see colors. However, even HSL had its problems. One notable one, shared by all the other models of the time, was that changing an HSL color's saturation or lightness typically changed its *hue*, as well, complicating attempts to achieve and maintain uniform color palettes.

Now, perhaps, there's a solution: the OKLCH model, developed in 2020. It's an improvement (hence, the "OK" part of the name) on a *1976* effort, [LCH](https://www.w3.org/TR/css-color-4/#the-hsl-notation) (lightness-chroma-hue). Among its main perceived advantages --- see the "[References and related reading](/posts/2023/05/more-palatable-palettes-oklch/#references-and-related-reading)" at the end for far more than I'll explain here --- is that OKLCH allows keeping a color's hue the same while one adjusts brightness or color saturation (*chroma*). This makes for superior color palettes over those still using earlier color models, as is true for the [RGB/hex-based palettes](https://tailwindcss.com/docs/customizing-colors) within [Tailwind CSS](https://tailwindcss.com).

For example, consider Tailwind's palette of greens. When those colors' values are run through the [OKLCH Color Picker and Converter](https://oklch.com), the results show that the hue --- the "greenness," if you will --- changes slightly (wavering from bluer to yellower, then back) as one goes from light to dark along the choices. Now, compare that to a similar palette of greens that use OKLCH to *keep* their hue all the way through. (If you're using an older browser, you'll see RGB/hex representations rather than the OKLCH colors.)

{{< palette >}}

Your current display may not allow you to see much difference, especially given its subtle nature; so here's a table comparing the OKLCH hue results for the two:

| Color | Tailwind | OKLCH |
|----|----|----|
| **50** | 155.83 | 150 |
| **100** | 156.74 | 150 |
| **200** | 155.99 | 150 |
| **300** | 154.45 | 150 |
| **400** | 151.71 | 150 |
| **500** | 149.58 | 150 |
| **600** | 149.21 | 150 |
| **700** | 150.07 | 150 |
| **800** | 151.33 | 150 |
| **900** | 152.54 | 150 |
| **950** | 152.93 | 150 |
{.ulysses}

[All the major browser engines currently support OKLCH](https://caniuse.com/?search=oklch), but most displays still can't come close to matching some of its more vivid colors. The best that most consumers can use right now are on phones' OLED displays. So, until such time as there's considerably more widespread display support for OKLCH, it's necessary to use [`@supports`](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) to provide both hex and OKLCH versions of color variables (the [OKLCH Color Picker and Converter](https://oklch.com) makes this super-easy):

```css
.myElement {
	--very-light-blue: #dcebfe;
	--medium-red: #db232f;
	--brick-red: #971a20;
	--bright-yellow: #f9f28c;
}
@supports (color: oklch(49% 0.1 252)) {
	.myElement {
		--very-light-blue: oklch(93.5% 0.03 252);
		--medium-red: oklch(57.5% 0.215 25);
		--brick-red: oklch(44% 0.16 25);
		--bright-yellow: oklch(94.5% 0.124 105);
	}
}
```

**Note**: This sort of thing shows why you may want to use [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) even in [Sass](https://sass-lang.com), since you can assign new values to existing CSS variables but **not** to existing Sass variables.
{.box}

## References and related reading

- CSS Working Group, "[CSS Color Module Level 4](https://drafts.csswg.org/css-color/)" (Editor's Draft, <span class="nobrk">2023-05-10</span>).
- MDN Web Docs, ["oklch()"](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) (as modified <span class="nobrk">2023-05-08</span>).
- *Shop Talk Show* podcast, Episode 556, "[Andrey Sitnik and Using OKLCH for Color](https://shoptalkshow.com/556/)" (posted <span class="nobrk">2023-03-13</span>).
- Adam Argyle, "[Open Props okLCH beta](https://nerdy.dev/open-props-oklch-palettes-beta)" (<span class="nobrk">2023-03-31</span>).
- Chris Coyier, "[OK, OKLCH 👑](https://chriscoyier.net/2023/01/22/ok-oklch-%F0%9F%91%91/)" (<span class="nobrk">2023-01-22</span>).
- Keith J. Grant, "[It's Time to Learn oklch Color](https://keithjgrant.com/posts/2023/04/its-time-to-learn-oklch-color/)" (<span class="nobrk">2023-04-07</span>).
- Manuel Matuzović, "[Day 98: oklab() and oklch()](https://www.matuzo.at/blog/2023/100daysof-day98/)" (<span class="nobrk">2023-02-08</span>).
- Jim Nielsen, "[OK LCH, I'm Convinced](https://blog.jim-nielsen.com/2023/ok-lch-im-convinced/)" (<span class="nobrk">2023-01-08</span>).
- Björn Ottosson, "[A perceptual color space for image processing](https://bottosson.github.io/posts/oklab/)" (<span class="nobrk">2020-12-23</span>).
- Andrey Sitnik and Travis Turner:
	- OKLCH Color Picker &amp; Converter --- [website](https://oklch.com) and [GitHub repository](https://github.com/evilmartians/oklch-picker).
	- "[OKLCH in CSS: why we moved from RGB and HSL](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)" (<span class="nobrk">2022-10-25</span>).
- Lea Verou, "[LCH colors in CSS: what, why, and how?](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/)" (<span class="nobrk">2020-04-04</span>).
- Vojtěch Vidra and Ondřej Pešička:
	- "[LCH is the best color space!](https://atmos.style/blog/lch-color-space)" (<span class="nobrk">2022-04-14</span>).
	- "[LCH vs. OKLCH: what is the difference?](https://atmos.style/blog/lch-vs-oklch)" (<span class="nobrk">2023-05-06</span>).
