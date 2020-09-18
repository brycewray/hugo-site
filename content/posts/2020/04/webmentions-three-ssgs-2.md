---
title: "Webmentions in three SSGs: Part 2"
subtitle: "IndieWebbin’ in Eleventy"
description: "Part 2 of a five-part series about incorporating the IndieWeb into three different static site generators (SSGs)—in this case, Eleventy."
author: Bryce Wray
date: 2020-04-28T21:35:00
lastmod: 2020-07-26T15:00:00
discussionId: "2020-04-webmentions-three-ssgs-2"
featured_image: pavan-trikutam-71CjSSB83Wo-unsplash_4401x2934.jpg
featured_image_width: 4401
featured_image_height: 2934
featured_image_alt: "Communications concept - vintage pay telephones on a wall"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@ptrikutam?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Pavan Trikutam</a>; <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

<div class="yellowBox"><p><strong>Original opening note</strong>: This is Part 2 of a five-part series about how you can set up <a href="https://indieweb.org/Webmention">webmentions</a> in websites built by three different <a href="https://staticgen.com">static site generators</a> (SSGs): <a href="https://11ty.dev">Eleventy</a> (the subject of this part), <a href="https://gohugo.io">Hugo</a> (the subject of <a href="/posts/2020/04/webmentions-three-ssgs-3">Part 3</a>), and <a href="https://gatsbyjs.org">Gatsby</a> (covered in detail in <a href="/posts/2020/04/webmentions-three-ssgs-4">Part 4</a>). In the <a href="/posts/2020/04/webmentions-three-ssgs-5">conclusion</a>, you&rsquo;ll find a bibliography of the best articles I found on the subject of this series. All of the articles link (even if only through tiny <a href="https://github.com">GitHub</a> logos) to their authors&rsquo; code. They were invaluable to this effort, and I encourage you to take particular notice of them and their authors.</p></div>

<div class="yellowBox"><p><strong>Added note, 2020-07-26</strong>: I have now archived the various configuration files linked within this series within a <a href="https://github.com/brycewray/files-webmentions">GitHub repo</a> of their own and changed the links accordingly, so as to make them immune to ongoing changes in the repos originally linked from this series.</p></div>

<div class="yellowBox"><p><strong>Added note, 2020-09-16</strong>: The site no longer uses webmentions.</p></div>

Having covered the purpose of this series, the [IndieWeb](https://indieweb.org), and the general setup of webmentions in this series' [introduction](/posts/2020/04/webmentions-three-ssgs-1), we'll now get into details about implementing them in the [Eleventy](https://11ty.dev) SSG.

For two reasons, we start with the [Eleventy repo](https://github.com/brycewray/eleventy_bundler). First, it's the repo that powered this site as of the time I wrote this.[^toSolo] Second, it's where I initially added webmentions in their barest form---only so-called "mentions"---and then, more recently, enhanced their appearances. I refer to it here only as the *Eleventy repo* rather than, as usual, the *Eleventy/[webpack](https://webpack.js.org) repo*, because the addition of webpack really had nothing whatsoever to do with this particular process.

[^toSolo]: Not long after initially publishing this series, I [converted the site](/posts/2020/going-solo-eleventy) to a [webpack-less repo](https://github.com/brycewray/eleventy_solo).

## Eleventy: Fetching webmentions

Two things made this much easier with Eleventy than it would prove to be on the other two repos: Eleventy's amazing flexibility; and two superb articles by [Max Böck](https://mxb.dev/blog/using-webmentions-on-static-sites/) and [Sia Karamalegos](https://sia.codes/posts/webmentions-eleventy-in-depth/).

In the Eleventy repo, [`/_data/webmentions.js`](https://github.com/brycewray/files-webmentions/blob/master/eleventy_bundler/_data/webmentions.js) "phones home" to webmention.io and collects the resulting JSON data into `/_cache/webmentions.json`]. From there, [`/.eleventy.js`](https://github.com/brycewray/files-webmentions/blob/master/eleventy_bundler/.eleventy.js) (the main Eleventy configuration file) and [`/src/assets/utils/filters.js`](https://github.com/brycewray/files-webmentions/blob/master/eleventy_bundler/src/assets/utils/filters.js) massage the data for presentation. For example, each webmention is put in chronological order and arranged according to its respective type (in webmention-ese, its `wm-property`): `like-of`, `in-reply-to`, `bookmark-of`, `mention-of`, or `repost-of`.[^NoBookmarks]

[^NoBookmarks]: For now, I don't bother with displaying results of `bookmark-of` webmentions, although that capability *should* be easy enough to add later, if I change my mind.

## Eleventy: Displaying webmentions

At that point, a [shortcode](https://11ty.dev/docs/shortcodes) in [`/src/_includes/webmentionlist.js`](https://github.com/brycewray/files-webmentions/blob/master/eleventy_bundler/src/_includes/webmentionlist.js) makes the massaged data presentable. Other pages and templates can then use this shortcode to access the result. Right now, the only one that uses it is [`/src/_includes/layouts/posts/singlepost.11ty.js`](https://github.com/brycewray/files-webmentions/blob/master/eleventy_bundler/src/_includes/layouts/posts/singlepost.11ty.js), the template for each individual post (like the one you're reading now) as well as the ["About" page](/about). If I wanted, I could add it for the home page, too, of course; just haven't yet decided to do that.

In addition, I also edited [`/src/_includes/layouts/partials/footer.js`](https://github.com/brycewray/files-webmentions/blob/master/eleventy_bundler/src/_includes/layouts/partials/footer.js) so that it would have the necessary [microformats](https://indieweb.org/microformats) information for the entire site, as well as page-specific microformats stuff **except** on any page within the paginated [posts list](/posts).

And, yeah, that pretty much was it where the Eleventy repo and webmentions were concerned---other than, it should be noted, massaging the CSS to handle the actual look-and-feel of the webmentions display on each relevant page. That was especially necessary because of the newly added "counter" and "drop-down" functionality (the latter through use of the [HTML `details` tag](https://www.w3schools.com/tags/tag_details.asp)).

## Saying goodbye to Easy Street

After Eleventy, things got a bit (?) more challenging, to put it mildly.

See you in [Part 3](/posts/2020/04/webmentions-three-ssgs-3), where I explain the webmention-izing of my [Hugo repo](https://github.com/brycewray/hugo_site_css-grid) (and then [Part 4](/posts/2020/04/webmentions-three-ssgs-4), where I cover the angst-y process of doing the same for my [Gatsby repo](https://github.com/brycewray/gatsby_site_css-grid)). Don't be late; last one there is a rotten SSG.[^DoubleEntendre]

[^DoubleEntendre]: And that's just a playful little *double entendre*. If you saw through it: sorry, I couldn't resist.