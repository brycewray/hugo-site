---
title: "Using Dart Sass with Hugo: back to Node"
description: "The GitHub Actions approach falls short, at least with our chosen host, so the site is now using the Node Sass package."
author: Bryce Wray
date: 2022-05-24T15:23:00-05:00
#lastmod:
#draft: true
#initTextEditor: iA Writer
discussionId: "2022-05-using-dart-sass-hugo-back-to-node"
---

"The best-laid plans of mice and men," and all that.

I had high hopes for the [GitHub Actions method](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) I recently proposed for installing the [Embedded Dart Sass binary](https://github.com/sass/dart-sass-embedded) during the build process so [Hugo](https://gohugo.io) could access it. At first, it seemed to work like a charm on both the site's hosting vendors: [Cloudflare Pages](https://pages.cloudflare.com), the default; and [Vercel](https://vercel.com), the backup.

Unfortunately, only half of that continued to be true during the last week. Although Vercel's more mature build platform never flinched, I soon noticed that CFP suffered an error in nearly half of the attempts and had to have the job re-run (whereupon it would *always* build the second time).

The CFP error messages implied the problem was on Cloudflare's end, during the process when the built site is being sent out to the various nodes of the Cloudflare CDN, so I couldn't very well do anything about that.

I put up with it for a few days; but, today, I'd finally had enough. I reverted to not only the normal push-to-deploy method but also the Dart-Sass-with-Hugo-method about which I first [wrote](/posts/2022/03/using-dart-sass-hugo) in March, which was installing the [Node.js Sass package](https://github.com/sass/sass) and working with that.

Yep, back came the `node_modules`, but at least this involved only two outright Node dependencies (as long as I can avoid worrying about everything else that comes over with `npm init`): `sass` and the `rimraf` cross-platform tool I use to keep stuff clean.

It began as a noble cause, but ended up not being worth the aggravation of keeping it going. At least I learned a few new things in the process of trying it.

Just thought I'd let you folks know.
