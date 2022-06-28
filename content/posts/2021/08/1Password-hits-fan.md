---
title: "1Password hits the fan"
description: "An Electron-ic firestorm: a follow-up to my earlier article about password management."
author: Bryce Wray
date: 2021-08-14T10:20:00-05:00
lastmod: 2022-03-28T14:00:00-05:00
discussionId: "2021-08-1Password-hits-fan"
---

Not long ago, I wrote "[Two paths to password management](/posts/2021/06/two-paths-password-management/)." It was an admittedly lengthy piece about using password management software to keep your online credentials as safe as possible.

Earlier this week, AgileBits, the company behind the [1Password](https://1password.com) app, ignited a firestorm by revealing that the Mac version of the upcoming 1Password 8:

- **Will no longer be a *native* Mac app.** Instead, it'll be built on [Electron](https://www.electronjs.org/) to make it easier --- and, one presumes, cheaper --- for AgileBits to make cross-platform versions.
- **Requires storage on 1Password's cloud.**

As a result, angry 1Password users have been "oh-hell-no"-ing all over the various forum posts about the new version, clamoring for alternatives to a vendor they believe has hosed them.

Hence, I offer this follow-up to my earlier article. While it's always timely to talk about password management apps, this week's angst made that doubly so for not only the original article but also this follow-up.

First, let's address **why** people are so angry about 1Password 8.

## 1Password 8: why so serious?

### Electron

The move from a native macOS app to an Electron-based app touched a particular nerve among the most vocal of those protesting the new version of 1Password. But why?

The simple answer is that Electron makes for a lot "heavier" app where RAM and processing power are concerned, because it includes the Chromium browser and NodeJS, built in from the start, on top of whatever else it may offer.[^Terzi] For example, Microsoft's cross-platform [Visual Studio Code](https://code.visualstudio.com) dev tool is one of the more familiar Electron apps for nerds like me, and --- while it's very good at what it does and, frankly, can do things it *couldn't* do without those Electron underpinnings --- it also can tend to bog down what you're doing. And I find that happening on a computer with 64 GB of RAM, so I can only imagine what happens to more modestly configured computers.

[^Terzi]: For a great explanation of the benefits and gotchas of Electron-based apps, see Federico Terzi's "[Why Electron is a Necessary Evil](https://federicoterzi.com/blog/why-electron-is-a-necessary-evil/)."

1Password's PR team tried to counter this anticipated anger by stressing, repeatedly, that performance wouldn't suffer because the new version is built also on the [Rust programming language](https://www.rust-lang.org/), but early users of the current beta version seemed unimpressed, if my reading of the "room" (namely, the collective of various 1Password-oriented blog posts and forum comments) is any good indicator.

Performance questions aside, 1Password has long been a go-to for many Mac users precisely because it's always been a well-crafted, well-designed **native** app for macOS. I'd love to have a nickel for every time I've seen somebody online say that Apple should just go ahead and buy 1Password because it's already so clearly an Apple-ish app. So, to say [the change to Electron isn't going down well with many Mac users](https://sixcolors.com/post/2021/08/not-important-enough-1password-abandons-its-native-mac-app/) is like saying, "Man, the *Titanic* sure did get a nasty scrape from that iceberg."

### Vaults

The whole subject of "vaults" was already touchy among 1Password users who resisted the long-recommended move to subscription-based storage of their credentials on 1Password's own cloud setup. They wanted to keep *local* vaults and sync those with their own preferred cloud storage vendors, like iCloud and Dropbox, but [that's a no-go starting with 1Password 8](https://www.cultofmac.com/749946/1password-upsets-fans/). With the new version, users’ only choice for cloud-based credentials storage will be 1Password's cloud.

## The alternatives?

In the [original article](/posts/2021/06/two-paths-password-management/) to which this is a follow-up, I narrowed the field of password management apps down to two categories, which I labeled "the KeePass way" and "the non-KeePass way." To summarize from my description in that article:

- **The [KeePass](https://keepass.info) way** stores credentials on an encrypted file stored in one of the open-source KeePass formats, usually with the `.kdbx` extension. There are numerous KeePass clients for multiple devices. Many of those client apps are absolutely free, so you may be able to do all this without spending a dime. You choose the apps and browser extensions which will let you work with that file, and you choose where that file will be stored. It can be just on your local device. It can be on cloud storage. It even can be copied manually to multiple devices (although the latter is getting difficult in this time when phones and tablets are gradually losing physical ports). While the freedom of the KeePass way may sound great, it also requires a bigger learning curve and is often less convenient than the non-KeePass way I'll describe next.
- **The non-KeePass way** stores credentials on an encrypted file stored in a proprietary format, varying by vendor, and typically stored on the vendor's cloud storage on some sort of subscription basis that includes apps and browser extensions for different platforms. You have less freedom and more expenditures this way. However, in return, you get easy synchronization of your credentials across platforms and devices, and you also get the convenience of apps and browser extensions backed by companies, not individual developers on their off-hours. There's an obvious financial incentive for those companies to make this work well --- for example, a data breach could be catastrophic to such a company's reputation and sales. By and large, these vendors do appear to *keep* all of it running smoothly and safely. Finally, the learning curve is really not a factor, here: the non-KeePass way "just works" in a fashion that even your most technophobic relatives and employees will find palatable.

All that said, where would I recommend "never-again" 1Password users haul their little red wagons full of credentials to avoid the new version that's so angered them? I'll give you two different answers: one for the KeePass way and one for the non-KeePass way.

### The KeePass way

- On Mac, Windows, or Linux: [KeePassXC](https://keepassxc.org).
- On iOS: [KeePassium](https://keepassium.com) or [Strongbox](https://strongboxsafe.com).
- On Android: [KeePass2Android](https://github.com/PhilippC/keepass2android/).
- Synchronization across your devices: any cloud vendor will do as long as your devices can access individual files on it. This is one particular beauty of the KeePass way: all you're doing is sharing a KeePass-formatted file. You can use whichever vendor suits you.

As for migrating existing credentials from 1Password: ah, well, that's a pain. (Remember what I said at the end of the original: it's best to pick a "way" and stay with it because inter-"way" migration gets ugly.) The best advice I can offer about that is Ryan Nickel's 2019 article, "[Migrating from 1Password to KeePassXC](https://ryannickel.com/html/migrating_from_1password_to_keepassxc.html)." Follow his instructions to the letter and it'll work, but it still won't be easy and you'll find, as he correctly notes, a lot of post-migration cleanup to do.[^migration]

[^migration]: To be fair, though, cleanup will be necessary even if you migrate between the offerings of two different **non**-KeePass way vendors.

### The non-KeePass way

I've had good luck with [Bitwarden](https://bitwarden.com). It gives you pretty much everything you need for password management, but probably with the least financial pain, from among the various vendors. Indeed, Bitwarden's basic plan is absolutely free, although I suggest opting for the paid plan simply to support a good company doing good work. Servers and development ain't free, y'know.

Please note that Bitwarden's desktop client app is, um, Electron-based. Still, that's always been the case for not only Bitwarden but also many of its competitors --- all of which want to be as cross-platform as cheaply as possible --- so those who are hating on AgileBits for abandoning Mac-native apps will have to ignore that fact. If it'll make you feel better, consider that Bitwarden's presence in the open-source community may make up for that, if one is simply debating the ethics of it all.

Migrating your 1Password credentials to Bitwarden is *fairly* easy if you follow the instructions in [this Bitwarden help document](https://bitwarden.com/help/article/import-from-1password/). You'll end up with some detritus afterward (1Password leaves a lot of "chatty" stuff in its files that you don't always see), but at least you'll have your vital credentials safely moved over.

## As for me&nbsp;.&nbsp;.&nbsp;.

I've been a 1Password subscriber for a few years but had already decided to let the sub lapse late this year in favor of a paid Bitwarden plan I'm already using. However, at this writing, I'm also testing out a "KeePass way" setup of KeePassXC on the Mac and KeePassium on my iOS devices.[^KeePassium] Which "way" I'll finally land remains to be seen. I would say the same is true for all those mad-as-hell 1Password subscribers whose hot takes I've been reading the last few days. It's definitely worth watching.

[^KeePassium]: In the original version of this post, I mentioned that I tried KeePassium before Strongbox but kept encountering an iOS 14-caused glitch with the former. I was initially wary about the KeePassium developer's [helpful description of a remedy](https://keepassium.com/blog/2020/09/ios-14-file-doesnt-exist/), which involved [changing a file security setting in KeePassXC](https://www.reddit.com/r/KeePassium/comments/oicp1j/cannot_find_the_database_file_the_file_doesnt/h4ukrbk?utm_source=share&utm_medium=web2x&context=3). However, he subsequently explained to me that KeePassium handled this differently because of a [purposeful feature that's designed to make it more secure](https://keepassium.com/articles/cloud-sync-sandboxing/), so I reverted to KeePassium and it worked fine.

### A closing note about TOTPs

Whichever "way" you go, it's a convenience-vs.-security question whether you store in it any [**time-based one-time passwords**](https://en.wikipedia.org/wiki/Time-based_One-Time_Password) (TOTPs) for multi-factor authentication, even though these apps generally are capable of allowing such storage. It's the whole "don't put all your eggs in one basket" thing. Instead, use a **separate** authentication app.[^masterTOTP] For more information on this subject, see the [Techlore](https://techlore.tech) video, "The Ultimate TOTP/2FA Guide for Max Security Online":

{{< lite-youtube videoTitle="The Ultimate TOTP/2FA Guide for Max Security Online" videoId="iXSyxm9jmmo" >}}

[^masterTOTP]: At the very least, keep the TOTP for any "non-KeePass way" provider (*e.g.*, Bitwarden or 1Password) in a separate authenticator app. You **do** have multi-factor authentication set up for that vendor, right?

**Overall update, 2021‑09‑16**: Based on my testing, I can recommend the KeePassXC/KeePassium route for those who want to use the "KeePass way." However, I didn't like the occasional glitchiness of KeePassXC browser extensions, so I decided to stick with Bitwarden for passwords **only** while adopting --- and really liking --- the [Raivo OTP](https://github.com/raivo-otp/ios-application) authenticator app for my TOTPs, after dropping [Authy](https://authy.com/) due primarily to what I learned from that Techlore video mentioned above.
{.yellowBox}
