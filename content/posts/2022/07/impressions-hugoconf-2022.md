---
title: "Impressions from HugoConf 2022"
description: "Takeaways from two great days that focused on the Hugo static site generator."
author: Bryce Wray
date: 2022-07-11T08:43:00-05:00
#initTextEditor: iA Writer
---

[CloudCannon](https://cloudcannon.com)'s [HugoConf 2022](https://hugoconf.io) event, held this past weekend in the online presence of several hundred registered "attendees" who wanted to learn more about the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG), was fascinating and fun. As I told CloudCannon's [David Large](https://twitter.com/avidlarge):

> I’ve seen many online events of this nature, including some put on by **much** larger operations than [CloudCannon], which didn’t go remotely as smoothly, or pack as much good info and interesting presentations into so relatively little time. How amazingly well it all came off clearly reflects the superior preparation and effort of all of you, and it was a winner from start to finish.

For those of you who missed HugoConf 2022, the individual presentations are available as separate videos on [CloudCannon's YouTube channel](https://www.youtube.com/c/CloudCannon), and you also can view recordings of the entire streams from [Day 1](https://www.youtube.com/watch?v=JpxiKUHzoqM) and [Day 2](https://www.youtube.com/watch?v=ACRN43SbF2g).

In no particular order, here are some of my takeaways from this first-ever HugoConf, of which I hope there will be future iterations.

----

For me, the highlight of the whole thing was Day 2's live interview with Hugo's creator, [Steve Francia](https://twitter.com/spf13). I already knew that he'd built Hugo back in 2013 out of his own frustrations with the (then-) molasses-like [Jekyll](https://jekyllrb.com) SSG, but was surprised and amused when he said he'd also used the process to *learn about* the [Go](https://go.dev) language on which he chose to base Hugo. May all learning experiences yield such great results!

Any doubts I'd entertained about Hugo's long-term future were wiped away by how multiple presenters demonstrated projects that make some ingenious uses of Hugo. Unlike what often happens in events like these --- *i.e.*, presenters show off only their own stuff and don't necessarily make much of a connection between it and the actual project around which the event is supposed to be centered --- these folks made it clear that they "get" Hugo. They understand Hugo's unique advantages, especially when compared to SSGs that dump a ton of JavaScript onto visitors' browsers[^islands], and their presentations reflected that.

[^islands]: And, no, the current movement toward the [*islands architecture* model](https://www.patterns.dev/posts/islands-architecture/) doesn't fully obviate that, although it at least is moving the world of JavaScript-based SSGs in the right direction, away from their bloated pasts. Evolution is good overall, yet never extinctions-free.

A couple of intriguing acronyms appeared, with mention of two tech stacks that employ Hugo:

- The THANG stack[^THANG] --- [Tailwind CSS](https://tailwindcss.com), Hugo, [Alpine.js](https://alpinejs.dev/), [Netlify](https://netlify.com), and Go.
- The HABIT stack[^HABIT] --- Hugo, Alpine.js, [Bookshop](https://github.com/cloudcannon/bookshop) (CloudCannon's open-source project for component-based development in SSGs), and Tailwind. (As for the missing *I*: perhaps they thought *HABT* would look weird and they were already pronouncing it *habit*, anyway, so . . .)

[^THANG]: By [Carl Johnson](https://twitter.com/carlmjohnson), Director of Technology at [Spotlight PA](https://www.spotlightpa.org/).

[^HABIT]: By [Jan Claasen](https://twitter.com/janclaasen), a web dev at CloudCannon.

Speaking of Bookshop: its primary developer, CloudCannon's [Liam Bigelow](https://twitter.com/LiamBigelow), announced another open-source project, called [Pagefind](https://github.com/cloudcannon/pagefind), which gives a website fully static search "without any extra infrastructure." I gave it a try and, while I'll defer using it here until it's a bit more mature and a few rough edges are smoothed out[^Pagefind], I was *highly* impressed. It's code-light and staggeringly fast. Here's Bigelow's presentation from Day 1:

[^Pagefind]: Among other things, I'll want to control whether Pagefind includes images in what it grabs. I was able to use styling to *hide* the images, but they --- and some other image files --- still showed up in the download, so I want the option to ignore them altogether.

{{< lite-youtube videoTitle="Introducing Pagefind: static low-bandwidth search at scale - Liam Bigelow // HugoConf 2022" videoId="74lsEXqRQys" >}}

One more thing . . .

Amid all the Tailwind love apparent in comments from both presenters and "attendees," I was a little sad not to hear some kind words about [Sass](https://sass-lang.com), too. Of course, Tailwind is simply the hotter commodity in the web dev community, as has been true for quite a while now. Also, I suspect that Hugo's ongoing issues concerning Dart Sass *vs.* the deprecated LibSass, about which I've written numerous times in the last year-and-a-half, probably don't help. In any event: this is by no means a reflection on HugoConf but, rather, just an offhand observation on my part.
