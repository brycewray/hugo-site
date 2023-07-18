---
title: "The big unbundle"
description: "Comfort 1, “best practices” 0. Film at 11."
author: Bryce Wray
date: 2023-07-18T16:08:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
imgs:
- iA-Writer_recents-menu-all-index_2962x1240.png
- iA-Writer_dock-menu-all-index_1288x2624.png
---

A year ago, I [urged](/posts/2022/07/bundling-up-rebuilding-my-hugo-site/) fellow Hugo users to organize their websites by using [page bundles](https://gohugo.io/content-management/page-bundles/). While it still may be a good idea for many others, it's ceased to be the best course for me, so this site is now unbundled once again. In the end, it was a battle of comfort-and-convenience *versus* "best practices."

Comfort-and-convenience kicked butt and took names.

<!--more-->

As a result, this post now comes to you from:

```plaintext
.   <-- The Hugo project folder
└─ content
    └─ posts
        └─ 2023
            └─ 07
                └─ big-unbundle.md
```

. . . rather than from:

```plaintext
.   <-- The Hugo project folder
└─ content
    └─ posts
        └─ 2022
            └─ 07
                └─ big-unbundle
                    └─ index.md
```

This also required me to move my image files from within individual posts' folders (where they were *page resources*) to the project's `assets/images/` folder (where they became *[global resources](https://gohugo.io/hugo-pipes/introduction/)*), so I also had to change that images-handling code about which [I wrote earlier this week](/posts/2023/07/hugo-pipes-cloudinary/).[^codeExamples]

[^codeExamples]: Incidentally, for any curious soul who may wonder about how badly this reversion may have mangled the previous post's code examples, all of which depended on the bundled arrangement: fear not. All I had to do was change a couple of lines in each example. Any reference to `.Page.Resources.GetMatch` (or `$.Page.Resources.GetMatch`) changed to `resources.GetMatch`. That's all!

You can correctly assume that these changes involved a lot of grunt work. What made them worth it?

First, I no longer *needed* to use page bundles. That post from last year arose when I wanted to use Hugo's [`Overlay` filter](https://gohugo.io/functions/images/#overlay) for automated creation of my pages' social media images. At the time, page bundles made that easier. Since then, I've adopted a [different method](/posts/2022/10/automated-social-media-images-cloudinary-hugo/) that gives me even better results; and I haven't come up with another compelling reason for using page bundles *other than* because of that earlier post about using them. That wasn't enough.

Second --- and this is what got me to thinking about making the switch in the first place --- it became inconvenient to keep each post as an `index.md` file in its own folder. For example, when clicking on my content editor's dock icon, this was the "recent files" list I might see:

{{< img src="iA-Writer_dock-menu-all-index_1288x2624.png" alt="A popup menu showing 10 recent-file entries, each with the same name of “index.md.”" phn=true >}}

Not very helpful, right?

Now, to be sure, I could also see them listed in this more helpful and informative way:

{{< img src="iA-Writer_recents-menu-all-index_2962x1240.png" alt="A dropdown menu showing 10 recent-file entries, each with the same name but different paths." >}}

. . . but that was possible only after I'd actually opened the editor, as opposed to just clicking the dock icon.

Is that a petty reason even to *think* about doing such an about-face, much less actually to go through with it? Perhaps. But little things like that, repeated day after day for months at a time, annoy me; so there's that.

Besides, I also find it more intuitive and, yes, more comfortable to manage an unbundled site's overall file-storage arrangement, regardless of any other factors that may merit consideration. It's the way I managed the site project for the overwhelming majority of its history before now. Despite my age, I typically am *not* someone who resists change, at least if I can understand a good reason for the change --- but I *do* frequently object to change-for-the-**sake**-of-change, and this seemed to have become one of those cases.
