---
title: "Using Cloudinary with Astro and Eleventy"
description: "If Cloudinary’s free tier will serve your website’s needs, my code can make it easier to use."
author: Bryce Wray
date: 2022-08-27T16:01:00-05:00
#initTextEditor: iA Writer
---

While experimenting with various static site generators (SSGs), I've created [Astro](https://astro.build) components and [Eleventy](https://11ty.dev) shortcodes that may have value for some of you. In this case, we're talking specifically about those of you who use [Cloudinary](https://cloudinary.com)'s generous free tier to store and manipulate your website's images. [Cloudinary](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/dqunpyaeqiizezj6lbdu)[^affilLink] does offer a variety of ways to work with its interface, but the code I provide here makes it easier, in my humble view. I offer the component and shortcode here in somewhat edited form, with their original repo-based versions as noted.

[^affilLink]: That's an affiliate link. If you're not already using Cloudinary, sign up through that link to get a few extra "credits" with the ones already included in the free tier --- and, for that matter, I'll get a few extra, too.

Except where one optional parameter is used, as explained below, an image coming from this code will have a fade-in effect with a [low-quality image placeholder](https://cloudinary.com/blog/low_quality_image_placeholders_lqip_explained) (LQIP), much as you commonly see on sites using the [Next.js](https://nextjs.org) or [Gatsby](https://gatsbyjs.com) site-builder tools.

We'll presume from here that you already have a Cloudinary account, free or otherwise, and know the name of your Cloudinary *cloud name*, which you'll have to provide in one variable. For example, mine is `brycewray-com`. Don't worry, it's not a secret; it appears in the URL when you inspect a Cloudinary-served image.

Feel free to rename the component and shortcode if you wish; their respective names are just what I call them.

## Astro component

The `Imgc.astro` component is available in its most current form [here](https://github.com/brycewray/astro-site/blob/main/src/components/Imgc.astro). You call the component as follows:

```md
<Imgc
	url="imagefilename.jpg"
	alt="Alt text for the image"
	width="3200"
	height="1800"
/>
```

. . . in which:
- `url` is the filename, *including the extension*, of your image as it's called on Cloudinary.
- `alt` is, of course, the image's alternative text for use by screen-reader devices.
- `width` is the **original** image's width in pixels.
- `height` is the **original** image's height in pixels.
- `phn`, not shown here, is an **optional** item, used for when you would rather not have an image fill the column. If you include it (`phn = "true"`), it'll make the image appear in a smaller form on screens larger than those of mobile devices. This is good for screen captures from phones, which is why I called it `phn`. (You can compare the methods by viewing [this post](/posts/2020/05/battle-ios-email-heavyweights/), in which the first two images are shown as `phn` would show them while the last is as shown without the presence of `phn`.) Setting `phn = "true"` also overrides the provision of the LQIP, which avoids certain problems caused when the image doesn't fill the column width.

`Imgc` uses `height` and `width` to derive the image's aspect ratio.

`Imgc` assumes you have the [`axios`](https://github.com/axios/axios) package installed.

```js
---
import axios from "axios";

const respSizes = [ 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500 ];
let myCloud = ''; // <- PROVIDE YOUR CLOUDINARY CLOUD NAME!
let cloudiBase = 'https://res.cloudinary.com/' + myCloud + '/image/upload/';
let LQIPholder = 'f_jpg,q_01,w_20/';
// --- note ending slash and that `q` must have a leading zero
let xFmPart1 = 'f_auto,q_auto:eco,w_';
let xFmPart2 = ',x_0,z_1/'; // note ending slash

const { url, alt, width, height, phn } = Astro.props;

const Srcset =
  respSizes.map(size => {
    if (size <= width) {
      return `${cloudiBase + xFmPart1 + size + xFmPart2 + url} ${size}w`;
    }
  }).join(', ');

let divClass, imgClass, nscClass, dataSzes, lazyYorN = ''

divClass = `relative`;
dataSzes = `(min-width: 1024px) 100vw, 50vw`;
lazyYorN = `lazy`;
nscClass = `w-full h-auto`;

if (phn === "phn") {
	divClass = `relative`;
	imgClass=`img-phn h-auto ctrImg animate-fade`;
} else {
	divClass = `relative bkgdHandler`;
	imgClass = `w-full h-auto animate-fade`;
}

async function getBase64(urlFor64) {
  const response = await axios
    .get(urlFor64, {
      responseType: 'arraybuffer'
    })
  return Buffer.from(response.data, 'binary').toString('base64');
}

let LQIP_b64 = await getBase64(cloudiBase + LQIPholder + url);
let imgBkgd = `url(data:image/jpeg;base64,${LQIP_b64})`;

---

<style lang="scss" define:vars={{ imgBkgd }}>
  @use '../styles/variables' as var; // SCSS partial

  .bkgdHandler {
    background-color: var.$default-color;
    background-image: var(--imgBkgd);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  img.containedImage {
    display: block;
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0 auto;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-fade {
    animation: fadeIn 750ms ease-in-out;
  }

</style>

<div class={divClass} data-pagefind-ignore>
  <noscript data-pagefind-ignore>
    <img class={nscClass} src={cloudiBase + xFmPart1 + "600" + xFmPart2 + url} alt={alt} width={width} height={height} />
  </noscript>
  <img class={imgClass} src={cloudiBase + xFmPart1 + "600" + xFmPart2 + url} srcset={Srcset} alt={alt} width={width} height={height} sizes={dataSzes} loading={lazyYorN} data-pagefind-ignore />
</div>

```

## Eleventy shortcode

The `imgc.js` shortcode is available in its most current form [here](https://github.com/brycewray/eleventy_site/blob/main/src/assets/utils/imgc.js). You call the shortcode as follows:

```twig
{% imgc "imagefilename.jpg", "Alt text for the image", 3200, 1800 %}
```

. . . in which you're providing, in this order:
- The filename, *including the extension*, of your image as it's called on Cloudinary.
- The image's alternative text (`alt` in HTML) for use by screen-reader devices.
- The **original** image's width in pixels.
- The **original** image's height in pixels.
- **Optionally**, you can add `phn` (after the image height --- such as `1800, phn %}` in our example above) when you would rather not have an image fill the column. If you include it, it'll make the image appear in a smaller form on screens larger than those of mobile devices. This is good for screen captures from phones, which is why I called it `phn`. (You can compare the methods by viewing [this post](/posts/2020/05/battle-ios-email-heavyweights/), in which the first two images are shown as `phn` would show them while the last is as shown without the presence of `phn`.) Including `phn` also overrides the provision of the LQIP, which avoids certain problems caused when the image doesn't fill the column width.

`imgc` uses the height and width to derive the image's aspect ratio.

Note that `imgc` assumes you have the [`eleventy-fetch`](https://github.com/11ty/eleventy-fetch) and [`md5`](https://github.com/pvorb/node-md5) packages installed in the project.

Of course, be sure to enable the `imgc` shortcode in your Eleventy config file through the [usual procedure](https://www.11ty.dev/docs/shortcodes/).

**Note**: For the most current repo-based form of the SCSS which styles images displayed through the `imgc` shortcode, see [this partial](https://github.com/brycewray/eleventy_site/blob/main/src/assets/scss/_global.scss).
{.box}

```js

const EleventyFetch = require("@11ty/eleventy-fetch")
const md5 = require('md5')

const respSizes = [ 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500 ]
let myCloud = '' // <- PROVIDE YOUR CLOUDINARY CLOUD NAME!
let cloudiBase = 'https://res.cloudinary.com/' + myCloud + '/image/upload/'
let LQIPholder = 'f_jpg,q_1,w_20/' // note ending slash and leading zero in `q`
let xFmPart1 = 'f_auto,q_auto:eco,w_'
let xFmPart2 = ',x_0,z_1/' // note ending slash

module.exports = async (url, alt, width, height, phn) => {
  let imgBmd5 = md5(url)

	divClass = `relative`
	dataSzes = `(min-width: 1024px) 100vw, 50vw`

  async function getBase64(urlFor64) {
    const imageBuffer = await EleventyFetch(urlFor64, {
			duration: "2w",
			type: "buffer"
		})
    return Buffer.from(imageBuffer, 'binary').toString('base64')
  }
	// Regarding the settings above,
	// consult the eleventy-fetch documentation
	// at https://www.11ty.dev/docs/plugins/fetch/

  let LQIP_b64 = await getBase64(cloudiBase + LQIPholder + url)

  let stringtoRet = ``
  let arrayFromLoop = []

	if (phn === "phn") {
		imgClass = `img-phn h-auto ctrImg animate-fade`
		stringtoRet += `<div class="${divClass}">`
	} else {
		imgClass = `w-full h-auto animate-fade`
		stringtoRet += `<style>
    .imgB-${imgBmd5} {
      background: url(data:image/jpeg;base64,${LQIP_b64});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
		</style><div class="${divClass} imgB-${imgBmd5}">`
	}
	stringtoRet += `<img class="${imgClass}" src="${cloudiBase + xFmPart1 + "600" + xFmPart2 + url}" srcset="`
    respSizes.forEach(size => {
      if (size <= width) {
        arrayFromLoop.push(`${cloudiBase + xFmPart1 + size + xFmPart2 + url} ${size}w`)
      }
    })
    stringtoRet += arrayFromLoop.join(', ')
    stringtoRet += `" alt="${alt}" width="${width}" height="${height}" sizes="${dataSzes}" /></div>`

  return stringtoRet
}
```
