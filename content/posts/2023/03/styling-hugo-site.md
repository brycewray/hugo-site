---
title: "Styling your Hugo website"
description: "If you’re just starting out and don’t know how to move toward The Final Design, give these ideas some consideration."
author: Bryce Wray
date: 2023-03-27T11:11:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

When you enter that `hugo new site` command to create a new website in the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG), part of the response you'll see involves selecting a [theme](https://themes.gohugo.io). That's because it's part of [The Official Advice for starting a Hugo site](https://gohugo.io/getting-started/quick-start/).

However, [I strongly disagree](/posts/2022/07/really-getting-started-hugo/) with that approach. I say it's better if you *don't* use a theme, especially if you're just getting going with Hugo, because that way you'll learn more about it, and more quickly.

Of course, if you do follow my very *un*official advice, you'll then have to style the site yourself to get a desired look-and-feel. So it behooves me to walk you through the most likely ways you would go about doing so.

<!--more-->

As I see it, here are the three options from which you'll probably choose:

- So-called "vanilla" CSS
- Sass
- A particular CSS framework (hint, hint)

From here on, I'll use the term *The Final Design* to refer to the appearance and behavior you want your site to have. If you don't yet have a clue about The Final Design, you'd be wasting your time trying to use any of these options. Your first priority is getting at least some plan for The Final Design.

