---
title: "Using Dart Sass with Hugo: the GitLab edition"
description: "For those who prefer GitLab to GitHub where CI/CD is concerned, here’s a GitLab-friendly way to install Hugo and Embedded Dart Sass."
author: Bryce Wray
date: 2022-08-05T20:49:00-05:00
#initTextEditor: iA Writer
---

[Some months back](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/), I explained how to use a [GitHub Action](https://github.com/features/actions) to deploy a [Hugo](https://gohugo.io) site complete with [Dart Sass](https://sass-lang.com/dart-sass). The thing is, some people *really* dislike GitHub, so this post mirrors the purpose of that earlier one **except** that the procedure described herein uses [GitLab CI/CD](https://docs.gitlab.com/ee/ci/), instead.

As in the first post, I'll provide a set of instructions for use with each of the three [Jamstack](https://jamstack.org)-savvy hosting vendors with which I'm most familiar: [Netlify](https://netlify.com), [Vercel](https://vercel.com), and  [Cloudflare Pages](https://pages.cloudflare.com).

----

## What's ahead

Before I get to the vendor-specific instructions and GitLab scripts, here are some general notes:

- The GitLab CI/CD commands exist as a YAML file, `.gitlab-ci.yml`, which must live at your project's top level. And, of course, that file must be committed in Git so GitLab will see it!
- Since this will bypass most of the usual deployment pipeline for each hosting vendor, you'll have to supply *within the `.gitlab-ci.yml` file* all the environment variables that you'd normally provide via the vendor's GUI.\
\
**Because of that . . .**
- You'll need to add each such environment variable to the GitLab repo's **CI/CD variables**. You'll **also** have to add vendor-specific **credentials** to these CI/CD variables. The instructions for each vendor will tell you how.
- We'll also refer to your local Hugo project's **`.env` file**, a plain-text file where you'll be storing the aforementioned environment variables and credentials for your own future reference (including *during* this process, as you'll see). If your project doesn't already have a `.env` file, create it now at the project's top level --- and **be sure** it's an entry in your project's `.gitignore` file, because this will contain sensitive information you **never** want to commit in Git even locally, much less allow it to appear on GitLab. And please don't presume just making the GitLab repo private is sufficient protection for an inadvertently committed `.env` file, because it's definitely not.
- The versions shown for Hugo and Embedded Dart Sass in the `.gitlab-ci.yml` file are the current ones (0.101.0 and 1.54.3, respectively) as of the initial publication of this post. You can always see which releases are up-to-date by checking the release pages for [Hugo](https://github.com/gohugoio/hugo/releases) and [Embedded Dart Sass](https://github.com/sass/dart-sass-embedded/releases).

Finally, because you don't want to have to scroll-scroll-scroll through instructions for vendors you don't even use, I'm using the [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) and [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) HTML elements to keep things nice and compact. Just click/tap on a section to toggle it as either open or closed.

---

## Netlify
<details><summary>Click/tap here to toggle open/close.</summary>

**Note**: You can [set certain parameters with a `netlify.toml` file](https://docs.netlify.com/configure-builds/file-based-configuration/), but herein we'll be making all Netlify changes through its GUI.
{.box}

### Disabling automatic builds on Netlify

Make sure you have disabled automatic builds from the GitLab repository. To do this:

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
{.box}

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
6. Click **New access token**. Give it an identifying name for your benefit. If you wish, name it `NETLIFY_AUTH_TOKEN` (just to follow along in the GitLab script below).
7. Click **Generate token** to generate the authorization variable **BUT *DON'T* CLOSE THE GENERATED TOKEN BEFORE YOU PERFORM THE NEXT THREE STEPS**!
8. **Copy** the token and then **paste** it (as `NETLIFY_AUTH_TOKEN=` followed by the token value) into that `.env` file you opened in the first step. This is **critical** because you **won't** be able to access the token again. (You can create a **new** one, of course, but you can't edit or even view an **existing** personal access token after it's generated. That's for your own protection.)
9. Save the `.env` file **but** keep it open for the time being.
10. **Now** you can click **Done** to save the newly created token.
11. Click the Netlify icon in the upper left to return to your main settings.
12. Click **Sites**.
13. Click the site you want to deploy through the GitLab script.
14. Click **Site settings**.
15. Under **Site information**, copy the value shown for **Site ID** and paste it into the same `.env` file, noting that it's your `NETLIFY_SITE_ID` value. (While you *can* see **this** one whenever you want, it's more convenient to do it this way since you'll be adding this to GitLab shortly.)
16. As before, save the `.env` file **but** keep it open for now.\
If you wish, you now can log off from Netlify.
17. Log into your GitLab account.
18. Access your site's repo.
19. On the left of the screen, click **Settings**, then its **CI/CD** sub-item (and *not* the menu's *top*-level **CI/CD** item).
20. In the resulting display, next to **Variables**, click **Expand**.
21. Click the blue **Add variable** button to display an **Add variable** modal.
22. Assign a **key** of `NETLIFY_AUTH_TOKEN`. For the **Value**, access the `.env` file and copy/paste in the value from the `NETLIFY_AUTH_TOKEN` you generated earlier.
23. Click the gray **Add variable** button. This will save the new variable and close the modal.
24. Once again, click the blue **Add variable** button to display an **Add variable** modal.
25. Assign a **key** of `NETLIFY_SITE_ID`. For the **Value**, copy/paste in the `NETLIFY_SITE_ID` value from the `.env` file.
26. Click the gray **Add variable** button.\
If you wish, you now can close the `.env` file **and** log out of your GitLab account.

### The GitLab CI/CD file for Netlify

For the `MY_WEBSITE` variable below, fill in your site's URL, such as `https://www.mysite.com`.

```yaml
# .gitlab-ci.yml
# for Netlify

stages:
  - deploy

image: node:latest

variables:
  NETLIFY_AUTH_TOKEN: $NETLIFY_AUTH_TOKEN
  NETLIFY_SITE_ID: $NETLIFY_SITE_ID
  HUGO_VERSION: 0.101.0
  DART_SASS_VERSION: 1.54.3
  MY_WEBSITE: https://www.example.com # <-- fill in!!

deploySite:
  stage: deploy
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
  environment:
    name: production
    url: $MY_WEBSITE
  script:
    - wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb -O hugo_extended_${HUGO_VERSION}_Linux-64bit.deb
    - dpkg -i hugo*.deb
    - curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${DART_SASS_VERSION}/sass_embedded-${DART_SASS_VERSION}-linux-x64.tar.gz
    - tar -xvf sass_embedded-${DART_SASS_VERSION}-linux-x64.tar.gz
    - sass_embedded/dart-sass-embedded --version
    - hugo --gc --minify
    - npm i -g netlify-cli
    - netlify deploy --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --prod
```

</details>

## Vercel

<details><summary>Click/tap here to toggle open/close.</summary>

### Disabling automatic builds on Vercel

Make sure you have disabled automatic builds from the GitLab repository. To do this:

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
  5. If your project has a top-level `vercel.json` file --- and, for this method, it's preferable that it **doesn't** have such a file --- make sure it has no `builds` key/value combo (the mere presence of which will cause troublesome overrides of the build process we're trying to do with GitLab CI/CD).

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
	- Under **TOKEN NAME**, enter `VERCEL_TOKEN`.
	- Under **SCOPE**, select **Full Account**.
	- Click **CREATE TOKEN**.
	- Copy the value from the resulting **Token Created** pop-up and **immediately** paste it into the `.env` file (which you should save immediately thereafter) as `VERCEL_TOKEN_HUGO_SITE=` followed by the value. As the pop-up notes, Vercel **won't** show you this value again.
	- Click **DONE** to close the **Token Created** pop-up.
7. Keep the `.env` file open for the time being.
8. In the left-side menu, click **General**.
9. Scroll down to **Your ID**.
10. Copy/paste this value into the `.env` file and name it `VERCEL_ORG_ID`; save the `.env` file but keep it open.
11. Back in the Vercel window, at the top of the page, click **Overview**.
12. Click the site you want to set up for deploy through the GitLab script.
13. Click **Settings**. You'll then be in the **Project Settings** screen.
14. Scroll down to **Project ID**.
15. Copy/paste this value into the `.env` file and name it `VERCEL_PROJECT_ID`; save the `.env` file but keep it open.\
If you wish, you now can log off from Vercel.
16. Log into your GitLab account.
17. Access your site's repo.
18. On the left of the screen, click **Settings**, then its **CI/CD** sub-item (and *not* the menu's *top*-level **CI/CD** item).
19. In the resulting display, next to **Variables**, click **Expand**.
20. Click the blue **Add variable** button to display an **Add variable** modal.
21. Assign a **key** of `VERCEL_TOKEN`. For the **Value**, access the `.env` file and copy/paste in the value from the `VERCEL_TOKEN` you generated earlier.
22. Click the gray **Add variable** button. This will save the new variable and close the modal.
23. Once again, click the blue **Add variable** button to display an **Add variable** modal.
24. Assign a **key** of `VERCEL_ORG_ID`. For the **Value**, copy/paste in the `VERCEL_ORG_ID` value from the `.env` file.
25. Click the gray **Add variable** button. This will save the new variable and close the modal.
27. Once again, click the blue **Add variable** button to display an **Add variable** modal.
28. Assign a **key** of `VERCEL_PROJECT_ID`. For the **Value**, copy/paste in the `VERCEL_PROJECT_ID` value from the `.env` file.
29. Click the gray **Add variable** button. This will save the new variable and close the modal.\
If you wish, you now can close the `.env` file **and** log out of your GitLab account.

### The GitLab CI/CD file for Vercel

For the `MY_WEBSITE` variable below, fill in your site's URL, such as `https://www.mysite.com`.

```yaml
# .gitlab-ci.yml
# for Vercel

stages:
  - deploy

image: node:latest

variables:
	VERCEL_TOKEN: $VERCEL_TOKEN
  VERCEL_ORG_ID: $VERCEL_ORG_ID
  VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID
  HUGO VERSION: 0.101.0
  DART_SASS_VERSION: 1.54.2
  MY_WEBSITE: https://www.example.com # <-- fill in!!

deploySite:
  stage: deploy
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
  environment:
    name: production
    url: https://www.example.com # <-- fill in!!
  script:
    - wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb -O hugo_extended_${HUGO_VERSION}_Linux-64bit.deb
    - dpkg -i hugo*.deb
    - curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${DART_SASS_VERSION}/sass_embedded-${DART_SASS_VERSION}-linux-x64.tar.gz
    - tar -xvf sass_embedded-${DART_SASS_VERSION}-linux-x64.tar.gz
    - sass_embedded/dart-sass-embedded --version
    - hugo --gc --minify
    - npm i -g vercel
    - vercel pull --yes --environment=production --token=$VERCEL_TOKEN
    - vercel build --prod --token=$VERCEL_TOKEN
    - vercel deploy --prod --token=$VERCEL_TOKEN
```

</details>

## Cloudflare Pages

<details><summary>Click/tap here to toggle open/close.</summary>

### Disabling automatic builds on Cloudflare Pages

Make sure you have disabled automatic builds from the GitLab repository. To do this:

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
10. In the resulting screen, click the website you wish to deploy with the GitLab script.
11. In the right side of the screen, scroll down to the **API** section.
12. Copy/paste this value under **Account ID** into the `.env` file and name it `CF_ACCOUNT_ID`; save the `.env` file but keep it open.\
If you wish, you now can log off from Cloudflare.
13. Log into your GitLab account.
14. Access your site's repo.
15. On the left of the screen, click **Settings**, then its **CI/CD** sub-item (and *not* the menu's *top*-level **CI/CD** item).
16. In the resulting display, next to **Variables**, click **Expand**.
17. Click the blue **Add variable** button to display an **Add variable** modal.
18. Assign a **key** of `CFP_API_TOKEN`. For the **Value**, access the `.env` file and copy/paste in the value from the `CFP_API_TOKEN` you generated earlier.
19. Click the gray **Add variable** button. This will save the new variable and close the modal.
20. Once again, click the blue **Add variable** button to display an **Add variable** modal.
21. Assign a **key** of `CF_ACCOUNT_ID`. For the **Value**, copy/paste in the `CF_ACCOUNT_ID` value from the `.env` file.
25. Click the gray **Add variable** button. This will save the new variable and close the modal.\
If you wish, you now can close the `.env` file **and** log out of your GitLab account.

### The GitLab CI/CD file for Cloudflare Pages

For the `MY_WEBSITE` variable below, fill in your site's URL, such as `https://www.mysite.com`. For the `PROJECT_NAME` variable, fill in your site's Cloudflare Pages project name (which often is the name of its repository, but not necessarily, so check your setup in CFP to make sure)

```yaml
# .gitlab-ci.yml
# for Cloudflare Pages

stages:
  - deploy

image: node:latest

variables:
  CLOUDFLARE_API_TOKEN: $CFP_API_TOKEN
  CLOUDFLARE_ACCOUNT_ID: $CF_ACCOUNT_ID
  HUGO_VERSION: 0.101.0
  DART_SASS_VERSION: 1.54.3
  MY_WEBSITE: https://www.example.com # <-- fill in!!
  PROJECT_NAME: my-project # <-- fill in!!

deploySite:
  stage: deploy
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
  environment:
    name: production
    url: $MY_WEBSITE
  script:
    - wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb -O hugo_extended_${HUGO_VERSION}_Linux-64bit.deb
    - dpkg -i hugo*.deb
    - curl -LJO https://github.com/sass/dart-sass-embedded/releases/download/${DART_SASS_VERSION}/sass_embedded-${DART_SASS_VERSION}-linux-x64.tar.gz
    - tar -xvf sass_embedded-${DART_SASS_VERSION}-linux-x64.tar.gz
    - sass_embedded/dart-sass-embedded --version
    - hugo --gc --minify
    - npm install -g wrangler --unsafe-perm=true
    - wrangler pages publish ./public --project-name=$PROJECT_NAME --branch "main"
```

</details>
<br />
<br />

----
