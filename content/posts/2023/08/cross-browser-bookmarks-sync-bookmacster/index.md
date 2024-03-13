---
title: "Cross-browser bookmarks sync with BookMacster"
description: "Needing a reliable way to coordinate all my browsers’ bookmarks, I trial what I learn is a venerable option."
author: Bryce Wray
date: 2023-08-14T10:25:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
imgs:
- 2023-08-14-BookMacster-reports-verify_2332x1884_72dpi.png
- 2023-08-14-BookMacster-sync-simple_2496x1448_72dpi.png
---

Web developers test, or *should* test, their work in at least the three major browsers: Chrome, Safari, and Firefox. Ideally, each browser will provide sufficiently equal functionality that going from one to the other doesn't feel like a giant drop-off. One major complication to that "ideally" stuff is trying to synchronize bookmarks among all three browsers. By default, that isn't possible. The good thing is that, at least on macOS, there is a way. It's not free but, so far in my free trial of it, it seems *really* good.

<!--more-->

## Why not xBrowserSync?

In "[Mixed nuts #12](/posts/2023/08/mixed-nuts-12/)," I mentioned a choice to use Firefox rather than Chrome as my daily-driver browser[^WEI], and I added in a footnote:

[^WEI]: This was based on the [current Web Environment Integrity (WEI) controversy](https://news.ycombinator.com/item?id=36876301). After further reading, research, and thinking on the subject of WEI and its potential effects, I decided to return to my more usual browsing habits --- meaning, Chrome as my daily driver. **Update, 2023-11-04**: Google has since [decided](https://android-developers.googleblog.com/2023/11/increasing-trust-for-embedded-media.html) (at least for the time being) not to go ahead with WEI.

> Since I've often identified myself as an unapologetic Apple fanboy, you might wonder why I don't go with Safari, instead. The main problem is that Safari isn't, and never will be, compatible with [xBrowserSync](https://www.xbrowsersync.org/), on which I rely heavily with both Chrome and Firefox . . .

For those who've never encountered xBrowserSync, it's a free and open-source browser extension that synchronizes bookmarks on a cross-browser basis by using a number of cloud-based servers. In my experience, it does that very well. From there, things get more complicated.

As of now, xBrowserSync works *reliably* with only Chrome and Firefox. Some users have tried it with other Chromium- and Gecko-compatible browsers but, for now, [xBrowserSync's roadmap](https://github.com/xbrowsersync/app/wiki/Roadmap) says that support is yet to come. There's an xBrowserSync version in the works which would support more such browsers, but it's *been* in the works for quite some time. Comments within [one of the project's GitHub issues](https://github.com/xbrowsersync/app/issues/425) make it fairly clear that the project's developer quite understandably has been far too busy with his Real Life to release that version.

To be clear: the lack of support for those additional browsers doesn't trouble me all that much. However, I *have* become increasingly concerned about my dependence on xBrowserSync in general, given the seeming uncertainty about the project's progress. Keep in mind that all its sync servers operate on a volunteer basis, so neither the project nor its sync system have any "visible means of support" other than [donations](https://www.xbrowsersync.org/#getinvolved). As a cynical old fart, I'm pretty doubtful how long that'll be enough.

And then there's Safari. As the xBrowserSync web page [explains](https://www.xbrowsersync.org/#faqs), its dev has chosen not to support Safari (and, for that matter, iOS and iPadOS). Period.

All of these add up to why, for a while now, I've been seeking an alternative to xBrowserSync. I wanted something that would sync bookmarks seamlessly among, at the very least, Chrome *and* Firefox *and* Safari. Also, I wanted it to be a product with sufficient stability that I could rely on it without worry (and I knew this particular requirement would probably mean actually paying for the thing, which would be fine as long as the cost was reasonable).

After a brief but unsatisfying tryout of [URL Manager Pro](https://url-manager.com), I began a free trial of what I now believe will be my choice: [**BookMacster**](https://sheepsystems.com/products/bookmacster.html).

## BookMacster checks my boxes

As you would reasonably expect, BookMacster works as an extension within each browser it supports, and that's a pretty long list --- which, yes, includes Safari. It all works from a BookMacster *collection* file, which you initially populate from a chosen browser, typically your default browser. The file then receives automatic updates as you make bookmark changes to any of the connected *clients* (browsers).

Although you have the ability to set up some advanced syncing options, the default "Simple" setup on a collection file's **Syncing** tab will work just fine for the vast majority of folks:

{{< img src="2023-08-14-BookMacster-sync-simple_2496x1448_72dpi.png" alt="The “Syncing” tab for a collection file within the BookMacster app" rounds=true >}}

Shortly[^increment] after I make a change to the bookmarks on any of the client browsers, BookMacster makes the change happen on the others, as well. Since I maintain a somewhat complicated and often-updated bookmarks bar on my daily-driver browser, it's really nice to have access to it on the other two of the Big Three.

[^increment]: The default increment before syncing occurs is sixty seconds, but you can adjust it.

This even gives me the benefit of having my iDevices' browsers sync with the bookmarks from their macOS "big brothers" through their own respective syncing capabilities --- although I found this to be somewhat glitchy in the case of Firefox for iOS (likely due to Firefox, not BookMacster), so I deactivated that browser's cross-device syncing.[^BkMcstrDocs]

[^BkMcstrDocs]: The [BookMacster documentation](https://sheepsystems.com/bookmacster/HelpBook/) also explains more involved ways to handle cross-device syncing, but I didn't need them.

BookMacster also can provide reports on your bookmarks, including verification of their ongoing reliability as well as checking for duplicates:

{{< img src="2023-08-14-BookMacster-reports-verify_2332x1884_72dpi.png" alt="The “Verify” tab of the “Reports” item within a BookMacster collection file" rounds=true >}}

And as for the reliability of this product? Well, BookMacster has been around since *2009*, is the key member of a [small line of bookmarks management software products](https://sheepsystems.com/products/), and remains in active development. Its price as of this writing is a one-time fee of $24.95. If my current experience with BookMacster remains as positive during the remainder of my free trial as it has so far, I'd guess that making this purchase will be a pretty easy choice.

**Update from later the same day**: Soon after I posted this, [a comment](#data-comments) got me curious about giving the web-based [Raindrop.io](https://raindrop.io) aggregator another try --- "another" because I'd already done so while researching my bookmarks management choices. So, if I do decide to use Raindrop.io, that would be the main reason why I'd choose not to go ahead with BookMacster.\
\
**Further update, 2023-08-16**: In the end, I indeed went with a Raindrop.io-based workflow for managing my bookmarks, rather than purchasing BookMacster. One thing that clearly helped me decide was that the Raindrop.io free tier [now includes](https://help.raindrop.io/changelog#5523) the formerly paid-only "nested collections" feature, so I can keep using my bookmarks' long-standing arrangement of folders, subfolders, sub-subfolders, *etc.*\
\
All that said: for macOS users who want cross-browser syncing of bookmarks, I'd **still** say BookMacster is worth a look.
{.box}
