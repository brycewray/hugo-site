---
title: "Checking out the IndieWeb again"
description: "While not entirely sure I’m holding my mouth right, I’m giving webmentions another try."
author: Bryce Wray
date: 2022-05-22T15:02:00-05:00
#initTextEditor: VS Code
---

{{% disclaimer %}}
<br />

**Update, 2022-05-23**: I decided a few hours later to try --- emphasis on *try* --- a totally different approach, and thus disabled the Node.js-based webmentions stuff mentioned below. My proposed replacement is still a work in progress at this point. Will tell you more when/if I get it all to work.
{.yellowBox}

As I tweeted earlier:

{{< stweet user="BryceWrayTX" id="1528446412169416704" >}}

I even wrote a five-part **series** on incorporating [webmentions](https://indieweb.org/Webmention) on one's website back in April, 2020 (*e.g.*, [Part I](/posts/2020/04/webmentions-three-ssgs-1/)), but a few months later --- perhaps due to some uncertainty about how well [IndieWeb](https://indieweb.org) stuff was jibing with online privacy concerns --- dropped them from *this* site. So, when I decided earlier today to take another go at it, I had to dig back and find all the code from back then. (Thank Git for source-control history!)

Interestingly enough, I found only one line of the early-2020 code that needed adjustment, in `webmentions.js`:

```js
const fetch = require('node-fetch');
```

That's a no-no now, so it had to have [a fix I found](https://bobbyhadz.com/blog/javascript-error-err-require-esm-of-es-module-node-fetch):

```js
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));
```

At first, that annoyed me but, to be fair, it's actually not bad: only one line of code from that many months ago didn't age well. If only I could say the same about most of the other JS I was using back then on one repo or another.

Anyway, I got the site once again connected with [webmention.io](https://webmention.io) and [Brid.gy](https://brid.gy) for these purposes, as in 2020, and edited my [recently instituted GitHub Action](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) so that, in addition to rebuilding the site whenever I push a change to the repo, it does so *automatically* every eight hours, period. Such is necessary to make this work --- that is, assuming I *haven't* somehow screwed the pooch in re-assembling this and, thus, rendered it *unable* to work even if a post went viral and received hundreds of reactions on the social media accounts to which Brid.gy links the site.

One big difference between when I did this in 2020 and now is that, back then, the site had no [Content Security Policy](https://content-security-policy.com) in place. Now, it has not only a CSP but a pretty tight one, if I do say so myself, so I'll be particularly curious to see whether any webmentions I might get will refuse to play nicely with the CSP. Rest assured that, if it comes down to my choosing between webmentions vs. the CSP, the CSP will win that one every time.

I'll give it a few days and see how things go.
