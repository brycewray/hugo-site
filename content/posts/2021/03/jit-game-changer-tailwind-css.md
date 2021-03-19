---
layout: layouts/posts/singlepost.11ty.js
title: "JIT is a game-changer for Tailwind CSS"
subtitle: "Still experimental, but already impressive"
description: "Why Tailwind’s new capabilities will give it even more  momentum among web developers."
author: Bryce Wray
date: 2021-03-19T16:25:00-05:00
#lastmod:
#draft: false
discussionId: "2021-03-jit-game-changer-tailwind-css"
featured_image: "screen-cap-TWCSS-2702x1582.png"
featured_image_width: 2702
featured_image_height: 1582
featured_image_alt: "Screen capture of HTML with Tailwind CSS styles"
#featured_image_caption:
---

Where the category of Major Events That I Did Not Expect to Occur This Week is concerned, you definitely can assign to it the [announcement](https://blog.tailwindcss.com/just-in-time-the-next-generation-of-tailwind-css) of a **just-in-time (JIT) compiler** for [Tailwind CSS](https://tailwindcss.com).

Even though it'll be months before it's out of beta-testing---for now, it's described as an "experimental library" and is expected to become an integral part of Tailwind only when the framework reaches version 3.0 sometime later in the year---**[@tailwindcss/jit](https://github.com/tailwindlabs/tailwindcss-jit)** is already a game-changer for web development.

First, what *is* a JIT compiler? Let's get even more basic: what is a *compiler*, for that matter?

Well, a compiler takes computer code and converts it into a form that is more suited for its target platform; but that usually means the conversion is done ahead of time, which usually results in some delay.

By comparison, a just-in-time compiler works *simultaneously* with the running of the platform, often producing results "automagically," as tech marketing types currently seem fond of saying.

## Worth the (additional) hype?

So why does the introduction of a JIT compiler for the already constantly hyped Tailwind CSS constitute a game-changer?

First, let's understand Tailwind, at least as we've known it before this week.

Tailwind CSS "ships" as a massive supply of pre-written CSS classes that, collectively, [arrives in uncompressed form at just under four *megabytes*](https://tailwindcss.com/docs/optimizing-for-production). You get the whole enchilada, even though you probably won't use more than a tiny fraction of all those classes.

Until this week, Tailwind users typically have dealt with this by using the [PurgeCSS](https://purgecss.com/) tool. In fact, starting with Tailwind v. 2.x, PurgeCSS is included with the Tailwind package. PurgeCSS "watches" your files and deletes from your final CSS all the classes (Tailwind's and your own) that they don't use.

While this process usually works very well, there is always the chance it'll have a glitch and eliminate a class you *didn't* want eliminated, perhaps because it simply didn't "see" where you used that class. Also: because it can slow things down, PurgeCSS tends to be used only in production. As a result, what you see in development may not necessarily be what finally gets to your real website. Sure, you can choose not to use PurgeCSS, but then you're back to dealing with the original, elephantine load from Tailwind.

Now, with the JIT compiler, it's *Tailwind* that watches your files---but, rather than starting out with the entire load and then **killing** whatever it thinks you're **not** using, it instead **gives** you **only** the Tailwind CSS classes that your website files actually **do** use. Amazingly, it all happens nearly instantaneously while you code. The first time an experienced Tailwind user tries the JIT compiler in development mode, he/she will be amazed by the much smaller size of the resulting CSS (and how snappily everything works). It's absolutely down to a ship-worthy level. Indeed, there's no longer any need to use PurgeCSS.

But the story gets better.

## Fixing the fixed stuff

Let's discuss an aggravation that's actually **designed into** Tailwind, and then I'll explain how the code in this JIT compiler library resolves it, too.

Apart from the file-size issue, a major reason why many don't like Tailwind is because they have to create "pixel-perfect" websites---*i.e.*, providing *exact matches* for what designers have specified---and, thus, can't stick to the fixed settings that are a purposeful part of Tailwind.[^whyUnits]

Let's say your design team requires your site's navigation bar to be exactly 63.7 pixels high with a background color of `#a7b492` (or `rgb(167, 180, 146)` or `hsl(83, 18%, 64%)`, depending on how one likes to code one's colors). Up to now, there's been no way in Tailwind to provide such exactitude. Of course, you then can just add your own **additional** CSS for that purpose; but that further bloats the CSS you're delivering. If a particular project needs a *ton* of these workarounds to achieve what you're trying to deliver, it might well seem pointless to use Tailwind in the first place.[^myUnits]

[^whyUnits]: The idea behind Tailwind's fixed units is to enable developers, especially those who lack adequate layout/design skills, to work within a set of professionally curated sizes, breakpoints, colors, and so on.

[^myUnits]: Indeed, I noted that very thing in my recent "[Next steps?](/posts/2021/03/next-steps)" article about why I chose not to use Tailwind for a project I'm doing for the Day Job: ".&nbsp;.&nbsp;.&nbsp;Tailwind's fixed units aren't quite precise enough for some of what I'm trying to do."

But now, another goodie in the Tailwind JIT code---the allowance of **arbitrary style creation**---gives you far more flexibility. Now you can satisfy your design team's requirements with CSS like `h-[63.7px]` and `bg-[#a7b492]` to build that nav bar as spec'd. It was *this* addition, even more than the JIT functionality, that made me sit up and take notice about what the Tailwind team announced; and I saw similar comments from other web devs who've been wanting something like this in Tailwind.[^arbs]

[^arbs]: Note that, as the Tailwind team continues to refine this experimental library, not necessarily *all* classes can yet accept arbitrary values; it's a work in progress, as [today's release of v.0.1.4](https://github.com/tailwindlabs/tailwindcss-jit/releases/tag/v0.1.4) shows.

## Check it out

Whether you use Tailwind already, have rejected it out of hand, or have simply been curious, I strongly urge you to consult that [announcement](https://blog.tailwindcss.com/just-in-time-the-next-generation-of-tailwind-css), and the video to which it links, for more details.

As noted before, these new capabilities are in beta and are called "experimental." As of this writing, the Tailwind JIT compiler is only at version 0.1.4. It doesn't yet work well with a number of platforms, notably the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) and [Next.js](https://nextjs.org) JavaScript framework. However, the Tailwind team is working to fix such problems (and, in the case of Hugo, [*its* dev team is, too](https://github.com/gohugoio/hugo/pull/8345)). Although these functionalities aren't ready for production just yet, they're extremely impressive and deserve close watching.

The bottom line: once they become stable parts of the Tailwind CSS framework, the improvements announced this week should solve many perceived shortcomings, making Tailwind even harder to ignore for web devs who want to stay current with where the industry is headed.