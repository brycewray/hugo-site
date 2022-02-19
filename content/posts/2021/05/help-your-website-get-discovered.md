---
layout: singlepost
title: "Help your website get discovered"
subtitle: "You built it, but will they come?"
description: "A few suggestions for getting your website the attention it deserves."
author: Bryce Wray
date: 2021-05-14T16:30:00-05:00
lastmod: 2022-02-19T13:20:00-06:00
discussionId: "2021-05-help-your-website-get-discovered"
featured_image: "magnifying-glass-4490044_4288x2848.jpg"
featured_image_width: 4288
featured_image_height: 2848
featured_image_alt: "Monochrome photo of magnifying glass resting on an opened spiral notebook"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/kaosnoff-9039104/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4490044">Vitor Dutra Kaosnoff</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4490044">Pixabay</a></span>
---

If you want your website to be discovered by search engines, the sad news is that there's no [Hollywood drugstore](https://en.wikipedia.org/wiki/Schwab%27s_Pharmacy) where it can hang out in the vain hope that such discovery will happen. Just putting a site out there among the billions of others isn't going to get the job done.

Even worse: you need to get your site's content discovered continuously, not just once. Search engines can slowly "lose interest" in your site unless you give them reasons to do otherwise.

With that bad news is some accompanying good news: if you're willing to put in a little extra work, you can help the process considerably---and, unlike many activities related to search engine optimization (SEO), it needn't cost you a penny.

## Three keys to getting discovered

Back in the late 1990s, before Google swallowed up the web search space and there still were *numerous* prominent search engines out there, you actually would have to **submit** your site to each of them for inclusion. But those days are long gone and now, to invoke a "[Russian Reversal](https://en.wikipedia.org/wiki/In_Soviet_Russia)”-ish line, "search engines find *you*." Or, at least, you hope they do.

Search engine algorithms come and go, but you can safely assume that  three items are crucial to how well, and how frequently, search engines discover your site: **content**, **performance**, and the combination of **feeds** and **sitemaps**.

### Content

Your site's pages and posts should have plenty of *original content*, and preferably content that receives frequent updates. Some people add an article a day and, if your life and your learning make that feasible, that's fine. I try to hold off adding stuff to this site until I *think* I've found something of interest. (Yeah, I know, YMMV, but one does what one can.) The *subject(s)* of your content are, of course, totally up to you.

Do you even have to write all that well? It surely helps, but even a casual check of many websites, commercial as well as personal, will show you many examples of not-so-great writing that nonetheless are getting the job done. Somehow.

### Performance

