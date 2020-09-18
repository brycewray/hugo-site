---
title: Why I’m staying with Hugo
subtitle: An “interesting” learning experience
description: After experimenting for a few weeks with Gatsby and a few other trendy SSGs, I realize just how good I have it with Hugo.
author: Bryce Wray
date: 2019-07-15T01:45:00
lastmod: 2020-08-08T19:15:00
discussionId: "2019-07-why-staying-with-hugo"
featured_image: hugo-logo_reflection_1280x720.jpg
featured_image_width: 1280
featured_image_height: 720
featured_image_alt: Logo for the Hugo static site generator.
featured_image_caption: |
  <span class="caption">Image: Hugo logo by Hugo creator Steve&nbsp;Francia, sourced&nbsp;from <a href="https://gohugo.io">Hugo&nbsp;website</a>; adapted in <a href="https://affinity.serif.com/en-us/designer/">Affinity&nbsp;Designer</a>.</span>
---

<div class="border-black border-solid yellowBox">
	<p><strong>Note</strong>: To put it simply, <a href="/posts/2019/09/why-left-hugo-eleventy">things</a> <a href="/posts/2019/09/back-with-hugo">have</a> <a href="/posts/2019/10/its-about-food-not-decor">changed</a> multiple times since this post, but it reflects my thinking at the time and also provides what I hope are some useful <em>caveats</em>, so <a href="/posts/2019/10/otoh">here it shall&nbsp;stay</a>.</p>
</div>

If you've been sufficiently masochistic to read through most of my other [posts](/posts) up to this point, it's probably become pretty clear---and I've even said as much---that I tend to have a problem avoiding New Shiny Things where tech is concerned.

