---
title: "Twitter kills free access to its APIs"
description: "Make others pay for giving you free advertising. Yeah, that’s the ticket."
author: Bryce Wray
date: 2023-02-02T13:09:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Word came overnight from [Twitter's Developer Platform](https://developer.twitter.com) that things are going to get unpleasant, and potentially expensive, for applications and websites which depend on Twitter APIs.

For years, free access to those APIs has made it possible to reproduce tweets, timelines, and the like with fairly simple code. As a result, untold millions of people who might otherwise have missed this content were exposed to it, presumably enhancing Twitter's popularity and, thus, more than compensating for whatever it might have cost Twitter to provide the APIs.

Well, boy, howdy: the [loan-burdened](https://www.theverge.com/2022/11/2/23437120/elon-musk-twitter-product-subscription-verification-revenue-debt-finance) Twitter couldn't very well have *that*, could it? So, now, free access to those APIs is going away.

<!--more-->

A tweet thread issued overnight (U.S. time) from the [@TwitterDev account](https://twitter.com/TwitterDev) made the disclosure:

> Starting February 9, we will no longer support free access to the Twitter API, both v2 and v1.1. A paid basic tier will be available instead 🧵
>
> <span class="legal">6:05 AM • February 2, 2023 (UTC)</span>
<!-- https://twitter.com/TwitterDev/status/1621026986784337922 -->

> Over the years, hundreds of millions of people have sent over a trillion Tweets, with billions more every week.
> 
> <span class="legal">6:06 AM • February 2, 2023 (UTC)</span>
<!-- https://twitter.com/TwitterDev/status/1621027280935092225 -->

> Twitter data are among the world’s most powerful data sets. We’re committed to enabling fast &amp; comprehensive access so you can continue to build with us. 
> 
> We’ll be back with more details on what you can expect next week.
> 
> <span class="legal">6:07 AM • February 2, 2023 (UTC)</span>
<!-- https://twitter.com/TwitterDev/status/1621027418680229888 -->

Never mind the fact that one week is an incredibly short window for app developers and websites to decide whether they **are** willing to pay for access to the APIs, especially given that the pricing is yet to be disclosed. Consider that those which **can't** pay are going to be hampered tremendously. As [Jess Weatherbed](https://www.theverge.com/authors/jess-weatherbed) put it in [her related article for *The Verge*](https://www.theverge.com/2023/2/2/23582615/twitter-removing-free-api-developer-apps-price-announcement):

> Many small developers have used Twitter’s free API access to create fun tools and useful bots like novelty weather trackers and black-and-white image colorizers which are not intended to earn income or turn a profit. As a result, it’s likely that many bots and tools utilizing Twitter’s free API access will need to charge a fee or be shut down. It would also impact third parties like students and scientists who use the platform to study online behavior and gather information for research papers.

I suggest you read both that article and [Ashley Belanger](https://arstechnica.com/author/ashleybelanger/)'s [*Ars Technica* article](https://arstechnica.com/tech-policy/2023/02/cash-strapped-twitter-to-start-charging-developers-for-api-access-next-week/) for more details about Twitter's decision and the ramifications thereof.

For my part, this all means that, if I hadn't already [deprecated](/posts/2022/11/static-tweets-deprecation/) my multiple posts from last year about using the Twitter APIs to embed tweets fully statically, this would've killed them for sure.

## Effects on Hugo-based sites

By the way: if you're a [Hugo](https://gohugo.io) user who employs its [built-in `tweet` shortcode](https://gohugo.io/content-management/shortcodes/#tweet), this doesn't appear --- **so far** --- to affect [Twitter's oEmbed API](https://developer.twitter.com/en/docs/twitter-for-websites/timelines/guides/oembed-api), on which that shortcode depends. The same API also enables many of the embedded tweets you see on the web, so making a similar change to that API could cause a massive amount of content to go away almost instantaneously. It would be a "nuclear option" kind of event.

If you still use `tweet`, just be sure you [make the appropriate privacy settings](https://gohugo.io/about/hugo-and-gdpr/#twitter). For example, here's how Hugo with those settings renders that initial tweet about the change in the affected APIs' availability:

{{< tweet "TwitterDev" "1621026986784337922" >}}

. . . or, at least, that's how Hugo renders it unless and until Twitter kills free access to **that** API, too. Use it, and Twitter in general, at your own risk.
