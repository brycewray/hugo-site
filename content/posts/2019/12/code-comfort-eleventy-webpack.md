---
layout: layouts/posts/singlepostherofit.11ty.js
tags: post
title: "Code comfort: Eleventy and webpack"
subtitle: "Peeking inside this site"
description: "Some words about my Eleventy/webpack configuration."
author: Bryce Wray
date: 2019-12-14T17:05:00
lastmod: 2019-12-27T18:08:00
discussionId: "2019-12-code-comfort-eleventy-webpack"
featured_image: code-1486361_5760x3840.jpg
featured_image_width: 5760
featured_image_height: 3840
featured_image_alt: "Computer code on a monitor"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/markusspiske-670330/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1486361">Markus Spiske</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1486361">Pixabay</a></span>
---

<div class="border-black border-solid yellowBox">
	<p class="h3"><em>Updates</em></p>
	<p class="h4">2019-12-27</p>
	<p><a href="https://github.com/brycewray/eleventy_bundler">This site&rsquo;s GitHub repository</a> is <strong>now public</strong>! Thus, I am taking out the code blocks that <strong>were</strong> here, since otherwise they&rsquo;d constantly be outdated compared to the current repo; instead, I will link to the appropriate parts of the repo. And, um, don't make me regret making the repo public, OK, Internet? Pretty please?<br />
	<em>[I&rsquo;ll keep the other updates in place, below, for archival purposes.]</em></p>
  <p class="h4">2019-12-23</p>
  <p>Updating to include in <code>.eleventy.js</code> the code from <a href="https://pascalw.me">Pascal Widdershoven</a> that makes possible, <a href="https://github.com/11ty/eleventy/issues/529">at long last</a>, a simple way to automate linking to previous and next posts from within a single-post template, about which I&rsquo;ll have a <a href="/posts/2019/12/previous-next-eleventy">short post</a> ASAP.</p>
  <p class="h4">2019-12-20</p>
  <p>I am updating this primarily to conform to some fixes I made a few days after the original version of the post.</p>
  <p>One thing I had noted was that, during development mode, Eleventy&rsquo;s included <a href="https://www.browsersync.io">Browsersync</a> server was auto-refreshing the browser when I made <em>textual</em> changes, but not <em>CSS/SCSS</em> changes; for the latter, I&rsquo;d have to do a manual refresh. Not terrible; just annoying. I then tried using webpack&rsquo;s built-in server instead, but found the same issue as <a href="https://github.com/11ty/eleventy/issues/272#issuecomment-457368626">others</a>, which was that it didn&rsquo;t &ldquo;see&rdquo; Eleventy&rsquo;s changes without, yep, manual refresh. What I finally tried was installing the <a href="https://www.npmjs.com/package/browser-sync-webpack-plugin">Browsersync plugin for webpack</a>, then setting Eleventy just to <em>watch</em> and <strong>not</strong> serve during development mode. Once I did a little tinkering with settings, that did the trick. Now, with the setup I have below&mdash;noted in <code>webpack.dev.js</code> and <code>package.json</code>&mdash; I get full and <em>automatic</em> browser refresh during development mode when I edit either text or SCSS.</p>
  <p>And, yes, it <em>was</em> worth the trouble. Trust me.</p>
</div>

*Following up on my [recent post](/posts/2019/12/packing-up) about how I got this site back to my favorite [static site generator](https://staticgen.com) (SSG), [Eleventy](https://11ty.dev), and also provided some enhancements with the [webpack](https://webpack.js.org) bundler&nbsp;app&nbsp;.&nbsp;.&nbsp;.*

As I mentioned, my process in making this happy transition was much easier than it might have been, thanks to the publicly available code from others who'd done it before me. Thus, I'm following their kind example by making this site's [GitHub repo](https://github.com/brycewray/eleventy_bundler) public. What follows, then, is some explanation of which code does what.

## A tale of three webpack config files

A lot of tutorials for using webpack will have you go through the motions of constructing a `webpack.config.js` file, only to come in when things get hot and heavy and say, "*Au contraire*, sucker! Actually, you need *separate* configuration files for development and production."

Not gonna pull that one on ya.

You *can* do it with just a `webpack.config.js` file---one to rule them all, so to speak---but just about all the best-practices-kinda-stuff you'll see says to set things up as follows, so that's what I'm telling you, too:[^configNames]

[^configNames]: You can call them whatever you want as long as each ends with a *.js* extension, but using names like these adheres sufficiently to standards-of-sorts that, when you look at other people's code, you'll probably find the examples more helpful than if you go into "[Silly Walks](https://en.wikipedia.org/wiki/The_Ministry_of_Silly_Walks)" mode and call them *fred.js*, *wilma.js*, and *pebbles.js*, or somesuch.

- `webpack.dev.js`---Contains only config code for *development*. Or, to put it another way: the code in this file is *not* intended for when you actually build your site on, say, [Netlify](https://www.netlify.com). [See my site's `webpack.dev.js` file here](https://github.com/brycewray/eleventy_bundler/blob/master/webpack.dev.js).

- `webpack.prod.js`---You guessed it: this is the first file's bro, except that this one contains only config code for *production*. [See my site's `webpack.prod.js` file here](https://github.com/brycewray/eleventy_bundler/blob/master/webpack.prod.js).

- `webpack.common.js`---Contains everything you'll need for *either* production or development. The other two files ***merge*** this content when they're run, thus ensuring everything happens as it should. Having this separate file, rather than duplicating code between the other two files, is DRY-friendly (well, [maybe](https://thevaluable.dev/dru-principle-cost-benefit-example)) and thus keeps peace among all of [Babbage](https://www.computerhistory.org/babbage/)'s descendants, genetic or otherwise. [See my site's `webpack.common.js` file here](https://github.com/brycewray/eleventy_bundler/blob/master/webpack.common.js).

## Configuring Eleventy itself

As for `eleventy.js`, the main config file for Eleventy (thankfully, no separate `.dev` and `.prod` versions here), see [my site's `eleventy.js` file here](https://github.com/brycewray/eleventy_bundler/blob/master/.eleventy.js).

## package.json

By now, the more observant among you, having seen certain items mentioned in these files, may be wondering what's in the `package.json` file. [Wonder no longer](https://github.com/brycewray/eleventy_bundler/blob/master/package.json)---although, I caution you, there are things in there I no longer use but simply haven't gotten around to opening up a can of `npm uninstall` on 'em as yet.

## Copy-pasta meal?

So, there you go. If you see anything in this site's repo that's helpful to your project, by all means, [copy-pasta](https://knowyourmeme.com/memes/copypasta) to your heart's content. If nothing else, perhaps the `package.json` file will give you some hints about cool npm packages to try if you, too, decide to weld Eleventy and webpack---which, I assure you, is a [worthy endeavor](/posts/2019/12/packing-up).