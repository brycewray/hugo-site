---
layout: layouts/posts/singlepost.njk
tags: post
title: Blox sux
subtitle: Page builders are a pain, but . . .
description: "Some highly uncomplimentary words about WordPress page builders."
author: Bryce Wray
date: 2019-01-19T09:25:00-06:00
lastmod: 2019-10-06T19:00:00-05:00
discussionId: "2019-01-blox-sux"
featured_image: /images/lego-169603_1280x960.jpg
featured_image_alt: Lego blocks arranged stylistically
featured_image_caption: "Image: M W; Pixabay" # quotation marks to allow colon
---

There’s an old saying to the effect that “a poor craftsman blames his tools.”

The only thing about that saying—which is supposed to be an indictment of anyone who gripes about said tools—is that I first learned it in a 1960s comic piece, “How to Be a Comic Book Artist!” (reproduced [here](https://benjaminherman.wordpress.com/2018/09/01/marie-severin-1929-to-2018/)), which in fact was anything but such an indictment.

So, there’s that.

## Building blocks?

Many are content to build Web pages by shuffling blocks around in page builder plugins within CMSs. There was a time when that was true for me, too, but I now find renewed satisfaction in getting under the hood and manipulating pages with real code.

Nonetheless, in my Day Jobs of the last few years, I’ve spent a lot of time working in not just any CMS but the big enchilada—WordPress—and, more recently, having to revisit one particular godforsaken page builder plugin that someone else had chosen because it was bundled with a particular WordPress theme the fellow had found useful. I won’t say which page builder it is, simply because it has its own sycophants and I don’t care to argue with them about what I’m going to say about it. Life is too short.

That consideration aside, said Godforsaken Unidentified Page Builder, hereafter identified only as *GUPB*, really, *really* sucks. And it sucks for all the major reasons WordPress page builder plugins *can* suck:

- **Unintuitive design**—GUPB strikes me as one of those classic cases of “It looks good to the developer, so screw you users.” I beg to differ.

- **Code bloat**—Like just about every other page builder (even the two or three halfway decent ones), GUPB spews a ton of nested DIVs in order to do its thing. The result is agony to read when you have to open a browser’s Inspector window to figure out why something got screwy. It’s as metaphorically stinky as [the ancient practice of divining by “reading” the entrails of animal sacrifices](https://en.wikipedia.org/wiki/Haruspex) was literally so.

- **Shortcode spray**—GUPB is one of those page builders that, if deactivated in favor of a better option, leaves behind a <em>\[bleep\]</em>ton of shortcode that is (a.)&nbsp;absolutely useless and (b.)&nbsp;a tedious chore to clean up. The following screen capture from [Pippin Williamson’s excellent “WordPress page builder plugins: A critical review”](https://pippinsplugins.com/wordpress-page-builder-plugins-critical-review/) is a perfect example, even though it shows only a  fraction of some of the shortcodes mess that’s really likely to result *(and, yeah, that is from GUPB, as it turns out; so, if you’re willing to do a little detective work and/or you simply know your page builder shortcodes when you see ’em, you now know which page builder is GUPB)*.

{{< img src="screen-cap-from-Pippin-Williamson-s-page-builders-review.png" alt="Screen capture showing shortcodes from a WordPress page builder" >}}

My having once specifically replaced GUPB in favor of another pagebuilder at a different company for precisely these reasons (well, except for code bloat, because they *all* do that) doesn’t make it any easier.

## Don’t block yourself

For those of you who have a choice about how to build Web pages, I offer some hard-won wisdom:

1. **Don’t use a CMS unless you really have to.** And, by “really have to,” I mean that you have multiple individuals who will require direct access to the site so they can add content to it. Which is another way of saying, if they’re simply giving *you* the content to place within the site, *you don’t need a CMS*. That’s when it’s up to you, the Web dev, to put the content into the site; and it should be through either good old hand-coding or, if you’re fortunate enough to be using an SSG, writing in [Markdown](https://daringfireball.net/projects/markdown). But, if at all possible, keep your “hands” “dirty.” It makes for a much stronger résumé among those who know the difference, and it is their approval you’ll want. After all, virtually anybody with reasonable office skills *should* be able to use a CMS. (Stay tuned for more on that thought, however.) Coding requires skill. *Good* coding requires a lot of skill—and staying current on what’s out there.

2. **If you *have* to use the WordPress CMS**:  

   - **Pick the Elementor page builder.**  
	 Speaking of “staying current,” the WordPress plugins landscape changes constantly, so it’s quite possible I’ll have to recant the following endorsement in a few months or a year; *but*, for right now, my considered judgment is that [Elementor](https://elementor.com) is the “lead dog” among WordPress page builder plugins. (And, no, they’re not paying me a penny for that statement.)  
	 I recently had to leave an Elementor setup in the hands of other Web pros who apparently weren’t familiar with it, and they picked it up in no time. I cringe when I think about what they’d have encountered had I not switched that site to Elementor from GUPB nearly two years earlier.  
	 While I can’t say your average “I know just enough computer stuff to be dangerous, heh heh” businessperson necessarily could immediately grasp editing in Elementor—and my earlier comment about multiple individuals’ needing access is why I mention that possibility—I think he/she would have a lot easier time with Elementor *and* manage to be at least somewhat productive with it more quickly than with the vast majority of other available page builders, and *most certainly not* GUPB.  
	 I would add, also, that if you do pick Elementor you should get its Pro version. Lots of cool stuff available there. The good thing is that you can try the free version first to see if you like Elementor itself.  
	 (Oh, by the way: GUPB apparently has *no* separately available free version. I say “separately available” because it typically gets bundled with a lot of WordPress themes, which makes sense for its business model given that it could be a hard sell otherwise, *and then refuses to allow upgrades unless you buy it*. I kid you not. That’s *very* poor WordPress citizenship.)

   - **Use the leanest possible theme.**  
	 Speaking of poor WordPress citizenship, some themes out there are sold as quasi-page-builders. But, no. Just don’t. Use whatever page builder you choose but with a very lean theme. Two that come to mind are [GeneratePress](https://generatepress.com), which is available in free and Pro versions (again, not getting paid for these or any other endorsements), and the totally free, ultra-bare-bones [Underscores](https://underscores.me). Better yet, if Underscores doesn’t ring your bell, there are other, similar themes or [you even can create your own](https://codex.wordpress.org/Theme_Development) lean-and-mean theme.  
	 But the main thing is: *don’t* make the double-pronged mistake of picking a big, bloated theme and then pairing it with a page builder, particularly anything close to the abomination that is GUPB. You’ll hate yourself for doing that.

### What about Gutenberg?

Oh, there’s one more thing (and, no, I’m not trying to channel [Steve Jobs](http://mentalfloss.com/article/49097/every-one-more-thing-steve-jobs)).

Right now, the WordPress world is in a [frothing](https://www.rystedtcreative.com/wordpress/wordpress-5-0-gutenberg-2018/) [mess](https://deliciousbrains.com/wordpress-gutenberg/) over the WordPress 5.x release and, with it, the embedding within WordPress core software of [WordPress’s own page builder, Gutenberg](https://wordpress.org/gutenberg/). While there are some who love it and feel it should be a great free replacement for all the page builder plugins, it seems clear it’ll be a while before it’s ready for prime time. That’s a bit sad because Gutenberg, especially once its early rough edges get smoothed somewhat, may well be enough for the vast majority of WordPress users who are not Web designers—a description which includes a lot more of them than you might think, or want to think. Still, while that jury is out, my advice from above stands: if you have to have WordPress, use Elementor. (If your WordPress setup is staying up to date, [as it should if you want to avoid security issues](https://www.malcare.com/blog/2018/02/06/important-wp-security-updates/), you can turn off Gutenberg by installing the [official Classic Editor plugin](https://wordpress.org/plugins/classic-editor/).)

---- 

#### *Side note: Trying Typora*

*While I still absolutely [love Ulysses for creative writing](/posts/2018/09/why-finally-settled-ulysses), I have been thinking about using a different app for my Markdown-only work, such as content for this site. I prefer to edit Ulysses content through its Library rather than opening and saving actual .md files, but the latter are exactly what my chosen [SSG](https://www.staticgen.com) needs; so using a more conventional approach saves steps (specifically, exports from Ulysses to .md files) when I’m editing with my locally hosted staging site in view. The obvious downside to this approach is that you lose the organizational asset of* having *those files’ content in the Ulysses Library; but, for now, I’ll consider this method. I can always copy/paste into Ulysses, of course.*

*I gave [iA Writer](https://ia.net/writer) a brief trial but wasn’t impressed, especially given the clunky way it handles such SSG essentials as top-of-page [YAML](https://yaml.org)-type metadata. (I won’t bore you with the details, for once.)[^1] Then I tried [Typora](https://typora.io) and liked it so much that I wrote nearly this entire piece in it before, indeed, copying/pasting the content into Ulysses for storage in the Library with my other posts. I had read a lot of glowing comments about Typora, and now I see why. It’s even free (for now), for Pete’s sake, while it’s still pre-Version-1. I don’t know what Version 1 eventually will cost, but it may well be a worthy addition to my stable of apps. However, [a new version of Ulysses is coming before long](https://ulysses.app/blog/2019/01/ulysses-15-beta/), so I’ll probably wait to see what it offers before I decide to separate my writing processes between Ulysses and [whatever], whether [whatever] turns out to be Typora or something else.*

[^1]:	On the other hand, [I gave it yet another try](/posts/2019/02/ia-for-io) and learned some things that changed my mind somewhat.