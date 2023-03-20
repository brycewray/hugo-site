---
title: "A normal person’s guide to static websites"
description: "Want to have a website of your own but having trouble figuring out how to proceed? Here’s some help."
author: Bryce Wray
date: 2020-09-22T16:35:00-05:00
---

Websites are for everybody, not just geeks such as your faithful correspondent, here. That's why this article is aimed at a **normal** person like you --- a **non**-techie, **non**-geek --- who's interested in getting a website of your own, or in improving one you already have, but just don't know how to proceed.

Maybe this would be your first-ever website. Or maybe you already have one but it's on something like WordPress, Wix, or Weebly --- and, **good for you, you smart individual**, you want it to be on a much better platform.

Problem is, you keep reading that something called a *static website*, whatever that is, is the way to go, and you don't have a clue how to proceed.

Well, ma'am or sir, I'm here to help.

## Static *vs.* dynamic websites

A static website consists of only HTML files for semantic markup, CSS files for styling, and various kinds of image files (as well as, sometimes, video files). In the early days of the web, *all* websites were static, but in time many users came to regard them as dull. Someone even coined the term *brochureware* to refer to websites that were little more than electronic sales sheets and had few, if any, interactive features.

Then came something you may remember hearing about years ago: "Web 2.0." This was when it became more common for websites to be *dynamic*. A greatly simplified definition of a dynamic website is that it exists not as static files but, rather, as part of a database which, each time someone visits the site, generates a web page. Such functionality can enable a lot of very cool things we won't cover in this post, but it has two disadvantages:

- **It's slower than a comparably sized static site**. A page that's already in existence is always going to be quicker to see than a page that has to be generated from thin air by a database. Assuming you want people to find your website when they search for whatever your website is about, you want the fastest possible site because search engines give higher ratings to faster pages, all other things being equal.\
And, never mind search engines: *potential visitors* will tend to pass you by if they find your pages too slow. You don't have to look very hard to find data from studies, notably those by Google, attesting to that fact.\
(Besides: if a site goes viral and it has a few hundred thousand visitors a second, that means the database could very well be creating that many pages a second. This can easily bring a site to its knees.)
- **Its security is a headache**, because databases are inevitably vulnerable to getting cracked[^1] by bad actors. Worse still: many WordPress sites use *plugins* that have their own vulnerabilities. As the saying goes, a chain is no stronger than its weakest link; or, in this case, a WordPress site is no safer than its most easily cracked plugin.

While we're on the subject of WordPress sites: each is a significant cyberattack target, because something like one third of the *entire web* runs on WordPress. Let's say a third of the cars in a parking lot are gleaming white, so they really stand out in the sunlight. If that causes them to attract the attention of a flock of excretion-minded birds flying overhead, those cars could get nasty in a hurry.

**Note**: If your website needs are relatively simple, you won't have any trouble letting them be served by a static site on its own. On the other hand, if you need more advanced, more interactive capabilities, you might want to check into the [Jamstack](https://jamstack.wtf). The short explanation is that the Jamstack gives you the best of both worlds: the advantages of static sites combined with lots of whiz-bang stuff "living" elsewhere, safely, in The Cloud.
{.box}

So your choices now come down to having your site's content be generated either: (a.) on each visit (dynamic); or (b.) ahead of each visit (static). If you can handle another analogy --- and I promise to keep nasty birds out of this one --- imagine two Baskin-Robbins ice cream parlors across the street from each other. You know you can go to either one and get an identical bowl of Baskin-Robbins chocolate ice cream. The only difference is that, on the north side of the street, they fill the bowls *in advance* (and keep them in the freezer) for quickest possible delivery when a customer orders them while, on the south side, they scoop it out only when you come in and order it. Again, the ice cream is exactly the same; the only difference is the process and the wait.

Analogies aside, here are two diagrams that may also help you grasp the difference. First, the dynamic site, with its content that is generated every time somebody visits:

{{< imgh-colors src="diagram--dynamic-site_Inter_1600x900.png" alt="Diagram of a dynamic website" width=1600 height=900 >}}

Then, the static site, with content already in place for you to see:

{{< imgh-colors src="diagram--static-site_Inter_1600x900.png" alt="Diagram of a static website" width=1600 height=900 >}}

