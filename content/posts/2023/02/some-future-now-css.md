---
title: "Some of the future is now for CSS"
description: "Intrigued by news from the WebKit team, I adopt styling that could work natively in your browser in the near future."
author: Bryce Wray
date: 2023-02-13T09:04:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

As usual, my timing was less than stellar.

No sooner had I [finished revamping this site's styling setup](/posts/2023/02/using-dart-sass-hugo-taking-it-easy/) with the [`sass` package](https://github.com/sass/sass) than I learned that [truly native *CSS Nesting*](https://drafts.csswg.org/css-nesting/) --- as opposed to the non-native version which had long compelled my use of [Sass](https://sass-lang.com) in the first place --- might be arriving sooner than I'd thought likely. In essence: "the future is now" may not be accurate where CSS Nesting is concerned; but "some of the future is now" likely either is, or will be, before too long.

Thus, I spent a good part of this past weekend getting comfortable with how native CSS Nesting will work. In the process, I also learned a few interesting (and occasionally annoying) facts about fully native CSS, both as it exists now and as it may soon exist.

<!--more-->

## Word from the WebKit team

A few days ago, a [post](https://webkit.org/blog/13813/try-css-nesting-today-in-safari-technology-preview/) on the [WebKit blog](https://webkit.org/blog/) urged web developers to give CSS Nesting a try on [Safari Technology Preview 162](https://webkit.org/blog/13703/release-notes-for-safari-technology-preview-162/). The post, written by [long-time CSS guru Jen Simmons](https://front-end.social/@jensimmons) of the Apple/Webkit team, explained that the feature's [availability within both STP162 and Google Chrome 112+](https://caniuse.com/?search=CSS-nesting) provided a perfect opportunity to perform such tests.

(By the way: at this writing, the folks at Firefox [would seem](https://bugzilla.mozilla.org/show_bug.cgi?id=1648037) to be nowhere near ready to add CSS Nesting; indeed, the feature doesn't even appear on Mozilla's [Specification Positions page](https://mozilla.github.io/standards-positions/).)

To provide some perspective, here's a brief example of how nesting in Sass makes things easier. Instead of this in vanilla CSS:

```css
body {
	color: black;
	background-color: white;
}

@media (prefers-color-scheme: dark) {
	body {
		color: white;
		background-color: black;
	}
}
```

. . . Sass lets you write it this way:

```scss
body {
	color: black;
	background-color: white;
	@media (prefers-color-scheme: dark) {
		color: white;
		background-color: black;
	}
}
```

. . . and then produces the earlier CSS when you run it through Sass.

When you're editing CSS elements and classes with many rules, especially if many of those rules change depending on the results of media queries like the one shown here, nesting enables you to do a lot less typing and (if you don't go overboard with it) makes your final code more readable. Nesting in vanilla CSS **without** the need for tools like Sass and [PostCSS](https://postcss.org) is something web developers have long wanted, and which has been the subject of much discussion and debate over the years; but now, perhaps, it's crossing the line from Real Soon Now<sup>™</sup> to reality.

The two primary reasons why I've mainly used Sass here on this site have been nesting and variables. Although the latter feature, part of [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), has received good browser support for years now, CSS Nesting was the one biggie still hanging out there. With its seeming approach, Simmons's post made me decide to check it out.

However, I decided to implement it in a way that would work in pretty much *any* current browser: by using PostCSS along with the [`postcss-nesting` plugin](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting), which mirrors how the official CSS Nesting specification works. I also took this opportunity to begin using native CSS variables, too.

## From Sass to (kinda) native

For the most part, the transition between my Sass styling and its CSS-Nesting/custom-properties version went okay. I ran into a few rough spots, however.

### You can't get there from here

First of all, I learned that, unlike in Sass, you can't use a variable to declare a media query. In Sass, you can do this:

```scss
$breakpoint-large: 1024px;

h1 {
	font-size: 3rem;
	@media screen and (min-width: $breakpoint-large) {
		font-size: 4rem;
	}
}
```

. . . but you can't do this with CSS variables:

```css
:root {
	--breakpoint-large: 1024px;
}

/* This media query **won't** work: */
h1 {
	font-size: 3rem;
	@media screen and (min-width: var(--breakpoint-large)) {
		font-size: 4rem;
	}
}
```

[Ben Holmes's article explains it well](https://bholmes.dev/blog/alternative-to-css-variable-media-queries/). But, hey, that's what search/replace is for, so I learned to live with it and do this, instead (same example):

```css
/* This media query **will** work: */
h1 {
	font-size: 3rem;
	@media screen and (min-width: 1024px) {
		font-size: 4rem;
	}
}
```

Another thing that brought me up short was the fact that the CSS Nesting spec [doesn't allow concatenating selectors](https://drafts.csswg.org/css-nesting/#syntax), although Sass and some other nesting-savvy add-ons do. Here's a Sass example of what I mean:

```scss
.homepage {
	font-family: sans-serif;
	&Leftside {
		text-align: right;
		font-size: 2rem;
	}
}
```

. . . which Sass would compile to:

```css
/* This is the desired result */
.homepage {
	font-family: sans-serif;
}
.homepageLeftside {
	text-align: right;
	font-size: 2rem;
}
```

But if you try this with the CSS Nesting spec, you get:

```css
/*
	This is NOT the desired result,
  but is what you get from CSS Nesting.
*/

.homepage: {
	font-family: sans-serif;
}
Leftside.homepage {
	text-align: right;
	font-size: 2rem;
}
```

Thus, with CSS Nesting, you'd have to do that sort of thing more manually. Fortunately, I didn't have a lot of those to fix.

### Partial-ly troublesome

Yet another temporary snag was that, through using PostCSS from `package.json` to create the CSS files for [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/) to use, I had to alter my usual practice of using [Sass partials](https://sass-lang.com/guide#topic-4) for better organization of my styling. After getting [some help with this from Joe Mooring on the Hugo Discourse forum](https://discourse.gohugo.io/t/css-and-import/42901/4?u=bwintx), I renamed each partial so that Hugo Pipes would slurp them up in the right order:

```plaintext
.   <-- The Hugo project folder
└─ themes
    └─ newcss
        └─ assets
            └─ cssfrom
                └─ partials
                    └─ 001_reset.css
                    └─ 002_variables.css
                    └─ 003_global.css
                    └─ 050_utility.css
                    └─ 060_nav.css
                    └─ 070_vweights.css
                    └─ 080_ffoxobliq.css
                    └─ 099_print.css
```

Why `cssfrom` as that subfolder name in `themes/newcss/assets/`, by the way? Because the `css` folder[^gitIgnore] --- *i.e.*, the one my templating tells Hugo Pipes to watch --- would be created and auto-populated during the running of PostCSS from `package.json`, such as in these scripts:

[^gitIgnore]: I include `themes/newcss/assets/css` in `.gitIgnore`, since this folder and its contents get built every time I run Hugo.

```json
"postcsscli": "postcss themes/newcss/assets/cssfrom --dir themes/newcss/assets/css",
"dev:postcss": "npm run postcsscli -- --watch",
```

. . . whereupon Hugo Pipes would be able to snarf it up for the critical CSS to go in the `head`:

```go-html-template
{{- $css := "" -}}
{{- $css = (resources.Match "css/0*.css") | resources.Concat "critical.css" -}}
{{- with $css }}
	<style>{{ .Content | safeCSS }}</style>
{{- end }}
```

. . . as well as for the ["sorta scoped" styling](/posts/2023/01/sorta-scoped-styling-hugo-take-two/) that Hugo includes conditionally throughout the site:

```go-html-template
{{- range $cssTypes -}}
	{{- $condition = index . 0 -}}
	{{- $fileName = index . 1 -}}
	{{- if eq $condition true -}}
		{{- $css = resources.Get (print "css/" $fileName ".css") -}}
		{{- if hugo.IsProduction -}}
			{{- $css = $css | minify | fingerprint "md5" -}}
		{{- end -}}
		<link rel="preload" href="{{ $css.RelPermalink }}" as="style">
		<link rel="stylesheet" href="{{ $css.RelPermalink }}" type="text/css">
	{{- end -}}
{{- end }}
```

**Note**: If those lines from `package.json` have you wondering why I did it this way rather than relying solely on Hugo Pipes' [built-in PostCSS capabilities](https://gohugo.io/hugo-pipes/postcss/), it's because this approach works ten to fifteen times faster in dev mode *and* seems to be a lot easier on my old box's CPU.
{.box}

## Sharing arrangement

So, now, I have two themes for the site: (1.) one with Sass, and (2.) one with CSS variables *and* PostCSS-enabled CSS Nesting. One nice thing about this setup is that, unlike the times when I've had a Sass theme and a [Tailwind CSS](https://tailwindcss.com) theme, I don't need two completely different sets of layouts and Hugo partials to work with each theme. Rather, the two themes can share the same layouts and nearly[^twoPartials] all the same partials, because these template files' final CSS classes and rules are the same. Indeed, the only drawback to the setup is that the `scripts` part of `package.json` has grown quite a bit, since I have to provide for both Sass and PostCSS.

[^twoPartials]: Actually, there are three Hugo partials unique to each theme. Two, excerpted above, are for the slightly different code that pulls in the styling; and one is for the footer so I can specify, on the ["About" page](/about/), whether the site is using Sass or PostCSS.

Of course, I assume the CSS Nesting specification --- whatever its sort-of-final form will take --- will get largely universal browser support someday, at which point things could get a lot simpler. Until then, though, this setup will suffice.

**Update later in the day**: After [receiving some additional information from Jen Simmons via Mastodon](https://front-end.social/@jensimmons/109860757024965588), I revised/corrected links and examples in this posts. Thanks, Jen!
{.box}
