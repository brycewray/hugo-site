---
title: "Using Hugo Pipes with Cloudinary"
description: "DESCRIPTION TO COME."
author: Bryce Wray
date: 2023-07-15T13:04:28-05:00
draft: true
# initTextEditor: iA Writer # default --- change if needed
---

My [most](/posts/2023/04/better-code-image-processing-hugo) [recent](/posts/2023/05/better-code-image-processing-hugo-render-hook-edition/) posts about using the [Hugo Pipes](https://gohugo.io/hugo-pipes/) asset pipeline for [image processing](https://gohugo.io/content-management/image-processing/) rested on one assumption: you're willing to keep all your images in your Hugo project repository so they could serve as [page resources](https://gohugo.io/content-management/page-resources/). But what if you prefer to use third-party image processing, rather than Hugo's? Does that mean that all the coolness of Hugo-powered image processing is necessarily out of the picture? (So to speak.)

Oh, no. Oh, my, no. Quite the contrary.

<!--more-->

A couple of introductory notes about this post:
- The image-processing third party I'll be discussing is Cloudinary, the free tier of which I've used off-and-on for nearly three years now.
- I'll save space by assuming you've already read those earlier posts to which I linked above.

In correctly handling responsive images, it's important to know and specify the aspect ratio of each image and/or its surrounding `div`. In modern CSS, you do this through supplying the image's width and height. That's why my shortcode and render hook for using Hugo's image-processing powers both depended on Hugo's ability to detect a "resourced" image's width and height, thus automatically supplying the `.Width` and `.Height` parameters for use in code. So, when I would use a shortcode for Cloudinary's image processing rather than Hugo's, I'd have to provide the width and height manually; *e.g.*:

```go-html-template
{{</* imgc src="my-test-image_1920x1080.jpg" alt="A test" width=1920 height=1080 */>}}
```

Troublesome, but tolerable. However, it was a show-stopper for using a render hook --- as I've been handling most of my images since writing the related post a few weeks ago --- because Hugo allows sending only a small number of parameters to the hook, and I'd already run through that quantity.

So, when I began re-re-reconsidering using Cloudinary for the vast majority of the site's image processing, I knew I'd have to do one of two things: (a.) quit using that all-too-convenient render hook method (*i.e.*, revert to using a shortcode for each of my images); or (b.) figure out a way to make Hugo detect the width and height of remote images.

Implementing either option would require some degree of tedium, although a lot of it would be eased by good ol' search-and-replace. But only Option (b.) also included a nerdy puzzle to solve --- and, hey, I couldn't resist *that*, now, could I? So I didn't.

Unlike my luck with many other puzzles, nerdy and otherwise, my first guess proved to be the accurate one (although implementing it took some days of battling footguns in my code): *if Hugo Pipes could "see" the remote image as just another resource, it should be able to detect the image's width and height just as it would if the image were local*. After all, Hugo's been able to grab remote resources since the release of Hugo 0.90.0 in December, 2021.

I then had to implement this in three separate places:

- The render hook.
- The `imgc` shortcode, still necessary for a few specific images that require use of more parameters than I can feed the render hook.
- The partial template which auto-generates the CSS for each image's low-quality image placeholder (LQIP) and gradient image placeholder (GIP). That one was particularly tricky because it had to work with *both* Hugo-processed *and* Cloudinary-processed images.

So, without further ado, here is each, with minor changes to allow you to insert your own Cloudinary "cloud name":

{{< labeled-highlight lang="go-html-template" filename="render-image.html" >}}
{{</ labeled-highlight >}}

{{< labeled-highlight lang="go-html-template" filename="imgc.html" >}}
{{</ labeled-highlight >}}

{{< labeled-highlight lang="go-html-template" filename="head-imgs-css.html" >}}