I already addressed this subject in last year's "[Chasing 100: Tips for optimizing your website](/posts/2020/07/chasing-100-tips-optimizing-website)”; and, where the Google-critical Core Web Vitals are concerned, you should rely on the proverbial horse's mouth (*e.g.*, "[More time, tools, and details on the page experience update](https://developers.google.com/search/blog/2021/04/more-details-page-experience)”; "[Core Web Vitals &amp; Page Experience FAQs](https://support.google.com/webmasters/thread/104436075/core-web-vitals-page-experience-faqs-updated-march-2021)”; and, most especially, "[Web Vitals](https://web.dev/vitals/)”).

### Feeds and sitemaps

It's surprising how many otherwise SEO-friendly websites lack suitable *feeds* (or, as some used to call them, "news feeds”) and *sitemaps*. The latter, in particular, are good not only for the always-"watching" search engines but also your fellow humans who have difficulty seeing, since sitemaps provide additional ways for such individuals to read your content.

By the way, each site should provide two types of feeds and two types of sitemaps:

- Feeds should be in both **[RSS](https://www.rssboard.org/rss-specification)** and **[JSON](https://jsonfeed.org)** form. The former has been around since the late 1990s, while the newer (2017) JSON feed format offers a number of advantages---notably human-readability---over RSS.
- Some website generators automatically provide sitemaps in **XML** format but, especially for accessibility purposes, a website should also have an **HTML** sitemap.

Here's how to give your site those feeds and sitemaps **and** do everything you can to get them automatically discovered. These instructions are for the two [static site generators](https://jamstack.org/generators) (SSGs) whose use I most highly recommend, [Eleventy](https://11ty.dev) and [Hugo](https://gohugo.io).

#### Eleventy

Before we begin, I must acknowledge that most of this is shamelessly stolen from examples by not only [Eleventy creator Zach Leatherman](https://www.11ty.dev/docs/plugins/rss/) but also [Andy Bell](https://github.com/piccalil-li/eleventy-json-feed) of [Picalilli](https://piccalil.li/) fame.

Some starting assumptions:

- Since most Eleventy examples out there seem to assume use of [Nunjucks templating](https://www.11ty.dev/docs/languages/nunjucks/), we'll go with Nunjucks for how to do these. If your Eleventy site isn't already set to use `.njk` files for templating, you'll need to implement the [appropriate configuration setting](https://www.11ty.dev/docs/config/#template-formats) to make that happen.
- Your Eleventy project has a top-level `src` folder where certain top-of-site-level templates reside (for example, your site's "404" template).

With those understood, here we go&nbsp;.&nbsp;.&nbsp;.

1. If you haven't already added them to your Eleventy setup, add the [Eleventy RSS plugin](https://www.11ty.dev/docs/plugins/rss/) and the [Luxon](https://github.com/moment/luxon) time-related library.

2. In the `src` folder, create the file `feed.njk` to make your template for the RSS feed:

```jinja
---json
{
  "permalink": "/index.xml",
  "eleventyExcludeFromCollections": true,
  "metadata": {
    "title": "My Site Title",
    "description": "A short site description.",
    "url": "https://www.example.com/",
    "feedUrl": "https://www.example.com/index.xml",
    "authors": {
      "name": "Your Name",
      "url": "https://www.example.com/about/"
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
			<entry>
				<title>{{ item.data.title }}</title>
				<link href="{{ absolutePostUrl }}"/>
				<updated>{{ item.date | dateToRfc3339 }}</updated>
				<id>{{ absolutePostUrl }}</id>
				<summary>{%- if item.data.subtitle -%}{{ item.data.subtitle }}{%- else -%}""{%- endif -%}{%- if item.data.description %} • {{ item.data.description }}{%- else -%}"[No description]"{%- endif -%}</summary>
				<content type="html">{{ item.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</content>
			</entry>
		{%- endif -%}
	{%- endfor %}
</feed>
```

3. In the `src` folder, create the file `jsonfile.njk` to make your template for the JSON feed:

```jinja
---json
{
  "permalink": "/index.json",
  "eleventyExcludeFromCollections": true,
  "metadata": {
    "title": "My Site Title",
    "description": "A short site description.",
    "url": "https://www.example.com/",
    "feedUrl": "https://www.example.com/index.json",
    "authors": {
      "name": "Your Name",
      "url": "https://www.example.com/about/"
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
        {%- set absolutePostUrl -%}{{ item.url | url | absoluteUrl(metadata.url) }}{%- endset %}
        {
          "id": "{{ absolutePostUrl }}",
          "title": "{{ item.data.title }}",
          "url": "{{ absolutePostUrl }}",
          "date_published": "{{ item.date | dateFromRFC2822 }}",
          "summary": "{% if item.data.subtitle -%}{{ item.data.subtitle }} • {% endif -%}{%- if item.data.description -%}{{ item.data.description }}{%- else -%}No description{%- endif %}",
          "content_html": {%- if item.templateContent -%}{{ item.templateContent | htmlToAbsoluteUrls(absolutePostUrl) | dump | safe }}{%- else -%}""{%- endif -%}
        }{%- if not loop.last -%},{%- endif %}
      {%- endif -%}
    {%- endfor %}
  ]
}
```

4. In the `src` folder, create the file `sitemap.njk` to make your template for the XML sitemap (replace the dates in the final two items with what make sense for your site):

```jinja
---
permalink: /sitemap.xml
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {%- for item in collections.all | reverse -%}
  <url>
    <loc>{{ siteparams.siteURLforOG }}{{ item.url }}</loc>
    {%- if item.data.lastmod -%}
    <lastmod>{{ item.data.lastmod | dateStringISO }}</lastmod>
    {%- else -%}
    <lastmod>{{ item.date | dateStringISO }}</lastmod>
    {%- endif -%}
  </url>
  {%- endfor -%}
</urlset>
```

5. In the `src` folder, create the folder `sitemap`; then, within it, create the file `index.md` with whatever date makes sense for you:

```md
---
layout: sitemap
title: "Sitemap (HTML form)"
---

(The text for the page is all in the appropriate template.)
```

6. Then, in the appropriate folder for your layouts (in my case, that's `src/_includes/layouts`), add a folder called `sitemap` and, within it, the `sitemap.njk` template which will serve as the template for your HTML sitemap (you'll have to handle the CSS classes on your own, of course, but this'll give you a start; also, the `layout` reference will vary based on what you call *your* site's [base layout](https://www.11ty.dev/docs/layout-chaining/), and you'll obviously want to customize those "Main pages" items at the top):

```jinja
---
layout: 'base.njk'
---
<main>
  <div class="container-narrower sitemapDiv">
    <h1>Sitemap</h1>
    <h2>Main pages</h2>
    <ul>
      <li><a href="{{ siteparams.siteURLforOG }}">Home page</a></li>
      <li><a href="{{ siteparams.siteURLforOG }}/about/">About me</a></li>
    </ul>
    <h2>Posts</h2>
    <ul>
    {%- for post in collections.post | reverse %}
	  <li>{{ siteparams.siteURLforOG }}{{ post.url }} &bull; {{ post.date | dateStringISO }}</li>
    {%- endfor %}
    </ul>
  </div>
</main>
```

Now, finish up the Eleventy-based setup by going down this page to the "For either SSG" instructions.

#### Hugo

I've noted [before](/posts/2020/12/eleventy-hugo-comparing-contrasting/) that Hugo comes with a lot of built-in goodies, so it won't surprise you that the process for Hugo is a bit simpler than with Eleventy.

1. Make sure that, in your [sitewide configuration file](https://gohugo.io/getting-started/configuration/), you have specified `json` as one of the output formats and one of the home output options. For example, my sitewide config file is `config.yaml` and has these entries:

```yaml
outputFormats:
	json:
		baseName: "index"
		mediaType: "application/json"
		isPlainText: true

outputs:
	home:
		- html
		- rss
		- json
```

2. Hugo comes with a built-in template for the RSS feed, so there's no need to come up with one.
3. For the JSON feed, go to the appropriate `layouts/_defaults` folder (either in the top level or within a theme's folder setup; see "[Hugo's Lookup Order](https://gohugo.io/templates/lookup-order/)”) and create an `index.json` file with the following content (based on how the aforementioned RSS template works):

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
      "content_html": {{ .Content | jsonify }}
    }{{ if ne (add $index 1) $length }},{{ end }}
    {{ end -}}
  ]
}
```

4. Hugo comes with a built-in template for the XML sitemap, so there's no need to create one.
5. For the HTML sitemap, go to the `content` folder (probably top-level) and create a `sitemap` folder containing an `_index.md` file (note that it's `_index.md` and not `index.md`, which [matters in Hugo](https://gohugo.io/content-management/page-bundles/)) with whatever date you prefer:

```md
---
title: "Sitemap (HTML form)"
date: 2021-05-12T08:00:00-05:00
---
```

6. Then, back in the appropriate `layouts` folder, add a `sitemap` folder containing a `sitemap.html` file with the following (edit the CSS classes and the "Main pages" stuff as makes sense for your site):

```go-html-template
{{ define "main" }}
  <div class="container-narrower sitemapDiv">
    <h1>Sitemap</h1>
    <h2>Main pages</h2>
    <ul>
      <li><a href="{{ .Site.BaseURL }}">Home page</a></li>
      <li><a href="{{ .Site.BaseURL }}about/">About me</li>
    </ul>
    <h2>Posts</h2>
    <ul>
    {{- range where .Site.Pages.ByPublishDate.Reverse ".Type" "posts" -}}
      {{- if (ne .Title "Posts") -}}
      <li><strong><a href="{{ .Permalink }}">{{ .Title | markdownify }}</a></strong> &bull; {{ .PublishDate.Format "January 2, 2006" }}</li>
      {{- end -}}
    {{- end -}}
    </ul>
  </div>
{{ end }}
```

Now, finish up the Hugo-based setup with the "For either SSG" instructions below.

#### For either SSG

1. Add the following to your sitewide `head` tag, wherever it resides in your layouts:

```html
<!-- discover feeds -->
<link rel="alternate" title="Feed - RSS" type="application/rss+xml" href="https://www.example.com/index.xml" />
<link rel="alternate" title="Feed - JSON" type="application/feed+json" href="https://www.example.com/index.json" />
```

2. This one is a **suggestion** but I think it's wise, especially for accessibility: add sitewide links (perhaps in the footer) to both of your sitemaps. For example, you might do it like this:

```html
Sitemaps: <a href="/sitemap">HTML</a> &bull; <a href="/sitemap.xml">XML</a>.
```

### Easy and automatic from here on

If you're wrinkling your nose at all of this (even the comparatively easier process for Hugo), please note that, once you've done it, it'll take care of itself from there on. Whenever you add new posts, the code will automatically add them to the feeds and sitemaps. It gives you just one more way to alert the world, and especially the search engines, that your site is active and has new good stuff they should check out.

## Why they should stop&nbsp;by

The famous line from *[Field of Dreams](https://www.imdb.com/title/tt0097351/)* is: "If you build it, he will come." Just building a website doesn't mean that *human* visitors, much less search engines’ robots, will come to it. But, if you follow all of these suggestions, you give your site a better chance that they will. Creating original and often-updated content, making your site perform as well as possible, and providing feeds and sitemaps will tell both people and searchbots that they have reasons to stop by and stay a while---and, with any luck at all, to make a habit of it.