Images used to build these diagrams (all&nbsp;sourced from&nbsp;[Pixabay](https://pixabay.com)): [FiveFlowersForFamilyFirst](https://pixabay.com/users/FiveFlowersForFamilyFirst-552028/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2243898); [Clker-Free-Vector-Images](https://pixabay.com/users/Clker-Free-Vector-Images-3736/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=41259); [200&nbsp;Degrees](https://pixabay.com/users/200degrees-2051452/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1745473); and [Mateusz&nbsp;Zdrzałek](https://pixabay.com/users/MTZD-1593970/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2488093).
{.imgcCaption}

With no reason to wait on a database to generate the content (all the aforementioned security concerns aside), the static site downloads more swiftly. All other things being equal --- content, server, connectivity, browser, and computer --- it always will.

But does having a static site mean you have to write, or hire somebody to write, all that code that makes such a site work?

Don't fret. This problem has already been solved.

## The rise of SSGs

As evidence mounted that dynamic sites generally were slower, more inefficient, and less secure than static sites, the latter began to make a comeback early in the 2010s, primarily through the appearance of the first *[static site generators](https://staticgen.com)* (SSGs).

An SSG takes fairly ordinary text and converts it to the HTML (Hypertext Markup Language) that creates web pages and the CSS (Cascading Style Sheets language) that gives those pages their look-and-feel. In other words, an SSG takes away much of the laborious "hand-coding" that previously was necessary.

The earliest SSGs worked well enough, but were slow (taking several minutes to build even a small site). They also were *not* for normal folks like you but, instead, clearly just for developers and technical writers who needed to generate online documentation and didn't want to write its HTML and CSS. Fortunately for you, things have advanced considerably over the years. Today's best SSGs (in my opinion, which I'll share shortly) can do this tremendously quickly and with little or no tinkering required.

Ideally, using a static site generator is pretty easy. You pick out how you want your site to look, you "tell" the SSG that in whatever method befits that SSG, and you provide the content either through writing it in a plain-text format called [Markdown](/posts/2019/03/mark-it-down/) or by using a compatible [content management system](https://en.wikipedia.org/wiki/Web_content_management_system) (CMS) option. The latter method can make content creation with an SSG pretty much as easy as using WordPress and the others like it, but you still get all the advantages of a static site.

I use the word "ideally," above, because certain SSGs --- and more powerful development platforms which promote their recently gained SSG-ish abilities --- do not work well, nor were designed, for you. They were, in fact, built *by* developers *for* developers. If you're a non-developer and can figure out how to use them, fine, but that's a lonely and steep road up which to drag yourself, especially since there are at least two much friendlier alternatives I can recommend.

## First choice: Hugo

[Hugo](https://gohugo.io) has been around for quite a few more years than most of the other well-known SSGs and, while it doesn't get quite the press it once did, the still-popular Hugo remains the fastest SSG in existence. It can build a 100+-page site in under two-tenths of a second. (Some trendier SSGs take *minutes* to do that. If you build a site with a slower SSG and start seeing your monthly costs go up because of the *build times* involved --- if you're using a website host with fairly strict limits on builds --- you'll wish for something approaching Hugo's speed.)

Unlike many of the other SSGs, Hugo *doesn't* rely on a long string of software dependencies; it's completely self-contained, which is a huge advantage if you just want one simple thing that flat-out works. Also, because Hugo is so popular and has been in existence for so long, it has hundreds of free *[themes](https://themes.gohugo.io/)* from which you can choose the look-and-feel you want, perhaps without typing a single line of code. Then all you have to do is write your posts.

### With great speed comes&nbsp;.&nbsp;.&nbsp;.

Hugo's awesome speed is its greatest strength. That speed comes from Hugo's roots in the [Go programming language](https://go.dev).

However, to be fair, I must note that Go is also responsible for Hugo's most significant weakness.

This is because Go's *templating* --- that's how you make a single layout handle a whole bunch of pages, rather than having to design each one separately --- is no walk in the park even for most developers, much less for normal folks. Thus, I strongly urge you to take the time to *pick a good theme*. It not only should look the way you want but also be pre-configured with all the functionality you'll need. That'll probably spare you from spending time trying to understand, much less edit, something like:

```go-html-template
{{ if ne $paginator.PageNumber $paginator.TotalPages }}
	<a class="icon" aria-label="Last page" href="{{ $paginator.Last.URL }}">
		{{ partial "svgNextPageIcon.html" . }}{{ partial "svgNextPageIcon.html" . }}
	</a>
{{ else }}
	<span class="text-muted">{{ partial "svgLastPageIcon.html" . }}{{ partial "svgLastPageIcon.html" . }}</span>
{{ end }}
```

With that one qualification, I highly recommend Hugo as the easiest SSG for a normal person to learn and use.[^2]

**Update, 2022-07-19**: More than a year-and-a-half after writing the above, I had [second thoughts](/posts/2022/07/really-getting-started-hugo/) about it.
{.box}

That said, I have another one to recommend if you're feeling just slightly more ambitious and, especially, if you'd prefer to use something where the templating isn't quite as strange-looking as that example, above.

## Close second choice: Eleventy

[Eleventy](https://11ty.dev) is based on the much more commonly used JavaScript programming language and, while not as fast as Hugo, is among the most nimble of the many JS-based SSGs available today.

It's also by far the easiest and most flexible JS-based SSG to set up and use, allowing the use of a number of templating languages; so, if you *do* want to do a little playing around with the innards of whichever SSG you pick, Eleventy is your go-to. With its growing popularity, Eleventy is quickly amassing a large community who gravitated to it precisely because of its competitors’ shortcomings.

There is no real theming for Eleventy at this writing *but* there are plenty of [starter sets](https://www.11ty.dev/docs/starter/) available for it. I even have [one of my own](https://github.com/brycewray/eleventy_solo_starter/) out there, similar to the look-and-feel of this site. If you decide to opt for this highly commendable JS-based SSG, I suggest, just as I did regarding themes for Hugo, that you take time to select a starter set best fitting your requirements --- so that, at least at the outset while you're getting used to everything, you'll need to do as little of your own setup and design as possible.

## I suggest you avoid these

So much for those good words about Hugo and Eleventy. By contrast, I now must tell you normal people to steer clear of most *other* SSGs, and these following three in particular. Sadly, I know whereof I speak.

### Next.js and Nuxt.js

[Next.js](https://nextjs.org) and [Nuxt.js](https://nuxtjs.org) aren't really SSGs in the first place. They're major JavaScript frameworks. Next.js is built on [React](https://reactjs.org/), and Nuxt.js on [Vue](https://vuejs.org/). (If you have no idea what any of that means, don't worry about it.) Both Next.js and Nuxt.js are great for building web *apps* but, despite their recent, commendable, and much-touted enhancements on the SSG front, they remain development frameworks first and foremost. The SSG part was added to each just to sweeten the deal. They are **not** for non-developers, and may never be.

### Gatsby

If you've researched SSGs, you've probably seen a lot about [Gatsby](https://gatsbyjs.org), a tremendously popular and well-funded product. It has some amazing capabilities and is even used by some non-developers (albeit with its geeky stuff probably hidden behind a compatible CMS). However, my own experiences with Gatsby both positive and negative --- mostly the latter --- lead me to steer you away from it.

To use Gatsby without pain, you need to be fairly conversant in not only that React framework I mentioned before but, also, the [GraphQL](https://graphql.org/) query language (Gatsby has a pretty cool interface that helps with GraphQL, but it's not cool enough to make up for the concomitant hassles). Gatsby typically needs a *lot* of configuration to do its thing, and that's precisely what you *don't* want. I could tell you much more, as my regular readers know all too well, but that'll suffice for these purposes. Admire it, perhaps, but don't use it.

## This road, friend, not that one

If you're about to drive your car down a potentially dangerous road, you'll appreciate getting flagged down by somebody who already took *his* car down that same road and cracked an axle in the process, a person who now advises you to try a different route.

I hope the scars I've acquired in building websites in general and static websites in particular will translate, through this post, to your having the website --- and website-building process --- that will work best for you.

[^1]:	Note that I'm saying "cracked" rather than "hacked." The term *hacking* is widely misunderstood to mean criminally attacking computer systems when, in fact, it has always meant only computer coding, often in an attempt to solve a problem. Only *criminal* hacking is *cracking*. All cracking is hacking, but not all hacking is cracking.

[^2]:	About a year and a half ago, I wrote two articles about getting started on a Hugo-based website: "[Ec-static](/posts/2019/04/ec-static/)" and "[Publish or perish](/posts/2019/04/publish-or-perish/)." You may still find them of use, but I suggest searching for newer "how-to" articles about Hugo, which has added a number of great features since then. Of course, you should also check the [official Hugo documentation](https://gohugo.io/documentation/), but be forewarned that it's clearly intended for a more technically oriented audience than was this post --- or those two I just mentioned.
