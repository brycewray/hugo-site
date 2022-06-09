---
tags:
- post
title: "The IndieWeb experiment ends"
description: "My timing wasn’t the greatest."
author: Bryce Wray
date: 2022-05-29T10:48:00-05:00
#lastmod: 2022-05-29T11:41:00-05:00 # typo
#draft: true
#initTextEditor: iA Writer
discussionId: "2022-05-indieweb-experiment-ends"
---

We're back to where we were.

I've changed my mind about continuing with my second shot at the [IndieWeb](https://indieweb.org) stuff, mainly in the form of receiving and displaying [webmentions](https://indieweb.org/Webmention), after giving it roughly a week of experimentation---some of which I [documented](/posts/2022/05/webmentions-yes-javascript-no/) [herein](/posts/2022/05/webmentions-yes-javascript-no-the-code/), perhaps to the aid of others.

Why am I quitting webmentions again? There are several factors, mentioned below not necessarily in order of importance.

## My bad timing

My [decision to do fewer advisories to social media](/posts/2022/05/site-week-2022-05-28/), which came a few days after I began this go-around, works contrary to the whole point of gathering webmentions. The simple fact is that, if I don't plug each new post to Twitter and Mastodon, it generally won't receive enough reaction therein to matter.[^HN] It's like buying your own gas station for your personal fleet of cars, only to learn the next day that your business manager had replaced all of them with EVs. In this case, however, the gas station buyer and the business manager were both *moi*, and I simply didn't consider, at first, the incompatibility between Action A and Action B.

[^HN]: Even my posts which get some decent traction on [Hacker News](https://news.ycombinator.com) get virtually no "love" social-media-wise, at least related to that traction.

## Privacy concerns

I finally remembered that a major part of why I stopped using webmentions the first time had to do with my August, 2020, realization of how much more I needed to do in protecting my visitors' [privacy](/privacy/). While it was true that all the content I was pulling in from [webmention.io](https://webmention.io) and [Bridgy](https://brid.gy) came from publicly available social media platforms, I nonetheless found little comfort in what I found in the [Bridgy FAQs](https://brid.gy/about) in answer to [whether Bridgy is compliant](https://brid.gy/about#gdpr) with the [GDPR](https://gdpr.eu/), *e.g.*:

> Bridgy is a small free service with a small user base. Even if it doesn't comply, I don't expect anyone to care much. I don't plan to spend much more time or effort researching until someone convinces me I need to. (Sorry!)

And a [check](https://web.archive.org/web/20200824184019/https://brid.gy/about#gdpr) of the [Internet Archive](https://archive.org) shows this text is the same as back in, yep, August, 2020. So I can take a reasonable guess that this was at least a portion of what brought my IndieWebbin’ to a halt back then.

(I should note, also, that there apparently are some Mastodon users who don't take kindly to having their comments and even avatars appear through webmentions, regardless of such items' having been out in public via Mastodon instances in the first place. Take that for what you will.)

## Data permanence

The webmentions implementation I had, as is true for most of the others I've seen out there, depended on the continued existence of both webmention.io and Bridgy. In order to circumvent that, I'd have needed to employ a lot more effort at not just accessing the webmentions' constituent parts but also **saving** them to my repo just in case Bad Stuff Were To Happen.

However, by the time I'd spent some time with the research and testing which that work was going to require, I'd already reached the conclusion that, due to the other issues I've mentioned above, this simply wasn't an experiment I needed to continue.

----

All of that said, I absolutely still want to [hear from you](/contact/) whenever you have questions or comments about what you find here. Running a website like this is a two-way street. Webmentions just didn't turn out to be quite the vehicle I wanted to put on that street.
