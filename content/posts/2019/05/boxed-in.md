---
layout: layouts/posts/singlepost.njk
title: Boxed in?
tags: post
subtitle: “Shoebox” apps (including Ulysses) and iCloud&nbsp;sync
description: 'A revisiting of the whole Ulysses matter—after I learned some more about “shoebox” apps in general.'
author: Bryce Wray
date: 2019-05-04T06:00:00-05:00
final_date: 2019-05-10T05:22:00-05:00
lastmod: 2019-05-10T07:20:00-05:00
idx: 19
aliases:
    [/posts/2019/04/why-left-ulysses/]
draft: false # note!
actual_path: /content/posts/2019/05/boxed-in
discussionId: "2019-05-boxed-in"
final_url: /posts/2019/05/boxed-in
featured_image: /images/thunderstorm-3625405_1280x720_60pct.jpg
featured_image_alt: Thunderstorm clouds with lighting flashes
featured_image_caption: "Image: Pixabay" # quotation marks to allow colon
---

<hr />

***Note****:* *You've been redirected here automatically if you were trying to reach a former post, since deleted, called "Why I left Ulysses." I explain herein* ***why*** *I deleted that post.*

<hr />

Constant reexamination is part of my daily life. It's an inescapable part of my Day Job, to be sure. It's part of why it takes me so long to write some things---the Work-in-Progress (WIP) being the most damnable example thereof.

Yeah, I know: "Write it all the way through, first, then edit later." Still, you may as well tell me not to cross my "t"s and dot my "i"s in mid-word, and I've been doing that since I was a kid. (Don't get me started on why.)

## Sick sync

