---
tags:
- post
- social
title: "Hugo hits The Hundy"
description: "As Hugo reaches version 0.100.x, the venerable SSG improves upon its handling of shortcodes."
author: Bryce Wray
date: 2022-06-07T08:59:00-05:00
#draft: true
#initTextEditor: iA Writer
---

Last week, the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators/) (SSG) hit The Big One-Zero-Zero---namely, **[version 0.100.0](https://github.com/gohugoio/hugo/releases/tag/v0.100.0)**, but I'll call it *0.100.x* given that it's [since been tweaked to 0.100.1](https://github.com/gohugoio/hugo/releases/tag/v0.100.1).

*(No, it **didn't** go to v.1.0. More on that at the end.)*

As Hugo maintainer [Bjørn Erik Pedersen](https://github.com/bep) explained in the [release notes](https://github.com/gohugoio/hugo/releases/tag/v0.100.0), this version's main purpose took the form of improvements to Hugo's [shortcodes](https://gohugo.io/templates/shortcode-templates/). And this post's main purpose is to show you what those are.

## Shortcodes in Markdown files

The whole purpose of shortcodes is making it easy to add small, reusable snippets to your site's [Markdown](https://daringfireball.net/projects/markdown/) content. Now, with Hugo 0.100.x, a Markdown file (`.md`) **can be** a shortcode for the first time. This means that you won't have to use HTML to create a shortcode that's **only** for providing some sort of text. Since I had multiple shortcodes that fit that description, I was pleased to see this new capability.

Let's say you occasionally want to drop in a standard disclaimer, and so you've made a shortcode for it rather than having to repeat the thing every time (the link is bogus):

**Disclaimer**: This data is provided only for comparison and does **not** necessarily reflect the opinion of [this company](#).
{.blueBox}

Up to now, that would've had to be an HTML file:

```html
<div class="blueBox">
  <p><strong>Disclaimer</strong>: This data is provided only for comparison and does <strong>not</strong> necessarily reflect the opinion of <a href="{{ .Site.BaseUrl }}/about/" target="_blank" rel="nofollow">this company</a>.</p>
</div>
```

Now, with Markdown as a shortcode format, the typing[^typing] is easier:

```md
**Disclaimer**: This data is provided only for comparison and does **not** necessarily reflect the opinion of [this company]({{ .Site.BaseUrl }}about/).
{.blueBox}
```

[^typing]: Note that the link-handling here will be the same as in the HTML version **if** you've used a [`render-link` template](https://gohugo.io/templates/render-hooks/#render-hooks-for-headings-links-and-images) accordingly. As for that `{.blueBox}` item, that's an *attribute*; combined with my site's styling, it accomplishes the same thing as `<div class="blueBox"><p>[content]</p></div>` in the HTML shortcode. This is made possible by the appropriate [goldmark](https://github.com/yuin/goldmark) [setting](https://gohugo.io/getting-started/configuration-markup#goldmark) in your Hugo project's config file, as I explained in last year's "[New in Hugo: easier writing](/posts/2021/02/new-hugo-easier-writing/)."

## Respect the indents

Before Hugo 0.100.0, inserting a shortcode within indented content, such as a *list item* (`li`) within an *ordered* or *unordered list* (`ol` or `ul`, respectively), would produce unwanted results. To borrow from the example given in the 0.100.0 release notes, imagine a shortcode, `ourList.html`, that's just a frequently provided list of items (we'll do it without the `<ol>` or `<ul>`, to leave room for multiple use cases):

```html
<li><a href="/products/">Products</a></li>
<li><a href="/services/">Services</a></li>
<li><a href="/locations/">Locations</a></li>
<li><a href="/our-team/">Our team</a></li>
```

Okay, fine. So if you want to turn that into *sub-bullets* within a bulleted list, you might do this:

```md
- More about us
  {{%/* ourList */%}}
- [Why buy from us?](/why-buy/)
- [What our customers say](/testimonials/)
```

<!--To those sneaking a look at this post's content file: the `/*` and `*/` above allow it to render on this page as it should, **without** confusing Hugo.-->

Prior to v.0.100.0, this would result in the following (as before, the links are bogus):

<ul>
  <li>More about us
    <ul>
      <li><a href="#">Products</a></li>
    </ul>
   </li>
   <li><a href="#">Services</a></li>
   <li><a href="#">Locations</a></li>
   <li><a href="#">Our team</a></li>
   <li><a href="#">Why buy from us?</a></li>
   <li><a href="#">What our customers say</a></li>
</ul>

But, starting with Hugo 0.100.0, you get the desired indenting:

- More about us
	- [Products](#)
	- [Services](#)
	- [Locations](#)
	- [Our teams](#)
- [Why buy from us?](#)
- [What our customers say](#)

**Note**: I purposely altered the example from the release notes, which showed a shortcode that was in Markdown---although, as pointed out earlier, that wasn't possible before v.0.100.0 in the first place. Um, oops?
{.yellowBox}

## More goodies

All of this is possible because, as of v.0.100.0, Hugo's [`$page.RenderString` function](https://gohugo.io/functions/renderstring/) supports shortcodes. Hugo expert [Régis Philibert](https://github.com/regisphilibert), as he often does on such occasions, grasped added significance from the details in the release notes:

{{< stweet "1531705641739460612" >}}

Finally, 0.100.0 added a new [`resources.Copy` function](https://gohugo.io/hugo-pipes/introduction/#copy-a-resource) to Hugo's asset pipeline, [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/). The documentation says it's "possibly most useful for renaming things"---as in this example (also from the documentation), in which Hugo's [built-in image-processing capability](https://gohugo.io/content-management/image-processing/) comes into play:

```go-html-template
{{ $resized := $image.Resize "400x400" |  resources.Copy "images/mynewname.jpg" }}
<img src="{{ $resized.RelPermalink }}">
```

## Looking out for Number One?

If you'd noticed Hugo's [v.0.99.0 release on May 16](https://github.com/gohugoio/hugo/releases/tag/v0.99.0), you might have thought, as I did, "Aha, this means the long-awaited version 1 is near." After all, [Hugo's first public release was on July 4, *2013*, as v.0.7](https://github.com/gohugoio/hugo/releases/tag/v0.7).

However, on the day of the 0.100.0 release, Pedersen [explained](https://discourse.gohugo.io/t/hugo-0-100-0-released/38874/11) in the [Hugo Discourse forum](https://discourse.gohugo.io/) why that wasn't to be the case just yet:

> The one thing we signal by not going 1.x is that we're kind of not "1.0 feature complete." People tend to think a major version would get a more stable version, which I'm not sure is always the case. I suspect you end up with major version increments and, due to lack of human resources, not so much back-ports of bug fixes to the previous version(s).

Bottom line: only when Pedersen and those who help him code Hugo decide that the time is right will Hugo go to version 1. It'll happen when it happens. End of story.
