---
title: "Static tweets in Hugo: a tale of two sources"
description: "It turns out that I must access multiple Twitter APIs to get everything needed for an embedded tweet whose appearance won't annoy me too badly."
author: Bryce Wray
date: 2022-08-02T15:35:00-05:00
#draft: true
#initTextEditor: iA Writer
---

Although I am by no means mechanically adept, I am tremendously curious about how things work. It's a major reason why, over the decades, I managed to eke out a decent living through various computer-enabled endeavors for which my 1970s college education obviously couldn't have prepared me. I was highly interested in these kinds of job functions, so I taught myself to do them.

In multiple posts this year, I've covered the subject of embedding fully static tweets in one's website. My original reason for getting into this was an attempt to free my visitors from the grabby tracking that accompanies normal Twitter embeds. However, since then, the "how it works" aspect has taken hold, and I've continued to dork around with the accompanying code --- primarily in the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG) --- in attempts to make the resulting embeds look and work better:

- "[Gems in the rough #14](/posts/2022/02/gems-in-rough-14/#learning-from-a-friendly-hat-tip)" --- Correct handling of animated media attachments.
- "[Static tweets in Hugo: an update](/posts/2022/06/static-tweets-hugo-update/)" --- Displaying static versions of the [social/OG "cards"](https://css-tricks.com/essential-meta-tags-social-media/) that often accompany tweets.
- "[Static tweets in Hugo: using resources.GetRemote](/posts/2022/07/static-tweets-hugo-update-using-getremote/)" --- Using a slightly more robust method to grab data from Twitter.

But as I looked through the various embedded tweets here on this site, I was displeased with the appearance of more than a few. Many of my grumblings were about glitchy behavior within the text strings that Twitter supplies for tweets through both its Public Syndication API and its preferred Version 2 API, each of which my Hugo shortcodes have used.

## Yeah, well, replace this

Let's say a tweet is a "reply-to." If you view the tweet on the actual Twitter website, some behind-the-scenes code neatly inserts above the main text a small line which begins with "Replying to" and then lists the Twitter screen name of each user to whom this tweet is replying.

But either the Public Syndication API or the Version 2 API simply inserts the screen names into the main text, making it look bloated and perhaps distracting from the text you truly want to portray. Can you do some search/replace hocus-pocus to take care of this annoyance? Yes, but that can go awry in a hurry --- especially if any of the screen names are also **supposed** to be in the main text, in which case you can end up with blank space where a screen name is supposed to be.

For example, if `@OurWebConf` was a reply-to screen name for a tweet but *also* appeared in the tweet's regular text, these APIs would return the text as:

```plaintext
@OurWebConf Register today for @OurWebConf to be part of the fun
```

. . . which is already weird-looking enough; but a search/replace to *clear out* this annoying repetition would then result in:

```plaintext
Register today for to be part of the fun
```

Not good!

At one point in the last few days, I was prepared to give up on the whole thing and just use the built-in Hugo [`tweet` shortcode](https://gohugo.io/content-management/shortcodes/#tweet), albeit while using [Hugo's privacy settings](https://gohugo.io/about/hugo-and-gdpr/#all-privacy-settings) to block Twitter's tracking code. With those settings, as I've [explained before](/posts/2022/02/static-tweets-eleventy-hugo/#in-hugo), `tweet` results in an *extremely* spare appearance. Here's an example of `tweet`, with the privacy shields up, rendering my recent tweet about a much-appreciated fix to the [giscus](https://giscus.app) commenting platform:

{{< tweet user="BryceWrayTX" id="1550908040794218496" >}}

. . . instead of how it looks in my `stweet` shortcode:

{{< stweet user="BryceWrayTX" id="1550908040794218496" >}}

But, as I tested the `tweet` shortcode on various tweets where the API-produced text had been especially annoying to me, I noticed something: the `tweet`-rendered text was almost universally fine as it was, unlike what either of the aforementioned Twitter APIs had provided.

There had to be a reason for this.

## Under Hugo's hood

The only way I could figure it out, I decided, was to get into the Hugo repo's [actual](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/shortcodes/twitter.html) [code](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/shortcodes/twitter_simple.html) behind that `tweet` shortcode, and see what was going on --- specifically, *where* `tweet` was getting the text it would display for a tweet.

I soon found the lines in question (note in particular the declaration of the `$request` variable):[^getJSON]

```go-html-template
{{- define "render-tweet" -}}
  {{- $url := printf "https://twitter.com/%v/status/%v" .user .id -}}
  {{- $query := querify "url" $url "dnt" .dnt -}}
  {{- $request := printf "https://publish.twitter.com/oembed?%s" $query -}}
  {{- $json := getJSON $request -}}
  {{- $json.html | safeHTML -}}
{{- end -}}
```

[^getJSON]: And, yes, it [uses `getJSON` rather than `resources.GetRemote`](/posts/2022/07/static-tweets-hugo-update-using-getremote/), but this code has been in the Hugo repo for a *long* time and likely is due for a touch-up.

So, instead of using either of the aforementioned APIs, `tweet` was getting the text straight from Twitter's [*oEmbed* API](https://developer.twitter.com/en/docs/twitter-for-websites/oembed-api).

That was my "aha" moment.

Then, using the approach from the Hugo code, plus the parameter `omit_script` set to `true` (so the Twitter tracking code wouldn't be included in the return), I ran a request to the oEmbed API. In the JSON object that came back, there was an `html` key whose value contained not just the tweet's text --- *i.e.*, the *right* text, the text I *wanted* --- but also the same bare HTML that gets returned by the `tweet` shortcode: a `blockquote` wrapper and, within it, a `p` followed by an untagged line with the original tweet's URL, date, and a reference to the tweet's originator. Up to that point, I'd thought it was the shortcode doing that but, now, I knew it was the original HTML coming straight from Twitter.

However, what the JSON object from the oEmbed API *didn't* include were items which would be necessary for displaying a tweet to my liking:

- A URL for the tweeter's avatar, for use in an `img` element.
- Any "reply-to" information, where applicable.
- Usable URLs to graphics or GIF animations, whether attached by the user or part of social/OG "cards." (By "usable," I mean things that would definitely work with `img` elements.)
- Separate (and, therefore, more easily parsed) key/value pairs for these items, each of which came only as text within the `html` key's value:
	- The tweeter's screen name.
	- The tweet's day of issuance. (And this API's JSON didn't include the tweet's *time* at all.)

When I compared this oEmbed API return with what I'd get from either of the other Twitter APIs for the same tweet, I realized that --- short of going ahead and dumbing down to just the `tweet` shortcode's bare-bones results --- there was only one way to make my site's embedded tweets look and read as I wanted: I'd have to re-do my own `stweet` shortcode so that it accessed and used **both** the oEmbed API **and** the Public Syndication API.[^v2] The former would provide the text as I wanted it, while I'd source the latter for all the other goodies.

[^v2]: As I've [explained before](/posts/2022/02/gems-in-rough-14/#update-20220410), the [v2 API still isn't video- and animations-friendly](https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/media), at least not as of this writing.

## Careful cuts

The next couple of days, I tinkered with `stweet`. It was a somewhat delicate balancing act: I was trying to make sure that I included everything I needed from each API, while also excluding those (few) things which were duplicative between the two. Some of the latter turned out to be judgment calls in the end, but it seems to have worked out well enough.

I also had to make some use of Hugo's [`replaceRE` function](https://gohugo.io/functions/replacere), which uses the [Go regexp package](https://pkg.go.dev/regexp) to perform [regex](https://en.wikipedia.org/wiki/Regular_expression)-based search/replace. This was mostly so I could cleanly extract the `html` combo's leading and ending `blockquote` tags, without which the result got ugly in a hurry (*i.e.*, a blockquote *within* a blockquote).

Finally, I went through all my various tweet embeds and, where Twitter inserted some of its own `t.co` URLs to the detriment of portraying the *real* URLs, I employed [`replace`](https://gohugo.io/functions/replace) to switch out their textual representations with how they look if viewed on the Twitter website --- the appearance of which was, in the end, what I sought to achieve as much as possible for each tweet. That's why you'll see quite a few lines of `replace`-ing going on in the [original `stweet.html` code on the site repo](https://github.com/brycewray/hugo_site/blob/main/layouts/shortcodes/stweet.html) that *aren't* in the code block at the bottom of this piece; they're specific to the tweets I've embedded in this site. If you think you want to do something similar, check the original code and, if it doesn't repel you with its spaghetti-ish nature, use it as a guide for your own similar purposes with the tweets you want to embed in your site.

While having the text from the oEmbed API was a big improvement, it did occasion one small usage change for `stweet`: I'd have to call the `stweet` shortcode by providing a tweet's `user` and `id`, because the oEmbed API requires both.[^Hugotweet] For example, here's how I called that tweet from earlier:[^samecall]

[^Hugotweet]: The same therefore is true for the Hugo `tweet` shortcode, since it relies solely on the oEmbed API.

[^samecall]: Now you can change the `stweet` to `tweet` and you have the basic Hugo shortcode, so perhaps this is easier to edit in the long run, anyway.

```go-html-template
{{</* stweet user="BryceWrayTX" id="1550908040794218496" */>}}
```

. . . rather than the *former* method, where all I had to do was provide the tweet ID (and, since it was expecting only that one parameter, I didn't have to use the `id` name in referring to it):

```go-html-template
{{</* stweet "1550908040794218496" */>}}
```

. . . but, hey, that's what search/replace is for in one's chosen code editor, right? And, fortunately, I didn't have *that* many existing `stweet` instances to edit, anyway.

## The code

And now, ***finally***, I'll provide an amended version of the code for `stweet.html` as it currently exists. As is the SOP for my tweet-related shortcodes, the styling for each CSS class mentioned therein originates from the [`_twitter.scss` SCSS partial](https://github.com/brycewray/hugo_site/blob/main/assets/scss/partials/_twitter.scss).

```go-html-template
{{ $QT_text := "" }}
{{ $card := "" }}
{{ $RT := "" }}
{{ $RT_text := "" }}
{{ $user := .Get "user"  }}
{{ $id := .Get "id" }}
{{ $urlOembed := printf "https://twitter.com/%v/status/%v" $user $id -}}
{{- $query := querify "url" $urlOembed "dnt" true "omit_script" true -}}
{{- $request := printf "https://publish.twitter.com/oembed?%s" $query -}}
{{ $urlSynd := printf "https://cdn.syndication.twimg.com/tweet?id=%v" $id }}
{{ $currentPage := .Page }}

{{ with resources.GetRemote $urlSynd }}
  {{ $json := unmarshal .Content }}
	{{ $text := $json.text }}
	{{ $textBefore := $text }}{{/* pre-HTML-subs */}}

	{{ $jsonOembed := resources.GetRemote $request }}
	{{ $jsonOembed = $jsonOembed | transform.Unmarshal }}
	{{ $jsonOHTML := $jsonOembed.html }}

	{{ if isset $json "in_reply_to_screen_name" }}
		{{ $RT_text = "Replying to"}}
		{{ $RT_text = print $RT_text " " (print "<a href='https://twitter.com/" $json.in_reply_to_screen_name "' rel='noopener' class='twitterExt'>@" $json.in_reply_to_screen_name "</a>") }}
		{{ $RT_text = $RT_text | $currentPage.RenderString }}
	{{ end }}

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

	{{ $jsonOHTML = $jsonOHTML | replaceRE `<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">` `` }}
	{{ $jsonOHTML = $jsonOHTML | replaceRE `</p>.*` `` }}
	{{- $jsonOHTML = replace $jsonOHTML "</a></blockquote>" "</a> <span class='legal'>(UTC)</span></blockquote>" -}}

	{{ $tweetLink := print "https://twitter.com/" $json.user.screen_name "/status/" $id }}

	{{ if eq (substr $text 0 1) " " }}
		{{ $text = (substr $text 1) }}
		{{/*
			Tests for opening spaces in reply-to cases,
			to avoid inadvertent code blocks' being
			generated by .RenderString (same would be
			needed for markdownify, for that matter).
		*/}}
	{{ end }}
	{{ $text = $text | $currentPage.RenderString }}

	<!-- p class="pokey">{{ $textBefore }}</ !-->
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
		{{ if ne $RT_text "" }}
			<p class="pokey tweet-reply-to">
				{{ $RT_text }}
			</p>
		{{ end }}
		{{ $jsonOHTML | safeHTML }}
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
						{{ with $bVals.photo_image_full_size_large }}
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
					{{ with $bVals.player_image_small }}
						<a href="{{ $bVals.card_url.string_value }}" rel="noopener">
							<div class="card tweet-player">
								<img src="{{ $bVals.player_image_small.image_value.url }}" alt="{{ $bVals.title.string_value }}" loading="lazy" />
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
						<p>{{ $currentPage.RenderString $QT_text }}</p>
					</div>
				{{ end }}
			{{ end }}
		{{ end }}
		<div class="tweet-footer">
			<a href='https://twitter.com/{{ $json.user.screen_name }}/status/{{ $json.id_str }}' rel='noopener'>{{ dateFormat "3:04 PM • January 2, 2006" $json.created_at }}</a>&nbsp;<span class="legal">(UTC)</span></p>
		</div>
	</blockquote>
{{ end }}

```