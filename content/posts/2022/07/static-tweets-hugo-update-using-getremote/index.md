---
title: "Static tweets in Hugo: using resources.GetRemote"
description: "A recommendation in the Hugo Discourse leads me to alter my shortcodes for embedding static tweets."
author: Bryce Wray
date: 2022-07-25T16:05:00-05:00
#draft: true
#initTextEditor: **iA Writer**
---

As I noted in a footnote to a [recent post](/posts/2022/07/staying-hugo-post-three-years-later/), I **really** like using [Hugo](https://gohugo.io)'s [`getJSON` function](https://gohugo.io/templates/data-templates/#get-remote-data) for grabbing data from a remote API, especially as compared to alternatives for most of Hugo's JavaScript-based competitors in the world of [static site generators](https://jamstack.org/generators) (SSGs):

> . . . I've used both [[node-fetch](https://github.com/node-fetch/node-fetch) and [axios](https://axios-http.com/)] in both [Eleventy](https://11ty.dev) and [Astro](https://astro.build), and sometimes they've worked okay for me but other times they've constituted a major pain. (Async and I aren't exactly the best of friends.) I have yet to run into similar agonies with `getJSON`, which I've found far more forgiving than either node-fetch or axios.

I've written several times this year (most recently [last month](/posts/2022/06/static-tweets-hugo-update/)) about how to embed fully static tweets on one's site; and, where Hugo is concerned, `getJSON` is how I've done it and suggested that others do, too.

Then, yesterday morning, when I made my first visit of the day to the Hugo Discourse, I learned I'd likely need to make a change to that.

I saw a [comment](https://discourse.gohugo.io/t/error-for-getjson-when-used-with-resources-getresources/39687/4) from Hugo's chief developer, Bjørn Erik Pedersen, in reply to someone who was having trouble with `getJSON`:

> I would call `getJSON` a legacy API by [now]. We may eventually hide it from the docs.
>
> I recommend you use `resources.GetRemote` for [everything].

Yikes.

[`resources.GetRemote`](https://gohugo.io/hugo-pipes/introduction/#get-resource-with-resourcesget-and-resourcesgetremote) was an addition to [Hugo 0.91.0](https://github.com/gohugoio/hugo/releases/tag/v0.91.0) and, as its name implies, it retrieves files and data from remote locations. While it had occurred to me that this overlapped somewhat with the already-extant `getJSON`, I hadn't considered it likely for deprecation --- at least, not until I read Pedersen's comment, at which point I knew I'd have some work to do. Namely, I had to fix my `stweet.html` shortcode so that it used `resources.GetRemote` rather than `getJSON`.

Now that I've done so, here's an ultra-simplified depiction of the main differences between the two methods:

```go-html-template
{{/* With the `getJSON` method... */}}
{{ $json := getJSON $urlToGet }}
{{ $text := .Page.RenderString $json.text }}
{{/* [etc.] */}}

{{/* With the `resources.GetRemote` method... */}}
{{ with $resources.GetRemote $urlToGet }}
  {{ $json := unmarshal .Content  }}
  {{ $text := $json.text | markdownify }}
  {{/* [etc.] */}}
{{ end }}
```

The [`.Page.RenderString`](https://gohugo.io/functions/renderstring) stuff doesn't appear to work with `resources.GetRemote`, so I resorted instead to [`markdownify`](https://gohugo.io/functions/markdownify). While there have been a few hints here and there that the latter, too, might be headed for Deprecation-Ville at some point, it'll have to do unless/until the former can be made to play nicely with `resources.GetRemote`.

*(Also: while I left the code as-is in those three earlier articles about using Hugo shortcodes for static tweet embeds, I did add updates about, and links to, this post.)*