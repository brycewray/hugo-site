---
title: "Ec-static"
description: "Some tips for ordinary non-geeks on using the Hugo static site generator to create and maintain their own websites."
author: Bryce Wray
tags: [web-development, static-site-generators, ssgs, hugo, wordpress, macos, linux, windows, infosec, website-performance]
date: 2019-04-07T14:00:00-05:00
---

**Note from the future**: You're probably better off with the approach I mention in 2022's "[Really getting started with Hugo: four simple steps](/posts/2022/07/really-getting-started-hugo-four-steps)," but I'm leaving this here for archival purposes and the sake of [transparency](/posts/2019/10/otoh/).
{.yellowBox}

Want to share your thoughts on the web? [Good for you](https://ia.net/topics/take-the-power-back).

Considering using [WordPress](https://wordpress.org) to do it? Ahhh, not so good.

Let me suggest a better way: use a [static site generator](https://staticgen.com) (SSG).

What's the difference? Plenty.

## BadWordPress

In essence, WordPress, like any other content management system (CMS), [builds its pages dynamically out of a database](https://360ideas.com/blog-web-design-how-does-a-cms-content-management-system-work/), while a [static site](https://dzone.com/articles/6-reasons-why-you-should-go-for-a-static-website) has real page files. The CMS method has two inherent problems from the get-go:

- **Performance** --- Each and every instance of a "hit" requires action from the database, which simply can't be as fast as pulling up a static page. To paraphrase the great [Montgomery Scott](https://scifi.fandom.com/wiki/Montgomery_Scott), "Y' can't change the laws o' physics, Captain."
- **Security** --- The CMS database, like any other with at least some exposure to the web, can fall prey to things like [SQL injection](https://en.wikipedia.org/wiki/SQL_injection) exploits. In plain language, it's easier for nasty people to crack.

Beyond that, a WordPress site almost always depends on multiple [plugins](https://ithemes.com/tutorials/what-are-wordpress-plugins/) --- in some cases, [’way too high numbers thereof](https://wplift.com/how-many-wordpress-plugins) --- which present their own performance penalties and, if not kept constantly updated, security risks. Keep in mind that many plugins are the products of individual developers who, as you can understand, have Day Jobs and simply don't have the time or resources to maintain the plugins properly. (Worse still, many plugins have flat-out been abandoned by their developers but remain in use on countless WordPress sites, making those sites even more vulnerable.)

WordPress sites attract the attention of nasty-intentioned people because fully [one third of the websites *in the world* are based on WordPress](https://w3techs.com/technologies/details/cm-wordpress/all/all). Having a WordPress site, especially when you have other options[^options], is like painting a big target on your back, or wearing a "KICK ME" sign on your behind, or --- well, you get the idea.

[^options]: And, by "when you have other options," I mean where it's your choice. If it's just you doing your thing, creating your content, and so forth, you have a choice. If you're doing it for someone else and/or multiple people must create content for it through a GUI, you may not have a choice.

## No static at all from static

By contrast, the web pages that originate from an SSG load like lightning, especially since static pages can be [cached](https://www.maxcdn.com/one/visual-glossary/static-content/) for even better performance, and they aren't vulnerable to database exploits because they don't *use* databases. A static site vs. a database-driven site is like looking at a snapshot vs. waiting for somebody to paint the image. Well, okay, I'm exaggerating; but the analogy is sound, even if the relative disparities aren't quite that stark.

But perhaps you've read some of the articles out there about SSGs and thought, "Gee, that sounds too complicated." After all, one appeal of WordPress is that it's easy to install and, if set up properly, easy to use. I admit there are a few more steps, a bit more geekiness, to getting started with an SSG-powered site. However, it's really not as complicated as a lot of the articles make it sound. So, if you do have interest in it, let me walk you through setting up a site on [Hugo](https://gohugo.io), which I believe is the best SSG for beginners.

Just so we're clear up-front: I am not saying installing and using Hugo is **super**-simple. This is not a "[There is no Step 3](https://en.wikipedia.org/wiki/IMac#History)" situation. But I promise I'll keep it as simple as it will allow. For best results, you do need at least some familiarity with using your operating system's [command-line interface](https://en.wikipedia.org/wiki/Command-line_interface) (**CLI**) app --- **Terminal** on a Mac or Linux system, or **Command Prompt** in Windows.[^htmlcss]

[^htmlcss]: In time, you'll also want at least some familiarity with HTML and CSS (and, if possible, SCSS), but you can get a bare start with just what's described herein.

These instructions are based heavily on Hugo's [Quick Start page](https://gohugo.io/getting-started/quick-start/). While I think that documentation is fine as-is, it can be hard to follow depending on which system you're using; I'm trying to make this page a one-stop shop.

## Steps to a static site

<span class="red">**IMPORTANT**</span>:

- All of these instructions presume you have **full administrative rights** to the system you're using, whether it's a Mac, a Windows PC, or a Linux system. If you don't, stop now because you simply won't be able to do it (and shouldn't be trying). Period.
- Each time you see a command to enter, make it easier on yourself and just **copy/paste** it from the {{< highlight plaintext "hl_inline=true">}}text that looks like this{{< /highlight >}} in the entry. **Don't** try to re-type it because, in all probability, you'll miss something, mistake a page-forced line break for a return character, *etc*. Also, when you copy, be sure to select the **entire** entry, including anything that may require scrolling to the right, and also **not** to select any **extraneous** characters (such as spaces) on the end. These commands have to entered exactly as shown --- no more, no less.
{.indentAfterLI}

### STEP 1: Install Hugo.

#### Step 1 for Mac/Linux

1. Open the **Terminal** CLI app.

2. If you already have the [**Homebrew** package installer app](https://brew.sh) installed, skip to the next item.\
\
Otherwise, install Homebrew by copying/pasting the following into Terminal and pressing **Return** or **Enter**:
{{< highlight bash "linenos=false" >}}
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
{{< /highlight >}}

Once the Homebrew installation is complete, go on to the next item.
{.indentAfterLI}

3. [Install Hugo](https://gohugo.io/getting-started/quick-start/) by copying/pasting the following into Terminal and pressing **Return** or **Enter**:
{{< highlight bash "linenos=false" >}}
brew install hugo
{{< /highlight >}}

#### Step 1 for Windows

1. Open the **Command Prompt** CLI app (*cmd.exe*) as an admin-level user (right-click the app's icon and select **Run as Administrator**).

2. If you already have the [**Chocolatey** package installer app](https://chocolatey.org) installed, skip to the next item.\
\
Otherwise, install Chocolatey by copying/pasting the following into the Command Prompt app and pressing **Enter**:
{{< highlight powershell "linenos=false" >}}
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
{{< /highlight >}}

Once the Chocolatey installation is complete, go on to the next item.
{.indentAfterLI}

3. [Install Hugo](https://gohugo.io/getting-started/installing) by copying/pasting the following into the Command Prompt app and pressing **Enter**:
{{< highlight powershell "linenos=false" >}}
choco install hugo -confirm
{{< /highlight >}}

### STEP 2: Create your new site.

1. Use your system's CLI app to navigate to the location on your computer where you want to create the local version of your new site.

I would suggest picking a location that's [backed up and/or sync'd](/posts/2019/02/back-up-jack/). For example, on my Mac, I put my local Hugo sites in iCloud Drive. On a Windows PC, you may want to use OneDrive. On either, you might choose Dropbox if that's your cloud vendor of choice.[^syncGit]
{.indentAfterLI}

2. Copy/paste the following into the CLI app and press **Return** or **Enter**:
{{< highlight bash "linenos=false" >}}
hugo new site mysite
{{< /highlight >}}

This command will create a new *mysite* directory in that location, and *mysite* will have various subdirectories of its own.[^mysite] One of those is called *themes*, which brings us to **STEP 3**.
{.indentAfterLI}

[^syncGit]: Since writing this, I have learned there are different opinions about whether it's a good idea to mix a Git repository with cloud sync, since the whole idea of a Git repo is to keep track of versions going back as far as necessary and some cloud sync operations have at least the potential to disrupt some of that. All I can say for my own experience is that it hasn't been a problem, but you should make sure your cloud setup is **not** set so that it won't keep local copies of any inactive files (*e.g.*, on a Mac, make sure iCloud is **not** set to "Optimize Mac storage"; see also [this post](/posts/2019/05/boxed-in/)), since deviations between what Git expects to see and what's actually on your drive can lead to utter Git chaos. Having seen that occur, I can assure you: you do **not** want that.

[^mysite]:If you want to call it something other than *mysite,* type that instead of *mysite* in that line. Be sure the name has no spaces; you can use hyphens or underscores to separate words, such as *my-site* or *my_site*, if you prefer. For the remainder of these instructions, we'll continue to use *mysite* as the example name.

### STEP 3: Add a theme.

Like most site-building technology, Hugo uses *themes* to make a site look and perform in certain ways. The [Hugo Themes page](https://themes.gohugo.io) has many from which to select, and the number grows almost daily. To keep it simple, I'm going to pick one that's not only *called* [Basic](https://themes.gohugo.io/hugo-theme-basic/) but really *is* basic, yet is eye-pleasing.[^themes] By the way: most of the themes tell you to use [Git](https://git-scm.com) to install them, but also give you a non-Git option in case you're not using and/or familiar with Git. Again, I'm trying to keep it simple, so this will be the non-Git choice.

[^themes]:You can start with it and customize as you get more comfortable; you also can change to a different theme at any time by just repeating **STEP 3**, except with a different theme!

1. If necessary, use your system's CLI app to navigate back to that *mysite* directory you created in **STEP 2: Create your new site**.

2. Use your web browser to visit [https://github.com/siegerts/hugo-theme-basic](https://github.com/siegerts/hugo-theme-basic) and click the green **Clone or download** button.

3. In the resulting **Clone with HTTPS** dropdown, click **Download ZIP**.

4. Go ahead with the download:
	- If your browser is set to give you a choice of download destination, select the *themes* subdirectory within *mysite* as the destination for the download of *hugo-theme-basic-master.zip* and let the download proceed (by clicking **OK** or **Save**, depending on the browser and the method).
	- If your browser automatically downloads to a fixed location (such as a *Downloads* folder), manually move or copy the downloaded .zip file from that location to the *themes* subdirectory within *mysite*.

5. In the *themes* subdirectory within *mysite*, if necessary (*e.g.*, Macs generally do this automatically), expand the *hugo-theme-basic-master.zip* file to that same subdirectory. This will then produce the following setup:
{{< highlight plaintext "linenos=false" >}}
	- mysite
		- themes
			- hugo-theme-basic-master
{{< /highlight >}}

### STEP 4: Add some content.

All the textual content --- the *posts* --- that you'll be adding in the future will be in the form of [Markdown](https://daringfireball.net/projects/markdown) files with [front matter](https://gohugo.io/content-management/front-matter/) that tells Hugo how to handle them. However, Hugo can get you started with that very simply:

1. If necessary, use your system's CLI app to navigate back to that *mysite* directory you created in **STEP 2: Create your new site**.

2. Copy/paste the following and then press **Return** or **Enter**:
{{< highlight bash "linenos=false" >}}
hugo new posts/my-first-post.md
{{< /highlight>}}
This will create a new Markdown file, *my-first-post.md*, which produces this arrangement:
{{< highlight bash "linenos=false" >}}
- mysite
	- content
		- posts
			- my-first-post
{{< /highlight >}}

Hugo "knows" that the *content* subdirectory within *mysite* is, in essence, the top level of the site's content, so that's why you didn't have to include ```content``` within that command above.
{.indentAfterLI}

You can edit this and any other Markdown file with a plain-text editor, which every OS includes free of charge, or any of the many great Markdown apps out there (some of which also are free of charge, or very nearly so). When you want to add content, just create a new Markdown file in the *content* subdirectory.
Until you're comfortable with setting up the Hugo front matter, you can simply create each file with Hugo itself as described in this step[^draft] and then edit it separately with your chosen text editor.
{.indentAfterLI}

Also, I'd suggest creating some sort of logical structure to make things easier for both you and your visitors to find --- for example, I arrange my posts according to year and month, as you can see in this page's URL --- but that's totally up to you.
{.indentAfterLI}

[^draft]: The default for this method of content creation is that the file will be a **draft**, which means it might not necessarily show up when you run Hugo's server as described in **STEP 5**. To get around that, just set the front matter's *draft* parameter to *false* (assuming you're ready for that content to be visible!).

### STEP 5: Start the Hugo server.

In order to see what's going on in your browser, you now have to start Hugo's built-in web server. This is one of the coolest things about Hugo, because it builds giant websites at staggering speed, far more quickly than the vast majority of other SSGs. The [Smashing Magazine site](https://www.smashingmagazine.com) is built on it.

1. If necessary, use your system's CLI app to navigate back to that *mysite* directory you created in **STEP 2: Create your new site**.

2. Copy/paste the following and then press **Return** or **Enter**:
{{< highlight bash "linenos=false" >}}
hugo server -D
{{< /highlight >}}

This starts the Hugo server with [*drafts*](https://gohugo.io/getting-started/usage/#draft-future-and-expired-content) enabled.[^drafts]
{.indentAfterLI}

[^drafts]: This will help while you're creating content; normally, you'd just use ```hugo server``` without the ```-D``` on the end, because you wouldn't publish a file if it was still a draft. The default for that command you used in **STEP 4: Add some content** is to create a draft file.

3. **To view your locally-hosted site**, use your web browser to visit ```http://localhost:1313/```.

You'll see that it already has one post listed, *my-first-post*, from what you did in **STEP 4: Add some content**. The resulting URL for it is:\
```http://localhost:1313/posts/my-first-post/```.
{.indentAfterLI}

The ```content``` part doesn't appear in the URL, since --- again --- the *content* subdirectory is the top level of the site.[^urlinfo]
{.indentAfterLI}

[^urlinfo]: The ```http://localhost:1313``` URL will work only on that system, since ```localhost``` means, well, just what it says. In time, you may want to see and test the site on other devices on your local wi-fi or Ethernet-connected network. If so, the [command to use](https://discourse.gohugo.io/t/hugo-server-only-serves-to-host-computer/5664/6), instead, is (*not* including the "drafts" stipulation here, since by the time you get to using this your knowledge will have advanced to the point where you'll probably no longer need the "drafts" thing): `hugo server --bind=$IP--baseURL=$IP:1313` --- where **$IP** represents the local IP address for the system where you're running the Hugo server. Then, on the other devices, you could visit `http://$IP:1313` to view the locally hosted site. If you're not comfortable figuring out your system's locally assigned IP address, just stick with viewing it only on the same system for now; it's not that critical, especially with nearly every modern browser possessing responsiveness emulation modes so you can see pretty clearly how a page will look on other devices.
{.indentAfterLI}

### STEP 6: Publish the site to the web.

Actually, I'm going to leave that one to a separate article which I'll provide soon, because (a.) this is already a pretty long one and (b.) you won't be quite ready to publish the site until you've had time to create some content for it. So, for now, go ahead and work on that part. Soon, I'll have the next article up for you so you can see what to do next.

However, if you just can't wait, the spoiler is that I'm going to show you how to [publish to a blazing fast, static-site-loving place called Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/) --- absolutely for free. Cool, right? You have no idea. More to come.[^gitfear]

[^gitfear]: And if you do cheat ahead to check out that link, don't worry too much about its reliance on Git CLI commands. Check out what I said in [this post](/posts/2018/10/version-control-follies/) and you'll see that the real thing I'm going to suggest will be much easier.
