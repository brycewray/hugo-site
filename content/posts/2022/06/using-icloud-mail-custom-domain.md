---
tags:
- post
- code
#note: other `tags`: img, YouTube, social, code
title: "Using iCloud Mail with a custom domain"
description: "It took Apple a while to get it (maybe) right — but, it’s “so far, so good” on something announced at last year’s WWDC."
author: Bryce Wray
date: 2022-06-13T13:26:00-05:00
#draft: true
#initTextEditor: iA Writer
---

I was excited a year ago when, at its 2021 Worldwide Developers Conference (WWDC), Apple [announced](https://9to5mac.com/2021/06/07/custom-domain-names-are-coming-to-icloud-mail-with-icloud/) that one feature of its [new extra-cost iCloud+ package](https://www.macrumors.com/2021/06/07/apple-announces-icloud-with-private-relay-more/) was support for *custom domains* in iCloud Mail.

Up to that point, only an `@icloud.com` address would work with this service[^meCom] but, now, people like me who got their email on one or more custom domains would be able to use those domains in connection with iCloud Mail. I knew I'd be an iCloud+ customer, anyway --- the bundled Apple services to which I'd already subscribed are cheaper via iCloud+ rather than as separate offerings --- so this additional benefit sounded like the feature which I'd long hoped Apple would provide.

[^meCom]: Well, of course, that's not counting those [legacy `@me.com` and `@mac.com` addresses](https://support.apple.com/en-us/HT201771) Apple issued many years ago, but I'm referring to *current* stuff.

As I'd mentioned in 2019's "[The holy mail](/posts/2019/05/the-holy-mail/)," one advantage I gained in my 2017 move from a generic [Gmail](https://en.wikipedia.org/wiki/Gmail) address to a custom-domain address (hosted by [FastMail](https://fastmail.com)) was that, if I ever wanted to change providers in the future, this never again would involve telling all my various contacts to use a new address. Instead, I simply would point the appropriate online records for the domain to the new provider, and everything would continue to work just fine.

Don't get me wrong; I've been mostly very satisfied with FastMail --- but it *is* about fifty bucks a year. That price includes many services that I rarely or never use and which, I think, seem more useful for businesses than individuals; so I took this Apple announcement as a way I might get out of that.

## As always, Reality ain't pretty

Unfortunately, the new custom-domains feature got a lot of mixed reviews[^reviews] when it went live later in 2021. Then, when I first tried it last October, certain resulting oddities gave me some qualms, so I quickly reverted the domain to my still-active FastMail account. In essence, there seemed to be some technical issues that Apple still hadn't resolved sufficiently to make the switch as clean, or as compatible with other email providers, as I'd hoped following the WWDC reveal.

[^reviews]: I'll leave it to you to find those reports. You won't have much difficulty, especially if you confine your searches to the second half of 2021.

In the ensuing months, I continued to monitor developments and, after reading various reports that iCloud Mail's custom-domains support seems now to be working more smoothly[^additions], I once again decided to give it a try. Last night, I pointed one of my two custom-domain email addresses to iCloud Mail. In fact, it's the address to which you can send by clicking that "Reply via email" link at the bottom of this post.

[^additions]: For example, see the endnote addenda to the otherwise "meh" review in [Dominic Lauter](https://domlaut.com/)'s "[iCloud+ Custom Email Domains should be better](https://domlaut.com/icloud-custom-email-domains-should-be-better/)."

Before you think, "Holy crap, he's spending $100 a year for personal email," please understand that this first domain I'm trying with iCloud Mail previously was just an [*alias* on FastMail](https://www.fastmail.help/hc/en-us/articles/360060591073-How-to-set-up-aliases). That means it already came with my existing fifty-dollar-a-year subscription. Speaking of email aliases: any custom-domain email you put on iCloud Mail is just an alias within *that* service, too[^oneMB]. At one time, that would've been a deal-breaker for me but, now, I don't care.

[^oneMB]: See "One Mailbox" under "The SPAM and the Ugly" in [Mike Lapidakis](https://mike.lapidak.is/)'s article from last November, "[Thoughts on Custom Domains in Apple's iCloud Mail](https://empty.coffee/thoughts-on-custom-domains-in-apple-icloud-mail/)."

<strong class="red">Important note</strong>: if you're doing the same --- bringing a FastMail alias over to iCloud Mail --- you'll want to kill **both** the alias **and** the alias's domain entry on FastMail. I found out the hard way that doing only the former but not also the latter, even if only to play it safe, can cause SNAFUs during the switchover process. If that sounds like too much of a jump off the bridge for you, remember that you can always reverse the process if necessary. It's tedious, but you can do it.
{.yellowBox}

## Progress report

It's early, so the proverbial jury is still out; but I've been pleased so far. With a domain like this one, whose various [MX](https://en.wikipedia.org/wiki/MX_record) and other records are hosted by [Cloudflare](https://cloudflare.com), the Apple switchover process seems much less manual than what I encountered last October, so perhaps Apple listened to the community complaints and shored up things in the meantime. And, as for the nitty-gritty of actually *using* the thing: when I send emails to the address from various other-domain addresses to which I have access (long story), everything goes back and forth without any trouble.

It remains to be seen whether I'll also switch my *other* address, the Big Kahuna that serves me in all aspects of life *other than* interactions with you folks who kindly visit this website. As you can well imagine, it will depend in great measure on how things go with this first one. I have a few months before my FastMail subscription would auto-renew, so I'll have plenty of time to make a reasoned evaluation and act accordingly.

I'll let you know how it goes.