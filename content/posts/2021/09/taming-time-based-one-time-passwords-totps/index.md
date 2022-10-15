---
title: "Taming time-based one-time passwords (TOTPs)"
description: "A few tips on managing multi-factor authentication — specifically, TOTPs."
author: Bryce Wray
date: 2021-09-20T10:30:00-05:00
---

While I spend a lot of my time here regaling you with content about static site generators, in recent weeks I’ve shared a [couple](/posts/2021/06/two-paths-password-management/) of [posts](/posts/2021/08/1password-hits-fan/) about password management apps. Today, I want to dig a little deeper into that subject with some words about an equally important aspect of managing your online security: [multi-factor authentication (MFA)](https://www.nist.gov/blogs/cybersecurity-insights/back-basics-whats-multi-factor-authentication-and-why-should-i-care), which is also sometimes called two-factor authentication (2FA).

In those aforementioned posts, I only briefly touched on the MFA-related subject of *time-based one-time passwords (TOTPs)* and how to manage them, so I thought I’d correct that now. After all, there’s no *time* like the present. (See what I did there?)

I’ll once again acknowledge the excellent [Techlore](https://techlore.tech) video about TOTPs to which I referred you in one of those earlier posts:

{{< lite-youtube videoTitle="The Ultimate TOTP/2FA Guide for Max Security Online" videoId="iXSyxm9jmmo" >}}

If you watch that video from start to finish, you’ll learn *far* more than I’m going to describe here, so you may just want to do that rather than read what follows. However, I’ll still proceed with this post because some folks, like Yours Truly in All His Hoariness, often prefer to learn by reading rather than watching a video.

## What are TOTPs?

Just spelling out the meaning of the semi-acronym *TOTP* isn’t enough. What exactly *is* a time-based one-time password?

Well, never mind the “time-based” part for the moment; we’ll break it down even further. What is a one-time password (OTP) in the first place? As the name implies, it’s a password (usually a set of digits rather than an actual word or phrase) that is valid only once. This ephemerality is intended to keep an OTP from being stolen — although, as you’ll see, that’s not always a given.

Unless this is your first week on the web, it’s almost certain you’ve encountered OTPs many times before. Let’s say you go to a bank website to check on your account. Let’s also say you’ve already set up MFA/2FA with the bank. You’ll log in with your username and the *regular* password that you use *every* time. Now comes the MFA/2FA part: to confirm that you really are you, and not someone who’s somehow stolen your username and regular password, the bank requires you to enter an OTP, too. You can learn the required OTP for that particular instance in various ways, some better than others for reasons we’ll explain shortly:

- The bank can text it to your phone.
- The bank can email it to you.
- You can use a special app to view it and, perhaps, copy/paste it into the appropriate field on the website. Typically, this will be a *time-based* OTP (TOTP), which leads us to that subject.

A *time-based* OTP is generated through an algorithm that computes a (usually) six-digit code by concatenating and scrambling (1.) the actual time in seconds and (2.) the numerical value from a “secret” or “seed.” Because of that first part — the time in seconds — it’s important that the clock of whatever device you’re using is set to the precise time. Fortunately, in this day when most cell phones and computers are accurate to the second, that’s usually a given.

Like any other OTP, a TOTP has a short life span, typically thirty seconds. It changes at the :00 mark and :30 mark of each minute. There are some odd-duck TOTP generators that don’t follow that scheme[^1], but the aforementioned algorithm is part of an [open standard](https://datatracker.ietf.org/doc/html/rfc6238) and so, fortunately, the vast majority of them do.

In the usual scenario, you’ll get the appropriate TOTP from an app. This works because, in the setup process, you gave the app the account’s “secret.” This usually happens through scanning a QR code that the account entity provides you, although many sites also let you type in the “secret” if needed. Armed with this data and using the device’s built-in clock, the app re-computes and displays the account’s new TOTP every thirty seconds.

You may then be wondering: why do I have to use an app and fool with all this TOTP stuff? Why **not** just let the bank (or whatever) send me an OTP via text or email?

The answer is that neither texting nor email is (or was designed to be) a secure method for delivering *anything*, much less passwords of any kind. I won't go into why that's true, but any number of security experts tell you, essentially, that you should consider anything sent in a text or an email to be public. That's how insecure both texting and email are. So why do so many entities insist on providing your OTPs via either method? Well, that's something you'll need to ask each such entity. The main point you should draw from this discussion at this point is: where an entity *allows* you to have TOTPs, you should go for that.

## How to manage TOTPs?

As you may know, certain password management apps allow you to keep your TOTPs in there with your normal passwords. That's certainly better than not using TOTPs at all, but doesn’t strictly follow best practices. Ideally, you should use separate apps for such purposes to avoid the proverbial "all-your-eggs-in-one-basket" situation.

Now, let's get into the story of the apps themselves. As is true for many stories, there are bad guys and good guys --- or, at least, not-so-good guys and mostly good guys.

### The bad (or not-so-good) guys

As the Techlore video explains in detail, the technology behind TOTPs is an open standard, so your TOTPs should be *yours* — and that means the “secrets” (or “seeds”) and the QR codes that go with them. They shouldn’t be locked into any particular OS, device, or app. Yet, such lock-in is precisely what happens if you use the proprietary TOTP apps which get mentioned most frequently in major reviews.

Beyond those already sufficiently bad general points, here are a few more specific observations.

[Authy](https://www.authy.com) requires a phone number for setup, hardly great for privacy concerns. Authy also can make it *really* difficult to break away from its ecosystem, to the point of sometimes not allowing individuals to delete their Authy accounts! (I was able to delete mine, but only after waiting thirty days and receiving multiple “Are you sure?” emails.) About the only good point of Authy, and one which pulls in many users, is its ease of cross-device syncing — on Authy’s servers — so you can access your TOTPs on your various devices and OSs. Indeed, it’s the only one of these that provides (mostly) full-fledged desktop apps as well as mobile apps.

[Google Authenticator](https://en.wikipedia.org/wiki/Google_Authenticator) is infamous for being a locked box when it comes to getting your TOTPs from one device to another. That’s a big deal, considering that phones can die, get stolen or lost, or otherwise become unavailable without warning. Google has tried to improve on this problem in the last year, but this app remains a pain in the ass, particularly on this score. Sadly, many who’re not familiar with TOTPs see widespread instructions to “use Google Authenticator” and follow them blindly, not realizing many other apps can accomplish the same purpose with much less trouble.

Corporate and educational environments often require Authy, Cisco’s [Duo app](https://duo.com/product/multi-factor-authentication-mfa/duo-mobile-app), or [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app), so you may not be able to get away from them. In fact, I’d go so far as to say you should use one of them *only if* you’re in a setting that requires it.

Incidentally, here’s a little more about Microsoft Authenticator in particular. Lately, Microsoft has been adding some consumer-friendly features to this app. It can now be used as a full password management app rather than just for TOTP and Microsoft-specific authentication (more on that in a moment). Still, this app remains something to use only if you don’t have a choice or simply don’t know better.[^2] By the way, Microsoft Authenticator really should be considered a one-device-per-user app, so it’s a bad choice if you have any wish to share TOTPs among multiple devices. The Microsoft app is best suited for Microsoft-heavy workplaces, where it’s increasingly required for logging into many Microsoft cloud services. For example, a [recent wrinkle is that it allows password-less access](https://www.microsoft.com/security/blog/2021/09/15/the-passwordless-future-is-here-for-your-microsoft-account/) to one’s Microsoft account through a proprietary kind of TOTP. While there definitely are security advantages to this feature, the app’s various idiosyncrasies and shortcomings versus other TOTP apps — especially the ones I’m about to suggest — make the value of that attribute dubious at best.

I’ll offer one final caution regarding Microsoft Authenticator. This comes into play if you do have to use it *and* for some reason end up deleting it and restoring from your previous backup. If so, you must do that at **one specific spot** in the app reinstallation process or else you’ll have to re-enter all your TOTPs:

{{< imgc src="MS_Authenticator_recovery_prompt_annotated_1125x2436.png" alt="Annotated screen capture from Microsoft Authenticator application setup process" phn="true" width=1125 height=2436 >}}

This is the only screen in the Microsoft Authenticator setup process where you have a chance to recover previously backed-up TOTPs (annotation added, of course).
{.imgcCaption}

In short: you can do better than all these.

### The (mostly) good guys

So if those are the TOTP apps to avoid, assuming your workplace or school doesn’t require one of them, which ones should you try instead? Which apps let you not only manage your TOTPs but have **full** access to all their data? The good news is that all the apps I’m about to mention do just that. Each gives you a way to view each TOTP’s “secret” and QR code. Indeed, I was able to use that easily accessed data from one of the apps to load TOTPs into the others for my testing: I just displayed each TOTP’s QR code on screen and used the phone to scan it. Easy-peasy.

For Android devices, you’d be hard-pressed to find something better than [Aegis Authenticator](https://getaegis.app/), a free/open-source software (FOSS) app. Although it mostly lacks cloud backup functionality[^3], it lets you export encrypted vaults to your cloud of choice and access them from there.

{{< imgc src="Aegis_screenshot_edited_1080x1920.png" alt="Edited screen capture of Aegis Authenticator application" phn="true" width=1080 height=1920 >}}

Aegis Authenticator (TOTPs simulated and some self-identifying text hidden).
{.imgcCaption}

For iOS devices, I can strongly recommend [Raivo OTP](https://github.com/raivo-otp/ios-application). Its main app is on iOS, while its recently added macOS app is a “receiver” which lets you copy a TOTP from your phone straight to the Mac clipboard.[^4] It backs up to iCloud and thus makes your TOTPs available on all your iOS devices. Both apps are free, but the dev obviously appreciates — and, in my opinion, deserves — donations to help keep his work going.

{{< imgc src="Raivo-OTP_screenshot_edited_1125x2436.png" alt="Edited screen capture of Raivo OTP application" phn="true" width=1125 height=2436 >}}

Raivo OTP, iOS version (TOTPs simulated and some self-identifying text hidden).
{.imgcCaption}

If Raivo OTP doesn’t float your boat for some reason, you can also try [OTP Auth](https://cooperrs.de/otpauth.html). It comes in both iOS and macOS/Catalyst flavors. As with Raivo OTP, it provides backups on iCloud. I prefer Raivo OTP’s UI over that of OTP Auth, but otherwise find each to be equally capable. The iOS app is freemium[^5] while the macOS app must be purchased for, at this writing, $5.99. If you don’t want or need the macOS app, you certainly can use only the iOS app and just manually enter into your Mac the TOTPs the app shows you.

{{< imgc src="OTP_Auth_screenshot_edited_1125x2436.png" alt="Edited screen capture of OTP Auth application" phn="true" width=1125 height=2436 >}}

OTP Auth, iOS version (TOTPs simulated and some self-identifying text hidden).
{.imgcCaption}

Please note that, although Raivo OTP has its code publicly viewable on GitHub, it’s not 100% FOSS due to [its licensing](https://github.com/raivo-otp/ios-application/blob/master/LICENSE.md). Moreover, OTP Auth is strictly closed-source, although it does offer some content on GitHub regarding how to decrypt certain files the app generates. Indeed, if you must have a truly FOSS TOTP app on iOS, you should go with [Tofu Authenticator](https://www.tofuauth.com/). This app provides basic TOTP functionality but offers no backup capability when you change phones other than through a full phone backup to/from a Mac. You see, Tofu Authenticator (purposely?) doesn’t back up the TOTPs to iCloud *or* an iCloud-based backup of your phone. The unwieldiness of the iPhone-to-Mac backup process its dev does suggest[^TofuBackup]  makes this limitation a showstopper for me. On the other hand, you may not even *want* to back up your TOTPs to cloud storage. In that case, especially if you prefer using FOSS whenever possible, you'll probably want Tofu Authenticator.

[^TofuBackup]: See the "FAQ" section on the [Tofu Authenticator website](https://www.tofuauth.com/).

{{< imgc src="Tofu_Authenticator_screen_cap_edited_1125x2436.png" alt="Edited screen capture of Tofu Authenticator application" phn="true" width=1125 height=2436 >}}

Tofu Authenticator (TOTPs simulated and some self-identifying text hidden).
{.imgcCaption}

## Time to wrap up this TOTP talk

If you’re not already making use of whatever 2FA/MFA that your various online accounts offer, especially those that properly require TOTPs, you no longer have an excuse to avoid this security enhancement. Even using the apps against which I warn above is better than using *no* TOTP apps. Better still, the ones I *do* recommend will not only help protect you but also ensure you always have access to those TOTPs and all the goodies that make them work for you.

[^1]:	For example, some generate seven- or eight-digit TOTPs. Also, the TOTP life can be shorter or longer. It’s up to each generating site.

[^2]:	Whether you have a choice is one thing, but this post is my attempt to help you get past the “simply don’t know better” part.

[^3]:	The Aegis off-device backup process works only with the Android Storage Access Framework, which not even Google Drive fully supports.

[^4]:	One especially nerdy thing I liked about Raivo OTP is the ability to add TOTP icons by creating pull requests on the appropriate Raivo OTP GitHub repo. Since not every TOTP-savvy service is that widely used and thus might not already have its icon(s) in the Raivo icons repo, the ability to propose additional icons is a nice feature to have if you’re as OCD-ish as I about having UI consistency.

[^5]:	The only advantage to you of paying for “OTP Auth Pro” is gaining the ability to add bitmap icons to TOTP accounts which lack them. Other than that, it supports the dev.
