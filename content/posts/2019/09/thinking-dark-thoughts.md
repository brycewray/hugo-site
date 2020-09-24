---
title: Thinking dark thoughts
subtitle: How to keep up with a growing trend
description: "As Dark Mode grows in use, it’s easy to make your site dark-friendly."
date: 2019-09-29T10:08:00-05:00
lastmod: 2020-08-08T14:15:00-05:00
discussionId: "2019-09-thinking-dark-thoughts"
featured_image: sunset-1090164_4608x3456.jpg
featured_image_width: 4608
featured_image_height: 3456
featured_image_alt: "Skies at sunset"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/Hans-2/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1090164">Hans Braxmeier</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1090164">Pixabay</a></span>
---

With the recent release of [iOS 13](https://en.wikipedia.org/wiki/IOS_13), system-wide [Dark Mode](https://en.wikipedia.org/wiki/Light-on-dark_color_scheme) [finally became available to iPhone and iPad users](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/dark-mode/). That means a massive number of people are now going to be looking at apps and websites in completely different ways than before.[^Android] Moreover, [browsers on both mobile devices and the desktop are getting increasingly Dark Mode-savvy](https://www.cnet.com/news/dark-mode-web-browsers-are-here-safari-firefox-soon-chrome/), switching between Light and Dark Modes fairly seamlessly.

[^Android]: Android users have had Dark Mode [since the release of Android P](https://9to5google.com/2018/12/17/android-dark-mode-theme-pie/) last year—at least, for those Android users who actually [got to upgrade](https://www.techopedia.com/definition/3899/android-fragmentation) to Android P—and any number of apps on both iOS and Android have provided at least some form of Dark Mode. But, due to the sheer quantity of iOS users (especially in North America) and the likelihood that the vast majority of them will be on iOS 13 fairly quickly if [iOS 12 adoption](https://www.macrumors.com/2019/08/08/ios-12-adoption-88-percent/) was any reliable measuring stick, it’s especially significant that iOS 13 adds Dark Mode as a system-wide option.

However, if you don’t make the proper adjustments to your website and it’s in the more traditional dark-content-on-a-bright-background motif, Dark Mode users might get a rude jolt when they stop by. It’s sort of like what happens when you’ve been sitting in a dark room watching TV and suddenly somebody comes in and turns on all the lights. Might not be all that welcome.

Fortunately, it’s easy to fix. Well, *relatively* easy.

## CSS FTW

[CSS](https://techterms.com/definition/css) has a [media query](https://techterms.com/definition/media_queries) feature called `prefers-color-scheme` ([explained well and in detail](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme), as are so many things, on [MDN](https://developer.mozilla.org/en-US/)). All you have to do is wrap, within such a media query, the CSS which will control how your site looks when a Dark Mode user visits.

Here’s a bare-bones example.

Let’s say your `<body>` element currently is set to have a white background and very dark gray text, like so:

```css
body {
    background: #fff; /* totally white */
    color: #333; /* very dark gray, almost black */
}
```

To resolve this for Dark Mode, you could do it this way.

```css
body {
    background: #fff; /* totally white */
    color: #333; /* very dark gray, almost black */
}

@media (prefers-color-scheme: dark) {
    /*
    ============ 
    this is what happens if the user 
    selects Dark Mode
    ============
    */
    body {
        background: #000; /* totally black */
        color: #fff; /* totally white */
    }
}
```

With this CSS in place, a Dark Mode visitor sees everything with white text on a jet-black background. People whose devices have [OLED](https://www.trustedreviews.com/news/what-is-oled-3285263) screens will especially appreciate that totally black background because [it will save battery juice](https://www.popsci.com/night-dark-mode-design), since [a truly black pixel on an OLED screen uses no power](https://www.howtogeek.com/397982/how-dark-mode-can-extend-battery-life-on-oled-phones/).

On the other hand, if your site already *had* a dark appearance but you want to give a different look to folks who *don’t* have Dark Mode in use, the `prefers-color-scheme` feature also lets you choose `light`, so you could do similar work to make the site appear brighter for those users.

## A few nits (pardon the pun)

*[See,* nits *are [units used to express screen brightness](https://www.lifewire.com/understanding-nits-lumens-brightness-4125499), so—ahh, never mind.]*

Of course, it’s not that easy. Cool stuff never is.

The thing is, you probably should adjust  *all* of your site’s bright elements within `prefers-color-scheme`. To repeat the analogy of the dark room, anything you miss will be a flashlight from the distance that suddenly jabs the person in his or her widened pupils. Not nice. So, if your CSS already has a lot of stuff, you may have to include quite a few things in that media query.

Two things can make it particularly complicated.

### Using code blocks

If yours, like mine, is a site where you sometimes use code blocks (like the ones above) to show others how [HTML](https://www.w3.org/html/), CSS, [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), or some other code should look, that gets a little hairy, especially if you’re using something like [Chroma](https://github.com/alecthomas/chroma) or [PrismJS](https://prismjs.com) to provide color-coding for easier reading.

If you look at the source for such code blocks, you’ll notice they have a lot of different `<span>`s in them to provide the various color treatments. So—assuming you weren’t already using a dark background scheme for your code blocks, as some do—you’re going to have to reassign the colors for not only the code block backgrounds but also each of the individual color codes.

Yes, that can be tedious, particularly if you haven’t yet done code blocks with that many different languages, because each language has its own specific color-coding and, as you do a code block in a language you haven’t previously included, you’ll see new combinations; so, as in all things web dev, you’ll first need to test (and fix) locally.

### External iframes

And then there are those third-party [iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) you can’t control, at least not all that well.

<div class="yellowBox"><p><strong>Note, 2020-08-08</strong>: The following explanation was from before I stopped embedding third-party content, such as from Twitter, as a result of this site&rsquo;s belatedly adopted <a href="/privacy">privacy policy</a>.</p></div>

In my site’s case, [Twitter](https://twitter.com) is the chief offender. Dark Mode and the default white Twitter background do not play nicely together. So I followed [Twitter’s dev docs](https://developer.twitter.com/en/docs) and, through JavaScript-adjusted `<meta>` tags, told my site’s embedded Twitter content to “listen” to the user’s Dark Mode/Light Mode setting and change accordingly.[^noscript]

[^noscript]: For those odd cases where JavaScript is disabled, I use `<noscript>` code to make Dark Mode the default setting for the Twitter content. I figure it’s safer to show Dark Mode stuff to Light Mode users as opposed to the other way around.

That sounded good in theory, but so far hasn’t worked all that well in practice. I’ve found that only [Firefox](https://www.mozilla.org/en-US/firefox/) seems to respect the change without requiring a reload of the page, and even Firefox sometimes lets me down. I suspect I’m missing something, but it may simply be that Twitter doesn’t necessarily respect that `<meta>` tag method as much as its [dev docs say it does](https://developer.twitter.com/en/docs/twitter-for-websites/webpage-properties/overview). We Shall See.

## But it’s still a good idea

All that said, I still encourage you to make your site friendly to both Light Mode and Dark Mode. Once you do, the changes will make visiting your site considerably more pleasant to your users, and that should translate into repeat visits. At the very least, it should help make sure that Dark Mode users *don’t* yell, “*Augghhh!!!* My *eyes*!” and never return—at least, as long as your site doesn’t resemble [something from the GeoCities days](https://gizmodo.com/remember-the-hilarious-horror-of-geocities-with-this-we-5983574). If it does, well, you’re on your own.