---
title: "Webmentions in three SSGs: Part 4"
description: "Part 4 of a five-part series about incorporating the IndieWeb into three different static site generators (SSGs) — in this case, Gatsby."
author: Bryce Wray
date: 2020-04-28T16:45:00-05:00
---

{{% disclaimer %}}

**Note**: This is Part 4 of a five-part series about how you can set up [webmentions](https://indieweb.org/Webmention) in websites built by three different [static site generators](https://staticgen.com): [Eleventy](https://11ty.dev) (the subject of [Part 2](/posts/2020/04/webmentions-three-ssgs-2/)), [Hugo](https://gohugo.io) (the subject of [Part 3](/posts/2020/04/webmentions-three-ssgs-3/)), and [Gatsby](https://gatsbyjs.org) (covered in detail in this part). In the [conclusion](/posts/2020/04/webmentions-three-ssgs-5/), you'll find a bibliography of the best articles I found on the subject of this series. All of the articles link (even if only through tiny [GitHub](https://github.com) logos) to their authors’ code. They were invaluable to this effort, and I encourage you to take particular notice of them and their authors.
{.box}

**Added note, 2020-07-26**: I have now archived the various configuration files linked within this series within a [GitHub repo](https://github.com/brycewray/files-webmentions) of their own and changed the links accordingly, so as to make them immune to ongoing changes in the repos originally linked from this series.
{.box}

In the [introduction](/posts/2020/04/webmentions-three-ssgs-1/) to this five-part series, I gave you a quick run-through about the [IndieWeb](https://indieweb.org) and the general setup of webmentions. In [Part 2](/posts/2020/04/webmentions-three-ssgs-2/), the subject was how you implement webmentions specifically in the [Eleventy](https://11ty.dev) SSG. Then, in [Part 3](/posts/2020/04/webmentions-three-ssgs-3/), I moved on to the subject of implementing them in the [Hugo](https://gohugo.io) SSG. Now, here in Part 4, it's time to look at doing the same thing in the [Gatsby](https://gatsbyjs.org) SSG.

My original hope, as I told you at the end of [Part 3](/posts/2020/04/webmentions-three-ssgs-3/), was that the webmentions-on-Gatsby implementation would benefit from JavaScript code I'd used in my [Eleventy repo](https://github.com/brycewray/eleventy_bundler).

Ah, silly me.

## Gatsby: Fetching webmentions

One good thing you can say about Gatsby: because of its great popularity, you have a decent chance of finding a [plugin](https://www.gatsbyjs.org/plugins/) that can help you do just about any reasonable thing one can make a Gatsby site do.

I knew that [Chris Biscardi](https://www.christopherbiscardi.com/post/building-gatsby-plugin-webmentions) had created [gatsby-plugin-webmention](https://www.npmjs.com/package/gatsby-plugin-webmention) for the express purpose of fetching webmentions from [webmention.io](https://webmention.io/) and exposing them to Gatsby's [GraphQL data layer](https://www.gatsbyjs.org/docs/graphql-concepts/), from which one should be able to query for the numerous levels of appropriate content.

Still, handling the webmention.io token as an [environment variable](https://en.wikipedia.org/wiki/Environment_variable) in Gatsby was tricky because I had to do two things to make the plugin send the appropriate token:

- Instead of having just one `/.env` file, I had to have separate `/.env.development` and `/.env.production` files, which allowed me to specify in the plugin-specific code in [`/gatsby-config.js`](https://github.com/brycewray/files-webmentions/blob/master/gatsby_site_css-grid/gatsby-config.js) that it should find the token in the [`process.env` global variable](https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7) that [Node.js](https://nodejs.org/) uses to determine the current working environment, development or production.[^RegularEnv] As with the standalone `/.env` file I mentioned earlier in the series, you should **not** source-control these files.

[^RegularEnv]: Just to be consistent with the other repos, I still put a [non-source-controlled](https://dev.to/somedood/please-dont-commit-env-3o9h) `/.env` file in the Gatsby repo, but I know Gatsby doesn't see it.

- In each of those `/.env.*` (so to speak) files, I had to give the webmention token a name with a *prefix* of `GATSBY_`. (I did try a [plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-env-variables/) that was supposed to fix this, but it didn't work for me.) So, since my token is called `WEBMENTION_IO_TOKEN` in other repos’ respective `/.env` files, I named it `GATSBY_WEBMENTION_IO_TOKEN` in *both* `/.env.development` and `/.env.production`.

**Note**: If you deploy a repo like this through [Netlify](https://netlify.com), that `/.env.production` file is irrelevant since the proper procedure is to [let Netlify handle sending an environment variable](https://docs.netlify.com/configure-builds/environment-variables/#declare-variables) at the appropriate time. I use that file only for executing "production" builds on my local setup in the testing process through the `gatsby build` command (which is all that's in the `build` script in [`package.json`](https://github.com/brycewray/gatsby_site_css-grid/blob/master/package.json)).

Once I'd properly assuaged this particular Gatsby quirk, I could see the webmention.io data was clearly coming through in GraphQL. That's why I figured I was already about eight-tenths of the way home even before I got started on the more tedious coding required to make things actually appear.

Yeah, right. And you'd think I'd have known better, too.

## Gatsby: Displaying webmentions

After all: it hadn't been that long since my failed [Gatsby Experiment I](/posts/2019/07/why-staying-with-hugo/), my equally failed but at least shorter [Gatsby Experiment II](/posts/2019/09/why-left-hugo-eleventy/), or even my successful [Gatsby Experiment III](/posts/2019/10/now-gatsby-geezer/); so I should've realized that just because the Gatsby repo could now *"see”* the webmentions in GraphQL didn't mean I could make the repo's *[components](https://www.gatsbyjs.org/docs/building-with-components/)* see them --- or, at least, not without a lot of preliminary grief.

This is where I ran into the toughest "chase scene"[^Chase] of this entire effort.

[^Chase]: As noted in [Part 1](/posts/2020/04/webmentions-three-ssgs-1/): ".&nbsp;.&nbsp;.&nbsp;I found it *really* difficult to follow the logic in certain articles’ related code. I found myself chasing variables, constants, and statements from other files --- and sourly muttering things like 'Where'd *that* come from?' and 'What's *that* got to do with what's supposed to be happening here?' and 'Wait a minute; what happened to the step *before* this part?'"

For several nights, I pored through successful-webmentions-on-Gatsby articles, forum posts, and repos, trying desperately to duplicate how others had done it. There were a number of false exits along the way. Quite often, I'd achieve display of a *few* webmention elements and think I'd solved the problem, but then quickly discover not only that I couldn't display the *next* few but also that Gatsby didn't even understand what the next few *were*. If I saw one Gatsby error message about trying to display items it considered `Undefined`, I saw a million.

I had hoped to reproduce some of the webmentions-filtering process from the Eleventy repo, so as to avoid the being-eaten-by-ants feel I often got from dealing with GraphQL queries. That hope quickly died. While some things work just fine in the "vanilla" JS that Eleventy uses for this stuff (some of which I'd even been able to use in the [Hugo repo](https://github.com/brycewray/hugo_site_css-grid), as noted in [Part 3](/posts/2020/04/webmentions-three-ssgs-3/)), Gatsby "[don't play dat](https://mygeekwisdom.com/2014/02/08/homey-dont-play-that/)."

So what *did* I do, finally?

Ironically enough, the answer turned out to be a case of "[I, for one, welcome our new GraphQL overlords](https://knowyourmeme.com/memes/i-for-one-welcome-our-new-insect-overlords)." In other words, I had to lean *more* heavily on GraphQL, not less so.

For each possible `wm-property` (or `wmProperty`, as GraphQL and Gatsby [have to call it](https://stackoverflow.com/questions/5516106/are-dashes-allowed-in-javascript-property-names)) that I wanted to track, I did a separate [aliased query](https://www.gatsbyjs.org/docs/recipes/querying-data/#graphql-query-aliases). While it amounted to a boatload of query code in the component, *it worked*. By now, I had ceased to worry about whether it was even remotely pretty. I just wanted the fricking webmentions to *appear* and *get counted* as in the Eleventy and Hugo repos. So much for coding vanity, if that's even a thing.

And where did this code go? Well, therein lies another tale about how I achieved workable (if ugly) code in the first place.

Like most if not all of the other major SSGs, Gatsby is designed to encourage separating code into parts, specifically *components* in the [React](https://reactjs.org)-based Gatsby's case. The idea is for you to use multiple layout pieces --- "partials," in [Hugo-ese](https://gohugo.io/templates/partials/#readout). This makes it easier to re-use stuff like headers and footers wherever they're needed, thus pleasing the all-hallowed [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) Gods.

**However**, with Gatsby, as is true for most other React-based platforms, this is taken even further. You might say the Gatsby way involves "partials [all the way down](https://en.wikipedia.org/wiki/Turtles_all_the_way_down)." Even so, that's usually fine; you just call each piece as needed, right?

Well, you'd think so.

But there's this one little thing about Gatsby page components as opposed to Gatsby non-page components: the latter can't make full use of the GraphQL querying capabilities. Specifically, non-page components are limited to using the *[StaticQuery](https://www.gatsbyjs.org/docs/recipes/querying-data/#querying-data-with-the-staticquery-component)* method, which (like the newer [*UseStaticQuery*](https://www.gatsbyjs.org/docs/use-static-query/)) is more limited in what parameters it will accept and how you can incorporate it into your site.

In essence, the problem was feeding the GraphQL queries the right information so GraphQL could find the webmentions that went with each page --- *i.e.*, because each webmention refers to a page's URL as the `wm-target`, I had to make the GraphQL ask, "What is this page's URL, so that I can then sift through the webmentions and find only the ones that go with it?" Since [StaticQuery can't accept the variable](https://www.gatsbyjs.org/docs/static-query/#how-staticquery-differs-from-page-query) which otherwise would've made that reasonably simple, I had to put the code in a *page* component rather than a *non*-page component.[^MaxComment]

[^MaxComment]: I got an unexpected laugh when, while searching for a way to make this happen, I found a fine [CSS-Tricks](https://css-tricks.com) article, "[How to Get the Current Page URL in Gatsby](https://css-tricks.com/how-to-the-get-current-page-url-in-gatsby/)," by Dmitry Mayorov. My laugh came after I'd read Mr. Mayorov's rather detailed explanation, when I saw that the very first reader response was in the form of a [comment by none other than Max Böck](https://css-tricks.com/how-to-the-get-current-page-url-in-gatsby/#comment-1753198) which would resonate with anyone vexed by Gatsby's complexity: *"Jesus that's a lot of JS just to access the page url. This is literally just \{\{page.url\}\} in most other SSGs.”* Preach on, Brother Böck.

What this meant for my specific situation was that, rather than have a `/src/components/webmentions.js` component that each template could call separately, I ended up putting the appropriate code in *each* affected component.

And, yeah, that's *extremely* offensive to the DRY Gods. They'll have to get over it.

Thus, you'll find the code that worked for the Gatsby repo in:

- [`/gatsby-config.js`](https://github.com/brycewray/files-webmentions/blob/master/gatsby_site_css-grid/gatsby-config.js) --- Mostly for Chris Biscardi's `gatsby-plugin-webmention` plugin, but you should also note the `dotenv`-related code at the very top that works with the two separate `/.env.*` files. Without that, you ain't got no webmentions from webmention.io, period, end of story.

- [`/gatsby-node.js`](https://github.com/brycewray/files-webmentions/blob/master/gatsby_site_css-grid/gatsby-node.js) --- This added to the [PageContext](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/#pass-context-to-pages) the variable `urlToCheck` for use by the GraphQL queries for webmentions. Until I got that in there, those queries were stumped. (Using `permalink` didn't work; as I learned on testing, it came back as `https://brycewray.com[objectObject]` or something like that, despite how it looked in that file. I'm sure I did something stupid to cause that but, as you've gathered by now, I'm past the point of caring about it.)

- [`/src/templates/singlepost.js`](https://github.com/brycewray/files-webmentions/blob/master/gatsby_site_css-grid/src/templates/singlepost.js) --- This is the big enchilada with *all* the GraphQL queries and spaghetti that make the webmentions appear on posts for which webmention.io has received them.

- [`/src/components/layout-home.js`](https://github.com/brycewray/files-webmentions/blob/master/gatsby_site_css-grid/src/components/layout-home.js), [`/src/components/layout-about.js`](https://github.com/brycewray/files-webmentions/blob/master/gatsby_site_css-grid/src/components/layout-about.js), and (again) `/src/templates/singlepost.js` --- For the footer-based [microformats](https://indieweb.org/microformats) data that webmentions require. (In the first two, I just "hand-coded" the respective microformats stuff because each is used for only one page, either the [home page](/) or the ["About" page](/about/); so that data won't change.)

And, oh, don't forget [`/src/assets/css/webmentions.css`](https://github.com/brycewray/files-webmentions/blob/master/gatsby_site_css-grid/src/assets/css/webmentions.css), which is identical to its counterparts in the other two repos.

## The end is in sight

Sorry for the harrowing nature of this part in particular, but my purpose was to give you some idea of potential bumps in the road-to-webmentions traverse so you could, if not truly *avoid* them, at least know where they were before you cracked a metaphorical front axle on them. To be sure, many other Gatsby users can address them far, far more capably than I; but what I've done works and, hey, my hands shake only a *little* when I recall the ordeal.

Now, let's wrap up things with this series’ [conclusion](/posts/2020/04/webmentions-three-ssgs-5/) --- including that **bibliography** I touted at the start.
