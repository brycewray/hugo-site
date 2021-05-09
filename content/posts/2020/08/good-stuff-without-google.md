---
layout: singlepost
tags: post
title: "Good stuff without Google"
subtitle: "Yes to variable typefaces, no to tracking"
description: "How your website can still have the coolness of variable typefaces, but without Google’s tracking."
author: Bryce Wray
date: 2020-08-09T20:05:00-05:00
lastmod: 2020-12-13T12:35:00-06:00
discussionId: "2020-08-good-stuff-without-google"
featured_image: "printing-plate-typography-1030849_5122x3414.jpg"
featured_image_width: 5122
featured_image_height: 3414
featured_image_alt: "Various sizes of type for a printing press"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/photos/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1030849">Free-Photos</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1030849">Pixabay</a></span>
---

Early in this site's history, I issued a post in [two](/posts/2018/10/web-typography-part-1) [parts](/posts/2018/10/web-typography-part-2) about web typography, a subject near and dear to my geeky heart. In the second part, I gave the reasons for styling your website with the so-called "system fonts stack"---a set of fonts of which at least one is almost certain to be native on a current device, thus assuring faster rendering of your site's textual content than if you force it to download other fonts.

That said: if you're willing to give up some [performance points](/posts/2020/07/chasing-100-tips-optimizing-website), your site can gain a bit greater visual distinctiveness through the use of those other fonts, especially since there are so many cool, free typefaces out there for the grabbing and simple installation. [Google Fonts](https://fonts.google.com) is the source that comes most readily to mind, I'm sure.

Unfortunately, as I explained in "[Google Fonts and privacy](/posts/2020/08/google-fonts-privacy)," you don't want to provide those fonts straight off Google's servers unless you want to violate your visitors’ privacy and, for that matter, run afoul of various types of legislation enacted to protect that privacy. The most obvious alternative is simply to download the desired fonts from Google Fonts and install them in your site, then set your site to serve them "locally," so to speak.

However, there's a trick to doing that. And it gets even trickier if you want to use **variable fonts** rather than just ordinary fonts---and, I would suggest, in many cases you'd be wise to do.

But, hey, I'm here to help.

## Variable fonts: Why and why not

Let me begin by giving you a brief intro to variable fonts.[^1]

First, the web fonts you've typically known all these years are called *static* fonts. As that name implies, the file for each static font produces a fixed *weight*, *width*, and/or *style*. Let's say your site is using a non-system typeface for the body text, and a site page includes the following text and formatting:

<p class="text-4xl text-center"><strong><em>Hello</em></strong>, how <em>are</em> <strong>you</strong>?</p>

That would require the visitor's browser to access *four* font files: one for the boldfaced regular "you"; another for the non-bold regular "how" and question mark; a third for the boldfaced/italicized "Hello"; and a fourth for the non-boldfaced italicized "are."

On the other hand, a *variable* font file can be used to provide a wide range of, as the name implies, **variations**. For the same example above, only two *variable* font files would be necessary: one regular that handles the "how," the "you," and the question mark; and one italicized that handles both the "Hello" and the "are." And, if you don't care about true italics *vs.* simply slanting or *obliquing*---which I do---you even could use just one file to obtain that pseudo-styling.[^InterOblique]

[^InterOblique]: Given my own experience trying this, I suggest against it because it can get hairy supporting it properly on a cross-browsers basis. I've found this especially true for [Inter](https://rsms.me/inter) in both Firefox and Safari---which is sad, because Inter is a justifiably popular font.

There are drawbacks, of course. Precisely *because* it contains more variations in its code, a variable font file is considerably larger than a static font file for the same typeface. My site's styling makes heavy use of all four of the major combinations---regular, italic, bold regular, and bold italic---so for me it makes sense to use variable fonts; but, if your site doesn't do so, you're probably just as well off with static fonts. Just keep variable fonts in mind for situations that require them.

Realize that, since variable fonts are a relatively recent development compared to static fonts, the selection of the former is far more limited than that of the latter. Of course, as time passes, the number of variable fonts will only grow, and you'll have a better chance to find one that suits your sense of good typography.

So that's a quick take on variable fonts. Now, how do you get them for your site?

Oddly enough, big, bad Google Fonts is the place where you'll get them. But, as I said, there's a trick to it.

