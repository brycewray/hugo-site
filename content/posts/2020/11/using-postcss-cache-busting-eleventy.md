---
title: "Using PostCSS for cache-busting in Eleventy"
description: "Optimizing how browsers handle your site’s CSS, and why you should care about that."
author: Bryce Wray
date: 2020-11-10T16:30:00-06:00
lastmod: 2021-05-29T12:21:00-05:00
discussionId: "2020-11-using-postcss-cache-busting-eleventy"
---

**Important note, 2020‑12‑11**: After I initially published this, I ran into significant build-time problems with the method described herein, despite its first appearing to work just fine both locally and online. I briefly resorted to the method described in "[Simple 11ty cache busting](https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/)" by Rob Hudson before I found another solution, which I explain in "[Cache-busting in Eleventy, take two](/posts/2020/12/cache-busting-eleventy-take-two/)." I reluctantly recommend that you **not** follow the specific instructions in the article below. I will keep it here for informational purposes (at least, in understanding the importance of cache-busting) and for the sake of [transparency](/posts/2019/10/otoh/). **My apologies** to anyone who's run into trouble based on these recommendations as they originally appeared!
{.yellowBox}

Just when I thought I'd finished last year's "[dance](/posts/2019/12/sorta-strange-ssg-trip/)" among [static site generators](https://jamstack.org/generators/) (SSGs), it recently rose from the grave like a hockey-mask-wearing killer from a horror flick.

A few weeks ago, I reverted the site for a few weeks to its original SSG, [Hugo](https://gohugo.io).[^1] While the site is now back on my favorite SSG, [Eleventy](https://11ty.dev), those few weeks allowed me to learn of a particular Hugo capability I'd overlooked the first couple of times around.

Although I was very happy to get back to Eleventy, its lack of that one capability gnawed at me --- until I found a workaround. In this post, I describe the problem this capability solves; then I explain the method I chose to add the capability to Eleventy.

## Cache-busting your CSS, and why you should care about it

First, the problem.

Each time you visit a web page, its server sends your browser *requests* to download various items to your device for displaying the page. In addition to the [HTML](https://en.wikipedia.org/wiki/HTML), which could be different every time for some sites, the list includes so-called *static assets* --- image files and other usually unchanging things --- which are *not* expected to change all that often as long as their filenames remain the same. This is especially relevant in the case of [CSS](https://en.wikipedia.org/wiki/CSS), since it's common for at least some of the same CSS file(s) to be in play on multiple pages on a site.

That's why browsers typically are instructed to *cache* static assets, including CSS files. This means that a site's web server tells a browser to store *local* copies of such files so it'll use them as instantaneously as possible, leaving only the truly updated stuff, like the usually uncached HTML, for an actual download. After all, there's no point in making your browser download the same thing as you go from one page to another, or something that hasn't changed since the last time you visited the site. That simply slows down the process and downgrades your experience with the site.[^2]

Sounds great, right? Ahh, not so fast.

What happens when you make any changes in your site's CSS?[^3] Let's say your entire site's styling works off a file called `index.css`. What if you change that file's CSS --- making a background a different color, adjusting some spacing, *etc.* --- and then regenerate the site to the web? Many browsers won't "see" the changes, because the server's caching instructions tell them, "Hey, you already stored that site's `index.css` file in the past, so I'm not downloading it again."

Getting around that is called *cache-busting* --- the process of making a browser realize there's a reason for it to download the file again. In its simplest form, cache-busting means that, every time you change the file, you have to *give it a different name*.

Did you just say, "Whoa, that'll mess up my site because my HTML won't know it should point to that new name for the CSS," followed by "Whoa, that means I've gotta manually rename the CSS file *and* manually change the HTML reference to the CSS *every single time* I make any CSS changes"? If so, good for you. You've got the picture.

So let's get into how to handle this.

## Different SSGs, different cache-busting methods

Now, we begin to edge toward the solution.

An *asset pipeline* is how some software applications are "aware of" and process static assets for their purposes. The Hugo SSG has an asset pipeline, [Hugo Pipes](https://gohugo.io/categories/asset-management), that enables numerous features. There are two such features that I found extremely useful in my most recent use of Hugo:

- Its built-in support for [PostCSS](https://postcss.org), which allows an astounding set of capabilities, one of which is easy handling of things like the [Tailwind CSS](https://tailwindcss.com) that I've incorporated into this site.
- [Fingerprinting](https://en.wikipedia.org/wiki/Fingerprint_(computing)) --- Although there are numerous ways you can use fingerprinting, my main need for it was to practice cache-busting on my CSS.

After all: if you're using PostCSS, you're almost certainly [using Hugo Pipes to implement it](https://gohugo.io/hugo-pipes/postcss/), so why not simply use it also to fingerprint the CSS file every time you make a change? It was as simple as this in the `<head>` "partial" template in the Hugo version of my site (note that this is the [Go](https://go.dev) language on which Hugo templating depends):

```go-html-template
{{ $css := resources.Get "css/index.css" }}
{{ $css := $css | resources.PostCSS (dict "config" "assets/postcss.config.js" "inlineImports" true "outputStyle" "compressed") | fingerprint }}
```

That would produce a CSS file named something like this:

```bash
index.575f0a87ee2e4e24d8a061847ec508e1be27d95d0c16b717a4bd1f03a5c7e49f.css
```

But, again, that capability was built into Hugo. When I came back to Eleventy, I wondered how I could do the same thing in Eleventy, too.

## Cache-busting in Eleventy

### Build tools?

At this writing, Eleventy has *no* built-in assets pipeline --- and that's been on some users’ wishlists [for quite some time](https://github.com/11ty/eleventy/issues/272) --- which makes for problematic cache-busting. Smarter people than I have found ways to do it, most often by using external build tools like [webpack](https://webpack.js.org), [Parcel](https://parceljs.org), [Snowpack](https://snowpack.dev), [Gulp](https://gulpjs.com), and [Grunt](https://gruntjs.com).[^4]

Some of you will recall I did use webpack with Eleventy for a while, [as I mentioned almost a year ago](/posts/2019/12/packing-up/). However, a few months later, I [decided instead to "go solo"](/posts/2020/05/going-solo-eleventy/); *i.e.*, use Eleventy on its own without webpack or any other build tool.

While I still think that was a better choice, and it became even wiser once I [stopped doing local image processing](/posts/2020/07/transformed/), I briefly experimented with webpack once again on returning to Eleventy, as I tried to solve the cache-busting conundrum. Sadly, in my local testing, it turned out a *lot* had changed with webpack and its numerous dependencies and applicable plugins in just the last few months. I ran into enough errors, incompatibilities, and just general SNAFUs to make me run in terror from the whole thing.

I considered some of the other tools, too (after all, I'd already used Gulp during my [original tryout](/posts/2019/09/why-left-hugo-eleventy/) of Eleventy), but what I learned from a number of articles and forum comments indicated that, similarly, those tools weren't worth the trouble --- especially for *just* cache-busting my CSS. That's like using a nuclear weapon to kill a gnat.

### PostCSS Hash rides to the rescue

For days, I wracked my brain about it. Then, finally, I had an "Aha" moment, as I wondered: *Since I'm already using PostCSS to make Tailwind work (and would probably be using it even if I* weren't *using Tailwind), is there a way to use PostCSS for this?*

Bingo.

Within minutes, I'd found a PostCSS plugin (one of the [seemingly endless set thereof](https://github.com/postcss/postcss/blob/master/docs/plugins.md)) called **[PostCSS Hash](https://www.npmjs.com/package/postcss-hash)**; and, after an hour of dorking around with its configuration, I had my solution.

First, a word about *[hashing](https://en.wikipedia.org/wiki/Hash_function)*: in this case, it involves taking the contents of a CSS file and creating a series of random alphanumeric characters based on those contents. That series can then be used for any number of purposes --- in this case, to give the file a new name every time the file's contents change.

So, now, let me tell you fellow and sister Eleventy users how easy it is, with this setup, to cache-bust your CSS. (That's if you *are* using PostCSS, of course, which I highly recommend in any event.)

First, access your chosen command line interface (such as the macOS Terminal app) and install the plugin within your Eleventy project directory. If you use [npm](https://npmjs.com), the command to enter is `npm i postcss-hash --save-dev`; if you use [Yarn](https://yarnpkg.com), it's `yarn add postcss-hash --dev `.

Then, add the plugin to your `postcss.config.js` file. If you're happy to go with the defaults, that's as simple as adding `require('postcss-hash')` within your `plugins` object --- **but**, for an Eleventy site, you **must** specify the location of the *[manifest](https://en.wikipedia.org/wiki/Manifest_file)* that it produces. I'll explain why in a moment.[^5] In addition, there are other available options. For example, here's my entire `postcss.config.js` file as of this writing:

```js
const path = require('path')

module.exports = {
  plugins: [
    require('postcss-hash')({
      // algorithm: "sha512", // default = "md5"
      trim: 20,
      manifest: './_data/manifest.json',
      name: ({dir, name, hash, ext}) => path.join(dir, name + '-' + hash + ext)
    }),
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-preset-env')({ stage: 1 }),
    require('postcss-clean'),
  ],
}
```

Before I get to the `manifest`  option of the `postcss-hash` part, I'll note that:
- I didn't set the hashing `algorithm`, so it keeps the default of [MD5](https://searchsecurity.techtarget.com/definition/MD5) (Hugo's default is [SHA-256](https://en.wikipedia.org/wiki/SHA-2)). The documentation specifies a few other options you can set, but I find MD5 to be just fine.
- I chose to set `trim` at `20` (the default is `10`) so this plugin would give a slightly longer (and, thus, more distinct) hash "tail" to the CSS file's generated name. And, speaking of the name&nbsp;.&nbsp;.&nbsp;.
- The `name` setting makes sure that the generated CSS file comes out looking like, for example, `index-a1ee6657944e0c6d4080.css`. The default setting separates the original name, such as `index`, from the hash with a dot rather than a dash, and I just prefer the dash to the dot for this.

Those settings really don't matter; the defaults would work fine. **But**  the `manifest` setting is **critical** to making this work for you in Eleventy.

Simply put, you want to specify the location for the manifest file (`manifest.json` in this example) so your Eleventy templates can "find" it and obtain the right CSS filename. Otherwise, if you have your templates "looking for" `index.css` but the plugin has changed the real file name to a hashed version, that ain't gonna fly.

That means, for Eleventy purposes, it's critical to put this manifest file where the template **can** find it. If you *don't* specify the location, PostCSS Hash by default will put it in `manifest.json` at the project's top level; but the **best** place to put it is within the Eleventy project's *global data directory* ([specified](https://www.11ty.dev/docs/config/#directory-for-global-data-files) in its `.eleventy.js` configuration file and defaulting to a `_data` directory in the project's top level). Once you do that, it's super-easy to point the template to it, because *Eleventy makes that directory's contents available to your entire site*.

In my site's case, I use the `head.js` "partial" to give this entire site its `<head>` content, so I can finish this very easily:

```html
<link rel="stylesheet" href="/css/${data.manifest['index.css']}" type="text/css">
```

The `${data.manifest['index.css']}` part tells Eleventy, "Go to `_data/manifest.json`, find the value of its `index.css`  key, and insert the value here." In the resulting, Eleventy-generated HTML, the line shows up as (this is just an example, since the hash obviously will vary):

```html
<link rel="stylesheet" href="/css/index-a1ee6657944e0c6d4080.css" type="text/css">
```

.&nbsp; .&nbsp; .&nbsp;and it's all totally automatic.

Cool beans.

Better yet: the hash --- and, as a result, the generated name of the CSS file --- will stay the same until the next time you change the CSS file. So, while the CSS is unchanged, browsers *will* cache the file, thus loading your site more quickly. When you change the file and rebuild the site, this generates a *new* hash --- meaning, a new filename --- which "busts" each browser's cache so your revised CSS will load.

And *you* don't have to futz with it.

One more thing: if you're given to running your site through various online performance testing, you'll want to make sure your CSS's *caching headers* are set for maximum effect. You can set them pretty far ahead since, again, this process ensures any changes to the CSS will change the filename so that browsers will reload it. How you do such header-setting will depend on how your site's hosted. As of this writing, I'm using [Vercel](https://vercel.com), so I put the following in my site's `vercel.json` file (documentation about the cache-handling settings of which is available [here](https://vercel.com/docs/edge-network/caching)):

```json
{
  "build": {},
  "github": {
    "silent": true
  },
  "headers": [
    {
      "source": "/css/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=2678400"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=2678400"
        }
      ]
    },
    {
      "source": "/images/icons/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=2678400"
        }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=2678400"
        }
      ]
    }
  ]
}
```

The `2678400` setting means 2,678,400 seconds, which is thirty-one days --- *i.e.*, 3,600 seconds (one hour) &times; 24 &times; 31. That setting gets you good marks from just about any test and, more important, is kind to your visitors and their browsers! However, you can take it as high as you want, because cache-busting has your back.[^6]

## Busted

If external build tools are your preferred way of cache-busting your CSS in Eleventy, by all means, go with them, especially if you're already using them for other purposes; but, if you *don't* otherwise need such tools, the PostCSS Hash setup described here works just as well and with a lot less struggle with all the moving parts which come with using those tools.

Put it this way. Let's say you have to pop a balloon. You're given two choices for doing so: sticking it with a straight pin; and using a jackhammer on which someone has *attached* a straight pin. Each choice does the job, but using one is a *lot* easier. I know which I'd choose.

[^1]:	I did so for a variety of reasons, chief among them a wish for a simpler process where template-editing was concerned. I realized in the end that, were I to return to the [Nunjucks](https://mozilla.github.io/nunjucks/) templating I'd used in my initial months with Eleventy before [changing over to JavaScript-based templating](/posts/2020/04/full-11ty-js-monty/), that would almost completely solve the problem while allowing me to return to Eleventy. So that's what I did.

[^2]:	For a much more fun explanation of the importance of caching static assets, see "[How Enabling Caching Speeds Up Your Website](https://mightybytes.com/blog/enable-caching)."

[^3]:	While your site may actually use multiple CSS files, this article presumes you're handling it with just one CSS file, mentioned herein as `index.css`. The cache-related stuff applies to multiple CSS files just as it does to a single one.

[^4]:	Here are some of the more helpful related articles I found while researching the question: "[Our Cache Busting Setup on Eleventy](https://codsen.com/articles/our-cache-busting-setup-on-eleventy/)" by Roy Revelt; "[To Eleventy and Beyond](https://hacks.mozilla.org/2020/10/to-eleventy-and-beyond/)" by Stuart Colville; "[Simple 11ty cache busting](https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/)" by Rob Hudson; and "[Snowpack + Eleventy + Sass + PostCSS](https://zellwk.com/blog/eleventy-snowpack-sass-postcss/)" by Zell Lieu.

[^5]:	By the way: be sure you *do* track this file --- or, to put it another way, be sure you *don't* "[gitignore](https://git-scm.com/docs/gitignore)" it --- because the build process out on the web server needs to see it for all of this to work as it should. Trust me on this.

[^6]:	That `"github": {"silent": true}` part has nothing to do with the caching, of course, but it *does* keep Vercel from giving you a notification every time you rebuild your site, which is something I highly recommend if you watch your GitHub notifications the way I do mine. Consider it noise suppression.
