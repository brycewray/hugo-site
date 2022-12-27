---
title: "One last look at 2022"
description: "As another year sinks slowly in the west, I recall how it went on this site."
author: Bryce Wray
date: 2022-12-27T12:32:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

The passage of another year --- this site's fourth full year of existence and my first full year as a [retired](/posts/2021/09/transition/) guy --- means it's time to review some of what appeared here, and what otherwise occupied my brain, during Earth's latest numerically designated orbit of its star.

<!--more-->

It wasn't until well into 2022 that I started hearing about the ["100 Days To Offload" website](https://100daystooffload.com/) and its associated challenge "to publish 100 posts on your personal blog in a year." Still, as I noted a few days ago on [Mastodon](https://joinmastodon.org):

{{< stoot "fosstodon.org" "109563943803361522" >}}

<!--
https://fosstodon.org/@BryceWrayTX/109563943803361522
Looks like I’ve done my job re #100DaysToOffload — just counted up and I’ve added 116 posts to my site this year, with eight days to go. Had I not spent most of November coughing my head off, maybe I’d have made it to 125. Considering that I came into 2022 with just 150 *total* posts from the preceding 40 months of the site’s existence, it seems I’ve successfully adapted to the “CTCAJW” Mode (Cut The Crap And Just Write) to which I proclaimed allegiance last May:
https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/
-->

The new freedom I gained by [putting the site into CTCAJW Mode](/posts/2022/05/simplify-simplify-maybe-for-real-this-time/) was amazing. In just the first three months of this renewed dedication to content creation, I churned out more posts than I'd done in all of 2021. Perhaps more amazing was that some of them may even have been halfway decent.

As for what my 2022 writings actually *covered* (other than the onset of CTCAJW Mode itself) . . .

----

