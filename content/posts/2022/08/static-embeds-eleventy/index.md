---
title: "Static embeds in Eleventy"
description: "In what could and perhaps should be the end of this saga, here’s code to provide static tweets and static Mastodon toots in Eleventy."
author: Bryce Wray
date: 2022-08-27T12:33:00-05:00
#initTextEditor: **iA Writer**
---

In the process of my experimentation with various static site generators (SSGs), I've created [Eleventy](https://11ty.dev) versions of my [Hugo](https://gohugo.io) shortcodes for doing fully static embeds of tweets and their Mastodon counterpart, toots. I offer them here in somewhat edited form, with their original repo-based versions as noted.

Of course, be sure to enable each of these in your Eleventy config file through the [usual procedure](https://www.11ty.dev/docs/shortcodes/). Feel free to rename them if you wish; their respective names are just what I call them.

**Note**: For the most current repo-based form of the SCSS I used to style both tweets and toots displayed through these shortcodes, see [this partial](https://github.com/brycewray/eleventy_site/blob/main/src/assets/scss/_twitter.scss).
{.box}

And, yes, this may finally be the end of my posts on this subject, half a year after [I started down this path](/posts/2022/02/static-tweets-eleventy-hugo/). Feel free to rejoice. I'll be right there with ya.

**Update, 2022-08-30**: Actually, I decided I should do [at least one more such post](/posts/2022/08/static-tweets-astro-two-sources-edition/).
{.box}

## Static tweets

### Deprecation notice, 2022-11-06

Due to changes in the status and/or availability of one or more Twitter APIs, perhaps due to the many corporate changes at Twitter itself following its purchase by Elon Musk, I have deprecated several posts, or sections thereof, concerning the fully static embedding of tweets within one's website. **However**, if you still wish to see the final pre-deprecation form of this post, it remains accessible [in the site's GitHub repo](https://github.com/brycewray/hugo_site/blob/main/.deprecated/content/posts/2022/08/static-embeds-eleventy/index.md).

## Static toots

Using the `stoot.js` shortcode in Markdown brings up the following:

{{< stoot "fosstodon.org" "108896692414393920" >}}

You can find this shortcode's most current repo version [here](https://github.com/brycewray/eleventy_site/blob/main/src/assets/utils/stoot.js). Invoke it in Markdown as in this example, where the first parameter represents the toot's Mastodon instance and the second represents the toot's numeric ID:

```md
{% stoot "fosstodon.org" "108896692414393920" %}
```

Note that it assumes you have the [`eleventy-fetch`](https://github.com/11ty/eleventy-fetch), [`luxon`](https://github.com/moment/luxon), and [`md5`](https://github.com/pvorb/node-md5) packages installed in the project.

```js
const EleventyFetch = require("@11ty/eleventy-fetch")
const md5 = require('md5')
const { DateTime } = require("luxon")

module.exports = async (instance, id) => {

	let tootLink, handleInst, mediaMD5, urlToGet, mediaStuff, videoStuff, gifvStuff, pollStuff = ''
	let imageCount, votesCount = 0

	urlToGet = `https://` + instance + `/api/v1/statuses/` + id

	async function GetToot(tootURL) {
		const response = await EleventyFetch(tootURL, {
			duration: "2w",
			type: "json"
		});
		return response
	}
	// Regarding the settings above,
	// consult the eleventy-fetch documentation
	// at https://www.11ty.dev/docs/plugins/fetch/

	let Json = await GetToot(urlToGet);

	if (Json.account) {
		tootLink = `https://` + instance + `@` + Json.account.acct + `/status/` + id
		handleInst = `@` + Json.account.acct + `@` + instance
	}

	if (Json.media_attachments.length !== 0) {
		mediaMD5 = md5(Json.media_attachments[0].url)
		Json.media_attachments.forEach((type) => {
			if (Json.media_attachments[0].type == "image") {
				imageCount = ++imageCount
			}
		})
		Json.media_attachments.forEach((type, meta) => {
			if (Json.media_attachments[0].type == "image") {
				mediaStuff = ``
				mediaStuff = mediaStuff + `<div class="tweet-img-grid-${imageCount}"><style>.img-${mediaMD5} {aspect-ratio: ${Json.media_attachments[0].meta.original.width} / ${Json.media_attachments[0].meta.original.height}}</style>`
				mediaStuff = mediaStuff + `<img src="${Json.media_attachments[0].url}" alt="Image ${Json.media_attachments[0].id} from toot ${id} on ${instance}" class="tweet-media-img img-${mediaMD5}`
				if (Json.sensitive) {
					mediaStuff = mediaStuff + ` tweet-sens-blur`
				}
				mediaStuff = mediaStuff + `" loading="lazy"`
				if (Json.sensitive) {
					mediaStuff = mediaStuff + ` onclick="this.classList.toggle('tweet-sens-blur-no')"`
				}
				mediaStuff = mediaStuff + `/>`
				if (Json.sensitive) {
					mediaStuff = mediaStuff + `<div class="blur-text">Sensitive content<br />(flagged&nbsp;at&nbsp;origin)</div>`
				}
				mediaStuff = mediaStuff + `</div>`
			}
			if (Json.media_attachments[0].type == "video") {
				videoStuff = ``
				videoStuff = videoStuff + `<style>.img-${mediaMD5} {aspect-ratio: ${Json.media_attachments[0].meta.original.width} / ${Json.media_attachments[0].meta.original.height}}</style>`
				videoStuff = videoStuff + `<div class="ctr tweet-video-wrapper"><video muted playsinline controls class="ctr tweet-media-img img-${mediaMD5}`
				if (Json.sensitive) {
					videoStuff = videoStuff + ` tweet-sens-blur`
				}
				videoStuff = videoStuff + `"`
				if (Json.sensitive) {
					videoStuff = videoStuff + ` onclick="this.classList.toggle('tweet-sens-blur-no')"`
				}
				videoStuff = videoStuff + `><source src="${Json.media_attachments[0].url}"><p class="legal ctr">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p></video>`
				if (Json.sensitive) {
					videoStuff = videoStuff + `<div class="blur-text">Sensitive content<br />(flagged&nbsp;at&nbsp;origin)</div>`
				}
				videoStuff = videoStuff + `</div>`
			}
			if (Json.media_attachments[0].type == "gifv") {
				gifvStuff = ``
				gifvStuff = gifvStuff + `<style>.img-${mediaMD5} {aspect-ratio: ${Json.media_attachments[0].meta.original.width} / ${Json.media_attachments[0].meta.original.height}}</style>`
				gifvStuff = gifvStuff + `<div class="ctr tweet-video-wrapper"><video loop autoplay muted playsinline controls controlslist="nofullscreen" class="ctr tweet-media-img img-${mediaMD5}`
				if (Json.sensitive) {
					gifvStuff = gifvStuff + ` tweet-sens-blur`
				}
				gifvStuff = gifvStuff + `"`
				if (Json.sensitive) {
					gifvStuff = gifvStuff + ` onclick="this.classList.toggle('tweet-sens-blur-no')"`
				}
				gifvStuff = gifvStuff + `><source src="${Json.media_attachments[0].url}"><p class="legal ctr">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p></video>`
				if (Json.sensitive) {
					gifvStuff = gifvStuff + `<div class="blur-text">Sensitive content<br />(flagged&nbsp;at&nbsp;origin)</div>`
				}
				gifvStuff = gifvStuff + `</div>`
			}
		})
	}

	if (Json.poll !== null) {
		votesCount = Json.poll.votes_count
		let pollIterator = 0
		pollStuff = ``
		pollStuff = pollStuff + `<div class="tweet-poll-wrapper">`
		Json.poll.options.forEach(( options ) => {
			pollStuff = pollStuff + `<div class="tweet-poll-count"><strong>${((Json.poll.options[pollIterator].votes_count)/(votesCount)).toLocaleString("en", {style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1})}</strong></div><div class="tweet-poll-meter"><meter id="vote-count" max="${votesCount}" value=${Json.poll.options[pollIterator].votes_count}></meter></div><div class="tweet-poll-title">${Json.poll.options[pollIterator].title}</div>`
			pollIterator = ++pollIterator
		})
		pollStuff = pollStuff + `</div><p class="legal tweet-poll-total">${votesCount} votes</p>`
	}

	if (Json.content) {
		stringToRet = `<blockquote class="tweet-card" cite="${tootLink}">
			<div class="tweet-header">
				<a class="tweet-profile twitterExt" href="https://${instance}/@${Json.account.acct}" rel="noopener"><img src="${Json.account.avatar}" alt="Mastodon avatar for ${handleInst}" loading="lazy" /></a>
				<div class="tweet-author">
					<a class="tweet-author-name twitterExt" href="https://${instance}/@${Json.account.acct}" rel="noopener">${Json.account.display_name}</a>
					<a class="tweet-author-handle twitterExt" href="https://${instance}/@${Json.account.acct}" rel="noopener">${handleInst}</a>
				</div>
			</div>
			<p class="tweet-body">${Json.content}</p>`
			if (mediaStuff) {
				stringToRet += `<div>${mediaStuff}</div>`
			}
			if (videoStuff) {
				stringToRet += `<div>${videoStuff}</div>`
			}
			if (gifvStuff) {
				stringToRet += `<div>${gifvStuff}</div>`
			}
			if (pollStuff) {
				stringToRet += `<div>${pollStuff}</div>`
			}

			let timeToFormat = Json.created_at
			let formattedTime = DateTime.fromISO(timeToFormat, { zone: "utc" }).toFormat("h:mm a • MMM d, yyyy")

			stringToRet += `<div class="tweet-footer">
				<a href="https://${instance}/@${Json.account.acct}/${Json.id}" class="tweet-date twitterExt" rel="noopener">${formattedTime}</a>&nbsp;<span class="legal">(UTC)</span>
			</div>
		</blockquote>`
	}

	return stringToRet
}
```
