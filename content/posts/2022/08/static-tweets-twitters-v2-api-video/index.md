---
title: "Static tweets: Twitter’s v2 API and video"
description: "Twitter has eliminated one major shortcoming in its preferred API."
author: Bryce Wray
date: 2022-08-21T22:43:00-05:00
#draft: true
#initTextEditor: **FILL IN**
---

Several times this year, and [most recently earlier this month](/posts/2022/08/static-tweets-hugo-tale-two-sources/), I've written about how to embed fully static tweets in one's website, so as to include Twitter content *without* Twitter tracking scripts. I [originally found](/posts/2022/02/gems-in-rough-14/#learning-from-a-friendly-hat-tip) that doing this by accessing Twitter's preferred "v2" API was impaired by one particular shortcoming identified in the [appropriate documentation](https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/media):

> Note that video URLs are not currently available, only static images.

Since then, I've periodically checked that documentation to see whether this situation had improved. Lo and behold, this weekend, another such check revealed this text was gone. Although Twitter apparently didn't announce the shift in its [Developer Platform changelog](https://developer.twitter.com/en/updates/changelog), my testing showed that, as I'd hoped the documentation change was indicating, the v2 API now *does* provide URLs for videos. Thus, I am now working on a method to use the v2 API to produce static tweet embeds *with* videos, while also [working with the oEmbed API to provide superior text](/posts/2022/08/static-tweets-hugo-tale-two-sources/). Will provide corresponding code ASAP.
