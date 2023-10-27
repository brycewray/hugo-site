---
title: "New life for the old Mac with Linux"
description: "A combination of Fedora, Proton, and the inevitable tinkering process produces amazing results."
author: Bryce Wray
date: 2023-08-19T16:22:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
imgs:
- 2023-08-19-1531CDT_Spyro-Fedora_1920x1118.png
---

Although I thoroughly enjoy [my new Mac setup](/posts/2023/07/making-good-move/), I've continued to wonder about the computer it replaced. Specifically, I've pondered how to get Linux running satisfactorily on my mid-2017 iMac and, perhaps, still wring some good times out of its impressive hardware. The initial attempts didn't go well.

That's changed. Big-time.

<!--more-->

For those who don't know, it's common for a Linux distribution ("distro") to let you download an ISO image and burn it to a USB stick, so you can boot the distro in test-drive mode. This lets you see how the distro runs on your computer before actually installing it.

It's how I tried multiple distros on the iMac. With each such test, I encountered the same result: everything looked great and worked well, *except* for the iMac's built-in audio. The audio didn't work at all. Each distro detected only what it identified as a "dummy output."

This is a known issue, caused by lack of support for a specific audio configuration on Macs. There's a [GitHub repo with a fix](https://github.com/davidjo/snd_hda_macbookpro). It provides not only a driver patch but also scripting to help you install it[^patch] on four different types of Linux distros. However, you can try it only with a real installation because you have to reboot the system afterward, and rebooting a test drive takes you back to Square One.

[^patch]: Just be sure to add ` patch` to the end of the line that downloads the necessary commands because, unless your Linux distro already has the `patch` command, the final script will fail when it attempts to do the actual patching. (Reading [Issue #55](https://github.com/davidjo/snd_hda_macbookpro/issues/55) for the repo is how I got past this particular part.)

Realizing I'd now have to cross the Rubicon, I created a partition on the iMac's drive and then installed a Linux distro on that partition. Then, I ran the fix script and rebooted.

However, it was "no joy" the first several times. Most of those failed attempts involved [Debian](https://debian.org)-based distros --- [Ubuntu](https://ubuntu.com), [Pop!_OS](https://pop.system76.com), and even Debian itself --- while one took place on the [Arch](https://archlinux.org)-based [Manjaro](https://manjaro.org). Finally, I tried it on [Fedora](https://fedoraproject.org).

Success! Profit! Joy!

Now enjoying full functionality, I tried a Linux capability which had long intrigued me: running [Steam](https://store.steampowered.com/)-hosted Windows games via the [Proton compatibility layer](https://www.protondb.com/). In particular, the one I wanted to use was [Spyro Reignited Trilogy](https://www.spyrothedragon.com/). It's the 2018--2019 "reimagining" of the first three Spyro the Dragon games, all family favorites from over twenty years ago.

And it worked!

{{< img src="2023-08-19-1531CDT_Spyro-Fedora_1920x1118.png" alt="Screen capture of Steam-hosted “Spyro Reignited Trilogy” game running in Proton compatibility layer on Fedora 38 Linux on a mid-2017 iMac" nobkgd=true >}}

While I'd been able to run Trilogy on the *new* Mac in Windows 12 via [Parallels Desktop](https://www.parallels.com/products/desktop/)[^AAA], there are just enough glitches in the ARM version of Windows that Trilogy would crash at odd times, especially in certain sections of the game. Now, running in Fedora via Proton --- not to mention, with the full power of the old iMac's Intel i7 and 64 GB of RAM --- Trilogy works amazingly well and with nary a crash, at least so far. Indeed, I had more trouble with getting my Bluetooth game controller to link reliably with Fedora.[^controller] I did limit a few graphics settings to lower the thermal load on the old Mac so it won't be frequently running its fans at high speed, but everything still looks great and is exceedingly playable.

[^AAA]: It's the game to which I referred in [my post about switching over to the new Mac](/posts/2023/07/making-good-move/).

[^controller]: The resolution to that problem was downloading [another driver](https://github.com/atar-axis/xpadneo) and then updating the controller's firmware (within the [XBox Accessories app](https://apps.microsoft.com/store/detail/xbox-accessories/9NBLGGH30XJ3) running in Windows via Parallels Desktop on the new Mac).

Don't be misled: all the arcane fixes I'm employing to keep Linux running properly on the iMac make me appreciate even more the solidity and, yes, unified environment of macOS running on my new Mac. **But**, finally free to have a full installation of Linux on the old Mac after previously using only a very limited emulation within Parallels Desktop, I am having lots of nerdy fun and enjoying what today's Linux can do, too.
