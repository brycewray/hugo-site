---
title: "Tips for using giscus"
description: "Some advice about a commenting system for static websites."
author: Bryce Wray
date: 2022-05-10T15:10:00-05:00
lastmod: 2022-05-12T11:37:00-05:00
#initTextEditor: VS Code
discussionId: "2022-05-tips-using-giscus"
---

As I noted [not long ago](/posts/2022/03/gems-in-rough-16/#trying-giscus):

> . . . I’m trying a commenting system called [giscus](https://giscus.app). It’s based on [Utterances](https://utteranc.es). Both rely on GitHub APIs. While Utterances uses the Search API for GitHub Issues, giscus uses the Search API for the newer, more feature-rich, and seemingly more polished [GitHub Discussions](https://docs.github.com/en/discussions).

That experiment continues as of this writing, and I'm here today to pass along some tips to any folks who may be thinking about putting giscus on their sites.

## Discussions-wrangling

You may already have seen my giscus-related comments in "[Gems in the rough #17](/posts/2022/04/gems-in-rough-17/#getting-giscus-going-again)," but they factor in here, too, so please excuse whatever repetition which follows.

When setting up giscus (see "Configuration" on the [giscus website](https://giscus.app)), you specify which repo it should check for appropriate GitHub Discussions. However, rather than the usual choice of the repo where your website files live, pick instead a *totally separate*, comments-only repo (if it doesn't already exist on GitHub, create it). This gives you the ability to point the **website** at a different repo without having to move your Discussions, too --- which, trust me, can be a hassle.

**However** . . .

If you **do** have to move your giscus-savvy Discussions to another repo, you **must** do it this way for **each** Discussion in the old repo:
- Change its *category* from the giscus-recommended "Announcements" to "General" (or, at least, anything **other** than "Announcements").
- Click **Transfer discussion** and choose the new comments-only repo as the Discussion's destination.
- Over in the comments-only repo's Discussions section, revert the transferred Discussion's category to "Announcements."

Also: when you set the `data-mapping` parameter, I **strongly** suggest choosing `pathname`. This will tell giscus to match a page with a GitHub Discussion titled the same as the page's internal pathname.[^pn] You then end up with awkward-looking Discussion titles but it's better than selecting `title`, since [giscus can be confused by pages with similar `title` settings](https://github.com/giscus/giscus/issues/508). That confusion is due to how the GitHub Discussions Search API works, rather than being a failure of giscus's code.

**Update, 2022-07-24**: That problem was [solved on 2022-07-23](https://github.com/giscus/giscus/issues/508#issuecomment-1193106139) with a [fix that uses *hashing*](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#data-strict) to work around this problem.

[^pn]: For example, `posts/2022/05/tips-using-giscus/` is both this page's pathname and the title of its related GitHub Discussion --- or, at least, the latter *will* be true when/if this page receives at least one giscus comment or reaction.

## It's remote scripting all the way down

If you spend some time with the giscus documentation, you'll see mention of a [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) version thereof. You then might wonder, as I did, whether this means you somehow could avoid having the giscus script go all the way out to `giscus.app` and pull down quite a bit of JavaScript code (it's a [Next.js](https://nextjs.org) app) on every page with a giscus instance.

Sadly, the answer is: "No."

**All** the optional giscus components (including those for various web frameworks and libraries, such as React or Svelte) are, in the end, just wrappers for the same JavaScript that any website can add without that extra overhead. So, in the end, go with the easiest installation available: simply add the recommended script to a web page, layout, partial layout, *etc.*, and access it as documented.

**Note**: If you have a strict [Content Security Policy](https://content-security-policy.com), you'll have to edit it to mention [https://giscus.app](https://giscus.app) within the `frame-src`, `style-src`, `font-src`, and `script-src` sections. In `style-src`, you must also add `'unsafe-inline'` (and, yeah, I hate that, too; if I stop using giscus, that'll likely be one of the key reasons why).
{.yellowBox}

## Get lazy

Be sure giscus is set to *lazy-load*, through a `data-loading="lazy"` line in your site's giscus script. That way, it won't bring in the vast majority of its code, styling, and image assets *until* the visitor has scrolled down to near where the giscus instance appears on the page --- which, more often than not, probably will be near the bottom. This can give your visitors a smoother experience.

**Note**: Unfortunately, giscus's lazy-loading doesn't seem to work in either Firefox or Safari.
{.yellowBox}

## Styling hocus-pocus

I suggest that, for `data-theme`, you select `preferred_color_scheme`. That way, each giscus appearance on your pages will respect each visitor's choice for light or dark mode. (Of course, this makes a lot more sense if [your site itself **already** respects that](/posts/2019/09/thinking-dark-thoughts/)!)

That may be all the styling you want to do. However, giscus by default uses the [sans-serif system fonts stack](/posts/2018/10/web-typography-part-2/#goin-back-to-the-classics-----sort-of); so, if your site uses a web font and you prefer to have the giscus instance follow the typography of the rest of your page, you'll need to get a little tricky:

1. Go to [https://github.com/giscus/giscus/tree/main/styles/themes](https://github.com/giscus/giscus/tree/main/styles/themes) and find the CSS file that matches your chosen `data-theme` setting. In my case, that's the [`preferred_color_scheme.css` file](https://github.com/giscus/giscus/blob/main/styles/themes/preferred_color_scheme.css).
2. Copy the contents of that file into a new CSS file on your site repo; then, put the file in a `css/` folder and set your SSG to treat it as a *static assets folder*, so that the CSS file will be built on the website as `[domain]/css/[filename].css`. Here's how you do that in my three favorite SSGs:
   - [**Astro**](https://astro.build) --- Put the `css/` folder in the top-level `public/` folder, so that the CSS file is in `public/css/`.
   - [**Eleventy**](https://11ty.dev) --- Set the `css/` folder to use Eleventy's [*Passthrough File Copy* feature](https://www.11ty.dev/docs/copy/).
   - [**Hugo**](https://gohugo.io) --- Put the `css/` folder in the top-level `static/` folder, so that the CSS file is in `static/css/`.
3. At the **top** of the CSS file, insert the same CSS you normally use to add the web font to your site.[^noGF] **Be sure** that, for the `src` part, you specify an **absolute** URL (complete with `https://`), **not** a *relative* reference (*e.g.*, `/assets/fonts/my-font.woff2`), for a web font file that's already in your site. That's necessary because it's the giscus website, **not** your site, that'll be accessing the font.
4. At the **bottom** of the CSS file, add `html { }` and put within it the necessary `font-family` rule to include your chosen web font as well as the usual fallbacks.

[^noGF]: I hope you won't be using any fonts served from Google Fonts, for reasons I explained [in 2020](/posts/2020/08/google-fonts-privacy/). If you still want to use one or more fonts from there, please learn [how to download it](/posts/2020/08/good-stuff-without-google/) for serving from *your* site, instead.

The next time you build the site, everything should look as you want, because your special CSS file will be visible for the giscus site to "see" and your comments code change will be live. This'll give you the full advantages of the chosen giscus CSS **plus** your desired web font.

What if you want to add more fonts, and/or control which fonts show up where within giscus? Well, if you're more daring than I, you can also try editing some of the giscus-supplied CSS. For my purposes, it was enough to add my one chosen web font (a [variable font](/posts/2020/08/good-stuff-without-google/#variable-fonts-why-and-why-not), so it does the work of multiple font files) to the giscus `preferred_color_scheme` CSS.

By the way, the giscus app apparently practices some extremely picky caching of remote CSS; so, if you make any changes to your special giscus-only CSS file, giscus may not respect the changes for quite some time. To avoid that aggravation, just "bust the cache" by changing the CSS file's name (**including** its corresponding `data-theme` entry).

## Be realistic

Perhaps giscus's most significant flaw is one that besets many other FOSS apps: its ongoing development and maintenance are a non-paying, time-consuming hobby for a developer who happens to have a real Day Job. If you temper your expectations accordingly, you might just find this web app is up to the task of providing a satisfactory commenting solution for your site.
