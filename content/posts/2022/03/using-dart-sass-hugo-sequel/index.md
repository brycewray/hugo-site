---
title: "Using Dart Sass with Hugo: the sequel"
description: "Hugo’s chief developer comes up with a way to get Embedded Dart Sass on the host, after all."
author: Bryce Wray
date: 2022-03-09T17:41:00-06:00
---

**Note**: For a much more thorough discussion of recent [Sass](https://sass-lang.com)-on-[Hugo](https://gohugo.io) issues, please see my [previous post](/posts/2022/03/using-dart-sass-hugo/). This is a brief follow-up which will assume you've already read that one.
{.box}

Just when I thought the method about which I wrote yesterday would be the only way Hugo users would get to use [Dart Sass](https://sass-lang.com/dart-sass) any time soon --- well, as I said therein, albeit in a totally different context, "Ya Nevah Know."

Lo and behold, I woke up this morning and saw that [Hugo's chief developer, Bjørn Erik Pedersen](https://github.com/bep), had come up with a much better way. It was never that I thought he **couldn't**, of course, but I just figured he was too busy --- and he probably *is*, but he still nailed it with [this](https://discourse.gohugo.io/t/using-dart-sass-hugo-and-netlify/37099/7) on the Hugo Discourse forum.

Pedersen's solution works by building a Hugo site through a *shell script* which installs [Embedded Dart Sass](https://github.com/sass/dart-sass-embedded/) into the hosting vendor's `PATH`, where it must be for Hugo to recognize it during the build. He tested the script successfully on [Netlify](https://netlify.com); and, later, I created versions for [Vercel](https://vercel.com) and [Cloudflare Pages](https://pages.cloudflare.com). I'll provide all three below, so you can choose the one that works with your chosen hosting vendor. And, in case you use a different vendor, I'll offer a hint from Pedersen that helped me figure out how to adapt his Netlify-specific script for Vercel and CFP.

## What to do locally

By the way, all of the scripts below are just for the production side; in local work --- assuming you have [Embedded Dart Sass installed](https://github.com/sass/dart-sass-embedded/releases) in the system `PATH` on your local development machine[^DSElocal] --- you need only run your normal `hugo server` command.

[^DSElocal]: Each release of Embedded Dart Sass has versions for Linux, macOS (just x64 Macs as yet, so Apple Silicon Macs must run it in [Rosetta 2](https://en.wikipedia.org/wiki/Rosetta_(software)#Rosetta_2)), and Windows. Just download the appropriate version and extract it. That will result in a `sass_embedded` folder. Then move *the folder's contents* (but **not** the folder itself) to a location within your machine's system `PATH`. If you need help with that, long-time Hugo user [Zachary Betz](https://github.com/zwbetz-gh) has a great explainer, "[How to Add a Binary (or Executable, or Program) to Your PATH on macOS, Linux, or Windows](https://zwbetz.com/how-to-add-a-binary-to-your-path-on-macos-linux-windows/)."

**However**, you **do** need to make sure that your templating is addressing the correct SCSS-to-CSS [transpiler](https://devopedia.org/transpiler), since Hugo's default assumption is that it'll be the [deprecated LibSass](https://sass-lang.com/blog/libsass-is-deprecated), not Dart Sass.[^transpiler] For example, here's how Pedersen's repo did it in the demo site's `head`:

```go-html-template
{{ $opts := dict "transpiler" "dartsass" }}
{{ $scss := resources.Get "scss/index.scss" }}
{{ $styles := $scss | resources.ToCSS $opts }}
<link rel="stylesheet" href="{{ $styles.RelPermalink }}" />
```

[^transpiler]: The [`transpiler` option has been in Hugo since v.0.80.0](https://gohugo.io/hugo-pipes/scss-sass/#options); but only with what Pedersen successfully demonstrated today has it finally become practical, in my more-or-less humble opinion.

Also, those of you who've never used Dart Sass up to now should be aware that it may require [some changes in your existing Sass/SCSS styling](https://sass-lang.com/blog/libsass-is-deprecated#how-do-i-migrate); but that's a relatively small price to pay for not being stuck in LibSass's late-2018 feature set.

## The scripts

Once you have the appropriate one of these set up as your on-host build script[^shellSyntax] (remember to make that setting in the appropriate place!), the only thing you'll have to change from time to time is the `DARTSASS_VERSION` variable, based on the [latest available release of Embedded Dart Sass](https://github.com/sass/dart-sass-embedded/releases). Before using one of the scripts, you also should make sure it has sufficient *write permissions*, using the [following tip](https://community.cloudflare.com/t/permission-denied-on-build-script/295840/6) I found in a Cloudflare forum discussion on the subject:

[^shellSyntax]: Since it's a shell script, you'll need to use the right syntax. Let's say your normal build command is `hugo --minify`, and you've named your chosen shell script `build-to-host.sh`. That means you'll go into the right place in your host's settings and change the build command **from** `hugo --minify` **to** `./build-to-host.sh`. (That `./` at the beginning is utterly necessary.)

> You can store the \[script] in \[Git] using `git add --chmod=+x build.sh`.

In some cases, that may not matter; but it doesn't hurt and it certainly can help.

### For Netlify

This one is entirely Pedersen's, from that demo he did for testing on Netlify, except that I'm making the final command `hugo --gc --minify` rather than just the original's `hugo` (he was testing only one small page, so it made no difference):

```bash
#!/bin/bash

echo "Install Dart Sass Embedded..."

# This is in Netlify's PATH.
BIN_DIR=/opt/build/repo/node_modules/.bin
DARTSASS_VERSION=1.49.9

mkdir -p $BIN_DIR

curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${DARTSASS_VERSION}/sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

tar -xvf sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

mv sass_embedded/dart-sass-embedded $BIN_DIR

rm -rf sass_embedded*;

echo "List Bin Dir..."

ls $BIN_DIR;

dart-sass-embedded --version

echo "Building..."

hugo --gc --minify
```

The other two, below, are obviously **highly** derivative of this one.

### For Vercel

```bash
#!/bin/bash

# based on https://discourse.gohugo.io/t/using-dart-sass-hugo-and-netlify/37099/7
# - thanks, @bep!

echo "Install Dart Sass Embedded..."

# This is in Vercel's PATH.
BIN_DIR=${pwd}/bin

DARTSASS_VERSION=1.49.9

mkdir -p $BIN_DIR

curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${DARTSASS_VERSION}/sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

tar -xvf sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

mv sass_embedded/dart-sass-embedded $BIN_DIR

rm -rf sass_embedded*;

dart-sass-embedded --version

echo "Building..."

hugo --gc --minify
```

### For Cloudflare Pages

```bash
#!/bin/bash

# based on https://discourse.gohugo.io/t/using-dart-sass-hugo-and-netlify/37099/7
# - thanks, @bep!

echo "Install Dart Sass Embedded..."

# This should be in the PATH.
BIN_DIR=/opt/buildhome/.binrc/bin

DARTSASS_VERSION=1.49.9

mkdir -p $BIN_DIR

curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${DARTSASS_VERSION}/sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

tar -xvf sass_embedded-${DARTSASS_VERSION}-linux-x64.tar.gz;

mv sass_embedded/dart-sass-embedded $BIN_DIR

rm -rf sass_embedded*;

dart-sass-embedded --version

echo "Building..."

hugo --gc --minify
```

### And for others?

Adapting one of these for another vendor will require you to know the appropriate system `PATH`. As Pedersen [advised me](https://github.com/brycewray/hugo-dart-sass/commit/5574d9a42ff062d51dc4aa3506a2315675fa4cb3#commitcomment-68323610) while I was trying to figure it out for the Vercel version:

> A tip would be \[to] do .&nbsp;.&nbsp;. `echo "PATH is $PATH"` to see what folders you can put \[the Embedded Dart Sass binary] in.

That's likely to produce a very long list, separated by `:` characters, so you'll have to go from there and simply try folders that look as if they'd allow you to add something (by naming the folder in the script's `BIN_DIR=` line). It'll all work without errors only when you find a folder that fits the bill.

For example, here's what I got back from trying `echo "PATH is $PATH"` in an early version of the Cloudflare Pages script (and I have separated them onto separate lines, **without** the `:` separator, for your reading convenience, but that's not how they come back when you do it):

```bash
Path is
/opt/buildhome/.wasmer/bin
/opt/buildhome/.gimme/versions/go1.14.4.linux.amd64/bin
/opt/buildhome/cache/.binrc-a5679f71f5966d1b3450c8dcd52d4743ec08e632/binaries/gohugoio/hugo/v0.93.3
/opt/buildhome/.rvm/gems/ruby-2.7.1/bin
/opt/buildhome/.rvm/gems/ruby-2.7.1@global/bin
/opt/buildhome/.rvm/rubies/ruby-2.7.1/bin
/opt/buildhome/.rvm/bin:/opt/buildhome/.nvm/versions/node/v17.6.0/bin
/opt/buildhome/python2.7/bin
/opt/buildhome/.swiftenv/bin
/opt/buildhome/.swiftenv/shims
/opt/buildhome/.php
/opt/buildhome/.binrc/bin
/usr/local/rvm/bin
/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/sbin
/bin
/opt/buildhome/.cask/bin
/opt/buildhome/.gimme/bin
/opt/buildhome/.dotnet/tools
/opt/buildhome/.dotnet
/opt/buildhome/.wasmer/globals/wapm_packages/.bin
```

I stared at that list for a while, and then tried a couple of likely suspects in the `BIN_DIR=` line before finding the one that worked:

```bash
BIN_DIR=/opt/buildhome/.binrc/bin
```

Yes, it's a hit-or-miss proposition; but, when you finally "hit," you're golden from there.[^Render]

[^Render]: I also did one for [Render](https://www.render.com), but be advised that Render **still** doesn't let you specify the Hugo version, as do most other Hugo-supporting hosts. (I requested this capability [nearly a year ago](https://feedback.render.com/features/p/specify-hugo-version).) Nonetheless, I know that different folks like different strokes; so, to change one of these scripts for hosting on Render, change the `BIN_DIR=` line to:\
 `BIN_DIR=/opt/render/project/src/.venv/bin`

## The benefits?

And all of that gives you what, you ask? Very simply, it gives you the full speed and efficiency of [Hugo Pipes](https://gohugo.io/hugo-pipes) **and** the up-to-date quality of Dart Sass, all together. Until now, that wasn't possible. Oh, and it also frees you [Node.js](https://nodejs.org)-hating Hugo users from all those dependencies which can give you the willies.

*Finally: as always, thanks to Pedersen ([@bep](https://github.com/bep)) for his continuing efforts, above and beyond his already substantial day-to-day development work, for the Hugo community!*

**Update, 2022-05-18**: I've since come up with what I consider to be a [better, or at least safer, way](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/).
{.box}
