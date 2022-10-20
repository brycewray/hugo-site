---
title: "Static Mastodon toots in Astro"
description: "Got an Astro site and want to embed completely static versions of posts from the Fediverse? Check out this component."
author: Bryce Wray
tags: [web-development, static-site-generators, ssg, social-media, mastodon, astro, hugo, eleventy, javascript, css, sass-scss, online-privacy]
date: 2022-08-29T14:36:00-05:00
#initTextEditor: iA Writer
---

While experimenting with various static site generators (SSGs), I've created an [Astro](https://astro.build) component for embedding static "toots" from [Mastodon](https://joinmastodon.org), similar to code I've offered here for [Hugo](https://gohugo.io) and [Eleventy](https://11ty.dev). I offer the `SToot.astro` component here in somewhat edited form, with its original version available in [a repo](https://github.com/brycewray/astro-site/blob/main/src/components/SToot.astro). As was the case with the [earlier](/posts/2022/06/static-mastodon-toots-hugo/) [incarnations](/posts/2022/08/static-embeds-eleventy/), you'll specify the toot's Mastodon instance and numeric ID:

```js
<SToot
	instance="fosstodon.org"
	id="108896692414393920"
/>
```

. . . to get:

{{< stoot "fosstodon.org" "108896692414393920" >}}

Note that `SToot.astro` assumes you have the [`date-fns`](https://github.com/date-fns/date-fns) and [`md5`](https://github.com/pvorb/node-md5) packages installed in the project. (By the way: in my original version of the component, I used [this styling](https://github.com/brycewray/astro-site/blob/main/src/styles/Twitter.scss).)

**Suggestion**: You may want to read my [earlier post about the Hugo static-toots-embedding code](/posts/2022/06/static-mastodon-toots-hugo/), particularly regarding certain limitations which result from how Mastodon itself works.
{.yellowBox}

```js
---
import { format } from "date-fns";
import md5 from "md5";

export interface Props {
	instance: string;
	id: string;
}

const { instance, id } = Astro.props as Props;

let tootLink, handleInst, mediaMD5, urlToGet, mediaStuff, videoStuff, gifvStuff, pollStuff = '';
let imageCount, votesCount = 0;

urlToGet = `https://` + instance + `/api/v1/statuses/` + id;

async function GetToot(tootURL) {
	const response = await fetch(tootURL, {
		method: "get"
	});
	return response.json()
}

let Json = await GetToot(urlToGet);

if (Json.account) {
	tootLink = `https://` + instance + `@` + Json.account.acct + `/status/` + id;
	handleInst = `@` + Json.account.acct + `@` + instance;
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
			mediaStuff = mediaStuff + `<div class="tweet-img-grid-${imageCount}"><style>.img-${mediaMD5} {aspect-ratio: ${Json.media_attachments[0].meta.original.width} / ${Json.media_attachments[0].meta.original.height}}</style>`;
			mediaStuff = mediaStuff + `<img src="${Json.media_attachments[0].url}" alt="Image ${Json.media_attachments[0].id} from toot ${id} on ${instance}" class="tweet-media-img img-${mediaMD5}`;
			if (Json.sensitive) {
				mediaStuff = mediaStuff + ` tweet-sens-blur`;
			}
			mediaStuff = mediaStuff + `" loading="lazy"`;
			if (Json.sensitive) {
				mediaStuff = mediaStuff + ` onclick="this.classList.toggle('tweet-sens-blur-no')"`;
			}
			mediaStuff = mediaStuff + `/>`;
			if (Json.sensitive) {
				mediaStuff = mediaStuff + `<div class="blur-text">Sensitive content<br />(flagged&nbsp;at&nbsp;origin)</div>`;
			}
			mediaStuff = mediaStuff + `</div>`;
		}
		if (Json.media_attachments[0].type == "video") {
			videoStuff = ``;
			videoStuff = videoStuff + `<style>.img-${mediaMD5} {aspect-ratio: ${Json.media_attachments[0].meta.original.width} / ${Json.media_attachments[0].meta.original.height}}</style>`;
			videoStuff = videoStuff + `<div class="ctr tweet-video-wrapper"><video muted playsinline controls class="ctr tweet-media-img img-${mediaMD5}`;
			if (Json.sensitive) {
				videoStuff = videoStuff + ` tweet-sens-blur`;
			}
			videoStuff = videoStuff + `"`;
			if (Json.sensitive) {
				videoStuff = videoStuff + ` onclick="this.classList.toggle('tweet-sens-blur-no')"`;
			}
			videoStuff = videoStuff + `><source src="${Json.media_attachments[0].url}"><p class="legal ctr">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p></video>`;
			if (Json.sensitive) {
				videoStuff = videoStuff + `<div class="blur-text">Sensitive content<br />(flagged&nbsp;at&nbsp;origin)</div>`;
			}
			videoStuff = videoStuff + `</div>`
		}
		if (Json.media_attachments[0].type == "gifv") {
			gifvStuff = ``;
			gifvStuff = gifvStuff + `<style>.img-${mediaMD5} {aspect-ratio: ${Json.media_attachments[0].meta.original.width} / ${Json.media_attachments[0].meta.original.height}}</style>`;
			gifvStuff = gifvStuff + `<div class="ctr tweet-video-wrapper"><video loop autoplay muted playsinline controls controlslist="nofullscreen" class="ctr tweet-media-img img-${mediaMD5}`;
			if (Json.sensitive) {
				gifvStuff = gifvStuff + ` tweet-sens-blur`;
			}
			gifvStuff = gifvStuff + `"`;
			if (Json.sensitive) {
				gifvStuff = gifvStuff + ` onclick="this.classList.toggle('tweet-sens-blur-no')"`;
			}
			gifvStuff = gifvStuff + `><source src="${Json.media_attachments[0].url}"><p class="legal ctr">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p></video>`;
			if (Json.sensitive) {
				gifvStuff = gifvStuff + `<div class="blur-text">Sensitive content<br />(flagged&nbsp;at&nbsp;origin)</div>`;
			}
			gifvStuff = gifvStuff + `</div>`
		}
	})

