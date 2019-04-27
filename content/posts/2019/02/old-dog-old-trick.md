---

title: Old dog learns old trick 

subtitle: How’d I miss this way to fool IE?

description: "A major ”Do’h” moment in the never-ending battle against Internet Explorer"

author: Bryce Wray

date: 2019-02-16T10:50:00-06:00

#final_date: 2019-02-16T10:50:00-06:00

lastmod: 2019-02-17T08:35:00-06:00

draft: false # note!

actual_path: /content/posts/2019/02/old-dog-old-trick

final_url: posts/2019/02/old-dog-old-trick

featured_image: /images/dog-2514968_1920x1080_72dpi_60pct.jpg

featured_image_alt: Face of an old dog

featured_image_caption: "Image: Pixabay" # quotation marks to allow colon

---

"What? You must be joking! *Darth Vader* was Luke's *father*?"

A few days ago, I felt like that guy: enlightened and glad for it, but chastened for my failure to "try to keep up," as the impatient are wont to say. Yes, it's okay for an old dog to learn a new trick, but when an old dog missed the trick a long time ago---and he was getting paid dog biscuits to *know* that trick---hoo, boy.

## Fooling the king of Web futz

If there's anything an old Web guy likes, it's another way to schnooker Internet Explorer.

Oh, pardon the technospeak; let's say, "to fool" Internet Explorer (which is akin to fooling an addled fly). Said schnookery is to avoid having to kowtow to [IE's ancient, hoary behavior](https://crossbrowsertesting.com/blog/browsers/why-is-internet-explorer-so-bad/) in ways that cause problems for more standards-compliant browsers. As a matter of fact, I learned of one this week---and it works like a charm.

Only thing is, it's nothing new. Holy cow, it's been out there for years. Yet I missed it. Hey, I didn't simply miss it. I didn't have even a clue about it.

So, I'm both relieved to know it and embarrassed that I didn't. Let me tell you what happened.

## Wresting victory from the jaws .&nbsp;.&nbsp;.

Remember that wretched excuse for a WordPress page builder against which [I inveighed](/posts/2019/01/blox-sux/)? Well, I have managed to convince the appropriate folks that we should yank it from my employer's growing number of Web sites as the opportunities present themselves. Yay. Of course, that'll be a while, because we're talking about production sites that serve many thousands of people a day, and one mustn't throw the proverbial monkey wrench into that functionality. But the path has been laid out. We will get there. Again, yay.

Part of the way I managed to get this decision, for which I am more grateful than words will express, was to take one of our existing test sites, rebuild it (and, I believe, improve it) in [the page builder I prefer when I have to prefer one](https://elementor.com), and let the appropriate folks check out the results for themselves.

Only thing is, my day job is in [one of those enterprise shops where Windows 7 and, yes, Internet Explorer 11 remain alive and well](https://www.itproportal.com/news/businesses-still-running-windows-7-despite-end-of-service-coming-soon/)---although the vast majority of its denizens use Chrome, the only other browser open to us within the infrastructure---so it behooved me to make sure IE 11 wasn't ruffled by what I had done. After all, I've heard stories that some of our top folks still prefer the browser that our shop sets for auto-launch on each log-in to Windows, and that is none other than IE; so nothing would scotch my hard-won happy path faster than Somebody seeing unexpected things when viewing that newly rebuilt site once it goes to production.

## Metaphor: IE as a nasal zit

Everything had gone fine in that respect *except* for one thing that bedeviled me throughout last weekend, when I completed the vast majority of the transition to the test site that, as it turned out, would earn my path to freedom from what I've [dubbed](/posts/2019/01/blox-sux) "GUPB," for *godforsaken unidentified page builder*.

However, like the pimple on one's nose on the night of a big date, this particular "one thing" was a big, honking problem *on the home page*. On the *first slide* of a slider, carousel, whatchamacallit, at the *top of the home page*.^[I'm no fan of image sliders for a variety of reasons, chiefly that I think they distract from your messaging more than they help it. But [t'ain't my call, McGee](https://www.phrases.org.uk/bulletin_board/61/messages/878.html). When I was a Webmaster working in Marketing, I could influence such decisions; those days are behind me.] Arrgh!

To be specific, the text that overlay that first slide was shifted 'way too far to the right. It looked fine in the desktop versions of Chrome, Firefox, and even Edge. And it looked fine on iOS and Android. Only the damnable IE resisted.

I put the annoyance aside for that weekend, what with all the other pages I had to rebuild; but, on Monday morning as I flipped through the various pages once more in an effort to find stuff I'd missed in the transition, I remembered there was that IE annoyance to fix.

Everything I did in CSS that made it look mildly acceptable on IE made it go bonkers on the *real* browsers (`<burn>`shots fired`</burn>`). After spending 'way too much time trying to dope it out, and with my regular tasks waiting impatiently for my attention, I decided to do that hated thing known as browser-specific CSS.^[And, no, I don't know whether [HTML5 Shiv](https://github.com/aFarkas/html5shiv) would've fixed it; I didn't try it.] So I proceeded to create a little "ie.css" stylesheet and prepared to use IE conditional comments. Yep, those ugly things in the `<head>` section that only Internet Explorer sees, like:

`<!--[if IE]>`  
&nbsp;&nbsp;&nbsp;&nbsp;`<link rel="stylesheet" href="/css/ie.css">`  
`<![endif]-->  `

Except I didn't learn until that very morning---and this is where I really feel foolish---that **Internet Explorer had stopped supporting those in IE** ***10***. **Ten**! Hey, sports fans, that was released in *2012*.

How did I miss that??

I am still embarrassed. In the words of Donald Sutherland in *Animal House*: "[Listen, I'm not joking. This is *my job*!](https://www.imdb.com/title/tt0077975/quotes?item=qt0479929)"

## Share the shame, but share the help, too

So why am I sharing my shame? Because I saw posts from *other* people still asking about IE conditionals for IE 10 and 11 even in recent months, so there are others to inform. Here is the correct way to schnooker IE 10 and 11 into seeing an instruction that you want the *real* browsers to ignore (hat tip to [Philip Newcomer](https://philipnewcomer.net/2014/04/target-internet-explorer-10-11-css/) and [numerous](https://stackoverflow.com/questions/19502040/if-ie-conditionals-not-working) [folks](https://stackoverflow.com/questions/27735840/why-are-conditional-comments-in-html-not-recognized-in-internet-explorer-11-is) [on](https://stackoverflow.com/questions/19446584/why-doesnt-internet-explorer-11-honour-conditional-comments-even-when-emulating) [Stack Overflow](https://stackoverflow.com/questions/40656043/conditional-comments-not-working-in-ie11)):

> .&nbsp;.&nbsp;.&nbsp;create a media query using `-ms-high-contrast`, in which you place your IE 10- and 11-specific CSS styles. Because `-ms-high-contrast` is Microsoft-specific (and .&nbsp;.&nbsp;.&nbsp;available [only] in IE 10+), it will .&nbsp;.&nbsp;.&nbsp;be parsed in [only] Internet Explorer 10 and greater.^["How to Target Internet Explorer 10 and 11 in CSS," [Philip Newcomer: The Backwoods Coder](https://philipnewcomer.net/2014/04/target-internet-explorer-10-11-css/).]

So I was saved the trouble of an "ie.css" sheet; and my resulting addition to the end of the "style.css" sheet I was already using turned out to be something along these lines:

`/* ==== for IE 10 and 11 **ONLY** ==== */`  
`@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {`  
&nbsp;&nbsp;&nbsp;&nbsp;`.slider-text {`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`hey, IE, don’t screw up that text or it’s coitains, see? Coitains.`  
&nbsp;&nbsp;&nbsp;&nbsp;`}`  
`}`  
`/* ==== end, IE 10 and 11 **ONLY** ==== */`

.&nbsp;.&nbsp;. or code to that effect. And it worked like a charm.

## Lessons from my late learning experience

So, children, what did we learn today?

First, don't be ashamed to admit you don't know something. Maybe you should be ashamed that you didn't know enough even to have curiosity about the item of which you were ignorant, but "water under the bridge" and all that rot.

Second, when you belatedly discover the thing you surprisingly had missed, let others know it, too. Life happens and people miss things. They'll appreciate knowing---finally knowing.

At least, that's my sheepish story and I'm sticking to it. But now you know.

So do I. Finally.

Woof.

<hr />

### *Oh, Lord, Helen, he's* still *talking about .&nbsp;.&nbsp;.*

*Two things about my [last post](/posts/2019/02/ia-for-io/), an abbreviated revisiting of iA Writer after I'd [previously](/posts/2019/01/blox-sux/) dissed it:*

- *While I wrote much of that post within iA Writer and then transferred it to Ulysses, I did this one* entirely *from within iA Writer. (Whether it, too, will end up within the Ulysses Library is TBD.) While, without question, iA Writer is one opinionated son of a gun---and I have to say that it's weird to read [one](https://www.macstories.net/ios/ia-writer-5-2-better-typography-and-external-library-locations/) [article](https://chrisrosser.net/posts/2019/01/26/ia-writer-5-review/) [after](http://randsinrepose.com/archives/bear-an-elegant-combination-of-design-whimsy-and-voice/) [another](https://medium.com/@mariusmasalar/ulysses-vs-ia-writer-a-new-comparison-7015c899e883) referring to* ***a software app*** *as "opinionated"---it doth have charms to sooth the savage [static site generator](https://staticgen.com).*
- *But the shocker is that I've actually spent some time over the last few days writing the WIP in iA Writer, too. Right now, it's an experiment and no more. Then again, about nine months ago, I said that about a Memorial Day weekend tryout of Ulysses, and suddenly I was using it instead of Scrivener, and [committing my beloved WIP to it a few months after that](/posts/2018/09/why-finally-settled-ulysses/). I still have some serious reservations about iA Writer as a repository of anything longer than fluff like what you're reading now---for example, it seems a trifle unstable at times, and I have lost a little writing when it crashed while I've never lost any when Ulysses hit the dirt---but that's what experimentation is for, right?*

*In short, stay tuned.*

*And, oh, yes: my continued thanks to [Chris Rosser](https://chrisrosser.net) for tweeting* (below) *about my last post. As he might say: "Thanks, mate!"*

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">If you are a fan of, or contemplating using, iA Writer, I recommend <a href="https://twitter.com/BryceWrayTX?ref_src=twsrc%5Etfw">@BryceWrayTX</a> blog post. While our workflows are different, our ends and opinions are the same! <a href="https://t.co/Oeoaacz8z8">https://t.co/Oeoaacz8z8</a></p>&mdash; Chris Rosser (@CRosserAuthor) <a href="https://twitter.com/CRosserAuthor/status/1095457720709263360?ref_src=twsrc%5Etfw">February 12, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>