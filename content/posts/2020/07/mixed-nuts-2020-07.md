---
layout: singlepost
tags: post
title: "Mixed nuts • July, 2020"
description: "Another successful lowering of the bar where observations’ cleverness is concerned."
author: Bryce Wray
date: 2020-07-09T16:40:00-05:00
lastmod: 2020-08-30T15:40:00-05:00
discussionId: "2020-07-mixed-nuts-2020-07"
featured_image: "nuts-5503118_6000x4000.jpg"
featured_image_width: 6000
featured_image_height: 4000
featured_image_alt: "Concept image: mixed nuts on a tabletop"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/ka_re-14461006/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5503118">Kai Reschke</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5503118">Pixabay</a></span>
---

It's true that it hasn't been all that long since the [most recent](/posts/2020/05/mixed-nuts-2020-05/) edition of "Mixed Nuts," but you're here reading and I'm here tossing off drivel---and, well, that's a quorum, right?

Without further preamble, off we go.

-------

For all the hoo-rahing about the [$15/month price increase by YouTube TV](https://www.theverge.com/2020/6/30/21308449/youtube-tv-price-increase-64-99-viacom-hbo-new-channels), I'm unconvinced by those who say they can do better by going back to cable. If it had been that affordable, they wouldn't have left it in the first place.[^notLeaving]

[^notLeaving]: As for my household, we're keeping YTTV unless and until it goes much higher. None of its competitors has YTTV's mix of channels and features, notably the virtually unlimited cloud DVR that had my wife sold in the first week after we became subscribers. Also, we Tornado Alley residents like getting to see our local channels’ weather guys and gals when times call for it.

*A little bird told me some interesting performance enhancements are coming, soon, to that single line of code that makes [Fathom Analytics](/posts/2020/06/fathom-analytics-count-on-it/) work on one's site. This product is already amazing, and now it will get even more so. [Check it out](https://usefathom.com/ref/ZKHYWX).[^affilFA]*

[^affilFA]: Affiliate link. If you use it to get started with Fathom, you'll receive a $10 credit on your first invoice and I'll get a commission.

While I'm on the subject of "little birds": our new granddaughter, whom I [dubbed a "sweet little early bird"](/posts/2020/03/welcome-sweet-little-early-bird/) upon her slightly premature birth back in March, is doing just fine. She's also quite popular with her family's pets, like John, the very protective dog shown here at her side a few weeks ago:

{{< imgc src="2020-06-23_Kennedy-Beck_and_John-the-dog_3200x2400.jpg" alt="A baby, Kennedy Beck, with one of her family's dogs" width="3200" height="2400" >}}

*I recently managed to achieve a slight performance boost for this site by dropping [Google Fonts](https://fonts.google.com) and [Flying Pages](https://npmjs.com/package/flying-pages), a [preloader](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) script. You may have better luck. (**Note, 2020-08-30**: Check "[Google Fonts and privacy](/posts/2020/08/google-fonts-privacy/)" and "[Good stuff without Google](/posts/2020/08/good-stuff-without-google/)" for more on the web fonts front where this site is concerned.)*

If you want an interesting and, yes, cool way to test **your** site's get-up-and-go, check out [this article](https://www.zachleat.com/web/speedlify/) by [Eleventy](https://11ty.dev) creator Zach Leatherman about his new tool, [Speedlify](https://github.com/zachleat/speedlify). He even makes it easy to publish a Speedlify instance on [Netlify](https://netlify.com) for automated testing, if you prefer not to do it manually (and/or leave it running all the time) on your local computer.

*This is an interesting time to be a Mac user, given the [confirmation](https://www.apple.com/newsroom/2020/06/apple-announces-mac-transition-to-apple-silicon/) at [WWDC 2020](https://developer.apple.com/wwdc20/) that the Mac platform is transitioning from Intel CPUs to Apple Silicon. Having been through the two other big Mac CPU transitions Apple has executed in recent memory---Motorola to PowerPC in the 1990s, and PowerPC to Intel in the mid-2000s---I am excited for this one and eager to see what, for example, the 2022 Mac lineup will offer.*

I'm happy about another thing announced, although with much less fanfare, at WWDC: [notable improvements to Apple's Safari web browser for macOS and iOS](https://www.zdnet.com/article/safari-14-removes-flash-gets-support-for-breach-alerts-http3-and-webp/). These additions are long overdue but still quite welcome, especially given Safari's prominent role in mobile browsing.

*If you move your website, as I just [moved this one](/posts/2020/07/goodbye-hello/), be sure that, **first**, you check the Time to Live (TTL) of each current DNS record for your site's domain. If the TTL is longer than `3600` (meaning 3,600 seconds, or one hour), change it to that setting or shorter, so you'll see the fastest possible propagation when you set DNS records to point your domain to the new place.[^propagation]*

[^propagation]: Just remember that the propagation may still stretch to a day or two worldwide, worst-case, although it'll **more usually** be only an hour or so, especially if you're using one of the major registrars. I recently switched from the very capable [Namecheap](https://namecheap.com) to [Google Domains](https://domains.google.com) in part because, with the latter, you're one step closer to Google's DNS setup that, apparently, many of the world's domain name servers "obey" when it sends word of new or changed DNS records. When I pulled the trigger to move this site to [Vercel](https://vercel.com) a few days ago, I was pleased but stunned to see the propagation occur within *five minutes*. YMMV and all that, but *wow*.

At least one oddly good thing has come out of the awfulness of [COVID-19](/posts/2020/03/coherence-covid-19/): the realization at long last of how much office space in major metro areas is **totally unnecessary**. Telecommuting is good for the environment and, for those with the discipline and focus, boosts both morale and productivity.
