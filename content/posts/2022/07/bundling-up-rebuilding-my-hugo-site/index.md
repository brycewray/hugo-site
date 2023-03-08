---
title: "Bundling up: rebuilding my Hugo site"
description: "O ye new users, run as fast as you can — away from the way I was managing my content, and toward using page bundles, as I’m doing now."
author: Bryce Wray
date: 2022-07-23T16:53:00-05:00
#initTextEditor: iA Writer
---

You can think of this as hard-won wisdom.

If you're planning to build a website with the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG) --- **or** if you already have one but you don't yet have a lot of content files --- save yourself a lot of trouble and use *[page bundles](https://gohugo.io/content-management/page-bundles/)*.

Therein lies a tale, so here it is.

----

Not long ago, I began using Hugo's [`Text` filter](https://gohugo.io/functions/images/#text) to auto-generate the [social/OG image](https://css-tricks.com/essential-meta-tags-social-media/) for each of my posts, for those times when I promote a post on social media. For example: earlier this week, I tweeted about "[Really getting started with Hugo](/posts/2022/07/really-getting-started-hugo/)," and it looked[^imgNotStatic] like this:

[^imgNotStatic]: I'm using a screen capture, rather than doing my usual [static embed of the actual tweet](/posts/2022/06/static-tweets-hugo-update/), because that post's social/OG image has probably changed since then (I say, "probably," because it depends on Twitter's sometimes-slow-to-update image cache) and I want you to see how it originally looked.

{{< imgh src="tweet-1549447287625207809-from-2022-07-19-1233CDT_1190x1494.png" alt="Screen capture of tweet ID 1549447287625207809" phn="true" width=1190 height=1494 >}}

The next day, I got a [response](https://twitter.com/gaetawoo/status/1549779097978642432) from [@gaetawoo](https://twitter.com/gaetawoo) --- not about my post, but about that social/OG image:

> Do you auto generate the twitter card graphic?\
> <span class="pokey">3:31 PM • July 20, 2022 (UTC)</span>

<!-- https://twitter.com/gaetawoo/status/1549779097978642432 -->

As we spent a few minutes discussing via Twitter how I'd used Hugo to generate the image, I began to think of ways to make it better. After all, I already wasn't enamored with the `Text` filter's inability (at least, as of this writing) to let me control either the text's word-wrapping or its alignment.

Then, when @gaetawoo mentioned Hugo's [`Overlay` filter](https://gohugo.io/functions/images/#overlay) as an alternative (or maybe even for use **with** the `Text` filter), it hit me that this was the way to go. Rather than letting Hugo put text over the background gradient, I should just create a transparent *title graphic* with white text formatted as I wanted and then have Hugo overlay *that* on the gradient.

But it was easier said than done. I'd have to:

- Make a separate title graphic for each of my posts --- which amount to over 200 as of this writing.
- Change the site code to make Hugo select the right title graphic for each post and use `Overlay` to superimpose it on that standard background gradient image.

And this was going to take some doing. I was [keeping all my images in `assets/images/`](/posts/2022/06/responsive-optimized-images-hugo/). As for my content files: rather than using the page bundles approach, I'd always organized them as in this example:

```plaintext
.   <-- The Hugo project folder
└─ content
    └─ posts
        └─ 2022
            └─ 07
                └─ a-post.md
                └─ another-post.md
                └─ yet-another-post.md
```

. . . resulting in URLs at:

- `/posts/2022/07/a-post/`
- `/posts/2022/07/another-post/`
- `/posts/2022/07/yet-another-post/`

. . . which hadn't been a problem --- until now.

My initial plan was to name each title graphic based on the filename of its corresponding content file --- *e.g.*, a post file called `my-latest-post.md` would have a title graphic named something like:

`soc-OG-image-my-latest-post-1024x512.png`

Then, I'd write a loop that would, for each post, locate within `assets/images/` the title graphic that ended with the right filename.

A few hours later, I had the title graphics done and in `assets/images/`. But, when I tried to build the code to assign each post a title graphic of its own, I ran into some trouble. After hours of fruitless research into the problem, I [asked for help on the Hugo Discourse](https://discourse.gohugo.io/t/using-printf-with-resources-get/39642); that link points to my detailed description of what was going wrong.

In the end, it turned out that I'd simply (a.) fat-fingered a few of the title graphics' filenames and (b.) failed to *make* a few of the title graphics --- thus, Hugo couldn't always find what it was seeking and justifiably threw a fit.[^errorCatch] Once I had that resolved, the solution worked and I pushed it to the site.

[^errorCatch]: In case you're wondering, I did employ some degree of error-catching, but the messages I got back weren't very helpful. I could've coded --- and, in fact, did off-and-on during the debugging process --- so that Hugo simply worked around the errors and used another safe image rather than going postal on me; but I didn't want that fallback to occur, at least without my knowing why and being in better control of when it happened. Basically, I didn't want any post to use the fallback if it *did* have an appropriate title graphic.

But, during that process with the Discourse, I received [one bit of extremely sage advice](https://discourse.gohugo.io/t/using-printf-with-resources-get/39642/16) from Hugo expert and contributor [Joe Mooring](https://github.com/jmooring):

> Opinion: it would be less error-prone to use page resources for these OG images. Then you could use a generic name instead of having to match file names.

When I responded that this was a good idea if I were starting from scratch but not now, given my then-current content management scheme, he [doubled down](https://discourse.gohugo.io/t/using-printf-with-resources-get/39642/18?):

> Use [leaf bundles](https://gohugo.io/content-management/page-bundles/#leaf-bundles).
> {{< highlight plaintext "linenos=false" >}}
 content/
 └─ posts/
    └─ 2022/
        └─ 07/
            ├── my-first-post/
            │   ├── index.md
            │   ├── og.png
            └── my-second-post/
                ├── index.md
                ├── og.png
{{< /highlight >}}

And, although I then gave a (weak) rejoinder that this also was "in the category if I were starting over, rather than 200+ posts into my current setup," he'd gotten me to thinking --- about not only the current headache but also, perhaps in time, others that might come about if I didn't take his advice. I'd actually considered going with page bundles before but, in the absence of resulting problems, hadn't bothered. Now, I saw, there *were* potentially site-hobbling potholes to be encountered from not proceeding in that direction.

So, just a few hours after I had my *original* plan working, I created a new branch, `pagebundles`, and proceeded to rebuild my site exactly that way. For example, this post you're reading now is arranged as follows:

```plaintext
.   <-- The Hugo project folder
└─ content
    └─ posts
        └─ 2022
            └─ 07
                └─ bundling-up-rebuilding-my-hugo-site
                    └─ 2022-07-23-sample-title-with-gradient_1024x512.jpg
                    └─ index.md
                    └─ title.png
                    └─ tweet-1549447287625207809-from-2022-07-19-1233CDT_1190x1494.png
```

In other words:

- The post is generated by a *folder* with its name and a resident content file called `index.md`, **rather than** from a Markdown *file* by that name within `content/posts/2022/07/`.
- Also within that folder, serving as *[page resources](https://gohugo.io/content-management/page-resources/)* for this post, are:
	- `title.png`, the title graphic.
	- The two other graphics files specific to the post. You already saw one earlier, while the other is further down.

The key is that, now, *every* post on the site contains a file called `title.png`, which is its title graphic. As a result, as Mooring correctly suggested would occur, it was a piece of cake to code my `head.html` partial to handle this:

```go-html-template
	 {{/*
	   (Earlier, I'd defined `$socImg`
	   as the site's fallback image,
	   such as is used by the home page
	   and the HTML sitemap.)

	   Now, we make a `with-else` loop
	   that uses the `title.png` file
	   **if** it exists. (If not, it
	   does nothing and `$socImg` is
	   still the fallback image.)

	   Because `title.png` is a page resource,
	   we use `.Page.Resources.GetMatch`.
	 */}}
	 {{- with .Page.Resources.GetMatch "title.png" }}
		{{- $titleImg := . -}}
	 {{/*
	   Having obtained that `title.png`
	   (if we can), we overlay it across the
	   site-wide gradient/logo image ---
	   which, **because** it is site-wide,
	   remains in `assets/images/`, so we
	   obtain it with `resources.Get`.
	 */}}
		{{- $finalFilter := (images.Overlay $titleImg 0 0 ) -}}
		{{- $socImg = resources.Get "images/social-OG-w-BW-logo_1024x512.jpg" -}}
		{{- $socImg = $socImg | images.Filter $finalFilter -}}
   {{- else -}}
		{{- /* $socImg remains fallback image */ -}}
	 {{- end }}
	 {{/*
	   Finally, with `$socImg` set (either
	   our desired gradient-with-the-title
	   or, if needed, the generic fallback),
	   we use it as our social/OG image.
	 */}}
		<meta name="og:image" content="{{ $socImg.Permalink }}" />
		<meta name="twitter:image" content="{{ $socImg.Permalink }}" />
```

For this post in particular, that generates a social/OG image like this:

{{< imgh src="2022-07-23-sample-title-with-gradient_1024x512.jpg" alt="Sample title graphic for this post, with text o and the site’s “BW” logo" width=1024 height=512 >}}

That's the result of overlaying this post's `title.png` file over the site-wide gradient/logo graphic.

My work done, I merged `pagebundles` into `main` and, *voilà*, the site was in Page Bundles City.

----

So, children, the moral of this story is:

- Build your Hugo site with page bundles.
- If you've already built your site *without* page bundles, seriously consider rebuilding it *with* them. Note that you can do it gradually, one post at a time; I simply chose to get it over with and do it all at once.

Otherwise, someday, you'll wish you had. Don't wait until you have hundreds of pages, or more, that you have to retro-fit into this method.

Or, to be even shorter: **don't** be like me.
