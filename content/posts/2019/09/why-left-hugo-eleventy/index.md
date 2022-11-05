---
title: "Why I left Hugo for Eleventy"
description: "Only weeks after telling you I was sticking with Hugo, I switch to Eleventy: the whys and wherefores."
author: Bryce Wray
date: 2019-09-08T10:00:00-05:00
oldComments: |
    <div class="container-oldComments">
      <p class="commentDisclaimer">
        <em>(Older comments imported from previous comments host, <a href="https://www.talkyard.io" rel="noopener">Talkyard</a>.)</em>
      </p>
      <p class="commentName"><strong>Chris Rosser</strong> <span class="commentName"><em>2019-09-08</em></span></p>
      <p class="comment">Great post and very interesting. I hadn't heard of Eleventy before. That's one thing I love about using a static-site generator is how easy it is to change should you need to. I used several before I settled on Pelican. I briefly thought about changing to Hugo, but decided it against it once I read the docs.</p>

      <p class="commentName"><strong>Bryce Wray</strong> <span class="commentName"><em>2019-09-09</em></span></p>
      <p class="comment">Thank you. Yes, until Gatsby Experiment I, I&rsquo;d never heard of it, either, and at first I erroneously lumped it in with the others as not quite sufficient for my needs. Once I read its docs more thoroughly and got a better grasp of its extensibility, I realized I&rsquo;d missed the point entirely &mdash; as at least one triumphant Eleventy supporter reminded me yesterday after I released this post. :-)</p>

      <p class="commentName"><strong>Magnus Lindberg</strong> <span class="commentName"><em>2019-09-30</em></span></p>
      <p class="comment">Thanks for this writeup about 11ty :- ) I'm about to create a blog for Talkyard, ... and found your article about 11ty when searching for 11ty versus Gatsby. To me, Gatsby is ... complicated. And with cryptic error messages that make my blood pressure rise. <span class="seventyFive">(Maybe I'll want to use Gatsby for the main website, some time later, which might need complicated sliders and buttons and widgets, hmm.)</span></p>
      <p class="comment">Nice to read that 11ty seems to be as simple as I originally expected all static gens to be :- )<br />
      (I noticed you've since switched back to Hugo, however, for me, probably 11ty is better &mdash; I think I'll need Javascript plugins.)</p>
      <p class="comment">Going to try this theme: <a href="https://hylia.website/posts/a-simple-post/" rel="noopener">https://hylia.website/posts/a-simple-post/</a></p>

      <p class="commentName"><strong>Bryce Wray</strong> <span class="commentName"><em>2019-09-30</em></span></p>
      <p class="comment">My continuing experimentation <strong>in the background</strong> (!) makes it increasingly clear that Gatsby is only for those who are thoroughly into React. Maybe someday I&rsquo;ll get it, but I&rsquo;m not holding my breath. But, yes, if your purposes are better served by a JS-based SSG, I emphatically recommend Eleventy. It is wonderfully easy to use and customize, especially if you have sufficient JS knowledge, and its build speed is surprisingly close to Hugo&rsquo;s, especially in league with Netlify.</p>
    </div>
---

{{% disclaimer %}}

