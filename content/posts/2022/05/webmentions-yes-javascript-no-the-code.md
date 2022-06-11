---
tags:
- post
- code
title: "Webmentions yes, JavaScript no: the code"
description: "A walkthrough of this site’s all-Hugo, no-JS implementation of webmentions."
author: Bryce Wray
date: 2022-05-25T06:18:00-05:00
lastmod: 2022-05-29T10:52:00-05:00
#draft: true
#initTextEditor: iA Writer
discussionId: "2022-05-webmentions-yes-javascript-no-the-code"
---

{{% disclaimer %}}
<br />

**Note**: This follow-up to "[Webmentions yes, JavaScript no](/posts/2022/05/webmentions-yes-javascript-no)" assumes you've already read that post.
{.yellowBox}

While the code that now makes this site show its [webmentions](https://indieweb.org/Webmention) is a bit more presentable than when I wrote the other post, it remains not nearly as [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) or elegant as it should be. Nonetheless, some have asked to get the full code plus an explainer, so that's why we are gathered here today, brothers and sisters.

## Introduction

Before we get to the actual code, here are a few tips and comments that you may find useful if you implement this, or anything remotely like it.

### Be careful about caching

Put your [`getjson`](https://gohugo.io/templates/data-templates/#get-remote-data) cache folder within `.gitignore`. Why? Because, every time you accumulate webmentions, Git will track the resulting cache files. That really serves no purpose. As for which folder that is, see [the documentation](https://gohugo.io/getting-started/configuration/#configure-file-caches). In this case, the site config file sets a non-default location, from my earlier work on enabling [static tweets](/posts/2022/02/static-tweets-eleventy-hugo/), and I've chosen to leave it that way.

You might want to set yours manually, too, if only so that you can change the default `maxAge` setting of `-1`. While that doesn't bother the cached static tweets, it does seems to keep Hugo from grabbing new webmentions as it should. Thus, I'd suggest `10s`, based on a [2018 thread in the Hugo Discourse forum](https://discourse.gohugo.io/t/sass-resources-tracked-in-git/26522).

### Answers to obvious questions

The code itself will generate some questions that are easy to anticipate, so here are the answers, some of which will get additional explanation as we go through the code:

- Yes, the variable initializations have to be multiple lines.
- Yes, the text replacements have to be multiple lines. (What text replacements? We'll get to that.)
- No, not all the variables are being used; and they may not be for quite a while, if ever.
- No, the code doesn't yet implement the *sending* of webmentions, a capability I've never yet seen fit to add to this site. Besides, even if I were to add it, I'd probably do it in a separate partial while keeping this one as the receive-webmentions partial (hence the `rx` in its name, `webmentions-rx.html`).

### Styling

If you want to see the CSS classes I use to style the webmentions, they're on the site repo as (at this writing) an SCSS partial called [`_webmentions.scss`](https://github.com/brycewray/hugo_site/blob/main/assets/scss/_webmentions.scss). Of course, that styling is in coordination with variables and other items from within the site's overall SCSS, so you might need to do some digging (or, better yet, using your browser's Inspector tool on some of my existing webmentions); but this will give you at least some idea of how to style your webmentions.

## And now, the code

### Sample API return (optional viewing)

<details><summary>Click/tap here to toggle open/close.</summary>

It's almost time to get into the code---but, first, to help you understand exactly what we're trying to obtain and display, here's what the [webmention.io](https://webmention.io) API returns for [one page](/posts/2022/05/simplify-simplify-maybe-for-real-this-time/) on this site:

```json
{
  "children": [
    {
      "author": {
        "name": "Aleksandr Hovhannisyan",
        "photo": "https://webmention.io/avatar/pbs.twimg.com/a57ef2a18b0456507f96c7391f6f5c067084b20adca201c076619412ff6dff27.jpg",
        "type": "card",
        "url": "https://twitter.com/hovhaDovah"
      },
      "like-of": "https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/",
      "published": null,
      "type": "entry",
      "url": "https://twitter.com/BryceWrayTX/status/1528051733477396482#favorited-by-1325417571223527424",
      "wm-id": 1402128,
      "wm-private": false,
      "wm-property": "like-of",
      "wm-received": "2022-05-22T17:27:19Z",
      "wm-source": "https://brid.gy/like/twitter/BryceWrayTX/1528051733477396482/1325417571223527424",
      "wm-target": "https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/"
    },
    {
      "author": {
        "name": "Marshall",
        "photo": "https://webmention.io/avatar/pbs.twimg.com/960e8699fba9c1c002a9d721d8a6a9b40136ac3ee4d8126265c816a7eba23195.jpg",
        "type": "card",
        "url": "https://twitter.com/marshmallocreme"
      },
      "like-of": "https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/",
      "published": null,
      "type": "entry",
      "url": "https://twitter.com/BryceWrayTX/status/1528051733477396482#favorited-by-14237201",
      "wm-id": 1402126,
      "wm-private": false,
      "wm-property": "like-of",
      "wm-received": "2022-05-22T17:27:17Z",
      "wm-source": "https://brid.gy/like/twitter/BryceWrayTX/1528051733477396482/14237201",
      "wm-target": "https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/"
    },
    {
      "author": {
        "name": "Arpit",
        "photo": "https://webmention.io/avatar/pbs.twimg.com/c2657e3aa183e1b397ffcf5477ad8be765f5606d335c034205ea081b616be3ba.jpg",
        "type": "card",
        "url": "https://twitter.com/ArpitCodes"
      },
      "like-of": "https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/",
      "published": null,
      "type": "entry",
      "url": "https://twitter.com/BryceWrayTX/status/1528051733477396482#favorited-by-423471075",
      "wm-id": 1402127,
      "wm-private": false,
      "wm-property": "like-of",
      "wm-received": "2022-05-22T17:27:17Z",
      "wm-source": "https://brid.gy/like/twitter/BryceWrayTX/1528051733477396482/423471075",
      "wm-target": "https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/"
    },
    {
      "author": {
        "name": "Bryce Wray",
        "photo": "https://webmention.io/avatar/pbs.twimg.com/b7a80f06bd0444925bf3506019ab0f10869ae49d4b8c35ea126612f1875ceef2.jpg",
        "type": "card",
        "url": "https://twitter.com/BryceWrayTX"
      },
      "content": {
        "html": "The quality and depth of your content consistently makes up for any shortcomings you may perceive — that much I can assure you, sir.\n\\u003ca class=\"u-mention\" href=\"https://twitter.com/hovhaDovah\"\\u003e\\u003c/a\\u003e",
        "text": "The quality and depth of your content consistently makes up for any shortcomings you may perceive — that much I can assure you, sir."
      },
      "in-reply-to": "https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/",
      "published": "2022-05-21T17:58:16+00:00",
      "type": "entry",
      "url": "https://twitter.com/BryceWrayTX/status/1528072700400476160",
      "wm-id": 1402125,
      "wm-private": false,
      "wm-property": "in-reply-to",
      "wm-received": "2022-05-22T17:27:16Z",
      "wm-source": "https://brid.gy/comment/twitter/BryceWrayTX/1528051733477396482/1528072700400476160",
      "wm-target": "https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/"
    },
    {
      "author": {
        "name": "Aleksandr Hovhannisyan",
        "photo": "https://webmention.io/avatar/pbs.twimg.com/a57ef2a18b0456507f96c7391f6f5c067084b20adca201c076619412ff6dff27.jpg",
        "type": "card",
        "url": "https://twitter.com/hovhaDovah"
      },
      "content": {
        "html": "Good read! I've been wanting to do this for a while now. My current design doesn't lend itself well to \"just writing\" because many of my (poor) design decisions impact my writing, like the permitted length for titles, descriptions, tags, etc., and thumbnails are tedious to find.\n\\u003ca class=\"u-mention\" href=\"https://twitter.com/BryceWrayTX\"\\u003e\\u003c/a\\u003e\n\\u003ca class=\"u-mention\" href=\"https://www.brycewray.com/\"\\u003e\\u003c/a\\u003e",
        "text": "Good read! I've been wanting to do this for a while now. My current design doesn't lend itself well to \"just writing\" because many of my (poor) design decisions impact my writing, like the permitted length for titles, descriptions, tags, etc., and thumbnails are tedious to find."
      },
      "in-reply-to": "https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/",
      "published": "2022-05-21T17:40:09+00:00",
      "type": "entry",
      "url": "https://twitter.com/hovhaDovah/status/1528068142479687681",
      "wm-id": 1402124,
      "wm-private": false,
      "wm-property": "in-reply-to",
      "wm-received": "2022-05-22T17:27:14Z",
      "wm-source": "https://brid.gy/comment/twitter/BryceWrayTX/1528051733477396482/1528068142479687681",
      "wm-target": "https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/"
    },
    {
      "author": {
        "name": "Marshall",
        "photo": "https://webmention.io/avatar/pbs.twimg.com/960e8699fba9c1c002a9d721d8a6a9b40136ac3ee4d8126265c816a7eba23195.jpg",
        "type": "card",
        "url": "https://twitter.com/marshmallocreme"
      },
      "content": {
        "html": "I love the spirit of this. I've been trying to do something similar: Make writing, and creating in general, feel as light as possible.\n\\u003ca class=\"u-mention\" href=\"https://twitter.com/BryceWrayTX\"\\u003e\\u003c/a\\u003e\n\\u003ca class=\"u-mention\" href=\"https://www.brycewray.com/\"\\u003e\\u003c/a\\u003e",
        "text": "I love the spirit of this. I've been trying to do something similar: Make writing, and creating in general, feel as light as possible."
      },
      "in-reply-to": "https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/",
      "published": "2022-05-21T20:01:35+00:00",
      "type": "entry",
      "url": "https://twitter.com/marshmallocreme/status/1528103732042272768",
      "wm-id": 1402123,
      "wm-private": false,
      "wm-property": "in-reply-to",
      "wm-received": "2022-05-22T17:27:13Z",
      "wm-source": "https://brid.gy/comment/twitter/BryceWrayTX/1528051733477396482/1528103732042272768",
      "wm-target": "https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/"
    }
  ],
  "name": "Webmentions",
  "type": "feed"
}
```

</details>

And now, it's time to dive in.

### Variables

We "begin at the beginning," by initializing a whole passel of variables. To repeat one of those obvious questions I mentioned earlier: why don't we do it more cleanly, rather than one frickin' line per variable? Because, it would appear, [we can't](https://discourse.gohugo.io/t/init-and-reassign-multiple-variables-at-once/2703).

```go-html-template
{{- $json := "Init" -}}
{{- $text := "" -}}
{{- $children := "" -}}
{{- $stuff := "" -}}
{{- $AddlStats := "" -}}
{{- $API_Origin := "" -}}
{{- $DomainToPoll := "" -}}
{{- $PageToPoll := "" -}}
{{- $LeadToToken := "" -}}
{{- $SafeURL := "" -}}
{{- $WMCount := "" -}}
{{- $likes := "" -}}
{{- $likesYes := "" -}}
{{- $reposts := "" -}}
{{- $repostsYes := "" -}}
{{- $replies := "" -}}
{{- $repliesYes := "" -}}
{{- $mentions := "" -}}
{{- $mentionsYes := "" -}}
{{- $API_Origin = "https://webmention.io/api/mentions.jf2" -}}
{{- $AddlStats = "?target=https://" -}}
{{- $DomainToPoll = "www.brycewray.com" -}}{{/* the 'www.' matters! */}}
{{- $PageToPoll = .Permalink -}}
{{- $SafeURL = print "%s%s%s" "https://" $DomainToPoll .RelPermalink -}}
{{- $LeadToToken = "&token=" -}}
{{- $TOKEN := os.Getenv "WEBMENTION_IO_TOKEN" -}}
{{- $ThingToGet := print $API_Origin $AddlStats $DomainToPoll .RelPermalink -}}
```

This will allow us to ask [webmention.io](https://webmention.io) for data on a per-page basis where it's applicable.

**Important**: Pay special attention to `$DomainToPoll`. That's got to be the user name you've established with webmention.io, so be sure you get it exactly right (which, in my case, includes the `www.`).
{.yellowBox}

### Calling the API

Then, we initialize the most important variable, `$json`, by using [`getJSON`](https://gohugo.io/templates/data-templates/#get-remote-data) to fetch data from webmention.io.

```go-html-template
{{- $json := getJSON $ThingToGet }}
```

However, this isn't quite ready for prime time, so we've got some `$json`-massaging to do.

### Fixing key names

For one thing, what we've just pulled into `$json` hasn't really come in as stock JSON but, rather, as a map. Optionally, you can toggle the following to see what I mean; it will show the map from that same webmention.io JSON you could've viewed in the earlier toggle:

<details><summary>Click/tap here to toggle open/close.</summary>

map[children:[map[author:map[name:Aleksandr Hovhannisyan photo:https://webmention.io/avatar/pbs.twimg.com/a57ef2a18b0456507f96c7391f6f5c067084b20adca201c076619412ff6dff27.jpg type:card url:https://twitter.com/hovhaDovah] like-of:https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/ published:<nil> type:entry url:https://twitter.com/BryceWrayTX/status/1528051733477396482#favorited-by-1325417571223527424 wm-id:1.402128e+06 wm-private:false wm-property:like-of wm-received:2022-05-22T17:27:19Z wm-source:https://brid.gy/like/twitter/BryceWrayTX/1528051733477396482/1325417571223527424 wm-target:https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/] map[author:map[name:Marshall photo:https://webmention.io/avatar/pbs.twimg.com/960e8699fba9c1c002a9d721d8a6a9b40136ac3ee4d8126265c816a7eba23195.jpg type:card url:https://twitter.com/marshmallocreme] like-of:https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/ published:<nil> type:entry url:https://twitter.com/BryceWrayTX/status/1528051733477396482#favorited-by-14237201 wm-id:1.402126e+06 wm-private:false wm-property:like-of wm-received:2022-05-22T17:27:17Z wm-source:https://brid.gy/like/twitter/BryceWrayTX/1528051733477396482/14237201 wm-target:https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/] map[author:map[name:Arpit photo:https://webmention.io/avatar/pbs.twimg.com/c2657e3aa183e1b397ffcf5477ad8be765f5606d335c034205ea081b616be3ba.jpg type:card url:https://twitter.com/ArpitCodes] like-of:https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/ published:<nil> type:entry url:https://twitter.com/BryceWrayTX/status/1528051733477396482#favorited-by-423471075 wm-id:1.402127e+06 wm-private:false wm-property:like-of wm-received:2022-05-22T17:27:17Z wm-source:https://brid.gy/like/twitter/BryceWrayTX/1528051733477396482/423471075 wm-target:https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/] map[author:map[name:Bryce Wray photo:https://webmention.io/avatar/pbs.twimg.com/b7a80f06bd0444925bf3506019ab0f10869ae49d4b8c35ea126612f1875ceef2.jpg type:card url:https://twitter.com/BryceWrayTX] content:map[html:The quality and depth of your content consistently makes up for any shortcomings you may perceive — that much I can assure you, sir. <a class="u-mention" href="https://twitter.com/hovhaDovah"></a> text:The quality and depth of your content consistently makes up for any shortcomings you may perceive — that much I can assure you, sir.] in-reply-to:https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/ published:2022-05-21T17:58:16+00:00 type:entry url:https://twitter.com/BryceWrayTX/status/1528072700400476160 wm-id:1.402125e+06 wm-private:false wm-property:in-reply-to wm-received:2022-05-22T17:27:16Z wm-source:https://brid.gy/comment/twitter/BryceWrayTX/1528051733477396482/1528072700400476160 wm-target:https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/] map[author:map[name:Aleksandr Hovhannisyan photo:https://webmention.io/avatar/pbs.twimg.com/a57ef2a18b0456507f96c7391f6f5c067084b20adca201c076619412ff6dff27.jpg type:card url:https://twitter.com/hovhaDovah] content:map[html:Good read! I've been wanting to do this for a while now. My current design doesn't lend itself well to "just writing" because many of my (poor) design decisions impact my writing, like the permitted length for titles, descriptions, tags, etc., and thumbnails are tedious to find. <a class="u-mention" href="https://twitter.com/BryceWrayTX"></a> <a class="u-mention" href="https://www.brycewray.com/"></a> text:Good read! I've been wanting to do this for a while now. My current design doesn't lend itself well to "just writing" because many of my (poor) design decisions impact my writing, like the permitted length for titles, descriptions, tags, etc., and thumbnails are tedious to find.] in-reply-to:https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/ published:2022-05-21T17:40:09+00:00 type:entry url:https://twitter.com/hovhaDovah/status/1528068142479687681 wm-id:1.402124e+06 wm-private:false wm-property:in-reply-to wm-received:2022-05-22T17:27:14Z wm-source:https://brid.gy/comment/twitter/BryceWrayTX/1528051733477396482/1528068142479687681 wm-target:https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/] map[author:map[name:Marshall photo:https://webmention.io/avatar/pbs.twimg.com/960e8699fba9c1c002a9d721d8a6a9b40136ac3ee4d8126265c816a7eba23195.jpg type:card url:https://twitter.com/marshmallocreme] content:map[html:I love the spirit of this. I've been trying to do something similar: Make writing, and creating in general, feel as light as possible. <a class="u-mention" href="https://twitter.com/BryceWrayTX"></a> <a class="u-mention" href="https://www.brycewray.com/"></a> text:I love the spirit of this. I've been trying to do something similar: Make writing, and creating in general, feel as light as possible.] in-reply-to:https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/ published:2022-05-21T20:01:35+00:00 type:entry url:https://twitter.com/marshmallocreme/status/1528103732042272768 wm-id:1.402123e+06 wm-private:false wm-property:in-reply-to wm-received:2022-05-22T17:27:13Z wm-source:https://brid.gy/comment/twitter/BryceWrayTX/1528051733477396482/1528103732042272768 wm-target:https://www.brycewray.com/posts/2022/05/simplify-simplify-maybe-for-real-this-time/]] name:Webmentions type:feed]

</details>

If we left it in that form, Hugo would be able to loop through *some* of it but would crash on other parts. Trust me on this: I learned it the hard way while building this code.

So, first, we [`jsonify`](https://gohugo.io/functions/jsonify/) it so it'll *really* be JSON. Then we save that unvarnished, unedited result in another variable, just in case we ever want it later.[^unvarnishedJSON] Next, we create a **string** version of `$json` so we can do some text *replacements*. (Hugo doesn't allow using `replace` in anything but a string.) But what are we going to replace? Well, the webmention.io API returns some items with *hyphenated* keys (*e.g.*, `in-reply-to`) and Hugo "[don't play that](https://mygeekwisdom.com/2014/02/08/homey-dont-play-that/)." Thus, we'll use `replace` to rename each such key using "camelCase" style (*e.g.*, `inReplyTo`).

[^unvarnishedJSON]: As of this writing, I haven't yet found a use for that "original" JSON, but Stuff Happens.

```go-html-template
{{- $json = $json | jsonify -}}{{- /* We'll have to unmarshal it at the end */ -}}
{{- $jsonPreFix := $json -}}{{- /* Save it j/i/c */ -}}
{{- /*
  Now, we'll create a string version of $json so
  we can do some replacements (explained below).
*/ -}}
{{- $jsonString := string $json -}}
{{- $jsonString := replace $jsonString "in-reply-to" "inReplyTo" -}}
{{- $jsonString := replace $jsonString "like-of" "likeOf" -}}
{{- $jsonString := replace $jsonString "repost-of" "repostOf" -}}
{{- $jsonString := replace $jsonString "bookmark-of" "bookmarkOf" -}}
{{- $jsonString := replace $jsonString "mention-of" "mentionOf" -}}
{{- $jsonString := replace $jsonString "wm-id" "wmId" -}}
{{- $jsonString := replace $jsonString "wm-private" "wmPrivate" -}}
{{- $jsonString := replace $jsonString "wm-property" "wmProperty" -}}
{{- $jsonString := replace $jsonString "wm-received" "wmReceived" -}}
{{- $jsonString := replace $jsonString "wm-source" "wmSource" -}}
{{- $jsonString := replace $jsonString "wm-target" "wmTarget" -}}
```

### Back to `$json`

With the contents of `$jsonString` now suitably fixed, we feed them back into `$json`, which we then [unmarshal](https://gohugo.io/functions/transform.unmarshal/) so it'll once again be true JSON (not a string) through which Hugo can loop.

```go-html-template
{{- $json = $jsonString | transform.Unmarshal -}}
```

### The web content

Now---finally!---we provide the actual HTML content for the partial, complete with some fairly tortured [`range`](https://gohugo.io/functions/range/) and [`with`](https://gohugo.io/functions/with/) constructions that check for, and provide applicable parts of, the webmentions. And what do I mean by "check for"? Well, if you saw that API snippet I provided above, you'll notice not all parts have the same keys. After all, some items are `reply-to` entries (now `replyTo` since what we did above), some have `content` entries, and so on; thus, we have to check the items for the presence or absence of such entries and then loop accordingly.

First, we begin the overall `with` conditional:

```go-html-template
<div class="webmentions" id="webmentions">
  {{- with $json -}}
```

Then, we set the rules of engagement, or perhaps I should call them the "rules of display," which establish which possible things we'll show, based on what we got back from webmention.io:

```go-html-template
    {{- if $json.children -}}
      <h3>Webmentions</h3>
      {{- /*
      No reason to show that heading if
      this page has **no** webmentions.
      */ -}}
    {{- end }}
    {{- range $json.children -}}
      {{- $children = . -}}
      {{- if $children.likeOf -}}
        {{- $likesYes = true -}}
      {{- end }}
      {{- if $children.content -}}
        {{- $repliesYes = true -}}
      {{- end }}
      {{- if $children.repostOf -}}
        {{- range $children -}}
          {{- if (and ($children.content) ($children.repostOf)) -}}
            {{- $repliesYes = false -}}
            {{- $repostsYes = true -}}
          {{- else -}}
            {{ $repostsYes = true -}}
          {{- end }}
        {{- end }}
      {{- end }}
      {{- if $children.mentionOf -}}
        {{ $mentionsYes = true -}}
      {{- end }}
    {{- end }}
```

With those ground rules established, we provide for "likes":

```go-html-template
    {{- if $likesYes -}}
      <details>
        <summary class="h4">Likes</summary>
        <ul class="webmentions__list_facepile">
          {{- range $json.children -}}
            {{- $children = . -}}
            {{- with $children.likeOf -}}
              <li>
                <a href="{{ $children.author.url }}" class="u-url">
                  <img
                    class="webmention__author__photo u-photo"
                    src="{{ $children.author.photo }}"
                    alt="{{ $children.author.name }}"
                  >
                </a>
              </li>
            {{- end }}
          {{- end }}
        </ul>
      </details>
    {{- end }}
```

. . . and "reposts":

```go-html-template
    {{- if $repostsYes -}}
      <details>
        <summary class="h4">Reposts</summary>
        <ul class="webmentions__list_facepile">
          {{- range $json.children -}}
            {{- $children = . -}}
            {{- with $children.repostOf -}}
              <li>
                <a href="{{ $children.url }}" class="u-url">
                  <img
                    class="webmention__author__photo u-photo"
                    src="{{ $children.author.photo }}"
                    alt="{{ $children.author.name }}"
                  >
                </a>
              </li>
            {{- end }}
          {{- end }}
        </ul>
      </details>
    {{- end }}
```

. . . and "replies." Please note that:

- The `range` is [`sort`](https://gohugo.io/functions/sort/)-ed by the `published` timestamp for each reply. That works fine for replies, but things will be different in a bit.
- I chose not to show replies from me[^selfReplies]. You may choose differently for yourself and, if so, take note of that [`if ne`](https://gohugo.io/functions/ne/#readout) conditional.

[^selfReplies]: By "replies from me," I mean items like what you may have seen in those optional-viewing snippets from the API return: I replied to someone's tweet that was, itself, a reply to my original tweet about the post in question.

```go-html-template
    {{- if $repliesYes -}}
      <details>
        <summary class="h4">Replies</summary>
        <ul class="webmentions__list">
          {{- range sort $json.children ".published" }}
            {{- $children = . -}}
            {{- with $children.content -}}
              {{- if ne $children.author.name "Bryce Wray" -}}
                <li class="webmentions__item">
                  <article class="webmention h-cite">
                    <div class="webmention__meta">
                      <a class="webmention__author p-author h-card u-url" href="{{ $children.url }}">
                        <img class="webmention__author__photo u-photo" src="{{ $children.author.photo }}" alt="{{ $children.author.name }}">
                        <strong class="p-name">{{ $children.author.name }}</strong>
                      </a>&nbsp;
                      <span class="pokey">
                        <time class="webmention__pubdate dt-published" datetime="{{ $children.published }}">{{ $children.published | dateFormat "Jan 2, 2006 15:04:05" }} (UTC)</time>
                      </span>
                    </div>
                    <div class="webmention__content p-content">
                      {{ $children.content.html | safeHTML }}
                    </div>
                  </article>
                </li>
              {{- end }}{{- /* if not me */ -}}
            {{- end }}
          {{- end }}
        </ul>
      </details>
    {{- end }}
```

Lastly, we get to "mentions." *This* is where the `sort` became weird. Try as I might, I couldn't get it to use `published` as with "replies," so I resorted to the `wmId` timestamp. While `wmId` won't necessarily allow for sorting in correct chronological order, this is one of those "any port in a storm" things: if we can't use `published`, `wmId` appears to be the best backup choice.

```go-html-template
    {{- if $mentionsYes }}
      <details>
        <summary class="h4">Mentions</summary>
        <ul class="webmentions__list">
          {{- range sort $json.children ".wmId" "asc" -}}
          {{/* for some reason, it doesn't sort correctly with ".published" */}}
            {{- $children = . -}}
            {{- with $children.content -}}
              {{- if ne $children.author.name "Bryce Wray" -}}
                <li class="webmentions__item">
                  <article class="webmention h-cite">
                    <div class="webmention__meta">
                      <a class="webmention__author p-author h-card u-url" href="{{ $children.author.url }}">
                        <img class="webmention__author__photo u-photo" src="{{ $children.author.photo }}" alt="{{ $children.author.name }}">
                        <strong class="p-name">{{ $children.author.name }}</strong>
                      </a>&nbsp;
                      <span class="legal">
                        <time class="webmention__pubdate dt-published" datetime="{{ $children.published }}">{{ $children.published | dateFormat "Jan 2, 2006 15:04:05" }} (UTC)</time>
                      </span>
                    </div>
                    <div class="webmention__content p-content">
                      {{ $children.content.html | safeHTML }}
                    </div>
                  </article>
                </li>
              {{- end }}
            {{- end }}
          {{- end }}
        </ul>
      </details>
    {{- end }}
```

With that, we're done looping!

Now we can bring this baby in for a smooth landing, `end`-ing the overall `with` and closing the wrapping `div`:

```go-html-template
  {{- end }}
</div>
```

## The whole enchilada?

If you prefer to see the code in one fell swoop rather than the staggered method I've provided above, it's [available at the repo](https://github.com/brycewray/hugo_site/blob/main/layouts/partials/webmentions-rx.html), complete with some comments that will offer some of the same explanations I've provided herein. Of course, it may differ somewhat from what you see in this post, especially as time passes, but the logic should be pretty much the same.

Please [let me know](/contact/) if you need more explanation than I've provided above.
