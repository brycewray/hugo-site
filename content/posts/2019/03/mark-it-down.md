---
layout: layouts/posts/singlepost.njk
tags: post
title: Mark it down 
subtitle: Plain but pretty
description: "Markdown: how to have that plain-text cake and still eat it with formatting intact."
author: Bryce Wray
date: 2019-03-08T22:08:00-06:00
lastmod: 2020-01-01T08:39:00-06:00
discussionId: "2019-03-mark-it-down"
featured_image: /images/swan-1639154_1280x854.jpg
featured_image_alt: A baby swan swimming
featured_image_caption: "Image: AnnRos; Pixabay" # quotation marks to allow colon
---

Before summer, 2015, if you'd asked me what Markdown was, I'd have said, "Cutting the price on a product, of course." And I wouldn't have been kidding, either.

My first encounter with the Markdown I'll discuss herein was part of an interview process for a Web development job. The hiring manager sent me an email with the URL of a [GitHub](https://github.com) repository where I'd find several programming puzzles, accompanied by explanatory text files. I expected to find *readme.txt* and that sort of thing.

Instead, there were .md files.

"What's a dot-M-D file?" I muttered.

I remember being unimpressed when I found the answer to that question. Boldfacing and italicizing by placing asterisks? Using pound signs---I wasn't yet calling them "hashes," despite having used Twitter since 2011[^Twitter]---to identify heading levels? What was with these people? If they wanted to use plain text and yet have formatting, why didn't they simply use HTML?[^jobhunt]

[^Twitter]: My current account dates from 2014, but I opened my original one---which I gave a mercy killing, let's just leave it at that---in 2011.

[^jobhunt]: On the other hand, I probably was just grumpy because I'd already realized my poor command of one particular programming language meant I wouldn't be able to solve those puzzles and, thus, my jobless 2015 was going to continue. I normally don't bother chasing jobs when I know it's likely I don't qualify for them, but I'd been out of work for nearly half a year and I figured it was worth a try. Modesty aside, I'm a quick study, so I knew I could rapidly pick up any necessary knowledge I didn't have at the outset. For some jobs, that works fine, especially if the applicant is fresh out of school, but it wasn't suitable for this particular one or this particular applicant. *C'est la guerre.*

Ah, me; did I ever have a lot to learn.

Fortunately, Markdown has grown on me, especially in the last year as my writing has moved to that plain-text, unformatted language and away from the rich-text format (RTF) world it had inhabited since the middle 1980s.

## Previously, on this site&nbsp;.&nbsp;.&nbsp;.

In my [last post](/posts/2019/03/plain-truth), I made what I hope was a pretty clear case for the wisdom of plain text as the best medium for storing any writings you want to preserve for the long term, as opposed to keeping them in proprietary formats.

However, as I mentioned at the end:

> .&nbsp;.&nbsp;.&nbsp;what about formatting? And what about sharing files with people who insist on receiving Word files?

> Ah, yes. Well, this looks like a job for [Markdown](https://daringfireball.net/projects/markdown).

Indeed, you might think of plain text as an ugly duckling compared to the beautiful swan that is a cleanly formatted document or Web page.

But Markdown is the trick up that little bird's sleeve---um, fuzz. (I would say, "down," particularly as a reference to Markdown, but that's too corny even for me, which is saying a lot.) So I'll spend a little time here on what almost certainly is the umpteenth paean to Markdown that you can find on the Web, just in case some of the more technical articles singing its praises leave you cold.

## How to make plain text powerful?

Plain text has been the backbone of computing in general, and the Internet (and the software and servers that make it possible) in particular, from the beginning. However, it seemed to be left behind during the last two decades of the twentieth century as the computing public generally embraced word processing and desktop publishing, each replete with proprietary methods and file formats that ensured a lack of that very permanence I touted in the [last post](/posts/2019/03/plain-truth).

This got some serious minds to doing some serious thinking. They couldn't simply ignore the fact that most users wanted their text formatted---boldfaced, italicized, organized with headings and subheadings, full of bulleted and numbered lists, and so on. But how could all that get into plain text, period, much less in a uniform manner?

Finding a solution to this question became more urgent in the early 2000s as, increasingly, documentation for software apps moved from its traditional print format to online. One obvious answer had been in place since around 1990: HTML. After all, the source code of every single Web page is absolutely plain text. It just has a lot of stuff that makes it not *look* plain:

