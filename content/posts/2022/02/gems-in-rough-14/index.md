---
title: "Gems in the rough #14"
description: "Full-time Eleventy, variables in Hugo, learning from a nice tweet, using web fonts with internal CSS."
author: Bryce Wray
date: 2022-02-18T12:36:00-06:00
#initTextEditor: Ulysses
---

Each entry in the “Gems in the rough” series is a collection of tips, explanations, and/or idle observations which I hope will be at least somewhat useful to those of you with websites built by [static site generators](https://jamstack.org/generators) (SSGs).
{.box}

## Eleventy goes full-time

The popular [Eleventy](https://11ty.dev/) SSG is no longer “only” a side gig for [Zach Leatherman](https://zachleat.com/), and the web will be a better place for that.

A [blog post](https://www.netlify.com/blog/growing-our-open-source-contributions) and an [Eleventy tweet](https://twitter.com/eleven_ty/status/1493284209925967872) jointly announced on February 14 that [Netlify](https://netlify.com/) is now sponsoring full-time development of the Eleventy project, which Leatherman [created in 2018](https://www.zachleat.com/web/introducing-eleventy/) and has maintained ever since. He [joined Netlify in 2020](https://www.zachleat.com/web/netlify/), and keeping Eleventy excellent will now be his full-time role there. According to the blog post by [Claire Knight](https://twitter.com/krider2010), the company’s Senior Software Engineering Manager:

> .&nbsp;.&nbsp;. we recognize the importance of open source for enabling web developers and advancing what’s possible on the web, and we are working to address this. That’s why I joined in January to help build out an engineering group focused on ecosystem integrations and open source upstream contributions. We have an amazing team of folks, including Matt Kane and Tiffany Le-Nguyen, who have been building integrations and contributing to frameworks like Next.js, Nuxt, Gatsby[,] and Svelte. And now we’re excited to have Zach Leatherman move into engineering to work full-time on [Eleventy.]  🚀 This is just the start of a group that will be focused on contributing upstream and to help and support such projects.

In a corresponding [Eleventy Blog](https://www.11ty.dev/blog/) [post](https://www.11ty.dev/blog/eleventy-oss/), Leatherman said:

> .&nbsp;.&nbsp;. I don’t know if you all can tell, but I am so excited. If Eleventy was walking before now[,] we’re going to find out what it really feels like to run.

## Handling variables in Hugo

While working on my [recent](/posts/2022/02/static-tweets-eleventy-hugo/) [posts](/posts/static-tweets-eleventy-hugo-part-2/) concerning how to embed fully static tweets in Eleventy and [Hugo](https://gohugo.io/) (about which a little more in the next item), I learned something worth passing along. It likely isn’t news to *you*, but *I’d* overlooked it up to that point.

I used to think it was necessary to use [`Scratch`](https://gohugo.io/functions/scratch) to get variables’ values out of a loop, due to a [known scoping issue](https://www.regisphilibert.com/blog/2017/04/hugo-scratch-explained-variable/) within the [Go](https://go.dev) language on which Hugo is based.[^1] <span class="text-nowrap">Well-l-l-l,</span> not so. The trick is to initialize such variables with the Go `:=` operator and then assign values to them afterward with the `=` operator. Or, to put it another way: once you’ve initialized the variables with `:=`, you can pretty much handle them, from there on, the same way you would in any other SSG.[^2]

For example, the following won’t work:

```go-html-template
{{ $myArray := slice "2" "4" "6" "8" "10" }}

{{ range $myArray }}
	{{ $x := . }}
{{ end }}

<p>The value of x is {{ $x }}.</p>
<!--
There will be a blank after "is"
rather than the desired "10"; so
it will say:
	The value of x is .
-->
```

But this will:

```go-html-template
{{ $myArray := slice "2" "4" "6" "8" "10" }}
{{ $x := "" }}

{{ range $myArray }}
	{{ $x = . }}
{{ end }}

<p>The value of x is {{ $x }}.</p>
<!--
This will say, as we want:
	The value of x is 10.
-->
```

This ability to [overwrite template variables](https://github.com/golang/go/issues/10608) wasn’t always possible in either Go or Hugo, so you can find really old web pages, discussions, and tutorials which could steer you wrong on this subject. However, as long as you’re using any version of Hugo since the [release of Hugo 0.48](https://gohugo.io/news/0.48-relnotes/), you’re good to go with the above.

I am perturbed to have remained ignorant of this up to now, since Hugo 0.48 appeared in *August, 2018* — precisely around the time that I first started using Hugo! Ah, well. As I told you [three years ago](/posts/2019/02/old-dog-old-trick/#share-the-shame-but-share-the-help-too):

> First, don’t be ashamed to admit you don’t know something. Maybe you should be ashamed that you didn’t know enough even to have curiosity about the item of which you were ignorant, but “water under the bridge” and all that rot.
>
> Second, when you belatedly discover the thing you surprisingly had missed, let others know it, too. Life happens and people miss things. They’ll appreciate knowing — finally knowing.

## Learning from a friendly hat-tip

### Deprecation notice, 2022-11-06

Due to changes in the status and/or availability of one or more Twitter APIs, perhaps due to the many corporate changes at Twitter itself following its purchase by Elon Musk, I have deprecated several posts, or sections thereof, concerning the fully static embedding of tweets within one's website. **However**, if you still wish to see the final pre-deprecation form of this post, it remains accessible [in the site's GitHub repo](https://github.com/brycewray/hugo-site/blob/main/.deprecated/content/posts/2022/02/gems-in-rough-14.md/).

## Making web fonts work with internal CSS

In the [most recent installment](/posts/2022/01/gems-in-rough-13/) of this “Gems in the rough” series, I [noted](/posts/2022/01/gems-in-rough-13/#why-i-returned-to-internalcss) that I’d taken to using internal CSS (*i. e.*, CSS contained within a `style` element in the `head` of each page on the site) to get around the overly aggressive caching inherent in Safari, which many of my visitors use, as well as on Cloudflare Pages.

However, since the initial posting of that piece:

- I fell back to external CSS, to avoid invoking “[CLS](https://web.dev/cls/) hell” by loading web fonts on each page.
- Then, I decided the best way around the whole mess was to use internal CSS after all, but *without* web fonts.

Only thing was, I figured that was a cop-out, and a lazy one at that.

So I finally (?) came up with this fix: load the styling for only the web fonts via *external* CSS (*i. e.*, CSS living in one or more separate, linked `.css` files) while still handling all other styling as *internal* CSS. That works because (a.) the web fonts’ CSS very rarely changes while (b.) I’m frequently dorking around with the internal CSS and, thus, need to inject it in such a way as to defeat too-aggressive caching.

One added wrinkle is that the single-file [Inter](https://rsms.me/inter/) variable font --- which the site is using as of the initial publication of this post --- can induce some funkiness with oblique characters, especially in Safari and Firefox, if you don’t handle its CSS properly.[^4] As a result, I provide the following in each page’s `head`, in this order:

- External CSS file #1, which calls the Inter font file and assigns its subsets.
- The internal CSS within a `style` element.
- External CSS file #2, which fixes Inter’s obliques in Safari/Firefox. And, yes, this has to run last. Trust me.

It’s a little messy in the code, especially in making sure neither the external CSS nor the internal CSS will run afoul of my site’s [Content Security Policy](https://content-security-policy.com/); but the final result works well, I think.

[^1]:	You may recall my tortured use of `Scratch` in last year’s “[Go big or go home?](/posts/2021/02/go-big-go-home/)”

[^2]:	See also [this discussion](https://stackoverflow.com/questions/17891226/difference-between-and-operators-in-go) on [Stack Overflow](https://stackoverflow.com/) and the “Scratch” section in [this article](https://www.stackbit.com/blog/advanced-hugo-templates/) on the [Stackbit blog](https://www.stackbit.com/blog/).

[^3]:	I had no luck regardless of whether I used my bespoke Hugo shortcodes or the Eleventy shortcode, the latter of which uses a completely different API and a [smarter dev](https://twitter.com/KyleMitBTV)’s code.

[^4]:	Things go a lot more simply with variable fonts that have separate regular and italic/oblique versions, as is true for my second favorite variable web font, [Public Sans](https://public-sans.digital.gov/).
