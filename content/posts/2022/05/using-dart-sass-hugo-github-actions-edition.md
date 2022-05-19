---
layout: singlepost
title: "Using Dart Sass with Hugo: the GitHub Actions edition"
description: "Still more ways to make Hugo and Embedded Dart Sass work together."
author: Bryce Wray
date: 2022-05-17T14:49:00-05:00
lastmod: 2022-05-19T11:29:00-05:00
#draft: true
discussionId: "2022-05-using-dart-sass-hugo-github-actions-edition.md"
featured_image: "sass-and-glasses_3200x1800.png"
featured_image_width: 3200
featured_image_height: 1800
featured_image_alt: "Sass logo and Sass glasses icon on gradient background"
featured_image_caption: |
  <span class="caption">Image: Sass logo and Sass glasses icon, sourced from <a href="https://sass-lang.com" target="_blank" rel="noopener">Sass website</a>; adapted in <a href="https://affinity.serif.com/en-us/designer/" target="_blank" rel="noopener">Affinity&nbsp;Designer</a></span>
---

**Note**: For a much more thorough discussion of recent [Sass](https://sass-lang.com)-on-[Hugo](https://gohugo.io) issues, please see my two [previous](/posts/2022/03/using-dart-sass-hugo/) [posts](/posts/2022/03/using-dart-sass-hugo-sequel/) on this subject. This follow-up assumes you've already read them.
{.yellowBox}

Thought we were done with workarounds to make the Hugo [static site generator](https://jamstack.org/generators) (SSG) and [Dart Sass](https://sass-lang.com/dart-sass) play nicely together, did you? Ah, well, so did I. But, as I reconsidered the two end runs about which I wrote previously, I had concerns.

Regarding the [first approach](/posts/2022/03/using-dart-sass-hugo/): some people simply don't want to use [Sass's Node.js package](https://github.com/sass/sass), or any **other** Node.js package. In a similar vein, some purists might reject such a way of incorporating Sass because they think it doesn't make properly efficient use of the [Hugo Pipes](https://gohugo.io/hugo-pipes/) asset pipeline. While I don't share such attitudes, I respect that they exist in the Hugo community and may be more prevalent than I'd previously considered.

But that one didn't trouble me a whole lot.

It was a different story when I kept mulling over the [second, somewhat trickier approach](/posts/2022/03/using-dart-sass-hugo-sequel/). It enables Hugo to use the [Embedded Dart Sass binary](https://github.com/sass/dart-sass-embedded/), through shell scripting that tells one of three hosting vendors---[Netlify](https://netlify.com), [Vercel](https://vercel.com), or [Cloudflare Pages](https://pages.cloudflare.com)---to install the binary within the proper build-image `$PATH`. As a result, the binary is "visible" to Hugo during the build, and all goes on smoothly from there.

This had been working fine for me ever since Hugo's Bjørn Erik Pedersen [first proposed the idea](https://discourse.gohugo.io/t/using-dart-sass-hugo-and-netlify/37099/7), so what was my more recent problem with it? Just this: whether it can **keep** working depends upon those three hosting vendors' **not** shutting down that particular workaround, perhaps for understandably security-related reasons, by simply (further) limiting one's ability to adjust the respective build environment.

In the end, I figured, assuming they'd continue to let that slip by was too big a gamble; so I started trying to think of something with a better chance of surviving until there's a more permanent solution.[^permanent]

[^permanent]: To be precise, that permanent solution would be for each vendor to allow adding the Embedded Dart Sass binary to the build image (perhaps via an environment variable), much as you now can specify the desired version of Hugo. There have been occasional rumblings that one or more of the vendors might do this, but at this writing ETA = TBD in each case. I doubt it's high on their collective radar.

One morning this week, I awoke from an impromptu nap[^defense] and came up with the answer I'm going to describe below: a [**GitHub Action**](https://github.com/features/actions) (GHA). It wouldn't be new ground, since I've written before about using GHAs to deploy static websites:

[^defense]: In my defense, it was after having had roughly three hours of sleep the night before. I tend not to take naps, period, much less unplanned ones---contrary to what you young ’uns imagine about [old, retired coots such as I](/posts/2021/09/transition/).

- "[O say can you CI/CD?](/posts/2020/06/o-say-can-you-ci-cd/)" (June, 2020)---Deploying to Netlify. This GHA served as a workaround for the 300-minutes-a-month build limit on Netlify's free tier.
- "[Ignition sequence start](/posts/2020/09/ignition-sequence-start/)" (September, 2020)---Deploying to [Firebase](https://firebase.google.com).
- "[Forward PaaS](/posts/2020/10/forward-paas/)" (October, 2020)---Deploying to a [Cloudflare Workers](https://workers.cloudflare.com) site, the precursor to Cloudflare Pages.

However, this GHA wouldn't be quite as straightforward as the ones in those posts. It would have to install not only the SSG (the Hugo binary, in this case) but also the Embedded Dart Sass binary. Furthermore, it would have to make sure the latter binary was in the build process's `$PATH`.

You may be wondering why this would be any better than the shell-scripting approach. I had to convince myself, too; but I came up with two advantages, one major and the other a nice-to-have:

- The primary gain was that **the build process would happen entirely on GitHub**. This would allow using GitHub-approved code and variables to identify and adjust the build `$PATH` *on GitHub*. With the shell-scripting method, we were adjusting the `$PATH` *on the vendor's platform* in ways that, reiterating my earlier comments, *might* be okay a week from now but, then again, might *not*. It's kinda like the difference between (A.) getting into a ballpark by buying a ticket and (B.) getting in by sneaking past an overly busy, preoccupied ticket-seller. Either way, you're inside; but Option A is *always* suitable, while Option B works only until you get caught. (Okay, maybe that analogy is pushing it somewhat, but you understand what I'm saying.)
- The minor happy point, at least for me, was that this would eliminate having to go into each vendor's GUI and change the `HUGO_VERSION` environment variable every time there's a new Hugo release.[^multiVendor] This way, I'd be providing that specification, as well as the `EMBEDDED_DART_SASS_VERSION` spec, with a file that I can easily and conveniently update within my local project.[^VercelJSON]

[^multiVendor]: I push the site to multiple vendors for a variety of reasons (*e.g.*, safety in case one vendor and/or its content delivery network happens to have an outage); but, even if you stick with only one vendor, changing environment variable(s) in the GUI-only method can be a nuisance. Besides, this site has a **lot** of environment variables, so multiply that nuisance by about 8x per vendor and you'll see my point, here.

[^VercelJSON]: For Vercel, you used to be able to do this sort of thing more simply---at least where `HUGO_VERSION` was concerned---via the `vercel.json` file. However, now, [Vercel documentation calls it a "legacy method"](https://vercel.com/support/articles/how-do-i-migrate-away-from-vercel-json-env-and-build-env) and counsels setting environment variables in the GUI, instead. I will give Vercel this much, though: at least its GUI lets you set each environment variable only once for both production and "preview" environments. By comparison, the Cloudflare Pages GUI makes you set each environment variable **twice** (once for each environment). When you have to add and/or edit a **lot** of environment variables in a hurry, the CFP approach is a major pain in the wazoo.

Suitably inspired, I got to work. After a few hours of research, experimentation, and occasional gnashing of teeth, I had a working GHA for each of the three hosting vendors in question.[^others]

[^others]: I looked for a way to do this with [Render](https://render.com), too, but it appears the GHA ecosphere hasn't yet come up with a suitable Action. As for other static hosting vendors, each wasn't worth the trouble---yours or mine---for reasons into which I won't delve here (but have mentioned in previous posts). If you want specifics, [let me know](/contact/).

Anyway, that's more than enough preface. Now, let's move on to the good stuff.

## What's ahead

Before I get to the vendor-specific instructions and GHAs, here are some general notes:

- Every GHA exists as a YAML file which must live in a `.github/workflows/` folder at your project's top level. And, of course, that folder and its content must be committed in Git so GitHub will see them!
- Since this will bypass most of the usual deployment pipeline for each hosting vendor, you'll have to supply *within the GHA* all the environment variables that you'd normally provide via the vendor's GUI.\
\
**Because of that . . .**
- You'll need to add each such environment variable to the GitHub repo's GHA-accessible **secrets**. You'll **also** have to add vendor-specific **credentials** to these secrets. The instructions for each vendor will tell you how.
- You'll notice, in each GHA below, that we're referring to something called `secrets.GITHUB_TOKEN`. That secret already exists within the repo, and the GHA will automatically access it; it's not something you have to create or store.
- We'll also refer to your local Hugo project's **`.env` file**, a plain-text file where you'll be storing the aforementioned environment variables for your own future reference (including *during* this process, as you'll see). If your project doesn't already have an `.env` file, create it now at the project's top level---and **be sure** it's an entry in your project's `.gitignore` file, because this will contain sensitive information you **never** want to commit in Git even locally, much less allow it to appear on GitHub. And please don't presume just making the GitHub repo private is sufficient protection for an inadvertently committed `.env` file, because it's definitely not.
- The versions shown for Hugo and Embedded Dart Sass in each GHA are the current ones (0.99.0 and 1.51.0, respectively) as of the initial publication of this post. You can always see which releases are up-to-date by checking the release pages for [Hugo](https://github.com/gohugoio/hugo/releases) and [Embedded Dart Sass](https://github.com/sass/dart-sass-embedded/releases).

Finally, because you don't want to have to scroll-scroll-scroll through instructions for vendors you don't even use, I'm using the [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) and [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) HTML elements to keep things nice and compact. Just click/tap on a section to toggle it as either open or closed.

---

## Netlify
<details><summary>Click/tap here to toggle open/close.</summary>

**Note**: You can [set certain parameters with a `netlify.toml` file](https://docs.netlify.com/configure-builds/file-based-configuration/), but herein we'll be making all Netlify changes through its GUI.
{.yellowBox}

### Disabling automatic builds on Netlify

Make sure you have disabled automatic builds from the GitHub repository. To do this:

1. Log into Netlify.
2. Click **Sites**.
3. Click the site you wish to modify.
4. Click **Deploys**.
5. Click **Deploy settings**.
6. Under **Build setting**, click **Edit settings**.
7. In the **Builds** setting, select **Stop builds**, then click **Save** at the bottom of the **Build settings** section.
8. While still on the **Deploy settings** page, scroll down to the **Post processing** section.
9. Under **Asset optimization**, click **Edit settings**.
10. Select **Disable asset optimization** (if it's not already selected) and, if this is a change from the current setting, click **Save** within the **Asset optimization** block.

**Note**: While steps 8--10 aren't utterly necessary, I recommend them to avoid any potential glitches in the process.
{.yellowBox}

### Credentials for Netlify

For Netlify, you must supply:

- An **authorization token**.
- The **site ID**.

**To get these credentials**:

1. In your code editor, open your site's `.env` file so you'll be ready to store the appropriate variables for later referral.
2. Log into Netlify.
3. In the upper-right corner, click your avatar (it might be just an initial in a circle) and select **User settings** from the dropdown menu.
4. In the left side of the resulting screen, click **Applications**.
5. Go down to **Personal access tokens**.
6. Click **New access token**. Give it an identifying name for your benefit. If you wish, name it `NETLIFY_AUTH_TOKEN` (just to follow along in the GHA below).
7. Click **Generate token** to generate the authorization variable **BUT *DON'T* CLOSE THE GENERATED TOKEN BEFORE YOU PERFORM THE NEXT THREE STEPS**!
8. **Copy** the token and then **paste** it (as `NETLIFY_AUTH_TOKEN=` followed by the token value) into that `.env` file you opened in the first step. This is **critical** because you **won't** be able to access the token again. (You can create a **new** one, of course, but you can't edit or even view an **existing** personal access token after it's generated. That's for your own protection.)
9. Save the `.env` file **but** keep it open for the time being.
10. **Now** you can click **Done** to save the newly created token.
11. Click the Netlify icon in the upper left to return to your main settings.
12. Click **Sites**.
13. Click the site you want to deploy through the GHA.
14. Click **Site settings**.
15. Under **Site information**, copy the value shown for **Site ID** and paste it into the same `.env` file, noting that it's your `NETLIFY_SITE_ID` value. (While you *can* see **this** one whenever you want, it's more convenient to do it this way since you'll be adding this to GitHub shortly.)
16. As before, save the `.env` file **but** keep it open for now.\
If you wish, you now can log off from Netlify.
17. Log into your GitHub account.
18. Access your site's repo.
19. Near the top of the screen, click **Settings**.
20. In the resulting **Settings** screen, click **Secrets**, then **Actions**.
21. In the resulting **Actions secrets** screen, click **New repository secret**.
22. Name this secret `NETLIFY_AUTH_TOKEN` and, using the `.env` file, copy/paste in the value from the `NETLIFY_AUTH_TOKEN` you generated earlier.
23. Click **Add secret**. This will save the new secret and return you to the **Actions secrets** screen.
24. Once again, click **New repository secret**.
25. Name this secret `NETLIFY_SITE_ID` and copy/paste in the `NETLIFY_SITE_ID` value from the `.env` file.
26. Click **Add secret**.\
If you wish, you now can close the `.env` file **and** log out of your GitHub account.

### The GitHub Action for Netlify

```yaml
# .github/workflows/netlify-deploy.yaml

name: Deploy to Netlify

on:
  push:
    branches:
      - main # or whatever you call your production branch

env:
  HUGO_VERSION: 0.99.0 # will get Extended Version below
  DART_SASS_VERSION: 1.51.0
  # if you have other environment variables,
  # enter them here in similar fashion

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - name: Checkout default branch
        uses: actions/checkout@v3
      - name: Download Hugo v${{ env.HUGO_VERSION }}
        run: wget https://github.com/gohugoio/hugo/releases/download/v${{ env.HUGO_VERSION }}/hugo_extended_${{ env.HUGO_VERSION }}_Linux-64bit.deb -O hugo_extended_${{ env.HUGO_VERSION }}_Linux-64bit.deb
      - name: Install Hugo v${{ env.HUGO_VERSION }}
        run: sudo dpkg -i hugo*.deb
      - name: Download Embedded Dart Sass v${{ env.DART_SASS_VERSION }}
        run: curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${{ env.DART_SASS_VERSION }}/sass_embedded-${{ env.DART_SASS_VERSION }}-linux-x64.tar.gz
      - name: Unpack Embedded Dart Sass v${{ env.DART_SASS_VERSION }}
        run: |
          tar -xvf sass_embedded-${{ env.DART_SASS_VERSION }}-linux-x64.tar.gz
          sass_embedded/dart-sass-embedded --version
      - name: Add to the PATH
        run: echo "$GITHUB_WORKSPACE/sass_embedded" >> $GITHUB_PATH
      - name: Build site with Hugo
        run: hugo --gc --minify
      - name: Publish to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './public'
          production-branch: 'main'
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID}}
```

</details>

## Vercel

<details><summary>Click/tap here to toggle open/close.</summary>

### Disabling automatic builds on Vercel

Make sure you have disabled automatic builds from the GitHub repository. To do this:

1. Log into Vercel.
2. Click the project you wish to modify.
3. Click **Settings**.
4. Under **Build &amp; Development Settings**:
	- Set **FRAMEWORK PRESET** to **Other**.
	- Set **BUILD COMMAND** to **OVERRIDE** and then leave the field blank.
	- For each of the following, leave the field blank and make sure the item is **not** set to **OVERRIDE**:
		- **OUTPUT DIRECTORY**.
		- **INSTALL COMMAND**.
		- **DEVELOPMENT COMMAND**.

### Credentials for Vercel

For Vercel, you must supply:

- An **authorization token**.
- Your **organization ID**.
- The **project ID**.

**To get these credentials**:

1. In your code editor, open your site's `.env` file so you'll be ready to store the appropriate variables for later referral.
2. Log into Vercel.
3. In the upper-right corner, click your avatar (it might be just an initial in a circle) and select **Settings** from the dropdown menu.
4. In the left side of the resulting screen, click **Tokens**.
5. Click **Create**.
6. In the resulting pop-up window:
	- Under **TOKEN NAME**, enter `VERCEL_TOKEN_HUGO_SITE`.
	- Under **SCOPE**, select **Full Account**.
	- Click **CREATE TOKEN**.
	- Copy the value from the resulting **Token Created** pop-up and **immediately** paste it into the `.env` file (which you should save immediately thereafter) as `VERCEL_TOKEN_HUGO_SITE=` followed by the value. As the pop-up notes, Vercel **won't** show you this value again.
	- Click **DONE** to close the **Token Created** pop-up.
7. Keep the `.env` file open for the time being.
8. In the left-side menu, click **General**.
9. Scroll down to **Your ID**.
10. Copy/paste this value into the `.env` file and name it `VERCEL_ORG_ID`; save the `.env` file but keep it open.
11. Back in the Vercel window, at the top of the page, click **Overview**.
12. Click the site you want to set up for deploy through the GHA.
13. Click **Settings**. You'll then be in the **Project Settings** screen.
14. Scroll down to **Project ID**.
15. Copy/paste this value into the `.env` file and name it `VERCEL_PROJECT_ID`; save the `.env` file but keep it open.\
If you wish, you now can log off from Vercel.
16. Log into your GitHub account.
17. Access your site's repo.
18. Near the top of the screen, click **Settings**.
19. In the resulting **Settings** screen, click **Secrets**, then **Actions**.
20. In the resulting **Actions secrets** screen, click **New repository secret**.
21. Name this secret `VERCEL_TOKEN_HUGO_SITE` and, using the `.env` file, copy/paste in the value from the `VERCEL_TOKEN_HUGO_SITE` you generated earlier.
22. Click **Add secret**. This will save the new secret and return you to the **Actions secrets** screen.
23. Once again, click **New repository secret**.
24. Name this secret `VERCEL_ORG_ID` and copy/paste in the `VERCEL_ORG_ID` value from the `.env` file.
25. Click **Add secret**. This will save the new secret and return you to the **Actions secrets** screen.
26. Once again, click **New repository secret**.
27. Name this secret `VERCEL_PROJECT_ID` and copy/paste in the `VERCEL_PROJECT_ID` value from the `.env` file.
28. Click **Add secret**.\
If you wish, you now can close the `.env` file **and** log out of your GitHub account.

### The GitHub Action for Vercel

```yaml
# .github/workflows/vercel-deploy.yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main # or whatever you call your production branch

env:
  HUGO_VERSION: 0.99.0 # will get Extended Version below
  DART_SASS_VERSION: 1.51.0
  # if you have other environment variables,
  # enter them here in similar fashion

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - name: Checkout default branch
        uses: actions/checkout@v3
      - name: Download Hugo v${{ env.HUGO_VERSION }}
        run: wget https://github.com/gohugoio/hugo/releases/download/v${{ env.HUGO_VERSION }}/hugo_extended_${{ env.HUGO_VERSION }}_Linux-64bit.deb -O hugo_extended_${{ env.HUGO_VERSION }}_Linux-64bit.deb
      - name: Install Hugo v${{ env.HUGO_VERSION }}
        run: sudo dpkg -i hugo*.deb
      - name: Download Embedded Dart Sass v${{ env.DART_SASS_VERSION }}
        run: curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${{ env.DART_SASS_VERSION }}/sass_embedded-${{ env.DART_SASS_VERSION }}-linux-x64.tar.gz
      - name: Unpack Embedded Dart Sass v${{ env.DART_SASS_VERSION }}
        run: |
          tar -xvf sass_embedded-${{ env.DART_SASS_VERSION }}-linux-x64.tar.gz
          sass_embedded/dart-sass-embedded --version
      - name: Add to the PATH
        run: echo "$GITHUB_WORKSPACE/sass_embedded" >> $GITHUB_PATH
      - name: Build site with Hugo
        run: hugo --gc --minify
      - name: Publish to Vercel
        uses: BetaHuhn/deploy-to-vercel-action@v1
        with:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN_HUGO_SITE }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID}}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID}}
          WORKING_DIRECTORY: 'public'
```

</details>

## Cloudflare Pages

<details><summary>Click/tap here to toggle open/close.</summary>

### Disabling automatic builds on Cloudflare Pages

Make sure you have disabled automatic builds from the GitHub repository. To do this:

1. Log into Cloudflare.
2. Select **Pages**.
3. Click the project you wish to modify.
4. Click **Settings**.
5. Click **Builds &amp; deployments**.
6. Under **Branch deployments**, click **Configure Production deployments**.
7. Make sure **Enable automatic production branch deployments** is **not** checked and, if this is a change, click **Save**. Otherwise, click **Cancel** to return to the regular **Branch deployments** choices.
8. Click **Configure Preview deployments**.
9. Select **None (Disable automatic branch deployments)** and, if this is a change, click **Save**. Otherwise, click **Cancel** to return to the regular **Branch deployments** choices.

### Credentials for Cloudflare Pages

For Cloudflare Pages, you must supply:

- An **API token**.
- Your **account ID**.

**To get these credentials**:

1. In your code editor, open your site's `.env` file so you'll be ready to store the appropriate variables for later referral.
2. Log into Cloudflare.
3. In the upper-right corner, click your avatar (probably a "person" icon) and select **My Profile** from the dropdown menu.
4. In the left side of the resulting screen, click **API Tokens**.
5. Click **Create Token**.
6. In the resulting screen, in the **Custom token** section, click **Get started**.
7. In the resulting section:
	- Under **Token name**, enter `CFP_API_TOKEN`.
	- Under **Permissions**:
		- In the first dropdown, select **Account**.
		- In the second dropdown, select **Cloudflare Pages**.
		- In the third dropdown, select **Edit**.
	- Under **Account Resources**:
		- In the first dropdown, select **Include**.
		- In the second dropdown, select **All accounts**.
	- Ignore the remaining items.
	- Click **Continue to summary**.
	- In the resulting screen, click **Create Token**.
	- Copy the value from the resulting token-creation-success screen and **immediately** paste it into the `.env` file (which you should save immediately thereafter) as `CFP_API_TOKEN=` followed by the value. As the screen notes, Cloudflare **won't** show you this value again.
8. Keep the `.env` file open for the time being.
9. In the upper-right corner, click your avatar and select **Account Home**.
10. In the resulting screen, click the website you wish to deploy with the GHA.
11. In the right side of the screen, scroll down to the **API** section.
12. Copy/paste this value under **Account ID** into the `.env` file and name it `CF_ACCOUNT_ID`; save the `.env` file but keep it open.\
If you wish, you now can log off from Cloudflare.
13. Log into your GitHub account.
14. Access your site's repo.
15. Near the top of the screen, click **Settings**.
16. In the resulting **Settings** screen, click **Secrets**, then **Actions**.
17. In the resulting **Actions secrets** screen, click **New repository secret**.
18. Name this secret `CFP_API_TOKEN` and, using the `.env` file, copy/paste in the value from the `CFP_API_TOKEN` you generated earlier.
19. Click **Add secret**. This will save the new secret and return you to the **Actions secrets** screen.
20. Once again, click **New repository secret**.
21. Name this secret `CF_ACCOUNT_ID` and copy/paste in the `CF_ACCOUNT_ID` value from the `.env` file.
25. Click **Add secret**.\
If you wish, you now can close the `.env` file **and** log out of your GitHub account.

### The GitHub Action for Cloudflare Pages

```yaml
# .github/workflows/cfp-deploy.yaml

name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main # or whatever you call your production branch

env:
  HUGO_VERSION: 0.99.0 # will get Extended Version below
  DART_SASS_VERSION: 1.51.0
  # if you have other environment variables,
  # enter them here in similar fashion

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - name: Checkout default branch
        uses: actions/checkout@v3
      - name: Download Hugo v${{ env.HUGO_VERSION }}
        run: wget https://github.com/gohugoio/hugo/releases/download/v${{ env.HUGO_VERSION }}/hugo_extended_${{ env.HUGO_VERSION }}_Linux-64bit.deb -O hugo_extended_${{ env.HUGO_VERSION }}_Linux-64bit.deb
      - name: Install Hugo v${{ env.HUGO_VERSION }}
        run: sudo dpkg -i hugo*.deb
      - name: Download Embedded Dart Sass v${{ env.DART_SASS_VERSION }}
        run: curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${{ env.DART_SASS_VERSION }}/sass_embedded-${{ env.DART_SASS_VERSION }}-linux-x64.tar.gz
      - name: Unpack Embedded Dart Sass v${{ env.DART_SASS_VERSION }}
        run: |
          tar -xvf sass_embedded-${{ env.DART_SASS_VERSION }}-linux-x64.tar.gz
          sass_embedded/dart-sass-embedded --version
      - name: Add to the PATH
        run: echo "$GITHUB_WORKSPACE/sass_embedded" >> $GITHUB_PATH
      - name: Build site with Hugo
        run: hugo --gc --minify
      - name: Publish to CFP
        uses: cloudflare/pages-action@v1.0.0
        with:
          apiToken: ${{ secrets.CFP_API_TOKEN }}
          accountID: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: 'hugo-site'
          directory: 'public'
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

</details>
&nbsp;

---

## Safer, but not bulletproof

So, you may be wondering, does all this *truly* solve the problems I imagined for the [shell-scripting method](/posts/2022/03/dart-sass-hugo-sequel)?

The simple answer is: I *think* so, but even the method I'm proposing today could run afoul of ever-biting Reality. Let me spin some possibilities from within my occasionally paranoid skull.

When I was searching for how you tell a GHA to add something to the build path (`$GITHUB_PATH`), I found a lot of pre-2020 advice about using an `add-path` command. However, fortunately for me, I then **also** found that this command and another, `set-env`, [were deprecated in 2020](https://github.blog/changelog/2020-10-01-github-actions-deprecating-set-env-and-add-path-commands/). That's how I ended up using the `echo [thing] >> $GITHUB_PATH`-kinda line in each GHA. *As of now*, that works just fine; but GitHub could decide to change that, *again*, at any time.

Then, for that matter, GitHub could change **any** of the key GHA variables, such as `$GITHUB_WORKSPACE` and `$GITHUB_PATH`, at any time. Yeah, they'd break a whole \[bleep]-ton of GHAs out there in the process, and that alone would probably prevent GitHub from doing so without giving folks a **lot** of advance warning; but it's a possible gotcha worth keeping in mind.

And, let's not forget the most obvious possible gotcha of all: one or more of these vendors could act to make it *impossible* for GHAs to work with their builds, which would be the ol' ballgame right there.[^leerob]

[^leerob]: Indeed, while trying to find an appropriate Action for deploying to Vercel, I found at least one [GitHub Discussion](https://github.com/amondnet/vercel-action/discussions/126) in which Vercel's [Lee Robinson](https://github.com/leerob) was asking, essentially, "Um, why are you guys doing it this way instead of going through our GUI, as we'd prefer?" Fortunately, it appeared he was convinced by the answers he received. Nonetheless: as long as vendors are wont to raise such questions (since, as one would imagine, they worry about potential support issues arising from not-quite-kosher ways of doing stuff on their platforms), I have to be realistic and concede that GHA-assisted builds might get the side-eye from Those Who Decide Things.

**Still**: while I thus concede this approach isn't truly bulletproof, I'd also suggest that, compared to the shell-scripting method, it has a better chance than did its predecessor of surviving the hosting vendors' various potential changes---not to mention GitHub's, which didn't even figure into the shell-scripting method since it was building on the vendors' platforms rather than on GitHub's.

We Shall See, as always. In the meantime: happy GHA'ing, folks.
