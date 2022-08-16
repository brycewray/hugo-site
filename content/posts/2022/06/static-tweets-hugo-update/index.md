---
title: "Static tweets in Hugo: an update"
description: "Now!! With new features!! This Hugo shortcode allows you to embed tweets with link “cards.”"
author: Bryce Wray
date: 2022-06-07T15:46:00-05:00
lastmod: 2022-08-15T08:09:00-05:00
#initTextEditor: iA Writer
---

**Further info, 2022‑06‑08**: I discovered one additional requirement to make this work, so please see my "**Important**" note at the end.
{.yellowBox}

**Update from the future in general (!)**: I continue to improve upon the [Hugo](https://gohugo.io) shortcode described herein. Any displayed tweets in this or other posts obviously will be rendered by the most current code available when the site is on Hugo --- with the only exception being when it serves a purpose to show a less well-rendered tweet, such as for a comparison between Hugo's standard `tweet` shortcode and my own shortcode.\
\
**However**, in this or any other related post as the actual code changes, I will **not** change the post's code sample (for archival purposes) **unless** there's an overriding reason to change; *e.g.*, to correct a mistake that slipped past me during the editing process.\
\
Please use the [site search page](/search/) to find related posts.
{.yellowBox}

<br />

**Note**: You may find it useful to see my [three](/posts/2022/02/static-tweets-eleventy-hugo/) [earlier](/posts/2022/02/static-tweets-eleventy-hugo-part-2/) [posts](/posts/2022/04/static-tweets-astro/) about how to perform fully static embeds of tweets, but that's not necessary.
{.yellowBox}

I've updated my [Hugo](https://gohugo.io) shortcode, `stweet.html`, that embeds tweets in a static site without any of [Twitter](https://twitter.com)'s JavaScript or trackers.[^privacy] The [earlier](/posts/2022/02/static-tweets-eleventy-hugo) version handled text and media well enough, but fell short on pulling in those "cards" that Twitter generates when you add a link in a tweet, so I decided to fix that.[^PubSync]

[^privacy]: Quoting this site's [privacy policy](/privacy/#twitter): "This site reproduces tweets as purely static text and downloaded images with no [Twitter](https://twitter.com) (or other) tracking involved. Each tweet is linked to its original location. Any Twitter-based image --- including the avatar --- that's included with a static tweet does include a Twitter cookie, but **no** trackers."

[^PubSync]: As the filename makes clear, this is an enhancement of the *original* `stweet.html` shortcode, **not** the `stweetv2.html` version I provided subsequently, because I [later learned](/posts/2022/02/gems-in-rough-14/#learning-from-a-friendly-hat-tip) that [Twitter's Version 2 API](https://developer.twitter.com/en/docs/twitter-api) doesn't yet support handling videos and animated GIFs. Unless/until I hear that Twitter definitely will kill the much older Public Syndication API on which `stweet` depends, I'll just stick with that one --- especially since the PubSync API is **far** easier to use than the V2 API.

What's the difference? Before these latest changes, here's how `stweet` rendered this [particular tweet](https://twitter.com/CloudCannon/status/1534248828559400960) from [CloudCannon](https://cloudcannon.com) (and I've linked to the original tweet so you can view it for comparison's sake):

{{< stweetv2 "1534248828559400960" >}}

And that works, to be sure. But now, `stweet` can do it this way:

{{< stweet user="CloudCannon" id="1534248828559400960" >}}

So, with that, friends and neighbors, here's the code.

```go-html-template
{{/*
	=======
	Based on...
	- https://github.com/hugomd/blog/blob/6ad96b24117255c2a9912c566ffd081bd9bbd6f1/layouts/shortcodes/statictweet.html
	- https://hugo.md/post/update-rendering-static-tweets/
	- https://github.com/KyleMit/eleventy-plugin-embed-tweet
	- https://github.com/astro-community/astro-embed/blob/main/packages/astro-embed-twitter/Tweet.astro
	=======
*/}}

{{ $urlPre := "https://cdn.syndication.twimg.com/tweet?id="}}
{{ $id := .Get 0 }}
{{ $json := getJSON $urlPre $id }}
{{ $text := .Page.RenderString $json.text }}
{{ $QT_text := "" }}
{{ $card := "" }}

{{ if isset $json "entities" }}
	{{ if isset $json.entities "user_mentions"  }}
		{{ range $user := $json.entities.user_mentions}}
			{{ $text = replace $text (printf "@%s" $user.screen_name) (printf "<a href='https://twitter.com/%s' rel='noopener' class='twitterExt'>@%s</a>" $user.screen_name $user.screen_name) }}
		{{ end }}
	{{ end }}
	{{ if isset $json.entities "hashtags"}}
		{{ range $hashtags := $json.entities.hashtags }}
			{{ $text = replace $text (printf "#%s" $hashtags.text) (printf "<a href='https://twitter.com/hashtag/%s?src=hash&ref_src=twsrc' rel='noopener' class='twitterExt'>#%s</a>" $hashtags.text $hashtags.text) }}
		{{ end }}
	{{ end }}
	{{ if isset $json.entities "media"  }}
		{{ range $media := $json.entities.media }}
			{{ $text = replace $text $media.url "" }}
		{{ end }}
	{{ end }}
	{{ if isset $json.entities "urls"  }}
		{{ range $url := $json.entities.urls}}
			{{ $text = replace $text $url.url (printf "<a href='%s' rel='noopener' class='twitterExt'>%s</a>" $url.url $url.display_url) }}
		{{ end }}
	{{ end }}
{{ end }}

{{ if isset $json "quoted_tweet" }}
	{{ $QT_text = $json.quoted_tweet.text }}
	{{ if isset $json.quoted_tweet "entities" }}
		{{ if isset $json.quoted_tweet.entities "urls" }}
			{{ range $QT_urls := $json.quoted_tweet.entities.urls }}
				{{ $QT_text = replace $QT_text $QT_urls.url $QT_urls.display_url }}
			{{ end }}
		{{ end }}
	{{ end }}
	{{ if isset $json "entities" }}
		{{ if isset $json.entities "urls" }}
			{{ range $entUrls := $json.entities.urls }}
				{{ $text = replace $text $entUrls.display_url "" }}
			{{ end }}
		{{ end }}
	{{ end }}
{{ end }}

{{ $tweetLink := print "https://twitter.com/" $json.user.screen_name "/status/" $id }}

<blockquote class="tweet-card" cite="{{ $tweetLink }}">
	<div class="tweet-header">
		<a class="tweet-profile twitterExt" href="https://twitter.com/{{ $json.user.screen_name}}" rel="noopener">
			<img src="{{ $json.user.profile_image_url_https }}" alt="Twitter avatar for {{ $json.user.screen_name}}" loading="lazy" />
		</a>
		<div class="tweet-author">
			<a class="tweet-author-name twitterExt" href="https://twitter.com/{{ $json.user.screen_name}}" rel="noopener">{{ $json.user.name }}</a>
			<a class="tweet-author-handle twitterExt" href="https://twitter.com/{{ $json.user.screen_name}}" rel="noopener">@{{ $json.user.screen_name}}</a>
		</div>
	</div>
	<p class="tweet-body">
		{{ .Page.RenderString $text }}
	</p>
	{{ if isset $json "photos" }}
		{{ $imageCount := len $json.photos }}
		<div class="tweet-img-grid-{{ $imageCount }}">
			{{ range $item := $json.photos }}
				<img src="{{ $item.url }}" alt="Image from tweet {{ $id }}" class="tweet-media-img" loading="lazy" />
			{{ end }}
		</div>
	{{ end }}
	{{ with $json }}
		{{ with $json.card }}
			{{ with $json.card.binding_values }}
				{{ $bVals := . }}
				<a href="{{ $bVals.card_url.string_value }}" rel='noopener'>
					<div class="card">
						<img src="{{ $bVals.photo_image_full_size_large.image_value.url }}" alt="{{ $bVals.photo_image_full_size_large.image_value.alt }}" loading="lazy" class="tweet-card-img" />
						<p>
							{{ $bVals.vanity_url.string_value }}<br />
							<span class="card-title">{{ $bVals.title.string_value }}</span><br />
							{{ $bVals.description.string_value }}
						</p>
					</div>
				</a>
			{{ end }}
		{{ end }}
	{{ end }}
	{{ with $json }}
		{{ with $json.video }}
			{{ $video := . }}
			{{ with $video.variants }}
				<div class="ctr tweet-video-wrapper">
					{{ range $variants := . }}
						{{ if eq $variants.type "video/gif" }}
							<video loop autoplay muted playsinline controlslist="nofullscreen" class="ctr tweet-media-img">
						{{ else }}
							<video loop autoplay controls class="ctr tweet-media-img">
						{{ end }}
							<source src=" {{ $variants.src }}" type="{{ $variants.type }}">
							<p class="legal ctr">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p>
						</video>
					{{ end }}
				</div>
			{{ end }}
		{{ end }}
		{{ if isset $json "quoted_tweet" }}
			{{ with $json.quoted_tweet }}
				{{ $quoted_tweet := .}}
				<div class="tweet-quoted-tweet">
					<p class="pokey tweet-quoted-tweet-head"><img class="tweet-quoted-tweet-profile-image" src="{{ $quoted_tweet.user.profile_image_url_https }}" />&nbsp;<strong>{{ $quoted_tweet.user.name }}</strong> @{{ $quoted_tweet.user.screen_name }} &bull; <a href="https://twitter.com/{{ $quoted_tweet.user.screen_name }}/status/{{ $quoted_tweet.id_str }}" class="tweet-date twitterExt" rel="noopener">{{ dateFormat "January 2, 2006" $quoted_tweet.created_at }}</a> <span class="legal">(UTC)</span></p>
					<p>{{ $.Page.RenderString $QT_text }}</p>
				</div>
			{{ end }}
		{{ end }}
	{{ end }}
	<div class="tweet-footer">
		<a href='https://twitter.com/{{ $json.user.screen_name }}/status/{{ $json.id_str }}' rel='noopener'>{{ dateFormat "3:04 PM • January 2, 2006" $json.created_at }}</a>&nbsp;<span class="legal">(UTC)</span></p>
	</div>
</blockquote>
```

## *Important note, 2022‑06‑08*

I later found that, due to the way Twitter handles its asset-caching, you'll need to adjust the `getJSON` function's caching, as set in your Hugo config file, to avoid big blank holes where some images should go. The following is from my [config file](https://gohugo.io/getting-started/configuration/), which is in YAML:

```yaml
caches:
  getjson:
    maxAge: 10s
```

**Either** (a.) use the `maxAge: 10s` setting **or** (b.) simply *kill* the `getJSON` function's caching altogether by setting `maxAge` to `0`. Play with the two options and see which works better for you, both in dev mode and in production. For more information on Hugo's caching, see [the "Configure File Caches" section](https://gohugo.io/getting-started/configuration/#configure-file-caches) in the [Hugo config documentation](https://gohugo.io/getting-started/configuration/).\
*(**Also**: if you **do** keep caching turned on, I'd also suggest `.gitignore`-ing your `getjson` cache directory. Otherwise: well, let's just say that Git will get "noisy" while you're developing.)*
