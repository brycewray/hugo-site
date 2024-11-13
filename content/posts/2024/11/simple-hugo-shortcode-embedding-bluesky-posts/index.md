---
title: "A simple Hugo shortcode for embedding Bluesky posts"
description: "While it doesn’t do static embeds, this shortcode gives you an easy way to show content from an increasingly popular social network."
author: Bryce Wray
date: 2024-11-13T12:45:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

The [Bluesky](https://bsky.app) social media network, initially hampered by a wait-for-your-invite policy while capacity was being enhanced, recently has hit a growth spurt. Bluesky is now getting increasing attention from not only individual users but also a variety of larger entities, including a number of major sites which have been leaving Twitter/X for hoped-to-be-greener pastures. This post gives you a simple [Hugo](https://gohugo.io) shortcode for embedding Bluesky posts in your content.

<!--more-->

I shamelessly based this shortcode, called `bluesky`, on Hugo's existing [`twitter` shortcode](https://gohugo.io/content-management/shortcodes/#twitter) for embedding Twitter/x content through the [oEmbed](https://ombed.com) protocol, which Bluesky also uses. Please note:

- Bluesky's use of oEmbed is somewhat more limited than what works with Hugo's `twitter`. [This document](https://docs.bsky.app/docs/advanced-guides/oembed) explains what Bluesky's oEmbed endpoint recognizes.
- This is **not** a **static** embed, such as those about which I originally wrote in 2022 regarding content from Twitter (before I had to [deprecate this content](/posts/2022/11/static-tweets-deprecation/) due to Twitter's later closing off the applicable API) and [Mastodon](/posts/2022/06/static-mastodon-toots-hugo/). Fortunately, at least as of this writing, there apparently is no tracking code within what this embed downloads to a browser. The embed **does**, however, require JavaScript to look normal.[^noJSembed]

[^noJSembed]: If the embed appears without JavaScript running, you'll see a bare-bones, text-only representation which, actually, is very similar to how the Hugo `twitter` shortcode handles tweets if you have Hugo's [privacy settings](https://gohugo.io/about/privacy/) set appropriately --- and, in fact, that may be preferable to those who are likely to disable JavaScript in their browsers.

## Using the `bluesky` shortcode

The `bluesky` shortcode takes only one parameter: `link` for the URL of the Bluesky post you want to embed. Here is an example of the `bluesky` shortcode in use[^commentsGo]:

[^commentsGo]: {{% mdcode-fn %}}

```md
{{</* bluesky link="https://bsky.app/profile/bsky.app/post/3latotljnec2h" */>}}
```

. . . which produces the following:

{{< bluesky link="https://bsky.app/profile/bsky.app/post/3latotljnec2h" >}}

## The code

```go-html-template{filename="bluesky.html"}
{{- $link := .Get "link"  -}}
{{- $query := querify "url" $link -}}
{{- $request := printf "https://embed.bsky.app/oembed?%s" $query -}}

{{- $jsonOembed := resources.GetRemote $request -}}
{{- $jsonOembed = $jsonOembed | transform.Unmarshal -}}
{{- $jsonOHTML := $jsonOembed.html -}}
{{- $jsonOHTML | safeHTML -}}
```