On April 20, 2019, I issued a post, since deleted, called "Why I left Ulysses." It detailed why I would no longer use---and had cancelled my soon-expiring annual subscription to---the [Ulysses](https://ulysses.app) app on which I'd once [gleefully relied](/posts/2018/09/why-finally-settled-Ulysses) for writing the WIP and, before I glommed onto [iA Writer](https://ia.net/writer), this site's posts.

In essence, it had come down to my no longer trusting the ability of Ulysses to sync successfully with iCloud---particularly on the Mac. I'd lost a little work but, mostly, just had scares: "red-sheet" conflicts and that sort of thing.

While trying to find a fix to the initial occurrence of the glitch, I'd learned (especially through [one particular forum page](https://talk.macpowerusers.com/t/ulysses-having-issues-with-icloud-sync-15-20-groups-with-sheets-not-downloading/9662)) other Ulysses users had been experiencing similar issues. It had started me thinking seriously about whether I should stick around with Big U.

I'd given Ulysses one more chance over a period of days when I "stress-tested" it, only for it to sputter again (so I thought; more on that later). As a result, I'd decided to drop Ulysses and cancel the sub, figuring to let iA Writer carry my entire creative writing load, not just this site's posts, going forward.

I then issued the aforementioned "Why I left Ulysses" post to explain my decision. I felt an obligation to do so. After all, up to that point, my most-viewed post had been "[Why I finally settled on Ulysses](/posts/2018/09/why-finally-settled-ulysses)" just eight short months before. That is: I'd told the good side, so I owed my tiny number of readers[^tinyNumber] the bad, as well.

[^tinyNumber]: But please be assured that I appreciate the time and consideration of you long-suffering, not-easily-bored souls. Or, as a late and much-missed fellow I used to hear on the radio in my youth would close his afternoon show: "Ah love each and ever' one o' you li'l boogers."

## Missing U

Nearly two weeks elapsed.

At first, I felt a weight lift off my shoulders following the weeks of agonizing over what to do, albeit not without regrets. Someone with whom I discussed my mixed feelings about dumping Ulysses compared me to "a divorced guy who still misses the ex-wife who cheated on him."

I thought that was taking it a bit far, but I understood his point. I had *really loved* writing in Ulysses. I'd seen myself using it to finish the WIP and maybe even write a sequel (assuming anyone gave a flip about the WIP itself, unless I just wrote the sequel for my own enjoyment because I already know its plot and would love to get it out of my head and into text).

Now, it was no longer[^notUninstalled] in my stable of tools, and I wasn't happy about that.

[^notUninstalled]: Well, let me clarify. I had cancelled the sub but hadn't yet deleted the app from each of my devices, because the now-cancelled sub wouldn't end until late May; so, if by some chance I did want to get at its contents again even though I'd already exported copies for safety's sake, I still could.

In the second week after I issued that post, I got curious and began researching iCloud sync issues with other apps. What I found got my geek wheels cranking---and my ever-present "Oh, you fool, what have you done?!?" inner voice squawking. (And, at least this time, he was right.)

## Get your \*\*\*\*ing shoebox

[Yes, I know: [the correct line from *Goodfellas*](http://www.moviequotedb.com/movies/goodfellas/quote_9863.html) is "Now go home and get your \*\*\*\*ing *shinebox*." But, hey, work with me, okay?]

Mind you, my now-deleted post had differentiated between apps like Ulysses---sometimes called *shoebox* or *central-library* apps \(like Apple's own Notes and Photos apps, among many others\)---and *document-based* apps like iA Writer.[^centralLib]

In a few words&nbsp;.&nbsp;.&nbsp;.

- A shoebox app:
	- Keeps its working files in an obscure location on the device, such as `/Users/[your user name]/Library/Containers/com.ulyssesapp.mac/Data/CloudKit/` .&nbsp;.&nbsp;. and then deeper inside from there.
	- Reacts to saves and syncs by altering a database.
- A document-based app:
	- Keeps its working files in a readily accessible location, typically a visible folder within iCloud Drive.
	- Reacts to saves and syncs by altering separate documents.

Each variation has its advantages and disadvantages, but a search reveals a shoebox app, in general, tends to have more difficulty interacting successfully with iCloud sync than does a document-based app.[^otherEqual] Here are some links I found from the last few years for how other shoebox apps caution their users about possible issues with iCloud Sync and suggest attempted fixes:

[^otherEqual]: I *would* add to that, ".&nbsp;.&nbsp;.&nbsp;all other things being equal," but that's really a meaningless qualifier in this case because of the differences involved.

1. [LogTen Pro X](http://help.coradine.com/kb/sync-backup/troubleshooting-icloud-sync)
2. [Notability](https://support.gingerlabs.com/hc/en-us/articles/205688797-Troubleshooting-iCloud-Sync)
3. [Due](https://dueapp.zendesk.com/hc/en-us/articles/203530679-iCloud-sync-problems)
4. [1Password](https://support.1password.com/icloud-troubleshooting/)
5. [GoodNotes](https://support.goodnotes.com/hc/en-us/articles/215102586-My-documents-are-not-uploading-to-iCloud-and-show-arrows-in-the-upper-right)
6. [Lifecraft](https://support.lifecraft.com/hc/en-us/articles/115013307288-Sync-Troubleshooting)
7. [Downcast](https://support.downcast.fm/article/EHYN16oA46-resetting-i-cloud-syncing)
8. [MacFamilyTree or MobileFamilyTree](https://www.syniumsoftware.com/support-article/the-icloud-sync-does-not-work-correctly-what-can-i-do)
9. [Chronicle](http://chronicleapp.com/support/sync/)
10. [MarginNote](https://forum.marginnote.com/t/mac-icloud-sync-thread/92)
11. [(Apple) Photos](https://daringfireball.net/2018/10/icloud_photo_library_start_over)

If you saw the deleted post, you may recall my dissing the [Ulysses FAQs regarding iCloud sync](https://ulysses.app/faq#macos-icloud). That clearly was before I'd read the above, very similar items---and more like them.

I know: *hubris* is an unattractive thing to witness. I'm sorry.

[^centralLib]: If you want more details, I can highly recommend: (a.) the 2014 article, "[Learning iCloud Data Management](https://apprize.info/apple/icloud/11.html)," particularly the section titled, "Understanding How Core Data Works with iCloud"; and (b.) [this amazingly detailed yet easily understood forum reply](https://www.literatureandlatte.com/forum/viewtopic.php?p=244405#p244405) by [Scrivener](https://www.literatureandlatte.com/scrivener/overview) creator and chief developer Keith Blount.

## "Hey, kids, what time is it??"

Also in the deleted post: I mentioned what I'd perceived as the Smoking Gun proving Ulysses had failed my "stress test" and thus had to hit the road was when, one morning, I opened the app on the Mac and it took several minutes to retrieve something I'd done on another device the night before, after which it gave a timestamp conforming to *right that minute* rather than the true time and date of the last edit.

I wondered about that aspect, too, as I did my post-cancellation research in recent days. I found---you guessed it---that when a device forces a sync either automatically, as the Mac did in that case (albeit belatedly so, which might even explain this particular oddity), or manually due to a user command, that [can](http://forums.storyist.com/topic/2987-syncing-problems-is-it-just-me/?do=findComment&comment=19938) [trigger](https://www.reddit.com/r/bearapp/comments/7i4s4s/manual_sync_notes_without_icloud/) a timestamp change. In fact, it [sometimes can be bizarre](https://discussions.apple.com/thread/8553656). Anyway, this is on the sync provider---in this case, Apple---rather than Ulysses GMBH &amp; Co. or other third parties, for that matter.

## Trusting, but verifying

Bottom line: armed with my newly gained knowledge, I've started using Ulysses again over the last couple of days---once again "stress-testing" it, and so far, so good---and, this morning, I renewed my Ulysses subscription for another year. Thus, I killed the other post and redirected its traffic here.

And, no, I actually do *not* like the taste of crow, since you ask. But I very much am glad to have Ulysses back in the fold.

What did I learn? Well&nbsp;.&nbsp;.&nbsp;.

- As one Ulysses fan recently [told me jokingly on Twitter](https://twitter.com/craigdwarhurst/status/1120633985481285633), "We all pays our money and makes our choice." True. And I agree that I do so with wide-open eyes that neither Ulysses nor any other app is perfect. Nor is iCloud, in which I've [put a great deal of hope and trust---and my monthly money](/posts/2019/02/back-up-jack).
- To quote none other than Linus of "Peanuts" fame: "[I'm never quite so stupid as when I'm being smart!](https://www.pinterest.com/pin/4574037096083898)" I thought I knew. And maybe I knew some of it. But I didn't know enough. I was blaming one particular app for something that is an irregularly appearing characteristic of its app type, a type which I already knew and accepted because it makes the all-inclusive Ulysses Library possible.
- It's still a good idea to "[trust, but verify](https://en.wikipedia.org/wiki/Trust,_but_verify)." So I will continue the practice I started even before all this hubbub began, which is a periodic copy of Ulysses content over to iA Writer and, to be triply sure, Scrivener[^ScrivStill] as well.

[^ScrivStill]: Yes, I still open Scrivener on occasion. I gave serious thought to switching back to it during these two weeks of post-decision angst, and even gave it a shot or two with the WIP, but still ran into the [same issues as before](/posts/2018/09/why-finally-settled-ulysses) (my issues, not Scrivener's). That said, I may yet find needs for its organizational super powers if/when the WIP ever nears publication time, especially since [the 3.0.3 upgrade](https://www.literatureandlatte.com/export-to-vellum) made it even more [Vellum](https://vellum.pub)-friendly.

So, with the hope that you'll ever trust me again after this episode, I close this *mea culpa*. I am somewhat (?) chagrined by this whole thing, but nonetheless am grateful to have that little Ulysses butterfly back in my Mac and iPad docks, although I'm keeping iA Writer in the iPhone dock since I use it more often for quickie stuff.

And, as for said butterfly, it and I have a WIP to get back to, finally, so if you'll excuse us&nbsp;.&nbsp;.&nbsp;.