---
title: "Not so fast, there, fella"
description: "Survey says: I jumped the gun on that two-feeds strategy I mentioned in the previous post."
author: Bryce Wray
date: 2022-12-10T14:40:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Sometimes a learning experience is also a humbling experience. Such was the case with the aftermath of [my previous post](/posts/2022/12/why-have-both-rss-json-feeds/).
<!--more-->

In case you didn't read that one, it was my explanation of how I was now using this site's [RSS](https://www.rssboard.org/rss-specification) and [JSON](https://jsonfeed.org/) content feeds: *i.e.*, the former with only the title and description of each post and the latter also with the post's full content. I thought I'd cooked up a best-of-both-worlds approach for my feeds-savvy readers, since they could choose the content feed which best suited their wishes.

But I soon learned it wasn't that simple.

I heard from folks saying that it wasn't a safe assumption that everyone could choose either kind of feed, with the JSON Feed format being less widely supported than the ancient-in-Internet-time RSS. While my own research had shown JSON feeds are available via the vast majority of feed-reader apps and services, "the vast majority" is not the same as "one hundred percent."

Some also told me that, regardless of feed type (a choice of which, a few respondents suggested, required more knowledge than a non-trivial number of feed customers might have), they fervently believed it should be one way or the other, not both. That set of responses, in particular, led me to conduct a poll on Mastodon, and here's how it turned out:

{{< stoot "fosstodon.org" "109485575488763076" >}}

<!--
https://fosstodon.org/@BryceWrayTX/109485575488763076
Final results:
- Full article text: 72.0% (screen: 72%)
- Article excerpt:   20.4% (screen: 20%)
- No preference:      7.6% (screen:  8%)
Total votes: 646 people
-->

Not exactly too close to call, eh?

"Full article text" took a substantial lead almost immediately and, especially once the quantity of voters grew large enough to provide some degree of statistical significance, never lost it throughout the poll's twenty-four-hour life. I suppose that's what I get for changing the feeds and writing the previous post **before** doing the poll. D'oh.

***But*** . . .

Even though "Article excerpt" came in a very poor second, a number of its adherents told me that only that approach worked with certain device setups, bandwidth constraints, and so forth --- not to mention people's tight schedules. So, while it was clear that I needed to give the "Full article text" side its due in configuring my feeds, I also saw that I couldn't simply ignore the minority and go back to having *only* full-text feeds. I had to do better.

As a result, here's what I've done with the site:

- There are now *four* feeds, two in RSS (actually [Atom](https://en.wikipedia.org/wiki/Atom_(web_standard))) format[^Atom] and two in JSON format. Each format has one *primary* feed and one *secondary* feed. All four are linked from the ["Contact" page](/contact).
- The two primary feeds are still (a.) at their previous locations (`index.xml` and `index.json`, respectively) and (b.) linked from distinctive icons in the footer. Each primary feed once again includes the *full content* of each post, as was these feeds' setup prior to my turned-out-to-be-temporary shakeup of the last couple of days.
- Each of the two secondary feeds (either `index-excerpts.xml` or `index-excerpts.json`) includes *only* each post's title, description, and --- you guessed it --- an excerpt.[^credit]

[^Atom]: I chose to go with Atom after further research, during which I was particularly convinced by "[Atom > RSS: Why We Should Just Call Them 'Feeds' Instead of 'RSS' Feeds](https://danielmiessler.com/blog/atom-rss-why-we-should-just-call-them-feeds-instead-of-rss-feeds/)" by [Daniel Miessler](https://danielmiessler.com/) (and other articles like it). It's also worth noting that the documentation for [Eleventy](https://11ty.dev)'s [official RSS plugin](https://www.11ty.dev/docs/plugins/rss/) chiefly recommends using Atom. On the other hand, [Hugo](https://gohugo.io)'s default feeds template uses RSS **but** you can use an Atom template instead, such as what's recommended in "[Hugo Atom Syndication XML Template (Better RSS)](https://www.jhaurawachsman.com/hugo-atom-syndication-xml-template/)" by [Jhaura Wachsman](https://www.jhaurawachsman.com/).

[^credit]: Credit where credit's due: to code for the excerpts and then convert them into Markdown for processing at build time, I relied heavily on "[Customize front matter parsing](https://www.11ty.dev/docs/data-frontmatter-customize/)" in the [Eleventy documentation](https://11ty.dev/docs/) and "[Replicating Jekyll's `markdownify` filter in Nunjucks with Eleventy](https://edjohnsonwilliams.co.uk/blog/2019-05-04-replicating-jekylls-markdownify-filter-in-nunjucks-with-eleventy/)" by [Ed Johnson-Williams](https://edjohnsonwilliams.co.uk/).

I think this is about as close as I can come to making everyone happy on this particular score. Guess I'll find out.
