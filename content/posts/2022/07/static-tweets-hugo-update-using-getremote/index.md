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
{{/* With `getJSON` ... */}}
{{ $json := getJSON $urlToGet }}
{{ $text := .Page.RenderString $json.text }}
{{/* [etc.] */}}

{{/* With `resources.GetRemote` ... */}}
{{ $curPage := .Page }}
{{ with $resources.GetRemote $urlToGet }}
	{{ $json := unmarshal .Content }}
	{{ $text := $json.text | $curPage.RenderString }}
	{{/* [etc.] */}}
{{ end }}
```

**Update, 2022-07-26**: Contrary to what I wrote in the original version of this post, you **can** use `.RenderString` here, just as long as you establish a context --- in this case, `$curPage` for the `.Page`. I am grateful to [Daniel F. Dickinson for setting me straight on that](https://discourse.gohugo.io/t/error-for-getjson-when-used-with-resources-getresources/39687/7)!
{.yellowBox}

*(Also: while I left the code as-is in my [three](/posts/2022/02/static-tweets-eleventy-hugo/) [earlier](/posts/2022/02/static-tweets-eleventy-hugo-part-2/) [articles](/posts/2022/06/static-tweets-hugo-update/) about using Hugo shortcodes for static tweet embeds, I did add updates about, and links to, this post.)*
