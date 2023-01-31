---
title: "Different modes for different code"
description: "I tread familiar ground as I provide versions of this site in its two previous SSGs."
author: Bryce Wray
tag: [web-development, static-site-generators, ssg, eleventy, gatsby, hugo, github, ia-writer, markdown, covid-19, pandemic]
date: 2020-04-05T13:45:00-05:00
---

As we all hunker down from [COVID-19](/posts/2020/03/coherence-covid-19/), maintaining some degree of sanity occasionally requires one to divert one's mind from this thing. At least, that's true for me; and, yes, "sanity" is a relative term when applied to me, but that said&nbsp;.&nbsp;.&nbsp;.

I like to look at other people's website code, partly out of geeky curiosity and partly in search of new and better ways of handling this site. A few days ago, I began considering a little project that might be both interesting to me and useful to others.

I still had the private repositories, or *repos*, from this site's time in the [Hugo](https://gohugo.io) and [Gatsby](https://gatsbyjs.org) [static site generators](https://staticgen.com) (SSGs), during last year's "[dance](/posts/2019/12/sorta-strange-ssg-trip/)." Each was far from ideal, as is sadly true for the repo for this site. Still: what if, for the sake of other curious souls, I made those repos public?

## Baring all?

At first, that seemed a pretty bad idea. I had left them as they were after [jumping wholeheartedly](/posts/2019/12/packing-up/) in on my current [Eleventy](https://11ty.dev)/[webpack](https://webpack.js.org) combo, so they were months out of date in multiple ways. Indeed, the Hugo repo even lacked some *old* articles due to [my unseemly display of Orwellian behavior last October](/posts/2019/10/otoh/).

So now, it seemed obvious what to do: I should not only make those repos public; I should also *bring them up to date* with this site. That would mean not just *articles* but also *look-and-feel* and *functionality*, and all the code changes that went with those.

Fine. I rolled up my metaphorical sleeves and got to it.

And, today, I am pleased to tell you that *all three* of my site repos are now public on GitHub for those of you who might be interested:

- The [real site in Eleventy/webpack](https://github.com/brycewray/eleventy_bundler), the public nature of which I [announced](/posts/2019/12/code-comfort-eleventy-webpack/) last December.

- The [Gatsby version](https://github.com/brycewray/gatsby_site_css-grid).

- The [Hugo version](https://github.com/brycewray/hugo_site_css-grid).

Please be advised that I haven't yet decided whether to update *all* of them every time I update *this* one. Some changes I made during this restoration project may make that easier than it otherwise would've been, but I'm not promising an all-three-at-once approach.

For one thing, it's all well and good to keep adding each new article, but quite another matter altogether to keep all three repos’ *[NPM dependencies](https://nodejs.dev/npm-dependencies-and-devdependencies)* up to date --- especially on the Gatsby repo. (And, yes, even the Hugo repo now has some NPM dependencies. More on that in a moment.) Will I keep this one updated? You betcha. The other two? TBD.

## Challenges

As I've mentioned often in these blatherings of mine, one of the reasons I do this stuff is to keep learning, and the thinking behind this little project was in that same vein. I knew I'd run into glitches in trying to make everything work, and it was by de-glitching that I'd learn.

### Parse-imony

For example, there is the matter of the different [Markdown](https://daringfireball.net/projects/markdown) [parsers](https://css-tricks.com/choosing-right-markdown-parser/) these three SSGs use.

When I last left Hugo, this past October, it was still using the [Black Friday](https://github.com/russross/blackfriday) parser, as had been the case since I started this site with Hugo in September, 2018. [More recently](https://gohugo.io/news/0.60.0-relnotes/), Hugo has changed over to the [goldmark](https://github.com/yuin/goldmark) parser.

While checking out differences between goldmark and Eleventy's [Markdown-it](https://github.com/markdown-it/markdown-it) parser in properly handling the post-Hugo/post-Gatsby posts I was copying to the other two repos --- as well as seeing what few differences there were between Black Friday and goldmark --- I learned there was a problem with how I've recently been adding footnotes in my content. It worked fine in Markdown-it but not in goldmark or, for that matter, the [Remark](https://github.com/remarkjs/remark) parser used in my Gatsby repo.

What I'd been doing recently was so-called *inline* footnoting, like this:

```markdown
This^[This would be a footnote] is an example of an alternative footnoting method, inline footnoting, that works in Eleventy.

```


(I even mentioned this in my [little piece](/posts/2019/02/ia-for-io/) last year about beginning to warm up to [iA Writer](https://ia.net/writer); look at the screen capture on that page.)

However, the parsers in Hugo and Gatsby didn't care for the `^` being before the bracket. And, by "didn't care for," I mean they refused to consider the footnote *as* a footnote, instead leaving it in the main body text.

OK, fine. I put it *after* the bracket. Then, Hugo and Gatsby worked fine --- but the *Eleventy* parser wasn't happy.

So I decided to quit being cute and went back to a more standard method which works across all three, although it's a tad clunkier to type:

```markdown
This[^SomeReference] is an example of the once-and-future (non-inline) method of footnoting.

[^SomeReference]: This would be a footnote.
```

Clunky or not, one other advantage of this method is that none of these SSGs will balk at links in footnotes, unlike what happened with the inline footnoting --- in which it was wise to "hard"-code links (if you can call HTML *coding*) rather than just doing them like this:

```markdown
This[^SomeReference] is an example of the once-and-future (non-inline) method of footnoting.

[^SomeReference]: And [this](https://www.11ty.dev) will be a link to Eleventy's own site.

```

### Form and function

As I said, I was determined that these other two repos’ code would produce content that would match this site as much as possible in look-and-feel and functionality. That meant I'd be translating from "Eleventy-ese" into "Hugo-ese" and "Gatsby-ese" two major changes I recently introduced: [transitioning from Sass/SCSS to PostCSS](/posts/2020/01/two-cheers-tailwind/); and [getting rid of hero images](/posts/2020/02/so-much-for-heroes/).

The switch to PostCSS actually was pretty straightforward in the Gatsby repo. Since Gatsby incorporates webpack, I was able to use an identical `postcss-config.js` file. From there, it was all over but the shouting, by which I mean putting the CSS files where they needed to be. No biggie.

But Hugo was another matter.

And that was despite its having a [pretty cool method](https://gohugo.io/hugo-pipes/postcss/) of incorporating PostCSS, when you consider Hugo uses no "bundler" (like webpack). I added the same NPM dependencies and `postcss.config.js` file to the repo, put the CSS files where Hugo wanted them, put the appropriate [Go](https://go.dev) code in the `head.html` partial template, and --- kept getting errors.

Only after a few hours of trial-and-error futzing did I finally locate a [Hugo community forums topic](https://discourse.gohugo.io/t/pipes-postcss-postcss-import-how-to-keep-filesystem-context/15164) that saved the day.

After studying that page for a while, I grasped that, before Hugo would run PostCSS, the `postcss-config.js` code for using the [`postcss-partial-import` plugin](https://github.com/jonathantneal/postcss-partial-import) had to refer to the `path`, rather than the `root` reference which worked for the Eleventy/webpack and Gatsby repos. It seems a small distinction, but I guess it's not where Hugo's innards are concerned.

By contrast, this site's departure from hero images *(**update, 2020-05-19**: a departure that I [later rescinded](/posts/2020/05/thousand-words-indeed/), as you can see at the top of this page)* was more easily handled in Hugo than in Gatsby.

As I've [noted before](/posts/2019/10/picture-perfect/), Gatsby typically does its image-processing magic only on image files that are in the same directory as the Markdown content which calls them.[^HugoImgs] That meant distinguishing between posts which had no images "inside" and those which did. As a result: I'd leave a file of the former type as an `index.md` in a directory named for the post; as for a file of the latter type, I'd name it after the post and move it into the appropriate "month" path.

[^HugoImgs]: The same is true for Hugo *if* you use its [image processing capabilities](https://gohugo.io/content-management/image-processing/); but I don't, so this wasn't necessary for the Hugo repo.

**In plainer language**&nbsp;.&nbsp;.&nbsp;.

Here's how I handled this page, since it had no images at the time I originally issued this post. I named it `different-modes-different-code.md` and left it in the top level of the Gatsby repo directory `/src/pages/posts/2019/04/`, thus producing a final path --- as on this site --- of `/posts/2019/04/different-modes-different-code/`.

**But**&nbsp;.&nbsp;.&nbsp;.

It was a different story for a post that *did* have at least one image. Ironically, "[So much for heroes](/posts/2020/02/so-much-for-heroes/)," the one about *getting rid of* hero images, does have an image: a screen capture to show how those hero images had looked. So I left it in the Gatsby-esque method, which meant the Markdown file would be `index.md` inside the directory `/src/pages/posts/2019/02/so-much-for-heroes/`, which also had that one image.

Thankfully, there aren't *that* many posts left with images in them, so this wasn't as big a deal as it may seem.

Fortunately, the Eleventy repo's CSS proved *mostly* compatible across the board, so it was a fairly simple matter, albeit somewhat tedious in terms of time taken, to make each repo's various templates "like" the different settings.[^CodeCSS]

[^CodeCSS]: It got a little squirrelly at one point when I tried to translate the code block CSS for the Eleventy site's [Prism](https://prismjs.com)-based highlighting into what would work with Hugo's [Chroma](https://github.com/alecthomas/chroma)-based syntax highlighting. I finally just bailed, letting [Hugo create a new Chroma-happy stylesheet](https://gohugo.io/content-management/syntax-highlighting/#generate-syntax-highlighter-css) for code blocks and using that instead of the Prism-intended CSS.

### Flashbacks

The last major thing I had to do was make each site's version of the [posts list pages](/posts/) look and work the same. I won't belabor the point, but suffice it to say that it was in this particular operation that I remembered many of the things about Gatsby that [made](/posts/2019/07/why-staying-with-hugo/) [me](/posts/2019/07/lessons-learned/) [crazy](/posts/2019/09/why-left-hugo-eleventy/) when I was trying to learn it last year.

In the end, I managed to wrestle it successfully to the mat, my blood pressure only slightly the worse for the wear after a two-and-a-half-hour struggle.

Without my previous experience with Gatsby, as well as the [subsequent](/posts/2019/12/packing-up/) learning experience with incorporating webpack into Eleventy: oh, let's not go there.

## A glutton for punishment?

I hope these will serve their intended purpose of helping others who are where I was nearly a year ago, trying to get past familiar code surroundings so they can determine better ways of handling their websites.

And there may be more.

I have been curious about [Vue](https://vuejs.org) and the Vue-based, Gatsby-like [Gridsome](https://gridsome.org) for some time now. I figure (dangerously), if I can make a Gatsby version of this site, why not see if I can do the same with Gridsome? That SSG's ways of doing things are remarkably similar to Gatsby's, despite the differences between their respective frameworks, Vue and [React](https://reactjs.org).

Since [it looks as if we'll be here a while](https://www.vox.com/future-perfect/2020/3/26/21191702/coronavirus-lockdowns-stay-home-new-cases): well, who knows? Stay tuned.

**Update, 2020-04-15**: While I did make some progress on the Gridsome repo project in the ensuing days after first releasing this post, I think it will be a while --- perhaps months --- before I can make any serious headway. There are a number of things the young Gridsome still doesn't do that well which, while they wouldn't be showstoppers to others, just cause it to miss the mark where I'm concerned. Two minor examples are ["previous post" and "next post" functionality](https://github.com/gridsome/gridsome/issues/177) and [directory-based URLs](https://github.com/gridsome/gridsome/issues/1089), but there are others. *(In the meantime, however, [I can always find other things to do](/posts/2020/04/full-11ty-js-monty/)).*
{.box}

**Update, 2020-05-31**: I later decided to limit the Hugo and Gatsby repos to just a sampling of the posts, especially given the [restoration of hero images](/posts/2020/05/thousand-words-indeed/). While this obviously will save me work (and a modicum of sanity), the truth is that it also probably makes each repo **more** valuable to those who simply want to learn how to do a few things here and there, rather than having to download a ton of other posts and images.
{.box}
