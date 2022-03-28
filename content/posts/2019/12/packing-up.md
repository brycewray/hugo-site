---
layout: singlepost
tags: post
title: "Packing up"
#subtitle: "Eleventy and webpack are a powerful pair"
description: "How using a bundler makes the coolest SSG even better."
author: Bryce Wray
date: 2019-12-08T17:48:00-06:00
lastmod: 2021-05-16T10:22:00-05:00
discussionId: "2019-12-packing-up"
featured_image: "chain-11ty-webpack-3867751_1920x1080.jpg"
featured_image_width: 1920
featured_image_height: 1080
featured_image_alt: "Eleventy and webpack logos over a chain"
featured_image_caption: |
  <span class="caption">Images: <a href="https://11ty.dev">Eleventy site</a>; <a href="https://webpack.js.org">webpack site</a>; <a href="https://pixabay.com/users/Skitterphoto-324082/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3867751">Rudy and Peter Skitterians</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3867751">Pixabay</a></span>
---

{{< disclaimer >}}

It's that time again, [static site generator](https://staticgen.com) (SSG) nerdiness fans. Yes, that's right, it's time for me to geek out about another change to this site.

Hello? Is this thing on? *[crickets]*

Well, for those of you still in the room: bear with me, because there's a story here even if you're not at all into building websites. It's about helping a good product built by a [good person](https://www.zachleat.com) get even better.

Still, for those who are edging toward the exits, I won't [bury the lede](https://style.mla.org/dont-bury-the-lede/): I found a way to come back to my favorite SSG, [Eleventy](https://11ty.dev). But, mind you, this is Eleventy on steroids, with added awesomeness that *bundler* software---specifically, [webpack](https://webpack.js.org)---makes possible.

I know some of this (all of this?) is Greek to some of you. I'll try to fix that.

## Before bundlers&nbsp;.&nbsp;.&nbsp;.

