---
title: "Static tweets in Hugo: using resources.​GetRemote"
# title has a zero-width-space character
# - h/t https://www.somebits.com/weblog/tech/zero-width-space.html
description: "A recommendation in the Hugo Discourse leads me to alter my shortcodes for embedding static tweets."
author: Bryce Wray
date: 2022-07-25T16:05:00-05:00
#draft: true
#initTextEditor: **iA Writer**
---

**Update from the future in general (!)**: I continue to improve upon the [Hugo](https://gohugo.io) shortcode described herein. Any rendered tweets in this or other posts obviously will be rendered by the most current code available when the site is on Hugo --- with the only exception being when it serves a purpose to show a less well-rendered tweet, such as for a comparison between Hugo's standard `tweet` shortcode and my own shortcode.\
**However**, in this or any other related post as the actual code changes, I will **not** change the post's code sample (for archival purposes) **unless** there's an overriding reason to change; *e.g.*, to correct a mistake that slipped past me during the editing process.\
Please use the [site search page](/search/) to find related posts.
{.yellowBox}

As I noted in a footnote to a [recent post](/posts/2022/07/staying-hugo-post-three-years-later/), I **really** like using [Hugo](https://gohugo.io)'s [`getJSON` function](https://gohugo.io/templates/data-templates/#get-remote-data) for grabbing data from a remote API, especially as compared to alternatives for most of Hugo's JavaScript-based competitors in the world of [static site generators](https://jamstack.org/generators) (SSGs):

> . . . I've used both [[node-fetch](https://github.com/node-fetch/node-fetch) and [axios](https://axios-http.com/)] in both [Eleventy](https://11ty.dev) and [Astro](https://astro.build), and sometimes they've worked okay for me but other times they've constituted a major pain. (Async and I aren't exactly the best of friends.) I have yet to run into similar agonies with `getJSON`, which I've found far more forgiving than either node-fetch or axios.

I've written several times this year (most recently [last month](/posts/2022/06/static-tweets-hugo-update/)) about how to embed fully static tweets on one's site; and, where Hugo is concerned, `getJSON` is how I've done it and suggested that others do, too.

Then, this morning, when I made my first visit of the day to the [Hugo Discourse](https://discourse.gohugo.io), I learned I'd likely need to make a change to that.

This realization hit me as I read a [comment](https://discourse.gohugo.io/t/error-for-getjson-when-used-with-resources-getresources/39687/4) from Hugo's chief developer, Bjørn Erik Pedersen, in reply to someone who was having trouble with `getJSON`:

> I would call `getJSON` a legacy API by [now]. We may eventually hide it from the docs.
>
> I recommend you use `resources.GetRemote` for [everything].

Yikes.

[`resources.GetRemote`](https://gohugo.io/hugo-pipes/introduction/#get-resource-with-resourcesget-and-resourcesgetremote) was [an addition](/posts/2021/12/fetching-remote-stuff-hugo-0-90-plus/) to [Hugo 0.91.0](https://github.com/gohugoio/hugo/releases/tag/v0.91.0) and, as its name implies, it retrieves files and data from remote locations. While it had occurred to me that this overlapped somewhat with the already-extant `getJSON`, I hadn't considered the latter to be a likely candidate for deprecation --- at least, not until I read Pedersen's comment, at which point I knew I'd have some work to do. Namely, I had to fix my `stweet.html` and `stweetv2.html` shortcodes so that each used `resources.GetRemote` rather than `getJSON`.

Now that I've done so, here's an ultra-simplified depiction of the main differences between the two methods:

```go-html-template
{{/* If using `getJSON` ... */}}
{{ $json := getJSON $urlToGet }}
{{ $text := .Page.RenderString $json.text }}
{{/* [etc.] */}}

{{/* If using `resources.GetRemote` ... */}}
{{ $currentPage := .Page }}
{{ with resources.GetRemote $urlToGet }}
	{{ $json := unmarshal .Content }}
	{{ $text := $json.text | $currentPage.RenderString }}
	{{/* [etc.] */}}
{{ end }}
```

**Update, 2022-07-26**: Contrary to what I wrote in the original version of this post, you **can** use `.RenderString` here, just as long as you establish a context it can "see" within the `with` loop --- in this case, with `$currentPage`. I am grateful to [Daniel F. Dickinson and @gaetawoo for setting me straight on that](https://discourse.gohugo.io/t/error-for-getjson-when-used-with-resources-getresources/39687)![^whyVar]
{.yellowBox}

[^whyVar]: But could you use simply `.Page`, rather than having to create `$currentPage` as an equivalent of `.Page`? Usually, yes. However, the latter is safer. As Dickinson explained in the linked Discourse thread, "I tend to use the [`$currentPage`] method because I am frequently in a partial from a shortcode and other contexts where `$.` doesn't work as expected, and it is easier for me to . . . use something that works consistently . . ."
