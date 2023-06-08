---
title: "Breaking changes for Embedded Dart Sass may affect Hugo users"
description: "Assessing the impact of a surprise announcement by the Sass team."
author: Bryce Wray
date: 2023-05-23T08:09:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

An innocent-looking headline appeared in my [feed reader](https://netnewswire.com/) last night, but I soon saw that the [blog post](https://sass-lang.com/blog/rfc-embedded-protocol-2) to which the headline pointed meant some possibly significant changes for [Hugo](https://gohugo.io) users.

<!--more-->

The blog post's title --- "Request for Comments: New Embedded Protocol" --- certainly didn't raise any red flags, nor did its somewhat cheery opening paragraph:

> If you're not an author of a host package for the Embedded Sass Protocol, you can skip this blog post---although if you're a big enough nerd, you may find it interesting regardless!

Well, I definitely am a "big enough nerd," so I went ahead and read the post. And, boy, howdy, did I *ever* find it interesting, at least once I was able to grasp what it was announcing. It took me at least a couple of reads (and a few clicks of various Sass repository links) to get the picture, but here's my very Hugo-centric summary of this surprising change.

- The methods by which Hugo users can install the Embedded Dart Sass binary (more on those methods shortly) will soon become invalid, because that item will cease to exist as a *separate* binary. Instead, it'll be packaged within the [Dart Sass binary](https://github.com/sass/dart-sass).
- As a result, the [Embedded Dart Sass repository](https://github.com/sass/dart-sass-embedded) is now archived. The final binary --- at v.1.62.1, as currently is true for Dart Sass (and the [Node.js version](https://github.com/sass/sass)) --- still works but presumably will receive no further updates.
- It's unclear at this writing what this will mean for the [Cloudflare Pages platform](https://pages.cloudflare.com)'s [recently announced improvements for Hugo users](/posts/2023/05/cloudflare-pages-more-attractive-home-hugo-sites/). The CFP team is aware of the Sass blog post.
- I have made appropriate updates to all my own posts regarding how Hugo users can install Embedded Dart Sass:
	- "[Using Dart Sass with Hugo: the sequel](/posts/2022/03/using-dart-sass-hugo-sequel/)."
	- "[Using Dart Sass with Hugo: the GitHub Actions edition](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/)."
	- "[Using Dart Sass with Hugo: the nitty-gritty](/posts/2022/05/using-dart-sass-hugo-nitty-gritty/)."
	- "[Using Dart Sass with Hugo: the GitLab edition](/posts/2022/08/using-dart-sass-hugo-gitlab-edition/)."

I'll provide further updates on these subjects as events warrant.

<strong class="red">Important note, 2023-06-08</strong>: For now, until Hugo is able to work with the new packaging, you should **keep using the current/archived Embedded Dart Sass binary** ([v.1.62.1](https://github.com/sass/dart-sass-embedded/releases/tag/1.62.1)). The **new** packaging **doesn't** work fully with Hugo --- *e.g.*, it doesn't "watch" files properly for when you make edits to your `.scss` files.
{.box}
