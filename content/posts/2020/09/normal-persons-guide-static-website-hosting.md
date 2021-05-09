---
layout: singlepost
tags: post
title: "A normal person’s guide to static website hosting"
subtitle: "Where your site should “live”"
description: "After suggesting how a non-geek could most easily have a website, I now offer thoughts on the site’s hosting."
author: Bryce Wray
date: 2020-09-26T13:55:00-05:00
lastmod: 2020-10-01T06:45:00-05:00
#draft: true
discussionId: "2020-09-normal-persons-guide-static-website-hosting"
featured_image: "tim-mossholder-GOMhuCj-O9w-unsplash_9000x6000.jpg"
featured_image_width: 9000
featured_image_height: 6000
featured_image_alt: "Neon sign, “This must be the place,” mounted on a colorful grid pattern"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@timmossholder?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Tim Mossholder</a>; <a href="https://unsplash.com/s/photos/website?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

In the [last post](/posts/2020/09/normal-persons-guide-static-websites), I made suggestions about how a normal, non-geeky person---*i.e.*, someone very unlike Yours Truly---could have the most painless experience in putting together a static website of his or her own.

However, I didn't go quite far enough, because I left out the whole question of *where* on the web that site should "live." In other words, I didn't get into the question of **static website hosting**. But this post will fix that,  I hope. So, [dig we must](https://www.bondbuyer.com/news/dig-we-must-cities-and-states-on-their-own-coping-with-the-new-fiscal-reality)&nbsp;.&nbsp;.&nbsp;.

## The basics

As the last post explained, a static website involves a lot less trouble on the hosting end of the equation than a *dynamic* website, such as one built on WordPress or the like, because a static website is just a collection of files that can be delivered quickly, rather than "living" as elements on a database that must be regenerated on each new visit.

In short, hosting a static website means just having a place out on the Internet where those files can exist.

## Hosts to avoid

In the last post, I was positive first, then negative---explaining which static site generators (SSGs) I *did* recommend before steering you away from those I felt would be more trouble than a non-geek would want to handle. In this piece, though, I'm reversing course: first, I'll tell you which hosts you **shouldn't** consider, and only then will I list the three I **do** recommend.

Why the difference? Because website hosting is more mainstream than SSGs, so it's likely you've already heard about some of the big dogs, especially the ones who advertise heavily in mass media. I mean, you never saw Danica Patrick featured in commercials for SSGs, right?

And it's those big dogs in the site-hosting business that **absolutely are wrong** for SSG-built sites. That's because the "name" hosts---or, as I will call them from here on, *old-style hosts*---are from a different era of website hosting, one in which you had to do a manual upload of files every time you changed something. While you can hold your mouth right and make an SSG-built site work on them, there are far better ways to do so. The old-style hosts simply are from the pre-[Jamstack](https://jamstack.wtf) era, and it shows.

Besides, hosting a site on an old-style host is almost never free. Indeed, it often seems that every single interaction with an old-style host involves an (often obnoxious) attempt to sell you, over and above what you're already paying for the hosting itself, yet another feature that your site doesn't even need.

By contrast, all three of the more contemporary hosts that I'm going to suggest have **generous free tiers** which should more than handle all but the most ambitious static site, and certainly anything that's just a hobby-level site (like, um, the one you're reading now, which has survived just fine in such free tiers from its inception and, if I have anything to say about it, will continue to do so).

## Where to go

So, if the old guard *isn't* suited to hosting a static site, what makes these more modern options more attractive? Each has, all for free:

- **Simple and quick deployment** of your files to its infrastructure, through your choice of either manually uploading files (yes, like with old-style hosts) or the safer, more efficient method of [commits](https://en.wikipedia.org/wiki/Commit_(version_control)) to an online [Git repository](https://www.atlassian.com/git/tutorials/what-is-git).[^1] And don't worry about the latter: there are plenty of apps that provide easy ways to manage that through user-friendly graphical user interfaces (GUIs). I can personally recommend the free [Sourcetree](https://www.sourcetreeapp.com) (as noted two years ago in "[The version-control follies](/posts/2018/10/version-control-follies/)") and the definitely-not-free-but-worth-it [Fork](https://git-fork.com/), but there are [numerous others out there](https://www.hostinger.com/tutorials/best-git-gui-clients/); just search for "graphical git client."
- **Custom-domain support** so you can take your pre-purchased *mywebsite.com* domain and connect it to the vendor's site easy-peasy. (Otherwise, you'll have to live with the vendor's auto-generated URL, which can be pretty squirrelly-looking.) Each of the recommended vendors walks you through that practice when you're ready.[^2] Along with that comes **automatic SSL certificate issuance**, so your website gets that *HTTPS* goodness that browsers, and savvy visitors, expect these days. 
- **A worldwide content delivery network (CDN)**---copying your site files out to multiple servers located around the world---so your site gets seen as quickly as possible by visitors from everywhere, rather than those visitors’ having to pull your pages from just one "source of truth" that may, in fact, be halfway around the globe from them. Please note that none of the three vendors actually has its own CDN but, instead, leverages a number of major-league CDNs and cloud-storage providers to provide the same functionality. With the old-style hosts, you'd have to string that together yourself; with these vendors, it's an indispensable part of the package.

Those who read my July post, "[Goodbye and hello](/posts/2020/07/goodbye-hello)," already know the static-site-savvy hosts I'm going to recommend, since they're the ones I've considered---and used---on this site and others during recent testing and what I've ruefully called "[the lurch](/posts/2020/09/goodbye-hello-part-5)."[^3] But, unlike that post, I'll keep my assessments here strictly in line with what the aforementioned *normal* static website owner, not a nerd like me, should seek in choosing a host.

In order of greatest attractiveness to a normal person needing hosting for a static website, here are my recommended hosting vendors. *(For even more details about each, albeit more than you may want, please see also the "[Goodbye and hello](/posts/2020/07/goodbye-hello)" post I mentioned before. Whether you want to go down the rabbit hole of reading its [four](/posts/2020/07/goodbye-hello-part-2) [subsequent](/posts/2020/08/goodbye-hello-part-3) [follow-up](/posts/2020/09/goodbye-hello-part-4) [posts](/posts/2020/09/goodbye-hello-part-5) is totally up to you.)*

### \#1: Netlify

Very simply, you can't go wrong with [Netlify](https://netlify.com). It makes getting a static site on the web and updating it as close to drop-dead simple as it gets---as I wordily described in "[Publish or perish](/posts/2019/04/publish-or-perish)"---and even free-tier users get more than decent support from Netlify's company-supported [online forum](https://community.netlify.com).

#### Strengths

- Ease of use.
- Large, helpful community. You won't have to look far to find help, even "newbie"-friendly help, with a Netlify-hosted static site.
- Longevity where it counts. Netlify has been involved with static sites the longest, and is more centered around supporting them, as compared to the other two vendors. This also translates to a lot more company-provided documentation, through the sheer number of years Netlify has been at it.

#### Weaknesses

- Of these three vendors, only Netlify gives its free tier a lower-performance CDN setup. The fewer points of presence (POPs) a CDN has, the less quickly it will deliver content to your visitors; Netlify's free-tier CDN offering has only a handful to cover the entire world. (To get the only other CDN package from Netlify, the enterprise-class version with many more POPs and higher-quality connectivity, you'll be in for at least $100 a month.)
- The free tier allows only 300 build minutes per month---although there are geeky ways to get around that, as I explained in "[O say can you CI CD](/posts/2020/06/o-say-can-you-ci-cd)?" You might not care about that for a while but, down the line, it could become an irritant.
- To get the best performance out of Netlify, you're highly encouraged to use its name servers rather than your chosen DNS provider's. Netlify is the only one of these three which works that way. You may not care, if you plan on sticking to Netlify from here on; but, if you want to try other vendors, it's one more step at transition time and can delay the switchover at the worst possible time.

### \#2: Vercel

[Vercel](https://vercel.com), formerly known as ZEIT, came about chiefly because of its affiliation with the [Next.js](https://nextjs.org) JavaScript framework created by its CEO but, lately, has been branching out more into the Jamstack in general---including more actively competing for static sites. In recent months, especially since the rebranding, Vercel has become more friendly to non-developers (*i.e.*, normal people), although perhaps not quite as much as are the other two here.

#### Strengths

- Performance. I've been testing these vendors for months now and, in recent weeks in particular, Vercel has had the most consistently good performance of the three. That's true on several points including, but not limited to: overall delivery speed; site-building speed when you make changes; and network consistency (rock-solidity, you might say). As of this writing, Vercel's CDN---the same one the paying customers get---is the fastest of the three. (By the way, in my work with it, I've also found Vercel to be the fastest *by far* at issuing that SSL certificate for your custom domain when you move it there. The others should take notes from Vercel on this point in particular.)
- Clean interface. The Netlify GUI has a lot to show you but you probably don't need much of it. By contrast, Vercel's interface shows you only the stuff you really need to see at each phase of your interactions with it. (Indeed, you may find the Vercel GUI a little *too* clean, unnervingly so, if you *want* to see more information, although there always are links on each page to needed info and functionalities.)
- Generous free tier. As I wrote earlier this year: "Vercel's free 'Hobby' plan allows up to 100 deployments *per day*, with no mention of minutes at all."

#### Weaknesses

- Not quite as friendly to non-developers, as you would expect for a company with the background I described above. To be sure, you should give Vercel some credit on this because it's definitely trying to get better on this score. The Vercel team knows that the Netlify audience is the target at which they must aim; and I'm sure that will continue in the months ahead. But they're not there yet. (And Netlify is somewhat of a *moving* target, anyway.)
- Similarly, the Vercel documentation assumes a higher level of experience and knowledge than does Netlify's.

### \#3: Render

The newest of the three, [Render](https://render.com), is going through inevitable growing pains, some of which I'll mention herein, but still offers a lot. It's perhaps more attractive an option for down the line than right now---but not too *far* down the line, because it's making aggressive moves to catch up with its better-known competitors. Like Vercel, Render isn't as focused on static sites as is Netlify---Render's *raison d'être* basically is dethroning [Heroku](https://heroku.com) in the [platform as a service (PaaS)](https://www.infoworld.com/article/3223434/what-is-paas-software-development-in-the-cloud.html) world, which is another story---but still manages to include their support in its offerings.

#### Strengths

- Interface and documentation are reasonably easy to use and understand, albeit not quite as much so as either Netlify's or Vercel's. (At the outset, be sure you pick "Static site" when you choose from among the options for setting up a "Web service.")
- Real-time support. During business hours and quite often well beyond them, even users of the Render free tier receive unfailingly courteous real-time help from Render employees through the company's Slack community. In fact, this is the only one of the three vendors that provides *any* real-time support to the free tier.
- Generous free tier. Again quoting my earlier post, Render's "free tier for static sites allows 100 GB of up/down bandwidth per month with no other deploy limits *at all*." 

#### Weaknesses

- Technical glitchiness at times. Of the three, Render takes the longest to issue a new SSL certificate, often fails to update your site when you provide new content (due to issues with [caching](https://en.wikipedia.org/wiki/Web_cache)), and most recently has been having problems with the consistency of its network connectivity. A recent [post on Render's Slack community](https://render-community.slack.com/archives/CBULRG4LV/p1600883128002000) implied the latter two issues were mainly due to shortcomings of its current CDN vendor---which will change in the very near future, and all of the suggested choices are strong candidates.
- This one is a nerdy objection about something that may never affect you; but, as [I learned a little late](/posts/2020/09/goodbye-hello-part-5), Render is the only one of the three which doesn't allow you to switch your site from one repository to another. I can tell you from experience: that's a really nice capability to have when the need arises.

## Bringing it home---about your website home

In truth, any of these three vendors will serve you well; but, right now, Netlify is probably the friendliest place for you non-geeks to land when it's time to put your static websites online. Vercel is faster but somewhat less friendly, and Render is more friendly but still growing into what it will be.

Unlike finding a physical home for yourself, finding an online home for your website involves little if any cost and, in the best of circumstances, is a breeze. And that's how it should be. The days when you had to go through a car-buying-like ordeal with an old-style host to get your place on the web are, thankfully, nearing an end. You picked a good time to come aboard. Enjoy it. The sun is bright and the water is warm.

[^1]:	Each vendor connects seamlessly with all of the big three repo hosts---[Bitbucket](https://bitbucket.org), [GitHub](https://github.com), and [GitLab](https://gitlab.com).

[^2]:	Of course, this doesn't include the domain name server (DNS) settings that go with it, which you still have to do at your domain's name server vendor of choice; however, these vendors give you as much help on that, too, as is possible and reasonable.

[^3]:	That earlier post mentioned *four* hosts, counting Netlify; but I'm leaving out [Firebase](https://firebase.google.com) because, although it has much to recommend it, it's clearly *not* suitable for non-geeks.