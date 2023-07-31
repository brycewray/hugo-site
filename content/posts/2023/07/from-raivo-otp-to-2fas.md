---
title: "From Raivo OTP to 2FAS"
description: "My recommended TOTP app changes ownership under questionable circumstances — so I replace that recommendation."
author: Bryce Wray
date: 2023-07-31T08:46:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
imgs:
- 2FAS_screen_cap_edited_1290x2796.png
---

In 2021, I wrote several posts about how to practice good management of your various passwords. [One of those posts](/posts/2021/09/taming-time-based-one-time-passwords-totps/) dealt specifically with the handling of time-based one-time passwords (TOTPs) and, in it, I recommended the [Raivo OTP](https://github.com/raivo-otp/ios-application) app for iOS users.

Until yesterday, I was perfectly happy both using Raivo OTP and recommending it. But then, I found out things had changed, and not in a good way.

<!--more-->

While viewing yesterday's Episode 144 of the *Surveillance Report* podcast, I saw that Raivo had changed ownership under some less-than-satisfying circumstances. Here is the relevant segment:

{{< lite-youtube videoTitle="Company Takes Over Raivo OTP... - SR144" videoId="Z0IkcyGUqKc" params="start=60&end=287" >}}

. . . followed by the cited issues in the Raivo OTP repository:

- "[Is Raivo under a new company?](https://github.com/raivo-otp/ios-application/issues/271)"
- "[Clearing up take over](https://github.com/raivo-otp/marketing-website/issues/19)" *[sic]*

Unpleasantly surprised by this information, I realized I should do two things ASAP.

First, I had to withdraw that recommendation for Raivo OTP; and I'm doing that now, by both writing this post and issuing an edit to the earlier post.

Second, I had to come up with an alternative recommendation, since the other iOS-compatible OTP apps I'd mentioned in the first post still don't stack up to what Raivo OTP has offered.

The good thing is that, in the nearly two years since the first post, I've encountered another TOTP app for iOS and iPadOS (as well as Android) that merits my recommendation: **[2FAS](https://2fas.com/)**.[^missed] It's free, [open-source](https://github.com/twofas), provides cloud-based sync for your TOTP data, and even has an import/export feature that lets you easily transition to it from several other TOTP apps --- including Raivo OTP.

[^missed]: Although the 2FAS app [was around](https://2fas.com/about-us/) when I originally issued that post, I somehow missed finding it in my research and, thus, failed to include 2FAS in my summary of satisfactory TOTP apps.

{{< img src="2FAS_screen_cap_edited_1290x2796.png" alt="Edited screen capture of 2FAS application" phn=true proc="Cloudinary" >}}

2FAS, iOS version (TOTPs simulated and some self-identifying text hidden).
{.imgcCaption}

As of now, 2FAS has no macOS version, but it does have a [browser extension](https://2fas.com/browser-extension/); and, of course, [Apple's Universal Clipboard feature](https://support.apple.com/en-us/HT209460) lets you copy a TOTP straight from 2FAS on your iDevice to a nearby Mac.

While the circumstances surrounding the Raivo OTP ownership change are less than desirable, at least there are other TOTP apps, like 2FAS, on which an iDevice user still can rely.
