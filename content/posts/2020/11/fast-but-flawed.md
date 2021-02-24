---
layout: layouts/posts/singlepostherofit.njk
title: "Fast but flawed"
subtitle: "Two more static website hosts to consider (maybe)"
description: "These can give you great performance, but there’s a catch."
author: Bryce Wray
date: 2020-11-25T16:30:00-06:00
lastmod: 2020-12-12T13:15:00-06:00
#draft: false
discussionId: "2020-11-fast-but-flawed"
featured_image: jack-van-der-spoel-dgCBjYHZ0kc-unsplash_5472x3648.jpg
featured_image_width: 5472
featured_image_height: 3648
featured_image_alt: "Closeup of spider web in a flower garden"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@doctor_punk?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jack van der Spoel</a>; <a href="https://unsplash.com/s/photos/web-server?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

In "[Forward PaaS](/posts/2020/10/forward-paas)," I told you about [Cloudflare](https://cloudflare.com)'s [Platform-as-a-Service](https://en.wikipedia.org/wiki/Platform_as_a_service) (PaaS) offering, [Cloudflare Workers combined with KV storage](https://www.cloudflare.com/products/workers-kv/), and some of its aspects that intrigued me. In the end, its only real drawback is that, unlike many [other options](/posts/2020/09/normal-persons-guide-static-website-hosting) for hosting one's static website, an optimal use thereof isn't completely free. Five bucks a month for the Workers Unbundled plan is no bank-breaker; still, as the man says, "Cheap is good, but free is better."

**Update, 2020-12-12**: I've since updated the "[Forward PaaS](/posts/2020/10/forward-paas)" post because of the subsequent announcement of a **free** tier for Cloudflare Workers KV storage---the existence and performance of which completely eliminated any remaining reluctance I had about that solution (as long as one doesn't have to update the site frequently, in which case the free tier's upload limits can be problematic). I'm leaving this post here just in case its information would be of use, and also for the sake of [transparency](/posts/2019/10/otoh).
{.yellowBox}

That's why I thought I would write this little piece about two other free hosting options for your additional consideration. One has been around for over a decade, while the other emerged in only the last couple of months. While both offer great performance despite being free, they also share one singular disadvantage that *might* dissuade you from considering them.

## Venerableness &plus; velocity

{{< imgc src="GHP-2020-11-24_2476x1340.png" alt="Screen capture of GitHub Pages section of GitHub website" width="2476" height="1340" >}}

[GitHub Pages](https://pages.github.com) (GHP) first appeared in 2008. Initially requiring the [Jekyll](https://jekyllrb.com) static site generator (SSG), it now can work with just about any SSG out there---including the two I favor, [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io).

The concept behind GHP was pretty ground-breaking at the time but has long since become quite familiar to SSG users. Every time you push a change to a [GitHub](https://github.com) repository which has been set up for GHP, this causes the automatic regeneration of your GHP site, which GitHub hosts on its infrastructure.

Of considerably greater interest to static site performance fans (ahem) is that sites hosted on GHP are fronted by the [Fastly](https://fastly.com) [content delivery network](https://en.wikipedia.org/wiki/Content_delivery_network) (CDN)---which, at least in my own testing of content that sits behind it, consistently earns its name with neck-snapping speed.[^vsFB]

[^vsFB]: As I've [previously mentioned](/posts/2020/07/goodbye-hello), [Firebase](https://firebase.google.com) also uses Fastly; but, a GHP site outshines an equally configured Firebase site because, unlike the latter, the former provides an excellently short [Time to First Byte](https://en.wikipedia.org/wiki/Time_to_first_byte) (TTFB). My reading suggests Firebase sites, especially on the free tier, typically aren't "hot" on the first hit (remember that Firebase tends to be promoted for hosting of databases and web *apps* much more than for web*sites*), while GHP sites have no such limitation. If so, this would neatly explain the two's disparate performance numbers despite their both using Fastly.

A GHP site typically has a name like *MyGitHubName.github.io*, but you can assign it your custom domain.

## Is DOAP dope?

{{< imgc src="DOAP-2020-11-24_2476x1362.png" alt="Screen capture of DigitalOcean App Platform section of DigitalOcean website" width="2476" height="1362" >}}

The second choice is a recently introduced PaaS offering that's been getting some attention: [DigitalOcean](https://digitalocean.com)'s [App Platform](https://www.digitalocean.com/products/app-platform/)---or, as I'll abbreviate it for the remainder of this article, *DOAP*. With DOAP, your original content exists on DO's infrastructure behind Cloudflare, obviously no slouch in the CDN realm.

When DOAP [first went live](https://www.digitalocean.com/blog/introducing-digitalocean-app-platform-reimagining-paas-to-make-it-simpler-for-you-to-build-deploy-and-scale-apps), I eagerly gave it a try, but it soon became clear that I couldn't successfully deploy a test site from the same repo I use with no problem on other vendors’ platforms. Simply put, the build process would die, and with error messages that weren't terribly helpful.

DO Tech Support informed me, very courteously, that I'd need some [Docker](https://docker.com) stuff going on just to install the SSG---Hugo, back then---during the build process, much less to proceed from there. And that was fair enough, except that there were two catches to that where I was concerned:

- First, I have zero experience with Docker, plus no *other* reason to deal with it (although I do read about it fairly often), and had neither the time nor desire to delve into it.
- Second, using Docker with DOAP *isn't* free, thus---at that time---obviating the chance to use DOAP for free, which was the whole point of my interest.

**Note**: If that screen capture from the DOAP page makes you wonder about whether DOAP really is free, be advised that the "Starting at $5/mo" line is referring to web *apps*, **not** static websites. In fact, DOAP does support free hosting of up to three static websites.
{.yellowBox}

Just as courteously, I replied to DO Tech Support that DO might want to check on how competing vendors make it so easy to host static sites, and then I went on my merry way for the time being.

In the ensuing weeks, I occasionally checked back again with DOAP, trying to see if anything had improved where its capability for hosting static sites was concerned. By now, I had decided to use an Eleventy-based test repo, instead, and hoped that its all-[npm](https://npmjs.com) configuration might be easier for DOAP to handle than had been the case with the Hugo-based repo. However, it was still "no soap" with DOAP (sorry). While I found the documentation gradually getting better, DOAP couldn't get through the build process for a static site from that repo, either.

One particular problem DOAP had with the Eleventy-based repo was that the default output directory wasn't one of the choices which DOAP was expecting, *but* DOAP *also* didn't offer the ability to give it some help in that respect.[^Hugo] I didn't want to change the test repo's output directory; other vendors handled it as it was, so I wanted to keep everything apples-*vs.*-apples.

[^Hugo]: Earlier, the Hugo-based repo *did* use one of the output directory choices DOAP wanted (`public`, in this case); however, DOAP couldn't download and install Hugo itself during the build process, so that, also, was a doomed effort.

Finally, this past Monday, I gave DOAP another try. To my pleasant surprise, there now *was* an option for specifying the output directory. I set it to `_site` and, about a minute and a half later, had a working site on DOAP. The results of my initial tests have been impressive and encouraging.

Similar to how GHP does its thing, a DOAP site---although it starts with a name like *MyRepoName-8dz7-ondigitalocean.app*---can take your custom domain.

## Shared weakness

Given the performance quality I've described for these totally free static website hosting options, what could be my problem with them? And why did I say it *might* keep you from wanting to use either?

Well, it turns out I can't set the [Cache-Control header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) for any type of static assets on either GHP or DOAP, as is possible on the other vendors that host sites off the same test repo. (See my article, "[Using PostCSS for cache-busting in Eleventy](/posts/2020/11/using-postcss-cache-busting-eleventy)," for more on this as it applies specifically to CSS files.) These two have fixed settings for such caching---and, in the case of the much older GHP, this is despite *years* of requests to the contrary by developers.

This matters because, [in May, 2021, Google will be changing its search algorithm](https://developers.google.com/search/blog/2020/11/timing-for-page-experience) so that it gives increasingly good ratings to websites that provide a better "page experience," in Google-ese. The assessment of that value will depend, even more than it already does, on how a site's pages do in [Core Web Vitals](https://web.dev/vitals-tools/)---and one key factor that affects this is how well a site caches its static assets, since that, in turn, affects the [Largest Contentful Paint](https://web.dev/lcp/) (LCP) value.

In short: while both GHP and DOAP appear to provide great performance otherwise, they don't give you the ability to manage this increasingly important aspect of site optimization. In my view, they therefore don't measure up.

## Hope for the future?

Will this situation get better?

For GHP, the answer is likely "No." As I said before, this particular lack is a long-standing gripe about GHP, so I'm guessing it will stay that way.

For the much younger DOAP, I'm hoping the answer is a more hopeful "Maybe." When I asked DO Tech Support about this, the reply suggested I submit a feature request to an "Ideas" page on the DO site, so I did. Whether DO will make it possible ever, much less any time soon, remains to be seen.

Of course, if you're not as numbers-obsessed as Yours Truly and/or don't give a hang about how Google rates your site, you may be perfectly happy with either GHP or DOAP. And, to be sure, either vendor is great for hosting a *test* site on which you're not putting any great reliance for getting love from Google. Still, these are things to keep in mind, always, as one explores the wacky, wonderful world of SSG-built websites.