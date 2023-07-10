---
title: "Making a good move"
description: "Switching your ’puter setup to a new architecture? Better have a plan."
author: Bryce Wray
date: 2023-07-10T11:30:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

There are two ways to think about the transition I've just executed in my computing and development environment. One is that nothing has changed. The other is that pretty much everything has changed.

Oddly enough, both opinions are right. And both are wrong.

<!--more-->

----

## No Sonoma for you

It all began with last month's 2023 edition of Apple's annual Worldwide Developers Conference (WWDC).

Each June, the WWDC keynote presentation tells, among other things, what's coming in the next major updates in the various Apple operating systems. Then, within an hour or two, Apple releases a list of the Apple models that the new updates will support --- which relegates all other models to *no*-support status.

Since it had been been three years since Apple's [WWDC 2020 announcement](https://www.apple.com/newsroom/2020/06/apple-announces-mac-transition-to-apple-silicon/) of the transition of its Macintosh platform's architecture from Intel CPUs to Apple Silicon CPUs, I'd suspected this would be the year when my mid-2017 Intel Mac would wind up on the "[No soup for you](https://knowyourmeme.com/memes/no-soup-for-you-soup-nazi)" list --- and, sure enough, [it was](https://www.macrumors.com/2023/06/05/macos-sonoma-compatible-macs/).

Did this mean my Mac would suddenly stop working when macOS 14, a/k/a "macOS Sonoma," is released later this year? No, of course not. And Apple will continue to issue critical security updates on an as-needed basis for this and other newly unsupported Macs, for some time to come.[^undefined]

[^undefined]: As of this writing, Apple hasn't defined that period of time; but, if the past is any indicator on this subject, it likely will be at least two to three years.

Still, it lent a seeming finality to what I've been seeing over the last couple of years, as new macOS major versions increasingly would add features that were compatible with only Apple Silicon Macs. And it's always been true that even *non*-Apple software sources --- notably, Google with Chrome and Mozilla with Firefox --- gradually move forward and, in time, cease their own support for the older versions of macOS to which unsupported Macs are limited.[^browserComp] I've come to think of it as a very slow-motion deprecation process, a process that I now know will reach its peak when macOS 14 arrives.

[^browserComp]: The browsers-compatibility issue is problematic for someone like me who does both personal and contractual web development: if I can't test my work on the latest-and-greatest, I'm in trouble.

## Hot under the collar

Besides: in the last year or two in particular, I've increasingly experienced exactly the problem that Apple cited as at least partial justification for the architecture switch: the inability of Intel Macs to handle big processing loads without encountering *[thermal throttling](https://www.makeuseof.com/what-is-cpu-thermal-throttling/)*. As third-party software gradually asks more of the chips on which they run, the Intel CPU in my Mac hasn't been able to keep up.

This has affected my ability to do cross-platform web development. That's because running even a minimal instance of Windows and (*e.g.*) Chrome in a virtual machine within [Parallels Desktop](https://www.parallels.com/products/desktop/) would jack up the Intel CPU's temperatures[^Fahrenheit] to around 200°, causing the thermal throttling and, not incidentally, making the Mac's fans run at full blast for a while. In recent months, even starting up Apple's *own* Safari browser to check my cross-platform results[^iOS] would cause a huge, initial jump in the Intel CPU's temperature, and it didn't fully settle down after the app's initial load.

[^Fahrenheit]: All temperatures mentioned within are Fahrenheit.

[^iOS]: Among the various browsers, Safari's "Responsive Design Mode" does --- as you'd expect --- the best job of simulating what you'll get on an iOS device. It's no substitute for testing on a *real* iOS device, but that's not always convenient when you're making several small changes at a time. When you're done (you hope), *then* you try it on the real thing.

I tolerated these first-world problems while telling myself, "I'll wait to make a change until Apple forces my hand." Thus, learning of macOS Sonoma's non-support for my Mac pushed me in a direction in which I pretty much already wanted to go.

## The options

After days of research and headache-inducing wrestling with various possibilities, I finally determined that I had two main choices:

- Convert the old Intel-based Mac to a Linux box, and soldier on with it for a few more years.
- Replace the old Mac with a new Mac.

In a footnote to my [previous post](/posts/2023/06/using-dart-sass-hugo-simpler-way/), I revealed how that thought experiment ended up:

> I'm definitely getting another Mac; in fact, I ordered it while working on this post. I've been a Mac user for [most of the last thirty-nine years](/posts/2019/07/independence/), and the alternatives, however intriguing (and, yes, less costly) some might be, still don't ring my chimes.

