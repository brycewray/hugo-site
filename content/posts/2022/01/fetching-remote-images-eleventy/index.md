---
title: "Fetching remote images with Eleventy"
description: "Following up on last month’s article about doing this in Hugo, we explain how to get there in a JavaScript-based SSG."
# non-breaking hyphen in `JavaScript-based`
author: Bryce Wray
date: 2022-01-25T14:45:00-06:00
#initTextEditor: Ulysses
---

**Update, 2022-01-26**: Please see the end of this post for additional info straight from the horse’s mouth, so to speak.
{.box}

A few weeks ago, I [described](/posts/2021/12/fetching-remote-stuff-hugo-0-90-plus/) how a [recent change](https://github.com/gohugoio/hugo/releases/tag/v0.90.0) to the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG) gives it the ability to fetch remote content for processing during the site-building process. In my case, I used it in the Hugo-based version of this site’s repository to grab tiny, low-resolution images from my free [Cloudinary](https://cloudinary.com) account and turn them into [Base64](https://en.wikipedia.org/wiki/Base64)-encoded [low-quality image placeholders](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders) (LQIPs).

Well, this short follow-up shows how to do the same thing in the [Eleventy](https://11ty.dev) SSG. The capability isn’t built into Eleventy, but a little code will make up for that. As I noted in my [Eleventy-*vs.*-Hugo comparison](/posts/2020/12/eleventy-hugo-comparing-contrasting/) slightly over a year ago:

> .&nbsp;.&nbsp;. the same characteristic that makes Eleventy very much not an out-of-the-box solution — its being essentially a collection of [npm](https://npmjs.com) JavaScript packages — also makes it much easier to adapt so it’ll suit your wishes and needs.

As in the Hugo example, we’ll do this in Eleventy by using a [shortcode](https://www.11ty.dev/docs/shortcodes/) that we can reference in the site’s [Markdown](https://daringfireball.net/projects/markdown) content. Please note that, to work with what we’re describing here, this Eleventy shortcode must be **[asynchronous](https://developer.mozilla.org/en-US/docs/Glossary/Asynchronous)** — which, in turn, requires the shortcode to be in [Nunjucks](https://www.11ty.dev/docs/languages/nunjucks/#asynchronous-shortcodes), [Liquid](https://www.11ty.dev/docs/languages/liquid/#asynchronous-shortcodes), or [`.11ty.js` JavaScript](https://www.11ty.dev/docs/languages/javascript/#asynchronous-javascript-template-functions) templating. You see, at least as of the initial publication of this post, those are the only three of Eleventy’s multiple [templating languages](https://www.11ty.dev/docs/languages/) that support async shortcodes.

But **why** does the shortcode have to be async in the first place? That’s because it uses the [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)-based [axios HTTP client](https://axios-http.com/) to fetch the desired content. So, if you don’t already have axios installed in your Eleventy project, take care of that first:

```js
npm install axios --save-dev
```

(This installs it as a [development dependency](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file), which is how I prefer to do it. However, if you don’t want to be that picky, it’s perfectly fine to install it as only a regular production dependency with `npm install axios --save-prod`. Eleventy won’t care.)

Then, in the shortcode, you have to `require` axios:

```js
const axios = require('axios')
```

After that, we can do this within the shortcode’s `module.exports` section:

```js
	async function getBase64(urlFor64) {
		const response = await axios
			.get(urlFor64, {
				responseType: 'arraybuffer'
			})
		return Buffer.from(response.data, 'binary').toString('base64')
	}

	// Then, earlier, we've defined the appropriate
	// LQIP's URL as `urlToGet`, so...

	let LQIP_b64 = await getBase64(urlToGet)
```

That last statement assigns to `LQIP_b64` the Base64 representation of the LQIP, whose URL is supplied by `urlToGet`. Now we can use the `LQIP_b64` variable within the CSS for the main image’s background `div`, as shown in this excerpt from the [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) which gets exported to any page that invokes the shortcode:

```css
background: url(data:image/jpeg;base64,${LQIP_b64});
```

And there you have it. Using your browser’s Inspector tool on nearly[^1] any image shown within the site will reveal the resulting HTML and CSS, letting you see What The Shortcode Hath Wrought — which, now, will be true regardless of whether the site is on Eleventy or Hugo at the time.

**Acknowledgment**: I am especially grateful to two specific sources for making this post possible: an extraordinarily helpful [conversation](https://discord.com/channels/741017160297611315/934524410591838249/) I had a few days ago with “Aankhen” in the Eleventy Discord community; and, to a lesser extent, a Stack Overflow-based [answer](https://stackoverflow.com/questions/41846669/download-an-image-using-axios-and-convert-it-to-base64) from several years ago. As I told “Aankhen”: “Async and all that are pretty much Greek to me, no matter how much I read others’ articles about that stuff.”
{.box}

[^1]:	The lone exception — *i.e.*, the only image on the site which doesn’t use this shortcode when the site is running on Eleventy — is the “My pet cat” image sample near the bottom of my post, “[Using Eleventy’s official image plugin](/posts/2021/04/using-eleventys-official-image-plugin/).” As that post’s title implies, in such cases this particular image uses a different shortcode that’s based on the [Eleventy Image](https://www.11ty.dev/docs/plugins/image/) plugin.

---

### And there’s more (2022-01-26)

The official Eleventy Twitter account graciously retweeted my announcement of this post and added the following, which I pass along for your further edification:

{{< stweet user="eleven_ty" id="1486347755404640257" >}}
