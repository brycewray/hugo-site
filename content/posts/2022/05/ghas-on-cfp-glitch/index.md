---
title: "GHAs on CFP glitch"
description: "What I found out about my deploy-to-site GitHub Action and Cloudflare Pages."
author: Bryce Wray
date: 2022-05-26T05:24:00-05:00
#lastmod: 2022-05-26T09:11:00-05:00
#initTextEditor: iA Writer
discussionId: "2022-05-ghas-on-cfp-glitch"
---

Quickie update for you . . .

Remember that recent [post](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) about using GitHub Actions to deploy my site? And remember how I [briefly quit doing that](/posts/2022/05/using-dart-sass-hugo-back-to-node/) because I was encountering an annoying level of failures using this approach with [Cloudflare Pages](https://pages.cloudflare.com)?

Well, it turns out there are some [known](https://github.com/cloudflare/pages-action/issues/8) [issues](https://github.com/cloudflare/wrangler2/issues/960) with Cloudflare's [recently announced "direct-uploads" plumbing](https://blog.cloudflare.com/cloudflare-pages-direct-uploads/) that makes GHA-to-CFP deployment possible in the first place. [I learned today on the Cloudflare Developers Discord](https://discord.com/channels/595317990191398933/973531909340692541/979293762654183445) that there's a [pull request](https://github.com/cloudflare/wrangler2/pull/1028) in place to fix this problem and others, and I'll hope it gets merged into the main product soon. While waiting for that resolution, I've pointed the site to the backup host, [Vercel](https://vercel.com), where I've had no problems with GHA-based deployment.

**Update, a few hours later**: That PR got merged, the CFP API is working normally again, and we're back on CFP. (Whew.)
{.yellowBox}
