---
title: "Cloudflare Fonts: my first look"
description: "The CFF offering works as indicated, but there’s one possible gotcha to consider."
author: Bryce Wray
date: 2023-10-17T14:02:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

As [announced](https://blog.cloudflare.com/cloudflare-fonts-enhancing-website-privacy-speed/) a couple of weeks ago, Cloudflare Fonts is now available --- albeit in beta --- and makes it possible to use Google Fonts without the [usually associated anti-privacy problems](/posts/2020/08/google-fonts-privacy/). I gave CFF a quick look-see and, so, am offering this equally quick first look.

<!--more-->

First, CFF does what the announcement promised: it "sees" a Cloudflare Pages project's use of Google Fonts and translates that to a delivery of those fonts as if they were self-hosted **and**, most notably, **not** Google-hosted. The result: web fonts that load more quickly and don't come with the burden of code that "phones home" to Google.

That part's good. Whether you care about the next part will depend on whether your site has a [Content Security Policy](https://content-security-policy.com) (CSP).

CFF injects the necessary CSS for the fonts as a `style` statement within the `head` of each relevant page in a site, and such statements aren't CSP-friendly by default. That's because a garden-variety CSP [blocks inline styles](https://content-security-policy.com/examples/allow-inline-style/). There are two good ways, and one not-so-good way, to get around this:

- The good ways involve injecting either a [nonce](https://content-security-policy.com/nonce/) or a hash, often through something like a [Cloudflare Pages Function](https://developers.cloudflare.com/pages/platform/functions/#functions), into every `style` statement and then declaring in the CSP that the nonce and/or hash injection makes the inline styling okay.
- The not-so-good way is, essentially, a cheat --- you add `unsafe-inline` to the CSP's `style-src` section.

I found that I can't use either of the good ways to get around this issue with the Cloudflare Fonts service, because it injects its `style` content **after** my Pages Function does its search/replace work to add nonces to any inline styling already in my code.[^inline] So, in order to test CFF, I had to take a little edge off my CSP. I'm not crazy about that, but I suspect most Cloudflare Pages users aren't so picky regarding CSPs and, thus, will find Cloudflare Fonts an unalloyed boon.

[^inline]: In each such case, the inline styling exists due to third-party stuff over which I lack control. Otherwise, I avoid inline styling specifically to avoid violating the CSP.

**Update, 2023-10-23**: My early testing of CFF on a specific subset of Google Fonts --- variable "Latin" fonts with both regular and italic styles --- showed a small number of cases where CFF fails to work. By "fails to work," I mean the font either (a.) isn't "de-Googled" or (b.) isn't loaded at all. Again, CFF is still in beta. Besides, it could be that the problematic Google Fonts themselves have glitches which somehow confound CFF code. The Google Fonts where I encountered problems were [Brygada 1918](https://fonts.google.com/specimen/Brygada+1918), [DM Sans](https://fonts.google.com/specimen/DM+Sans), [Exo 2](https://fonts.google.com/specimen/Exo+2), [Kumbh Sans](https://fonts.google.com/specimen/Kumbh+Sans), [Noto Serif](https://fonts.google.com/noto/specimen/Noto+Serif), [Roboto Condensed](https://fonts.google.com/specimen/Roboto+Condensed), [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3), and [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4).
{.box}
