---
title: "Pagefind is quite a find for site search"
description: "It used to be that having search on a static site was a hassle — and perhaps an expensive one — but Pagefind has changed all that."
author: Bryce Wray
date: 2022-07-28T20:32:00-05:00
#initTextEditor: iA Writer
---

I noted in my [summary of the recent HugoConf 2022 event](/posts/2022/07/impressions-hugoconf-2022/) that the host, [CloudCannon](https://cloudcannon.com), had used the online gathering to announce [Pagefind](https://github.com/cloudcannon/pagefind). Developed principally by CloudCannon's [Liam Bigelow](https://github.com/bglw), Pagefind is a new free/open-source tool for quickly adding site-wide search to a website which, like this one, originates from a [static site generator](https://jamstack.org/generators) (SSG). Bigelow's video presentation gave HugoConf "attendees" an introduction to, and demo of, Pagefind:

{{< lite-youtube videoTitle="Introducing Pagefind: static low-bandwidth search at scale - Liam Bigelow // HugoConf 2022" videoId="74lsEXqRQys" >}}

While I don't know whether the [Algolia](https://algolia.com) folks are exactly shaking in their boots over Pagefind, perhaps they should be. Even though it's been available for only a few weeks, it's already **really** good. After my initial try-out with Pagefind v.0.4.1 during HugoConf, I pronounced it "code-light and staggeringly fast." Then, earlier this week, I was even more pleased to see that, with the release of v.[0.5.0](https://github.com/CloudCannon/pagefind/releases/tag/v0.5.0), Bigelow had added the one change I really wanted to see: the option to keep images out of the search. In 0.4.1, it was easy enough to **hide** them with CSS, but they still got downloaded. I was looking to avoid that for the sake of leaner browser-side performance and, now, in 0.5.0+, a simple setting lets me choose to do exactly that. With this last gotcha gone, I was pleased to put [Pagefind on this site](/search/) earlier today, even adding "Search" to the nav menu.[^styling]

[^styling]: The styling you'll see on the resulting search page is something I've supplied to keep its appearance consistent with that of the rest of the site, although Pagefind comes with its own styling CSS if you prefer to use it.

## Build before you crawl

One key to using Pagefind, whether in dev mode or on your host, is that it has to run **after** your site has been really built so there will be real HTML files for Pagefind to "crawl." This is an important distinction because, when a typical SSG spins up a site in development mode, it keeps everything in RAM and **not** as real HTML files on disk. For the latter, which Pagefind must have, you first must do an actual build to disk. Pagefind has its own dev server for use in such cases, so you can preview how it'll look before you push to your host (more on that in a bit).

As of now, Pagefind works only on macOS or Linux (the latter obviously covers just about any web hosting vendor, much less the [Jamstack](https://jamstack.org)-savvy vendors); there's not yet a Windows version. (**Update, 2022-08-04**: [Now](https://github.com/CloudCannon/pagefind/releases/tag/v0.6.0), there is a Windows version, too.)

You can run Pagefind either by using the following command[^fix], which automatically installs the latest release:

[^fix]: This command, including all its other occurrences herein, is slightly edited from in the original post due to [an issue](https://github.com/CloudCannon/pagefind/issues/73) that cropped up a few weeks later.

```bash
npm_config_yes=true npx pagefind --source "public" --serve
```

. . . or by downloading its binary and putting it in your system `PATH`.[^PFbinary] If you do the latter, your command would be simply:

[^PFbinary]:If I preferred to use the binary on my Mac, the script's last line would be just `pagefind --source "public" --serve`. The advantage of `npx pagefind` is that you always get the newest version. Its only real disadvantage *vs.* using the binary is that you *must* be online to use `npx pagefind` --- although, IMHO, there's not much point in doing web dev if one *isn't* online, so that last item may be of little concern.

```bash
pagefind --source "public" --serve
```

For my site, I've created a `buildpf.sh` shell script for use with [Hugo](https://gohugo.io) and Pagefind:

```bash
#!/bin/sh
rm -rf public
hugo --gc --minify
npm_config_yes=true npx pagefind --source "public" --serve
```

This way, all I have to do is enter `./buildpf.sh` in my chosen terminal app and, within a few seconds, Pagefind is showing me a local dev view of my site, *with* search working, at `http://localhost:1414`.

Once you've satisfied yourself that all is well in dev mode and you're ready to put Pagefind on your production site, you must alter your hosting process so that on the host, as noted before, Pagefind runs **after** your SSG builds the site to the appropriate directory for publication --- *e.g.*, `dist/` for [Astro](https://astro.build), `_site/` for [Eleventy](https://11ty.dev), or `public/` for Hugo.

Since I'm [using a GitHub Action](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/) (GHA) to put my site on [Cloudflare Pages](https://pages.cloudflare.com), all I had to do was add one additional step to that GHA, between the "Build site with Hugo" step and the "Publish to CFP" step:

```yaml
      - name: Run Pagefind
        run: npm_config_yes=true npx pagefind --source "public"
```

(Obviously, you wouldn't use Pagefind's `--serve` flag here!)

If you're not using a GHA or other, similar scripting approach, you still should find it easy to add Pagefind to your site-building process. In your chosen host's GUI, just use `&&` to tack a Pagefind command onto your site's usual build command. Here are some examples:

```bash
# With Astro
npm run build && npm_config_yes=true npx pagefind --source "dist"

# With Eleventy
npm run build && npm_config_yes=true npx pagefind --source "_site"

# With Hugo
hugo && npm_config_yes=true npx pagefind --source "public"
```
<br />

----

## Update, 2021-07-31

After reading this post, Hugo expert [Régis Philibert](https://github.com/regisphilibert) looked through the [Pagefind documentation](https://pagefind.app/docs/) and came up with a method, described below, that allows you to use Pagefind in *Hugo's* dev mode. This lets you retain the various advantages of the Hugo dev server, such as live updates as you edit material.

**Note**: Before proceeding, add `static/_pagefind` to your Hugo project's `.gitignore` file.
{.box}

1. Generate a build by entering `hugo` in your terminal app.
2. From the terminal, run:\
{{< highlight bash "linenos=false" >}}
npm_config_yes=true npx pagefind --source "public" --bundle-dir ../static/_pagefind
{{< /highlight >}}
The [`--bundle-dir` flag](https://pagefind.app/docs/config-options/#bundle-directory) will tell Pagefind to store its "crawl" results in, and source them from, a `static/_pagefind` directory rather than the default.
3. Run `hugo server` and, lo and behold, you're running the Hugo dev server *and* you have Pagefind search working, just as in production.

Of course, you should leave the *production* instructions as previously noted; this is for dev purposes only.

Here's a shell script version, `startpf.sh`:

```bash
#!/bin/sh
hugo
npm_config_yes=true npx pagefind --source "public" --bundle-dir ../static/_pagefind
hugo server
```

<br />

Thanks to Philibert for coming up for this --- and [Rodrigo Alcaraz de la Osa](https://github.com/rodrigoalcarazdelaosa) for suggesting that I add it to this post!

*Now, back to our regularly scheduled post, still in progress . . .*

----

## Fast, fast finds

In my tests a few weeks ago, I ran Pagefind only locally, so this was my first experience with deploying it for real out on Cloudflare Pages. In my own use thus far, Pagefind works *very* quickly out on the host:

```bash
Indexed 269 pages
Indexed 15851 words
Indexed 0 filters
Created 19 index chunks
Finished in 1.360 seconds
```

As for how quickly it works once the index is there: well, you already saw Bigelow's video, above, but give [my search page](/search/) a try and see for yourself.

I'd recently been [using DuckDuckGo for site search](/posts/2022/07/wildness-with-wildcards-why-duckduckgo-wouldnt-go/), but Pagefind is *so* much nicer; and, since it's just a babe in the woods, it'll only get better. I strongly suggest you give Pagefind a try, especially if your site is as big as, or larger than, mine. Make it easy on yourself *and* your visitors, who don't want to dig through paginated post lists or deal with external search engines when they want to find something on your site. With Pagefind in the SSG user's toolbox, the power of real site search is now easily available --- and you surely can't beat the price.
