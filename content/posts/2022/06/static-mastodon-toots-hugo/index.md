---
title: "Static Mastodon toots in Hugo"
description: "Just like tweet embeds, toot embeds are best when they’re purely static."
author: Bryce Wray
date: 2022-06-03T09:47:00-05:00
#initTextEditor: iA Writer
---

**Note**: This is a follow-up to my [three](/posts/2022/02/static-tweets-eleventy-hugo/) [earlier](/posts/2022/02/static-tweets-eleventy-hugo-part-2/) [posts](/posts/2022/04/static-tweets-astro/) about how to perform fully static embeds of tweets in a variety of [static site generators](https://jamstack/org/generators) (SSGs).
{.box}

You may have heard, especially recently, about a social media platform called [Mastodon](https://joinmastodon.org).[^Guide] It's very much like [Twitter](https://twitter.com) in how it looks and how one uses it, but very much *unlike* Twitter where **centralization** is concerned. All of Twitter exists under the aegis of one large corporate entity, while Mastodon has [thousands](https://mastodon.help/instances) of separate, community-owned *instances*.

[^Guide]: In addition to the standard [Mastodon site](https://join.mastodon.org)'s [documentation](https://docs.joinmastodon.org/), you may also wish to review [Noëlle Anthony](https://chat.noelle.codes/@noelle)'s "[An Increasingly Less-Brief Guide to Mastodon](https://github.com/joyeusenoelle/GuideToMastodon)."

Yet, these instances are *federated* so as to allow a surprising degree of interconnectivity among them. An often-used analogy is that of email. You and I may well have two totally different email providers, but we can email each other because both our providers adhere to the necessary standards. Similarly, an account on one Mastodon instance (usually) can follow and interact with an account on a different instance. The following video from 2018 explains it well:

{{< lite-youtube videoTitle="What is Mastodon?" videoId="IPSbNdBmWKE" >}}

As the video also notes, some instances' owners purposely limit the instances' full interconnectivity with other instances. Mastodon adherents consider this to be a feature, not a bug. Our discussion today is pretty much about those instances which **do** allow full interactivity with other compatible instances.

## A raising of pitchforks

As I write this, we're several weeks into the whole soap opera about [Elon Musk's purchase of Twitter](https://www.cnbc.com/2022/04/25/twitter-accepts-elon-musks-buyout-deal.html). One thing it accomplished --- especially right after the proposed transition became public --- was driving quite a few particularly vocal Twitter users toward Mastodon, even if only to give the latter a look-see.

In my case, it was Look-see Number Two.

Back in 2020, I had actually spent some time puttering around within a few Mastodon instances, until I decided there wasn't that much there for boring old (emphasis on *old*) me. Fast-forward to late April of this year, when word of Musk's move reached the headlines. Many Twitter users raised metaphorical pitchforks and opined that only a retreat to the Mastodon-o-sphere was an acceptable response.

While I didn't (fully) share these users' concerns, I figured I, too, would give Mastodon another try, just for curiosity's sake. This time around, at least so far, I've found my instances-of-interest more compelling from a quality-of-content standpoint, and somewhat less quirky, than in 2020.[^quirky]

[^quirky]: That said, Mastodon in general --- especially if you view an instance in a browser where Mastodon's [Tweetdeck](https://tweetdeck.twitter.com)-like [*advanced web interface*](https://mstdn.social/@feditips/105249858756566385) is enabled --- can sometimes still be somewhat jarring. Since you likely start off without having anybody to follow, you almost have to use the advanced web interface to find people (and other entities) of interest. Let's just say that many toots flying by on the rolling [*Federated Timeline*](https://docs.joinmastodon.org/user/network/) contain comments and/or images which appear to be by, and for, folks who aren't suffering an overabundance of self-restraint. ’Nuff said.

So, having done those earlier posts about embedding static *tweets*, I decided I'd better come up with something similar about embedding Mastodon's *toots* as purely static items, too. That seemed a wise course, especially in case Mastodon becomes a lot more mainstream in the not-so-distant future (regardless of ongoing Musk/Twitter developments).

Hence, today's post.

## Let's embed some toots, Toots

### But first . . .

You'll note that this post concerns only code for [Hugo](https://gohugo.io), although my earlier posts about embedding static tweets covered [Astro](https://astro.build) and [Eleventy](https://11ty.dev), too. What I gave you for Eleventy was based on use of [Kyle Mitofsky](https://twitter.com/KyleMitBTV)'s [eleventy-plugin-embed-tweet](https://github.com/KyleMit/eleventy-plugin-embed-tweet) plugin, rather than my own code; and I'm unaware of there being a similar, Mastodon-related plugin for Eleventy. Besides, I simply don't have the skills to code appropriately for Eleventy, which depends on the user to assemble some of the "plumbing" for such data-gathering. As for Astro, I've been having trouble developing in it lately, so I had to give a wave-off to that attempt.

**Update, 2022-08-29**: To quote the old [*Monty Python and the Holy Grail* scene](https://www.imdb.com/title/tt0071853/quotes/qt0470582), "I got better," so you may want to check on my later efforts, "[Static Mastodon toots in Astro](/posts/2022/08/static-mastodon-toots-astro/)" and "[Static embeds in Eleventy](/posts/2022/08/static-embeds-eleventy/)."
{.box}

All that said, you Astro and Eleventy users who are savvier than I (*i.e.*, the vast majority of you) likely can dope it out from the Mastodon API. It's fully open[^depends] for `GET`ting content.

To get a return from the API so you can look around and see how stuff works, do a [`curl`](https://github.com/curl/curl) command in the format of:\
`curl $InstanceTLD/api/v1/statuses/$TootID`\
. . . where `$InstanceTLD` refers to the instance's top-level domain (TLD) and `$TootID` is the toot's numerical ID. To find a toot's ID, pull up the toot in a browser and click its timestamp to get its full URL; the final item in the URL will be the ID.

[^depends]: Well, perhaps I should amend that "fully open" description. I reiterate that each Mastodon instance has its own settings regarding what it will and won't allow outsiders to access via embeds like what we're describing in this post. So you *will* test locally, first, right? Right.

As an example, here's a recent toot of mine from within the [fosstodon.org](https://fosstodon.org) instance:

{{< stoot "fosstodon.org" "108370823317349516" >}}

Now, since the URL for that toot was:

```plaintext
https://fosstodon.org/@BryceWrayTX/108370823317349516
```

. . . that means its ID was `108370823317349516`. So, the `curl` to `GET` that toot's JSON would be:

```bash
curl "https://fosstodon.org/api/v1/statuses/108370823317349516"
```

**The resulting API return looks like this** (it's a toggle for viewing at your convenience, especially if you haven't time to do your own coding to work with this data):

<details><summary>Click/tap here to toggle open/close.</summary>

```json
{
  "id": "108370823317349516",
  "created_at": "2022-05-26T23:25:33.536Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://fosstodon.org/users/BryceWrayTX/statuses/108370823317349516",
  "url": "https://fosstodon.org/@BryceWrayTX/108370823317349516",
  "replies_count": 1,
  "reblogs_count": 5,
  "favourites_count": 0,
  "edited_at": null,
  "content": "\\u003cp\\u003eWill post this poll on three different instances. On how many Mastodon instances do you have at least one account? (And please boost if you’re similarly curious about how others do this. Thanks!)\\u003c/p\\u003e",
  "reblog": null,
  "application": null,
  "account": {
    "id": "106365523785947655",
    "username": "BryceWrayTX",
    "acct": "BryceWrayTX",
    "display_name": "Bryce Wray",
    "locked": false,
    "bot": false,
    "discoverable": true,
    "group": false,
    "created_at": "2021-06-06T00:00:00.000Z",
    "note": "\\u003cp\\u003eNerdy advocate for static websites and the tools that build them. Inveterate supporter of the Oxford comma. Follow me at \\u003ca href=\"https://www.brycewray.com/\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"\\u003e\\u003cspan class=\"invisible\"\\u003ehttps://www.\\u003c/span\\u003e\\u003cspan class=\"\"\\u003ebrycewray.com/\\u003c/span\\u003e\\u003cspan class=\"invisible\"\\u003e\\u003c/span\\u003e\\u003c/a\\u003e (RSS and JSON \\u003ca href=\"https://fosstodon.org/tags/feeds\" class=\"mention hashtag\" rel=\"tag\"\\u003e#\\u003cspan\\u003efeeds\\u003c/span\\u003e\\u003c/a\\u003e available). I have no intention of ever posting any of my Wordle scores. Admitted Apple fanboy — don’t judge. He/him.\\u003c/p\\u003e",
    "url": "https://fosstodon.org/@BryceWrayTX",
    "avatar": "https://cdn.fosstodon.org/accounts/avatars/106/365/523/785/947/655/original/12db25df1f58da76.png",
    "avatar_static": "https://cdn.fosstodon.org/accounts/avatars/106/365/523/785/947/655/original/12db25df1f58da76.png",
    "header": "https://cdn.fosstodon.org/accounts/headers/106/365/523/785/947/655/original/c30a52e2aeac5d00.jpg",
    "header_static": "https://cdn.fosstodon.org/accounts/headers/106/365/523/785/947/655/original/c30a52e2aeac5d00.jpg",
    "followers_count": 473,
    "following_count": 1525,
    "statuses_count": 763,
    "last_status_at": "2022-12-02",
    "noindex": true,
    "emojis": [],
    "fields": [
      {
        "name": "Site",
        "value": "\\u003ca href=\"https://www.brycewray.com\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"\\u003e\\u003cspan class=\"invisible\"\\u003ehttps://www.\\u003c/span\\u003e\\u003cspan class=\"\"\\u003ebrycewray.com\\u003c/span\\u003e\\u003cspan class=\"invisible\"\\u003e\\u003c/span\\u003e\\u003c/a\\u003e",
        "verified_at": "2022-11-02T19:04:24.881+00:00"
      },
      {
        "name": "GitHub",
        "value": "\\u003ca href=\"https://github.com/brycewray\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"\\u003e\\u003cspan class=\"invisible\"\\u003ehttps://\\u003c/span\\u003e\\u003cspan class=\"\"\\u003egithub.com/brycewray\\u003c/span\\u003e\\u003cspan class=\"invisible\"\\u003e\\u003c/span\\u003e\\u003c/a\\u003e",
        "verified_at": null
      }
    ]
  },
  "media_attachments": [],
  "mentions": [],
  "tags": [],
  "emojis": [],
  "card": null,
  "poll": {
    "id": "108558",
    "expires_at": "2022-05-29T23:25:33.532Z",
    "expired": true,
    "multiple": false,
    "votes_count": 34,
    "voters_count": 34,
    "options": [
      {
        "title": "Just one",
        "votes_count": 24
      },
      {
        "title": "Two to four",
        "votes_count": 9
      },
      {
        "title": "Five or more",
        "votes_count": 1
      }
    ],
    "emojis": []
  }
}
```

</details>

So, now that you know what we're seeking (and its data structure, if you toggled that to the "open" display), let's use Hugo's [`getJSON` function](https://gohugo.io/templates/data-templates/#get-remote-data) to fetch it.

### The code

I call this Hugo shortcode `stoot.html` because it displays *static toots*, just as I previously named `stweet.html` for *static tweets*. Call your version whatever you want, of course.

You'll quickly see that I took advantage of the visual similarities between tweets and toots by recycling many of the CSS classes I used in styling `stweet.html`; I also created a few more while I was at it.[^styling]

[^styling]: As was the case with `stweet.html`, the best way for you to figure out how the styling works is to use your browser's Inspector tool on the toot example herein as well as the static tweets you'll find scattered throughout the site. (You also can check the [site repo](https://github.com/brycewray/hugo_site), of course.)

```go-html-template
{{ $masIns := .Get 0 }}
{{ $tootLink := "" }}
{{ $card := "" }}
{{ $handleInst := "" }}
{{ $mediaMD5 := "" }}
{{ $imageCount := 0 }}
{{ $votesCount := 0 }}
{{ $id := .Get 1 }}
{{ $urlToGet := print "https://" $masIns "/api/v1/statuses/" $id }}
{{ $json := getJSON $urlToGet }}
{{ $jsonHolder := $json }}{{/* Being safe */}}

{{ if isset $json "account" }}
	{{ $tootLink = print "https://" $masIns "@" $json.account.acct "/status/" $id }}
	{{ $handleInst = print "@" $json.account.acct "@" $masIns }}
{{ end }}

{{ if isset $json "content" }}
	<blockquote class="tweet-card" cite="{{ $tootLink }}">
		<div class="tweet-header">
			<a class="tweet-profile twitterExt" href="https://{{ $masIns }}/@{{ $json.account.acct }}" rel="noopener">
				<img
					src="{{ $json.account.avatar }}"
					alt="Mastodon avatar for {{ $handleInst }}"
					loading="lazy"
				/>
			</a>
			<div class="tweet-author">
				<a class="tweet-author-name twitterExt" href="https://{{ $masIns }}/@{{ $json.account.acct }}" rel="noopener">{{ $json.account.display_name }}</a>
				<a class="tweet-author-handle twitterExt" href="https://{{ $masIns }}/@{{ $json.account.acct }}" rel="noopener">{{ $handleInst }}</a>
			</div>
		</div>
		<p class="tweet-body">
			{{ $json.content | safeHTML }}
		</p>
		{{ with $json.media_attachments }}
			{{ range $media_attachments := . }}
				{{ if eq $media_attachments.type "image" }}
					{{ $imageCount = (add ($imageCount) 1) }}
				{{ end }}
			{{ end }}
			<div class="tweet-img-grid-{{ $imageCount }}">
			{{ range $media_attachments := . }}
				{{ if eq $media_attachments.type "image" }}
					{{ $mediaMD5 = md5 $media_attachments.url }}
					<style>
						.img-{{ $mediaMD5 }} {
							aspect-ratio: {{ $media_attachments.meta.original.width }} / {{ $media_attachments.meta.original.height }};
						}
					</style>
					<img
						src="{{ $media_attachments.url }}"
						alt="Image {{ $media_attachments.id }} from toot {{ $id }} on {{ $masIns }}"
						class="tweet-media-img img-{{ $mediaMD5 }}{{ if $json.sensitive }} tweet-sens-blur{{ end }}"
						loading="lazy"
						{{- if $json.sensitive }}onclick="this.classList.toggle('tweet-sens-blur-no')"{{- end }}
					/>
					{{- if $json.sensitive -}}
						<div class="blur-text">
							Sensitive content<br />
							(flagged&nbsp;at&nbsp;origin)
						</div>
					{{- end -}}
				{{ end }}
			{{ end }}
			</div>
			{{/*
				N.B.:
				The above results in an empty, no-height div
				when there's no image but there **is**
				at least one item in `$media_attachments`.
				Unfortunately, it seems to be the only way
				to accomplish this. Not a good HTML practice,
				but gets the job done.
			*/}}
			{{ range $media_attachments := . }}
				{{ if eq $media_attachments.type "video" }}
					{{ $mediaMD5 = md5 $media_attachments.url }}
					<style>
						.img-{{ $mediaMD5 }} {
							aspect-ratio: {{ $media_attachments.meta.original.width }} / {{ $media_attachments.meta.original.height }};
						}
					</style>
					<div class="ctr tweet-video-wrapper">
						<video muted playsinline controls class="ctr tweet-media-img img-{{ $mediaMD5 }}{{ if $json.sensitive }} tweet-sens-blur{{ end }}"{{- if $json.sensitive }}onclick="this.classList.toggle('tweet-sens-blur-no')"{{- end }}>
							<source src="{{ $media_attachments.url }}">
							<p class="legal ctr">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p>
						</video>
						{{- if $json.sensitive -}}
							<div class="blur-text">
								Sensitive content<br />
								(flagged&nbsp;at&nbsp;origin)
							</div>
						{{- end -}}
					</div>
				{{ end }}
				{{ if eq $media_attachments.type "gifv" }}
					{{ $mediaMD5 = md5 $media_attachments.url }}
					<style>
						.img-{{ $mediaMD5 }} {
							aspect-ratio: {{ $media_attachments.meta.original.width }} / {{ $media_attachments.meta.original.height }};
						}
					</style>
					<div class="ctr tweet-video-wrapper">
						<video loop autoplay muted playsinline controls controlslist="nofullscreen" class="ctr tweet-media-img img-{{ $mediaMD5 }}{{ if $json.sensitive }} tweet-sens-blur{{ end }}" {{- if $json.sensitive }}onclick="this.classList.toggle('tweet-sens-blur-no')"{{- end }}>
							<source src="{{ $media_attachments.url }}">
							<p class="legal ctr">(Your browser doesn&rsquo;t support the <code>video</code> tag.)</p>
						</video>
						{{- if $json.sensitive -}}
							<div class="blur-text">
								Sensitive content<br />
								(flagged&nbsp;at&nbsp;origin)
							</div>
						{{- end -}}
					</div>
				{{ end }}
			{{ end }}
		{{ end }}
		{{ with $json.card }}
			{{- $cardData := . -}}
			{{- with $cardData.image -}}
				<a href="{{ $cardData.url }}" rel="'noopener">
					<div class="card">
						<img src="{{ $cardData.image }}" alt="Card image from {{ $masIns }} toot {{ $id }}" loading="lazy" class="tweet-card-img" />
						<p>
							<span class="card-title">{{ $cardData.title }}</span><br />
							{{ $cardData.description }}
						</p>
					</div>
				</a>
			{{- end -}}
		{{ end }}
		{{ with $json.poll }}
			{{ $poll := . }}
			{{ with $poll.options }}
				{{ range $pollOptions := . }}
					{{ $votesCount = add $votesCount  $pollOptions.votes_count }}
				{{ end }}
				<div class="tweet-poll-wrapper">
					{{ range $pollOptions := . }}
						<div class="tweet-poll-count">
							<strong>{{ (mul 100 (div $pollOptions.votes_count $votesCount)) | lang.FormatPercent 1 }}</strong>
						</div>
						<div class="tweet-poll-meter">
							<meter id="vote-count" max="{{ $votesCount }}" value="{{ $pollOptions.votes_count }}"></meter>
						</div>
						<div class="tweet-poll-title">{{ $pollOptions.title }}</div>
					{{ end }}
				</div>
				<p class="legal">{{ $votesCount }} votes</p>
			{{ end }}
		{{ end }}
		<div class="tweet-footer">
			<a href="https://{{ $masIns }}/@{{ $json.account.acct }}/{{ $json.id }}" class="tweet-date twitterExt" rel="noopener">{{ dateFormat "3:04 PM • January 2, 2006" $json.created_at }}</a>&nbsp;<span class="legal">(UTC)</span>
		</div>
	</blockquote>
{{ end }}
```

Once this is in place in your project's location for shortcodes, invoke it from within your Markdown like this:

```md
{{</* stoot "fosstodon.org" "108370823317349516" */>}}
```

As you can see, the syntax is:\
`{{</* stoot "$InstanceTLD" "$Id" */>}}`\
(And, yes, those quotation marks **are** required.)[^commentsGo]

[^commentsGo]: If you happen upon this site's repo out of curiosity and check out this post's Markdown file, you'll notice that each of these examples' curly-bracketed boundaries also have wrapping `/*` and `*/`, respectively. That's because, otherwise, Hugo sees it as *real* code, not just a representation of it, and acts accordingly --- in this case, once again displaying the toot. I found this otherwise undocumented workaround in a [2015 comment](https://discourse.gohugo.io/t/a-way-to-mark-plain-text-and-stop-hugo-from-interpreting/1325/2) on the [Hugo Discourse forum](https://discourse.gohugo.io). This is similar to how [Eleventy](https://11ty.dev), when using [Nunjucks](https://mozilla.github.io/nunjucks/) templating, requires the use of `{% raw %}` and `{% endraw %}` for proper display of code blocks which contain certain combinations of characters. *(Full disclosure: this footnote is 99% recycled from last year's "[Go big or Go home?](/posts/2021/02/go-big-go-home/)" post, where the same issue came up.)*

## So what can it do?

In my opinion, the Mastodon API makes it easier to `GET` certain things, as compared to the Twitter API, so it didn't take a ton of effort to get the shortcode to work with images, videos, animations, and even polls. And if you see the appearance of a *regular* toot embed, I think you'll prefer these.

For those of you who are already Mastodon-savvy, you may have noticed that I didn't delve into Mastodon's "[Content Warning](https://github.com/joyeusenoelle/GuideToMastodon/blob/main/README.md#what-does-cw-mean)" and "[Sensitive Content](https://github.com/joyeusenoelle/GuideToMastodon/blob/main/README.md#i-just-attached-a-picture-to-my-toot-whats-with-the-new-eye-icon)" tags --- mainly because I have no intention of embedding within this site any toots which would need such things. (If *your* site Goes There, well, just study the API return from toots of this nature and figure out how to add the appropriate loops and variables to the code. That's how I did it, and I'm sure you can, too.) It seems to me that the "Content Warning" tag, in particular, is used excessively --- sometimes, simply because (*e.g.*) a toot mentions the hated Twitter by name instead of calling it "Birdsite" (!), rather than because the toot contains material that truly may offend the sensitive. **Still**: if I'm missing something on this aspect, feel free to [set me straight](/contact/).

**Update, 2022-06-04**: Well, actually, someone **did** set me straight, [albeit via Mastodon itself](https://jawns.club/@skyfaller/108415541575257273), and I found the argument sufficiently convincing that I made some changes to the shortcode. Again, **I** have no plan to embed toots with potentially troublesome content here; but, in case you **might** do so and you've decided to use this shortcode, I've now updated it for that use case. Now, any image, animated GIF, or video which is tagged as `sensitive` in the API --- presumably because the original toot's author gave it that designation --- will appear initially with a blurring effect overlaid with a message, "Sensitive content flagged at origin." If one then clicks/taps the obscured visual content, it pops into full view and covers the message. This behavior is consistent with what I've observed on Mastodon.
{.box}

## Here be dragons, maybe

To wrap this up, I'll note some aspects worth eyeing warily:

- As I observed earlier, some instances are purposely unfriendly to outsiders. In some cases, this will limit or outright block your ability to embed toots from those instances.
- Got a tight [content security policy](https://content-security-policy.com)? Keeping it tight will be a challenge when you embed toots from more than a handful of instances, since *each* additional instance means one more source you'll have to whitelist in the appropriate sections of the CSP. This consideration alone may make you think very hard about whether to go ahead with embedding toots, especially if it's not always easy for you to edit your CSP.[^CSPCFW]
- Mastodon instances' media attachments --- even the avatars --- aren't optimized much, if at all; so don't be shocked if you suddenly find your site's performance scores dropping when you embed toots. (During the testing that went into this post, I found one user whose *avatar* was over a meg in size. The *avatar*.)

[^CSPCFW]: As of this writing, I manage my site's CSP through a [Cloudflare Worker](https://workers.cloudflare.com) in front of my site's presence within [Cloudflare Pages](https://pages.cloudflare.com). If you're using a different host, investigate whether its *edge functions* capability, if available, will do this for you. If so, that may ease the aggravation of editing the CSP every time you embed from a new-to-your-site Mastodon instance.

One wonders whether a more centralized platform might allow a better chance to solve these problems, but that obviously would be completely counter to the entire idea behind Mastodon. To paraphrase my earlier statement: these are (considered to be) features, not bugs; so, before you embed Mastodon content on your site, you'll need to think about these items.

