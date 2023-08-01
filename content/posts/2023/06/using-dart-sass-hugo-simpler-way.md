---
title: "Using Dart Sass with Hugo: a simpler way"
description: "A shell script based on my GitHub Action suddenly makes it a breeze to install both Hugo and Dart Sass."
author: Bryce Wray
date: 2023-06-29T13:12:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Off and on for the last several months, I've enjoyed the convenience of installing and updating [Hugo](https://gohugo.io) [with an npm package](/posts/2023/02/hugo-via-npm/), rather than through the [more conventional way](/posts/2022/10/how-i-install-hugo/) I'd previously used. Recently, though, the npm method became impractical for me; but, since [necessity can be a real mother](https://grammarist.com/phrase/necessity-is-the-mother-of-invention/), I wanted to recover that convenience somehow.

After some futzing around, I got there with a shell script.

<!--more-->

## Why not npm?

First: what was wrong with continuing to use the npm package?

Well, the main problem was that I don't have just *one* Hugo-using repository, namely the one that generates this website; I typically have a bunch. Some are for my own use and research, a few are for testing other Hugo users' repos when they seek my help, and still others are for third-party projects on which I work as a contractor, technical writer, and/or consultant.[^seek] Using the npm method means a separate Hugo installation in *each* repo, rather than a *global* installation that each of those repos can access; so, over time, the npm method uses a lot of extra disk space.

[^seek]: If you could use my services, [let me know](/contact/).

Further complicating the mess was the fact that, because I use macOS, the Hugo installation is much fatter than it would be on other platforms. That's due to Hugo's use of [universal binaries](https://developer.apple.com/documentation/apple-silicon/building-a-universal-macos-binary) for macOS, starting with last August's release of [Hugo 0.102.0](https://github.com/gohugoio/hugo/releases/tag/v0.102.0).[^macOS]

[^macOS]: To any anti-Mac folks who plan to razz me over this, akin to [how anti-automobile Luddites used to yell, "Get a horse!" at drivers of malfunctioning early cars](https://www.ocregister.com/2008/12/11/remember-when-few-could-afford-an-auto-in-early-1900s/): don't waste your time. I'll soon be replacing my current Mac --- an Intel-equipped model from 2017 [which will no longer be upgradable when Apple releases the next major version of macOS later this year](https://www.macrumors.com/2023/06/05/macos-sonoma-compatible-macs/) --- so I've recently thought long and hard about whether I should switch platforms. My conclusion: "Oh, hell, no." I'm definitely getting another Mac; in fact, I ordered it while working on this post. I've been a Mac user for [most of the last thirty-nine years](/posts/2019/07/independence/), and the alternatives, however intriguing (and, yes, less costly) some might be, still don't ring my chimes.

Then, when my latest Hugo-related contract work required a normal global installation rather than the npm method (which I'd originally expected would best fit within the usual environment for the customer's team of developers), that was the last straw, and I reverted to my original method.

**However**: having had a taste of the greater convenience offered by the npm way, I wondered: could I somehow have both that kind of convenience *and* a global Hugo installation?

I pondered this further after [the end of the whole Hugo-and-Dart-Sass SNAFU](/posts/2023/06/using-dart-sass-hugo-saga-continues/). You see, the [Dart Sass binary](https://github.com/sass/dart-sass/releases), too, must be installed globally in the system `PATH` in order for Hugo to "see" it.[^customer] This had me watching both the Hugo and Dart Sass repos for new version releases and then, dutifully, installing those new binaries through the [old](/posts/2022/10/how-i-install-hugo) [methods](/posts/2022/05/using-dart-sass-hugo-nitty-gritty/).

[^customer]: This *wasn't* for that most recent customer, who --- as I mentioned briefly in "[Hugo and Tailwind: peace at last (maybe)](/posts/2023/06/hugo-tailwind-peace-at-last-maybe/)" --- specified a Hugo/[Tailwind CSS](https://tailwindcss.com) project.

One day, I hit on a possible solution.

## GHA-style handling

Whenever I build the site out on [Cloudflare Pages](https://pages.cloudflare.com), I do so with a [GitHub Action](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) (GHA). Every single run of that GHA has to do a fresh install of both Hugo and Dart Sass on the GitHub workspace. Whenever there's a new release of either binary, Hugo or Dart Sass, I change the appropriate environment variable in the GHA, and the binary's installation occurs automatically on the next site build.

So I thought, what if I tried that *locally* --- not with a GHA, of course, but rather with a shell script?

That seemed a pretty straightforward solution, *except* for the fact that installing a new Hugo binary always requires getting macOS to "bless" it before it'll run. This is because Apple considers Hugo to be an app from an "[unidentified developer](https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac)." Fortunately, I learned there's a terminal command[^xattr] that works around that problem:

```bash
xattr -dr com.apple.quarantine <location of file>
```

[^xattr]: See also Howard Oakley's "[Ventura has changed app quarantine with a new xattr](https://eclecticlight.co/2023/03/13/ventura-has-changed-app-quarantine-with-a-new-xattr/)" (<span class="nobrk">2023-03-13</span>).

Better yet: since a user of the shell script must have the same Admin-level authority required to make macOS "bless" the binary under the usual method, anyway, I can safely use it on my Mac.[^secure]

(The Dart Sass binary doesn't encounter this problem. Perhaps the Sass folks *are* "identified developers" as far as Apple is concerned. The [Sass website](https://sass-lang.com) *does* say that it's "powered by [MacStadium](https://www.macstadium.com/)," so there's that.)

[^secure]: Well, okay: *if* somebody got to my Mac without permission and ran the shell script, that would be another matter --- **but** I use a desktop Mac that never leaves my home office, much less my home. Obviously, if *your* system is a laptop that gets out and about, you'll want to exercise the usual safety steps: set a difficult-to-guess log-in password, don't share that password with anyone, and share the laptop (if at all) with only trustworthy individuals who don't have system permissions to do anything nasty.

While at it, I decided to make it workable for not just macOS but also Linux and the Windows Subsystem for Linux (WSL).[^RegWin] I tested it successfully on WSL in a virtual machine.

[^RegWin]: I took a shot at converting it to PowerShell for *regular* Windows but, well, life is too short and headaches are no fun. However, if **you** manage to do so, let me know and I'll be glad to update this post with a link to your work.

## The shell script

As with all shell scripts on Linux as well as Unix-like OSs such as macOS, make sure you assign this one the *[necessary permissions](https://kb.iu.edu/d/abdb)*.

I call it `install.sh`; so, from a terminal app, I type:

```bash
./install.sh
```

. . . and let it go to town.

{{< labeled-highlight lang="bash" filename="install.sh" >}}
#!/bin/sh
# --- for use with macOS and Linux/WSL

HUGO_VERSION=0.115.0
HUGO_OS_ARCH='darwin-universal'
# ^^^ choices for 'HUGO_OS_ARCH' (Extended Version only):
# - 'darwin-universal' (macOS Universal Binary, Hugo 0.102.0 and up)
# - 'linux-amd64' (Linux/WSL on x86-64)
# - 'linux-arm64' (Linux/WSL on ARM-64)

DARTSASS_VERSION=1.63.6
DARTSASS_OS_ARCH='macos-x64'
# ^^^ choices for "DARTSASS_OS_ARCH":
# - 'linux-arm64' (Linux/WSL on ARM-64)
# - 'linux-x64' (Linux/WSL on x86-64)
# - 'macos-arm64' (macOS on Apple Silicon)
# - 'macos-x64' (macOS on Intel)

echo "Checking requested versions...\n"

if grep -q "hugo v${HUGO_VERSION}" <<< $(hugo env)
then
  echo "Detected Hugo v.${HUGO_VERSION}!\n"
else
  echo "Failed to detect Hugo v.${HUGO_VERSION} --- installing it...\n"
  wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_${HUGO_OS_ARCH}.tar.gz -O hugo_extended_${HUGO_VERSION}_${HUGO_OS_ARCH}.tar.gz
  tar -xvf hugo_extended_${HUGO_VERSION}_${HUGO_OS_ARCH}.tar.gz hugo
  rm -rf ../bin/hugo
  mv hugo ../bin
  if [ ${HUGO_OS_ARCH} == 'darwin-universal' ]
  then
    xattr -dr com.apple.quarantine ../bin/hugo # "bless" the Hugo binary in macOS
  fi
  hugo version
  rm -rf hugo_extended_${HUGO_VERSION}_${HUGO_OS_ARCH}.tar.gz
fi

if grep -q "github.com/sass/dart-sass/compiler=\"${DARTSASS_VERSION}" <<< $(hugo env)
then
  echo "Detected Dart Sass v.${DARTSASS_VERSION}!\n"
else
  echo "Failed to detect Dart Sass v.${DARTSASS_VERSION} --- installing it...\n"
  curl -LJO https://github.com/sass/dart-sass/releases/download/${DARTSASS_VERSION}/dart-sass-${DARTSASS_VERSION}-${DARTSASS_OS_ARCH}.tar.gz
  tar -xvf dart-sass-${DARTSASS_VERSION}-${DARTSASS_OS_ARCH}.tar.gz
  rm -rf ../bin/dart-sass
  mv dart-sass ../bin
  sass --embedded --version
  rm -rf dart-sass-${DARTSASS_VERSION}-${DARTSASS_OS_ARCH}.tar.gz
fi

hugo env
{{< /labeled-highlight >}}

Here's how this works:

1. The variables at the top let you specify: (a.) the versions of Hugo and Dart Sass; and (b.) the OS/architecture combo you're using. The results set the file names of the downloads so you'll get the correct binaries and versions thereof.

2. The script then runs [`hugo env`](https://gohugo.io/commands/hugo_env/) and reads its (undisplayed) output with `grep`, checking for the desired versions.\
For example, as of when I'm writing this, `hugo env` returns:
{{< highlight bash "linenos=false" >}}
hugo v0.115.0-67caf50698783d3b3d78559ac81483d83e5e1a35+extended darwin/amd64 BuildDate=2023-06-29T15:56:39Z VendorInfo=gohugoio
GOOS="darwin"
GOARCH="amd64"
GOVERSION="go1.20.1"
github.com/sass/libsass="3.6.5"
github.com/webmproject/libwebp="v1.2.4"
github.com/sass/dart-sass/protocol="2.1.0"
github.com/sass/dart-sass/compiler="1.63.6"
github.com/sass/dart-sass/implementation="1.63.6"
{{< /highlight >}}

3. If `grep` *either* can't find one of the versions in the `hugo env` output *or* can't run `hugo env` because there's no global installation of Hugo in the first place, the script proceeds to go get the appropriate archive for whichever of the binaries you don't already have. And, holy cow, is it ever fast! But, after all, that's just as you'd expect from using `wget` and `curl`.\
\
On the other hand: if `grep` **does** successfully detect both desired binaries within the `hugo env` output, the script simply tells you that and jumps down to step 5.\
\
(In the Hugo part in particular: if you've specified macOS by setting your `HUGO_OS_ARCH` to `darwin-universal`, an `if-then` conditional uses `xattr` to take care of the macOS "blessing" of the new Hugo binary, as I explained before.)

4. For each binary, after deleting any existing copy of the binary in the given `PATH` directory, the script extracts the new binary from the newly downloaded `.tar.gz` archive and [moves the binary into a folder designated as being in the system `PATH`](https://zwbetz.com/how-to-add-a-binary-to-your-path-on-macos-linux-windows/).\
\
In this case, I'm using the `bin` folder out in my user directory, which is one level above the Hugo project folder from which I'm running the shell script (thus, `../bin`). You'll need to customize this to fit your own situation.\
\
Once this occurs, the script deletes the downloaded archive, so as not to leave that big file in your Hugo repo folder.

5. At the end, the script runs `hugo env` again --- displaying the results this time --- to confirm that you now have not only a running Hugo binary but also your requested versions of both Hugo and Dart Sass.

**Note for macOS users**: If you migrate your project and `PATH`-known folder (such as my `bin` folder) to a different system architecture --- *e.g.*, from an Intel Mac to an Apple Silicon Mac --- you'll need to delete the installed Dart Sass binary and run the script again. This is because `hugo env` shows the architecture and OS for only an installed Hugo binary rather than for both the Hugo and Dart Sass binaries, so the script can't detect whether a migrated Dart Sass binary is the right one for the new architecture.
{.box}

## Install whenever you develop?

If so inclined, you could daisy-chain this script with your Hugo dev command of choice. Indeed, if your dev command is a bit involved (as if mine), you might put *it* in its own shell script --- *e.g.*, `start.sh` --- and then run the two scripts in tandem:

```bash
./install.sh && ./start.sh
```

For that matter, you could simply add the following line to the end of `install.sh`:

```bash
./start.sh
```

. . . so that running `install.sh` would take care of the entire process every time you develop.

But **why** would you want to do that?

Well, for me, perhaps the coolest advantage that `install.sh` has over the npm method is that `install.sh` handles the Dart Sass binary, too, while the npm method is Hugo-only.[^nonpmEDS] And, since the script is *especially* quick if both binaries are already installed, you incur virtually no time penalty by running it as a sanity check *every single time* you develop in Hugo.[^npmAlways]

[^nonpmEDS]: At least as of this writing, [there's no npm package that installs the Embedded Dart Sass package which Hugo 0.114.0+ accesses from within the Dart Sass binary](https://github.com/sass/embedded-host-node/issues/210).

[^npmAlways]: Indeed, this is very much like how [the npm method I previously described](/posts/2023/02/hugo-via-npm/) works with Hugo: the [Hugo Installer package](https://github.com/dominique-mueller/hugo-installer) always runs but, if it detects an existing Hugo binary (whose version you can specify) in the assigned location, the Hugo-installing script ends and the overall scripting instantly moves on to the next task in the sequence.

----

As so often is the case when I write pieces like this, I don't know if what I've explained here is worthy for only one use case --- *i.e.*, mine. But, hey: if you're a Hugo/Dart Sass user who (a.) prefers to install Hugo through non-npm methods **yet** (b.) would like a slick *and* quick way to keep these two major dependencies always up to date, consider trying this.
