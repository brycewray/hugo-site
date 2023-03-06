---
title: "Simplify, simplify"
description: "A Thoreau-ly fine website, or the result of choosing between simplicity and FOMO."
author: Bryce Wray
date: 2021-02-06T21:00:00-06:00
---

{{% disclaimer %}}

> Our life is frittered away by detail. Simplify, simplify.<br />
> --- [Henry David Thoreau](https://simple.wikiquote.org/wiki/Henry_David_Thoreau).

A few days ago, I [explained](/posts/2021/01/leaner-cleaner/) that I was simplifying the site's look-and-feel. That seemed plain enough, I'm sure.

There was more going on behind the scenes, however.

Story time&nbsp;.&nbsp;.&nbsp;.

 ---

It's been about two-and-a-half years since I first launched this site. It's been closer to three years since I began research into how I wanted to maintain it. That process ended with my choosing to go with [static site generators](https://jamstack.org/generators) (SSGs) in general and the [Hugo](https://gohugo.io) SSG in particular.

Not quite a year after that, I [reexamined](/posts/2019/07/why-staying-with-hugo/) the Hugo choice because I had what the Kewl Kids used to call "FOMO" --- Fear of Missing Out. I figured I'd gain more potentially marketable experience by using an SSG based on [JavaScript](https://js.org) rather than the [Go](https://go.dev)-based Hugo, especially given that most of the hotness in the world of SSG development seemed to originate from JavaScript-based SSGs.

That led me to not one, not two, but [three](/posts/2019/10/now-gatsby-geezer/) tries of [Gatsby](https://gatsbyjs.org). There also was an initial [short try](/posts/2019/09/why-left-hugo-eleventy/) of, followed by a [longer engagement](/posts/2019/12/packing-up/) with, [Eleventy](https://11ty.dev).

Sprinkled in between that short try and longer engagement, not to mention the dalliance with Gatsby, was a brief [return to Hugo](/posts/2019/09/back-with-hugo/) that was spurred in part by a distrust of all the [Node.js](https://nodejs.dev) [dependencies](https://nodejs.dev/learn/npm-dependencies-and-devdependencies) that power both Gatsby and Eleventy. This is as opposed to Hugo, which is a single-binary executable --- in plain language, an *app*.

Nonetheless, I enjoyed JS-based SSGs in general and Eleventy in particular, so I buried such thoughts in the back of my mind and went on my merry way, figuring I'd finally fought the issue to a conclusion.[^dance2019]

[^dance2019]: Those of you who want to go on an even deeper trip back down Memory Lane on what I ended up calling my "Dance" among SSGs need only check out my [end-of-2019 retrospective](/posts/2019/12/sorta-strange-ssg-trip/) and, if you're so inclined, follow its links.

Then, starting in the spring of 2020, I had occasion to deal with Hugo once again.

In April, I wrote about incorporating [webmentions](https://indieweb.org/Webmention) in one's Hugo-based website. It was part of a five-part series about webmentions and SSG-based sites, and the research I did for the [Hugo-related part](/posts/2020/04/webmentions-three-ssgs-3/) allowed me to notice anew some of Hugo's advantages.

In July, as part of [creating some SSG starter sets](/posts/2020/07/beginners-luck/), I made two for Hugo, and once again found myself enjoying working with Hugo more than I'd expected.

Intrigued by the "what-if" ideas now swirling in my cranium, I thoroughly updated my old Hugo repo, including spiffing it up with [themes](https://gohugo.io/hugo-modules/theme-components/) for both [Tailwind CSS](https://tailwindcss.com) and [SCSS](https://sass-lang.com). I even used it to run this site for a few weeks. Nonetheless, I then switched the site back to Eleventy, figuring that'd been enough of that.

As 2020 neared a merciful end, two things happened that made me re-think that judgment.

## Thing One: a wacko repo

One Saturday morning, spurred by curiosity about cache-busting static assets in Eleventy (more on that in Thing Two down below), I began to work once again with the [webpack](https://webpack.js.org)-based Eleventy [repo](https://github.com/brycewray/eleventy_bundler) I'd [abandoned earlier in the year](/posts/2020/05/going-solo-eleventy/). Since it had been months since I'd updated all the dependencies, I ran the [usual sequence](https://www.carlrippon.com/upgrading-npm-dependencies/) of `npm` commands to accomplish that, and then ran `npm run start` so the repo would create a dev-mode version of the site.

Or, at least, I'd *hoped* it would create that. Can you say, "lots of breaking changes"?

Now, this glitchiness was no shock. Among other things, the update took the repo [from webpack 4 to webpack 5](https://webpack.js.org/migrate/5/); and that, alone, accounted for most of the FUBARing. However, quite a few other updated dependencies were equally screwy. I had been prepared to fight a handful of such issues but not a whole host of them, and particularly not in view of my simple lack of knowledge of how to do so.

Slowly, it dawned on me that this was what eventually would happen to *any* of my repos built on Node.js dependencies, even those with which I *did* work actively.[^script] And I began to wonder about how much I wanted to keep fussing with all that.

[^script]:As even one of Eleventy's own maintainers has put it in a [GitHub discussion](https://github.com/11ty/eleventy/discussions/1617), "Eleventy is basically just a glorified Node.js script." (And that's true of all the Node-based SSGs, to be sure.) That's not necessarily a bad thing, mind you; well-crafted Node scripts can do amazing things. But you have to be able to live with the often wobbly piles of dependencies that such scripts typically require.

Then I found a [Hacker News thread](https://news.ycombinator.com/item?id=22830284) from nearly a year ago about an article, "[Ride Down Into JavaScript Dependency Hell](https://blog.appsignal.com/2020/04/09/ride-down-the-javascript-dependency-hell.html)," and in that thread were plenty of comments that sounded a lot like what I was thinking (these are edited only for style and/or spelling):

- "[Every separate package adds overhead and another maintainer that you've got to put your trust in. I'd rather have few packages of well-trusted maintainers instead of a thousand packages from God knows who.](https://news.ycombinator.com/item?id=22842007)"
- "[I have a project with a total of eight dependencies. I walked away for six months as it was stable. I come back to add a few features and npm tells me I have over 38,000 vulnerabilities of different severity levels. So many that `npm audit` just freezes up.](https://news.ycombinator.com/item?id=22841701)"
- "[These types of issues are the biggest reason why I avoid JavaScript/npm projects. I came back to a project after a few months and it was broken; had to rewrite some parts and upgrade other parts just to get it to run again.](https://news.ycombinator.com/item?id=22841815)"
- "[I've had several apps that can basically never be upgraded due to complete insanity deep in their dependency trees. I'm pretty cautious about third-party dependencies, but some of those libraries’ libraries are not, and it's really hard to see that coming.](https://news.ycombinator.com/item?id=22843875)"

And, of course, there'd once been the infamous [`left-pad` incident](https://www.theregister.com/2016/03/23/npm_left_pad_chaos/) which, while mitigated quickly, constituted a cautionary tale of major proportions about packages that were, themselves, giant collections of packages.

As I considered these things, a little voice in my head periodically whispered, *Ya know, you wouldn't be worrying about these things if you were still using Hugo.*[^depHugo]

[^depHugo]: In fairness, let me observe that even Hugo [has a few dependencies](https://github.com/gohugoio/hugo#dependencies) in the form of a number of open-source libraries, such as [Goldmark](https://github.com/yuin/goldmark) for parsing a Hugo site's [Markdown](https://daringfireball.net/projects/markdown) content. The critical difference between Hugo and the Node.js-based SSGs on this score is that Hugo's relatively small number of dependencies are **baked into Hugo** rather than being separate things out in the Node.js package universe which one has to hope will behave themselves.

I soon found myself ruefully recalling my own assessment at the end of "[Why I'm staying with Hugo](/posts/2019/07/why-staying-with-hugo/)," the chronicle of my initial foray with SSGs from the world of Node.js:

> .&nbsp;.&nbsp;. the extraordinarily bright people behind [JavaScript-based SSGs] .&nbsp;.&nbsp;. all need to think about the dicey interaction between all the dependencies and frameworks and other stuff on which their products rely. It's like trying to balance a chair by one leg poised on a tightrope. One little breeze and, **crash**. No, thank you.

## Thing Two: asset pipeline envy

One particular Hugo functionality I not only rediscovered but also learned more about during that run-through last fall was Hugo's built-in asset pipeline, [Hugo Pipes](https://gohugo.io/hugo-pipes). This came to the fore for me after I became more aware of the need for cache-busting static assets. This is something Hugo can do out of the box, while Eleventy has no asset pipeline and therefore must accomplish this through other means.

I spent [three](/posts/2020/11/using-postcss-cache-busting-eleventy/) [separate](/posts/2020/12/cache-busting-eleventy-take-two/) [articles](/posts/2020/12/hashing-out-cache-busting-fix-eleventy/) on this subject of cache-busting CSS in Eleventy. Although I finally managed to come up with a *mostly* satisfactory solution, I once again found myself musing about how ably Hugo, on its own, handles this and so much more for which a Node.js-based SSG needs to depend on, well, tons of dependencies (and, even then, can't always do what Hugo can do).

## The result: thoroughly Thoreau

After several weeks of these and numerous other considerations, I realized that what I wanted most about maintaining this website, over and above all the technicalities, was to **simplify** it. And I meant to simplify it for you readers, too, not just for me.

So, over the last few days, I put in place this plan:

- **Simplify the site's appearance**. [Done](/posts/2021/01/leaner-cleaner/).
- **Move the site's hosting from [Cloudflare Workers Sites](https://workers.cloudflare.com/sites) back to [Vercel](https://vercel.com)**. Done. In my tests over the last half-year, I've found that Vercel provides great worldwide performance and the fastest build speeds in the field while requiring no futzing around with [GitHub Actions](https://github.com/features/actions) for builds.[^CFP]
- **Take the site back to single-binary land with Hugo**. Done. (Well, you probably figured that out some time back in this piece, didn't you?)[^Zola]
- **Decide what to do about Tailwind CSS**. Still in flux. This is the last battlefield of the war between simplicity and FOMO. If FOMO wins on this count, I keep the ultra-popular Tailwind and the [PostCSS](https://postcss.org) it requires --- even though the two constitute, yep, buckets of Node.js dependencies. If simplicity wins, the site goes back to SCSS, as in the site's first year-and-a-half under all three SSGs on which it existed during that period.[^simpCSS]

[^CFP]: That said, I'll still keep an eye on both [Render](https://render.com) and [Cloudflare Pages](https://pages.cloudflare.com), two up-and-coming SSG-friendly platforms which have a lot of promise but also a lot of growing to do.

[^Zola]: I also took another look at the [Rust](https://rust-lang.org)-based [Zola](https://getzola.org) SSG, which is essentially an attempt to make a simplified version of Hugo. Zola is another single-binary, Node.js-free platform **but** has much easier templating, through the [Jinja](https://jinja.palletsprojects.com/en/2.11.x/)-like [Tera](https://tera.netlify.app/), than Hugo's sometimes maddening Go-derived templating. The latest Zola version I tested has eliminated many of the annoyances I'd discovered earlier but isn't yet suitable for my purposes. For one thing, I'm not happy with [how it handles footnotes](https://zola.discourse.group/t/is-there-a-way-to-customise-the-way-zola-parses-markdown-footnotes/694) --- which, as this post makes clear, is an important consideration for this site.

[^simpCSS]: Of course, there's also a possibility that I'll decide the true route of simplicity for my styling concerns would be to *keep* the Tailwind/PostCSS combo rather than committing to the somewhat more tedious maintenance of bespoke SCSS.

At least until I decide that last item, I am maintaining two different themes in the Hugo repo. One is built on Tailwind, and the other on SCSS. (I named them "thoreau" and "thoreauscss," respectively.) While I continue to consider the choice, I can easily switch back and forth between them with a simple edit to the site's [config file](https://gohugo.io/getting-started/configuration/). *[**Update, 2021-03-01**: Decided to go with SCSS, but still have PostCSS for using [Autoprefixer](https://github.com/postcss/autoprefixer).]*

**Important**: Be assured that every compliment I've ever paid to Eleventy, Tailwind, and/or PostCSS still applies. For those who *don't* have a problem with Node.js dependencies, I continue to give my highest recommendation to these projects, most especially Eleventy. All three are actively and lovingly maintained, and currently are far and away the best of their respective breeds (in Eleventy's case, that would be JavaScript-based SSGs).
{.box}

## Time to let others run

> Just when I thought I was out, they pull me back in.<br />
> --- [Michael Corleone, *The Godfather: Part III*](https://www.imdb.com/title/tt0099674/quotes?item=qt0360565).

Indeed.

The story I've related herein may make it appear that over the last year-and-a-half I have, to paraphrase the [Red Queen from *Alice in Wonderland*](https://en.wikipedia.org/wiki/Red_Queen%27s_race), been running as fast as I could to stay in the same place. That's fair.

In my defense, though, I feel the last nineteen months of experience with multiple SSGs and the Node.js universe have been invaluable. I learned a lot and that always was --- and remains --- the idea, much more so than indulging FOMO.

Nonetheless, there comes a time to let others do the hard running.

To be sure, I can keep reading about, researching, and testing SSGs and other related geeky stuff in the background; and I will, because I'm a curious fellow (in multiple senses of the word *curious*). But, when it comes to this site, I believe --- hope --- that I've reached a point where I can make myself stop spending so much time and effort futzing with the house's paint and foundation.

That way, I can work harder on making its interior more comfortable for those of you who visit.

The welcome mat is always out for you.
