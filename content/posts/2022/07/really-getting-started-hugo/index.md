---
title: "Really getting started with Hugo"
description: "Since the officially recommended approach tends to frustrate new users, let’s see whether we can do something about that."
author: Bryce Wray
tags: [web-development, static-site-generators, ssg, hugo, go-golang, version-control, git]
date: 2022-07-19T10:55:00-05:00
#initTextEditor: **iA Writer**
---

**Update, 2022-07-20**: It was [suggested to me](https://discourse.gohugo.io/t/proposed-method-for-new-users/39596/2) that I provide only the *steps* in this post, *without* the explanatory lead-in. That way, the intended targets --- new Hugo users --- would get the good stuff right from the start. [So I did, in a follow-up](/posts/2022/07/really-getting-started-hugo-four-steps/).
{.yellowBox}

We've all tried to assemble something by following a set of written instructions. More than a few of those times, we've realized that the instructions either weren't complete or were just plain wrong (sometimes both). On certain occasions of this type, we've been even more perplexed by also seeing that some of the expected parts were missing.

A huge problem in getting new users to try the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG) is that you can't simply point them to the documentation about getting started. As I will explain below, it omits one key step of the startup process in favor of another which isn't nearly as helpful.

Worse still, a default Hugo site is missing some elements which would help a new user successfully get going even *without* that missing step.

As a result, many who sample Hugo wind up frustrated and, probably more often than one might think, decide it's not for them. I've read more than a few such gripes on various tech forums.

Herein, I offer a possible solution.

## What's the point?

First, let's understand the problem we want to solve.

Here's a 50,000-foot view of how I think a new Hugo user *should* get started:

1. Install Hugo.
2. Use a one-line Hugo command to create a Hugo project.
3. Add a minimal number of bare-bones files so the project can generate a working website.
4. Use another one-line Hugo command to run its development server, so the user can see how the website looks.

And that's really it. But the current process omits Step 3, and that's a show-stopper for most new folks. Instead, Hugo's ["Quick Start" documentation](https://gohugo.io/getting-started/quick-start/) tells you to install a [theme](https://themes.gohugo.io), almost as "training wheels" for one's "ride" with Hugo.

That works, at least in the sense that a theme will *include* all necessary layout files plus some sample content files; and it's how many of us, including Yours Truly nearly four years ago, first learned how to get under Hugo's hood. Indeed, I've [given that exact advice](/posts/2020/12/eleventy-hugo-comparing-contrasting/#themes) to prospective new Hugo users.

But, now, I see there are problems with relying so thoroughly on a themes-oriented approach:

- Some themes' code is really out of date compared to how Hugo works these days, but new users (obviously not knowing any better, as they surely can't) still pick those themes, only to learn that certain stuff doesn't work *or* works strangely *or* doesn't square with what more seasoned Hugo users advise online --- *et cetera.*[^Ananke]
- Regardless of whether a theme is sufficiently current, its code may be so *involved*, for lack of a better word, as to look absolutely opaque to a new user.[^Ananke] After all, Hugo's [Go](https://go.dev)-based templating looks *very* different from that of other SSGs, so even simple stuff can look daunting at first, and more complex stuff **definitely** does.
- If a new user becomes too dependent on a theme for either of these reasons or any others, we get into the "Give-a-man-a-fish" territory rather than the "Teach-a-man-to-fish" realm toward which the onboarding of new Hugo users should aim.

