---
title: "Why have both RSS and JSON feeds?"
description: "Because providing choices is wise, I now have another reason to double up on this site’s content feeds."
author: Bryce Wray
date: 2022-12-09T11:32:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Back in May, [Kevin Cox](https://kevincox.ca) posted an [excellent article](https://kevincox.ca/2022/05/06/rss-feed-best-practices/) concerning a subject on which I've written from time to time: the need for your personal site to offer one or more [content feeds](https://indieweb.org/feed) for use by those with feed reader apps and/or services. If you haven't seen the article, I recommend it highly.

Only thing is, I disagree with one point he made early on in the article.

<!--more-->

You see, this site provides both [RSS](https://www.rssboard.org/rss-specification) and [JSON](https://jsonfeed.org/) feeds (linked from their respective icons at the bottom of each page on the site), and I've [noted](/posts/2021/05/help-your-website-get-discovered/) those are both good choices for others' sites, too. However, Cox's article recommended against the JSON Feed format because it is "less widely supported." (He also said to avoid a few other older or [obscure](https://microformats.org/wiki/h-feed) formats, and I concur with him on those.)

So, in the [Hacker News thread](https://news.ycombinator.com/item?id=31293488) which had tipped me off to Cox's article in the first place, I commented:

> Agree that RSS is imperative; don't agree about excluding JSON feeds. One can do both.

. . . to which Cox himself replied:

> One can, but I've found little value to this. What are you giving your readers with JSON feeds that the RSS or Atom feed isn't giving them?

. . . prompting this from me:

> Some prefer it. It offers another two or three fields that RSS doesn't.
>
> In any event, it requires virtually zero extra effort after initial setup, so I see no reason not to offer both. Different strokes...

And now, months later, I have an additional answer to his "What is it good for?" question: *I am using the two-feeds approach to give my feeds-savvy readers a choice*. "Different strokes," indeed.

Some folks want to see articles' entire content in feeds, thus saving them from having to go to the sourced website; but others prefer only a title and short description. (Either method links back to the original, of course.) Until a few days ago, *both* my RSS and JSON feeds went the entire-content route. Indeed, a JSON feed **has** to do so, because that's part of the [JSON Feed spec](https://www.jsonfeed.org/version/1.1/):

> `content_html` and `content_text` are each optional strings — but one or both must be present. This is the HTML or plain text of the item.

. . . but an RSS feed has no such requirement. So, now, I have set my feeds as follows for any post featured therein: each feed includes the article's title and description, but the JSON feed also includes the full content. And, just to cover all bets, the RSS feed notes that those who **still** want the full content can simply subscribe to the JSON feed --- which, yes, is linked from each RSS feed item.

Bottom line: yep, there *are* good reasons to have both RSS and JSON feeds. Perhaps your site, too, can benefit from a similar approach.

**Update, 2022-12-10**: Looks like I zigged when I should've zagged. See the [next post](/posts/2022/12/not-so-fast-there-fella/) for more details.
{.box}
