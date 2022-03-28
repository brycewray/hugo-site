---
layout: singlepost
title: "Should you adopt Tailwind 3?"
#subtitle: "Assessing all the changes"
description: "Tailwind is making too much progress to ignore. Is it time to check out the latest version?"
author: Bryce Wray
date: 2022-01-12T16:16:00-06:00
#lastmod:
discussionId: "2022-01-should-you-adopt-tailwind-3"
ext_canonical: "https://www.stackbit.com/blog/should-you-adopt-tailwind-3/"
ext_source: "the Stackbit blog"
ext_url: "https://www.stackbit.com/"
ext_copyright: "Stackbit"
featured_image: "die-dice-three_mike-szczepanski-MnSYYYqunXA-unsplash_2400x1531.jpg"
featured_image_width: 2400
featured_image_height: 1531
featured_image_alt: "Screen capture from Hugo showing HTML with Tailwind CSS styles"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@youngprodigy3?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mike Szczepanski</a>; <a href="https://unsplash.com/s/photos/three?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

{{% ext_canonical %}}

Whether you adore or abhor **utility-first** CSS — or fall somewhere in between those two extreme opinions — it’s not something a web developer can ignore these days. The most prominent example of this potentially polarizing styling approach is the seemingly ubiquitous **Tailwind CSS** framework.

Tailwind changed drastically during the past 14 months, evolving all the way from version 1 to version 3. In this article, we’ll try to help you determine whether you should upgrade your Tailwind projects to the Latest and Greatest. After all, in the end, that's really what matters: is it worth it to you?

In addition, those of you who’ve shunned utility-first CSS so far but remain curious about Tailwind should check out what’s described here. You may just find that the time has come to dip your toes into the water, and perhaps even to jump all the way in.

## What Tailwind 3 brings to the table

### The game-changing JIT engine

Recently, Tailwind-watching has been a neck-snapping experience, due chiefly to one particular advance — a **just-in-time (JIT) engine** — that changed everything for the vast majority of Tailwind-using web developers. Although JIT actually pre-dates Tailwind 3, it gets smarter in this update and enables many of the new version’s *other* goodies, so we’ll cover it first and in greater detail. Just on its own, it may be enough reason for you to upgrade from pre-JIT Tailwind versions.

Not so long ago, the Tailwind framework was known for shipping uncompressed with about four **megabytes** of pre-written CSS classes. Since that massive size was obviously unsuitable for production, using Tailwind pretty much required using the PurgeCSS tool to “watch” a project's HTML files and eliminate all the Tailwind classes that the HTML didn’t actually use. This usually worked, but there could be glitches in which PurgeCSS accidentally wiped some classes even though they’d been called in the HTML; also, the process was sluggish during development.

Then, last March, Tailwind Labs shocked the world by adding its then-experimental JIT engine to Tailwind 2. The coming of JIT turned the “purge-fat-down-to-not-so-fat” scenario on its ear. Now, instead of starting with a multi-megabyte file and **purging** unwanted classes, Tailwind used JIT to start with virtually **no** CSS and then **added** only those classes actually summoned by the HTML.

This meant that, compared to earlier versions, Tailwind 2 with JIT would generate CSS files that not only were far smaller but also much more accurately reflected what the HTML “wanted.” In addition, the developer experience improved dramatically, because the resulting CSS appeared almost instantaneously. Since many developers are already using certain tools (such as webpack) with their own sluggish performance, the newly snappier Tailwind proved a godsend.

For Tailwind 2, JIT was an opt-**in** feature, although one would guess that the vast majority opted in. Tailwind Labs spent much of 2021 improving JIT and, with the December release of version 3, JIT became opt-**out**. Why would anyone *not* want this feature, you ask? Well, there are some cases in which the JIT engine still can be problematic: for just one example, at the time of writing, the Hugo static site generator requires some fairly involved workarounds to be compatible with the JIT engine.

## There’s more to Tailwind 3 than JIT

