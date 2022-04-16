---
#layout: singlepost
title: "Let all your devices see your site"
description: "How to make “localhost” slightly less local."
author: Bryce Wray
date: 2022-04-02T11:00:00-05:00
lastmod: 2022-04-16T08:55:00-05:00
#initTextEditor: iA Writer
#devTo: https://dev.to/brycewray/let-all-your-devices-see-your-site-27fd
#HackerNews: https://news.ycombinator.com/item?id=30889663#30890211
discussionId: "2022-04-let-all-your-devices-see-your-site"
featured_image: "web-dev-concept_fotis-fotopoulos-DuHKoV44prg-unsplash_2400x1600.jpg"
featured_image_width: 2400
featured_image_height: 1600
featured_image_alt: "Web development concept - blurry photo of darkened keyboard and two monitors showing computer code"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@ffstop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Fotis Fotopoulos</a>; <a href="https://unsplash.com/s/photos/web-development?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </span>
---

**Note**: This post also appears on [dev.to](https://dev.to/brycewray/let-all-your-devices-see-your-site-27fd) and was the subject of a [Hacker News thread](https://news.ycombinator.com/item?id=30889663).
{.yellowBox}

Today's subject may seem a niche-ish use case, but I have reason to believe otherwise.

Let's say you're developing your website. Since you want to make sure it looks okay on other operating systems, too, you may be using either a virtual machine (like [Parallels Desktop](https://www.parallels.com/), the appropriate [VMWare](https://www.vmware.com/products/desktop-hypervisor.html) product, or [VirtualBox](https://www.virtualbox.org/)) or an actual second computer running one or more different OSs. Or, for that matter, you're equally concerned with how the site looks on a phone or tablet, and you're not willing to depend on your browser's emulation mode for determining that---and, by the way, you're wise to think that way.

In short, **you want to test your site locally on more than just your dev machine, while in dev mode**.

In such cases, you need to make it possible for those other devices to "see" the website's local dev server running on the dev machine's `localhost` instance. What to do?

## Find that address

The answer is to point your other devices to the dev machine's **IP address** on your LAN. That will enable those devices to access your machine's `localhost` instance through a URL in the following format:

```bash
http://[IP address]:[port number]
```

For example: if your dev machine's IP address is *192.168.254.10* and your chosen dev method uses port 3000, your devices can access the project via `http://192.168.254.10:3000`. As for the port, I'll get into that below for each [static site generator](https://jamstack.org/generators) (SSG) or other project type we'll be discussing.

Now, let's walk through how you discover that address.

### macOS

On a Mac, go into your chosen terminal app and enter:

```bash
ifconfig | grep broadcast
```

.&nbsp;.&nbsp;. and you'll see one or more lines like this:

```bash
inet 192.168.254.10 netmask 0xffffff00 broadcast 192.168.254.255
```

The [address you want](https://tips.tutorialhorizon.com/2016/11/08/get-the-local-ip-address-of-your-mac-via-terminal/) is the one **immediately after** `inet`. (If you get multiple `inet` lines, you can use any address **immediately following** `inet` in a line.)

### Windows

In Windows, open the Command Prompt and enter this into the resulting screen:

```bash
ipconfig
```

In [the resulting display](https://www.businessinsider.com/how-to-find-ip-address-on-windows), you'll get the desired address from a line that begins with `IPv4 Address`, like this:

```bash
IPv4 Address. . . . . . . . . . . : 192.168.1.49
```

### Linux

On Linux, you have [multiple choices](https://phoenixnap.com/kb/how-to-find-ip-address-linux) (wouldn't you know?), but the easiest is to enter this in your terminal app:

```bash
hostname -I
```

.&nbsp;.&nbsp;. which reports the IP address.

## Tell ’em where to go

Now you have to set your project's dev server to use that IP address, rather than just `localhost`. Even if a platform already uses the IP address (likely displaying it for your convenience) when you run it in dev mode, you may want to change the port for some reason, so we'll discuss that, too.

### Eleventy

If you're using a **pre-version-2.x** installation of the [Eleventy](https://11ty.dev) SSG, its [Browsersync dependency](https://www.11ty.dev/docs/watch-serve/) will, by default, display the correct IP address when you run Eleventy in dev mode. In Eleventy **2.x and above**, its built-in dev server doesn't do that by default **but** you can [edit its settings](https://www.11ty.dev/docs/watch-serve/#eleventy-dev-server) in the `.eleventy.js` config file so that it will, by adding a line saying `showAllHosts: true` (the `showAllHosts` default setting is `false`).

By default, Eleventy's dev server uses port 8080. If you prefer to use a different port, ***either*** set it in `.eleventy.js` (in Browsersync with pre-2.x or the built-in server with 2.x+) ***or***, when running the `eleventy` command, use the `--port` flag as shown here, wherein you're specifying port 3000:

```bash
npx @11ty/eleventy --serve --port=3000
```

(The `--serve` flag keeps Eleventy watching for changes while you work on your project.)

### Hugo

With the [Hugo](https://gohugo.io) SSG, you'll want to [add the `--bind` and `--baseURL` flags](https://gohugo.io/commands/hugo_server/#options) to the usual `hugo server` command. Using our example IP address (and Hugo's default dev port, 1313) you'd do it this way:

```bash
hugo server --bind=0.0.0.0 --baseURL=http://192.168.254.10:1313
```

To change the port number from the default, you must [add a `-p` or `--port` flag](https://gohugo.io/commands/hugo_server/#options) **and** change the `--baseURL` flag accordingly. So, to use port 3000 rather than port 1313, you'd enter:

```bash
hugo server --port 3000 --bind=0.0.0.0 --baseURL=http://192.168.254.10:3000
```

(You can't change the port by simply changing the `--baseURL` value; you must also use the `-p` or `--port` flag.)

### Astro

If you're using a **pre-version-0.26.x** installation of the [Astro](https://astro.build) SSG, [use the `--host` flag](https://docs.astro.build/en/reference/cli-reference/#astro-dev) with `astro dev`; *e.g.*:

```bash
astro dev --host 192.168.254.10
```

By default, it'll use port 3000, but you can change that by [adding the `--port` flag](https://docs.astro.build/en/reference/cli-reference/#astro-dev). You also can [set these parameters](https://docs.astro.build/en/reference/configuration-reference/#dev-options) in the project's `astro.config.mjs` file.

In Astro **0.26.x and above**, [use the top-level `server` object](https://docs.astro.build/en/reference/configuration-reference/#server-options) in the `astro.config.mjs` file to make these changes. Here is how you'd make the ones noted above (using port 5000 as an alternate):

```js
export default defineConfig({
  // other config, perhaps
  server: {
    port: 5000,
    host: "192.168.254.10",
  },
  // other config, perhaps
})

```

### Next.js

If you're running [Next.js](https://nextjs.org), [use the `-H` flag](https://nextjs.org/docs/api-reference/cli#development) with `npx next dev` to set the hostname to the desired IP address. To use a different port from the default of *3000*, [use either the `-p` flag or the `PORT` environment variable](https://nextjs.org/docs/api-reference/cli#development)---`PORT=3000`, for example---but the latter cannot be set in a project's `.env` file. You also can set these parameters in the project's `next.config.js` file.

### Gatsby

When using [Gatsby](https://gatsbyjs.com), [use the `-H` or `--host` flag](https://www.gatsbyjs.com/docs/reference/gatsby-cli/#serve) with `gatsby serve` to set the hostname to the desired IP address. To change the port from the default of *9000*, [use the `-p` or `--port` flag](https://www.gatsbyjs.com/docs/reference/gatsby-cli/#serve).

### Nuxt.js

With [Nuxt.js](https://nuxtjs.org), [use the `HOST` and (if desired) `PORT` environment variables](https://nuxtjs.org/docs/features/configuration#edit-host-and-port) with `npm run dev` as follows, using our example from above (changing the port here, too, from its default of *3000*):

```bash
HOST=192.168.254.10 PORT=8000 npm run dev
```

The documentation advises against using the site's config file to handle these settings.

### Jekyll

Using [Jekyll](https://jekyllrb.com)? Use [either the `-H` or `--host` flag](https://jekyllrb.com/docs/configuration/options/#serve-command-options) with `jekyll serve` to set the hostname to the desired IP address. To change the port from the default of *4000*, use either the `-P` or `--port` flag. You also can [set these parameters](https://jekyllrb.com/docs/configuration/options/#serve-command-options) in the project's configuration file (`_config.yml` or `_config.toml`).

### With Live Server on VS Code

For you folks who prefer to hand-code without help from SSGs, here's how you'd make the aforementioned settings in the popular [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for Visual Studio Code:

- To [set the hostname to the desired IP address](https://github.com/ritwickdey/vscode-live-server/blob/HEAD/docs/settings.md), use `liveServer.settings.host` (the default is *127.0.0.1*).
- To [set the port](https://github.com/ritwickdey/vscode-live-server/blob/HEAD/docs/settings.md), use `liveServer.settings.port` (the default is *5500*).

## Stick to the script

Finally, on SSGs, I suggest handling these changes via [**shell scripts**](https://www.shellscript.sh/). I can assure you that I do **not** do this stuff without them. For example, here's the `start` shell script I run when developing in Hugo:

```bash
#!/bin/sh

rm -rf public
hugo server --port 3000 --bind=0.0.0.0 --baseURL=http://192.168.254.10:3000 --buildFuture --panicOnWarning --disableFastRender --forceSyncStatic --gc

```

Just entering `./start.sh` into my terminal app is far easier than always keeping a tab open to the appropriate `hugo server` documentation, much less re-entering all that jazz every time I run `hugo server`.

Of course, with projects that use scripts in `package.json`, it might be as simple as remembering to use `npm run start` or `npm run dev`, assuming you've edited your `start` or `dev` scripting to include the specifications we've discussed in this post. **Still**: if you jump back and forth among projects and they **don't** all use `package.json`, you can always make the most of your muscle memory by putting a `start` shell script on each project---even if, in the case of a `package.json`-using project, the script's only content is `npm run start`.[^terminalRemember]

[^terminalRemember]: Plus, your terminal app should remember it for you, anyway. While, sure, that also could re-run one of the longish commands I mentioned, I still encourage using shell scripts just so you won't have to keep cycling through so many different sets of commands in your terminal app's memory.
