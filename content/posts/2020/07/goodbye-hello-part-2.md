---
layout: layouts/posts/singlepostherofit.11ty.js
tags: post
title: "Goodbye and hello • Part 2"
subtitle: "Returning the site to Netlify"
description: "Why I decided to come back."
author: Bryce Wray
date: 2020-07-31T22:35:00
lastmod: 2020-09-05T14:00:00
discussionId: "2020-07-goodbye-hello-2"
featured_image: welcome-mat-705102_4368x2912.jpg
featured_image_width: 4368
featured_image_height: 2912
featured_image_alt: "A welcome mat in front of a home"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/YouComMedia-907282/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=705102">YouComMedia</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=705102">Pixabay</a></span>
---

<div class="yellowBox"><p><strong>Note</strong>: This originally took the form of an addendum to the original &ldquo;<a href="/posts/2020/07/goodbye-hello">Goodbye and hello</a>&rdquo; post; but I soon realized this was the classic case of shooting at a moving target, so I decided to give each move its own post (using the appropriate addendum as the text), while leaving the original pretty much as it once was.</p></div>

In case you haven't yet seen "[Transformed](/posts/2020/07/transformed)," I just finished moving virtually all my site's images to [Cloudinary](https://cloudinary.com). It turned out the lifting of this image-handling and -storing burden had one additional, nice side-benefit.

It let me **return to [Netlify](https://netlify.com)**, slightly over a month after leaving.

Oh, don't get me wrong: I'm not disavowing anything I said in my praise of [Vercel](https://vercel.com). The thing is: over the following weeks, I found Vercel lacking in one respect.

After the move, despite the new host's technical advantages, I missed the Netlify community.

Much like my warmth for the [Eleventy](https://11ty.dev) community (a significant percentage of whose major players *work for* Netlify), I had felt part of a larger group while with Netlify. With Vercel, I gradually came to feel as if I'd moved to a nice, new house with bigger, better, shinier everything, but it just didn't feel like home. I know that's a weird analogy, given the relative youth of both companies, but that's just how it seemed to me.

Here's a lame attempt to explain.

A reporter covering the 1863 National Cemetery dedication where Abraham Lincoln delivered the Gettyburg Address likened the [two-hour speech preceding Lincoln's two-minute classic](https://www.businessinsider.com/edward-everett-also-spoke-at-gettysburg-convention-2013-11) to "Greek sculpture---beautiful, but cold as ice." Well, for reasons hard to put into words, I find that comment vaguely applicable to a comparison between Vercel and Netlify.

Vercel's free tier is technically superior to Netlify's in most ways that matter but, at least for me, the experience just didn't have the same *feel*. Hey, I'm the guy who [brought back hero images](/posts/2020/05/thousand-words-indeed) simply because *I missed seeing them*, their technical and logistical "costs" notwithstanding; so would you expect any more of me?

Anyway: once I had completed the transition from build-time image processing to Cloudinary, and could see that the average build time was now drastically and permanently[^EleventyBuild] shorter, I suddenly realized that there no longer was any reason I couldn't go back to Netlify if I wanted.

[^EleventyBuild]: With all the heavy images gone to Cloudinary, the only site complement that will continue to grow from here on will be the number of posts, and Eleventy builds those lickety-split regardless of their quantity or respective length.

First, I had to make sure I *did* want it.

I created a generic test site (an even more scaled-down version of the [Eleventy starter set I recently posted](/posts/2020/07/beginners-luck)) and deployed its contents to all four hosts I mentioned in the original post: Vercel, Netlify, [Render](https://render.com), and [Firebase](https://firebase.google.com). With absolutely identical content on all four, I then could easily run various tests to compare them once again.

As with my pre-Vercel testing, the process of elimination soon reduced the choice to Vercel *vs.* Netlify. (Render had some impressive results but, as was true the first time, fell short on some other items that I'm sure will get fixed in time. Firebase is still geekily interesting but, I suspect, is an afterthought to Google where static sites are concerned; and its performance seemed erratic in my latest tests; so it didn't last long in the comparison.)

Once I did some appropriate code trims here and there to the test repo and ran some more tests, it became clear that the Netlify-hosted version was *close enough*. It would *do*. It might not be the fastest car in the dealership's lot, but it seemed a lot more comfortable to drive.

Of course, switching back from Vercel to Netlify involved some fiddling, [DNS](https://en.wikipedia.org/wiki/Domain_Name_System)-wise[^DNSSECoff], but it was worthwhile. (My domain's old DNS records from the first time around were still there in the account, so that helped a little.) And so, earlier today, this site came home to Netlify.

[^DNSSECoff]: While switching from Netlify's domain name servers to Google's during the site move to Vercel, I'd also activated [DNS System Security Extensions (DNSSEC)](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions). When I first began to return the site to Netlify and point my domain to Netlify's name servers because [that apparently works best with its CDN](https://css-tricks.com/using-your-domain-with-a-netlify-hosted-site/), I found that I first had to *de*-activate DNSSEC---and, quoting [the appropriate Google Support page](https://support.google.com/domains/answer/6387342?hl=en): "When you turn on DNSSEC, it takes roughly 2 hours for DNSSEC to activate completely. When you turn it off, there's a delay of up to 2 **days** before deactivation." [Emphasis added.] As it turned out, it took a full day. Anyway, lesson learned.

As a result, the original post's title---"Goodbye, hello"---turned out to be a little more nuanced than I'd originally intended. However things turned out, I am happy to be back within Netlify's "old" but comfy confines and no longer watching its bustling, friendly community from the outside, remembering all too fondly how nice it felt to be even an insignificant part of it.

<div class="yellowBox"><p><strong>Note</strong>: <a href="/posts/2020/08/goodbye-hello-part-3">To be continued</a>.</p></div>