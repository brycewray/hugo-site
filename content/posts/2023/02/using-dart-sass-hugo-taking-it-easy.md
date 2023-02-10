---
title: "Using Dart Sass with Hugo: taking it easy"
description: "Thanks to the speed and power of Hugo Pipes, I lose little or nothing in opting for the Node.js version of Sass."
author: Bryce Wray
date: 2023-02-10T08:51:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

It's been nearly a year since I [first wrote](/posts/2022/03/using-dart-sass-hugo/) about enabling the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG) to work comfortably with [Dart Sass](https://github.com/sass/sass/). A couple of months after that, I [adopted](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) what was arguably a technically superior, but somewhat more complicated, method.

Now, for several reasons, I've decided to fall back to the simpler approach I originally espoused --- especially given the freedom I gain from how well Hugo's built-in asset pipeline, [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/), performs with either method.

<!--more-->

At the bottom, I'll link to each of my other articles in this series so you can get a fuller picture of the problems I was trying to solve in the first place, but here's the short version:

- Hugo supports two versions of [Sass](https://sass-lang.com), [LibSass](https://sass-lang.com/libsass) and Dart Sass. However, [LibSass was deprecated in 2020](https://sass-lang.com/blog/libsass-is-deprecated), so you should use Dart Sass if at all possible.
- Although Hugo works with LibSass without additional help, things are more difficult where Dart Sass is concerned. Specifically, Hugo must be able to "see" an Embedded Dart Sass binary file in the `PATH`. Thus, you **must** (A.) obtain that extra file **and** (B.) make sure it's in the `PATH` on whatever machine you're using to run Hugo. Item (B) is the trickier of the two where remote hosts are concerned, as you can quickly imagine. I subsequently described two ways to accomplish this: [scripting](/posts/2022/03/using-dart-sass-hugo-sequel/); and, depending on one's preference for a [CI/CD](https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html) host, either [GitHub Actions](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) or [GitLab CI/CD](/posts/2022/08/using-dart-sass-hugo-gitlab-edition/).
- **However**, what I'd [initially mentioned](/posts/2022/03/using-dart-sass-hugo/) is a third, considerably simpler way to get Hugo to work with Dart Sass: using the same [Node.js `sass` package](https://github.com/sass/sass) that's typically used by JavaScript-based SSGs such as [Astro](https://astro.build) and [Eleventy](https://11ty.dev). Besides the fact that Hugo-with-`sass` doesn't work quite as quickly during development as does Hugo-with-Embedded-Dart-Sass, the perceived drawback here is that `sass` **is** a Node package. This can offend anti-Node purists who delight in having a Hugo project free of that often-bloated `node_modules` folder that comes with using any such packages. (Trust me, there are such folks.)

I used the scripting method for two months, then the GitHub Actions method for nine months. I could still be using the latter to this day. But, the other day, I just decided I'd give the Node package another shot. Perhaps, this time, the whole development experience with `sass` wouldn't be as slow as I seemed to recall from when I'd either [tried it](/posts/2022/03/using-dart-sass-hugo/) or [briefly fallen back to it](/posts/2022/05/using-dart-sass-hugo-back-to-node/).

Lo and behold, it wasn't.

Now, yes, it's still a *little* slower at dev start-up than with Embedded Dart Sass, but truthfully not that much (two or three additional seconds, *maybe*) --- **and** the automatic updating of my site whenever I make a change to any of my SCSS files seems just as snappy. For that, I tip my metaphorical hat to Hugo Pipes for what seems to be the umpteenth time.

Of course, in production, there's zero difference in the final styling files that go on the site, so my visitors suffer not a bit for the change. Better still, I no longer have to bother with getting that Embedded Dart Sass binary in the right place on the build system, whether for the CI/CD host or the actual site host. That enables deploying a Hugo-with-`sass` site through the **native UIs** of most [Jamstack](https://jamstack.org)-savvy hosts, especially the three I usually recommend[^envVar]: [Cloudflare Pages](https://pages.cloudflare.com), [Netlify](https://netlify.com), and [Vercel](https://vercel.com).

[^envVar]: Notably, each allows you to specify the [Hugo version](https://github.com/gohugoio/hugo/releases/) through use of a `HUGO_VERSION` environment variable. That keeps you from being stuck with an older, less capable version on the host's standard build image for site deployments.

For now, at least, I am continuing to deploy my Hugo site with a GitHub Action because, due to how hosts usually clone your Git repository for builds, that's the only way to ensure the correct [Git info](/posts/2022/06/get-good-git-info-hugo/) appears at the top of each post.[^history]

[^history]: One way I could get around this would be to provide only a link to the post's GitHub history, which doesn't require Hugo's `.GitInfo` function.

Not being one of those previously mentioned anti-Node purists, I was fine with letting not only `sass` but a few other helpful Node packages into the mix. The only thing that did bother me was that, unlike the last time I'd used `sass` with Hugo to output only one overarching `index.css` file, I now was using a [multi-file, "sorta scoped" setup](/posts/2023/01/sorta-scoped-styling-hugo-take-two/). Would it be a nightmare to maintain the Sass-related scripts in the resulting `package.json` file?

As it turned out, not at all.

I'd previously only skimmed the documentation for the Sass CLI, so I was pleasantly surprised to see that it has a "[many-to-many mode](https://sass-lang.com/documentation/cli/dart-sass#many-to-many-mode)" which can easily convert an entire *directory* of SCSS files to CSS in one fell swoop:

```bash
sass --no-source-map assets/scss:assets/css
```

. . . and that resulting placement (`/assets/css/` in the Hugo project) meant Hugo Pipes would have no problem handling all those CSS files in its usual lightning-fast manner. For example, here's how my [`head-criticalcss.html` partial](https://github.com/brycewray/hugo_site/blob/main/layouts/partials/head-criticalcss.html) now looks:

```go-html-template
{{- $css := "" -}}
{{- $css = resources.Get "css/critical.css" -}}
{{- with $css }}
	<style>{{ .Content | safeCSS }}</style>
{{- end }}
```

. . . while the relevant part of the [`head-css.html` partial](https://github.com/brycewray/hugo_site/blob/main/layouts/partials/head-css.html) looks like this:

```go-html-template
{{- range $cssTypes -}}
	{{- $condition = index . 0 -}}
	{{- $fileName = index . 1 -}}
	{{- if eq $condition true -}}
		{{- $css = resources.Get (print "css/" $fileName ".css") -}}
		{{- if hugo.IsProduction -}}
			{{- $css = $css | fingerprint "md5" -}}
		{{- end }}
		<link rel="preload" href="{{ $css.RelPermalink }}" as="style">
		<link rel="stylesheet" href="{{ $css.RelPermalink }}" type="text/css">
	{{ end -}}
{{- end -}}
```

(For more on these partials, see "[Sorta scoped styling in Hugo, take two](/posts/2023/01/sorta-scoped-styling-hugo-take-two/).")

Finally, here are the scripts in the project's `package.json` file[^pkgs]:

```json
"clean": "rimraf public",
"pagefind": "pagefind --source public",
"devsass": "sass --no-source-map assets/scss:assets/css",
"prodsass": "sass --no-source-map assets/scss:assets/css --style=compressed",
"dev:hugo": "hugo server --port 3000 --bind=0.0.0.0 --baseURL=http://192.168.254.10:3000 --panicOnWarning --disableFastRender --forceSyncStatic --gc",
"dev:sass": "npm run devsass -- --watch",
"prod:hugo": "hugo --minify",
"prod:sass": "npm run prodsass",
"testbuild:hugo": "hugo server --port 3000 --bind=0.0.0.0 --baseURL=http://192.168.254.10:3000 --panicOnWarning --disableFastRender --forceSyncStatic --gc --environment=production",
"testbuild:sass": "npm run prodsass -- --watch",
"start": "NODE_ENV=development npm-run-all clean devsass --parallel dev:*",
"build": "NODE_ENV=production npm-run-all clean prodsass prod:hugo",
"testbuild": "NODE_ENV=production npm-run-all clean prodsass --parallel testbuild:*",
"testbuildpf": "NODE_ENV=production npm-run-all build pagefind --parallel testbuild:*"
```

[^pkgs]: Note that I have installed not only `sass` but also the [cross-platform `rimraf` file-deletion tool](https://github.com/isaacs/rimraf), [`npm-run-all`](https://github.com/mysticatea/npm-run-all) for running multiple scripts in one command, and [`pagefind` for search](https://github.com/cloudcannon/pagefind). The latter is especially nice because that's **another** thing with which I don't have to futz in getting it to run on the remote build process: I just use `npm run pagefind` and all is good. Even if I decide to quit using CI/CD down the line, I could simply spec the host's build command as `npm run build && npm run pagefind` and call it a day.)

(And, yes, I do have to run `devsass` **within** `dev:sass`. Perhaps it seems repetitive, but that ensures there are files waiting in `/assets/css/` for Hugo Pipes to process when Hugo starts running. Otherwise, Hugo errors out when it hits the first of those `resources.Get` commands in the Sass-specific partials.)

In the end, is using `sass` with Hugo quite as nerdily interesting as has been obtaining and using that Embedded Dart Sass binary? Not quite.

But is it a lot less hassle? Absolutely.

----

## Our saga so far

Here are all my previous posts on this subject.

- "[Using Dart Sass with Hugo](/posts/2022/03/using-dart-sass-hugo/)" <span class="nobrk">(2022-03-08)</span>.
- "[Using Dart Sass with Hugo: the sequel](/posts/2022/03/using-dart-sass-hugo-sequel/)" <span class="nobrk">(2022-03-09)</span>.
- "[Using Dart Sass with Hugo: the GitHub Actions edition](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/)" <span class="nobrk">(2022-05-17)</span>.
- "[Using Dart Sass with Hugo: the nitty-gritty](/posts/2022/05/using-dart-sass-hugo-nitty-gritty/)" <span class="nobrk">(2022-05-22)</span>.
- "[Using Dart Sass with Hugo: back to Node](/posts/2022/05/using-dart-sass-hugo-back-to-node/)" <span class="nobrk">(2022-05-24)</span>.
- "[Using Dart Sass with Hugo: some data on using GitHub Actions](/posts/2022/07/using-dart-sass-hugo-some-data-using-github-actions/)" <span class="nobrk">(2022-07-05)</span>.
- "[Using Dart Sass with Hugo: the GitLab edition](/posts/2022/08/using-dart-sass-hugo-gitlab-edition/)" <span class="nobrk">(2022-08-05)</span>.