[^Ananke]: In all fairness, I will concede that [Ananke](https://themes.gohugo.io/themes/gohugo-theme-ananke/), the specific theme the Hugo documentation recommends for a new user, *is* faithfully maintained by [The New Dynamic](https://www.thenewdynamic.com/), a firm that's well-known for expertise in both web development and design in general. That said, I think Ananke lacks sufficient code documentation for a new user's comfort *and* just flat-out has a [lot more than a new user needs or may even want](https://github.com/theNewDynamic/gohugo-theme-ananke), thus providing unnecessary complexity. One who is just learning how to play the piano probably shouldn't be given sheet music from a Mozart composition; basic scales make a better starting point.

In an admirable attempt to get around such problems while still honoring the documentation's "newbies-should-use-themes" stance, [Andrew Quinn](https://andrew-quinn.me/) has created [`hugo-plain-theme`](https://github.com/hiAndrewQuinn/hugo-plain-theme). It's ultra-simple, includes clear instructions, and delivers the intended result.

So, what could be the problem with that?

Well, the existence of `hugo-plain-theme` still doesn't address the main issue, as I see it: *i.e.*, people should first learn how to get started in Hugo *without* themes, period. A theme should be *optional*, not required --- even if it's as well-thought-out and (mostly[^HPTalso]) newbie-friendly as Quinn's. There's an "aha" moment that a new user must achieve in order to have a chance at getting comfortable with Hugo. That "aha" moment is much more likely to arrive if that user hasn't first depended solely on using a theme.[^HPTalso]

[^HPTalso]: Additionally, there are even a few complexities where `hugo-plain-theme`'s instructions are involved --- notably the [mention of Git submodules](https://github.com/hiAndrewQuinn/hugo-plain-theme#or-use-this-very-repo-as-a-submodule-instead) --- which probably detract from the theme's intended newbie-friendliness.

By the way: back in 2015, a contributor to the Hugo documentation [claimed](https://discourse.gohugo.io/t/hugos-default-theme/2169) that this themes-first/defaults-deficient approach was a feature (especially for those who *create* themes), not a bug:

> On the surface, that seems like odd behavior, but it's actually a very good thing. It allows users to easily customize your theme without changing any of the files in your theme. That makes it very easy for them to update their files when you release an upgrade to your theme since their changes are completely outside of your theme.

Well, perhaps. But I'm of the opinion that, before taking care of theme creators, Hugo's docs and defaults should make it easier for users who are utterly new to this powerful, but different, SSG.

Imagine someone coming over to Hugo from, say, WordPress. Navigating the chasm between WordPress and *any* SSG is already challenging enough without the additional variances between Hugo and other SSGs, many of which seem considerably friendlier to new users.

So let's move on to what I think would be a much more likely Happy Path where learning Hugo is concerned.

**Note**: The following instructions are for only the two major computer operating systems for consumers, Windows and macOS, because I frankly doubt Linux users *need* help.
{.blueBox}

----

## Step 1 • Install Hugo

Hugo is an app that you install on your computer. You can do that by either (a.) relying on a *package manager* app or (b.) directly downloading from the Hugo GitHub repository. Although I personally prefer the second method[^directDownload], most new users likely will find the first easier; so let's go with package managers. Below, for each OS, is an explanation of how to do that. Click the appropriate one to toggle its view. Each shows how to install **Hugo Extended**, which is *always* the preferred version.

[^directDownload]: The main thing I like about the direct-download method is that I can get a new Hugo version as soon as it's available in the GitHub repo. With a package manager, you have to wait for the new version to be added to *that* app's collection; although the accompanying delay often is only a few hours, it has occasionally stretched to multiple days.

### macOS

<details><summary>Click/tap here to toggle open/close.</summary>

1. Open the **Terminal** app.
2. If you already have the [**Homebrew** package manager app](https://brew.sh) installed, skip to the next item.\
Otherwise, install Homebrew by entering the following via Terminal:
{{< highlight bash "linenos=false" >}}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
{{< /highlight >}}
Once the Homebrew installation is complete, go on to the next item.

3. Install Hugo by entering the following via Terminal:
{{< highlight bash "linenos=false" >}}
brew install hugo
{{< /highlight >}}
This will be the Hugo Extended version, since that's the only one Homebrew includes.\
**In the future**, you can *upgrade* Hugo to the latest version in Homebrew's possession by entering:
{{< highlight bash "linenos=false" >}}
brew upgrade hugo
{{< /highlight >}}

This concludes Step 1 for macOS. You can now toggle this back to "closed."

</details>

### Windows

<details><summary>Click/tap here to toggle open/close.</summary>

1. Open the **Windows PowerShell** app.

2. If you already have the [**Scoop** package manager app](https://scoop.sh/) installed, skip to the next item.\
Otherwise, install Scoop. First, enter this via Windows PowerShell:
{{< highlight powershell "linenos=false" >}}
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
{{< /highlight >}}
Answer "Y" (for "Yes") to the resulting prompt. Then, enter this:
{{< highlight powershell "linenos=false" >}}
irm get.scoop.sh | iex
{{< /highlight >}}
Once the Scoop installation is complete, go on to the next item.

3. Install Hugo Extended by entering this via Windows PowerShell:
{{< highlight bash "linenos=false" >}}
scoop install hugo-extended
{{< /highlight >}}
**In the future**, you can *update* Hugo to the latest version in Scoop's possession by entering:
{{< highlight bash "linenos=false" >}}
scoop update hugo-extended
{{< /highlight >}}

This concludes Step 1 for Windows. You can now toggle this back to "closed."

</details>

## Step 2 • Create a local Hugo site

This one's pretty simple. Let's say we'll call the new site `my-site`.

1. Go into your user directory on your computer. If your user name on the computer is `JohnDoe`, that would be `/Users/JohnDoe/` in macOS and `C:\Users\JohnDoe\` in Windows.\
From here on, we'll refer to your *terminal app*. On macOS, the default is Terminal. On Windows, you can use either Command Prompt (*cmd.exe*) or Windows PowerShell; I suggest the latter.

2. In your terminal app, enter:\
{{< highlight plaintext "linenos=false" >}}
hugo new site my-site
{{< /highlight >}}
As it creates the site, Hugo will automatically display instructions talking about using a theme but, again, *we're not going there*. Anyway, the result will be a structure like the following in your user directory:
{{< highlight plaintext "linenos=false" >}}
my-site   <-- The Hugo project folder
└─ archetypes
└─ config.toml   <-- The only non-folder
└─ content
└─ data
└─ layouts
└─ public
└─ static
└─ themes
{{< /highlight >}}

Everything from here on takes place in that `my-site` folder. Windows users, please note that we'll refer to `content/` and `layouts/` --- *i.e.*, using **forward** slashes rather than **back**slashes.

## Step 3 • Add minimal files to the site

**Note**: This is **the** missing step, the absence of which makes new users nuts. I've already noted [one opinion from 2015](https://discourse.gohugo.io/t/hugos-default-theme/2169) as to why a default Hugo installation doesn't simply come with files like these. But I think what I'm about to describe will help Hugo novices more quickly understand how the sausage gets made. When they do, they'll "get" Hugo, **not** get lost while *trying* to "get" Hugo.
{.yellowBox}

Each of the files you'll create below is a plain-text file. In macOS, the default text editor is TextEdit. In Windows, it's Notepad. Either is fine for these. Each editor may complain about your adding *.html* or *.md* extensions to these, but you can ignore such messages.[^VSCode]

[^VSCode]: If you're already using a code editor like [Visual Studio Code](https://code.visualstudio.com/) to manage your project, you'll be able to do all of this more readily, but that may be too much to expect from a truly new user.

1. In `layouts/`, add a folder called `_default`.
2. In `layouts/`, create a file called `index.html` with the following content:\
{{< highlight go-html-template "linenos=false" >}}
{{ define "main" }}
	{{ .Content }}
  <p>This line is from <code>layouts/index.html</code>.</p>
{{ end }}
{{< /highlight >}}
`layouts/index.html` is the layout for the site's home page.
3. In `layouts/_default/`, create a file called `baseof.html` with the following content (Hugo's default is for English, so that's why I use `lang="en"`):\
{{< highlight go-html-template "linenos=false" >}}
<!DOCTYPE html>
<html lang="en" charset="utf-8">
<head>
</head>
<body>
	{{ block "main" . }}
	{{ end }}
</body>
</html>
{{< /highlight >}}
`layouts/_default/baseof.html` is, to quote the [Hugo documentation](https://gohugo.io/templates/base/#define-the-base-template), "the shell from which all your pages will be rendered unless you specify another `baseof.html` closer to the beginning of the lookup order."[^lookupOrder]
[^lookupOrder]: The lookup order is explained in [this vital part](https://gohugo.io/templates/lookup-order/) of the Hugo documentation.
4. In `layouts/_default/`, create a file called `single.html` with the following content:\
{{< highlight go-html-template "linenos=false" >}}
{{ define "main" }}
	{{ .Content }}
  <p>This line is from <code>layouts/_default/single.html</code>.</p>
{{ end }}
{{< /highlight >}}
`layouts/_default/single.html` is the default template for a *single page*.[^lookupOrder]
5. In `content/`, add a file called `firstpost.md` with the following content:\
{{< highlight md "linenos=false" >}}
---
title: "First post"
---

This line is from `content/firstpost.md`.

[Go to home](/)
{{< /highlight >}}
6. In `content/` , add a file called `_index.md` with the following content:\
{{< highlight md "linenos=false" >}}
---
title: "Home page"
---

This line is from `content/_index.md`.

[Go to firstpost](/firstpost/).
{{< /highlight >}}
Incidentally, the reason for that underscore in the name `_index.md` has to do with [how Hugo helps you manage content](https://gohugo.io/content-management/organization/#index-pages-_indexmd), but a more detailed explanation thereof is well outside the scope of these intentionally simplified instructions.

7. In the `config.toml` file at the Hugo project's top level, add the following line:\
{{< highlight toml "linenos=false" >}}
disableKinds = ['taxonomy', 'term']
{{< /highlight >}}
(This simply prevents some warning messages that Hugo otherwise will throw when you invoke `hugo server` with this set of files in place.  If you ever do wish to use [these items](https://gohugo.io/content-management/taxonomies/#default-taxonomies), just delete this line from the config file.)

Now, the `my-site` project has the absolute minimum requirement of layouts, content files[^index], and configuration changes **so it will work without complaint** when you run the dev server.

Speaking of which . . .

[^index]: Actually, only `content/_index.md` was utterly necessary where content was concerned, but I thought I'd also throw in the `content/firstpost.md` file just to demonstrate the vital `single.html` template at work.

## Step 4 • Run the dev server

1. In your terminal app, navigate to the `my-site` Hugo project folder (if you're not already working in it) and enter:\
{{< highlight bash "linenos=false" >}}
hugo server
{{< /highlight >}}

2. In your browser, visit the bare-bones site at the URL that the terminal prompts you to visit, which should be `http://localhost:1313/`. The home page will have a link to "firstpost," and *vice versa*.

3. When finished, exit the server by going to the terminal app and using the **Ctrl** **C** key combination.

----

So, there you have it.

I purposely *didn't* mention [Git](https://git-scm.org) version control, or deploying to a host, or any of the other things that may have come to the mind of an experienced SSG user who's just read this proposed method. First, let's let the new user learn to crawl. Later, there will be plenty of time for walking, and then running.

Would this proposed Happy Path be for everyone? No. There probably are individuals who **do** benefit from the current themes-first/defaults-deficient approach to learning Hugo --- but it seems to me that the anecdotal evidence to the contrary has been overwhelming.

A different path might just be the answer. It's certainly worth a try.
