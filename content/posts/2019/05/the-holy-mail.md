---
#layout: singlepost
tags:
- post
title: "The Holy Mail"
description: "The way I sort-of cured the email client dance."
author: Bryce Wray
date: 2019-05-10T07:20:00-05:00
#lastmod
discussionId: "2019-05-the-holy-mail"
featured_image: "letterbox-1926493_4589x2648.jpg"
featured_image_width: 4589
featured_image_height: 2648
featured_image_alt: "Old metal mailslot on bright red door"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/aitoff-388338/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1926493">Andrew Martin</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1926493">Pixabay</a></span>
---

Dr. McCoy said it so well in *Star Trek: The Motion Picture*: "I know geeks: they *love* to change things."

Well, actually, he [said](https://www.imdb.com/title/tt0079945/quotes?item=qt0252540), "engineers," rather than "geeks"; but I've taken the liberty of editing him because in this case I'm talking about me, not an engineer. Whenever I see a different and, seemingly, better way to do something, I'm all "Oooh, *shiny*," in a heartbeat.

Oddly, that's true even when it comes to perhaps the most boring of all app categories: email clients.

Or, at least it used to be true.

## Holy Grail, Batman

In 2017, I once again became a macOS user following two-and-a-half miserable years away, not to mention a Mac owner following *thirty* years away (long story). That meant this was the first time I'd ever needed to check my personal email on *both* macOS and iOS --- *i.e.*, iOS wasn't even a glimmer in Steve Jobs's eye back in the eighties --- and it presented a sort of conundrum.

On the new Mac, at first, I used the built-in Apple Mail app, but by then I'd been using the iOS version of Outlook ([the former Acompli](https://www.theverge.com/2015/1/29/7936081/microsoft-outlook-app-ios-android-features)) for a while, and liking it quite a bit. However, not caring for the mild cognitive dissonance that provided, I decided fairly soon that, *if possible*, I wanted to run the same client on both iOS and macOS. That narrowed it down considerably. It also became, for a time, the Holy Grail for me.

First, I tried [Airmail](https://airmailapp.com) on both macOS and iOS. I found it interesting --- its many settings were certainly a nerd's delight --- but it was occasionally buggy, and I really didn't like the fact that it took it upon itself to *add an Airmail folder* in each of my accounts’ IMAP setups! Not cool, Airmail. (Yes, you [can stop that](http://feedback.airmailapp.com/forums/274948-airmail-mac-3-x/suggestions/17041585-i-want-to-stop-airmail-from-creating-its-own-imap). No, you shouldn't have to do so.)

## G whizzes on Apple

I then reverted to Apple Mail on the Mac while trying for the first time to rely on the Apple Mail client on iOS, which heretofore I'd ignored in favor of other choices. I quickly learned that had its limitations, too --- because, back then, my primary email account was a Gmail account.

In case you haven't already learned this the hard way, new emails into a **free** Gmail account[^freeVsGSuite] don't "push" notifications to Apple's mail clients, iOS or macOS, in a standards-compliant way that allows them to let you know immediately that, to coin a phrase, *You've got mail*. Instead, you have to have each client check Gmail at intervals through [*fetching*](https://discussions.apple.com/thread/8003824).

[^freeVsGSuite]: This limitation doesn't exist with a **paid** Gmail account within Google's G Suite product. Emails to G Suite are handled in an Exchange-compatible manner, which works perfectly well with Apple Mail on iOS or macOS although [G Suite still has known issues with iOS](https://support.google.com/a/users/answer/139635).

Fetching costs battery power, especially on an iOS device, and also is just a pain because it can be done only every few minutes, so you don't always know right away that you have new email waiting. No biggie if it's just spam, but quite a biggie if you're waiting on something important. Mind you, my Mac is an iMac, so battery power wasn't an issue there, but --- especially since this was in the fall of 2017 and [the newly released iOS 11.0 was very buggy](https://www.fastcompany.com/90143457/ios-11-sucks) --- my then-iPhone, a 7 Plus, was **not** a happy camper, battery-wise.

So I tried to figure out better ways to do it, and came across [one particular MacRumors thread](https://forums.macrumors.com/threads/spark-the-best-update-a-good-email-client-for-both-macos-ios.2013631/) where they'd been discussing the merits of several email clients, particularly [Spark](https://sparkmailapp.com), for a year at that point. I followed the various posters’ advice for a while.

One suggested client was [Edison Mail](https://mail.edison.tech/), which did, in fact, get push notifications for new emails in free Gmail. However, I found Edison Mail couldn't show "Sent" items in conversations from an Exchange account. Back in those days, I cared about that because I was also receiving work emails on my devices. (This was about a year before I learned that's a [bad](https://blog.cdemi.io/never-accept-an-mdm-policy-on-your-personal-phone/) [idea](https://www.m3networks.com/never-use-personal-devices-connect-company-data/).) I submitted a bug report and got this response:

> Thanks for your message, and our apologies for the confusion --- threading is only available for Gmail accounts for now. We hope to expand threading to other accounts in the future, but until then we'll do our best to specify that this feature is limited to Gmail accounts with future updates.

So that wasn't going to work to my satisfaction, at least not for Exchange. However, I did follow another poster's advice and kept Edison Mail around **only** for notifications, then would open them in Apple Mail. Nonetheless, it was a clunky solution.

## A giant <span style="white-space: nowrap;">(battery-)</span> sucking sound

I dearly wanted to settle on Apple's mail clients in both iOS and macOS, but the whole urinating contest with GMail push remained a show-stopper for me; so I continued the Edison Mail/Apple Mail tag-team match for a while on iOS, only to suffer a self-inflicted wound.

As I mentioned before, in those early days of iOS 11, a *lot* of stuff wasn't working well, especially where battery consumption was concerned. But, good ol’ clever me, I made it worse by inadvertently leaving the Apple Mail app to "fetch" more aggressively --- *i.e.*, as if I hadn't put Edison Mail on there to notify me of new mails --- which, of course, was sucking battery juice big-time.

Upon discovering this, I changed Apple Mail's setting so it would fetch only every 15 minutes, hoping that would be sufficient to stop the draining behavior until Apple got its software act together in a dot-version or two.

However, such was not the case; and, within a few days, I decided with great reluctance to go back to Airmail on iOS.

At that point, not yet knowing about Edison Mail's [not-so-great privacy policy](https://www.macrumors.com/2018/07/02/third-party-email-apps-reading-user-emails/), I hoped Edison would produce an app that would do threading for **non**-Gmail accounts **and** work the same in that Mac version[^Edison_on_Mac] on which it apparently was working furiously. If that occurred, I thought, it might be the Holy Grail.

[^Edison_on_Mac]:By the way, at this writing in the late spring of 2019, that Mac version is still nowhere to be found, although there *is* now an Android version.

## An end run to daylight

Then, near the end of that October, I started thinking about another way to the Grail.

If Gmail was the problem, why not solve the problem?

Now, mind you, I couldn't just drop my Gmail account. For one thing, at that point, I had twelve years’ worth of mail in it, and dozens if not hundreds of people I'd have to notify if I changed my personal address. Moreover, I needed to keep a Google account, anyway, for things like Google Analytics. But I began researching what some other folks had done, and one strategy gradually grew on me:

- Set Gmail to *forward* all my emails to another vendor.
- Get my *own domain* and have that vendor use it as my mail domain. That way, if I didn't like the new vendor, I'd simply move the address (and, yes, its emails) over to a new vendor *but* get to keep the address. So, yes, I'd have to notify folks I was no longer best reached at my Gmail address, but that would be the last time I'd have to tell them a new personal address. Whoever hosted it going forward --- even if I got a [wild hair](https://www.waywordradio.org/wild-hair/) one day and decided to host the mail setup myself[^hostOwnMail] on a VPS or something like that --- my address would stay the same.

[^hostOwnMail]: I really [doubt that I'll ever want to do that](https://www.digitalocean.com/community/tutorials/why-you-may-not-want-to-run-your-own-mail-server), however.

That vendor ended up being [FastMail](https://fastmail.com). It even provided [Apple-friendly](https://blog.fastmail.com/2015/07/17/push-email-now-available-in-ios-mail/) [push](https://blog.fastmail.com/2016/12/21/what-we-talk-about-when-we-talk-about-push/)! So, every time the Gmail account got a new email, it would automatically "ring" FastMail's "chimes," and FastMail would instantly notify my Apple devices. Bingo. Now, finally, I could use Apple Mail on both macOS and iOS and not have to worry about whether I was getting late word of arriving emails.[^timing]

[^timing]: Those of you who delight in leaving your inboxes loaded with email --- who gleefully post screen caps of iPhones with five-digit "unread" badges on your chosen mail apps --- well, I'm not one of you, nor could I ever be. When an email comes in, I want to know about it *now*. More often than not, I just Mark As Read and go about my business, but on occasion there *is* the one big-deal email I really *do* need to read and act on right away, and my Happy Path for email lets me do so.

After all, it was football season, so why not do a good ol’ end run?

So, over the last weekend of October, 2017, I signed up with FastMail, got a domain from Namecheap, set FastMail to use the domain for my new address, and set up forwarding (and copying of my existing IMAP mail) from Gmail to FastMail.

As I explained it on that same MacRumors forum: rather than continuing to gripe because the car was bouncing on the hole-filled road, I'd decided instead to find a smoother road; and now, the ride was much more pleasant.

So, one forum poster asked: why hadn't I tried simply doing the same thing with iCloud rather than FastMail? I had considered doing exactly that. However, I'd wanted to use my own domain, which iCloud Mail doesn't support. Also, back then, there were occasional reports of iCloud Mail issues, although they've settled down greatly since those days.

By early November, the arrival of iOS 11.1 --- while still buggy --- had settled down the battery worries with my iPhone. It also didn't hurt that, with my new email setup in place, push notifications were coming from FastMail like they should and there no longer was a need to use the power-hungry fetching.

## And yet, I haven't moved

And since then?

I am happy to report that, over a year and a half later, that setup --- using Apple Mail on both iOS and macOS, with FastMail hosting my mail using a domain I own --- is *still* my go-to email method. Whether it's truly a Holy Grail, one can argue, but it works for me. The two clients are rock-solid and get the job flat-out *done*. Also: [rumor](https://www.bloomberg.com/news/articles/2019-05-06/apple-wwdc-2019-ios-13-macos-10-15-watchos-6-tvos-features) hath it that the [iOS version](https://9to5mac.com/2019/05/08/ios-13-features-dark-mode-more/) will get quite a bit better this fall.

Do I ever look at other apps any more? Oh, sure. It's what I sometimes call "the geek's prerogative." But those other apps still haven't overcome the [various](https://www.macobserver.com/news/email-developers-read-gmail/) [bad](https://www.cultofmac.com/571791/airmail-security-exploits/) [points](https://www.reddit.com/r/apple/comments/adazxk/psa_there_is_nothing_special_about_spark_emails/) that led me away from them in the beginning. I still have Outlook in macOS, but only because I get it as part of my Microsoft Office 365 subscription and, I've heard, killing it can cause problems with the frequent Office 365 upgrades.[^attach] And, while I still think the iOS version is pretty nifty for a Microsoft app, my setup makes having more than one iOS mail app pointless.

[^attach]: To be fair, there once were times when I found Outlook useful on the Mac, particularly in sending emails with attachments since [Apple Mail on macOS is a little squirrelly about how it handles that task](https://www.makeuseof.com/tag/apple-mail-attachments/). However, the way Microsoft has kept Outlook's Mac feature set inferior to that of the Windows version hacked me off to no end, so I finally deleted all accounts from it. Now, it just sits there on the Mac, unopened and unlamented.

Are the Apple Mail clients perfect? Absolutely not. Are they more feature-rich than the competition? No, definitely not. But they *work well enough* for my purposes, and they've relieved me of that search for the Holy Grail --- the Holy Mail? --- for a good while now. That's all I wanted. So, if you're also searching for that same chalice, perhaps you'll find this little tale of use.
