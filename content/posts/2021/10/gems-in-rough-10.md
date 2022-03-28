---
layout: singlepost
title: "Gems in the rough #10"
description: "A (perhaps) surprising requirement for native lazy-loading, the Slinkity project, problems with Cloudflare Pages."
author: Bryce Wray
date: 2021-10-01T09:23:00-05:00
lastmod: 2021-10-03T17:20:00-05:00
discussionId: "2021-10-gems-in-rough-10"
featured_image: "gemstones-sung-jin-cho-0d3qxUozE-0-unsplash_7315x4881.jpg"
featured_image_width: 7315
featured_image_height: 4881
featured_image_alt: "Colorful gemstones"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@mbuff?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sung Jin Cho</a>; <a href="https://unsplash.com/s/photos/gemstones?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

Each entry in the "Gems in the rough" series is a collection of tips, explanations, and/or idle observations which I hope will be at least somewhat useful to those of you with websites built by [static site generators (SSGs)](https://jamstack.org/generators).
{.blueBox}

## Native lazy-loading: a surprise

A few days ago, I played around with my image-handling [shortcode](https://11ty.dev/docs/shortcodes) in an attempt to make it **not** require JavaScript on the client side. What I'd intended was to substitute the [native lazy-loading in modern browsers](https://web.dev/browser-level-image-lazy-loading/) for what I'd been doing with [Andrea Verlicchi](https://www.andreaverlicchi.eu/)'s superb [vanilla-lazyload](https://github.com/verlok/vanilla-lazyload) script. However, I learned to my great surprise that [even native lazy-loading still requires JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)! (H/t to [this comment in response to a dev.to article](https://dev.to/madsstoumann/comment/1b9ma).) As a result, I decided to let things be, continuing with vanilla-lazyload for JavaScript-enabled browsers and a `noscript`-prescribed normal loading process for the remaining tiny percentage of JavaScript resisters[^corpNoJS] out there in WebLand.

[^corpNoJS]: To be fair, I'll note that there are some corporate users who would gladly use JavaScript in their browsers if only their IT departments didn't lock them down to such a preposterous extent.

## The Slinkity project

The [Eleventy](https://11ty.dev) SSG is [nearing the release of version 1.0.x](https://github.com/11ty/eleventy/milestone/32), and with that release will come full support for the intriguing [Slinkity](https://slinkity.dev) plugin. Slinkity, the brainchild of [Ben Holmes](https://bholmes.dev/), is still in early development but its promise is enormous. The part of it I find most compelling is that it will allow the addition of components from the [React](https://reactjs.org), [Vue](https://vuejs.org), and [Svelte](https://svelte.dev) frameworks, which is likely to make the already formidable Eleventy an even better match for many projects where it might otherwise have been found wanting. Keep an eye on Slinkity. It could be a game-changer.

## Cloudflare Pages: the glitches continue

**Update, 2021-10-03**: I learned today that the problem I note below was due to an [incompatibility between the recently released version 9.x of the `postcss-cli` package and any Node.js version prior to 12.20](https://github.com/postcss/postcss-cli/issues/404). The usual way you get around that when building to your hosting vendor of choice, assuming it's using a Node.js version that fits this qualification, is to add a `NODE_VERSION` environment variable set to at least `12.20.0`. (Consult your respective vendor's documentation for details.)  In my site's case, I am currently spec’g `14.16.0` since that conforms to the Node version I run locally. Finally: despite my having learned this, I'll leave the remainder of this part of the article as it was for the sake of [transparency](/posts/2019/10/otoh/).
{.yellowBox}

Until yesterday, I had used [Cloudflare Pages](https://pages.cloudflare.com) (and, with it, the Cloudflare CDN) to host this site, off-and-on, for a while. I've written in the past about the technical challenges of this still-new platform, particularly where build times are concerned; but, yesterday, the problems reached a new, show-stopping level.

I have multiple Eleventy repositories (including this one), with differing build scripts, which CFP **had** handled just fine before yesterday morning but which, starting then, errored out on each CFP build attempt with cryptic messages regarding an [ES modules (ESM)](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) loader:

```text
12:24:22.053    (node:1650) ExperimentalWarning: The ESM module loader is experimental.
12:24:22.086    internal/modules/run_main.js:54
12:24:22.086        internalBinding('errors').triggerUncaughtException(
12:24:22.086                                  ^
12:24:22.086
12:24:22.086    Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only file and data URLs are supported by the default ESM loader
12:24:22.086        at Loader.defaultResolve [as _resolve] (internal/modules/esm/resolve.js:720:11)
12:24:22.086        at Loader.resolve (internal/modules/esm/loader.js:97:40)
12:24:22.086        at Loader.getModuleJob (internal/modules/esm/loader.js:243:28)
12:24:22.086        at ModuleWrap.<anonymous> (internal/modules/esm/module_job.js:42:40)
12:24:22.086        at link (internal/modules/esm/module_job.js:41:36) {
12:24:22.086      code: 'ERR_UNSUPPORTED_ESM_URL_SCHEME'
12:24:22.086    }
12:24:22.104    npm ERR! code ELIFECYCLE
12:24:22.104    npm ERR! errno 1
12:24:22.106    npm ERR! eleventy_site@ prodpostcss: `postcss _site/css/$(cat csshash) -o _site/css/$(cat csshash)`
12:24:22.106    npm ERR! Exit status 1
12:24:22.106    npm ERR!
12:24:22.106    npm ERR! Failed at the eleventy_site@ prodpostcss script.
12:24:22.106    npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```

This behavior began after [yesterday's worldwide incident with Let's Encrypt SSL certificates](https://www.theregister.com/2021/09/30/lets_encrypt_xero_slack_outages/). Since that was Let's Encrypt's problem, not Cloudflare's, it may have been totally coincidental that my post-cert-glitch build attempts failed. All I know is that, once the problem started, repos which still build just fine on [Netlify](https://netlify.com), [Vercel](https://vercel.com), [Render](https://render.com), and [Digital Ocean App Platform](https://www.digitalocean.com/products/app-platform/) would no longer build on CFP. Cloudflare personnel to whom I conveyed word of this via Discord said the fault must lie in my `package.json` scripting, rather than their platform, but those other vendors’ successful builds (about which I've notified a Cloudflare employee) would seem to suggest otherwise.

Whether any of this is applicable to you, I have no idea; I'm just tossing it out there for your consideration before you rely on CFP, a platform which remains both highly interesting and aggravatingly glitchy.

**Note**: Ironically enough, when I first tried to issue **this** post, Vercel (to which I'd reverted yesterday after the aforementioned CFP issues) was having a system-wide outage of its API and dashboard which, you guessed it, prevented the site build. Ya can't win.
{.yellowBox}

**Update, 2021-10-02**: Today I tested Cloudflare Pages again and found that, by **deleting** my previous setups there and **restoring** them, the errors stopped. I have no idea what happened, but scripts that failed as noted above are now working fine. Weird. Anyway, I moved the site back to Cloudflare to take advantage once again of this vendor's superior CDN.
{.yellowBox}
