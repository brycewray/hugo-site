---
title: "Ignition sequence start"
description: "GitHub Actions to deploy to Firebase Hosting."
author: Bryce Wray
date: 2020-09-27T08:05:00-05:00
---

{{% disclaimer %}}

**Note**: Unlike the [last](/posts/2020/09/normal-persons-guide-static-websites/) [two](/posts/2020/09/normal-persons-guide-static-website-hosting/) posts, this one very definitely is for **only** my fellow web geeks --- and, anyway, they're the only folks likely to be using [Firebase Hosting](https://firebase.google.com), I would think.
{.yellowBox}

I mentioned in a footnote to the original version of my [previous post](/posts/2020/09/normal-persons-guide-static-website-hosting/) that my "[lurch](/posts/2020/09/goodbye-hello-part-5/)" among hosts now has this site on Firebase. If you've read both the original "[Goodbye and hello](/posts/2020/07/goodbye-hello/)" and its semi-[retconned](https://www.merriam-webster.com/words-at-play/retcon-history-and-meaning) [second part](/posts/2020/07/goodbye-hello-part-2/), you may remember my describing why I chose **not** to use Firebase. If so, you then may also wonder what changed my mind.

Actually, there were multiple reasons:

- Last month, [Firebase belatedly adopted Brotli compression](https://firebase.googleblog.com/2020/08/firebase-hosting-new-features.html), its previous lack of which had been a deal-breaker for me.
- I had already been an admirer of the performance of the [Fastly](https://fastly.com) content delivery network (CDN) that Firebase uses, and found it was consistently better than the CDN setups provided with the free tiers for the other three hosts I'd been using and testing ([Netlify](https://netlify.com), [Render](https://render.com), and [Vercel](https://vercel.com)).
- In the last few days, I tinkered around and was able to come up with a [GitHub Action](https://github.com/features/actions) that made it possible to **deploy** (in Firebase terminology) to Firebase Hosting every time I pushed a change to the site repo's default branch --- *i.e.*, making it as easy as when using the repo with those other three hosts. Yes, you can just do a local site build and then invoke `firebase deploy`, but that's an extra step; I've kinda gotten accustomed to the ease of the push-to-repo method and didn't want to give it up.

The purpose of this post is to share with you the applicable GitHub Actions for using Firebase Hosting with my two favorite and [recommended](/posts/2020/09/normal-persons-guide-static-websites/) [static site generators (SSGs)](https://staticgen.com): [Hugo](https://gohugo.io) and [Eleventy](https://11ty.dev).

The GitHub Action for Hugo purposely does **not** use the widely used and excellent [GitHub Actions for Hugo](https://github.com/peaceiris/actions-hugo) by [Shohei Ueda (peaceiris)](https://github.com/peaceiris) to install Hugo during the build process, because --- as was the case with [Andrew Connell](https://andrewconnell.com), whose example I followed and to whom I am grateful for the information he imparted in "[Automated Hugo Releases With GitHub Actions](https://www.andrewconnell.com/blog/automated-hugo-releases-with-github-actions/)" --- I preferred having more control over that exact part.

Enough talk; on with the GitHub Actions. Of course, each is based on two assumptions: (a.) you've initialized your repo for Firebase, thus creating the `.firebaserc` and `firebase.json` files mentioned at the end; and (b.) you've stored your Firebase token --- called below by `${{ secrets.FIREBASE_TOKEN }}` --- in your repo's **Secrets**. If you don't **have** a Firebase token, you get that with `firebase login:ci` from the CLI, as explained in the [documentation](https://firebase.google.com/docs/cli#cli-ci-systems). You'll note that I have `npm run build` in the *Build site with Hugo* step; but that's peculiar to my [Node.js](https://nodejs.org)-using Hugo repo (chiefly because of [PostCSS](https://postcss.org) and [Tailwind CSS](https://tailwindcss.com)), so you may want to use a variation of that, instead, if you've kept *your* Hugo repo Node-free. The Hugo version shown is the latest as of this post's original publication; set it as you wish.[^versionInfo] When I use Hugo, I use the [extended version](https://gohugo.io/troubleshooting/faq/#i-get-tocss--this-feature-is-not-available-in-your-current-hugo-version) in case I decide to support [SCSS through Hugo Pipes](https://gohugo.io/hugo-pipes/scss-sass/) rather than Tailwind.[^diffThemes]


[^versionInfo]: Just be sure the version conforms to how it shows up in the Hugo release filename, since this reference helps build that name for the download process in the GitHub Action; always check the [Hugo releases page](https://github.com/gohugoio/hugo/releases) to be sure about the accurate filename.

[^diffThemes]: At one point, I had the Hugo version of this site's repo set up so that there were **three** themes for Hugo's use --- one with purely SCSS, one with CSS-on-PostCSS (but still no Tailwind), and one with Tailwind. That way, depending on which I wanted to use, I could simply switch themes in the site's `config.yaml` file. A few months after this post's initial publication, I decided maintaining all three themes was more trouble than I wanted and just went with Tailwind. However, just in case I change my mind, I'll stick with the extended version of Hugo for all my uses.

## For Hugo

```yaml
name: CI-Hugo-site-to-Firebase

on:
  push:
    branches:
      - main

env:
  HUGO_VERSION: 0.75.1 # steps below will pick extended version

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout default branch
        uses: actions/checkout@v2
      - name: Download Hugo v${{ env.HUGO_VERSION }} Linux x64
        run: "wget https://github.com/gohugoio/hugo/releases/download/v${{ env.HUGO_VERSION }}/hugo_extended_${{ env.HUGO_VERSION }}_Linux-64bit.deb -O hugo_extended_${{ env.HUGO_VERSION }}_Linux-64bit.deb"
      - name: Install Hugo
        run: sudo dpkg -i hugo*.deb
      - name: Install dependencies
        run: npm install
      - name: Build site with Hugo
        run: npm run build
      - name: Install Firebase Tools
        run: npm install firebase-tools
      - name: Deploy to Firebase
        run: npx firebase deploy
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
          # Other args should come from .firebaserc and firebase.json
```

## For Eleventy

**Note**: Other than obviously not downloading and installing Hugo, this one for Eleventy also was different because, in the `Deploy to Firebase` section, I had to add `npx firebase use default` to make this work with the project, for some reason I don't understand.
{.yellowBox}

```yaml
name: CI-Eleventy-site-to-Firebase

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout default branch
        uses: actions/checkout@v2
      - name: Install dependencies (including Eleventy)
        run: npm install
      - name: Build site with Eleventy
        run: npm run build
      - name: Install Firebase Tools
        run: npm install firebase-tools
      - name: Deploy to Firebase
        run: npx firebase use default && npx firebase deploy
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
          # Other args should come from .firebaserc and firebase.json
```
