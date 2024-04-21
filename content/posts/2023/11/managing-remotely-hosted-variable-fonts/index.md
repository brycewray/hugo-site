---
title: "Managing remotely hosted variable fonts"
description: "“With great power comes . . .” — well, you know."
author: Bryce Wray
date: 2023-11-16T10:56:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

<strong class="red">Update, 2024-04-21</strong>: Due to a variety of factors, I recommend that you **not** use the Cloudflare Fonts product described herein.
{.box}

While Cloudflare continues to [beta-test Cloudflare Fonts](https://blog.cloudflare.com/cloudflare-fonts-enhancing-website-privacy-speed/), there are some items you'll want to consider regarding whatever way you may be using *remotely* hosted [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide) on your website. Some of these variable fonts are *extremely* variable, so you'll want to know how that can affect performance.

<!--more-->

First of all: believe me, I'm all for variable fonts, and have been using them on this site ever since I learned of their existence. Given my tendencies to use **bold** and *italic* and ***bold italic*** text all over the place in all kinds of weights and sizes, variable fonts beat static fonts for me in just about every way possible.

However, "with great power comes great responsibility," and that holds true for the power that variable fonts give you. Or so I have learned while "de-Googling" certain variable Google Fonts within the Cloudflare Fonts beta. Most of the fonts I tested offer only different weights. However, some offer those and quite a bit more. Simply put: the more of these extra capabilities you enable, the bigger the resulting font files; and, even if you *don't* enable them, fonts which have the capabilities are going to produce larger downloads than fonts which don't.

**Note**: Remember that [you **don't** want to use Google Fonts **as served by** Google](/posts/2020/08/google-fonts-privacy/). If you can't (or choose not to) access them through Cloudflare Fonts, [host them **locally**](/posts/2020/08/good-stuff-without-google/).
{.box}

Here are some scenarios. The font file sizes are all accurate as of this post's initial publication date.

As a point of comparison, the [Libre Franklin](https://fonts.google.com/specimen/Libre+Franklin) variable font is one of the simpler ones in the Google Fonts arsenal. All it offers are a range of [weights](https://fonts.google.com/knowledge/glossary/weight_axis) from 100 through 900. Even if you specify all of them for both regular and italic typefaces, the resulting downloads are only 29 Kb (regular) and 32 Kb (italic).[^subsets]

[^subsets]: In my testing, I've found that one nice thing about using Libre Franklin this way rather than through self-hosting is that you get roughly the same file sizes from the full set, thanks to Google's coding (prior to the "de-Googling" by Cloudflare Fonts), as opposed to having to [subset the locally hosted fonts to trim them down](/posts/2021/08/down-with-flabby-fonts/).

But, on the other end of the spectrum, there's the [Roboto Serif](https://fonts.google.com/specimen/Roboto+Serif) variable font. It lets you specify not only all those weights but also [optical size](https://fonts.google.com/knowledge/glossary/optical_size_axis), [width](https://fonts.google.com/knowledge/glossary/width_axis), and [grade](https://fonts.google.com/knowledge/glossary/grade_axis). Even if you enable only the same variable weights for Roboto Serif as in the Libre Franklin example[^weights] and none of the other add-ons, you get downloads of 65 Kb (Roman) and 71 Kb (italic) --- each more than twice as large as its counterpart on the simpler Libre Franklin font.

[^weights]: It happens that Libre Franklin and Roboto Serif share the same weights range, 100--900. That's not true for all Google Fonts offerings, variable or otherwise, so you'll need to investigate the available characteristics of the specific font(s) in which you're interested.

Start turning on more stuff, and those Roboto Serif font file downloads get considerably larger in a hurry. Below, for each description, the described download sizes are for Roman and italic typefaces, respectively.

- Repeating here for your convenience: with just variable weights enabled, the downloads are 65 Kb and 71 Kb.
- With variable weights *and* optical sizes, the downloads are 147 Kb and 170 Kb.
- With variable weights *and* optical sizes *and* a **fixed** width setting of 75%, the downloads are 160 Kb and 180 Kb.\
\
With variable weights *and* optical sizes *and* **variable** widths from 50 through 150 (the latter would be accessible through [CSS's `font-stretch` property](https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch)), the downloads grow to 380 Kb and 440 Kb. In fact, even if you specify only one fixed width **but** it's not one of the [Google-specified widths](https://fonts.google.com/specimen/Roboto+Serif/tester) (50, 62.5, 75, 87.5, 100, 112.5, 125, and 150) --- say, 70 --- the downloads *still* are those same respective sizes.
- And, if you enable the whole shebang --- variable weights *and* optical sizes *and* variable widths *and* variable grades, whether you're talking about a specific grade or any range within the acceptable span of -50 through 100 --- the downloads grow to elephantine sizes of **570 Kb** and **731 Kb**.[^IRL] That's **well over a megabyte** just for two font files.

[^IRL]: Is this a realistic scenario? No. The point is that you pay for these added capabilities by inflating your site's total download sizes.

The bottom line is that, if using fonts with added capabilities, you'll have to experiment with them and then, with the data you gain, assess the best strategies for your site on a costs-*vs.*-benefits basis.

Here's an example. It's likely that a substantial portion of your audience views your site on phones. Although enabling optical sizes is especially good for showing very small type (*e.g.*, for footnotes), the resulting larger sizes of the font downloads are a disadvantage for phones that are on not-so-great connections. So one way around that would be providing web fonts to only devices with larger screens, since phones' system fonts usually are designed specifically to mitigate the peculiarities of phone displays. Here's a very basic CSS example of how to do that, using the aforementioned Roboto Serif:

```css
:root {
	--serif: ui-serif, serif;
}

@media screen and (min-width: 1024px) {
	:root {
		--serif: "Roboto Serif", ui-serif, serif;
	}
}

html, body {
	font-family: var(--serif);
}
```

Of course, if you require **all** devices to show your desired font choices for branding purposes or some other reasons, this wouldn't be appropriate. Again, you'll have to determine what works best for your site.

I hope this information will help inform your best use, if any, of remotely hosted fonts.
