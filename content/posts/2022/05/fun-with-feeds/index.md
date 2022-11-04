---
title: "Fun with feeds"
description: "Cut through the clutter by following various feeds."
author: Bryce Wray
date: 2022-05-30T13:10:00-05:00
#initTextEditor: iA Writer
---

<strong class="red">Important note</strong>: If you entered "fun with food" or "fun with feed" into Google and it sent you here, I'm sorry, but this page <strong class="red">is not</strong> about food. It's about how to use [web feeds](https://en.wikipedia.org/wiki/Web_feed).\
\
<strong class="red">Wichtiger Hinweis</strong>: Wenn Sie „Spaß am Essen“ oder „Spaß am Futter“ in Google eingegeben haben und Sie hierher weitergeleitet wurden, tut es mir leid, aber auf dieser Seite geht <strong class="red">es nicht</strong> um Essen. Es geht um die Verwendung von [Web-Feeds](https://de.wikipedia.org/wiki/RSS_(Web-Feed)).\
\
<strong class="red">Belangrijke notitie</strong>: als je 'fun with food' of 'fun with feed' hebt ingevoerd in Google en je bent hierheen gestuurd, sorry, maar deze pagina gaat <strong class="red">niet</strong> over eten. Het gaat over het gebruik van [webfeeds](https://nl.wikipedia.org/wiki/Webfeed).\
\
<strong class="red">Nota IMPORTANTE</strong>: si ingresó "diversión con comida" o "diversión con alimentación" en Google y lo envió aquí, lo siento, pero esta página <strong class="red">no es</strong> sobre comida. Se trata de cómo usar [las fuentes web](https://es.wikipedia.org/wiki/Fuente_web).\
\
<strong class="red">Nota importante</strong>: se hai inserito "divertimento con il cibo" o "divertimento con il feed" in Google e ti è stato inviato qui, mi dispiace, ma questa pagina <strong class="red">non</strong> riguarda il cibo. Si tratta di come utilizzare i [feed web](https://it.wikipedia.org/wiki/RSS).\
\
<strong class="red">Nota importante</strong>: se você digitou “diversão com comida” ou “diversão com alimentação” no Google e ele te enviou aqui, desculpe, mas esta página <strong class="red">não é</strong> sobre comida. É sobre como usar [feeds da web](https://pt.wikipedia.org/wiki/RSS).\
\
<strong class="red">Důležitá poznámka</strong>: Pokud jste do Googlu zadali „zábava s jídlem“ nebo „zábava s krmivem“ a poslalo vás to sem, omlouvám se, ale tato stránka <strong class="red">není</strong> o jídle. Jde o to, jak používat [webové zdroje](https://cs.wikipedia.org/wiki/RSS).
{.box}

If you're not already using a [feed reader app](https://en.wikipedia.org/wiki/RSS), you should start.

Blow off the people telling you it's old technology. So are doorknobs, radios, and commodes. Somehow, I suspect you still use all three, and many other things that are equally Tried And True.

Besides, a feed reader is useful for more than just seeing what they're up to at a given website. Even as I request that you follow this site's feeds (RSS or [JSON](https://jsonfeed.org), as you may prefer), I also suggest you learn how a feed reader can help you cut through online clutter. The examples below are truly just the tip of the iceberg.

## YouTube

Are you subscribed to any YouTube channels? Your feed reader can tell you when they issue new videos. Go to a channel's home page and copy its URL, then add it to your feed reader. The reader app will translate it appropriately.

The **Fireship** channel on YouTube has a home page URL of `https://www.youtube.com/c/Fireship`. But, when you copy that into a compatible reader app, it gets translated to what the reader really wants to use:

```plaintext
https://www.youtube.com/feeds/videos.xml?channel_id=UCc0YbtMkRdhcqwhu3Oad-lw
```

## Podcasts

You may already be aware that podcasts notify apps and websites of new content at least in part through RSS feeds. To get the URL for a podcast's feed, find the podcast's home web page; then, assuming the page doesn't helpfully display the feed link (sometimes with text like "Subscribe"), use your browser's **View Source** function and look for a line with content like this:

```html
<link rel="alternate" type="application/rss+xml"
```

The URL you'll find within that `link` is the one that your feed reader needs. For example, here's the feed `link`  for one of my long-time favorites, [*The Skeptics' Guide to the Universe*](https://www.theskepticsguide.org):

```html
<link rel="alternate" type="application/rss+xml" title="The Skeptics Guide to the Universe &raquo; Home Comments Feed" href="https://www.theskepticsguide.org/home/feed" />
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

## Mastodon

By contrast, it's a lot easier to get the RSS feed from a Mastodon user's timeline. Here's mine from the [fosstodon.org](https://fosstodon.org) instance, where I use the handle of `@BryceWrayTX` (same as on Twitter):

```plaintext
https://fosstodon.org/@BryceWrayTX.rss
```

## Never turn down free feeds

These are just a few of the more obvious possibilities for what you might want to follow with a feed reader. For others, I suggest, once again, [RSS.app](https://rss.app) and, specifically, the numerous tools on its ["Create RSS feeds" page](https://rss.app/rss-feed).

Back in the Cretaceous Era, when I was working as a radio announcer and doing remote broadcasts --- especially at locations where giveaways were common --- someone gave me some good advice: "Never turn down free T-shirts or free food." I would add to that: ". . . or free *feeds*." All you have to do is go get ’em. If this post has at least sparked your interest in checking on that, my work here is done.
