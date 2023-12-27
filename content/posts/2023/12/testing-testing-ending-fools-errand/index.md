---
title: "Testing, testing: ending a fool’s errand"
description: "Admitting this is one of those situations wherein You Can’t Get There From Here."
author: Bryce Wray
date: 2023-12-27T09:09:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

I rise from my metaphorical sickbed (actually, just the same office chair as usual but with my sick self propped in it) to note the shuttering of the browser-testing process I [publicized](/posts/2023/12/testing-testing-now-version-control/) here recently. In short, I realized it wasn't such a hot idea, after all.

<!--more-->

You may recall that, [a couple of months back](/posts/2023/10/testing-testing/), my nerdy curiosity led me to begin running benchmarks on a number of web browsers in both macOS and Linux. After I kept going with these tests for several weeks as browser versions (and OS versions) went through various changes, I [decided](/posts/2023/12/testing-testing-now-version-control/) not only to version-control the process but also to share the ongoing results through a publicly viewable repo.

Well, I'm bringing all that to a halt.

At least for now, the repo will stay public; but I'm abandoning any systematic approach to this process and, to put it even more plainly, I'm pretty well stopping the whole thing. Here are my reasons, ordered by how they currently come out of my semi-feverish brain and not necessarily their importance:

1. The only way to make a test fair for all the browsers is to ensure that each browser's settings, use (or lack thereof) of extensions, *etc.*, are as equal as possible. I've found achieving that parity to be far more difficult than anticipated and, in the end, realized I wasn't accomplishing it sufficiently. It also didn't help that, for all I knew, various other background processes (both internal and external to the browser) were affecting the results.\
\
In short, I gradually lost faith in the numbers I was getting, and that made those numbers useless.
2. I also gradually lost faith in *how* I was getting those numbers --- *i.e.*, I decided the benchmarks themselves weren't always as reliable as I'd hoped. This is probably just an impression on my part but, once I accepted that impression, it stuck.
3. Finally, just to be perfectly honest about it, I tired of continually checking for minor updates in browsers, browser engines, and the like. This annoyance grew as I added even more browsers to the testing, as you can imagine.

Perhaps I should have paid more attention to "[Why browser speed benchmarks are meaningless](https://www.dedoimedo.com/computers/browser-speed.html)." It may be from the Internet-ancient time of 2010 (!), but still has a lot of validity even now.
