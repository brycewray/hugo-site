---
title: "The intriguing announcement of Cloudflare Fonts"
description: "Can Cloudflare really make Google Fonts suitable again? We may know soon."
author: Bryce Wray
date: 2023-10-02T10:08:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

<strong class="red">Update, 2024-04-21</strong>: Due to a variety of factors, I recommend that you **not** use the Cloudflare Fonts product described herein. (Remember that [you **don't** want to use Google Fonts as served by Google](/posts/2020/08/google-fonts-privacy/). Instead, [host them **locally**](/posts/2020/08/good-stuff-without-google/).)
{.box}

Before learning about its [privacy-violating aspects](/posts/2020/08/google-fonts-privacy/), I considered the [Google Fonts](https://fonts.google.com) offering to be an effective way for many sites to deliver web fonts, especially in those cases where the site couldn't self-host fonts for whatever reason.

But, due to last week's [announcement that Cloudflare Fonts is coming later this month](https://blog.cloudflare.com/cloudflare-fonts-enhancing-website-privacy-speed/), it appears there may soon be a *safe* way to use Google Fonts again.

<!--more-->

To give you an example of the good feelings I originally had about Google Fonts, here's something I [once wrote](/posts/2020/07/chasing-100-tips-optimizing-website/#web-fonts-pretty-butnbspnbspnbsp) (but then had to strike through it just days later, after my research pointed me to [Google Fonts Issue #1495](https://github.com/google/fonts/issues/1495)):

> **Don't load [fonts] . . . locally.** When you load them off Google Fonts, they come with "secret sauce" to optimize them for each visitor's individual browser and device. Also, the code behind that "secret sauce" changes without much warning; do you really want to monitor it yourself all the time and keep updating your local installation of the Google Fonts content? It's easier to get it straight from the horse's ultra-fast CDN.

And all of that remains true. It's simply that, when it comes to delivering web fonts directly *from* Google Fonts, the privacy issues outweigh the technical advantages.

That's why I was intrigued by Cloudflare's “[Birthday Week 2023](https://blog.cloudflare.com/welcome-to-birthday-week-2023/)”-related blog post, "[Cloudflare Fonts: enhancing website font privacy and speed](https://blog.cloudflare.com/cloudflare-fonts-enhancing-website-privacy-speed/)." In it, Cloudflare's Matt Bullock and William Woodhead promised the imminent arrival of a way to get all the good stuff in Google Fonts without the bad stuff. What I grasped from the post is that Cloudflare Fonts will use a slick combo of DNS magic, clever caching, and a [recently developed server module](https://blog.cloudflare.com/rust-nginx-module/) to do the following for a website:

- Deliver Google Fonts content from the website's domain, not Google's, eliminating the privacy violations inherent in serving the fonts directly from Google.
- Reduce the number of server round-trips from eight to *one*, so that the fonts actually arrive *faster* and, thus, improve the website's performance in general.

To be clear: Cloudflare *isn't* setting up a Google Fonts competitor, contrary to my initial assumption when I saw "Cloudflare Fonts" in the blog post's headline. Instead, Cloudflare will be offering a service that pre-processes Google Fonts content for your site.

And, perhaps best of all, it appears this will be a freebie for any website that uses Cloudflare. I base that on the fact that, unlike several other other product- and service-related announcements Cloudflare made during Birthday Week 2023, the Cloudflare Fonts announcement didn't say a word about this new service's being only for paying customers.

As of this writing, Cloudflare hasn't yet specified *when* in this month this new service will be available (even if only as a public beta) nor when its publicly viewable documentation will appear, so I can't tell you any more about Cloudflare Fonts just yet. Still, I'll watch for more details, and *definitely* will be giving the service a try as soon as possible so I can let you know how it worked for me.

**Update, 2023-10-17**: The service is now live in beta form, and [I've given it a quick review](/posts/2023/10/cloudflare-fonts-first-look/).
{.box}