Following my typical pattern, I spent a great deal of electronic ink on my favorite subject, the use of [static site generators](https://jamstack.org/generators) (SSGs) for building websites. Most usually, I was writing about [Eleventy](https://11ty.dev) or [Hugo](https://gohugo.io), but [Astro](https://astro.build) also got my attention.

Quite a few of my 2022 articles explained how to embed within one's static website fully static, non-invasive versions of tweets and Mastodon content, but the tweets part [ran aground](/posts/2022/11/static-tweets-deprecation/) as things got increasingly crazy in the Twitterverse. The [Mastodon-related part for Hugo](/posts/2022/06/static-mastodon-toots-hugo/) survived, as did [that for Eleventy](/posts/2022/08/static-embeds-eleventy/#static-toots) and [for Astro](/posts/2022/08/static-mastodon-toots-astro/).

After two years of keeping the site mostly on Eleventy and other JavaScript-based SSGs, I ran the site on Hugo during most of 2022. This drove me to learn more about it and its many features, and Hugo-related posts ensued --- lots of them. In addition to the pieces about static embeds, I wrote about other ways to enhance one's Hugo site:

- Using [Tailwind CSS](https://tailwindcss.com), [Version 3](/posts/2022/03/making-tailwind-jit-work-hugo-version-3-edition/).
- Using [Dart Sass](https://sass-lang.com/dart-sass) through a variety of methods:
	- [The Node.js `sass` package](/posts/2022/03/using-dart-sass-hugo/).
	- [A shell script](/posts/2022/03/using-dart-sass-hugo-sequel/).
	- [A GitHub Action](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/).[^DartSassChoice]
	- [GitLab CI/CD](/posts/2022/08/using-dart-sass-hugo-gitlab-edition/).
- [Adding webmentions](/posts/2022/05/webmentions-yes-javascript-no/).
- [Displaying Git data](/posts/2022/06/get-good-git-info-hugo/).
- [Adding responsive and optimized images](/posts/2022/06/responsive-optimized-images-hugo/).
- Using [Cloudinary](https://cloudinary.com) to [automate the creation of social media images](/posts/2022/10/automated-social-media-images-cloudinary-hugo).

[^DartSassChoice]: Of all of the possibilities I covered for making Dart Sass work with Hugo in production, the GitHub Action remains my personal preference as of this post's initial publication.

While I was at it on the Hugo beat, I also got on my virtual soapbox and [described my proposal for a better path](/posts/2022/07/really-getting-started-hugo/) in onboarding new users as compared to Hugo's official, themes-oriented path.

For JavaScript-based SSGs' purposes (other than the aforementioned static embeds stuff), I wrote about:

- [Using Cloudinary for image handling](/posts/2022/08/using-cloudinary-astro-eleventy/).
- [Having Hugo-like archetypes for easier creation of new posts](/posts/2022/12/hugo-like-archetypes-other-ssgs-take-two/).
- For Eleventy in particular:
	- [Using the Eleventy Fetch plugin](/posts/2022/09/truly-fetching-utility-eleventy/).
	- [Displaying Git data](/posts/2022/09/get-good-git-info-eleventy-too/).
	- [Cache-busting](/posts/2022/09/cache-busting-eleventy-simpler-way-sass/).
	- [Displaying content statistics](/posts/2022/09/word-count-reading-time-eleventy/).
	- [Using Nunjucks macros](/posts/2022/09/shorter-shortcuts-nunjucks-macros-eleventy/).
	- [Controlling publication of posts through drafts and timestamps](/posts/2022/12/drafts-timestamp-based-publishing-eleventy/).

Unlike my common practice in 2020–2021, when I moved this site back and forth among various hosts as conditions and feature sets changed, I kept the site on [Cloudflare Pages](https://pages.cloudflare.com) during all of 2022 --- *i.e.*, except for some brief periods when I was doing tests, such as those whose results I described in "[Using Dart Sass with Hugo: some data on using GitHub Actions](/posts/2022/07/using-dart-sass-hugo-some-data-using-github-actions)." Consider that my endorsement of the improved maturity, reliability, and performance of the CFP platform, which I began using during its [early-2021 public beta](/posts/2021/01/beta-testing-cloudflare-pages).

Multiple times in 2022, I had the opportunity to work with the very nice folks at [CloudCannon](https://cloudcannon.com). In July, I was delighted by that firm's first [HugoConf virtual conference](/posts/2022/07/impressions-hugoconf-2022/), more iterations of which are slated for the future. During this event, CloudCannon's Liam Bigelow introduced the remarkable [Pagefind](https://pagefind.app) search engine tool which, soon thereafter, I [added to this site](/posts/2022/07/pagefind-quite-find-site-search/).

As for some other topics on which I dwelt this year:

- I consumed plenty of time, and endured more than a little angst, regarding the handling of my custom-domains-based email. I'd been with [Fastmail](https://fastmail.com) [since 2017](/posts/2019/05/the-holy-mail/); but, although it took me a while to make my [final choice](/posts/2022/11/using-icloud-mail-custom-domain-its-fifty-bucks), I switched to what Apple had [begun offering during 2021](https://9to5mac.com/2021/06/07/custom-domain-names-are-coming-to-icloud-mail-with-icloud/) as part of its iCloud+ service.
- I gave a mostly positive endorsement to the [giscus](https://giscus.app) commenting system, which I [used](/posts/2022/03/gems-in-rough-16/#trying-giscus) for several months and about which I gave [some](/posts/2022/05/tips-using-giscus/) [tips](/posts/2022/07/more-tips-using-giscus/) before [deciding not to continue with it](/posts/2022/10/letting-go-giscus/).
- To improve the accessibility of this site and its [publicly available code](https://github.com/brycewray), I made [two](/posts/2022/06/accessibility-argument-tabs-spaces/) [changes](/posts/2022/07/blankety-blank-blanks/) to some long-standing development habits.
- As a long-time fan of content feeds, I [recommended](/posts/2022/04/gems-in-rough-17/#feed-readers-and-built-in-browsers) using the [NetNewsWire](https://netnewswire.com) app[^AppleNNW] to read them, [advised](/posts/2022/05/fun-with-feeds/) how they can simplify your content enjoyment, and wrote [two](/posts/2022/12/why-have-both-rss-json-feeds/) [posts](/posts/2022/12/not-so-fast-there-fella/) suggesting how to make your own sites' feeds more helpful.

[^AppleNNW]: NetNewsWire is available for macOS, iOS, and iPadOS. Those of you using other platforms might find one or more appropriate alternatives through [this Hacker News discussion from a few days ago](https://news.ycombinator.com/item?id=34108413).

----

As I noted in July's "[Economy of words](/posts/2022/07/economy-words/)," CTCAJW Mode means **both** writing more when there's a reason **and** writing *less* when *that* makes sense. As a result, I *currently* predict I'll be writing a lot fewer posts in 2023 than I did this year --- if for no other reason than that I burned through a *lot* of topics[^Twitter] during the period after the arrival of CTCAJW Mode.

[^Twitter]: Well, in the case of the posts about embedding static tweets, the topic essentially became moot through no fault of my own.

Still, it's likely there will be more than a few developments and personal discoveries during the coming year which will stir my writing itch; and, if so, I'd expect to be here scribbling about them. Thanks for whatever time you've already spent here, and I hope you'll find it a place worth revisiting and [following](/contact/#follow-me) when the mood hits you.

Have a happy and safe 2023.
