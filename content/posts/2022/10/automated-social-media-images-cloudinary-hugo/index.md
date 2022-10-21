---
title: "Automated social media images with Cloudinary and Hugo"
description: "A little time spent wrangling with an API saves you plenty of time down the line."
author: Bryce Wray
date: 2022-10-15T10:43:00-05:00
#draft: true
initTextEditor: iA Writer # default --- change if needed
---

If you ever use social media to promote your website's content, you'll want to read this post. Although we'll be concentrating on a procedure that involves the [Hugo](https://gohugo.io) static site generator (SSG) and the free tier of the [Cloudinary](https://cloudinary.com) digital asset management provider, anyone who runs a website can benefit from at least some of the information we'll provide below.

And if you *do* use Hugo to manage your site and you either have, or are willing to get, a subscription to Cloudinary's generous free tier[^affilPlug], this post can make it ’way easier in the future to enhance promotion of your content. You *do* want people to read your content, right?

[^affilPlug]: If you want to try even only Cloudinary's free tier, I request that you use [this invitation link](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/dqunpyaeqiizezj6lbdu). I'll get additional Cloudinary credits for each person who uses the link and subsequently enrolls with Cloudinary, even if only for the free tier. Thanks in advance!

## Going OG with the OG protocol

First, notice this tweet of a few weeks ago from the nice folks at [CloudCannon](https://cloudcannon.com):

{{< stweet user="CloudCannon" id="1569369622998130689" >}}

By comparison, the original text of the tweet, before the background processes added that image and its surrounding *social media sharing card*, looked like this:

> Let&apos;s dig into the tools we use to create static websites — Static Site Generators (#SSG)\
> https://cloudcannon.com/blog/what-is-a-static-site-generator/

. . . so how did the link get turned into that card with its nice image?

The answer is the **[Open Graph (OG) protocol](https://ogp.me/)**. It's how social media providers --- which I'll abbreviate as *SMPs*[^SMPs] --- auto-generate those cards and their images whenever someone pushes a link, **if** the link contains the right metadata.

[^SMPs]: And, hey, if you want to pronounce that *simps*, that's totally up to you, especially if you share my opinions of most of those providers and their long-term effect on their users.

To be sure, you can accomplish all of this completely manually, if you choose. Doing it manually would mean that, for **each** page you want to push via SMPs, you'd:

- Create and host an accompanying image, perhaps with the page's title as an overlay to grab added attention.
- Go into the web page's HTML and add appropriate [`meta` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) strings, each with a link to the image.

On the other hand, if you're an SSG user, you can automate that second part through whatever templating you use to build your site. But what about the first part, the creation and hosting of the image? Well, you can automate that, too, to varying degrees.

A *semi*-automated way to make that image could be something like what I'd been doing until the last couple of days. I'd created a generic background image like this:

{{< imgc src="social-OG-w-BW-logo_1024x512.jpg" alt="Background image for use with social media image creation" width=1024 height=512 >}}

. . . and then written some code (as I [previously explained](/posts/2022/07/bundling-up-rebuilding-my-hugo-site/)) to [overlay](https://gohugo.io/functions/images/#overlay) that generic background with another image file, `title.png`, which I'd create *manually* for each new web page. I'd chosen to do it this way because I didn't like the limited text-formatting choices involved in using Hugo's more automatic [`Text` filter](https://gohugo.io/functions/images/#text).

By contrast: whenever I'd tinker with the [Astro](https://astro.build) and [Eleventy](https://11ty.dev) SSGs, I'd make use of [Jason Lengstorf](https://github.com/jlengstorf)'s [`get-share-image` utility](https://github.com/jlengstorf/get-share-image) for this purpose. With `get-share-image`, you store a background image on Cloudinary and then use that service's APIs to overlay auto-generated title text on it --- **and** you have more control over how that title text appears than with Hugo's `Text` filter. In other words, you get all the automated goodness of `Text` but without its limitations.

This made more sense when using Astro or Eleventy, because they already are using a ton of [Node.js](https://nodejs.org) packages, so what's one more? But, for my Node.js-free Hugo setup, I didn't want to go the `node_modules` route for **just** `get-share-image`.

**Update**: For that matter, see also my 2022-10-20 update near the bottom of this post for a different approach, at least for use with Eleventy.
{.yellowBox}

Thus, the only way to do this to my satisfaction in Hugo was to recreate, entirely in Hugo templating, what `get-share-image` does.

## Cloudinary image transformation URLs

Fortunately, Lengstorf's [`get-share-image` documentation](https://github.com/jlengstorf/get-share-image) makes it pretty clear how to get there. In the end, all you're doing is creating a [Cloudinary image transformation URL](https://cloudinary.com/documentation/image_transformations#transformation_url_syntax) that uses Cloudinary's [text layers feature](https://cloudinary.com/documentation/layers#text_layer_options), and `get-share-image` does that for the user. For example, here's the Cloudinary URL that makes **this** page's OG image:

```html
https://res.cloudinary.com/brycewray-com/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_1036,c_fit,co_rgb:ffffff,g_north,y_72,l_text:librefranklinsemibold.ttf_72_center:Automated%20social%20media%20images%20with%C2%A0Cloudinary%20and%C2%A0Hugo/social-OG-bkgd-w-BW-logo-ctrd-for-1280x669
```

. . . which results in:

![OG image from URL shown above](https://res.cloudinary.com/brycewray-com/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_1036,c_fit,co_rgb:ffffff,g_north,y_72,l_text:librefranklinsemibold.ttf_72_center:Automated%20social%20media%20images%20with%C2%A0Cloudinary%20and%C2%A0Hugo/social-OG-bkgd-w-BW-logo-ctrd-for-1280x669)

**Note**: You may have noticed that this OG image has a blue-top/black-bottom gradient, while the background image that I showed earlier has a blue-left/black-right gradient. There's no mystery as to why I made the change: I just decided the blue-top/black-bottom background gradient worked better, given the placements and colors of the text and the logo.
{.yellowBox}

I found the Cloudinary documentation considerably less easy to follow than Lengstorf's; but, in the end, I managed to get to what I wanted. One key aspect about which I felt those Cloudinary docs weren't sufficiently explanatory was the need to **double-escape** [certain characters](https://cloudinary.com/documentation/layers#special_characters) in whatever text I wanted to overlay. Before I explain what *double-escaping* turned out to mean, let me first deal with the *escape* part.

Cloudinary's text layers feature works with only very basic text characters --- essentially, the alphabet and numbers --- so it will accept an overlay text string *only* if other characters in the string are *escaped* for use in URLs. For example, every space character must be sent as `%20`. You've probably seen that encoding in URLs, such as when a page links to a PDF which has spaces in its file name.[^URLEncode]

[^URLEncode]: To find escape codes for other characters, I relied on the **very** helpful site, [URL Encode online](https://www.urlencoder.io/).

That much I understood, but the instruction to *double*-escape three specific characters[^emoji] --- the percent sign, the comma, and the forward slash --- buffaloed me for a while. Finally, the inclusion of the percent sign within this made me realize what was necessary: for just those three characters, I had to escape-out **the percent sign itself WITHIN the escaped character**. The percent sign normally would be `%25`, but sending it as **only** `%25` would confuse the Cloudinary API, which would treat it as not an encoded percent sign but rather the beginning of *another* escaped character --- causing unexpected results. Thus, I'd have to send:

[^emoji]: It's also necessary to double-escape emoji characters, but I never use those in titles and thus didn't worry about finding their codes.

- The percent sign as `%2525` (not just `%25`).
- The comma as `%252C` (not just `%2C`).
- The forward slash as `%252F` (not just `%2F`).

Once I grasped that, I was home free. Well, almost. I also had to dope out Cloudinary's outdated [instructions for uploading additional fonts](https://cloudinary.com/documentation/layers#custom_fonts) to use with the text; but I got it in the end. In essence, you have to go into the Cloudinary *Media Library* settings, add an *upload preset*, and configure it to recognize uploaded fonts --- as `.ttf`, `.otf`, or `.woff2` files --- as okay for use. After that, you simply drag-and-drop font files to the Media Library, just as you do image files. It wasn't nearly as complicated as Cloudinary's docs made it sound.[^uniFonts]

[^uniFonts]: If you prefer to keep the operation as uncomplicated as possible, you can just use what the Cloudinary docs call "universally available fonts," such as the default, Arial. Remember that the OG image is only bitmap, not vector --- *i.e.*, it includes no actual fonts or text but, rather, just graphical representations thereof --- so the "universal" nature refers to what **Cloudinary** already has online, not what your visitors have.

By the way: remember how I mentioned earlier that I didn't like the lame formatting in Hugo's `Text` filter, which otherwise could accomplish the same thing as this procedure for locally hosted and processed images? Well, this is one major reason I prefer the Cloudinary URL method. It not only lets me control the text alignment, it also respects my use of *non-breaking spaces* to make sure none of my titles' line breaks result in one-word last lines, no matter how small a screen one may use.

**Note**: For a fuller understanding of some of the parameters, I suggest reading Lengstorf's ["Options" documentation](https://github.com/jlengstorf/get-share-image#options) --- because, in the end, he's simply explaining the Cloudinary URL options. I particularly recommend reading his explanations **before** you try dealing with **Cloudinary's**. The latter's product is amazing, but a lot of its documentation clearly isn't for the faint-hearted (or, in my case, faint-headed).
{.yellowBox}

## The code

In this section, I provide an annotated version of the code by which I'm handling this stuff in [my Hugo setup's appropriate partial](https://github.com/brycewray/hugo_site/blob/main/layouts/partials/head-meta_cloud-socimg.html), which supplies only the metadata for the `head` element on each page. In addition to the comments, I've added some *variables* to make it more applicable to other users; *e.g.*, I don't need to provide a variable for my own Cloudinary *cloud name* (because I "hard-code" it in my own URL), but you'll need to supply yours.

At the beginning of the code block, I mention a fallback image (`$fallbackImg`), which I host myself[^fallbackLocal] rather than on Cloudinary. This is for use for the home page, for which I'd prefer the OG image to be my long-term site image:

[^fallbackLocal]: This is true when the site is on Hugo, that is. Otherwise, the fallback image is another Cloudinary-hosted asset. In fact, its appearance in this page originates from Cloudinary, regardless of which SSG is in use.

{{< imgc src="typewriter-monochrome_2242164_6260x4374.jpg" alt="Monochrome view of hands typing on an old typewriter" width=6260 height=4374 >}}

I could also use the fallback image for other pages if I so chose. **Anyway**: if you have no such concerns about having a fallback image for your home page (or any other), feel free to ignore that part.

You'll notice that there's a *lot* of other metadata in this, and I recommend using it all.[^CCSEO] Still, for the specific purposes of this post, we're mainly concerned with building `$socImg` --- which will contain the final Cloudinary image transformation URL --- and supplying it at the end within your `twitter:image` and `og:image` metadata. **That** will then tell those SMPs to build a sharing card with your auto-generated title image whenever you share a link.

[^CCSEO]: Why? Check out the CloudCannon article, "[Hugo SEO Best Practices](https://cloudcannon.com/community/learn/hugo-seo-best-practices/)," to which I contributed.

```go-html-template
{{- $fallbackImg := resources.Get "/images/typewriter-monochrome_2242164_6260x4374.jpg" -}}
{{- $fallbackImg = $fallbackImg.Fit "1280x669" -}}
{{- $socImg := $fallbackImg.Permalink -}}
	{{/* fallback OG image if not we’re not on the home page */}}

{{/* Required meta tags */}}
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		{{ $twitterHandle := "@YourTwitterHandle" }}
		{{/* Provide that, of course. */}}
		<meta name="twitter:site" content="{{ $twitterHandle }}">
		<meta name="twitter:creator" content="{{ $twitterHandle }}">
		<meta name="twitter:card" content="summary_large_image">

	{{- if .IsHome }}
		<title>{{ .Site.Title }}</title>
		<meta name="description" content="{{ .Site.Params.Description }}">
		<link rel="canonical" href="{{ .Site.BaseURL }}">
		<meta property="og:title" content="{{ .Site.Title }}">
		<meta property="og:type" content="website">
		<meta property="og:description" content="{{ .Site.Params.Description }}">
		<meta property="og:url" content="{{ .Site.BaseURL }}">
		<meta property="twitter:title" content="{{ .Site.Title }}">
		<meta property="twitter:description" content="{{ .Site.Params.Description }}">
		<meta name="og:image" content="{{ $fallbackImg.Permalink }}">
		<meta name="twitter:image" content="{{ $fallbackImg.Permalink }}">
	{{- else }}
		{{- /*
			Now we’ll start building
			`$escapedTitle`, which is the
			text we’ll give Cloudinary to
			use for the title.
			We begin by creating this
			variable and assigning it
			the page's current title.
		*/ -}}
		{{- $escapedTitle := .Title -}}
		{{- /*
			Next, we start using Hugo’s
			`replace` function to change
			any troublesome characters to
			their “escaped” versions.
			As explained earlier in this post,
			Cloudinary requires “double-escaping”
			(meaning, escaping the `%` within
			as `%25`) the following characters
			as follows:
			- Percent sign %2525 (not just %25)
			- Comma %252C (not just %2C)
			- Forward slash %252F (not just %2F)
			- Emoji character (irrelevant to me;
				important only if you put emojis
				in titles)
		*/}}
		{{- $escapedTitle = replace $escapedTitle "%" "%2525" -}}{{/* percent sign */}}
			{{- /*
				You **MUST** put that one
				at the top to avoid
				fouling up the rest!!
			*/ -}}
		{{- $escapedTitle = replace $escapedTitle "," "%252C" -}}{{/* comma */}}
		{{- $escapedTitle = replace $escapedTitle "/" "%252F" -}}{{/* forward slash*/}}
		{{- /*
			From here on, the escaping
			goes more simply.
			These cover all the other
			special characters my own titles
			ever use. If yours use others,
			you may want to use that
			"URL Encode online" site
			I mentioned before:
			https://www.urlencoder.io/
		- */}}
		{{- $escapedTitle = replace $escapedTitle " " "%20" -}}{{/* regular space */}}
		{{- $escapedTitle = replace $escapedTitle ":" "%3A" -}}{{/* colon */}}
		{{- $escapedTitle = replace $escapedTitle ";" "%3B" -}}{{/* semicolon */}}
		{{- $escapedTitle = replace $escapedTitle "!" "%21" -}}{{/* exclamation point */}}
		{{- $escapedTitle = replace $escapedTitle "?" "%3F" -}}{{/* question mark */}}
		{{- $escapedTitle = replace $escapedTitle "+" "%2B" -}}{{/* plus sign */}}
		{{- $escapedTitle = replace $escapedTitle "—" "%E2%80%94" -}}{{/* em dash */}}
		{{- $escapedTitle = replace $escapedTitle "–" "%E2%80%93" -}}{{/* en dash */}}
		{{- $escapedTitle = replace $escapedTitle " " "%C2%A0" -}}{{/* nbsp */}}
		{{- $escapedTitle = replace $escapedTitle "•" "%E2%80%A2" -}}{{/* bullet */}}
		{{- $escapedTitle = replace $escapedTitle "#" "%23" -}}{{/* number sign or hash */}}
		{{- $escapedTitle = replace $escapedTitle "(" "%28" -}}{{/* opening parenthesis */}}
		{{- $escapedTitle = replace $escapedTitle ")" "%29" -}}{{/* closing parenthesis */}}
		{{- $escapedTitle = replace $escapedTitle '"' "%22" -}}{{- /*
			straight-up **double** quote character
			--- so the actual character
			must, therefore, be wrapped in
			**single** quote characters,
			unlike the others in this list
		*/ -}}
		{{- $escapedTitle = replace $escapedTitle "“" "%E2%80%9C" -}}{{/* opening curly double quote character */}}
		{{- $escapedTitle = replace $escapedTitle "”" "%E2%80%9D" -}}{{/* closing curly double quote character */}}
		{{- $escapedTitle = replace $escapedTitle "'" "%27" -}}{{- /* straight-up apostrophe or single quote character */ -}}
		{{- $escapedTitle = replace $escapedTitle "‘" "%E2%80%98" -}}{{/* opening curly single quote character */}}
		{{- $escapedTitle = replace $escapedTitle "’" "%E2%80%99" -}}{{/* curly apostrophe - closing curly single quote character */}}
		{{- $escapedTitle = replace $escapedTitle "‑" "%E2%80%91" -}}{{/* non-breaking hyphen */}}
		{{- /*
			Now we supply the other parameters.
		*/ -}}
		{{- $cloudName := "my-cloud-name" -}}
			{{- /*
				Must supply your own Cloudinary
				cloud name, of course!
			*/ -}}
		{{- $titleSize := 72 -}}{{/* pixels, not points */}}
		{{- $fontChoice := "arial" -}}
		{{- /*
			Arial is the default.
			It’s beyond this post’s scope
			to explain how to use any other
			fonts (much less uploaded ones),
			but we’ll leave this here
			in case you want to try it.
		*/ -}}
		{{- $titleWidth := 1036 -}}{{/* 72 each side from 1280 */}}
		{{- $myUploadedBkgd := "my-bkgd-3k4dvaxlzd" -}}
			{{- /*
				Fill in the Cloudinary-assigned
				**public ID** of your chosen,
				pre-uploaded background image.
				You can obtain that by going
				into your Cloudinary account
				and finding the image within
				your **Media Library**.
			*/ -}}

		{{- /*
			With everything now set,
			we assign to `$socImg` the
			resulting Cloudinary URL.
		*/ -}}
		{{- $socImg := print "https://res.cloudinary.com/" $cloudName "/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_" $titleWidth ",c_fit,co_rgb:ffffff,g_north,y_72,l_text:" $fontChoice "_" $titleSize "_center:" $escapedTitle "/" $myUploadedBkgd -}}

		{{- /*
			Now, back to more mundane
			stuff until we get back
			to the OG stuff at the end.
		*/ -}}

		<title>{{ .Title }} | {{ .Site.Title }}</title>
	 {{- if .Params.Description }}
		<meta name="description" content="{{ .Params.Description }}">
		<meta property="og:description" content="{{ .Params.Description }}">
		<meta property="twitter:description" content="{{ .Params.Description }}">
	 {{- else }}
		<meta name="description" content="{{ .Site.Params.Description }}">
		<meta name="og:description" content="{{ .Site.Params.Description }}">
		<meta name="twitter:description" content="{{ .Site.Params.Description }}">
	 {{- end }}
		<link rel="canonical" href="{{ .Page.Permalink }}">
		<meta property="og:title" content="{{ .Title }} | {{ .Site.Title }}">
		<meta property="og:type" content="article">
		<meta property="og:url" content="{{ .Page.Permalink }}">
		<meta property="twitter:title" content="{{ .Title }} | {{ .Site.Title }}">

		{{- /*
			And, finally, the payoff
			of our earlier endeavors
			with building `$socImg`...
		*/ -}}
		<meta name="og:image" content="{{ $socImg }}">
		<meta name="twitter:image" content="{{ $socImg }}">
	{{- end -}}
```

----

## Update, 2022-10-20

While Lengstorf's plugin can ease the process for users of JavaScript-based SSGs, it's not utterly necessary. For example, here's some [Nunjucks](https://mozilla.github.io/nunjucks) templating for use in Eleventy --- essentially mashing all the `replace` operations into one long line, which to my knowledge isn't possible in Hugo. (To avoid repetition, I haven't annotated it as in the Hugo example above.) This is adapted from [how I did it](https://github.com/brycewray/eleventy_site/blob/main/src/_includes/layouts/partials/head-meta_cloud-socimg.njk) in the [Eleventy version](https://github.com/brycewray/eleventy_site) of this site's repository.

```twig
{% set escapedTitle = title | replace("%", "%2525") | replace(",", "%252C") | replace("/", "%252F") | replace(" ", "%20") | replace(":", "%3A") | replace(";", "%3B") | replace("!", "%21") | replace("?", "%3F") | replace("+", "%2B") | replace("—", "%E2%80%94") | replace("–", "%E2%80%93") | replace(" ", "%C2%A0") | replace("•", "%E2%80%A2") | replace("#", "%23") | replace("(", "%28") | replace(")", "%29") | replace('"', "%22") | replace("“", "%E2%80%9C") | replace("”", "%E2%80%9D") | replace("'", "%27") | replace("‘", "%E2%80%98") | replace("’", "%E2%80%99") | replace("‑", "%E2%80%91") %}
{% set cloudName = "my-cloud-name" %}
{% set titleSize = 72 %}
{% set fontChoice = "arial" }
{% set titleWidth = 1036 %}{# 72 each side from 1280 #}
{% set myUploadedBkgd = "my-bkgd-3k4dvaxlzd" %}
	{# your preferred image's Cloudinary `public ID`, as explained earlier #}
{% set socImg = ["https://res.cloudinary.com/", cloudName, "/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_", titleWidth, ",c_fit,co_rgb:ffffff,g_north,y_72,l_text:", fontChoice, "_", titleSize, "_center:", escapedTitle, "/", myUploadedBkgd] | join %}
```

----

## References

- Adam Coti, "[The Essential Meta Tags for Social Media](https://css-tricks.com/essential-meta-tags-social-media/)" (last updated <span class="nobrk">2021-11-12</span>).
- Jason Lengstorf, [`get-share-image` package and documentation ](https://github.com/jlengstorf/get-share-image) (documentation last updated <span class="nobrk">2022-05-13</span>).
- Cloudinary documentation, "[Placing layers on images](https://cloudinary.com/documentation/layers)" (last-updated date unknown).
