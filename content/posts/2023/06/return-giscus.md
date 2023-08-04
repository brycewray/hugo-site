---
title: "The return of giscus"
description: "The popular commenting platform is back on this site, with all its previous content intact."
author: Bryce Wray
date: 2023-06-21T08:51:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

For a good portion of 2022, this site used the [giscus](https://giscus.app) commenting platform. Last October, I [decided](/posts/2022/10/letting-go-giscus/) to omit it. Now, I've reversed that decision, and we're goin' with giscus once again.

<!--more-->

There's been no change in any of the technical reasons I gave at that time for taking giscus off the site, but I simply decided it would be good to bring back the capability. Although I still enjoy contacts from those who take time to email about either specific posts or the site in general, I also recognize that many people --- especially younger folks who consider non-work emailing almost as odd as actually *talking* on a smartphone --- simply aren't wired to respond that way. The Discord Generation is happier using commenting. Fair enough.

As you may know, giscus works atop [GitHub Discussions](https://docs.github.com/en/discussions), using your chosen repository to store comments. I've kept that repo as it was, so all the comments and threads from my 2022 use of giscus are still intact.

*Because* giscus still loads a lot of off-site JavaScript when visible, I am once again putting comments behind `detail` and `summary` elements, as I [explained last July](/posts/2022/07/more-tips-using-giscus/#dont-show-it-by-default). It doesn't *solve* the too-much-JS-for-my-taste issue, but it delays it unless and until the user truly opts to see the giscus comments section.

**Update, 2023-08-04**: I later learned that this works only due to a glitch in certain browsers and *isn't* kosher HTML. My JavaScript-based attempts to resolve this fell short, partly because of my substandard JS skills but also because of how browsers deal with remote scripts imported within `innerHTML`. While there are some workarounds for this annoyance, I finally decided they weren't worth the trouble.\
\
(See also my further update at the bottom.)
{.box}

So, if indeed [a blog without comments is not a blog](https://blog.codinghorror.com/a-blog-without-comments-is-not-a-blog/), I guess this site is back to being a blog. Use it in good health, everybody.

**Update, 2023-08-04**: . . . or not. 🤔\
\
After about six weeks of seeing essentially zero comments while watching giscus make many users' experience worse (again, it's because of Next.js, not giscus or [its fine developer](https://github.com/laymonage)), I have reverted to **not** having comments. This site's low traffic and the increasing specificity of its audience don't seem suited to the inclusion of a commenting feature, after all.
{.box}