if (Json.poll !== null) {
	votesCount = Json.poll.votes_count;
	let pollIterator = 0;
	pollStuff = ``;
	pollStuff = pollStuff + `<div class="tweet-poll-wrapper">`;
	Json.poll.options.forEach(( options ) => {
		pollStuff = pollStuff + `<div class="tweet-poll-count"><strong>${((Json.poll.options[pollIterator].votes_count)/(votesCount)).toLocaleString("en", {style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1})}</strong></div><div class="tweet-poll-meter"><meter id="vote-count" max="${votesCount}" value=${Json.poll.options[pollIterator].votes_count}></meter></div><div class="tweet-poll-title">${Json.poll.options[pollIterator].title}</div>`;
		pollIterator = ++pollIterator;
	})
	pollStuff = pollStuff + `</div><p class="legal tweet-poll-total">${votesCount} votes</p>`;
}

---

{Json.content &&
	<blockquote class="tweet-card" cite={tootLink}>
		<div class="tweet-header">
			<a class="tweet-profile twitterExt" href=`https://${instance}/@${Json.account.acct}` rel="noopener">
				<img
					src={Json.account.avatar}
					alt=`Mastodon avatar for ${handleInst}`
					loading="lazy"
				/>
			</a>
			<div class="tweet-author">
				<a class="tweet-author-name twitterExt" href=`https://${instance}/@${Json.account.acct}` rel="noopener">{Json.account.display_name}</a>
				<a class="tweet-author-handle twitterExt" href=`https://${instance}/@${Json.account.acct}` rel="noopener">{handleInst}</a>
			</div>
		</div>
		<p class="tweet-body" set:html={Json.content}></p>

		{mediaStuff !== "" &&
			<div set:html={mediaStuff}></div>
		}
		{videoStuff !== "" &&
			<div set:html={videoStuff}></div>
		}
		{gifvStuff !== "" &&
			<div set:html={gifvStuff}></div>
		}
		{pollStuff !== "" &&
			<div set:html={pollStuff}></div>
		}
		<div class="tweet-footer">
			<a href=`https://${instance}/@${Json.account.acct}/${Json.id}` class="tweet-date twitterExt" rel="noopener">{format(new Date(Json.created_at), "MMMM d, yyyy • h:mm aa")}</a>&nbsp;<span class="legal">(UTC)</span>
		</div>
	</blockquote>
}
```
