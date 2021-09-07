---
layout: singlepost
tags: post
title: "Google Fonts and privacy"
subtitle: "It’s about more than trust"
description: "Explaining changes I’ve made to this site because of its new privacy policy."
author: Bryce Wray
date: 2020-08-08T14:35:00-05:00
lastmod: 2021-07-08T08:24:00-05:00
discussionId: "2020-08-google-fonts-privacy"
featured_image: "morning-brew-5UEoA5JB6VE-unsplash_3000x2000.jpg"
featured_image_width: 3000
featured_image_height: 2000
featured_image_alt: "A magnifying glass over the Google logo"
featured_image_caption: |
  <span class="caption">Photo: <a href="https://unsplash.com/@morningbrew?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Morning Brew</a>; <a href="https://unsplash.com/s/photos/google?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

This began as a very different post. Then I did some research that changed my mind.

It all started innocently enough last Sunday, when I decided to post this site's first-ever [privacy policy](/privacy). It started out as a very short statement of how this site **doesn't track you**. I felt that to be a safe position, particularly since I recently [adopted Fathom Analytics](/posts/2020/06/fathom-analytics-count-on-it) in no small part because of its privacy-protecting, cookie-less orientation.

But later in the week, things got more complicated. You see, I had reinstated [Google Fonts](https://fonts.google.com) because, well, I just preferred how my site looked with web fonts than without it. I figured I didn't have to think about it any longer.

That was *before* I learned that my bent toward privacy protection didn't square with the use of Google Fonts---*i.e.*, if you're serving those fonts *from* Google (as I was doing) rather than their being self-hosted.

As I'd mentioned in [a recent post](/posts/2020/07/chasing-100-tips-optimizing-website), there was a technical reason why I was letting Google serve the typefaces rather than handling it through self-hosting, even though the former can cause performance issues:

> When you load them off Google Fonts, they come with "secret sauce" to optimize them for each visitor's individual browser and device. Also, the code behind that "secret sauce" changes without much warning; do you really want to monitor it yourself all the time and keep updating your local installation of the Google Fonts content? It's easier to get it straight from the horse's ultra-fast CDN.

But, then, I learned there was more to that "secret sauce" than performance enhancements.

## Tracking it down

The European Union's [General Data Protection Regulation (GDPR)](https://gdpr-info.eu/) went into effect a little over two years ago. It and other privacy-oriented regulatory actions like it around the world take a dim view of the visitor tracking performed by websites using products like [Google Analytics](https://marketingplatform.google.com/about/analytics/). Most, if not all, of those "we're putting cookies on your computer if you view this site, dawg" messages you typically see on websites (especially those based in the EU) are because of the GDPR.

Before my fellow non-Europeans wonder why I, a guy in the U.S., care about whether my website complies with the GDPR, it's very simple: to my knowledge, the law is designed to protect EU citizens *wherever they are*. Besides: while I have no expectation that the EU would ever come after little old me on this score, I nonetheless want to respect the privacy of *all* my readers, including those who are EU citizens.

I didn't know until this week that Google Fonts typefaces, if served by Google, also run afoul of the GDPR.

When I first learned of this in the August 6, 2020, edition of the "Go Make Things" daily email newsletter I receive from developer [Chris Ferdinandi](https://gomakethings.com), my initial reaction was to doubt this information. I was even more skeptical about it after I read the [Google Fonts FAQ](https://developers.google.com/fonts/faq), specifically the following excerpts from a section entitled "[What does using the Google Fonts API mean for the privacy of my users?](https://developers.google.com/fonts/faq#what_does_using_the_google_fonts_api_mean_for_the_privacy_of_my_users)":

> Use of Google Fonts is unauthenticated. No cookies are sent by website visitors to the Google Fonts API. Requests to the Google Fonts API are made to resource-specific domains, such as fonts.googleapis.com or fonts.gstatic.com, so that your requests for fonts are separate from and do not contain any credentials you send to google.com while using other Google services that are authenticated, such as Gmail. .&nbsp;.&nbsp;.&nbsp;[Because of caching,] website visitors send very few requests to Google: We only see 1 CSS request per font family, per day, per browser.

When I contrasted this with what [Google says about Google Analytics](https://support.google.com/analytics/answer/6004245) .&nbsp;.&nbsp;.

> Google Analytics mainly uses first-party cookies to report on visitor .&nbsp;.&nbsp;.&nbsp;interactions on Google Analytics customers’ websites. Users may disable cookies or delete any individual cookie.

.&nbsp;.&nbsp;. it seemed to me that Google was saying flatly it *did* track visitors with Google Analytics (duh), yet simultaneously
saying---carefully, as giant corporations with armies of lawyers tend to do everything---that it *didn't* track visitors to websites using Google-served Google Fonts.

I also found articles and comments from individuals who *did* consider Google-served Google Fonts to be a tracking culprit---[Laura Kalbag](https://www.smashingmagazine.com/2020/04/smashing-podcast-episode-13/), [Yves Peters](https://web.archive.org/web/20150304120024/http://fontfeed.com/archives/google-webfonts-the-spy-inside/), and [Adolfo Ramírez Corona](https://uxdesign.cc/a-privacy-concern-about-google-fonts-5aa4418bf87e), among others---but, I felt, they didn't present enough *evidence* to dispute the Google position as I (thought I) understood it.

Finally, I figured that Google, already a target by privacy advocates, simply wouldn't want to take the PR hit for lying if it could be caught saying falsely that Google-served typefaces don't track you. While it hardly could be said that I trust Google, I definitely *do* trust Google's instinct for avoiding self-inflicted harm and, thus, guessed my website wasn't committing privacy violations by including Google-hosted typefaces.

As a result, this post's *original* form was a measured but reasonably firm defense of why I would keep using Google Fonts as served by Google.

Fortunately, I didn't stop researching the matter.

## Issue #1495

What changed my mind was "[GDPR compliance](https://github.com/google/fonts/issues/1495)," Issue #1495 within the [Google Fonts repo](https://github.com/google/fonts) on GitHub.

Issue #1495, first filed a few weeks before the GDPR was to go into effect, was an attempt by developers to determine Google's official position regarding the impact by Google-served Google Fonts on a website's GDPR compliance. These devs hoped Google would provide a definitive statement about exactly what the corporation receives whenever someone visits a site where Google-served Google Fonts are in use.

That was over two years ago and, as of today, such a statement is yet to come from Google.

Still, the comments thread in Issue #1495 brought to light one critical thing I hadn't learned during my earlier research: when you visit such a site, *that sends your IP address to Google*.[^1]

That's a GDPR violation.

Why? Because you're *not* given the chance to consent to that practice (unlike the aforementioned popups about cookies). Thus, it's not enough to follow the later example of other sites and simply add a privacy notice someplace saying, "Yeah, we get our typefaces served by Google, and your IP address goes back to Google, and that's how it is, Jack." *You have to ask the user for permission.*

While there probably are ways to do that when one has total control of the server---*e.g.*, by serving the typefaces from Google only after getting the user to click on an "I consent"-style link or button---it's not something I can do from my [Jamstack](https://jamstack.wtf) site, at least as far as I know.

Moreover, I wouldn't *want* to do that. I'm annoyed whenever I encounter all this permissions-requesting stuff on one site after another, and I don't want to put my visitors through it.

So, yesterday, I began serving my chosen Google Fonts typefaces "locally." I initially obtained them from [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts), but using those precludes using [variable fonts](https://css-tricks.com/google-fonts-variable-fonts/), as I prefer; so I had to jump through a few hoops to obtain those variable fonts---yes, from Google---and "locally" provide them. (I explain the procedure in "[Good stuff without Google](/posts/2020/08/good-stuff-without-google).”)

Anyway: because Google updates Google Fonts typefaces frequently, I will have to monitor their versions and keep my "local" copies straight. That's fine. I get to keep the site's typography as I want, while keeping the site from helping Google track you to even the limited extent that Google-served typefaces apparently do.

## A little more cleaning-up

While I was in this process, I realized there were two other needed actions to achieve full (or at least fuller) compliance with the GDPR and other privacy-protection laws, both now and in the future; so I:

- Removed [YouTube](https://youtube.com) embeds from two pages in favor of simply linking to the videos themselves.
- Changed all [Twitter](https://twitter.com) content from embedded tweets to text-only versions with links back to the original content.

These were easy decisions, since there's little doubt about the fact that embedded YouTube videos and tweets "phone home" with visitors’ information.

To be safe, I also checked out the GDPR compliance of [Cloudinary](https://cloudinary.com), which the site [recently began using](/posts/2020/07/transformed), and satisfied myself that [it was sufficient](https://cloudinary.com/privacy) that I didn't need to revert to locally processed, locally hosted images. (Whew.)

Finally, I revised this site's privacy policy---and will continue to do so as needed---to reflect all these new realities.

## Tedium, but good tedium

The GDPR went into effect a few months before this site first emerged. However, in my day job of the time, I worked with a small team on GDPR compliance for that company's website, so I can't claim ignorance on this subject.

In its first few weeks, back in 2018, my site had no content that would run afoul of the GDPR, but that changed over time and, until these last few days, I simply didn't do anything about it.

That has now changed.

It was somewhat tedious making all these fixes I've described herein, but it was a good kind of tedious.

Even if you're not and never will be an EU citizen, your privacy deserves protection, too. I appreciate your visits, and want you to feel completely safe when you spend time here on, as I once described [my original website in the 1990s](https://web.archive.org/web/20000413205935/http://home1.gte.net/bwray/index.html), my "little spot on that lone prairie that is the great World Wide Web."

**Totally unrelated additional note**: Contrary to what I'd thought at the end of my [last post](/posts/2020/08/posting-with-ulysses), I did this one in [Ulysses](https://ulysses.app), too. Who'd-a thunk it?
{.yellowBox}

[^1]:	Of course, that doesn't necessarily identify you, especially if---as is true for most users---your device receives its IP address via [DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol). Nonetheless, it would at least narrow it down. And, equally of course, it absolutely *does* identify a device which has a *[static](https://whatismyipaddress.com/dynamic-static)* IP address.