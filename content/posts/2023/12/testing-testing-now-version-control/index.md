---
title: "Testing, testing: now with version control"
description: "Browser performance scores keep changing, so now I track them in Git."
author: Bryce Wray
date: 2023-12-11T10:43:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

My recent spate of browser-hopping while trying to base each such choice on The Data™ has, of course, required *gathering* data. And, because the world of browsers involves frequent changes, that's become an ongoing task. So I decided to version-control it **and** put the results out there for all to see.

<!--more-->

The [public form](https://github.com/brycewray/browser-tests) of my new `browser-tests` repository, always very much a work in progress, will show you my latest findings. There's [one page for macOS](https://github.com/brycewray/browser-tests/blob/main/macos-2023-mac-studio.md) and [another for Arch Linux](https://github.com/brycewray/browser-tests/blob/main/arch-linux-2017-imac.md). Here's an alphabetical list of the browsers I currently am including in the tests:

- Arc (macOS)
- Brave (macOS and Arch)
- Google Chrome (macOS and Arch)
- Microsoft Edge (macOS and Arch)
- Mozilla Firefox (macOS and Arch)
- Orion (macOS)
- Safari (macOS)
- Ungoogled Chromium (Arch)

. . . a list which can and will change over time, depending on several factors which, themselves, will remain somewhat in flux.

The repo also has a [`pre-git`  area](https://github.com/brycewray/browser-tests/tree/main/pre-git) where you can see what I did before going Full Git with this thing. In short, it was a growing set of text files (including those on which I based the earlier ["Testing, testing"](/posts/2023/10/testing-testing/)) and involved a lot of needless repetition. I realized that, in the end, the best bet is to keep these two Markdown files and update them as I do new tests. That way, there will always be one source of truth with the latest data for each config (*i.e.*, macOS-on-Mac-Studio and Arch-on-iMac), yet with a clear Git trail to earlier versions --- at least, that'll be true once I actually add to it.

I made the repo public mainly because I suspected that some of my readers would be similarly interested in such data **but** didn't want to spend their own time running the tests, especially not every time there's a need to re-do them. So, there ya go. Enjoy.

**Update, 2023-12-16**: I later decided to do my Linux testing in Fedora rather than Arch, due to the easier availability of truly official browser versions for that distro. The resulting page will be [here](https://github.com/brycewray/browser-tests/blob/main/fedora-linux-2017-imac.md).
{.box}

----

## A follow-up to "Firefox on the brink?"

I would be remiss if I didn't acknowledge that my [previous post](/posts/2023/11/firefox-brink/) got a **lot** more attention that I'd ever dreamed it would.[^numbers]

[^numbers]: Although I no longer use a separate analytics service (because the small size of my *usual* traffic doesn't merit it), I still can see relatively accurate numbers from the anonymized server-side analytics that come with using Cloudflare's free tier. At least, *trends* are pretty clear.

First, it got mentioned in the [2023-12-04 edition of the *Changelog News* podcast](https://changelog.com/news/73). For a few hours, that produced a decent spike in my site's numbers, and I figured that would be the end of it. Oh, my, was I ever wrong.

The next day, somebody --- perhaps someone who'd found the post through that *Changelog News* podcast? --- [submitted it to Hacker News](https://news.ycombinator.com/item?id=38531104). It ended up on the front page and *stayed* there for hours, long enough to gather hundreds of comments and, not incidentally, generate tens of thousands of hits to the post.[^CW] (As I've learned ruefully in the past, certain topics really trigger the HN crowd. I'd already been aware that Tailwind CSS is one of them; and, it now appears, another is the decline of Firefox.)

[^CW]: Indeed, my post's venture into semi-viral status actually cost me a little money. The resulting "invocations" of the Cloudflare Pages Function in front of my site blew ’way past the free tier's 100K-per-day limit, forcing me to drop a few bucks to go to the next tier and keep the little sucker running.

**Note, 2023-12-17**: I later learned that the article also got picked up in multiple subreddits (*e.g.*, [/r/webdev/](https://www.reddit.com/r/webdev/comments/18c5zue/firefox_on_the_brink/)) and on [Slashdot](https://news.slashdot.org/story/23/12/05/0745251/firefox-on-the-brink).
{.box}

Thanks to anyone who started following my feed as a result of all the attention that "Firefox on the brink?" amazingly received. I hope you consider sticking around. And, just for the record: I actually like Firefox very much; I just fear for its future due to the reasons I cited, all of which have to do with real-world facts and policies, not anyone's fleeting feelings.