## Holding your mouth right

If you've spent much time on the Google Fonts site, you know it gives you two basic options for using the typefaces it provides, once you've started selecting them: *downloading* and *embedding*. Embedding means putting code in your site that will have your visitors get the font files from Google's servers. Once again, that's [a bad idea](/posts/2020/08/google-fonts-privacy) for you and your visitors.

That leaves downloading---a little more upfront work but simple enough, right? Ahh, not so fast.

What Google Fonts lets you download is, rather than *web* fonts in the .woff2 and .woff formats, *TrueType* fonts (.ttf) for direct installation on your computer or other device. *(This discussion concerns only the more efficient .woff2 format, since [all modern browsers support it](https://caniuse.com/#search=variable%20fonts); but, if you also have to support obsolete browsers like Internet Explorer, you'll need to get the older .woff format, too, so keep that in the back of your mind for the instructions ahead.)* In short: the only option Google Fonts gives you for delivering web fonts to your visitors is embedding.

What, then, to do?
  
If all your desired Google Fonts typefaces are *static* fonts, there's a great answer: use the excellent **[google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts)**.

{{< imgc src="google-webfonts-helper_2516x1134.png" alt="Screen capture of google-webfonts-helper as of 2020-08-09" width="2516" height="1134" >}}

This wonderful, totally free site not only provides the correct font files---just use the search to find the typefaces you want---but even helps customize the CSS for you to drop into your site.[^2] However, at least as of this writing, it doesn't yet provide the *variable* fonts in the Google Fonts library. What if you want those?

If you read my aforementioned post about why serving typefaces from Google is inadvisable, you may have seen my comment that I jumped through some hoops to bring variable fonts to this site.

Well, get your hoops-jumping outfit on, because I'm about to tell you how to do it, too.

## The safe way to get variable fonts from Google Fonts

For each variable font you want from Google Fonts:

1. Pick all the widths and styles you want and see what appears under **Review** on the right side of the Google Fonts interface. For example, when I was using Public Sans for this site, I picked regular, italic, bold regular, and bold italic (*400* is the default regular weight and *700* is usually the default weight for boldfacing):  

{{< imgc src="Public_Sans_selected_family_1024x1248.png" alt="Screen capture from Google Fonts showing typeface selections" width="1024" height="1248" >}}

2. Then check the result in the **Embed** view. This gives you the code you'd use *if* you were going to serve the fonts off Google Fonts which, again, you *shouldn't* do:

{{< imgc src="Public_Sans_Embed_1060x1798.png" alt="Screen capture from Google Fonts showing code for embedding" width="1060" height="1798" >}}

3. Instead, copy the URL from the code, like this:

{{< imgc src="Public_Sans_URL_to_copy_1066x630.png" alt="Screen capture from Google Fonts showing the URL to select" width="1066" height="630" >}}

4. Paste the copied URL into a browser window/tab.

{{< imgc src="Public_Sans_URL_pasted_into_browser_1588x74.png" alt="Screen capture from browser showing URL pasted into URL bar" width="1588" height="74" >}}

5. Go to that URL.  
	The resulting page will give you CSS that looks something like the following (the actual content will depend on what is current on Google Fonts at the time):

```css
/* latin-ext */
@font-face {
  font-family: 'Public Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/publicsans/v4/ijwTs572Xtc6ZYQws9YVwnNDTJLax8s3JimW3w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Public Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/publicsans/v4/ijwTs572Xtc6ZYQws9YVwnNDTJzax8s3Jik.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Public Sans';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/publicsans/v4/ijwTs572Xtc6ZYQws9YVwnNDTJLax8s3JimW3w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Public Sans';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/publicsans/v4/ijwTs572Xtc6ZYQws9YVwnNDTJzax8s3Jik.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/publicsans/v4/ijwRs572Xtc6ZYQws9YVwnNIfJ7QwOk1Fig.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/publicsans/v4/ijwRs572Xtc6ZYQws9YVwnNGfJ7QwOk1.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/publicsans/v4/ijwRs572Xtc6ZYQws9YVwnNIfJ7QwOk1Fig.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/publicsans/v4/ijwRs572Xtc6ZYQws9YVwnNGfJ7QwOk1.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

You probably don't need the `latin-extended` character sets (you already know if you do, and I'm guessing you don't if this information is new to you), and you want to provide as little downloadable content as possible to keep your visitors’ downloads smaller, so I'll assume from here on that we're interested only in the `latin`.

6. For each variation of the `latin`:
	- Copy the URL from the `src: url`. This is a direct link to the variable font. Don't worry about the bizarre name; we'll handle that in a moment.
	- Paste the URL into *another* browser window/tab and press **Enter**.
	- Download the file to *a folder of its own* on your development machine; and I also strongly suggest putting each of the folders in an overarching folder with a name that tells you the date you did this (I'll explain why shortly). For example, here's my `Public_Sans` folder with the files I downloaded to set them up on this site, and note that the inner folder is named `VF-2020-08-09`---*i.e.*, variable fonts downloaded 2020-08-09---and each font type has its own separate subfolder (I *did* get the `latin-extended` versions, just in case):

{{< imgc src="Public_Sans_folder_1502x672.png" alt="Screen capture of OS folder with Public Sans typeface files" width="1502" height="672" >}}

7. **Back in the browser window/tab with the CSS you got from the Google Fonts-provided URL, copy the CSS into a text file so you can refer to it later.**
8. Now, close the browser windows/tabs; you're done with them.
9. In each one-font subfolder, **duplicate** its .woff2 file; keep the original just in case something goes wrong with the following step.
10. Rename the duplicate .woff2 to something that makes sense to you. My `latin` duplicates have these names (and note that, in each, the name includes the date as an identifier; again, I'll shortly explain why):
	- public-sans-20200809-vf-italic-latin.woff2
	- public-sans-20200809-vf-roman-latin.woff2---I'm old-school and tend to call regular typefaces "Roman," even though that's actually correct only for serif faces.
11. Now, put the renamed .woff2 files in whatever location is appropriate for your website's setup, and do the normal setup you'd do to make "local" fonts work.  
	For the CSS part of it, you can refer to that CSS you copied earlier, but **be sure** to change the URL to **yours** or you'll be serving from Google! For example, on my site when it was using Public Sans, you'd see the following for the Public Sans italic regular-weight file:

```css
/* latin */
@font-face {
  font-family: 'Public Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('../assets/fonts/public-sans-20200809-vf-italic-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

## It's a date

Now, as promised, here are the reasons why you want to put the date in the .woff2 files’ names:

- From time to time, Google changes these files to provide certain enhancements, so you'll want to repeat this procedure to get the latest and replace them on your site. (You've already got the code in there; just change the respective .woff2 file names.) The date will help you keep track of that. Perhaps more importantly&nbsp;.&nbsp;.&nbsp;.
- If your site host uses a [content delivery network (CDN)](https://en.wikipedia.org/wiki/Content_delivery_network), as is true for most [Jamstack](https://jamstack.wtf)-savvy hosts, it'll probably *cache* your assets, including your fonts, for faster delivery. That cache won't change unless your font file names change; so, if you want to update the files, you'll want to vary the names, and---again---the date is a handy way to be sure about that.  
	You *could* use the original, incomprehensible names if you wish, but I think giving them more human-friendly names while sticking to a naming convention is a lot less headache-inducing.[^3]

## Hoops dreams

So there you are; that's how you jump through the hoops, as I put it. I think once you've done this a time or two, you'll see that it's a lot easier to *do* it than to *read* about it. Better yet: this gives you all the goodness of variable fonts but without the problems associated with serving them from Google.

If your site can make use of variable fonts, believe me when I tell you: the hoops are worth that trouble---for you and your website's visitors.

[^1]:	I also urge you to consult "[Introduction to variable fonts on the web](https://web.dev/variable-fonts/)" and  "[Variable fonts guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)," from which I derived this information.

[^2]:	The google-webfonts-helper site lets you choose between files and CSS for "Best Support" (.woff2 and .woff, for both modern and obsolete browsers) and "Modern Browsers" (.woff2 only). 

[^3]:	I altered this info from the initial post, in which I said, probably incorrectly, the original file names "are how Google tracks the different versions, and they also serve to 'bust caches' when they change." On later consideration, I decided that probably isn't the case, since the Google servers change what's delivered behind the scenes *without* your changing the URL if you're using Google-served fonts.