---
title: "1Password adds script"
description: "If you count your JavaScript load, be aware of this recent change to the 1Password browser extension."
author: Bryce Wray
date: 2024-09-14T12:54:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

In much the same way as I [previously](/posts/2023/11/take-note-new-bitwarden-script) decided to advise of a [Bitwarden](https://bitwarden.com/) script that could inflate your JavaScript load, here's some word of an apparently recent change to the [1Password](https://1password.com) browser extension.

<!--more-->

Here's what I posted on social media earlier about this:

{{< stoot instance="fosstodon.org" id="113137127269322312" >}}

<!--

The @1password browser extension adds `injected.js` (674 Kb) to each page.

If you use this extension and are trying to measure your pages’ download size, be sure to filter out this script by name in the Inspector view of your preferred browser **or** just use Inspector within a private/“incognito” tab/window.

#WebDev #WebDevTips #HTML #JS #JavaScript #1Password #Browser

https://fosstodon.org/@BryceWrayTX/113137127269322312

2024-09-14-1239CDT

-->