Where an option makes it possible, we'll make use of Hugo's built-in asset pipeline, [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/), for [fingerprinting and sub-resource integrity](https://gohugo.io/hugo-pipes/fingerprint/) (SRI), as well as minification where applicable. The fingerprinting results in a file with a long, hashed name, such as:

```bash
index.b670b5804d52b40049bb0f2705118be41cc4fa27322079ee9f328ad85591d529.css
```

. . . which gives you the benefits of [cache-busting](https://tomanistor.com/blog/cache-bust-that-asset) in addition to those of SRI.

All of what follows is based on the assumption that you're doing this on your own rather than as part of a team effort. If it's the latter scenario, none of this may matter. (For example: if your team is already committed to a particular styling framework, that's pretty much your only pathway.)

## Using vanilla CSS

As someone [once explained on Stack Overflow](https://stackoverflow.com/questions/40115768/what-is-vanilla-css-and-why):

> *Vanilla CSS* is just CSS, "vanilla" making it absolutely clear that it's CSS and not a superset of it.[^edit]

[^edit]: Edited for style.

In other words, you might even call it "plain ol' CSS" (except that [it's not necessarily so "plain" these days](/posts/2023/02/some-future-now-css/), and will be even less so in the not-too-distant future). Any modern browser, not to mention Hugo or any other site-building platform, will use it without a problem or the need for any extra setup.

**Vanilla CSS is best if**:

- You have a reasonably good idea of The Final Design.
- You have at least some experience (preferably a lot, unless The Final Design is exceedingly simple) with writing your own CSS.
- You're willing to write all your CSS from scratch.
- You don't need to [nest](https://blog.logrocket.com/native-css-nesting/) your CSS, at least not until whenever that's natively available in all modern browsers.
- You want the greatest control over your final CSS.
- You want a "pure-Hugo" development experience --- *i.e.*, one that's free of [npm packages](https://docs.npmjs.com/about-packages-and-modules), an ever-growing [`node_modules` folder](https://docs.npmjs.com/cli/v7/configuring-npm/folders), and the like.

Here, we use Hugo Pipes to minify the CSS, fingerprint it, and apply SRI. This presumes the CSS is one file, `assets/css/index.css`. It will end up in your Hugo site as a CSS file within `css/`.

```go-html-template
{{- $css = resources.Get "css/index.css" | minify | fingerprint -}}
<link rel="stylesheet" href="{{ $css.RelPermalink }}" type="text/css" media="screen" integrity="{{ $css.Data.Integrity }}">
```

## Using Sass

To be clear at the outset: by "[Sass](https://sass-lang.com)," I mean *SCSS* --- *i.e.*, `.scss` files, not `.sass` files.[^sassFormat] [Any valid CSS works in an SCSS file](https://sass-lang.com/guide), so you can start with vanilla CSS and then, as desired, add SCSS-specific styling with special capabilities which vanilla CSS either won't allow for now or [probably never will allow](/posts/2021/04/speaking-up-for-sass/#stuff-that-css-may-never-do). That works because Sass compiles SCSS down to, you guessed it, vanilla CSS that any modern browser is happy to use.

[^sassFormat]: If you're already comfortable with `.sass` files and their non-standard format *vs.* that of the less alien-looking `.scss`, I assume you're sufficiently knowledgeable as to require zero help from me where styling your site is concerned.

*However*, at this time, you do still have to configure Hugo to use the currently supported version, [Dart Sass](https://sass-lang.com/dart-sass), because there isn't yet a way to do it entirely within Hugo (as was once possible with the [deprecated LibSass](https://sass-lang.com/blog/libsass-is-deprecated)). For now, you have two ways to resolve this:

- **Using the [`sass` npm package](https://github.com/sass/sass)** --- Requires you to [use scripting in a `package.json` file](/posts/2023/02/using-dart-sass-hugo-taking-it-easy/) to make the package handle the SCSS-to-CSS compilation outside of Hugo, at which point you have Hugo Pipes process any resulting CSS files.
- **Using the [Embedded Dart Sass binary](https://github.com/sass/dart-sass-embedded/)** --- Enables lightning-fast processing directly through Hugo Pipes, **but** requires installing that binary in the `PATH` of both your development and production environments. I've written about two ways to do that: [scripting](/posts/2022/03/using-dart-sass-hugo-sequel/); and [CI/CD](https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html) through either [GitHub Actions](https://www.brycewray.com/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) or [GitLab CI/CD](https://www.brycewray.com/posts/2022/08/using-dart-sass-hugo-gitlab-edition/).

Although the combination of Hugo and Embedded Dart Sass produces great results with outstanding dev-environment performance, it may require more technical hassle than you're willing to endure on a regular basis. If so, you could be perfectly content using Hugo with the `sass` npm package.

**Sass is best if**:

- You have a reasonably good idea of The Final Design.
- You have at least some experience (preferably a lot, unless The Final Design is exceedingly simple) with writing your own CSS/SCSS.
- You're willing to write all your CSS/SCSS from scratch.
- You want to nest your styles now, without having to wait for browsers to support it in vanilla CSS.
- You want the greatest control over your final CSS/SCSS.
- You're willing to install one or more additional software packages in your Hugo project and, in the case of Embedded Dart Sass, your development and production environments.

### With the `sass` npm package

If you use the `sass` package, it's handling the SCSS-to-CSS compilation apart from Hugo. In this version of our earlier example, we'll have it compile `assets/scss/index.css` to `assets/css/index.css` for Hugo Pipes to use.[^ignore] (You could do that with `package.json` scripting like [what I recently described](/posts/2023/02/using-dart-sass-hugo-taking-it-easy/).) From there, just as with vanilla CSS, we use Hugo Pipes to minify the CSS, fingerprint it, and apply SRI, so it will end up in your Hugo site as a CSS file within `css/`.

[^ignore]: In that case, you may want to add `assets/css` to your .gitignore file, since it'll change every time you edit your SCSS. Otherwise, each SCSS change means committing *two* files rather than just the one SCSS file you actually edited.

```go-html-template
{{- $css = resources.Get "css/index.css" | minify | fingerprint -}}
<link rel="stylesheet" href="{{ $css.RelPermalink }}" type="text/css" media="screen" integrity="{{ $css.Data.Integrity }}">
```

### With Embedded Dart Sass

Here, we use Hugo Pipes to convert the SCSS into CSS (already `compressed` --- *i.e.*, minified --- by the Dart Sass transpiler in coordination with Hugo Pipes), fingerprint it, and apply SRI. This presumes the SCSS is one file, `assets/scss/index.scss`. It will end up in your Hugo site as a CSS file within `css/`.

```go-html-template
{{- $cssOptions := dict "outputStyle" "compressed" "transpiler" "dartsass" "targetPath" "css/index.css" -}}
{{- $css := resources.Get "scss/index.scss" | toCSS $cssOptions | fingerprint -}}
<link rel="stylesheet" href="{{ $css.RelPermalink }}" type="text/css" media="screen" integrity="{{ $css.Data.Integrity }}">
```

## The Tailwind CSS framework

For those who *aren't* thrilled with the idea of writing their own styling from scratch, *CSS frameworks* can provide an escape. A CSS framework contains a mixture of pre-existing CSS files --- and, often, JavaScript files --- that one can manipulate to produce a desired look-and-feel without having to re-invent the proverbial wheel.

The framework I'll mention is the one of which you've probably heard the most, [Tailwind CSS](https://tailwindcss.com). It's very well-documented and widely used, and has been around quite a while, so you have a good-to-excellent chance of finding help when you need it.

Love it or hate it, Tailwind's *utility-first* approach can save you from dealing with some of CSS's infamous complexities when you're struggling to make a layout look the way you want; but, the more CSS you *do* know, the more you'll get out of *any* CSS framework. Tailwind just allows you to do it (usually) entirely in your HTML, rather than going back and forth between HTML and CSS files.

For example, let's say you're trying to decide on how to make an `h1` heading look its best in various screen sizes. You can do the following in separate HTML and CSS files:

```html
<!-- === html === -->

<h1>This is my heading</h1>
```

```css
/* === css === */

/* for small screens */
h1 {
	margin: 1rem 0 0.25rem;
}

/* for other screen sizes */
@media screen and (min-width: 768px) {
	h1 {
		margin: 1.25rem 0 0.5rem;
	}
}
@media screen and (min-width: 1024px) {
	h1 {
		margin: 1.5rem 0 0.75rem;
	}
}
@media screen and (min-width: 1280px) {
	h1 {
		margin: 1.75rem 0 1rem;
	}
}
@media screen and (min-width: 1536px) {
	h1 {
		margin: 2rem 0 1.25rem;
	}
}
```

. . . or, in Tailwind, you can do all this in just one line, albeit a long one, of your HTML:

```html
<!-- === html === -->

<h1 class="mt-4 mb-1 md:mt-5 md:mb-2 lg:mt-6 lg:mb-3 xl:mt-7 xl:mb-4 2xl:mt-8 2xl:mb-5">This is my heading</h1>
```

As you can gather, you'll have to spend some time getting familiar with these utility classes. However, before long, you'll grasp Tailwind's systematic approach to class names --- *e.g.*, how each number increment in margin-related class names like `mt` and `mb` signifies an additional 0.25-rem space, or which breakpoints are indicated by `md`, `lg`, `xl`, and `2xl` --- and be able to work much more rapidly than with the conventional HTML/CSS approach.

**Tailwind CSS is best if**:

- You have a rough idea of The Final Design but need to play with it as much as possible during the process.
- You have some knowledge, but not necessarily a lot, of CSS.
- You'd prefer not to edit your HTML and CSS in separate files.
- You have at least a passing familiarity with JavaScript, chiefly for configuring Tailwind (although you may be fine with its various defaults).
- You're willing to install some npm packages in your Hugo project. I say "packages" because, although Tailwind v.3.x by itself doesn't require [PostCSS](https://postcss.org) as it once did, [Hugo-with-Tailwind-v.3.x does](/posts/2022/03/making-tailwind-jit-work-hugo-version-3-edition/).
- You're in a hurry. That presumes a *post*-learning-curve hurry, of course; at first, you'll be getting the hang of Tailwind itself.

As of this post's initial publication, Tailwind is at v.3.x, and I [already wrote](/posts/2022/03/making-tailwind-jit-work-hugo-version-3-edition/) about how to install and use this version with Hugo. Rather than repeat all that here, I simply request that you read that article. Of course, you'll also want to lean heavily on the [Tailwind documentation](https://tailwindcss.com/docs/).

## There can be *more* than one

In fact, many site owners *don't* choose a single styling approach but, rather, use various *combinations* of these and other options.

As I already said above, it's quite possible to use SCSS files with vanilla CSS at the start, and then gradually add Sass-only features when you wish. For that matter, you even can use [Tailwind with Sass](https://tailwindcss.com/docs/using-with-preprocessors#using-sass-less-or-stylus), if that floats your boat for some reason.

Yes, the old line from *Highlander* is "[There can be only one!](https://www.imdb.com/title/tt0091203/quotes/qt0337068)"; but that's definitely not the case with styling your Hugo site. You're free to pick one option, or several, while keeping your eyes on the real goal: nailing The Final Design which, if you get it right, will make your site a more attractive destination for your visitors.
