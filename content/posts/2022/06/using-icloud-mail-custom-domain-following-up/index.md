---
title: "Using iCloud Mail with a custom domain: following up"
description: "What happened when I moved my main email address to iCloud Mail."
author: Bryce Wray
date: 2022-06-19T11:27:00-05:00
lastmod: 2022-08-30T13:39:00-05:00
#initTextEditor: iA Writer
discussionId: "2022-06-using-icloud-mail-custom-domain-following-up"
---

Here's how I ended my [initial "Using iCloud Mail with a custom domain" post](/posts/2022/06/using-icloud-mail-custom-domain/):

> It remains to be seen whether I'll also switch my *other* [email] address, the Big Kahuna that serves me in all aspects of life *other than* interactions with you folks who kindly visit this website. As you can well imagine, it will depend in great measure on how things go with this first one. I have a few months before my Fastmail subscription would auto-renew, so I'll have plenty of time to make a reasoned evaluation and act accordingly.
>
> I'll let you know how it goes.

Two days later, after encountering zero non-self-inflicted problems with the first domain I'd moved to iCloud Mail, I decided to take the plunge with the main email domain, too. Here's my promised follow-up about the results.

----

Moving my primary email address's domain to iCloud Mail worked fine. What **didn't** was moving all the IMAP-based old emails --- tens of thousands of them, dating back to 1995 --- from Fastmail to iCloud Mail. Uploading to or downloading from Fastmail is, indeed, very fast. However, while downloading *from* iCloud Mail to local storage is fast enough, uploading *to* iCloud Mail or moving things from one iCloud Mail IMAP "folder" to another[^IMAPmove] tends to be **agonizingly** slow. That appears to be the case regardless of how many emails you try to make it handle at a time, so going in blocks of a hundred or so doesn't help much, except perhaps in causing fewer server errors. (And, hey: when you're talking tens of thousands, even if a-hundred-at-a-time works perfectly, that's still a **lot** of hundreds to manage. It's a case of dying by a thousand cuts.)

[^IMAPmove]: Even **deleting** things constitutes a *move* as far as IMAP is concerned, so that's not the swifter option for which I hoped.

After days of struggling to get the emails moved to the right places, and seeing that my iDevices weren't having any of it anyway, I decided it wasn't really necessary for **all** my devices to have full access to every email I'd ever sent or received. Instead, I'll just keep everything from prior to this year in *local* archive folders on my Mac, where my [usual backup procedures](/posts/2019/02/back-up-jack/) will protect it. For safety's sake going forward, I'll keep a few months' worth of mail in iCloud Mail's IMAP Archive "folder," occasionally downloading older emails to local storage to keep the iCloud Mail Archive cleaner (and, thus, easier for my iDevices' "pulls" from it).

This causes one notable bit of collateral damage: a go-mainly-local approach isn't compatible with my continued use of [MailMate](https://freron.com), which is IMAP-only and --- according to multiple statements over the years from its developer --- will stay that way. Consequently, from here, I'll likely be using Apple Mail on the Mac, since it works pretty seamlessly with both IMAP-based email and locally archived email.

After several days of use, I can report that the transferred domain works perfectly fine under iCloud Mail. Accordingly, I **probably** can drop Fastmail when that subscription ends later this year.[^probably] I do plan to keep the latter live, for now, just in case. Besides, [Fastmail doesn't refund payments for the unused remainder of a dropped subscription](https://www.fastmail.help/hc/en-us/articles/1500000277342-Canceling-accounts-and-deleting-users), so I have no financial incentive to kill the sub before the actual expiration date.[^annual]

[^probably]: I say "probably" because, well, there's always a chance something will make me want to back off from the iCloud Mail implementation, although *so far* I haven't seen any reasons (other than my surprise at and distaste for iCloud Mail's slowness during mass-move operations) to do so. Still, again quoting my earlier post: ". . . you can always reverse the process if necessary. It's tedious, but you can do it."

[^annual]: I'd paid for a year in advance to get a discount, as I've done annually since choosing Fastmail in late 2017.

So that's how it's gone for me. The bottom line comes down to these points:

- The moving process is fine, and Apple does seem to have cleared up many if not all of the kinks which plagued such moves last year.
- If you're an email packrat as am I, don't try to move all your emails from the old host to iCloud Mail. Instead, move only those you utterly need to appear on a cross-devices basis, and archive the rest locally.
