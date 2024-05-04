---
title: "Sound reasoning"
description: "Although the fabled Year of the Linux Desktop probably will never happen, a simple (?) kernel tweak could do wonders for desktop adoption."
author: Bryce Wray
date: 2023-09-30T08:31:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

There are memes, and then there are nerdy memes. For example, "Safari seems snappier" typically is one of the early forum responses whenever an Apple OS update occurs. Another, which developers love to swap concerning software bugs (although it probably isn't viewed as kindly by *non*-devs), is "Well, it works on *my* machine."

And then there's one of the longest-running of them all: "*This* is the Year of the Linux Desktop." Of course, some have naïvely issued that one *without* irony; but, most usually, it's said with a combination of snarkiness and melancholy, because the truth is that there never will be a Year of the Linux Desktop. There are numerous reasons why, but the main reason is that other OSs, particularly Windows in the enterprise space, are too entrenched.

**However**, I'm here today to suggest that a simple (?) tweak to the Linux kernel could instantly make That Other OS much more attractive for adoption on an increasing number of computers --- namely, all the Intel-based Macs that still work fine but have lost (or will soon lose) eligibility for current and future versions of macOS.

<!--more-->

To be sure, plenty of the users of those Macs doggedly vow to keep running an older version of macOS until their required apps simply refuse to run, even after that macOS version eventually ceases to get security updates. *(Yikes.)* Some others use the [OpenCore Legacy Patcher](https://github.com/dortania/OpenCore-Legacy-Patcher/) project, which as of this writing promises it will allow "the installation and usage of macOS Big Sur and newer on machines as old as 2007."

One major problem with each of those approaches is that Apple keeps giving macOS nice features, especially related to interaction with one's other Apple devices, which work only on Apple Silicon Macs. And, of course, those seemingly vast legions of software developers with Mac laptops are going to want Apple Silicon Macs because some of their key dev tools are, more and more, either better on Apple Silicon Macs or simply unavailable on Intel Macs.

In my own case, I [chose](/posts/2023/07/making-good-move/) to get a new Apple Silicon Mac; then, a few weeks later, I [repurposed](/posts/2023/08/new-life-old-mac-linux/) my mid-2017 Intel Mac to use Linux. As I've written here before, my early exploration of Linux-on-Mac showed me one major problem with that route: out of the box, Linux doesn't recognize an Intel Mac's sound chip --- the audio settings report seeing only a non-functional "Dummy device" --- so the Mac's built-in audio simply doesn't work.

Now, yes, there are workarounds, and I've applied them. For one, you can simply slap on a USB-connected set of speakers or headphones. But . . .

- What if you flat-out prefer the Mac's internal speakers and/or don't want to fool with a potentially unwieldy combo of external gear just to *get frickin' sound*? Well, that takes you to [two](https://github.com/davidjo/snd_hda_macbookpro) [patches](https://github.com/egorenar/snd-hda-codec-cs8409). They work for a while, until certain updates break those patches.
- Besides, the patches are Of A Certain Age and, so various error messages tell me, are increasingly out of kilter with newer versions of the Linux kernel.
- Also, there's no way to use *any* patch with the "Live Image" tryouts that many Linux distros offer, so any Intel Mac user who runs one of those "Live Images" can't do so with the internal audio working as it should.
- <span class="legal">[Additional bullet point, added 2023-10-01]</span> *Immutable* distros are becoming more popular, and patching them *at all* can be considerably more challenging than is the case with more traditional distros. (Some immutable distros allow patching through "layering" methods.)

Okay, now, full stop.

Imagine the hue and cry you'd hear, even from the most die-hard Linux enthusiasts, if Linux didn't work with a typical *non*-Apple computer's sound chip!

Wouldn't that get fixed in the Linux kernel? And quickly?[^updates]

[^updates]: Then there'd be the whole issue of how to get that fix out to those distros which aren't "rolling," especially long-term support versions, but one assumes something of this importance would provoke some unusual maneuvers within the Linux community.

I mean, have you ever taken a look at the [documentation](https://www.kernel.org/doc/html/latest/sound/) for all the audio devices for which Linux *does* provide support? They constitute a huge list, because Linux has to run on so many different devices, from phones to laptops to desktop PCs to servers.

Yet, oddly enough, Intel Macs seem to have received the cold shoulder on this score.

It's not a secret that many of Linux's most vocal aficionados hate Apple with a white-hot fury, so perhaps that's somehow related to the problem. But, if so, that hatred is blinding the Linux community to the potential for more Linux adopters among Intel Mac owners.

And that's why Those Who Develop For The Linux Kernel™ should come up with a **permanent** fix to this problem.

I have no clue whether those folks (or even those who can *influence* them) give two hoots in hell about this ongoing hindrance to Linux-on-Mac adoption. Nonetheless, there's no question that Apple's seismic shift in Mac architecture is leaving a ton of still-functioning Intel Macs out in the cold, and many of those Macs' users likely would try Linux if not for this one particular glitch.

**Note**: There are other such Linux-on-Mac problems (notably, [sleep-related oddities](/posts/2023/09/new-life-old-mac-linux-follow-up/#go-the-bleep-to-sleep) and the handling of a "Retina" Mac's [graphics hardware](/posts/2023/09/new-life-old-mac-linux-follow-up/#graphic-footage)) which need fixing, but those tend to be aggravations rather than show-stoppers. However, the failure of an OS to recognize your computer's sound system <strong class="red">is</strong> a show-stopper.
{.box}

I've been fooling around with Linux on the Intel Mac for just over a month; and, in that time, I've spent many hours digging through repos, forum posts, and kernel devs' messages in an attempt to understand why Linux doesn't support Mac audio without workarounds. This obviously **doesn't** make me an expert on the subject. But there **are** experts out there, including those who help develop the kernel, who likely (a.) know *why* Linux doesn't support Mac audio and (b.) know how to fix that *permanently*. They simply have to care.

And, if they want the Linux community to grow, they *should* care.
