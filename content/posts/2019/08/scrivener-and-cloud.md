---
layout: layouts/posts/singlepost.njk
title: Scrivener and The Cloud
tags: post
subtitle: Cutting through the fog (maybe)
description: "When even Ars Technica's forum users can’t keep this straight, intervention is necessary."
author: Bryce Wray
date: 2019-08-18T14:15:00-05:00
#final_date: 2019-08-18T14:15:00-05:00
draft: false # note!
actual_path: /content/posts/2019/08/scrivener-and-cloud
final_url: /posts/2019/08/scrivener-and-cloud
discussionId: "2019-08-scrivener-and-cloud"
featured_image: /images/scriv-and-cloud-from-3331240_1280x720.png
featured_image_alt: Scrivener logo and cloud computing icon
featured_image_caption: "Images: Literature and Latte; Pixabay" # quotation marks to allow colon
---

It can be hard on one's psyche to visit the comments sections of many tech-oriented Web sites, particularly when people are in a nasty mood about something, and *most* particularly when the trolls come out brandishing their typical "I-hate-this-and-Imma-gonna-tell-ya-why-for-the-millionth-time-with-what-I-consider-to-be-my-clever-wit" approach.

[MacRumors](https://macrumors.com), I'm looking at you, bud.

However, there are tech sites where I've usually found the visitors, even when hacked and for good reason, not only are (mostly) pleasant to read but also have their facts straight.

[Ars Technica](https://arstechnica.com) is one of those special, all-too-rare places.

Yet, I recently found a commenter there wielding highly erroneous information concerning that rare thing about which I know enough to say, "Uh, no"---specifically, how the writing app, [Scrivener](https://www.literatureandlatte.com/scrivener/overview), does and doesn't work where cloud sync is concerned. So, on the chance that this unexpected sighting of wrong-Ars[^sorry] statements means there are numerous otherwise-well-informed individuals in the wild spreading the same tainted info, I'm Here To Help.<sup style="font-size: 65%;">&trade;</sup>

[^sorry]: Sorry, it was too easy to pass up. I'm weak.

## Dropkicking Dropbox

It all started yesterday, when I was looking through an Ars Technica article from back when [Dropbox](https://dropbox.com) implemented its [ill-considered change](https://arstechnica.com/gadgets/2019/07/dropbox-silently-installs-new-file-manager-app-on-users-systems/) to how Dropbox works on the desktop. As I mentioned in a footnote to a recent [post](/posts/2019/07/lessons-learned), it was the last straw that made me finally drop my last remaining ties to Dropbox. But that's not what I'm writing about here.

No, what got me on this particular jag is what I saw as I combed through the [article's many reader comments](https://arstechnica.com/gadgets/2019/07/dropbox-silently-installs-new-file-manager-app-on-users-systems/?comments=1) as various folks mentioned how this would be *their* last straw with Dropbox, also. I was curious to see how many of them would note that, as had been true for me, they'd kept it as at least a background cloud sync vendor only because of specific apps---like Scrivener---known to require Dropbox for cloud sync among multiple types of devices. (I'll get to the particulars in a bit, but stay with me for the moment.)

A few did register just such comments. However, what suddenly had me wanting to raise my hand and yell, "Ooh, ooh! Teacher!"[^nerd] was when I saw one particular commenter [saying](https://arstechnica.com/gadgets/2019/07/dropbox-silently-installs-new-file-manager-app-on-users-systems/?comments=1&post=37672823&mode=quote#reply):

[^nerd]: I admit it: I was one of those kids, eons ago. Rest assured, I paid for it and then some at recess, so spare me the hate now, willya? Thanks.

> Used to be I had some other apps that were reliant on Dropbox, but I think they've all added their own cloud (1Password) or now work with iCloud or Google Drive (Scrivener), so I think I can ditch Dropbox.

.&nbsp;.&nbsp;. or [this response](https://arstechnica.com/gadgets/2019/07/dropbox-silently-installs-new-file-manager-app-on-users-systems/?comments=1&post=37676751&mode=quote#reply) to someone else's wishes that Scrivener didn't depend on Dropbox .&nbsp;.&nbsp;.

> Scrivener iOS added iCloud syncing a while ago. (Don't know exactly when, because I missed it too, but a friend pointed it out.)

.&nbsp;.&nbsp;. or [another](https://arstechnica.com/gadgets/2019/07/dropbox-silently-installs-new-file-manager-app-on-users-systems/?comments=1&post=37687283&mode=quote#reply) such response .&nbsp;.&nbsp;.

> Scrivener added iCloud sync a while back.

Well, sir, your friend done you wrong, I'm here to tell ya. And it would seem that neither of you ever looks at the [Literature and Latte forums](https://www.literatureandlatte.com/forum/index.php), where this sore subject comes up far too often for the good of the nice L&amp;L people's collective blood pressure, I'd guess.

## The skinny on Scriv 'n' sync

So, let me say the simple part first, and then I'll get into the whys and wherefores. Yes, this stuff is on the L&amp;L site and in plenty of places elsewhere but, as that one commenter's seemingly well-intentioned statements make clear, it's still not clearly understood.

**NO, the Scrivener app for iOS DOESN'T work with iCloud sync**, just as has been the case since that app's release in 2016.

**YES, the Scrivener app for macOS can be used with iCloud sync BETWEEN MACS** ***if*** **you have TURNED OFF "Optimize Mac Storage" in each Mac's iCloud setup**.

So, why the difference?

A Scrivener .scriv "file" on macOS and iOS is actually *not* a file in the usual sense but is, instead, a *ZIP archive*. Through some clever little manipulation of the macOS file structure, it *looks like* a file in the macOS Finder. In fact, those who use the Windows version of Scrivener see its "files" appear on that OS's File Explorer as, yep, ZIPs.

And why is that?

Say you're an academic, writing a massive textbook. Its finished form will have twenty-six chapters and thousands of illustrations, and will require you to keep close at hand many thousands of research sources.

And you want to keep it *all in one file*. That way, wherever you take your trusty laptop, it's with you.

Every time you open that file, you want **all** of this content to be available to you.

You want to be able to go back and forth among chapters and sections with ease. You *don't* want jumping around within this tome to seem as if you're putting either the software or the computer through the agonies of the damned, particularly since certain writing apps[^Word] have a devilish habit of crashing---or, worse, crashing **and** corrupting the file---under those circumstances.

Similarly, you want it to load into your computer's memory, and to save, only those smaller parts of this huge project that you're actually working on at the time, so it won't work as if you were in molasses.

[^Word]: ***[Cough]*** Word ***[cough]***.

Scrivener does all that and more---and it's because of that file structure I just described. Although the .scriv file itself for a project like that can become gigantic, Scrivener lets you work on and save only those pieces you're using right now, leaving everything else unbothered until you need it. This is a massive win for RAM, for your CPU, and for file stability.

Compare that experience to what you get with a more conventional word processing app, which keeps all the text for such a document in just one titanic, shaky file. Even if you find clever ways of identifying its segments and navigating within and between them, you'll still find such an app isn't cut out for this kind of work. And that doesn't even get into all the *other* apps and files you'll have to juggle due to the other requirements I mentioned.

Scrivener was built precisely for this and similar use cases, over a decade ago, and is still about the only app that's sufficiently powerful to handle them. This is its greatest strength.

## Pursuit of APIness *vs.* realism

Sadly, though---as is true for many a literary hero---Scrivener's greatest strength is also its greatest weakness. At least, that's the case when it comes to the issue of how to sync Scriv files across devices.

First, let me say it again: you can sync a Scrivener file between two Macs via iCloud all you want, because macOS-to-macOS is fine. Where Scrivener is dependent on Dropbox is when you bring the iOS version into play.

**For iOS**, [iCloud's API doesn't "get" the special file structure of Scrivener](https://www.literatureandlatte.com/forum/viewtopic.php?p=244405#p244405). Nor, for that matter, does OneDrive's. And [you **absolutely** should **NEVER** try Scrivener files in Google Drive](https://scrivener.tenderapp.com/help/kb/cloud-syncing/google-drive-advisory) (even Mac-to-Mac), which brings on its own special hell.[^Gdocs]

[^Gdocs]: For reasons passing human understanding, Google Drive thinks a text file within it---even deep within the .scriv file container---should be changed to its own .gdoc format for use with Google Docs. Jeeeeez.

Only the Dropbox API, still to this day, is able to "understand" the Scriv file structure for iOS purposes. Until that changes, Dropbox is the only approved, proven, safe way to sync Scrivener files between macOS and iOS. Period. End of story.

And when I say, "end of story," I suspect it'll truly be that. Because now we get into the unpleasant details where business and money rear their ugly heads.

For Apple to change iCloud in such a way that its API and the Scrivener file structure can become BFFs where iOS is concerned would require it to be worth Apple's while. The development costs are probably huge, and there's also the nagging concern that any such changes to iCloud would "break" things that work with it now. Since [Apple is putting a lot of its financial eggs in the services-selling basket](https://arstechnica.com/gadgets/2018/11/apple-services-reach-a-whopping-10-billion-in-revenue-in-q4-2018/), any such glitches would be stupendously bad. When you're a gargantuan publicly traded company [on which the Dow itself seems to ride some days](https://www.investors.com/market-trend/stock-market-today/stock-market-soars-as-recession-fears-go-on-back-burner-apple-leads-dow-jones/), you can't and won't take those kinds of risks if there's not an overwhelming financial reason to do so.

We who use Scrivener[^Ulysses] are a [scrappy, vocal bunch](https://www.literatureandlatte.com/forum/search.php?search_id=active_topics), but we definitely do not constitute more than a flyspeck when compared to the population of iOS and macOS users as a whole. Thus, it's easy for Apple to give lip service to L&amp;L about perhaps someday finding a way for iCloud to work with sync-to-iOS with Scrivener while never actually doing anything about it.

[^Ulysses]: Yes, I still use Scrivener, as I've said before, despite my comments [here](/posts/2018/09/why-finally-settled-ulysses) about it vs. [Ulysses](https://ulysses.app). I have the luxury of having multiple superb writing apps, and I use whichever feels best to me at the time.

For the same reason, I don't imagine any other cloud sync vendors are spending much if any time working out their own solution for the Scriv conundrum.

Indeed, with Dropbox continuing to make moves that seem [designed to make Wall Street love it regardless of what's really good for its users](https://diginomica.com/dropbox-q2-fails-all-about-app), I fear the time will come when it'll decide it's no longer financially worth it to keep that particular part of the API as-is, at which point Scriv users would be high and dry where iOS-related sync is concerned (other than the clunky [plug-it-in method](https://scrivener.tenderapp.com/help/kb/ios/dropbox-syncing-with-ios#tips-for-the-first-time-you-sync-a-project) which, itself, [is going to have to change with macOS Catalina](https://support.apple.com/en-us/HT210200)).

## Lighten up, Francis?

Finally: the L&amp;L forums also are visited frequently by those who ask, essentially, "Well, if you can't make Scrivener's file structure work with anything other than Dropbox, why don't you just change the file structure to something similar to what your competitors use?"[^iCloudapps]

[^iCloudapps]: This argument usually cites apps like Ulysses and [iA Writer](https://ia.net/writer), which indeed are happy campers where iCloud sync and their apps are concerned. However, those apps aren't designed to do all the things that Scrivener does, so their file structures can be simpler and, thus, iCloud-friendly; it's apples-and-oranges.

And then, the answer---sometimes even from Scrivener creator Keith Blount himself---comes back, in so many words: "Because that would destroy Scrivener." And that's absolutely true. Scrivener without the very powers it gets from that file structure would be a pale remnant of its current self.

If L&amp;L were a bigger operation, perhaps it would develop a "light" version of Scriv along such lines---but I doubt it. I get the impression that the L&amp;L folks think, well, if you want a dumber version of this app to which we've given our full measure of devotion all these years, there's a big field of competitors out there; go for it. They're too nice to *say* that (usually, although [certain particularly rude questioners can provoke them](https://www.literatureandlatte.com/forum/viewtopic.php?p=294469#p294469)), but I believe that's their position, and I can't say I disagree. Those Who Do Not Code probably cannot understand such things; and that constitutes a large part of the Scriv audience, as nearly as I can tell through a variety of anecdotal data and observations.

Anyway, I do hope this has helped people understand why, and I say it again, **the Scrivener app for iOS DOESN'T work with iCloud sync**. Don't know how much plainer I can make it---even for somebody who's savvy enough to be a frequent commenter on Ars Technica.