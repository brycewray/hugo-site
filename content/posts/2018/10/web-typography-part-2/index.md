---
layout: layouts/posts/singlepost.njk
tags: post
title: A stacked deck
subtitle: Part 2 of a two-part series on Web typography
description: Making the case for a system “fonts” approach to the typography on Web sites.
author: Bryce Wray
date: 2018-10-25T07:40:00-05:00
lastmod: 2020-06-13T13:10:00-05:00
discussionId: "2018-10-web-typography-part-2"
featured_image: /images/computer-1869236_1920x1440.jpg
featured_image_alt: Backlit computer keyboard
featured_image_caption: "Image: Pixabay" # quotation marks to allow colon
---

<div class="yellowBox">
	<p><strong>Note from 2019-12-08</strong>: Although the system &ldquo;fonts&rdquo; approach I describe in this post is still quite sensible in many cases, later decisions allowed me to adopt a standard appearance for all devices and OSs without some of the usual technical drawbacks that I&rsquo;ll mention herein.</p>
</div>
&nbsp;<br />

In [Part 1](https://brycewray.com/posts/2018/10/web-typography-part-1/) of this two-part series, I posited that body text on Web sites should, y’know, be _readable_. O&nbsp;M&nbsp;G. Here, in the conclusion, I’ll explain the typographical choices on _this_ site.

<hr style="border: 1px solid #666;" />

_**Note**: For those teeming masses who had already read this deathless prose before November 9, 2018, please be advised there’s a major change at the bottom. For the rest of you, as a friend from my high school days used to say, “Go ahead on.”_

<hr style="border: 1px solid #666;" />

First, this nerdish note: you’ll see me referring herein to _typefaces_ rather than _fonts_. That said, if we were just sitting around having the kind of chat about on-screen typography that people do every day (normal people do that, right? Right?), I would probably slip and call them “fonts,” as well.[^1] It’s more commonly understood and, besides, we’re all accustomed to how our apps’ menus call them “fonts” rather than “typefaces.” That convention that dates back at least to 1984 and the original Mac. However, as Wikipedia says:

> The term _typeface_ is frequently confused with the term _font_. Before the advent of digital typography and desktop publishing, the two terms had more clearly understood meanings.[^2]

So, with that understood, let’s get on with it.

## A simpler—and duller—time

The early years of the Web involved considerable limitations where Web pages’ body type was concerned. Any text needing more than a [small collection of “safe” system “fonts”](http://web.mit.edu/jmorzins/www/fonts.html) usually was a graphic rather than true text. That became a major no-no once [search engine optimization (SEO)](https://moz.com/beginners-guide-to-seo) became a critical feature, because search engines can’t read graphics as text; but it wasn’t such a show-stopper back then, when the Web search industry [now dominated by Google](http://www.visualcapitalist.com/this-chart-reveals-googles-true-dominance-over-the-web/) was [in its infancy](http://www.thehistoryofseo.com/The-Industry/Short_History_of_Early_Search_Engines.aspx). As a result, you tended to see a lot of graphics-posing-as-text when designers wanted their pages to stand out typographically. Here’s an example from the Apple Web site as it appeared on November 16, 1999, courtesy of the [Internet Archive](https://archive.org):

{{< img src="Early-Web-font-grfx-1-2018-10-16_1218x1296.jpg" alt="Image from Apple Web site in 1999 showing graphic elements as text" >}}

The only “real” text in this view was the timestamp, on the right side under the image of the [iMac of that era in all its Bondi Blue glory](https://everymac.com/systems/apple/imac/specs/imac_ab.html). All other textual elements shown were graphics. (The image-missing icon above the [iBook](https://everymac.com/systems/apple/ibook/index-ibook.html) image apparently indicates a missing image that the Internet Archive didn’t capture at the time or, otherwise, was unable to recover at the time I made this screen capture.)

In that era, the graphics-as-text approach was a technological necessity for two reasons:

1. There was no standard way to deliver Web “fonts” automatically, nor was it always easy to detect which computer platform and which browser were displaying the text; so it was necessary to use only those “fonts” you could be sure would be on any computer capable of running a Web browser. (At least back then, you could assume they _were_ computers, since this was well before Web-capable phones and tablets appeared.) So, yes, people saw a lot of Times New Roman, Arial, Tahoma, Verdana, and the like.
2. If there _had_ been the means to deliver such “fonts,” the slow Internet connections of that era would’ve made their use unpopular. Even today, there can be some delivery issues with Web “fonts” that require [effective mitigation](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization#optimizing_loading_and_rendering).

.&nbsp;.&nbsp;.&nbsp;And that, conveniently enough, brings me to my next point.

## Embarrassment of riches

As I write this in late 2018, it’s long been common to go from one site to another and see many variations in Web typefaces. Sites for many major publications, in particular, have prided themselves on typography resembling that of their print versions to the maximum extent possible. Also, [Google Fonts](https://fonts.google.com) and other repositories of free typefaces have transformed the ability of even modest sites to have truly professional-looking typography. All that’s necessary is to add code that links to the necessary repository and, wham, the page downloads and displays the typefaces automatically.

So what possibly could be wrong with that?

Well, there’s this thing called speed. Google giveth with Google Fonts, and Google taketh away with the added lag downloadable “fonts” can induce. The same is true for paid “font” platforms like [Adobe Fonts](https://fonts.adobe.com) (branded until recently as TypeKit). It gets even worse if people go really crazy with not only different typefaces but also numerous _weights_ and _styles_ thereof. _Each_ downloaded typographical variation adds a certain amount of delay to the rendering of the Web page involved. As a result, the more variety you add through downloadable “fonts,” the more slowly your page will load.

And, guess who dings a page’s search results downward if the page is comparatively slower than another page with roughly equal “search juice”? Yep, Google.

So, what to do?

## Goin’ back to the classics—sort of 

What I’ve chosen, and what quite a few sites have chosen, is to go back in time and trust the so-called “[system fonts stack](https://woorkup.com/system-font/).” That refers to the system-default sans-serif typefaces on people’s individual devices. They’re already there, and they load virtually instantaneously. If you’re doubting the wisdom of such an approach considering my earlier explanation of how that worked in the 1990s, please understand that this is a major case of “That was then and this is now.”

Two things are far, far better than they were in the olden days: system typefaces and the displays on which they appear. In the early days of the Web, a [typical user](http://www.relativelyinteresting.com/comparing-todays-computers-to-1995s/) was fortunate to have something as nice as, say, a seventeen-inch, 256-color, 1,024 &times; 768 monitor (in the form of a bulky [CRT](https://whatis.techtarget.com/definition/cathode-ray-tube-CRT), of course); therefore, system typefaces not only didn’t _have_ to be but, indeed, _couldn’t_ be truly high-resolution. But, now, super-high-res flat displays of all sizes on a multiplicity of devices are normal, and so are extra-high-quality system typefaces. If I’ve said it once, I’ve said it a hundred times: I love living in the future.

As for which typefaces to specify and in which order in your CSS, any number of sites have posted what seems to be the consensus pick for the “system fonts stack”:

- **San Francisco**—iOS 9.x and beyond; macOS 10.11.x (El Capitan) and beyond.
- **Segoe UI**—Windows Vista and beyond.
- **Tahoma**—Windows XP (you’d be amazed how many millions of people still use it, especially in some parts of the world).
- **Roboto**—Android 4.0+ and all versions of ChromeOS.
- **Oxygen**—Linux distributions using KDE.
- **Ubuntu**—Ubuntu (no, really).
- **Cantarell**—Linux distributions using GNOME.
- **Fira Sans**—the Firefox OS for smartphones (an OS which is considered discontinued, but this typeface is still in the stack).
- **Droid Sans**—Android before version 4.0.
- **Helvetica Neue**—iOS prior to iOS 9 and Mac OS X 10.10.x (Yosemite). 
- **Lucida Grande**—Mac OS X 10.0.x (Cheetah) through Mac OS X 10.9.x (Mavericks). 
- **sans-serif** (yes, without capitalization)—This is at the end as a fallback in case, somehow, none of the others will float your device’s boat, although that’s _extremely_ unlikely.

The easiest way[^3] to implement this “system fonts stack” throughout your site is assigning the following CSS to the `<html>` tag (or `<body>` tag, if you prefer):

```css
font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Tahoma, Roboto, Oxygen, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Lucida Grande", sans-serif;
```

The first three entries take care of current Apple devices and also, in the case of `system-ui`, the latest Chrome browsers. The rest are simply calls to the typefaces in question.

**Important note**: Be sure you use `font-family` rather than the full-fledged `font` if you have the `-apple-system` first, as I showed above, or [weird things can happen](https://booking.design/implementing-system-fonts-on-booking-com-a-lesson-learned-bdc984df627f).

## How it all stacks up in the end

If you, or Those Who Tell You How to Design, are dead-set on having all your site’s visitors see the same, specific typeface, this approach won’t be for you. I’ve been in your shoes. I understand.

However, if your primary mission with your Web site to ensure not just the best readability but also the fastest possible loading speed, using a “system fonts stack” is an easily implemented way to help achieve that.

<hr style="border: 1px solid #666;" />

### _Major change, November 9, 2018_

A few days after I began writing this, I converted the site over to [Bootstrap 4](https://getbootstrap.com)-based CSS, whereupon I found that the Bootstrap folks had made [their own choices](https://getbootstrap.com/docs/4.1/content/reboot/#native-font-stack) about the nature of the aforementioned “system fonts stack.” They made it much simpler:

- The Apple system “font” indicators mentioned above.
- Segoe UI.
- Roboto.
- .&nbsp;.&nbsp;.&nbsp; after which it’s just a fallback to Helvetica Neue, Arial, and sans-serif, followed by some emoji-handling and symbol-handling.

.&nbsp;.&nbsp;.&nbsp; and that’s it!

At first, I was sufficiently unimpressed with this simplification that I overrode it in my site-wide CSS with the more comprehensive “system fonts stack” I mentioned above. However, after some experimentation with how the Bootstrap 4 version looked in certain Linux distributions as compared to what I was using, I decided I preferred Bootstrap’s way, after all, and changed my CSS accordingly. The vast majority of you, covered by the first three entries, will never know the difference; but, on a few odd combinations of OS and devices, the Bootstrap version is better. Lesson learned; _mea&nbsp;culpa_.

[^1]:	As, indeed, I did in my earlier post, “[Why I finally settled on Ulysses](https://brycewray.com/posts/2018/09/why-finally-settled-ulysses),” when referring to the available selections.

[^2]:	“[Typeface](https://en.wikipedia.org/wiki/Typeface),” Wikipedia, retrieved 2018-10-22.

[^3]:	Unless you’re using WordPress and the GeneratePress theme, in which case you can follow [Brian Jackson’s advice](https://woorkup.com/system-font/).