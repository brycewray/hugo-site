---
title: "Gems in the rough #7"
description: "Static site generator fans, here’s another (sorta) brief set of goodies for your edification."
author: Bryce Wray
date: 2021-07-17T14:23:00-05:00
---

Each entry in the "Gems in the rough" series is a collection of tips, explanations, and/or idle observations which I hope will be at least somewhat useful to those of you with websites built by [static site generators (SSGs)](https://jamstack.org/generators).
{.box}

## Eleventy Meetup #1

The inaugural **[Eleventy Meetup](https://11tymeetup.dev/)** occurred earlier this week, and it was a blast. We heard interesting talks from [Eleventy](https://11ty.dev) creator [Zach Leatherman](https://zachleat.com) and [Mike Aparicio](https://twitter.com/peruvianidol) of [11ty.recipes](https://11ty.recipes) fame (and Mike's dog, too, albeit briefly). A good time was had by all. If you have the slightest interest in Eleventy, I urge you to check the [Meetup site](https://11tymeetup.dev) and sign up for the newsletter so you can be advised of future sessions.

## Firefox slips further

Things are not great in the world of [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/) right now, and they got even sadder this week with news that, according to [StatCounter](https://gs.statcounter.com/browser-market-share), Firefox's share of the browser market in June dipped below that of [Microsoft Edge](https://www.microsoft.com/en-us/edge) and is nearing that of the [browser that ships with Samsung phones](https://en.wikipedia.org/wiki/Samsung_Internet) (which I'd guess many Samsung users eschew in favor of, yep, [Chrome](https://www.google.com/chrome/)):

{{< imgc src="2021-07-17_StatCounter-browser-mkt-shr_June-2021_1872x576.png" alt="Screen capture of StatCounter’s June 2021 display of worldwide browser market share" width=1872 height=576 >}}

As for the elephant in the room represented by these numbers: we've clearly reached a phase of browser use like that of the "Internet Explorer *is* the internet" days where Chrome's massive and *non*-imperiled market share is concerned. Barring outside action by regulators that could affect this in ways not currently expected, I guess we who build websites will just have to hope our [new insect overlords](https://knowyourmeme.com/memes/i-for-one-welcome-our-new-insect-overlords) don't abuse this. (Yeah, right.)

## Azure Static Web Apps

It escaped my notice until this week that Microsoft's [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/) service [has been in general availability for two months](https://azure.microsoft.com/en-us/blog/develop-production-scale-modern-web-apps-quickly-with-azure-static-web-apps/). On learning this, I decided to give ASWA a try with the same Eleventy-based test repo I use on various [Jamstack](https://jamstack.org)-savvy hosts.

Getting signed up was, well, challenging, as one tends to find for most things [Azure](https://azure.microsoft.com/en-us/); and the build process was lengthy[^ASWAslowbuild] and supports only a limited number of SSGs, *not* including Eleventy as of now. Still, I got it going.

In my tests so far, the ASWA site's performance is so-so, especially compared to that of hosts with *far* less up-front hassle. It's not terrible, but I'd have expected more from an Azure-hosted site. Will keep a watch on it but, for now, I'm of the opinion that Microsoft is content to let the usual Jamstack hosts lead the way since ASWA probably doesn't fit its business model all that well.

[^ASWAslowbuild]: To be fair, I should note that it depends on [GitHub Actions](https://github.com/features/actions), which in my experience adds about ninety to 120 seconds to the process on its own. That said, a build process taking nearly three times as long on ASWA compared to a similarly GitHub Actions-fueled one on a [CloudFlare Workers site](https://workers.cloudflare.com) doesn't augur well for Microsoft's setup right now.

## Comment-by-email

On one of my at-least-daily visits to the [Eleventy Discord](https://www.11ty.dev/blog/discord/), I noticed a link to "[Emails, not comments](https://luke.work/blog/2021/07/alternative-to-comments/)" by [Luke Harris](https://twitter.com/lkhrs). The article described how, having decided not to have a commenting platform on his Eleventy site anymore, Mr. Harris made it a one-click action for anyone to reply to his articles by email. (He'd probably want me to add that he got the idea from [Kev Quirk's site](https://kevq.uk/), as the linked article duly notes.)

The process was both appealingly simple and, to me, geekily interesting; so I stole, um, adopted his approach --- as you can see at the bottom of this post, as well as all other pages on the site using the same template. Thank you, sir!
