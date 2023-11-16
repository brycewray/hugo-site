---
title: "Take note of this new Bitwarden script"
description: "A very brief bit of advice for your web dev work."
author: Bryce Wray
date: 2023-11-10T06:20:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

This one's a quickie, repeating something I posted on social media a short time ago. [Bitwarden](https://bitwarden.com) has changed its browser extension in a way which affects how you might measure a web page's size. Since that's something that web devs typically do to make sure their sites load as well as possible, I thought this information was worth passing along.

<!--more-->

The post shown below is from Mastodon; and I put appropriately revised versions thereof on Bluesky and Threads, as well.

{{< stoot instance="fosstodon.org" id="111386136804353661" >}}

<!--
The @bitwarden browser extension now injects `page-script.js` (437 Kb) into each page. It’s apparently due to Bitwarden’s recently added support for passkeys.

If you use this extension and are trying to measure your pages’ download size, be sure to filter out this script by name in the Inspector view of your preferred browser **or** just use Inspector within a private/“incognito” tab/window.

#WebDev #WebDevTips #HTML #JS #JavaScript #Bitwarden #Browser

https://fosstodon.org/@BryceWrayTX/111386136804353661\
2023-11-10-0559CST


The Bitwarden browser extension now injects `page-script.js` (437 Kb) into each page. It’s apparently due to Bitwarden’s passkeys support. When measuring pages’ download size, filter out this script by name in the Inspector **or** use Inspector within a private/“incognito” tab/window.

https://bsky.app/profile/brycewray.com/post/3kdtgewhfdd2l
2023-11-10-0601CST [shorter due to Bluesky's more restrictive character-count limit]

The Bitwarden browser extension now injects `page-script.js` (437 Kb) into each page. It’s apparently due to Bitwarden’s recently added support for passkeys.

If you use this extension and are trying to measure your pages’ download size, be sure to filter out this script by name in the Inspector view of your preferred browser **or** just use Inspector within a private/“incognito” tab/window.
#WebDev #WebDevTips #HTML #JS #JavaScript #Bitwarden #Browser

https://www.threads.net/@brycewraytx/post/Czdv4GfrqXe
2023-11-10-0602CST

-->