I put this site online last September, after several weeks of examining the [static site generator](https://www.staticgen.com) (SSG) scene and picking [Hugo](https://gohugo.io) as the best-suited among them for my purposes. But, almost from the get-go, I kept hearing quite a bit about some other up-and-coming SSGs, and remained curious.

In the three weeks before this post, including the four-day "weekend" that I had for the Fourth of July, I spent many hours on a single-minded task: converting this site from Hugo to what seems to be the "hottest" of the Other Guys, an SSG called [Gatsby](https://www.gatsbyjs.org) that's based on the [React](https://reactjs.org) JavaScript library.

Why I was willing to make such a switch in the first place---and why I ultimately chose not to go through with it---is the story I'm here to tell you today, friends and neighbors. This'll be a long one (even for my long-winded self), but one which I hope will help others with similarly curious streaks avoid some of what I just endured.

***Disclaimer:*** *As always, I claim no expertise on the subjects of today's little discourse. I am simply stating opinion; I am just telling you what happened to me. According to [statistics](https://www.staticgen.com/gatsby), there are many thousands of web developers who find Gatsby a delight, a game-changer, a breath of fresh air. Indeed, I had fully expected to be among their ranks before this was over. All I'm doing here is explaining why that didn't happen. If any Gatsby fans who happen on this post want to say it's because I'm too dumb to "get" Gatsby and/or React, that's perfectly fine. An overabundance of brainpower I do not have, and I know that. An overabundance of JavaScript knowledge, much less knowledge of React, I* ***absolutely*** *do not have. (However, the same is true for my knowledge of Hugo and its parent language---[Go](https://golang.org), sometimes [erroneously](https://golang.org/doc/faq#go_or_golang) called "Golang"---and yet I manage to use it without incident, for the most part, which is more than I can say about Gatsby and React.)*

With that said, moving right along&nbsp;.&nbsp;.&nbsp;.

## A taste of&nbsp;.&nbsp;.&nbsp;. something

My first true interaction with Gatsby came, in fact, only a few weeks after this site hit the web. While I was between Day Jobs, I came into contact with a fellow who, while he didn't have a full-time job to give, nonetheless consulted me for help with his new e-commerce site which, at the time, was WordPress-based and 'waaaaay too slow as a result. Because the site's purpose was to demonstrate his invention, a web app that can fetch and display an item almost instantaneously from within an immense "catalog," he obviously couldn't tolerate the site's being sluggish. It'd have been like trying to sell rides in a Lamborghini being towed by a [Pinto](https://en.wikipedia.org/wiki/Ford_Pinto).

With my then-recent research on SSGs, I suggested one of them might be his answer: tremendous speed, no WordPress performance hits or security risks, and plenty of New Shiny (well, okay, I didn't put it that way). Since I knew Hugo best from among the ones I'd studied, I recommended it. He liked what he read about it, but noticed its [docs](https://gohugo.io/documentation/) lacked any mention of being able to grab vast amounts of data from other sources quickly, which was utterly necessary for his purposes.

I checked the SSG field again and Gatsby, with its [GraphQL](https://graphql.org)-fueled data powers, sounded like what he needed. Of course, I told him, I needed to check it out myself first, so I dutifully went through the [Gatsby tutorials](https://www.gatsbyjs.org/tutorial/), and was sufficiently impressed by what I learned that I recommended he let me set him up with a Gatsby site.

Boy, howdy, did I dodge a bullet when he declined.[^demur] Only now do I know just how true that is.

[^demur]: He demurred after, as I recall, doing a web search and finding some reports about some limits on what the then-v.1.0 Gatsby could do in his particular kind of use case.

You see, what I **didn't** do back then was follow up from those tutorials by setting up my own Gatsby site; all I saw at the time was the carefully charted path laid out in the tutorials. As you can well guess, they make it seem that, if you just follow the instructions, you'll have a Gatsby site up, running, and data-gulping faster than you can say, "F. Scott Fitzgerald."[^Leo]

[^Leo]: Or "[Leonardo DiCaprio](https://www.imdb.com/title/tt1343092/?ref_=fn_al_tt_3)" or even "[Robert Redford](https://www.imdb.com/title/tt0071577/?ref_=fn_al_tt_4)," if you're so inclined.

***Disclaimer echo:*** *Some can. As I'll make clear, I couldn't---at least, not beyond the tiny confines of the "starter" site that you get by default with the* ```gatsby new``` *command.*

## Scratching the itch

Fast forward to a month ago. In the Day Job, I was spending many hours on a particular project that was replete with JavaScript.

You have to understand that, as an Old Web Guy<span style="vertical-align: top; line-height: -0.01; font-size: 60%;">&trade;</span>, I earned my website dev chops in another era. Back then, [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript) had [fallen into disrepute](https://crockford.com/javascript/javascript.html) except for [those things which utterly had to be done client-side](https://en.wikipedia.org/wiki/Ajax_%28programming%29), server-side languages (like [PHP](https://www.php.net)) were all that really mattered, and too many browsers simply didn't handle JavaScript correctly (or, as in the case of the company for which I worked back then, too many customers had it turned off by default) for me to count on its utility.

Yes, I knew [things had changed](https://medium.com/@alexbeletsky/renaissance-of-javascript-485118447cf9) for JavaScript since then, especially since [2015](https://ecma-international.org/ecma-262/6.0/) or so, but I just didn't care. Besides, I usually had other ways to do JS-like things, especially once I was tasked with maintaining CMS-based sites; so, until lately, I maintained that standoffishness toward JS.

As a result, I went into this JS-intensive project not knowing enough about the language, and would agree with anyone who watched me code during this project that I still don't; but, at least, I *was* becoming more comfortable with it, gradually understanding it better, as the long days (and some nights) of coding passed.[^EJS]

[^EJS]: I must credit, in part, the wonderful [Eloquent JavaScript](https://eloquentjavascript.net) for some of this. What a great site that is for JS noobs.

With that increasing comfort with JS, I began thinking, and reading, about Gatsby once again. When the Day Job coding for that project became a little less intense (for a while) and I once again had some spare brain cells during nights and weekends, I got it in my head that, perhaps now, I should give Gatsby a shot---and not simply as a trial, but to replace this Hugo-based site you're viewing now.

## Polishing up the ol' résumé?

After what by then was a nine-month stretch with Hugo on this site and relatively smooth operation thereof, why was I willing to switch the site from Hugo to Gatsby? It came down to these two interconnected things I'd decided:

- After budget cuts forced my two previous Day Jobs out of existence without warning and I found myself out there suddenly competing with people less than half my age for tech jobs, I needed to make myself more sellable, in case the current Day Job also goes away. I couldn't turn back the clock and be in my twenties or thirties again, but I *could* demonstrate my ability to learn new things quickly, perhaps breaking through the stereotype about aging boomers who still have to earn a paycheck. And what better way could I do that than by transforming my most public presence---this website---from a Go-based platform to one based on one of the [most-sought programming languages in the job market](https://www.codeinwp.com/blog/angular-vs-vue-vs-react/)?
- In a similar vein, my work in Hugo with Go hadn't taught me enough about any language, much less the [relatively less popular](https://hackr.io/blog/best-programming-languages-to-learn-2019-jobs-future) Go, to make it worthwhile from the perspective of a potential employer.

Thus it was that one weekend, with those thoughts swirling in my already overheated brain, I went back to the Gatsby site and, to refresh my memory, re-did the same tutorials (although, since then, Gatsby v.2 has been released, so I'm sure they're somewhat different now). But, this time, I followed that up with starting a new local Gatsby site, fully intent on replacing this site with it.

Just a word about that, by the way: as I [explained previously](/posts/2019/04/publish-or-perish), the way I publish this site to my chosen host, [Netlify](https://www.netlify.com), is to point Netlify to a [Git](https://git-scm.com) [repository](https://www.sbf5.com/~cduan/technical/git/git-1.shtml), or "repo," out on the web---in my case, with [Bitbucket](https://bitbucket.org). That then would've made it a piece of cake to switch the actual online site from Hugo to Gatsby: I'd simply have pointed Netlify to a different repo, one in which the new Gatsby version would be waiting.

I just had to build the thing first.

More to the point, I had to build it to be *exactly* like this one: ideally, one could pull it up pre-Gatsby or post-Gatsby and not know the difference. If I had to do anything more than minimally user-noticeable to make it work, that would be failure.

## Both SSGs, but not alike at all

Before I go on (and, yeah, "go on" definitely is the accurate phrase at this point, but I did warn above that it'd be a long post), I should explain a fundamental difference between the Hugo and Gatsby SSGs. It's a difference that will help you understand a lot of the trouble I encountered in this attempted site migration.

### Hugo: All-in-one

Hugo is a *self-contained executable*. It's an *app*. Just install it and, whammo, you've got Hugo and nearly all its goodness from Minute One. Of course, [you can configure Hugo](https://gohugo.io/getting-started/configuration/) to do certain things it doesn't do right off the bat; but you essentially get the whole package in that one installation, and, especially if you're not as typography-obsessed as I, you might be good to go from that point. Indeed, even if you *are*, you can get there fairly rapidly.

### Gatsby: Turtles all the way down

On the other hand, Gatsby is a *framework* built atop React. If you want it to do anything other than the basics, you can't just edit `/gatsby-config.js` (as well as `/gatsby-node.js` and, perhaps, `/gatsby-browser.js`); you have to load plugins. For even a site as modest as mine, I'm talking *lots* of plugins, each of which has to be installed just-so within `/gatsby-config.js`.

Moreover, nearly all of those plugins have [dependencies](https://blog.softwaremill.com/it-depends-the-art-of-dependency-management-in-javascript-f1f9c3cde3f7), some of which the [package](https://npmjs.org) [managers](https://yarnpkg.com) tell you about and some they don't. When you start seeing nastygrams in your [command-line interface](https://techterms.com/definition/command_line_interface) (CLI) as you install things, you'll learn that quickly. It'll become even clearer when all those interacting things suddenly aren't playing together nicely, at which point you're in Crash City.

And, yeah, you're gonna spend a *lot* of time in the CLI building a Gatsby site (even when everything's going fine), far more than is the case than when starting a new site with Hugo. My nerdy curiosity wasn't fazed by that a whole lot, but [YMMV](https://www.urbandictionary.com/define.php?term=ymmv).

## Starting down an uncertain path

That first weekend, things seemed okay. For a while.

The [default Gatsby starter](https://gatsby-starter-default-demo.netlify.com/) definitely ran fine on my local setup. So, I felt, it was time to start copying over my Markdown files from the Hugo site. A few crashes later, I'd made the expected adjustments to each file's [YAML front matter](http://assemble.io/docs/YAML-front-matter.html) to correspond to how Gatsby wants to see it rather than what Hugo expects, rebooted the local Gatsby server, and started to see newly created pages show up. So far, so good.

Speaking of crashes&nbsp;.&nbsp;.&nbsp;.

As is true for most other Hugo users, I typically use the [*hugo server*](https://gohugo.io/commands/hugo_server/) command to try out stuff on my local system before posting it to the world. I am quite used to seeing the browser screen go to black with various error messages if I do something Hugo doesn't consider kosher. That's fine. I want to know when there's a problem, because it's better for it to go nuts on me now while I can fix it than when it's on the real web; and, once you fix the problem, the normal screen returns as if nothing had happened.

But when Gatsby crashes while in [*gatsby develop*](https://www.gatsbyjs.org/docs/gatsby-cli/) mode (similar to when you're using `hugo server` in Hugo), it really crashes and *stays* crashed. Since any number of things (sometimes including *copied-and-pasted examples from the Gatsby site*) could cause this, I found myself entering `gatsby develop` to restart the Gatsby dev server **a lot**.

Also, the Gatsby error messages sometimes were helpful, but other times obscure and pointing to problems in files deep within Gatsby's bowels that I knew I shouldn't even *think* about editing.

Unfortunately, the error messages' characteristic unhelpfulness---indeed, my [VS Code](https://code.visualstudio.com) app was quite often more instructive about functions, mistypings, missed characters, *etc.*---proved to be part of a pattern. That pattern's most unfortunate aspect was the Gatsby [documentation](https://www.gatsbyjs.org/docs/). Obviously and understandably written by developers who've already Been There and Done That and perhaps are too busy and tired to care whether you haven't, it wasn't exactly planned for someone who wanted to do what I was attempting---such as accessing images that aren't in the same directory as the Markdown file which tries to reference it.

Huh? Okay, maybe I need to explain that first.

## An image problem

More to the point, I'll explain how folks such as I have been building websites since most of the Gatsby team was in diapers.

You plan a structure. This structure has directories---folders, if you prefer---with clearly delineated purposes. It usually ends up looking something like this:[^index]

[^index]: In each case where you see `index.html` in this diagram, it could just as easily be `index.php`, or `index.asp`, or `index.js`, or whatever makes sense for the particular site's setup.

```markup
. [top level, usually "/public_html" on a server]
└── index.html [site's home page]
    └── about [directory]
    |   └── index.html [site's "About us" page]
    ├── contact [directory]
    |   ├── index.html [site's "Contact us" page]
    ├── images [directory]
    |   ├── [files and/or subdirectories]
    ├── downloads [directory]
    |   ├── [files and/or subdirectories]
```
    
.&nbsp;.&nbsp;. and so on. Now, because it's an SSG, [Hugo's structure is a little different](https://gohugo.io/content-management/organization/), but the basic idea remains the same.

And, silly me, I figured Gatsby would follow a convention more or less like that. After all, it had the `gatsby-source-filesystem` plugin which, when set up properly in `/gatsby-config.js`, was [supposed](https://www.gatsbyjs.org/docs/sourcing-from-the-filesystem/) (I thought) to point Gatsby to wherever I wanted it to point.[^filesystem]

[^filesystem]: Hugo handles this by letting you figure it out: as the [docs](https://gohugo.io/content-management/organization/) say, "Hugo assumes that the same structure that works to organize your source content is used to organize the rendered site." So, rather than using a config file to *tell* it where to point, you simply set up the directories the way you *want* it to point. I may just be used to the Hugo way, but that strikes me as far more logical than Gatsby's method.

Thus, if I'd known up-front that it would prove to be a gut-wrenching experience simply to make Gatsby recognize an `/images` directory that any page could access when trying to pull up pictures, I'd have probably just muttered a few colorful words and turned tail right there, realizing this thing didn't have its head on straight (to use the technical term). However, by the time I'd realized this, I was committed---in the "deep muddy," as the old expression goes.

I battled this particular gotcha, one night (or weekend day and night) after the other, for *two weeks*. It was one demoralizing, fruitless, coding-while-searching-for-help session after another, as I wondered why I couldn't make this simple thing work despite all the instructions I'd read. Hey, I even went through the tutorials *for the third time* just to make sure I hadn't missed something.

Finally, on the *third* weekend, with my initial zeal for the switchover draining quickly along with my ability to sleep at night, I went to the [Gatsby subreddit](https://www.reddit.com/r/gatsbyjs/), [asking for help](https://www.reddit.com/r/gatsbyjs/comments/c9ufg1/graphql_sees_front_matter_item_featured_image/). I got some friendly responses but the first ones didn't do the trick. Then, [someone](https://reddit.com/user/quads_of_steel) [showed me](https://www.reddit.com/r/gatsbyjs/comments/c9ufg1/graphql_sees_front_matter_item_featured_image/et3o94l?utm_source=share&utm_medium=web2x) how to make Gatsby accept what I considered a reasonably **normal** image-files directory structure---by which I mean, one where you *don't* have the images in the same directory as the text content. *(Holy cow, do the Gatsby people really think putting images and text together in the same directory is, or should be, the norm?!?)*

The procedure that redditor /u/quads_of_steel gave me worked wonderfully; suddenly each post's featured image (in the case of this one, the Hugo logo up at the top of the page) appeared like magic. I was overjoyed. Maybe this was going to work after all.

So what's the problem, you ask? Well, this seemingly critical procedure absolutely *is not documented* on the Gatsby site, or [Stack Overflow](https://stackoverflow.com), or anywhere else I could find by Googling or [DuckDuckGo](https://duckduckgo.com)-ing my keyboard into overdrive.

Anyway, thinking I now was finally over the hump and could see the finish line up ahead, I kept plugging. As I now know, I was seeing an oasis that wasn't ever really there but, at the time, those distant, shimmering palm trees sure looked good after three weeks of trudging through the desert.

## Look, but don't touch?

The nights and weekends assumed a reasonably predictable pattern. Nearly every free moment when I wasn't at work, eating, or sleeping (fitfully), I was at my Mac, gradually adjusting files, templates, and code---and, all too often, finding that seemingly innocuous little changes, even if the instructions said they should be fine, crashed Gatsby and I had to enter `gatsby develop` yet again. (Thank goodness for [repeating commands](https://www.ostechnix.com/5-ways-repeat-last-command-linux/); it was a lot easier just to hit the `Up Arrow` key and `Return` than retyping `gatsby develop` innumerable times.)

But, by the end of the "long weekend" starting with the Fourth of July holiday, the new site on my local system closely resembled the Hugo site for the first time, thanks especially to that help from the ["kind stranger" on Reddit to whom, unfortunately, I had no gold to give](https://knowyourmeme.com/memes/edit-thanks-for-the-gold-kind-stranger). Fortunately, getting [SCSS/SASS](https://en.wikipedia.org/wiki/Sass_(stylesheet_language)) to work on the Gatsby site through the use of `gatsby-plugin-sass` had proved much easier than some of the other plugin-related tinkering, so for the most part I was able to use the SCSS from this site without any serious changes. That provided the look-and-feel of this site's header, footer, nav menu, columns, and so on.

In addition, the [*gatsby-remark-smartypants* plugin](https://www.gatsbyjs.org/packages/gatsby-remark-smartypants/) produced the typographical effects to which I'd become accustomed here on the Hugo site such as "smart" quotes and em- and en-dashes from `---` and `--` respectively. Wouldn't have considered doing it any other way.

Finally, my not-often-used-but-still-wanted [Talkyard](https://www.talkyard.io)-powered comments area on each post worked, because the [developer](https://twitter.com/kajmagnus3) wisely provided a [Gatsby way](https://gatsby-demo.talkyard.io/demo-and-installation/) of doing it just as he had a [Hugo way](https://hugo-demo.talkyard.io/posts/demo-and-instructions/) (not to mention a [Jekyll way](https://jekyll-demo.talkyard.io/2018/01/09/installation-instructions.html) and a [Hexo way](https://hexo-demo.talkyard.io/2018/01/04/demo-and-instructions/)). So that, too, was good to go.

Still, although I was pleased by the look-and-feel progress I'd made, I continued to find it difficult to make certain things work even when, and pardon me if this is sounding like the proverbial stuck record, I followed instructions to the Nth degree. I spent a good two nights just trying to get the posts list page to have the same setup as the [Hugo version](/posts) had at that time (two recent posts and their images at the top, followed by a text-only list of the others, as opposed to the paginated version I've since adopted). And even when it would work, it quite often would unaccountably throw Gatsby into a tailspin.

Late in the third week of this effort, even as I got those last few items working and seemed within another weekend (or two?) of being ready to pull the trigger on switching, the continuing instability of the setup worried me. I knew that Gatsby doesn't show the same errors in actual use as it does in development mode (as I believe is true for Hugo in server mode, locally), but nonetheless was increasingly uncertain the Gatsby version would be sufficiently solid. I didn't want people getting "white-screened" when they tried to go to my site. Hugo has been solid as a rock, and I could stomach no less from Gatsby.

## FUBARed footnotes

One other thing kept nagging at me, also: footnotes. Here on the Hugo site, as I [explained](/posts/2019/02/ia-for-io) back in February, I can type stuff like this:

```
This is how you do footnotes[^footnoteInfo] in 
Markdown and Hugo, even as you keep adding them, 
moving them around within the doc, *etc.*, and 
all of them end up perfectly numbered both at 
the original reference and down at the bottom.

[^footnoteInfo]: So here we are at the bottom.
``` 

.&nbsp;.&nbsp;. and it comes out like this (let's say that this footnote ends up being the third one in the document, no matter what it was at its original entry):

> This is how you do footnotes<sup class="teeny" style="color: #0000df;">3</sup> in Markdown and Hugo, even as you keep adding them, moving them around within the doc, <em>etc.</em>, and all of them end up perfectly numbered both at the original reference and down at the bottom.

Then, down at the bottom, you get something that looks kind of like this:

<p class="legal">3.&nbsp;&nbsp;So here we are at the bottom.<span class="teeny" style="color: #0000df;">↑</span></p>

For somebody like me who uses footnotes a lot and moves their origins' paragraphs around frequently during the editing process, that's a gotta-have. For Gatsby, there are a couple of plugins that purport to provide it, but I found neither to do the job *reliably*. The most widely used one would work *sometimes*, but then something else would cause a crash and, after the reboot, suddenly that same Markdown would produce this in the rendered page:

> This is how you do footnotes<sup class="teeny" style="color: #0000df;">footnoteInfo</sup> in Markdown and Hugo, even as you keep adding them, moving them around within the doc, <em>etc.</em>, and all of them end up perfectly numbered both at the original reference and down at the bottom.

Nope, nope, nope. Couldn't have that.

So what was the only thing that would keep them reliably numbered in the original locations? Why, doing it *manually*, that's what---meaning that I would give them only numerical "names" ("3" instead of "footnoteInfo" in this example) **and** would **manually** re-number the origins whenever I had to move them. The actual footnotes themselves at the bottom would be numbered correctly but wouldn't reflect whatever manual changes I'd had to make to their origins above.

Again: nope, nope, nope. (And it became a **double** "nope, nope, nope" when the footnotes capability got squirrelly and *didn't* number them correctly.)

At one point in this process late last week, I looked at myself in the mirror and said aloud with amazement in my voice, "I haven't had to do *manual* numbering of footnotes since I was using a *typewriter* back in the eighties. And I ain't starting back on it now. This is supposed to be an *improvement*, not a regression."

However, by this point, I was laboring under the predictable feeling of "Well, you've come this far, spent this much time, lost this many nights' and weekends' worth of free time and sleep, and built a whole new site. You can't quit on it now. Gatsby, or at least something like it, is the future. You have to go ahead and do this."

So, angst aside, I prepared to do so, hoping my fears wouldn't prove true.

Then came a turning point, when I decided I wanted to add the capability for one more thing I'd been reading about during the weeks of experimentation: [**MDX**](https://mdxjs.com).

## MDXit

If you're as unaware of MDX as I was before I started down this rabbit-hole, I'll summarize what it is and why I wanted it within my Gatsby site. First, though, I have to tell you about its reason for existing in the first place: [**JSX**](https://jsx.github.io).

One of the frankly cool things about Gatsby, like some of the other kewl-kid JavaScript-based SSGs[^whichOnesJSX] that I tried during these weeks, is the use of JavaScript XML (JSX) to create actions within web pages, some of which used to require server-side capabilities. In particular, JSX working with GraphQL queries makes possible many of the dynamic capabilities that these SSGs offer. JSX has its quirks and [it *really* doesn't like it when you put multiple JSX elements together without wrapping them in something](https://stackoverflow.com/questions/50565468/returning-multiple-elements-in-jsx), but it's quite powerful when it behaves.

[^whichOnesJSX]: In the original form of this post, I erroneously identified [Eleventy](https://11ty.dev) as one of the SSGs which can use JSX and MDX. While those have been [subjects](https://github.com/11ty/eleventy/issues/235) [of](https://github.com/11ty/eleventy/issues/117) [interest](https://github.com/11ty/eleventy/issues/636) in the Eleventy camp, they're not yet in the feature set as of the last time I updated this.

So that's JSX---and MDX is simply a form of Markdown that can accept JSX within its content and, when parsed by the right rendering engine, pass the JSX code over to the SSG for whatever the JSX is supposed to make happen. There's a lot more to it than that, but that's about the size of it, and that was enough to keep me interested.[^MDXHugo]

[^MDXHugo]: JSX isn't applicable to Hugo, of course, because it's Go-based rather than JS-based. However, Hugo allows (even requires, in some cases) the inclusion of certain Go-based code in Markdown as well as HTML templates, so perhaps you could say it was already in that ballpark some time ago.

I had no immediate need for MDX, but I figured down the line I would want to use it, perhaps even converting some or all of my existing .md files to .mdx files, and I didn't want to make the leap to Gatsby unless I was sure my site would handle MDX as well as it could Markdown. So, last Friday night, I added `gatsby-plugin-mdx` to the setup, fired up `gatsby-develop` for yet another time, and---it crashed big-time. I tried a few changes here and there that I'd read would help with it, and every time it crashed. Moreover, the crashes always came with the same message:

```js
UNHANDLED REJECTION unknown: Identifier '_frontmatter' has already been declared
```

Apparently, this had been the subject of an [issue](https://github.com/ChristopherBiscardi/gatsby-mdx/issues/354) with the plugin a few months back when it was still called `gatsby-mdx` and wasn't yet part of Gatsby core. The [author](https://github.com/ChristopherBiscardi) considered it resolved and closed the issue---yet, here I was having it again. (I [asked](https://github.com/ChristopherBiscardi/gatsby-mdx/issues/354#issuecomment-511081463) about what the fix is supposed to be. Still, I didn't really expect much attention to a comment on a closed issue; I just hoped maybe the author would get a notification and respond.)

So, closed on GitHub or not, it was still happening. And by this time I'd decided that, if I couldn't count on adding MDX to the site, this might just not be worth my while after all.

Far too late that Friday night, I finally went to bed but I made a decision:  in the morning, I would set up a second bare-bones starter site and add *only* the MDX capability to it, then see what happened. If that worked okay, I'd (gulp) rebuild the site yet again from the ground up, but this time with MDX-ness.

## "Fool. Only now, at the end&nbsp;.&nbsp;.&nbsp;."

Saturday morning arrived. I got up, went for a much-needed haircut (remember: I'd given several straight weekends to this, and that's my only time when I can go get the stuff trimmed), my thoughts thoroughly wrapped around MDX and Gatsby as I sat in the nice lady's barber chair.

Soon, I was back home and at the Mac. I once again installed the Gatsby default starter and confirmed it was running fine. Then I shut it down, added `gatsby-plugin-mdx` as per "Add MDX to an existing Gatsby site" in the [instructions](https://www.gatsbyjs.org/docs/mdx/getting-started), and started it back up. Okay, fine. Then I added to the mix a single barebones .mdx file---essentially, an .mdx version of the Markdown file that created [my first, short post from last September](/posts/2018/09/hardy-press-wp-ssg-with-twist). There was nothing hinky in it at all, just text and highly innocuous front matter.

Gatsby crashed, and with that same `Identifier '_frontmatter'` error.

I tried some other things. Sometimes it would work, sometimes it would crash. The setup, even at this elementary level compared to what I'd built over the preceding weeks, had no stability at all. And this was with only an extremely spare extra file. What would happen when I converted all my other posts to .mdx? I could only imagine.

But, before I was willing even to start on such an endeavor, I decided to make one simple test. I knew the aforementioned "smartypants" plugin was supposed to work with `gatsby-plugin-mdx` the same way it did with the plugin that handled "vanilla" Markdown, so I shut down Gatsby and went through the steps of setting up that plugin. Then I restarted.

It didn't crash. But that plugin didn't work. And, where type is concerned, I wasn't about to settle for less than what I had *out of the box* with Hugo.

So, while you may think, "Gee, *that's* a weird reason for him finally to pull the plug," and you may be right, that's exactly what proved to be the final straw. I had given it my best shot, and it just wasn't there.

It wasn't worth it.

Early that afternoon, my mind finally at rest about it all, I tweeted:[^BEP]

[^BEP]: I confess to being extremely pleased that, later that afternoon, none other than [@bepsays](https://twitter.com/bepsays) himself (Bjørn Erik Pedersen, the lead developer of Hugo) "liked" that tweet.

> Will have more to say about this in a future post, but am keeping brycewray.com firmly within <a href="https://twitter.com/GoHugoIO?ref_src=twsrc%5Etfw">@GoHugoIO</a> after three weekends’ worth of experimentation with <a href="https://twitter.com/gatsbyjs?ref_src=twsrc%5Etfw">@gatsbyjs</a> and some other kewl kids. #StayWithTheBest---[Bryce Wray (@BryceWrayTX) July 13, 2019](https://twitter.com/BryceWrayTX/status/1150104013871955971?ref_src=twsrc%5Etfw)[^privacy]

[^privacy]: The embedded tweet that formerly was in this spot on the page is now just linked and identified, due to the site's belatedly adopted [privacy policy](/privacy). 

## "Interesting," indeed

Maybe people are right and the JavaScript-based SSGs really are the future. Well, if so, I fear it's gonna be a pretty messed-up future.

At the very least, the extraordinarily bright people behind them all had better hire some real technical writers and make their documentation correct---and for *everybody* they want to use it, not just people like themselves who spend a hundred-plus hours a week on [whatever is the latest coolness in the JS world](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f) (and that link is from three years ago, so one can only guess how much more convoluted it is now).

This is particularly true for the Gatsby people. Unlike most of the other SSGs, they have a [VC-backed business](https://www.gatsbyjs.com) that is aimed at getting Gatsby adopted by enterprises. I've read that they're succeeding. Good for them. But it's not hard to guess there's a ton of difference between the attention to detail those paying dot-com version customers get and what ordinary dot-org version users can expect. That's not exactly the vision I think we've all had about SSGs over the last few years.

Then they all need to think about the dicey interaction between all the dependencies and frameworks and other stuff on which their products rely. It's like trying to balance a chair by one leg poised on a tightrope. One little breeze and, **crash**. No, thank you.

If their response is, "Yeah, but you just need to know [$frameworkOne] and [$frameworkTwo] and [$languageVariantOne] and [$languageVariantTwo], and have a [$languageVariantThree] guy on your payroll, and put all your files into this one Magic Directory, and hold your mouth right---and then it'll work ninety percent of the time": again I say, no, thank you.

Although it's apparently a [myth](https://en.wikipedia.org/wiki/May_you_live_in_interesting_times), we've all heard that there was an old Chinese curse, "May you live in interesting times." You may be certain that what I just endured on this front was pretty blamed  "interesting." On the other hand, to invoke another old saying, "That which doesn't kill you makes you stronger."[^tome]

[^tome]: Is that also true for people who read through windy things like this to the end? For your sake, I gratefully hope so.

By that measure, I should be pumping iron now.

But I'm just happy I did, indeed, "#StayWithTheBest." Hugo's rock-solid, one-executable model is the gold standard for SSGs. Of that, I am now thoroughly convinced.