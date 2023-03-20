---
title: "Two paths to password management"
description: "Ways to practice superior cybersecurity."
author: Bryce Wray
date: 2021-06-15T16:30:00-05:00
---

In my [most recent "Mixed nuts" post](/posts/2021/06/mixed-nuts-2021-06/), I touched briefly on the subject of [password management software](https://www.howtogeek.com/141500/why-you-should-use-a-password-manager-and-how-to-get-started/).

This wasn't by accident.

In recent weeks, I've been chewing through a lot of articles, documentation, and videos about these apps; and I'm pleased to say that my eyes haven't *completely* glazed over from this discovery process. Below, I'll explain what I think I learned --- including stuff I've known for years as well as knowledge I've picked up recently --- and the opinions I've formed as a result.

## The basics of password management

Sooner or later, unless every internet service/site you use is absolutely impenetrable, there will be a breach which exposes your data. The only sane thing you can do to minimize how painful that is for you is to ensure that you have a different and unguessable password for every such service/site.

If you have the memory of a supercomputer *and* either have zero dependents or figure on living forever, you can keep all your user ID/password combos in your head for instant recall. However, a normal human being needs to practice some form of password management which, if done the most wisely, can be accessible also by trusted relatives as needed.

How you do that is your call.

Some folks write their passwords down in dead-tree notebooks which they then keep in a safe or other secure place. While that's better than no password management at all, it's probably inconvenient at best and, at worst, vulnerable to fire, tornadoes, and other home-destroying tragedies usually called "Acts of God" by the insurance industry.

My preferred and suggested method is the use of password management software.

With a password management app, you set one *master password* --- and you *do* have to know that one by heart, but *only* that one --- which, upon entry, gives you access to all your credentials from within an encrypted database. To make sure you create good passwords that **don't** depend on some silly formula (*e.g.*, your pet's name or your street number or the backward spelling of the website with which you're signing up), a password management app also includes a configurable *password generator*. This lets you instantly create a password which would take **[virtually forever](https://www.security.org/how-secure-is-my-password/)** to crack, yet fit whatever requirements a specific website has.

The field of password management apps is broad and getting broader, and it's not hard to be gobsmacked at first when you try to get a grasp on them all. That said, I've narrowed them down to just two categories, which made it a lot easier for me to evaluate them:

- The KeePass way.
- Everything else.

So let's examine each.

## The KeePass way

The open-source [KeePass project](https://keepass.info/) dates from the early 2000s. In its purest form, it involves (a.) saving an encrypted database file on *each device* where you want to access your credentials and (b.) using a KeePass-compatible app to work with that file. (Mind you, it needn't be only one such file but, for this discussion, let's just say "file," singular.)

I'll get back to that "on each device" part later. It's important.

Things were simpler at the dawn of KeePass: there was just one KeePass app and it ran on only Windows computers. Support for Linux and Macs followed and, as smartphones and tablets also came into the mix, developers found ways to make it work on them, too.

One thing you need to understand is that, while the "true" KeePass app is still Windows-only, there are also numerous *ports* for other OSs and devices. As a group, they have only one thing in common: compatibility with that database file. From there, things can get a bit hairier. Notably, many of these ports haven't been updated in years and probably never will be, which means they can encounter issues with newer devices and OS versions.

Fortunately, this isn't true of the basic Windows version of KeePass, which continues to be actively developed while also remaining free/open-source software (FOSS). For other widely used platforms, these ports also are actively developed and, as far as I could tell, seem to be the most popular among KeePass aficionados (all these ports are open-source and, unless otherwise noted, free):

- **[KeePass2Android](https://github.com/PhilippC/keepass2android/)** for Android.
- **[KeePassium](https://keepassium.com/)** for iOS, with a macOS version now in beta. (Freemium.)
- **[KeePassXC](https://keepassxc.org/)** for Windows, macOS, and Linux.
- **[Strongbox](https://www.strongboxsafe.com)** for macOS and iOS. (Paid on macOS, freemium on iOS.)

{{< imgh-colors src="keepassxc_unlock_db_2066x1532.png" alt="Screen capture from KeePassXC" width=2066 height=1532 >}}

The screen you see in the macOS version of [KeePassXC](https://keepassxc.org) when unlocking a database file.
{.imgcCaption}

Now, let's consider that "on each device" business concerning the database file.

Once again, the root idea of the KeePass project is that all your passwords reside in a file safely stored on the device. So, you may wonder, how does that work when you need to access it from a computer (or multiple computers) *and* a phone *and* a tablet? What about when you change a password on one of those devices and you need that change to work, *now*, on all your other devices? What if any of your devices is stolen? What if they're all snuffed one nasty night by one of those aforementioned Acts of God?

That gets us into an area on which KeePass users are not exactly all singing the same song.

Some insist on having zero to do with the cloud and, so, they *manually* sync their devices as needed through direct cabling or, perhaps, via WiFi on their local area network. (The latter makes more sense for phones in this era where their physical ports are disappearing in favor of the everything-is-wireless approach.) Even more sophisticated variations on the latter involve using either a self-hosted [NextCloud](https://nextcloud.com) setup or a [network-attached storage](https://en.wikipedia.org/wiki/Network-attached_storage) device --- albeit properly backed-up offsite to avoid, again, Acts of God --- as the One Source of Truth for all one's devices.

Then there are the KeePass fans who concede that the convenience of cloud-based sync through a thoroughly trusted vendor is worth whatever added risk it may pose to their credentials. These folks thus use cloud sync --- with their vendor of choice, such as iCloud, Google Drive, Dropbox, Sync.com, and the like --- to make the database file the same across their respective devices whenever, say, adding a new login or changing an existing one. To help secure this further and thus counteract the perceived weaknesses of cloud storage, such users may also set up each of their KeePass-compatible apps to use a *key file*. This is an un-synced and, thus, unchanging file placed on each device, where the applicable KeePass-compatible app must "see" the key file or it won't allow access to the synced database file in the first place. (You can use a local key file even if you *don't* use cloud storage for the database file, of course.) Compared to the "no-cloud-ever" tact taken by some, I consider this a more sensible and realistic strategy for secure multi-device use of KeePass-based password management.

As you may be gathering by now, the KeePass way in general probably is a bit much for those who are just getting started in practicing good password management. Indeed, most KeePass fans I've encountered seem to be highly tech-savvy and, often, long-time IT pros. I suspect their efforts to get their non-tech-savvy relatives to join them in this worthy endeavor of family-wide password management are often blunted by the apparent difficulty and occasional inconvenience of the KeePass approach, however many merits it may otherwise have.[^ITpros]

[^ITpros]: On the other hand, such individuals are probably used to being their respective families’ tech support gurus anyway, so perhaps they don't mind.

More on that in a bit.

## The non-KeePass way

That, then, takes us to Option 2 among password management apps: the ones that *aren't* part of the KeePass project. In this case, your credentials live in a database that's on a provider's servers, not your devices; also, the database file format is specific to that provider rather than being a "universal" file format as in the KeePass project. As you add and change your credentials for various sites, the service saves these edits to your database on its servers and then syncs that database with each of your devices.

This is the sector of password management apps about which you see and hear the most, because it's where the serious money is being made. This involves the likes of [1Password](https://1password.com), [Bitwarden](https://www.bitwarden.com), [Keeper](https://www.keepersecurity.com), [LastPass](https://www.lastpass.com), [NordPass](https://www.nordpass.com), and [RoboForm](https://www.roboform.com), among others.

{{< imgh-colors src="bitwarden-com_screen-cap_2021-06-09_3164x1420.png" alt="Screen capture of the Bitwarden website" width=3164 height=1420 >}}

The home page on the [Bitwarden website](https://www.bitwarden.com).
{.imgcCaption}

Each involves cloud sync from the word "go"[^Enpass] (although Bitwarden [can be self-hosted](https://bitwarden.com/help/article/install-on-premise/) by those who are sufficiently knowledgeable about "hardening" servers --- which points us back toward the "this is for techies only" segment already owned by KeePass fans) and provides options for all the major operating systems and device types, as well as extensions for the vast majority of modern web browsers to further simplify your logging into websites. These providers’ user-friendly apps and web browser extensions[^extsKP] give the non-KeePass way a **huge** usability advantage over the KeePass way.

[^Enpass]: I didn't include [Enpass](https://www.enpass.io) in this group because it doesn't exactly fit the description. Specifically, it's somewhat KeePass-like in that it doesn't store the database file on its servers but, instead, leaves it to the customer to store the file on their chosen cloud vendor if they wish to have cross-device sync.

[^extsKP]: Some KeePass-compatible apps --- notably, KeePassXC --- also work with web browser extensions, but this appears to be the exception rather than the rule in that category. Besides, the more hard-core KeePass rooters tend to express about as many suspicions about the security of browser extensions as they do for that of cloud-based database syncing.

Another advantage these services have over the KeePass way is in their allowing secure storage and access of other sensitive data, such as credit cards’ authentication codes. (Some KeePass-compatible apps do allow this in some measure, but how they do it, and how easy they make it for you to use, will vary widely from app to app.)

These services’ pricing is all over the map, although there are free versions of nearly all of these --- and definitely free *trials*, or at least generous money-back-guarantee periods, for all. You sign up with the service, download the appropriate app to each device, connect that app to your service account, and you're off to the races.

The non-KeePass way, while technically not *quite* as secure as the KeePass method (mainly because you're putting more trust in a single provider than is necessary for the KeePass way even when cloud sync is involved), is far more convenient and requires a lot less up-front thinking. I found myself agreeing with two commenters I observed in a discussion of the two methods following a [Ghacks article from a few months back](https://www.ghacks.net/2021/02/20/migrating-from-lastpass-to-an-alternative-password-manager-keepass-vs-bitwarden-which-one-will-you-choose/):

> **ShintoPlasm**: When you need to share access with other family members, [the non-KeePass method] is the preferred option. KeePass is for loners[.] <span class="nobrk">:-)</span>

> **owl**: @ShintoPlasm, [y]ou may be right. I, too, have found [the non-KeePass method] to be the better for shared use with family. In an environment where there is no one to share, KeePass is the best.

The non-KeePass way, thus, can make it easier to gain the support of technophobic relatives --- or employees, in the case of a business.[^KPSB]

[^KPSB]: To be fair, I'll add that KeePassium and Strongbox come as close as possible to making the KeePass way nearly as easy and convenient as the non-KeePass way. Still, neither product works on non-Apple devices, so you'd then have to set up your non-Apple-using relatives or employees with other KeePass-compatible apps with varying (and probably considerably less) user-friendliness, although it's certainly possible.

## Locking it down

For many, it comes down to this: although there is considerable technical justification for the KeePass way, getting *everybody* to practice good password management is simpler with the non-KeePass way. After all, it doesn't matter how good a product is if you can't persuade people to use it, much less use it consistently, when you're not around to hold their hands about it.

Be aware also of this: certain conversions from one "way" to the other can be nearly impossible. This is particularly true if you're trying to go from the non-KeePass way to the KeePass way, given that some apps on both sides do a fairly lousy job of either exporting their own files or importing other apps’ existing files for use across the "ways." **Therefore**, I strongly recommend that, before you act on any of this, you **make up your mind** --- which "way" and which app(s) --- and then stick to that decision as best you can.

Anyway, those are some of my takeaways from a semi-deep dive into the world of password management software. If I find others worth noting in the future, I obviously will bring them to your attention; and, as always, [I welcome your thoughts](/contact/).
