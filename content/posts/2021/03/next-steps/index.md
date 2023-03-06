---
title: "Next steps?"
description: "Some things I’ve learned while tinkering with Next.js."
author: Bryce Wray
date: 2021-03-11T16:30:00-06:00
---

**Update, 2021-04-15**: After an initial miscommunication gave me the wrong impression about the thinking higher up, I learned that I won't be doing this work, after all. However, I'm leaving this post in place for archival purposes and [for the sake of transparency](/posts/2019/10/otoh/).
{.box}

As I [mentioned a few days back](/posts/2021/03/gems-in-rough-03/), Day Job-related concerns have led me to spend time dabbling in the [Next.js](https://nextjs.org) [React](https://reactjs.org) framework. This is because I'm researching possible future options for my employers’ web presence, and Next.js seems to fit their needs pretty well.

I thought I'd pass along some things I've learned along the way, especially since some of them weren't as well-spelled-out and/or as collected in one place as I'd like. Next's documentation could use some work, **but** I'd still say it's pretty good.[^vsNuxt]

[^vsNuxt]: In fact, I felt Next's documentation is considerably better than that of its [Vue](https://vuejs.org)-based competitor, [Nuxt.js](https://nuxtjs.org), which I had been expecting to prefer --- both the product and its documentation --- because I frankly find Vue easier to grasp than React. However, our "shop" is moving in React's direction anyway, so it's probably just as well.

And, to be sure, so is Next.js itself.

{{< imgh src="2021-03-11-nextjs-org-home-pg_2518x1330.png" alt="Screen capture of nextjs.org home page as of 2021-03-11" >}}

Considering how much I've [lately tried to limit my dealings with dependency-heavy stuff](/posts/2021/02/simplify-simplify/), it's amazing how much I've come to like developing within Next.js. I find it much more straightforward than the React-based [Gatsby](https://www.gatsbyjs.com) SSG with which I futzed [back in 2019](/posts/2019/07/why-staying-with-hugo/). Indeed, Next.js boasts many capabilities out-of-the-proverbial-box that require a disturbing number of plugins and often-glitchy configuration hassles in Gatsby.

To be fair, though, I should also note that I'd have been lost React-wise had I not spent the earlier time working with Gatsby and React's [JSX](https://reactjs.org/docs/introducing-jsx.html) --- *e.g.*, here's an extremely simple footer component in JSX:

``` jsx
let copyrightYr = new Date().getFullYear()

export default function Footer() {
	return (
		<>
			<footer>
				<p className="copyNote">&copy; {copyrightYr}
				Company Name, LLC.
				All&nbsp;rights&nbsp;reserved.</p>
			</footer>
	 </>
	)
}
```

So, in that respect at least, the past runs with Gatsby, React, and JSX amounted to a net positive.

Anyway, going back to the point of this post: here are some things I've learned while fiddling with Next.js --- particularly while trying to duplicate the look, feel, and functionality of an existing WordPress site at the Day Job. I figured that would be the most logical way to evaluate Next.js for how we'd be using it.

## Easy to use with Autoprefixer

If you're going to develop web content for more than just the most current set of browsers, you'll probably need the services of [Autoprefixer](https://github.com/postcss/autoprefixer), which requires [PostCSS](https://postcss.org). Both are built into Next.js.

To activate Autoprefixer, all you have to do is add some [Browserslist](https://github.com/browserslist/browserslist) specs to your project's `package.json`. For example, here's what I added:

```json
"browserslist": [
	"last 4 versions",
	"> 1%",
	"IE 11",
	"maintained node versions"
],
```

Those settings cover nearly every browser in use --- even the justifiably despised Internet Explorer. The Day Job, as is true for many corporate environments, is still using Internet Explorer for a number of things, so IE support is necessary for the project which brought me to this little learning exercise.

## Babel-ing on

One thing you'll do a lot in this sort of platform is to `import` components, styling files, and the like; and those `import` references are **relative** rather than **absolute**. So, depending on how nested your stuff is, you might end up with lines like this:

```jsx
import '../../../assets/scss/global.scss'
```

And, yeah, you have to count up all those `../` items manually and keep doing so until the Next.js dev server stops throwing error messages.

Fortunately, there's no need to futz with all that **if** you add some [Babel](https://babeljs.io/) configuration through the use of the [`babel-plugin-module-resolver` plugin](https://github.com/tleunen/babel-plugin-module-resolver). Then you can set up *aliases* in the project's `.babelrc` file:

```json
{
	"presets": ["next/babel"],
	"plugins": [
		[
			"module-resolver",
			{
				"root": ["."],
				"alias": {
					"@scss": "./assets/scss",
					"@components": "./components",
					"@partials": "./components/partials"
			 }
			}
		]
	]
}
```

As long as your relative references in *that* file are correct --- which is easy to determine, especially since you're coming from the top level --- you then can use those aliases throughout the project. Here's an alias-friendly version of the previous example:

```jsx
import '@scss/global.scss'
```

.&nbsp;.&nbsp;. so much easier.

## Sass-iness with CSS Modules

One of the ideas behind this project is to plan for how future teams can manage the involved sites. Where styling is concerned, I'm gambling that [Sass/SCSS](https://sass-lang.com) will still be around in the long term, rather than going with the currently hot [Tailwind CSS](https://tailwindcss.com). Besides, Tailwind's fixed units aren't quite precise enough for some of what I'm trying to do.[^extendTWCSS]

**Note**: Out of curiosity, I *did* try Tailwind with Next.js 10.0.7, and soon ran into a [memory glitch](https://github.com/vercel/next.js/discussions/21319) that tends to crash the Next dev server. Anyway, I went back to SCSS in a hurry, and am perfectly happy with that choice.
{.box}

[^extendTWCSS]: Yes, I know you can extend Tailwind's built-in styles, use `@apply`, mix it in with some custom styles of your own, and so on. I've done all of those in the past. I still decided otherwise.

I decided to opt for something which would be less limiting than a one-stylesheet-fits-all approach. Thus, I went with a combination of SCSS and [CSS Modules](https://css-tricks.com/css-modules-part-1-need/), both of which Next.js supports from the get-go. Just call each appropriate SCSS file `Filename.module.scss`[^caps] and you're off to the races, combining the advantages of SCSS and CSS Modules all at once.

[^caps]: The capitalization here fits with the typical naming scheme I've seen recommended (*e.g.*, [this article](https://levelup.gitconnected.com/2-simple-effective-react-file-naming-convention-tips-cce1022328a8) and [this gist](https://gist.github.com/koistya/d7a507438c741ee6adb5)) for components and their fuzzy little friends in the React universe.

Here's an example of how that helps you. I created `/pages/careers/index.js` (which Next automatically turns into `[site URL]/careers/` ) and then imported its specific scoped SCSS file:

```jsx
import careers from '@scss/Careers.modules.scss'
```

With `careers` set as the *namespace* for styles from that SCSS file, I then could implement the styles like this:

```jsx
<div className={careers.headlineRow}>
	<h1>Careers</h1>
</div>
```

By the way: using the term `className` rather than `class` for CSS/SCSS references is a JSX thing, in case you didn't know. You'll also notice that JSX requires using `{}` rather than `""` for these references --- but when you have to call *multiple* scoped classes, that gets even more involved:

```jsx
<div className={`${careers.txtOnly} ${careers.extraStyle}`}>
	<p>This is an otherwise-standard text div
	where we want to have some special extra styling.
</div>
```

Perhaps you're wondering, "Is all this worth the trouble?"

Oh, yeah.

The advantage of this modular approach is that I can apply, say, a `headlineRow` SCSS class on different pages *but* keep separate, different versions thereof (for the sake of styling differences from one page to another) **without** having to give them more convoluted names[^noBEM] in one long SCSS sheet (or a short one laden with `@import`s of multiple [SCSS "partials"](https://sass-lang.com/guide) --- more on which, shortly). That allows a team to standardize on specific site-wide styles **but** have the flexibility to have slight (or not-so-slight) differences in how each style works on different pages **without** affecting the whole site-wide [style cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade). The bigger a site and/or the more people who may have to "touch" its inner workings over time, the more sense it makes to use CSS/SCSS Modules.

[^noBEM]: I was already not a fan of [BEM](https://css-tricks.com/bem-101/),  and [other, similarly picky naming methodologies](https://www.webfx.com/blog/web-design/css-methodologies/) that I deem more convoluted than truly helpful. Now that I've seen the advantages and *relative* idiot-proof (?) status of CSS Modules, I am even more convinced not to worry about those other alternatives.

Incidentally, I took advantage of this exploration to try the [`@use`](https://sass-lang.com/documentation/at-rules/use) and [`@forward`](https://sass-lang.com/documentation/at-rules/forward) rules, which were [added to Sass/SCSS in 2019](https://sass-lang.com/blog/the-module-system-is-launched). It's important to get used to them **and get away from** the longtime `@import` rule, [which is being deprecated](https://sass-lang.com/documentation/at-rules/import).[^hugoSass]

[^hugoSass]: I still use `@import` in [this site's SCSS](https://github.com/brycewray/hugo-site) for now, but only until the [Dart Sass implementation](https://sass-lang.com/dart-sass) is fully integrated into [Hugo](https://gohugo.io), which [should happen soon](https://gohugo.io/news/0.80.0-relnotes/). The [now-deprecated LibSass implementation](https://sass-lang.com/blog/libsass-is-deprecated) currently included in Hugo doesn't support `@use` or `@forward`.

## Easy to use with FontAwesome

As I said earlier, part of the work I'm doing for this learning experience involves rebuilding one of our currently WordPress-based sites as closely as possible. Since that site uses [FontAwesome](https://fontawesome.com) characters in its navigation menu, I wanted to do the same --- but **without** having to link to FontAwesome itself.

Fortunately, FontAwesome has an "[official React component](https://fontawesome.com/docs/web/use-with/react/)," which makes that a breeze:

```jsx
import nav from '@scss/Nav.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

const hamburgerBars = <FontAwesomeIcon icon={faBars} style={{ width: '24px', height: 'auto'  }} />
const caretRight = <FontAwesomeIcon icon={faCaretRight} />
const caretDown = <FontAwesomeIcon icon={faCaretDown} />

{/* === further down within the file... === */}
<ul>
	<li className={nav.menuItem}>
		A menu item which has a “down-arrow”
		because it has a submenu
		<span className={nav.arrowDown}>{caretDown}</span>
		<ul className={nav.subMenu}>
		{/* === ...and so on... === */}
		</ul>
	</li>
</ul>
```

## The call: TBD

It's considerably above my pay grade whether the Day Job lets me go ahead with my current inclination to adopt Next.js as the platform on which we build websites going forward. Even if the decision ends up going in a different direction, I've still enjoyed learning more about this impressive framework, and may continue to tinker with it on my own sheerly to satisfy my curiosity.

Perhaps this post has given you some feel for what I picked up, as well as made you aware of certain possible gotchas which you might otherwise encounter should you, too, give Next.js a go for your own purposes. It can be a bit much if you don't need all its powers and aren't willing to learn some of its (and React's) idiosyncrasies; but, for the right use cases, it's outstanding.
