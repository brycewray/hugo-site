---
title: "Get good Git info even with a host’s GUI"
description: "Got those “shallow clone blues”? If you have the time, we may have the fix."
author: Bryce Wray
date: 2023-02-27T07:26:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

I've issued [two](/posts/2022/06/get-good-git-info-hugo/) [posts](/posts/2022/09/get-good-git-info-eleventy-too/) about how you can automatically include [Git commit data](https://git-scm.com/docs/git-commit) in your static website. The problem is that, if you deploy your site to a [Jamstack](https://jamstack.org)-type hosting service through its usual UI, you may not get the desired results. So let's fix that, whattaya say?

<!--more-->

Before I go on, let me do you a favor and note that --- unless you're just nerdily curious, as am I --- this post will be of interest to you **only** if you satisfy **all** of the following criteria:

- You have a website that you maintain through use of a [static site generator](https://jamstack.org/generators) (SSG), preferably [Hugo](https://gohugo.io) or perhaps [Eleventy](https://11ty.dev).
- You keep that website's project in a publicly viewable online repository.
- You want to display up-to-date, *per-page* Git commit data on multiple pages in the site.
- You want to deploy your site via your host's native UI.

If that sounds like you, keep reading. Otherwise: thanks for stopping by, but you'll have no use for what follows. *Au revoir*.

----

Okay. If you're still with me . . .

In one of those earlier posts, I explained the problem:

> . . . in order for this to work best, you'll have to use a [CI/CD](https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html) method of deploying your site. For anybody likely to find this article, you'll typically be using either [GitHub Actions](https://github.com/features/actions) or [GitLab CI/CD](https://docs.gitlab.com/ee/ci/). The reason this is necessary is because . . . there's no way to use any of the Jamstack-savvy web hosts' UIs to specify `fetch-depth: 0`, [which is necessary for this to work](https://discourse.gohugo.io/t/problems-with-gitinfo-in-ci/22480).

When copying your repository for deployment, some of these hosts do a so-called *shallow clone*. That means they fetch only a few of the most recent Git commits for the **entire project**, rather than performing a deeper clone that allows you to get the latest Git commit for **each page** on your site.

For example, see [this documentation](https://vercel.com/guides/how-do-i-use-the-ignored-build-step-field-on-vercel), which specifies that [Vercel](https://vercel.com) fetches only ten levels of commit history when cloning a repo. Based on my testing, [Cloudflare Pages](https://pages.cloudflare.com) and [Render](https://render.com), similarly, do shallow clones. On the other hand, [Netlify](https://netlify.com) [apparently](https://github.com/netlify/build-image/issues/317) does a very deep clone which is quite satisfactory for obtaining per-page commit data, and my testing confirmed that. I also found the same to be true for [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform).

In any event, the good thing is that, on your local repo, you can do your *own* gathering of the Git data and then have your chosen SSG grab and use that data. This means you won't have to worry one way or the other about your host's repo-cloning practices, which can simplify things if you want to change hosts for some reason.

Here, I'm writing about how to go about that process in Hugo, but a lot of this should be equally applicable to Eleventy or, for that matter, quite a few other SSGs. I tested this successfully with the native UIs of Cloudflare Pages, DigitalOcean App Platform, Netlify, Render, and Vercel.

Let's break down what this involves:

1. **Populate the Git data** --- Since the host's shallow clone will prevent us from obtaining the desired data during the deployment process, we instead will get it locally, first. This will happen through a shell script that uses [`git log`](https://git-scm.com/docs/git-log) to populate a YAML file.[^notData]
2. **Access the Git data** --- We then will use [Hugo's built-in data-gathering capabilities](https://gohugo.io/templates/data-templates/) to access what's now in the YAML file.\
Although I didn't try it myself, I'm pretty sure an Eleventy site can do the same through use of that SSG's [data cascade](https://11ty.dev/docs/data-cascade), perhaps in a manner very similar to what [Aleksandr Hovhannisyan](https://www.aleksandrhovhannisyan.com/) [once described](https://www.aleksandrhovhannisyan.com/blog/eleventy-build-info/).

[^notData]: To any purists tempted to complain about my using a YAML file to hold data, rather than serve only for configuration purposes as The File Format Gods surely intended: be aware that I had [four choices](https://gohugo.io/templates/data-templates/) --- JSON, TOML, XML, and YAML --- and I simply found it easier to make the shell script write a valid file in YAML than in any of the other three formats.

## 1. Populate the Git data

Put the following shell script at the top level of your Hugo project (I recommend adding it to your `.gitignore` file[^scope]):

[^scope]: And don't be tempted, as I was, to incorporate the shell script into your build process on the host so you can automate the data-population there rather than having to do it manually on your local setup. I mean, sure, you can **try**; but it won't work because, again, the host is doing a shallow clone --- and you can't change that, whether through a shell script or an environment variable or any other possibility. Otherwise, there'd be no need for all this foolishness in the first place, right?

{{< labeled-highlight lang="bash" filename="git-get-data.sh" >}}
#!/bin/bash
rm -rf data/gitoutput.yml # avoid appending to existing file
echo "Getting git data . . ."
printf "gitinfo:\n" >> data/gitoutput.yml
cd content
git ls-tree -r --name-only HEAD | while read filename; do
  printf "\055 FilePath: $filename\n$(git log -1 --all --pretty=format:"  Hash: %H\n  AbbreviatedHash: %h\n  LastmodDate: %cI" -- $filename)\n" >> ../data/gitoutput.yml
done
{{</ labeled-highlight >}}

**Note**: This will work fine in macOS or Linux; but, if you're using Windows, you'll need to run it in [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).\
Also, be aware that using `git log`, as this script does, is slow and tends to be pretty rough on your CPU, getting only more so as the size of the examined repo grows.
{.box}

Then, after you've [given it the necessary file permissions](https://kb.iu.edu/d/abdb), run it:

```bash
./git-get-info.sh
```

This will create a `gitoutput.yml` file in your Hugo project's `data/` folder. It will have the following information for each file in your project's `content/` folder and its subfolders:

- **FilePath**: Its relative path, which Hugo knows for it as [`.File.Path`](https://gohugo.io/variables/files/).
- **Hash** and **AbbreviatedHash**: Its Git hashes, both full and abbreviated.
- **LastmodDate**: The timestamp, in [ISO 8601 format](https://jkorpela.fi/iso8601.html) (the same one you use in the `date` parameter of a Hugo content file's front matter), of its most recent commit.

For example, here are the first few lines (as of this writing) of such a file in my project, starting at the top:

```yaml
gitinfo:
- FilePath: _index.md
  Hash: 13758a26c236ebfcd671a5ea68b49a44e800a764
  AbbreviatedHash: 13758a26
  LastmodDate: 2022-06-28T10:32:00-05:00
- FilePath: about/index.md
  Hash: 6e519e5ad84a428ef866a43e141f85ef26f8928b
  AbbreviatedHash: 6e519e5a
  LastmodDate: 2023-02-06T16:54:28-06:00
- FilePath: contact/index.md
  Hash: 44612d3f769e4c8389e7ba3774af11a67ea1f121
  AbbreviatedHash: 44612d3f
  LastmodDate: 2023-02-25T12:06:57-06:00
- FilePath: posts/2018/09/hardy-press-wp-ssg-with-twist.md
  Hash: 0c39ea06828dd33832a070f8f05f2860398a0d1c
  AbbreviatedHash: 0c39ea06
  LastmodDate: 2023-02-19T14:59:49-06:00
```

## 2. Access the Git data

Now, build the templating to access and display this data. Here are the relevant parts of the partial template I use for this purpose. Note that:

- We loop through the data with a [`range`](https://gohugo.io/functions/range/).
- We have to provide variables **before** the `range` for things that otherwise would be outside of the `range`'s context (and thus ignored therein).
- Although I don't typically use it myself, I've included the `AbbreviatedHash` so you can see where it might go.
- I've also provided a variable, `$MyRepo`, to fill in for *your* own repo URL.[^repoURL]

[^repoURL]: The URL structures thereafter are based on how GitHub works so, if your repo is on a different service, you obviously should change this example accordingly to fit the URLs for what you're using.

```go-html-template
{{/* start, variables for context in `range` */}}
{{- $FilePath := .File.Path -}}
{{- $PubDate := .PublishDate.Format "2006-01-02" -}}
{{- $Title := .Title -}}
{{- $MyRepo := "https://github.com/johndoe/hugo-site" -}}
{{/* end, variables for context in `range` */}}
{{- range $.Site.Data.gitoutput.gitinfo -}}
	{{- if eq $FilePath .FilePath -}}
		<p class="ctr legal">
			<a href="{{ $MyRepo }}/commit/{{ .Hash }}" title="Latest commit for this page" rel="noopener">{{ .AbbreviatedHash }}</a> ({{- if ne $PubDate (.LastmodDate | time.Format "2006-01-02") }}{{ .LastmodDate | time.Format "2006-01-02" }}{{- else -}}same date{{- end }}) &bull; <a href="{{ $MyRepo }}/commits/main/content/{{ $FilePath }}" title="This page’s commit history">History</a>
		</p>
	{{- end }}
{{- end }}
```

## It works, but . . .

This obviously is a bit less convenient than the more automatic methods I explained in those earlier posts. Perhaps the most onerous part is that, after **each** new commit of *any* content page where you want to display the Git data, you'll have to (a.) re-run the shell script and (b.) commit the newly changed YAML data file. That'll get old in a hurry if you make frequent changes to your project.

Still, it works. So, if you prefer to deploy to your host's native UI yet still want that Git goodness that normally comes only from using CI/CD, now you know how to get there. And, no, that's not a pun. I think.

**Update, same day**: Thanks to [Joe Mooring](https://github.com/jmooring) and [Rodrigo Alcaraz de la Osa](https://fisiquimicamente.com/); their [helpful comments](https://discourse.gohugo.io/t/gitinfo-and-fetch-depth-when-using-host-gui/43156) contributed greatly toward post-publication revisions to improve this article's accuracy!
{.box}
