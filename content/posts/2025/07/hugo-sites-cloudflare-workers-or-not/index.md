---
title: "Hugo sites on Cloudflare Workers — or not"
description: "Longer-term considerations about recently announced changes at Cloudflare."
author: Bryce Wray
date: 2025-07-11T13:46:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

On further reflection, I've decided Cloudflare's [quiet-ish announcement about the Cloudflare Pages platform](https://blog.cloudflare.com/full-stack-development-on-cloudflare-workers/), about which I first wrote [a few weeks ago](/posts/2025/05/pages-workers-again/), bears some more discussion. That's especially true for sites like this one, built on the [Hugo](https://gohugo.io) static site generator (SSG).

In fact, the whole thing has led me to think about how one might want to make a Hugo site more portable, to minimize the potential impact of such changes on vendors' parts both now and in the future. If you, too, have used Cloudflare Pages as a Hugo site's home and are now pondering what to do, perhaps this post will help you understand your options more clearly.

<!--more-->

## Our story so far . . .

In case you missed it: Cloudflare essentially put Cloudflare Pages (CFP) on life support a few months back, and began advising potential CFP users to build sites on the newly enhanced Cloudflare Workers (CFW) platform instead.[^CFPonCFW] While the CFP platform will continue to exist at least for the time being, Cloudflare really wants folks to change over to CFW.

[^CFPonCFW]: Yeah, I know: CFP is, and has always been, built atop CFW anyway; but you get the idea.

And, to be fair: this may not be that big a deal for sites built on JavaScript-based SSGs. Indeed, the CFW documentation includes a list of recommended site-building [frameworks](https://developers.cloudflare.com/workers/framework-guides/web-apps/), each of which is a mass of JavaScript dependencies. As a result, for the most part, making CFW work with any of these frameworks can be as simple as `npm install`. That's not the case with the Go-based Hugo, which is a binary.

When the CFP-to-CFW issue [arose on the Hugo Discourse forum](https://discourse.gohugo.io/t/hugo-support-in-cloudflare-workers/54866), [Joe Mooring](https://github.com/jmooring) of the Hugo project took time to provide [great guidance](https://github.com/jmooring/hosting-cloudflare-worker) about putting a Hugo site on CFW. This made it easy enough to convert my own simple site from CFP to CFW the same day I found out about all this.

But, in the ensuing weeks, I've seen online comments from Hugo users with more complex CFP-hosted sites and, unfortunately, ongoing issues trying to transition to CFW from the much easier CFP. For example, those whose sites depend on [Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules), such as for externally produced [themes](https://themes.gohugo.io/), have found CFW currently unsuitable if used with a private repository.[^submodules]

[^submodules]: On June 23, a commenter on the Cloudflare Developers Discord [said](https://discord.com/channels/595317990191398933/1384675816935264387/1386742596864446498), "Did a little bit of checking, looks like ssh urls in submodules are not currently supported[.]" Seeing a reference to this, someone on the unofficial Hugo Discord observed, "[so if u have a private repository, the URL alone wouldn't allow CF to read the repository](https://discord.com/channels/909600839717511208/986390889792438344/1388171002881773619)."

These users' frustrations are sufficient as to make them reconsider whether it's worth even bothering with making the transition work *vs.* just starting over with a competing and, presumably, Hugo-friendlier (or less Hugo-unfriendly) host. Thoughts of this type inevitably lead one to wonder how to make one's Hugo project as portable as possible, for just such cases.[^Foghorn]

[^Foghorn]: To quote [Foghorn Leghorn](https://www.youtube.com/watch?v=S9dF5xuJBbM): "Fortunately, I keep my feathers numbered for just such an emergency."

After much ensuing head-scratching and research in this vein, including even revisiting a few of my own past posts about the where-to-put-your-static-site issue, I reached some conclusions about how, and where, a Hugo-based site should exist  in the light of these new realities. As I walk you through some of my considerations, I hope they'll help your own decision-making process if you're entertaining similar contemplations.

## Binaries are the biggie

For a Hugo site, the first and foremost issue involves the handling of binaries.

Building with Hugo requires a host whose build image either *has* the Hugo binary or, at the very least, lets you install it during the build. Additionally: if you're styling your site with [Sass](https://sass-lang.com), you must also be able to get the host to [install the Dart Sass binary into the correct path](https://gohugo.io/functions/css/sass/#dart-sass). (Even if you presently have no interest in using Sass on your Hugo site, you still may want your host at least to make it possible, just in case you change your mind later.)

With the standard method of deploying to Cloudflare Pages --- namely, pushing a commit to a site's connected Git repository --- a Hugo site owner could, with relative ease:

- Specify the Hugo version (one was included in the CFP build image, but I personally prefer to pick the version myself).
- Use the Dart Sass binary **and** specify the version.

On the other hand: the [Cloudflare Workers build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/) offers a pre-selected Hugo binary, perhaps not the latest, and doesn't allow you to pick a version.[^poorlyDocumented] Moreover, the CFW build image doesn't offer Dart Sass at all. Of course, the latter isn't terribly surprising since, again, Cloudflare expects most SSG users to be running JS-based SSGs, and those usually work with Sass through some interaction with the [Sass package](https://github.com/sass/sass)[^ZolaSass] rather than the [Dart Sass binary](https://github.com/sass/dart-sass).

[^poorlyDocumented]: **Update, 2025-07-18**: I later learned, via Discord, from a fellow Hugo user that you actually can select the Hugo version with the Workers build image, in the same way as you would've with Pages --- *i.e.*, through use of a `HUGO_VERSION` environment variable. It's just [not clearly documented](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/#overriding-default-versions). I don't know whether a similar capability exists for using a `DART_SASS_VERSION` environment variable to get the Dart Sass binary; the `HUGO_VERSION` trick likely works because there already is a Hugo binary in the Workers build image, but the same doesn't appear to be true for a Dart Sass binary.

[^ZolaSass]: Incidentally, another exception involves someone using Sass with the Rust-based [Zola](https://www.getzola.org) SSG. Zola uses the Rust [`grass` crate](https://crates.io/crates/grass) for a "more-or-less"-ish compatibility with Dart Sass. I say "'more-or-less'-ish" because the latest release of `grass`, at least as of this post's initial appearance, is lagging quite a bit behind that of the official Dart Sass binary. Whether that matters much is up to each Sass-using Zola site owner; but, were I that user, I wouldn't like it very much, especially given the fairly active cadence of Dart Sass updates. Also on the subject of Zola: currently, its binary isn't in the CFW build image.

What about the competition? Here's how the only competing hosts I'll mention[^DOAP] fare in this regard:

[^DOAP]: A quick review of the free tier of Digital Ocean's Apps Platform shows that DOAP remains as unsuitable as I found it in [2023](/posts/2023/03/publish-or-perish-2023/#digitalocean-app-platform), thus deserving no real mention in any comparisons herein.

- **Hugo** --- The build images for [Netlify](https://www.netlify.com), [Render](https://render.com), and [Vercel](https://vercel.com) provide Hugo and let you specify the version. Netlify and Vercel give you two ways to specify the `HUGO_VERSION` environment variable: through the GUI, or in a config file --- `netlify.toml` or `vercel.json`, respectively. With Render, the only way to set the Hugo version is with a [shell script](https://community.render.com/t/how-to-define-hugo-version/390/7); otherwise, as of this writing, you get a Hugo version from multiple years ago.
- **Dart Sass** --- With Netlify, you can get the Dart Sass binary and specify its version [through scripting in `netlify.toml`](https://gohugo.io/functions/css/sass/#netlify), but not through the Netlify GUI. As for Render and Vercel, I know a [shell script](https://discourse.gohugo.io/t/using-dart-sass-hugo-and-netlify/37099/7) suggested by Hugo's [Bjørn Erik Pedersen](https://github.com/bep) worked [at one time](/posts/2022/03/using-dart-sass-hugo-sequel/), but I haven't tried it on either host recently.

The bottom line on these binaries and the three hosts' native deployment environments is: you can spec your chosen Hugo binary on all three hosts (although not so easily with Render), but using and spec'g the Dart Sass binary is safest with Netlify.

**However**, in my experience, it's easier for a Hugo user to solve the whole problem with *any* of these hosts by using a **separate CI/CD provider**, either [GitHub Actions](https://github.com/features/actions) or [GitLab CI/CD](https://about.gitlab.com/solutions/continuous-integration/). This **host-agnostic** approach gives you much more control over which binaries you download, which versions you get, and other factors that are important for Hugo users.[^GitInfoVars] Although explaining the process is beyond this post's scope (if needed, refer to the Hugo ["Host and deploy" docs](https://gohugo.io/host-and-deploy/)), suffice it to say that each host I've discussed here allows building sites through both GitHub Actions and GitLab CI/CD.[^configFiles]

[^GitInfoVars]: One notable example is if you like to use [Git Info variables](https://gohugo.io/methods/page/gitinfo/). Most hosts' "native" methods [don't make that very easy](https://gohugo.io/methods/page/gitinfo/#hosting-considerations).

[^configFiles]: Be aware that, if you do the Hugo build process on the CI/CD provider, you'll need to experiment with the correct location of the respective config file. For example, it may need to be in your Hugo directory's `/static` directory rather than the usual location (the root directory), but my own tests showed me this isn't always true **and** can vary according to the specific workflow code you're using to deploy the site from within the CI/CD provider. Again, *experiment*. Failure to put the file in the correct location means that, when the CI/CD provider turns the process over to Netlify, Render, or Vercel, the latter won't "see" the config file and the build likely will error out rather than proceeding.

**Note**: To be fair, I remind you of my [2022 findings](/posts/2022/07/using-dart-sass-hugo-some-data-using-github-actions/) concerning potential issues in using GitHub Actions with a Vercel-hosted Hugo site in which Hugo's native image-processing functionality is in use. However, I haven't tested sufficiently to know if the problem still exists, and that was three whole years ago; so I suspect (hope?) that, since, there have been plenty of improvements to the infrastructure that even Vercel's free tier uses.
{.box}

## One heretical afterthought to consider

Before I press on to the finish, I'll dwell briefly on what may be the elephant in this discussion's room: the choice of SSG itself.

As noted, Cloudflare's recent changes are potentially much more of a hassle for Hugo users than for those using JavaScript-based SSGs. But, as you probably already knew, Cloudflare isn't alone in this respect. Indeed, most hosting platforms clearly favor the JS-based tools which have long constituted the overwhelming majority of site-building products; and this favoritism likely will only grow over time.

So, is it time for you, a Hugo user, to throw in the towel and jump ship to a different, JS-based SSG? Will that make your site more future-proof?

Well, only you can make that call. If you do switch, I can tell you from my years of experience that the Hugo-to-whatever conversion process will be anywhere from fairly easy to excruciating, depending largely on two factors: (a.) how big your site is; and (b.) how much Hugo-specific customization your site has. Mine has several hundred pages and more than a little Hugo-ish code that would be a bear to translate, so this site isn't a likely candidate for now.

That said, my long-time readers know I have strayed from the Hugo ranch numerous times in the site's nearly seven years of existence, so I can offer a little more specific advice on the subject of possibly switching from Hugo to something else.

Of the JS-based SSGs I've used over the years to build this site whenever it wasn't a Hugo project, the only SSG that's on Cloudflare's aforementioned list of recommended platforms is [Astro](https://astro.build); and, mind you, my time on Astro was miniscule compared to the many months I used [Eleventy](https://www.11ty.dev). (I also used the now largely moribund Gatsby, and even it gets a little love in the current Cloudflare Workers documentation --- in fact, more than for Eleventy, much less Hugo.) Even when just tinkering, I haven't used either Astro or Eleventy extensively in a couple of years; but I feel either is a solid alternative as a site-building platform to which the typical JS-favoring host is at least less averse than it is to Hugo.[^Kollitsch]

[^Kollitsch]: A few days ago, long-time Hugo user [Patrick Kollitsch](https://github.com/davidsneighbour) converted [his website](https://kollitsch.dev) to Astro. Please note that he is an *extremely* knowledgeable coder, as one look at his [site repository](https://github.com/davidsneighbour/kollitsch.dev) will make clear, so his switch isn't necessarily a guide for all; but his site is a large one with several years' worth of content, so I salute the effort he undertook to make the change.

## So, where?

All right, let's get to the bottom line. After I'd given all this thought to how I could make my own Hugo site more portable and thus less vulnerable to the whims of different hosts, what did I end up doing about the site's hosting?

In fact, I did nothing. As of this post's initial publication, the site is still on Cloudflare Workers.  It all still works, after all. **But**, now, I know how to make a quick exit if I do choose. It's my hope that what I've shared in this post will give you similar knowledge.

But where **would** I go if I **don't** stay with CFW? It would be between Netlify and Vercel. (While I admire Render as a company, I'm not as comfortable with configuring for it, especially where Hugo-specific things are concerned, as I am with the other two.) If I had to pick a winner, it would come down to how wedded I'd be to using external CI/CD, as I now do with the CFW site and did with its CFP predecessor. That's because, in my testing, I found external CI/CD somewhat easier with Vercel than with Netlify, while Netlify's native GUI provides better support for Hugo than does Vercel's. So it really would come down to whether I'd prefer external CI/CD. If yes, it would be Vercel. If no, it would be Netlify.[^NetlifyBuildLimits]

[^NetlifyBuildLimits]: Still, with a site that regularly needs a lot of changes, one would be better off using external CI/CD with Netlify to circumvent the Netlify free tier's monthly build limits. I wrote about this very thing [five years ago](/posts/2020/06/o-say-can-you-ci-cd/) and the situation hasn't changed.
