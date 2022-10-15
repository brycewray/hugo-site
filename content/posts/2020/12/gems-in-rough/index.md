---
title: "Gems in the rough"
description: "I learned these the hard way; perhaps you won’t have to do the same."
author: Bryce Wray
date: 2020-12-21T12:10:00-06:00
---

{{% disclaimer %}}

It's tips time, my fellow and sister static website aficionados.

I sometimes discover, and then want to share with you good folks,  some shiny, little nuggets of geeky information that present themselves while I'm messing around with [static site generators](https://jamstack.org/generators) (SSGs) and other tools that I use to build not only this site but also some [starter sites](/posts/2020/07/beginners-luck/). However, those shiny nuggets often are *so* little that they don't merit posts of their own.

Thus, in this post, I'm describing some of them for you. Perhaps this will end up being a series of its own, as with my more general "Mixed nuts" series; perhaps not. Verily, time shall tell. But let's not get ahead of ourselves.

## Ahead code?

{{< imgc src="index-njk_in_Nova_3202x2022.png" alt="Screen shot of index.njk template in Nova code editor" width=3202 height=2022 >}}

As I write, I'm about a week into the 30-day free trial of the new [Nova](https://nova.app) code editor for macOS (and only macOS), the successor to [Panic](https://panic.com)'s venerable [Coda](https://panic.com/coda/). The Mac-focused Panic first released Nova only a few months ago, but has steadily improved it. As is typical for a Panic app, it's really slick and, as someone who is in the second half of his *fourth decade* as a Mac user and first became acquainted with Panic apps in the mid-"aughts," I admire its many Mac-ish touches. Unlike Microsoft's [Electron](https://www.electronjs.org/)-based [Visual Studio Code](https://code.visualstudio.com), Nova is a *native* app. It's also much easier to configure and extend than VS Code.

Those are the good parts. Now, the not-so-good parts.

- While VS Code is free, Nova is $99 (purchase) with an optional $49/year additional subscription to keep getting updates.
- While Nova is Mac-only, VS Code --- precisely because it's Electron-based --- is cross-platform. While you may not care about that part if  your work is Mac-only, the more limited availability also limits Nova regarding extensibility since it tends to discourage creation of extensions.
- Nova's integration with [Git](https://git-scm.com)-based source control is still a work in progress, while VS Code's is already extensive and, I suspect, will always be ahead of Nova's simply because, again, so many devs on multiple platforms use and develop for VS Code.
- There simply are a number of things which just work in VS Code (*e.g.*, terminal instances always occupying a specific sector of one's working window) but must be done manually, and every time, in Nova.[^terminalNova]

[^terminalNova]: Nova treats the terminal instance as just one window within the Nova GUI, while VS Code makes it a separate *section* within the VS Code GUI. In SSG-based dev work, you find yourself using the terminal a *lot*; and I prefer how VS Code lets you do so *vs.* Nova's way.

In sum&nbsp;.&nbsp;.&nbsp;.

Nova is really good, pretty, and friendly, but you pay for it, while VS Code is free. VS Code is a real integrated development environment (IDE), while Nova is a very cool and fully featured code editor that does *some* IDE stuff but not nearly as much, or as well, as VS Code. (*Still*, that 30-day trial offer for Nova is worth a look if you're a Mac user. It might just grow on you, especially if you're not already that into VS Code.)

## CDNs: my PoPs can whip&nbsp;your&nbsp;PoPs

As the popularity of SSG-built websites grows, your choices for hosting vendors grow as well. Each of the leading [SSG-savvy hosting vendors](/posts/2020/09/normal-persons-guide-static-website-hosting/) offers some sort of [content delivery network](https://en.wikipedia.org/wiki/content_delivery_network) (CDN) as part of its package, even on its free tier. This is a major advantage over "old-guard" hosting vendors, many of whom charge extra for even the barest CDN capability if they offer it at all.[^cfCDN]

[^cfCDN]: To be fair, you can put *any* site --- even a regular, non-SSG-built one --- behind a free Cloudflare account, but methods for doing that don't always provide the best efficiency. Explaining that is best left for another "Gems in the rough," assuming there *is* one.

However, these free-tier CDN offerings vary widely. Here's the main thing to consider: assuming more or less equal performance otherwise, how many points of presence (PoPs) does each vendor's free-tier CDN service give you?

- [Netlify](https://netlify.com) comes up last on that score, with only six PoPs for the whole world; and, if my own testing is any guidance, they're not particularly *fast* PoPs, at that. Among the vendors I'm discussing here, only Netlify gives its free-tier users the short end of the CDN stick as compared to the more advanced CDN capabilities its paying users receive.
- In the middle tier, you'll find [Vercel](https://vercel.com) and [Render](https://render.com).
	- Vercel has been [making big improvements](https://vercel.com/blog/new-edge-dev-infrastructure) in how it delivers content, but still has only a relatively [small number of PoP locations](https://vercel.com/docs/edge-network/overview) worldwide. Nonetheless, whatever Vercel is doing with its Edge Network is producing extremely impressive results. You might say that, for a free-tier CDN, Vercel's Edge Network gets the most out of the fewest PoPs.
	- Render is a work in progress: it initially relied on the [Stackpath](https://stackpath.com) CDN but, after [deciding it could do better](https://render-community.slack.com/archives/CBULRG4LV/p1600883128002000), [has chosen](https://community.render.com/t/cdn-vendor-change-timing-and-choice/71) to switch to [Fastly](https://fastly.com), a CDN vendor which [prides itself](https://www.fastly.com/blog/why-having-more-pops-isnt-always-better) on wringing a surprising amount of performance out of a relatively modest number of PoPs. It'll be a while before the transition is complete, so the result remains to be seen where Render is concerned.
- The winners on this score for now, in my view, are [Cloudflare Workers Sites](https://workers.cloudflare.com) and [DigitalOcean App Platform](https://digitalocean.com/products/app-platform). Each uses [Cloudflare](https://cloudflare.com), with its hundreds of PoPs; and, of course, the same will be true for the upcoming [Cloudflare Pages](https://blog.cloudflare.com/cloudflare-pages/).

## When you change hosts

In case that discussion about the various vendors’ CDN capabilities has you thinking of doing as I have done several times in the last few months, which was to switch from one host to the other, first allow me to offer some valuable advice based on my experiences during that process. I have one warning, followed by one suggestion.

### Be careful about DNSSEC

I think I'll simply repeat something I offered as a footnote to "[Goodbye and hello • Part 2](/posts/2020/07/goodbye-hello-part-2/)" a few months back, when I was explaining how I'd returned (briefly, as it turned out) to Netlify after initially [leaving Netlify for Vercel](/posts/2020/07/goodbye-hello/):

> While switching from Netlify's domain name servers to Google's during the site move to Vercel, I'd also activated [DNS System Security Extensions (DNSSEC)](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions). When I first began to return the site to Netlify and point my domain to Netlify's name servers because [that apparently works best with its CDN](https://css-tricks.com/using-your-domain-with-a-netlify-hosted-site/), I found that I first had to *de*-activate DNSSEC --- and, quoting [the appropriate Google Support page](https://support.google.com/domains/answer/6387342?hl=en): "When you turn on DNSSEC, it takes roughly 2 hours for DNSSEC to activate completely. When you turn it off, there's a delay of up to 2 **days** before deactivation." [Emphasis added.] As it turned out, it took a full day. Anyway, lesson learned.

So don't activate DNSSEC if you want to have the greatest flexibility when it comes to hosts-switching; on the other hand, once you're convinced your host will be good enough for the long term, feel free to activate DNSSEC. Only you can make that call.

### DNS cache? What&nbsp;DNS&nbsp;cache?

When you *do* switch hosts --- meaning, when you go to your DNS registrar and point your site to a different IP address --- you can find yourself waiting up to 48 hours before that transition goes through. **However**, you'll find that it'll occur a lot more quickly if you'll simply tell three big worldwide DNS resolvers to forget your old address and reset to the new one by **purging their DNS caches**. How do you do that? Just use each of the following:

- Cloudflare --- [1.1.1.1 Purge Cache form](https://1.1.1.1/purge-cache/).
- Google Public DNS --- [Flush Cache form](https://developers.google.com/speed/public-dns/cache).
- OpenDNS --- [CacheCheck form](https://cachecheck.opendns.com/).

My experience has been that using *all three* of these, every time you switch hosts, can make the transition happen within well under an hour (much less multiple hours).[^VerisignDNS]

[^VerisignDNS]: By the way: until recently, there used to be a fourth such cache-purging form, one for Verisign. However, Verisign has now become part of [Neustar](https://www.publicdns.neustar/); and, unfortunately, that convenient form seems not to have survived the transition.

## Very Inter-esting

As of the initial publication of this post, this site uses the [Inter font](https://rsms.me/inter), and specifically the [variable](https://web.dev/variable-fonts/) version thereof (which, from here, I'll call "Inter VF”). Inter is a beautiful sans-serif font that looks a lot like San Francisco, the native system font on Apple devices.

{{< imgc src="2021-09-01_screen-cap_Inter_2164x698.png" alt="Sample of the Inter web font" width=2164 height=698 >}}

The problem is that, due to the vast number of [glyphs](https://en.wikipedia.org/wiki/Glyph) it contains, Inter can be a *really* large download. So you want to make sure you *[subset](https://dev.to/benjaminblack/save-your-users-data-by-subsetting-web-fonts-5eo9)* it, extracting only those parts your site will actually use, and then use your CSS to tell the site to *use* only those parts. This is referring specifically to Inter VF because I think using *just* the variable-font version, which can provide all the styles you want, is more sensible than having to do the following procedure with *multiple* conventional (static) font files:

1. Download the full variable-font version of Inter ([https://github.com/rsms/inter/releases/](https://github.com/rsms/inter/releases/) should always have the latest). It's a TrueType font (.ttf), but that's OK. In the next step, you'll fix that.
2. To subset, install and use the [Python](https://python.org) `fonttools` library [as explained by Michael Herold](https://michaeljherold.com/2015/05/04/creating-a-subset-font/). For example, here's the command I use to change the Inter VF TrueType font to the .woff2 web font file I want (the file naming is based on the Inter v.3.15 font I used):

```python
pyftsubset Inter.ttf \
--unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" \
--layout-features="kern,liga" \
--flavor="woff2" \
--output-file="Inter-3-15_subset.woff2"
```

3. Set your CSS to use Inter VF for all your font weights (we'll tell it how to handle slanted text in a moment), as shown here in the `fonts.css` file I `@import` with [PostCSS](https://postcss.org) for my site's final CSS (as I've explained before):

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
	src: url('../assets/fonts/Inter-3-15_subset_2020-08-20.woff2') format('woff2-variations');
	unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

4. Finally, counter the weirdness of how Inter VF handles slanted (obliqued) text in different browsers.[^oblBr] In my main `layout.css` file (also `@import`ed into the final CSS), I have found the following to work for all the major current browsers, and please note that some of this is due to my use of [Tailwind CSS](https://tailwindcss.com):

[^oblBr]: Like many sans-serif fonts, particularly variable versions thereof, Inter VF doesn't do *true* italics; instead, it does *obliques*.

```css
.italic, i, cite, em, var, address, dfn, h3, h5, h6 {  /* dealing with Inter VF */
	font-variation-settings: 'slnt' -8;
	/* previous is needed by Chromium and Safari; its presence makes Firefox "over-slant" Inter VF,
		 so we override that below with the media query for Firefox */
	font-style: oblique 8deg;
	/* previous is needed by Firefox and Safari; it apparently has no effect on Chromium */
}

@supports (-moz-appearance: none) {
	.italic, i, cite, em, var, address, dfn, h3, h5, h6 {  /* dealing with Inter VF */
		/* font-variation-settings: normal; */
		font-style: normal;
	}
}
```

## A few more little nuggets

Finally, there are these even smaller nuggets which don't even deserve their own *sections* within this post:

- **On the starter sites front** --- I have recently created a [Nunjucks](https://mozilla.github.io/nunjucks/)-templating [version](https://github.com/brycewray/eleventy_solo_starter_njk) of the original JavaScript-templating (.11ty.js) [Eleventy starter site](https://github.com/brycewray/eleventy_solo_starter) I posted [a few months ago](/posts/2020/07/beginners-luck). If you find editing Nunjucks templates more pleasant than editing JavaScript templates, as I do, perhaps this will be a nice addition. Also, the applicable starter sites for both the [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io) SSGs now include Tailwind CSS 2.x; and both Eleventy starter sites include my recent [cache-busting solution](/posts/2020/12/cache-busting-eleventy-take-two/). (The Hugo starter sites don't need them because of capabilities built into Hugo.) \
Speaking of starter sites&nbsp;.&nbsp;.&nbsp;.
- **Zola? No, zanks** --- I'd given some thought to making a starter site using the [Zola](https://getzola.org) SSG, since I already have starter sites using Hugo, to which Zola has many similarities. (In fact, its creator came up with Zola because Hugo's templating drove him nuts; he even came up with his own templating engine, [Tera](https://tera.netlify.app/).) However, after a day or so of rooting around, I learned that Zola *purposely* is unfriendly to dividing a site's content into subdirectories the way I *always* divide mine. For example, dividing my posts by years, then months within the years, is a no-no in Zola, especially when you want to paginate in a [posts list](/posts). (I won't go into the gritty details; just search through Zola's [Github issues](https://github.com/getzola/zola/issues) and [documentation](https://www.getzola.org/documentation/getting-started/overview/) for the term *orphan pages*.) In fairness to Zola boosters, I have found similar problems in dealing with the [Gridsome](https://gridsome.org) SSG as well as the SSG capabilities of [Next.js](https://nextjs.org) and [Nuxt.js](https://nuxtjs.org) --- and I have similarly rejected them for just that reason, among others. Whatever else may be true about Eleventy and Hugo, both of them let me arrange a site's content *the way I want*. Anything that doesn't, I refuse to use. Period.

## Some days are diamonds, some&nbsp;days are&nbsp;stones

Thus you have at least some of the nuggets bouncing around in my brain. How shiny you think they are probably depends on your particular use case. Maybe they'll give you an "Aha" spark that'll help you solve a conundrum against which you've been (metaphorically, I hope) beating your head. And maybe I'll come up with more in time. That's at least half a promise; whether it's equally a threat is up to you, I guess. Good luck.