I'd never heard of bundlers in general, or webpack in particular, until a year or so ago; and only in the last couple of months have I begun to "get" the whole point of bundlers. Now I am a firm believer in them. In the next few paragraphs, I'll endeavor to explain their purpose as best I can. I also ***highly*** encourage you to read a snappy article by [Victor Zhou](https://victorzhou.com/) called "[Why Webpack? (or, How Not to Serve JavaScript)](https://victorzhou.com/blog/why-you-should-use-webpack/)," which explains all this very, very well *and* entertainingly at the same time.

Just as Mr. Zhou did, I will explain bundlers by describing the pains-in-the-fanny which their creators intended that they prevent.

### Script calls

Until not all that many years ago, if you wanted to add JavaScript code to your website for whatever interactive jazz you wanted it to do, you'd either link to JS files&nbsp;.&nbsp;.&nbsp;.

```html
<script src="/js/comments-script.js"></script>
<script src="/js/goofy-image-slider.js"></script>
```

&nbsp;.&nbsp;.&nbsp;. or put some code right in your HTML&nbsp;.&nbsp;.&nbsp;.

```html
<script type="text/javascript">
	/* some JavaScript would go here */
</script>
<!-- ...followed by some HTML ... -->
<!-- ...and then, maybe, more JS ... -->
<script type="text/javascript">
	/* ...and so on... */
</script>
```

(Back then, you generally needed to specify that a `<script>` tag was introducing JS code. Nowadays, that's assumed.)

In the bad old days before [HTTP/2](https://http2.github.io) became widespread, the linking method, in particular, was something against which web performance gurus preached because it involved yet one more time-consuming request to the web server, as if you weren't already making enough requests for images and other assets. *One* reasonably sized JS file? Fine. But, soon, the typical website was loading many JS files per page. Especially as smartphones came into the picture with their then-limited connectivity speeds, it became even clearer that this wouldn't fly.

### Concatenation and minifying

Soon, a popular way around this problem was *concatenating* and *minifying* JS files. You'd take your twelve or fourteen files and cram ’em together into one file while also eliminating comments, line breaks, and any other items not utterly necessary for the code to run.[^spaces] Now you'd be down to just one server call for that one big JS file.

Good to go, right? Well, not quite.

What if File Eight and File Twelve each want to have a variable named `event1`---but meaning two totally different things? That wouldn't work. In the same file (not to mention the same computer RAM), each variable would have to have a *unique* name. How would *you* like to go back through a megabyte's worth of code---or more---and have to make sure no two variables had the same names (*and* clean up all the references to them, which wouldn't necessarily be a simple search-and-replace operation)?

### Dependencies

In addition to these problems, there also was the issue of managing *dependencies*. Regardless of whether they were concatenated, different sections of code often needed other sections to run in specific sequences.

Here's a simplified example. Let's say your home page's image "slider" JS file couldn't run until after the running of a different JS file that enabled the "slider" even to appear in the first place, and at the same time it also had to appear *before* yet another JS file that put some additional cuteness on the screen on top of the sliding images. As with the unique-variable-name issue, managing dependencies was not so big a deal with a small number of files, but a huge pain as the code grew.

[^spaces]: Minifying, in particular, is useful for much code at the production level. All the pretty space that humans like to use in *writing* code helps us *read* it, but browsers don't care. So what you often see in source code---what appears to be a mashed-up mess---probably started out in the *development* phase as very nicely formatted, well-commented stuff.

## Bundlers to the rescue

Bundler software like webpack[^otherBundlers] handles all of these issues. When configured properly, a bundler automatically does all of the following:

[^otherBundlers]: I should also mention that, while webpack is the best-known of the current bundlers, there's also one called [Parcel](https://parceljs.org) that you may want to check out. Its chief claim to fame is that it intelligently figures out your needed configuration and thus makes setting up the bundling operation much easier. I gave it a try but it made a couple of wrong choices in my case and so I figured, well, if I'm gonna have to configure it after all, I may as well just go with The Big Dog. I wanted to learn webpack, anyway.

- Combines all the JS code into one minified "bundle," hence the name.

- Assigns unique names to all the variables.

- Orders all the code appropriately to manage the dependencies.

They can do even more than that, however. For just one example, webpack makes it easy to use [Typefaces](https://www.npmjs.com/package/typefaces) to install open-source web typefaces. In fact, that's how I easily converted this site to first [Roboto](https://fonts.google.com/specimen/Roboto) (and [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) for the code examples you'll see here and there), and later [Public Sans](https://fonts.google.com/specimen/Public+Sans). Normally, it can be challenging to add web fonts to one's site without depending on another separate site (*e.g.*, Google Fonts); but Typefaces---created by Gatsby's Kyle Matthews---works with webpack to make it a relative piece of cake.

So, I hope, that explains bundlers. Now, where was I? Oh, yeah&nbsp;.&nbsp;.&nbsp;.

## Purple, but no passion

A few weeks ago, I [told you](/posts/2019/10/now-gatsby-geezer/) I had managed at last to get this site up and running on [Gatsby](https://gatsbyjs.org) after [multiple](/posts/2019/07/why-staying-with-hugo/) [tries](/posts/2019/07/lessons-learned/) and considerable [angst](/posts/2019/09/why-left-hugo-eleventy/).

For a few days, I reveled in the fact that I, a person who really doesn't know that much about the [React](https://reactjs.org) JavaScript library on which Gatsby depends, had managed to overcome this "great rebeccapurple whale." However, I soon realized to my surprise that I wasn't satisfied. The feeling of triumph grew stale. I felt a distinct sense of "Okay, fine; **now** what?!" It was as if I'd climbed Everest, looked around for a minute, and said, "*So?!?*"

You perhaps got a hint of that in my [recent "Mixed nuts" observation](/posts/2019/11/mixed-nuts-2019-11/):

> Although this site's been on Gatsby for a few weeks now, I still admire Eleventy, which is just plain fun to use. Still, Gatsby's image processing, seamless use of webpack, and staggering array of plugins are keeping me with it. For now.

When I wrote that and saw it on the screen, it was the first time I'd put together these feelings of vague dissatisfaction into more than just a brooding presence in the back of my mind.

This also dovetailed with my increasing realization, over the months of working with Gatsby, of just how much of that product's power comes from webpack. Don't get me wrong: Gatsby has plenty of "secret sauce" on its own. Still, if you had dealt with Gatsby, looked at the source code it produces, and read in detail about its workings as much as I have done in the last half-year, you'd have soon grasped that webpack is an inescapable part of what makes Gatsby go.[^CRA]

[^CRA]: Same is true for Create React App, for that matter, but that's a completely different subject.

So, I began to wonder, what if I could learn to use Eleventy with a bundler? Eleventy by itself is pretty cool---but, with a bundler, too&nbsp;.&nbsp;.&nbsp;.&nbsp;?

## A leg up

As [previously described](/posts/2019/09/why-left-hugo-eleventy/), I was familiar with Eleventy. The X factor on this was going to be webpack. While it's apparently considerably easier to configure than were earlier versions, it's no walk in the park.

However, this is where my months of wrangling with Gatsby (and, a few times, with [Create React App](https://create-react-app.dev)) came in handy. Had I not been through that already, I'd probably have wilted quickly whenever I ran into the inevitable glitches while trying to set things just right for webpack to do its thing---including having separate configs for development and production. But, by now, it was no biggie. That's *not* to say it was easy.

I *highly* encourage anyone considering taking up webpack to spend plenty of time reading applicable parts of the excellent webpack documentation, as well as finding and perusing online repositories of code from people who have built their sites with webpack. Of particular use in this case---putting Eleventy together with webpack---was [Ray Villalobos](https://7ty.tech/about)'s [Seven](https://7ty.tech). If you, too, want to mix Eleventy and webpack, you can't do better than to examine [Mr. Villalobos's code](https://github.com/planetoftheweb/seven).

## So what do we get?

### Image processing

I had mentioned I was impressed with Gatsby's image processing power. Indeed, I still am. However, it's worth keeping in mind that you make people download a *ton* of JS to make that happen. I had decided that wasn't worth it, especially for my humble little place on the web.

My priority was to deliver images that were optimized and "[lazy-loaded](https://en.wikipedia.org/wiki/Lazy_loading)." And, in this new setup, I achieved all the things I decided were critical to achieve, thanks in particular to [responsive-loader](https://github.com/herrstucki/responsive-loader) and the popular [lazysizes](https://github.com/aFarkas/lazysizes) library. By the way, webpack makes lazysizes much easier to use.

### SCSS/Sass

You may recall my [mentioning](/posts/2019/09/why-left-hugo-eleventy) that, on my first run with Eleventy, I used the [Gulp](https://gulpjs.com) task runner app to add the SCSS-to-CSS conversion features I'd formerly had out of the box with my first SSG, [Hugo](https://gohugo.io). While some people do use webpack together with task runners, I wanted to avoid that. Fortunately, webpack [can handle](https://developerhandbook.com/webpack/how-to-configure-scss-modules-for-webpack/) it all just fine.

### Miscellaneous benefits

Another Gatsby feature I wanted to carry with me was the way it prefetches in-site content to make jumping from page to page seem almost instantaneous. I noticed that the Eleventy site was using the [instant.page](https://instant.page) utility to make that happen, and was pleased to see that it also came as an [npm package](https://www.npmjs.com/package/instant.page) that works very well with both Eleventy and webpack. (I am also talking to the creator of [Flying Pages](https://wpspeedmatters.com/quicklink-vs-instant-page-vs-flying-pages/), a similar but even more promising package that currently exists mainly as a WordPress plugin, about making it more webpack-friendly; am hoping that'll come to fruition soon, because it has great potential.)

For that matter, as you've probably gathered by now, webpack makes short work of using npm packages in general. This recalls Eleventy creator Zach Leatherman's comment back when [he started Eleventy](https://www.zachleat.com/web/introducing-eleventy/):

> Always bet on JavaScript. JavaScript gives you access to npm. The npm ecosystem is large. Crazy large. .&nbsp;.&nbsp;. When you want to add functionality, it’s a good bet that a module exists on npm.

I can also tell you that the development experience of my setup is a lot cleaner and less bug-laden than with Gatsby. For reasons I still don't understand, and this goes back to my agonies of last summer, the Gatsby development environment is just plain unstable at times. For example, it would often pull up the wrong template at odd intervals, making, say, the home page use the very different posts template. Sure, I *knew* that it wouldn't do it when actually building the site and delivering it via [Netlify](https://netlify.com), but it still bugged me. Eleventy by itself, as well as Eleventy-with-webpack, simply doesn't do that sort of thing to me. I greatly prefer that kind of experience.

Oh, by the way: in my first few builds out to Netlify, I've found this combo to beat Gatsby on build speed, also. (To be fair, Gatsby hasn't ever been known for being a quick builder.) I was pleased to see that, despite the fact I was putting together the config with zero experience with webpack, it all worked, and quickly, when it finally came time to put the thing on the web for real.

In summary, the Eleventy/webpack combo gives me things I couldn't have had if I'd used either without the other.[^webpackAlone]

- Eleventy allows easier and more flexible [templating](https://www.11ty.dev/docs/templates/). Yes, you *can* use Markdown with webpack to create web pages, but I simply find Eleventy's method easier to use and configure.

- webpack makes it easier to integrate third-party JS. If I stuck with only Eleventy, I'd have to rely on the fairly small number of Eleventy plugins to integrate some features; but the massively popular webpack, with its much wider universe of plugins and loaders, opens me up to far more possibilities out there.

[^webpackAlone]: As you're likely aware, many use webpack *by itself* to build websites and web apps. However, I prefer the versatile templating abilities of Eleventy, so I chose to go the combo route.

## Looking back .&nbsp;.&nbsp;. looking ahead

Although I have never been adept at dealing with mechanical things, much to my wife's chagrin when things need fixing around our aging home[^doorknob], I *do* like to tinker. Only thing is, what I like tinkering with is: code that makes web pages work.

[^doorknob]: Like today, for example, when I struggled to replace a doorknob---although, in my defense, doorknobs aren't really designed for easy replacement. Have *you* tried, lately, putting the mounting screws into a doorknob *around* the doorknob? It's not as if screwdrivers are flexible.

In fact, not long ago, our company owner asked a group of us about our hobbies. The others mentioned normal, human things like dancing, mountain-climbing, and playing or watching various sports.[^sports] Then, he got to me. I had to be the group nerd who admitted that mine is very similar to what I do for pay. So I guess I'm the proverbial "[dull boy](https://en.wikipedia.org/wiki/All_work_and_no_play_makes_Jack_a_dull_boy)," which will shock absolutely no one who knows me.

[^sports]: And, hey, I like watching sports, too. As I type these particular words, I have a browser window open with a stream of [NFL Red Zone](http://www.nfl.com/redzone)---although, similar to what I [mentioned](/posts/2019/11/mixed-nuts-2019-11/) recently, ballgames lately are more background noise to me than anything else.

That said, this tendency can come in handy. What you're seeing now is proof.

Don't misunderstand: this isn't a finished product, by any means. No website ever is. I'll keep doing cleanup, trying to make things work and look better. But there comes a time to "ship it," as the saying goes, and I decided today was as good a day as any.

When this year started, I had no idea I'd be engaging in this six-month soap opera of switching back and forth among SSGs. However, I've loved learning all the stuff that went with that "dance," and---now that I'm back with my favorite SSG but also inaugurated into the webpack ecosphere about which I've been reading so much---I hope the sky's the limit.
