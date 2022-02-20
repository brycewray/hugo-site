---
layout: singlepost
tags: post
title: "Static tweets in Eleventy and Hugo • Part 2"
subtitle: "Getting similar data, but from a safer source"
description: "Using Twitter’s preferred API to embed static tweets."
author: Bryce Wray
date: 2022-02-11T14:43:00-06:00
lastmod: 2022-02-20T11:48:00-06:00
#initTextEditor: Ulysses
discussionId: "2022-02-static-tweets-eleventy-hugo-part-2"
featured_image: twitter-icon--alexander-shatov-k1xf2D7jWUs-unsplash_2400x1800.jpg
featured_image_width: 2400
featured_image_height: 1800
featured_image_alt: "Digital image of a blue Twitter logo on a dark blue, rounded cube"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@alexbemore?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexander Shatov</a>; <a href="https://unsplash.com/s/photos/twitter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

A few days ago, I issued [a post](/posts/2022/02/static-tweets-eleventy-hugo/) explaining how to embed fully static Twitter content in your [Eleventy](https://11ty.dev/)- or [Hugo](https://gohugo.io/)-based website. (If you haven’t yet read that post, please do so before proceeding, so you can better understand what follows below.)

The Eleventy-based solution I offered gets Twitter data from Version 1.1 of the Twitter Developer API, while the Hugo-based solution accesses Twitter’s public syndication API. Although these two approaches work fine as of now, I hinted that each could run into trouble in the future, especially since (a.) Twitter is actively encouraging migration to its newer **Version 2** Developer API and (b.) the public syndication API is discomfitingly old by internet standards.

Thus, here’s a quick update on where all that stands.

## V.2 and Eleventy

After Kyle Mitofsky, the maintainer of the `eleventy-plugin-embed-tweet` plugin, saw my post, he responded via Twitter that he “should probably look into updating the Twitter API to use v2 .&nbsp; .&nbsp;. in case they drop support [of v.1.1].” Soon thereafter, he created [an issue](https://github.com/KyleMit/eleventy-plugin-embed-tweet/issues/15) on the plugin’s GitHub repository about performing just such an update. I was very pleased to see this positive response, and hope he will have the time to bring this about soon. Meanwhile, I still highly encourage use of his plugin in Eleventy sites; after all, it’s highly unlikely that Twitter will break v.1.1 in the *near* future.

## V.2 and Hugo

In the previous post, I offered a [shortcode](https://gohugo.io/content-management/shortcodes/) to perform the static tweets stuff on a Hugo site. However, I was concerned about the shortcode’s dependence on the aging public syndication API; so, since then, I’ve spent a few days coming up with what I hope will be a better answer: *another* shortcode, called `stweetv2`. It’s very similar to `stweet` but uses the v.2 Twitter Developer API, which should enable it to work for quite some time.

### Handling credentials

Using `stweetv2` requires you to have a Twitter Developer account and supply your Twitter-assigned **Bearer Token** as an environment variable, both in local development and in production when you build to your chosen host. Actually, the build-to-host part is pretty easy, since each host has ways to let you safely store such sensitive variables for automatic injection with each build. As I said in the previous post (regarding the Eleventy plugin’s reliance on private Twitter credentials):

> .&nbsp; .&nbsp; . you’ll have to supply .&nbsp; .&nbsp;. [the credentials] to your site host, so it can access them during each build (*e.g.*, here are instructions for [Netlify](https://docs.netlify.com/configure-builds/environment-variables/), [Vercel](https://vercel.com/docs/concepts/projects/environment-variables), and [Cloudflare Pages](https://developers.cloudflare.com/pages/platform/build-configuration#environment-variables)).

But, for Hugo, the potential hang-up is in *local* development, where you obviously want to confirm that everything works *before* you try building your site on the host. Unlike how many JavaScript-based [SSGs](https://jamstack.org/generators/) work, Hugo doesn’t recognize content in a project’s `.env` file, which is typically where you’d store sensitive variables like the `BEARER_TOKEN` variable that `stweetv2` must access in order to “talk to” Twitter’s v.2 Developer API.

Fortunately, after I asked on Hugo’s Discourse forum about how to handle this in local development, I [received some great help](https://discourse.gohugo.io/t/keeping-api-keys-secret-on-github-using-a-env-file/25283/14). Here’s the bottom line: if you’re using macOS or Linux (including Linux on Windows, such as through [WSL](https://docs.microsoft.com/en-us/windows/wsl/install)), install the [`direnv`](https://direnv.net/) shell extension. `direnv` injects the required `BEARER_TOKEN` variable (and any others you may wish to store in `.env`) during your local development process. Once `direnv` is up and running, you’ll be good to go with adding `stweetv2` to your Hugo site.

What if you’re developing in Windows without using WSL? Unfortunately, `direnv` isn’t available for that setup. Instead, you can write a [shell script](https://www.howtogeek.com/261591/how-to-create-and-run-bash-shell-scripts-on-windows-10/) for your usual Hugo development command—*e.g.*, `hugo server`—with Hugo’s `env` command to add the `BEARER_TOKEN` at launch, as [explained](https://gohugo.io/getting-started/configuration/#configure-with-environment-variables) in the Hugo documentation. (**Just make sure you don’t commit the shell script**, of course!) For example, here’s one with a fake `BEARER_TOKEN` of `123456789a`:

```bash
env BEARER_TOKEN=123456789a hugo server
```

### The `stweetv2` shortcode

Here’s an example of `stweetv2` in action, using the same tweet I featured in the previous post. In your Markdown, you include:

```md
{{</* stweetv2 "1487140202141425673" */>}}
```

.&nbsp; .&nbsp;. which gives you:

{{< stweetv2 "1487140202141425673" >}}

And here’s the `stweetv2.html` shortcode itself. As in the case of the `stweet` shortcode, the CSS therein is left to you, but you can use your browser’s Inspector tool on the tweet example above to see how I handled it.

```go-html-template
{{/*
  =======
  Based on...
  - https://github.com/hugomd/blog/blob/6ad96b24117255c2a9912c566ffd081bd9bbd6f1/layouts/shortcodes/statictweet.html
  - https://hugo.md/post/update-rendering-static-tweets/
  - https://github.com/KyleMit/eleventy-plugin-embed-tweet
  - https://www.stackbit.com/blog/advanced-hugo-templates/
  =======
*/}}

{{ $Bearer_Token := os.Getenv "BEARER_TOKEN" }}
{{ $id := .Get 0 }}
{{ $authHeaders := dict "Authorization" (printf "Bearer %s" $Bearer_Token) }}
{{ $jsonURL1 := "https://api.twitter.com/2/tweets?ids=" }}
{{ $jsonURL2 := "&expansions=author_id,attachments.media_keys&tweet.fields=created_at,text,attachments,entities,source&user.fields=name,username,profile_image_url&media.fields=preview_image_url,type,url,alt_text" }}
{{ $json := getJSON $jsonURL1 $id $jsonURL2 $authHeaders }}

{{/*
  inits --
  see https://www.stackbit.com/blog/advanced-hugo-templates/ (end of "Scratch" section)
*/}}
{{ $text := "" }}
{{ $created_at := "" }}
{{ $profile_image_url := "" }}
{{ $name := "" }}
{{ $username := "" }}

{{ with $json }}
  {{ range $json.data }}
    {{ $data := . }}
    {{ $created_at = $data.created_at }}
    {{ $text = $data.text }}
    {{ with $data.entities }}
      {{ $entities := . }}
      {{ range $entities.mentions }}
        {{ $mentions := . }}
        {{ $text = replace $text (printf "@%s" $mentions.username) (printf "<a href='https://twitter.com/%s' target='_blank' rel='noopener'>@%s</a>" $mentions.username $mentions.username) }}
      {{ end }}
      {{ range $entities.hashtags }}
        {{ $hashtags := . }}
        {{ $text = replace $text (printf "#%s" $hashtags.tag) (printf "<a href='https://twitter.com/hashtag/%s?src=hash&ref_src=twsrc' target='_blank' rel='noopener'>#%s</a>" $hashtags.tag $hashtags.tag) }}
      {{ end }}
      {{ range $entities.urls }}
        {{ $urls := . }}
        {{ if not $urls.images }}
          {{ if not $urls.unwound_url }}
            {{ if in $urls.display_url "buff.ly" }}
              {{ $text = replace $text $urls.url (printf "<a href='%s' target='_blank' rel='noopener'>%s</a>" $urls.url $urls.display_url) }}
            {{ else }}
              {{ $text = replace $text $urls.url "" }}
            {{ end }}
          {{ else }}
            {{ $text = replace $text $urls.url (printf "<a href='%s' target='_blank' rel='noopener'>%s</a>" $urls.url $urls.display_url) }}
          {{ end }}
        {{ else }}
          {{ $text = replace $text $urls.url (printf "<a href='%s' target='_blank' rel='noopener'>%s</a>" $urls.url $urls.display_url) }}
        {{ end }}
      {{ end }}
    {{ end }}
  {{ end }}
  {{ with $json.includes }}
    {{ $includes := . }}
    {{ range $includes.users }}
      {{ $profile_image_url = .profile_image_url }}
      {{ $name = .name }}
      {{ $username = .username }}
    {{ end }}
  {{ end }}
{{ end }}

<blockquote class="tweet-card">
  <div class="tweet-header">
    <a class="tweet-profile" href="https://twitter.com/{{ $username }}" target="_blank" rel="noopener">
      <img src="{{ $profile_image_url }}" alt="Twitter avatar for @{{ $username }}" />
    </a>
    <div class="tweet-author">
      <a class="tweet-author-name" href="https://twitter.com/{{ $username}}" target="_blank" rel="noopener">{{ $name }}</a>
      <a class="tweet-author-handle" href="https://twitter.com/{{ $username }}" target="_blank" rel="noopener">@{{ $username }}</a>
    </div>
  </div>
  <p class="tweet-body">
    {{ .Page.RenderString $text }}
  </p>
  {{ with $json}}
    {{ with $json.includes }}
      {{ $includes := . }}
      {{ range $includes.media }}
        {{ if not (eq .type "animated_gif" ) }}
          <img src="{{ .url }}" alt="Image {{ .media_key }} from Twitter" class="tweet-img" />
          {{/* This will need to be in the main blockquote for multiple included images */}}
        {{ end }}
      {{ end }}
    {{ end }}
  {{ end }}
  <div class="tweet-footer">
    <a href='https://twitter.com/{{ $username }}/status/{{ $id }}' class='tweet-date' target='_blank' rel='noopener'>{{ dateFormat "3:04 PM • January 2, 2006" $created_at }}</a>&nbsp;<span class="legal">(UTC)</span></p>
  </div>
</blockquote>
```

**Update, 2022-02-18**: I revised this slightly after learning that the Twitter API doesn’t quite supply all the data one needs to display animated GIFs. (See “[Gems in the rough #14](/posts/2022/02/gems-in-rough-14/)” for more information.)
{.yellowBox}

## Testing with `cURL`

By the way, there are times when Twitter’s APIs don’t respond because of some outage. If that happens during your development process, as it indeed did when I was finishing up work on `stweetv2`, you can confirm that it’s Twitter’s fault, not yours, by using the [`cURL` command](https://developer.ibm.com/articles/what-is-curl-command/) to submit your request to the API. For example, the `cURL` version of what we did above to get that tweet—again substituting `123456789a` for a real `BEARER_TOKEN`—is:

```bash
curl "https://api.twitter.com/2/tweets?ids=1487140202141425673&expansions=author_id,attachments.media_keys&tweet.fields=created_at,text,attachments,entities,source&user.fields=name,username,profile_image_url&media.fields=preview_image_url,type,url,alt_text" -H "Authorization: Bearer 123456789a"
```

In fact, the [Twitter Developer portal](https://developer.twitter.com/) has tools that let you auto-build such `cURL` commands to see what the API gives you based on the options you select. I found these tools invaluable while building `stweetv2`; and, if you choose to tinker with it for your own purposes, I suspect they’ll aid you, too.
