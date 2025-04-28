---
title: "Browsers: a snapshot"
description: "Some thoughts on where things are in the world of web browsers."
author: Bryce Wray
date: 2025-02-25T15:38:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

While I [stopped doing any meaningful testing of web browsers over a year ago](/posts/2023/12/testing-testing-ending-fools-errand/), I remain interested in the arena in which those apps engage daily. Here are some semi-idle thoughts on what's been going on there of late, especially for those of us who actually care about which browsers we use, and what could follow in the not-too-distant future.

<!--more-->

The latest Chromium-based browser to fall in line regarding whacking support for Manifest V2 extensions [apparently will be Microsoft Edge](https://windowsreport.com/microsoft-edge-disables-ublock-origin-and-other-manifest-v2-extensions/). Although there probably never was much serious doubt whether Microsoft would buck Google on the Manifest V3/V2 issue, there now should be none. It won't.

In an ideal world --- *i.e.*, one in which the vast majority of the world's web users weren't so willfully ignorant about browsers in general and browser extensions in particular --- [Mozilla's stance regarding Manifest V3/V2](https://blog.mozilla.org/en/products/firefox/firefox-manifest-v3-adblockers/) would help keep the Firefox browser afloat. We Do Not Live in That World, nor shall we.

While perusing one of the seemingly endless "my-browser-is-great-and-all-others-suck" battles on Reddit, I found a link to an interesting Lobsters discussion about why and how the Brave browser blocks the Lobsters site, a situation of which I hadn't been aware. If you're using Brave, use [this link from the Internet Archive](https://web.archive.org/web/20250109000904/https://lobste.rs/s/iopw1d/what_s_up_with_lobste_rs_blocking_brave); otherwise, use [this link from Lobsters itself](https://lobste.rs/s/iopw1d/what_s_up_with_lobste_rs_blocking_brave).

Whenever such discussions on Reddit and elsewhere get into the whole issue of whether Firefox will even continue to exist ~~if the U.S. Department of Justice~~[^judge] [if an upcoming court ruling eventually drops the big one on Google](https://www.cnbc.com/2024/11/20/doj-pushes-for-google-to-break-off-chrome-browser-after-antitrust-case.html), thus cutting off all that money Google pays Mozilla for getting the preferred search engine setting in a default Firefox installation, a frequent theme seems to be: "Well, it's okay because Firefox is open-source." Those taking that position note that there already are numerous Firefox forks so, even if Mozilla dropped the Firefox project altogether, those forks would continue and others would follow. Again, We Do Not Live in That World. Maybe, for the much simpler web of thirty years ago, small (and probably unpaid) teams of devs could keep a web browser going; but the web of today and the future is far more demanding. As is often noted, today's browsers have gigantic code bases and essentially are "little" (but not too little) operating systems in and of themselves. So not only Firefox and its forks but, to be clear, Chromium and its forks --- with the possible exception of Edge, thanks to Microsoft's virtually unlimited resources --- could easily face an existential crisis later this year. And not just in the U.S., either, so non-U.S. readers of this piece shouldn't feel overly safe from the repercussions of said crisis.

[^judge]: This is up to a judge's ruling, not (as I erroneously wrote) the U.S. DOJ.

Of course, there is one other major browser, namely the Webkit-based Safari, that also has a huge bankroll behind it. However, it runs on only the devices of its parent company (Apple, of course), so it's irrelevant to many if not most of the world's users. There was at least a Safari for Windows for a few years in the late 2000s and early 2010s, but that's never coming back; nor do I expect there ever will be one for either Android or Linux. Thus, regardless of its apparent excellence on its targeted Apple platforms and its [improving adherence to web standards](https://webkit.org/blog/16458/announcing-interop-2025/), Safari is and will remain a non-factor in the browsers landscape for the vast majority of users.[^Ladybird]

[^Ladybird]: In the same vein, the much-hoped-for [Ladybird browser](https://ladybird.org) likely won't be relevant as a truly cross-platform browser for a very long time to come.
