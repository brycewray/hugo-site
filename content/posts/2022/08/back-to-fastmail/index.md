---
title: "Back to Fastmail"
description: "For a variety of reasons, I revert to the email provider I’ve trusted for nearly five years — and an email client I’ve loved for over three years."
author: Bryce Wray
date: 2022-08-30T15:01:00-05:00
#initTextEditor: iA Writer
---

My email has come home to [Fastmail](https://fastmail.com).

Back in June, I issued [two](/posts/2022/06/using-icloud-mail-custom-domain/) [posts](/posts/2022/06/using-icloud-mail-custom-domain-following-up/) about my having taken advantage of Apple's support, [first announced at WWDC 2021](https://9to5mac.com/2021/06/07/custom-domain-names-are-coming-to-icloud-mail-with-icloud/), for custom domains in iCloud Mail via Apple's iCloud+ package. In the ensuing few weeks, I had both of my email domains --- the one you reach by [contacting me](/contact/) and, more important to me, my **main** email domain --- running on Apple's setup.

Still, as I noted in both of those earlier posts, my current Fastmail subscription had a few months to go before renewal time, so switching back to it remained a (fairly) easy option if I so decided, as I now have.

Here are the factors I took into account.

First, for those of you who are considering the iCloud+ route for your own custom domain(s), be assured that my experience therein went just fine. Given the pre-known caveats that (a.) I had to accept having my custom domains be essentially only aliases for iCloud Mail and (b.) iCloud is a bit too aggressive about deciding some emails are spam, all worked quite smoothly. As far as I know, I had no trouble sending or receiving emails using either of the two domains. In short: this return to Fastmail is definitely **not** because of any problems I had with my custom domains' being on iCloud Mail.

So why, then, did I go back?

For one thing, you may recall my [noting](/posts/2022/06/using-icloud-mail-custom-domain-following-up/) that, due to the excruciatingly slow process of moving decades' worth of IMAP-based emails from Fastmail to iCloud Mail, I'd given up on that and chosen, instead, to perform *local* archiving of all but the current year's bunch. As a result:

> This causes one notable bit of collateral damage: a go-mainly-local approach isn't compatible with my continued use of [MailMate](https://freron.com), which is IMAP-only and --- according to multiple statements over the years from its developer --- will stay that way. Consequently, from here, I'll likely be using Apple Mail on the Mac, since it works pretty seamlessly with both IMAP-based email and locally archived email.

Well, sir, there was just one big problem with that: for [over three years now](/posts/2019/06/ahoy-mate/), I've **really** liked using MailMate. And, while Apple Mail is okay and I could live with it, I'd simply missed all the extra capabilities MailMate has always provided. The only way to get them back was, yep, to go back to having all my emails out in IMAP space.[^AvsFM]

[^AvsFM]: Uploading archived emails *back* to Fastmail went *much* more quickly than all my abortive efforts to put them on iCloud Mail. It still staggers me that Apple, with its virtually unlimited financial resources, has a vastly slower email interface than does a small provider like Fastmail. I guess it's a matter of priorities; after all, customers' email is Fastmail's only business, while it's probably only an afterthought for Apple.

One other factor, although not nearly as significant, was the [Masked Email integration](https://blog.1password.com/fastmail-masked-email/) between Fastmail and [1Password](https://1password.com), my [password manager of choice](/posts/2022/05/gems-in-rough-18/#loose-ends). While there's a somewhat similar provision in Apple's [Hide My Email service](https://support.apple.com/en-us/HT210425), Masked Email is [considerably more feature-filled](https://www.coywolf.news/productivity/fastmail-masked-email-privacy-service-1password-integration/) *and*, I think, easier to use. Moreover, unlike Hide My Email, Masked Email isn't tied to the Apple ecosystem, should I ever need to stray therefrom. (I've currently no intention of doing so, but --- just sayin'.)

Finally: while I [originally said](/posts/2022/06/using-icloud-mail-custom-domain/#as-always-reality-aint-pretty) that leaving iCloud Mail for one's previous provider was "tedious," I actually found that **not** to be the case where returning to Fastmail was concerned. In the case of the `brycewray.com` domain, I had only to make a few quick changes to its related DNS records. As my main address's domain, I simply went back to having Fastmail handle *all* its DNS records, which made that return even more of a no-brainer. While I'd found the Fastmail-to-iCloud-Mail switch a little nerve-wracking for a few minutes, the iCloud-Mail-to-Fastmail switch was virtually painless, not to mention super-swift. (Of course, for each domain, I [refreshed the caches on the "big three" DNS resolvers](/posts/2020/12/gems-in-rough/#dns-cache-whatnbspdnsnbspcache) to speed things along even more.)

Indeed, the only glitch I encountered in the whole process was in using Apple's Mac Mail app, not anything relating to either iCloud Mail or Fastmail. After the switch, I tried sending a test email to my regular `@icloud.com` email address from one of the returned domains, but Fastmail kept rejecting the attempt due to a failure of SMTP authentication. It appeared I had all the right passwords[^FMPW] and settings, but I dug a little deeper and found that for Mac Mail, you have to use the **Edit SMTP Server List** feature to set **Authentication** to *Password*. Fortunately, MailMate still "remembered" its previous SMTP settings from the last time I'd used it with Fastmail, so the old champ gave me no truck whatsoever.

[^FMPW]: Fastmail requires you to set an [*app password*](https://www.fastmail.help/hc/en-us/articles/360058752854) for each non-Fastmail app you use to access the service but, of course, I'd already taken care of that long ago on all my apps and devices.

Whether there are any lessons in all this for others, I'm unsure. I guess they would come down to:

- Custom-domain support on iCloud+ and iCloud Mail works well enough, if you want to give it a shot *and* don't use MailMate.
- But, if you *do* use MailMate (or any other IMAP-only email client), stick with whatever you're using now.

**Update, 2022-09-15**: Ahh, well, my future self [begs to differ](/posts/2022/09/using-icloud-mail-custom-domain-return/).
{.yellowBox}
