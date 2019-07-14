---

title: Why I’m staying with Hugo

subtitle: An “interesting” learning experience

description: After experimenting for two weeks with GatsbyJS and a few other trendy SSGs, I realize just how good I have it with Hugo.

author: Bryce Wray

date: 2019-07-13T10:38:00-05:00

#final_date: 2019-07-20T09:00:00-05:00

#lastmod: DATE

draft: true

actual_path: /content/posts/2019/07/why-staying-with-hugo

final_url: posts/2019/07/why-staying-with-hugo

discussionId: "2019-07-why-staying-with-hugo"

featured_image: images/hugo-logo-more-white-space.svg

featured_image_alt: Logo for the Hugo static site generator.

featured_image_caption: "Image: Hugo logo by Steve Francia, sourced from gohugo.io."

---

If you've been sufficiently masochistic to read through most of my other [posts](/posts) up to this point, it's probably become pretty clear---and I've even said as much---that I tend to have a problem avoiding New Shiny Things where tech is concerned.

I put this site online last September, after several weeks of examining the [static site generator](https://www.staticgen.com) (SSG) scene and picking [Hugo](https://gohugo.io) as the best-suited among them for my purposes. But, almost from the get-go, I kept hearing quite a bit about some other up-and-coming SSGs, and remained curious.

In the three weeks before this post, including the four-day "weekend" that I had for the Fourth of July, I spent many hours on a single-minded task: converting this site from Hugo to what seems to be the "hottest" of the Other Guys, an SSG called [GatsbyJS](https://www.gatsbyjs.org) that's based on the [React](https://reactjs.org) JavaScript framework.

Why I was willing to make such a switch in the first place---and why I ultimately chose not to go through with it---is the story I'm here to tell you today, friends and neighbors. This'll be a long one, but one which I hope will help others with similarly curious streaks avoid some of what I just endured.

***Disclaimer:*** *As always, I claim no expertise on the subjects of today's little discourse. I am simply stating opinion; I am just telling you what happened to me. There are many thousands of Web developers who find GatsbyJS a delight, a game-changer, a breath of fresh air. Indeed, I had fully expected to be among their ranks before this was over. All I'm doing here is explaining why that didn't happen. If the GatsbyJS fans want to say it's because I'm too dumb to "get" GatsbyJS and/or React, that's perfectly fine. An overabundance of brainpower I do not have, and I know that. An overabundance of JavaScript knowledge, much less knowledge of React, I* ***absolutely*** *do not have nor I ever claimed to have it. (However, the same is true for my knowledge of Hugo and its parent language---[Go](https://golang.org), sometimes [erroneously](https://golang.org/doc/faq#go_or_golang) called "Golang"---and yet I manage to use it without incident, for the most part, which is more than I can say about GatsbyJS and React.)*

With that said, moving right along&nbsp;.&nbsp;.&nbsp;.

## A taste of&nbsp;.&nbsp;.&nbsp;. something

My first true interaction with GatsbyJS came, in fact, only a few weeks after this site hit the Web. While I was between Day Jobs, I came into contact with a fellow who, while he didn't have a full-time job to give, nonetheless consulted me for help with his new e-commerce site which, at the time, was WordPress-based and 'waaaaay too slow as a result. Because what the site was selling was a technology designed to fetch and display many thousands of "store goods" virtually instantaneously, he obviously couldn't have a slow site. It'd have been like trying to sell rides in a Lamborghini being towed by a [Pinto](https://en.wikipedia.org/wiki/Ford_Pinto).

With my then-recent research on SSGs, I suggested one of them might be his answer: tremendous speed, no WordPress performance hits, and plenty of New Shiny (well, okay, I didn't put it that way). Since I knew Hugo best from among the ones I'd studied, I recommended it. He liked what he read about it, but noticed its [docs](https://gohugo.io/documentation/) lacked any mention of being able to grab vast amounts of data from other sources quickly, which was utterly necessary for his purposes.

I checked the SSG field again and GatsbyJS, with its [GraphQL](https://graphql.org)-fueled data powers, sounded like what he needed. Of course, I told him, I needed to check it out myself first, so I dutifully went through the [GatsbyJS tutorials](https://www.gatsbyjs.org/tutorial/), and was sufficiently impressed as to recommend he let me set him up with a GatsbyJS site.[^demur]

[^demur]: He demurred after, as I recall, doing a Web search and finding some reports about some limits on what the then-v.1.0 GatsbyJS could do in his particular kind of use case.

Boy, howdy, did I dodge a bullet when he declined. Only now do I know that.

You see, what I **didn't** do back then was deviate from those tutorials and set up my own GatsbyJS site; all I saw at the time was the carefully charted path laid out in the tutorials. As you can well guess, tey make it seem that, if you just follow the instructions, you'll have a GatsbyJS site up, running, and data-gulping faster than you can say, "F. Scott Fitzgerald."[^Leo]

[^Leo]: Or "[Leonardo DiCaprio](https://www.imdb.com/title/tt1343092/?ref_=fn_al_tt_3)" or even "[Robert Redford](https://www.imdb.com/title/tt0071577/?ref_=fn_al_tt_4)," if you're so inclined.

***Disclaimer echo:*** *Some can. As I'll make clear, I couldn't---at least, not beyond the tiny confines of the "starter" site that you get by default with the* ```gatsby new``` *command.*

## Scratching the itch

Fast forward to a month ago. In the Day Job, I was spending many hours on a particular project that was replete with JavaScript.

You have to understand that, as an Old Web Guy<span style="vertical-align: top; line-height: -0.01; font-size: 60%;">&trade;</span>, I earned my Web site dev chops in the era when today's top devs, the ones building all the JS-powered SSGs, were still in middle school. Back then, [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript) had [fallen into disrepute](https://crockford.com/javascript/javascript.html) except for [those things which utterly had to be done client-side](https://en.wikipedia.org/wiki/Ajax_%28programming%29), server-side languages (like [PHP](https://www.php.net)) were all that really mattered, and too many browsers didn't handle JavaScript correctly (or, as in the case of the company for which I worked back then, too many customers had it turned off by default for me to count on its utility).

Yes, I knew [things had changed](https://medium.com/@alexbeletsky/renaissance-of-javascript-485118447cf9) for JavaScript since then, especially since [2015](https://ecma-international.org/ecma-262/6.0/) or so, but I just didn't care. Besides, I usually had other ways to do JS-like things, especially once I was tasked with maintaining CMS-based sites, so until this latest project I maintained that standoffishness toward JS.

As a result, I went into this JS-intensive project not knowing that much about the language, and would agree with anyone who watched me code during this project that I still don't; but, at least, I *was* becoming more comfortable with it, gradually understanding it better, as the long days (and some nights) of coding passed.[^EJS]

[^EJS]: I must credit, in part, the wonderful [Eloquent JavaScript](https://eloquentjavascript.net) for some of this. What a wonderful site that is for JS noobs.

With that increasing comfort with JS, I began thinking, and reading, about GatsbyJS once again. Once the Day Job coding for that project became a little less intense (for a while) and I once again had some spare brain cells during nights and weekends, I got it in my head that, perhaps now, I should give GatsbyJS a shot---and not simply as a trial, but to replace this Hugo-based site you're viewing now.

## Polishing up the ol' résumé?

After what by then was a nine-month stretch with Hugo on this site and relatively smooth operation thereof, why was I willing to switch the site from Hugo to GatsbyJS? It came down to these two interconnected things:

- After how unexpectedly my two previous Day Jobs ceased to exist and I found myself out there competing with people less than half my age for tech jobs, I believed I needed to make myself more sellable, in case the current Day Job also goes away.[^coding] I can't turn back the clock and be in my twenties or thirties again, but, I felt, I *can* demonstrate my ability to learn new things quickly. What better way could I do that than by transforming my most public presence---this Web site---from a Go-based platform to one that is based on ReactJS, one of the [most-sought programming languages in the job market](https://www.codeinwp.com/blog/angular-vs-vue-vs-react/)?
- Hand in hand with that concern was my feeling that my work in Hugo with Go hadn't taught me enough about any language, much less the [relatively less popular](https://hackr.io/blog/best-programming-languages-to-learn-2019-jobs-future) Go, to make it worthwhile from the perspective of a potential employer.

[^coding]: I have a very patient and understanding boss, or that probably would've happened already. He's the smartest supervisor I've ever had (and be assured, I've had some incredibly bright ones), and can write more JS or PHP code off the top of his head in a few minutes---without bugs---than I can do in an hour or two with one eye on answers from [Stack Overflow](https://stackoverflow.com) and the like. The only reason he *doesn't* do it himself and save the time is, well, he's a C-level guy with bigger things to handle so that's what he has me there for. So far. *(And, no, to my knowledge he doesn't even know this site exists, so I'm not sucking up to him with that statement. Full disclosure, that's all.)*

So, with those thoughts swirling in my already overheated brain, one weekend I went back to the GatsbyJS site and, having slept since then, went through the same tutorials as last fall (although, since then, GatsbyJS v.2 has been released, so I'm sure they're different now). But, this time, I followed that up with starting a new local Gatsby site, fully intent on replacing this site with it.

Just a word about that, by the way: as I [explained previously](/posts/2019/04/publish-or-perish), the way I publish this site to my chosen host, [Netlify](https://www.netlify.com), is to point Netlify to a [Git](https://git-scm.com) [repository](https://www.sbf5.com/~cduan/technical/git/git-1.shtml), or "repo," out on the Web---in my case, with [Bitbucket](https://bitbucket.org). That then would've made it a piece of cake to switch the actual online site from Hugo to GatsbyJS: I'd simply have pointed Netlify to a different repo, one in which the shiny, new GatsbyJS version would be waiting.

I just had to build the thing first.

## This ain't Tao

That first weekend, I ran into problems early.

Mind you, the [default GatsbyJS starter](https://gatsby-starter-default-demo.netlify.com/) definitely ran okay on my local setup---at least, until I tried to add my *own* content to it.

I quickly learned that the GatsbyJS [documentation](https://www.gatsbyjs.org/docs/), obviously and understandably written by people who've already Been There and Done That, wasn't exactly planned for someone who wanted to do what I was attempting.

Maybe I need to explain that first. And, to do so, let me explain how I've been building Web sites since most of the GatsbyJS team was in diapers. You have a structure. This structure has directories---folders, if you prefer---with clearly delineated purposes. It usually ends up like this:

```text

[home directory]

index.* [home page, usually either .html or .php]

--- images
--- downloadables
--- about
------ index.*
```
    



## Mirage

[How it became clear that instructions != The Way.]

Now, a little story. Back in my halcyon high school days before the invention of the light bulb, I took a bookkeeping class. The teacher told us on the first day or so that there was a special bookkeeping joke she was going to tell us, but that we couldn't hear it *until* we'd been through just about the whole year. Why? Because we wouldn't get it.

So, we got to near the end of the school year and, after we'd asked her for the umpeenth time to tell us the joke for the luvva Mike, she finally did. It went something like this (and you have to keep in mind that this was back before personal computers, Excel, and a jillion other things on which today's bookkeepers rely):

> There was an old man who worked in the local bank as a bookkeeper. Every morning, he would arrive at his desk, sit down, open up a desk drawer, look inside it, then nod, mumble to himself, and go about his work.
> 
> The others in the office wondered what he was doing, but never got around to asking him, and they were too polite to peek into his desk. So his secret stayed with him for years.
> 
> Finally, the day for his retirement came.
>
>As soon as he'd left the building with his gold watch, "Happy Retirement" cake, and other parting gifts, the others eagerly ran for his desk and opened the drawer, hoping he'd left behind whatever he'd consulted every morning all those years.
> 
> Sure enough, he had. 
>
> It was a simple sheet of paper with these words in great, big letters:
> 
> &nbsp;&nbsp;&nbsp;&nbsp;*DEBIT ON THE LEFT --- CREDIT ON THE RIGHT*

Now, if you'd just been through a bookkeeping course in the early 1970s, trust me: that's a knee-slapper. Because that's about *the* most basic thing about old-style bookkeeping.[^debit]

[^debit]: Whether it's true in our age of thoroughly paperless bookkeeping, I don't know. I took that course only because I needed the credits and somebody told me it would be a good course in case I ever needed it for business purposes later on in life; in fact, I never touched actual bookkeeping again.

Body text T/K. Things to include, not necessarily in this order:

- Supposedly(?) an old Chinese curse, "May you live in interesting times" (otherwise, subtitle---especially with quotation marks---is meaningless).
- "Geek's curiosity"---as well as worries about a need to stay current---led me to check out the trendier JS-based SSGs, particularly GatsbyJS. [Perhaps some convo re PWAs, SPAs, Hugo's being a Golang-powered app, etc.]
- Spent much of my free time (including too many late nights and early mornings) over three weeks trying to learn to love GatsbyJS and its ways.
- JSX.
- Dependencies hell vs. Hugo's single-executable goodness.
- Weird file structure conventions (especially re images---story of the helpful guy from Reddit, [/u/quads_of_steel](https://reddit.com/user/quads_of_steel)), who [showed me](https://www.reddit.com/r/gatsbyjs/comments/c9ufg1/graphql_sees_front_matter_item_featured_image/) how to use a **normal** image-files directory structure with GatsbyJS's weirdness. Which was especially necessary because of...
- Inadequate documentation on GatsbyJS's part. Veers from "Well, if you're nervous about CLIs, don't worry"-smarminess to "Now, you need to load *this* and *that* and hope to God it all works without blowing the **** up."
- Crashes. Oh, God, the crashes. And the often inscrutable error messages.
- Typography; footnotes; , just when I *thought* I had all those licked, MDX.
- Decided, finally, that **I already had the best and should stick with it**.
- Did learn a few things---e.g., description rather than (excerpted) summary in posts list and home page's top-two-posts segment; VS Code is even cooler than I thought, especially with extensions; iTerm2; (maybe, although this is getting into seriously inside baseball) front matter consistency.

[Perhaps a side note, a la the ones back in the winter re iA Writer, about Netlify Analytics vs. the now-foregone Google Analytics and the not-so-cool Clicky.]

[END FOLLOWS...]

## "Interesting," indeed

Although it's apparently a [myth](https://en.wikipedia.org/wiki/May_you_live_in_interesting_times), we've all heard that there was an old Chinese curse, "May you live in interesting times." Let's just say what I just went through on this front was pretty blamed  "interesting." On the other hand, to invoke another old saying, "That which doesn't kill you makes you stronger."
