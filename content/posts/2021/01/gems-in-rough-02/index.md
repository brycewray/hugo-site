---
title: "Gems in the rough #2"
description: "More geeky hints for SSG fans."
author: Bryce Wray
date: 2021-01-16T13:45:00-06:00
---

For those of you who haven't read the [first](/posts/2020/12/gems-in-rough/) "Gems in the rough," initially posted just a few weeks ago, it contained a variety of what I hoped were useful hints and tips for those of you who, as do I, love playing around with websites built by [static site generators](https://jamstack.org/generators) (SSGs). In that one, I offered the opinion that "this might end up being a series."

Well, looks like we're there, because I've already accumulated some more of this stuff to pass along. (Fortunately for you, I doubt seriously that future such instances will be quite this closely spaced. No promises, though.) So, without further ado&nbsp;.&nbsp;.&nbsp;.

----

## Straight cache, homey

*[Fans of U.S. professional football likely will "get" the pun in that headline without much help, but [here's a brief explainer](https://www.urbandictionary.com/define.php?term=straight%20cash%2C%20homey) for the rest of you.]*

I spent [three](/posts/2020/11/using-postcss-cache-busting-eleventy/) [entire](/posts/2020/12/cache-busting-eleventy-take-two/) [posts](/posts/2020/12/hashing-out-cache-busting-fix-eleventy/) in recent weeks talking about how to handle cache-busting your CSS in [Eleventy](https://11ty.dev). Now, don't worry: I'm *not* going over all that again, I promise. **Still**, for those of you who *did* read those posts, especially the last two (in which I proposed a solution that actually works with my recommended CSS setup), please be aware that I recently added one more notable bit of related info. So here it is once again (including a later update):

> **Important**: Note that the process completes itself **only** during actual site **builds**, and **not** in the `dev` or `testbuild` scripts --- which means that, for version control purposes (*i.e.*, changes you can commit in Git), actual site builds are the only times that all the applicable changes will occur. Thus, you may want to `gitignore` the top-level file `csshash` (but **not** `csshash.js`) and the files `/_data/csshash.json` and `/_data/year.json`.

While this means your builds online are always okay, it occurred to me that you might (as I did) become concerned that, during your local development, your version-controlled CSS edits weren't triggering concomitant version-controlled edits for the corresponding files handling the cache-busting. (If that sentence doesn't quite make sense to you, please review those aforementioned three posts, especially the last two.)

## Possessed?

Each SSG has its own way of parsing the plain text, usually [Markdown](https://daringfireball.net/projects/markdown), that constitutes a typical static website's main content. The [Hugo](https://gohugo.io) SSG's default parser is [goldmark](https://github.com/yuin/goldmark). While it's faster than its predecessor, [Blackfriday](https://github.com/russross/blackfriday), goldmark currently has a bug --- or, to be more specific, one of its built-in extensions has a bug --- that will matter to you **if** you care about good typography.

The `Typographer` extension is supposed to make sure text has the proper "smart" punctuation:

<p class="punctuationExample">Here&rsquo;s some nice-lookin&rsquo; &ldquo;punctuation.&rdquo;</p>

However, as of this writing, the goldmark version "shipping" with Hugo has a problem with plural possessives. As I noted in an [issue I filed concerning the problem](https://github.com/yuin/goldmark/issues/180), if you include the following text in a Markdown file&nbsp;.&nbsp;.&nbsp;.

```md
John's dog is named Sam. The Smiths' dog is named Rover.
```

.&nbsp;.&nbsp;. you'd expect to get:

<p class="punctuationExample">John&rsquo;s dog is named Sam. The Smiths&rsquo; dog is named&nbsp;Rover.</p>

But what you actually get right now is:

<p class="punctuationExample">John&rsquo;s dog is named Sam. The Smiths&apos; dog is named&nbsp;Rover.</p>

So, if you're a Hugo user right now, you have two options where it comes to good typography and plural possessives:

- Make sure you manually (or, if your text editor app handles it for you, automatically) take care of "smart" punctuation in your Markdown source files rather than relying on Hugo/goldmark to do it.

- Use your Hugo project's config file to opt instead for Blackfriday, which Hugo does still support. It's unknown how long that support will continue; so, if you go this route, you may want to start periodically checking the [Hugo community forum](https://discourse.gohugo.io) and [relevant Hugo docs](https://gohugo.io/getting-started/configuration-markup), just so a deprecation doesn't catch you by surprise.

**Update, 2022-03-02**: This issue **was resolved** on February 28, 2022, with the release of [Hugo 0.93.0](https://github.com/gohugoio/hugo/releases/tag/v0.93.0). It included the first goldmark version, 1.4.7, with the code from a [pull request](https://github.com/yuin/goldmark/pull/280) that fixed all the cases I'd reported.
{.box}

## Check your brackets

Those who have inflicted upon themselves the curse of reading any significant number of my posts are all too aware that I have a thing about using footnotes. Often, lots of ’em. So it kinda griped my cookies (as the technical term is used) that Eleventy --- when properly set up for footnotes in the first place through use of the [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote) plugin for Eleventy's usual [markdown-it](https://github.com/markdown-it/markdown-it) parser --- always encased the footnote numbers in brackets. Brackets!! Argh.

Here's an example, using a screen capture of a paragraph from last year's "[YouTube TV and the RSNs flap](/posts/2020/02/youtube-tv-rsns-flap/)":

{{< imgh-colors src="Eleventy-bracketed-footnotes_2520x844.png" alt="Paragraph ending in a footnote whose number is bracketed" width=2520 height=844 >}}

But it turns out there's been an answer out there for months, in the form of [Mark Llobrera](https://www.markllobrera.com)'s "[Eleventy: Markdown and Footnotes](https://www.markllobrera.com/posts/eleventy-markdown-and-footnotes/)," in which he prescribed adding the following code within the part of the `.eleventy.js` config file that specifies how markdown-it and its various plugins will work with Eleventy:

```js
markdownLibrary.renderer.rules.footnote_caption = (tokens, idx) => {
	let n = Number(tokens[idx].meta.id + 1).toString();

	if (tokens[idx].meta.subId > 0) {
		n += ":" + tokens[idx].meta.subId;
	}

	return n;
};
```

After a brief and successful test on a repo branch, I gleefully incorporated his fix[^semiColons] on each of my Eleventy repos (the [one for this site](https://github.com/brycewray/eleventy_solo) and my two Eleventy-based [starter](https://github.com/brycewray/eleventy_solo_starter) [repos](https://github.com/brycewray/eleventy_solo_starter_njk)); and, now, that earlier paragraph looks like this, **as it should**:

[^semiColons]: Well, all but the semicolons at lines’ ends. I'm one of those who [choose to avoid them in their JS](https://flaviocopes.com/javascript-automatic-semicolon-insertion/). Sorry, [pro-semicolon partisans](https://medium.com/better-programming/you-might-need-those-semicolons-in-your-javascript-after-all-b28154f93ea8).

{{< imgh-colors src="Eleventy-non-bracketed-footnotes_2510x840.png" alt="Paragraph ending in a footnote whose number is not bracketed" width=2510 height=840 >}}

Yay. Thanks and nice going, Mark. *(By the way, Eleventy fans: he's got a lot of other neat Eleventy-related posts on [his site](https://www.markllobrera.com) --- and they're considerably more concise than my bloated blatherings --- so I highly recommend checking them out.)*

## AVIF: Cloudi forecast?

It appears the next hot image format on the website front is going to be [AVIF](https://reachlightspeed.com/blog/using-the-new-high-performance-avif-image-format-on-the-web-today/). It offers even tighter compression than Google's WebP (and, thus, ’waaay more than the comparatively ancient JPEG), and is quickly gaining support among the most popular browsers.

I bring this up only to note that, so far, [Cloudinary](https://cloudinary.com) --- which I [began using last year](/posts/2020/07/transformed/) to offload the increasing headaches of my site's image-handling --- has yet to support AVIF except in an experimental way mentioned in a [blog post from a few months back](https://cloudinary.com/blog/image_formats_getting_it_right#next-gen). Moreover, that same post says that, "due to AVIF's extreme encode times, usage is currently limited." For now, I'm taking this to mean that little cheapo free-tier users such as I won't get to see AVIF be one of the formats provided by that otherwise amazing [`f_auto` parameter](https://cloudinary.com/documentation/image_transformations#automatic_format_selection_f_auto) in Cloudinary image URLs. I hope I'm wrong; the final outcome is TBD.

----

And that'll do it for this descent into the geeky, SSG-loving recesses of my cranium. [Let me know](/contact/) if you have questions or thoughts about any of this stuff.
