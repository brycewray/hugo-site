---
title: "PurgeCSS joins my new styling stack"
description: "I stay in CLI City as I continue using Lightning CSS with my Hugo site."
author: Bryce Wray
date: 2024-02-13T11:10:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

I've continued to enjoy the speed and power of [Lightning CSS](https://lightningcss.dev) on this [Hugo](https://gohugo.io)-powered site, but there's one thing Lightning CSS can't do on its own: it can't de-bloat my CSS. In fact, it actually *contributes* to the bloat, [by design](https://lightningcss.dev/transpilation.html), to make the styling work on older, otherwise incompatible browsers.

So, for a slim-down, I opted to rely on the venerable [PurgeCSS](https://purgecss.com); but the resulting plumbing changes within my Hugo site would differ from how the vast majority of tutorials instruct.

<!--more-->

## CSS on a diet

If you've followed this tale thus far, you know that I [first employed Lightning CSS](/posts/2024/01/using-lightning-css-hugo/) through a [PostCSS plugin](https://github.com/onigoetz/postcss-lightningcss). Then, to avoid the inevitable slowdowns that PostCSS would impose on the otherwise staggeringly fast Lightning CSS, I ditched the plugin --- and PostCSS with it --- in favor of a [CLI-only method](/posts/2024/02/using-lightning-css-hugo-without-workarounds/).

While that worked wonderfully well, it did, as mentioned before, make my CSS larger; so, before long, I was thinking about trimming the fat in my styling. I'd done all I could to handle that manually but, with over twenty separate files to wrangle, there inevitably were still some unused rules, attributes, and variables which could stand to get whacked.

I was reasonably familiar with PurgeCSS --- having used it years ago with [Tailwind CSS](https://tailwindcss.com) before that framework's  conversion to [just-in-time processing](/posts/2021/03/jit-game-changer-tailwind-css/) ended the need to de-bloat its results --- but my previous experience with PurgeCSS had been only within the confines of, yep, PostCSS. This meant that, if I were to incorporate PurgeCSS into my site's current styling plumbing, I had two choices: (a.) implement PurgeCSS as a PostCSS plugin, as before; or (b.) use PurgeCSS [via CLI](https://purgecss.com/CLI.html), just as I'd already done with Lightning CSS.

Nearly every Hugo-with-PurgeCSS piece I've read so far tells you to opt for (a.); but as you've probably already guessed, my no-brainer selection from those two options was to go with (b.).

To [re-cap](/posts/2024/02/using-lightning-css-hugo-without-workarounds/#the-code), here's my Lightning CSS-as-CLI workflow **before** I added PurgeCSS:

- My "working" CSS files live in a folder called `css-originals`.
- LCSS processes those files and emits the resulting files in the main `css` folder.
- Hugo accesses the files in `css`.

Now that I've added PurgeCSS, it goes like this:

- As before, the "working" CSS files are in `css-originals`.
- As before, LCSS processes those files and the results go into the `css` folder.
- **In production mode**, PurgeCSS looks at the files in `css` and prunes them down as best it can. (It's possible, but not usually recommended, to use PurgeCSS in dev mode; and it definitely wouldn't be a good idea in my case, since I already have Lightning CSS and npm-watch doing their thing interactively during dev mode. Loop-de-loop time, I don't want.)
- Only then does Hugo access the files in `css`.

## Woodsman, spare that CSS

The results have both good and bad points.

First, the good point: since we're doing this in production mode only, it's largely irrelevant how long the additional step takes --- and, anyway, it takes almost no time at all (although, of course, it depends on how much CSS you're asking it to handle in the first place, but in my case it wasn't really that much). Even though PurgeCSS is a JavaScript-based package, using it strictly within the CLI rather than as a PostCSS plugin makes it far faster.

As for the bad point: having not dealt with PurgeCSS since early 2021, I'd forgotten that it can be, shall we say, "over-eager" in whacking CSS that my site really needs.

Back then, the way around it was to wrap otherwise whackable CSS within comments that told PurgeCSS to `ignore` that particular styling. That still works --- **except** when you're pre-processing your CSS with something that deletes your comments, which Lightning CSS does ([even when you're *not* minifying the CSS](https://github.com/parcel-bundler/lightningcss/issues/43)). That meant resorting to the [*safelisting* feature](https://purgecss.com/safelisting.html) within PurgeCSS's [configuration](https://purgecss.com/configuration.html) options, which I manage through a `purgecss.config.js` file.[^PurgeCSSconfig]

[^PurgeCSSconfig]: You can configure PurgeCSS strictly through the CLI as long as things are fairly simple but, when the options start getting complicated, it's wiser to use the separate config file.

"But, whoa, wait a minute," you may be thinking. "If you have PurgeCSS running only in production mode, does that mean you have to build and view your site locally, so you can inspect what PurgeCSS did or didn't eliminate?"

Yep, that's right. And considerations of that nature are why I've long included `testbuild` scripting in my Hugo workflow, as either a shell script or one of the `package.json` scripts. Here's what `testbuild` does as of this writing:

- Sets the Node.js environment to production.
- Deletes any folders and files left over from previous builds.
- Runs Lightning CSS and then PurgeCSS.
- Runs a Hugo build and then uses the [serve](https://github.com/vercel/serve) package to show me how things will look in production mode.[^serve]

[^serve]: In the original version of this post, I said: "Runs `hugo server`, but in Hugo's production mode." However, a comment from a June, 2023, thread on the Hugo Discourse forum dissuaded me from continuing to go that route.

This lets me see the site locally as it would appear on the actual web, giving me the chance to confirm that things look as they should. If they don't because PurgeCSS has deleted some needed styling, that's when I compare the affected item with what's currently on the real website. I use the browser Inspector to see what's missing and edit the PurgeCSS `safelist` object as needed.

To be fair to PurgeCSS, some of the safelisting I've done for my site was necessary because of [how Hugo handles syntax highlighting](https://discourse.gohugo.io/t/purgecss-and-highlighting/41021). That said, there were some PurgeCSS-only oddities, such as why it kept wanting to delete certain CSS variables on which I rely. (By default, it doesn't handle CSS variables at all but, since I do use quite a few, I thought it wise to let PurgeCSS have at them.)

## The code

Please note that the following code samples all assume the use of a theme called `lcss`, for consistency with my [previous post](/posts/2024/02/using-lightning-css-hugo-without-workarounds/). (On my real site repo, I'm not using themes --- having decided that I will go strictly with Lightning CSS, at least for now --- which is one of the many reasons why inspecting my repo's versions of the following files will show you some significant differences.)

First, the general scripting:

```json{filename="package.json" bigdiv=true}
{
	"config": {
		"targets": "defaults"
	},
	"watch": {
		"dev:lcss": {
			"patterns": [
				"themes/lcss/assets/css-original"
			],
			"extensions": "css,scss",
			"quiet": true,
			"runOnChangeOnly": false
		}
	},
	"scripts": {
		"clean:hugo": "rimraf public",
		"clean:lcss": "rimraf themes/lcss/assets/css",
		"dev:hugo": "hugo server",
		"prod:hugo": "hugo --minify",
		"testbuild:hugo": "npm run dev:hugo -- --minify --environment=production",
		"start": "NODE_ENV=development npm-run-all clean:* dev:lcss --parallel dev:hugo watch",
		"dev:lcss": "lightningcss --bundle --targets \"$npm_package_config_targets\" themes/lcss/assets/css-original/*.css --output-dir themes/lcss/assets/css",
		"build:lcss": "npm run dev:lcss -- --minify",
		"build:purge": "purgecss --config ./purgecss.config.js",
		"build:prelim": "NODE_ENV=production npm-run-all clean:* build:lcss build:purge",
		"build": "npm-run-all build:prelim prod:hugo",
		"serve": "npx serve -l tcp://$npm_package_config_myIP",
		"testbuild": "NODE_ENV=production npm-run-all build serve",
		"watch": "npm-watch"
	},
	"devDependencies": {
		"lightningcss-cli": "^1.23.0",
		"npm-run-all": "^4.1.5",
		"npm-watch": "^0.11.0",
		"purgecss": "^5.0.0",
		"serve": "^14.2.1",
		"rimraf": "^5.0.5"
	}
}
```

Then comes the PurgeCSS configuration:
- The `content` array tells PurgeCSS to watch the `hugo_stats.json` file, in which a [properly configured](https://gohugo.io/getting-started/configuration/#configure-build) Hugo project tracks the CSS classes, item IDs, and HTML tags from its content. Of course, that list *doesn't* include any classes I might inject through JavaScript, so I included a location where PurgeCSS could check on my JS files, too.
- The `safelist` object contains arrays of [regular expressions](https://regexlearn.com/) for items which PurgeCSS should **not** delete. Some of these I borrowed from other Hugo repos where PurgeCSS is in use, while others --- *e.g.*, `/blue-800/`, from the `--blue-800` CSS variable I use in the headings of numerous tables in this site --- are here because of what I observed in using `testbuild`.

```js{filename="purgecss.config.js"}
module.exports = {
	content: [
		"./hugo_stats.json",
		"./assets/**/*.js"
	],
	css: ['./themes/lcss/assets/css/**/*.css'],
	output: './themes/lcss/assets/css',
	safelist: {
		standard: [
			/^\:.*/
		],
		deep: [
			/chroma/,
			/pagefind/,
			/contactButton/
		],
		greedy: [
			/input$/,
			/highlight/,
			/code-inline/
		],
		variables: [
			/pf/,
			/slate-/,
			/gray-/,
			/neutral-400/,
			/neutral-600/,
			/emerald-050/,
			/emerald-900/,
			/red-300/,
			/red-400/,
			/red-600/,
			/red-700/,
			/orange-300/,
			/orange-700/,
			/yellow-200/,
			/yellow-300/,
			/yellow-800/,
			/green-100/,
			/green-600/,
			/emerald-050/,
			/emerald-200/,
			/emerald-700/,
			/emerald-900/,
			/cyan-300/,
			/cyan-600/,
			/blue-/,
			/fuchsia-300/,
			/fuchsia-700/,
			/rose-300/,
			/rose-700/
		]
	},
	variables: true
}
```

In my case, the reductions in CSS load size so far haven't been that great, especially after the [Brotli compression](https://github.com/google/brotli) that happens on the server side. (Perhaps I'd already done a *reasonably* good job of self-trimming?) **However**, there **were** reductions, and that's to the good of any visitor, bandwidth-challenged or not. So, especially if you haven't yet manually taken the barber clippers to your CSS, you might want to give PurgeCSS a go at it.

## References

- Zachary Betz, "[How to Use PurgeCSS With Hugo](https://zwbetz.com/how-to-use-purgecss-with-hugo/)" (updated <span class="nobrk">2022-07-22</span>).
- Luke Harris, "[PurgeCSS with Hugo](https://www.lkhrs.com/blog/2022/10/postcss-hugo/)" (<span class="nobrk">2022-10-29</span>).
- Christian Oliff
	- "[Using PurgeCSS with Hugo](https://christianoliff.com/blog/using-purgecss-with-hugo/)" (<span class="nobrk">2022-07-05</span>).
	- ["Using PurgeCSS with Hugo" video](https://www.youtube.com/watch?v=qg1MkT1o_PI) from [HugoConf 2022](https://hugoconf.io/hugoconf-2022/) (presented <span class="nobrk">2022-07-07</span>).
- Hugo Discourse forum
	- "[PurgeCSS and highlighting](https://discourse.gohugo.io/t/purgecss-and-highlighting/41021)" (topic initiated <span class="nobrk">2022-10-20</span>).
	- "[Trouble with PurgeCSS](https://discourse.gohugo.io/t/trouble-with-purgecss/45501)" (topic initiated <span class="nobrk">2023-07-27</span>).
- Hugo documentation, "[Configure Hugo](https://gohugo.io/getting-started/configuration/)"  (as updated <span class="nobrk">2024-01-09</span>).
- PurgeCSS documentation
	- [CLI](https://purgecss.com/CLI.html) (as updated <span class="nobrk">2022-02-18</span>).
	- [Configuration](https://purgecss.com/configuration.html) (as updated <span class="nobrk">2022-02-22</span>).
	- [Hugo](https://purgecss.com/guides/hugo.html) (adapted from Betz's aforementioned post; last updated <span class="nobrk">2022-12-14</span>).
	- [Safelisting](https://purgecss.com/safelisting.html) (as updated <span class="nobrk">2022-02-18</span>).
