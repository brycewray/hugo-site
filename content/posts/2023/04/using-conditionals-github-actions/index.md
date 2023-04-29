---
title: "Using conditionals in GitHub Actions"
description: "It’s easier to change a parameter (or two) than to shuffle among multiple files."
author: Bryce Wray
date: 2023-04-28T12:57:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Do you deploy your website through [CI/CD](https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html)? Do you handle it through a [GitHub Actions](https://github.com/features/actions) workflow? And, finally, do you sometimes find yourself swapping out your workflow files as your deployment requirements change?

If your answer to all three questions is "Yes," then read on to find out how you can *stop* saying "Yes" to the last question, thanks to *conditionals*.

<!--more-->

Up to now, you may have had to maintain multiple GitHub Actions workflow files to match what you were trying to do at any given time. In the case of this site --- maintained through the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG) --- here are some examples of different setups I've used (during both normal deployments and testing), each of which formerly required its own workflow file:

1. Hugo with [Embedded Dart Sass](https://github.com/sass/dart-sass-embedded/) styling and [Pagefind](https://pagefind.app) site search, each downloaded from its respective GitHub repository and put in the system `PATH` (as described [here](https://www.brycewray.com/posts/2022/05/using-dart-sass-hugo-github-actions-edition/), for example); deployed to [Cloudflare Pages](https://pages.cloudflare.com).
2. Same setup as the first one, but deployed to [Vercel](https://vercel.com).
3. Hugo with "vanilla" CSS styling and Pagefind, all installed entirely through npm/Node.js (as described [here](https://www.brycewray.com/posts/2023/02/hugo-via-npm/)); deployed to Cloudflare Pages.
4. Same setup as the third one, but deployed to Vercel.
5. Hugo downloaded from its GitHub repo but all other items handled through npm; deployed to Cloudflare Pages.
6. Same setup as the fifth one, but . . .

You get the idea.

So, yes, I was juggling a lot of different GitHub Actions workflow files as my needs shifted. Finally tiring of this, I sought a way around these hassles --- that is, other than not having so many setup choices. I was pleased to find it, in the ability of GitHub Actions workflow files to use conditionals.

If you maintain your website through use of an SSG, you're probably already familiar with using various conditionals to make your chosen SSG do what you want. For example, in Hugo, you might have something like this:

```go-html-template
{{- $css := "" -}}
{{- $scssOptions := dict "outputStyle" "compressed" "transpiler" "dartsass" "targetPath" "index.min.css" -}}
{{- if eq .Site.Params.Styling "SCSS" -}}
	{{- $css = resources.Get "scss/index.scss" | toCSS $scssOptions -}}
{{- else -}}
	{{- $css = resources.Get "css/index.css" | postCSS | minify -}}
{{- end -}}
```

. . . in which the conditional statement (the one that begins with `if eq`) checks on the value of a `Styling` parameter that you've set in the site configuration. If the parameter is set to *SCSS*, Hugo will build a CSS file using [Sass](https://sass-lang.com); otherwise, Hugo will build a [PostCSS](https://postcss.org)-enhanced CSS file.

In similar fashion, one can put `if` statements into a GitHub Actions workflow file to provide for numerous possibilities. This lets me handle all those setup choices I mentioned above with just one workflow file, rather than switching out multiple files.

Below is a simplified, yet annotated, version of my conditionals-equipped GitHub Action. I merely have to set a few parameters within the `env`[^env] section and, from there, the `if` statements activate their corresponding `step`s as the conditions dictate. You'll notice that a GitHub Action *expression* is encased in double curly brackets following a dollar sign; *e.g.*, `${{ env.NODE == 'true' }}` .

[^env]: That's short for *environment*, making these *environment variables*.

```yaml
name: Deploy to web

on:
  push:
    branches:
      - main

env:
  HUGO_VERSION: 0.111.3
  DART_SASS_VERSION: 1.62.1
  PAGEFIND_VERSION: 0.12.0
  NODE: true
  # ^^ 'true' = using npm/Node.js
  STYLING: VCSS
  # ^^ choices: 'SCSS' and 'VCSS'
  #    ('VCSS' for "vanilla" CSS, even if
  #    enhanced by PostCSS)
  HOST: CFP
  # ^^ choices: 'CFP' (Cloudflare Pages)
  #    and 'Vercel'

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - name: Checkout default branch
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Set up Node.js
        if: ${{ env.NODE == 'true' }}
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Hugo, Pagefind, etc. with npm/Node
        if: ${{ env.NODE == 'true' }}
        run: npm install
      - name: Hugo download/install without npm/Node
        if: ${{ env.NODE != 'true' }}
        run: |
          # multiple lines of commands
          # not reproduced here;
          # this uses `HUGO_VERSION`
      - name: Install Embedded Dart Sass (for SCSS)
        if: ${{ env.STYLING == 'SCSS' }}
        run: |
          # multiple lines of commands
          # not reproduced here;
          # this uses `DART_SASS_VERSION`
      - name: Install Pagefind (without npm/Node.js)
        if: ${{ env.NODE != 'true' }}
        uses: supplypike/setup-bin@v3
        with:
          # multiple lines of parameters
          # not reproduced here;
          # this uses `PAGEFIND_VERSION`
      - name: Build Hugo site and run Pagefind with npm/Node.js
        if: ${{ env.NODE == 'true' }}
        run: npm run build
      - name: Build Hugo site and run Pagefind without npm/Node.js
        if: ${{ env.NODE != 'true' }}
        run: |
          # multiple lines of commands
          # not reproduced here
      - name: Publish to Cloudflare Pages
        if: ${{ env.HOST == 'CFP' }}
        uses: cloudflare/pages-action@v1
        with:
          # multiple lines of
          # site-specific parameters
          # not reproduced here
      - name: Publish to Vercel
        if: ${{ env.HOST == 'Vercel' }}
        uses: BetaHuhn/deploy-to-vercel-action@v1
        with:
          # multiple lines of
          # site-specific parameters
          # not reproduced here
```

As your own GitHub Actions workflow requirements grow in complexity, using conditionals can be a welcome way to minimize, or even eliminate, having to manage multiple workflow files.

## References and additional reading

- GitHub documentation
	- "[Expressions](https://docs.github.com/en/actions/learn-github-actions/expressions)" (retrieved <span class="nobrk">2023-04-28</span>).
	- "[Using conditions to control job execution](https://docs.github.com/en/actions/using-jobs/using-conditions-to-control-job-execution)" (retrieved <span class="nobrk">2023-04-28</span>).
- Stack Overflow
	- "[github-action: does the IF have an ELSE?](https://stackoverflow.com/questions/60916931/github-action-does-the-if-have-an-else)" (initially posted <span class="nobrk">2020-03-29).
- Sander Knape, "[Go crazy with GitHub Actions](https://sanderknape.com/2021/01/go-crazy-github-actions/)" (<span class="nobrk">2021-01-13</span>).
- Yonatan Kra, "[7 GitHub Actions Tricks I Wish I Knew Before I Started](https://yonatankra.com/7-github-actions-tricks-i-wish-i-knew-before-i-started/)" (<span class="nobrk">2021-12-03</span>).
- Pavel Saman, "[GitHub Actions --- Conditional Job Execution](https://samanpavel.medium.com/github-actions-conditional-job-execution-e6aa363d2867)" (<span class="nobrk">2022-09-09</span>).
- Tomas Sirio, "[If statements on Github Actions](https://dev.to/tomassirio/if-statements-on-github-actions-545d)" *[sic]* (<span class="nobrk">2020-11-20</span>).
- Karol Szafranski, "[Conditional actions in GitHub Workflows](https://tabris.com/conditional-actions-in-github-workflows/)" (<span class="nobrk">2020-09-16</span>).
