---
layout: layouts/posts/singlepostherofit.njk
tags: post
title: "Fathom Analytics: Count on it"
subtitle: "A better way to analyze websites"
description: "How to count visitors while protecting them—and yourself."
author: Bryce Wray
date: 2020-06-19T12:45:00-05:00
lastmod: 2020-09-29T08:50:00-05:00
discussionId: "2020-06-fathom-analytics-count-on-it"
featured_image: alexander-sinn-KgLtFCgfC28-unsplash_6024x4024.jpg
featured_image_width: 6024
featured_image_height: 4024
featured_image_alt: "Concept image: Red heart shape superimposed over binary data on a computer display."
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@swimstaralex?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Alexander Sinn</a>; <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

**Affiliation disclaimer**: What follows is my *honest opinion* of something I'm now using on this site and paying for with my own money. But I want to advise you up-front that, if you [use this affiliate link (or others like it herein) to **sign up with Fathom Analytics**](https://usefathom.com/ref/ZKHYWX), I'll get a commission---***and*** **you** will get a **$10 credit** on your first invoice. So, if you like what I'm telling you here and want to [give this product a try](https://usefathom.com/ref/ZKHYWX), help out an old nerd **and** yourself and your visitors, okay? Thanks!
{.yellowBox}

Got your own website? Wonder how it's doing out there?

Or, if you think you *know* how it's doing, how much can you trust the numbers you're viewing? Does the way you get those numbers put you at odds with the growing number of laws targeting Internet privacy violations?

This article is for you.

It's only natural to be curious about which of your content your visitors are reading, what attracts them, and even what apparently has no appeal to them whatsoever. You definitely also want to know how those visitors found you in the first place.

It's equally helpful to know what mix of screen sizes your users have---*e.g.*, how your site is doing with the ever-growing number of those who view the web only from their phones---as well as which browsers they use and the countries where they live.

Until not long ago, the obvious answer to these and other, similar wishes was to use Google Analytics. After all, it gives you a staggering amount of data on your visitors, and it's even absolutely free.

But, you know the sayings:

- "There's no such thing as a free lunch."
- "If you're not the customer, you're the product."

As with its market-crushing search engine, Google uses its [cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage)-powered analytics setup to gulp down gigabytes of data from visitors to the sites with its tracking code, so it can sell that data to advertisers. *That's* why its consumer-targeted products are free; Google makes billions of dollars with the data it grabs from its free search, email, and analytics platforms.

It'll also come as no shock to you that, because of the cookies and all the data they capture, Google Analytics is a significant violator of users’ online privacy. In recent years, various laws have gone into effect that require sites to tell you about that. Why do you think you're greeted with a "Hey, yo, click here to accept that we're putting cookies on your computer" message on virtually every site you visit these days, especially if for the first time?

