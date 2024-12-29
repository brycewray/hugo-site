---
title: "Ente Auth for TOTPs"
description: "I’ve learned of another fully FOSS app that fills the bill where TOTPs are concerned."
author: Bryce Wray
date: 2024-03-03T12:57:15-06:00
# draft: true
# initTextEditor: VS Code # default --- change if needed
imgs:
- Ente-Auth-screen-cap_edited_1290x2796.png
---

While looking through a recent [Hacker News thread](https://news.ycombinator.com/item?id=39570692) about an open-source, cross-platform alternative to Google Photos, I found out that the same company, [Ente](https://ente.io), also makes an app which appears to be a great choice for managing your time-based one-time passwords (TOTPs).

<!--more-->

Having written [multiple](/posts/2021/09/taming-time-based-one-time-passwords-totps/) [times](/posts/2023/07/from-raivo-otp-to-2fas/) about TOTPs and the apps people use to keep track of them, I've found myself mainly advising different choices based on one's device and/or operating system. Then, while reading the Hacker News thread about the Ente photos management apps and service, I learned that Ente also offers [Ente Auth](https://ente.io/auth), a completely free service with [open-source](https://github.com/ente-io/ente/tree/main/auth) apps for Android, iOS, and iPadOS (the latter works as a [Catalyst](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst) app on Apple Silicon Macs, too) --- as well as a web-based version which any browser can access. Ente is also working on native apps for the desktop, although the OSs aren't currently specified.

Ente Auth provides free, end-to-end encrypted cloud storage for your TOTPs, making it easy to keep things sync'd across your devices; but, if you're a user who prefers to keep your TOTPs on just one device without any involvement with the cloud, it lets you do that, too. It also provides plenty of options for importing your TOTPs from other apps, including the [2FAS](https://2fas.com/) app about which I [wrote last year](/posts/2023/07/from-raivo-otp-to-2fas/).

{{< img src="Ente-Auth-screen-cap_edited_1290x2796.png" alt="Edited screen capture of Ente Auth application" phn=true >}}

Ente Auth, iOS version (TOTPs simulated and some self-identifying text hidden).
{.img-caption}

The UI isn't quite as pretty as those of some other apps in this category --- perhaps at least in part because [Ente Auth started as a "do this for ourselves while we're at it" project](https://ente.io/blog/auth/) --- but the app has all the options one would need, the multi-device sync is slick and seamless, and the app's development process is quite active. I also like the way Ente Auth shows you the *next* TOTP it will generate for each account, which is nice when the thirty-second time limit is about to expire while you're trying to enter the TOTP someplace.[^RaivoOTP]

[^RaivoOTP]: Of the various TOTP management apps I've recommended, only the [now-discredited](/posts/2023/07/from-raivo-otp-to-2fas/) [Raivo OTP](https://github.com/raivo-otp/ios-application) had that particular convenience.

It's worth a look, IMHO.
