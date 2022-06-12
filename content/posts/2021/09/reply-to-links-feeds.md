---
#layout: singlepost
tags:
- post
- code
title: "Reply-to links in site feeds"
description: "Thanks to a reader’s helpful advice, here’s how to enhance the code for your site’s RSS and JSON feeds."
author: Bryce Wray
date: 2021-09-09T14:40:00-05:00
lastmod: 2022-03-23T18:17:00-05:00
discussionId: "2021-09-reply-to-links-feeds"
featured_image: "magnifying-glass-4490044_4288x2848.jpg"
featured_image_width: 4288
featured_image_height: 2848
featured_image_alt: "Monochrome photo of magnifying glass resting on an opened spiral notebook"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/kaosnoff-9039104/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4490044">Vitor Dutra Kaosnoff</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4490044">Pixabay</a></span>
---

Back in May, in "[Help your website get discovered](/posts/2021/05/help-your-website-get-discovered)," I provided code you could use to add RSS and JSON feeds to an [Eleventy](https://11ty.dev) site. Then, [more recently](/posts/2021/07/gems-in-rough-07/#comment-by-email), I added the "Reply via email" link to the bottom of each post. However, combining the two --- *i.e.*, making sure there was a "Reply via email" link in each entry in the respective feeds --- hadn't occurred to me until a few days ago, when a reader suggested it to me and provided a link to his own article, "[Email Replies in Feeds](https://blog.jim-nielsen.com/2020/email-replies-in-rss/)," explaining how he'd done it in the [Metalsmith](https://metalsmith.io/) [static site generator](https://jamstack.org/generators) (SSG). Accordingly, I updated my feeds-related code to incorporate this capability.

Before I give you the updated code, here's a TL;DR explanation of the changes I made. The [Eleventy RSS plugin](https://www.11ty.dev/docs/plugins/rss/) provides a variable called `item.templateContent` which grabs a post's content. Since my per-post reply-via-email link falls **outside** the content's boundaries, I created a separate variable, `emailReplyHTML`, to hold the HTML for that link, concatenated the two variables into `finalHTMLContent`, and then injected `finalHTMLContent` rather than `item.templateContent` into the appropriate `content` tag in each feed. **Also**: the [original article](/posts/2021/05/help-your-website-get-discovered/) mentioned how to do this in [Hugo](https://gohugo.io), too; so, thanks to [some help I received on the Hugo community forum](https://discourse.gohugo.io/t/remove-all-newlines-from-html-for-json-feed/34624), I'll do that, here, too.

Now, on to the code.

### Eleventy RSS

```jinja
---json
{
  "permalink": "/index.xml",
  "eleventyExcludeFromCollections": true,
  "metadata": {
    "title": "BryceWray.com",
    "subtitle": "brycewray.com — Observations, opinions, geekery.",
    "description": "brycewray.com — Observations, opinions, geekery.",
    "url": "https://www.brycewray.com/",
    "feedUrl": "https://www.brycewray.com/index.xml",
    "authors": {
      "name": "Bryce Wray",
      "url": "https://www.brycewray.com/about/"
    }
  }
}
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>{{ metadata.title }}</title>
	<subtitle>{{ metadata.subtitle }}</subtitle>
	<link href="{{ metadata.feedUrl }}" rel="self"/>
	<link href="{{ metadata.url }}"/>
	<updated>{{ collections.all | getNewestCollectionItemDate | dateToRfc3339 }}</updated>
	<id>{{ metadata.url }}</id>
	<author>
		<name>{{ metadata.authors.name }}</name>
	</author>
	{%- for item in collections.all | reverse -%}
		{%- if loop.index0 < 10 -%}
			{%- set absolutePostUrl -%}{{ item.url | url | absoluteUrl(metadata.url) }}{%- endset -%}
      {%- set emailReplyHTML -%}<p><a href="mailto:bw@brycewray.com?subject=Re: “{{ item.data.title }}”">Reply via email</a></p>{%- endset -%}
      {%- set finalHTMLContent = [item.templateContent, emailReplyHTML] | join -%}
			<entry>
				<title>{{ item.data.title }}</title>
				<link href="{{ absolutePostUrl }}"/>
				<updated>{{ item.date | dateToRfc3339 }}</updated>
				<id>{{ absolutePostUrl }}</id>
				<summary>{%- if item.data.subtitle -%}{{ item.data.subtitle }}{%- else -%}""{%- endif -%}{%- if item.data.description %} • {{ item.data.description }}{%- else -%}"[No description]"{%- endif -%}</summary>
				<content type="html">
          {{ finalHTMLContent | htmlToAbsoluteUrls(absolutePostUrl) }}
        </content>
			</entry>
		{%- endif -%}
	{%- endfor %}
</feed>
```

### Eleventy JSON

```jinja
---json
{
  "permalink": "/index.json",
  "eleventyExcludeFromCollections": true,
  "metadata": {
    "title": "BryceWray.com",
    "description": "brycewray.com — Observations, opinions, geekery.",
    "url": "https://www.brycewray.com/",
    "feedUrl": "https://www.brycewray.com/index.json",
    "authors": {
      "name": "Bryce Wray",
      "url": "https://www.brycewray.com/about/"
    }
  }
}
---
{
  "version": "https://jsonfeed.org/version/1.1",
  "title": "{{ metadata.title }}",
  "home_page_url": "{{ metadata.url }}",
  "feed_url": "{{ metadata.feedUrl }}",
  "description": "{{ metadata.description }}",
  "items": [
    {%- for item in collections.all | reverse -%}
      {%- if loop.index0 < 10  -%}
        {%- set absolutePostUrl -%}{{ item.url | url | absoluteUrl(metadata.url) }}{%- endset -%}
        {%- set emailReplyHTML -%}<p><a href="mailto:bw@brycewray.com?subject=Re: “{{ item.data.title }}”">Reply via email</a></p>{%- endset -%}
        {%- set finalHTMLContent = [item.templateContent, emailReplyHTML] | join -%}
        {
          "id": "{{ absolutePostUrl }}",
          "title": "{{ item.data.title }}",
          "url": "{{ absolutePostUrl }}",
          "date_published": "{{ item.date | dateFromRFC2822 }}",
          "summary": "{% if item.data.subtitle -%}{{ item.data.subtitle }} • {% endif -%}{%- if item.data.description -%}{{ item.data.description }}{%- else -%}No description{%- endif %}",
          "content_html": {{ finalHTMLContent | htmlToAbsoluteUrls(absolutePostUrl) | dump | safe }}
        }{%- if not loop.last -%},{%- endif %}
      {%- endif -%}
    {%- endfor %}
  ]
}
```

### Hugo RSS

```go-html-template
{{- $pctx := . -}}
{{- if .IsHome -}}{{ $pctx = .Site }}{{- end -}}
{{- $pages := slice -}}
{{- if or $.IsHome $.IsSection -}}
{{- $pages = $pctx.RegularPages -}}
{{- else -}}
{{- $pages = $pctx.Pages -}}
{{- end -}}
{{- $limit := .Site.Config.Services.RSS.Limit -}}
{{- if ge $limit 1 -}}
{{- $pages = $pages | first $limit -}}
{{- end -}}
{{- printf "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>" | safeHTML }}
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{{ .Site.Params.Domain }}</title>
    <link>{{ .Permalink }}</link>
    <description>Recent content {{ if ne  .Title  .Site.Title }}{{ with .Title }}in {{.}} {{ end }}{{ end }}on {{ .Site.Title }}</description>
    <generator>Hugo -- gohugo.io</generator>{{ with .Site.LanguageCode }}
    <language>{{.}}</language>{{end}}{{ with .Site.Author.email }}
    <managingEditor>{{.}}{{ with $.Site.Author.name }} ({{.}}){{end}}</managingEditor>{{end}}{{ with .Site.Author.email }}
    <webMaster>{{.}}{{ with $.Site.Author.name }} ({{.}}){{end}}</webMaster>{{end}}{{ with .Site.Copyright }}
    <copyright>{{.}}</copyright>{{end}}{{ if not .Date.IsZero }}
    <lastBuildDate>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 -0700" | safeHTML }}</lastBuildDate>{{ end }}
    {{- with .OutputFormats.Get "RSS" -}}
    {{ printf "<atom:link href=%q rel=\"self\" type=%q />" .Permalink .MediaType | safeHTML }}
    {{- end -}}
    {{ range $pages }}
    {{- $titleThis := .Title | .Page.RenderString -}}
    {{- $emailReplyHTML := printf "%s%s%s" `<p><a href="mailto:bw@brycewray.com?subject=Re: “` $titleThis `”">Reply via email</a></p>`  -}}
    {{- $contentMD := .Content -}}
    {{- $finalHTMLContent := printf "%s%s" $contentMD $emailReplyHTML -}}
    <item>
      <title>{{ $titleThis }}</title>
      <subTitle>{{ .Params.Subtitle }}</subTitle>
      <link>{{ .Permalink }}</link>
      <pubDate>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 -0700" | safeHTML }}</pubDate>
      {{ with .Site.Author.email }}<author>{{.}}{{ with $.Site.Author.name }} ({{.}}){{end}}</author>{{end}}
      <guid>{{ .Permalink }}</guid>
      <description>{{ $finalHTMLContent | html }}</description>
      <
    </item>
    {{ end }}
  </channel>
</rss>
```

### Hugo JSON

```go-html-template
{{- $pctx := . -}}
{{- if .IsHome -}}{{ $pctx = .Site }}{{- end -}}
{{- $pages := $pctx.RegularPages -}}
{{- $limit := .Site.Config.Services.RSS.Limit -}}
{{- if ge $limit 1 -}}
{{- $pages = $pages | first $limit -}}
{{- end -}}
{{ $length := (len $pages) -}}
{
  "version": "https://jsonfeed.org/version/1.1",
  "title": "{{ .Site.Title }}",
  "description": "{{ .Site.Params.Description }}",
  "home_page_url": "{{ .Site.BaseURL }}",
  {{ with .OutputFormats.Get "JSON" -}}
  "feed_url": "{{ .Permalink }}",
  {{ end -}}
  {{ with .Site.LanguageCode -}}
  "language": "{{ . }}",
  {{ end -}}
  {{ with $.Param "icon" -}}
  "icon": "{{ . | absURL }}",
  {{ end -}}
  {{ with $.Param "favicon" -}}
  "favicon": "{{ . | absURL }}",
  {{ end -}}
  {{ with .Site.Author.name -}}
  "authors": [
    {
      "name": "{{ . }}"{{ with $.Site.Author.url }},
      "url": "{{ . }}"{{ end }}{{ with $.Site.Author.avatar }},
      "avatar": "{{ . | absURL }}"{{ end }}
    }
  ],
  {{ end -}}
  "items": [
    {{ range $index, $element := $pages -}}
    {{- $emailReplyHTML := printf "%s%s%s" `<p><a href="mailto:bw@brycewray.com?subject=Re: “` .Title `”">Reply via email</a></p>` -}}
    {{- $emailReplyHTML := $emailReplyHTML -}}
    {{- $contentHTML := printf "%s%s" .Content $emailReplyHTML -}}
    {
      "title": {{ .Title | jsonify }},
      "date_published": "{{ .Date.Format "2006-01-02T15:04:05Z07:00" }}",
      "date_modified": "{{ .Lastmod.Format "2006-01-02T15:04:05Z07:00" }}",
      "id": "{{ .Permalink }}",
      "url": "{{ .Permalink }}",
      {{ with .Params.author -}}
      "authors": [
        {
          "name": "{{ . }}"
        }
      ],
      {{ end -}}
      "content_html": {{- $contentHTML | jsonify -}}
    }{{ if ne (add $index 1) $length }},{{ end }}
    {{ end -}}
  ]
}
```

**Note**: Of course, if you're already a subscriber to either of my feeds (and, if so, thank you!), you won't see the resulting "Reply via email" link in content that had been pulled into your chosen newsreader app before I implemented these code changes. The only way to see it in older content would be to flush the old posts and then reload them.
{.yellowBox}
