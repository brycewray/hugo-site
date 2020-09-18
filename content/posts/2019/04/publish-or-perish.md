---
layout: layouts/posts/singlepostherofit.11ty.js
tags: post
title: Publish or perish 
subtitle: Going live with your Hugo site
description: In a previous post, I told you how to create a Hugo-based site; now, here’s how to publish it—for free.
author: Bryce Wray
date: 2019-04-12T00:00:00
lastmod: 2019-07-30T01:55:00
discussionId: "2019-04-publish-or-perish"
featured_image: office-blogging-monochrome-381228_5184x3456.jpg
featured_image_width: 5184
featured_image_height: 3456
featured_image_alt: Hand moving a computer mouse near a keyboard
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/photos/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=381228">Free-Photos</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=381228">Pixabay</a></span>
---

This is a follow-up to [my previous post](/posts/2019/04/ec-static/) showing you how to launch a [Hugo](https://gohugo.io)-based [static website](https://dzone.com/articles/6-reasons-why-you-should-go-for-a-static-website). Assuming you followed the instructions in that post and now have a local Hugo site running and looking the way you want on your system, here's how you publish it to the **real** web. Don't be deterred by the length of these instructions; a great deal of this will go very quickly once you actually do it, but **explaining** it is somewhat wordy by nature.

## Keepin’ it easy: Go GUI

First, let me harken back to another [previous post](/posts/2018/10/version-control-follies) in which I described how I manage this site through a great [Atlassian](https://atlassian.com) app called [Sourcetree](https://www.sourcetreeapp.com). Quick summary thereof: yes, you **can** use [Git](https://gitscm.com) commands in a command-line interface app to do what I'm going to describe, but there's no real need for it as long as there are user-friendly [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) [version-control](https://www.atlassian.com/git/tutorials/what-is-version-control) apps like Sourcetree that let you point and click your way to the same final result.

(Please note that Sourcetree is available only for Windows and macOS, so you Linux users---assuming you aren't already familiar with your Linux distro's Terminal app and Git anyway, which frankly is not that likely, but one never knows---will need to use a [different GUI app](https://www.tecmint.com/best-gui-git-clients-git-repository-viewers-for-linux/) to accomplish this.)

## Knowin’ where you're goin’

In that aforementioned post about setting up Hugo, I left you hanging at **STEP 6**, which was:

> **STEP 6: Publish the site to the web.**

*All right, fine; so now what?* you're wondering. Here we go. We'll consider all of these parts of **STEP 6**, and thus I'll label them as such.

### Step 6a: Set up a local repo

Whichever place on the web you plan to publish your site, you need an online [**repository**](https://en.wikipedia.org/wiki/Repository_(version_control)), or **repo**, where your files will be stored and version control will occur. This is how pretty much all the [SSG](https://staticgen.com)-friendly hosting sites work, and it's a good thing because it makes it reasonably easy for you to revert to earlier versions of your content in case things get wonky. But, before you can make the best use of that, you first need a **local** repo on your computer. That's where you'll be practicing **local** version control, and it's where the online or **remote** repo will get its files. We'll get there. Hang with me.

We're going to accomplish this with Sourcetree. First, get Sourcetree by visiting its [website](https://www.sourcetreeapp.com) and downloading/installing the appropriate version for your operating system. You need **administrator-level** access to install software on your system, of course.

Once you have Sourcetree running, Atlassian has a [great help page](https://confluence.atlassian.com/get-started-with-sourcetree/create-a-local-repository-847359103.html) to show you to how to create your local repo, and I really can't improve upon it---except to say: 

1. For our purposes here, the **Destination Path** for the repo would be in the **top-level directory** of your local Hugo site. For example, the local version of this site resides in my iCloud Drive's *hugo-site-css-grid* folder, so that's where I'd be creating my local repo if I were starting from scratch.
2. After you create the repo, you'll see in Sourcetree that it has "read" the files and folders from that directory and is showing a line in its **Description** field that says **Uncommitted changes**. This means it wants you to do a [**commit**](https://confluence.atlassian.com/sourcetreekb/commit-push-and-pull-a-repository-on-sourcetree-785616067.html) action; until you do that, the repo is still empty. So click **Commit** (with the "plus" icon) and, when it switches to the next view:
	- Make sure all the items in the **Pending files, sorted by path** column are checked, meaning they're okay to be added to this commit.
	- Type a little message in the blank field at the bottom to describe what you're doing, such as "My first commit" or something like that. You don't have to list the date or time; Sourcetree will keep that straight for you as part of version control.
	- Click **Commit**.

### Step 6b: Set up a remote account for the repo

As I said before, the repo from which the host will select is not this local one but rather a remote, online repo, and to have that one you have to have a remote location for it. So you'll need to set up an online account with one of the top three hosts for repos, [Bitbucket](https://bitbucket.org), [GitHub](https://github.com), or [GitLab](https://about.gitlab.com). My personal favorite, and the one I'll be using in this example, is Bitbucket.[^repohosts]

[^repohosts]: When I started this site last year, GitHub didn't let you have **private** repos for free (you absolutely don't want your site in a **public** repo), while Bitbucket would, and that was the major reason why I chose the latter. Now, all three of these vendors do so. Nonetheless, I've found Bitbucket just a little easier to use and its documentation a little easier to understand, especially compared to GitLab's; so, even if I were starting fresh today, I'd probably still go with Bitbucket. The one caveat is that, at least as of this writing, Bitbucket offers only fifty build minutes per month for the freebie. Thus, if you anticipate making frequent and extensive changes to your site, you might want to check GitLab instead, because it provides up to 2,000 build minutes per month.

If you go along with me on that, [set up a free Bitbucket account](https://bitbucket.org/account/signup/) and let's keep moving.

### Step 6c: Connect Sourcetree to your Bitbucket account

Now you want to tell Sourcetree how to connect to this new Bitbucket account. No problem; with your Bitbucket account up and running in one browser window/tab, open another window/tab and go to the [applicable Atlassian help page](https://confluence.atlassian.com/get-started-with-sourcetree/connect-your-bitbucket-or-github-account-847359096.html). It shows you what to do.
### Step 6d: Push your local repo to Bitbucket

Now that Sourcetree can talk to your Bitbucket account, use Sourcetree to [**push**](https://confluence.atlassian.com/sourcetreekb/commit-push-and-pull-a-repository-on-sourcetree-785616067.html) the local repo out to that account. When you do, it will automatically create a new remote repo with all the necessary files from your local Hugo site.

Before connecting this repo with the host so your site will actually work, you want to have your own **custom domain**. For example, mine is *brycewray.com*. So&nbsp;.&nbsp;.&nbsp;.

### Step 6e: Get your own domain

There are oodles of sites that sell custom domains. The one I personally prefer is [Namecheap](https://namecheap.com), but choose the one you want. Try to buy a reasonably short one if you can, but mainly just buy one. By default, your chosen domain provider will usually give you preliminary, standby hosting, but that's not important; you'll soon be having it point to what you're about to have. (**Note**: To do that pointing, keep the domain provider's browser window/tab open while you proceed to the next step.)

Now that your Hugo site's files are out in a remote repo and you have a domain for them, it's time to introduce you to the place where all this will become a real website.

### Step 6f: Put the site on Netlify

[Netlify](https://www.netlify.com) hosts SSG sites for free on a highly advanced, eerily fast, [CDN](https://www.webopedia.com/TERM/C/CDN.html)-driven setup and makes it extremely easy to get your content from your remote repo to a real, live website, especially once you've completed the setup I'm about to describe.

The first thing to do is [set up a free Netlify account](https://app.netlify.com/signup). Choose to do it through your newly created Bitbucket account, which will make the rest of this even easier. When Bitbucket prompts you to **authorize** Netlify to use it, let it do so.

The Netlify interface then will bring you to your Netlify **dashboard**. You'll see a button, **New site from Bitbucket**. Click it and follow the instructions that will follow. (You'll once again have to select Bitbucket as your repo provider and grant authorization to Netlify to use it. This may seem cumbersome, but it's all about keeping your files secure.)

You'll be asked to select a Bitbucket repo to use. You probably have only the one we've been talking about up to now but, if by chance, you have more than one, be sure to select the one that's for this site. (You also probably have only one **branch** for that repo; if you're already into [branching with your repo](https://confluence.atlassian.com/bitbucket/branching-a-repository-223217999.html), I really doubt you need my help!)

You'll also be asked for your **build command**---which means just specifying which version of Hugo you want Netlify to use. Select the same version you've been running on your local Hugo setup. If you don't know what that is, open your local system's CLI app and type into it the following command, followed by **Return** or **Enter**: 
```bash
hugo version
```

(This assumes you aren't currently running Hugo on your local system. If you are, you'll need to exit it and then run that command.)

Finally, you'll be asked for your **publish directory**. It should be the same as what your site has, which almost certainly is **publish**.

At that point, click **Deploy site** and Netlify will take it from there. In a few moments, it'll tell you your site has been published ("deployed"). Of course, it'll have a Netlify URL with a randomly generated name, like "wondrous-weasel-d38a82" or something similar. Since you obviously don't want to have to encourage people to visit your site at *wondrous-weasel-d38a82.netlify.com* (well, I hope not, anyway), there's one more thing you have to do, and that's **connect it to that domain** you set up in **Step 6e**. Netlify documentation [tells you how](https://www.netlify.com/docs/custom-domains/), and this is the gist of it:

1. In your Netlify site (i.e., that *wondrous-weasel-d38a82*-type thing---probably in *apps.netlify.com/sites/wondrous-weasel-d38a82/overview*, but your mileage may vary), click **Settings** and then **Domain Management**.
2. In the **Custom domains** panel, the only thing you should see so far is the Netlify-assigned *wondrous-weasel-d38a82*-type thing.
3. Click **Add custom domain**.
4. Enter the domain you obtained in **Step 6e**, then click **Verify**. Netlify will *validate* the domain. Since you've already got it, it will appear as unavailable. (Netlify will, for a fee, get the domain for you at this step if you haven't already obtained it, but I suggest having done so already as described earlier; in my experience, it's best to keep your hosting vendor and your domain vendor separate). The domain you've entered should now appear grayed-out with a **Check [DNS](https://en.wikipedia.org/wiki/Domain_Name_System) configuration** link. Click it for customized instructions as to what to do next. **I recommend using [Netlify's built-in DNS service](https://www.netlify.com/docs/dns/)** of the options you'll see. So, let's say you agree. Then&nbsp;.&nbsp;.&nbsp;.
5. **Back in the browser window/tab with the domain provider's site**, use those Netlify instructions to have the domain's **DNS records** point to your "wondrous-weasel-[whatever]" site. (How you do that will vary by domain provider; Namecheap, my recommended provider, makes it pretty easy as [explained here](https://www.namecheap.com/support/knowledgebase/article.aspx/9837/46/how-to-connect-a-domain-to-a-server-or-hosting#hostingwtrd).)  \
Once you've made this change with the domain provider, it will start world-wide [**propagation**](https://www.namecheap.com/support/knowledgebase/article.aspx/9622/10/dns-propagation--explained). While some domain providers can make that happen within a few minutes, it may take a while---sometimes, a good while, even a day or two. But let's be optimistic and take the "within a few minutes" choice.
6. **Back in the Netlify browser window/tab**, refresh it and see if the custom domain is still grayed-out. Once it no longer is---and, more to the point, when it shows **NETLIFY DNS** next to it---that should mean your site is up and running for real! So, if your custom domain is *mygreatwebsite.com*, see if you can visit your Hugo site at that location. (Truthfully, it'll work with either *www.mygreatwebsite.com* or *mygreatwebsite.com* if the DNS records have been set up as per those Netlify instructions I mentioned before.)

## Going forward&nbsp;.&nbsp;.&nbsp;.

So, once all this is done, how do you update your site in the future when you change an existing post or write a new one? Simple, actually. Your Bitbucket remote repo is connected to the Netlify-based site, so all you have to do is commit any local changes to your local repo and push the commit to the remote repo. Within a few seconds after Netlify "sees" the push, it'll start updating your site with its own Hugo server setup---and, because Hugo's server is **so** fast, your site updates should be out there for the world to see in a minute or two, at the very most.

<hr />

Once more, I apologize for the length of this, especially when combined with its [predecessor](/posts/2019/04/ec-static). I am sure you can find better how-to-SSG guides out there, and I encourage you to search for and find the one that works best with your learning methods[^visual] and knowledge level.

However it ends up, I hope that you enjoy having your own Hugo-powered website as much as I've enjoyed mine so far. Build some content, spiff things up, speak your mind, and have fun!

[^visual]: In particular, you may be one of those folks who learns best from pictures and videos, not wordy instructions like these. If so, you might try the Hugo-related videos on [Mike Dane's YouTube channel](https://www.youtube.com/channel/UCvmINlrza7JHB1zkIOuXEbw) and [this "Deploy Websites In Seconds With Netlify" video](https://www.youtube.com/watch?v=bjVUqvcCnxM), just for starters.