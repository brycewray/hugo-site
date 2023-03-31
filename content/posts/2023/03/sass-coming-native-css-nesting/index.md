---
title: "Sass and the coming of native CSS Nesting"
description: "As usual, the devil is in the details."
author: Bryce Wray
date: 2023-03-30T14:52:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

One of the main reasons some web developers still use [Sass](https://sass-lang.com) is the same as what initially attracted them to it: the ability to nest styling rules. With [*native* CSS nesting](https://drafts.csswg.org/css-nesting/) [apparently](/posts/2023/02/some-future-now-css/) nearing a point where it might finally become commonplace in most modern browsers, one could reasonably wonder how compatible this would be with nesting in Sass. After all, Sass has been around for years and there are many websites that rely on it.

Well, wonder no more. Yesterday, we got the word on this, directly from a key member of the Sass team.

<!--more-->

In a [blog post](https://sass-lang.com/blog/sass-and-native-nesting) entitled "Sass and Native Nesting," Sass lead designer and developer [Natalie Weizenbaum](https://mastodon.social/@nex3) said native CSS nesting "is subtly incompatible with Sass nesting."

I won't recap her excellent explanation here; if you're a Sass user, you'll want to read her post for yourself. Until you have that chance, suffice it to say that this incompatibility is **not** because the Sass folks are being hardheads but, rather, because the likely proposal for native CSS nesting handles the process differently than does Sass.

So what will happen whenever Sass encounters native CSS nesting in websites' styling files? After all, up to now, we've always been able to say that [any valid CSS works in an SCSS file](https://sass-lang.com/guide). Weizenbaum broke down the ramifications into two groups: near-term and long-term.

- **Near-term**: Sass won't support native CSS nesting in an SCSS file, but *will* support it in a CSS file. In the latter case, "Sass will just emit it as-is."
- **Long-term**:
	- The Sass team is waiting to see when [CSS's `:is()` pseudo-class function](https://developer.mozilla.org/en-US/docs/Web/CSS/:is), on which native CSS nesting relies *vs.* how Sass does nesting, "[is supported by 98% of the global browser market share](https://caniuse.com/css-matches-pseudo)." *(As of this writing, that support is at 97.4%.)* When that happens, Weizenbaum said, "we'll start transitioning Sass to emit `:is()` when resolving Sass nesting." Because that will constitute a breaking change, the Sass organization will issue a major version release and ease transitions through the [Sass Migrator tool](https://sass-lang.com/documentation/cli/migrator).
	- Sass nesting's long-time `&-suffix` feature for concatenating selectors --- which is [**not** supported by native CSS nesting](https://drafts.csswg.org/css-nesting/#syntax) --- *won't* go away because it's "too important to existing Sass users, and the benefit of [native CSS nesting] . . . is not strong enough to override that."

----

While native CSS nesting won't get "universal" support among modern browsers tomorrow, it's coming. It's about to be added to Chrome. It looks as if Safari will get it in macOS v.13.4 and iOS/iPadOS v.16.5, each of which is likely to arrive sometime in the next two to three months. Even Firefox may finally be ready to move on native CSS nesting, based on more recent comments in the [related bug page](https://bugzilla.mozilla.org/show_bug.cgi?id=1648037), although one can only speculate on an ETA for a supporting release.

Sass will continue to have certain other powers that probably won't ever get into vanilla CSS. However, over the years, many web devs have chosen Sass primarily because of its support for variables and nesting. By early 2019, all the major browsers supported CSS variables. Now, native CSS nesting is nearing the point where it, too, will get widespread support. It'll be interesting to see the effects this change --- not to mention the future changes to Sass itself that Weizenbaum noted --- will have on Sass use, especially for future web projects.
