---
title: Picture perfect?
subtitle: "With SSGs and images, it’s “location, location, location”"
description: "Image-related items to consider when structuring your SSG-powered site."
author: Bryce Wray
date: 2019-10-20T19:00:00-05:00
lastmod: 2019-10-21T14:05:00-05:00
discussionId: "2019-10-picture-perfect"
featured_image: camera-nikon-f-733546_2816x2112.jpg
featured_image_width: 2816
featured_image_height: 2112
featured_image_alt: "Antique Nikon F camera in subdued light on a windowsill"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/belseykurns-926746/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=733546">Kelsey Burns</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=733546">Pixabay</a></span>
---

When I [was](/posts/2019/07/why-staying-with-hugo) [railing](/posts/2019/07/lessons-learned) [against](/posts/2019/09/why-left-hugo-eleventy) the [Gatsby](https://www.gatsbyjs.org) [static site generator](https://www.staticgen.com) (SSG)---that is, before I decided [yet again](/posts/2019/10/otoh) to give it a shot, which is continuing in the background now---one of the things I found most annoying was how it wouldn't let me put images just anywhere I pleased within the site's directory structure.

I won't take you back through the whole rant, especially since I linked above to the extended-length posts that contained its component parts, but here it is in TL;DR form:

> "Ah been buildin' websites since the days of Abe Lincoln, by jingo, and Ah'm used to puttin' images in an `/images` folder at the top level and accessin' them from there from any dang web page Ah build. If Ah cain't do that no more, this Gatsby whipper-snapper can kiss mah grits. *[Now pardon me, sonny, while Ah go spit my tobacky juice.]*"

.&nbsp;.&nbsp;. so you can well imagine the shock my *hubris* took when I learned that an insistence on where images should go **isn't** just a Gatsby requirement. It's even a [Hugo](https://gohugo.io) requirement, not to mention a requirement for the Gatsby near-beer, [Gridsome](https://gridsome.org). It all depends on how you want the site to perform where those images are concerned.

If you're thinking about getting into the whole static-site thing and are wondering how you'll set it up when you do, give me just a few moments of your time while I explain what I learned. Perhaps it'll save you some steps---or, at the very least, explain why you should arrange some content in ways you might not've originally planned.

## Monkey no see, monkey no do

First off, let me explain the thing that threw me for a loop where Gatsby and images are concerned: under most circumstances, it wants you to put them in the same directory ("folder") as content. Back when I simply dropped images files into one big top-level `images` folder and Markdown files into another[^dirSet]---after which I'd let my SSG of the moment handle them pretty automatically---I found this limiting. Surely I wasn't going to have to start having to keep my images and Markdown files in the same directory?

[^dirSet]: Well, within limits. What I did with the site posts was to put them all in month-based folders; for example, this one would go in `/posts/2019/10` and then appear as `/posts/2019/10/picture-perfect`. Still, the point is: I wasn't putting Markdown files in the same folders with their images.

Oh, the humanity.

To be sure, if you "hold your mouth right," you *can* make both [Gatsby](https://www.gatsbyjs.org/docs/static-folder/) and [Gridsome](https://gridsome.org/docs/images/) show images that don't have a [relative path](https://www.coffeecup.com/help/articles/absolute-vs-relative-pathslinks/) from the content that references them. Same with Hugo.

*But* .&nbsp;.&nbsp;.

You do so at a price.

You see, these three SSGs can do some pretty cool image processing if you keep images where each SSG wants to "see" it. And *only* if you do that. That's what I didn't yet know when I started this research and experimentation months ago.

Want proof? (If you want details on the specific items involved, please follow the links.)

- **Gatsby**: "[If any of the \[image\] paths used do not resolve to a file\[,\] Gatsby will not create child nodes, instead leaving the \[path\] value as a string](https://www.orangejellyfish.com/blog/a-comprehensive-guide-to-images-in-gatsby/)."

- **Gridsome**: "[Only local, relative image paths will be compressed by Gridsome](https://gridsome.org/docs/images/)."

- **Hugo**: "[The `image` is a Page Resource, and the \[image\] processing methods listed below does not work \[sic\] on images inside your `/static` folder](https://gohugo.io/content-management/image-processing/)." 

## Where's the fire, buddy?

Okay, so what's so great that they can do with those images if you *do* follow those placement requirements? As it turns out: plenty.

### Auto-creation of thumbnails

If you're coming to the SSG world from WordPress, you may have become used to how, when you drop images into the WordPress Media Library, it automatically creates thumbnails of them to allow for serving smaller versions where appropriate (such as to a small-screen device).

Each of these three SSGs can do that, too, albeit with some settings from you. However, the "some settings from you" part is good, because it allows you to tailor the results to what makes the most sense for your particular use case rather than accepting a cookie-cutter solution like that of WordPress. Then, the SSG serves the appropriate size for the particular view operation (in Hugo, this requires [a little more work](https://gohugo.io/content-management/image-processing/#image-processing-examples)).

### Smart lazy loading, and with cool effects

Many people view the web under less-than-ideal conditions, so it's best not to serve *everybody* big-a$# images, or all the images on your page, from the get-go.

Intelligent *lazy loading*, which means loading only those images that actually need to appear based on what the person is actually scrolling up on screen at the time, is built into Gatsby's `gatsby-image` and Gridsome's `g-image` components.

But it gets even better.

How about if the SSG also creates a tiny-file-size blurred version of the image, which then acts as a full-height-and-width placeholder while the real image is loading, and then magically turns it into the real image once the load is complete? You've doubtless seen that effect on [Medium](https://medium.com)-related sites, among others. Both Gatsby and Gridsome do that.[^gatsbyImage]

[^gatsbyImage]: Indeed, this functionality was a key to keeping me trying to convert to Gatsby despite my [various](/posts/2019/07/why-staying-with-hugo) [troubles](/posts/2019/09/why-left-hugo-eleventy) in doing so.

Hugo doesn't do either of these out of the box, but you can add to your Hugo site an excellent external JavaScript tool called [**lazysizes**](https://github.com/aFarkas/lazysizes), which---especially if used with its optional plugins---offers many of the same capabilities. In fact, if your SSG is anything besides Gatsby or Gridsome, I'd highly recommend using lazysizes to make the best of your images.

## Can't I just pre-optimize?

If you're an old-school web geek such as I, remembering the days when such capabilities didn't exist, you might be wondering, "Why can't we just do what we used to do, which is to process the images *ourselves* beforehand in our image editors of choice?"

The answer to that is, of course: you absolutely **can**. And many still do. It's just that, this way, you don't have to do so.

Since even my little old site already has quite a few images onboard and that number will only grow with time, I'm more than happy to let the SSG take care of as much of it as possible. There are only so many hours in one's day, and not having to spend time converting every site image to a sixty-percent-quality progressive JPEG (or whatever) is a relief.