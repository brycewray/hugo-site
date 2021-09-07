---
layout: singlepost
tags: post
title: "Conversation piece"
subtitle: "Commenting options for your static website"
description: "Here are several ways you can hear from your visitors."
author: Bryce Wray
date: 2020-10-13T16:30:00-05:00
lastmod: 2021-09-02T12:20:00-05:00
#draft: true
discussionId: "2020-10-conversation-piece"
featured_image: "miguel-a-amutio-27QOmh18KDc-unsplash_3785x2847.jpg"
featured_image_width: 3785
featured_image_height: 2847
featured_image_alt: "An array of public address speakers mounted on a pole"
featured_image_caption: |
  <span class="caption">Photo: <a href="https://unsplash.com/@amutiomi?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Miguel A. Amutio</a>; <a href="https://unsplash.com/s/photos/communication?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

{{< disclaimer >}}

Modern static websites have many advantages over many old-school dynamic ones---especially those based on [WordPress](https://wordpress.org)---as [noted here recently](/posts/2020/09/normal-persons-guide-static-websites). However, one area where they fall short is the ease, or lack thereof, of providing commenting capabilities.

Now, perhaps you don't *care* whether your readers have a chance to respond to your site's content. Or, perhaps, you just leave them an email address or your Twitter handle and let that handle it. If so, you can stop reading right now. After all, you've already determined that this isn't a problem for you.

On the other hand, if you *do* want to provide such functionality but are uncertain how to proceed with a static site, I have some thoughts that might help you. All the services I'm mentioning are hosted, as I'm assuming you're running the site in a "serverless" environment ([as I recommend](/posts/2020/09/normal-persons-guide-static-website-hosting))---such as on [Netlify](https://netlify.com), [Vercel](https://vercel.com), or [Render](https://render.com)---or otherwise are simply unable to install commenting software on a server you can control.

**Note**: Yes, there also are [webmentions](https://indieweb.org/webmention), as I [explained earlier this year](/posts/2020/04/webmentions-three-ssgs-1), but they aren't the easiest things to set up and maintain, even if you're rather tech-savvy. This post is mainly for normal (*i.e.*, non-nerdy) folks who want more conventional commenting on their static websites.

## Don't even consider Disqus

The first thing is: **don't** use [Disqus](https://disqus.com). Yes, it's hosted so you don't have to worry about installation issues, works well, looks kinda nice, is [supported out of the box](https://gohugo.io/content-management/comments/#add-disqus) by the [Hugo](https://gohugo.io) [static site generator (SSG)](https://staticgen.com) (indeed, it's very easy to add to just about any SSG), and is widely used; **but** it has some significant disadvantages:

- [It tracks your visitors and shares their data without their consent](https://twitter.com/martingund/status/1207327648093003777) ([it's owned by a marketing company, Zeta Global](https://markosaric.com/remove-disqus/)). If you're serious about honoring the [GDPR](https://gdpr-info.eu/) and other privacy protection legislation, Disqus is a pain.
- The free tier serves ads to your visitors [unless you're eligible to opt out](https://help.disqus.com/en/articles/1717307-subscription-payments-faq).
- As the above has probably suggested, Disqus adds a ton of code to your site, slowing it down. (There are numerous articles on the web about it; just search for "disqus performance penalty" or something similar.) You can mitigate that in some ways but, in the end, it's still a performance hit.

So, if Disqus is a bad idea, how should you then implement comments on your site?

## Good alternatives

Here are some hosted services I've tried, and one more about which I've read good things. Here they all are, in alphabetical order.

### Commento

{{< imgc src="Commento_scr_cap_2702x1530.png" alt="Screen capture of Commento web page" width="2702" height="1530" >}}

[Commento](https://commento.io) is the one of the group I haven't yet tried, because its hosted version doesn't allow testing with `localhost` or even a local IP address, and I didn't want to try it "live" without doing local testing.

#### Advantages
- Doesn't require signups, so comments can be anonymous; anyone who wishes to log in can do so via Google, Twitter, GitHub, or GitLab.
- Doesn't track visitors, show them ads, or sell their data.
- Light; adds under 50 KB of code and other files. (Since I couldn't test this locally, I checked the load on another site that uses Commento.)
- Easily customized interface.

#### Disadvantages
- According to its [legal info](https://commento.io/legal), it uses cookies and keeps the user data "to authenticate you on future visits" (no expiration date given), so your privacy policy will need to take that into account.

#### Pricing
- **Model**: One plan per domain.
- **[Cost](https://commento.io/pricing)**: Thirty-day free trial; then $10/domain/month or $99/domain/year for up to 50,000 **daily** pageviews (if you need more than that, you shouldn't be wasting your time reading *my* pitiful little site when you should be making money hand-over-fist from *your* site).

### FastComments

{{< imgc src="FastComments_scr_cap_2696x1530.png" alt="Screen capture of FastComments web page" width="2696" height="1530" >}}

In [FastComments](https://fastcomments.com)&nbsp;.&nbsp;.&nbsp;.

#### Advantages
- Comments can be anonymous (if you allow that); anyone who wishes to log in can do so by providing his or her email address.
- Each plan allows unlimited numbers of sites.
- Doesn't show ads to visitors; doesn't sell their data.
- Light; adds about 23K of code and files.
- Fairly easily customized interface.
- Actively developed.
- Good support.

#### Disadvantages
- For a commenter who **does** log in, the parent company puts cookies on the person's browser and, of course, collects the person's user name and email address, requiring you to address this in your privacy policy.
- As I said, the interface is *fairly* easily customized, so you may want to take the "fairly" as a case of damning-with-faint-praise; but a look through the [FastComments blog](https://blog.fastcomments.com/) indicates this product is improving quickly---it's only about a year old---so I wouldn't judge it too harshly on that score.

#### Pricing
- **Model**: Unlimited websites.
- **[Cost](https://fastcomments.com/traffic-pricing)**: Thirty-day free trial; then $4.99/month for up to *a million* "page loads" per month.

### Hyvor Talk

{{< imgc src="Hyvor_Talk_scr_cap_2696x1528.png" alt="Screen capture of FastComments web page" width="2696" height="1528" >}}

Now, a look at [Hyvor Talk](https://talk.hyvor.com)&nbsp;.&nbsp;.&nbsp;.

#### Advantages
- Comments can be anonymous (if you allow that); otherwise, each commenter will have to create a Hyvor account.
- Each plan allows unlimited numbers of sites.
- Doesn't track visitors, show them ads, or sell their data.
- Easily customized interface.
- Actively developed.
- Good support.

#### Disadvantages
- For those who log in via Hyvor accounts, it [uses cookies and keeps user data for thirty days](https://talk.hyvor.com/docs/privacy), so your privacy policy will need to take that into account.
- Fairly code-heavy; based on my own testing, which actually had some stuff deactivated, it adds roughly 250 KB of code and files.
- Only the $35/month Business plan lets you white-list the commenting so that the Hyvor Talk branding doesn't appear.

#### Pricing
- **Model**: Unlimited websites.
- **[Cost](https://talk.hyvor.com/plans)**: Fourteen-day free trial; then $5/month Premium Plan for up to 100,000 monthly pageviews among all your domains.

### Talkyard

{{< imgc src="Talkyard_scr_cap_2696x1524.png" alt="Screen capture of Talkyard web page" width="2696" height="1524" >}}

As for [Talkyard](https://talkyard.io)&nbsp;.&nbsp;.&nbsp;.

#### Advantages
- Comments can be anonymous (if you allow that); anyone who wishes to log in can do so either by creating a Talkyard account or via Google, Facebook, Twitter, or GitHub.
- Actively developed.
- Excellent support.
- Fairly easily customized interface.

#### Disadvantages
- The heaviest of all of these---about *930 KB* of code and files in my own use---probably because it's essentially forum software acting as commenting software. Indeed, this is the main reason I stopped using it after a number of months of being a very happy Talkyard user.
- [Briefly tracks each incoming IP address (or IP subnet) and installs a browser cookie](https://www.talkyard.io/-/privacy-policy), so your privacy policy will need to take that into account.

#### Pricing
- **Model**: Unlimited websites.
- **[Cost](https://www.talkyard.io/plans)**: One-month free trial; then 1.9&#8364;/month for 25,000 monthly pageviews, or 19&#8364;/month for 50,000 monthly pageviews. (To convert euros to dollars, check a tool like the [XE Currency Converter](https://www.xe.com/currencyconverter/convert/?Amount=1&From=EUR&To=USD).)

### Utterances

{{< imgc src="Utterances_scr_cap_2698x1530.png" alt="Screen capture of FastComments web page" width="2698" height="1530" >}}

Finally, there's [Utterances](https://utteranc.es)&nbsp;.&nbsp;.&nbsp;.

#### Advantages
- Uses the [GitHub](https://github.com) API to provide commenting as issues on your GitHub-based site repository.
- Completely free.
- Zero tracking or ads.
- Light; adds about 30K of code and files.
- Completely open-source.
- Actively developed.
- Provides all the commenting functionality of the GitHub issues UI, such as [Markdown](https://daringfireball.net/projects/markdown) and previews.

#### Disadvantages
- Obviously, works only if your site repository **is** on GitHub (and is public).
- Each commenter must have a GitHub account.
- Non-customizable interface; it's the same as the normal commenting UI in a GitHub repo's issues.
- Gets blocked anywhere GitHub is blocked.

#### Pricing
- **Model**: N/A.
- **Cost**: None.

----

## Can we talk?

I don't want this to sound like one of those useless commercial-site review articles that ends with "Well, *we're* not going to make a choice, so it's all up to *you*"-kind of waffling. So, here's where I land on this.

At this writing, my commenting platform choice is FastComments, for which I'm still on the free trial. If I choose *not* to stick with it once it comes time to pay or go, I'd probably just revert to the free Utterances[^1]---especially since I'm guessing that, given the content of my articles, my typical reader either already has a GitHub account or wouldn't have a problem with getting one.

For your purposes, I'd rank the *non*-free offerings as follows:
1. **FastComments**---Of these four, it's the best combination of light code, decent pricing, active development, respect for commenters’ privacy, and (reasonable) customizability. Since it's also the *newest* of the four, that's pretty impressive!
2. **Commento**---Since I couldn't test it without going truly live with it (and chose not to do so), I go by what I've read about this. It comes out ahead of Hyvor Talk only because the latter is still so code-heavy. Otherwise, it gives you the least bang for the buck of these four.
3. **Hyvor Talk**---If you don't care so much about code load (although you probably should), this should be your second option from this group. I'd watch this one for what I hope will be future refinements that further trim it down, perhaps by letting you use a significantly lighter and more bare-bones version thereof.
4. **Talkyard**---The code load just buries this otherwise great and highly affordable choice. As with Hyvor Talk, I hope there will eventually be a "Light" version that's a much smaller download and is for *only* commenting, rather than carrying the additional weight that supports its many other features.

[^1]:	Part of the reason why I'd do so is because, at this writing, I'm already paying for [Fathom Analytics](https://usefathom.com/ref/ZKHYWX) *(affiliate link)* and, as noted in "[Forward PaaS](/posts/2020/10/forward-paas)," am hosting the site with the $5/month combo of Cloudflare Workers and KV storage. Thus, I do have some incentive to keep down the monthly costs for running this **non**-monetized site.