So there.

Once I'd made that choice, the next step was to decide how to proceed. You know the old saying: "Fail to plan, plan to fail." This was going to be a big deal, and I was determined it was **not** going to fail. So that meant planning --- lots of planning --- and the efforts that it would dictate.

## The plan

### Hardware

As always when possible while buying new ’puter stuff, I over-spec'd. That means picking hardware and internal storage that's considerably heftier than what I really need, so the resulting setup will be as obsolescence-proof as possible.

And before you ask: yes, I **had** done that with the 2017 setup I was replacing, too; *but* I hadn't counted on 2020's announcement of The Architecture Change Decision. Given the success Apple has had with Apple Silicon since then, I should be pretty safe in assuming that I won't have to deal with yet another such end run quite so soon.

### Backups

I also upped my game regarding my two local [backup](/posts/2019/02/back-up-jack/) drives. That was in terms of not only storage capacity --- from 4 TB to 8 TB per drive, since they'd now be backing up an internal SSD with twice the capacity of the old Mac's --- but also write speed. Their predecessors had decent read speeds but were incredibly slow at writes, which obviously had a detrimental effect on how long backup operations took.

One thing that made it a lot easier regarding those local backups, done with Apple's [Time Machine](https://support.apple.com/en-us/HT201250) and Bombich Software's [Carbon Copy Cloner](https://bombich.com/), was what turned out to be the answer regarding how to transition the old local backups to the new Mac. I'd reached out to Bombich Tech Support for advice on what I should do[^techdocs], also mentioning a [suggestion I'd read](https://discussions.apple.com/thread/253674779) about how to move one's TM backups. The reply made it clear that there would be no point in attempting such a transition with either TM or CCC:

[^techdocs]: While Bombich has plenty of excellent technical documentation on its website, including suggestions for starting up with CCC on a new Mac after having used it on a previous Mac, I could find no document that exactly described my scenario.

> TM backups just can't be copied any more, not since Apple transitioned them to APFS.[^linkAPFS] It's the same with CCC. You can preserve those old backups and their snapshots as long as you keep that disk on a shelf, but we can't transfer the historical backups to a new disk. When you set up CCC on your new Mac, you'll erase the new backup disk in Disk Utility, then select that new disk as the destination to your backup task and CCC will start a new backup on that disk.

[^linkAPFS]: For more details on the Apple File System (APFS), see [this Apple info page](https://support.apple.com/guide/disk-utility/file-system-formats-dsku19ed921c/mac).

So I did the easy, clean thing and, indeed, put *both* old backup drives on the shelf, starting from scratch with TM and CCC on the new, faster drives.

Incidentally: as was true for their predecessors, these new backup drives are spinning mechanical HDDs, not SSDs. I've read plenty of pros and cons about whether it's worth it to use SSDs for backups, and decided in the "con" direction, especially in view of the new drives' superior specs.

### Apps and data

Next I had to decide about migrating my data and non-Apple apps from the old Mac. What should move, what shouldn't?

The third-party apps were an easy decision. It made zero sense to move any of them over to the new Mac. First, I could just redownload them and apply any necessary licensing. Second, moving them from an Intel box to an Apple Silicon box was nonsensical, even given how many of them already were [universal binaries](https://developer.apple.com/documentation/apple-silicon/porting-your-macos-apps-to-apple-silicon).[^settingsUniBins] As with the backups, reinstalling the third-party apps from scratch was both cleaner and more sensible.

[^settingsUniBins]: Yes, you could move over the universal binaries apps themselves, but would all their settings files from the old Mac work the same once moved to the new Mac? I didn't know, and chose not to find out.

**However**, since I *wasn't* migrating the old apps to the new Mac, I spent hours meticulously cataloguing not only which apps I'd been using but also their applicable licensing data. Similarly, I listed all my various browsers' extensions and settings, so I could cleanly reinstall the extensions on the Apple Silicon versions of the browsers. And, on a somewhat related topic, I even took screen captures of the old Mac's general menu bar and dock, so I would know what should go where on the new Mac. As for wallpaper, I'd simply re-select the choices I'd made on the old Mac, since they all came from macOS itself anyway.

Where moving data was concerned, I was happy to count on [Apple's Migration Assistant app](https://support.apple.com/en-us/HT204350)[^MigrationAssistant], which, with the two Macs connected by Ethernet to my local network, moved the many megabytes of (selected) data files in a little over an hour.[^iCloud] Then I re-installed all those third-party apps and reorganized the dock to be as I'd known it on the old Mac.

[^MigrationAssistant]: Using Migration Assistant between two Macs requires that they both be on the same version of macOS (or, for *really* old Macs, OS X). This made it necessary for me to get the new Mac in this period while macOS 13.x, a/k/a "macOS Ventura," is still the current OS. If I'd waited until after macOS Sonoma's release, I probably would have ended up with a new Mac running Sonoma, thus reducing my data-migration options.

[^iCloud]: It also obviously helped a great deal that some of my data files were on iCloud and, thus, easily accessible once I'd planted my Apple ID on the new Mac.

Finally, as for [Hugo](https://gohugo.io) and [Dart Sass](https://github.com/sass/dart-sass) for this here website, I simply used [my own `install.sh` shell script](/posts/2023/06/using-dart-sass-hugo-simpler-way/) --- with the `DARTSASS_OS_ARCH` parameter changed to account for the script's new presence on an Apple Silicon device --- to install both binaries in under five seconds.

All the work paid off: barely five hours after returning home from the Apple Store with the new Mac, it had pretty much the same, familiar computing environment I'd known on the old Mac.

## The results

So, again: nothing has changed, yet pretty much everything has changed.

I still have the same operating system --- with my apps, files, and even menu items, desktop dock, and wallpaper all back where I expect them --- and I know every inch of its environment like the back of my hand.

But beyond that, there's nothing *but* change in evidence.

The whole system runs much faster while using considerably less power. It backs up more data, more quickly. The Mac, specifically, can now handle demanding loads --- including no less than running Windows 11 in Parallels Desktop --- with greater speed and *without* gasping for (cool) air. Here are some rough temperatures-related comparisons:

| Process(es) | Old Mac<br>CPU temps | New Mac<br>CPU temps |
|----|----|----|
| **Idle environment**[^idleSpikes] | 110°--140° | 95°--105° |
| **Three or more browsers running simultaneously** | 130°--160° | 100°--110° |
| **"Heavy" web dev task**[^webdevTask] | 145°--170°+ | 105°--115° |
| **YouTube in one browser window** | 130°--160° | 100°--105° |
| **YouTubeTV in one browser window** | 135°--150° | 100°--105° |
| **YouTubeTV in two browser windows** | 145°--180° | 100°--105° |
| **Windows**[^winVer] **and a browser in Parallels Desktop** | 165°--190°+ | 105°--110° |
| **Windows and an [AAA game](https://www.g2a.com/news/features/best-aaa-games/)**[^gamesW11] **in Parallels Desktop** | n/a | 120°--135° |
{.ulysses}

[^idleSpikes]: The higher numbers for "idle environment" usually came when the old Mac was running multiple, simultaneous backup tasks, especially via [Arq](https://arqbackup.com) to online storage.

[^webdevTask]: By "'heavy' web dev task," I mean something like having Hugo regenerate *all* its images, do much more complicated [scoped styling](/posts/2023/01/sorta-scoped-styling-hugo-take-two/) than it already does, or otherwise jump through many more hoops than usual. You'll have to come up with your own web dev environment's equivalent.

[^winVer]: That's Windows 10 on the old Mac and Windows 11 on the new Mac. The old Mac [wasn't eligible](https://appleinsider.com/articles/21/06/25/intel-macs-cant-run-windows-11-without-this-workaround) to run Windows 11.

[^gamesW11]: Yes, it can even run AAA games in Windows 11! That's no small feat, since this is the *ARM* version of Windows 11, meaning that the games are using Windows/ARM's x86 emulator. Thus, you've got an AAA game on top of an x86 emulator on top of Windows/ARM on top of Parallel Desktop on top of macOS. Jeeeeeez. As you see in the table, it doesn't drive my new Mac higher than about 135°. Compare that to how the old Mac would jump up to the 165°--190°+ range just to run Windows *at all*.\
Please note also that:\
(a.) This enhanced gaming capability, added recently in Parallels Desktop 18, was something I wouldn't have dared to try on the old Intel Mac, so I can offer no backward-looking comparisons, hence the "n/a" in the table.\
(b.) Especially given the newness of this capability, compatibility varies from game to game --- and sometimes within segments of the same game --- often depending on what adjustments you make to a game's performance-related settings.

To reiterate something I've said from time to time in these posts: I love living in the future.
