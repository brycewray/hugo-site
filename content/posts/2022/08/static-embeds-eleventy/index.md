---
title: "Static embeds in Eleventy"
description: "In what could and perhaps should be the end of this saga, here’s code to provide static tweets and static Mastodon toots in Eleventy."
author: Bryce Wray
date: 2022-08-27T12:33:00-05:00
#initTextEditor: **iA Writer**
---

In the process of my experimentation with various static site generators (SSGs), I've created [Eleventy](https://11ty.dev) versions of my [Hugo](https://gohugo.io) shortcodes for doing fully static embeds of tweets and their Mastodon counterpart, toots. I offer them here in somewhat edited form, with their original repo-based versions as noted.

Of course, be sure to enable each of these in your Eleventy config file through the [usual procedure](https://www.11ty.dev/docs/shortcodes/). Feel free to rename them if you wish; their respective names are just what I call them.

**Note**: For the most current repo-based form of the SCSS I used to style both tweets and toots displayed through these shortcodes, see [this partial](https://github.com/brycewray/eleventy_site/blob/main/src/assets/scss/_twitter.scss).
{.yellowBox}

And, yes, this may finally be the end of my posts on this subject, half a year after [I started down this path](/posts/2022/02/static-tweets-eleventy-hugo/). Feel free to rejoice. I'll be right there with ya.

**Update, 2022-08-30**: Actually, I decided I should do [at least one more such post](/posts/2022/08/static-tweets-astro-two-sources-edition/).
{.yellowBox}

## Static tweets

For each example below, using the shortcode in Markdown brings up the following[^omitLink]:

[^omitLink]: I have included code within the current site repo's shortcode to hide the `pic.twitter.com` image link which otherwise would appear. You can get ideas for how to do this in your own implementation by checking the original code files linked herein.

{{< stweet user="EliArieh" id="1563133769443610625" >}}

### Two-source version

The `stweet.js` shortcode uses two Twitter APIs: Public Syndication and oEmbed. You can find its most current repo version [here](https://github.com/brycewray/eleventy_site/blob/main/src/assets/utils/stweet.js). Invoke it in Markdown as in this example, where the first parameter represents the tweet author's Twitter handle (without the `@`) and the second represents the tweet's numeric ID:

```md
{% stweet "EliArieh", "1563133769443610625" %}
```

Note that it assumes you have the [`eleventy-fetch`](https://github.com/11ty/eleventy-fetch) and [`luxon`](https://github.com/moment/luxon) packages installed in the project.

```js

const EleventyFetch = require("@11ty/eleventy-fetch")
const { DateTime } = require("luxon")

module.exports = async (user, id) => {

	let stringToRet = ``
	let RT_text = ''

	const urlOembed = `https://twitter.com/${user}/status/${id}`
	const query = `url=${urlOembed}&dnt=true&omit_script=true`
	const requestUrlO = `https://publish.twitter.com/oembed?` + query
	const urlSynd = `https://cdn.syndication.twimg.com/tweet?id=${id}`

	async function getTweet(tweetURL) {
		const response = await EleventyFetch(tweetURL, {
			duration: "2w",
			type: "json"
		})
		return response
	}
	// Regarding the settings above,
	// consult the eleventy-fetch documentation
	// at https://www.11ty.dev/docs/plugins/fetch/

	let Json = await getTweet(urlSynd)
	let Text = Json.text

	let JsonOembed = await getTweet(requestUrlO)
	let JsonOHTML = JsonOembed.html
		if (Json.in_reply_to_screen_name) {
		RT_text = `Replying to <a href="https://twitter.com/${Json.in_reply_to_screen_name}">@${Json.in_reply_to_screen_name}</a>`
	}

	if (Json.photos && Json.photos !="") {
		if (Json.entities.media) {
			Json.entities.media.forEach(({ url, display_url }) => {
				JsonOHTML = JsonOHTML.replace(
					`<a href="${url}">${display_url}</a>`,
					`<div class="tweet-img-grid-${Json.photos.length}"><img src="" alt="Image from tweet ${id}" class="tweet-media-img" loading="lazy"></div>`
				)
			})
		}
		Json.photos.forEach((url) => {
			JsonOHTML = JsonOHTML.replace(
				`<img src="" alt="Image from tweet ${id}" class="tweet-media-img" loading="lazy">`,
				`<img src="${Json.photos[0].url}" alt="Image from tweet ${id}" class="tweet-media-img"
				loading="lazy">`
			)
		})
	}

	if (Json.entities) {
		if (Json.entities.user_mentions) {
			Json.entities.user_mentions.forEach(({ screen_name }) => {
				Text = Text.replace(
					`@${screen_name}`,
					`<a rel="noreferrer noopener" href="https://twitter.com/${screen_name}">@${screen_name}</a>`
				)
			})
		}
		if (Json.entities.hashtags) {
			Json.entities.hashtags.forEach((tag) => {
				Text = Text.replace(
					`#${tag.text}`,
					`<a rel="noreferrer noopener" href="https://twitter.com/hashtag/${tag.text}?src=hash&ref_src=twsrc">#${tag.text}</a>`
				)
			})
		}
		if (Json.entities.media) {
			Json.entities.media.forEach(({url, display_url}) => {
				Text = Text.replace(
					`${url}`,
					``
				)
				JsonOHTML = JsonOHTML.replace(
					`<a href="${url}">${display_url}</a>`,
					``
				)
			})
		}
		if (Json.entities.urls) {
			Json.entities.urls.forEach((url) => {
				Text = Text.replace(
					`${url.url}`,
					`${url.display_url}`
				)
			})
		}
	}

	if (Json.quoted_tweet) {
		let QT_text = Json.quoted_tweet.text
		if (Json.quoted_tweet.entities) {
			Json.quoted_tweet.entities.urls.forEach((url) => {
				QT_text = QT_text.replace(
					`${url.url}`,
					`${url.display_url}`
				)
			})
		}
		if (Json.entities) {
			if (Json.entities.urls) {
				Json.entities.urls.forEach((url) => {
					Text = Text.replace (
						`${url.url}`,
						`${url.display_url}`
					)
				})
			}
		}
	}

	JsonOHTML = JsonOHTML.replace(
		`<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">`,
		``
	)
	let RegExRepl = /<\/p>.*/gm
	JsonOHTML = JsonOHTML.replace(
		RegExRepl,
		``
	)

	JsonOHTML = JsonOHTML
		.replace(
			`!<a`,
			`! <a`
		)
		.replace(
			`.<a`,
			`. <a`
		)
		.replace(
			`😄<a`,
			`😄 <a`
		)
		.replace(
			`:<a`,
			`: <a`
		)

	if (Json.card) {
		if (Json.card.url) {
			JsonOHTML = JsonOHTML.replace(
				`<a href="${Json.card.url}">${Json.card.url}</a>"`,
				``
			)
		}
	}

	let tweetLink = `https://twitter.com/${Json.user.screen_name}/status/${id}`;

	stringToRet += `<blockquote class="tweet-card" cite="${tweetLink}">
		<div class="tweet-header">
			<a class="tweet-profile twitterExt" href="https://twitter.com/${Json.user.screen_name}" rel="noopener">
				<img src="${Json.user.profile_image_url_https}" alt="Twitter avatar for ${Json.user.screen_name}" loading="lazy" />
			</a>
			<div class="tweet-author">
				<a class="tweet-author-name twitterExt" href="https://twitter.com/${Json.user.screen_name}" rel="noopener">${Json.user.name}</a>
				<a class="tweet-author-handle twitterExt" href="https://twitter.com/${Json.user.screen_name}" rel="noopener">@${Json.user.screen_name}</a>
			</div>
		</div>`
		if (RT_text) {
			stringToRet += `<p class="pokey tweet-reply-to">${RT_text}</p>`
		}
		stringToRet += `<p class="tweet-body">${JsonOHTML}</p>`

		if (Json.video) {
			if (Json.video.variants) {
				let vidVar_1 = Json.video.variants[1] // for `type: video/mp4`
				let vidVarsL = Json.video.variants.length
				if (vidVarsL == 1) {
					vidVar_1 = Json.video.variants[0]
				}
				let vidType
				Json.video.variants.forEach((variants) => {
					vidType = variants.type // will end up with last one
				})
				let vidVarLast = Json.video.variants[(vidVarsL - 1)] // for `type: gif`
				stringToRet += `<div class="ctr tweet-video-wrapper">`
				if (vidType == "video/gif") {
					stringToRet += `<video loop autoplay muted playsinline controlslist="nofullscreen" class="ctr tweet-media-img"><source src="${vidVarLast.src}" type=${vidVarLast.type}><p class="legal ctr">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p></video>`
				}
				if (vidType = "video/mp4") {
					stringToRet += `<video loop autoplay muted playsinline controls class="ctr tweet-media-img"><source src="${vidVarLast.src}" type=${vidVarLast.type}><p class="legal ctr">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p></video>`
				}
				stringToRet += `</div>`
			}
		}

		if (Json.card) {
			if (Json.card.binding_values) {
				if (Json.card.binding_values.photo_image_full_size_large) {
					stringToRet += `<a href="${Json.card.binding_values.card_url.string_value}" rel="noopener">
						<div class="card">
							<img src="${Json.card.binding_values.photo_image_full_size_large.image_value.url}" alt="${Json.card.binding_values.photo_image_full_size_large.image_value.alt}" loading="lazy" class="tweet-card-img" />
							<p>
								${Json.card.binding_values.vanity_url.string_value}<br />
								<span class="card-title">${Json.card.binding_values.title.string_value}</span><br />
								${Json.card.binding_values.description.string_value}
							</p>
						</div>
					</a>`
				}
			}
		}

		if (Json.card) {
			if (Json.card.binding_values) {
				if (Json.card.binding_values.player_image_small) {
					stringToRet += `<a href="${Json.card.binding_values.card_url.string_value}" rel="noopener">
						<div class="card tweet-player">
							<img src="${Json.card.binding_values.player_image_small.image_value.url}" alt="${Json.card.binding_values.title.string_value}" loading="lazy" />
							<p>
								${Json.card.binding_values.vanity_url.string_value}<br />
								<span class="card-title">${Json.card.binding_values.title.string_value}</span><br />
								${Json.card.binding_values.description.string_value}
							</p>
						</div>
					</a>`
				}
			}
		}

		let timeToFormat = Json.created_at
		let formattedTime = DateTime.fromISO(timeToFormat, { zone: "utc" }).toFormat("h:mm a • MMM d, yyyy")

		stringToRet += `<div class="tweet-footer">
			<a href="https://twitter.com/${Json.user.screen_name}/status/${Json.id_str}" rel="noopener">${formattedTime}</a>&nbsp;<span class="legal">(UTC)</span>
		</div>
	</blockquote>`

	return stringToRet
}
```

### v2 API version

The `stweetv2.js` shortcode uses Twitter's recommended v2 API, [although I **don't** recommend it](/posts/2022/08/static-tweets-twitters-v2-api-video). You can find the shortcode's most current repo version [here](https://github.com/brycewray/eleventy_site/blob/main/src/assets/utils/stweetv2.js). Invoke it in Markdown as in this example, where the parameter represents the tweet's numeric ID:

```md
{% stweetv2 "1563133769443610625" %}
```

Note that it assumes you have the [`eleventy-fetch`](https://github.com/11ty/eleventy-fetch), [`luxon`](https://github.com/moment/luxon), and [`dotenv`](https://github.com/motdotla/dotenv) packages installed in the project. The `dotenv` package allows you to keep your Twitter **bearer token** --- required for access of the v2 API --- in a *non*-public, *non*-committed `.env` file while still accessing the token during dev. (You may wish to review my post, "[Static tweets in Eleventy and Hugo: Part 2](/posts/2022/02/static-tweets-eleventy-hugo-part-2/)," for more concerning the Twitter bearer token and the v2 API, including the fact that you must set up the bearer token as an environment variable on your chosen hosting vendor.)

```js
const EleventyFetch = require("@11ty/eleventy-fetch")
const { DateTime } = require("luxon")
require('dotenv').config()

const BearerToken = process.env.BEARER_TOKEN

module.exports = async (TweetID) => {

	let stringToRet = ``

	const jsonURL1 = "https://api.twitter.com/2/tweets?ids="
	const jsonURL2 = "&expansions=author_id,attachments.media_keys&tweet.fields=created_at,text,attachments,entities,source&user.fields=name,username,profile_image_url&media.fields=preview_image_url,type,url,alt_text"

	async function getTweetV2(tweetURL) {
		const response = await EleventyFetch(tweetURL, {
			duration: "2w",
			type: "json",
			fetchOptions: {
				headers: {
					"Authorization": `Bearer ${BearerToken}`
				},
			}
		});
		return response
	}
	// Regarding the settings above,
	// consult the eleventy-fetch documentation
	// at https://www.11ty.dev/docs/plugins/fetch/

	const Json = await getTweetV2(jsonURL1 + TweetID + jsonURL2)
	const JsonData = Json.data[0]
	const JsonIncludes = Json.includes

	let text, created_at, profile_image_url, name, username = ''

	name = JsonIncludes.users[0].name
	username = JsonIncludes.users[0].username
	profile_image_url = JsonIncludes.users[0].profile_image_url
	created_at = JsonData.created_at

	text = JsonData.text

	if (JsonData.entities.urls) {
		JsonData.entities.urls.forEach((url) => {
			if (!url.images) {
				if (!url.unwound_url) {
					if (url.display_url.includes ("buff.ly")) {
						text = text.replace(
							url.url,
							`<a href=${url.url} rel="noopener">${url.display_url}</a>`
						)
					} else {
						text = text.replace(
							url.url,
							``
						)
					}
				} else {
					text = text.replace(
						url.url,
						`<a href=${url.url} rel="noopener">${url.display_url}</a>`
					)
				}
			} else {
				text = text.replace(
					url.url,
					`<a href=${url.url} rel="noopener">${url.display_url}</a>`)
			}
		})
	}

	if (JsonData.entities.mentions) {
		JsonData.entities.mentions.forEach((mention) => {
			text = text.replace(
				`@${mention.username}`,
				`<a rel="noopener" href="https://twitter.com/${mention.username}">@${mention.username}</a>`
			)
		})
	}

	if (JsonData.entities.hashtags) {
		JsonData.entities.hashtags.forEach((hashtag) => {
			text = text.replace(
				`#${hashtag.tag}`,
				`<a rel="noopener" href="https://twitter.com/hashtag/${hashtag.tag}?src=hash&ref_src=twsrc">#${hashtag.tag}</a>`
			)
		})
	}

	text = text.replace(/(?:\r\n|\r|\n)/g, '<br/>')

	let imageItems = ''

	if (JsonIncludes.media) {
		JsonIncludes.media.forEach((item) => {
			if (item.url) {
				imageItems = imageItems + `<div class="tweet-img-grid-1"><img class="tweet-media-img" loading="lazy" src=${item.url} alt="" /></div><br />`
			}
		})
	}

	stringToRet = `<blockquote class="tweet-card">
		<div class="tweet-header">
			<a class="tweet-profile" href="https://twitter.com/${username}" rel="noopener">
				<img src="${profile_image_url}" alt="Twitter avatar for ${username}" />
			</a>
			<div class="tweet-author">
				<a class="tweet-author-name" href="https://twitter.com/${username}" rel="noopener">${name}</a>
				<a class="tweet-author-handle" href="https://twitter.com/${username}" rel="noopener">@${username}</a>
			</div>
		</div>
		<p class="tweet-body">${text}</p>
		<span>${imageItems}</span>`

		let timeToFormat = created_at
		let formattedTime = DateTime.fromISO(timeToFormat, { zone: "utc" }).toFormat("h:mm a • MMM d, yyyy")

		stringToRet += `<div class="tweet-footer">
			<a href="https://twitter.com/${username}/status/${TweetID}" class="tweet-date" rel="noopener">${formattedTime}</a>&nbsp;<span class="legal">(UTC)</span>
		</div>
	</blockquote>`

	return stringToRet // end

}
```

## Static toots

Using the `stoot.js` shortcode in Markdown brings up the following:

{{< stoot "mastodon.technology" "108895889717986727" >}}

You can find this shortcode's most current repo version [here](https://github.com/brycewray/eleventy_site/blob/main/src/assets/utils/stoot.js). Invoke it in Markdown as in this example, where the first parameter represents the toot's Mastodon instance and the second represents the toot's numeric ID:

```md
{% stoot "mastodon.technology", "108895710962373705" %}
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
