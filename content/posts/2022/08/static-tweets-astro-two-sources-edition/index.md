---
title: "Static tweets in Astro: the two sources edition"
description: "After I learned that it takes two separate Twitter APIs to produce decent static embeds of tweets, I knew that meant more code changes."
author: Bryce Wray
date: 2022-08-26T16:14:00-05:00
#initTextEditor: iA Writer
---

Thought I'd update that [Astro](https://astro.build) component I provided [a few months back](/posts/2022/04/static-tweets-astro/), given my [recent realization](/posts/2022/08/static-tweets-hugo-tale-two-sources/) that one must access **two** Twitter APIs to get a proper result. So, below, is an edited version of `STweet.astro`'s latest incarnation (the [most current form thereof](https://github.com/brycewray/astro-site/blob/main/src/components/STweet.astro) also includes certain `replace()` operations related to specific tweets I've embedded). As was the case with the [Hugo](https://gohugo.io) `stweet` two-API shortcode I [previously described](/posts/2022/08/static-tweets-hugo-tale-two-sources/), it's necessary to specify both the tweet's `user`  (*e.g.*, `BryceWrayTX` for me) and `id` number, as follows:

```md
<STweet user="BryceWrayTX" id="1487140202141425673" />
```

. . . to get:

{{< stweet user="BryceWrayTX" id="1487140202141425673" >}}

Note also:

- I've used the [`date-fns` package](https://github.com/date-fns/date-fns) for formatting the tweet's date so, if you don't have that in your project, you'll need to install it.
- I've imported [some SCSS](https://github.com/brycewray/astro-site/blob/main/src/styles/Twitter.scss) to format the tweet itself. I've tried adding the SCSS in the component, as per the Astro norm, but that doesn't seem to work as reliably for all classes --- perhaps due to some [specificity issues](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity).


```js
---
import { format } from "date-fns";
import '@styles/Twitter.scss';

export interface Props {
	user: string;
	id: string;
}

let RT_text = '';

const { user, id } = Astro.props as Props;

const urlOembed = `https://twitter.com/${user}/status/${id}`;
const query = `url=${urlOembed}&dnt=true&omit_script=true`;
const requestUrlO = `https://publish.twitter.com/oembed?` + query;
const urlSynd = `https://cdn.syndication.twimg.com/tweet?id=${id}`

async function getTweet(tweetURL) {
	const response = await fetch(tweetURL, {
		method: "get"
	});
	return response.json()
}

let Json = await getTweet(urlSynd);
let Text = Json.text;

let JsonOembed = await getTweet(requestUrlO);
let JsonOHTML = JsonOembed.html;

if (Json.in_reply_to_screen_name) {
	RT_text = `Replying to <a href="https://twitter.com/${Json.in_reply_to_screen_name}">@${Json.in_reply_to_screen_name}</a>`;
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

JsonOHTML = JsonOHTML.replace (
	`</blockquote>`,
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
let tweetDate = format(new Date(Json.created_at), "MMMM d, yyyy • h:mm aa")

---

<blockquote class="tweet-card" cite={tweetLink}>
	<div class="tweet-header">
		<a class="tweet-profile twitterExt" href=`https://twitter.com/${Json.user.screen_name}` rel="noopener">
			<img src={Json.user.profile_image_url_https} alt=`Twitter avatar for ${Json.user.screen_name}` loading="lazy" />
		</a>
		<div class="tweet-author">
			<a class="tweet-author-name twitterExt" href=`https://twitter.com/${Json.user.screen_name}` rel="noopener">{Json.user.name}</a>
			<a class="tweet-author-handle twitterExt" href=`https://twitter.com/${Json.user.screen_name}` rel="noopener">@{Json.user.screen_name}</a>
		</div>
	</div>
	{RT_text &&
		<p class="pokey tweet-reply-to" set:html={RT_text}></p>
	}
	<p class="tweet-body" set:html={JsonOHTML}></p>

	{Json.video &&
		Json.video.variants &&
			<div class="ctr tweet-video-wrapper">
				{Json.video.variants[Json.video.variants.length-1].type == "video/gif" &&
					<video loop autoplay muted playsinline controlslist="nofullscreen" class="ctr tweet-media-img"><source src={Json.video.variants[Json.video.variants.length-1].src} type={Json.video.variants[Json.video.variants.length-1].type}><p class="legal ctr">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p></video>
				}
				{Json.video.variants[Json.video.variants.length-1].type == "video/mp4" &&
					<video loop autoplay muted playsinline controls class="ctr tweet-media-img"><source src={Json.video.variants[Json.video.variants.length-1].src} type={Json.video.variants[Json.video.variants.length-1].type}><p class="legal ctr">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p></video>
				}
			</div>
	}
	{Json.card &&
		Json.card.binding_values &&
			Json.card.binding_values.photo_image_full_size_large &&
				<a href={Json.card.binding_values.card_url.string_value} rel="noopener">
					<div class="card">
						<img src={Json.card.binding_values.photo_image_full_size_large.image_value.url} alt={Json.card.binding_values.photo_image_full_size_large.image_value.alt} loading="lazy" class="tweet-card-img">
						<p>
							{Json.card.binding_values.vanity_url.string_value}<br />
							<span class="card-title">{Json.card.binding_values.title.string_value}</span><br />
							{Json.card.binding_values.description.string_value}
						</p>
					</div>
				</a>
	}
	{Json.card &&
		Json.card.binding_values &&
			Json.card.binding_values.player_image_small &&
				<a href={Json.card.binding_values.card_url.string_value} rel="noopener">
					<div class="card tweet-player">
						<img src={Json.card.binding_values.player_image_small.image_value.url} alt={Json.card.binding_values.title.string_value} loading="lazy">
						<p>
							{Json.card.binding_values.vanity_url.string_value}<br />
							<span class="card-title">{Json.card.binding_values.title.string_value}</span><br />
							{Json.card.binding_values.description.string_value}
						</p>
					</div>
				</a>
	}
	<div class="tweet-footer">
		<a href={tweetLink} rel="noopener">{tweetDate}</a>&nbsp;<span class="legal">(UTC)</span>
	</div>
</blockquote>
```
