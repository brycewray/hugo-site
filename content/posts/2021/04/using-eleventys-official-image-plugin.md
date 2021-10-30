---
layout: singlepost
title: "Using Eleventy’s official image plugin"
subtitle: "Save time and trouble with this intro and code"
description: "The what, why, and how of Eleventy Image."
author: Bryce Wray
date: 2021-04-17T13:41:00-05:00
lastmod: 2021-10-19T16:38:00-05:00
discussionId: "2021-04-using-eleventys-official-image-plugin"
featured_image: "camera-lens-color-bkgd-theregisti-TduXmZMD2uQ-unsplash_6000x4000.jpg"
featured_image_width: 6000
featured_image_height: 4000
featured_image_alt: "Close-up photo of camera lens with colorful mood lighting"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@theregisti?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">TheRegisti</a>; <a href="https://unsplash.com/s/photos/camera-lens?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

It's been about a year since the first release of [Eleventy](https://www.11ty.dev)'s official image-processing plugin, [Eleventy Image](https://www.11ty.dev/docs/plugins/image/), but only in the last day or so have I given any serious thought to using it.

That's certainly not because I had any doubt about its quality.

After all, Eleventy Image comes directly from Eleventy's creator, [Zach Leatherman](https://zachleat.com). Who better than he would know how to write a superior plugin for his own [static site generator](https://jamstack.org/generators) (SSG)?

Rather, it was because I found the plugin's documentation, and the few blog posts I found about using the plugin, somewhat less than approachable for those who don't eat, sleep, and breathe things like, say, JavaScript [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

Then, last night, I finally decided to give it a try and, shortly before midnight, I'd successfully installed it to my satisfaction on my four [Eleventy starter sets](/posts/2021/03/beginners-luck-update).[^whyNotHere] [^imgXfm]

[^whyNotHere]: I don't use it on this site, however, because I [let Cloudinary process this site's images](/posts/2020/07/transformed). While Eleventy Image definitely can work with images served from other locations besides your site, and although I greatly admire the elegance and features of Eleventy Image, it can't begin to match all the image-transformation capabilities you can [pack into a Cloudinary URL](https://cloudinary.com/documentation/image_transformations#transformation_url_syntax).

[^imgXfm]: Adding Eleventy Image to these starter sets allowed me finally to relieve them of my bespoke `imgxfm.js` file---which, although it worked well enough, delayed each build for a few seconds. For those who've used `imgxfm.js` in the past with any of my starter sets, I highly encourage you to upgrade to the latest and greatest so you can unburden yourself from that sludge. On the other hand, for any masochists out there who still are interested in the `imgxfm.js` code but don't have it, [let me know](/contact) and I'll provide it.

Now that I've gone through that, I offer this post in the hope of making it simpler for even new Eleventy users to understand Eleventy Image. After all, if **this** old fart can, so can you.

Let's break it down to three simple questions:<br />
"What?" "Why?" "How?"

## What is Eleventy Image?

One of Eleventy's great strengths is how readily you can expand it, through plugins and other adaptations, to do more, work better, and fit your needs. The Eleventy Image plugin is a particularly apt example thereof. Built atop the super-fast and flexible [sharp](https://github.com/lovell/sharp) image processor[^sharpToo], Eleventy Image takes image files you "feed" it and turns them into files that are smaller and more efficient. This makes it easier to serve images that work better with your visitors’ respective devices and connections.

[^sharpToo]: Since I'd built `imgxfm.js` (see the previous footnote) on sharp, I already knew I was going to like Eleventy Image once I did finally understand it well enough to use it.

So what? Well&nbsp;.&nbsp;.&nbsp;.

## Why do you need Eleventy Image?

One answer to that is: you don't, **if** you're willing to do all that image processing on your own. Certainly, that's quite possible. You can do it in Photoshop, or Affinity Photo, or GIMP, or what-have-you. But that takes a **lot** of time and work. And, even if you're not worried about that part, you may not be **able** to save files in the space-saving [WebP format](https://developers.google.com/speed/webp) now accepted by most modern browsers.[^webP]

[^webP]: I discussed this in last year's "[So much for heroes](/posts/2020/02/so-much-for-heroes)."

Another answer is: you don't, **if** you don't care about how your visitors experience your site. If you're fine with every visitor getting the exactly same image file regardless of the visitor's screen size or connectivity quality, then just put up one version of each image and be done with it.

But that's really not cool, y'know.

On the other hand, Eleventy Image handles all of this for you, automatically and extremely quickly, every time you build your site.

Now that you know what Eleventy Image is and why it's a great thing to have, let's get to actually using it.

## How do you use Eleventy Image?

### Install it

First, let's install Eleventy Image in your Eleventy project.

**Install the plugin package**. In your chosen OS's terminal interface, enter the command `npm i -D @11ty/eleventy-img`. This will install (`i`) the plugin package as a development dependency (`-D`).

**Configure Eleventy to use Eleventy Image**. Now that the plugin package is installed, you'll tell Eleventy that it's there by going into the project's `.eleventy.js` configuration file---preferably at the top, **before** you get into the file's `module.exports` statement (about which we'll talk soon)---and adding the line:

```js
const Image = require("@11ty/eleventy-img")
```

That tells Eleventy that, when we refer to `Image` (note the capital "I”) from here on, we're talking about the Eleventy Image plugin package.

Keep that `.eleventy.js` file open for editing, as we move to the next step.

### Create a shortcode for it

Now that Eleventy knows it has Eleventy Image in its quiver, you can create a [shortcode](https://www.11ty.dev/docs/shortcodes/) to simplify using this tool when you write [Markdown](https://daringfireball.net/projects/markdown) for your site content.

Configurations can vary from user to user, but a more-or-less standard `.eleventy.js` file keeps its main configuration in a `module.exports` statement:

```js
module.exports = function (eleventyConfig) {
  // Typical configuration fits
  // in this area and can go on
  // for as long as necessary
}
```

.&nbsp;.&nbsp;. so let's go into that in-between area where I put those comments, above, and create an `image` shortcode (note the lower-case "i”) by adding the code shown below.

**Update, 2021-04-28**: Due to a problem reported to me by a user of one of my [starter sets](/posts/2021/03/beginners-luck-update), I swapped out the code that previously was here with code that is based on *synchronous*, rather than *asynchronous*, usage. To read more about the difference, see [this section](https://www.11ty.dev/docs/plugins/image/#synchronous-usage) of the Eleventy Image documentation. I've also updated those starter sets accordingly.
{.yellowBox}

```js
  // --- START, eleventy-img
  function imageShortcode(src, alt, sizes="(min-width: 1024px) 100vw, 50vw") {
    console.log(`Generating image(s) from:  ${src}`)
    let options = {
      widths: [600, 900, 1500],
      formats: ["webp", "jpeg"],
      urlPath: "/images/",
      outputDir: "./_site/images/",
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src)
        const name = path.basename(src, extension)
        return `${name}-${width}w.${format}`
      }
    }

    // generate images
    Image(src, options)

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    }
    // get metadata
    metadata = Image.statsSync(src, options)
    return Image.generateHTML(metadata, imageAttributes)
  }
  eleventyConfig.addShortcode("image", imageShortcode)
  // --- END, eleventy-img
```

For each image file you "feed" this shortcode in your Markdown (we'll explain that part next), it will create new files with:

- The sizes (in pixels) listed in the `widths` array. I used sizes ranging from 600 to 1,500 pixels because that's my preference; but you can enter whatever combination works for you, especially if you have any data about your most frequent visitors’ screen sizes.
- The file formats listed in the `formats` array. Here, we're specifying both WebP and JPEG formats because that covers you with virtually every browser out there.[^inOut]

[^inOut]: For more details on the file formats Eleventy Image can accept (input) and create (output), see [its documentation](https://www.11ty.dev/docs/plugins/image/).

 **Additional note, 2021-04-25**: If you have a *lot* of images you'll be running through this process, you'd best keep the `widths` array short, since more entries in `widths`---and, for that matter, `formats`---will result in even more files that Eleventy Image will have to create at build time. That can result in not only an extremely slow build but also, for local builds, a suddenly very hot CPU on your computer. Play with this over time and see what combination of image quantity, `widths` options, and `formats` options will work best for your project.
 {.yellowBox}

The setting for `urlPath` tells your site's pages to think of these images as being located in the site's `/images/` folder; and the `outputDir` setting tells Eleventy Image to copy them to the right location to make that work (given the standard Eleventy output directory of `./site`).

**Note**: The Eleventy Image documentation's ["Use this in your templates" section](https://www.11ty.dev/docs/plugins/image/#use-this-in-your-templates) has other examples you may prefer.
{.yellowBox}

Now, let's get this show on the road.

### Use your new shortcode

Let's say you keep your Eleventy project's original image files (the ones the `image` shortcode will process) in an `images` folder that's within a top-level `src` folder---*i.e.*, `./src/images/`. Let's also say that the image file you want to pop into a post you're writing is called `my-pet-cat.jpg`. So type this in your post's Markdown file:

```md
{% image "my-pet-cat.jpg", "Photo of a cat named Shakespeare sitting on a window sill" %}
```

Here, you've entered what the shortcode considers the `src` part ("my-pet-cat.jpg"; the code automatically adds `./src/assets/images/` to it so **you** don't have to type it every time you use the shortcode), then a comma, and then the `alt` text ("Photo of a cat named Shakespeare sitting on a window sill") for [screen readers](https://accessibility.its.uconn.edu/2018/08/22/what-is-a-screen-reader-and-how-does-it-work/). The `src` location should be based on wherever `.eleventy.js` is, since that's where the shortcode resides as well; and, typically, that's the top level of an Eleventy project. As you know, the `alt` text describes for [screen readers](https://accessibility.its.uconn.edu/2018/08/22/what-is-a-screen-reader-and-how-does-it-work/) what the image contains. **You must enter that `alt` text** if you want the shortcode to work properly---the `image` shortcode requires both `src` and `alt` to work, as you may have noted in the shortcode's configuration in `.eleventy.js`. If an image is only [decorative](https://www.w3.org/WAI/tutorials/images/decorative/) (*e.g.*, a logo or other image that fits that description), it's perfectly acceptable for the `alt` to be just `""`, but you **must** have an `alt` entry after the `src` and that separating comma.

### Get a look at the result

Now, just build your site, and Eleventy Image will do its magic everywhere within your site that you're using the `image` shortcode. For example, here's the code the shortcode above could generate:

```html
<picture>
  <source type="image/webp" srcset="/images/my-pet-cat-600w.webp 600w, /images/my-pet-cat-900w.webp 900w, /images/my-pet-cat-1500w.webp 1500w" sizes="(min-width: 1024px) 100vw, 50vw">
  <source type="image/jpeg" srcset="/images/my-pet-cat-600w.jpeg 600w, /images/my-pet-cat-900w.jpeg 900w, /images/my-pet-cat-1500w.jpeg 1500w" sizes="(min-width: 1024px) 100vw, 50vw">
  <img src="/images/my-pet-cat-600w.jpeg" width="1500" height="1125" alt="Photo of a cat named Shakespeare sitting on a window sill" loading="lazy" decoding="async">
</picture>
```

.&nbsp;.&nbsp;.&nbsp;and the result thereof:

{{< imgc src="my-pet-cat_3264x2448.jpg" alt="Photo of a cat named Shakespeare sitting on a window sill" width="3264" height="2448" >}}

**Disclaimer**: Image is sourced from Cloudinary (without using Eleventy&nbsp;Image) whenever the site is built with a non-Eleventy&nbsp;SSG, **but** this does show the result of the generated&nbsp;code.
{.imgcCaption}

Of course, you'll want to get a sneak peek by running Eleventy in development mode and viewing your site locally, in case you need to adjust your site's CSS so each resulting image appears as you want.[^sizesInfo]

[^sizesInfo]: You also can go back into the shortcode's definition in `.eleventy.js` to adjust the `sizes` parameter so that it works better with your site's unique layout. See [MDN's thorough explanation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) of how the `sizes` setting in CSS affects images’ appearances.

## Go ye forth and process

Sometimes, I wonder what topic I should explore next when writing for this site. More often than not, it comes out of my own search for knowledge and a frustration with how much time and aggravation a particular search required. That certainly was the case with this post. I'd grown weary of trying to get my head around Eleventy Image from what sources I'd located thus far. So, when I did finally sort of "get" it last night, I knew what my next subject would be.

Eleventy Image will only get better in the future---for all I know, Zach Leatherman may even be planning to put it in Eleventy "core" at some point---but there's no reason to wait. If you have an Eleventy site and want a simple and effective way to handle your site's images, use this post as a stepping stone on the way to using Eleventy Image and understanding what it can do for you.
