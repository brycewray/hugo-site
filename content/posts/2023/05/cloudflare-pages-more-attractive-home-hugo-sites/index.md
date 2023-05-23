---
title: "Cloudflare Pages becomes a more attractive home for Hugo sites"
description: "Two newly revealed CFP capabilities, one current and one coming Real Soon Now, may combine to be a game-changer."
author: Bryce Wray
date: 2023-05-09T12:49:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

This site has lived on [Cloudflare Pages](https://pages.cloudflare.com) for most of the last two years. Typically, the developer experience (DX) on CFP has been great, regardless of the [static site generator](https://jamstack.org/generators) (SSG) on which I was building and maintaining the site at the time. And now, I've learned the CFP DX will soon get a lot better, especially for users of the [Hugo](https://gohugo.io) SSG.

<!--more-->

**Update, 2023-05-18**: If, prior to today, you'd already read my uncomplimentary assessment of CFP in "['Publish or perish' in 2023](/posts/2023/03/publish-or-perish-2023/)" and wondered how it can possibly square with what I said above, please be advised that I've now considerably revised that post due to what I explain herein.
{.box}

Last July, I closed a [totally unrelated post](/posts/2022/07/using-dart-sass-hugo-some-data-using-github-actions/) with something I'd read about the CFP platform:

> While I was finishing this post, I saw a [GitHub Discussions thread indicating that the Cloudflare Pages build image **may** get an update](https://github.com/cloudflare/pages-build-image/discussions/1). In the comments, I made a pitch for both a better version of Hugo --- the current CFP build image uses the [ancient *0.54.0*](https://github.com/gohugoio/hugo/releases/tag/v0.54.0), for God's sake --- **and** the option to specify Embedded Dart Sass through an environment variable, just as one now uses a `HUGO_VERSION` env var to pull a preferred, um, Hugo version *other than* 0.54.0. I'll keep you advised whether there's any progress on that front . . .

But months stretched by and the updated build didn't appear. Then, on November 27, CFP Product Manager [Nevika Shah](https://github.com/nevikashah) [explained](https://github.com/cloudflare/pages-build-image/discussions/1#discussioncomment-4248240) that priorities had changed, causing the CFP devs "to put [the build image project] down to bring [Pages Functions](https://developers.cloudflare.com/pages/platform/functions/) to [general availability]" *(link added)*. While she said the project would be resumed when possible, she could suggest no timing as to when that would happen.

So I was highly relieved a few days ago when, while checking on the [Cloudflare Developers Discord](https://discord.com/channels/595317990191398933/789155108529111069), I saw that the so-called "v2" build image project was not only very much alive again but also in a private beta test.

I requested, and received, access to that test, and the experience has allowed me to get excited about two CFP capabilities that will especially benefit Hugo users. Indeed, it turns out that even the *old* build image already supports one of those features. I'll explain them in reverse order --- first, the feature that the v2 build image will add, followed by the feature that exists on both v2 and the current image.

## Embedded Dart Sass via the UI

The [late-2020 release of Hugo 0.80](https://github.com/gohugoio/hugo/releases/tag/v0.80.0) added compatibility with [Dart Sass](https://sass-lang.com/dart-sass). This was important, because the [older Libsass version had been deprecated](https://sass-lang.com/blog/libsass-is-deprecated); but it soon also became a source of angst among Hugo users, because the prescribed way to use Hugo with Dart Sass --- requiring the installation of the [Embedded Dart Sass](https://github.com/sass/dart-sass-embedded) binary --- proved to be problematic.

The main difficulty was that using the binary with Hugo on a computer required that the SSG be able to detect the binary in the computer's system `PATH`. Although that certainly was possible on a local machine if one did some tinkering, making it happen on a site host's platform was a completely different matter. The [only truly reliable way to do so](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) was through use of CI/CD (a [GitHub Action](https://github.com/features/actions) or [GitLab CI/CD](https://docs.gitlab.com/ee/ci/)), which was more of a hassle than some Hugo users wanted to endure.

So, as I mentioned earlier: when I learned last summer about what ended up being the CFP v2 build image, I [requested](https://github.com/cloudflare/pages-build-image/discussions/1#discussioncomment-3080730) that the Embedded Dart Sass binary be part of that image, with the version specifiable through use of an environment variable. And it's my pleasure to tell you that v2 **will** provide that option, through an `EMBEDDED_DART_SASS_VERSION` env var. It works like a dream, just as does the Hugo/Embedded Dart Sass combo on one's local machine.

**Update, 2023-05-23**: I don't yet know how CFP will address the Sass project's [breaking change in how Embedded Dart Sass is packaged](https://sass-lang.com/blog/rfc-embedded-protocol-2).
{.box}

*"But there's more."*

## Deep-cloning of your repo

Hugo's [`.GitInfo` object](https://gohugo.io/variables/git/) enables you to [access and display Git revision information in your site](/posts/2022/06/get-good-git-info-hugo/), **but** all of that works properly online **only** if your site host, when accessing your Hugo project's repository, does a *deep* clone of the repo. Some hosts do, but the native CFP UI didn't make that possible --- or so I thought, until I participated in the v2 beta test.

While asking in the Discord about some other features, I explained this problem to two members of the Cloudflare team and added that it would surely be nice for Hugo users if there were a way to control the depth of CFP's repo-cloning process. A few minutes later, one of the Cloudflare guys said he thought it *was* possible, and suggested I try concatenating `git fetch --unshallow` onto a Hugo build command. Thus, for most Hugo sites, that would probably result in something like:

```bash
git fetch --unshallow && hugo --minify
```

And, as I told him a moment or two later:

> Holy bleep, it worked — awesome.

I knew that it had worked because my v2 test repo was a duplicate of this site's repo, so all I had to do was compare the two sites' `.GitInfo` results for identical pages.

He subsequently informed me it would work on the *current* build image, too, which I also confirmed by testing it on a different repo that was still using that image.

## Curing pain points

"So, what's the big deal?" you may ask.

Well, let me quote something else I said to the Cloudflare folks on the Discord after learning about these items:

> . . . this now will make CFP with v2 the **only** GUI-based deploy which can do both of the following for a Hugo user:
>
> (a.) Use Embedded Dart Sass.
>
> (b.) Use `.GitInfo` with deep cloning.
>
> . . . the lacks of which have been big pain points for Hugo users not willing to trouble with [CI/CD].
>
> Outstanding.

Those two features combine to constitute a **very** big deal for Hugo users who host on CFP.

While I could obtain no ETA for v2's release to general availability --- it's still in that private beta --- I was told GA will come "sooner than you think." Rest assured I will watch this situation very closely, and let you know when that release occurs.

**Update, 2023-05-17**: [Cloudflare announced](https://blog.cloudflare.com/moderizing-cloudflare-pages-builds-toolbox/) today that v2's beta test is now public.
{.box}
