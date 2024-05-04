---
title: "TIL some info about PostCSS Preset Env and Browserslist"
description: "When all else fails, I go to the source and ask."
author: Bryce Wray
date: 2024-02-24T21:18:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

What follows is a case of, as the web puts it, "TIL" --- **T**oday **I** **L**earned --- concerning [PostCSS Preset Env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env) and [Browserslist](https://github.com/browserslist/browserslist). Since I'd searched fruitlessly for the information before finally just putting the question out there for the PostCSS Preset Env folks to answer, it may well be something others have wanted to know, as well.

<!--more-->

My [recent decision](/posts/2024/02/using-lightning-css-hugo-back-workaround/#update-2024-02-20) to change the site's *production*-mode styling stack to one that uses PostCSS Preset Env, rather than [Lightning CSS](https://github.com/parcel-bundler/lightningcss/), was due in part to my realization that the latter isn't updated as frequently as I'd like. This matters especially because both PostCSS Preset Env and Lightning CSS edit your production-mode styling to be compatible with the browser versions you target in Browserslist.

However, to do that, the Rust-based Lightning CSS uses a [Rust port of Browserslist](https://github.com/browserslist/browserslist-rs) rather than the actual, more current Browserslist package. In fact, until I filed [an issue](https://github.com/parcel-bundler/lightningcss/issues/673) about it, Lightning CSS was running with Browserslist data that was quite a bit out of date. So, by moving to PostCSS Preset Env and the *real* Browserslist, I hoped to exercise more control over the recentness of the browser-compatibility data that my project would use in production.

Yet, this approach also had a similar potential flaw. You see, PostCSS Preset Env has, as one of its many dependencies, Browserslist --- but not *necessarily* the very latest version thereof. For example, the v.9.4.0 update of <span class="nobrk">2024-02-19</span> contained v.4.22.3 of Browserslist, even though Browserslist v.4.23.0 had been released on <span class="nobrk">2024-02-**14**</span>.

Am I being overly picky? Well, perhaps. But I feel this particular dependency needs to be kept as close to its origin as possible. To that end, I'd already included the most current Browserslist in my project's dependencies, but I got to wondering: did PostCSS Preset Env even recognize this external Browserslist installation *vs.* the version in its own dependencies?

So, as mentioned earlier, I searched for an answer to that question.

And searched.

And searched some more.

This included scouring the GitHub Issues for both PostCSS Preset Env and Browserslist, trying to find some reference to whether the former would recognize an external instance of the latter.

Having come up blank, I finally went to the appropriate [GitHub Discussions site](https://github.com/csstools/postcss-plugins/discussions) and [put the question out there](https://github.com/csstools/postcss-plugins/discussions/1299):

> The most recent version of postcss-preset-env doesn't have the most up-to-date version of browserslist, so is there a way to make postcss-preset-env detect a separate browserslist installation and rely on its data, instead of the browserslist dependency within postcss-preset-env?

I was pleasantly surprised when, within just minutes, [Antonio Leguna](https://github.com/Antonio-Laguna) of PostCSS Preset Env's parent organization, [CSS Tools](https://github.com/csstools), gave me the answer I'd sought:

> Because of how npm works and how we've specified the dependencies, npm will actually install the latest version in range. This means that any version after ours that isn't breaking is a valid version and will just work/be installed in a normal installation[.]

So, there you go. If you have Browserslist running in the same project as a PostCSS Preset Env installation whose Browserslist dependency isn't as up-to-date as the separate Browserslist, PostCSS Preset Env will, indeed, use the newer Browserslist's data. I may be the only person on Earth who'd ever cared about this; but, if not, TWL (Today **W**e Learned).
