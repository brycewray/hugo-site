---
title: "Distro-dancing amid some Linux drama"
description: "Due to the ongoing FOSSverse fuss over Red Hat’s recent moves, my Linux experimentation takes a different turn."
author: Bryce Wray
date: 2023-08-24T17:22:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
imgs:
- 2023-08-24-0953CDT_neofetch_Arch_iMac_1528x814.png
---

In "[New life for the old Mac with Linux](/posts/2023/08/new-life-old-mac-linux/)," I told how a Linux installation had enabled me to repurpose my [recently cast-aside](/posts/2023/07/making-good-move/) 2017 iMac for things like playing games on [Steam](https://store.steampowered.com/). The Linux distribution on which I'd settled was [Fedora](https://fedoraproject.org), chiefly because it was the first distro I managed to adapt successfully to handle the iMac's sound system.

However, that was before I'd delved very deeply into the Linux world's ongoing angst over recent actions by Fedora's parent, the [IBM](https://ibm.com)-owned [Red Hat](https://redhat.com). After that came a few days of my *own* angst in the form of repeated distro-dancing --- from which I now have adopted what may be a **B**e**T**ter **W**ay. (Hint, hint.)

<!--more-->

## "Previously, on *Linux* . . ."

For those not interested in a deep dive into the last few weeks' Red Hat drama, here's an *extreme* oversimplification of what's been going on.

First, Red Hat [announced](https://www.redhat.com/en/blog/furthering-evolution-centos-stream) that it would no longer allow others to use code from [Red Hat Enterprise Linux (RHEL)](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux) in creating other Linux distros. While apparently technically legal, this move flew in the face of years' worth of concord within the universe of free open-source software (FOSS).

It also had the effect of reminding FOSSverse inhabitants that Red Hat had essentially [killed its CentOS Linux 8 distro](https://blog.centos.org/2020/12/future-is-centos-stream/) a couple of years back, not long after having promised to support CentOS 8 for *ten* years. Back then, Red Hat's own developers reached out to the Linux community in an attempt to heal the resulting anger. There was no such conciliation this time. Indeed, the Red Hat [response](https://www.redhat.com/en/blog/red-hats-commitment-open-source-response-gitcentosorg-changes) was very corporate and, thus, very cold. It accused the downstream distro-makers of being freeloaders, in so many words.

And things haven't improved from there. More than a few prominent Linux advocates now aggressively oppose not only Red Hat-based distros but also all other distros that are owned and/or controlled by corporations (*e.g.*, the [Canonical](https://canonical.com/)-owned [Ubuntu](https://ubuntu.com) and the [System76](https://system76.com)-owned [Pop!_OS](https://pop.system76.com/)).

After all, they remind us, Red Hat products themselves all originate "downstream" from volunteer work by untold numbers of developers who never see a dime from Red Hat (or any other entity) for their trouble, so it's somewhat bizarre for Red Hat to play the "freeloaders" card. But, these angered advocates point out, this kind of behavior is always a huge risk that goes with trusting corporations to play nice with FOSS. The whole thing is reminiscent of the [old fable](https://www.snopes.com/fact-check/stinging-criticism/) about a supposedly friendly scorpion floating across a river on the back of a trusting tortoise (or frog, depending on the source of the fable).

So what has this to do with my [previously described](/posts/2023/08/new-life-old-mac-linux/) experimentation with Fedora?

As I understand it, Fedora development is "upstream" from RHEL development in the same way that Linux development itself is "upstream" from RHEL development --- or, as I have seen it explained in recent days, using Fedora helps Red Hat develop RHEL, so it helps Red Hat be the FOSSverse villain it's now apparently become. I grant that this is somewhat like saying, "If you sell gasoline to a guy moments before he robs a bank and gets away by driving off in the car with that gasoline, you're helping him rob the bank"; but, still, it's a valid point where FOSS in general and the development of Linux distros in particular are concerned.

## Distro-dancing

While mulling over all of this, I wondered: if I were to pass up Fedora, which other distro should I then use on that old iMac?

Many of the more prominent advocates for community-driven (not corporate-owned) distros have pushed for switching to the venerable [Debian](https://debian.org) distro. However, Debian's emphasis on stability typically means that its included packages are out of date, sometimes by months or even years. I prefer to use "latest-and-greatest" software on whatever platform I'm using, so this meant Debian probably wouldn't do --- at least, not out-of-the-box Debian.

You see, I tried the suggestion in a [video](https://www.youtube.com/watch?v=K72XJHurdUY) by Jay LaCroix (of the "Learn Linux TV" YouTube channel) that one should run Debian *but* add the [Flatpak](https://flatpak.org) apps-management framework and use it to keep packages more up to date. However, it didn't take me long to realize that many Debian-included components are unavailable on Flatpak (as well as the competing, Canonical-created [Snap](https://snapcraft.io)). Moreover, most of them are *already* out of date, and soon will become even more so, because the Debian project only recently issued Debian 12 ("Bookworm"). That means it'll be perhaps a year or two before the next major Debian release will provide newer versions of those packages.

In short: yes, you can do Debian-plus-Flatpak and somewhat ease the "old-stuff-sucks" pain, but it's not a sufficiently complete fix for my purposes.

From there, I followed others' recommendations to try Debian's so-called "unstable" and "testing" channels ("Sid" and "Trixie," respectively), since they *are* more frequently updated than the "stable" channel. But, while those might work well enough on a more generic x64-architecture computer, my old iMac kept running into technical gotchas with "unstable" and "testing," despite my best efforts at resolving various issues; so these channels, like their "stable" sibling, also proved to be non-starters for me.

After days of trying multiple possibilities, and some of those multiple times, it became clear that I should select a distro whose *normal* form was that of a *rolling release* --- in other words, allowing constant access to the latest (usually) stable versions of all those masses of packages that make up a Linux distro.

So, now, if you're sufficiently familiar with Linux distros, you know where this is going. That's right; welcome to “[BTW](https://knowyourmeme.com/memes/btw-i-use-arch)”-land:

![ASCII art output from the “neofetch” app, showing Arch Linux running on a 2017 iMac](2023-08-24-0953CDT_neofetch_Arch_iMac_1528x814.png "Cloudinary")

Bizarrely enough, [Arch Linux](https://archlinux.org) at least so far is a great fit for this Apple fanboy's Linux playtime requirements.

Confession: I wimped out from Arch's ultra-involved and somewhat infamous [installation process](https://wiki.archlinux.org/title/Installation_guide), which I liken to buying a car and then having to assemble it yourself, one part at a time.[^twoScreens] Instead, I used [Arch's own `archinstall` installation script](https://github.com/archlinux/archinstall). It took me a few runs to get it right[^Firefox] but, when I did, only a few tweaks were needed to make the setup and its environment exactly what I needed. And, hey, I'd already had to make some of those tweaks in the other distros, so it was no big deal. One good thing about Arch is that halfway decent search-fu will give you the answer to just about any Arch-related question that comes up.[^Hugo]

[^twoScreens]: Actually, the regular installation process has one additional complication: you *have* to be able to view its instructions on a second device's screen while installing Arch on the first device --- and, IMHO, that's very likely a non-starter if the second device is anything smaller than a large tablet, because the Arch Linux wiki isn't exactly a great example of responsive web design. (While the installation instructions do mention opening a second terminal screen and viewing the instructions in one of the two windows, I decided that was a bridge too far. **Update from the future**: I later found an [even better way](/posts/2023/09/installing-arch-linux-use-ssh-luke/).)

[^Firefox]: Let's just say you don't want to tell the script to install both [PipeWire](https://pipewire.org) (for audio/video) **and** Firefox, because installing Firefox during the use of `archinstall` causes some sort of conflict with PipeWire. Just install PipeWire from the script and then, only after you've safely booted into Arch, install Firefox from Flatpak.

[^Hugo]: In that sense, Arch reminds me a lot of how I've learned to read docs and search extensively for answers to [Hugo](https://gohugo.io)-related issues before posing questions on the [Hugo Discourse forum](https://discourse.gohugo.io). (At least each is a less toxic experience than [Stack Overflow](https://stackoverflow.com), although that may not be saying much.)

## Arch isn't a fiend --- so far

And that's where things stand with Arch Linux, the old iMac, and me as of when I initially post this. It's early in the process, so I still haven't had much of a chance to see how things will progress as Arch goes through those frequent updates, I try other apps and other settings, and so on. But I am no longer positioned behind that mental wall I'd erected between me and at least trying Arch, much less actually making it a (sort of) daily driver. It's true that I could yet find myself scurrying to safer, if duller, ground after a Series of Unpleasant Incidents.

Until then, to quote the final words spoken by the “[Red](https://shawshank.fandom.com/wiki/Ellis_Boyd_%27Red%27_Redding)” character in [one of my all-time favorite motion pictures](https://shawshank.fandom.com/): *I hope*.

----

## Update, 2023-09-01

After using Arch for about a week, I realized I'd rather not have to futz with it quite so much, however nerdily fun that futzing could be at times.

That choice took me back briefly to Debian, but I again found the experience unsatisfying. So, after still more soul-searching **as well as** additional reading into how Fedora relates to RHEL development --- including fairly detailed explanations from some of Fedora's especially knowledgeable insiders and long-time users --- I decided to move the old iMac back to the distro where I'd most admired the experience: Fedora.

The simple truth is that, for my particular use case and hardware, I find Fedora Workstation the best combination of freshness and stability.

As for all the RHEL-related turmoil of the last few weeks and how some would insist it frames all Fedora users as being acquiescent to evil (if not downright evil themselves): well, to quote the [famous line from *Huckleberry Finn*](https://www.allgreatquotes.com/huckleberry-finn-quote-172/): "All right, then, I'll go to hell." Them's the breaks. ~~And, while I'm at it: whatever further toying around I do with Linux, I'll (try to) keep my distro-dancing to myself, rather than going on about it here.~~

----

## Update, 2023-09-05

Okay, I've gotta make just one more update to this one. Sorry.

My curiosity couldn't restrain itself: I decided I *like* futzing with Arch, after all. Moreover, I wanted to see if I could get through the regular installation process, rather than relying on the `archinstall` script. So that's what I did, although it took me numerous tries and, I admit, heavy reliance on not just the [Arch wiki](https://wiki.archlinux.org)'s [official guide](https://wiki.archlinux.org/title/Installation_guide) but also several "unofficial" guides to the process. (See my list below.)

Indeed, I had to do it *so* many times that I came to understand the process much better than when going more-or-less blindly through `archinstall`. That was exactly the point that [Eric Murphy](https://ericmurphy.xyz) made in the following video, a point which initially rankled me but I now fully grasp:

{{< lite-youtube videoTitle="Why you (probably) shouldn’t use an Arch Linux install script" videoId="J_RWNKlxF3c" >}}

Of course, this doesn't mean that, whenever I go through the Arch installation process (there almost certainly will be more such episodes), I wouldn't still need the crutch of the Arch wiki and those other sources, especially since they differ somewhat on which steps should go in which order. That said, at least now I have a clearer handle on what I'm doing.

Just as my earlier use of `archinstall` cured me of any trepidation over installing Arch at all, these multiple runs through Arch's regular installation process have taken away my previous worries about whether I could get through it *and* whether my old Mac could survive it.[^MacRecovery] I did, and it did.

[^MacRecovery]: It certainly doesn't hurt that, whenever things go south with such endeavors, I need only reboot while holding down **⌘ R** to boot into the Mac's Recovery Mode (ROM-based, so it will survive whatever I do with the system drive). From there, I can erase the drive once more, clearing the way for yet another try at installing Arch or whichever other distro I may choose.

### "Unofficial" guides to installing Arch Linux

I list these in order of how helpful I found each while I went through the Arch Linux installation process. As you can see, some are particularly applicable to what I did with my Mac.

- Bobby Borisov, "[How to Install Arch Linux: Beginner's Step-by-Step Guide](https://linuxiac.com/arch-linux-install/)" (updated <span class="nobrk">2023-08-19</span>).
- Abhishek Prakash, "[How to Install Arch Linux [Step by Step Guide]](https://itsfoss.com/install-arch-linux/)" (<span class="nobrk">2023-02-11</span>).
- Nickolas Kraus, "Installing Arch Linux on a MacBook Pro," Parts [1](https://nickolaskraus.io/articles/installing-arch-linux-on-a-macbookpro-part-1/), [2](https://nickolaskraus.io/articles/installing-arch-linux-on-a-macbookpro-part-2/), and [3](https://nickolaskraus.io/articles/installing-arch-linux-on-a-macbookpro-part-3/) (<span class="nobrk">2021-01-01</span>, <span class="nobrk">2021-01-08</span>, and <span class="nobrk">2021-01-15</span>, respectively).
- "kyoz" (GitHub user handle), [mac-arch](https://github.com/kyoz/mac-arch) (last updated <span class="nobrk">2022-05-16</span>).
- Barnet Wagman, "[Installing Arch Linux on a MacBook Air](https://bwagman.org/Arch_Linux_on_MacBook_Air.html)" (<span class="nobrk">2017-02-09</span>).
