---
title: "Static tweets: Twitter’s v2 API and video"
description: "Twitter has eliminated one major shortcoming in its preferred API."
author: Bryce Wray
date: 2022-08-21T22:43:00-05:00
lastmod: 2022-08-22T10:36:00-05:00
#draft: true
#initTextEditor: iA Writer
---

Several times this year, and [most recently earlier this month](/posts/2022/08/static-tweets-hugo-tale-two-sources/), I've written about how to embed fully static tweets in one's website, so as to include Twitter content *without* Twitter tracking scripts. I [originally found](/posts/2022/02/gems-in-rough-14/#learning-from-a-friendly-hat-tip) that doing this by accessing Twitter's preferred "v2" API was impaired by one particular shortcoming identified in the [appropriate documentation](https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/media):

> Note that video URLs are not currently available, only static images.

Since then, I've periodically checked that documentation to see whether this situation had improved. Lo and behold, this weekend, another such check revealed this text was gone. Although Twitter apparently didn't announce the shift in its [Developer Platform changelog](https://developer.twitter.com/en/updates/changelog), my testing showed that, as I'd hoped the documentation change was indicating, the v2 API now *does* provide URLs for videos. Thus, I am now working on a method to use the v2 API to produce static tweet embeds *with* videos, while also [working with the oEmbed API to provide superior text](/posts/2022/08/static-tweets-hugo-tale-two-sources/). Will provide corresponding code ASAP.

**Update, 2022-08-21**: Turns out that effort wouldn't be worth it; you still end up [having to use other APIs](https://twittercommunity.com/t/how-to-get-url-preview-of-link-shared-in-tweet/158649) to pull in what Twitter calls the "[Summary Card with Large Image](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image)" which one typically sees in a tweet that includes a URL to a suitably managed web page.\
In short . . . never mind. I'll stick with what I've got now. The v2 API may be what Twitter wants everyone to use, but it's both a major pain in the ass *and* not sufficient for proper embeds. To be fair, I know that's not what Twitter wants us to do with the v2 API. (On the other hand: after spending hour after hour staring at the v2 API's dev-unfriendly output and trying to find stuff in it, I'm fairly sure what I'd like Twitter to do with the v2 API.)
{.yellowBox}
