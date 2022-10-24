---
title: "Astro and the move to MDX"
description: "After running into performance problems with basic Markdown, the Astro dev team opts for a more component-oriented flavor — and reaps benefits."
author: Bryce Wray
date: 2022-07-30T21:42:00-05:00
#initTextEditor: iA Writer
---

**Note**: This post also appears on [dev.to](https://dev.to/brycewray/astro-and-the-move-to-mdx-4bd0).
{.box}

Grizzled old guy that I am, I saw [the original "Hail Mary" play](https://en.wikipedia.org/wiki/Hail_Mary_pass) when it happened[^Vikings] back in 1975, so I like to think I know a good "Hail Mary" when I see one. In fact, I may have done just that.

[^Vikings]: Sorry, Minnesota Vikings fans, but I'm *not* interested in your complaints about offensive pass interference on the play. It was a long, long time ago. Get over it. (Also: in the famous film sequence of Drew Pearson as he crossed the goal line with the winning score, that was an *orange* thrown onto the field by a fan, not a penalty flag thrown by a referee. Truth hurts; I know.)

In April, I wrote "[Is Astro ready for your blog?](/posts/2022/04/astro-ready-your-blog/)" In it, I noted that, although the [Astro](https://astro.build) [static site generator](https://jamstack.org/generators) (SSG) was (as it still is) justly receiving a lot of love for its many cool features and the leanness of Astro-built sites, it did suffer somewhat regarding the developer experience on a site containing a large number of Markdown files:

> . . . larger sites don't refresh all that quickly when you edit either Markdown or an `.astro` file . . . . where refresh-in-dev-mode speed is concerned, all the other competitors currently have an edge on Astro for this item, with the stunningly fast [Hugo](https://gohugo.io) obviously leading the pack.

*(Link added to original text.)*

Here's what I meant. When I'm running Hugo in dev mode and save a change to any of my site's "watched" files (content, style, layout, *etc.*), I see the result almost instantly on-screen; but, with Astro back then, such actions caused Astro to "think about" the change for several seconds before it would display the revision.

In the [subsequent "Mulling over migration?" post](/posts/2022/05/mulling-over-migration/), I added more details:

> If your current site has only a few pages, you'll find Astro's dev server refreshes the browser quickly enough to suit you. However, after your content gets up to and beyond about the 100-page level, even a fairly simple content edit will cause the refresh to take several seconds when you save the file you're changing, and the lag will get longer as the site gets bigger.

> The Astro devs are aware of the issue --- perhaps related to [Astro's interaction with Vite](https://astro.build/blog/astro-021-preview/#hello-vite) --- but it's unknown when it'll be fixed. Thus, with a larger site, you may want to get used to writing your content *outside of* development mode and, only then, activating the Astro dev server to check the new page's appearance.

This dev-mode sluggishness wasn't the main reason why, as I wrote near the end of that post, I had moved this site off Astro and back to Hugo in May after only a few weeks with the newer SSG, but it didn't help.[^otherReasons] Still, I retained interest in and curiosity about Astro, so I continued occasionally to look in on its [Discord community](https://astro.build/chat).

[^otherReasons]: In time, though, I found other reasons to prefer the Hugo DX, especially as I delved more deeply into coding projects requiring access to remote APIs. Hugo makes that work considerably easier than does any [Node.js](https://nodejs.org)-based SSG.

Along the way, I saw that the launch of Astro 1.0, originally planned for early June, had slipped multiple times. As of now, it's set for next week, assuming the current Release Candidate (RC) suffices. This post is about one key decision that came *very* late in the dev process: Astro is shifting content management support from Markdown to [MDX](https://mdxjs.com). (While Markdown will still work in Astro at least for the time being, it'll do so under a "legacy" flag.)

As for why the Astro team made such a decision, especially so close to the desired date for "shipping" v.1.0, one recent comment on the Astro Discord by Astro co-creator Fred K. Schott may be especially telling. When a user wondered about problems with using components in Astro-flavored Markdown, Schott replied:

> Yeah, you've kind of hit [on] the thing it's taken us a year to learn: it's really hard to build your own MD [plus] components system and syntax[.] 😅 We're experimenting now with MDX as a better solution for components in [Markdown;] instead of us having to develop our own system we could leverage MDX instead. We already have experimental support . . . but if all goes well this would become standard in time for v1.0 with us deprioritizing our own[.]

This is somewhat reminiscent of the Astro devs' decision late last year to transition Astro from their own [Snowpack](https://snowpack.dev) platform to Vite. It wasn't easy, but the performance win was significant.

In similar fashion, making the move from Markdown to MDX this late in the ballgame is a big gamble. However, with the hassles the Astro devs have encountered while trying to make Markdown and Astro play nicely together, it makes sense --- particularly considering how much of Astro's *raison d'être* involves not only a pleasant DX but also smooth interaction between markup and components.

By this weekend, the Astro team appeared to have MDX working smoothly with the latest RC version, so I put it through some tests. Specifically, I wanted to see the DX for an Astro site with about as many MDX files as my current Hugo site has Markdown files. In fact, I even stacked the deck a bit against Astro by giving the test project *more* such files. (Each MDX file had numerous paragraphs of "lorem ipsum" boilerplate, enough to constitute plenty of text for Astro to manage.)

Based on my tests, the move to MDX looks like a winner. In dev mode, edits to "watched" files show up virtually immediately (I'd say Astro's MDX DX, so to speak, is very similar to [that](https://www.zachleat.com/web/build-benchmark/#benchmark-results) of [Eleventy](https://11ty.dev)'s with plain Markdown). This could simplify a move to Astro for some folks with big, Markdown-heavy sites, folks who simply couldn't stomach the molasses-like DX that they'd encountered before Astro/MDX interactivity became a thing.

So what could be wrong with this picture? Well, anyone who had *already* transitioned existing Markdown content from another SSG to Astro --- especially given the [changes such a move required](/posts/2022/05/mulling-over-migration/#modifying-your-markdown) --- now must do so *again*. **However**, for those who **hadn't** yet made that wrenching change, it's a lot easier to move regular Markdown files to an MDX-equipped Astro site: you just change their extensions from `.md` to `.mdx`. Of course, you'll have to address any "special" stuff you may have put in that Markdown on the other SSG, just as you would in moving between *any* two SSGs; but, now, *generic* Markdown as `.mdx` will work just fine in Astro.

The stability of Astro, like any other SSG (especially a JavaScript-based one), is only as good as the stability of its many third-party dependencies; and some of those are still a little shaky at this writing. That said, where the RC's readiness for becoming the *real* v.1.0 is concerned, the team is pretty near the finish line on this count --- and, in my view, the new MDX compatibility is a surprisingly big reason why. The switch was a gutsy move to make at all, much less at this point in the run-up to v.1.0, but also one that needed to be made.

To the good folks at The Astro Technology Company: I think you just threw one whale of a "Hail Mary" as the fourth-quarter clock was ticking down to zero. Here's hoping v.1.0 is a winning touchdown.
