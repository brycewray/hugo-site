---
title: "Direct deployments: quicker is slicker"
description: "Providers’ free tiers are limited, so why not rely on the computing power you already own?"
author: Bryce Wray
date: 2023-10-15T14:14:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---



There are clear advantages in using a provider's free tier to deploy one's static website, but there also are some potential disadvantages. The main one is that, for totally understandable reasons, the virtual "runner" within such a free tier often involves relatively anemic computing power, so new site builds can take considerably longer than one's patience might allow.

In fact, for the typical owner of a static website, the computer environment in which he/she locally maintains the site probably is considerably beefier than that of the virtual "runner" employed by the provider's free tier. It's like being transported someplace in a wobbly wheelbarrow *vs.* driving to the same place in your own souped-up sports car.

So why not just use the sports car?

Well, fortunately, you probably can, because most [Jamstack-savvy hosts](/posts/2023/03/publish-or-perish-2023/) have CLI tools which let you deploy your content *directly*.

<!--more-->

For example, here's how I deployed this post from Hugo directly to Cloudflare Pages via Cloudflare's [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) tool:

1. I ran `npm run build` to build the site to a `public` folder in the site project. (If you're not using any `package.json`, you perhaps could do this with just `hugo`. The point is, just run whatever builds your site to the appropriate deployment folder.)
2. I then ran `wrangler pages deploy public`.[^nonNPM]

[^nonNPM]: **Update, 2023-11-22**: The [documentation](https://developers.cloudflare.com/pages/platform/direct-upload/) for this method tells you to install wrangler as an npm package; among other things, this keeps wrangler from asking you for a project name every time you deploy, as it saves such information in a file within `node_modules`. However, if you prefer to have an npm-free, `node_modules`-free Hugo project, you can invoke wrangler through the `npx` CLI command and simply indicate your project name with the [`--project-name` option](https://developers.cloudflare.com/workers/wrangler/commands/#deploy-1). For example, if your Cloudflare Pages project is called "my-hugo-proj," you'd use:\
`npx wrangler pages deploy public --project-name="my-hugo-proj"`

(In fact, I did it even more simply, using a shell script that combined the two commands.)

This is much faster than the usual way, because:

- It eliminates the need for the provider to clone your site's entire online repo before even doing a build.
- It builds `public` using the full power and speed of your computer, rather than relying on the more limited capabilities of the provider's "runner."

CFP isn't the only host that [makes this available](https://developers.cloudflare.com/pages/platform/direct-upload/); there are similarly CLI-based workflows available for [Netlify](https://docs.netlify.com/cli/get-started/#manual-deploys) and [Vercel](https://vercel.com/docs/cli/deploy). (As of this writing, this capability apparently doesn't exist for DigitalOcean App Platform or Render.)

Three additional notes . . .

- If your site already exists as a project on ~~one of these hosts~~ Cloudflare Pages, you can't simply update that project to use this method rather than its slower counterpart. Instead, you'll have to deploy to a new project and then change your site's DNS settings to point to that project rather than your current one.[^updateProj]
- Another situation where this direct-deploy approach excels is if you've been deploying by using CI/CD from either GitHub or GitLab, since their free tiers are similarly limited (and for similar reasons).
- Beyond the speed gains, this also lets you push a commit to your site's online repository without causing an online site build.[^skip]

[^updateProj]: I struck through my original text here because I found you *could* make such changes in existing projects on both Netlify and Vercel. The documentation for each says so, and I personally proved it with Vercel.

[^skip]: To be fair, you usually also can have this convenience with a *normal* (non-direct) deploy by just adding something like `[skip ci]` to the associated commit message.

Perhaps your response to this is something along the lines of "Jeez, man, is all this worth it just to save a minute or two every time you change your site somehow?" I guess that depends on two things: how powerful your computer is and how much patience you have. If you have a high-performance computer but not always so much patience (sometimes you want something on your site **now**), you'll likely find some delight, or at least relief, by using the direct-deploy method I've mentioned here.
