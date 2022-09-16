---
title: "Get good Git info from Eleventy, too"
description: "While per-page Git data is built into Hugo, a little code can bring it to Eleventy, as well."
author: Bryce Wray
date: 2022-09-05T10:01:00-05:00
#draft: true
#initTextEditor: iA Writer
---

**Note**: This post also appears on [dev.to](https://dev.to/brycewray/get-good-git-info-from-eleventy-too-30in).
{.yellowBox}

In "[Get good Git info from Hugo](/posts/2022/06/get-good-git-info-hugo/)," I explained how to use the [Hugo](https://gohugo.io) static site generator (SSG)’s built-in [Git info variables](https://gohugo.io/variables/git) to display page-by-page [Git commit](https://git-scm.com/docs/git-commit) data for one's static website. Well, lo and behold, you can get that kind of information in the [Eleventy](https://11ty.dev) SSG, too. You just need to add a little code, in the form of a [shortcode](https://www.11ty.dev/docs/shortcodes/) that takes advantage of [Eleventy-supplied data](https://www.11ty.dev/docs/data-eleventy-supplied/).

## It requires CI/CD

The one potential kink to this for you is that, in order for this to work best, you'll have to use a [CI/CD](https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html) method of deploying your site. For anybody likely to find this article, you'll typically be using either [GitHub Actions](https://github.com/features/actions) or [GitLab CI/CD](https://docs.gitlab.com/ee/ci/). The reason this is necessary is because this method uses [`git log`](https://git-scm.com/docs/git-log), and --- at least as far as I know --- there's no way to use any of the Jamstack-savvy web hosts' UIs to specify `fetch-depth: 0`, [which is necessary for this to work](https://discourse.gohugo.io/t/problems-with-gitinfo-in-ci/22480).

It's outside the scope of this article to explain the CI/CD part, but I've written other posts about it (see my [search page](/search/), especially regarding GitHub Actions) which you may find useful in pressing ahead with it.

## The shortcode: go easy

In putting together this shortcode, we'll follow the advice I gave in "[Take a load off](/posts/2022/09/take-load-off/)" about how **not** to overtax your development environment. While that article was about limiting accesses of remote APIs, it also applies to getting Git data. This is because `git log` is notorious for its potentially high impact on local device performance; it was built to be comprehensive, not to save CPU cycles. Thus, we'll set the shortcode, which I call `gitinfo.js`, so that it does the heavy lifting only in production.

Of course, be sure to enable `gitinfo.js` (or whatever you choose to call it) in your Eleventy config file through the [usual procedure](https://www.11ty.dev/docs/shortcodes/).

Note that `gitinfo.js` assumes you have installed the [`luxon`](https://github.com/moment/luxon) package, to be used here for formatting dates from Git commit data. (On the other hand, `child_process` is included in [Node.js](https://nodejs.org).) Notice also that you'll have to supply, in the `repoLink` variable, the URL for your online repo's commits.

```js
const { DateTime } = require("luxon")
const childProcess = require('child_process')
const environment = process.env.NODE_ENV

module.exports = (pubdate, filename) => {
	let stringToRet = ``
	if (environment === "production") {
		let repoLink = ``
		/* ================
			For `repoLink`, fill in the starting URL
			for commits to your project's online repo!
			If you use GitHub, it'll usually be
			in the format of:
			https://github.com/your-github-name/your-repo-name/commit/
		================ */
		pubdate = DateTime.fromJSDate(pubdate).toFormat("yyyy-MM-dd")

		const lastUpdatedFromGit =
			childProcess
			.execSync(`git log -1 --format=%cd --date=short ${filename}`)
			.toString()
			.trim()

		const abbrevHash =
			childProcess
			.execSync(`git log -1 --pretty=format:"%h" ${filename}`)
			.toString()
			.trim()

		const longHash =
			childProcess
			.execSync(`git log -1 --pretty=format:"%H" ${filename}`)
			.toString()
			.trim()

		repoLink += longHash

		if (longHash !== '') {
			stringToRet = `Latest commit: <a class="mono" href="${repoLink}" rel="noopener">${abbrevHash}</a>`
			if (pubdate !== lastUpdatedFromGit) {
				stringToRet += `, ${lastUpdatedFromGit}`
			}
		} else {
			stringToRet = `&nbsp;`
		}

	} else {
		stringToRet = `[Git info will appear here in production.]`
	}

	return stringToRet
}
```

You may have noticed that the shortcode took two parameters: `pubdate` and `filename`. Here's where the Eleventy-supplied data comes in. Wherever you want the Git data to occur, use the `gitinfo` shortcode as follows:

```md
{% gitinfo page.date, page.inputPath %}
```

This will automatically feed to `gitinfo` a Markdown file's `date` (derived by default from the file's front matter but, if it's not there, [Eleventy has fallbacks](https://www.11ty.dev/docs/dates/)) and `inputPath`. In a typical Eleventy repo, `inputPath` takes this form:

```plaintext
./src/path/to/my-markdown-file.md
```

As for the final message conveyed in your site by `stringToRet`, you're obviously free to make `stringToRet` say what works best for your site. The main thing is that the code here shows you how to get the data that it needs in the first place. And, to be specific about that data, in production the `gitinfo` shortcode invocation brings back a string containing:

- `lastUpdatedFromGit` --- The date of the file's last Git commit in `yyyy-mm-dd` format. (If this is on the same day as the initial date of publication, `lastUpdatedFromGit` doesn't appear.)
- `abbrevHash` and `longHash` --- The short and long versions, respectively, of the commit's [hash](https://www.mikestreety.co.uk/blog/the-git-commit-hash/). The returned string combines `repoLink` with `longHash` to produce the URL to which it then links `abbrevHash`.

If you typically show each page's initial publication date and last-modified date, you *can* choose to avoid worrying about that latter part from here on by just using `gitinfo`'s output, instead. (Some prefer to provide the last-modified info manually, to indicate only true content changes; by contrast, `gitinfo` can report only the last time the file was changed/committed at all, even if just to eliminate a totally invisible empty line someplace.)

So, while it's indeed cool that Hugo wields Git info-handling prowess out of the box, this shortcode gives Eleventy the same powers. (I'll avoid the "great responsibility" trope.) Perhaps you can make good use of them.

## Acknowledgements and related material

- Zachary Betz, "[Create React App: Show Current Git Branch and Commit Hash From Any OS](https://zwbetz.com/create-react-app-show-current-git-branch-and-commit-hash-from-any-os/)" (2021-06-22).
- Aleksandr Hovhannisyan, "[Add Build Info to an 11ty Site](https://www.aleksandrhovhannisyan.com/blog/eleventy-build-info/)" (2022-05-31).
- Hector Molina, "[Moving away from GitHub Pages to Cloudflare Pages](https://hmolina.dev/p/moving-away-from-github-pages-to-cloudflare-pages/)" (2022-07-03).
- Michael Schnerring, "[Create a Hugo Website with GitHub Pages, GitHub Actions, and Cloudflare](https://schnerring.net/blog/create-a-hugo-website-with-github-pages-github-actions-and-cloudflare/)" (2021-03-19).
- Mike Street, "[The Git Commit Hash](https://www.mikestreety.co.uk/blog/the-git-commit-hash/)" (2020-05-28).
- Hugo Discourse forum
	- "[Adding Last Modified Git Status to Pages?](https://discourse.gohugo.io/t/adding-last-modified-git-status-to-pages/25402)" (initially posted 2020-05-10).
	- "[Problems with GitInfo in CI](https://discourse.gohugo.io/t/problems-with-gitinfo-in-ci/22480)" (initially posted 2019-12-25).
- [îles](https://iles.pages.dev/) GitHub Discussions, "[Any way to expose Git data?](https://github.com/ElMassimo/iles/discussions/132)" (initially posted 2022-06-10).
- Node.js v18.8.0 documentation, "[Child process](https://nodejs.org/api/child_process.html)" (accessed 2022-09-04 for this article).
- Pragmatic Pineapple, "[Add Updated At To Your Gatsby Blog](https://pragmaticpineapple.com/add-updated-at-to-your-gatsby-blog/)" (2021-02-08).
- Stack Overflow
	- "[Get hash of most recent git commit in Node](https://stackoverflow.com/questions/34518389/get-hash-of-most-recent-git-commit-in-node/)" (initially posted 2015-12-29).
	- "[Why The Output Of 'git log' Is Different In Terminal and execSync In node.js](https://stackoverflow.com/questions/63673227/why-the-output-of-git-log-is-different-in-terminal-and-execsync-in-node-js)" (initially posted 2020-08-31).
