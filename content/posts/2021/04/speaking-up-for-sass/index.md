---
title: "Speaking up for Sass"
description: "It may not be This Week’s Kewl Thing, but Sass/SCSS is still an invaluable part of web development."
author: Bryce Wray
date: 2021-04-03T11:59:00-05:00
---

**Note**: This post also was the subject of a [Hacker News thread](https://news.ycombinator.com/item?id=33299506).
{.yellowBox}

**Note, 2021-04-04**: I revised this article to remove some references that, as a reader correctly pointed out, didn't really fit into what I was trying to say. (One of these days, I'll learn not to write these pieces late on Friday nights when I'm really, really tired.)
{.yellowBox}

It's important for me to stay current with trends that affect my web development efforts. That's true whether we're talking about the websites I manage as part of the Day Job or just the tinkering I do with this personal site.

For example, I've recently [written about](/posts/2021/03/jit-game-changer-tailwind-css/), and have made significant use of, not only [Tailwind CSS](https://tailwindcss.com) but also its new, experimental [just-in-time (JIT) compiler](https://blog.tailwindcss.com/just-in-time-the-next-generation-of-tailwind-css). To be sure, Tailwind's appeal among web developers --- especially those who aren't particularly fond of futzing with CSS in the first place --- is powerful and growing.

That said, there's plenty to be said for the tried and the true, the styling methods that were around years ago, long before Tailwind and other examples of New Shiny CSS ever existed. And, today, I'm here to do some of that "saying" in support of one of them: namely, the [Sass CSS preprocessor](https://sass-lang.com).

## Power that'll grow with you

Sass --- "Syntactically Awesome Style Sheets" --- came into existence in 2006 and, almost from the beginning, one of its key slogans was that it "makes CSS fun again." While I can differ with that opinion on occasion, I completely agree with the Sass website's headline since 2013: "CSS with superpowers."

And let me stop right here for those who are already grumbling, "Yeah, but in this day and age you can do so much more with plain, vanilla CSS than you could back when Sass was new and hot, so who needs it today?" My simple answer is: *you* might, if you support websites intended for use in either enterprises or government.

That's because those tend to be places where the execrable Internet Explorer 11 is still alive and well (I wouldn't waste time worrying about an IE version before that), often because of the need to support legacy apps or files that require it.[^TWCSSandIE] IE 11 is completely incompatible with one of modern CSS's coolest features, [CSS custom properties ("CSS variables”)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). As I'll shortly explain, using variables in CSS can be an *immense* time- and labor-saver for web dev work, especially as your projects grow. But Sass lets you use variables --- in its own way, to be fair --- while still generating CSS that even IE 11 can read.[^oldBrowsers]

[^TWCSSandIE]: By the way: as of the release of version 2.0 in November, 2020, [Tailwind CSS doesn't support Internet Explorer](https://blog.tailwindcss.com/tailwindcss-v2#incompatibility-with-ie11). If you must use Tailwind *and* support IE users, you'll have to stick with Tailwind version 1.9.

[^oldBrowsers]: Where the need to support old browsers is concerned, It also helps if you pair Sass with [PostCSS](https://postcss.org) and [Autoprefixer](https://github.com/postcss/autoprefixer), as I've done in [this site's repository](https://github.com/brycewray/eleventy_solo) as well as my two [Eleventy starter sets](/posts/2021/03/beginners-luck-update/) that use SCSS, but that's up to you.

However, even if you *don't* need to worry about IE 11 users, **Sass is still an incredibly attractive option for your work in CSS**.

In case you're not that familiar with Sass, its proposition is simple: you create styling statements in a Sass file, usually as a .scss file[^sassFormat], and Sass automatically translates that into normal CSS that a browser can handle. One key thing to remember is that **any valid CSS works in an .scss file**, so you can start with just the basics and, as you learn more about what Sass makes possible, add on the Sass-powered goodies.

[^sassFormat]:	Sass also still supports the older .sass file format and what I consider the peculiarities of its [indented syntax](https://sass-lang.com/documentation/syntax); but I'd guess very few devs still use it today, so in this piece I'm just covering the more familiar .scss files and their [SCSS syntax](https://sass-lang.com/documentation/syntax).

What goodies, you ask? Well, try these.

### Variables

CSS variables are great because it's tiresome using the same attributes repeatedly; but, if older browsers can't handle modern CSS variables, you're out of luck, right? Wrong. Just use Sass variables. Remember, all the browser sees are the variables’ values, not the variables themselves.

A typical use case involves colors and breakpoints you need to keep straight throughout a site, especially if multiple people will be touching the styling code (*i.e.*, some find it easier to remember a variable name, or at least to spec it out for others, than a hex value or a size-in-pixels value):

```scss
$ourClr: hsl(336, 58%, 57%);
$lkClr: hsl(5, 78%, 41%);
$mdBkpt: 768px;

@media screen and (min-width: $mdBkpt) {
	body {
		padding: 0 1.5em;
	}
}

.logoType {
	color: $ourClr;
	font-weight: 625;
}

a, a:focus, a:visited {
	color: $lkClr;
	text-decoration: none;
	border-bottom: 1px solid $lkClr;
}
```

### Nesting

While [PostCSS](https://postcss.org) lets you nest selectors within parent selectors, the methods vary depending on which nesting plugin you use. Also, occasional changes in PostCSS and its universe of plugins can cause cross-plugin incompatibilities that make for problems. But Sass has long included nesting from the get-go, and it just works. The following continues using some of the variables from the earlier example.

```scss
body {
	padding: 0 1em;
	@media screen and (min-width: $mdBkpt) {
		padding: 0 1.5em;
	}
}

.bigcontainer {
	background-color: $ourClr;
	color: white;
	width: 100%;
	@media screen and (min-width: $mdBkpt) {
		width: 80%;
	}
	p, li {
		margin: 1em 0;
		letter-spacing: -0.015em;
	}
	&-narrower {
		width: 60%;
		@media screen and (min-width: $mdBkpt) {
			width: 45%;
		}
	}
}
```

.&nbsp;.&nbsp;.&nbsp;which will generate the following CSS:

```css
body {
	padding: 0 1em;
}
@media screen and (min-width: 768px) {
	body {
		padding: 0 1.5em;
	}
}
.bigContainer {
	background-color: hsl(336, 58%, 57%);
	color: white;
	width: 100%;
}
.bigContainer p, .bigContainer li {
	margin: 1em 0;
	letter-spacing: -0.015em;
}
.bigContainer-narrower {
	width: 60%;
}
@media screen and (min-width: 768px) {
	.bigContainer-narrower {
		width: 45%;
	}
}
```

### Mixins

Another capability built into Sass (and available in PostCSS through [a plugin if you install it in just the right order](https://github.com/postcss/postcss-mixins)) is the ability to create and use *mixins*. They're reusable statements you can drop elsewhere (through `@include` statements) in your Sass files, saving you typing time and keeping your Sass code nice and [DRY](https://dzone.com/articles/is-your-code-dry-or-wet). You could think of them as super-charged variables.

```scss
@mixin garishGradient {
	background: rgb(47,250,163);
	background: linear-gradient(90deg, rgba(47,250,163,1) 0%, rgba(112,103,255,1) 25%, rgba(246,255,26,1) 50%, rgba(242,145,150,1) 75%, rgba(239,52,255,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2ffaa3",endColorstr="#ef34ff",GradientType=1);
}

.bgBox1 {
	@include garishGradient;
	border: 1px solid #000;
}

.imgBkgd {
	@include garishGradient;
	border: 2px solid red;
	z-index: 999;
}
```

### Easier commenting

If you're one of those wonderful and all-too-rare folks who document their code, you'll love Sass because it lets you do commenting more simply. Basic CSS requires `/*` and `*/` to be wrapped around all comments, but Sass allows one-line comments with just `//`, as in many programming languages (which is great for your "muscle memory" when coding):

```css
/* This is the only way you can do commenting in CSS. */

/* ...even if it's only one line. */
```

```scss
// ...but Sass lets you do this.

// Most coders will find this familiar.

/*
(Note that, if desired, you can still use
the "wrapper" characters to simplify
multi-line comments, disable entire blocks
of code, etc.)
*/
```

### Stuff that CSS may never do

Then there are those capabilities built into Sass which you likely won't ever see in CSS. Yeah, you may be able to accomplish them in other languages if you're of a mind to do so (especially if you're in the [CSS-in-JS](https://css-tricks.com/the-differing-perspectives-on-css-in-js/) crowd), but why not take advantage of *built-in* cool things? Sass enables:
- [Operators](https://sass-lang.com/documentation/operators) for math and logic. They go hand in hand with&nbsp;.&nbsp;.&nbsp;.
- [Functions](https://sass-lang.com/documentation/at-rules/function) that let you, in essence, do *real* coding in your Sass through so-called [SassScript](https://sass-lang.com/documentation/syntax/structure#expressions).
- [Modules](https://sass-lang.com/documentation/at-rules/use) for controlling your variables’ scope through [namespacing](https://en.wikipedia.org/wiki/Namespace), especially in view of the cascading nature of CSS in the first place. For example: that way, you can have both `homePage.$color` and `contactPage.$color` variables without worrying about one's overriding the other --- simply by having separate `_homePage.scss` and `_contactPage.scss` files, each of which has its own `$color` variable, and then employing the `@use` rule (`@use 'homepage'` or `@use 'contactpage'`, as the case may be, in this example).

Full disclosure: I personally haven't had to use more than a tiny fraction of these as yet (mainly `@use` for now), but I also haven't spent as much time in Sass as I'd have liked, especially in the last year or so. I'm sure I'll be doing quite a bit more Sass work in the future, and expect to find myself increasingly using these capabilities.[^thisSite]

[^thisSite]: Yesterday, I converted this site back to Sass after giving serious thought to all the items, and more, I've discussed in this article. I did so despite my previously expressed interest in Tailwind, partly because [I expect to be doing more Sass-related development in the Day Job in the future](/posts/2021/03/next-steps/) and thus think I'll find it less neck-snapping to go from Day Job web dev on workdays to personal web dev nights and weekends. **Update, 2021-04-15**: After an initial miscommunication gave me the wrong impression about the thinking higher up, I learned that I won't be doing that development after all.

## Room for Sass in the Tailwind era?

There's little doubt that the lead dog in the CSS mindshare race right now is the utility-first Tailwind CSS framework. It would be reasonable to wonder if there's even a future for something like Sass in a dev world seemingly dominated by Tailwind.

As a current user of both Sass and Tailwind, I absolutely believe that Sass not only will survive the Tailwind era in particular and the utility-CSS-is-king movement in general, but likely will be around far longer. At least, I surely hope so.

Here's my reasoning, and I grant you upfront that it's opinionated.

### Scalability concerns

Although I have previously acknowledged Tailwind's strengths and am all too aware how much it's been embraced by CSS-averse web devs, I remain skeptical about how well it scales as one's web project grows, much less as one's inventory of projects grows.

Tailwind adherents say this isn't a problem because, once you recognize that you're re-using certain Tailwind classes too frequently, you then simply extract them to reusable components and then `@apply` them, [as the Tailwind documentation suggests](https://tailwindcss.com/docs/extracting-components).  I agree that this is a workable strategy, but my own experience suggests it can get out of hand quickly, even in a small project. YMMV, of course. By the way: please note what Tailwind creator Adam Wathan famously tweeted about `@apply` . . .

{{< stweet user="adamwathan" id="1226511611592085504" >}}

Once you've extracted a good quantity of components as I suspect happens more often than not, you'll run into the next issue that Tailwind fans say it solves . . .

### "Naming is hard" --- or is it?

There are numerous pieces on the web saying that one of the biggest hassles in dealing with code is naming things (*e.g.*, variables, functions, and CSS classes), and that this is a pain which Tailwind can remedy by keeping you from *having* to name more than a handful of CSS classes.

To that I say: well, maybe sometimes, and for some people, but not universally.

Surely, if you're trying to corral a web project with dozens of developers and hundreds of pages, I can see the point --- and I'm also guessing you're not my audience in the first place. But when you're dealing with a smaller team and a project with only a few templates that you tweak to build a lot of pages, as is typical if you're a [static site generator](https://jamstack.org/generators) (SSG) user such as Yours Truly, it really shouldn't be that hard to decide what to call things.

Besides: don't you still **need** to name them? As [Aleksandr Hovhannisyan](https://www.aleksandrhovhannisyan.com/) said in an [article](https://www.aleksandrhovhannisyan.com/blog/why-i-dont-like-tailwind-css) that got him [roasted](https://news.ycombinator.com/item?id=26422286) on [Hacker News](https://news.ycombinator.com) by the Tailwind faithful:

> .&nbsp;.&nbsp;.&nbsp;if you struggle to name things in the first place, this suggests you'll run into communication issues when discussing your UI with designers and other team members. If you can't name `x` element in your UI sensibly, and a conversation inevitably arises concerning that element, how are you going to refer to it? What are you going to call That Thing? Surely you can think of something. There's always a way to name things semantically.

And I would say this is true even if you're a team of one. If you don't know what to call it, maybe you don't really grasp its purpose --- and that's not good.

### Plugins-ism *vs.* just-one-thing-ism

Tailwind depends on PostCSS, and a Tailwind user more often than not is going to be using other PostCSS plugins besides just Tailwind --- often to get things, like mixins and nesting, with which devs had become familiar in earlier experience with Sass. As I mentioned before, there are some PostCSS plugins that have to be installed and configured in highly specific ways; otherwise, they can fail *and* also disable the other plugins, including Tailwind.

This is certainly understandable once you grasp [how PostCSS works](https://www.smashingmagazine.com/2015/12/introduction-to-postcss/) (which, I'll grant, is impressive[^usingPostCSS]), but it can be a big time-suck, especially whenever those plugins and even PostCSS itself get updates. For example, the PostCSS 8 update broke or at least impaired a lot of plugins and related packages, or so I've recently read on various plugins’ [GitHub](https://github.com) "Issues" pages.

[^usingPostCSS]: As I mentioned in an earlier footnote, I'm actually still using PostCSS with this site, even though it's with Sass, so I can run Autoprefixer. As of this writing, I'm also using the [PurgeCSS](https://purgecss.com) plugin, at least until I can find the time (and motivation?) to reduce my SCSS files’ sizes through more manual methods.

By contrast, Sass is *one package*, and all its many capabilities --- including all the ones whose PostCSS-powered lookalikes require all those add-ons --- work without the need for juggling plugins.[^binary] Moreover, in today's web dev world, it's easier than ever before to take advantage of Sass. Long ago, [you had to install Ruby](https://sass-lang.com/ruby-sass), but those days are in the web's distant past. Many key dev frameworks and bundlers support Sass out of the box; or, where necessary, it's easily added, such as through the [sass Node.js package](https://npmjs.com/package/sass).

[^binary]:	It's kind of like the argument for the all-in-one-binary [Hugo](https://gohugo.io) and [Zola](https://getzola.org) SSGs over the plugin-laden [Gatsby](https://gatsbyjs.com).

### Walk and chew gum simultaneously?

If you're doing your web dev in Notepad or TextEdit, well, it sucks to be you, my sad friend. But with a true code editor, it's trivial for you to keep separate HTML and CSS files on the screen and move between them to make appropriate edits.[^editors]

[^editors]:	For that matter, you can edit multiple files at once in Notepad or TextEdit, too, if you really have no other choice. (And let's not kid ourselves: there are some enterprise IT shops which force even developers to use ancient text editors rather than their code editors of choice, so this isn't an idle concern. I know whereof I speak.)

This whole "ah, I just want to write my CSS in my HTML because it's too much of a pain to edit two separate files at once" mantra held by utility-first CSS enthusiasts is BS --- especially because, even *with* utility-first CSS, I think you **still** end up doing that lots of times anyway. (How else are you going to be extracting those components, after all?) And, if you don't, I'd guess you don't write a whole lot of HTML, or manage all that many websites, in the first place.

## Forward passé?

The Sass website calls Sass "the most mature, stable, and powerful professional[-]grade CSS extension language in the world." Those who value only the latest and the greatest might spend too much time on those "mature" and "stable" descriptors and dismiss Sass as something that belongs to web development's yesterdays, but they do so at their own peril --- namely, the danger of missing out on the power of Sass. I hope their attitude won't similarly imperil those just getting into the field who might otherwise think What's Kewl Right Now is definitely how they'll be building websites long-term. Maybe it will; maybe it won't.

I doubt I've changed any minds with this article. It's kind of like trying to talk politics to those who are utterly committed to a specific party. However, I wanted to explain why Sass remains highly relevant for web development, and why that's likely to continue for the foreseeable future.

I rest my case. Members of the jury, as always, the decision is yours.
