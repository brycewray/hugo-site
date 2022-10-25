---
title: "Letting go of giscus"
description: "Although giscus can be an excellent commenting system for many static websites, it no longer serves that purpose for this one."
author: Bryce Wray
date: 2022-10-25T06:38:00-05:00
# draft: true
# initTextEditor: iA Writer
---

[Back in March](/posts/2022/03/gems-in-rough-16/#trying-giscus), I began using the [giscus](https://giscus.app) commenting system on this site, mainly as an experiment. Although having it around was geekily interesting over the succeeding seven-and-a-half months, I've now removed giscus from this site. Here are the reasons why, in no particular order:

1. **It's a load** --- The hosted giscus app, which runs on [Next.js](https://nextjs.org), dumps onto a page a few hundred kilobytes of JavaScript and, where comments are available, other content. On some sites, that might be a negligible percentage of the page's total load; but, for this more spartan one (which, I'm pleased to say, is a "member" of the [512KB Club](https://512kb.club/)), that's a big tub of guts. While I've [previously](/posts/2022/05/tips-using-giscus/#get-lazy) [described](/posts/2022/07/more-tips-using-giscus/#dont-show-it-by-default) some workarounds for that, they work poorly or not at all in certain browsers.
2. **It requires using GitHub** --- To me, giscus's dependence on the [GitHub Discussions](https://docs.github.com/en/discussions) API doesn't matter, because I suspect my typical visitor either already has a GitHub account or has no objections to getting one. Still, I'm seeing [renewed anti-GitHub sentiment](https://www.zdnet.com/article/is-github-copilots-code-legal-ethically-right/) these days, so I can't pretend that it's not a source of friction for a non-trivial number of tech-savvy visitors.
3. **It requires kneecapping my CSP** --- To allow giscus to work, the site must allow [inline scripting](https://security.stackexchange.com/questions/135912/what-is-an-inline-script). However, that [critically weakens the site's Content Security Policy (CSP)](https://content-security-policy.com/examples/allow-inline-script/). Indeed, [I said back in May](/posts/2022/05/tips-using-giscus/#its-remote-scripting-all-the-waydown) that "if I stop using giscus, that'll likely be one of the key reasons why." And so it is.
4. **The level of participation hasn't been worth it** --- This is related not to giscus in particular but rather to commenting systems in general. Regardless of which such system I've ever used on this site, I've just never received enough comments to make it worth putting up with nits such as the items noted above. And that's not just because of the site's low traffic; I've found it true even when a post suddenly goes semi-viral because, say, it was the subject of a [Hacker News](https://news.ycombinator.com) thread or received mention on someone else's widely seen Twitter account.
5. **The email route is still here** --- When I [first](/posts/2021/07/gems-in-rough-07/#comment-by-email) began putting the "Reply via email" button at the bottom of each post, I hoped for the result reported by other site owners who had dumped commenting in favor of reply-via-email: *i.e.*, more thoughtful and nuanced interactions with my readers than would be likely with *any* commenting system, giscus or otherwise. Happily, that's what I've had ever since.

All this aside, I do still recommend giscus as a fine, easily implemented, and completely free/open-source commenting system for your static website **if** you're willing to overlook, or otherwise unmoved by, the items to which I objected above.
