---
title: "My “new normal,” starting with Hugo 0.153.x"
description: "Switching to hvm and converting my scripts to work with Hugo’s packaging for macOS."
author: Bryce Wray
date: 2025-12-26T10:29:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Until a few days ago, those who use the [Hugo](https://gohugo.io) static site generator on macOS have had to deal with Apple's [quarantine feature](https://eclecticlight.co/2021/12/11/explainer-quarantine/) each time they downloaded a new Hugo version. With the recent release of Hugo [0.153.0](https://github.com/gohugoio/hugo/releases/tag/v0.153.0), that ceased to be the case. For most Hugo-on-macOS users, that's a good thing. For nerds like me who've been managing their Hugo-on-macOS workflows through scripting, it was . . . complicated. However, with major help from one of Hugo's key personnel, I was able to make this "new normal" a good thing for me, too.

<!--more-->

# Dealing with the packaging change

Hugo 0.153.0 changed the macOS deliverable. Where the binary used to reside in a `tar.gz` archive, it now comes in a regular macOS `.pkg` that installs with a double-click. Still, it remains a terminal app and, thus, not as readily updatable as a typical macOS GUI app with a "Check for updates" menu item and associated functionality.[^neverUpdaters]

[^neverUpdaters]: I do know that some veteran Hugo users rarely or never update their sites' Hugo versions, fearful of dealing with breaking changes (especially across multiple sites). As for my situation, this personal site is my only Hugo project, so I usually update whenever there's a new version.

In a Hugo Discourse entry --- ["0.153.0 for macOS: .pkg rather than .tar.gz"](https://discourse.gohugo.io/t/0-153-0-for-macos-pkg-rather-than-tar-gz/56398) --- I asked, "what is a Best Practices way for us macOS users to handle version updates going forward?" One user suggested I use the [hvm](https://github.com/jmooring/hvm) (Hugo Version Manager) tool maintained by Hugo contributor [Joe Mooring](https://github.com/jmooring); but, when I did, I found that it wasn't yet able to handle this new packaging. After seeing my report to this effect, Mooring suggested I open a related issue in the hvm repo, [which I did](https://github.com/jmooring/hvm/issues/178).

Also within that same Hugo Discourse discussion, Hugo maintainer Bjørn Erik Pedersen explained the reason for the packaging change:

> People have been asking for a signed and notarised [macOS version] ... for a long time, and since Apple has tightened the security on this (you need to manually go into the security prefs and whitelist any non-signed/notarised app), I decided it was time to do it right, and that meant either pkg or dmg, and pkg is much nicer.

I promptly replied:

> Oh, please don't misunderstand... --- I think it's a great idea. I'm mainly just trying to figure out how I update it locally going forward. (My old method deleted the previous version and pulled the current one, using an `xattr -dr com.apple.quarantine` command as a workaround for just the issues you mentioned.)

In the hvm issue I'd filed, Mooring and I conversed about the situation and how best to resolve it. Just four days later --- which, apparently, included his actually purchasing a Mac of his own (!) --- he updated hvm to a new version, [0.9.0](https://github.com/jmooring/hvm/releases/tag/v0.9.0), that was able to deal with the new packaging. Because hvm allows you to install and use a new version (as well as delete any older ones, if you choose) with just a couple of keystrokes, that solved my problem regarding updates going forward.

# Fixing my own scripts

Now, my only remaining problem to solve was in my own scripting through which, up to then, I'd managed my local Hugo operations for the last couple of years.

Prior to Hugo 0.153.0, an `install.sh` script about which I once [wrote](/posts/2023/06/using-dart-sass-hugo-simpler-way/) would download a designated Hugo version's `.tar.gz` file, extract from it the Hugo binary, and place that binary in a `bin` directory (after deleting any other Hugo binary that might already be there).[^DartSass] I have now adapted `install.sh` so that, rather than downloading and extracting the former Hugo `.tar.gz`, it now gets the desired version of hvm's `.tar.gz`, after which I use hvm as needed to manage the Hugo binary itself.

[^DartSass]: It also allowed downloading and installing Dart Sass, which I continue to do on a "just-in-case" basis even though I've kept the site almost exclusively on vanilla CSS, albeit enhanced with PostCSS for multi-browser compatibility purposes, for quite some time.

That was easy enough to do, but my other Hugo-management scripts were another matter altogether. Because the `bin` directory is in my `$PATH`, those scripts had no trouble accessing the pre-0.153.0 Hugo binary and, thus, could run various `hugo` commands and their flags just fine. However, this no longer was the case with hvm, which accesses Hugo's 0.153.0+ `.pkg` download and extracts the Hugo binary into:

```plaintext
/Users/$USERNAME/Library/Caches/hvm/$HUGO_VERSION/hugo
```

Here, $HUGO_VERSION is, *e.g.*, `0.153.2`, the latest Hugo version as of this writing.

With this arrangement, I still could manually run `hugo` (flagged or not) from the command line with no problem, but that wasn't true for the scripts. Specifically, I used `start.sh` for purely local development, `testbuild.sh` for local development in a production environment, and `build.sh` when I just wanted to build the site, not serve it locally. For example, `start.sh` had this line[^flags] for running the local Hugo server to my liking:

[^flags]: I use the `baseURL` flag because I like to test the site locally on multiple devices based on my LAN. The `MY_IP` variable provides the current local IP address of choice, which changes from time to time based on a variety of conditions.

```plaintext{bigdiv=true}
hugo server --port 3000 --bind=0.0.0.0 --baseURL=http://${MY_IP}:3000 --panicOnWarning --forceSyncStatic --gc
```

Now, with the hvm-installed Hugo binary in its new location, the line failed to "find" the `hugo` command --- triggering that `Command not found` response about which a web search for "script command not found" will tell you volumes (this [Red Hat article about resolving the issue in Linux](https://www.redhat.com/en/blog/fix-command-not-found-error-linux) is among the better sources, since macOS and Linux have a lot in common) --- so this errored out the script. The usual solution for this sort of thing is to hard-code the path to the Hugo binary; but, since the path would now vary based on the Hugo version that hvm was using, I initially thought I'd have to make a minor edit to each of these scripts *every time* I changed my Hugo version.

Then, fortunately, I remembered that hvm itself eliminates the need for such tedium.

That's because part of the hvm setup procedure involves source-controlling the `.hvm` text file that hvm will create in the top level of your Hugo project. `.hvm` is a one-line file listing the Hugo version you're using. For example, the one I'm using as of this writing says only:

```plaintext
0.153.2
```

This simplified my fixes to a one-time process for each of the problematic scripts:

1. Add a `MY_PATH` variable pointing to the contents of a `mypath.txt` file that includes the beginning of the path to the hvm-managed Hugo binary. 
2. Add a `HUGO_VERSION` variable pointing to the contents of the `.hvm` file.
3. Change each Hugo command from just `hugo` to `${MY_PATH}/hvm/${HUGO_VERSION}/hugo` --- followed by whatever flags, if any, I want.

With those done, my scripts run as before, letting me go back to managing my Hugo setup as I prefer.

So that's how I've settled into this "new normal."  Perhaps I'm a Cult of One in doing it my way, as I suggested to Joe Mooring in that hvm issue; but I offer this information on the chance that other macOS-using Hugo aficionados may find it of use in their own projects.