(Oh, while we're on that subject: if you're currently using Google Analytics or other cookie-planting stuff and you *don't* give your visitors that warning somehow---well, depending on where your visitors live, that could be "[a heap o' trouble, boy](https://www.macsmotorcitygarage.com/video-the-sheriff-of-dodge-country-1970/).”)

Similarly, many ad-blocking extensions for browsers now routinely screen out Google Analytics (and other cookie-based trackers), so it's not only intrusive on those who *don't* block it but less effective for those who use it to track their sites. What this means is: the more tech-savvy your targeted audience, the less likely Google Analytics is giving you accurate data about their visits.

So why bother?

Yet, you still want *some* data, albeit gathered in a proper way, right? Surely there must be privacy-respecting ways to do that.

Well, there are two alternatives that I can recommend, but one more than the other. And I learned of it only recently.

Each is **not** free---but, again, analytics solutions that *are* "free" are using you to grab and sell your visitors’ data, so it's a question of how you want to pay.

First, let me deal with the solution that formerly held sway with me, but lost out to the second.

## Netlify Analytics: Close, but&nbsp;.&nbsp;.&nbsp;.

Since this site has been online, it's been hosted by [Netlify](https://www.netlify.com). Last year, the company introduced its own analytics product, offering a $9-per-month package. Since it works totally server-side, it needs to put no cookies on any visitor's device. Thus, Netlify Analytics seemed to be the answer to the prayers of anybody wanting to have decent site analytics that still respected visitors’ privacy.

I've used it off-and-on since then, and---[as](https://jarv.is/notes/netlify-analytics-review/) [have](https://www.vojtechruzicka.com/netlify-analytics/) [others](https://regpaq.com/netlify-analytics-review)---have found a number of "growing pain"-type problems with what you get for that nine bucks a month (and note that many of the common complaints remain unaddressed nearly a year later):

- **Thirty days and that's it**---The data goes back only a rolling thirty days. In other words, if you want to look back and see what your site was doing thirty-one days ago, tough.
- **Real-time? Really?**---There is no real-time display of data; it's updated once an hour, and that's all she wrote.
- **Questionable data**---Netlify Analytics doesn't give you any way to block your own traffic. So, if you're sitting there trying to figure out something about your own site's appearance and thus hitting numerous pages, Netlify Analytics is counting all that. The same goes for views of your site when it's only on "[localhost](https://en.wikipedia.org/wiki/Localhost)" during development. What good does having *that* data do you? And, speaking of bogus traffic&nbsp;.&nbsp;.&nbsp;.
- **"Bots" are** ***not*** **people**---Netlify Analytics doesn't block the jillions of "bots" that scour the web for all manners of reasons, so *that* traffic, too, inflates your numbers to the point of near-uselessness.

In short, while you could say that Netlify Analytics’ "heart" is in the right place, it's just not as smart as you'd want, especially when you're paying for it. (I've justified the pricing to myself mainly as a way of paying for the quality of what I get from Netlify's otherwise free tier of website hosting, as I think a lot of other Netlify Analytics users have while waiting on the product to get better.)

There's another thing worth considering: **log retention**. For all the seemingly privacy-respecting aspects of Netlify Analytics, it obviously [requires the keeping of server access logs](https://docs.netlify.com/monitor-sites/analytics/how-analytics-works/#chart-data) for at least thirty days, so the platform definitely is not, and cannot be, log-free.

Finally, even if all these other problems were to be solved magically in a "Version 2" release any time soon, there is one lingering problem that's insoluble: **Netlify Analytics obviously cannot be portable**. After all, it's based on data that comes through Netlify's own nodes. If you decide to take your site to a different hosting service (say, [Vercel](https://www.vercel.com)), you can't take the analytics service with you---and its data is **not exportable**.[^ExportConcerns]

[^ExportConcerns]: To be fair, the way Netlify Analytics works---by retaining server logs---makes any possibility of data export problematic for privacy reasons. See [this Netlify Community discussion](https://community.netlify.com/t/download-raw-server-access-logs/6586).

So, let's summarize. What we then want is an analytics product that:

- Uses no cookies to track your visitors, thus keeping you free and clear of concerns about privacy violations.
- Can be set to block your traffic as well as "bot" traffic.
- Shows data for as long as you've been using the service, not just the last thirty days.
- Shows you real-time data.
- Works from wherever your site is hosted.
- Lets you export your data, *yet*&nbsp;.&nbsp;.&nbsp;.
- Doesn't log anyone's personal data.

And, mind you, it doesn't hurt if it's also easy on the eyes. So, with that, ladies and gentlemen, I give you [Fathom Analytics](https://usefathom.com/ref/ZKHYWX).

## Fathom Analytics: Checking the boxes

{{< imgc src="fathom-analytics_1420x1025.jpg" alt="Screen capture from the Fathom Analytics “dashboard” on its live demo" width="1420" height="1025" >}}

Fathom Analytics does, indeed, present a nice picture, as this screen capture shows; you can also view a [live demo](https://app.usefathom.com/share/lsqyv/pjrvs). But what about the [features](https://usefathom.com/features) behind that pretty face?

- **No cookies**---Fathom Analytics uses a method involving "[multiple, unrelated complex hashes](https://usefathom.com/blog/anonymization)" which provides all the tracking you'd reasonably want, yet without the drawbacks of cookies (or server logging, for that matter).
- **Compliant with privacy regs**---Because of this approach, Fathom Analytics is **fully compliant** with Internet privacy protection laws like the EU's [GDPR](https://gdpr-info.eu/), California's [CCPA](https://www.oag.ca.gov/privacy/ccpa), and the UK's [PECR](https://ico.org.uk/for-organisations/guide-to-pecr/what-are-pecr/). That means you don't have to worry about putting up (or, for that matter, whether you **need** to put up) those annoying permission pop-ups on your site.
- **Real-time display**---The Fathom Analytics dashboard shows you the data in real time. This includes the usual visitor stats you'd expect: unique visits, page views, average time on site, bounce rate, highest-traffic pages, referring sites, device types, browsers, and countries. You also can set up goals, like what kind of traffic you're getting on specific pages you may be promoting for some reason.
- **Bloat-free**---Fathom Analytics’ *single line of code*, delivered by a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) with worldwide endpoints, **won't** sap your site's performance the way the more bloated Google Analytics code can.
- **No problem with ad blockers**---Recently, Fathom Analytics [added the ability to *bypass* ad-blocker software and extensions](https://usefathom.com/blog/bypass-adblockers) while *still* protecting visitors’ privacy. So, fellow and sister owners of tech-oriented sites, when you [use Fathom Analytics](https://usefathom.com/ref/ZKHYWX), now you finally can *trust* the numbers you're seeing.
- **No bogus data**---Speaking of blocking: Fathom Analytics *blocks "bots"* and, with a simple procedure that takes a few seconds to do on a browser's Inspector, [allows you to block *your* traffic](https://usefathom.com/support/exclude), even ["localhost" stuff](https://usefathom.com/support/tracking-advanced) while you're developing. That's yet another way you know the data is real; and, especially if you build sites for customers, you want those numbers to be as real as they can be.
- **Unlimited data period**---There's no "thirty-day limit" on this data. You can see as far back as whenever you start using Fathom Analytics. So, if you [sign up today](https://usefathom.com/ref/ZKHYWX) and are still a Fathom Analytics customer four years, three months, and eighteen days from now, you'll be able to look all the way back to the data from this time.
- **Total portability**---Move your site from one host to another, even a server you run yourself if you're into that approach, and Fathom Analytics goes with you, especially because the [data is *totally exportable*](https://usefathom.com/support/export). **And**&nbsp;.&nbsp;.&nbsp;.
- **No visitor logging**---Fathom Analytics is log-free where visitors are concerned: "[we don't track, log or store any personal data in any way](https://usefathom.com/privacy-focused-web-analytics)." So, while you can take the data with you as noted above, it's *completely* anonymized.
- **Uptime monitoring**---Another recent addition to the Fathom Analytics package, at no extra charge, is [uptime monitoring](https://usefathom.com/blog/uptime-monitoring), so you can get notifications if your site goes offline for some reason. The monitoring occurs every thirty seconds, and even confirms your [SSL certificate](https://en.wikipedia.org/wiki/Public_key_certificate) is okay.

## Pricing comparison

As you can see, if you [choose Fathom Analytics](https://usefathom.com/ref/ZKHYWX), you get all the goodness of the cookie-less approach of Netlify Analytics *and* a great deal more. Indeed, Fathom Analytics includes many of the truly useful features of the "free"-but-cookie-infested Google Analytics while *not* drowning you in some minutia you may not even want. (Anyone who's ever had to prepare Google Analytics reports for non-tech-savvy customers or superiors knows exactly what I mean by that last part.)

Yet, compared to Netlify Analytics, Fathom Analytics’ pricing isn't much different, especially when you consider the additional good stuff you're getting.

- [Netlify Analytics’ pricing](https://www.netlify.com/pricing/#analytics) is $9/month ***per site*** for 250,000 pageviews per month. Beyond that level comes that ominous phrase, "Contact sales"---and, given the spurious data one sees in a Netlify Analytics instance, you have to hope that Netlify isn't using its **own** numbers to assess when you pass the basic plan's limit.
- [Fathom Analytics’ pricing](https://usefathom.com/pricing) for ***unlimited sites*** is:
	- $14/month (or $140/year) for 100,000 pageviews per month.
	- $24/month (or $240/year) for 200,000 pageviews per month.
	- $34/month (or $340/year) for 400,000 pageviews per month.
	- $44/month (or $440/year) for 800,000 pageviews per month.
	- $54/month (or $540/year) for 1,000,000 pageviews per month.
	- $74/month (or $740/year) for 2,000,000 pageviews per month.

If you go beyond 2,000,000 pageviews per month, **then** you need to talk to the Fathom Analytics sales folks. But, man, if you're pulling in that kind of traffic and you have even a *little* bit of monetization going on with your content, I suspect a few bucks a day for this quality of analytics is hardly worth worrying about.

## If it adds up for&nbsp;you&nbsp;.&nbsp;.&nbsp;.

Forgive me for mentioning this just once more, **but** if you [click here to take advantage of the Fathom Analytics **free seven-day trial**](https://usefathom.com/ref/ZKHYWX):

- You'll get $10 off your first invoice.
- I'll get a commission.

*(Curious how that works? You can easily get [full details](https://usefathom.com/affiliates) about the [Fathom Analytics](https://usefathom.com/ref/ZKHYWX) affiliate program---which, if* ***you*** *sign up for it, can benefit you and your visitors, as well.)*

But even if you just want to go to the Fathom Analytics [website](https://usefathom.com) without giving me or you a break, I urge you to check out this product. It has a lot going for it, especially considering the alternatives. It strikes me as the best option available now for knowing what your website's doing while protecting both your visitors and you.

Let's put it this way: Fathom Analytics is the kind of counting on which you **can** count.