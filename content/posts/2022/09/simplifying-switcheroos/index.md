---
title: "Simplifying switcheroos"
description: "Although I’m unsure of its value beyond my own brain, here’s a tale of how I made it easier to continue as a migratory nerd."
author: Bryce Wray
date: 2022-09-23T09:09:00-05:00
#draft: true
initTextEditor: iA Writer # default --- change if needed
---

**Note**: This post also appears on [dev.to](https://dev.to/brycewray/simplifying-switcheroos-4m2f).
{.yellowBox}

It's a web meme that began as [a line from *Jurassic Park*](https://www.imdb.com/title/tt0107290/quotes/qt1464414):

> . . . your scientists were so preoccupied with whether or not they *could* that they didn't stop to think if they *should*.

Well, the other day, my oft-mentioned-here enthusiasm for switching this site among various static site generators (SSGs) manifested itself in an idea that I immediately thought was so cool that I had to make it happen.

And, no, I didn't stop to think if I should.

But the thing is, I've heard from and read about others out there who, as do I, like to perform these switcheroos in which they move their sites from one SSG to another. It's not just *moi*. So I thought I'd write up the whole thing, just in case my fellow migratory nerds out there might find it useful.

## The former way

First, here's a brief summary of how, *before* now, I would perform such site moves. The term *project* below refers to a website instance in my web host of choice, [Cloudflare Pages](https://pages.cloudflare.com). Terms vary from host to host (*e.g.*, [Vercel](https://vercel.com) also calls them *projects*, while [Netlify](https://netlify.com) calls them *sites*), but you understand what I mean.

For each SSG of interest, I'd have my site's content in a project. Of course, only one project at a time could be *the* site --- we'll call it the *Site Project* --- and so only that one was set to receive traffic for my *brycewray.com* domain, unlike however many *Non-site Projects* I might be maintaining.

When I chose to do a switcheroo, I'd have to:
- Go into the Site Project and disable its settings for that custom domain, *thus taking my site offline*.
- Go into the Non-site Project to which I wanted to move the site and set *it* up for that custom domain.
- Wait until the host "blessed" the change, at which time the switcheroo would become official and my site would be online again.

While experience born of sheer repetition allowed me to do the first two parts in well under a minute, and the subsequent "blessing" usually[^certs] occurred almost as quickly, sometimes Stuff Would Happen and my site would be offline for minutes.

[^certs]: More often than not, it's a function of how quickly the host can auto-issue a new SSL certificate so the site will have that `https:` goodness. Under normal circumstances, the cert is issued within a minute. In my case, I get it for both *brycewray.com* and *www.brycewray.com*, but these happen sufficiently simultaneously that the doubling-up usually isn't a factor.

It's not as if my site is mission-critical to humanity or anything like that, but I still was annoyed by that (usually) brief period of offline-ness. I was sure there had to be a better way --- other than the obvious choice of *never* migrating, that is.

This is where my idea comes into play.

## The new way

It was obvious that the failure point was in the domain-switching part. The just-as-obvious answer was that I would simply **not** switch the domain. Instead, I'd set up just **one** project, to which the domain would always be assigned, and point **different** repos to that project.

"But, wait," you say, "even that repo switch can involve some period of down-time, right?"

Yes, *if* you do the switchover through the host's GUI.

But what if you **don't**?

What if you do it completely through [CI/CD](https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html)?

Bingo.

So here's what I did.

1. I created a new project, called `static-site`.
2. For `static-site`'s *default* content --- the repo that the host's GUI assigns to it via the usual Git connection --- I assigned a for-testing-only repo which, on publication, has just a couple of minimal pages and nothing more.[^host]
3. In *each* SSG-specific repo (*i.e.*, each repo with my site's real content and using a specific SSG of interest), I created a GitHub Action (GHA) that would publish to `static-site`, and thus the site.
4. Then --- and this is how the whole trick works --- I make sure that *only* the SSG-specific repo I *want* to use has its GHA in the right location (`.github/workflows/`) so it'll work, while each other SSG-specific repo has its GHA in a standby location which GitHub won't "see" as a trigger point.

[^host]: Why did I even bother with that? Because it's the easiest, quickest, least glitchy way of getting the `static-site` project online at all. I've not yet found a way to *initiate* such a project strictly via CI/CD without first setting up at least a bare-bones presence via the host's GUI --- mainly because there are certain parameters that I can't even put in CI/CD until the project exists. It's a chicken/egg thing.

This way, I can work with and push commits to each remote repo as much as I want, but *only* the one I want to be the site repo at any given time will actually have its content published to the website on each push.

Thus, I can effortlessly, *instantly* switch my site between [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io), or between Hugo and [Astro](https://astro.build), or between Astro and . . . well, you see.[^feeds]

[^feeds]: One drawback to such switches --- one which will probably keep me from executing them in *too* willy-nilly a fashion --- is that they tend to re-send recent entries in the site's [RSS](https://en.wikipedia.org/wiki/RSS) and [JSON](https://jsonfeed.org/) feeds. I'm sure there's a way to avoid that, perhaps through working to make each SSG's feed output as identical as possible, but I haven't yet found it.

## The proverbial "devil's workshop"

Whether anyone else might ever have a use for such a method, I obviously can't say, but it works for me. If you can find value in it, there you are.

And, if not: well, try not to pity me *too* awfully, okay?

Besides, it could've been worse: I had a fleeting thought of trying to come up with a [**monorepo**](https://en.wikipedia.org/wiki/Monorepo) with *multiple* SSGs and their respective configurations, file/folder "lookup orders," *etc.* --- so I could share just one set of content among all the SSGs, making switcheroos that much easier. At least I didn't go *there*.

Well . . . not yet, anyway. *[Evil laugh.]*
