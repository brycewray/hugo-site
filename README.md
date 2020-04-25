# Repo for brycewray.com

This is the repository from which the [Hugo](https://gohugo.io)-generated version of [brycewray.com](https://brycewray.com) is built. Please note that this is just as an example; the **real** site is done in a combination of [Eleventy](https://11ty.dev) and [webpack](https://webpack.js.org).

## Not a starter kit, but&nbsp;.&nbsp;.&nbsp;.

While this is a Hugo version of the actual site&rsquo;s repo rather than a starter version thereof, you can turn it into the latter by doing the following:

1. Clone it to a local repo.
2. Make appropriate changes to `/data/metadata.json`.
3. Delete the Markdown files from `/content/**/.*` and the images from `/static/images/` (well, maybe you should keep one or two of each around at the start, until you see how things work).

## What&rsquo;s under the hood

For Hugo users unused to dealing with JavaScript from [npm](https://npmjs.org) plugins and dependencies, this repo may not be your cup of tea, and that&rsquo;s perfectly understandable. However, if you&rsquo;re willing to take a trip to the npm Dark Side, it does offer some interesting add-on possibilities. (That said, Hugo&rsquo;s single-binary, nearly-everything-out-of-the-box approach has served it well and is impressive.) In `package.json` you&rsquo;ll find dependencies and scripts to allow the following:

- [PostCSS](https://postcss.org) for, among other things, transpiling my CSS for easier consumption — even for obsolete browsers (looking at you, IE). Of course, [this can be loaded easily in Hugo due to the Hugo Pipes feature](https://gohugo.io/hugo-pipes/postcss/), but PostCSS is still JavaScript and so this part remains necessary, too.
- Web &ldquo;fonts&rdquo; &mdash; Specifically, the [Public Sans](https://public-sans.digital.gov) Web &ldquo;[font](https://brycewray.com/posts/2018/10/web-typography-part-2/)&rdquo; for all non-code text and [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) for code and code blocks. In my real site repo, a separate webpack installation handles this. For this repo, I downloaded the needed files from Google Fonts and put them in `/static/fonts/`, from which they're accessed by `/assets/css/fonts.css`.
- [Webmentions](https://indieweb.org), enabled through `/assets/js/webmentions.js` (called in the dev process by `npm run start` or `npm run build`, both in the `package.json` file). This file is adapted from my real Eleventy/webpack repo&rsquo;s webmentions-handling code &mdash; for which you can thank superb articles and code by [Max Böck](https://mxb.dev/blog/using-webmentions-on-static-sites/) and [Sia Karamalegos](https://sia.codes/posts/webmentions-eleventy-in-depth/). Any flaws you find in my code are mine alone, of course.

<hr />

For more information about the thinking behind this repo as well as a similar, [Gatsby](https://gatsbyjs.org)-generated version of the site, please refer to “[Different modes for different code](https://brycewray.com/posts/2020/04/different-modes-different-code).”