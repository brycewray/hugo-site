---
title: "Take a load off"
description: "Repeated grabs from remote APIs can stress some SSGs (and CPUs), so here’s a simple way to avoid that during development."
author: Bryce Wray
date: 2022-09-04T09:37:00-05:00
#draft: true
#initTextEditor: iA Writer
---

It turns out that making one's static site generator (SSG) go out and grab data from remote APIs can tend to bog down things during development, especially in JavaScript-based SSGs. After all, each time you save a file, the SSG's dev server will probably repeat *every* such access from the API(s) in question. As I've discovered in my own testing, this even can result in call stack errors from which some SSGs may not recover without restarting.

So how can you take this load off your SSG --- and, not incidentally, your computer's CPU --- in development?

Fortunately, the fix is a breeze. All you have to do is wrap the API-accessing code within a test for your current **environment** (assuming you're using [Node.js](https://nodejs.org), as is likely with a JS-based SSG). If your environment is `production`, you let the code grab from APIs as usual, since this is what you want for an actual site build on your hosting vendor. But, in `development`, you can completely **bypass** the API-accessing code and supply a substitute message.

Here's a simplified example of how you could do it in the [Eleventy](https://11ty.dev) SSG:

```js
const EleventyFetch = require("@11ty/eleventy-fetch")
const environment = process.env.NODE_ENV

module.exports = async (user, id) => {
	let stringToReturn = ``
	if (environment === "production") {
		/*
			get data from the API(s)
			and put the results in
			the `stringToReturn` var 
		*/
	} else {
		stringToReturn = `<blockquote><p>API result will appear here in production.</p></blockquote>`
	}
	return stringToReturn
}
```

Your immediate response to this may be: "Okay, fine --- but, now, when I *want* to see the API results in development, what do I do?"

The answer is that it depends. For example, in [Astro](https://astro.build), you can use its [`preview` command](https://docs.astro.build/en/reference/cli-reference/#astro-preview) (*e.g.*, `astro preview`). However, a less SSG-specific possibility could be to add a little scripting to your project's `package.json`. Here's a bare-bones example, again for Eleventy, which assumes use of the [`npm-run-all` package](https://github.com/mysticatea/npm-run-all) to run multiple scripts in one command. I'm leaving the `styling` scripts to your imagination, since CSS-handling will vary from site to site.

```json
  "scripts": {
    "start": "NODE_ENV=development npm-run-all --parallel dev:*",
    "dev:eleventy": "ELEVENTY_ENV=development npx @11ty/eleventy --serve",
    "dev:styling": "",
    "build": "NODE_ENV=production npm-run-all prod:*",
    "prod:eleventy": "ELEVENTY_ENV=development npx @11ty/eleventy  --output=./site",
    "prod:styling": "",
    "testbuild": "NODE_ENV=production npm-run-all --parallel testProd:*",
    "testProd:eleventy": "ELEVENTY_ENV=production npx @11ty/eleventy --output=./site --serve",
    "testProd:styling": ""
  }
```

. . . so entering `npm run testbuild` would let you develop while in a production environment --- and, thus, see the results of the APIs you're accessing. When you're done checking for those results, simply restart the dev server and use `npm run start` to return to a much leaner dev mode. Your SSG and CPU will thank you for it.