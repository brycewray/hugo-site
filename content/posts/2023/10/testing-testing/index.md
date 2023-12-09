---
title: "Testing, testing"
description: "What I found in recent evaluations of web browsers and the new Cloudflare Fonts service."
author: Bryce Wray
date: 2023-10-23T13:34:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

My curious mind leads me into some pretty deep rabbit holes on occasion, especially where web development is concerned. The particular web dev warrens I've explored this month have ranged from browser performance to the capabilities of [Cloudflare Fonts](https://blog.cloudflare.com/cloudflare-fonts-enhancing-website-privacy-speed/).

<!--more-->

----

## Browser testing

If you do web dev, you likely have a bunch of browsers on your machine so you can test adequately; but, for just your own browsing pleasure, you'll typically want to pick one as your daily driver. Over and above other considerations --- notably, privacy and security --- you'll want to know which has the best performance. However, as I found in my recent testing, making that determination is anything but easy.

I originally intended this section to have lots of hard data in the form of test results, presented both textually and graphically, but decided in the end to avoid that likely overkill. First, I'll describe *how* and on *what* I ran the tests, and then I'll summarize the results.

### Environments and testing platforms

I tested multiple browsers on: my [mid-2023 Mac Studio](https://support.apple.com/kb/SP894) running macOS natively and Windows 11 via Parallels Desktop; and my [mid-2017 27-inch iMac](https://support.apple.com/kb/SP760) running Arch Linux.

For each test, I used the latest available version of each OS (including, in the case of Arch Linux, the latest Linux kernel) and each browser as of the day of that test. Each test took place with the browser in a private/"incognito" window with all extensions disabled, with no other tabs or other browsers open, and with all content filtering otherwise turned off; also, on the Windows emulation, I used the same Parallels Desktop *profile* across the browser testing. Thus, on each separate environment, the tests constituted as fair an "apples-*vs.*-apples" comparison as I could possibly arrange. (Obviously, the native macOS experience on the Mac Studio was *far* faster than either the Windows 11 emulation on the Mac studio or the native Linux experience on the older, slower iMac; but I believe that, **within each environment**, the comparisons were fair and indicative of what each browser could do.)

The tests used four widely known online browser-testing platforms, the first three of which are on the [BrowserBench site](https://browserbench.org):
- **[Speedometer 2.1](https://browserbench.org/Speedometer2.1/)** --- "Speedometer is a browser benchmark that measures the responsiveness of Web applications. It uses demo web applications to simulate user actions such as adding to-do items."
- **[MotionMark 1.2](https://browserbench.org/MotionMark1.2/)** --- "MotionMark is a graphics benchmark that measures a browser’s capability to animate complex scenes at a target frame rate."
- **[JetStream 2.1](https://browserbench.org/JetStream/)** --- "JetStream 2.1 is a JavaScript and WebAssembly benchmark suite focused on the most advanced web applications. It rewards browsers that start up quickly, execute code quickly, and run smoothly."
- **[Basemark Web 3.0](https://web.basemark.com/)** --- "Basemark Web 3.0 is a comprehensive web browser performance benchmark that tests how well your mobile or desktop system can use web based applications. This benchmark includes various system and graphic tests that use the web recommendations and features. . . . Basemark Web 3.0 measures real-world client-side performance to detect browser bottlenecks."[^inconsistency]

[^inconsistency]: **Update, 2023-11-10**: I've since encountered various server-side inconsistencies that have forced me to abandon using Basemark Web in any future testing. Your experience with this benchmark may be better.

Finally, here's an alphabetical listing of the tested browsers:

| Browser | macOS | Linux | Windows 11 |
|---|---|---|---|
| Brave | <span class="emojis">✅</span> | <span class="emojis">✅</span> | <span class="emojis">✅</span> |
| Google Chrome | <span class="emojis">✅</span> | <span class="emojis">✅</span> | <span class="emojis">✅</span> |
| Microsoft Edge | <span class="emojis">✅</span> | <span class="emojis">✅</span> | <span class="emojis">✅</span> |
| Mozilla Firefox | <span class="emojis">✅</span> | <span class="emojis">✅</span> | <span class="emojis">✅</span> |
| Safari | <span class="emojis">✅</span> | n/a | n/a |
| Safari Technology Preview | <span class="emojis">✅</span> | n/a | n/a |
| Thorium | <span class="emojis">✅</span> | <span class="emojis">✅</span> | <span class="emojis">✅</span> |
| Ungoogled Chromium | <span class="emojis">✅</span> | <span class="emojis">✅</span> | <span class="emojis">✅</span> |
| Web | n/a | <span class="emojis">✅</span> | n/a |
{.ulysses}

### Overall observations

Before I give you these thoughts: yes, I *do* know that many folks totally discount tests like these in favor of just going by "how it feels to me" --- but, if you do find interest in results from real tests that were run as fairly as I could manage, read on.

- Which browser provides the best *out-of-the-box* combination of performance and privacy-protecting features? On macOS, it's Safari (followed closely by Brave). On Linux, it's Brave. On Windows 11, it's Ungoogled Chromium.
- It's no shock that, strictly on performance, the Apple-controlled Safari scores at or near the top on the Apple-controlled macOS running on an Apple computer! In similar “D'oh!”-type news: on Windows 11, Microsoft Edge outperforms the pack. In-house optimization is a good thing for performance, one assumes.
- One main question that Mac users must ask themselves is which browser look-and-feel they prefer: WebKit's (Safari) or Chromium's. *(There's a reason I'm not mentioning Mozilla Firefox at this point; more on that later.)* If one prefers Chromium-style browsing, Microsoft Edge and Google Chrome --- privacy concerns aside --- generally out-score other Chromium browsers on macOS, at least where *corporation-controlled* Chromium browsers are concerned.\
\
As for *independent* Chromium browsers on *all* the tested OSs . . .
- The often-mentioned [Ungoogled Chromium](https://github.com/ungoogled-software/ungoogled-chromium) performed fairly poorly on macOS, and thus I would recommend it to only those macOS users who must have the Chromium look-and-feel while completely avoiding Google encroachment.\
\
On Linux, Ungoogled Chromium's scores were more of a mixed bag, tending toward the middle level of the pack. Still, the feeling I get from blog posts and videos is that pro-privacy Chromium partisans on Linux likely will be Brave users.\
\
And, on Windows 11, Ungoogled Chromium did pretty well --- thrashing Brave, surprisingly enough.
- There's no question that the highly interesting [Thorium project](https://thorium.rocks) is an impressive achievement, and it scored very well in my tests on all three OSs. The problem is that it's maintained by a small group of apparently under-equipped and time-constrained[^MacThorium] enthusiasts; so, understandably, Thorium (especially the macOS version) doesn't get the frequent updates that one generally sees in the corporate-controlled Chromium browsers and even Ungoogled Chromium. Given the recent spate of [Chromium updates due to zero-day security issues](https://www.bleepingcomputer.com/news/security/google-fixes-fifth-actively-exploited-chrome-zero-day-of-2023/), that one aspect dissuades me from using Thorium as a daily driver.\
\
*Nonetheless*, Thorium absolutely is a project worth watching, especially if it gains sufficient resources so it can, indeed, adhere more closely to the cadence of Chromium releases.[^ThoriumUnG]

[^MacThorium]: [Alexander Frick](https://github.com/Alex313031), Thorium's primary maintainer, made this comment upon the [most recent release of Thorium for macOS](https://github.com/Alex313031/Thorium-MacOS/releases/tag/M116.0.5845.169): ". . . people have been complaining about me not releasing a new version on the exact same day as a new major Chromium version. To those people, I say, every major version takes me about 6+ Hours of intensive work to rebase. This is followed by many more hours for both me and [@gz83](https://github.com/gz83) and [@midzer](https://github.com/midzer) to build each version, and this is assuming we are using all of our CPU cores pegged at 100% usage, which also slows our machines to a crawl for if we want to do anything else. Please be patient. If people still make issues or discussions about this, my response will be going forward: *Then you try maintaining a Chromium fork!*"

[^ThoriumUnG]: By the way: [Thorium is **not** an un-Googled form of Chromium](https://github.com/Alex313031/Thorium-Win/issues/1).

- What about Mozilla Firefox? Well, at least on macOS, Firefox is in pretty sad shape where performance is concerned --- *i.e.*, it came in dead last *vs.* all the other browsers[^ARM] --- but, in my testing on Linux and Windows 11, it performed well enough to retain the love it usually gets from its sadly dwindling band of supporters, especially Chromium haters on Linux.
- The WebKit-ish Web browser that comes with GNOME on Linux is an odd duck. It got a good result on some tests, but on others came in not only last but ’waaaay last. Still, I suspect very few Linux users really use Web rather than Firefox or Brave.

[^ARM]: Perhaps the macOS-on-ARM version of Firefox is particularly challenged *vs.* the macOS-on-Intel version of Firefox. Since my 2017 iMac is now exclusively a Linux box, I couldn't make that comparison.

----

## Cloudflare Fonts

After running into early troubles with the new Cloudflare Fonts offering, I created a mini-site[^link] for testing purposes and noted the results in an update to my [most recent post](/posts/2023/10/cloudflare-fonts-first-look/):

[^link]: I'm not supplying the link here because I don't know whether I'll keep the mini-site going much longer, since it's served its purpose --- *i.e.*, I've tested all the Google Fonts variations in which I personally have any interest.

> My early testing of CFF on a specific subset of Google Fonts --- variable "Latin" fonts with both regular and italic styles --- showed a small number of cases where CFF fails to work. By "fails to work," I mean the font either (a.) isn't "de-Googled" or (b.) isn't loaded at all. Again, CFF is still in beta. Besides, it could be that the problematic Google Fonts themselves have glitches which somehow confound CFF code. The Google Fonts where I encountered problems were [Brygada 1918](https://fonts.google.com/specimen/Brygada+1918), [DM Sans](https://fonts.google.com/specimen/DM+Sans), [Exo 2](https://fonts.google.com/specimen/Exo+2), [Kumbh Sans](https://fonts.google.com/specimen/Kumbh+Sans), [Noto Serif](https://fonts.google.com/noto/specimen/Noto+Serif), [Roboto Condensed](https://fonts.google.com/specimen/Roboto+Condensed), [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3), and [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4).

One thing to note in general: where a font has a multi-word name, it's important to make sure your website feeds the necessary `link` with an **unescaped** `+` between the font name's words (*e.g.*, `Noto+Sans+Display` for the Noto Sans Display font). I got [help with that in the Hugo Discourse forum](https://discourse.gohugo.io/t/how-to-unescape-plus-sign-in-url-re-cloudflare-fonts/46734) but, if you're using a different web-building tool, make sure it's **not** escaping the `+` as `&43#;`, since that appears to complicate things for CFF.
