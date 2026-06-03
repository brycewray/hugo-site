---
title: "Mixed nuts #18"
description: "AVIF support in Hugo, hashes in action(s), floaters, and clankers."
author: Bryce Wray
date: 2026-06-03T14:27:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

For no major reason other than that I feel like writing about a few odds and ends which have recently occupied my mind, here's [yet another](/posts/2026/03/mixed-nuts-17/) "Mixed nuts" post.

<!--more-->

____

Although I haven't yet tried it on this here site, the [Hugo](https://gohugo.io) static site generator has added [AVIF](https://aomediacodec.github.io/av1-avif/) support to its already impressive [image processing capabilities](https://gohugo.io/content-management/image-processing/) as of [v.0.162.0](https://github.com/gohugoio/hugo/releases/tag/v0.162.0). The curious may want to check out [this demo repo](https://github.com/bep/hdrsdr.com) and its [corresponding site](https://hdrsdr.com/). Note that, apparently, [not all browsers](https://discourse.gohugo.io/t/hugo-v0-162-0-released/57207/14) handle the [HDR](https://www.digitaltrends.com/photography/what-is-hdr-photography/) aspects equally well.

*When I build this site through CI/CD, I typically use a [GitHub Action](https://github.com/features/actions) which, in turn, calls on **other** actions to facilitate things ---* e.g.*, [`checkout`](https://github.com/actions/checkout) for accessing the site repo's contents. After reading about one supply-chain attack after another over the last few months, I finally decided to heed widely discussed advice and **pin** those actions by their respective commit-hashes, **not** their release tags. This means that even if a bad actor manages to hijack the repo of (again,* e.g.*) `checkout`, my overarching GHA won't be affected. [This article](https://blog.rafaelgss.dev/why-you-should-pin-actions-by-commit-hash) by Rafael Gonzaga explains; and [this one](https://www.stepsecurity.io/blog/pinning-github-actions-for-enhanced-security-a-complete-guide) on the StepSecurity website gives you additional details, notably how you **get** each hash in the first place.*[^commit]

[^commit]: In short: you navigate to the web page of the commit itself and copy the hash from the end of the page's URL.

Ah, me, but getting old does so bite sometimes. To quote T. S. Eliot's [*The Love Song of J. Alfred Prufrock*](https://poets.org/poem/love-song-j-alfred-prufrock):

> I grow old . . . I grow old . . .<br> 
> I shall wear the bottoms of my trousers rolled.
> 
> Shall I part my hair behind? Do I dare to eat a peach?<br>
> I shall wear white flannel trousers, and walk upon the beach.

Well, that's all well and good, but Eliot never said a word about [*floaters*](https://newsnetwork.mayoclinic.org/discussion/mayo-clinic-q-and-a-most-eye-floaters-caused-by-age-related-changes/); and, boy, are they ever in my eyes (which are both aged and myopic, an especially floaters-friendly combo). So much so, in fact, that my web-browsing habits have veered away from a position I took here six years ago --- [in one of the earliest "Mixed nuts" posts](/posts/2020/05/mixed-nuts-2020-05/), as a matter of fact --- on the question of light mode *vs.* dark mode. Despite [studies](https://tidbits.com/2019/05/31/the-dark-side-of-dark-mode/) I cited back then, I am now making use of dark mode whenever possible because, simply put, the floaters make reading light text on dark backgrounds far less aggravating than is the case with dark text on light backgrounds. I will reserve judgment on the trousers, the hair (as if I had enough to consider), the peach, and the beach.

*I've added another ["slash page"](/posts/2024/06/slash-pages-existing-new/). This one explains my [stances on AI where the site is concerned](/ai/). The bottom line: I don't use AI for writing, although I do let it give me **limited** assistance in coding. The day when I can no longer write without the help of clankers will be the day when I **call** it a day, website-wise. There's already enough slop out there without this site's adding to it.*