Recently, I edited this site's footer. Where it used to say that this site is powered by Hugo --- *i.e.*, the [Hugo](https://gohugo.io) [static site generator](https://staticgen.org) (SSG) --- it now says it's powered by [the JAMstack](https://jamstack.org).

If you know what the JAMstack is (if you don't, follow that link above for a much better explanation than I could give), that's probably no big deal to you --- perhaps just an alternative choice of words, right? After all, Hugo is often mentioned as part of the movement toward the JAMstack.[^HugoJAM]

[^HugoJAM]: Hugo is powered by [Go](https://go.dev), not JavaScript --- the *J* in the term *JAMstack* --- but is considered to be an example of the JAMstack because it is one of the apps that makes possible static sites whose dynamic features gain speed and lose latency by relying on client-side, JavaScript-enabled functionality rather than "heavier," slower operations on a server.

But there was more to it. Things were afoot. Now, you get to find out just what they were.

The fact is: this site, about to enter its second year of life, now comes to you via a different SSG --- one also born in 2018, called [Eleventy](https://11ty.dev).

Yep, that's what I said. Eleventy. Not Hugo any more.

Those of you who've been visiting this site for a while, and certainly over the last two-and-a-half months, are certainly entitled to a moment's worth of *"Whiskey Tango Foxtrot?!?”* as a result of that statement. (The rest probably couldn't care less.)

Nonetheless, I do owe you an explanation, so please return with me now to those thrilling days of yestermonth&nbsp;.&nbsp;.&nbsp;.

## An annoying whisper

Earlier in the summer, I experimented with switching this site to  [Gatsby](https://gatsbyjs.org), then dropped the effort in favor of [keeping this site on Hugo](/posts/2019/07/why-staying-with-hugo/). I then made some [pointed observations about the problems with SSGs](/posts/2019/07/lessons-learned/).

That little episode had a couple of unexpected results.

First, I got a big spike in readership for that first post about it, courtesy of a retweet from the [Hugo account](https://twitter.com/gohugoio). I remain tremendously grateful for both of those --- although what I'm explaining herein likely will obviate the goodwill I received as a result, and I totally understand that.

Second, not long after I dragged my bleeding carcass away from attempting to use Gatsby without sufficient familiarity with its [React](https://reactjs.org) framework, my initial sense of relief gave way to a distinct and annoying whisper in my ear:

*“Beat you, old man. Heh, heh.”*

It wasn't so much that I felt Gatsby and its adherents had beaten me. It was more that I felt I'd been laid low by the newer generation of mostly JavaScript-based SSGs in general.

[You may recall](/posts/2019/07/why-staying-with-hugo/) that at least part of my interest in Gatsby in particular, and the new-gen SSGs in general, was because I wanted to amplify my coding chops --- especially  since working with this strain of SSGs was more likely to yield real-world experience I could use either on the current job or the next one.

Coding chops? Hah. Instead, it felt as if I were limping away while barely retaining my mouth's choppers.

Nonetheless, I brooded over this for a few weeks until, a couple of weekends ago, I decided to take another stab at Gatsby.

***Narrator**: "But would he emerge alive?”*

## Second time's not a charm

I didn't need three weeks this time, as I did the first iteration, to decide it was a bad idea. After all, it had been fewer than two months since that initial attempt, so I still retained a lot of what I'd learned and, thus, avoided repeating some mistakes.

Oh, and remember what I said about struggling to figure out how to get images to appear and, once I was [given a solution on Reddit](https://www.reddit.com/r/gatsbyjs/comments/c9ufg1/graphql_sees_front_matter_item_featured_image/), was certain it wasn't documented in the Gatsby site? Well, I was wrong. It's there. It's just given the bum's rush as an "edge case," an "escape hatch," as one of "a number of less common cases." But  [the docs do say](https://www.gatsbyjs.org/docs/static-folder) that one of those "less common cases" is, indeed, when:

> You have thousands of images and need to dynamically reference their paths.[^imageCount]

[^imageCount]: No, I don't yet have thousands of images in this site,  but I already have ’waaay too many to handle via the tedious, "one-off"-ish Gatsby process, and the number will only grow.

"Edge case," my big, fat heinie. As if I were actually going to do an *individual* importation of *each image*, which is the [Gatsby way](https://www.gatsbyjs.org/docs/importing-assets-into-files/), rather than make calls from templates to automate the process from front matter, *which is the frickin'* ***SSG way!***

Anyway, much as I'd done in early July, I got the Gatsby site tantalizingly *close* to what I already had on the Hugo site, but kept running into odd glitches despite my close adherence to instructions from both the documentation and numerous tutorials. I won't bore you with the details as I did the last time. The sequence was different (although I did have more success this time with [MDX](https://mdxjs.com) files) but the overall results, and determination therefrom, were the same.

So, six days into Gatsby Experiment II, I abandoned it.

Again, I heard that whispering, snickering voice:

*“Beat you **again**.”*

But this time, I didn't just slink off, happy to have retained my sanity if not my dignity. This time, I had a response.

“No. **I** ***rejected*** **you**.

“And now I'm going to prove that *you*, **not** I, are the problem.

"I'm going to pick the ‘new’ SSG I should've picked the first time."

## Cast your bets

My objective remained the same as before: pick a new-gen SSG and *learn*. Once I clearly realized a pairing with Gatsby wasn't for me, my research narrowed it down to two remaining contenders from among [the oodles out there](https://staticgen.com).

[Gridsome](https://gridsome.org) is often described as "the Gatsby of [Vue](https://vuejs.org)," in that it's as tied to the Vue framework as Gatsby is to React. The similarities were too much for me ever to give it much consideration, especially since I kept reading that you needed at least as much Vue knowledge (none of which I have) for a good experience with Gridsome as you do React knowledge (ditto, essentially) with Gatsby. Nope. Wasn't going there, again.

That left Eleventy.

First hearing about it during Gatsby Experiment I, I'd been singularly impressed by how its creator, [Zach Leatherman](https://www.zachleat.com/), positioned it when he [introduced](https://www.zachleat.com/web/introducing-eleventy/) it in early 2018:

- It **does** "bet on JavaScript," which I believe is going to be a pretty *safe* "bet" for some time to come.
.&nbsp;.&nbsp;. and yet .&nbsp;.&nbsp;.

- It **doesn't** rely on a specific framework.

That last part rang especially true to me because, simply put, [frameworks come and go](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f). What are the framework-centric SSGs --- and the sites built on them --- going to do when those frameworks suffer their inevitable replacement by The Next Kewl Thing?

But the part that grabbed me more than anything else, and was indeed that "breath of fresh air" I'd [originally hoped Gatsby would be for me](/posts/2019/07/why-staying-with-hugo/), was Eleventy's amazing flexibility. Not only does it you let choose from among multiple templating languages, but it also gives you lots of freedom in choosing the directory structure of the hosting repo and, in the end, the site that will go on the web.

In short: within reasonable limits, Eleventy lets you build the site in a way with which **you** are comfortable.

SSGs like Gatsby and Gridsome are ultra-"opinionated." They say to you, "You will do it our way, by God, and you will like it. Those are *orders*."

Eleventy says, "I have some ideas but, in the end, how would *you* like to do it?"

Deal. Done.

If I were going to leave the comfortable confines of Hugo, it would be for Eleventy. (More about that later, under "Eleventy's advantages.”)

However, of course, it wasn't quite that simple.

## Substituting for Hugo

As I explained back in July, Hugo comes loaded with functionality out of the box, especially since it's several years older than the New Kewl Kids. And let me say this quite simply: **I STILL recommend Hugo to less "tech-savvy" users**. There's no such thing as an SSG that "just works" --- and may never be --- but Hugo comes about as close for "normal" people as anything can right now.

Also, **no SSG can build a site faster than Hugo can**. It's still the undisputed champ there. Fortunately, my site isn't all that big and I don't build it that often, so that doesn't faze me; but anyone who wants to maintain a lot of often-changed content on an SSG is asking for trouble on anything other than Hugo. (However, Eleventy is getting there; keep reading.)

That said, I wanted to learn new stuff, so I moved on.

Yet, *because* of the Hugo built-ins to which I'd become accustomed, using Eleventy meant I'd have to do one of two things: (a.) give up stuff I didn't want to lose; or (b.) learn ways to add those features to my new choice.

Again, we're *learning*, here, so (b.) was the obvious selection.

So how did I make up for what Hugo does from the moment you install it? Let me explain by covering my two "must-haves": typography and [SCSS/Sass](https://sass-lang.com).

### Definitely my type

#### Hugo

Hugo uses the [Blackfriday Markdown processor](https://github.com/russross/blackfriday) and the [Chroma syntax highlighter](https://github.com/alecthomas/chroma) to provide "smart" typography (curly quotation marks as well as em and en dashes), proper handling of footnotes, and appropriate formatting of code blocks.

#### Eleventy

Eleventy works with plugins, including [Markdown-it plugins](https://www.npmjs.com/search?q=keywords:markdown-it-plugin), to do these things. In my site's case, I'm using `eleventy-plugin-syntax-highlight`, `markdown-it`, `markdown-it-prism` (to use [PrismJS](https://prismjs.com)), and `markdown-it-footnote`.

I had a few (mostly self-inflicted) difficulties getting them going but the results, as you can see here and elsewhere in this site, were worth it. (Truth be known, I actually prefer how PrismJS handles code blocks over how Chroma does it in Hugo.)

In the case of Gatsby, I'd managed to get the "smart" typography and, usually, good code block formatting --- but automated footnotes were glitchy and often nonfunctional (as I [previously explained](/posts/2019/07/why-staying-with-hugo/)).

And speaking of Gatsby: while you can go through many levels of hell trying to get plugins *not* to FUBAR each other with Gatsby, installing and using plugins with Eleventy is ’waaaaay easier and more stable.

### Sassy stuff

#### Hugo

To enable the flexibility of SCSS/Sass, Hugo has [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/) for asset-processing --- in this case, transforming one or more SCSS/Sass files on the fly while you're developing with `hugo server`.

#### Eleventy

With Eleventy, I installed the [node-sass](https://www.npmjs.com/package/node-sass) library and then set up [Gulp](https://gulpjs.com) to handle processing the SCSS/Sass files.

Running Gulp with the settings in my repo's `gulpfile.js` file does this processing and watches constantly for changes, any of which will trigger a new processing run.

But that's not all that this particular `gulpfile.js` file does for me. It also:

- Deletes the *previous* build --- the "_site" folder --- on each run to ensure that I'm looking at the latest-and-greatest.

- Runs the necessary Eleventy CLI command to start up the Eleventy dev build/server process in "quiet" mode so messages aren't so frequent.

**In short, all I have to do is enter** `gulp build` **at the command line and I'm off to the races.** Gotta love it.[^gulpLearn]

[^gulpLearn]: I'd long wanted to learn about Gulp since I kept reading one article after another talking about its usefulness, so this was a happy coincidence for me.

## Eleventy's *advantages*

Now that I've explained some of what I had to do in Eleventy so I wouldn't miss Hugo too badly, let me finish telling you the other side: what I like *better* about Eleventy. Some of this will be a little repetitive of what I said above, but I wanted it all in one place.

### It's reasonably easy to customize

If you're gonna have to customize, which you do for *any* SSG (even Hugo, although not nearly as much), it's best that it not be an awful pain. Eleventy is anything but.

I chose to use [Nunjucks](https://mozilla.github.io/nunjucks/) for my Eleventy templates, as do many Eleventy users since that seems to be the preference of Zach Leatherman himself, and have found it considerably easier to read, write, and understand than similar templating based on the Go that undergirds Hugo.[^moreComing]

[^moreComing]: Details to come in a future post, after I've had more time to play with Eleventy --- especially in view of some major look-and-feel changes I'm considering that would be easier thanks to this transition. (The operative word there is *considering*.)

Also: while I'm mostly talking Eleventy *vs.* Hugo here, let me get in a particular Eleventy *vs.* Gatsby dig. It is **vastly** easier to do, say, a list of your site's posts in Eleventy (through its [collections](https://www.11ty.dev/docs/collections/) feature) than via the impressive-but-finicky [GraphQL](https://www.gatsbyjs.org/docs/graphql/) in Gatsby (and [Gridsome](https://gridsome.org/docs/querying-data), for that matter).[^graphqlExpII]

[^graphqlExpII]: Indeed, the Straw That Broke the Camel's Back for Gatsby Experiment II was when I couldn't *reliably* make GraphQL "see" each post's featured image *as* an image rather than a string, no matter how many ways I tried or how many tutorials I followed slavishly over a week's time. And only if you *can* get GraphQL to "see" an image can you make Gatsby apply all the admittedly cool features available through [Gatsby Image](https://www.gatsbyjs.org/docs/using-gatsby-image/), so that's where I drew the line the second and final time around with Gatsby.

Mind you, the Eleventy [documentation](https://www.11ty.dev/docs/) (although quite good, please understand) could stand to assume a little less knowledge on the part of its potential users, as [I've mentioned](/posts/2019/07/lessons-learned) is true for all SSGs in general; but Leatherman at least includes [links to quite a few Eleventy sites and, where possible, sample source code](https://www.11ty.dev/docs/sites/). Every time I got stuck, I spent some time poring through others’code and, sooner or later, found an answer to a question. (To be fair, the Hugo team [does this, too](https://gohugo.io/showcase/).)

### It's far more robust than Gatsby

Having watched Gatsby crash and crash and crash while I was doing only  very innocent little things like file moves or *legitimate* edits to Markdown or code, I was pleasantly surprised by how hard it is to crash this much younger, much earlier-in-its-dev-life SSG during site development. *Can* you crash it? Oh, yeah. Big-time. But, when you do, its error messages --- at least, in my opinion as a non-expert in JavaScript and its hangers-on --- have so far been sufficiently readable that I could resolve issues. That definitely [was not](/posts/2019/07/why-staying-with-hugo/) the case with Gatsby.

I am sure that Gatsby and React adherents will hee-haw at the thought that little Eleventy is tougher than their SSG; but, in my perhaps atypical experience, it is exactly that. For someone with sharply limited  free time to fool with this stuff, having an SSG that can take a few shots of [PEBKAC](https://www.computerhope.com/jargon/p/pebkac.htm) and still (usually) hang in there is invaluable.

### It's pretty fast

It doesn't build a site as quickly as Hugo --- nothing beats Hugo on that score --- but Eleventy's build times are impressive enough for me, and I expect this aspect will improve in time, [much as it did for Gatsby in going from v1 to v2](https://www.gatsbyjs.org/blog/2018-09-17-gatsby-v2/).

While we're on the subject of speed: while I was working on this post, I saw this Leatherman tweet:

{{< stweet-simple user="zachleat" id="1169998370041208832" >}}

React. Hmm. Wonder whom he might be zinging there? Good job, sir. Given the Gatsby team's continual boasting about how they can handle massive amounts of data with ease, I hope you're making them sweat, even if just a little.

## The way forward

Although I've made this transition, the learning experience it made possible will continue. Otherwise, there was no point *to* the transition.

I fully intend to stay current with *both* of what I now believe are the two best SSGs out there, and thus will still keep one toe in the Hugo waters, too. I'm still building the site on both Eleventy and Hugo on my local Mac and then pushing to their respective repositories on Bitbucket, GitHub, and GitLab. From there, I trigger the build at Netlify from whichever repo is appropriate. Right now, that would be the Bitbucket version of what I call `eleventy_site_css-grid`.[^bitToGit]

[^bitToGit]: Another transition may be in the works on that front, too; since back before Gatsby Experiment I, I've been considering switching the web's "source of truth" for this site to either GitHub or GitLab. I can see good arguments for each, as well as for just sticking with Bitbucket, so this call remains in the air.

Indeed, one part of the transition was to convert all my Hugo site's Markdown files so each file's front matter for each SSG's repo was interchangeable with its counterpart on the other SSG's repo. That saves some steps. There are still some things in some posts’ main content that require specific handling for each SSG --- especially when body-content images or code blocks are involved --- but the posts’ front matter and purely textual parts of their body copy are now totally portable.

To put it another way: if, somewhere down the line, I decide I'd rather switch back to Hugo, I will be able to do so without a great deal of angst.

.&nbsp;.&nbsp;. except for worrying about making you [further](/posts/2018/11/grid-locked-no-more/) [doubt](/posts/2019/05/boxed-in/) [my](/posts/2019/06/ahoy-mate/) [ability](/posts/2019/07/why-staying-with-hugo/) to stick with anything, that is.
