---
title: "Really getting started with Hugo: four simple steps"
description: "Here is just the actual procedure from yesterday’s post about making things easier for new Hugo users."
author: Bryce Wray
date: 2022-07-20T08:56:00-05:00
#draft: true
#initTextEditor: **iA Writer**
---

**Note**: It was [suggested to me](https://discourse.gohugo.io/t/proposed-method-for-new-users/39596/2) that I provide only the *steps* in [yesterday's post](/posts/2022/07/really-getting-started-hugo/), *without* the explanatory lead-in. That way, the intended targets --- new Hugo users --- would get the good stuff right from the start. So, here goes.
{.yellowBox}

If you've been interested in trying the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG), here's a four-step procedure which I believe you'll find easier to follow than the official ["Quick Start" documentation](https://gohugo.io/getting-started/quick-start/):

1. Install Hugo.
2. Use a one-line Hugo command to create a Hugo project.
3. Add a minimal number of bare-bones files so the project can generate a working website.
4. Use another one-line Hugo command to run its development server, so you can see how the website looks.

Now, the details . . .

**Note**: The following instructions are for only the two major computer operating systems for consumers, Windows and macOS. I doubt Linux users, given their likely inclination toward more geeky pursuits, would *need* this kind of help.
{.blueBox}

----

## Step 1 • Install Hugo

Hugo is an app that you install on your computer. You can do that by either (a.) relying on a *package manager* app or (b.) directly downloading from the Hugo GitHub repository. You likely will find the first easier, so let's go with package managers. Below, for each OS, is an explanation of how to do that. Click the appropriate one to toggle its view. Each shows how to install **Hugo Extended**, which is *always* the preferred version.

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

Let's say we'll call the new site `my-site`.

1. Go into your user directory on your computer. If your user name on the computer is `JohnDoe`, that would be `/Users/JohnDoe/` in macOS and `C:\Users\JohnDoe\` in Windows.\
From here on, we'll refer to your *terminal app*. On macOS, the default is Terminal. On Windows, you can use either Command Prompt (*cmd.exe*) or Windows PowerShell; I suggest the latter.

2. In your terminal app, enter:\
{{< highlight plaintext "linenos=false" >}}
hugo new site my-site
{{< /highlight >}}
*(As it creates the site, Hugo will automatically display instructions that mention using a theme --- **but** you can ignore them, because they relate to the aforementioned official procedure to which this is an alternative.)*\
&nbsp;\
The result will be a structure like the following in your user directory:
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

Everything from here on takes place in that `my-site` folder.

**Note**: Windows users, we'll refer to `content/` and `layouts/` --- *i.e.*, using **forward** slashes (the web's norm) rather than **back**slashes.
{.yellowBox}

## Step 3 • Add minimal files to the site

Each of the files you'll create below is a plain-text file. In macOS, the default text editor is TextEdit. In Windows, it's Notepad. Either is fine for these. Each editor may complain about your adding *.html* or *.md* extensions to these, but you can ignore such messages.

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
5. In `content/`, add a file called `firstpost.md`[^Markdown] with the following content:\
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

7. In the `config.toml` file at the Hugo project's top level, add the following line[^disableKinds]:\
{{< highlight toml "linenos=false" >}}
disableKinds = ['taxonomy', 'term']
{{< /highlight >}}

[^Markdown]: If you're unfamiliar with the Markdown (`.md`) format for plain-text files, start with the [original specification](https://daringfireball.net/projects/markdown) and then search for more details.

[^disableKinds]: This simply prevents some warning messages that Hugo otherwise will throw when you invoke `hugo server` with this set of files in place.  If you ever do wish to use [these items](https://gohugo.io/content-management/taxonomies/#default-taxonomies), just delete this line from the config file.

Now, the `my-site` project has the absolute minimum requirement of layouts, content files[^index], and configuration changes so it will work without complaint when you run Hugo's built-in development server.

[^index]: Actually, only `content/_index.md` was utterly necessary where content was concerned, but I thought I'd also throw in the `content/firstpost.md` file just to demonstrate the vital `single.html` template at work.

Speaking of which . . .

## Step 4 • Run the dev server

1. In your terminal app, navigate to the `my-site` Hugo project folder (if you're not already working in it) and enter:\
{{< highlight bash "linenos=false" >}}
hugo server
{{< /highlight >}}

2. In your browser, visit the site at the URL that the terminal prompts you to visit, which should be `http://localhost:1313/`. The home page will have a link to "firstpost," and *vice versa*.

3. When finished, exit the server by going to the terminal app and using the **Ctrl** **C** key combination.

----

So, there you have it. You installed Hugo, created a little starter site, put some files on it, and ran the dev server so you could see what you'd built. Also, you got to see a little bit of the relationship between the templates and content files.

Of course, there are quite a few other SSG-related things you may want to know at some point: version control for safer management of your project(s), website layout/design/styling tips and tricks, and how to deploy your site to a host so it'll actually be on the web --- to mention just a few.

My intent in this post was simply to allow you to get your feet wet with Hugo and see if you like its water temperature; you can decide for yourself when you're ready to learn how to swim, much less scuba-dive. And, when you are, the many SSG-related and Hugo-related resources of the web are as close as your preferred search engine.

Happy Hugo-ing.
