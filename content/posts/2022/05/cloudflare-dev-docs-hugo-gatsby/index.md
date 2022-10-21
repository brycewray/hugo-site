---
title: "Cloudflare dev docs and the switch from Gatsby back to Hugo"
description: "A few choice paragraphs from a blog post I saw today."
author: Bryce Wray
date: 2022-05-27T09:25:00-05:00
#initTextEditor: iA Writer
---

Today's [Cloudflare Blog](https://blog.cloudflare.com) post, "[We rebuilt Cloudflare's developer documentation --- here's what we learned](https://blog.cloudflare.com/new-dev-docs/)," is a good read.

We already knew [from three months ago](https://github.com/cloudflare/cloudflare-docs/pull/3609) that Cloudflare was transitioning its dev docs platform from [Gatsby](https://gatsbyjs.com) to [Hugo](https://gohugo.io), two years after [doing the exact opposite](https://blog.cloudflare.com/migrating-to-react-land-gatsby/). But the reasons *why* Cloudflare now explains that it returned to Hugo are particularly interesting:

> . . . we struggled with our choice of underlying static site generator, Gatsby. We still think Gatsby is a great tool of choice for certain websites and applications, but we quickly found it to be the wrong match for our content-heavy documentation experience. Gatsby inherits many dependency chains to provide its [feature set], but **running the dependency-heavy toolchain locally on contributors’ machines proved to be an incredibly difficult and slow task for many of our documentation contributors**.
>
> When we did get to the point of deploying new docs changes, we began to be at the mercy of **Gatsby’s long build times** --- in the worst case, **almost an entire hour** --- just to compile Markdown and images into HTML. This negatively impacted our team’s ability to work quickly and efficiently as they improved our documentation. Ultimately, we were unable to find solutions to many of these issues, as they were **core assumptions and characteristics of the underlying tools that we had chosen to build on** --- it was time for something new.
>
> Built using Go, Hugo is incredibly fast at building large sites, has an active community, and is easily installable on a variety of operating systems. In our early discovery work, we found that **Hugo would build our docs content in mere seconds**. Since performance was a core motive for pursuing a rewrite, this was a significant factor in our decision.

*[Emphasis added in multiple cases.]*
