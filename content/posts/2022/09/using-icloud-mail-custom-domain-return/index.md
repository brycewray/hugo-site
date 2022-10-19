---
title: "Using iCloud Mail with a custom domain: the return"
description: "The moral of this story is that one shouldn’t make a decision based on a faulty diagnosis of a problem."
author: Bryce Wray
tags: [personal, email, apple, icloud, icloud-plus, icloud-mail, fastmail, apple-mail, mailmate, imap, jmap, dns]
date: 2022-09-15T08:16:00-05:00
#draft: true
initTextEditor: iA Writer # default --- change if needed
---

Not long ago, I described in [two](/posts/2022/06/using-icloud-mail-custom-domain/) [posts](/posts/2022/06/using-icloud-mail-custom-domain-following-up/) how I'd started using iCloud Mail with two custom domains. The problem with that, as I eventually came to see it, was that it precluded using my preferred email client, [MailMate](https://freron.com); so, a couple of weeks ago, I [undid that choice](/posts/2022/08/back-to-fastmail/) and moved those domains' email back to [Fastmail](https://fastmail.com).

As I [explained previously](/posts/2022/06/using-icloud-mail-custom-domain-following-up/), I'd failed to get my many years' worth of archived emails successfully moved from Fastmail to iCloud Mail, and thus couldn't access them via IMAP. MailMate uses only IMAP, as opposed to how the macOS Apple Mail app can access both IMAP-hosted and *locally* stored emails.

However, the problem with **that** was, as I decided earlier this week, I'd done a poor job of determining the *reason* why I couldn't move those emails (that is, other than because iCloud Mail is a lot slower than Fastmail, probably because the latter uses the IMAP-compatible [JMAP protocol](https://fastmail.blog/open-technologies/jmap-a-better-way-to-email/)).

This week, it hit me that I'd erred in trying to move the emails only by using Apple Mail. It's hardly a powerhouse app, especially compared to the heavyweight champion that is MailMate. Then, I wondered whether I could get MailMate to handle the move by **importing** from the existing local archives and then "negotiating" with the sluggish iCloud Mail more successfully than had Apple Mail.

Before I could test my theory, I had to figure out where those archives were in the first place; and, true to Apple's way of doing things with its native apps and platforms, the archives weren't easy to find. Specifically, they were in the `Library` in my user directory, nested in folders with long, "hash"-like names; *e.g.*, one path was:

```
~/Library/Mail/V9/96150452-89A7-4317-AB61-99666BAC4F90/
```

. . . but, fortunately, they were in [`.mbox` format](https://en.wikipedia.org/wiki/Mbox), which MailMate [imports without complaint](https://manual.mailmate-app.com/account_setup). *(It still took multiple days to complete all the uploads to iCloud Mail but, this time, every single one of those uploads worked.)* I sent the emails from each import to an appropriate, year-based Archive subfolder within my iCloud Mail setup, and all was good to go.

With everything (including more current emails, of course) moved over from Fastmail, the last step was to repeat what I'd done back in June: making actual DNS settings changes to point each domain back to iCloud Mail. As before, that step went smoothly. In fact, I did *both* domains within a half-hour of each other.

Thus, I will now amend the original close of my "[Back to Fastmail](/posts/2022/08/back-to-fastmail/)" post as follows:

> Whether there are any lessons in all this for others, I'm unsure. I guess they would come down to:
>
> - Custom-domain support on iCloud+ and iCloud Mail works well enough, if you want to give it a shot ~~*and* don't use MailMate~~.
> - But, if you ~~*do*~~ use MailMate ~~(or any other IMAP-only email client)~~, ~~stick with whatever you're using now~~ make sure you **first** use it, **not** the underpowered Apple Mail app, to move all appropriate emails from your previous provider to iCloud Mail **before** you make the big jump.
