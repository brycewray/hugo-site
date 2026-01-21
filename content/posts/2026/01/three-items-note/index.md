---
title: "Three items of note"
description: "The Cloudflare acquihire of Astro, visited links of a not-different color, and a 1Password syntax highlighting bug."
author: Bryce Wray
date: 2026-01-21T16:57:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

Since I last wrote herein, three events have piqued my nerdy curiosity, suggesting some appropriate musings on them. The first affects the web development business; the second has to do with a change in how visited links look in some web browsers; and the third concerns a browser extension bug which, for a few weeks, fouled up code blocks in some websites (including this one).

<!--more-->

## Cloudflare acquihires Astro

Among the tools I've used over the years to build and maintain this site, one of the more interesting is [Astro](https://astro.build). This open-source framework has come a long way since its beta versions, which with I tinkered a few years ago; and, in the process, it's gained a ton of support among the web dev community. However, that support apparently never translated to a revenue stream that would sustain either Astro itself or the Astro Technology Company which employed a substantial number of the folks behind Astro. The resulting financial shortfall risked Astro's perhaps becoming abandonware in the not-too-distant future; that would have been a sad ending to a greatly admired project.

As a result, according to [jointly](https://blog.cloudflare.com/astro-joins-cloudflare/) [released](https://astro.build/blog/joining-cloudflare/) blog posts, [Cloudflare](https://www.cloudflare.com) has [acquihired](https://dictionary.cambridge.org/us/dictionary/english/acqui-hire) the Astro Technology Company. Although not all acquihires are good for the object of said events, this one --- *at least for now* --- looks like a win-win. Cloudflare gets to own a solid and popular development framework (much like [Vercel](https://vercel.com) owns [Next.js](https://nextjs.org)), and the Astro team gets to keep that framework growing and improving.

## Visited links on Blink-based browsers

Turns out I missed a change from last April that affects the color of visited links in a [Blink](https://www.chromium.org/blink/)-based browser such as Chrome or Chromium. In the early days of the web, a link you hadn't yet visited in a given browser would always be a bright blue color (`#0000ff`) while one you *had* visited therein would be purplish (`#800080`). More to the point, a visited link would be that purplish color regardless of which originating page had gotten you there.

For example: if you were on `foo.com` and clicked a link to `bar.com`, you would subsequently see that `bar.com` link in the purplish color on **any other** page, not just on `foo.com`, as long as the browser still kept that visit in its history. Of course, over time, websites have gotten a lot more creative about their various link colors **but** the behavior remained the same.

Or, at least, it did **until** last April's release of Chromium 136. Now, with any browser based on that version or later, you'll "see" the visited link as visited **only** if that visit came from the site you're viewing. This change, [attributed by Google](https://developer.chrome.com/blog/visited-links) to the need to firm up browser security, received attention at the time from [Bleeping Computer](https://www.bleepingcomputer.com/news/security/chrome-136-fixes-20-year-browser-history-privacy-risk/) and [Tom's Guide](https://www.tomsguide.com/computing/browsers/google-will-finally-stop-this-20-year-chrome-bug-from-leaking-your-browsing-history-to-other-websites-heres-how), among other sites.

At this writing, only Blink-based browsers like Chrome and Chromium work this way for visited links' appearances; it remains to be seen when, or whether, [Gecko](https://firefox-source-docs.mozilla.org/overview/gecko.html)- and [WebKit](https://webkit.org/)-based browsers will follow the Chromium project's lead.

## 1Password *vs.* code blocks

Most password management apps have their own extensions for browsers, simplifying the act of entering one's credentials when necessary. Each such extension injects some additional code into the content delivered to the browser. This usually works without interfering with the appearance of a web page but, for a few weeks last month, such was not the case following an update to the [1Password](https://1password.com) browser extension.

The problematic version, v.8.11.23.x, totally clobbered the syntax highlighting on some (but not all) web pages with code blocks like this one, which shows a little CSS:

```css
.sitemap-div {
	margin: 0 auto;
	width: 90%;
}
```

With the buggy extension version enabled, the code block looked something like this, at least on my site:

```css
 
 

  
```

As for why, here’s an example of what the 1Password bug did to anything from the combination of [Hugo](https://gohugo.io) and [Chroma](https://github.com/alecthomas/chroma). This is how a specific code block on [one of my Hugo-generated pages](/posts/2025/12/new-normal-starting-hugo-0.153.x/) is **supposed** to look in HTML:

```html
<div>
  <div class="highlight">
    <pre tabindex="0" class="chroma">
      <code class="language-plaintext" data-lang="plaintext">
        <span class="line">
          <span class="cl">
            /Users/$USERNAME/Library/Caches/hvm/$HUGO_VERSION/hugo
          </span>
        </span>
      </code>
    </pre>
  </div>
</div>
```

. . . and this is the HTML for the same code block after the then-buggy 1Password extension got through with it:

```html
<div>
  <div class="highlight">
    <pre tabindex="0" class="chroma language-plaintext">
      <code class="language-plaintext" data-lang="plaintext">
        /Users/$USERNAME/Library/Caches/hvm/$HUGO_VERSION/hugo
      </code>
    </pre>
  </div>
</div>
```

Those missing `span`s obviously made a lot of difference, as did the insertion of a spurious `language-plaintext` in the `pre` element's `class` declaration.

As one might expect, the glitch was soon the subject of an [active discussion](https://www.1password.community/discussions/developers/1password-chrome-extension-is-incorrectly-manipulating--blocks/165639) in the 1Password Community Forum, where one complaint after another showed screen captures of how the bug had "[massacred their boy](https://knowyourmeme.com/memes/look-how-they-massacred-my-boy)," so to speak. What had happened? Well, based on various comments I read there and elsewhere about the issue, it appears that the buggy version was injecting the JavaScript-based [Prism](https://prismjs.com/) syntax highlighter. The additional code apparently was mistakenly left behind from a particular inter-version development test. Although some sites somehow escaped unscathed, the bug clearly caused styling conflicts with numerous other pages' own syntax highlighting code.

Despite the 1Password team's relatively quick acknowledgement of the SNAFU, it took several days[^endOfYear] before a fix arrived in the form of v.8.11.27.x, first in the Chrome Web Store and later the corresponding "stores" for Firefox and Safari; and not until [v.8.12.0](https://releases.1password.com/b5x/stable/#1password-in-the-browser-8.12.0) did the release notes mention the fix:

> We've fixed an issue where the 1Password extension could break syntax highlighting for code blocks on some websites.

[^endOfYear]: The delay may have been largely due to the holiday-season absence of certain 1Password devs. The Passover/Christmas/New Year's season is almost never a good time to get anything fixed, and browser extensions are no exception to that rule.
