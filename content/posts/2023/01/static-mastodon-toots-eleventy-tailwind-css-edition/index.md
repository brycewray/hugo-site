---
title: "Static Mastodon toots in Eleventy: the Tailwind CSS edition"
description: "For users of my favorite JS-based SSG, here’s an Eleventy version of the Tailwind-based toots-embedding shortcode I offered yesterday."
author: Bryce Wray
date: 2023-01-17T13:21:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

[Last June](/posts/2022/06/static-mastodon-toots-hugo/), I provided code for statically embedding [Mastodon](https://joinmastodon.org) content in the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG). [A couple of months later](/posts/2022/08/static-embeds-eleventy/), I followed up with similar code for use in the JavaScript-based [Eleventy](https://11ty.dev) SSG. In each case, the styling was [Sass](https://sass-lang.com)-based. Then, [yesterday](/posts/2023/01/static-mastodon-toots-hugo-tailwind-css-edition/), I provided Hugo code using styling from [Tailwind CSS](https://tailwindcss.com); so, today, here is a Tailwind-based version for Eleventy, too.

<!--more-->

I will spare you a repetition of the info from the [earlier Eleventy-related post](/posts/2022/08/static-embeds-eleventy/) about these embeds, so please consult that post as necessary before proceeding.

Other than normal Tailwind itself, the code I present below --- which **as of Tailwind 3.x** produces static embeds with pretty much the same appearance as did the code in the original post --- needs a little extra help . . .

**First**, in your Tailwind configuration, you should install the [`tailwind-fluid-typography` plugin](https://github.com/craigrileyuk/tailwind-fluid-typography). It adds a number of `fluid-` classes, each of which makes use of CSS's [`clamp` function](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) to provide more responsive text sizing. The code makes use of several of these classes.

**Second**, because of a bit of the CSS that Mastodon content includes, you'll need to compensate with a [`@layer` addition](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer) after bringing in[^myImport] Tailwind's own regular styling:

[^myImport]: If you're using `@import` to bring in other CSS files in addition to the Tailwind styling, [that'll be necessary for the Tailwind stuff as well](https://tailwindcss.com/docs/using-with-preprocessors#build-time-imports).

```css
/*
This is your project's main CSS file.
*/

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
	.toot-content {
		@apply text-gray-900 dark:text-gray-100;
		& .invisible{
			@apply text-[0pt] leading-[0] block w-0 h-0;
		}
		& .ellipsis::after {
			content: "...";
		}
	}
}
```

**Finally**, as was true for the Eleventy code from the earlier post, this code assumes you have the [`eleventy-fetch`](https://github.com/11ty/eleventy-fetch), [`luxon`](https://github.com/moment/luxon), and [`md5`](https://github.com/pvorb/node-md5) packages installed in your project.

With all of that understood, here's the Eleventy [shortcode](https://www.11ty.dev/docs/shortcodes/) I call `stoot.js` (**not** `stoot.njk`, as I erroneously called it in the original version of this post):

```js
const EleventyFetch = require("@11ty/eleventy-fetch")
const md5 = require('md5')
const { DateTime } = require("luxon")

module.exports = async (instance, id) => {

	let stringToRet = ``
	let tootLink, handleInst, mediaMD5, urlToGet, mediaStuff, videoStuff, gifvStuff, cardStuff, pollStuff = ''
	let imageCount, votesCount = 0

	urlToGet = `https://` + instance + `/api/v1/statuses/` + id

	async function GetToot(tootURL) {
		const response = await EleventyFetch(tootURL, {
			duration: "2w",
			type: "json"
		});
		return response
	}

	let Json = await GetToot(urlToGet);

	if (Json.account) {
		tootLink = `https://` + instance + `@` + Json.account.acct + `/status/` + id
		handleInst = `@` + Json.account.acct + `@` + instance
	}

	if (Json.media_attachments.length !== 0) {
		mediaMD5 = md5(Json.media_attachments[0].url)
		Json.media_attachments.forEach((type) => {
			if (Json.media_attachments[0].type == "image") {
				imageCount = ++imageCount;
			}
		})
		Json.media_attachments.forEach((type, meta) => {
			if (Json.media_attachments[0].type == "image") {
				mediaStuff = ``;
				mediaStuff = mediaStuff + `<div class="mt-2 rounded-xl overflow-hidden grid grid-cols-1 gap-[2px]"><style>.img-${mediaMD5} {aspect-ratio: ${Json.media_attachments[0].meta.original.width} / ${Json.media_attachments[0].meta.original.height}}</style>`;
				mediaStuff = mediaStuff + `<img src="${Json.media_attachments[0].url}" alt="Image ${Json.media_attachments[0].id} from toot ${id} on ${instance}" class="tweet-media-img img-${mediaMD5}`;
				if (Json.sensitive) {
					mediaStuff = mediaStuff + ` blur-2xl relative`;
				}
				mediaStuff = mediaStuff + `" loading="lazy"`;
				if (Json.sensitive) {
					mediaStuff = mediaStuff + ` onclick="this.classList.toggle('!blur-none !z-[9999] relative')"`;
				}
				mediaStuff = mediaStuff + `/>`;
				if (Json.sensitive) {
					mediaStuff = mediaStuff + `<div class="absolute font-bold w-full top-[40%] text-white text-center text-2xl leading-tight">Sensitive content<br />(flagged&nbsp;at&nbsp;origin)</div>`;
				}
				mediaStuff = mediaStuff + `</div>`;
			}
			if (Json.media_attachments[0].type == "video") {
				videoStuff = ``;
				videoStuff = videoStuff + `<style>.img-${mediaMD5} {aspect-ratio: ${Json.media_attachments[0].meta.original.width} / ${Json.media_attachments[0].meta.original.height}}</style>`;
				videoStuff = videoStuff + `<div class="text-center mt-2 rounded-xl overflow-hidden grid grid-cols-1 gap-[2px]"><video muted playsinline controls class="text-center w-full h-auto aspect-square object-cover img-${mediaMD5}`;
				if (Json.sensitive) {
					videoStuff = videoStuff + ` blur-2xl relative`;
				}
				videoStuff = videoStuff + `"`;
				if (Json.sensitive) {
					videoStuff = videoStuff + ` onclick="this.classList.toggle('!blur-none !z-[9999] relative')"`;
				}
				videoStuff = videoStuff + `><source src="${Json.media_attachments[0].url}"><p class="fluid-xs text-center">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p></video>`;
				if (Json.sensitive) {
					videoStuff = videoStuff + `<div class="absolute font-bold w-full top-[40%] text-white text-center text-2xl leading-tight">Sensitive content<br />(flagged&nbsp;at&nbsp;origin)</div>`;
				}
				videoStuff = videoStuff + `</div>`
			}
			if (Json.media_attachments[0].type == "gifv") {
				gifvStuff = ``;
				gifvStuff = gifvStuff + `<style>.img-${mediaMD5} {aspect-ratio: ${Json.media_attachments[0].meta.original.width} / ${Json.media_attachments[0].meta.original.height}}</style>`;
				gifvStuff = gifvStuff + `<div class="text-center mt-2 rounded-xl overflow-hidden grid grid-cols-1 gap-[2px]"><video loop autoplay muted playsinline controls controlslist="nofullscreen" class="text-center w-full h-auto aspect-square object-cover img-${mediaMD5}`;
				if (Json.sensitive) {
					gifvStuff = gifvStuff + ` blur-2xl relative`;
				}
				gifvStuff = gifvStuff + `"`;
				if (Json.sensitive) {
					gifvStuff = gifvStuff + ` onclick="this.classList.toggle('!blur-none !z-[9999] relative')"`;
				}
				gifvStuff = gifvStuff + `><source src="${Json.media_attachments[0].url}"><p class="fluid-xs text-center">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p></video>`;
				if (Json.sensitive) {
					gifvStuff = gifvStuff + `<div class=""absolute font-bold w-full top-[40%] text-white text-center text-2xl leading-tight">Sensitive content<br />(flagged&nbsp;at&nbsp;origin)</div>`;
				}
				gifvStuff = gifvStuff + `</div>`
			}
		})

	if(Json.card !== null) {
		cardStuff = ``;
		cardStuff = cardStuff + `<a href="${Json.card.url}" class="no-underline decoration-transparent text-gray-700 dark:text-gray-300" rel="noopener"><div class="relative md:flex border border-gray-700 dark:border-gray-200 rounded-md mt-4 decoration-transparent overflow-hidden"><div class="flex-100 md:flex-200 relative"><img src="${Json.card.image}" alt="Card image from ${instance} toot ${id}" loading="lazy" class="block m-0 w-full h-full object-cover bg-cover bg-[50%]" /></div><div class="flex-auto overflow-hidden p-3 leading-normal"><p class="font-bold fluid-sm !tracking-normal !leading-normal">${Json.card.title}</p><p class="fluid-xs !leading-normal !tracking-normal">${Json.card.description}</p></div></div></a>`;
	}

	if (Json.poll !== null) {
		votesCount = Json.poll.votes_count;
		let pollIterator = 0;
		pollStuff = ``;
		pollStuff = pollStuff + `<div class="grid grid-cols-[3.5em 0.5fr 1fr] gap-[1em]leading-none">`;
		Json.poll.options.forEach(( options ) => {
			pollStuff = pollStuff + `<div class="col-start-1 text-right"><strong>${((Json.poll.options[pollIterator].votes_count)/(votesCount)).toLocaleString("en", {style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1})}</strong></div><div class="col-start-2"><meter class="w-full" id="vote-count" max="${votesCount}" value=${Json.poll.options[pollIterator].votes_count}></meter></div><div class="col-start-3">${Json.poll.options[pollIterator].title}</div>`;
			pollIterator = ++pollIterator;
		})
		pollStuff = pollStuff + `</div><p class="fluid-xs pt-4">${votesCount} people</p>`;
	}

	if (Json.content) {
		stringToRet = `<blockquote class="fluid-base mx-auto my-auto p-4 border-2 border-gray-700 dark:border-gray-200 rounded-xl bg-white dark:bg-gray-900 w-full md:w-[80%]" cite="${tootLink}" data-pagefind-ignore>
			<div class="flex">
				<a class="mr-2 flex-shrink-0 no-underline" href="https://${instance}/@${Json.account.acct}" rel="noopener"><img class="w-[48px] h-auto rounded-full" src="${Json.account.avatar}" alt="Mastodon avatar for ${handleInst}" loading="lazy" /></a>
				<div class="flex flex-col flex-grow">
					<a class="font-bold text-black dark:text-white fluid-sm lg:fluid-base !tracking-normal no-underline" href="https://${instance}/@${Json.account.acct}" rel="noopener">${Json.account.display_name}</a>
					<a class="text-gray-700 dark:text-gray-200 fluid-xs lg:fluid-sm !leading-none !tracking-normal no-underline" href="https://${instance}/@${Json.account.acct}" rel="noopener">${handleInst}</a>
				</div>
			</div>
			<div class="toot-content py-4">${Json.content}</div>`
			if (mediaStuff) {
				stringToRet += `<div>${mediaStuff}</div>`
			}
			if (videoStuff) {
				stringToRet += `<div>${videoStuff}</div>`
			}
			if (gifvStuff) {
				stringToRet += `<div>${gifvStuff}</div>`
			}
			if (cardStuff) {
				stringToRet += `<div>${cardStuff}</div>`
			}
			if (pollStuff) {
				stringToRet += `<div>${pollStuff}</div>`
			}

			let timeToFormat = Json.created_at
			let formattedTime = DateTime.fromISO(timeToFormat, { zone: "utc" }).toFormat("h:mm a • MMMM d, yyyy")

			stringToRet += `<div class="mt-4 flex items-center text-gray-500 dark:text-gray-300 fluid-sm !tracking-normal">
				<a href="https://${instance}/@${Json.account.acct}/${Json.id}" class="text-gray-600 dark:text-gray-300 no-underline" rel="noopener">${formattedTime}</a>&nbsp;<span class="fluid-xs">(UTC)</span>
			</div>
		</blockquote>`
	}

	return stringToRet
}
```
