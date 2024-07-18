---
title: "Get good Git info from Hugo"
description: "It’s easy to fetch and display your Hugo repo’s Git data."
author: Bryce Wray
date: 2022-06-01T06:47:00-05:00
#initTextEditor: iA Writer
---

{{< threads dvUrl="https://dev.to/brycewray/get-good-git-info-from-hugo-45f8" >}}

While reading blog posts from other static site generator (SSG) users, I sometimes see that a post includes a link to the specific [Git commit](https://git-scm.com/docs/git-commit) for that post's most recent update. In this post, I'll show you how to do it in a [Hugo](https://gohugo.io) site, in case you're interested in doing the same. As an additional benefit, it'll automate something you might have been doing manually up to now.

I got the idea yesterday, when I saw a [post](https://www.aleksandrhovhannisyan.com/blog/eleventy-build-info/) from [Aleksandr Hovhannisyan](https://www.aleksandrhovhannisyan.com/). In it, he gave a fine tutorial about displaying this data in pages built with the [Eleventy](https://11ty.dev/) SSG. Hovhannisyan's method employed JavaScript to fetch the necessary Git data for use by his Eleventy templates.

On the other hand: with a Hugo site, things are much easier, thanks to the built-in availability of **[Git info variables](https://gohugo.io/variables/git)**. Once you set Hugo to fetch these variables, they're available from within a `.GitInfo` object.

In your [project config file](https://gohugo.io/getting-started/configuration/), set `enableGitInfo` to `true` (here, I'm showing the Hugo default of [TOML](https://github.com/toml-lang/toml), although my own config file is actually [YAML](https://yaml.org/spec/)):

```toml
enableGitInfo = true
```

As the setting's name implies, this activates the presence of the Git info variables.

I'll get to the part about displaying commit info shortly but, first, let's note that making this setting may have just liberated you from a nit-picking duty involved in how you display your posts' dates. If you've been using *manual* entries in your posts' front matter to indicate when they were last modified, you no longer have to do that. The Git info will, by default, provide this data as `.Lastmod`.[^manualDates]

[^manualDates]: [By default](https://gohugo.io/getting-started/configuration/#configure-dates), Hugo will give higher priority to the Git info variable `.Lastmod` *vs.* other possibilities --- including any manual `Lastmod` entries you may have already provided in your content's front matter.

**However**, in production, you will need to deploy your site using a [GitHub Action](https://github.com/features/actions/) (or other CI/CD), as [I've been doing lately](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/). The problem is that, although these automated `.Lastmod` indications will be correct when you're developing *locally* with `hugo server`, they'll *all* take on the *current* date when you deploy. Fortunately, there's an explanation and solution, from a [thread](https://discourse.gohugo.io/t/problems-with-gitinfo-in-ci/22480)[^years] on the Hugo Discourse forum:

[^years]: The original question dates from December 25, 2019, but it took another 21 months before an answer, much less *the* answer, appeared. Jeeeez.

> By default, the [GitHub “checkout” action](https://github.com/actions/checkout) only fetches a single commit (for the [ref/SHA](https://git-scm.com/book/en/v2/Git-Internals-Git-References) that triggered the workflow). This results in the behavior you describe --- *i.e.*[,] the current date/time is used for `.Lastmod`.
>
> If you modify the checkout action to fetch the entire history (by specifying `fetch-depth: 0`), then `.GitInfo` and `.Lastmod` [work] as expected[.]

*[Stylistic edits and one link applied.]*

This is because (a.) hosts' Git configurations for builds typically are set to so-called *shallow-clone* behavior; and, apparently, (b.) no host allows altering this in either its built-in UI or any optional config files (*e.g.*, `netlify.toml` with [Netlify](https://netlify.com) or `vercel.json` with [Vercel](https://vercel.com)). Shallow-clone behavior causes problems with using `.GitInfo` data as described in this post, so keep this in mind if you typically deploy via your host's built-in user interface rather than with CI/CD.

----

<span class="red"><em><strong>Updates from the future</strong></em></span>

In fact, Netlify and [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform) exhibit *deep-clone* behavior where Git is concerned, so you likely can use the information herein with their native UIs rather than having to deploy to them via CI/CD.

Also: with Cloudflare Pages, you **can** perform a sufficiently deep clone for these purposes if you preface your Hugo build command with `git fetch --unshallow` followed by the `&&` concatenation operator; *e.g.*:

```bash
git fetch --unshallow && hugo --minify
```

<span class="red"><em>Now back to the original post . . .</em></span>

----

To make use of this answer in a GitHub Action, you could just add a `with` section to the GitHub Action's `Checkout default branch` step:

```yaml
   - name: Checkout default branch
	   uses: actions/checkout@v3
		 with:
       fetch-depth: 0
```

. . . and, indeed, that fixes the glitch.

You might also want to test for whether a post's day of original publication and its "last-modified" day are the same --- *e.g.*, when you fix a typo or otherwise edit something while it's still the same day as when you first issued the post --- and, if so, show only the "original-pub" listing, to avoid duplication. However, this requires comparing the *formatted* dates, since full *timestamps* clearly can *never* be the same [down to the nanosecond](https://pkg.go.dev/time#ANSIC); so here's how you could accomplish this in an applicable template:

```go-html-template{bigdiv=true}
<p>
	<strong>{{ .PublishDate.Format "January 2, 2006" }}</strong><br />
	{{- if ne (.PublishDate.Format "January 2, 2006") (.Lastmod.Format "January 2, 2006") }}
		Last modified {{ .Lastmod.Format "January 2, 2006" }}
	{{- else -}}
		&nbsp;
	{{- end -}}
</p>
```

Within the paragraph, if the two are *not* equal (`ne`), this shows the "Last modified" statement; otherwise, it just inserts a non-breaking space so the height of the line will be the same.

That takes care of Git info for dates; but what about the original subject of this post, namely how you can link to a page's most recent Git commit?

Well, the `.GitInfo` object also provides two variables for each commit's [hash](https://www.mikestreety.co.uk/blog/the-git-commit-hash/): the *full* hash (`.Hash`) and the more familiar *abbreviated* hash (`.AbbreviatedHash`). Adding this within the proper templates is pretty matter-of-fact. The following example *displays* `.AbbreviatedHash` while the *link* is an `exampleuser` repo link plus `/commit/` plus `.Hash`:

```go-html-template{bigdiv=true}
<p>
	{{- if $.GitInfo -}}
		<strong>Latest commit</strong>: <a href="https://github.com/exampleuser/hugo-site/commit/{{ .GitInfo.Hash }}" rel="noopener">{{ .GitInfo.AbbreviatedHash }}</a>
	{{- else -}}
		&nbsp;
	{{- end -}}
</p>
```

(The `if $.GitInfo` conditional prevents `hugo server` errors during local development while you're working on content you haven't yet committed.[^dateLastmod] You can thank [another Hugo Discourse forum answer](https://discourse.gohugo.io/t/adding-last-modified-git-status-to-pages/25402/5) for that one.)

[^dateLastmod]: The reason you don't have to do this with the dates-display mentioned earlier is because, in that case, we're simply using `Lastmod` (a variable [Hugo already knows](https://gohugo.io/variables/page/)) rather than, specifically, `.GitInfo.Lastmod`, the absence of which for a given page gives Hugo fits.

And, yes, the previous advisory still applies: *i.e.*, you have to deploy to your host via CI/CD in order to see the correct Git commit data for each post.

<br />

So, now, you've automated both (a.) displaying that `Lastmod` stuff and (b.) linking to the commit from which each page's latest version originates. Yet, you needed no additional tools, and very little extra code, to do it. Not bad for a few minutes' worth of work in Hugo, eh?

**Update, 2022-10-07**: If you're interested in displaying **both** per-page Git info **and** whole-site Git info in your Hugo site, check the [solution](https://github.com/gohugoio/hugo/issues/9738#issuecomment-1086669372) suggested by Hugo expert/contributor [Joe Mooring](https://github.com/jmooring). Thanks to [Rodrigo Alcaraz de la Osa](https://github.com/rodrigoalcarazdelaosa) for the [Q&amp;A session](https://github.com/brycewray/comments/discussions/25) that led me toward this additional information!
{.box}

**Update, 2024-07-18**: Beginning with Hugo [v. 0.129.0](https://github.com/gohugoio/hugo/releases/tag/v0.129.0), the use of Git info variables requires updating your Hugo configuration if it has a [custom security policy](https://gohugo.io/about/security/#security-policy): specifically, you'll need to add `^git$` to your `exec`/`allow` list. However, if you don't have such a policy in your Hugo config, Hugo's built-in whitelisting should handle things.
