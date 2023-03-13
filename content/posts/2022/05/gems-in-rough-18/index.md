---
title: "Gems in the rough #18"
description: "Code for copying code, HugoConf, loose ends."
author: Bryce Wray
date: 2022-05-14T10:50:00-05:00
#initTextEditor: iA Writer
---

{{% disclaimer %}}

Each entry in the “Gems in the rough” series is a collection of tips, explanations, and/or idle observations which I hope will be at least somewhat useful to those of you with websites built by [static site generators](https://jamstack.org/generators) (SSGs).
{.box}

## Code for copying code

I've long appreciated the way some sites have code blocks which include "Copy" buttons or links. Especially since many code blocks have long lines which extend well beyond the blocks' widths, this "click-to-copy" feature is extremely useful. This week, I finally bit the bullet and researched how to do this (links to come shortly), then implemented it herein.

Here's a sample with some JavaScript code. To see the "Copy" button, move the cursor over the code block. To copy the code, click/tap on the resulting button. The "Copy" icon changes to a checkmark, indicating that the copying was successful; to prove it, paste the copied code into a text file.

```js
async function handleRequest(req) {
	const res = await fetch(req);
	const contentType = res.headers.get("Content-Type");
	if (contentType.startsWith("text/html")) {
		return rewriter.transform(res);
	} else {
		return res;
	}
}
const rewriter = new HTMLRewriter()
	.on("a", new AttributeRewriter("href"))
	.on("img", new AttributeRewriter("src"));
addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event.request));
});
```

My research found four sources on which I chose to rely (and the latter three all relied on the first for guidance). As of this writing, I'm using a slight variation on the code suggested by the [Simpler Nerd](https://simplernerd.com) site, but I recommend all the below-listed articles for your own consideration. While they're aimed at [Hugo](https://gohugo.io) users and some of their instructions are Hugo-specific as a result, their JavaScript should be readily adaptable for use with other SSGs.[^other]

[^other]: The JavaScript is looking for a specific class, so just look at the HTML/CSS your SSG generates to separate a code block from regular text. Here's a fictional example: if you see that the SSG assigns `<div class="codeBlock">` to each code block, edit the JavaScript so that it seeks `div`s with the `codeBlock` class. (As-is, the JavaScript looks for `highlight`, which Hugo uses to designate a code block.)

- Danny Guo, "[How to Add Copy to Clipboard Buttons to Code Blocks in Hugo](https://www.dannyguo.com/blog/how-to-add-copy-to-clipboard-buttons-to-code-blocks-in-hugo/)," March 22, 2019.
- Aaron Luna, "[Hugo: Add Copy-to-Clipboard Button to Code Blocks with Vanilla JS](https://aaronluna.dev/blog/add-copy-button-to-code-blocks-hugo-chroma/)," November 11, 2019.
- "Simpler Nerd," "[How to Add Copy to Clipboard Buttons in Code Blocks in Hugo](https://simplernerd.com/hugo-add-copy-to-clipboard-button/)," December 19, 2021.
- Justin James, "[Hugo --- Dynamically Add Copy Code Snippet](https://digitaldrummerj.me/hugo-add-copy-code-snippet-button/)," March 7, 2022.

**Note**: It's not a typo; two of the articles **do** have identical titles.
{.box}

Incidentally, I purposely chose not to add visible indications of each code block's language. Those are nice, but I sometimes have to fudge that setting a bit[^fudge] to get decent highlighting on certain code; so, say, it wouldn't help you to see a balloon calling that code `jinja` if it isn't *really* from the [Jinja2 template engine](https://palletsprojects.com/p/jinja/).

[^fudge]: The quality of a site's syntax highlighting is, in large part, governed by the available language choices which vary from SSG to SSG. For example, only when a site is on Hugo does it know how to highlight `go-html-template` for Hugo's mixture of [Go](https://go.dev) and HTML for templating. On the other hand, I doubt if any SSGs other than [Astro](https://astro.build) know `astro` code, so you end up having to tag it as plain old JavaScript. And **none** of them, so far, seem to recognize the Nunjucks templating language often used in [Eleventy](https://11ty.dev), so I tend to end up tagging it as Jinja2 or [Twig](https://twig.symfony.com/).

## HugoConf is coming

In recent months, the folks at [CloudCannon](https://cloudcannon.com) have been making significant gains to their support for Hugo. Up to now, that support has taken the form of software development and online content (some of the latter of which I've had the pleasure of helping to create). It now also includes an online event, [HugoConf](https://hugoconf.io), coming in July, as [noted](https://twitter.com/hugoconf/status/1524419059714039809) on Twitter:

> Introducing the inaugural [#HugoConf](https://twitter.com/hashtag/HugoConf?src=hashtag_click), celebrating the world’s fastest static site generator,
[@GoHugoIO](https://twitter.com/GoHugoIO). (And the legion of developers and contributors who make it possible!) 🤩
>
> Register free at [hugoconf.io](https://hugoconf.io) to join us on July 8-9.

I'd urge Hugo aficionados, as well as those simply curious about Hugo, to give this a look-see.

## Loose ends

Following up on things I'd mentioned in previous posts, whether "Gems in the rough" or otherwise:

- After last year's series of articles about password management, during which I mentioned that I'd pretty much abandoned [1Password](https://1password.com) for [Bitwarden](https://bitwarden.com), I re-thought that decision and came back to 1Password. Also, contrary to the reactions of the folks whose opinions I [cited](/posts/2021/08/1password-hits-fan/), I am *delighted* by [1Password 8](https://blog.1password.com/1password-8-for-mac/). The anti-[Electron](https://www.electronjs.org) crowd and anti-subscription crowd will never relent, but I've never been in either of those respective camps and, thus, don't give a hang.
- [Vercel](https://vercel.com) **still** hasn't provided *non*-[Next.js](https://nextjs.org) code [examples](https://github.com/vercel/examples/tree/main/edge-functions) for the [Edge Functions](https://vercel.com/features/edge-functions) it [announced](https://twitter.com/vercel/status/1453034541463916549) last October 26. I've pretty much given up waiting.[^finally] Besides, [Vercel Edge Functions are really just white-labeled Cloudflare Workers](https://news.ycombinator.com/item?id=29003514), and I've found the real thing more than good enough, especially considering how Workers mesh so seamlessly --- as you'd expect --- with [Cloudflare Pages](https://pages.cloudflare.com). \
Speaking of CFP . . .
- To repeat what I said in a May 10 update to a CFP-related story in "[Gems in the rough #15](/posts/2022/03/gems-in-rough-15/#cfps-fast-builds-fix-nears-fullrelease)," in case you missed it: "Cloudflare [announced today](https://blog.cloudflare.com/cloudflare-pages-build-improvements/) that the [Fast Build] infrastructure fixes are now generally available." The only remaining piece of the puzzle is for CFP to use *build caching*, as does Vercel, to make the process even quicker. According to what I've seen on the Cloudflare Developers Discord, build caching is in the works for CFP, albeit without a publicly disclosed ETA.
- I no longer use [Bitbucket](https://bitbucket.org) as a remote host for any of my various repositories. This closes the chapter on some of this site's history because, until I began also using both [GitHub](https://github.com) and [GitLab](https://gitlab.com) in 2019, Bitbucket was the site's *only* repo host. My decision to drop it came after I found increasing difficulty with logins: something became repeatedly borked with Bitbucket's two-factor authentication process, and I simply ran out of patience. Honestly, it wasn't that painful a choice, given that I've long preferred GitHub and GitLab for a variety of reasons, anyway.

[^finally]: **Update from the future**: Finally, in March, 2023, I [was able](https://github.com/vercel/examples/issues/50#issuecomment-1465245950) to start using Vercel Edge Functions --- or, to be more precise, [Vercel Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware) --- with any of my very-*non*-Next.js projects.
