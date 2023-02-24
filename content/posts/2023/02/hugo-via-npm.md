---
title: "Hugo via npm?"
description: "Using a Node.js package to install and run Hugo may sound strange at first, but it has clear merits."
author: Bryce Wray
date: 2023-02-20T12:24:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

**Note**: This post also appears on [dev.to](https://dev.to/brycewray/hugo-via-npm-5c4b).
{.box}

During my years of using the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG), I've occasionally seen mentions about how you could install, and even *run*, Hugo's [Go](https://go.dev)-based binary by using one or more JavaScript packages sourced via [npm](https://npmjs.com). Having long ago understood the [usual](https://gohugo.io/installation/), very **un**-npm-ish Hugo methods for installation --- much less the un-npm-ish nature of Hugo use in general --- I never bothered looking into these JS-based alternatives. Besides, I figured, how could they even work? And, if they did, in what use cases did they make more sense than  *normal* Hugo use?

But, yesterday, I began to grasp a bigger picture.

<!--more-->

## The point, and it does have one . . .

While I was [helping someone](/posts/2022/11/get-help-hugo-community-discord-server/) resolve an apparent problem with his own Hugo site, I saw that his chosen theme installed and employed Hugo through just such an approach. In this case, the npm package was [Hugo Installer](https://github.com/dominique-mueller/hugo-installer), created and maintained by [Dominique Müller](https://github.com/dominique-mueller).

My usual reaction, bordering on disdain, soon gave way to my oft-cited nerdy curiosity, although I still had the same primary questions from those earlier encounters with references to an npm-style way to handle Hugo. Then, as I read up on Hugo Installer and how it was used in a variety of sites and themes, I started to get the point.

Like the more venerable, [more popular](https://npmtrends.com/hugo-bin-vs-hugo-installer), but (in my opinion) less suitable [hugo-bin](https://github.com/fenneclab/hugo-bin), Hugo Installer makes it easier to manage Hugo use in projects already making thorough use of [Node.js](https://nodejs.org) packages --- which seems to describe a huge majority of the website projects you'll find on places like [GitHub](https://github.com) and [GitLab](https://gitlab.com):

- If cloning/forking a project, one usually does a simple `npm install` to get all the goodies needed to make the project run either locally or on a remote host.
- In a multi-developer project, it's important to keep everyone's tools on the same versions through use of `package.json`.
- On the other hand, it's sometimes necessary for *separate* projects on the same machine, or within a team's machines, to use **different** versions of one or more tools. For example, a dev or dev team might inherit a project that, for whatever reason, goes belly-up unless used with an older version of a specific tool.[^Markdown]

[^Markdown]: Where Hugo is concerned, one possible scenario of this type would be if a project required the [Blackfriday Markdown parser](https://github.com/russross/blackfriday), Hugo's support for which ended with the [release of Hugo 0.87.0](https://github.com/gohugoio/hugo/releases/tag/v0.87.0) in August, 2021. For that matter, Hugo began transitioning away from Blackfriday with [Hugo 0.60.0](https://github.com/gohugoio/hugo/releases/tag/v0.60.0) (November, 2019), when [Goldmark](https://github.com/yuin/goldmark/) became Hugo's default Markdown library.

Now, with Hugo Installer and appropriate scripting onboard, even a Hugo project can meet these requirements just as well as can a project anchored by a JS-based SSG.

## How it works

When run from a `package.json` script, Hugo Installer checks for the presence of a Hugo binary --- by default, in the project's `bin/` folder, although you can pick a different location --- and, only if it doesn't find the binary, downloads and installs a version, which you must specify. The check goes **very** quickly and, thus, I suggest you make a `package.json` script that does only the Hugo Installer part, and use it with your other Hugo-related scripts. Here are some examples, some of which use Müller's [exec-bin](https://github.com/dominique-mueller/exec-bin) package so the installed Hugo binary will run as you would expect:

```json
{
	"name": "my-project",
	"description": "TBD",
	"config": {
		"hugo": "0.110.0"
	},
	"scripts": {
		"install:hugo": "hugo-installer --version $npm_package_config_hugo --extended",
		"dev:hugo": "npm run install:hugo && exec-bin bin/hugo/hugo server",
		"prod:hugo": "npm run install:hugo && exec-bin bin/hugo/hugo --minify",
```

You'll note my use of a `config` object, in which I provide the desired Hugo version. This allows me a clear, easily identified place to change that spec at a moment's notice whenever I wish. Down in the `install:hugo` script, I call back to that specification by using `$npm_package_config_hugo`.[^pkgVars]

[^pkgVars]: I encourage you to read [Brian Childress](https://brianchildress.co/)'s 2018 article, "[Variables in package.json](https://brianchildress.co/variables-in-package-json/)," which was a great help in this aspect of the changeover.

## Any sour points?

Earlier, I cited this method's advantages vs. "normal" Hugo. But are there comparative disadvantages?

In my use so far, I've noticed only one: for anything you'd have normally done through a `hugo` command from the terminal, you'll have to change it to a script within the given project's `package.json`. Let's say you want to recreate the `hugo new` command for starting a new post, *e.g.*:

```plaintext
hugo new posts/2023/02/my-next-post.md
```

In a project using Hugo Installer, you'd need a `package.json` script like this:

```json
"hugonew": "exec-bin bin/hugo/hugo new",
```

Once you have that, the previous example would become:

```plaintext
npm run hugonew posts/2023/02/my-next-post.md
```

. . . which is hardly worth mentioning where one's muscle memory is concerned. However, if you typically use a *lot* of [`hugo` commands](https://gohugo.io/commands/) and thus would have to make a `package.json` script for each, you'll probably have a much different opinion about the whole thing.[^Uninstall]

[^Uninstall]: One other thing to keep in mind is that, if you already have a more conventional Hugo installation on your machine, especially a global installation, you'll probably want to uninstall it **before** trying this method. Otherwise, you might not know whether Hugo Installer is working properly, because your machine may --- and likely will --- be using its previously installed Hugo version rather than the one you're trying to install and use. <strong class="red">But</strong>, if you have multiple Hugo projects on the machine, you'll then have to use Hugo Installer with **all** of them, and only you can decide is it's worth it.

Anyway, there you have it: a totally different way of installing and using Hugo.

This month, I took the site squarely into npm-ville when I [brought in the npm version of Sass](/posts/2023/02/using-dart-sass-hugo-taking-it-easy/) and [added PostCSS to make "future" CSS work with current browsers](/posts/2023/02/some-future-now-css/). As it turns out, those changes made my site an unexpectedly appropriate target for the use case that Hugo Installer presents. I'm sure I'll find nits to pick over time but, for now, I'm impressed by what I've seen.
