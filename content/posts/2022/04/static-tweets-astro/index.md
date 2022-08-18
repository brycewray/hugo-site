---
title: "Static tweets in Astro"
description: "A component which properly embeds tweets when you’re using today’s hottest SSG."
author: Bryce Wray
date: 2022-04-06T20:18:00-05:00
lastmod: 2022-08-18T09:12:00-05:00
#initTextEditor: iA Writer
discussionId: "2022-04-static-tweets-astro"
---

**Update, 2022‑04‑12**: The [Astro](https://astro.build) team has come up with an [`astro-embed` project](https://github.com/astro-community/astro-embed) which will accomplish everything described herein and much more, so I encourage you to use it rather than the component described herein. That said, perhaps this post will still be of some educational value, especially for those new to Astro.
{.yellowBox}

**Update from the future in general (!)**: Any displayed tweets in this or other posts obviously will be rendered by the most current code available when the site is on Hugo, so that code and what is shown below for Astro aren't necessarily related.\
\
Please use the [site search page](/search/) to find related posts.
{.yellowBox}

Perhaps you saw one or both of my [earlier](/posts/2022/02/static-tweets-eleventy-hugo/) [posts](/posts/2022/02/static-tweets-eleventy-hugo-part-2/) about how to embed fully static (thus, **not** privacy-violating) tweets in the [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io) static site generators (SSGs). If not, you may want to read at least the [first one](/posts/2022/02/static-tweets-eleventy-hugo/) for background because, in this post, I offer a similar --- albeit briefer --- piece about how to do this with the **[Astro](https://astro.build)** SSG.

At least for now, Astro seems to be the darling of a considerable portion of the web development world. Better yet for my purposes and yours: after months of alpha-level breaking changes out the wazoo, it's now stabilized considerably. In fact, a few days ago, the Astro team [announced](https://astro.build/blog/astro-1-beta-release/) the first beta release of v.1.0.

As was true for my [recent](/posts/2022/02/static-tweets-eleventy-hugo-part-2/) Hugo [shortcode](https://gohugo.io/content-management/shortcodes/) for this purpose, the Astro **[component](https://docs.astro.build/en/core-concepts/astro-components/)** which follows is fully compliant with v.2 of the [Twitter API](https://developer.twitter.com/en/docs/twitter-api), the version toward which Twitter is trying hard to drive developers.

## The preliminaries

### Install `date-fns`

First, you'll need to **install the [`date-fns` package](https://date-fns.org/)**, so we can properly format the `created_at` date we'll get from the Twitter API for each tweet this component will render:

```bash
npm i -D date-fns
```

### Use a Bearer Token

As was true with the v.2-compliant Hugo shortcode from that [earlier post](/posts/2022/02/static-tweets-eleventy-hugo-part-2/), you'll need a Twitter-assigned [**Bearer Token**](https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens), which you'll then set within an [environment variable](https://docs.astro.build/en/guides/environment-variables/) with `PUBLIC_` at the beginning of its name.[^Public]

[^Public]: Based on what I've read in recent weeks, I think the requirement to start the environment variable's name with `PUBLIC_` is related to the interaction between Astro and the [Vite](https://vitejs.dev) package it uses for server operations in both development and production.

- For development, store it as `PUBLIC_BEARER_TOKEN` in your Astro project's top-level `.env` file (suitably [Git-ignored](https://git-scm.com/docs/gitignore), of course).
- For production and deployment, store it as `PUBLIC_BEARER_TOKEN` within your chosen host's environment variables, however that's done there.[^hosts]

[^hosts]: To repeat what I said in the two previous posts about this subject: ".&nbsp; .&nbsp; . you’ll have to supply .&nbsp; .&nbsp;. [the credentials] to your site host, so it can access them during each build (*e.g.*, here are instructions for [Netlify](https://docs.netlify.com/configure-builds/environment-variables/), [Vercel](https://vercel.com/docs/concepts/projects/environment-variables), and [Cloudflare Pages](https://developers.cloudflare.com/pages/platform/build-configuration#environment-variables))."

## Build the component

Now, you can **create the component** in, of course, your Astro project's top-level `src/components/` folder (unless you've otherwise [configured](https://docs.astro.build/en/reference/configuration-reference/) the site structure).

The following is my `STweetV2.astro`[^Astro] component, based on the logic and styling of my [previously posted](/posts/2022/02/static-tweets-eleventy-hugo-part-2/#the-stweetv2-shortcode) Hugo shortcode for interacting with v.2 of the Twitter API:

[^Astro]: As of this writing, this site's syntax highlighting doesn't "know" what an `.astro` file is, so I'm improvising by telling the highlighter it's JavaScript. That's partly true, since the top part *is* JS, but the bottom part is a mixture of JS and HTML.

**Note**: When I wrote this, a [bug](https://github.com/withastro/compiler/issues/354) caused Astro to crash if an `import` statement was anywhere other than the top of the file, so that's why I don't have the comments at the top as might otherwise seem logical.
{.yellowBox}

```js
---
import { format } from "date-fns"

/*
	=======
	Based on...
	- https://github.com/hugomd/blog/blob/6ad96b24117255c2a9912c566ffd081bd9bbd6f1/layouts/shortcodes/statictweet.html
	- https://hugo.md/post/update-rendering-static-tweets/
	- https://github.com/KyleMit/eleventy-plugin-embed-tweet
	- https://github.com/rebelchris/astro-static-tweet/blob/master/StaticTweet.astro
	=======
*/

const { TweetID } = Astro.props

const BearerToken = import.meta.env.PUBLIC_BEARER_TOKEN
const jsonURL1 = "https://api.twitter.com/2/tweets?ids="
const jsonURL2 = "&expansions=author_id,attachments.media_keys&tweet.fields=created_at,text,attachments,entities,source&user.fields=name,username,profile_image_url&media.fields=preview_image_url,type,url,alt_text"

const response = await fetch(jsonURL1 + TweetID + jsonURL2, {
	method: "get",
	headers: {
		"Authorization": `Bearer ${BearerToken}`
	}
})
const Json = await response.json()
const JsonData = Json.data[0]
const JsonIncludes = Json.includes

let text = ''; let created_at = ''; let profile_image_url = ''; let name = ''; let username = ''

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
						`<a href=${url.url} rel="noreferrer noopener">${url.display_url}</a>`
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
					`<a href=${url.url} rel="noreferrer noopener">${url.display_url}</a>`
				)
			}
		} else {
			text = text.replace(
				url.url,
				`<a href=${url.url} rel="noreferrer noopener">${url.display_url}</a>`)
		}
	})
}

if (JsonData.entities.mentions) {
	JsonData.entities.mentions.forEach((mention) => {
		text = text.replace(
			`@${mention.username}`,
			`<a rel="noreferrer noopener" href="https://twitter.com/${mention.username}">@${mention.username}</a>`
		)
	})
}

if (JsonData.entities.hashtags) {
	JsonData.entities.hashtags.forEach((hashtag) => {
		text = text.replace(
			`#${hashtag.tag}`,
			`<a rel="noreferrer noopener" href="https://twitter.com/hashtag/${hashtag.tag}?src=hash&ref_src=twsrc">#${hashtag.tag}</a>`
		)
	})
}

text = text.replace(/(?:\r\n|\r|\n)/g, '<br/>')

let imageItems = ''

if (JsonIncludes.media) {
	JsonIncludes.media.forEach((item) => {
		if (item.url) {
			imageItems = imageItems + `<img class="tweet-img" src=${item.url} alt="" /><br />`
		}
	})
}

---

<blockquote class="tweet-card">
	<div class="tweet-header">
		<a class="tweet-profile" href=`https://twitter.com/${username}` rel="noreferrer noopener">
			<img src={profile_image_url} alt=`Twitter avatar for ${username}` />
		</a>
		<div class="tweet-author">
			<a class="tweet-author-name" href=`https://twitter.com/${username}` rel="noreferrer noopener">{name}</a>
			<a class="tweet-author-handle" href=`https://twitter.com/${username}` rel="noreferrer noopener">@{username}</a>
		</div>
	</div>
	<p class="tweet-body" set:html={text} />
	<span set:html={imageItems} />
	<div class="tweet-footer">
		<a href=`https://twitter.com/${username}/status/${TweetID}` class="tweet-date" rel="noreferrer noopener">{format(new Date(created_at), "MMMM d, yyyy • h:mm aa")}</a>&nbsp;<span class="legal">(UTC)</span>
	</div>
</blockquote>
```

## Call the component

### Tip: use aliases

Make things easier on yourself --- *i.e.*, avoiding a lot of relative file references --- by **using Astro's [aliases](https://docs.astro.build/en/guides/aliases/) feature**. In your project's appropriate file (`jsconfig.json` or, if you're using [TypeScript](https://www.typescriptlang.org/), `tsconfig.json`), have at least the following:

```json
{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@components/*": ["src/components/*"]
		}
	}
}
```

From here on, we can refer to a component's location as simply `@components` (*i.e.*, without having to figure out how many `../` parts to add to `components` for the *relative* reference which otherwise would be necessary).

Another nice thing about using Astro aliases is that most Astro-savvy code editors, such as Visual Studio Code when it's running the [Astro support extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode), automatically "know" about the aliases once you set them.

### Calling from an `.astro` file

To **use the component in an `.astro` file**, put this in the top of the file's [Component Script part](https://docs.astro.build/en/core-concepts/astro-components/#component-overview):

```js
---
import STweetV2 from '@components/STweetV2.astro'
```

.&nbsp;.&nbsp;. and call it within the file as follows, supplying the [tweet's ID](https://developer.twitter.com/en/docs/twitter-ids) as the value of `TweetID`:

```js
<STweetV2 TweetID="1487140202141425673" />
```

.&nbsp; .&nbsp;. which gives you (with appropriate CSS[^Inspector]):

[^Inspector]: Use your browser's Inspector tool on the displayed tweet to see how I styled it. Of course, you should feel free to handle styling as you see fit.

{{< stweet user="BryceWrayTX" id="1487140202141425673" >}}

As was true for my Hugo `stweetv2` shortcode, I wrote this component to add "(UTC)" after the date because, once you use this in production, the remote web server will return the tweet's `created_at` information in whatever time zone the server uses --- which almost certainly is [UTC](https://www.timeanddate.com/time/aboututc.html).

### Calling from Markdown

To **use the component in a [Markdown](https://daringfireball.net/projects/markdown) file** in Astro, you'd simply put this in the top of the [front matter](https://docs.astro.build/en/guides/markdown-content/):

```js
---
setup: |
	import STweetV2 from '@components/STweetV2.astro'
```

.&nbsp;.&nbsp;. along with [any other such items](https://docs.astro.build/en/guides/markdown-content/#using-components-in-markdown) that belong in the `setup` object, of course.

Finally, down in the Markdown itself, call the imported component the same way as we described above for its use in the `.astro` file:

```md
<STweetV2 TweetID="1487140202141425673" />
```
**Update, 2022-07-26**: Astro has since moved to using [MDX](https://mdxjs.com/), rather than Markdown, for including components in one's markup. Be sure to check the [most current Astro documentation](https://docs.astro.build) for full details.
{.yellowBox}

## An escapee from the lab?

As I [noted](/posts/2022/03/simplify-simplify-again/#a-line-in-the-shifting-sands) recently, I'm now once again actively experimenting with Astro, having [let it be for a while](/posts/2021/09/gems-in-rough-09/#passtro-on-astro-for-now) when it was a tad too skittish for my limited skill set. The component I've provided in this post is one example of that experimentation.

If you're building a site with Astro, perhaps this component can be at least a starting point toward your embedding tweets without endangering your visitors' privacy.