```html
<h1>This is a top-level heading (H1).</h1>

<p>This would give you a paragraph with <strong>bold text here</strong> and <em>italicized text here</em>.</p>

<ol>
    <li>This is item Number One.</li>
    <li>This is item Number Two.</li>
</ol>

<ul>
    <li>This is an unnumbered item.</li>
    <li>This is another unnumbered item.</li>
</ul>
```

All of the above---and please understand, that's some pretty *bare-bones* HTML---then would look like this in the Web page itself:

> # This is a top-level heading (H1).
> 
> This would give you a paragraph with **bold text here** and *italicized text here*.

> 1. This is item Number One.
> 2. This is item Number Two.

<!-- br -->
> - This is an unnumbered item.
> - This is another unnumbered item.

However, a lot of tech writers (or, in really small shops that couldn't afford dedicated writers, the developers themselves) didn't care *at all* for having to write in HTML. That was especially true when the task got considerably more complicated than my example, above. I'm talking about tables, steps and sub-steps and sub-**sub**-steps, *ad nauseam*.

Yes, there were (and still are) apps to create HTML-based documentation from a [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) editor, but they---like the export-to-HTML features that came to be standard parts of most word processing apps---became infamous for producing [bloated](https://www.moorecreative.com/Articles/Detail/tabid/522/ArticleId/18/How-can-i-clean-extra-code-out-of-Word-HTML.aspx) HTML or [XHTML](https://en.wikipedia.org/wiki/XHTML) that opened slowly and [presented standards-bending difficulties](https://www.simplycast.com/interactive-marketing-support/faqs/why-does-html-code-created-microsoft-word-sometimes-render-incorrectly-message-editor/), especially in certain browsers.

Documentation writers in particular, and writers in general, increasingly believed there had to be a better way to produce text in general, and online text in particular.

They were right.

## A daring fireball, indeed

If you're an Apple *aficionado* like me, you probably need absolutely no introduction to John Gruber of [Daring Fireball](https://daringfireball.net) fame. He's earned a justifiable position as a tech journalist who really knows his stuff, especially where Apple-related news and rumors are concerned.

However, his lasting fame may well lie in his creation of Markdown in 2004 as a way to give HTML-hating writers a way to create the code they needed with just ordinary characters.

For example, here's Markdown that would create the same result as that HTML I showed you earlier:

```markdown
# This is a top-level heading (H1).

This would give you a paragraph with **bold text here** and *italicized text here*.

1. This is item Number One.
2. This is item Number Two.

- This is an unnumbered item.
- This is another unnumbered item.
```

Again, it's a simple example, but you can see how much less typing that would involve, especially for people writing tech docs that would become Web pages. Although Markdown took its sweet time catching on, it's become a lifeline for such writers.

That would be sufficiently important in and of itself; but, in recent years, Markdown has become a mainstay of a broader set of writers, even those such as I who are perfectly happy using HTML (hey, I've been coding Web pages since early 1996, back in the era when [<code style="color: inherit;">\<blink\></code> was still a thing](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blink))---as apps like [Ulysses](https://ulyssesapp.com), [iA Writer](https://www.ia.net/writer), [Bear](https://bear.app), [Byword](https://bywordapp.com), [Drafts](https://getdrafts.com), and more have come into their own as go-to writing tools for those who've long since realized there was a better world beyond the confining quarters of Microsoft Word, Google Docs, and others of that ilk.

In fact, one very cool thing about Markdown is that, if you're *not* averse to using HTML and CSS here and there, you can **mix it seamlessly with those languages** to get things an app may not give you otherwise.

For example, when I [moved from Scrivener to Ulysses last year](/posts/2018/09/why-finally-settled-ulysses/), one of the Scrivener features I missed was creating little on-screen "cards" for chapters so I could shuffle them around and know which was which because each card showed a little synopsis. I fixed this in Ulysses by beginning each chapter with Ulysses's proprietary[^MXL] commenting markup (using <code>+++text like this+++</code>) that, although it wouldn't get included in the export from the chapter, would show up in the first few lines of the Ulysses version of the preview. Then, this year, as I began to use iA Writer more, I found that it has no such commenting feature of its own---but, no problem, since I simply used the built-in commenting feature in HTML. ```<!-- Just like this. Pretty cool, eh? -->```[^commenting]

[^MXL]: Ulysses uses its own variant of Markdown, called Markdown XL, to allow for some additional capabilities, although there are [concerns here and there](https://talk.macpowerusers.com/t/markdown-the-advantage-and-afterall-why/7134/38) that it's not sufficiently compatible. That's one of the reasons Ulysses allows you to use multiple flavors of Markdown, although [you're encouraged](https://ulysses.app/blog/2014/09/tips-ulysses-markup/) to stick with the default Markdown XL.

[^commenting]: However, I must note that HTML comments don't appear in iA Writer's file preview functionality, so I can't use them for up-front synopses the same way as I do the <code>+++</code> stuff in Ulysses. Yes, the comments are in the file, but they don't appear in the text previews in the files list. Meh. You win a few, you lose a few.

There are a number of variations of Markdown, perhaps most notably [Fletcher Penney](https://fletcherpenney.net)'s [MultiMarkdown](https://fletcherpenney.net/multimarkdown) (MMD). Penney even created a nifty MMD editor for the Mac, called [MultiMarkdown Composer](https://multimarkdown.com). In fact, I used it to write some of this post, as part of my getting better acquainted with it. Mind you, my personal preference for MMD writing these days runs more along the lines of iA Writer, and I prefer apps with both iOS and Mac versions so I can write on whichever device is closest at the time; but Penney's app has some serious advantages for technical documentation, in particular. If that kind of writing is where you spend most of your keyboard time, you could do a whole lot worse than Composer.

## Look, Ma: hands!

In pretty much all takes on Markdown that I've seen, one key idea is that, once you pick up the special characters---and, frankly, get used to seeing them amidst your writing---you rarely, if ever, have to take your hands off the keyboard, although the vast majority of Markdown editors, like the word processing apps from which they've stolen more than a few of us,  do have keystroke shortcuts to keep you from having to remember *too* many things in the early going.

The best thing of all is that Markdown is, indeed, plain text. Glorious, [safe-forever](/posts/2019/03/plain-truth) plain text. It just happens to be plain text with super powers, especially when paired with a smart [static site generator](https://staticgen.com) or one of the many exceptional editor apps that use it (the ones I mentioned before are merely the tip of the iceberg).

To be honest, a Markdown editor can't give you *everything* that a rich-text format word processing app can when it comes to formatting, including non-text components, and other file-bloating aspects; but, when your task is to write first and worry later (if at all) about whether the text comes out looking pretty, the Markdown experience is awfully hard to beat.

Oh, that reminds me: I mentioned earlier that a first look at Markdown might cause a word processor user to wonder about how to share files with people---like most businesspeople, not to mention publishing editors or even publication apps like [Vellum](https://vellum.pub/)---that want everything in Word format. Well, never fear: most of the top Markdown editors have superb exporting capabilities. I can highly recommend both [Ulysses](https://ulysses.app/tutorials/export) and [iA Writer](https://ia.net/writer/blog/word-and-github) in particular for this functionality, but they're by no means the only ones.[^backward]

[^backward]: Lest I mislead you, don't take that to mean it's an easy thing to get stuff *back* from Word in a format that's friendly to Markdown, but that's not the fault of Markdown or the apps that use it. Each author's workflow is different, and some adapt to this disparity by simply shrugging and using Word, too, once they've lovingly crafted their early drafts in their Markdown-friendly apps of choice.

## It'll set you free---often, *for* free

You don't have to buy anything to give Markdown a try. There are any number of online sites that will let you play with Markdown and, in most cases, save and/or export your work. Some even let you do it absolutely for free, perhaps with some optional extra charges for certain goodies. (Of those online editors, my limited personal experience leads me to recommend [StackEdit](https://stackedit.io), but you'll want to search for your own best landing spot.)  That means even folks who are mostly Web-bound, like [Chromebook](https://www.google.com/chromebook) users, can get in on the fun.

And, yes, it actually *is* fun. It looks a little goofy on-screen, depending on the editor you're using, but you get used to it pretty quickly. Then, as you realize how much more deeply you're getting into your writing by using a lean, *writing*-focused Markdown editor rather than a bloated, *presentation*-focused word processor---and as you enjoy the warm feeling of knowing that using Markdown enables you to save your work in bulletproof plain text---you'll be amazed how much freer you'll feel when you write.

So, yeah, mark it down: however you go about it, Markdown is something you want to give a shot. `And **sooner** rather than later.`