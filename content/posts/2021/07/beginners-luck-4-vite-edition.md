---
layout: singlepost
title: "Beginner’s luck #4: the Vite edition"
subtitle: "The stable of starter sets grows again"
description: "Now I have an Eleventy/Vite starter, and here’s some of the code that makes it go."
author: Bryce Wray
date: 2021-07-25T16:46:00-05:00
lastmod: 2021-08-22T16:22:00-05:00
discussionId: "2021-07-beginners-luck-4-vite-edition"
featured_image: susan-holt-simpson-H7SCRwU1aiM-unsplash_4608x3072.jpg
featured_image_width: 4608
featured_image_height: 3072
featured_image_alt: "Colorful toy alphabet blocks"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@shs521?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Susan Holt Simpson</a>; <a href="https://unsplash.com/s/photos/toy-blocks?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

---

A quickie for you (if you don't count the code blocks, that is) . . .

Given the interest the community showed in my previous post, "[Eleventy + Vite = elite](/posts/2021/07/eleventy-vite-elite)," I thought I'd go ahead and issue [yet another starter set](/posts/2021/06/beginners-luck-3-adding-zola-starter): an [Eleventy](https://11ty.dev)/[Vite](https://vitejs.dev) combo. To make it, I simply cloned the existing [`eleventy_solo_starter_njk` repository](https://github.com/brycewray/eleventy_solo_starter_njk) and converted it for use with Vite as described herein. That means it gives you Eleventy with [Nunjucks](https://mozilla.github.io/nunjucks) templating, Vite, **and** [Tailwind CSS](https://tailwindcss.com) (plus [JIT](https://tailwindcss.com/docs/just-in-time-mode)) to boot.

The new starter's repo is [`eleventy_vite_starter`](https://github.com/brycewray/eleventy_vite_starter). There's also an [online demo](https://eleventy-vite.vercel.app) which, if you're familiar with any of my other starters, may not float your boat---but the thing is, I was able to convert its predecessor to this config in well under an hour. That augurs well for your efforts, I would hope.

**Update, 2021-08-22**: Today, I switched my site repo **back** to my own bespoke setup, away from the Eleventy/Vite configuration described herein. The latter proved to be problematic during local development, particularly when I needed to test changes on devices on my local network. The mixing of the Eleventy and Vite processes just didn't go well with that. However, I retain my great admiration for Vite, and will hope for a better Eleventy/Vite solution down the line. Perhaps it'll come from [one particular plugin that requires the yet-to-come Eleventy 1.x](https://snugug.com/musings/eleventy-plus-vite/). As always, I'll retain this post and [the previous one](/posts/2021/07/eleventy-vite-elite) for [archival purposes](/posts/2019/10/otoh); and, for those who might yet be interested, I'll also keep alive the starter repo described in this post.
{.yellowBox}

## The conversion process

As noted in "Eleventy + Vite = elite," I simply borrowed code from Fotis Papado&shy;georgo&shy;poulos's repo, [`eleventy-with-vite`](https://github.com/fpapado/eleventy-with-vite), with additional guidance from Simon East's *Medium* article, "[Clean SASS and JS with Eleventy in 2021 (Using Vite)](https://medium.com/@SimonEast/clean-sass-and-js-with-eleventy-in-2021-using-vite-98747500d8f8)."

Specifically, here's what I did to turn the `eleventy_solo_starter_njk` clone into `eleventy_vite_starter`. If you prefer just to add Vite to your own Eleventy repo, you can do the same, so consider these as steps to follow.

### Add dependencies

```bash
npm i -D @vitejs/plugin-legacy browser-sync vite
```

The `eleventy-with-vite` repo uses the [`serve` package](https://github.com/vercel/serve/) for certain functionality, but I prefer [Browsersync](https://browsersync.io).

### Add files

At the top level, I added `vite.config.js` (some of the commenting is from Mr. Papado&shy;georgo&shy;poulos's repo):

```js
// based on eleventy-with-vite (https://github.com/fpapado/eleventy-with-vite)
// by Fotis Papadogeorgopoulos (https://github.com/fpapado)

import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [legacy()],
  build: {
    outDir: "_site",
    assetsDir: "assets-vite", // default = "assets"
    // Sourcemaps are nice, but not critical for this to work
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      input: "/src/client/main.js",
    },
  },
});
```

In the Eleventy [site-wide data directory](https://www.11ty.dev/docs/data-global/)---in my repo's case, `_data` at the top level---I added a `build.js` file with the following content:

```js
module.exports = {
  env: process.env.NODE_ENV,
}
```

Then I added `src/client/main.js` with:

```js
import "vite/dynamic-import-polyfill"
import "../assets/css/index.css"
// if you add any JS scripts or other files Vite can bundle, import them here
```

This is the entry file to which `vite.config.js` directed Vite in the `rollupOptions` object. Anything you want handled in Vite gets referenced here. In this bare-bones starter, it was enough to have only the [polyfill](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) importation from `eleventy-with-vite` and then the site's CSS file---the latter of which stayed exactly as was, and still got processed by Tailwind CSS just the same. Vite didn't impede that in the least.

### Edit existing files

Then came the tricky part: making critical edits to files the repo already had.

#### Eleventy config file

First came the Eleventy config file, `.eleventy.js`. At its top, **before** the `module.exports = function(eleventyConfig) {` part, I added:

```js
const fs = require("fs/promises")
```

. . . which, of course, would have **required** replacing an existing `const fs` statement had there been one (noting for those of you who may, again, want only to convert a repo of your own).

Still at the top, I added:

```js
const INPUT_DIR = "src"
const OUTPUT_DIR = "_site"
const PATH_PREFIX = "/"
```

Then, at the end of `.eleventy.js`, I replaced the final `return {templateFormats}` section with the following, which includes [shortcodes](https://www.11ty.dev/docs/shortcodes/) required for the repo's Nunjucks templates to call Vite properly:

```js
  // Read Vite's manifest.json, and add script tags for the entry files
  // You could decide to do more things here, such as adding preload/prefetch tags
  // for dynamic segments
  // NOTE: There is some hard-coding going on here, with regard to the assetDir
  // and location of manifest.json
  // you could probably read vite.config.js and get that information directly
  // @see https://vitejs.dev/guide/backend-integration.html
  eleventyConfig.addNunjucksAsyncShortcode("viteScriptTag", viteScriptTag);
  eleventyConfig.addNunjucksAsyncShortcode(
    "viteLegacyScriptTag",
    viteLegacyScriptTag
  );
  eleventyConfig.addNunjucksAsyncShortcode(
    "viteLinkStylesheetTags",
    viteLinkStylesheetTags
  );
  eleventyConfig.addNunjucksAsyncShortcode(
    "viteLinkModulePreloadTags",
    viteLinkModulePreloadTags
  );

  async function viteScriptTag(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    return `<script type="module" src="${PATH_PREFIX}${entryChunk.file}"></script>`;
  }

  /* Generate link[rel=modulepreload] tags for a script's imports */
  /* TODO(fpapado): Consider link[rel=prefetch] for dynamic imports, or some other signifier */
  async function viteLinkModulePreloadTags(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    if (!entryChunk.imports || entryChunk.imports.length === 0) {
      console.log(
        `The script for ${entryFilename} has no imports. Nothing to preload.`
      );
      return "";
    }
    /* There can be multiple import files per entry, so assume many by default */
    /* Each entry in .imports is a filename referring to a chunk in the manifest; we must resolve it to get the output path on disk.
     */
    const allPreloadTags = await Promise.all(
      entryChunk.imports.map(async (importEntryFilename) => {
        const chunk = await getChunkInformationFor(importEntryFilename);
        return `<link rel="modulepreload" href="${PATH_PREFIX}${chunk.file}"></link>`;
      })
    );

    return allPreloadTags.join("\n");
  }

  async function viteLinkStylesheetTags(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    if (!entryChunk.css || entryChunk.css.length === 0) {
      console.warn(`No css found for ${entryFilename} entry. Is that correct?`);
      return "";
    }
    /* There can be multiple CSS files per entry, so assume many by default */
    return entryChunk.css
      .map(
        (cssFile) =>
          `<link rel="stylesheet" href="${PATH_PREFIX}${cssFile}"></link>`
      )
      .join("\n");
  }

  async function viteLegacyScriptTag(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    return `<script nomodule src="${PATH_PREFIX}${entryChunk.file}"></script>`;
  }

  async function getChunkInformationFor(entryFilename) {
    // We want an entryFilename, because in practice you might have multiple entrypoints
    // This is similar to how you specify an entry in development more
    if (!entryFilename) {
      throw new Error(
        "You must specify an entryFilename, so that vite-script can find the correct file."
      );
    }

    // TODO: Consider caching this call, to avoid going to the filesystem every time
    const manifest = await fs.readFile(
      path.resolve(process.cwd(), "_site", "manifest.json")
    );
    const parsed = JSON.parse(manifest);

    let entryChunk = parsed[entryFilename];

    if (!entryChunk) {
      const possibleEntries = Object.values(parsed)
        .filter((chunk) => chunk.isEntry === true)
        .map((chunk) => `"${chunk.src}"`)
        .join(`, `);
      throw new Error(
        `No entry for ${entryFilename} found in _site/manifest.json. Valid entries in manifest: ${possibleEntries}`
      );
    }

    return entryChunk;
  }

  return {
    templateFormats: [
      "html", 
      "md", 
      "njk", 
      "11ty.js"
    ],
    pathPrefix: PATH_PREFIX,
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: INPUT_DIR,
      output: OUTPUT_DIR,
      // NOTE: These two paths are relative to dir.input
      // @see https://github.com/11ty/eleventy/issues/232
      includes: "_includes",
      data: "../_data",
    },
  }
}
```

#### Scripts

I tossed out the existing `scripts` object in `package.json` in favor of the following:

```json
  "scripts": {
    "clean": "rimraf _site",
    "start": "TAILWIND_MODE=watch NODE_ENV=development npm-run-all clean --parallel dev:*",
    "dev:eleventy": "ELEVENTY_ENV=development npx @11ty/eleventy --incremental --quiet --serve",
    "dev:vite": "vite",
    "build": "NODE_ENV=production npm-run-all clean prod:vite prod:eleventy",
    "prod:eleventy": "ELEVENTY_ENV=production npx @11ty/eleventy --output=./_site",
    "prod:vite": "NODE_ENV=production vite build",
    "testbuild:bsync": "browser-sync start --server ./_site -w --no-open --no-notify --no-ghost-mode --port 5000 --ui-port 5001",
    "testbuild": "NODE_ENV=production npm run build && npm run testbuild:bsync"
  },
```

**Note**: I'll explain later what these do.
{.yellowBox}

#### Templating

Finally, I changed my templates to fit the new setup.

First up was the site-wide `base.njk`, the entirety of which now became:

```twig
<!DOCTYPE html>
<html lang="en">
  {% include 'layouts/partials/head.njk' %}
  <body>
    {% include 'layouts/partials/header.njk' %}
    {{ content | safe }}
    {% include 'layouts/partials/footer.njk' %}
    {#  
      We must split development  and production scripts
      In development, vite runs a server to resolve and reload scripts
      In production, the scripts are statically replaced at build-time 

      The build.env variable is assigned in src/_data/build.js
      @see https://vitejs.dev/guide/backend-integration.html#backend-integration
      @see https://www.11ty.dev/docs/data-js/#example-exposing-environment-variables
    #}
    {% if build.env == "production" %}
      {# We must read the production scripts from the Vite manifest. We defer that logic to a custom shortcode #}
      {% viteScriptTag "src/client/main.js" %}
      {% viteLegacyScriptTag "vite/legacy-polyfills" %}
      {% viteLegacyScriptTag "src/client/main-legacy.js" %}
    {% else %}
      <script type="module" src="http://localhost:3000/@vite/client"></script>
      <script type="module" src="http://localhost:3000/src/client/main.js"></script>
    {% endif %}
  </body>
</html>
```

Then, I finished by changing the closing, CSS-related part of the site-wide `head.njk` template (which, as the name  implies, provides each page's `head` section) to the following:

```twig
    {% if build.env == "production" %}
      {# Add any CSS from the main script #}
      {% viteLinkStylesheetTags "src/client/main.js" %}
      {% viteLinkModulePreloadTags "src/client/main.js" %}
    {% endif %}
    
  </head>
```

In development mode, the CSS appears here in `head` as internal CSS. In production mode, this is a reference to a separate CSS file that Vite has hashed and renamed appropriately for cache-busting (see "[Eleventy + Vite = elite](/posts/2021/07/eleventy-vite-elite)" for more on that.)

And that was it.

## What the scripts do

As promised, here's an explanation of each entry in the `scripts` object in `package.json`, with some of them unchanged from before the conversion.

- `clean`---Deletes the contents of the `_site` output directory so you can be sure you're not using old content during a `testbuild` run (about which, more shortly).
- `start`---Sets the environment for development mode and uses the `npm-run-all` package to run `clean` and then, concurrently, the next two scripts.[^concurrently]
- `dev:eleventy`---Runs Eleventy to process templates and use its live server.
- `dev:vite`---Runs Vite in dev mode to handle "watched" assets.
- `build`---This is the aptly named command to run when you put the repo online. It sets the environment for production mode and uses `npm-run-all` to run `clean` followed by the next two scripts (*non*-concurrently this time).
- `prod:eleventy`---Runs Eleventy to generate the site's HTML.
- `prod:vite`---Runs Vite to cache-bust and bundle assets.
- `testbuild:bsync`---Runs Browsersync on port 5000, just as `eleventy-with-vite` ran serve on it, for the `testbuild` functionality (next script).
- `testbuild`---This is so you can be sure the site is building as it should **and** see the results **before** you push the changes to your host. It runs the `build` script to generate the site contents **and** then runs Browsersync so you can view them locally at `http://localhost:5000`. (However, it's not an *active*, "watched" build as in dev mode; *i.e.*, if you need to make changes in content or files, you'll want to stop and run `start` again for dev-mode editing.)

[^concurrently]: Speaking of "concurrently," the more observant may have noticed that this repo uses `npm-run-all`, rather than the [`concurrently` package](https://github.com/kimmobrunfeldt/concurrently) included in `eleventy-with-vite`. This is no slap at `concurrently`; it's just that I've gotten accustomed to `npm-run-all` and chose to use it, instead.

## Not a guide, but&nbsp;.&nbsp;.&nbsp;.

This post **isn't** what I mentioned in the previous piece when I said:

> I may have a follow-up post that delves into this more fully with actual code samples

.&nbsp;.&nbsp;. but I hope it will suffice for now. If you're curious about trying an Eleventy/Vite combo with a repo that's already got some sample content and Tailwind CSS (with JIT) working, now's your chance.
