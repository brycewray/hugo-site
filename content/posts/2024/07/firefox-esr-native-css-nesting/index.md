---
title: "Firefox ESR and native CSS nesting"
description: "You very likely won’t need to post-process your CSS just for nesting anymore."
author: Bryce Wray
date: 2024-07-09T12:00:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Nearly a year ago, I [wrote](/posts/2023/08/native-css-nesting-support-arrives-big-three-browsers/) that full support for [native CSS nesting](https://drafts.csswg.org/css-nesting/) had arrived in all of the Big Three browsers. However, as I later added in a note at the end, one fly remained in the ointment: [Firefox Extended Support Release (ESR)](https://www.mozilla.org/en-US/firefox/enterprise/). Today, this fly has been swatted with the release of Firefox ESR v.128.0.

<!--more-->

Every year or so, Mozilla updates Firefox ESR to have, pretty much all the capabilities that are in the regular release channel for that instant in history. Today is that day in this particular release cycle. It just happened that Firefox ESR's 2023 major release happened concurrently with the release of regular Firefox v.115.0, which was two major versions before Mozilla added support for native CSS nesting. That meant those locked into the ESR channel --- certain Firefox-accepting institutions and enterprises, as well as users of [Debian](https://debian.org/) Linux --- missed out on that support until now.

But, now, Firefox ESR v.128.0 has arrived, bearing the feature set of Firefox v.128.0, including the native CSS nesting support that came aboard with v.117.0 last August.

So where does this leave [Sass](https://sass-lang.com), [PostCSS](https://postcss.org), and other ways to process CSS for production, at least where nesting is concerned? Whether you can now transition fully to native CSS nesting in your own website will, as always, depend on your audience. Although [support for this capability](https://caniuse.com/?search=css-nesting) continues to rise, you may be targeting a more restricted group, and only you can determine that. In addition, you might post-process your CSS for reasons other than nesting, and this won't make those go away.

Also, to be sure, there are going to be places, and perhaps certain Linux distributions, which will hang on to the pre-nesting Firefox ESR version for a while even though the new one is available. In fact, as part of today's announcement of Firefox ESR v.128.0, Firefox Release Manager Ryan VanderMeulen said:

> Firefox ESR 128.0 is the first release from the ESR128 branch, which is slated to replace ESR115 on October 1, 2024. We recommend that organizations use this opportunity to test the new major release in their environment and provide any feedback ahead of the ESR115 End Of Life.

So such testing, where it occurs, would delay things a bit further.

Still: in an increasingly vast majority of cases, if the only use for any CSS post-processing was to achieve the nesting that's now built into native CSS, that need now has gone away.
