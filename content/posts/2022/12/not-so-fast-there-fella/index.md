---
title: "Not so fast, there, fella"
description: "Survey says: I jumped the gun on that two-feeds strategy I mentioned in the previous post."
author: Bryce Wray
date: 2022-12-10T14:40:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Sometimes a learning experience is also a humbling experience. Such was the case with the aftermath of [my previous post](/posts/2022/12/why-have-both-rss-json-feeds/).
<!--more-->

In case you didn't read that one, it was my explanation of how I was now using this site's [RSS](https://www.rssboard.org/rss-specification) and [JSON](https://jsonfeed.org/) content feeds: *i.e.*, the former with only the title and description of each post and the latter also with the post's full content. I thought I'd cooked up a best-of-both-worlds approach for my feeds-savvy readers, since they could choose the content feed which best suited their wishes.

But I soon learned it wasn't that simple.

I heard from folks saying that it wasn't a safe assumption that everyone could choose either kind of feed, with the JSON Feed format being less widely supported than the ancient-in-Internet-time RSS. While my own research had shown JSON feeds are available via the vast majority of feed-reader apps and services, "the vast majority" is not the same as "one hundred percent."

Some also told me that, regardless of feed type (a choice of which, a few respondents suggested, required more knowledge than a non-trivial number of feed customers might have), they fervently believed it should be one way or the other, not both. Those comments, in particular, led me to conduct a poll on Mastodon, asking whether RSS reader users preferred that a feed item provide the full text of an article or merely an excerpt from it. It got 646 responses, and here's how it turned out:

| Response       | Result |
| --------- | --------------------- |
| Full text | **72.0%**                   |
| Excerpt   | **20.4%**                 |
| No preference | **7.6%** |
{.ulysses}

<!--
https://fosstodon.org/@BryceWrayTX/109485575488763076
Final results:
- Full article text: 72.0% (screen: 72%)
- Article excerpt:   20.4% (screen: 20%)
- No preference:      7.6% (screen:  8%)
Total votes: 646 people
As of 2025-04-26, that link is no longer available.
-->

Not exactly too close to call, eh?

"Full article text" took a substantial lead almost immediately and, especially once the quantity of voters grew large enough to provide some degree of statistical significance, never lost it throughout the poll's twenty-four-hour life. I suppose that's what I get for changing the feeds and writing the previous post **before** doing the poll. D'oh.

***But*** . . .

Even though "Article excerpt" came in a very poor second, a number of its adherents told me that only that approach worked with certain device setups, bandwidth constraints, and so forth --- not to mention people's tight schedules. So, while it was clear that I needed to give the "Full article text" side its due in configuring my feeds, I also saw that I couldn't simply ignore the minority and go back to having *only* full-text feeds. I had to do better.

As a result, here's what I've done with the site:

- There are now *four* feeds, two in RSS (actually [Atom](https://www.rfc-editor.org/rfc/rfc4287)[^Atom]) format and two in JSON format. Each format has one *primary* feed and one *secondary* feed. All four are linked from the ["Contact" page](/contact/).
- The two primary feeds are still (a.) at their previous locations (`index.xml` and `index.json`, respectively) and (b.) linked from distinctive icons in the footer. Each primary feed once again includes the *full content* of each post, as was these feeds' setup prior to my turned-out-to-be-temporary shakeup of the last couple of days.
- Each of the two secondary feeds (either `index-excerpts.xml` or `index-excerpts.json`) includes *only* each post's title, description, and --- you guessed it --- an excerpt.[^credit]

[^Atom]: I chose to go with Atom after further research, during which I was particularly convinced by "[Atom > RSS: Why We Should Just Call Them 'Feeds' Instead of 'RSS' Feeds](https://danielmiessler.com/blog/atom-rss-why-we-should-just-call-them-feeds-instead-of-rss-feeds/)" by [Daniel Miessler](https://danielmiessler.com/) (and other articles like it). It's also worth noting that the documentation for Eleventy's [official RSS plugin](https://www.11ty.dev/docs/plugins/rss/) chiefly recommends using Atom. On the other hand, [Hugo](https://gohugo.io)'s default feeds template uses RSS **but** you can use an Atom template instead, such as what's recommended in "[Hugo Atom Syndication XML Template (Better RSS)](https://www.jhaurawachsman.com/hugo-atom-syndication-xml-template/)" by [Jhaura Wachsman](https://www.jhaurawachsman.com/).

[^credit]: Credit where credit's due for my Eleventy repo in particular: to code for the excerpts and then convert them into Markdown for processing at build time, I relied heavily on "[Customize front matter parsing](https://www.11ty.dev/docs/data-frontmatter-customize/)" in the [Eleventy documentation](https://11ty.dev/docs/) and "[Replicating Jekyll's `markdownify` filter in Nunjucks with Eleventy](https://edjohnsonwilliams.co.uk/blog/2019-05-04-replicating-jekylls-markdownify-filter-in-nunjucks-with-eleventy/)" by [Ed Johnson-Williams](https://edjohnsonwilliams.co.uk/).

I think this is about as close as I can come to making everyone happy on this particular score. Guess I'll find out.

----

## Addendum for Hugo users, 2022-12-14

**Important**: This corrects some erroneous information I'd added to this post earlier today, in which I confused redirects with moves. I apologize for the goof!\
*Also*, I provided some additional details on 2022-12-19 and 2022-12-26.
{.box}

If you want to have a feeds setup as described above in a [Hugo](https://gohugo.io) site, you'll have to jump through some hoops. This is because, as nearly as I can tell through researching the subject, Hugo allows only one feed (per format) per *[section](https://gohugo.io/content-management/sections/)*. For example, the home page --- typically the "owner" of a Hugo site's feed(s) --- can have one RSS/Atom feed and one JSON feed, but that's it. To have *multiple* feeds of a given format, set up each additional set of feeds in a separate section.

Let's say you use a `posts` section to "own" your `index-excerpts.xml` and `index-excerpts.json` feed files, by adding appropriate `.json` and `.xml` layouts[^excerptExamples] there, each named according to [Hugo lookup rules](https://gohugo.io/templates/lookup-order/#examples-layout-lookup-for-section-pages):

[^excerptExamples]: As of 2022-12-14, the [Hugo version of my site repo](https://github.com/brycewray/hugo-site) has examples of such layouts for both [RSS/Atom](https://github.com/brycewray/hugo-site/blob/main/layouts/posts/section.xml) and [JSON](https://github.com/brycewray/hugo-site/blob/main/layouts/posts/section.json) formats.

```plaintext
 layouts/
 └─ posts/
    ├── section.json
    ├── section.xml
```

. . . which would cause Hugo to generate `/posts/index.json` and `/posts/index.xml`, respectively, for your site. But those aren't the top-level links you probably would prefer (well, definitely not the ones I would prefer), and my research also indicates Hugo doesn't offer a way to move the files. That means you'll need to do so yourself during the build process.

**If you use a [Jamstack](https://jamstack.org)-savvy host** such as [Cloudflare Pages](https://pages.cloudflare.com), [Netlify](https://netlify.com), or [Vercel](https://vercel.com), you can add file-moving commands to your overall build command. Let's say your usual Hugo build command is `hugo`; the following would build the site and move the files:

```plaintext{bigdiv=true}
hugo && mv public/posts/index.xml public/index-excerpts.xml && mv public/posts/index.json public/index-excerpts.json
```

**If you use [CI/CD](https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html)** to build your Hugo site, you can add a step **after** the `hugo` site-building command that will move those feed files to where they need to be. For a [GitHub Action](https://github.com/features/actions/), that could be:

```yml{bigdiv=true}
      - name: Move feeds
        run: |
          mv public/posts/index.xml public/index-excerpts.xml
          mv public/posts/index.json public/index-excerpts.json
```

. . . while, if using a [GitLab CI/CD](https://docs.gitlab.com/ee/ci/) [pipeline](https://docs.gitlab.com/ee/ci/pipelines/), you could do this within the `script` section:

```yml{bigdiv=true}
    - mv public/posts/index.xml public/index-excerpts.xml
    - mv public/posts/index.json public/index-excerpts.json
```

Finally, **if you build manually** --- *i.e.*, you copy your Hugo-generated `public/` folder to the appropriate place on your host --- just manipulate those files as follows *before* you copy that folder:

- Move `public/posts/index.xml` to `public/` and rename the file `index-excerpts.xml`, so that it will be `public/index-excerpts.xml`.
- Move `public/posts/index.json` to `public/` and rename the file `index-excerpts.json`, so that it will be `public/index-excerpts.json`.
