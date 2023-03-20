---
title: "Finding and fixing an SMTP oddity on my iDevices"
description: "How I climbed out of an unexpected rabbit hole after returning to Fastmail."
author: Bryce Wray
date: 2023-01-06T10:04:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

The other day, when I [reverted the hosting of my custom-domains email](/posts/2023/01/back-to-fastmail-redux/) from [iCloud+](https://support.apple.com/guide/icloud/icloud-overview-mmfc854d9604/icloud) to [Fastmail](https://fastmail.com), I was pleased by how smoothly the transition had gone on the three Apple devices where I access email: a Mac, an iPhone, and an iPad. However, the next morning, I encountered a particularly maddening problem that I hadn't previously noticed.

Since I spent most of the next several hours in fruitless web searches for an answer (which **none** of those searches provided), I'm writing this post to tell you about my accidental discovery of what **was** the problem. After all, someone else who returns to Fastmail from iCloud+ might run into the same buzzsaw.

<!--more-->

----

In my past moves between one email host and another, I'd always tested send/receive operations on all three of my Apple devices. However, on the day I performed this final return to Fastmail, I apparently tested sending from Fastmail only on the Mac.

The next morning, I learned the hard way that I should've done such testing on the iDevices, too. While using my iPad, I tried to reply to an email I'd received via a [Fastmail alias](https://www.fastmail.help/hc/en-us/articles/360060591073-How-to-set-up-aliases) (the [contact](/contact/) address for this site), but kept getting a "Sender address is invalid" error message.

Stranger still was that I hadn't encountered this problematic behavior during my [previous return to Fastmail](/posts/2022/08/back-to-fastmail/) a few months earlier; so what had changed this time? The only thing that comes to mind is that, previously, I'd **manually** set up Fastmail on iOS/iPadOS, while this time I *initially* used Fastmail's recommended, **automatic** procedure for configuring iDevices through download and installation of a pre-cooked *profile*. It was super-easy, but I neglected to notice its fatal flaw for my purposes, spelled out clearly in the [documentation](https://www.fastmail.help/hc/en-us/articles/1500000279941-Set-up-iOS-devices-iOS-12-):

> To [add aliases](https://www.fastmail.help/hc/en-us/articles/360058752894) that you wish to send mail from, you must [set up your Fastmail account on iOS manually](https://www.fastmail.help/hc/en-us/articles/360058752914).[^year]

[^year]: **Update, 2023-01-09**: I've learned of an additional gotcha in using a Fastmail profile; it lasts for only a year at a time and then must be re-installed, due to its use of an authentication certificate. H/t to [Don](https://mstdn.social/@case2tv@social.tchncs.de/109659289519785253) for tipping me off to this info.

Given that my initial encounter with the sending error had been when I'd tried to reply from an alias, I naïvely thought I'd quickly located the problem. I then deleted the profile, manually added all the necessary Fastmail IMAP and SMTP server settings, and began trying to send from the Fastmail alias to my *@icloud.com* address.

Failure after failure ensued.

Only when I later saw I also couldn't send from the *real* account address, not only the alias, did I realize that I'd run into something considerably more screwed-up than merely some alias-related SNAFU.

At first, I thought it was an oddity that was specific to the iOS/iPadOS versions of Apple Mail. I couldn't reproduce it on the Mac version of Apple Mail (much less the Mac-only [MailMate](https://freron.com)), but I knew the iOS/iPadOS versions are **very** different and, so, that didn't prove anything.

In a normal sending operation with Apple Mail on iOS/iPadOS, the outgoing email goes to an **Outbox** folder for a second or two, followed by the actual transmission. What was happening here, however, was that the mail wouldn't be able to get past **Outbox**, triggering the error message.

As I mentioned above, I had zero luck finding *usable* answers. Mind you, there are plenty of pages out there telling you how to fix a "Sender address is invalid" error in iOS/iPadOS Apple Mail, but none of them offered anything I hadn't already done.

The hours stretched by, and I continued to fail at my attempts to determine the problem. I tried all the usual things one might expect, and on each of the affected iDevices:

- **Triple- and quadruple-checked the Fastmail SMTP settings** --- No luck.
- **Deleted and restored the Fastmail account (yes, all those IMAP and SMTP settings, again)** --- Nope.
- **Deleted and restored the Apple Mail app itself** --- Nada.
- **Tried other iOS/iPadOS email apps** --- Although they successfully sent emails from Fastmail, each app had shortcomings that sent me back to Apple Mail. The fact that I was using an alias complicated things because, it seems, many if not most third-party apps don't support sending from Fastmail aliases. As for the actual Fastmail app --- essentially just a "wrapper" around the Fastmail web app --- it wasn't bad but, as I noted earlier, I have an *@icloud.com* address and prefer to have **all** my email accounts (**un**forwarded, mind you) work with one app for that "unified Inbox" goodness.

In the end, it was dumb luck that found the answer.

It had gotten to the point that I was throwing the kitchen sink at the problem, activating or deactivating one item or another followed by trying once again to send from Fastmail. I began to wonder whether my recent use of iCloud Mail to host my custom domains had somehow confused the configuration --- *i.e.*, what if, for some bizarre reason, there was something deep inside the setup that was still trying to use iCloud's SMTP server to send the Fastmail email? So, during one such session, out of sheer curiosity, I simply turned off iCloud Mail itself. Suddenly, an outgoing email I'd left for dead in the iDevice's **Outbox** popped into view in the *Inbox* on my Mac's MailMate screen. **The sending had worked!** I'd discovered by chance that, with iCloud Mail turned off, my attempted sends from Fastmail would work.

*Whiskey Tango Foxtrot?!? What possible connection could there be between the two?* I wondered.

Thus, I began exploring the whole part of the iOS/iPadOS **Settings** app in which one controls iCloud Mail. Soon, I'd burrowed down to the deeply buried part where you can tell iCloud Mail which SMTP server to use as a backup if it can't "hit" the usual Apple SMTP server.[^SMTPsetting] Because I'd already added the settings for Fastmail's SMTP server down in the overall Mail settings, that server appeared in this setting --- but, then, I noticed that *it appeared as being "Off."*

[^SMTPsetting]: As of this writing, you get there with **Settings** > [your name] > **iCloud** > **iCloud Mail** > **iCloud Mail Settings** > **Outgoing Mail Server** > **SMTP** > **Other SMTP Servers**.

At first, given the placement's context, I thought this meant only that the Fastmail SMTP server wasn't being offered as a backup choice for iCloud Mail. But, then, after having seen that sending via Fastmail would work when I'd turned off iCloud Mail itself, I wondered if perhaps there were more to this setting.

So I played a hunch and changed the setting to "On" --- and, yep, that resolved it.

From there, both iCloud Mail and Fastmail worked fully normally on my iPhone and iPad (after both iDevices had the right setting, of course), sending/receiving their little electronic hearts out. Thus, it became clear that this setting, when toggled to "Off," was disabling the device's access to Fastmail's SMTP server.[^otherApps]

[^otherApps]: Of course, this setting had no effect on those third-party iOS/iPadOS email apps I'd tried, which explains why they'd soldiered on with sending from Fastmail even while the setting was "Off."

{{< imgh-colors src="Screen-shot_2023-01-06_SMTP-setting-iOS_1125x2436.png" alt="iOS setting for iCloud SMTP backup server" phn=true width=1125 height=2436 >}}

Note that, under "Other SMTP Servers," *smtp.fastmail.com* is shown as being "On"; but, while I was having my problem with sending email from Fastmail on my iDevices, the setting was "Off."
{.imgcCaption}

----

Finally: **why** did this happen?

I don't know.

What I *suspect*, but can't prove, is that it was somehow related to my first using the profile and then replacing it with a manually installed Fastmail setup. Maybe adding the profile turned the setting "Off." Maybe *deleting* the profile and manually reinstalling the account turned it "Off."[^forensics]

I also don't know whether anyone else on the great big ol' web needs to know about this particular solution; but, just in case someone does, there you go. Enjoy.

[^forensics]: There's probably a log file, buried somewhere deep within the silicon bowels of each of my iDevices, that would tell me what went wrong and when. I have no idea where it could be, whether I'd even be able to access it, or whether *if* accessed it would make any sense to me. So, barring any further, related revelations that I currently don't expect, this will remain a mystery.
