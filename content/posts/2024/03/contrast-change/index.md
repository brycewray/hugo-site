---
title: "Contrast and change"
description: "Readability and accessibility — pick any one? Not really."
author: Bryce Wray
date: 2024-03-08T16:53:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

<strong class="red">Important update, 2024-03-09</strong>: After receiving some important advice, via Mastodon, from accessibility experts [Adrian Roselli](https://adrianroselli.com/) and [Ben Myers](https://benmyers.dev/), I have reverted to underlining the site's links. I found particular help in the details within Roselli's "[On Link Underlines](https://adrianroselli.com/2016/06/on-link-underlines.html)," and am grateful to both of these gentlemen for courteously and informatively setting me straight on the matter --- although, for the sake of archival integrity, I'll leave the post below as it was *before* they set me straight.
{.box}

If you normally check my blabberings only through your friendly feed reader, this might be one of those times when you click on through to the real site, because that's the only way you'll be able to see what I'll be describing. As of the initial publication of this post, the ol' site's appearance has changed a bit.

<!--more-->

## Avoiding a false choice

The most obvious alteration is that the links are no longer underlined as they had been since 2019, shortly after I took a course in website accessibility. Although that concern still motivates me, I've long known the always-visible underlines also made my text blocks less clean-looking. I've further suspected the underlines compromised readability, and I recently learned I had [justification](https://uxbooth.com/articles/is-the-underlined-link-hurting-readability/) to think so.

Still, I had no interest in having to choose between the equally worthy goals of readability and accessibility. Fortunately, I learned there was no reason for such a choice. [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) has [an alternative](https://www.w3.org/WAI/WCAG22/Techniques/general/G183) for sites which prefer not to underline links: you simply make sure a link's color has at least a 3:1 contrast ratio when compared to its surrounding text.[^focus]

[^focus]: Note that the same guidance says you **do** still need to have a link show a different appearance whenever, *e.g.*, a cursor is hovering over it. Each link here does take on an underline at such times and, as was previously the case, it changes color as an additional visual confirmation.

Well, I *say*, "simply," but that actually proved to be a bit difficult to accomplish with my dark-mode CSS, where my previous light blue link color definitely failed the 3:1 test with the body text's dark-mode color.[^evenSo] Nonetheless, I got it done --- thanks in large part to [Chip Cullen](https://chipcullen.com/)'s [Contrast Triangle tool](https://contrast-triangle.com/) and [accompanying blog post](https://chipcullen.com/the-contrast-triangle/), both of which I strongly recommend for checking the accessibility of your own site's non-underlined links.

[^evenSo]: Even after restoring the link underlining as mentioned in my update at the top, I decided to keep the 3:1 contrast ratio for the dark-mode links. (My light-mode links already met the test.)

## A (somewhat) fresh face

Another change, which I'd already implemented a few days earlier, was switching the site to the [variable](https://web.dev/articles/variable-fonts) version of the [Inter](https://rsms.me/inter) web font. I've previously used Inter v.3.x here, but it lacked a true italicized form and thus required some browser-specific [`font-variation-settings`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings) tweaks. Then, finally, the Inter project added a real italic face a few months back with the [release](https://github.com/rsms/inter/releases/tag/v4.0) of Inter v.4.0. The new version still has some [annoying bugs](https://github.com/rsms/inter/issues?q=is%3Aissue+4.0) and adds more to the site's download size than I'd prefer, even after the [subsetting process that I always apply to web fonts](/posts/2021/08/down-with-flabby-fonts/). However, those concerns aside, Inter v.4.0 suits me fine, and I hope you will find its presence equally agreeable.

**Note**: In an effort to minimize bandwidth concerns for phone users with less-than-optimal connectivity, I deliver web fonts to only viewports with at least a width of 1,024 pixels (see also "[Managing remotely hosted variable fonts](/posts/2023/11/managing-remotely-hosted-variable-fonts/)").
{.box}
