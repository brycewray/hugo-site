---
title: "The accessibility argument for tabs over spaces"
description: "I changed my position on a developers’ Holy War — because it was the right thing to do."
author: Bryce Wray
date: 2022-06-30T13:00:00-05:00
draft: true
#initTextEditor: **FILL IN**
---

When I was starting this site in September, 2018, a pre-launch version of its "About" page looked like this (although, if I recall correctly, the "FRIST PSOT" line never made it to that early version of the [real page](/about/)):

{{< imgh src="orig-site_screen-cap_1518x1356.png" alt="Screen capture of this website’s pre-launch appearance in 2018" >}}

What I didn't know at the time was that its links were unfriendly from an [accessibility](https://webaim.org/intro/) standpoint for two reasons, both of them affecting people with certain visual impairments:

- When links aren't underlined, you're leaving their color as the only method which distinguishes them from unlinked text.
- These links' particular shade of blue lacked sufficient contrast with the white background.

Then, a few months later, I took an accessibility course for my Day Job of that time and learned I'd been falling far short on this count, especially where the [WCAG specification](https://webaim.org/standards/wcag/checklist) is concerned.

Since then, I've made sure that my links are both underlined[^borders] and sufficiently "contrasty" with whichever background they have at the time. Indeed, I've gone to great lengths to give **all** my site's text sufficient contrast in both light and dark viewing modes. That applies to even the syntax highlighting in code segments. (The [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/) is a page I've used *often*.)

[^borders]: Technically, they're not really underlined, since browsers typically do a lousy job with underlined fonts --- *e.g.*, the underlines often screw up the descenders on characters like *p* and *g*. Instead, I style them to have **borders** underneath. The visual effect is the same.

Indeed, it's because of those code segments that I'm writing this.

Yesterday, I became aware that there was one more thing I could do to enhance accessibility, but it required me to rethink a position I'd long held on one of the Holy Wars among developers: **tabs *vs.* spaces**. In other words: when you indent a line of code, should you do so with a tab character or some space characters?

If you have no idea what I'm talking about and/or what difference it could possibly make, you probably haven't worked with other developers on a shared code base --- and you probably won't get the humor in this clip from an old *Silicon Valley* episode:

{{< lite-youtube videoTitle="Tabs versus Spaces" videoId="SsoOG6ZeyUI" >}}

As for me, my former position on this Holy War was for spaces over tabs --- but I also thought it was purely a matter of each developer's personal taste, completely separate from any other considerations.

Then, yesterday, I had my mind changed.

That's when I saw a [Hacker News thread](https://news.ycombinator.com/item?id=31924495) about [Garrit Franke](https://github.com/garritfra)'s article, "[The only true answer to 'tabs vs spaces'](https://garrit.xyz/posts/2022-06-29-the-only-true-answer-to-tabs-vs-spaces)." My curiosity piqued, I followed a chain of links from that discussion and found two particular items:

- A 2019-07-02 post on the [JavaScript subreddit](https://www.reddit.com/r/javascript) called "[Nobody talks about the real reason to use Tabs over Spaces](https://www.reddit.com/r/javascript/comments/c8drjo/nobody_talks_about_the_real_reason_to_use_tabs/)."
- A 2020-08-04 [comment](https://github.com/prettier/prettier/issues/7475#issuecomment-668544890) by [Mario Zehe](https://github.com/MarcoZehe) on a GitHub issue.

Now, since I am a team of one where this site is concerned, you might think it wouldn't matter what I do with its code. After all, these links refer to what happens when multiple developers, some of whom have visual impairments, work together on code.

However, the code samples I provide in various articles typically come *from* the site's code. What if any visually impaired people want to use my code samples in their original form? Besides, my [site repo](https://github.com/brycewray/hugo_site) is public, so even code I *don't* copy into articles might be problematic for such folks. That's why I decided to change nearly[^beCareful] all my code's space-based indents to tabs.

[^beCareful]: There are a few kinds of code --- [YAML is a notable example](https://stackoverflow.com/questions/19975954/a-yaml-file-cannot-contain-tabs-as-indentation) --- where you still must use spaces for indents. Don't go whole-hog and change ***all*** files' space-based indents to tabs without making sure you don't hose such space-dependent files and formats, especially if it's code on which your site actually depends (*e.g.*, a YAML config file for your site). Similarly, you won't want to include such invalid code in samples in your own posts.

So that's what I did. Fortunately, [Visual Studio Code makes that fairly easy](https://stackoverflow.com/questions/36814642/visual-studio-code-convert-spaces-to-tabs), albeit one file at a time.

Whether you consider such a change worth your time in your own code (assuming you're not in an environment that doesn't even give you the choice), only you can decide. But, as for this site, it was my call to make, and I think I made the right one.