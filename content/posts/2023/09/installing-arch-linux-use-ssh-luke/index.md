---
title: "Installing Arch Linux? Use the SSH, Luke"
description: "Spare yourself the swiveling and neck-straining. There’s a much less painful way to work through the Arch installation process."
author: Bryce Wray
date: 2023-09-12T10:20:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

The common wisdom about installing [Arch Linux](https://archlinux.org) is that the best-practices approach is to follow the [Arch wiki](https://wiki.archlinux.org)'s [Installation Guide](https://wiki.archlinux.org/title/Installation_Guide). And, as [previously explained](/posts/2023/08/distro-dancing-amid-some-linux-drama/#update-2023-09-05), I more-or-less agree with that --- **except** that the Guide doesn't include a word, even a related link, about one method that makes the process **far** easier: [SSH](https://www.ssh.com/academy/ssh).

<!--more-->

I was re-installing Arch yesterday, partly because I was interested in trying another installation method about which I'd read. As usual, the target machine and daily-driver machine were on separate work-surfaces that were ninety degrees apart. This required a lot of swiveling and neck-craning back and forth so I could refer to numerous browser tabs while trying to enter the right terminal commands into the target machine.

That method about which I'd read actually turned out not to work so great, after all (at least for my particular target machine), as I ended up trying it in vain several times before finally stopping for the evening with the intent to come back later and clean up the mess with a more usual installation. But, as I walked off while rubbing my sore neck, I wondered if there might be a way I could perform the next installation from the comfort of the daily-driver machine.

Sure enough, there already is a [page in the wiki](https://wiki.archlinux.org/title/Install_Arch_Linux_via_SSH) about how to do just that, by using SSH to log into the target machine's installation process from the other machine. (For whatever reason, this page isn't linked from the Installation Guide.) Ideally, you'll have both machines connected via wired Ethernet cables to the same LAN.[^wireless] If so, here's all you have to do.

[^wireless]: That same page gives you info and related links regarding how to proceed in case WiFi is in use on either or both devices.

## The procedure

### Starting on the target machine

1. Boot[^boot] from your pre-prepared Arch Linux installation medium, typically a USB stick to which you've burned the latest Arch ISO image.
2. Wait until the installation setup finishes loading, stopping at a `root@archiso` prompt.
3. Set up a password for the `root` user: enter `passwd` and then, on each of the two prompts that follow, type the password. (You won't see it, so make sure you remember it for what you'll do next, much less for your ongoing work with Arch.)

[^boot]: You'll have to hold down a key, or combination of keys, to make the target machine show its boot screen. A quick web search should give you the appropriate info for your target machine.

### Starting on the daily-driver machine

**Note**: Of course, this presumes your daily-driver machine already has an OpenSSH client, as is typical on macOS or Linux. If not, search for articles --- such as [this one](https://www.howtogeek.com/311287/how-to-connect-to-an-ssh-server-from-windows-macos-or-linux/) --- to learn how to install such a client.
{.box}

1. Open your chosen terminal app.
2. Enter:
{{< highlight bash "linenos=false" >}}
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@archiso.local
{{< /highlight >}}
3. At the resulting prompt, supply the password you just assigned to the installation's `root` user.

### Installing and finishing

With that, you should be logged into the target machine and can perform **nearly** the entire installation from there. So, yes, you can copy/paste long commands straight into the terminal app, take screen captures to help you remember your progress, and otherwise enjoy all the usual conveniences of your daily-driver machine while still installing on the target machine.

Why did I say "**nearly** the entire installation" above? Because, **at the end**, when you're ready to finish and reboot the target machine to bring up your newly completed Arch installation, you must make a clean exit from the daily-driver machine's end of this:

1. Enter `umount -R /mnt` to unmount the mount points you'll have set up during the installation. (Don't worry if some or all of them indicate they're not ready.)
2. At this point in the installation, you should be in `arch-chroot` mode, so you'll have to exit from that **and then** exit from the SSH session. To do so, enter `exit`, wait for the response from the target machine, and then enter `exit` again to finish the SSH session and disconnect the two machines.

Finally, back on the target machine:

1. Just to be safe, enter `umount -R /mnt` again.
2. To reboot to your new Arch installation, enter `reboot`.

----

If your workspace already makes it possible for you to see both machines' displays side-by-side, the usual method may not bother you all that much. However, with my particular home-office layout, I find the SSH way to be *so* much more pleasant --- at least, to the extent one ever can refer to an Arch Linux installation as being "pleasant."
