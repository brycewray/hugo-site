---
title: "The version-control follies"
subtitle: "Life’s too short for CLI"
description: "Why you should go GUI with version control."
author: Bryce Wray
date: 2018-10-06T08:30:00-05:00
lastmod: 2020-10-25T12:40:00-05:00
discussionId: "2018-10-version-control-follies"
featured_image: javascript-programming-1873854_2605x1432.jpg
featured_image_width: 2605
featured_image_height: 1432
featured_image_alt: "Computer code on a monitor"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/Boskampi-3788146/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1873854">Boskampi</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1873854">Pixabay</a></span>
---

If you, as did I, came late to all the static site generators (SSGs) fun, don't feel bad. Besides, from what I can tell in some changelogs and various articles from the last few years, we picked a good time to get in. What were once pretty bare-bones ways of generating and serving web pages are much better now, and are continuing to improve.

However, one aspect of them probably won't improve any time soon, and that's the dreaded thing known as [*version control*](https://en.wikipedia.org/wiki/Version_control), usually accomplished through [Git](https://git-scm.com) commands. Now, mind you, I would never say a bad thing about version control. It's wonderful to have when a SNAFU occurs in one or more parts of your site and you can just use a simple command to roll back to a more pristine setup.

No, the problem is that "simple command" part. Just as [the cake is a lie](https://knowyourmeme.com/memes/the-cake-is-a-lie), so, too, is the idea that it's just like falling off a log to use Git commands. Yet, when you read many how-to articles about working with an SSG to do a website, you keep seeing examples that are replete with Git commands entered through a [*command-line interface* (CLI)](https://en.wikipedia.org/wiki/Command-line_interface).

## An obligatory break for pseudo-nostalgia

Lest you young whippersnappers think I'm not up to handling a CLI, please note that I spent *years* using MS-DOS on IBM-compatible PCs before Windows finally gained enough traction that my employers of the time considered it worth their while to have. In case you've never encountered MS-DOS on what formerly was called a "DOS prompt" and now has the more dignified name of "command prompt," [here](https://www.lifewire.com/dos-commands-4070427) are the commands by which we used to go through our day.

Okay, so I'm exaggerating a bit. My typical day in MS-DOS usually consisted of typing an app name (*e. g.*, `word`)—*if* it was in the system file [path](https://www.pcmag.com/encyclopedia/term/41838/dos-path), and you'd typically make sure it was—and hanging around in that app for a few hours. Remember, this was before `Alt`-`Tab` made it a simple matter to jump among different apps. If I needed to find and manipulate files apart from that app, I found myself doing sequences like:

```batch
cd
cd manuals
dir
cls
cd m3600
dir -w
cls
copy manuald1.doc manuald2.doc
```

The latter was to copy Draft 1 of an instruction manual file so I could work on Draft 2 while keeping Draft 1, just in case. But why such clunky file names? Remember: MS-DOS was limited to eight-character, non-case-sensitive, non-spaced names for files and directories. We got up to Windows 95 before the IBM-compatibles' world shed that nasty little distinction, and up to Windows XP before the CLI sitting behind the Windows environment really recognized longer names rather than just *pretending* to do so in Windows while actually turning *My Windows Document.doc* into *MYWINDO~.DOC* and *My Windows Document As Well.doc* into *MYWIND2~.DOC*—and so on.

You kids missed so much. You lucky dogs.

Anyway, gitting back to Git (see what I did there?), you command it via a CLI. As with those DOS commands I mentioned above, you must type Git commands exactly the right way with exactly the right sequences and only when you're in the exactly right directory. Please note that your chosen platform's CLI may not necessarily make your current directory easy to identify without a little messing around with things.

Having served my time in hell with MS-DOS a quarter-century ago, I say: nope, life is too short; be a wimp like me and **go GUI**. Otherwise, you'll emulate me anyway—as in, the part in building this site's initial setup where I kept fat-fingering Git commands with certain extensions and finally muttered, "I *know* there's gotta be a GUI app for this."

## "We're gonna need&nbsp;.&nbsp;.&nbsp;."

And, yes, there are GUI apps for Git. But what complicated this a little bit for me was that, rather than the seemingly ubiquitous [GitHub](https://github.com), I'd chosen [Bitbucket](https://bitbucket.org) to hold the web-based remote repository (or "repo") for my site's files, from which they'd be pushed to the host, [Netlify](https://netlify.com). Why Bitbucket? Because Bitbucket allows free private repos and GitHub doesn't. No, I'm not that cheap, but this site isn't likely to generate income for a good while, so I considered it a waste of money to have the meter ticking in the interim if I could help it. And, with Bitbucket, I could. Besides, its parent company is [Atlassian](https://www.atlassian.com/software), whose products I've used at multiple Day Jobs and thus I have become, at least, comfortable with how the company does things.

So I needed not just a GUI app for Git-commanded version control, but a GUI app for Git-commanded version control with Bitbucket. Fortunately for my sanity, Atlassian has one. It's called [Sourcetree](https://www.sourcetreeapp.com). While some developers don't care for it, I found it precisely what I needed. I needed only minutes to make Sourcetree see both my local repo and the remote repo on Bitbucket. After that, keeping them sync'd was, and has remained, a matter of point-and-click. Ah. bliss.

In short, I'd gone from a setup in which *every* change (no matter how tiny) involved a series of hand-typed Git commands to one in which change was no big deal. Make and save the change locally, do a commit, then do a push. Click, type in a description of what you're changing, click, and click. Watch Netlify run with it. Bang. Life is good.

{{% yellowBox %}}**Correction, 2019-07-14**: At the time I wrote this, I thought SourceTree was Bitbucket-specific but, of course, that's not true; it works also with GitHub and [GitLab](https://gitlab.com) as well. Also: since the original writing, GitHub has joined Bitbucket (and GitLab) in having free private repos. Each has slightly different rules about them, such as numbers of contributors allowed.{{% /yellowBox %}}