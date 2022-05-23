---
title: "Webmentions yes, JavaScript no"
description: "I wondered why a Hugo site needed JavaScript to go IndieWebbin’. I decided it didn’t."
author: Bryce Wray
date: 2022-05-23T16:23:00-05:00
#lastmod: 2022-05-23T18:43:00-05:00
#draft: true
#initTextEditor: VS Code
discussionId: "2022-05-webmentions-yes-javascript-no"
---

**Note**: This post also appears on [dev.to](https://dev.to/brycewray/webmentions-yes-javascript-no-ho6).
{.yellowBox}

I tried [yesterday](/posts/2022/05/checking-out-indieweb-again/) to get this site back on the [IndieWeb](https://indieweb.org/) with at least some form of [webmentions](https://indieweb.org/Webmention). However, within a few hours, it became clear that the third-party JavaScript code I'd used [in 2020](/posts/2020/04/webmentions-three-ssgs-3/) wasn't going to cut it now, for reasons which remain unclear at this writing. Accordingly, I resigned myself to having to dope out what changes I'd have to make in the borrowed code; and, while I worked on that, I reverted the site to its previous, non-webmentions form.

In the interim, I found myself pondering why *every* webmentions-on-Hugo solution I'd ever found up to now used JavaScript, rather than trying to do it purely in Hugo. After all, Hugo sports plenty of data-grabbing horsepower. For example: in my own experience to date, I've found Hugo's [`getJSON`](https://gohugo.io/templates/data-templates/#get-remote-data) feature just as useful as the [`node-fetch`](https://github.com/node-fetch/node-fetch) on which the aforementioned JS relied to grab data from [webmention.io](https://webmention.io).

In a short time, I'd ditched the idea of patching up the 2020 solution and, instead, started building a completely new one of my own which would use `getJSON` to work with the webmention.io API.[^JS_API]

[^JS_API]: It would be funny if certain guys from my [final workplace](/posts/2021/09/transition/)---who, three years ago, laboriously helped me through my first-ever attempts at using JS to extract data from remote sites---should happen to read this. I just hope they're not eating or drinking anything when they do; I'd hate to be responsible for a choking incident or, at the very least, a splattered phone screen.

Thus, after spending a long night and most of this day figuring it out, I present to you what I originally thought could be the world's only Hugo-based site which displays webmentions **without** requiring a single line of JavaScript, although [I later learned otherwise](https://gitlab.com/kaushalmodi/hugo-theme-refined/-/blob/master/layouts/partials/webmention_rcv.html) from fellow Hugo user [Kaushal Modi](https://twitter.com/kaushalmodi/). Also, I will confess to some pleasure in getting to trash all those `node_modules` folders I'd had to add just yesterday due to the dependencies on which the earlier, JS-based method relied. I'm no JS-hating purist but, hey, when you don't *need* all the extra weight, why keep it in the repo?

When I have the code somewhat [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)-er, I'll write  about it. In the meantime, I've left the following comment within the `webmentions-pipes` partial template I'm using to suck all this into each applicable post, just in case the curious happen to find that partial on the site repo:

```go-html-template
{{/*
  Apologies for the ugliness of the following.
  First, I'll make it work; then I'll **try**,
  at least within the limits of Go and Hugo,
  to make it a bit DRY-er at the very least.
  Fortunately, both Go and Hugo are so fast,
  I don't pay a (real) penalty for this spaghetti.
  But I **do** want to do better. Trust me, friends.
  And, yes, there are some unused vars in here.
  Some are for testing only; some are yet to be used.
*/}}
```

For now, I'll just feel fortunate if I don't end up being the subject of one of those *Jurassic Park* memes about being [so preoccupied with whether I *could* do this, I failed to consider whether I *should*](https://quotegeek.com/quotes-from-movies/jurassic-park/397/)---but, truth be known, right now I do feel pretty good about it all. Any time I can get Hugo's funky templating to do something a little out of the ordinary, I consider it a victory. I can only hope it doesn't end up being the [Pyrrhic](https://www.merriam-webster.com/words-at-play/pyrrhic-victory-meaning) kind.

Oh, and if you do happen to check out that code in my repo: I repeat that it's very much a work in progress, and request that you not judge it too harshly.
