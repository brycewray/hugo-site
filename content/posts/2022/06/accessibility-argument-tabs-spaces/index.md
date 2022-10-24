---
title: "The accessibility argument for tabs over spaces"
description: "I changed my position on a developers’ Holy War — because it was the right thing to do."
author: Bryce Wray
date: 2022-06-30T12:02:00-05:00
#initTextEditor: iA Writer
---

When I was starting this site in September, 2018, its ["About" page](/about/) looked like this:

{{< imgc src="orig-site_screen-cap_1518x1356.png" alt="Screen capture of this website’s pre-launch appearance in 2018" width=1518 height=1356 >}}

What I didn't know at the time was that its links were unfriendly from an [accessibility](https://webaim.org/intro/) standpoint --- for two reasons, both of them affecting people with certain visual impairments:

- When links aren't underlined, you're leaving their color as the only method which distinguishes them from unlinked text.
- These links' particular shade of blue lacked sufficient contrast with the white background.

Then, a few months later, I took an online accessibility course[^UofTor] for my Day Job of that time and learned I'd been falling far short on this count, especially where the [WCAG specification](https://webaim.org/standards/wcag/) is concerned.

[^UofTor]: It was offered by the [University of Toronto](https://www.utoronto.ca/) through [Canvas Network](https://www.canvas.net). Unfortunately, it doesn't appear to be in the current Canvas Network catalog; otherwise, I'd recommend it without reservation.

Since then, I've made sure that my links are underlined[^borders] and contrast sufficiently with whichever background they have at the time. While the former was fairly easy to achieve, I've taken pains to style **all** my site's text with sufficient contrast, in [both light and dark viewing modes](/posts/2019/09/thinking-dark-thoughts/). That applies to even the syntax highlighting in code segments. (The [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/) is a page I've used *often*.)

[^borders]: Technically, they're not *really* underlined. Instead, because HTML underlining often screws up the descenders on characters like *p* and *g*, I style my site's links to have **borders** underneath. The visual effect is the same.

In fact, it's because of those code segments that I'm writing this.

Yesterday, I became aware that there was one more thing I could do to enhance accessibility, but it required me to rethink a position I'd long held on one of the Holy Wars among developers: **tabs *vs.* spaces**. In other words: when you add an indent to a line of code, should you do so with one tab character or multiple space characters?

If you have no idea what I'm talking about or what difference it could possibly make, you probably haven't worked with other developers on a shared code base --- and you probably won't get the humor in this clip from an old *Silicon Valley* episode:

{{< lite-youtube videoTitle="Tabs versus Spaces" videoId="SsoOG6ZeyUI" >}}

As for me, my former position on this Holy War was for spaces over tabs when it's solely my choice, as is the case for this site.

Then, yesterday, I had my mind changed.

That's when I saw a [Hacker News thread](https://news.ycombinator.com/item?id=31924495) about [Garrit Franke](https://github.com/garritfra)'s article, "[The only true answer to ‘tabs vs spaces.’](https://garrit.xyz/posts/2022-06-29-the-only-true-answer-to-tabs-vs-spaces)" My curiosity piqued, I followed a chain of links from that discussion and found two particular items:

- A <span class="nobrk">2019-07-02</span> post on the [JavaScript subreddit](https://www.reddit.com/r/javascript) called "[Nobody talks about the real reason to use Tabs over Spaces](https://www.reddit.com/r/javascript/comments/c8drjo/nobody_talks_about_the_real_reason_to_use_tabs/)."
- A <span class="nobrk">2020-08-04</span> [comment](https://github.com/prettier/prettier/issues/7475#issuecomment-668544890) by [Mario Zehe](https://github.com/MarcoZehe) on a GitHub issue.

Now, since I am a team of one where this site is concerned, you might think it wouldn't matter what I do with its code. After all, these links refer to what happens when multiple developers, some of whom have visual impairments, work together on code.

However, the code samples I provide in various articles typically come *from* the site's code. What if any visually impaired people want to copy/paste my code samples? Besides, my [site repo](https://github.com/brycewray/hugo_site) is public, so even code I *don't* copy into articles might be problematic for such folks. These considerations are why **I decided to convert nearly**[^beCareful] **all my code's indents from spaces-based to tabs-based**.

[^beCareful]: There are a few kinds of code --- [YAML is a notable example](https://stackoverflow.com/questions/19975954/a-yaml-file-cannot-contain-tabs-as-indentation) --- where you still must use spaces for indents. Thus, **don't** go whole-hog and change ***all*** files' spaces-based indents to tabs without making sure you don't hose such spaces-dependent files and formats, especially if it's code on which your site actually depends (*e.g.*, a YAML config file for your site). Similarly, you won't want to include such FUBARed code in samples in your own posts.

So that's what I did. Fortunately, [Visual Studio Code makes that fairly easy](https://stackoverflow.com/questions/36814642/visual-studio-code-convert-spaces-to-tabs), albeit one file at a time.

I also changed the site's *[.editorconfig file](https://editorconfig.org/)* to the following, specifically the `indent_style` setting (which had been `space`):

```bash
root = true

[*]
indent_size = 2
indent_style = tab
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

[*.{sh,txt,yml,yaml}]
indent_style = space

[layouts/_default/_markup/*.*]
insert_final_newline = false

```

**Update, 2022-07-04**: This .editorconfig file is a revised version of what I originally posted. This takes into account certain troublesome[^beCareful] file types.
{.box}

As for making sure my existing code samples then still looked as I desired (for me, that's two spaces per indent, as you saw in that `indent_size` setting above), I adjusted the site's styling to add a `tab-size` setting for the **display** of code samples:

```css
	code[class*="language-"],
	pre[class*="language-"] {
		color: #ddd;
		background: none;
		text-align: left;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		word-wrap: normal;
		line-height: 1.5;
		tab-size: 2;
		hyphens: none;
	}
```

**But**, when somebody [copies the code](/posts/2022/05/gems-in-rough-18/#code-for-copying-code), it'll come through as **tabs**, and then that person's chosen editor app settings can take care of it, no matter how much horizontal space that person wants each indent to represent on the screen. This flexibility for visually challenged visitors is what I hope I've achieved with these modifications.

Whether efforts like these are worth the time where your own site's code is concerned (assuming you're in a dev environment where you even have the choice), only you can decide. But, as for this site and its code, it was my call to make; and I think I made the right one.
