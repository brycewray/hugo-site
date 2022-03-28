---
title: "Simplify, simplify (again)"
description: "As I was saying over a year ago before I was so rudely interrupted by life . . ."
author: Bryce Wray
date: 2022-03-22T13:24:00-05:00
lastmod: 2022-03-23T09:08:00-05:00
#initTextEditor: Ulysses
#draft: false
discussionId: "2021-03-simplify-simplify-again"
featured_image: "oxane-alexandroff-Z0ccygTNEfM-unsplash_6000x4000.jpg"
featured_image_width: 6000
featured_image_height: 4000
featured_image_alt: "Concept photo of simplicity and serenity - distant sea horizon viewed from a beach"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@oxanetruth?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Oxane Alexandroff</a>; <a href="/s/photos/simplicity?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

A funny thing happened on the way to the website-maintenance simplicity about which [I wrote](/posts/2021/02/simplify-simplify/) early last year. Or, to put it more accurately: several things happened, although none of them was funny, except perhaps in the “whoa, *that* was weird” sense of *funny*.

Now, I’m back to the point I *thought* I’d reached at that time, which is a determination to run this site on just one [SSG](https://jamstack.org/generators), rather than continuing to go back and forth between [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io). A good part of the reason for that is, simply, I no longer consider the duplication worth the effort.

“What duplication?” you may ask. Well&nbsp;.&nbsp;.&nbsp;.

## Double your fun?

Allow me to explain what I’ve had to do over the last few years to switch back and forth, at will, between two SSGs while not breaking the site in the process. In short, I’ve had to keep two separate site repositories going. And, let me tell you: that’s been a *big deal*.

Here is a greatly simplified depiction of my site’s typical content structure with only this month’s posts (as of this post’s initial appearance), first in the Eleventy repo:

```plaintext
.
└── src
    └── posts
        └── 2022
            └── 03
                └── gems-in-rough-15.md
                └── gems-in-rough-16.md
                └── making-tailwind-jit-work-hugo-version-3-edition.md
this post ->    └── simplify-simplify-again.md
                └── using-dart-sass-hugo-sequel.md
                └── using-dart-sass-hugo.md
```

.&nbsp;.&nbsp;. and, then, in the Hugo repo:

```plaintext
.
└── content
    └── posts
        └── 2022
            └── 03
                └── gems-in-rough-15.md
                └── gems-in-rough-16.md
                └── making-tailwind-jit-work-hugo-version-3-edition.md
this post ->    └── simplify-simplify-again.md
                └── using-dart-sass-hugo-sequel.md
                └── using-dart-sass-hugo.md
```

Now, at first, that may not seem quite so bad for maintaining the two simultaneously. After all, I needed only to copy content back and forth as needed, right? Well, sometimes, it *has* been that simple, but not usually.

For just one example: every article that included one or more code blocks (as do quite a few of my posts) had to be handled slightly differently between the two SSGs to ensure that each would correctly display the code.[^1] Multiply that &times; however many code blocks a post has, and you begin to see the problem. For this and other reasons, the two SSGs had different (even if sometimes only very slightly different) versions of each post.

Thus, every time I’d *update* any post, which I often do, I’d have to update it in the two separate repos. Where things really got to the tear-out-my-missing-hair level was when I had to apply content updates (*e.g.*, fixes of long-ignored typos or corrections of newly discovered informational errata) to *many* files. That meant *two* sets of such actions. Fortunately, my chosen editor apps made these tasks much less of a pain than might otherwise have been the case; but, still, this stuff could get nasty at times.

Then, over and above the idea of duplicating (but only *sorta* duplicating) content, consider what was involved in maintaining layouts and shortcodes for the different SSGs. Much of the HTML, styling, and logic were the same, but the other code usually differed greatly. Having two different sets of layouts actually wasn’t that bad, since I could pretty much set them up and not worry about them; but what *was* particularly difficult at times, albeit a great learning experience, was the need for separate Eleventy and Hugo shortcodes. Just check my [two](/posts/2021/02/go-big-go-home/) [posts](/posts/2021/11/go-big-go-home-sequel/) about the differing shortcodes for handling the site’s [Cloudinary](https://cloudinary.com)-hosted images, and you’ll get some idea of what I mean.

## A line in the shifting sands

The aggravation factor notwithstanding, I conceivably might have continued indefinitely with the “I-gotta-do-everything-twice” approach. However, I began to reconsider this course due to several developments, some of which are still in progress at this writing.

First: near the end of 2021, intrigued by [some new advances](/posts/2021/12/fetching-remote-stuff-hugo-0-90-plus/) on the Hugo front, I once again moved the site back to that SSG; and, within the last few weeks, all of Hugo’s aforementioned technical issues finally were resolved to my satisfaction, through either [actual fixes](/posts/2022/03/gems-in-rough-15/#hugogoldmark-typographyglitch-finallysolved) or [stable](/posts/2022/03/making-tailwind-jit-work-hugo-version-3-edition/) [workarounds](/posts/2022/03/using-dart-sass-hugo-sequel/).

Not long after my latest move from Eleventy to Hugo, the nice folks at [CloudCannon](https://cloudcannon.com) asked me to write a series of Hugo-related articles for their [blog](https://cloudcannon.com/blog). The concomitant research, including the many interesting sources I’ve had to consult because of the often-discussed problems with Hugo’s documentation, increased my interest in using Hugo on a more permanent basis.

As for Eleventy: while I have an extremely high regard for it and its amazing community, I’ve recently sensed that the project may be evolving, perhaps inevitably, from “the easiest SSG” to “the most customizable SSG.” If so, the latter categorization renders my relatively simple site no longer the perfect fit for Eleventy that it once was.[^2] Of course, given the realities of the race for web developers’ affections, such an evolution is an imperative for, and a marvelous achievement by, Eleventy and its ever-growing tribe of users. This is particularly true considering the meteoric rise of the [Astro](https://astro.build) SSG.

All of this has led me to some key decisions:

- The site is on Hugo for the foreseeable future.[^3]
- I still need to stay current with What’s Kewl Among Web Developers. After all, I hope to keep writing articles for sites besides my own; and, understandably, those sites want pieces that will attract the most eyes. Thus, I will continue to *experiment* with New Kewlness in other SSGs via, at least for now:
	- A new, smaller, sparer version of the site’s former Eleventy repo, likely equipped with the [Slinkity](https://slinkity.dev) plugin.
	- An Astro repo. While Astro still is very much an early-stage project, it seems to have stabilized sufficiently that even this old fart can work with it without too much frustration.

With any luck at all, this approach will enable me to maintain this site more efficiently, yet still keep my eyes on what else is happening in WebDevLand. I’m crossing my fingers.

**Update, 2022-03-23**: Slinkity creator/maintainer [Ben Holmes](https://twitter.com/BHolmesDev) [announced today](https://twitter.com/BHolmesDev/status/1506616758806802435) that he’s joining the Astro team, and [indicated](https://twitter.com/BHolmesDev/status/1506621649944260610) that he may hand off Slinkity to someone else after getting Slinkity to v.1.x. How these developments will affect my aforementioned “stay current” plan remains to be seen.
{.yellowBox}

[^1]:	Otherwise, some of the code would fail to appear in the code block because the SSG would treat it as *real* code rather than just text in a code block. Indeed, under certain circumstances, this “code” even could cause build errors.

[^2]:	Mind you, Hugo is no great ball of simplicity, either, nor would anyone claim that it is. However, it still seems a better match for a content-heavy site that doesn’t depend so much on web components, heavy infusions of JavaScript, *etc*.

[^3]:	Will I move it again? Ah, “never say, ‘never,’” and all that drivel. The [“dance”](/posts/2019/12/sorta-strange-ssg-trip/) has taught me not to be too sure about my answers to such questions.
