---
#layout: singlepost
title: "Go big or Go home?"
description: "How some image-handling code moved from Eleventy to Hugo."
author: Bryce Wray
date: 2021-02-10T07:55:00-06:00
lastmod: 2022-03-28T13:54:00-05:00
#draft: false
discussionId: "2021-02-go-big-go-home"
featured_image: "markus-spiske-70Rir5vB96U-unsplash_5760x3840.jpg"
featured_image_width: 5760
featured_image_height: 3840
featured_image_alt: "Closeup of computer code on a display"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@markusspiske?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Markus Spiske</a>; <a href="/s/photos/computer-code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
---

**Note**: After you read this post, please see also [its sequel](/posts/2021/11/go-big-go-home-sequel/) for what I believe is a much more usable result.
{.yellowBox}

Imagine that you're about to take your first drive as owner of a shiny new vehicle which you chose after weeks of research and comparison.

Now, imagine that you've bought that vehicle even though its audio system, while superb, has all of its controls in a language that you barely can read.

That's somewhat analogous to where I found myself a few days ago, when I committed to [returning this site](/posts/2021/02/simplify-simplify/) to the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG). Why? Because, with that commitment, also came a commitment to learning more about the [Go programming language](https://go.dev) on which Hugo itself is based.

I'd been spoiled by how the site's former SSG, [Eleventy](https://11ty.dev), famously allows use of [multiple languages](https://www.11ty.dev/docs/languages/) in building the *templates* that an SSG uses to convert plain text into web pages like the one you're reading now. Of course, having had the site on Hugo for nearly all of its first year of existence, I was fully aware of the need to accept Go-based templating once more upon the return.

Still, there's a difference between *accepting* it and *embracing* it.

While transitioning the site from Eleventy back to Hugo, I'd cobbled together a really spaghetti-ish Go version of one particular bit of code on which the site has been depending for some months now. However, the result's inelegance and un-[DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)-ness embarrassed me.

To be specific: while the original JavaScript code looped nicely through an array to do its thing, the Go code was repeating each part verbatim---and only because, frankly, it worked and I didn't want to fool with the looping process in Go.

Cowardly, I know, but that's how it was.

Anyway: after [completing and announcing the transition](/posts/2021/02/simplify-simplify/), I was determined to improve that code as much as my extremely limited abilities would allow. In doing so, I felt, I'd be making at least a fair try at *beginning* to embrace Go-based templating.

[^scDef]: The definition of *shortcode* varies widely but, in SSG-land in general and both Hugo and Eleventy in particular, it refers to a macro-like thing that you can drop into a site's Markdown that produces the same effect as if you'd put actual code in there.

This is the story of what resulted from that effort. Perhaps it will be instructive to others considering converting to Hugo from other SSGs.

## Get short(code)y

The subject of this post is a **shortcode**. The definition of *shortcode* varies widely but, in SSG-land in general and for both Hugo and Eleventy in particular, it refers to a macro that you can drop into a site's [Markdown](https://daringfireball.net/projects/markdown) so it'll produce the same effect as if you'd put actual code in there.

The shortcode we're discussing here, initially created in the Eleventy site as *lazy-picture.js* and now existing in the Hugo site as *imgc.html*, makes it easy for me to insert [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) from the [free account](/posts/2020/07/transformed/) that I have with [Cloudinary](https://cloudinary.com). I stress that this is for *responsive* images because, if all you want to do is insert an image, Markdown already allows that on its own; but *responsive* images need some fairly involved HTML and CSS.

For example, I can insert all the code required for a responsive display of the following image&nbsp;.&nbsp;.&nbsp;.

{{< imgc src="Apple_new-macbookpro-wallpaper-screen_11102020_1984x1118.jpg" alt="Partially opened MacBook Pro laptop" width="1984" height="1118" >}}

Image: [Apple, Inc.](https://www.apple.com/newsroom/2020/11/introducing-the-next-generation-of-mac/)
{.imgcCaption}

.&nbsp;.&nbsp;. by inserting this shortcode in my Eleventy repo:

```md
{% lazypicture "Apple_new-macbookpro-wallpaper-screen_11102020_1984x1118.jpg", "Partially opened MacBook Pro laptop", 1984, 1118 %}
```

.&nbsp;.&nbsp;. and this shortcode[^commentsGo] in the Hugo repo:

```md
{{</* imgc src="Apple_new-macbookpro-wallpaper-screen_11102020_1984x1118.jpg" alt="Partially opened MacBook Pro laptop" width="1984" height="1118" */>}}
```

[^commentsGo]: If you happen upon [this site's repo](https://github.com/brycewray/hugo_site) out of curiosity and check out this post's Markdown file, you'll notice that this text's bounding `{{` and `}}` also have wrapping `/*` and `*/`, respectively. That's because, otherwise, Hugo sees it as *real* code, not just a representation of it, and acts accordingly---in this case, once again displaying the image. I found this otherwise undocumented workaround in a [2015 comment](https://discourse.gohugo.io/t/a-way-to-mark-plain-text-and-stop-hugo-from-interpreting/1325/2) on the [Hugo Discourse forum](https://discourse.gohugo.io). This is similar to how Eleventy requires the use of `{% raw %}` and `{% endraw %}` for proper display of code blocks which contain certain combinations of characters.

Here's what each shortcode does:

- Adds the necessary Cloudinary URL to the provided image file name.
- Adds the provided ALT tag.
- Sets the image's correct [aspect ratio](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping) based on the provided width and height.
- Using all the above, pumps out all the HTML and CSS to make it look the way it should in your browser. (To see the resulting code, use your browser's inspector tool on the image above.)

So you can assess the conversion required between the Eleventy and Hugo versions of the shortcode, I'll provide each for you to see.

### First, the JavaScript

Here's the JavaScript version, on which the Go version was based[^origCode]:

[^origCode]: This is a revised version because the *original* JS provides for an [LQIP-using preview](https://endler.dev/2017/image-previews/), the need for which ended when I [removed hero images](/posts/2021/01/leaner-cleaner/)).

```js
const respSizes = require(`../../../_data/siteparams.json`).respSizes
var cloudiBase = 'https://res.cloudinary.com/brycewray-com/image/upload/'
var xFmPart1 = 'f_auto,q_auto:eco,w_'
var xFmPart2 = ',x_0,z_1/' // note ending slash

module.exports = (url, alt, width, height) => {
  divClass = `relative`
  imgClass = `containedImage`
  nscClass = `containedImage`
  dataSzes = `(min-width: 1024px) 100vw, 50vw`

  var separator = ', '

  var stringtoRet = ``
  stringtoRet = `<div class="${divClass}">
  <img class="${imgClass}" data-src="${cloudiBase + xFmPart1 + "600" + xFmPart2 + url}" data-srcset="`
  respSizes.forEach(size => {
    if (size <= width) {
      stringtoRet += `${cloudiBase + xFmPart1 + size + xFmPart2 + url} ${size}w`
      stringtoRet += separator
    }
  })
  stringtoRet = stringtoRet.substring(0, stringtoRet.length - 2)
  stringtoRet += `" alt="${alt}" width="${width}" height="${height}" loading="lazy" sizes="${dataSzes}" />
  <noscript>
    <img class="${nscClass}" src="${cloudiBase + xFmPart1 + "300" + xFmPart2 + url}" alt="${alt}" />
  </noscript>
  </div>`

  return stringtoRet
}
```

### Then, the Go

Here's the corresponding Go version for Hugo:

```go-html-template
{{/* init vars */}}
{{- $respSizes := slice "300" "450" "600" "750" "900" "1050" "1200" "1350" "1500" -}}
{{- $src := .Get "src" -}}
{{- $alt := .Get "alt" -}}
{{- $width := .Get "width" -}}
{{- $height := .Get "height" -}}

{{/*
  separating the Cloudinary-related vars for
  greater flexibility, especially in case
  somebody else wants to borrow this code
  for his/her own Cloudinary setup and
  transformation ("xFm") choices
*/}}
{{- $cloudiBase := "https://res.cloudinary.com/brycewray-com/image/upload/" -}}
{{- $xFmPart1 := "f_auto,q_auto:eco,w_" -}}
{{- $xFmPart2 := ",x_0,z_1/" -}}

{{/* Some of these vars seem pointless, but am keeping in case I ever decide to use other kinds of images again. */}}
{{- $divClass := "relative" -}}
{{- $imgClass := "containedImage" -}}
{{- $nscClass := "containedImage" -}}
{{- $dataSzes := "(min-width: 1024px) 100vw, 50vw" -}}
{{- $stringtoRet := "" -}}{{/* init */}}
{{- $separator := ", " -}}
{{- $innerString := "" -}}{{/* init */}}

{{- $stringtoRet := printf "%s%s%s%s%s%s%s%s%s%s%s" "<div class='" $divClass "'><img class='" $imgClass "' src='" $cloudiBase $xFmPart1 "600" $xFmPart2 $src "' srcset='" -}}
{{- $.Scratch.Set "innerString" $stringtoRet -}}
{{- range $respSizes -}}
  {{- if ge $width . -}}
    {{- $innerString := printf "%s%s%s%s%s%s%s%s%s%s" $innerString $cloudiBase $xFmPart1 . $xFmPart2 $src " " . "w" $separator -}}
    {{- $.Scratch.Add "innerString" $innerString }}
  {{- end -}}
{{- end -}}
{{- $stringtoRet := .Scratch.Get "innerString" }}
{{- $stringtoRet := substr $stringtoRet 0 -2 -}}
{{- $stringtoRet := printf "%s%s%s%s%s%s%s%s%s%s" $stringtoRet "' alt='" $alt "' width='" $width "' height='" $height "' loading='lazy' sizes='" $dataSzes "' />" -}}
{{- $stringtoRet := printf "%s%s%s%s%s%s%s%s%s%s%s%s" $stringtoRet "<noscript><img class='" $nscClass "' src='" $cloudiBase $xFmPart1 "300" $xFmPart2 $src "' alt='" $alt "' /></noscript></div>" -}}

{{- $stringtoRet | safeHTML -}}
```

And, yes: further down, I **am** going to try to explain all that `.Scratch` stuff---although I must also point you to what pretty much is `.Scratch` canon, namely [Régis Philibert](https://regisphilibert.com)'s article about the subject, "[Hugo .Scratch explained](https://regisphilibert.com/blog/2017/04/hugo-scratch-explained-variable/)." How canonical is it? When you go to Hugo's own [documentation about `.Scratch`](https://gohugo.io/functions/scratch), it points you to that Philibert article so you can get "a detailed analysis"!

I'll also explain all those `%s` items and a few other seeming oddities.

## Same and different

Now that you've seen both, let's compare/contrast how they work.

- Each accesses four values for the image that I supply when using the shortcode in Markdown:
	- The image file name, either `url` (JS) or `$src` (Go).
	- The ALT content, either `alt` (JS) or `$alt` (Go).
	- The image's width in pixels, either `width` (JS) or `$width` (Go).
	- The image's height in pixels, either `height` (JS) or `$height` (Go).
- Each uses a variable, either `stringtoRet` (JS) or `$stringtoRet` (Go), into which it then collects the necessary HTML and CSS; and, at the end, **returns** that variable's contents to the web page.
- Each stores the desired image display sizes for the `srcset` in either an array called `respSizes` (JS) or a *[slice](https://gohugo.io/functions/slice)* called `$RespSizes` (Go).[^respSizes]
- After providing the opening HTML/CSS to the variable, each shortcode loops through the array or slice and fills in the necessary per-size segments. The looping in JS is done with `forEach` and in Go with `range`. Immediately after each loop ends, a `substring` or `substr` statement chops off the last two characters of the result, so there's not a hanging comma-and-space combination after the last item.
- At the end, each finishes filling the variable by adding the closing HTML/CSS, including `noscript` material for those browsers where JS has been disabled. The latter dates back to when the shortcodes were handling lazy-loading via JS added to each web page; while that's no longer true, I kept the `noscript` items just in case I decide to revert to that lazy-loading method for some reason.

[^respSizes]: The JS fills `respSizes` by pulling from a site parameters file in the Eleventy repo's site-wide `_data` directory. The Go fills `$RespSizes` from this code, but I could easily have brought in the values from the site-wide `config.yaml` configuration file. I wrote the JS version of this particular part as I did because, early on, I was frequently experimenting with different values and felt it easier to go this route. By the time I got to the Go version, I had settled on these values and felt no more need to separate their entry in this way.

## Passing Go

Now, as promised above, I'll take you through some of the Go-isms in this shortcode, since they probably look strange if you're new to Go---and perhaps even if you're not.

### The Dot

You'll notice a little dot (`.`) here and there in the Go shortcode, especially in the loop. If you're familiar with other programming languages, you might mistake that for a concatenation operator; but, in Go-based templating, the dot provides **context** regarding the item to which you're referring at any given time. For example, this part of the loop through the `$respSizes` slice&nbsp;.&nbsp;.&nbsp;.

```go-html-template
{{- if ge $width . -}}
```

.&nbsp;.&nbsp;.&nbsp;means: "if this number (the **context** at this point in the loop) that I'm currently pulling from `$respSizes` is *greater than or equal to* (`ge` in Go) the image's `$width` as supplied by the Markdown."

Once again, Régis Philibert is the Go-to guy, so to speak, when it comes to explaining Hugo's reliance on "The Dot" via his article, "[Hugo, the scope, the context and the dot](https://regisphilibert.com/blog/2018/02/hugo-the-scope-the-context-and-the-dot/)."

### `.Scratch`

Now, let's deal with `.Scratch`. I reiterate that there are others, particularly Philibert, who explain it far better than I'm about to do, **but** here's my quick-and-dirty attempt.

The name `.Scratch` comes from the concept of a "scratchpad" on which you can save notes while you're otherwise busy. `.Scratch` is something the Hugo devs cooked up years ago to get the templating process past the difficulties caused by an intentional characteristic of the Go language. You see, Go is a lot pickier than many other languages about the **scope** of a variable. One of those cases where that bites you in Hugo templating is when you're trying to get at a variable as modified within a slice (again, assume a slice is about the same as an array).

While the JS version happily adds to `stringtoRet` as it loops through `respSizes` and then keeps adding to it after the loop, the Go version can't do that to `$stringtoRet` while looping through `$respSizes`---**unless** we use `.Scratch` to create `$innerString`, so it can "hold" the result of that loop and then, after the loop is done, add it to `$stringtoRet`.

In the case of this shortcode, **not** using `.Scratch` in this fashion would result in an empty `srcset` and, thus, display only a small, fuzzy fallback image rather than the full responsive image `srcset`.

### `printf` and `%s`

As for the `printf` stuff and all those `%s` items: `printf` is the [recommended way](https://regisphilibert.com/blog/2017/04/hugo-cheat-sheet-go-template-translator/) to build a Hugo variable through concatenation. Each separate string or variable so concatenated requires its own iteration of the `%s` "verb," instructing that particular `printf` to handle the string or variable as a string. (Go has [lots of other such "verbs.”](https://go.dev/pkg/fmt/)) If you **don't** use the right number of `%s` "verbs" for each `printf`, the `$stringtoRet` result has `%!(EXTRA string`-kinda error messages in it, FUBARing the resulting HTML/CSS.

### Hyphens and curly brackets

Finally, those hyphens connected to many of the curly brackets (`{{-` and `-}}`) eliminate extraneous white space in the resulting HTML. To be sure, the `--minify` flag in my site's `hugo build` command gets rid of that space, too, but I just personally hate to see it when I'm in dev mode. However, if you're **not** as picky about the appearance of your resulting HTML source code in dev mode, plain ol’ `{{` and `}}` do the job just fine. (Where a set of curly brackets has only one hyphen rather than both, that's because I deemed it necessary to dump only *some* of the white space it involved.)

## Twisted, mister

During an [email exchange](/contact) with one of my readers not long after I [announced](/posts/2021/02/simplify-simplify/) the site's return to Hugo, he---a recent convert to Eleventy from other, more "opinionated" JS-based SSGs---remarked how much he was enjoying the relative ease of templating in Eleventy. Only minutes after finishing the Go shortcode we've covered herein, I replied:

> As for templating: I just spent three hours whipping a Hugo shortcode into order so, yes, I do miss the simplicity of [templating] in Eleventy. &nbsp;.&nbsp;.&nbsp;. Anyway, there is kind of a twisted logic in how Go works, and maybe I’m just twisted enough to get it eventually.

Although there's never been any mystery about whether I'm twisted, it remains to be seen how well I'll get Go-based templating in Hugo.

However, I do like how this shortcode came out.[^twitscrn] I'll never be an expert in Hugo templates by any means; but, at least, `imgc.html` works, it's as DRY as I feel it needs to be, and I was sufficiently pleased---or maybe I should say, I was **not** sufficiently **embarrassed**---that I wrote this post about it.

Perhaps I'll get lucky and, twisted or not, won't find myself regretting that "not sufficiently embarrassed" part.

[^twitscrn]: Based on what I'd learned in this process, I also fixed/DRY-ed a very similar shortcode, `twitscrn.html`, that I formerly used for bringing in Twitter tweets’ screen captures as per the site's [privacy policy](/privacy), prior to later reverting to bringing them only as static text.
