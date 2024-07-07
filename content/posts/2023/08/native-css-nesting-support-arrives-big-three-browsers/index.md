---
title: "Native CSS nesting support arrives in the Big Three browsers"
description: "The release of Firefox 117.0 completes the trifecta."
author: Bryce Wray
date: 2023-08-29T15:52:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

This day marks a major milestone in the history of web development. As of today, for the first time ever, all of the Big Three browsers support [native CSS nesting](https://drafts.csswg.org/css-nesting/) right out of the box.

<!--more-->

Until today, writing CSS like this meant you needed to process it through something like [Sass](https://sass-lang.com) or a [PostCSS](https://postcss.org) plugin:

```css
.myPurpleClass {
	& p {
		color: #d1d100;
		& a {
			color: #0000d1;
		}
	}
}
```

But now, with today's release of [Firefox 117.0](https://www.mozilla.org/en-US/firefox/117.0/releasenotes/), the trifecta of support for native CSS nesting is complete.

**Update from the future**: The [CSS Nesting Module spec](https://drafts.csswg.org/css-nesting/) later dropped the requirement for those ampersand (`&`) characters as shown in the example above, thus keeping the nesting syntax more like that of Sass, although the spec does still explain some reasons why you might want to use them.
{.box}

When 2023 began, I wouldn't have bet that this happy combination would happen even this year, much less with a full third of the year remaining. However, where native CSS nesting was concerned, the Big Three's often-glacial pace of feature adoption picked up in a major way over the last few months. [Chrome 112.0](https://chromereleases.googleblog.com/2023/04/stable-channel-update-for-desktop.html) was first out of the gate with full, unflagged support on <span class="nobrk">2023-04-04</span>, followed by [Safari 16.5](https://developer.apple.com/documentation/safari-release-notes/safari-16_5-release-notes) on <span class="nobrk">2023-05-18</span>. Perhaps seeing which way the proverbial wind was blowing, the Firefox team apparently [shifted gears](https://bugzilla.mozilla.org/show_bug.cgi?id=1648037) to make this happen ASAP for its browser, too; and so, today, that has become reality.

Of course, this doesn't mean nesting utopia is here just yet. As I write, the [Can I Use](https://caniuse.com) [page for native CSS nesting](https://caniuse.com/?search=css-nesting) shows global support at just over 75% --- which means that, unless a dev team absolutely knows every visitor to its site *both* (a.) uses one of the Big Three browsers *and* (b.) definitely has a nesting-compatible version of that browser, the need for additional processing of nested CSS will persist for a while.

Still, at the rate things are changing, that "while" may well be shorter than one might have believed as recently as a few weeks ago.

**Update from the future**: Any visitors locked into Firefox's [Extended Support Release (ESR) "channel"](https://www.mozilla.org/en-US/firefox/enterprise/) won't see a nesting-compatible Firefox version until at least [July, 2024](https://whattrainisitnow.com/release/?version=esr). Firefox ESR is a popular deployment choice for those enterprises and universities which allow Firefox installations, and it's part of the [Debian](https://debian.org/) Linux distribution.
{.box}
