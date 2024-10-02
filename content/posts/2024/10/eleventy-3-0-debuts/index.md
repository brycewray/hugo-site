---
title: "Eleventy 3.0 debuts"
description: "The latest major version of the best JS-based SSG brings quite a few enhancements."
author: Bryce Wray
date: 2024-10-02T11:07:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Version 3.0 of [Eleventy](https://www.11ty.dev), which I've long considered the best JavaScript-based static site generator (SSG), has emerged from testing. Eleventy creator Zach Leatherman issued the v.3.0 release [yesterday](https://github.com/11ty/eleventy/releases/tag/v3.0.0). This new major version comes with a lot to offer, regardless of whether one's site is already on Eleventy, but there are things for which to watch out as well.

<!--more-->

I haven't tried Eleventy 3.0 since its alpha-test period, so you're much more likely to get good information about this new version from other bloggers who *are* using it actively. Also, there's no point in my reiterating everything in Leatherman's release announcement, so let's just say that v.3.0's most notable *raison d'être* is adding support for [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (ESM) while retaining legacy support for [CommonJS](https://nodejs.org/docs/latest/api/modules.html). As the JS world shifts more and more toward ESM for the countless packages in its orbit, this long-awaited enhancement removes what had been a drawback for using Eleventy with many items. Of course, v.3.0 has *many* other goodies (and, yes, breaking changes for sites using older Eleventy versions), so be sure to read --- and heed --- the full release announcement.

After bouncing around over the last couple of years between self-supported status and corporate sponsorships that turned out to be all too temporary, the Eleventy project [recently became part of Font Awesome](https://www.11ty.dev/blog/eleventy-font-awesome/). It's a transition which, one hopes, will firmly bolster the long-term stability of this justly popular SSG.