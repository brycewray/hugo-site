---
title: "Static Mastodon toots in Hugo"
description: "Just like tweet embeds, toot embeds are best when they’re purely static."
author: Bryce Wray
date: 2022-06-03T09:47:00-05:00
#initTextEditor: iA Writer
---

**Note**: This is a follow-up to my [three](/posts/2022/02/static-tweets-eleventy-hugo/) [earlier](/posts/2022/02/static-tweets-eleventy-hugo-part-2/) [posts](/posts/2022/04/static-tweets-astro/) about how to perform fully static embeds of tweets in a variety of [static site generators](https://jamstack/org/generators) (SSGs).
{.box}

**Update from the future**: For a [Tailwind CSS](https://tailwindcss.com)-styled version of the code herein, see [this follow-up post](/posts/2023/01/static-mastodon-toots-hugo-tailwind-css-edition/).
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

As an example, here's a recent toot from Mastodon's creator, Eugen Rochko, from within the [mastodon.social](https://mastodon.social) instance:

{{< stoot "mastodon.social" "108241788606585248" >}}

<!-- was: 108335994944738270  -->

Now, since the URL for that toot was:

```plaintext
https://mastodon.social/@Gargron/108241788606585248
```

. . . that means its ID was `108241788606585248`. So, the `curl` to `GET` that toot's JSON would be:

```bash
curl "https://mastodon.social/api/v1/statuses/108241788606585248"
```

**The resulting API return looks like this** (it's a toggle for viewing at your convenience, especially if you haven't time to do your own coding to work with this data):

<details><summary>Click/tap here to toggle open/close.</summary>

```json
{
  "id": "108241788606585248",
  "created_at": "2022-05-04T04:30:20.096Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/Gargron/statuses/108241788606585248",
  "url": "https://mastodon.social/@Gargron/108241788606585248",
  "replies_count": 17,
  "reblogs_count": 11,
  "favourites_count": 185,
  "edited_at": null,
  "content": "\\u003cp\\u003eI was asked to do a video interview, but in the end they couldn\\u0026#39;t send a crew to where I live. I know the interview would be good for Mastodon, but I am so relieved I don\\u0026#39;t have to do it 😅\\u003c/p\\u003e",
  "reblog": null,
  "application": {
    "name": "Web",
    "website": null
  },
  "account": {
    "id": "1",
    "username": "Gargron",
    "acct": "Gargron",
    "display_name": "Eugen Rochko",
    "locked": false,
    "bot": false,
    "discoverable": true,
    "group": false,
    "created_at": "2016-03-16T00:00:00.000Z",
    "note": "\\u003cp\\u003eFounder, CEO and lead developer \\u003cspan class=\"h-card\"\\u003e\\u003ca href=\"https://mastodon.social/@Mastodon\" class=\"u-url mention\"\\u003e@\\u003cspan\\u003eMastodon\\u003c/span\\u003e\\u003c/a\\u003e\\u003c/span\\u003e, Germany.\\u003c/p\\u003e",
    "url": "https://mastodon.social/@Gargron",
    "avatar": "https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg",
    "avatar_static": "https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg",
    "header": "https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
    "header_static": "https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg",
    "followers_count": 295418,
    "following_count": 369,
    "statuses_count": 73218,
    "last_status_at": "2023-02-13",
    "noindex": false,
    "emojis": [],
    "roles": [],
    "fields": [
      {
        "name": "Patreon",
        "value": "\\u003ca href=\"https://www.patreon.com/mastodon\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"\\u003e\\u003cspan class=\"invisible\"\\u003ehttps://www.\\u003c/span\\u003e\\u003cspan class=\"\"\\u003epatreon.com/mastodon\\u003c/span\\u003e\\u003cspan class=\"invisible\"\\u003e\\u003c/span\\u003e\\u003c/a\\u003e",
        "verified_at": null
      },
      {
        "name": "GitHub",
        "value": "\\u003ca href=\"https://github.com/Gargron\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"\\u003e\\u003cspan class=\"invisible\"\\u003ehttps://\\u003c/span\\u003e\\u003cspan class=\"\"\\u003egithub.com/Gargron\\u003c/span\\u003e\\u003cspan class=\"invisible\"\\u003e\\u003c/span\\u003e\\u003c/a\\u003e",
        "verified_at": "2023-02-07T23:24:40.347+00:00"
      }
    ]
  },
  "media_attachments": [],
  "mentions": [],
  "tags": [],
  "emojis": [],
  "card": null,
  "poll": null
}
```

</details>

So, now that you know what we're seeking (and its data structure, if you toggled that to the "open" display), let's use Hugo's [`resources.GetRemote` function](https://gohugo.io/hugo-pipes/introduction/#get-resource-with-resourcesget-and-resourcesgetremote) to fetch it. This function requires [Hugo 0.91.0](https://github.com/gohugoio/hugo/releases/tag/v0.91.0) or better.

**Update from the future**: The original version of this code used the [`getJSON` function](https://gohugo.io/templates/data-templates/#get-remote-data) but, a few weeks later, I [learned]([comment](https://discourse.gohugo.io/t/error-for-getjson-when-used-with-resources-getresources/39687/4)) that it was better to use [`resources.GetRemote`](https://gohugo.io/hugo-pipes/introduction/#get-resource-with-resourcesget-and-resourcesgetremote), instead.
{.box}

### The code

I call this Hugo shortcode `stoot.html` because it displays *static toots*, just as I previously named `stweet.html` for *static tweets*. Call your version whatever you want, of course.[^styling]

[^styling]: The best way for you to figure out how the styling works is to use your browser's Inspector tool on the toot example herein as well as the static tweets you'll find scattered throughout the site. (You also can check the [site repo](https://github.com/brycewray/hugo-site), of course.) **Update from the future**: For a [Tailwind CSS](https://tailwindcss.com)-styled version of the code herein, see [this follow-up post](/posts/2023/01/static-mastodon-toots-hugo-tailwind-css-edition/).

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

{{- with resources.GetRemote $urlToGet  -}}
	{{ if (resources.GetRemote $urlToGet).Err }}
		<blockquote class="toot-blockquote">
			<p class="ctr legal">[Source not online<br />
			at time of site build.]</p>
		</blockquote>
	{{ else }}
		{{ $json := unmarshal .Content }}
		{{ $jsonHolder := $json }}{{/* Being safe */}}

		{{ if isset $json "account" }}
			{{ $tootLink = print "https://" $masIns "@" $json.account.acct "/status/" $id }}
			{{ $handleInst = print "@" $json.account.acct "@" $masIns }}
		{{ end }}

		{{ if isset $json "content" }}
			<blockquote class="toot-blockquote" cite="{{ $tootLink }}">
				<div class="toot-header">
					<a class="toot-profile" href="https://{{ $masIns }}/@{{ $json.account.acct }}" rel="noopener">
						<img
							src="{{ $json.account.avatar }}"
							alt="Mastodon avatar for {{ $handleInst }}"
							loading="lazy"
						/>
					</a>
					<div class="toot-author">
						<a class="toot-author-name" href="https://{{ $masIns }}/@{{ $json.account.acct }}" rel="noopener">{{ $json.account.display_name }}</a>
						<a class="toot-author-handle" href="https://{{ $masIns }}/@{{ $json.account.acct }}" rel="noopener">{{ $handleInst }}</a>
					</div>
				</div>
				{{ $json.content | safeHTML }}
				{{ with $json.media_attachments }}
					{{ range $media_attachments := . }}
						{{ if eq $media_attachments.type "image" }}
							{{ $imageCount = (add ($imageCount) 1) }}
						{{ end }}
					{{ end }}
					<div class="toot-img-grid-{{ $imageCount }}">
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
								class="toot-media-img img-{{ $mediaMD5 }}{{ if $json.sensitive }} toot-sens-blur{{ end }}"
								loading="lazy"
								{{- if $json.sensitive }}onclick="this.classList.toggle('toot-sens-blur-no')"{{- end }}
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
							<div class="ctr toot-video-wrapper">
								<video muted playsinline controls class="ctr toot-media-img img-{{ $mediaMD5 }}{{ if $json.sensitive }} toot-sens-blur{{ end }}"{{- if $json.sensitive }}onclick="this.classList.toggle('toot-sens-blur-no')"{{- end }}>
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
							<div class="ctr toot-video-wrapper">
								<video loop autoplay muted playsinline controls controlslist="nofullscreen" class="ctr toot-media-img img-{{ $mediaMD5 }}{{ if $json.sensitive }} toot-sens-blur{{ end }}" {{- if $json.sensitive }}onclick="this.classList.toggle('toot-sens-blur-no')"{{- end }}>
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
							<div class="toot-card">
								<div class="toot-card-image">
									<img src="{{ $cardData.image }}" alt="Card image from {{ $masIns }} toot {{ $id }}" loading="lazy" class="toot-card-image-image" />
								</div>
								<div class="toot-card-content">
									<p class="card-title">{{ $cardData.title }}</p>
									<p class="card-description">{{ $cardData.description }}</p>
								</div>
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
						<div class="toot-poll-wrapper">
							{{ range $pollOptions := . }}
								<div class="toot-poll-count">
									<strong>{{ (mul 100 (div $pollOptions.votes_count $votesCount)) | lang.FormatPercent 1 }}</strong>
								</div>
								<div class="toot-poll-meter">
									<meter id="vote-count" max="{{ $votesCount }}" value="{{ $pollOptions.votes_count }}"></meter>
								</div>
								<div class="toot-poll-title">{{ $pollOptions.title }}</div>
							{{ end }}
						</div>
						<p class="legal toot-poll-total">{{ $votesCount }} people</p>
					{{ end }}
				{{ end }}
				<div class="toot-footer">
					<a href="https://{{ $masIns }}/@{{ $json.account.acct }}/{{ $json.id }}" class="toot-date" rel="noopener">{{ dateFormat "3:04 PM • January 2, 2006" $json.created_at }}</a>&nbsp;<span class="pokey">(UTC)</span>
				</div>
			</blockquote>
		{{ end }}
	{{ end }}
{{- end -}}
```

Once this is in place in your project's location for shortcodes, invoke it from within your Markdown like this:

```md
{{</* stoot "mastodon.social" "108335994944738270" */>}}
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
- **Update from the future**: Quite a few users purposely delete their toots, automatically or otherwise.[^saveSpace] You may thus find your embedded content going away unexpectedly. The shortcode has a conditional that keeps such disappearances from crashing your site development or builds --- albeit rendering your attempted embed of a dear-departed toot with only an "Source not online at time of site build" error message --- but you still should keep this possibility in mind.

[^CSPCFW]: As of this writing, I manage my site's CSP through a [Cloudflare Worker](https://workers.cloudflare.com) in front of my site's presence within [Cloudflare Pages](https://pages.cloudflare.com). If you're using a different host, investigate whether its *edge functions* capability, if available, will do this for you. If so, that may ease the aggravation of editing the CSP every time you embed from a new-to-your-site Mastodon instance.

[^saveSpace]: Users can set their toots for automatic deletion after a fixed period of time. Why? Well, it can help the performance of their chosen Mastodon server instances. Also, certain individuals simply don't want to leave their content out on the ’net for that long.

One wonders whether a more centralized platform might allow a better chance to solve these problems, but that obviously would be completely counter to the entire idea behind Mastodon. To paraphrase my earlier statement: these are (considered to be) features, not bugs; so, before you embed Mastodon content on your site, you'll need to think about these items.