Of course, default JIT functionality is only part of the story for Tailwind 3. Here are some of this version's other major additions.

- **All the colors**. You now get the entire, massive Tailwind color palette, available for every element you’d suspect, rather than having to specify the colors manually in the Tailwind configuration file. Not coincidentally, you also get **colored box shadows** with, yes, all those colors available.
- **Support for multi-column layout**. This used to require futzing with either Flexbox or CSS Grid; now, multiple `columns` classes make it a breeze to add such layouts.
- **Enhanced form styling options**, essentially automating a more modern look/feel for your project’s form controls.
- **Control for print output**. When you know people will likely be printing some content, you can provide different styling that appears only in printouts and not on a display.
- **Support for CSS’s new native `aspect-ratio` property**.
- **Support for RTL and LTR modifiers**, allowing easier styling of content with multiple languages. Tailwind documentation currently marks this as “experimental.”
- **Arbitrary properties**. These go a step beyond version 2’s addition of *arbitrary style creation*. The latter meant, say, you could use `mt-[57px]` when your marketing department insisted that an item's top margin be **exactly** 57 pixels. With arbitrary *properties*, you essentially have the power to give Tailwind 3 any CSS property it doesn’t already support. Better yet, you can combine such arbitrary properties with existing modifiers (*e.g.*, `dark`) just as you would any of Tailwind’s included utilities.

