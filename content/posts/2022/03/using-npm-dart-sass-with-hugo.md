---
layout: singlepost
title: "Using Dart Sass with Hugo"
subtitle: "No reason to wait for the good stuff"
description: "Until hosts allow Embedded Dart Sass in their build processes, here’s a not-too-hacky workaround for Sass-on-Hugo fans."
author: Bryce Wray
date: 2022-03-11T12:00:00-06:00
draft: true
#lastmod:
discussionId: "2022-03-using-dart-sass-hugo"
featured_image: "sass-and-glasses_3200x1800.png"
featured_image_width: 3200
featured_image_height: 1800
featured_image_alt: "Sass logo and Sass glasses icon on gradient background"
featured_image_caption: |
  <span class="caption">Image: Sass logo and Sass glasses icon, sourced from <a href="https://sass-lang.com" target="_blank" rel="noopener">Sass website</a>; adapted in <a href="https://affinity.serif.com/en-us/designer/" target="_blank" rel="noopener">Affinity&nbsp;Designer</a></span>
---

{{% disclaimer %}}

\[Intro]

### The LibSass problem

In October, 2020, the Sass project [deprecated the LibSass implementation](https://sass-lang.com/blog/libsass-is-deprecated) on which Hugo Pipes depends to provide Sass, saying that:

- Going forward, LibSass will receive no features, but rather only fixes for major bugs and security issues. As a result, since LibSass has received no feature updates since *November, 2018*, LibSass users are now nearly four-and-a-half years behind the curve where Sass features are concerned.
- All LibSass users should switch to [Dart Sass](https://sass-lang.com/dart-sass).

On many if not most other [static site generators](https://jamstack.org/generators)(SSGs), moving to Dart Sass is a fairly simple matter (other than whatever Sass code changes it might require, of course): one need only use the [standard Sass package](https://github.com/sass/sass). However, since LibSass is baked into Hugo, the only answer appears to be in the form of [Embedded Dart Sass](https://github.com/sass/dart-sass-embedded), present in one's `path`. And, while that's doable on one's own device, getting it into a host's build process is another matter, and one [which remains unsolved](https://discourse.gohugo.io/t/using-dart-sass-hugo-and-netlify/37099).

### A stab in the dark

So, while running through the Tailwind-fix part of this article, I got to thinking: why not just use that standard Sass package with Hugo? I'd seen no other articles or forum comments about doing it that way, In either case, you're using an [`npm`](https://www.npmjs.com/) package so, if it's good enough for the proverbial goose&nbsp;.&nbsp;.&nbsp;.

I gave it a shot and am delighted to tell you that it works! Now, it is different from the Tailwind workaround in that the Sass package doesn't work directly with Hugo Pipes and, thus, need [`package.json` ](https://docs.npmjs.com/creating-a-package-json-file) scripting to make everything work.

### How to set it up

So, here's the procedure.

First of all, if you don't even use [node modules](https://nodejs.org/api/modules.html) in any of your projects, you may need to install `npm` itself [as explained here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). If you do have `npm` but your Sass-using Hugo project has no `package.json` file, go into the project and run this `npm` command:

```bash
npm init -y
```

Then, install the packages you'll need for the code to follow:

```bash
npm i -D npm-run-all rimraf sass
```

Open `package.json` and make its `scripts` object look as follows:

```json
  "scripts": {
    "clean": "rimraf public",
    "devsass": "sass --no-source-map assets/scss/index.scss assets/css/index.css",
    "prodsass": "sass --no-source-map themes/hugo-npm-sass/assets/scss/index.scss themes/hugo-npm-sass/assets/css/index.css --style=compressed",
    "start": "NODE_ENV=development npm-run-all clean devsass --parallel dev:*",
    "build": "NODE_ENV=production npm-run-all clean prod:sass prod:hugo",
    "testbuild": "NODE_ENV=production npm-run-all clean prod:sass testbuild:hugo",
    "dev:sass": "npm run devsass -- --watch",
    "dev:hugo": "hugo server",
    "prod:sass": "npm run prodsass",
    "prod:hugo": "hugo --gc --minify",
    "testbuild:hugo": "hugo server --gc --minify"
  },
``` 

## Mindshare considerations

Given the constantly increasing number of SSGs out there with which Hugo must compete, it's important to keep Hugo workable with the ever-changing Tailwind CSS, regardless of one's feelings about utility-first CSS in general and Tailwind in particular. For better or worse, Tailwind is likely to remain popular for years to come, especially since its parent company can afford to market it aggressively. 

To continue to attract new developers in this competitive market, Hugo must work with the Kewl Toys to which those devs are already clutching quite protectively. Solutions like the one described in this post can help Hugo compete more effectively for web dev mindshare---especially against trendier, JavaScript-based SSGs which use Tailwind with little or no trouble.