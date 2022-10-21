---
title: "HardyPress: WP + SSG with a twist"
description: Here’s a brief look at an interesting way to have your WordPress cake and eat your SSG site, too — or something like that.
author: Bryce Wray
date: 2018-09-15T08:28:17-05:00
---

While researching the static-site generator (SSG) scene for the first time in a while yesterday, I happened upon  [HardyPress](https://www.hardypress.com).

It's an interesting proposition: it takes the whole WordPress-to-SSG idea one step further. HardyPress keeps your WordPress install on a hidden location where you edit to your heart's delight, and only **then** does the content get on the web --- but as *static* files. So you get the advantage of ease-of-use in WordPress and the security of SSG.

In addition, they host it on a CDN that, as nearly as I can tell, uses Amazon to hit 30 edge servers worldwide. They even provide SSL certs so you can avoid the nasty red blot on Chrome, Firefox, and other HTTPS-savvy browsers.
