---
title: "New life for the old Mac with Linux: a follow-up"
description: "Some things I’ve picked up while playing around with various aspects of Big L."
author: Bryce Wray
date: 2023-09-19T13:35:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

[A month ago](/posts/2023/08/new-life-old-mac-linux/), I first wrote of how I'd managed to get Linux running on the mid-2017 iMac I'd [replaced](/posts/2023/07/making-good-move/) a few weeks earlier. Since then, I've "fooled around and found out" (to use a sanitized version of a common phrase) a few things about the whole Intel-Mac-running-Linux experience, some of which I've [already](/posts/2023/08/distro-dancing-amid-some-linux-drama/) [shared](/posts/2023/09/installing-arch-linux-use-ssh-luke/).

Still, in addition to those, I've acquired a few other helpful nuggets of information --- some of which either expand on or outright correct what I'd already passed along --- so, especially for any other reader who might be considering installing and using Linux on an outdated Intel Mac's "bare metal," I'm using this post to sum up where things stand at this point.

<!--more-->

First of all, to those of you who may have already read some of this in those earlier posts, I apologize for the repetition; but I felt keeping all of this in one post would make it more useful as a point of reference.

Also, I want to reiterate that every Mac-related item below assumes the use of Linux on an **Intel**-based Mac, **not** a Mac running Apple Silicon. Furthermore, it assumes that you'll be installing Linux on "bare metal," **not** in a virtual machine, and that you'll be using **only** Linux on the Mac rather than maintaining a dual-boot setup (more on that below).

