---
title: "Webmentions yes, JavaScript no: the code"
description: "Code and comments regarding this site’s all-Hugo, no-JS implementation of webmentions."
author: Bryce Wray
date: 2022-05-24T15:00:00-05:00
#lastmod:
draft: true
#initTextEditor: iA Writer
discussionId: "2022-05-webmentions-yes-javascript-no-code"
---

**Note**: This follow-up to "[Webmentions yes, JavaScript no](/posts/2022/05/webmentions-yes-javascript-no)" assumes you've already read that post. (It's fairly short, especially for me.)
{.yellowBox}

A

## General tips and comments

Before I get to the actual code, here are a few observations that you may find useful if you implement this, or anything remotely like it.

### Be careful about caching

This code uses Hugo's `getJSON` feature to grab webmentions and their content. As the [documentation](https://gohugo.io/getting-started/configuration/#configure-file-caches) explains, Hugo's default is to cache "JSON-got" stuff in a JSON caching XXXX I'd already set this in the site config file to suit the usual  (I prefer to use a config.yaml` rather than Hugo's more common `config.toml`, so yours may look a little different):

```yaml
caches:
  getjson:
    dir: :resourceDir/json
    maxAge: 0
```

A setting of `0` disables it; a setting of `1`
	
See also:
- https://gohugo.io/getting-started/configuration/#configure-file-caches
- https://discourse.gohugo.io/t/getjson-cache/23127

it will keep new webmentions from appearing when you do successive builds. The downside of turning off caching is that, in dev mode, it slows down Hugo a bit. (As you accumulate more webmentions over time, that might get to be a hassle; but the alternative involves a lot of manual refreshes and tinkering with webmention.io and, if you use it, Brid.gy---and, even then, still may not work. So just turn off caching and live with it.)

As for the code itself:

- Yes, the inits have to be multiple lines.
- Yes, the replaces have to be multiple lines.
- No, not all the variables are being used---and they may not be for quite a while, if ever.
- No, the code doesn't yet implement the *sending* of webmentions, a capability I've never yet seen fit to add to this site. I'm still thinking about that one. Besides, even if I do add it, I'll probably do it in a separate file, keeping this one as the receive-webmentions file (hence the name, `webmentions-rx.html`).

## The code

<details><summary>Click/tap here to toggle open/close.</summary>

As of this writing, here's what you'll find in the `webmentions-rx.html` partial:

```go-html-template
{{- /*
  === Formerly known as "webmentions-pipes.html" ===

  Apologies for the ugliness of the following.
  First, I'll make it work; then I'll **try**,
  at least within the limits of Go and Hugo,
  to make it a bit DRY-er at the very least.
  Fortunately, both Go and Hugo are so fast,
  I don't pay a (real) penalty for this spaghetti.
  But I **do** want to do better. Trust me, friends.
  And, yes, there are some unused vars in here.
  Some are for testing only; some are yet to be used.
*/ -}}
{{- /*
  Regarding all the variable inits below, see:
  https://discourse.gohugo.io/t/init-and-reassign-multiple-variables-at-once/27039
*/ -}}
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
{{- $json := getJSON $ThingToGet }}
{{- $json = $json | jsonify -}}{{- /* We'll have to unmarshal it at the end */ -}}
{{- $jsonPreFix := $json -}}{{- /* Save it j/i/c */ -}}
{{- /*
  Now, we'll create a string version of $json so
  we can do some replacements (explained below).
*/ -}}
{{- $jsonString := string $json -}}
{{- /*
  Because the webmention.io API provides items
  with hyphenated keys --- and, not surprisingly,
  Hugo balks at that --- we'll now rename them
  with camelCase before we bring the resulting
  $jsonString **back into** $json.
*/ -}}
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
{{- /*
  With replaces done, we feed them back into $json
  **and** unmarshal $json. Otherwise, it'll be no-go
  (no pun intended). See also:
  - https://gohugo.io/functions/transform.unmarshal/
  - https://discourse.gohugo.io/t/loading-json-data-file-as-a-resource/15213/9
  - https://www.thenewdynamic.com/article/toward-using-a-headless-cms-with-hugo-part-2-building-from-remote-api/
*/ -}}
{{- $json = $jsonString | transform.Unmarshal -}}

<div class="webmentions" id="webmentions">
  {{- with $json -}}
    {{- if $json.children -}}
      <h3>Webmentions</h3>
      {{- /* No reason to show if there are none for this page */ -}}
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
  {{- end }}
</div>
```

</details>

## \[Wrapup]

A