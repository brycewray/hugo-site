---
layout: singlepost
tags: post
title: "Chasing 100: Tips for optimizing your website"
subtitle: "Pointers about performance, and then some"
description: "It takes work, but making your website better is worth it."
author: Bryce Wray
date: 2020-07-16T20:30:00-05:00
lastmod: 2020-10-15T10:20:00-05:00
discussionId: "2020-07-chasing-100-tips-optimizing-website"
featured_image: "tsvetoslav-hristov-QW-f6s9nFIs-unsplash_6036x4020.jpg"
featured_image_width: 6036
featured_image_height: 4020
featured_image_alt: "Sepia-tone photo of a stopwatch"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@tsvetoslav?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Tsvetoslav Hristov</a>; <a href="https://unsplash.com/s/photos/tsvetoslav-hristov-stopwatch?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

**Update, 2020-10-22**: I posted this prior to my subsequent decision to [hand off the site's image-handling to Cloudinary](/posts/2020/07/transformed). To me, it was more than worth the performance hit. *(The screen capture below was from **before** those changes.)*
{.yellowBox}

If you have your own website, chances are you like to make it work better for your visitors and, yes, show up higher in search engine ratings. Let's talk about how you can do that.

Of course, the Holy Grail looks like this:

{{< imgc src="Lighthouse-CLI_2020-07-15-091833CDT_2268x492.png" alt="Screen capture from a Lighthouse CLI report showing perfect ”100” scores for “Performance,” “Accessibility,” “Best Practices,” and “SEO”" width="2268" height="492" >}}

That's an authentic screen capture from my home page's [Lighthouse](https://developers.google.com/web/tools/lighthouse) profile as delivered from the [Lighthouse CLI tool](https://github.com/GoogleChrome/lighthouse#using-the-node-cli): perfect "100" scores for Performance, Accessibility, Best Practices, and Search Engine Optimization (SEO).

It took a lot of work to get there.

This article is about how you can move *your* site in that direction. By no means is this post complete in that regard. For the totality of what Lighthouse checks, you'll need to [check the Lighthouse documentation and its many links](https://github.com/GoogleChrome/lighthouse).

Instead, this covers some of the items which seem to be low-hanging fruit or, to borrow a term from the [Eleventy](https://11ty.dev) site's [documentation](https://11ty.dev/docs), "common pitfalls."

## Performance

All other things being equal, search engines give poorer scores to pages with lagging performance, which is probably the reason why Lighthouse puts that score at the front of what it counts. Let's discuss a few ways you can raise that score and shorten your site's page-load speeds.

### Put your site behind a CDN

There was a time when a website owner would put content on just one server in just one location and call it a day. On today's web, it's insufficient to have your content on one solitary server sitting behind one solitary network interface.

If you reply, "I don't anticipate attracting visitors from all that far away," consider that even this humble site you're reading now has visitors from dozens of different countries, scattered around the globe.[^fathom] If your content grabs attention on search engines (we'll get to SEO later), the same will happen to your site.

[^fathom]: I know this thanks to the privacy-respecting smarts of [Fathom Analytics](https://usefathom.com/ref/ZKHYWX) (affiliate link).

The best scenario is that, regardless of where a visitor may be, he or she doesn't have to wait long for your content to load---especially considering that a disproportionate percentage of visitors from certain nations will be coming in on slower mobile devices and less advanced networks. For those scenarios, you want your content on a [content delivery network (CDN)](https://en.wikipedia.org/wiki/Content_delivery_network).

The good thing is that, if you're hosting your site on [Netlify](https://netlify.com), [Vercel](https://vercel.com), [Render](https://render.com/), or [Firebase](https://firebase.google.com/), a fast CDN is part of the deal. However, if you're operating off a [VPS](https://en.wikipedia.org/wiki/Virtual_private_server) or a shared-hosting account (see the next item for more on that), try to put your site behind a free account on [Cloudflare](https://www.cloudflare.com/). [It's a reverse proxy rather than a true CDN](https://wp-rocket.me/blog/cloudflare-use-not/), but it does at least offer similar functionality on its free plan.

### Sharing is bad

As children, we all were taught to share, but forget that noble sentiment when it comes to your website. The word on putting your site on a shared-server account is pretty simple: "Don't." [There are *reasons* for the low price of a shared-server account](https://bigguyonstuff.com/big-hosting-problems-shared-hosting-bad/).

When your site is one of hundreds, even thousands, of accounts sharing space on one box, that's never going to be good for your site's performance. You start with having only a tiny fraction of the server's "horsepower" (computing cores, drive space, and RAM) on which to rely. The situation becomes dramatically worse if one of those accounts suddenly experiences upward spikes in traffic: all the accounts on that server (even the one *with* the spikes) will suffer.

### Web fonts: Pretty, but&nbsp;.&nbsp;.&nbsp;.

Diets aren't fun, and they suck even more when you're hungry. Because of my love of the distinctiveness that well-chosen web fonts can give a site, the question of whether to have them or [stick with the system fonts stack](/posts/2018/10/web-typography-part-2) is a hard one for me to debate.

But I don't argue with the data, and one test after another has shown me web fonts slow down my site---not a lot, to be sure, but enough to matter.

That's also turned out to be the case when I provide them "locally," as opposed to pulling them directly off (*e.g.*) [Google Fonts](https://fonts.google.com), even after trying a [variety](https://csswizardry.com/2020/05/the-fastest-google-fonts/) of [excellent](https://www.reich-consulting.net/web-development/loading-web-fonts-without-performance-penalty-from-lighthouse/) [advice](https://www.filamentgroup.com/lab/load-css-simpler/) from very smart folks. Consequently, I go with system fonts, however much I'd like to use [certain](https://fonts.google.com/specimen/Public+Sans?vfonly) [typefaces](https://fonts.google.com/specimen/Vollkorn?vfonly) I admire.

**Update, 2020-08-08**: I've stricken through the remainder of this section, below, for reasons I explain in [another post](/posts/2020/08/google-fonts-privacy) about the privacy violations involved with using Google Fonts typefaces if they're served *from* Google.
{.yellowBox}

~~If your response is "Damn the performance hit, full speed ahead with Google Fonts":~~

- ~~**Don't load them locally**. When you load them off Google Fonts, they come with "secret sauce" to optimize them for each visitor's individual browser and device. Also, the code behind that "secret sauce" changes without much warning; do you really want to monitor it yourself all the time and keep updating your local installation of the Google Fonts content? It's easier to get it straight from the horse's ultra-fast CDN.~~
- ~~**Go with** [**variable fonts**](https://web.dev/variable-fonts/) **where possible**. I say "where possible" because there remain only a limited (but growing) number of [variable typefaces in Google Fonts](https://fonts.google.com/?vfonly), which means your typeface choice may not be available at the moment. Where variable fonts shine is when you want to use numerous weights and styles of a typeface. With older non-variable fonts, that means one additional download per weight or style; but a variable typeface does all that good stuff with just one download. By the same token, you probably *don't* need a variable font if you're using only one style or one weight, much as you don't need a Ferrari to go to the grocery store.~~

## Accessibility

Making your site available to as many people as possible, regardless of their individual circumstances, is every site owner's responsibility---and most especially if your site's content puts it under the stricture of laws like the [U.S. Americans With Disabilities Act (ADA)](https://www.ada.gov/). Even if you don't want to be nice, why risk being sued? Make your site accessible.

You can't go wrong by following the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/), and most notably avoiding WCAG "A"- and "AA"-level offenses. I won't---can't---try to cover all the WCAG content here. Instead, here is a small sampling of some of the most obvious things you should do to avoid running afoul of WCAG.

**Give `alt` tags to all applicable images**. WCAG cuts you slack if an image is considered exclusively "decorative"---for example, a logo---but otherwise specifies that an image should be accompanied by an `alt` tag that tells a screen reader what the image shows.

**Specify sufficient contrast for text**. A web page is no place to be showing light gray text on a white background, or dark gray text on a black background. When you're choosing your site's text and background colors, run everything through one of the great online contrast-checking sites ([WebAIM's](https://webaim.org/resources/contrastchecker/) is my personal favorite). That goes also---or should I say, especially---for your link colors!

**Have underlined links**. Speaking of links, yours should have underlining, making them easier to see. I don't use the `text-decoration` method on my site, because I hate text [descenders](https://en.wikipedia.org/wiki/Descender) punching through the underlines; instead, I use CSS to put borders underneath linked text. Regardless of the method you choose, be sure you *do* provide underlining.

**Provide keyboard equivalents for navigation**. Not everybody has the dexterity to use a pointer device like a mouse or trackpad for navigating around a web page. Make sure all your links, including your nav links, are accessible through the use of tab keys or other keyboard-specific methods.

**Use `aria-` attributes where necessary**. [ARIA means *Accessible Rich Internet Applications*](https://www.w3.org/WAI/PF/aria/roles), and refers to *roles* you can assign to elements so that screen readers will handle them correctly. In some cases, normal (and correctly used[^correctHTML]) HTML, such as `h1` to designate the page's top-level headline, will be enough for a screen reader; but sometimes the process takes a little more specialization. For example, if you have a button on a page, it needs an `aria role="button"` assignment. [This page](https://developers.google.com/web/fundamentals/accessibility/semantics-aria) on the Google Developers site is a great place to get started on making sure your site is OK ARIA-wise.[^wmAcc]

[^correctHTML]: Avoid the bad (but sadly common) habit of using `h1`, `h2`, `h3`, and the like for *styling* rather than *semantic* purposes; *i.e.*, use such tags to indicate what content *is*, **not** how it should *look*.

[^wmAcc]: Pages with [webmentions](https://indieweb.org/Webmention) pulled in from [Bridgy](https://brid.gy), as of now, will have minor `aria`-related accessibility dings [because of an issue with that site's code](https://github.com/snarfed/bridgy/issues/947) which, I hope, will be resolved soon.

## Best Practices

There's a long list of items Lighthouse checks for conformance with "Best Practices." Try to adhere to them all if you can, but comply with the following out of plain ol' common sense.

**Use [HTTPS](https://en.wikipedia.org/wiki/HTTPS)**. When nearly every host makes having `https://` at the head of your URL a freebie through services like [LetsEncrypt](https://letsencrypt.org/), and browsers flag an HTTP-only site as bad news, *not* having HTTPS is dumb. Increasingly, it marks a site as being in a state of neglect.

**Use [HTTP/2](https://developers.google.com/web/fundamentals/performance/http2)**. If you're **not** using HTTP/2 to begin with, especially since [HTTP/3](https://quicwg.org/base-drafts/draft-ietf-quic-http.html) is on the horizon, you're already behind the curve. HTTP/2 allows more things to download at the same time, helping your performance. Browser support for HTTP/2 is [almost unanimous](https://caniuse.com/#search=HTTP%2F2) at this point.

**Have the right HTML `doctype`**. If the HTML on your pages begins with an inaccurate `doctype` declaration (or, worse, none), browsers have to "guess" how to show your pages, and that "guessing" process takes extra time. The `doctype` declaration for HTML 5 is simple: `<!DOCTYPE html>`. For the older XHTML and HTML 4.x, the `doctype` declarations are somewhat more tedious.

**Don't use WordPress if you can avoid it**. While there are countless reasons why that's always good advice, the Lighthouse "Best Practices" test adds another: WordPress includes an ancient version of jQuery that has known security vulnerabilities. Automattic, the entity behind WordPress, sticks with this hoary jQuery version to [avoid breaking changes](https://nimblewebdeveloper.com/blog/use-modern-jquery-in-wordpress) with the depressingly high number of extant WordPress sites---many of which are run by people who, to be kind about it, don't manage their sites’ technical components wisely. (As they say on social media, "SMH.")

## SEO

The higher you score on all these things, the better chance your site content has of doing well in search engines’ results. Of course, the SEO segment of what Lighthouse checks has especially high relevance to that. A quick search, coincidentally enough, for "SEO" will reveal mountains of (mostly) marketing-oriented advice on the subject, and you may want to bathe in alcohol after reading some of it. That said, here are just a few SEO-related quickies which surprisingly can escape notice.

**Have a valid [`robots.txt`](https://support.google.com/webmasters/answer/6062608?hl=en) file**. There's no over-arching authority that can *make* Google and the other search engines obey `robots.txt`, but it's better to have it than not to do so. So make sure it's *there*, that it's in your site's root directory (e.g., `https://mysite.com/robots.txt`), and that it allows search engines to "spider" through all the content you want them to "see." If you don't have a problem with their "seeing" everything, it doesn't get simpler than this two-liner:

```bash
user-agent: *
allow: /
```

**Make sure every page has a unique `title` and `description`**. Don't make the mistake of giving every page the *same* title and/or description. Search engines will skin your site alive on that lazy practice. It's even better for SEO if you add your *site's* title at the end of each *page* title, which is easy to do with the templating you'll usually find in a [static site generator (SSG)](https://staticgen.com).

**Make your links meaningful**. This is good for both SEO and accessibility. Work hard to avoid using link text like "Click Here" or "Learn More" without including *in the link* (between the `<a` and the `</a>`[^LinkTag]) *why* the person should click here or *what* more the person will learn.

[^LinkTag]: Or `<Link` and `</Link>` for you [Gatsby](https://gatsbyjs.org) and [Next.js](https://nextjs.org/) folks. You know who you are.

**Specify your page language**. In another case where wise SEO also is pro-accessibility, you should specify in each page's opening `html` tag the language of the page. In my case, it's `html lang="en"`. It does get trickier if the page itself is multilingual.

## No guarantees, but these will help

By no means can I, or will I, guarantee that following the advice herein will make right everything that may be keeping your site from doing well in Lighthouse. I said it before, and repeat it now: getting "100" scores across the board on Lighthouse takes work, a lot of it, and it might take a good while to achieve---even if your site is light enough on content that it would be a quick download via the most ragged of connections. But it *is* worth it.

If you're starting from scores well below "100," don't get discouraged. Start small, with the items I've noted in this article, and see what you can achieve; then move on to the other qualifiers identified in the drop-down items in a Lighthouse audit from the Inspector of a Chromium-based browser. Keep your eyes on the prize: making your site the best you can. It's good for your visitors, and good for you.