---
layout: singlepost
tags: post
title: "Static tweets in Eleventy and Hugo"
description: "How to embed tweets while still protecting your visitors’ privacy."
author: Bryce Wray
date: 2022-02-07T12:00:00-06:00
lastmod: 2022-04-12T09:05:00-05:00
#initTextEditor: Ulysses
discussionId: "2022-02-static-tweets-eleventy-hugo"
featured_image: twitter-icon--alexander-shatov-k1xf2D7jWUs-unsplash_2400x1800.jpg
featured_image_width: 2400
featured_image_height: 1800
featured_image_alt: "Digital image of a blue Twitter logo on a dark blue, rounded cube"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@alexbemore?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexander Shatov</a>; <a href="https://unsplash.com/s/photos/twitter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

**Update, 2022-04-12**: Based on [work](https://github.com/astro-community/astro-embed) by the [Astro](https://astro.build) team, I have enhanced the shortcode described within (and the accompanying styling) so it also can handle animations embedded in tweets. Unfortunately, this isn't possible with the one described in the [follow-up](/posts/2022/02/static-tweets-eleventy-hugo-part-2) to this post, as I explain in an update therein.
{.yellowBox}

**Update, 2022-06-07**: I have now [substantially improved](/posts/2022/06/static-tweets-hugo-update/) upon the [Hugo](https://gohugo.io) shortcode described in this post, but you still may find valuable background information in what follows here.
{.yellowBox}

You know it’s important to respect, and protect, the privacy of your website’s visitors. However, serving them embedded social media content can complicate your good intentions. The good news is that my two favorite [static site generators](https://jamstack.org/generators/) (SSGs), [Eleventy](https://11ty.dev/) and [Hugo](https://gohugo.io/), will help you fix that.

In the [first item](/posts/2021/09/gems-in-rough-09/#privacy-respecting-youtubeembeds) in last September’s “[Gems in the rough #9](/posts/2021/09/gems-in-rough-09/),” I provided a description of a privacy-friendly way to embed YouTube videos in your Eleventy- or Hugo-powered site.[^1] Now, in this post, let’s talk about how to treat tweets (?) similarly.

## Go static with your tweet embeds

If you embed a tweet using the [standard Twitter-endorsed method](https://help.twitter.com/en/using-twitter/how-to-embed-a-tweet), you get not just the tweet content but also a lot of JavaScript. The latter tracks your visitors (*and* slows down your site’s performance), so you’ll want to avoid that nonsense. But how?

The solution is to present each tweet as *purely static* textual and image content.

For example, here is a tweet I issued recently when I received[^2] some swag after having submitted some code to a Cloudflare contest:

{{< stweet "1487140202141425673" >}}

.&nbsp;.&nbsp;. so you get to see the tweet—complete with my Twitter avatar and, in this case, the “attached” photo of the Cloudflare swag—**but** you’re spared all the other stuff that usually would come with it.[^3]

This works because, in each of the methods I’ll discuss below, you’re pulling the tweet’s text and image(s) directly from a Twitter API and then putting them together as you wish. Of course, that means you’re also eschewing the Twitter CSS which normally would accompany a tweet’s embed, so you’ll have to apply some bespoke CSS to make things look as you want. Such styling concerns are beyond the scope of this post, but you can get some ideas by using your browser’s Inspector tool to see how I styled that tweet above.

### In Eleventy

With the Eleventy SSG, we’ll be making use of [Kyle Mitofsky](https://twitter.com/KyleMitBTV)’s [**eleventy-plugin-embed-tweet**](https://github.com/KyleMit/eleventy-plugin-embed-tweet) plugin. It requires at least Eleventy v.0.10.0.

When installed, the plugin will pull data from Twitter’s private Developer API and so, as the plugin’s [README](https://github.com/KyleMit/eleventy-plugin-embed-tweet) explains, this requires signing up for a free [Twitter Developer API account](https://developer.twitter.com/en/apply-for-access). Once you’ve got that account, you’ll have four environment variables—`TOKEN`, `TOKEN_SECRET`, `CONSUMER_KEY`, and `CONSUMER_SECRET`—that must live in a “dot-env” (`.env`) file at your site project’s root level.

That’s fine for when you’re developing locally, but you obviously don’t want to [commit](https://git-scm.com/docs/git-commit) that file to a public repo. As a result, you’ll have to supply these variables to your site host, so it can access them during each build (*e.g.*, here are instructions for [Netlify](https://docs.netlify.com/configure-builds/environment-variables/), [Vercel](https://vercel.com/docs/concepts/projects/environment-variables), and [Cloudflare Pages](https://developers.cloudflare.com/pages/platform/build-configuration#environment-variables)). The README warns that, if the environment variables *aren’t* available at build time, the plugin will fall back to that JavaScript glop from Twitter’s standard tweet-embedding process.

**Note**: Please refer to the README for more details about the plugin, including its available options.
{.yellowBox}

With all that out of the way, let’s install the plugin:

```bash
npm install eleventy-plugin-embed-tweet --save
```

Then add it to your `.eleventy.js` file:

```js
module.exports = function(eleventyConfig) {
	const pluginEmbedTweet = require("eleventy-plugin-embed-tweet")
	eleventyConfig.addPlugin(pluginEmbedTweet)
```

This creates a [shortcode](https://11ty.dev/docs/shortcodes/) called `tweet` that you can put anywhere within your site’s [Markdown](https://daringfireball.net/projects/markdown/) content. Twitter knows each tweet by its **ID number**, and that’s how `tweet` will embed it.[^4] The ID number for that tweet I embedded above is **1487140202141425673**, so the following use of `tweet` would show it:

```twig
{% tweet "1487140202141425673" %}
```

### In Hugo

To get a safe-but-nice-looking tweet embed in Hugo, we’ll add a [shortcode](https://gohugo.io/content-management/shortcodes/) which borrows heavily from one described in the excellent article, “[Update: Rendering Static Tweets](https://hugo.md/post/update-rendering-static-tweets/)” by a [developer who *also* is named Hugo](https://twitter.com/hugojmd). As it turns out, there is a *public* Twitter API, too, and this Hugo shortcode will extract data from it in much the same way as the Eleventy plugin does from the private developer API.

Actually, Hugo has a [*built-in* `tweet` shortcode](https://gohugo.io/content-management/shortcodes/#tweet) but, by default, it brings in *all* the content (good and bad) from Twitter’s regular embedding method. You can edit the site config file to [turn off](https://gohugo.io/about/hugo-and-gdpr/#twitter) the privacy-violating junk fetched by `tweet`, but that leaves you with a pretty plain result. For example, here’s how `tweet` reproduces that earlier tweet (albeit with little or no CSS help) when you’ve engaged Hugo’s maximum privacy setting for `tweet`-grabbed content:

{{< tweet user="BryceWrayTX" id="1487140202141425673" >}}

Now, that’s certainly not terrible, and it does give you the essence of the message, but it still isn’t as cool as what you’ll get by adding the following shortcode[^5], which we’ll call `stweet.html` (with `stweet` standing for *static tweet*):

```go-html-template
{{/*
  =======
  Based on...
  - https://github.com/hugomd/blog/blob/6ad96b24117255c2a9912c566ffd081bd9bbd6f1/layouts/shortcodes/statictweet.html
  - https://hugo.md/post/update-rendering-static-tweets/
  - https://github.com/KyleMit/eleventy-plugin-embed-tweet
  =======
*/}}

{{ $urlPre := "https://cdn.syndication.twimg.com/tweet?id="}}
{{ $id := .Get 0 }}
{{ $json := getJSON $urlPre $id }}
{{ $text := .Page.RenderString $json.text }}

{{ if isset $json "entities" }}
  {{ if isset $json.entities "user_mentions"  }}
    {{ range $user := $json.entities.user_mentions}}
      {{ $text = replace $text (printf "@%s" $user.screen_name) (printf "<a href='https://twitter.com/%s' target='_blank' rel='noopener'>@%s</a>" $user.screen_name $user.screen_name) }}
    {{ end }}
  {{ end }}
  {{ if isset $json.entities "hashtags"}}
    {{ range $hashtags := $json.entities.hashtags }}
      {{ $text = replace $text (printf "#%s" $hashtags.text) (printf "<a href='https://twitter.com/hashtag/%s?src=hash&ref_src=twsrc' target='_blank' rel='noopener'>#%s</a>" $hashtags.text $hashtags.text) }}
    {{ end }}
  {{ end }}
  {{ if isset $json.entities "media"  }}
    {{ range $media := $json.entities.media }}
      {{ $text = replace $text $media.url "" }}
    {{ end }}
  {{ end }}
  {{ if isset $json.entities "urls"  }}
    {{ range $url := $json.entities.urls}}
      {{ $text = replace $text $url.url (printf "<a href='%s' target='_blank' rel='noopener'>%s</a>" $url.url $url.display_url) }}
    {{ end }}
  {{ end }}
{{ end }}

<blockquote class="tweet-card">
  <div class="tweet-header">
    <a class="tweet-profile" href="https://twitter.com/{{ $json.user.screen_name}}" target="_blank" rel="noopener">
      <img src="{{ $json.user.profile_image_url_https }}" alt="Twitter avatar for {{ $json.user.screen_name}}" />
    </a>
    <div class="tweet-author">
      <a class="tweet-author-name" href="https://twitter.com/{{ $json.user.screen_name}}" target="_blank" rel="noopener">{{ $json.user.name }}</a>
      <a class="tweet-author-handle" href="https://twitter.com/{{ $json.user.screen_name}}" target="_blank" rel="noopener">@{{ $json.user.screen_name}}</a>
    </div>
  </div>
  <p class="tweet-body">
    {{ .Page.RenderString $text }}
  </p>
  {{ if isset $json "photos" }}
    {{ range $item := $json.photos }}
      <img src="{{ $item.url }}" alt="Image from tweet {{ $id }}" />
    {{ end }}
  {{ end }}
  <div class="tweet-footer">
    <a href='https://twitter.com/{{ $json.user.screen_name }}/status/{{ $json.id_str }}' class='tweet-date' target='_blank' rel='noopener'>{{ dateFormat "3:04 PM • January 2, 2006" $json.created_at }}</a>&nbsp;<span class="legal">(UTC)</span></p>
  </div>
</blockquote>
```

And, just as we did with the Eleventy shortcode, we invoke this Hugo `stweet` shortcode in Markdown to reproduce the example tweet from earlier, again calling it by its ID number:

```md
{{</* stweet "1487140202141425673" */>}}
```

**Note**: You can name the shortcode whatever you want, but naming it `tweet.html` will override the built-in `tweet` shortcode. On the other hand, you may be perfectly happy with that; I just want you to be aware of it.
{.yellowBox}

## Them’s the breaks?

There are always important considerations when one’s site must trust the ongoing availability of a third-party data source.

- As of the initial publication of this post, `eleventy-plugin-embed-tweet` uses v.1.1 of the Twitter API. However, Twitter is [pushing migration to v.2](https://developer.twitter.com/en/docs/twitter-api), so it’s reasonable to assume the earlier version will be retired at some point. If so, that obviously would break anything depending on v.1.x.[^6]
- Then there’s that public API which enables the Hugo `stweet` shortcode. Although it’s long in the tooth in internet time—I found other articles from years ago[^7] that mentioned it—I’ve seen nothing indicating that Twitter intends to retire it.[^8] That doesn’t prove it *won’t* happen, though.[^9]

**In short, [bleep] happens**. Here’s my bottom line on the subject: if/when external changes break either of these shortcodes, I’ll try to update this post with at least a notice to that effect and, if possible, a proposed resolution.

SSG-built websites like this one amount to [only a very tiny fraction](https://w3techs.com/technologies/history_overview/content_management/ms/y) of what’s on the web, and we who “cleanse” our sites’ embedded social media content probably are only an itsy-bitsy subset of that already microscopic number. Thus, I doubt our efforts will disturb The Big Social Media Companies enough that they’ll try to stymie us.[^10] Regardless of such concerns, we still should do everything we can, whenever we can, to protect our visitors’ privacy when we provide content to them. If you now understand how to do that with embedded tweets on your SSG-built website, this post will have accomplished its purpose.

[^1]:	As noted in that article, I borrowed heavily on [Sia Karamalegos](https://sia.codes/)’s article, “[Faster YouTube embeds in Eleventy](https://sia.codes/posts/lite-youtube-embed-eleventy/),” which explained how to use the [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) package for better YouTube embeds.

[^2]:	For all I know, *everybody* who entered got something. I can assure you there was nothing special about my code entry. But, hey, all I wanted was some Cloudflare swag, and the amount I received was a pleasant surprise.

[^3]:	In the interest of full disclosure, I’ll note that any Twitter-based image—including the avatar—that’s included with a static tweet does include a Twitter cookie, but **no** trackers, according to the StartPage Privacy Protection extension I run on both the Chrome and Firefox browsers. Whether that’s suitable is up to you. If it’s not, but you’d still like to use one of the shortcodes explained in this post, you could hide each image by using `display:none` in your CSS. This would keep the browser from downloading either the image or its cookie.

[^4]:	To find any tweet’s ID number, just look at its URL. It’s the last part of the URL, after `/status/`.

[^5]:	The structure herein is based on that provided by the aforementioned `eleventy-plugin-embed-tweet` plugin.

[^6]:	Nothing in the plugin’s repository (including its “Issues” section) references the v.2 API, so I don’t know whether Mitofsky plans to update the plugin for migration to support of v.2.

[^7]:	For just one example, there’s the ironically named “[Getting Twitter Follower Count without Using API](https://kaspars.net/blog/twitter-follower-count-without-api)” from 2014.

[^8]:	But what about Hugo’s built-in `tweet` shortcode, you ask? Well, a look at its [code in the Hugo GitHub repository](https://github.com/gohugoio/hugo/tree/master/tpl/tplimpl/embedded/templates/shortcodes) indicates it uses the [regular Twitter embedding method](https://help.twitter.com/en/using-twitter/how-to-embed-a-tweet), so its shelf life should be a very long one. Beyond that, the Hugo maintainers know it’s widely used and will keep it updated accordingly; besides, if Twitter changed *that* method, the worldwide sound of breaking websites would shatter all our eardrums.

[^9]:	I am researching how to use Twitter API v.2, rather than the public API, with `stweet`, but I wouldn’t suggest you hold your breath. The Hugo documentation for handling build-level “secret” environment variables is, um, lacking—as am I. **Update, 2022-02-11**: I now have a v.2-based shortcode ready; please see the [follow-up article](/posts/2022/02/static-tweets-eleventy-hugo-part-2/). **Further update, 2022-04-12**: I will keep that article online for the sake of [transparency](/posts/2019/10/otoh/), but things I learned later while examining the [Astro](https://astro.build) team's [`astro-embed` package](https://github.com/astro-community/astro-embed)---chiefly, that the v.2 API [doesn't currently support viewing animations within embedded tweets](https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/media)---led me to believe it would be better to stick with the public syndication API, instead. We will simply have to hope Twitter doesn't hose it.

[^10]:	It probably helps that both methods covered in this post link the static embeds back to their originals on Twitter, where one gets the full nine yards’ worth of JavaScript as Twitter prefers. Otherwise, yeah, Team Twitter might have a problem with this. Also: I would add in Twitter’s defense that its eventual retirement of old APIs won’t be an effort to make anybody’s life more difficult; rather, it’ll be a legitimate attempt to improve the quality of Twitter-accessing code. I can absolutely get behind that.
