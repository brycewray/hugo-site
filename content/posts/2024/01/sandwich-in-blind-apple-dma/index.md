---
title: "A sandwich in the blind: Apple and the DMA"
description: "Take note of this possibly unexpected ripple effect of Apple’s response to the EU."
author: Bryce Wray
date: 2024-01-26T11:00:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

Imagine this. Somebody blindfolds you and shoves you up against what feels like a kitchen countertop. Then he jams a pistol against your ribs and growls: "Within your reach are a loaf of bread, some cooked ham, a block of cheese, and a *very* sharp knife.

"Now, make me a perfect ham-and-cheese sandwich --- *or else*."

I feel that's somewhat similar to the scenario that will soon confront any web developer who's *not* based in the European Union, due to [Apple's newly announced plan](https://www.apple.com/newsroom/2024/01/apple-announces-changes-to-ios-safari-and-the-app-store-in-the-european-union/) for complying with the [EU's Digital Markets Act](https://ec.europa.eu/commission/presscorner/detail/en/QANDA_20_2349) (DMA).

<!--more-->

Apple's announcement has received a lot of negative feedback, chiefly because of its [financial effect on those who develop apps for iOS and iPadOS](https://www.macstories.net/news/apple-details-how-it-plans-to-comply-with-the-eus-digital-markets-act/). However, the Apple response likely will have a greater ripple effect on *all* web development. It could, in fact, be seismic.

I said the following today in a comment on a [Mac Power Users](https://talk.macpowerusers.com) [thread](https://talk.macpowerusers.com/t/apple-announces-changes-to-ios-safari-and-the-app-store-in-the-european-union) about the Apple announcement:

> As has been noted elsewhere, this will now complicate things for **non**-EU web developers, because they won't be able to test on the non-WebKit iOS browsers. While sticking rigidly to "best practices" is always advisable, there still will always be quirks in certain configurations that one truly must see for oneself.
>
> The obvious solution is for Apple to allow the entire world to have this freedom regarding browser engines on iOS, but I wouldn't bet on that happening any time soon, especially in view of the apparently deliberate narrowness of this response (some have called it "malicious compliance") concerning the EU requirements.

After Apple's actions take effect in a few weeks (due to a DMA-imposed deadline), non-EU web developers will be under pressure to make their websites work properly on any of [multiple browsers from which EU-based users will be able to choose](https://www.macstories.net/news/apple-shares-list-of-alternate-browsers-that-will-be-available-to-eu-users-in-ios-17-4/). The problem with that is: these devs will still be forced to use iOS browsers, or simulations thereof, that are actually just the WebKit-driven Safari under the hood; so how can they realistically account for the various differences that will almost certainly exist among all those different browsers?[^noiOS]

[^noiOS]: Of course, if websites suddenly just ignore the presence of iOS in the EU, that would "solve" the problem in a way, but one doubts that's a wise strategy. After all, [as of now](https://gs.statcounter.com/os-market-share/mobile/europe), iOS is present on about a third of the hundreds of millions of mobile devices in the EU. That would be a ton of potential customers for businesses to ignore.

Thus, typical non-EU web devs soon will, indeed, be forced to make perfect ham-and-cheese sandwiches in the blind, *very* sharp knives or no. Bleeding fingers, messy kitchen countertops, and quite imperfect sandwiches are the likely result.

Stay tuned.
