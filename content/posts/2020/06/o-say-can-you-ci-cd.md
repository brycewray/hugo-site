---
title: "O say can you CI/CD?"
subtitle: "A way around the Netlify build limit"
description: "How you can stay within the free tier."
author: Bryce Wray
date: 2020-06-28T13:45:00-05:00
lastmod: 2020-09-05T12:45:00-05:00
discussionId: "2020-06-o-say-can-you-ci-cd"
featured_image: dominoes-4020617_4870x2672.jpg
featured_image_width: 4870
featured_image_height: 2672
featured_image_alt: "A row of dominoes with a hand about to tip them over"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/SparrowsHome-4168069/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4020617">SparrowsHome</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4020617">Pixabay</a></span>
---

Netlify's [free "Starter" site-hosting tier](https://www.netlify.com/pricing/) is an amazing way to have a personal or small-business website, especially one built by a [static site generator](https://staticgen.com) (SSG) like the [Eleventy](https://11ty.dev) SSG this site uses.

As long as your site's monthly in/out bandwidth stays under 100&nbsp;GB, Netlify gives you all these advantages even on the free tier:

- **Easy and quick deployment from your online repository**---You can connect your Netlify-based site to a repo on [Bitbucket](https://bitbucket.org), [GitHub](https://github.com), or [GitLab](https://gitlab.com); then, every time you push to its default branch, *bang*, Netlify auto-deploys. So, if you keep your site project synchronized among your devices ([as I do](/posts/2019/07/roger-copy)), you can easily make changes and push them from just about anywhere.
- **CDN-powered speed and efficiency**---Netlify puts your site's generated files on a [content delivery network](https://en.wikipedia.org/wiki/Content_delivery_network) (CDN) through its partnership with multiple CDN providers, mainly [Amazon CloudFront](https://aws.amazon.com/cloudfront/). This allows your visitors, wherever they are, to access your site much more quickly than if its content lived on just one location that could be halfway around the world from them. This is a huge benefit under any circumstances, but particularly if you use images. And, speaking of assets like images&nbsp;.&nbsp;.&nbsp;.
- **Post-processing of assets**---Check the right boxes in your site's deploy settings, and each deploy will include automatic processing of items like images, CSS files, and JavaScript files to make them smaller and, thus, further improve your site's performance.

Lots of goodies for free, right? You betcha. So what's the problem?

[Read on, MacDuff](https://leatassiewriter.com/2016/11/20/lead-on-macduff/).

## Houston, the limit has landed

On October 1, 2019, Netlify's free tier started having a monthly limit of 300 build minutes. While it was understandable that there would have to be a limit of this nature, and 300 minutes seemed a lot for many users of the free tier, some folks [didn't take it well](https://www.reddit.com/r/webdev/comments/dc7lx0/netlify_starts_charging_for_build_minutes/). It didn't help that Netlify announced this to free-tier customers via an email with the subject line, "Introducing the Builds Tab in the Netlify dashboard," which buried the lede---the new limit---several paragraphs down.

It's important to understand that a build isn't simply what *you* are uploading to the remote box. In order to make sure the build is "clean," so to speak, each build *reinstalls* everything you've got in your setup. For example, in this site's case, that means installing [Node.js](https://nodejs.org), Eleventy, and all the [npm](https://npmjs.com) plugins that my repo's `package.json` "knows" should be there. Again: that's on *every build*. Only *then* do your actual website files come into play.

In my own case, three factors gradually inflated my build times to the point that this limit became problematic for me. See if they apply, or might apply down the line, to your site.

### Image processing

For the sake of not only including responsive images but also giving different browsers more efficient formats, I incorporated better image processing.

You can do that through the right mix of plugins, but the quickest solution that would do everything I wanted---generating all the correct formats for different browsers, providing [LQIP](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders) placeholders, and processing the images for maximum delivery efficiency---was my own [sharp](https://github.com/lovell/sharp)-powered [`imgxfm.js` build-time script](/posts/2020/05/going-solo-eleventy/).

Image processing during each build takes precious seconds (in my site's case, quite a few of them) so, regardless of whether your image processing approach is plugins-only, bespoke-only, or a mixture of the two, this will ramp up your build times.

<div class="yellowBox"><p><strong>Note, 2020-08-30</strong>: I later solved <em>this</em> issue by <a href="/posts/2020/07/transformed">handing off image processing</a> to <a href="https://cloudinary.com" target="_blank" rel="noopener">Cloudinary</a>.</p></div>

### Webmentions

Some months ago, intrigued by the whole [IndieWeb](https://indieweb.org/) thing, I began dabbling in [webmentions](/posts/2020/04/webmentions-three-ssgs-1/); and I encourage you to consider doing the same with your own site. But, you ask, how would they increase the build times?

Well, they don't add more than a few milliseconds to *each* build, as they accumulate over time. The problem is that, since they get updated only when you *do* a build, they provide incentive to do *more* builds---notably in the immediate couple of days after a post, when you get the most online reaction and it translates to webmentions.[^ego] To my knowledge, there's no dynamic way to show updated webmentions on a truly static site. You *have* to build again, thus edging you closer to the build minutes cap.

[^ego]: Pardon my ego, folks, but I *like* to share with you when my work gets responses on social media.

In my case, I began setting the builds to occur every twenty-four hours, so the webmentions would be *reasonably* updated even when I wasn't actively working with the site. Given how long each of my builds had become by now, chiefly due to the image processing I mentioned before, that meant racking up somewhere between fifty and seventy-five minutes a month even if I didn't do anything more.

And, believe me, I was going to do *plenty* more, which leads us to the third&nbsp;factor&nbsp;.&nbsp;.&nbsp;.

### Site maintenance in general

Over and above writing posts and adding images, sometimes you just have to figure out stuff---HTML, CSS, and such---that's gone awry with your site, and *that* can require a lot of builds, some of them biggies when you're pushing a lot of changes that have to be processed on the fly.

For example: one Saturday last month, I had a particularly heavy session that racked up nearly a *half-hour* of build time---one-tenth of the monthly Netlify allowance---in that one day!

## How you can stay with Netlify

Therefore, the problem is clear: it's easy for an active site development process to get uncomfortably close to, or even exceed, Netlify's 300-minute monthly limit. So how can you **solve** the problem?

One obvious choice, albeit a drastic one, would be to leave Netlify for another SSG-oriented site host that has a more generous free tier.[^otherFish] But, after some time, research, testing, and tinkering, I learned there was an answer that would allow staying with Netlify: rather than changing the **hosting vendor**, change the **build process**.

[^otherFish]: Be aware that quite a few of those competitors come up short compared to Netlify on items *other than* the generosity of the free tier, despite the initial impressions their marketing efforts might give. I may write about that in the near future.

Keep in mind this central fact: Netlify's 300-minute monthly cap is for builds *on its infrastructure*. However, if you simply do the build *somewhere else* and then do only the *deploy* on Netlify's infrastructure, you use *zero* Netlify build minutes---after which the actual deployment not only isn't even counted as a build but also usually takes well under ten *seconds*.

Fortunately for us, a fellow named Marek Pukaj already led the way with his article, "[Build with GitHub Actions, host on Netlify](https://medium.com/@MarekPukaj/build-with-github-actions-host-on-netlify-ebf5fa505616)." As he explained:

> One possible solution *[to Netlify's 300-minute monthly build limit]* is to move the build process to GitHub Actions. &nbsp;.&nbsp;.&nbsp;. With GitHub Actions, you have **2,000 free build minutes per month**, which is nearly **7 times** more than with Netlify. *[Emphasis his.]*

(By the way: a **public** repo in GitHub allows for **unlimited** build minutes per month; the 2,000-per-month is for a **private** repo.) 

I had only vaguely heard of [GitHub Actions](https://github.com/features/actions/) but, the more I read about the subject in Mr. Pukaj's article and others I found, the more I liked the idea: you build on a platform with far more free build minutes, then send the result to Netlify for a quick deploy that uses not one second of *Netlify's* limit. This involves what's known as **CI/CD**, which stands for *[continuous integration/continuous delivery](https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html)*. While [the usual repository-to-Netlify pipeline also involves CI/CD](https://docs.netlify.com/site-deploys/create-deploys/#deploy-with-git), it's less involved than what Mr. Pukaj was explaining.

So what are GitHub Actions?

### GitHub Actions

[Introduced in 2018](https://github.blog/2018-10-17-action-demos/) and [enhanced with CI/CD capabilities in 2019](https://github.blog/2019-08-08-github-actions-now-supports-ci-cd/), GitHub Actions allow you to write simple (well, *relatively* simple) .YML files that, essentially, are scripts for operations to be performed on the GitHub platform.

To use this to deploy a Netlify site from a GitHub repo---and don't worry, GitHub haters, I have an alternative for you later on in this tome---you first have to get the necessary authorization and site ID variables, and then add them to your site's GitHub repo. To do so:

1. Open a new file in a text editor (preferably a secure one, like [Standard Notes](https://standardnotes.org)) so you'll be ready to store one of the variables.
2. Log into your Netlify account in your browser.
3. In the upper-right corner, click on your avatar (it might be just an initial in a circle) and select **User settings** from the dropdown menu.
4. In the left side of the resulting screen, click **Applications**.
5. Go to **Personal access tokens**.
6. Click **New access token**. Give it an identifying name for your benefit. If you wish, name it `NETLIFY_AUTH_TOKEN` (just to follow along in the sample GitHub Action I'll show you shortly).
7. Click **Generate token** to generate the authorization variable **BUT** ***DON'T*** **CLOSE THE GENERATED TOKEN BEFORE YOU PERFORM THE NEXT THREE STEPS!**
6. **Copy** the token and then **paste** it into that text file you opened in the first step. This is **critical** because you **won't** be able to access the token again. (You can create a **new** one, of course, but you can't edit or even view an **existing** personal access token after it's generated. That's for your own protection.)
7. Save the text file **but** keep it open for the time being.
8. **Now** you can click **Done** to save the newly created token.
7. Click the Netlify icon in the upper left to return to your main settings.
8. Click **Sites**.
9. Click the site you want to set up for deploy through GitHub Actions (you may have only one).
10. Click **Site settings**.
11. Under **Site information**, copy the value shown for **API ID** and paste it into the same text file, noting that it's your `NETLIFY_SITE_ID` value. (While you *can* see **this** one whenever you want, it's more convenient to do it this way since you'll be adding them to GitHub shortly.)
12. As before: save the text file, but keep it open for now.
13. If you don't use webmentions in your site, you now can log off from the Netlify account. (If you *do* use them, stay logged into the Netlify account for instructions coming further down.)
12. Log into your GitHub account (perhaps in a separate browser tab or window, if you do indeed use webmentions).
13. Access your site's repo.
14. Near the top of the screen, click **Settings** to access the repo's settings.
15. In the resulting **Settings** screen, click **Secrets**.
16. In the resulting **Secrets** screen, click **New secret**.
17. Name the secret `NETLIFY_AUTH_TOKEN` and, using the text editor file, copy/paste in the value from the `NETLIFY_AUTH_TOKEN` you generated earlier.
18. Click **Add secret**.
19. Once again, click **New secret**.
20. Name this secret `NETLIFY_SITE_ID` and copy/paste in the `NETLIFY_SITE_ID` value from the text editor file. (**You** can see this in your Netlify account, but GitHub Actions can't, which is why you have to "tell" GitHub what this is. In the more usual repo-to-deploy Netlify process, Netlify "tells" GitHub this during the build/deploy, but we're going to be doing something different.)
21. Click **Add secret**.
21. **Optional**: If you use webmentions, create another secret, `WEBMENTION_IO_TOKEN`, and paste in your webmention.io token (you can get that either by logging into [webmention.io](https://webmention.io) or using your Netlify account to copy the appropriate variable you've already stored there).
21. If you wish, you can now close the text editor **and** log out of your GitHub account (and, if appropriate, Netlify account).

Yes, I know: *whew*. But it's all necessary. Quoting Mr. Pukaj once more:

> As you can see[,] we don't expose our secret values directly to the workflow file. Instead, we use the GitHub *[built-in]* way of storing secrets that will be exposed only to selected actions.

&nbsp;.&nbsp;.&nbsp;. which brings us to our GitHub Action for the build/deploy operation.

Store the following---call it `netlify-deploy.yml`, if you wish---in a `/.github/workflows/` folder at the top level of your site repo. This file **does** allow for webmentions, but feel free to take out the relevant parts if you don't use webmentions.

```yaml
name: CI-Netlify

on:
  push:
    branches:
      - master
  schedule:
    - cron: '0 5 1/1 * *'

jobs:
  build:
    if: "!contains(github.event.head_commit.message, '[skip-ci]')"
    runs-on: ubuntu-latest

    steps:
      - name: Checkout branch
        uses: actions/checkout@v1

      - name: Retrieve npm cache (if any)
        uses: actions/cache@v1
        with:
          path: ~/.npm
          key: npm-packages

      - name: Use Node.js
        uses: actions/setup-node@v1
        with: 
          node-version: '12.x'

      - name: Install dependencies
        run: npm install

      - name: Build content
        run: npm run build
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          WEBMENTION_IO_TOKEN: ${{ secrets.WEBMENTION_IO_TOKEN }}

      - name: Deploy site
        uses: netlify/actions/cli@master
        env:
          CI: true
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          WEBMENTION_IO_TOKEN: ${{ secrets.WEBMENTION_IO_TOKEN }}
        with:
          netlify-config-path: "./netlify.toml"
          args: deploy --dir=_site --prod
          secrets: '["NETLIFY_AUTH_TOKEN", "NETLIFY_SITE_ID", "WEBMENTION_IO_TOKEN"]'
```

<div class="yellowBox"><p><strong>Note</strong> If you use this approach, you need to make sure you <strong>don&rsquo;t</strong> have your repo linked in Netlify for continuous deployment (in your site settings, that&rsquo;s <strong>Build &amp; deploy</strong> &gt; <strong>Continuous deployment</strong>). Otherwise, the auto-builds will continue and, thus, keep adding to your used minutes.</p></div>

Here's how it works.

- The `on` section tells it to run whenever one of two things happens:
	- The first is whenever a change is pushed to the default branch, currently `master`.[^masterName]
	- The second is when it's 5:00 AM [UTC](https://www.timeanddate.com/worldclock/timezone/utc)---which corresponds to late night in my time zone---and works because of GitHub Actions' support for [cron jobs](https://www.ostechnix.com/a-beginners-guide-to-cron-jobs/). This cron job generates that earlier-mentioned automatic daily build for the sake of updating webmentions.
- Then there's the `jobs` section. It gives these orders:
	- Use the latest version of [Ubuntu](https://ubuntu.com) that the remote server is willing to load.
	- "Checkout" that aforementioned default branch in Git.
	- See if there's any previously cached material and load it, if so.
	- Load Node JS v."12.x" (*i.e.*, the latest version of v.12).
	- Run `npm install` to load all the dependencies identified in `package.json`.
	- Build the site using those three "secrets" you already set up earlier: the Netlify authorization token, the Netlify site ID, and the webmentions.io token. Since we're still on the GitHub servers at this point, only the last one may be necessary; but this file includes them all, just to be safe.
	- Finally, deploy the now-built site to Netlify, using the configuration in the repo's `netlify.toml` file. This step uses those same "secrets" as the last step. The Netlify variables *are* required here, for sure, while now the webmentions.io token becomes the just-in-case addition.

[^masterName]: There's an [ongoing](https://tools.ietf.org/id/draft-knodel-terminology-00.html) [discussion](https://www.zdnet.com/article/github-to-replace-master-with-alternative-term-to-avoid-slavery-references/) in the dev community about whether repositories should use the `master` name for their default branches. My understanding is that the major repo hosts are adjusting their policies accordingly, so I'll update this article if and when changes warrant.

As a result: with this GitHub Action now handling builds on the GitHub setup, the deploy on Netlify typically takes no more than *ten seconds*, quite often more in the range of *two to five* seconds---and, once again, it counts as *zero* seconds against that 300-minute monthly build cap.

Finally: you may wonder, hey, what if the Netlify folks learn you're doing this? Won't they object? The simple answer is: Absolutely not! You're *helping* them! You're *saving* their setup valuable time, processing wear and tear, and bandwidth for *paying* customers' use. 

### GitLab CI/CD

I told you GitHub haters I'd have an alternative, so here it is. Fact is, GitLab was doing CI/CD years before GitHub Actions existed, so there's a GitLab way to do this, too.

Compared to GitHub's free-tier build limits (unlimited monthly minutes for a public repo and 2,000 monthly minutes for a private repo, as noted earlier), GitLab provides 2,000 "pipeline" minutes per month, but [this drops to 400 minutes a month as of October&nbsp;1, 2020](https://about.gitlab.com/releases/2020/09/01/ci-minutes-update-free-users/), making it not much more helpful than the Netlify 300-minute monthly limit. Still, I'll include the instructions for using GitLab CI/CD if you want to go that route. After all, 100 extra minutes likely is more than enough for you.

Your `.gitlab-ci.yml` file should be in the top level of your repo:

```yaml
stages:
  - deploy

image: node:latest

variables:
  WEBMENTION_IO_TOKEN: $WEBMENTION_IO_TOKEN
  
deploySite:
  stage: deploy
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
    # To use the above, you should turn off the auto-deploy
    # GitHub-to-Netlify setup --- thus shutting off the 
    # Netlify-side builds, thus not using your monthly build 
    # minutes quota.
    - if: '$CI_PIPELINE_SOURCE == "schedule"'
  environment:
    name: production
    url: https://brycewray.com
    # Obviously, use **your** URL! :-)
  script:
    - "rm -rf _site"
    - npm install
    - npm i -g netlify-cli
    - npm run build
    - netlify deploy --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --prod
```

That does everything the GitHub Action mentioned above will do, except that it does it on GitLab's servers rather than GitHub's. (As I note above, you should replace *my* `url` with yours!)

Of course, just as with the "Secrets" in GitHub, you'll have to enter the necessary environment variables in GitLab. The procedure starts in your GitLab repo at **Settings** > **CI/CD** > **Variables**. At least you **can** view and edit these again later, but it's probably still a good idea to keep them in a secure text file just for safety's sake.

There's no cron job set up here, as in the GitHub Actions file; that's because, in GitLab, you set up a cron job in your repo: **CI/CD** > **Schedules**. Note that it's **not** in **Settings** > **CI/CD**---which is different, for reasons that escape me.

### Bitbucket?

Perhaps you prefer Bitbucket over either GitHub or GitLab, and are wondering where all this "fun" is for you, too. Well, yes, there's a Bitbucket CI/CD setup, [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines). However, Bitbucket's limit for free users is normally even more austere than Netlify's: *fifty* build minutes per month, as shown in this [pricing page](https://bitbucket.org/product/pricing).

Still&nbsp;.&nbsp;.&nbsp;. if you want me to provide similar information for Bitbucket, too, let me know via [Twitter](https://twitter.com/BryceWrayTX) and I'll either update this post or write a follow-up. I am nothing if not accommodating to you, my few-but-beloved readers.

## Letting freedom ring

So, to you brave souls who got all the way through this, here's the bottom&nbsp;line&nbsp;.&nbsp;.&nbsp;.

If you're using Netlify's free tier and want to stay with it, but are chafing under that 300-minute monthly build limit, follow my advice and you'll chafe no more. I can speak from experience, thanks to the aforementioned "time, research, testing, and tinkering." 

There is something very precious about the right to express one's self on the web, just as in any other forum. Perhaps this long, nerdy post will help you continue to do so as often as you want, and however you want.

As the 2020 version of my country's Independence Day observance nears, I say: here's to freedom.