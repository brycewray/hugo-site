---
title: "A truly fetching utility for Eleventy"
description: "While trying to make things work equally well in multiple repos, I discover the value of an Eleventy plugin I’d previously ignored."
author: Bryce Wray
tags: [web-development, static-site-generators, ssg, eleventy, node-js, javascript, website-performance]
date: 2022-09-01T13:20:00-05:00
#draft: true
#initTextEditor: iA Writer
---

In my continuing tests of multiple static site generators (SSGs), I've tried to port useful code among these tools. This has been at least partly for my own amusement and satiation of curiosity, but also so I could write here about what happened --- as in [four](/posts/2022/08/static-tweets-astro-two-sources-edition/) [recent](/posts/2022/08/static-embeds-eleventy/) [examples](/posts/2022/08/using-cloudinary-astro-eleventy/) [thereof](/posts/2022/08/static-mastodon-toots-astro/), in which I offered code samples that I hoped some of you may find useful.

In the process, I discovered something worth passing along to fans of the [Eleventy](https://11ty.dev) SSG: the [**`eleventy-fetch`** utility](https://github.com/11ty/eleventy-fetch) is outstanding for when you need to pull down data from remote APIs. It's easy to use in place of [`node-fetch`](https://github.com/node-fetch/node-fetch) and even [`axios`](https://github.com/axios/axios) (substitution examples below), and offers one special advantage over both of those better-known alternatives: its built-in caching powers, which keep you from having to call those APIs *every single time you build* in dev mode.[^prod] As you can well imagine, this makes dev mode work *much* more snappily, especially when you're juggling many pages that make API calls.

[^prod]: The documentation for `eleventy-fetch` strongly urges one to avoid version-controlling the `.cache` folder, so as to avoid any potential privacy violations, but also advises how (in case this admonition is ignored) to use it in production, too.

In fact, I now like this package so much that I went back to those earlier posts today and updated their Eleventy-specific code blocks so they use `eleventy-fetch`, instead.

Here are two examples of the old code vs. that with `eleventy-fetch`. In each case, the `duration` [parameter](https://www.11ty.dev/docs/plugins/fetch/#options) refers to how long Eleventy will keep the fetched item (data, image, text, whatever) in the project cache before re-fetching it. Here, I've specified `2w`, for two weeks.

```js
/* ==============================
	with axios
============================== */
  async function getBase64(urlFor64) {
    const response = await axios
      .get(urlFor64, {
        responseType: 'arraybuffer'
      })
    return Buffer.from(response.data, 'binary').toString('base64')
  }

/* ==============================
	with eleventy-fetch
============================== */
  async function getBase64(urlFor64) {
    const imageBuffer = await EleventyFetch(urlFor64, {
			duration: "2w",
			type: "buffer"
		})
    return Buffer.from(imageBuffer, 'binary').toString('base64')
  }
```

<br />

```js
/* ==============================
	with node-fetch
============================== */
	async function getTweet(tweetURL) {
		const response = await fetch(tweetURL, {
			method: "get"
		});
		return response.json()
	}

/* ==============================
	with eleventy-fetch
============================== */
	async function getTweet(tweetURL) {
		const response = await EleventyFetch(tweetURL, {
			duration: "2w",
			type: "json"
		});
		return response
	}
```

So, if you're an Eleventy aficionado and haven't yet given `eleventy-fetch` a try for your work with remote data, I heartily encourage you to do something about that today. While I concede there may be situations where more specialized data-grabbing tools would serve you better, I think it excels for general use, and --- especially as your site's use of remote APIs increases --- `eleventy-fetch`'s caching abilities will make your dev-mode endeavors much smoother.