Finally, these topics appear in no particular order. For that matter, to quote [Samuel "Mark Twain" Clemens](https://www.allgreatquotes.com/huckleberry-finn-quote-1/):

> Persons attempting to find a motive in this narrative will be prosecuted; persons attempting to find a moral in it will be banished; persons attempting to find a plot in it will be shot.

We all clear? Then, here we go.

## Erasing your Mac's drive

As I mentioned in a footnote to [one of those earlier posts](/posts/2023/08/distro-dancing-amid-some-linux-drama/):

> It certainly doesn't hurt that, whenever things go south with [installing Linux on the Mac] . . . I need only reboot while holding down **⌘ R** to boot into the Mac's Recovery Mode (ROM-based, so it will survive whatever I do with the system drive). From there, I can erase the drive once more, clearing the way for yet another try . . .

In my own case, I was going whole-hog with Linux on the Mac rather than trying to keep any vestige of macOS for dual-booting, so erasure before installation was no big deal. On the other hand, if you're not prepared to go that far (even if macOS no longer supports your old Intel Mac, as is the case for me), you'll need to repartition your drive **before** you try installing any bare-metal stuff. (Keep in mind that the Apple [Boot Camp Assistant utility](https://support.apple.com/en-us/HT201468) is for use with only Windows-on-Mac, not Linux-on-Mac.) To repeat: this is not about dual-booting; this is about going full-blown Linux-on-Mac, with no turning back.

**Anyway** . . . that Recovery Mode and its Disk Utility app will be indispensable for both starting with Linux-on-Mac and, if you choose to distro-hop as I have done in my learning process, continuing with it.

## Plug in

If the Mac's keyboard and mouse are wireless, remember that you'll want to connect each via its charging cable while you're installing Linux since, of course, the Mac won't be able to use Bluetooth during that process.[^Logi] This is especially helpful to remember when you want to go from an existing (but perhaps flawed) installation to another ---  because, in order to boot from a plugged-in USB stick that's carrying your chosen new Linux disk image, you'll have to hold down the **Option** (**⌥**) key during reboot.

[^Logi]: The exception to this would be if the keyboard and/or mouse connect(s) via something like Logitech's [Unifying](https://www.logitech.com/en-us/resource-center/what-is-unifying.html) technology, in which there's some sort of USB dongle handling things.

## Now hear this

Except in unusual circumstances about which I'm unaware so far, the Mac's built-in speakers and headphone jack don't work out-of-the-box with Linux. Depending on the Linux distro you're using, you can resolve this at least temporarily by installing a [special driver](https://github.com/davidjo/snd_hda_macbookpro). I say "temporarily" because you'll often find yourself having to repeat this process as your Linux installation receives updates, especially if they involve the Linux kernel --- which, in the case of some distros, can happen pretty often. Thus, my advice is to bypass the problem altogether by using external, USB-connected speakers or headphones.[^BTaudio]

[^BTaudio]: Bluetooth speakers and headphones work, too, but can be a bit more troublesome and obviously can't give you audio during the boot process, when it can be helpful to hear error beeps and that sort of thing.

## Oh, my, EFI

At the start, the Mac's disk drive [will have an EFI partition because it's been set up with the GUID Partition Scheme](https://eclecticlight.co/2020/06/16/efi-system-partitions-a-hidden-problem/). You'll typically be told not to fool with the existing EFI partition during Linux installation. For example, the [Arch Linux Installation Guide](https://wiki.archlinux.org/title/Installation_guide) has this:

> **Warning:** Only format the EFI system partition if you created it during the partitioning step. If there already was an EFI system partition on disk beforehand, reformatting it can destroy the boot loaders of other installed operating systems.

. . . so that's obviously a good idea if you *do* want to try a dual-booting situation either now or later, but it really doesn't matter a whole lot otherwise. Don't misunderstand: the disk **does** need an EFI partition, but it's OK if your Linux installation creates it --- **still**, if that's how you want to go, you then must first use the aforementioned macOS Recovery Mode's Disk Utility to erase the disk **without** the GUID Partition Scheme.

On a slightly related note, it seems certain distros' installers will balk at the size of a macOS-created EFI partition for being too small. For example, I found this to be the case with some flavors of [OpenSUSE](https://opensuse.org), which wanted a 512 MB EFI partition instead of the 300 MB partition that Disk Utility had built. If you encounter such an issue, that on its own might be a good reason to stop the install, do a **non**-GUID erasure, and then let the Linux installation handle creating an EFI partition to a size of its liking.

<span class="red">**Of course**, particularly when dealing with your computer's freaking **drive unit**, always be guided first by whatever official documentation you can find, rather than some random guy's blog post (like this one).</span> I really hope I don't have to say that to anyone sufficiently tech-oriented to consider installing Linux on a Mac's "bare metal" in the first place, but there it is, just in case I do.

## Go the bleep to sleep?

*. . . with apologies to [Samuel L. Jackson](https://www.nj.com/entertainment/2011/06/samuel_jackson_letterman_go_th.html).*

One Linux-on-Mac problem to which I haven't yet found an answer --- and, if what I read from others online is any good indication, I may never do so --- is how to get the box to go to sleep and **stay** asleep. Either it'll wake up a few minutes later or, just as annoying, it'll go into what I presume is the Linux "hibernation" mode and resist all efforts to wake it up, forcing me to cold-boot the Mac. I've encountered these glitches with every distro I've installed on the Mac, despite trying to fix it through any number of suggested workarounds.

Like the built-in audio glitch I mentioned earlier, this seems to be a case of either (depending on one's point of view) Linux's not supporting enough different hardware configurations or an Intel Mac's not being sufficiently standard under the hood. And, Apple fanboy though I may be, I tend to lean somewhat toward the latter view. Why? Read on.

## Graphic footage

The Intel Mac on which I've been doing the Linux-on-Mac thing is, like most Macs sold in the last decade, equipped with Apple's famous [Retina Display technology](https://appleinsider.com/articles/23/02/16/what-a-retina-display-is-and-why-it-matters). The TL;DR explanation of a Retina Display is that it essentially scales up all on-screen content by two (or, in some smaller devices, three) times --- so that, *e.g.*, my old Intel Mac's 5120 &times; 2880 native resolution (*apparently* native, that is, as I'll explain in the next paragraph) produces ultra-sharp 2560 &times; 1440 images and text.

However, what the internal graphics card "tells" Linux is quite another story. Whenever I do a fresh Linux installation on this Mac, Linux reports back that the card's native resolution is actually 3840 &times; 2160 --- *i.e.*, so-called "4K" resolution. From what I've read, there's some kind of internal and, again, non-standard magic going on inside a Mac that makes it somehow achieve the higher *apparently* native resolution, and thus Linux understandably has no clue about such niceties. (It's not as if Apple is going to worry about changing that, of course.)

On the other hand, you don't have to search long to find that Linux's ability to perform decent text scaling can be, um, lacking. (Some distros and/or desktop environments do better jobs than others, of course, so your luck with this may be better than mine has been.) What I've generally ended up doing is setting the graphics at 2560 &times; 1440 with *no* text scaling and just living with it. It's not terrible, especially if I don't look *too* closely at small text, but it's certainly nowhere close to being as nice as what macOS showed me on that big, beautiful display until recently.

## Text fiends

This part is not so much about Linux, much less Linux-on-Mac; instead, it's about the Linux community. To be specific: after these last few weeks of tinkering, I feel obliged to note where I stand on the eternal battle usually framed as "Which Text Editor Dost Thou Use in a Linux Terminal Window, Thou Varlet?"

The Linux Kewl Kids' answer to that typically is either the venerable [Vim](https://www.vim.org) or its offshoot, [Neovim](https://neovim.io), although there are more than a few adherents for the truly ancient [Emacs](https://www.gnu.org/software/emacs/). What instantly qualifies one as *not* worthy of Linux Kewl Kids status is to have any regard whatsoever for the admittedly more limited [Nano](https://www.nano-editor.org/). So, yeah, I'm not Kewl. (Duh.)

But, just as many a Vim or Emacs user *is* a Vim or Emacs user because it was that user's first terminal-based text editor, so also did I start out back in the mid-2000s with Nano's predecessor, [Pico](https://en.wikipedia.org/wiki/Pico_(text_editor)), when I was helping my then-employer's one-man IT department manage a couple of [Apple Xserve G5s](https://www.computerworld.com/article/2564346/a-look-at-apple-s-new-g5-xserve-and-xserve-raid.html). Thus, in the 2010s and on into the early 2020s, whenever I had occasion to do server admin for either an employer or myself, I'd naturally latch onto the server's Nano installation whenever I had to do some tweaking; and the same has held true for my terminal-based text edits on my Macs, past and current.

Now, have I *tried* Vim and/or Neovim? Yes.

During those years of server admin, I'd occasionally get dumped into a Vim screen, apparently because Vim was the server OS's default text editor. This was especially true in my final pre-[retirement](/posts/2021/09/transition/) job, part of which involved managing a remote web server running CentOS back in the days before [Red Hat essentially clobbered that distro](https://arstechnica.com/gadgets/2020/12/centos-shifts-from-red-hat-unbranded-to-red-hat-beta/). (I thus acquired that [memed](https://programmerhumor.io/memes/vim/) skill of knowing how to quit from Vim.) And, since then, I've occasionally dropped into Vim or Neovim for one reason or another, especially when some OS or distro gave me no apparent choice in the matter.

While more heavily researching Linux-related stuff in the last few weeks, I've tried to learn more about Neovim in particular, even making multiple runs through its excellent, built-in tutorial. I've also read articles and seen videos about how one can customize Neovim to serve as not only a more fully featured text editor but also, essentially, an [IDE](https://www.techtarget.com/searchsoftwarequality/definition/integrated-development-environment) at least as good as the category-leading [Visual Studio Code](https://code.visualstudio.com) --- or what I've been using recently, the fully FOSS [VSCodium](https://vscodium.com/) distribution thereof. To be sure, Neovim packs some pretty amazing capabilities, and I can understand why Neovim fans really, really like that app, especially if they're true touch typists (which I definitely am not[^touchTyping]).

[^touchTyping]: I [began typing](/posts/2019/03/plain-truth/#the-royal-treatment) in hunt-and-peck fashion as a nine-year-old and, through sheer repetition over the years, grew pretty quick at it. When I reached an actual typing class in my senior year of high school, my teacher saw how much trouble I was having with old-school "[home-row](https://www.typinglounge.com/home-row-typing)" typing. She'd also taught me in an English class a couple of years earlier and knew I could already type, based on some of the homework assignments I'd completed for her. After the second day of the typing class, she asked me to stick around for a few minutes and do a one-minute speed test for her, so I hunted-and-pecked through it. I think I got somewhere around fifty to sixty words per minute. She then suggested I drop the class because "you already type well enough for college work" and continuing in the class "will be twice as hard on you as everyone else, because you have to *unlearn* the way you do it now and *then* learn the *right* way." And that was that.

Yet, I still prefer Nano. That's just me. Sorry, friends.

----

And that's where my Linux-on-Mac journey stands as of now. If I stumble on any new pearls of semi-wisdom as I continue down this path --- and, especially, if those are items I *really* wish I could've known before getting started, as is true for almost all of what I've described herein and in my other posts to which I linked at the beginning --- I'll try to catalog them here in a more or less coherent fashion. Perhaps it'll help somebody else trying to wend down a Linux-on-Mac route.
