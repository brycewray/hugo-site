---
title: "Back up, Jack"
description: "Some observations on good backup practices, notably the 4-2-2 approach I’m now using."
author: Bryce Wray
date: 2019-02-23T12:45:00-06:00
lastmod: 2022-07-22T20:56:00-05:00
discussionId: "2019-02-back-up-jack"
---

**Update, 2020‑01‑11**:  While I'll leave this here for archival purposes, the continuing and annoyingly anti-Mac glitchiness of OneDrive on macOS finally got under my skin one time too many, whereupon I have now ceased using it for both sync and the backup process described herein (which means that, contrary to the content here, I'm now "just" on 3-2-1 rather than 4-2-2). If you're on Windows, OneDrive is probably fine for these purposes, but Microsoft for reasons I sorta *can* imagine just doesn't seem to care about QC where its Mac version of OneDrive is concerned.
{.yellowBox}

No one will ever mistake me for a high-tech version of [Henry David Thoreau](https://en.wikipedia.org/wiki/Henry_David_Thoreau) (which is a pretty bizarre concept, if you go there), but I've been trying to simplify my computing setup --- not so much where hardware is concerned but, instead, the services to which I have subscribed.

For example, I ended a brief dalliance with one of those [online](https://archives.cjr.org/language_corner/how_to_use_hyphens.php) services that allow PC gaming even for users who lack compatible hardware. This particular service, [Shadow](https://shadow.tech), "rents" access to a high-performance, cloud-based Windows 10 PC-in-a-rack so a Mac user like me can run Windows games that require [DirectX](https://en.wikipedia.org/wiki/DirectX) 11 and above and, thus, [won't run on virtual machines on the Mac](https://kb.parallels.com/en/122485). It worked very well and was great after-hours fun for a couple of weeks, but it was going to run into serious money if I persisted.[^1] I also knew my free time was going to be at a premium going forward as things got more intense at the Day Job, meaning I'd be paying that serious money for something I mostly wasn't using. Consequently, I pulled the plug before renewing for another month, and even returned the controller I'd bought to use with it.[^2]

On the other hand, there's one aspect of my setup that I absolutely *won't* give up, and that's **file security** in the forms of **backup and sync**. I'll get to sync in a bit but, first, let's talk about backup.[^3]

## Priority Number One: 3-2-1

A couple of years ago, I learned about, and bought into the wisdom of, the [3-2-1 approach](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/) to backup --- keeping three copies of each file (not counting the original), with two local backups and one [off-site](https://archives.cjr.org/language_corner/how_to_use_hyphens.php) backup. Indeed, I've adhered to 3-2-1 with almost cultish zeal since acquiring my current computer. Within a couple of days after the iMac and its one terabyte of built-in storage arrived on that happy day in July, 2017, I had:

- **Connected two four-terabyte hard drives to provide the "2" of the 3-2-1 approach.** --- I back up to one drive with the [Time Machine](https://support.apple.com/en-us/HT201250) feature built into macOS, and to the other with [Carbon Copy Cloner](https://bombich.com).
- **Bought [Arq](https://www.arqbackup.com) and subscribed to [Backblaze B2](https://www.backblaze.com/b2/cloud-storage.html) to provide the "1.”** --- Fortunately, my broadband service is symmetrical (same bandwidth upstream as downstream), so that's not the bottleneck you'd imagine. And, besides, I have neither the time nor the patience, not to mention the gear and the safety deposit box, to do the "1" the traditional way, such as making tape backups and hauling them off-site each day. My data is important to me, as I'll make abundantly clear near the end of this piece, but a corporate IT shop I'm not.

Thus, with one copy each on the hard drive backups and one copy in B2, I had the "3" of 3-2-1.

## OneDrive, OneHassle?

I was, and still am, very satisfied with B2 for both its performance and the low price of using it --- just a few cents a day. Still, recently, when [Arq added OneDrive to its list of supported cloud platforms](https://www.arqbackup.com/blog/onedrive-office365-sharepoint-backup/), it put some ideas into my head.

I'll get to that part in a while. Right now, allow me a mild rant about [OneDrive](https://onedrive.live.com) as a *sync* platform, as opposed to a *backup* platform.

As an [Office 365](https://products.office.com) subscriber, I get that one-terabyte OneDrive storage package thrown in but, since early last year, I've deliberately been keeping little on it for sync purposes. You see, in late 2017, I became disenchanted with OneDrive's usefulness for macOS and iOS when there were several weeks of what I'll call, for lack of a better term, "sync weirdness" (not to be confused with "[reefer madness](https://www.imdb.com/title/tt0028346/)”). It eventually sort of resolved itself, but my searches for answers made it clear, and annoyingly so, that it wasn't uncommon for OneDrive's syncing with macOS and iOS to exhibit anomalies for several weeks every fall --- right after the annual major updates to those OSs.[^4]

And that made me mad.

Keep in mind that one of the reasons Apple has the annual [WWDC](https://en.wikipedia.org/wiki/Apple_Worldwide_Developers_Conference) event in early June, months *before* those major updates, is to give developers inside information and, more to the point, plenty of warning about what changes they should make to their software products in order to conform to the upcoming OS updates.

So, what was I supposed to believe --- that Microsoft couldn't afford the developers? *Microsoft?!?* That it didn't get enough information? That it needed more time than the other, mostly much smaller cloud vendors who support macOS and iOS devices?

[Child, please](https://www.urbandictionary.com/define.php?term=child%20please).

As a result, and especially once I sold that one functioning Windows machine I still had left[^5], I decided to leave only a bare minimum of my files on OneDrive and, instead, began using a one-terabyte [Dropbox Plus](https://www.dropbox.com/plans?trigger=nr) account for the vast majority of my sync needs. This was especially helpful during the period when I was writing in [Scrivener](https://www.literatureandlatte.com/scrivener/overview) on both macOS and iOS, since Dropbox is the only recommended way to sync a Scrivener doc --- carefully --- between those two platforms ([albeit not without a lot of caveats](https://scrivener.tenderapp.com/help/kb/cloud-syncing/using-scrivener-with-cloud-sync-services)).

So that left me with Dropbox as my main cloud sync provider.

*[Dramatic music.]* **Narrator**: "For a while."

## Musical clouds

See, in the back of my Apple-loving mind there always was, of course, good ol’ [iCloud Drive](https://www.apple.com/icloud/).

Still, iCloud Drive was more of an afterthought than anything else, except for obvious things like photos from my iPhone or files created by software such as [Ulysses](https://ulysses.app), [iA Writer](https://ia.net/writer), and [Affinity Photo](https://affinity.serif.com/en-us/photo/). Also, I had only the fifty-gigabyte plan from iCloud, the main use for which still was to store those iPhone photos as well as all my [Apple Music](https://www.apple.com/music/) goodies.

I didn't *object* to iCloud Drive, or anything like that. I just wasn't sure I should rely on it too heavily for mass storage/sync for *all* my files. Hey, I still remembered the [MobileMe](https://en.wikipedia.org/wiki/MobileMe) fiasco. Of course, that was a long time ago and iCloud Drive is generations ahead of Apple's early days in that arena. Still, even though I knew [Apple has made a massive commitment to services like iCloud even as retail device sales seem to have plateaued](https://arstechnica.com/gadgets/2018/11/apple-services-reach-a-whopping-10-billion-in-revenue-in-q4-2018/), I just didn't make the connection. Besides, I already was paying the ten bucks a month for the one-terabyte Dropbox account and everything was fine. Why move?[^6]

What finally swayed me, I'm not sure. All I can tell you is that, last Saturday morning, I woke up thinking about what I mentioned before: a desire to simplify my setup and, yes, to cut my monthly costs a bit. I realized that something needed to go. And I suddenly had a moment of clarity (yeah, I have ’em on occasion, so cut me some slack, Jack): maybe it's time I thought about making iCloud Drive my go-to sync service. After all: for obvious reasons, it integrates much better with iOS's Files app than do the non-Apple services I have; and I've never had so much as a ghost of a problem using it across all our house's Apple devices.

Not long after I began to look at the results of "iCloud vs." searches, one phrase hit home with me:

> If you are looking for primarily personal use, and have all Apple devices, iCloud Drive is by far the best fit.[^7]

Well, shut my mouth and call me "Cloudy."

That had perfectly described my situation. Couldn't make it clearer than that.

Sufficiently convinced by that opinion and others that said basically the same thing (*i.e.*, if you're all-in on Apple gear and sync'g only personal content, go with iCloud Drive), I promptly upgraded my iCloud subscription from fifty-gigabyte to two-terabyte and copied almost everything from my Dropbox folder onto iCloud Drive. It took about nine hours to complete the transfer, even with my high-bandwidth connectivity. Once there was nothing left available to move --- there are a few apps I still use, such as the [Road Trip MPG](https://itunes.apple.com/us/app/road-trip-mpg/id298398207?mt=8) iOS app that keeps track of my car expenses, that require Dropbox to retain their data[^RoadTrip] --- I deleted the now-duplicated content from my Dropbox folder and terminated the paid subscription with Dropbox. I did keep the free [Dropbox Basic](https://www.dropbox.com/basic) two-gigabyte tier, which is more than enough for those aforementioned few apps’ use.

[^RoadTrip]: And even that app became iCloud-friendly a few months after I originally wrote this, so that was still one more nail in the Dropbox coffin for my purposes.

As for the cost savings, they're small *but* I'm getting more for my money. Before, I was paying a buck a month for two hundred gigabytes of iCloud storage *and* ten bucks a month for *one* terabyte of Dropbox storage. Now, I'm paying ten bucks a month for *two* terabytes of iCloud storage *and*, not incidentally, sharing that two terabytes with my wife via [Family Sharing](https://www.apple.com/family-sharing/) for her iPhone photos, as well.[^8]

In the first week under the new setup, I have been continually amazed to watch how smoothly macOS works with iCloud, now that I've finally given it the full "You da Sync Man" treatment --- especially with the Mac set to [optimize local storage](https://support.apple.com/en-us/HT206996). I know, it should've been obvious, and it was, but *knowing* it was much different than *seeing* it has been. And, as a side benefit, I get a little thrill every time I check the Files app in iOS and see *all* my freakin’ Mac stuff in there, too. That was sometimes problematic with the other services, notably OneDrive.

**Note**: In the wake of my [later issues with my Mac's iCloud Sync that briefly caused me to drop using Ulysses](/posts/2019/05/boxed-in/), I learned that [it can be unwise to use the *Optimize Mac Storage* option](https://www.macworld.com/article/3306257/how-to-disable-optimized-icloud-drive-storage-with-a-single-click.html), after all. It can inadvertently delete files on which [some](https://support.screencast-o-matic.com/hc/en-us/articles/360007256154--Sorry-this-recording-has-missing-files-since-iCloud-Drive-Optimize-Mac-Storage-is-enabled) [apps](https://support.native-instruments.com/hc/en-us/articles/360000816565-TRAKTOR-Warning-Message-Optimize-Mac-Storage-is-turned-on-in-iCloud-Drive-Mac-), particularly ["shoebox" apps](/posts/2019/05/boxed-in/), depend. The more you know&nbsp;.&nbsp;.&nbsp;.
{.yellowBox}

Oh, yeah, OneDrive. Left that OneDrive-as-backup-from-Arq thread hanging, didn't I? Well, about that&nbsp;.&nbsp;.&nbsp;.

## Hello, 4-2-2

To reiterate, I'm *already* paying for a one-terabyte OneDrive account as part of that Office 365 sub but have been using it only sparingly for sync. However, after asking some other Arq users about their impressions of it as a backup medium, I decided to take that one terabyte and use it as an additional backup source --- emphasis on *additional* because, as mentioned before, I likes me some serious B2.

I can tell you that, so far, it all works just fine, although the Arq logs suggest that the hourly uploads to B2 are at least twice as fast as those to OneDrive. However, to be fair, OneDrive is used by many more people and for a lot more purposes than is B2, so it may be a simple matter of available bandwidth. That said, I'm satisfied with the two of them.

That means now I'm "4-2-2" where backup is concerned: for each original file, I have four copies --- two on external drives and two off-site, online backups.

## Back to the future --- and the past

If you're not into this whole backup mentality, you may have been scoffing throughout this post, wondering whether my stuff is really so precious as to deserve all this expense, angst, fiddling, and more angst.[^9]

Fair enough. I have photos and documents, of course. Everybody does, right?

But I also have digital copies of videos from long-ago camcorders.

Making those copies was something I fretted about for years before I had a system with the oomph to handle digitizing them and the storage to keep them; I was certain the old tapes --- some more than thirty years old --- would ruin at least partially before I had a chance to save their recordings into a digital format which would preserve them long after I'm gone. Odds were that they indeed would've deteriorated before I could copy their contents to digital files, or even gotten snarled during whatever copying process I finally could achieve. But I got lucky. I got ’em all, without a single problem. Granted, they're in 640 &times; 480 resolution and my camera work was hardly stellar, but I have them --- safe, sound, sync'd, and quadruple-backed-up.

So, with a click, I can see our only child, now grown and an outstanding[^10] kindergarten teacher, as a five-month-old baby, or as a little girl squawking nervously because she was getting her hair cut for the first time, or as a poised young woman graduating from high school or college and posing with the long-time boyfriend who eventually would become her husband.

I also can see and hear again my father, grandparents, and other relatives who've all preceded me in death.

And, both on my desk and in multiple places out there in the ether, some outstanding hardware and software are keeping these digital treasures safe for me, and for those who will someday want them, too, after I'm gone.[^11]

Yes, it is that precious to me. Yes, it is worth everything it has cost, is costing, and will cost.

I urge you to figure out a 3-2-1 (or better) backup plan that works for you, as well as to pick at least one solid cloud vendor for sync purposes, so you can keep your own precious stuff *both* backed up and sync'd --- safe for you and for those who might want it when you're gone. Do it even if you're just a kid now, much less an old codger like me. If you don't care now, you will someday.

[^1]:	However, if you will spend enough time with it to make it worth it, Shadow isn't a bad deal for those who shy away from the up-front investment in a truly gaming-level PC. You're paying $35 a month (which you can stop at any time, as I did) to use a seriously outfitted PC in a rack someplace, and Shadow promises to keep the PC updated to meet newer games’ requirements. As long as you have sufficiently good up/down bandwidth, it might well be worth checking out. Shadow has been cultivating tech-oriented YouTube channels, so you can probably find a good cheaper-first-month deal readily enough, as I did ($25 instead of $35).

[^2]:	Tip: if you ever want to use an Xbox controller with your Mac, make very sure you install the [360Controller driver](https://github.com/360Controller/360Controller/releases) first. It'll save you a world of trouble trying to dope it out.

[^3]:	Obligatory reminder: [don't confuse sync with backup](https://www.howtogeek.com/346265/whats-the-difference-between-cloud-file-syncing-and-cloud-backup/).

[^4]:	Although [this](https://www.macobserver.com/tmo/article/microsoft-onedrive-drives-me-nuts) is from March, 2016, the story it tells sounds eerily like what I was encountering in late 2017 and early 2018.

[^5]:	Well, not counting its older brother, which I have converted multiple times to other OSs, most recently some flavor of Linux that escapes me now since I rarely turn on its dim screen to see how slow it plans to be today --- the PC, not whichever Linux distro I gave it last.

[^6]:	Completely as a side note within this growing forest of footnotes: I purposely didn't consider Google Drive, although I do have an account with that service, as well. The reasons why may be at least partially the subject of a future post; I'm still thinking about that.

[^7]:	[https://appleinsider.com/articles/18/03/23/video-as-dropbox-ipo-goes-live-should-you-consider-switching-to-icloud-drive](https://appleinsider.com/articles/18/03/23/video-as-dropbox-ipo-goes-live-should-you-consider-switching-to-icloud-drive)

[^8]:	The only thing that would make that part better would be if Apple would, at long last and to the applause of millions of Apple users, allow *automatic* sharing of photos among multiple holders of Apple IDs. If that ever occurs, it's goodbye, Google Photos for my household.

[^9]:	It's really not so much angst or fiddling. Just might look that way, to the uninitiated, from my description. Truth is, once you take the time and have everything set up, it just runs and works and you don't have to worry about it. The expense is real, but peace of mind rarely comes without a price.

[^10]:	That is, if the opinions of her mother and me --- and the professionals who rate her, and the parents who keep requesting to have her teach the younger siblings of kids she's already taught --- can be any guide for you.

[^11]:	Yes, I know the main problem with this scenario: unlike the concept of saving plain-text versions of your documents (a subject about which I'll write at another time), there is no way to know how compatible future software will be with these media files. After all, you can't very well save them as "plain video" or other such non-existent format! However, my immediate concern was to make sure I had "rescued" them from existing only on multi-decades-old VHS tapes. If, while I'm still sufficiently tech-savvy to grasp it, The Tech Powers That Be decide to make obsolescent both these files and the apps that can open them, I will do my best to convert the files to whatever format seems feasible at the time; and I will have to hope those who follow me will be motivated to do the same when necessary. After all, it is they for whom I'm saving these memories. If they don't care, I suppose it won't matter in the end; but better that I do this and they don't care than that I fail to do this and they wish I had.
