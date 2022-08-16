---
title: "Sorta scoped styling in Hugo"
description: "Interested in more efficient CSS for your site? Hugo doesn’t make it easy, but here’s a suggested way you might get there."
author: Bryce Wray
date: 2022-06-12T16:10:00-05:00
lastmod: 2022-07-22T22:16:00-05:00
#initTextEditor: iA Writer
discussionId: "2022-06-sorta-scoped-styling-hugo"
---

**Acknowledgment**: I express tremendous thanks to [Daniel F. Dickinson](https://github.com/danielfdickinson/), without whose [help on the Hugo Discourse forum](https://discourse.gohugo.io/t/different-results-for-if-in-params-tags-test/38990/4) I wouldn't have been able to implement the code described in this post. *Thank you again, kind sir!*
{.yellowBox}

It's been years since the [rise of HTML5/CSS3 got front-end developers thinking about ways to have *scoped styling*](https://css-tricks.com/saving-the-day-with-scoped-css/) --- at least, before [browsers stopped supporting it](https://twitter.com/ebidel/status/476026012610748416) and web devs had to depend on their build tools for scoping.

Even now, as scoped CSS [may (again) be approaching standard status](https://css-tricks.com/early-days-for-css-scoping/), many devs remain dependent upon build tools and frameworks to accomplish scoping. These needs seem to account for a good portion of the popularity behind [Next.js](https://nextjs.org), [Vite](https://vitejs.dev), [Astro](https://astro.build), [Svelte](https://svelte.dev), and the more obscure (yet amazing[^iles]) [îles](https://iles-docs.netlify.app/). Scoped styling in these depend heavily on the idea of *component*-based development, with each component having its own specific styling.

[^iles]: Although the scrappy îles is dwarfed by the well-funded site-builder tools against which it's compared, it's *far* more capable in many ways. For example: although both Astro and îles use Vite and the [remark](https://github.com/remarkjs/remark)/[rehype](https://github.com/rehypejs/rehype) combo, îles is *much* faster in dev mode, even with hundreds of [Markdown](https://daringfireball.net/projects/markdown) files in one's îles site folder. Under similar circumstances, Markdown edits in Astro can take several *seconds* to appear on screen, yet they happen nearly instantaneously in îles. In fact, I wish the Astro team would adapt the îles code for their purposes, much as they switched last year from their own [Snowpack](https://www.snowpack.dev) build tool to Vite when they correctly surmised the latter would better serve Astro.

Then we come to the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG). And, well, Hugo can't do any of that, at least not out of the box. I don't think such capabilities are even on the Hugo roadmap, if my looks through the [project repo](https://github.com/gohugoio/hugo) are accurate indicators thereof.

Still, the use of scoped styling in other projects makes people ask about it when they find their way to Hugo from elsewhere. For example, note this [Hugo Discourse forum thread from December, 2020](https://discourse.gohugo.io/t/how-to-organize-css-scss-with-hugo-with-scoped-css/30047), started by a Svelte user. When I found it, I was intrigued by one particular comment from developer [Jim Fisk](https://github.com/jimafisk):

> I usually break styles into their own component SCSS files that map to HTML partials . . . It doesn’t scope the style, but puts things in a logical place for a component[-]based design approach.

This resonated with me because of how I already organized my site's SCSS partials --- which I'd been doing even before seeing a video from [Kevin Powell](https://www.kevinpowell.co/) about how to set up one's styling files (although I found additional inspiration in what he described):

{{< lite-youtube videoTitle="Get your stylesheets more organized with Sass partials" videoId="9Ld-aOKsEDk" >}}

I already had SCSS partials that were pretty specific to certain content types, but up to then I'd been channeling all of them into one big `index` CSS file for use by every page on the site. Of course, it's a colossal understatement to call this "suboptimal."

In the world of JavaScript-based SSGs, there are plugins and, again, build tools to resolve such situations, albeit not necessarily with ease. But what about in this site when it lives on Hugo, as it does at this writing? I pondered this for a few days.

Finally, I wondered, what if I reworked not just my SCSS files but also my site itself, so as to generate different styling files for different pages, based on their content? After all, that's essentially what build tools like Vite do, but they just do it automatically, working with the scoped styling from the applicable frameworks. With Hugo, this would have to be largely manual; but, the nitty-gritty of how to get there notwithstanding, that approach appeared to make the most sense.

## What I decided to do

After a few days and nights of tinkering, and a false start or two, here's the solution I reached.

First, every page would get certain *global* styling. Obviously, it then would be my ongoing challenge to pare down that styling to what's utterly needed site-wide.

I also would decide what styling each page would need, based on its content, and **tag** it accordingly. (Thank goodness for search functions.) As of this writing, I've come up with five categories:
- *post* --- Pretty self-evident.
- *code* --- For not only code blocks but also any code at all, even if only a word or two (like this: `<div>`).[^codeSCSS]
- *img* --- Images onboard.
- *social* --- Any embedded [Twitter](https://twitter.com) tweets or [Mastodon](https://joinmastodon.org) toots.
- *YouTube* --- Embedded [YouTube](https://youtube.com) videos.

[^codeSCSS]: This one can be especially problematic where trimming one's CSS is concerned. The code-specific SCSS gets pretty "thicc," as the kids would say, due to the massive number of styles required for syntax highlighting.

The final code would give each page however much SCSS/CSS it needed, based on those content tags. (There'd also be a minimal-CSS fallback for non-applicable pages, like the site's *404* page.) Thus, if a page had the following tagging:

```yaml
---
tags:
- post
- code
- YouTube
```

. . . it would get the global styling, plus styling for just those three types of content (virtually all of them get `post` styling, as you'd suspect) --- but **not** for the *img* and *social* types.

As for that content-based styling itself, that would require creating appropriate SCSS files which, at build time, Hugo would use to generate the final CSS. There would be one SCSS file for each possible *combination* of tags. Each file would provide the global styling plus the content-specific styling. So, again in the example above, there'd be a `post-code-yt.scss` file which, during the build process, Hugo would use to build `post-code-yt` CSS and assign it to the page. Fortunately, I had plenty of existing SCSS *[partials](https://sass-lang.com/guide#topic-4)* for building each such SCSS file, but I knew this new setup would require better organization --- so, following Kevin Powell's example, I reworked `assets/scss/` so that, rather than having an `index.scss` plus all the partials living in that one level, it would end up like this:

```plaintext
.
└── assets
		└── scss
				└── partials
				└── sectionals
```

In `assets/scss/partials/` would live all the partials, as is obvious, while `assets/scss/sectionals/` would contain the content-specific SCSS files.[^nameSCSS]

[^nameSCSS]: I didn't call this folder `assets/scss/content/` because I didn't want to risk any confusion between this folder and the site's overall `content/` folder, in case I ever had to describe it to anyone --- as, um, I'm doing here. As for why I chose the name `sectionals`, that's probably because I was thinking about specific Hugo *[sections](https://gohugo.io/content-management/sections/)*, even though these would apply more granularly rather than only to true sections. (Ah, well, you probably know the old CompSci adage about the difficulty of naming things.)

So how would all the SCSS files work in practice? Well, let's take that `post-code-yt.scss` file (I've removed all but two lines of the real file's commenting, for your convenience):

```scss
@charset 'utf-8';
@use '../partials/reset';
// @use 'partials/variables';
//   calling it where needed within files
@use '../partials/chroma_native_tweaked';
@use '../partials/chroma_fix-all';
@use '../partials/global';
@use '../partials/utility';
@use '../partials/billboard';
@use '../partials/posts';
@use '../partials/footnotes';
@use '../partials/nav';
@use '../partials/vweights';
@use '../partials/ffoxobliq';
@use '../partials/lite-yt-embed';
@use '../partials/print';
```

**Important**: The `@use` statements require [Dart Sass](https://sass-lang.com/dart-sass). A Hugo site still using the older, [deprecated LibSass](https://sass-lang.com/blog/libsass-is-deprecated) would use `@import` instead; also, in the example above, you'd have to `@import` the `../partials/variables` partial, since individual LibSass files can't `@use` that partial. For information on the differences between `@use` and `@import`, see [this explanation](https://sass-lang.com/documentation/at-rules/import) on the [Sass website](https://sass-lang.com).\
Also, if you want to run Dart Sass with Hugo --- which I strongly recommend, if your setup allows --- please refer to my recent post, "[Using Dart Sass with Hugo: the nitty-gritty](/posts/2022/05/using-dart-sass-hugo-nitty-gritty/)" (you may first want to see its predecessor, "[Using Dart Sass with Hugo: the GitHub Actions edition](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/)").
{.yellowBox}

Once I'd spent some time getting all those "sectional" combos done, all that was left --- and you realize I'm being facetious by saying "all" --- was to get Hugo to use it all as intended.

## The code to make it work

To keep from (further) bulking up the Hugo partial `head.html`, I moved all the styles-handling code to a separate partial, `css.html`, and called it from within `head.html`:

```go-html-template
{{- partial "css.html" . -}}
```

And here's what's in `css.html` at this writing (I've edited out certain now-unused items, while adding plenty of comments to help explain things).

```go-html-template
{{/*-
	Dart Sass Embedded stuff herein:
	- Based on https://discourse.gohugo.io/t/using-dart-sass-hugo-and-netlify/37099/7
	- thanks, @bep!

	And thanks very much to Daniel F. Dickinson
	(https://wildtechgarden.ca) for helping me
	debug the logic, below, on 2022-06-11:
	https://discourse.gohugo.io/t/different-results-for-if-in-params-tags-test/38990
-*/}}

{{- $currentPage := .Page -}}
{{/*
	$currentPage helps debug this during dev,
	to make sure we have all the necessary
	SCSS at the end.

	Then we initialize some variables
	we'll use down the way . . .
*/}}
{{- $css := "" -}}
{{- $scss := "" -}}
{{- $cssBuild := "scss/sectionals/" -}}

{{/*
	Unfortunately, I know of no loop that
	will accomplish the next part,
	so we have to do this manually:
	for **each** content combination,
	we assign a variable to a *slice* (array).
	Each slice contains two items:

	(1.) The name of the SCSS file, minus
	the .scss extension (to come later),
	for this content combination.

	(2.) A **nested** slice which contains
	the relevant tags for this content.

	(Note that the tags are in alphabetical order.
	You could address that separately with `sort`,
	of course, if you didn't want to worry about it.
	When we test for the tags below, we'll use
	`sort` there. This is necessary because we'll
	be testing for equality, so the order must be exact.)
*/}}

{{- $postCodeImgSocYT := slice "post-code-img-social-yt" (slice "code" "img" "post" "social" "YouTube") -}}
{{- $postCodeSocYT := slice "post-code-social-yt" (slice "code" "post" "social" "YouTube") -}}
{{- $postCodeSoc := slice "post-code-social" (slice "code" "post" "social") -}}
{{- $postCodeImgYT := slice "post-code-img-yt" (slice "code" "img" "post" "YouTube") -}}
{{- $postCodeImg := slice "post-code-img" (slice "code" "img" "post") -}}
{{- $postCodeImgSoc := slice "post-code-img-social" (slice "code" "img" "post" "social") -}}
{{- $postCodeImgTables := slice "post-code-img-tables" (slice "code" "img" "post" "tables") -}}
{{- $postCode := slice "post-code" (slice "code" "post") -}}
{{- $postCodeYT := slice "post-code-yt" (slice "code" "post" "YouTube") -}}
{{- $postImgSocYT := slice "post-img-social-yt" (slice "img" "post" "social" "YouTube") -}}
{{- $postImgSoc := slice "post-img-social" (slice "img" "post" "social") -}}
{{- $postImgYT := slice "post-img-yt" (slice "img" "post" "YouTube") -}}
{{- $postImg := slice "post-img" (slice "img" "post") -}}
{{- $postSocYT := slice "post-social-yt" (slice "post" "social" "YouTube") -}}
{{- $postSoc := slice "post-social" (slice "post" "social") -}}
{{- $postTables := slice "post-tables" (slice "post" "tables") -}}
{{- $postYT := slice "post-yt" (slice "post" "YouTube") -}}
{{- $post := slice "post" (slice "post") }}
{{- $about := slice "post" (slice "about" "img") -}}
{{- $postsList := slice "post" (slice "postsList") -}}
{{- $contact := slice "contact" (slice "contact") }}
{{- $privacy := slice "privacy" (slice "privacy") -}}
{{- $home := slice "home" (slice "code" "home") -}}
{{- $sitemap := slice "sitemap" (slice "sitemap") -}}

{{/*
	Now, we combine all those slices into
	one **big** slice named, um, $bigSlice . . .
*/}}

{{- $bigSlice := slice -}}
{{- $bigSlice = append $postCodeImgSocYT $postCodeSocYT $postCodeSoc $postCodeImgYT $postCodeImg $postCodeImgSoc $postCodeImgTables $postCode $postCodeYT $postImgSocYT $postImgSoc $postImgYT $postImg $postSocYT $postSoc $postTables $postYT $post $about $postsList $contact $privacy $home $sitemap $bigSlice -}}
{{/*
	. . . through which we'll soon loop.

	Next, we initialize a few more variables . . .
*/}}

{{- $filePrefix := "" -}}
{{- $targetFilePrefix := "" }}
{{- $tagItems := "" -}}
{{- $tags := "" -}}

{{/*
	And now we get to the meat of this puppy.

	It identifies the current page's tags,
	and sorts them alphabetically (remember
	the earlier comment about the need for
	`sort` here?).

	Next, it does a `range` loop through the
	big slice's own set of slices. (It's turtles
	all the way down, friends.) The loop compares
	each individual slice's **nested** slice
	to the page's tags and, if they match,
	it tells Hugo which SCSS file to use in
	the CSS-generation part at the end.
	(We'll add the `.scss` extender later.)

	It also gets a $filePrefix (the name
	before `.css`) to be given to the CSS file
	that Hugo will generate.
*/}}

{{- with .Params.tags -}}
	{{ $tags = . }}
	{{ $tags = sort $tags }}
	{{ range $bigSlice }}
		{{- $filePrefix = index . 0 -}}
		{{- $tagItems = index . 1 -}}
		{{- if eq $tags $tagItems -}}
			{{- $cssBuild = print $cssBuild $filePrefix -}}
			{{- $targetFilePrefix = $filePrefix -}}
		{{- end }}
	{{- end }}
{{- end -}}
{{ if eq $cssBuild "scss/sectionals/" -}}
	{{/*
		This is a fallback, such as for /404.html.
	*/}}
	{{- $cssBuild = print $cssBuild "critical" -}}
	{{- $targetFilePrefix = "critical" -}}
{{- end -}}

{{- $cssBuild = print $cssBuild ".scss" -}}
{{/*
	This completes the full internal path
	for this content's SCSS file.
*/}}

{{- $targetPath := print "css/" $targetFilePrefix ".css" -}}

{{/*
	Now we have everything Hugo needs,
	so from here it's **mostly** a normal
	Hugo Pipes SCSS-to-CSS operation.

	**Note**: Remember that what's below
	is using Dart Sass, rather than LibSass,
	which is why there's a "transpiler"
	statement in what we'll feed Hugo.
	If necessary, see:
	https://gohugo.io/hugo-pipes/scss-sass/#options

	If you're using LibSass, remove
	`"transpiler" "dartsass"` from the
	$optionsCSS assignment below.
*/}}

{{- $optionsCSS := (dict "transpiler" "dartsass" "targetPath" $targetPath "outputStyle" "compressed") -}}
{{- $optionsCSS_FP := merge $optionsCSS (dict "fingerprint" "md5")}}
{{/*
	`"fingerprint" "md5"` is for cache-busting only.
*/}}
{{- with $cssBuild -}}
	{{- $scss = resources.Get $cssBuild }}
	{{- if $scss -}}
		{{- $css = $scss | resources.ToCSS $optionsCSS | fingerprint "md5" -}}
		<link rel="preload" as="style" href="{{ $css.RelPermalink }}">
		<link rel="stylesheet" href="{{ $css.RelPermalink }}" type="text/css">
	{{- else -}}
		{{- warnf (printf "No scss found for page %s" $currentPage.TranslationKey) -}}
		{{/*
			The `if $scss` test is from when
			Mr. Dickinson helped me.

			Before it was there, Hugo crashed in the
			dev process because I'd made some mistakes
			in the slice with the SCSS file names.
			Mr. Dickinson's test showed that.

			I suggest leaving it as-is, just in case.
		*/}}
	{{- end -}}
{{- end -}}
```

## What do you get?

So, after all this effort, what's the result?

In the browser, each page calls one specific CSS file, hashed for cache-busting, to match its exact content types as indicated by the page's tagging.

For example: at one point while I was writing this, going to the site's home page brought the following[^nonce] --- although, here, I've reformatted it for easier reading:

[^nonce]: Well, that's except for the auto-generated *[nonce](https://content-security-policy.com/nonce/)*, which I've omitted here since it's different on each browser load --- thanks to a [Cloudflare Worker](https://workers.cloudflare.com). I've omitted the nonce item on the other example, too.

```html
<link
	rel="preload"
	as="style"
	href="/css/home.faef8a213bef990983a4241e7f2fb518.css"
>
<link
	rel="stylesheet"
	href="/css/home.faef8a213bef990983a4241e7f2fb518.css"
	type="text/css"
>
```

It was tagged as `home` and `code`, which gets it the `home.scss` file and, thus, this CSS file.

For another example: my post, "[Hugo hits The Hundy](/posts/2022/06/hugo-hits-hundy/)," got this (again, with reformatting just for your reading purposes):

```html
<link
	rel="preload"
	as="style"
	href="/css/post-code-social.dc74163e3d77d84db4d51d66a5f1c55f.css"
>
<link
	rel="stylesheet"
	href="/css/post-code-social.dc74163e3d77d84db4d51d66a5f1c55f.css"
	type="text/css"
>
```

Its tags of `post`, `social`, and `code` got it the `post-code-social.scss` file, which Hugo turned into the hashed CSS file shown.

## What's left to do?

Of course, this is very much a work in progress. While the current setup has already provided impressive size savings on the per-page CSS load, I need to refine the global styling so that the part *every* page gets will be lighter. Similarly: at this writing, I still have the [posts list](/posts/) *and* each individual post using some of the same SCSS, and I'm pretty sure I can improve on that so that their respective CSS loads will be more discrete and specialized.

Still, if I do say so myself, I think this is a good start. It's probably a lot more manual than many of you would want to try --- and I'm sure someone can point out ways to clean up the process of creating all the nested slices for `$bigSlice` --- but, if you're interested in getting the closest to truly scoped styling that Hugo-without-help can provide, this at least may give you some ideas as to how you can proceed.

**Update, 2022-06-28**: Consider this now an abandoned experiment. I went with it for a couple of weeks, but, in the end, decided to revert to my previous definitely-**not**-scoped configuration after seeing that *this* method hampered attempts to make certain styling changes --- that is, *without* invoking chaos which wasn't worth my time to resolve. Perhaps you'll have better luck with it.
{.yellowBox}
