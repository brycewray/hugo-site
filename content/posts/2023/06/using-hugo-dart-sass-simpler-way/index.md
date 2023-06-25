---
title: "Using Hugo with Dart Sass: a simpler way"
description: "A shell script based on my GitHub Action suddenly makes it a breeze to install both Hugo and Dart Sass."
author: Bryce Wray
date: 2023-06-30T09:40:53-05:00
draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Off and on for several months, I've enjoyed the convenience of installing [Hugo](https://gohugo.io) [with an npm package](/posts/2023/02/hugo-via-npm/)  rather than the [more conventional way](/posts/2022/10/how-i-install-hugo/) I'd previously used. Recently, though, the npm method became impractical for me; but, [necessity being a real mother](https://grammarist.com/phrase/necessity-is-the-mother-of-invention/) and all that, I wanted to recover that convenience, somehow.

After some futzing around, I got there with a shell script.

<!--more-->

First: what was the problem with still using the npm package? Well, the problem was that I don't have just one Hugo-using repository; I typically have a bunch. Some (like the one which generates this website) are for my own use and research, some are for testing other Hugo users' repos when they seek my help, and still others are for projects on which I work as a contractor.[^seek] Using the npm method means a separate Hugo installation in *each* repo, rather than a global installation that's usable by each of those repos, and over time that amounts to a ton of disk space used. Further complicating the mess is the fact that, because I use macOS, the Hugo installation is much fatter than it would be on other platforms due to the Hugo project's use of [universal binaries](https://developer.apple.com/documentation/apple-silicon/building-a-universal-macos-binary) since last August's release of [Hugo 0.102.0](https://github.com/gohugoio/hugo/releases/tag/v0.102.0).[^macOS]

[^seek]: Companies do sometimes seek me out for such projects after encountering some of my numerous and nerdy posts. If you could use my services, too, [let me know](/contact/).

[^macOS]: To any anti-Mac folks are planning on razzing me over this, in the way that anti-automobile folks used to yell, "Get a horse!": don't waste your time. I'll soon have to replace my current Mac --- an Intel model from 2017 --- so I've been doing a ton of research on whether I should switch platforms. The simple answer is: "Oh, hell, no." Haven't yet decided on the model and/or config thereof, but whatever I get will definitely still be a Mac. I've been a Mac user for [thirty-nine years](/posts/2019/07/independence/), and the alternatives, however intriguing (and, yes, less costly) some might be, still don't ring my chimes.

Then, when my latest contract work turned out to require a global installation rather than the npm method (which I'd originally expected would best fit within the usual development environment for the customer's dev team), that was the last straw, and I reverted to my original method. But that taste of the greater convenience offered by the npm way made me wonder: was there a way I could have both that convenience *and* a global Hugo installation?

I further pondered this in recent days, as the whole [Hugo-and-Dart-Sass soap opera played out](/posts/2023/06/using-hugo-dart-sass-saga-continues/), because the [Dart Sass binary](https://github.com/sass/dart-sass) is another one that, for Hugo's sake, must be installed globally in the system `PATH`.[^customer] Up to now, I'd been watching both the Hugo and Dart Sass repos for new version releases and then, dutifully, installing them through the [old](/posts/2022/10/how-i-install-hugo) [methods](/posts/2022/05/using-dart-sass-hugo-nitty-gritty/).

[^customer]: This *wasn't* for that current customer, who --- as I mentioned briefly in "[Hugo and Tailwind: peace at last (maybe)](/posts/2023/06/hugo-tailwind-peace-at-last-maybe/)" --- specified a Hugo/[Tailwind CSS](https://tailwindcss.com) project.

One day, I hit on a possible solution.

After all, whenever I build the site out on [Cloudflare Pages](https://pages.cloudflare.com), I do so with a [GitHub Action](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) (GHA). Every single run of that GHA has to do a fresh install of both Hugo and Dart Sass on the GitHub workspace.

So, I thought, what if I tried that *locally* --- not with a GHA, but rather with a shell script?

That seemed a pretty straightforward solution *except* for the fact that installing a new Hugo binary always requires getting macOS to "bless" it before it'll run, since Apple considers Hugo to be an app from an "[unidentified developer](https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac)." Fortunately, it turns out there's a command that works around that problem; and, since you can't use the shell script without the same permissions you'd need to tell macOS to "bless" the binary under the usual method, anyway, I can safely use it on my Mac.[^secure] (The Dart Sass binary doesn't encounter this problem. Perhaps the Sass folks *are* "identified developers" as far as Apple is concerned; I don't know.)

[^secure]: Well, okay: *if* somebody without my authorization got to my Mac and ran the shell script, that would be another matter, **but** I use a desktop Mac that never leaves my home office, much less my home. If you try this on a Mac laptop that gets out and about, you'll want to exercise the usual safety steps: set a difficult-to-guess log-in password, don't share that password with anyone, and share the Mac (if at all) with only those you thoroughly trust *and* who don't have system permissions to do anything nasty.

As with all shell scripts on \*nix and \*nix-like OSs such as macOS, make sure you assign this one the *[necessary permissions](https://kb.iu.edu/d/abdb)*. I call it `install.sh`, so, from a terminal, you'd type:

```bash
./install.sh
```

. . . and let it go to town.

{{< labeled-highlight lang="bash" filename="install.sh" >}}
#!/bin/sh
HUGO_VERSION=0.114.1
DART_SASS_VERSION=1.63.6

echo "Checking requested versions...\n"

if grep -q "hugo v${HUGO_VERSION}" <<< $(hugo env)
then
  echo "Detected Hugo v.${HUGO_VERSION}!\n"
else
  echo "Didn’t detect Hugo v.${HUGO_VERSION} -- installing it...\n"
  wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz -O hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz
  tar -xvf hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz hugo
  rm -rf ../bin/hugo
  mv hugo ../bin
  xattr -dr com.apple.quarantine ../bin/hugo
  hugo version
  rm -rf hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz
fi

if grep -q "github.com/sass/dart-sass/compiler=\"${DART_SASS_VERSION}" <<< $(hugo env)
then
  echo "Detected Dart Sass v.${DART_SASS_VERSION}!\n"
else
  echo "Didn’t detect Dart Sass v.${DART_SASS_VERSION} -- installing it...\n"
  curl -LJO https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-macos-x64.tar.gz
  tar -xvf dart-sass-${DART_SASS_VERSION}-macos-x64.tar.gz
  rm -rf ../bin/dart-sass
  mv dart-sass ../bin
  sass --embedded --version
  rm -rf dart-sass-${DART_SASS_VERSION}-macos-x64.tar.gz
fi

hugo env
{{< /labeled-highlight >}}

While I'm not providing a version for Windows or Linux, here's how this works, so you can adapt it to your own chosen OS:

1. You assign variables to the desired versions of Hugo and Dart Sass. The ones I've listed were the most current at the time I originally wrote this post.

2. The script then runs [`hugo env`](https://gohugo.io/commands/hugo_env/) and reads the output with `grep`, checking for the desired versions.\
For example, as of when I'm writing this, `hugo env` returns:
{{< highlight bash "linenos=false" >}}
hugo v0.114.1-e9b716ad9869b79e7c374bbdae4daf5ee6406bd4+extended darwin/amd64 BuildDate=2023-06-23T11:02:58Z VendorInfo=gohugoio
GOOS="darwin"
GOARCH="amd64"
GOVERSION="go1.20.1"
github.com/sass/libsass="3.6.5"
github.com/webmproject/libwebp="v1.2.4"
github.com/sass/dart-sass/protocol="2.1.0"
github.com/sass/dart-sass/compiler="1.63.6"
github.com/sass/dart-sass/implementation="1.63.6"
{{< /highlight >}}

3. If it either can't find one of them in the `hugo env` output or can't run `hugo env` because there's no global installation of Hugo in the first place, it proceeds to go get whichever of the binaries you don't already have. And, holy cow, is it fast, just as you'd expect from using `wget` and `curl`. *(On the Hugo part, that `xattr` line is where the macOS "blessing" occurs, and almost instantaneously.)*\
This is possible because each binary always has the same file-name structure, with only the version number varying; so, if you plug in those variables, you get the right file. Of course, you'll want to check the release pages for [Hugo](https://github.com/gohugo/hugo/releases) and [Dart Sass](https://github.com/sass/dart-sass/releases), making sure to match the file-name structure that matches the binary required by your OS and system architecture.

4. For each binary, after making sure there's no existing copy of the binary in the given `PATH` directory, it [moves the newly downloaded binary into a folder designated as being in the system `PATH`](https://zwbetz.com/how-to-add-a-binary-to-your-path-on-macos-linux-windows/).\
In this case, I'm using the `bin` folder out in my user directory, which is one level above the Hugo project folder from which I'm running the shell script (thus, `../bin`).

5. At the end, it runs `hugo env` again and shows you the results, confirming that you now have the versions you indicated.

\[Ending]
