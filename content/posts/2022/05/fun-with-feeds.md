---
title: "Fun with feeds"
description: "Cut through the clutter by following various feeds."
author: Bryce Wray
date: 2022-05-30T13:10:00-05:00
#initTextEditor: iA Writer
---

If you're not already using a feed reader app, you should start.

Blow off the people telling you it's old technology. So are doorknobs, radios, and commodes. Somehow, I suspect you still use all three, and many other things that are equally Tried And True.

Besides, a feed reader is useful for more than just seeing what they're up to at a given website. Even as I request that you follow this site's feeds (RSS or [JSON](https://jsonfeed.org), as you may prefer), I also suggest you learn how a feed reader can help you cut through online clutter. The examples below are truly just the tip of the iceberg.

## YouTube

Are you subscribed to any YouTube channels? Your feed reader can tell you when they issue new videos. Go to a channel's home page and copy its URL, then add it to your feed reader. The reader app will translate it appropriately.

The **Fireship** channel on YouTube has a home page URL of `https://www.youtube.com/c/Fireship`. But, when you copy that into a compatible reader app, it gets translated to what the reader really wants to use:

```plaintext{bigdiv=true}
https://www.youtube.com/feeds/videos.xml?channel_id=UCc0YbtMkRdhcqwhu3Oad-lw
```

## Podcasts

You may already be aware that podcasts notify apps and websites of new content at least in part through RSS feeds. To get the URL for a podcast's feed, find the podcast's home web page; then, assuming the page doesn't helpfully display the feed link (sometimes with text like "Subscribe"), use your browser's **View Source** function and look for a line with content like this:

```html
<link rel="alternate" type="application/rss+xml"
```

The URL you'll find within that `link` is the one that your feed reader needs. For example, here's the feed `link`  for [the *ChangeLog* podcast](https://changelog.com/podcast/):

```html{bigdiv=true}
<link href="https://changelog.com/podcast/feed" rel="alternate" title="The Changelog Podcast Feed" type="application/rss+xml">
```

## Reddit

Most subreddits have an RSS feed. All you have to do is take a subreddit's URL and add `.rss` to the end of it. I suggest using the `new` designation so you get the latest posts, sorted appropriately.

The [Eleventy](https://11ty.dev) subreddit, with the `new` designation, is `https://www.reddit.com/r/eleventy/new`. Thus, its feed URL would be:

```plaintext
https://www.reddit.com/r/eleventy/new.rss
```

## Twitter

Getting RSS from a Twitter timeline can be tricky, depending on your feed-reading options. Some readers (*e.g.*, my favorite, [NetNewsWire](https://netnewswire.com)) have built-in abilities to translate a Twitter timeline into an RSS feed.[^noise] Otherwise, just use the [Twitter RSS Feed tool](https://rss.app/rss-feed/create-twitter-rss-feed) on the [RSS.app](https://rss.app) site --- about which, a bit more at the end.

[^noise]: Obviously, this could become a big pain, quickly, if you follow a *very active* Twitter timeline. *Caveat emptor*.

**Note from the future**: Given the pace of [ongoing changes at Twitter](/posts/2023/02/twitter-kills-free-access-apis/), it's unlikely this information's accuracy will remain reliable.
{.box}

## Mastodon

By contrast, it's a lot easier to get the RSS feed from a Mastodon user's timeline. Just use the following structure, where `instance.xyz` is the instance and `@UserName` is the user's handle:

```plaintext
https://instance.xyz/@UserName.rss
```

## Never turn down free feeds

These are just a few of the more obvious possibilities for what you might want to follow with a feed reader. For others, I suggest, once again, [RSS.app](https://rss.app) and, specifically, the numerous tools on its ["Create RSS feeds" page](https://rss.app/rss-feed).

Back in the Cretaceous Era, when I was working as a radio announcer and doing remote broadcasts --- especially at locations where giveaways were common --- someone gave me some good advice: "Never turn down free T-shirts or free food." I would add to that: ". . . or free *feeds*." All you have to do is go get ’em. If this post has at least sparked your interest in checking on that, my work here is done.
