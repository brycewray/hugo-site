---
layout: singlepost
title: "Trying Mark Text for website content"
subtitle: "A FOSS option for Markdown-based writing"
description: "A free, cross-platform text editor for (maybe) managing your site’s content."
author: Bryce Wray
date: 2021-05-07T16:30:00-05:00
lastmod: 2021-07-14T07:55:00-05:00
discussionId: "2021-05-trying-mark-text-for-website-content"
featured_image: "mark-text-logo-on-gradient_2400x1350.png"
featured_image_width: 2400
featured_image_height: 1350
featured_image_alt: "Mark Text logo on gradient background"
featured_image_caption: |
  <span class="caption">Mark Text logo sourced from <a href="https://marktext.app/">Mark Text website</a></span>
---

If you're going to have a website which, like this one, is powered by a [static site generator](https://jamstack.org/generators), you'll likely be editing its textual content in an editor app that saves files in the [Markdown](https://daringfireball.net/projects/markdown) plain-text format---the many merits of which I long ago [celebrated](/posts/2019/03/mark-it-down/).

The apps I've used for managing this site's content have included all of the following, in descending order of how much I've used them for this purpose:

- [iA Writer](https://ia.net/writer).
- [Ulysses](https://ulysses.app).
- [Visual Studio Code](https://code.visualstudio.com), but only to edit existing text that I've written in one or more other apps.
- A smattering of other apps, mostly for testing purposes, such as [MultiMarkdown Composer](https://multimarkdown.com) and [Typora](https://typora.io).

Now joining that latter set is [Mark Text](https://github.com/marktext/marktext), not only the subject of this piece but also the app I'm using to write it. But why Mark Text, and why now?

The answer to that one involves some navel-gazing.

## An unexpected referral

One thing you do when you have analytics set up for your site, as I've done for this site with [Fathom Analytics](https://usefathom.com/ref/ZKHYWX) (affiliate link), is keeping track of which sites are referring visitors to you. A few days ago, I noticed a small number of referrals coming from a site of which I'd never heard, although it's been around since 2010: [Linux Rig](https://linuxrig.com). It celebrates not only [Linux](https://www.linux.com/what-is-linux/) in particular but also [free open-source software (FOSS)](https://itsfoss.com/what-is-foss/) in general.

The referral seemed odd since I rarely, if ever, mention Linux here; so, my curiosity aroused, I did some searching and, eventually, came across the source of the referral link. It was a [brief piece](https://linuxrig.com/2019/05/07/why-i-left-ulysses) which had been prompted by my publication of, and borrowed the title from, what as of now is this site's most-viewed article, "[Why I left Ulysses](/posts/2019/04/why-left-ulysses/)." It even was dated from a few days after I'd posted the original.

Now I was really curious, given that the Mac-only, proprietary Ulysses neither runs on Linux nor is FOSS.

As it turned out, that was exactly the point [Steven Ovadia](https://steven.ovadia.org/)[^SSGandFA] was making:

[^SSGandFA]: While Linux Rig runs on WordPress, I was pleased to see that Mr. Ovadia's own site is SSG-based (albeit [Jekyll](https://jekyllrb.com/), but to each his own) and uses Fathom Analytics. Bravo, sir.

> I know this is preaching to the choir, but this post, about the challenge of using a proprietary editor on a proprietary system, reminded me of why I love Linux. I pick the tools and mix-and-match those tools as I see fit. If something doesn’t work, I find something else. It makes it easy to focus on work. But also, it just saves me so much time and energy.

This got me to thinking.

## FOSS and feasibility

Now, to be sure, I'm **not** giving up using macOS (or iOS, for that matter) if I have any choice about it. Still, I've often wondered how I'd continue writing the posts for this site were I ever to decide that I *did* want to go full-FOSS **and**, for that matter, cross-platform so that it wouldn't matter which OS I was using.

I'm mentioning writing, specifically, because:

- Every SSG I've ever used or ever would consider using is already FOSS and cross-platform.
- I already use the cross-platform and (mostly) FOSS Visual Studio Code for code editing and source control, although I also own non-FOSS tools for each and use them when I so choose.
- While I've chosen [Affinity](https://affinity.serif.com)'s non-FOSS macOS-based apps for creating and editing graphics files, there are plenty of reasonably suitable FOSS/cross-platform substitutes, notably [GIMP](https://gimp.org) for bitmap graphics and [Inkscape](https://inkscape.org) for vector graphics. I don't *prefer* them, but I've used them plenty of times in the past and could again if necessary.

Back to the writing: about the only FOSS/cross-platform option I've ever seen that sounded even halfway palatable to me was Mark Text. I've tried it on occasion, but only briefly---and never to try to write anything for this site.

.&nbsp;.&nbsp;. until now, that is.

## Opinions, opinions

There are a number of Mark Text reviews out there, such as:

- "[Mark Text vs. Typora: Best Markdown Editor For Linux?](https://www.linuxjournal.com/content/mark-text-vs-typora-best-markdown-editor-linux)" (October 13, 2020) by Sarvottam Kumar for Linux Journal.
- "[Mark Text --- simple and elegant open source Markdown editor](https://www.linuxlinks.com/mark-text-simple-elegant-markdown-distraction-free-editor/)" (September 14, 2020) by Steve Emms for LinuxLinks.
- "[UberWriter Vs. Mark Text](https://www.linuxandubuntu.com/home/uberwriter-vs-mark-text)" (May 16, 2019) by "Sohail" for LinuxAndUbuntu.com.
- "[App Review: Mark Text](https://hypertextzone.net/blog/ivans1/marktext)" (November 21, 2018) by Ivan Stanton.
- "[Mark Text: FOSS Markdown Editor With Realtime Preview](https://www.linuxuprising.com/2018/05/mark-text-foss-markdown-editor-with.html)" (last updated July 6, 2018) by "Logix" for Linux Uprising.

I suggest reading those to get a fuller picture of Mark Text than what you're about to get from me, which is simply about how it worked for me in writing this particular content for the site.

(By the way, I have no concern about the fact that Mark Text---like VS Code and many, many other apps---is based on [Electron](https://www.electronjs.org/), which is *why* it's cross-platform. Those who like to run their computers on bare minimums of RAM may care, and those who hate the idea that someone might not take the time and effort to code for their beloved platform may care. I fit neither of those categories. I don't care.)

As in that first review I mentioned above, Mark Text is most commonly compared to Typora. Each tries to make writing Markdown look almost as pretty as in a rich-text editing environment like that of Microsoft Word, LibreOffice, or Google Docs. I might note that Ulysses does that to some extent, as well. While that's probably a laudable goal for regular, non-SSG-ish writing, I find that how Mark Text has achieved that gets in my way.

Let's say I want to add a link. If I copy a URL from a browser and try to use Mark Text's standard method (**&#8984;**-**L** on a Mac) to set it up as a link, I get all this (as an example) when I paste it in: [marktext/marktext: 📝A simple and elegant markdown editor, available for Linux, macOS and Windows. (github.com)](https://github.com/marktext/marktext). But I don't **want** all that, and I don't see any way to turn it off and have only the content I wanted.

Now, I should note: that's how it works in Mark Text's *standard* appearance mode. If you prefer a sparer, iA Writer-like environment which gives you more control over that sort of thing (as I do), you can use Mark Text's "Source Code Mode"; **but**, at least in the Mac version, the **Undo** command *doesn't work* therein so, hey, no mistakes!

{{< imgc src="Mark-Text_screen-cap_reg-mode-dark_1568x1090.png" alt="Screen capture of Mark Text in regular editing mode" width="1568" height="1090" >}}

*Above*: Mark Text's standard appearance.
{.imgcCaption}

<br />

{{< imgc src="Mark-Text_screen-cap_SC-mode-dark_1568x1210.png" alt="Screen capture of Mark Text in Source Code Mode" width="1568" height="1210" >}}

*Above*: Mark Text in Source Code Mode.
{.imgcCaption}

I will say that the [documentation](https://github.com/marktext/marktext/blob/develop/docs/README.md) is decent enough, but you have to dig into the project's GitHub issues to learn that, for example, you can't edit or create a *theme* so you can make the app look as you want. (This bothers me because none of the supplied themes work well for my eyes, especially where body text is concerned.)

Finally---and this is true for many cross-platform apps including, yes, VS Code---Mark Text is simply clunkier (quirkier?) to use than a Mac-native app, whether we're talking about how copy/paste operations work, or how you manage files from within the app, or how certain key combinations work as opposed to how you would *expect* them to work. I would guess hard-core Windows users would have similar reservations after having become used to Windows-native apps. That's a largely unavoidable side effect of being cross-platform, so you shouldn't discount Mark Text because of that.

If I were in a position where I *had* to use Mark Text for my Markdown-related purposes, I certainly could. I simply would prefer otherwise.

## The future?

The biggest problem you can have with relying on a FOSS app for "mission-critical" stuff, to use that baleful business term, comes if those who develop the app---occasionally, that's a team of one---can no longer spend the time to keep it going. After all, it's often a hobby project. You can hardly blame the devs, since they're not getting paid for it and they do have Day Jobs. Even though Mark Text has asked for donations, in recent months its devs have said things like [this, from last November](https://github.com/marktext/marktext/issues/1290#issuecomment-726744803):

> Unfortunately, Mark Text is currently not maintained and we currently haven't time for it.

To be fair, I should note that there actually has been one release since then, to [version 0.16.3](https://github.com/marktext/marktext/releases/tag/v0.16.3). I haven't taken the time to dig through the involved commits and determine whether most of those pre-dated this statement.

Given the devs’ promises in the repo about how Mark Text will always be FOSS, I'd presume that, even if all development stopped on Mark Text, the final version would remain extant in the repo. In such an event, you'd then have to decide whether you'd want to rely on something that will never, ever get updated. I know many people like to stick with stuff from years ago that, so far, still works on their particular setups, but that's not the way I roll.

The usual answer that FOSS advocates suggest for such concerns generally runs along the lines of, "Yeah, but all the source code is freely available, so you can fix it yourself or somebody in the open-source community will fix it." To which I reply: "Uh, nope, I can *use* it, but I can't *code* it; and, as for the community, can I rely on that?"

Although I love the ideas behind the FOSS movement and have tremendous respect for many of its adherents, concerns like this give me pause when I consider relying totally on FOSS apps. That's especially true in a case like this where there really aren't what I consider a lot of good choices in the particular category. Mark Text is a great Markdown editor if one accepts it on its own terms; but, when it comes to my own writing and most particularly what I do for this site, I prefer to stick with paid, proprietary apps that I can reasonably assume will be around for at least as long as I need them.
