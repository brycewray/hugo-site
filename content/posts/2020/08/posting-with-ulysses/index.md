---
title: "Posting with Ulysses"
description: "Still a nicer editor, but not truly SSG-friendly."
author: Bryce Wray
date: 2020-08-04T19:15:00-05:00
---

There's something about this post that hasn't been true of any post on this site since early last year.

I wrote it in [Ulysses](https://ulysses.app), not [iA Writer](https://ia.net/writer).

Back when I stopped using Ulysses as my go-to editor for this site[^1], it was well before the [September, 2019, release of Ulysses 18](https://ulysses.app/releases/). That version enabled, for the first time, the saving of Ulysses files in external folders[^2] as opposed to just being ensconced within the purposely obscured Ulysses database.

This meant Ulysses could allow direct creation and editing of [Markdown](https://daringfireball.net/projects/markdown) files for use in a [static site generator (SSG)](https://staticgen.com) (like my choice, [Eleventy](https://11ty.dev)), *without* going through the tedious process of exporting each change from Ulysses's default in-database Markdown&nbsp;XL to the plain vanilla Markdown *file* that an SSG typically requires. (I like to write these things with Eleventy running on my local setup and see the changes in the browser as I go, so I'll know stuff is working properly regarding code blocks, image importations, and so forth.)

That turns out to be, um, not so great an idea.

So, if you, too, are considering trying Ulysses with your Markdown files for your site's SSG, let me give you some advice learned the hard way.

## Watch your step, there, pilgrim

### You can't go home again (if home is Ulysses)

If you go ahead and use Ulysses this way --- *i.e.*, to edit Markdown files directly --- the most important caveat is: **don't** go back and forth with the same Markdown file between Ulysses and another text editor such as, say, iA Writer or [Visual Studio Code](https://code.visualstudio.com).

That's because, with Ulysses, you have to put some of the content --- notably the all-important *front matter* --- in what Ulysses calls *raw source* or a *raw source block*. (Similar necessities apply for code or a code block.) Otherwise, things can quickly get ugly, because Ulysses will try to change raw or code elements it assumes need to be changed to avoid unwanted appearances. It's OK to look at an directly-edited-in-Ulysses Markdown file in the other editor **as long as you don't re-open it in Ulysses**. If you **do**, all that special raw source and code stuff is wiped away as far as Ulysses is concerned --- for example, making it fail to recognize that the front matter *is* front matter, rather than just ordinary text[^3] --- and so it starts "correcting" things in a way you won't want for SSG purposes.

"Correcting" it how, you ask? Well, Ulysses will insert a backslash before each underscore (as in, an underscore in an image *file name* you're referencing in your front matter). That's because the use of underscores, like the use of asterisks, allows the delineation of italics or boldfacing in Markdown *but* Ulysses "helpfully" assumes that, since you're including them in the name of something (like `my_featured_image.jpg`), you *want* Ulysses to "escape them out" with backslashes so they will *appear* as underscores rather than providing formatting.

Now, to be sure, such an approach is a *good* thing for *normal* work in Ulysses, for reasons I won't cover in this post, but **not** for what you're doing in an SSG. Indeed, if you're in dev mode while writing, such changes can cause your SSG to glitch out.[^4]

### Not bad, but worth noting

You'll also find, quickly, that Ulysses saves pretty much as you go. That's part of its internal sync process. This is another case of a standard Ulysses behavior that usually is helpful; but, if you're simultaneously monitoring the resulting appearance in a local instance of your SSG, it might throw you off, at least at first. (You can also **&#8984;**-**S** to save at any time when you want, as you'd expect.)

A *suggestion*, as opposed to a true caveat, that I can make is to turn off Smart Quotes and Smart Dashes. I'd do that even if you're just exporting-to-Markdown rather than directly editing Markdown. While it's OK to keep them turned on if you're going exclusively with Ulysses for Markdown editing going forward, you may prefer a more bare-bones approach down the way. Besides, if you have `Markdown-It` set up properly (IMHO) in `.eleventy.js`, it'll handle those typographical niceties for you:

```js
  let markdownItOpts = {
    html: true,
    linkify: false,
    typographer: true
  }
  const markdownEngine = markdownIt(markdownItOpts)
```

## So&nbsp;.&nbsp;.&nbsp;. what's the diff?

Why try this? Hasn't iA Writer been good enough?

It absolutely has. This was just a short experiment. Indeed, after running into the issues I described above as well as a couple of others, I reverted to the old export-to-Markdown method and finished this post.

Moreover, the reason I originally used Ulysses for this kind of writing --- the whole "keeping your writing all in the Ulysses Library" idea that drives that app --- is rendered moot by the use of external files. You can *use* these files and Ulysses can track them, so to speak, but they're not part of the Ulysses Library.

That said, I think the writing experience looks a bit *cleaner* in Ulysses, especially if --- as is true for me --- you don't like the particular background treatment in iA Writer. My [aged](/posts/2019/09/now-im-sixty-four/) eyes prefer text to be a bit sharper and have a little more contrast *vs.* the background. The image below shows the difference (albeit not as clearly as I'd like), with the Ulysses text appearance first and then that of iA Writer:

{{< imgh-colors src="Ulysses-vs-iA_Writer_text-treatments_1539x846.png" alt="The same paragraph as it appears in both Ulysses and iA Writer as of August, 2020" width=1539 height=846 >}}

Ulysses also allows slightly easier manipulation of type styles --- *e.g.*, letting **&#8984;**-**I** be a true toggle for italics and **&#8984;**-**B** be a true toggle for boldface. With iA Writer, those  keystrokes *start* the styles but also, if you use either again while still in the text you're styling, *un*-style the text. It's true that, in iA Writer (as in Ulysses), you can manually space past the `*` or `**` at the end of the text; but eons of Mac-user muscle memory have taught me to **&#8984;**-**I** or **&#8984;**-**B** at the start *and* the stop of what I'm styling; so, hang it all, I like this better.[^5]

Then there's a matter of choice. Ulysses lets you change the view font to pretty much any typeface on your device. That's something which iA Writer by design, famously or infamously as the case may be, won't allow. Some days, you simply want to look at something other than one of the three ’faces iA Writer permits (and, hey, [it was once just *one* typeface](https://ia.net/topics/in-search-of-the-perfect-writing-font), so the folks at [iA Inc.](https://ia.net) are being a lot more accommodating in that regard these days). In the comparison screen capture above, I purposely have set Ulysses to use the same iA-created Monospace Duo typeface as I typically use in iA Writer; but it just as easily could've been any of the oodles of other typefaces my iMac boasts.

Finally, writing posts in Ulysses gives me an additional opportunity (besides only on the [work in progress](/posts/2020/06/why-kept-ulysses/)) to use the app's latest version, [which added several cool features](https://blog.ulysses.app/ulysses-20/) I'm enjoying quite a bit.

## Fun while it lasted

This was an interesting experiment, but I likely will stick with iA Writer for this kind of writing. One wants to use the "right tool for the right job," after all, and I can't really argue with the [Markdown Guide site](https://www.markdownguide.org/tools/)'s relative assessments of both Ulysses and iA Writer purely as Markdown tools rather than writing environments. I also agree completely with [Chris Rosser's recent assessment of iA Writer](https://chrisrosser.net/posts/2020/07/17/ia-writer-56-review/) for such purposes.

Still, glitches aside, it was fun to give the newest Ulysses a shot at writing posts again. Perhaps some day Ulysses will have a setting to turn off some of the unwanted behavior I mentioned herein --- call it an "iA Writer mode" or "SSG mode." That would make it pretty hard to beat for someone who would like to stay within Big U for *all* their writing tasks.[^6]

[^1]:	First hinted at in "[iA for IO?](/posts/2019/02/ia-for-io/)"

[^2]:	Although this was seemingly allowed only on Mac, my use of Git and [Working Copy](/posts/2019/07/roger-copy/) got me around that little problem.

[^3]:	When Ulysses "forgets" the raw source block formatting, it can't "understand" that the ```---``` characters wrapped around the front matter make that content special and, ideally, inviolable.

[^4]:	Besides, it's rarely a good idea to keep the same Markdown file open in two different editors at the same time unless they're *designed* for such collaboration, and not many pure-text editors are.

[^5]:	I have asked the iA Writer folks about adopting this same method, but no such luck as of this writing. Maybe someday&nbsp;. &nbsp;. &nbsp;.

[^6]:	When I asked Ulysses Support about this, I was requested to send a screen-capture video of the behavior, so I did. I then got a response that said, in part: *"After consulting with the developers, it turns out this is a known issue and somewhat by design: Only HTML is respected in the Raw Source tags in external folders, the rest gets escaped. Since this causes major problems such [as] in your case, the developers will re-discuss this solution. Unfortunately, I can't make any promises when or whether we will change this behavior, but your feedback is highly appreciated.”*
