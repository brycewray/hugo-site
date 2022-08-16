---
title: "The “staying with Hugo” post, three years later"
description: "Revisiting one of this website’s most frequently accessed posts."
author: Bryce Wray
date: 2022-07-14T14:07:00-05:00
lastmod: 2022-07-22T22:16:00-05:00
#draft: true
#initTextEditor: iA Writer
---

Regardless of which analytics provider ([if any](/posts/2022/06/goodbye-analytics/)) this site has ever used, it's always been clear that a large percentage of searches that actually get here do so because of one particular post which I first issued three years ago today.

For those not willing to delve into the tome-like "[Why I'm staying with Hugo](/posts/2019/07/why-staying-with-hugo)," the TL;DR is that it chronicled my first attempt to build the site with the JavaScript-based [Gatsby](https://gatsbyjs.com) [static site generator](https://jamstack.org/generators) (SSG) rather than the [Go](https://go.dev)-based [Hugo](https://gohugo.io) SSG, which had been my original choice when I'd launched the site the previous year.

Of course, the title soon became unintentionally ironic, as I embarked on what I'd [later ruefully describe](/posts/2019/12/sorta-strange-ssg-trip/) as "the dance" among SSGs: notably, between Hugo and [Eleventy](https://11ty.dev), although a few others have crept into the mix in the ensuing years. Now, other than the site's brief stint on [Astro](https://astro.build) a few months ago, Hugo has once again become its mainstay. While I've continued to experiment with other SSGs, mainly in the background, I keep coming back to Hugo for many reasons, some of which have come into play for me only fairly recently.

Earlier this week, when I noticed that the post's three-year anniversary was nearing, I spent some time re-reading it in detail. Here are some thoughts that brought to mind, especially as I compared what I wrote and knew then with what I *sorta* know now.

## The newness of you

One of the main reasons I found the experience as harrowing as I described was because it was the first time I'd used anything in the [Node.js](https://node.js.org) ecosystem (other than in strictly controlled tutorials, that is). I was completely new to all the stuff that comes with the `node_modules` folder, `package.json` and `package-lock.json` files, and *particularly* the way a Node package's performance and stability can live and die on the quality of its constituent dependencies. In time, I would become considerably more acclimated to --- or, perhaps more accurately, less rattled by --- this method of building and maintaining a project.

It was also the first time that I was using a *bundler*, namely the then-ubiquitous [webpack](https://webpack.js.org), which was (and is) an integral part of Gatsby. Only [months later](/posts/2019/12/packing-up/) would I even have a decent grasp on what a bundler *is* in the first place.

Finally, as I explained in the original post, I hadn't done a lot of *any* coding in JavaScript up until that time. If one can barely swim, it might not be a good idea for him to try flopping around in the middle of the ocean without a flotation device.

*Old Joke Warning* . . . While walking down a street one day, a fellow noticed another fellow repeatedly hitting the top of his own head with a hammer. Curious, Man #1 walked up and asked Man #2 why he was doing this. Man #2 replied, "Because it feels so good when I stop." In similar fashion, I now understand even more clearly why, back in 2019, it was so satisfying to return to Hugo after that nasty first run at the world of JS-based SSGs.

## Moving on up

When I compare the Hugo of mid-July, 2019, to [what's available today](https://github.com/gohugoio/hugo/releases), it's amazing how far the SSG has come. Back then, I'd have been using, at best, [Hugo 0.55.6](https://github.com/gohugoio/hugo/releases/tag/v0.55.6), released 2019-05-18. Since then, Hugo has added:
- [Hugo Modules](https://gohugo.io/hugo-modules/)[^HugoModules] in [0.56.0](https://github.com/gohugoio/hugo/releases/tag/v0.56.0), 2019-07-25.
- Better and faster Markdown parsing through the [goldmark](https://github.com/yuin/goldmark) library in [0.60.0](https://github.com/gohugoio/hugo/releases/tag/v0.60.0), 2019-11-27.
- Support for [Dart Sass](https://sass-lang.com/dart-sass) in [0.80.0](https://github.com/gohugoio/hugo/releases/tag/v0.80.0), 2020-12-31.
- Support for processing [WebP](https://developers.google.com/speed/webp) images in [0.83.0](https://github.com/gohugoio/hugo/releases/tag/v0.83.0), 2021-05-01. (More about Hugo's [image processing](/posts/2022/06/responsive-optimized-images-hugo/) below.)
- The ability to [fetch remote resources](/posts/2021/12/fetching-remote-stuff-hugo-0-90-plus/) in [0.90.0](https://github.com/gohugoio/hugo/releases/tag/v0.90.0), 2021-12-08 (with some enhancements thereto in [0.91.0](https://github.com/gohugoio/hugo/releases/tag/v0.91.0), 2021-12-17).
- Even more build speed and more efficient memory usage --- as if Hugo didn't already pack both in sufficient quantity --- in [0.94.0](https://github.com/gohugoio/hugo/releases/tag/v0.94.0), 2022-03-10.
- Many improvements over time, in multiple versions, to Hugo's built-in asset pipeline, [Hugo Pipes](https://gohugo.io/hugo-pipes/). It now features code-bundling, further enhancements to its image-processing powers, and a lot more. For those unfamiliar with Hugo Pipes, let's just say its performance/speed combination blows away webpack and [Parcel](https://parceljs.org), and even (IMHO) rivals the awesome [Vite](https://vitejs.dev).

[^HugoModules]: Full disclosure: my only use of Hugo Modules so far was in a test I did earlier this year while writing [a post](https://cloudcannon.com/blog/stay-in-the-race-with-hugo-bookshop-and-cloudcannons-git-powered-cms/) for the [CloudCannon blog](https://cloudcannon.com/blog/) about CloudCannon's open-source [Bookshop project](https://github.com/CloudCannon/bookshop), which works with a Hugo site via Hugo Modules. However, I know there are many Hugo users who consider Hugo Modules the proverbial "greatest thing since sliced bread" --- and, for some use cases, that appears to be an apt description. It's just that this site doesn't need them, so I haven't really bothered.

## The more you know

I've done plenty of complaining over the years about the Go-based templating in Hugo, and I still consider it sub-optimal if one isn't prepared to spend a **lot** of time getting the hang of it.

However, it's begun to grow on me somewhat. The difference between Then and Now is that I actually *have* spent the time.

Compared to how much tinkering I've done over the years with various other SSGs --- including what I described in "Why I'm staying with Hugo" --- I didn't really get under the hood much with Hugo, and what its templating allows, until just the last seven or eight months. Having now invested that effort, I've gained an even greater understanding, and appreciation, of Hugo's capabilities, as noted in a few posts I've written in that period:

- "[Bundling JavaScript with Hugo and esbuild](/posts/2021/12/bundling-javascript-hugo-esbuild/)," 2021-12-01.
- "[Fetching remote stuff with Hugo 0.90+](/posts/2021/12/fetching-remote-stuff-hugo-0-90-plus/)," 2021-12-11.
- Several posts about doing fully static embeds of social media posts --- which Hugo's built-in `getJSON` function makes easier than in JS-based SSGs[^fetchAxios] --- the most recent of which was "[Static tweets in Hugo: an update](/posts/2022/06/static-tweets-hugo-update/)," 2022-06-07.
- "[Responsive and optimized images with Hugo](/posts/2022/06/responsive-optimized-images-hugo/)," 2022-06-29.

[^fetchAxios]: That is, unless you just *like* futzing around with packages like [node-fetch](https://github.com/node-fetch/node-fetch) and [axios](https://axios-http.com/). I've used both in both Eleventy and Astro, and sometimes they've worked okay for me but other times they've constituted a major pain. (Async and I aren't exactly the best of friends.) I have yet to run into similar agonies with `getJSON`, which I've found far more forgiving than either node-fetch or axios.

## And further staying

Not only has it been three years since "Why I'm staying with Hugo"; it's also been four years since the summer when I did the research which resulted in my choosing what then would've been [Hugo 0.48](https://github.com/gohugoio/hugo/releases/tag/v0.48)  to create this website. The website is still here and (despite the iterations of the occasionally ongoing "dance") it's running on Hugo, albeit a **far** more capable version than 0.48.

While my wandering eye for New Shiny is something which always will be a factor, the last few months have given me greater appreciation for Hugo --- and for staying with it.