For a more complete and detailed list of what Tailwind 3 has added, see the Tailwind blog post, “[Tailwind CSS v3.0](https://tailwindcss.com/blog/tailwindcss-v3).” You may also want to check some of the [more recent releases’ changelogs](https://github.com/tailwindlabs/tailwindcss/releases).

## Is Tailwind 3 for you?

### What will it break?

First, you’ll obviously want to consider any **breaking changes** such a move would involve, even if only from version 2. The [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide) will help you determine that. One notable breaking change in Tailwind 3 is that certain colors’ names changed, so you’ll want to search your code for those and adjust them accordingly. For a small team working on a small project, especially a project that’s not often updated, upgrading to version 3 probably isn’t that big a deal. However, if you’re talking about a plethora of front-end developers working on a major commercial site, you’ll have to tread much more carefully — especially if you hadn’t even upgraded to version 2 yet.

### How big of a jump are you making?

You’ll have to think about **how far forward** you’d be upgrading. The overall question “Upgrade or no?” is probably more easily answered by Tailwind **2** users, especially those who opted into JIT. The configuration changes to which they became accustomed in moving from Tailwind 1 ushered them fairly painlessly to how much of version 3 works. From there, for the most part, they simply get to enjoy the added feature set, so moving up to Tailwind 3 is probably a definitive “Yes” for most version 2 users.

However, for Tailwind **1** users considering the upgrade to version 3, that term “neck-snapping” comes into play again. Such users may be nearly overwhelmed by all the non-JIT things that just version **2** added between November, 2020, and the release of Tailwind 3 last month. Here’s a partial list (and be aware that many of these require opting into JIT):

- Dark mode support.
- A redesigned color palette.
- The `2xl` breakpoint for larger screens.
- Line heights tied to font sizes.
- Greater support for CSS pseudo-classes.
- More variations for spacing, typography, and opacity.
- Compatibility with PostCSS 8, although maintaining (for a while) a separate build for compatibility with PostCSS 7.
- Improved support for nesting classes, à la the `postcss-nested` plugin.
- Wider use of `@apply` for using bespoke CSS whenever Tailwind classes just won’t cut it (still true even with version 3’s arbitrary properties).
- End of support for Internet Explorer 11, which may be a blocker for those whose pages must be used by certain change-resisting enterprises or government agencies. (The death of Internet Explorer support came because of Tailwind 2’s adoption of custom CSS properties — “CSS variables” — about which the obsolete-but-still-used IE has no clue.)
- Better styling options for list bullets and list numbers.
- Sibling selector variants, allowing the targeting of sibling elements; this was previously handled only through the aforementioned bespoke CSS and `@apply`.

But what if you’re one of those front-end developers who have “noped” out of Tailwind CSS up to now? If so, Tailwind 3 may very well be the version which will convince you to change your mind. The addition of JIT into the core functionality, as well as all the other features that it has subsequently enabled (in both versions 2 and 3), really does make the difference in the development experience. Tailwind 3 likely makes it much easier for a previous naysayer to add Tailwind into a project at their own pace, thus making a plain-CSS-to-Tailwind-3 transition debatably the smoothest out of all these options.

### Tailwind and feature creep

There’s one more aspect to Tailwind that bears watching, especially going forward. Although the rapidly advancing state of Tailwind’s functionality sounds great — and it is — it also could spell trouble down the line for the popular framework and its user base.

That may sound weird, but consider the real-world environment in which Tailwind operates. It’s a growing business as well as a [widely used](https://2021.stateofcss.com/en-US/technologies/css-frameworks) open-source project, so version 3 almost certainly is not the endgame. Because of Tailwind’s need to stay, not simply relevant, but also popular, the project is particularly vulnerable to the dangers of *feature creep*. You’ve seen in this article how much Tailwind has changed since just 14 months ago. How much farther will it advance in 2022? In 2023? How far is too far?

You may well ask, “Is that really a problem?” But remember that the idea behind Tailwind, like every other utility-first CSS framework, is to *make styling easier*, especially for front-end developers who dislike getting under CSS’s hood. The more capabilities that get added to Tailwind, the more complex Tailwind becomes. It may not yet be near a tipping point, but that’s a danger for which the Tailwind team will have to be on the lookout.

One counter-argument is that you’ll use only what you need, so you won’t need to worry about the other stuff. And that’s true enough as far as it goes; but all the additional capabilities further fatten the already substantial Tailwind CSS documentation, so onboarding one’s new developers to Tailwind will become more complex over time. Ask any front-end team lead how much of a hassle that is.

Incidentally, the addition in Tailwind 3 of arbitrary properties — essentially, a “Hey, build your own stuff on top of Tailwind” move — may well be a preemptive strike at those more experienced CSS users who would say, “Yeah, but it still lacks [X] and [Y] and its implementation of [Z] is still kinda funky.” Given the newness of the arbitrary properties feature, whether it will satisfy such users in the interim remains unclear.

To fight the danger of feature creep, Tailwind’s maintainers may have to start saying “No” to a growing number of requests for missing features, even at the risk of losing potential users to another framework — after all, there’s *always* another New Hotness Framework out there, waiting to grab the limelight. Tailwind Labs may not yet be ready to start making such hard choices, but the time inevitably will arrive as it does for every popular project at some point in its lifecycle.

## Tailwind 3 is a winner

In [announcing version 3](https://tailwindcss.com/blog/tailwindcss-v3) last month, Tailwind’s ever-enthusiastic Adam Wathan credited the version with “incredible performance gains, huge workflow improvements, and a seriously ridiculous number of new features.” Having used Tailwind off-and-on since version 1.1.4 in December 2019, I subscribe to all three of those characterizations. For those who’ve embraced utility-first CSS in general and Tailwind CSS in particular, Tailwind 3 is an amazing leap forward. When and if your particular projects and development processes allow for it, going to Tailwind 3 is well worth whatever effort it may require.

So, what do **you** think? If you’re a Tailwind fan, do you like the new additions, or are you thinking, “Ah, jeez, there’s so much new stuff to learn and so many changes I have to make to my code”? And if you’ve been leery so far about utility-first CSS altogether, much less Tailwind in particular, does Tailwind 3 scratch enough of your itches that you’re finally willing to give it a try? [Let me know on Twitter](https://twitter.com/BryceWrayTX)! Also: remember that, when you want to learn more about front-end development tools and techniques, you should check out the [Stackbit blog](https://www.stackbit.com/blog).
