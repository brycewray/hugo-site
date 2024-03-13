---
title: "New advantages for the KeePass way"
description: "If you like having more control over your passwords, things are getting better for you."
author: Bryce Wray
date: 2024-03-11T14:51:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
imgs:
- 2024-03-10_keepassxc-2-7-7-import-wizard_1404x929.png
- 2024-03-11_Strongbox_WiFi-Sync_1356x1034_edited.png
---

When I've [previously](/posts/2021/06/two-paths-password-management/) [written](/posts/2021/08/1password-hits-fan/) about password management, I've usually divided my explanations evenly between two approaches to handling it: the [KeePass](https://keepass.info) way and the non-KeePass way. This time, though, I feel obliged to spend the whole post on the KeePass way, where some recent app improvements have sweetened the deal for those who might find it *their* way.

<!--more-->

Among the challenges I've identified for the KeePass way were (a.) migration from the non-KeePass way and (b.) cross-device sync. Here's how two major apps in the KeePass-compatible arena have addressed these lately.

## One "way" or the other

Perhaps the most widely touted feature of [v.2.7.7](https://keepassxc.org/blog/2024-03-10-2.7.7-released/) of the FOSS, cross-platform [KeePassXC app](https://github.com/keepassxreboot/keepassxc) may be its new support for [passkeys](https://fidoalliance.org/passkeys/). However, what I found most compelling is its tremendously enhanced ability to import data from [1Password](https://1password.com) and [Bitwarden](https://bitwarden.com), perhaps the two biggest names from the non-KeePass way of password management.

It's always been *sort of* possible to bring in credentials data from these sources, but often only through CSV files --- which tended to result in a messy, lossy, and overly manual importation process. Now, KeePassXC can import from more of 1Password's proprietary export formats (as well as Bitwarden's encrypted JSON exports), making for a much cleaner and more comprehensive result.

![Screen capture of KeePassXC v.2.7.7 Import Wizard](2024-03-10_keepassxc-2-7-7-import-wizard_1404x929.png "KeePassXC v.2.7.7 Import Wizard.\
Image: [KeePassXC blog](https://keepassxc.org/blog/).")

While the Apple-only [Strongbox](https://strongboxsafe.com) app has also been stepping up its importation game in the last couple of years, the ability of KeePassXC to run on just about any desktop or laptop computer guarantees the significance of the latter app's continued existence, development, and improvement.

## Singin' the same song

Some adherents to the KeePass way are extremely reluctant to put their secrets on any cloud storage, which makes it difficult or impossible for them to synchronize their passwords among multiple devices. As you can imagine, this can be a severe disincentive to those who might already be doubting their choice of password management approaches --- or, in extreme cases, whether the whole thing is worth the trouble.

But, for any KeePass way aficionado who wants to sync passwords among Apple devices, there's relief in Strongbox's [Wi-Fi Sync](https://strongboxsafe.com/updates/wi-fi-sync/) feature.[^notFree] It syncs KeePass-compatible data among all such devices using the same network, requiring no cloud storage of any kind. And don't be misled by Wi-Fi Sync's name: it works even for a device using a hard-wired connection.

[^notFree]: Requires purchase of [Strongbox Pro](https://strongboxsafe.com/pro/).

{{< img src="2024-03-11_Strongbox_WiFi-Sync_1356x1034_edited.png" alt="Edited screen capture of Strongbox Wi-Fi Sync settings" rounds=true >}}

StrongBox Wi-Fi Sync settings (some data simulated).
{.imgCaption}

Here's one particularly cool aspect of Wi-Fi Sync. Let's say that one of the connected Apple devices is taken outside of the network and its user makes changes to the KeePass database during that period. When the device is back on the network, it'll automatically sync back those changes *and* receive any changes that occurred on other network devices during its absence.

I wonder whether this Strongbox-only (and, thus, Apple-only) feature is something which could eventually be ported, forked, and/or reverse-engineered to be more cross-platform. In the meantime, though, folks in all-Apple environments might find Wi-Fi Sync a compelling reason to select Strongbox for toeing to the KeePass way.
