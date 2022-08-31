---
title: "Is Astro ready for your blog?"
description: "Some points to consider if you’re thinking about switching your site to the Astro platform."
author: Bryce Wray
date: 2022-04-24T10:50:00-05:00
#initTextEditor: iA Writer
---

**Note**: This post also appears on [dev.to](https://dev.to/brycewray/is-astro-ready-for-your-blog-63m).
{.yellowBox}

{{% disclaimer %}}

Have you been considering the popular new [Astro](https://astro.build) static site generator (SSG) for maintaining your blog, whether it be a new website or one you'd be converting over from another platform?

Having just moved this site to Astro yesterday (about which I'll say more in a separate, future post)[^ftff] after a week or two of experimentation and grunt work, I can offer some opinions which may help you with that question. I'll go through the "boxes" which I believe any SSG or other website development platform should "check" before you should give it a shot at this task, along with how I judge Astro's ability to do so in each case.

[^ftff]: Yes, I know: I [said](/posts/2022/03/simplify-simplify-again/#a-line-in-the-shifting-sands) that the site would be on Hugo "for the foreseeable future." Well, I'll get into **that**, too, in the separate, future post.

**Remember that Astro is still in beta**, although the Astro team [announced](https://astro.build/blog/astro-1-beta-release/) earlier this month that they plan for version 1.0 to go to general availability in June. For each item, I'll assess Astro's associated compliance or performance *vs.* that of a few other platforms I've used: in alphabetical order, [Eleventy](https://11ty.dev), [Gatsby](https://gatsbyjs.com), [Hugo](https://gohugo.io), and [Next.js](https://nextjs.org).

## Templating

Every SSG uses templating to render web pages. Astro templates are `.astro` files, which are an interesting mixture of (a.) "code fences" confined within front matter and (b.) HTML-mixed-with-JavaScript plus [JSX](https://jsx.github.io/), which combines JavaScript with some elements of [XML](https://www.w3.org/XML/). If you're comfortable with JavaScript, you'll find it fairly easy to make `.astro` files, but note that they constitute the *only* choice for templating in Astro. Here's a small example:

```js
---
import Head from '@components/Head.astro';
import Header from '@components/Header.astro';
import Single from '@components/Single.astro';
import Footer from '@components/Footer.astro';
import Billboard from '@components/Billboard.astro';

const { content } = Astro.props;
const { title, subtitle, description, date, lastmod, permalink } = content;

---

<html lang={content.lang || 'en'}>
	<head>
		<Head {title} {description} {permalink} />
	</head>

	<body>
		<Header />
		<main>
			<Billboard
				title={title}
				subtitle={subtitle}
				description={description}
				date={date}
				lastmod={lastmod}
			/>
			<Single >
				<slot />
			</Single>
		</main>
		<Footer />
	</body>
</html>
```

**Comparison**: One of Eleventy's claims to fame is how it allows you to choose from among multiple templating languages as well as vanilla JavaScript. Gatsby and Next.js templates are built with JSX. Hugo is the only one of these platforms that doesn't use JavaScript or a variation thereof for templates; instead, the [Go](https://go.dev)-based Hugo relies on a very different, Go-derived templating language.

## Markdown

SSG-based blogs almost always have you add content mainly through use of [Markdown](https://daringfireball.net/projects/markdown), so how a platform handles that is particularly important. Astro incorporates both the well-known [Remark](https://remark.js.org) Markdown parser and [rehype](https://github.com/rehypejs/rehype) tool, and uses plugins from both. Some [Remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins) aren't compatible with the latest version but, often, a [rehype plugin](https://unifiedjs.com/explore/keyword/rehype-plugin/) can make up for that. Be sure to check for your specific use case. Also, notably, Astro allows you to put components **in** the Markdown (I'll get to components further down). For example, if you've already `import`ed an `ImageBox.astro` component as `ImageBox`, you could have Markdown like this:

```md
<ImageBox />
```

**Update, 2022-07-26**: Astro has since moved to using [MDX](https://mdxjs.com/), rather than Markdown, for including components in one's markup. Be sure to check the [most current Astro documentation](https://docs.astro.build) for full details.
{.yellowBox}

**Comparison**: By default, Eleventy uses [Markdown-it](https://github.com/markdown-it/markdown-it); like Astro, Gatsby and Next.js use Remark; and Hugo uses [goldmark](https://github.com/yuin/goldmark). As for Astro's ability to mix components and Markdown on a page, probably the closest analogy to this is the use of [MDX](https://mdxjs.com/) files in Gatsby and Next.js; Eleventy and Hugo can't do this (however, see also “[Components](#components),” below, for some words on how Eleventy and Hugo use *shortcodes* which can provide some degree of code-in-Markdown functionality). Note that migrating an existing site to Astro from any of these other platforms probably will involve far more editing to your existing Markdown content than if you were migrating between two of the non-Astro platforms in this mix.

## Who's in charge?

Astro is maintained and developed by not only employees of [The Astro Technology Company](https://astro.build/blog/the-astro-technology-company/) but also the Astro community. This should be a desirable situation for the long term, since any choice to move your site to Astro means relying to some degree on the project's being around for the duration. By comparison, many other open-source projects have languished because they amounted to "side gigs" for a small set of developers (perhaps just one) who, inevitably, decided the work wasn't worth their time.

**Comparison**: For the most part, Eleventy and Hugo are one-developer projects although, of course, each such developer does have some help from within the community. Similar to how The Astro Technology Company is in charge of maintaining Astro, Gatsby and Next.js are maintained by development teams within the companies --- Gatsby, Inc., and Vercel, respectively --- that control these SSGs. Eleventy is somewhat of a hybrid of these two situations in that Netlify, the employer of Eleventy creator/maintainer Zach Leatherman, [recently made Eleventy development his full-time job](https://www.netlify.com/blog/growing-our-open-source-contributions).

## Asset pipeline

Astro began life with [Snowpack](https://www.snowpack.dev) as its asset pipeline, which makes perfect sense given that the two projects came originally from the same development team. However, the developers soon [reached the decision](https://astro.build/blog/astro-021-preview/) that Astro would be a better product if it used the impressive [Vite](https://vitejs.dev) package, instead. While the resulting switchover was a breaking change with a capital *BC* when it occurred, the capabilities it unlocked have proven the exceptional wisdom of this choice.

**Comparison**: Eleventy has no built-in asset pipeline, so crafting one is pretty much left to the user. Gatsby and Next.js process assets by building in the venerable [webpack](https://webpack.js.org) bundler, thus taking on all the advantages and disadvantages thereof. Hugo has its own asset pipeline, [Hugo Pipes](https://gohugo.io/hugo-pipes).

## Developer experience

Building in Astro can be both pleasant and, occasionally, a little frustrating, so it's a mixed bag where DX is concerned. The "pleasant" part is the relative straightforwardness of the code, especially if you've ever dealt with Next.js, although you will have to get used to those code fences in `.astro` files. As for the "a little frustrating" part, larger sites don't refresh all that quickly when you edit either Markdown or an `.astro` file, although styling changes seem to show up pretty quickly. I think this is because, at this early point in Astro's life, its team is still working out the kinks on Astro's interaction with both Markdown and Vite.

**Comparison**: Where pleasantness of the coding experience is concerned: Astro and Eleventy probably tie for first; Gatsby and Next.js are in the middle of the pack; and Hugo, with its newbie-unfriendly Go-based templating, comes in last. (I doubt seriously that newbies are going to be familiar with Go.) However, where refresh-in-dev-mode speed is concerned, it's a different story altogether: all the other competitors currently have an edge on Astro for this item, with the stunningly fast Hugo obviously leading the pack.

## Documentation

Astro's documentation, like Astro itself, is still in its early phases and gets changed a lot; but I've found little trouble in following it. If you've absolutely never coded before, you might find it daunting; but, then, that would be true for any of these SSGs.

**Comparison**: I'd rank the competitors' documentation in the following order: Next.js, Eleventy and Gatsby tied in the middle, and Hugo.\
That said: for all of these, I'd urge you to keep your favorite search engine a browser tab away, because there's no such thing as SSG documentation which doesn't have gaping holes --- particularly since the SSGs' developers end up writing a lot of the documentation and, after all, they already *know* how their products work, so they can't accurately anticipate all the questions and misunderstandings that novices will have.

## Styling

Astro has no built-in support for [Sass](https://sass-lang.com)[^SassAstro] or [Tailwind CSS](https://tailwindcss.com), but accepts the [usual](https://github.com/sass/sass) [packages](https://github.com/tailwindlabs/tailwindcss) to provide either. You can, of course, use vanilla CSS with no add-ons whatsoever.

[^SassAstro]: Astro had built-in Sass support [until v.0.23.x](https://docs.astro.build/en/migrate/#missing-sass-error).

**Comparison**: The same is true for Eleventy, Gatsby, and Next.js. Hugo has built-in support for an older, [deprecated](https://sass-lang.com/blog/libsass-is-deprecated) form of Sass, and needs [some](/posts/2022/03/using-dart-sass-hugo-sequel/) [help](/posts/2022/03/making-tailwind-jit-work-hugo-version-3-edition/) to work with the current versions of Sass and Tailwind.

**Correction**: [Ben Holmes](https://twitter.com/BHolmesDev) of the Astro team (see the "Components" section further down) reminded me on Discord that Astro does offer an official [integration](https://docs.astro.build/en/guides/integrations-guide/) for [Tailwind CSS](https://github.com/withastro/astro/tree/main/packages/integrations/tailwind). Thanks for the catch, sir!
{.yellowBox}

## Hydration

You may have been hearing a lot in recent months about something called *partial hydration*. It's extensively explained in Astro's [documentation](https://docs.astro.build/en/core-concepts/component-hydration/) thereof, but here's a quick-and-dirty try at my own explainer.

The concept of *hydration* involves sending out code which, on arrival at the browser, gets *hydrated* with data (think of how [astronauts used to immerse freeze-dried food in hot water to make it edible](https://hackaday.com/2021/12/29/astronaut-food-is-light-years-beyond-tang-and-freeze-dried-ice-cream/)). This makes it possible to convert a static web page to a dynamic one. The problem is that websites built on JavaScript-based platforms, until now, typically have dumped a lot of JavaScript code to be hydrated on their visitors' devices, causing so-so performance and a less-than-satisfying user experience. The idea behind *partial* hydration is to let the developer choose to deliver only that JavaScript which is absolutely necessary, thus optimizing performance and the UX. Of these SSGs, at the present time, only Astro is capable of partial hydration out of the box.

**Comparison**: Eleventy has always been an as-little-JavaScript-as-you-want package in the first place; however, it can both include components (about which more, shortly) and partially hydrate them *if* it's equipped with the [Slinkity](https://slinkity.dev) plugin. Gatsby and Next.js have no such feature; indeed, what they do is exactly the Bad Old Thing for which partial hydration is a *remedy*. Hugo by default provides no JavaScript, period; still, it, too, lacks any partial hydration capabilities regarding any third-party JavaScript you might bundle through its Hugo Pipes asset pipeline.

## Components

Another of Astro's most widely touted capabilities is how it enables you to use [components from multiple JavaScript frameworks](https://docs.astro.build/en/core-concepts/framework-components/). Other SSGs which support component-based development out of the box are tied to just one framework, so this flexibility may move the needle for you if you don't want to be tied to just one ballgame.

**Comparison**: Gatsby and Next.js support React components. You can use the aforementioned Slinkity package with Eleventy to enable Astro-like support for multiple frameworks' components. (I suspect that's a big part of the reason why The Astro Technology Company [recently hired](https://twitter.com/BHolmesDev/status/1506616758806802435) Slinkity creator/maintainer Ben Holmes, who has suggested that he may hand off Slinkity once it achieves its upcoming v.1.0 release.[^BHthoughts]) Although Eleventy-without-Slinkity and Hugo technically don't use components[^Bookshop], it's been argued that their [respective](https://www.11ty.dev/docs/shortcodes/) [support](https://gohugo.io/content-management/shortcodes/) for shortcodes can provide much of the same functionality. Even if that's true, your success with either SSG on this score could depend in large part on your own ability to develop those shortcodes.

[^BHthoughts]: Holmes has also said, in a private gist that he kindly gave me permission to quote: ". . . if we're talking [the] long game, and we take shipping fast and smooth DX into account, Astro's in a class of its own. I personally think owning the templating language leads to far greater wins both user[-] and developer[-side] than Slinkity could hope for. In sum, I see Slinkity as a tool to bring component-based utilities to those that prefer [Eleventy's] flexibility and data cascade. If you don't have a preference towards either of these[,] choose Astro!"

[^Bookshop]: If you use the [CloudCannon](https://cloudcannon.com) CMS with Eleventy or Hugo, CloudCannon's open-source [Bookshop](https://github.com/CloudCannon/bookshop) tool allows component-based website development.

## Dependencies-handling

Astro is a [Node.js](https://nodejs.org/) package and, within sensible limits, works with pretty much all the Node packages you can throw at it, at least so long as you're willing to handle the necessary [configuration](https://docs.astro.build/en/guides/configuring-astro/) and, of course, maintain all the resulting "turtles-all-the-way-down" sets of dependencies (not to mention those included *within* Astro itself).[^viewDeps]

[^viewDeps]: To see the levels of dependencies within a Node.js package, visit the [Anvaka visualization site](https://npm.anvaka.com) --- but be sure you have some time to spare, especially if you try it with any of these Node.js SSGs (particularly Gatsby, which I've read can crash Anvaka on some browsers because of this SSG's vast layers of dependencies).

**Comparison**: The same is true for Eleventy, Gatsby, and Next.js. Hugo is a single binary and doesn't use plugins, but many of its capabilities still come from external dependencies --- which, in Hugo's case, are *baked into* each Hugo release rather than being user-installable (and -choosable). You *can* add Node modules to a Hugo project (as in the aforementioned [addition](/posts/2022/03/making-tailwind-jit-work-hugo-version-3-edition/) of Tailwind CSS v.3), but it's not always possible to use them to override any of Hugo's baked-in dependencies.

## Image-handling

There is no official Astro solution for working with images, but [Astro ImageTools](https://github.com/RafidMuhymin/astro-imagetools) gives Astro the ability to provide optimized, responsive images.[^ownIH]

[^ownIH]: Also, for that matter: if you prefer, you can always write your own component for these purposes. In converting this site, that's what I've done, using my existing Eleventy and Hugo image-handling shortcodes to build an Astro component. I did so chiefly because I use [Cloudinary](https://cloudinary.com) to [manage my images](/posts/2020/07/transformed/) and, frankly, I liked the way I was already doing so in those other SSGs. Cloudinary does all the image-processing, so all I need to do is provide the appropriate special transformation URLs in the site's HTML.

**Comparison**: Among Eleventy, Gatsby, Hugo, and Next.js, each has either built-in functionality or official plugins for working with images. This was once a huge point of differentiation for Gatsby, but the others have pretty much caught up with it for all intents and purposes.

## Data-handling

Astro's [built-in data-fetching abilities](https://docs.astro.build/en/guides/data-fetching/) make it relatively trivial to pull data from either remote locations or just your own site. In fact, that's how you populate many commonly used variables, such as other pages' URLs and titles. If you've used the Node.js `fetch` command, you likely will find Astro's technique pleasantly familiar.

**Comparison**: There are similar ways to do this with Eleventy, Gatsby, Hugo, and Next.js. While I would argue that it's somewhat easier with Astro than with the others (Next.js's data-fetching methods and related code are the most similar to Astro's), that's really subjective --- with one notable exception. Gatsby's use of [GraphQL](https://graphql.org) makes its data-fetching powers impressive but overly complex to use, and its *dependence* on GraphQL for so many capabilities reminds me of the [old saw](https://en.wikipedia.org/wiki/Law_of_the_instrument) that "if all you have is a hammer, everything looks like a nail."

## Community

Astro's community, as I've found when spending time on its [Discord](https://astro.build/chat), is an amazing, welcoming, cheerful, unfailingly helpful, and kind bunch. As my usual readers know, they earned a special place in my heart by [their response](/posts/2021/08/boy-oh-grandboy/) on the day my grandson was born.

**Comparison**: I would say Eleventy's community pretty much ranks with that of Astro's, although the former's [Discord](https://www.11ty.dev/blog/discord/) doesn't seem quite as active; of course, this may be true at least in part because Eleventy is a more mature project, while Astro is still "busy being born," as [Bob Dylan once put it](https://www.bobdylan.com/songs/its-alright-ma-im-only-bleeding/). I can't say much one way or the other about the communities for Gatsby or Next.js, which exist more within their respective GitHub repos than in anything like a Discord. As for Hugo and its [Discourse instance](https://discourse.gohugo.io), I strongly suggest thoroughly searching not only the [Hugo documentation](https://gohugo.io/documentation) but also the web in general before asking a question or making an observation there --- and that's a totally fair expectation for the purposes of lowering the so-called signal-to-noise ratio.

## Feeds

At least for now, Astro clearly falls short in this category. Its built-in ability to provide [RSS feeds](https://en.wikipedia.org/wiki/RSS) is rather limited, and it doesn't yet enable [JSON feeds](https://jsonfeed.org) at all.[^XMLJSON] In the meantime, some users, including Yours Truly, have gotten around this by using the third-party [`feed` package](https://github.com/jpmonette/feed), which supports RSS and JSON feeds.[^feedAstro]

[^XMLJSON]: I hope that, in the near future, the Astro team will make it possible for `.astro` files to produce files that end in `.xml` or `.json`, thus allowing for full customization of feed files.

[^feedAstro]: I haven't yet learned how to parse (in a non-`.astro` file) the `Content` object that results from `fetch`ing a post, and a JSON feed must have either `content_text` or `content_html`. For the time being, with `feed`, I've made do with a post's description, which I *was* able to derive from `fetch`ed front matter. **Update, 2022‑05‑01**: [Ernesto Lopez](https://readonlychild.com)'s article, “[Astro --- markdown content](https://www.readonlychild.com/blog/astro-md-content/),” describes how to obtain HTML from an Astro site's Markdown files; **but**, unfortunately, that HTML lacks the processing of components imported therein (*e.g.*, a component import like the  `<ImageBox />` example from earlier would be rendered only as the actual **text**, `<ImageBox />`, rather than the **results** of that component's activity). Thus, I must continue to wait until there is a way to get RSS and JSON feeds from `.astro` files.

**Comparison**: Eleventy and Gatsby use plugins to provide support for RSS and JSON feeds. Hugo natively provides an RSS feed and, with a little tinkering, it's [fairly easy](/posts/2021/05/help-your-website-get-discovered/) to make a JSON-feed-savvy version of the built-in RSS template. Next.js provides no capability (built-in or otherwise) for either RSS or JSON feeds so, as in the case of Astro, you'd need to use `feed` or something similar.

## SSR

I waited until the end to deal with [*server-side rendering*](https://www.smashingmagazine.com/2020/07/differences-static-generated-sites-server-side-rendered-apps/) (SSR), primarily because I doubt most personal sites will need it. Still, if yours does, Astro recently gained this ability, albeit for now on an experimental basis. It works by using adapter software in conjunction with a growing number of Jamstack-savvy hosts.

**Comparison**: Eleventy has no SSR capability out of the box, but can gain it via the project's [official Serverless plugin](https://www.11ty.dev/docs/plugins/serverless/). SSR has long been part of the picture for both Gatsby and Next.js. Hugo, as the only non-Node.js SSG in this lot, doesn't do SSR; and, to my knowledge, there are no plans for that to change.

## Checkbox checkmate?

So what's the bottom line? How do all the checkboxes line up? In my admittedly subjective opinion:

- Astro definitely is ready to take on your site. I wouldn't have migrated my site to it had I thought otherwise. It's already quite capable; and, especially given some of the ideas and conversations I've seen floating around the Astro Discord, I think not only that Astro will gain even more features, soon, but also that its dev team will address the relatively few nits I raised herein concerning DX (and, perhaps less important, feeds).\
As for the others in the mix . . .
- If you'd rather stick with, or start with, platforms that are more mature than the nascent Astro, my judgments from my [2020 piece comparing/contrasting Eleventy and Hugo](/posts/2020/12/eleventy-hugo-comparing-contrasting/) still stand. Either will serve you well. Just decide which you prefer: a better OoTB experience (Hugo, especially with a good [theme](https://themes.gohugo.io) that helps you avoid getting under the hood until you're ready to wrangle Go), or a more open and customizable experience (Eleventy with its category-leading templating flexibility).
- With the exception of its current slow refresh rate in dev mode, Astro already offers a great deal of the [pleasant DX](/posts/2021/03/next-steps/) that originally made Next.js so compelling; yet, thanks to partial hydration, Astro has none of Next.js's built-in tendencies toward code bloat. Next.js may be perfect for corporate sites built by IT departments with React "shops," but it falls short for a personal site.
- And, frankly, my dear, Gatsby lately has been [falling off many developers' radars](https://2021.stateofjs.com/en-US/libraries/back-end-frameworks) to the extent that, I think, its time in the sun has come and gone. You can do better with any of these other platforms.
