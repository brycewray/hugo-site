---
layout: layouts/posts/singlepostherofit.njk
tags: post
title: "Transformed"
subtitle: "The move to Cloudinary"
description: "Getting a big burden off my shoulders—and my site-build workflow."
author: Bryce Wray
date: 2020-07-31T16:15:00-05:00
lastmod: 2020-10-05T08:15:00-05:00
discussionId: "2020-07-transformed"
featured_image: cinema-film-images-photography-64154_2806x1984.jpg
featured_image_width: 2806
featured_image_height: 1984
featured_image_alt: "Strips of photographic film positives with colorful landscape images"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/geralt-9301/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=64154">Gerd Altmann</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=64154">Pixabay</a></span>
---

{{% yellowBox %}}**Update, 2020-08-05**: If what you see herein makes you want to try Cloudinary, I request that you use [this invitation link](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/dqunpyaeqiizezj6lbdu). **Full disclosure**: I will receive additional Cloudinary credits for each person who uses that link and subsequently enrolls with Cloudinary, even if only for the same ultra-generous free tier I describe in this post. Thanks in advance! *(The opinions herein are strictly my own and I was not compensated for them; the Cloudinary team provided this link to me **after** seeing what I'd already written.)* {{% /yellowBox %}}

This is about what one might call a transformative process.

Until just a few days ago, any image you saw anywhere on this site was coming to you from the very same place as the rest of the content. While that made sense in the site’s beginning nearly two years ago, when its number of images could be counted on the fingers of one hand, by now it had become a major hassle.

But all that’s changed.

I’ve followed plenty of good advice on the web and offloaded my images to [Cloudinary](https://cloudinary.com). And, by “offloaded,” I don’t mean just the *storage* of the images themselves; I also mean all the [optimizing](https://dev.to/giladmaayan/how-to-optimize-images-for-the-web-without-losing-quality-g2a) that they require.

## How we got here

This all started with some nerdy fun on my part that soon got out of control.

While I am *by no means* mechanical, I fully get how those who *are* can spend hours of their own time tinkering with a beloved old vehicle, trying to get it to run as if it were new.

You see, this is similar to how I feel when I have a challenge with the code behind this website. It can be aggravating getting to the solution but, truth be known, the journey there is (mostly) enjoyable.

Such was the case, [earlier this year](/posts/2020/05/going-solo-eleventy), when I ended this site’s five-month reliance on [webpack](https://webpack.js.org) in favor of letting [Eleventy](https://11ty.dev) carry the load alone. While, overall, this simplified things for me, it did require me to find a different way to process the site’s images, since webpack and some plugins were now to be relieved of such duties.

At first, I tried some excellent Eleventy plugins, but found each didn’t fit my particular setup for differing reasons. As what was intended at first as only an interim measure but soon became my go-to answer, I came up with a build-time script, `imgxfm.js`, which used the [Sharp](https://github.com/lovell/sharp) library (and, later in the script’s brief life, the [pngquant](https://pngquant.org/) library) to handle image-processing duties.

When I first went with this method, the site wasn’t using [hero images](https://www.optimizely.com/optimization-glossary/hero-image/). Thus, the script, handling only the relatively few images within my posts’ body content, didn’t take long to run each time I did a site build. Such had also been the case with the Eleventy/webpack setup.

Things changed quite a bit once [I brought back hero images](/posts/2020/05/thousand-words-indeed) a couple of weeks later. Now, the build times fattened dramatically, and grew longer with each new post and its hero image—and, of course, these increasingly long builds were happening also on *local* builds while I was doing dev stuff. I spent plenty of time waiting through such builds, twiddling my metaphorical thumbs while listening to my iMac’s fans kick up in protest.

As a result: not long after I brought back the hero images, I was beginning to edge within sight of the [Netlify](https://netlify.com) free tier’s 300-minutes-a-month build limit. My response took two forms (and resulted in posts about each):

- [Using scripting](/posts/2020/06/o-say-can-you-ci-cd), specifically GitHub Actions, to cut the on-Netlify build times to only a few seconds each.

- Subsequently just flat-out [moving the site’s hosting](/posts/2020/07/goodbye-hello) from Netlify to [Vercel](https://vercel.com)—mostly because I preferred Vercel’s superior performance and more generous free-tier build policy, but also in part because I wanted to revert to the GitHub Actions-free build process with which I’d become familiar through most of my time with Netlify.

While the build *limit* problem was solved, the build *length* problem was alive and well, and getting worse with each new post/image combo.

That’s when I began to take a new look at Cloudinary.

I say “new look” because, back in June, I’d spent the better part of a Sunday playing with Cloudinary’s free tier and trying out various *transformations* (re-sizings, format changes, *etc*.)—but deciding against it after running into some (self-imposed, as in [PEBKAC](https://www.computerhope.com/jargon/p/pebkac.htm)) difficulties in early tests.

Apart from those experiences, one overarching concern I had about Cloudinary was whether I’d be able to stay within its free tier, given my large and growing supply of site images and the fact that *each* transformation of *each* image would be counted against the monthly 25-*credit* limit. I knew each transformation was only a tiny fraction of that limit and so the math didn’t indicate I’d really have a problem, but my fear-of-the-unknown reaction remained. 

Fortunately, I got over it after viewing the Cloudinary tutorial video, “[Understanding Cloudinary’s Transformation Quotas](https://www.youtube.com/watch?v=kkAk_5jQPFE),” which explains the whole thing quite well. And, indeed, once I tried again and spent a few *more* hours testing, I realized that my site’s needs would easily fit within the Cloudinary free tier.

After I uploaded all the images[^SVGandIcons], which actually went pretty quickly, I retooled my long-standing `lazy-picture.js`[^Verlok] [shortcode](https://11ty.dev/docs/shortcodes) so that it would, rather than seeking out multiple *locally* processed images from the site’s own storage, instead call the special *transformation URLs* the images have in Cloudinary.

[^Verlok]: I would be remiss if I didn’t mention the great extent to which `lazy-picture.js` depends on the excellent [LazyLoad](https://github.com/verlok/vanilla-lazyload) by [Andrea Verlicchi](https://www.andreaverlicchi.eu/).

In my site’s case, each image’s Cloudinary URL assigns it a size and quality (compression) level, while also commanding it to arrive as the appropriate file format for whichever browser it will be inhabiting. Thanks to the latter, I was able to simplify `lazy-picture.js` to use only the HTML `img` element and not *both* [`picture`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) and `img`, since I no longer had to provide both WebP and either JPEG or PNG images for the browsers to select. Indeed, this URL even provides JPEG 2000 files to Safari (although that will no longer be necessary once the long-overdue [WebP-savvy Safari](https://www.zdnet.com/article/safari-14-removes-flash-gets-support-for-breach-alerts-http3-and-webp/) arrives later this year).

[^SVGandIcons]: All, that is, except the SVG icons which you see on each page and the `meta` images (*e.g.*, “favicons”) required in each page’s `head`. Each of the SVGs is actually inline code in the HTML, avoiding additional downloads; and all but one of the `meta` images are tiny little things, the one exception being a smaller and more compressed version of the “hands typing on a typewriter” photo from the home page. The latter is required for, among other things, social media posts about this site’s content.

## Those transformations are real files

If you have trouble understanding why Cloudinary counts transformations against the monthly credits, it’s very simple—although, truthfully, I didn’t get it until I read some Cloudinary documentation and watched several Cloudinary-produced videos, after which I grasped exactly what’s going on with each transformation.

You see, each new transformation creates a *new file* that Cloudinary stores out on Amazon S3. So they’re counting not your URL but *what* the URL creates.

For example: if you have a file with a Cloudinary URL that ends with `f_auto,q_60,w_450/my_image.jpg`, that takes the original “my_image.jpg” file and creates a new file with these characteristics:

- `f_auto`—The most efficient file format for each browser. WebP-savvy browsers get that format, JPEG 2000-savvy browsers get that one, Internet Explorer[^IEcomp] and pre-Chromium Microsoft Edge get JPEG-XR, and the rest get the original format. Incidentally, this happens despite any extension you might put on the URL; so, just because the URL says it’s `something.jpg` doesn’t mean your browser really *handles* it as a JPEG file; only a view in the browser’s Inspector will tell you for sure.
- `q_60`—Quality (*i.e.*, compression level) of 60%.
- `w_450`—Width of 450 pixels. This capability makes it ultra-convenient to have my `lazy-picture.js` shortcode alter this part of an image’s URL programmatically, simplifying the responsive image `srcset`.

[^IEcomp]: In all candor, however, I stopped worrying about Internet Explorer a few months ago, chiefly because of its ridiculously outdated CSS handling. You can certainly *read* my site’s content in IE, but the hero images will look weird and columns will be wonky—and I can live with that. Life is too short to spend time agonizing over making things look normal on a browser so agonizingly behind the curve that [even its creators tell you to stop using it](https://techcommunity.microsoft.com/t5/windows-it-pro-blog/the-perils-of-using-internet-explorer-as-your-default-browser/ba-p/331732). Besides, [Fathom Analytics](https://usefathom.com/ref/ZKHYWX) (affiliate link) tells me IE use among my visitors is virtually non-existent (under 0.05% this past month). **Good for you, visitors**!

You can put a [mind-blowing number of transformative actions into a single URL](https://cloudinary.com/documentation/image_transformation_reference). In fact, it’s better to do it that way, rather than piecemeal; because, again, each URL creates a new file. Bunching them together means it can[^fileXfm] count as only *one* transformation. So it will behoove you, if you go with Cloudinary, to get into that habit early on.

[^fileXfm]: One exception is that automatic transformations, especially `f_auto` with its multiple-format processing, can create more than one file and, thus, count as more than one transformation.

The upshot of all this is that I deliver the same images as before—with better quality, in some isolated cases—but I *don’t* have to build them “myself,” I *don’t* have to build them on the host’s server, and I *don’t* have to crowd my site’s repository (or any repo that anyone chooses to clone from it) with that massive quantity of images.[^Git]

[^Git]: I considered waxing the repo and starting over, since anybody cloning the repo will get a .git file that has all the old images in compressed form, but decided that was going a bit far—if for no other reason that I often *need* to go back to those previous commits to check on discarded code of some type, and it may well be that those commits will also have instructive value for anyone doing a repo clone. That said, he/she always can do his/her *own* flushing of said .git file afterward.

## Trading points for pics?

Did I give up some speed, [some performance](/posts/2020/07/chasing-100-tips-optimizing-website), in adopting Cloudinary? Well, maybe some, depending on the point from which the site is being tested—but keep in mind that Cloudinary-hosted assets are delivered via the aptly named [Fastly CDN](https://fastly.com), and its caching helps assure that, once the file has been seen *somewhere* within a region, it’s likely the CDN will deliver it ultra-quickly.

I am willing to give up a few points off my performance scores. The relief I feel in *not* having to manage those images, *not* having to do *local builds* of those images, and *not* having to worry about how long my build times will be six months or a year or two years from now—believe me, it’s worth it.

----

**Update, 2020-10-05**: While I remain impressed by all that’s included on Cloudinary’s free tier, one thing that’s not and [apparently never will be](https://support.cloudinary.com/hc/en-us/articles/202520562-Can-we-deliver-our-files-using-a-subdomain-of-our-own-domain-Like-a-CNAME-from-cdn-example-com-") is CNAME support for a custom domain. (It comes only with Cloudinary’s highest-priced tier, which [ranges from $224 to $249 per month](https://cloudinary.com/pricing) as of this writing.) In other words, each non-SVG image on my site as of now is coming from ```res.cloudinary.com``` rather than, say, ```images.brycewray.com```—and that causes the images to be blocked by anally configured firewalls, especially in always-anal CorporateLand. However, just as I ceased worrying some time back about supporting CorporateLand’s beloved-yet-obsolete Internet Explorer (see this post’s footnotes), I decided I also won’t worry about CorporateLand’s anal-ness (?) where ```res.cloudinary.com``` is concerned. I believe the vast majority of you readers are accessing this site from not-so-anal surroundings, anyway. **Still**, if *your* site **is** intended for viewing within CorporateLand, just be aware of this when/if you consider Cloudinary.