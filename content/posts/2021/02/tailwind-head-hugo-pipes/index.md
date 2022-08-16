---
title: "Tailwind-to-head with Hugo Pipes"
description: "If your website draws that “render-blocking resource” gripe during tests, here’s one method for fighting it."
author: Bryce Wray
date: 2021-02-02T16:25:00-06:00
lastmod: 2022-07-22T21:46:00-05:00
discussionId: "2021-02-tailwind-head-hugo-pipes"
---

**Note**: For a [Eleventy](https://11ty.dev)-based solution, see "[Tailwind-to-head with Eleventy](/posts/2021/03/tailwind-head-eleventy/)" from a few weeks later.
{.yellowBox}

External *vs.* internal --- that is the question. At least, it is when you're considering how and where to provide CSS in your website.

Among the CSS *cognoscenti*, there are endless debates about whether your site's CSS should be in one or more separate files (external) or included in `<style>` tags in each page's HTML `<head>` (internal). One can make a good case for either position, but the internal method *can* obtain better performance scores because it [eliminates at least one render-blocking resource](https://web.dev/render-blocking-resources/).

This post isn't here to tell you whether one's firmly better than the other, since the final answer varies from one website to another. However, in case you build your website with the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG) and want to try incorporating internal CSS into that site, this post *will* explain how to do that with Hugo's built-in **asset pipeline**[^assetPipeline], [Hugo Pipes](https://gohugo.io/hugo-pipes/). To be more specific, it'll explain how to do that if you're using the increasingly popular [Tailwind CSS](https://tailwindcss.com) framework. I'll also throw in one extra tip for those of you not into the Tailwind scene.

[^assetPipeline]: My quick-’n’-dirty definition of an *asset pipeline* is that it allows an app or a software framework to connect with other items, usually files of some sort, so it can incorporate them as seamlessly as possible into whatever it's doing. In the case of an SSG app like Hugo, that means bringing in those other items into websites it builds.

## Goin’ to the `<head>` with Tailwind

This example assumes you already have both Tailwind CSS and [PostCSS](https://postcss.org) working successfully, with the `postcss.config.js` file and your main CSS file --- called `index.css` in the example --- in the proper places in your Hugo project. (I also suggest, although some will disagree, that you set the project's `package.json` so that, even during development, the [Node.js](https://nodejs.org) required by Tailwind and PostCSS is in **production** mode. Otherwise, the [PurgeCSS](https://purgecss.com) functionality built into Tailwind since v.2.0 won't be running and, thus, the CSS that ends up in your HTML's `<head>` will be massive.)

**Note**: I purposely am **not** straying into the whole realm of [separating your CSS into critical and non-critical segments](https://web.dev/extract-critical-css/), which is well beyond the purposely limited scope of this post --- **except** to say that, if you're properly using PurgeCSS with Tailwind, your resulting CSS probably is small enough that it essentially makes the whole question moot. At least, that's been my experience when using Tailwind and PurgeCSS on both the Hugo and [Eleventy](https://11ty.dev) SSGs.
{.yellowBox}

To let you see clearly the differences between doing this as external CSS and doing it as internal CSS, here is a sample of each. First, **external**:

```go-html-template
	{{ $css := resources.Get "css/index.css" }}
	{{ $css := $css | resources.PostCSS (dict "config" "assets/postcss.config.js" "outputStyle" "compressed") | fingerprint }}
```

.&nbsp;.&nbsp;. and then, **internal**:

```go-html-template
	{{ with resources.Get "css/index.css" | resources.PostCSS (dict "config" "assets/postcss.config.js" "outputStyle" "compressed") }}
		<style>{{ .Content | safeCSS }}</style>
	{{ end }}
```

## SCSS, anyone?

Finally, as a bonus, here's how you do it if you prefer to use [SCSS](https://sass-lang.com) (for which Hugo Pipes has its own out-of-the-box capabilities, not requiring either PostCSS or Node.js) rather than Tailwind CSS. As before, **external** first:

```go-html-template
	{{ $options := (dict "targetPath" "css/index.css" "outputStyle" "compressed" ) }}
	{{ $css := resources.Get "scss/index.scss" | resources.ToCSS $options | fingerprint }}
```

.&nbsp;.&nbsp;. and then, **internal**:

```go-html-template
	{{ with resources.Get "scss/index.scss" | resources.ToCSS (dict "outputStyle" "compressed") }}
		<style>{{ .Content | safeCSS }}</style>
	{{ end }}
```

Whichever way you roll on each choice above --- external *vs.* internal, Tailwind/PostCSS *vs.* SCSS --- here's hoping this is useful information for you Hugo aficionados.
