---
title: "Take note of this new Bitwarden script"
description: "A very brief bit of advice for your web dev work."
author: Bryce Wray
date: 2023-11-10T06:20:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

This one's a quickie, repeating something I posted on social media a short time ago. [Bitwarden](https://bitwarden.com) has changed its browser extension in a way which affects how you might measure a web page's size. Since that's something that web devs typically do to make sure their sites load as well as possible, I thought this information was worth passing along.

<!--more-->

The text shown below is from a toot on Mastodon[^leftFosstodon]; and I put appropriately revised versions thereof on Bluesky and Threads, as well.

[^leftFosstodon]: No longer viewable there as of 2025-04-26.

> The @bitwarden browser extension now injects `page-script.js` (437 Kb) into each page. It’s apparently due to Bitwarden’s recently added support for passkeys.
>
> If you use this extension and are trying to measure your pages’ download size, be sure to filter out this script by name in the Inspector view of your preferred browser **or** just use Inspector within a private/“incognito” tab/window.
>
> #WebDev #WebDevTips #HTML #JS #JavaScript #Bitwarden #Browser
>
> <span class="pokey">2023-11-10-0559CST</span>

