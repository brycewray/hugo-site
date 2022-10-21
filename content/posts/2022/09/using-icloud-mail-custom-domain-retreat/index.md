---
title: "Using iCloud Mail with a custom domain: the retreat"
description: "Why I’ve decided, perhaps finally this time, to eschew Apple’s offering."
author: Bryce Wray
date: 2022-09-27T10:54:00-05:00
#draft: true
initTextEditor: iA Writer
---

Although I gave it my best shot, I've decided *not* to keep my custom domains' email with iCloud Mail, after all. To be sure, I *will* continue to subscribe to Apple's [iCloud+](https://support.apple.com/guide/icloud/icloud-overview-mmfc854d9604/icloud) service that makes that custom-domains support possible, but it'll be for some of the service's other features.

For those not sufficiently masochistic to have kept up with my previous posts on this subject, here is how the mini-saga has gone so far, including each post's original publication date:

- "[Using iCloud Mail with a custom domain](/posts/2022/06/using-icloud-mail-custom-domain/)" (<span class="nobrk">2022-06-13</span>) --- My first dip into the pool of trying the feature, a year after Apple's announcement thereof, involved the domain I use for receiving [your emails](/contact/). I wanted to see how that went before I tried transferring my "Big Kahuna" domain, over which the overwhelming majority of my email activity occurs. Both domains had been living for years on [Fastmail](https://fastmail.com), where my subscription has until near the end of this year, thus giving me ample time to experiment.
- "[Using iCloud Mail with a custom domain: following up](/posts/2022/06/using-icloud-mail-custom-domain-following-up/)" (<span class="nobrk">2022-06-19</span>) --- After the first domain *didn't* crater with iCloud Mail, I went ahead with moving the "Kahuna," too. My main takeaways were that:
	- It went well enough, but . . .
	- Trying to move decades’ worth of old emails to iCloud via IMAP was agonizingly slow and buggy (Fastmail uses the much more agile, yet IMAP-compatible, [JMAP protocol](https://fastmail.blog/open-technologies/jmap-a-better-way-to-email/)), and so . . .
	- I'd have to quit using my [favorite email client](/posts/2019/06/ahoy-mate/), the IMAP-only [MailMate](https://freron.com), in favor of Apple Mail and its ability to work with locally archived email.
- "[Back to Fastmail](/posts/2022/08/back-to-fastmail/)" (<span class="nobrk">2022-08-30</span>) --- That problem with MailMate gnawed at me for weeks, until I finally just said, "Screw it, I'm going back to Fastmail." However, even after doing so, I continued to ponder whether there might be a way to have my cake and eat it, too, with (a.) custom-domain iCloud Mail **and** (b.) MailMate **and** (c.) full online access to my old emails.
- "[Using iCloud Mail with a custom domain: the return](/posts/2022/09/using-icloud-mail-custom-domain-return/)" (<span class="nobrk">2022-09-15</span>) --- I found that MailMate's awesome mail-manipulation power was the answer to that need, as it manhandled the moving to iCloud Mail's infrastructure of every single one of my emails in a way that Apple Mail simply couldn't match.

And that gets us to where I am now: a re-return to Fastmail and, yes, the additional bucks I'll be paying each year for its subscription on top of what I'm already giving Apple for iCloud+.

Here are my main reasons why.

## IMAP angst

With iOS-based email clients in particular, the slowness of Apple's IMAP setup --- not to mention the relative inadequacies of IMAP in general --- caused a variety of glitchy behaviors that I'd never encountered with Fastmail.

And, yeah, it was *mostly* because of all those old emails, although not always. **But** if I can't keep in the *regular* "Archive" so much as just the last few months' worth of emails on a just-in-case basis without causing IMAP angst, what am I supposed to do when I'm away from the house (on a decent connection, to be fair) and *must* consult some email I got months ago? I'm willing to wait a little bit for an old email to appear, but the client shouldn't be thrashing around in agony while that occurs.[^infra]

[^infra]: I'll reiterate what I said in a footnote to "[Back to Fastmail](/posts/2022/08/back-to-fastmail/)": "It still staggers me that Apple, with its virtually unlimited financial resources, has a vastly slower email interface than does a small provider like Fastmail. I guess it's a matter of priorities; after all, customers' email is Fastmail’s only business, while it's probably only an afterthought for Apple."

Having never had more than a relatively tiny number of emails on iCloud Mail before all these maneuvers, I was simply unprepared for how inadequately the platform handled a much bigger load. Maybe somewhere there's a special enterprise tier of iCloud Mail  of which I'm not aware, but the consumer product just isn't up to the task --- not for me, anyway. I didn't know it before these last few months, but I know it now.[^transit]

[^transit]: Even after I'd safely imported my email archives back to Fastmail, I still found aggravation in how, when I tried to delete those old emails from iCloud Mail, it simply couldn't handle the process properly. I'd axe a few thousand and they'd *appear* to go away, only for some to **return** shortly thereafter because the iCloud server basically gagged on the job. (I spent hours with the whole delete-expunge-delete-expunge dance.) In my nearly five years with Fastmail, its JMAP-based implementation has never given me such troubles.

## False flags on spam

As I mentioned in "[Back to Fastmail](/posts/2022/08/back-to-fastmail/)," I didn't care for iCloud's notoriously ultra-aggressive spam-filtering. It frequently put perfectly legitimate stuff (including tests *from* me *to* me, for God's sake!) in the `Junk` folder, and what I read elsewhere[^DomLaut] about such behavior suggested it wasn't going to stop doing that.

[^DomLaut]: One especially useful reference was [Dominic Lauter](https://domlaut.com)'s "[iCloud+ Custom Email Domains should be better](https://domlaut.com/icloud-custom-email-domains-should-be-better/)" (2022-02-27). Although some issues he raised have since been resolved, I found great help in his explanation of *why* iCloud Mail in general behaves as it does --- a lot of which, as he noted, is due to its being front-ended by [Proofpoint](https://proofpoint.com/).

This presented me with two options. I could stop using iCloud Mail as my main provider, or I could set all my email clients to notify me every time some new email went straight into `Junk`.

Yeah, right.

## Worthiness

Apple does a magnificent job in providing many services, but its mail offering just doesn't meet my expectations. I gave it weeks to prove worthy, and it failed the test. Perhaps it would've fared better with somebody who relentlessly deletes all emails after reading them, rather than an email packrat like me; but I'm who I am and my provider has to handle that to my satisfaction, or it won't **be** my provider.

So, with the experiment now finally over, I'm back where I started. My eons' worth of emails reside once again on Fastmail. I'm happy and all my email client apps are happy.

Oh, also, my wallet will be a little lighter every year when the Fastmail sub comes due. Ah, well, you can't have everything.
