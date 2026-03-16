---
title: "Mixed nuts #17"
description: "A new name for Eleventy, trying CachyOS, some new powers for Hugo, and other folderol from my noggin."
author: Bryce Wray
date: 2026-03-16T16:46:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Here we go [once again](/posts/2025/09/mixed-nuts-16/) with an entry in my "Mixed nuts" series of posts, each of which contains musings on multiple topics that have recently occupied my semi-reasonable facsimile of a brain.

---

Perhaps soon we'll be referring to "the static site generator [formerly known as](https://everything2.com/title/The+Artist+Formerly+Known+as+Prince) Eleventy," at least in jest, but it will be true. Eleventy's creator, Zach Leatherman, [announced](https://www.11ty.dev/blog/build-awesome/) earlier this month that the SSG now will be called *Build Awesome*. You may recall that this open-source project [came under the aegis of Font Awesome in 2024](https://www.11ty.dev/blog/eleventy-font-awesome/), apparently settling any remaining worries about Eleventy's long-term financial sustainability. Despite the name change, Build Awesome will remain free. However, there also will be a paid "Pro" version that will add more features; exactly which features, and what the Pro package will cost, remain TBA. (An earlier announcement, containing more details, was [removed](https://blog.fontawesome.com/pausing-kickstarter/).) Also, Leatherman promised to keep future versions as backward-compatible as possible with existing Eleventy sites and the current ecosphere of Eleventy plugins.

*My [Linux-on-the-old-Mac adventures](/posts/2025/08/new-life-old-mac-linux-two-years-later/) continue. Now, after about a year and a half on [Fedora](https://fedoraproject.org/), I'm running the [Arch](https://archlinux.org)-based [CachyOS](https://cachyos.org/) distribution. Its purpose is to provide the flexibility of Arch Linux, but with greater ease of use **plus** --- and this is what got me to try it --- special enhancements to optimize performance. It's early, but I've been pleasantly pleased with CachyOS. It seems to have many of the aspects I preferred about Arch compared to Fedora, such as **far** faster mirrors when it's update time, yet without my having to tinker quite so much to keep things running smoothly.*

While I was starting to draft this post, the [Hugo](https://gohugo.io) team released [v.0.158.0](https://github.com/gohugoio/hugo/releases/tag/v0.158.0), the most interesting new feature (IMHO) of which is called `css.Build`. As the [documentation](https://gohugo.io/functions/css/build/) says, `css.Build` lets you "bundle, transform, and minify CSS resources" --- which, up to now, I've been using a combination of [PostCSS](https://postcss.org) plugins and bespoke code to do, especially in production. Now, Hugo can do all those things on its own! Indeed, after spending a couple of hours fixing a few things in my existing layout files, I was able to go Hugo-only for handling the site's styling even in production. If you're a fellow Hugo user, I suggest you view the docs and see if you might be similarly interested.[^deprecations]

[^deprecations]: Please note that, starting with Hugo 0.158.0, there are some important deprecations that you may have to address in your site, as Hugo contributor Joe Mooring explained in a [post](https://discourse.gohugo.io/t/deprecations-in-v0-158-0/56869) on the Hugo Discourse. For example, I had to change all my `Site.LanguageCode` references to `Site.Language.Locale`, and that's for a site that *isn't* multi-lingual; on one that is, there likely will be quite a few more such changes to make.

*I recently put aside this site's Sass files after realizing I had little or no remaining reason to keep maintaining them. Sass long ago lost its main advantage for me over vanilla CSS, namely the nesting that [became native](https://drafts.csswg.org/css-nesting/) to the latter years ago; so continuing to keep around the Sass versions of my CSS files, much less having to change them for consistency's sake every time I edited their CSS counterparts, had ceased to be anything other than a nuisance.*

The growing weight of "you-must-use-AI-no-matter-what" demands upon developers by various firms' IT overseers makes me ever gladder that I [retired](/posts/2021/09/transition/) well before the craze ramped up to today's cacophonous level. My final job was mainly managing websites and the servers on which they were living, so I **might** have escaped the worst of the madness at first, but that relative calm wouldn't have lasted. After all, when a company spends big bucks to make a Thing available to its IT team, that IT team had better-by-God be using the Thing if it knows what's good for them.
