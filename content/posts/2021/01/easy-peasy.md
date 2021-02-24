---
layout: layouts/posts/singlepostherofit.njk
title: "Easy-peasy"
subtitle: "A theoretical conversation about building static websites"
description: "Simplicity is in the mind of the conveyor."
author: Bryce Wray
date: 2021-01-03T10:10:00-06:00
#lastmod: TBD
#draft: false
discussionId: "2021-01-easy-peasy"
featured_image: "rubiks-cube-3038657_3008x2000.jpg"
featured_image_width: 3008
featured_image_height: 2000
featured_image_alt: "Puzzles concept - Rubik’s Cube puzzle toy"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/ben-rock-7352082/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3038657">Ben Rock</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3038657">Pixabay</a></span>
---

**Acknowledgment**: This is based on, and an attempted homage to, "[It's The Future](https://circleci.com/blog/its-the-future/)" by Paul Biggar and the admittedly derivative "[How it feels to learn JavaScript in 2016](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f)" by Jose Aguinaga. I do **not** pretend this is in the originals’ amazing league.
{.yellowBox}

Hey, thanks for taking my call during your lunch hour. I hope you can help me with a personal website project I have in mind. Jeannie told me you'd be the right person to ask in her group.

&ndash; *Oh, no problem, as long as you don't mind me chewing in the background.*

Not at all.

&ndash; *So this is a personal site you're asking about, right?*

Yeah. See, my extended family is scattered all over the world and, a long time ago, I ran a little family website so everybody could keep in touch, share photos, that sort of thing. Then I got busy with work and the kids, so I got one of my cousins to take over the site. After a few years, he let it slide and just set it up as something in Facebook. Now my relatives decided they want to have a real, separate family website like we did before, and they asked me to come back in and build it again.

&ndash; *Ah, good for them. Facebook is a cancer. Even if it did invent React. Well, never mind that; maybe even then. Anyway, you're starting over from scratch, right?*

More or less. The good thing is, I remember the old site's layout. Even printed it out a few times---

&ndash; *You printed out a website?*

Yeah. So I think I could recreate it without a lot of trouble.

&ndash; *Right. Ah, exactly how long ago was it when you stopped working on this website?*

Um, let's see. Seems like it was right before our second child was born so, I guess, about 2000.

&ndash; *In 2000. Okay. Well, the first thing is to forget about whatever layout you had back then.*

Why? The relatives always told me they really liked the way it looked.

&ndash; *Yep, but not a one of them was viewing it on a smartphone. Or a tablet. Because those weren't around yet, right?*

Oh. Right. So you're saying I need to set up both a mobile site and a regular site.

&ndash; *What? No, no, no. It's 2021. Nobody does mobile-only sites anymore. What you want to do is* responsive design, *so your stuff will look good on any device.*

Responsive design?

&ndash; *Yeah. You have to design and code your pages so that they resize and move their stuff around for whichever screen your viewer is using---smartphone, tablet, laptop, or full-size monitor, for that matter.*

How do you do that?

&ndash; *The same way you do any layout or styling, with CSS.*

CSS?

&ndash; *Cascading Style Sheets. Um, let me guess: you haven't exactly kept up with web stuff since around 2000?*

I guess not.

&ndash; *How did you build your pages back then?*

Um, Microsoft FrontPage.

&ndash; *Wow. I used to hear about that when I was a kid but I think you're the first person I ever talked to that actually **used** it. But, anyway, that's ancient history now.*

Fair enough. That's why I'm coming to you, so you can set me straight.

&ndash; *I'll try.* [Chewing sounds.] *So let's start with how you're gonna host the site---*

This is going to be one of those things you're gonna need to help me understand. Back then, I had nothing to do with that part.

&ndash; *So how did it get on the web back in the old---back in 2000?*

This same cousin I was talking about, he worked for his company's IT department---

&ndash; *Like I do here.*

Yeah. He always said he was "just a server guy." He didn't like to fool with the actual web pages. I guess that's why he sloughed it off to Facebook in the end. Anyway, he **was** willing to get the hosting set up. Every time I had any changes, I'd email him a ZIP file with the latest files---

&ndash; *Hm.*

---and he'd put them on the site. But, like I said, he's lost interest in handling this, so this time I'll have to handle the hosting myself.

&ndash; *Okay, gotcha.*

I remember him saying he used something called, uh, FTP.

&ndash; [Cough.] *Wow.*

Why, what's the problem?

&ndash; *Nothing. Sorry, go ahead.*

So how do I get set up with this FTP stuff, whatever it is?

&ndash; *FTP is File Transfer Protocol. And it's really old. I mean, it was already old when I was in high school. It's not how you build a website these days.*

I see. Well, just in case, I did a little research into some hosting possibilities, and wanted to run them by you so you could tell me which one is best.

&ndash; *Like what?*

Oh, uh, *[sound of paper being unfolded]* Weebly&nbsp;.&nbsp;.&nbsp;.

&ndash; *Mm.*

.&nbsp;.&nbsp;. uh, Web.com&nbsp;.&nbsp;.&nbsp;.

&ndash; *Mm.*

.&nbsp;.&nbsp;. Squarespace&nbsp;.&nbsp;.&nbsp;.

&ndash; [Softly] *Jeez.*

.&nbsp;.&nbsp;. and, of course, WordPress.

&ndash; *Okay.* [Ahem.] *Well, uh, how frank you do want me to be? I mean, I know you and Jeannie are buddies, and she's my boss, so---*

Please tell me what you really think. I'm coming to you because you're an expert. She said you'd give me the straight story on this stuff.

&ndash; *Okay. Well, all of those are, uh, really crappy.*

They are? Why?

&ndash; [Whispering] *God, where do I start?* [Regaining volume] *Okay. They're ultra-proprietary---*

What does that mean?

&ndash; *Well, lots of things, but the main thing you'll care about is that they lock you into their platforms so, if you decide you want to move to something else, it's really hard to export your data.*

Okay&nbsp;.&nbsp;.&nbsp;.

&ndash; *They're security risks because they're all built on databases, which makes them vulnerable to cross-site scripting exploits.*

What are those?

&ndash; *Nasty stuff. You don't want to know. Anyway, worst of all in my opinion, they dump a ton of code with every load so your Core Vitals suck.*

Core Vitals?

&ndash; *Yep. Like your LCP. Your FID. Your CLS.*

Uh-**huh**. And what's the importance of these---Core Vitals?

&ndash; *Nothing unless you don't care how slow your pages are, and also your SEO for Google although, if this is just for your family, that part's probably not---*

Okay, so Core Vitals are important, whatever they are. I get that. So, if Weebly, and Web.com, and the rest, if they're wrong, what would you suggest?

&ndash; *That's the beauty of starting from scratch, and having to handle the hosting this time. That means, this time, you can do it the right way.*

Which is&nbsp;.&nbsp;.&nbsp;. ?

&ndash; *Which is, the Jamstack.*

Jamstack?

&ndash; *Right. They used to spell the "Jam" part in all caps so it was easier to understand, but the marketing types felt it looked bad so now it's just capital J, little a, little m. Jamstack.*

It sounds like something you'd put in a Dagwood sandwich.

&ndash; *A what sandwich?*

Never mind. I keep forgetting about how your generation doesn't do newspapers. Anyway, what is this Jamstack thing?

&ndash; *The "Jam" part stands for JavaScript, APIs, and markup.*

Okay. And&nbsp;.&nbsp;.&nbsp;. ?

&ndash; *You know what JavaScript is, right?*

I hear of it occasionally. When I was doing web pages back in 2000, most of the stuff I read about it made it sound like it was a bad idea to use it because it was turned off in most browsers---

&ndash; *Wow. Well, that's not the way it is now. The whole web lives and dies on JavaScript. Oh, you still have your odd-duck users who turn it off because they're paranoid conspiracy theorists, and you have to provide progressive enhancement for them, but for the most part you're good to go.*

I'll pretend I understood all of that. What about the APIs?

&ndash; *Application Programming Interfaces. An API lets two apps communicate with each other. The whole idea of the Jamstack is that you start with static web files for basic content, and then---if you need more functionality, like interactive forms or that sort of thing---you use APIs to communicate with external services and provide it.*

Ah. Okay. *[Scribbling noises.]* I guess. And markup? What are you marking up?

&ndash; *It's like HTML is Hypertext Markup Language. You remember that from 2000, right?*

Truthfully? I never knew what it stood for. Like I told you, I just used Microsoft FrontPage and it would spit out ".htm" files.

&ndash; *Okay. Anyway, the markup in this case is talking about plain-text files.*

Like from Notepad?

&ndash; [Coughs.] *Yeah, like from Notepad. Although there are **lots** better ways of handling that nowadays. Anyway, so the thing is, you type your content into these files, called Markdown files---*

I thought you said mark**up**.

&ndash; *I did. Markdown is a type of markup.*

Well, **that** makes sense.

&ndash; *No accounting for naming in this stuff, I'll give you that. But, like I was saying, you type your content into Markdown files, and then you use an SSG, a static site generator, to---*

Static site generator?

&ndash; *Right. You use the SSG to take those Markdown files and run them through templates to produce web pages.*

Templates? What kind of templates?

&ndash; *Ah, well, that depends on which SSG you use. That's different for every SSG.*

"Which" SSG? How many are we talking about?

&ndash; *Oh, jeez, there's hundreds. Maybe thousands. About half of ’em exist just because somebody didn't like what was already out there and decided he could do better. They're fairly trivial to write if you're just doing it for yourself, but if you put it out there as FOSS then you have to support it, and---and you have no idea what I'm talking about, do ya?*

Honest to God? No.

&ndash; *Sorry. Messing with this sh---this stuff---is a hobby of mine, so I kinda get carried away. Not many people ever ask me about it. Guess it's kind of a niche-y subject.*

Apparently. All right, so that's how you create the web pages themselves, right?

&ndash; *Yeah. The text is in Markdown files, and the HTML and CSS code is in your templating files, whichever kind your SSG supports.*

Riiiight. So now, explain how I'd actually get it on the web since I have to do that part this time around. You said that, uh, FTP stuff is a no-go these days, so how do you get the web pages **on** the web if they're created this way? I mean, there are companies like GoDaddy&nbsp;.&nbsp;.&nbsp;.

&ndash; *Mm.*

.&nbsp;.&nbsp;. and Bluehost&nbsp;.&nbsp;.&nbsp;.

&ndash; *Mm.*

.&nbsp;.&nbsp;. and you're making those same painful-sounding noises you made when I was talking about Weebly and Web.com and SquareSpace and WordPress.

&ndash; *Yeah, sorry. No, you want to steer as clear of those hosts as you can. You want the hosts that are built around the Jamstack.*

Okay. I'm listening.

&ndash; *All right.* [Sighs.] *Well, we'll get to that in a minute. But first, tell me, does your family still own the domain name for your family website? You know, like "ourfamily.com" or whatever it was called?*

Ah. Yes, we do, in fact. My cousin **did** at least keep that renewed every time.

&ndash; *Good deal. Did he give you admin-level access?*

Huh?

&ndash; *Administrator-level access. See, you're gonna have to log into the registrar and point your domain to the IP address the host gives you.*

Register?

&ndash; *No, **registrar**. That's the company where that domain is registered.*

Oh. Yes, he did. It's with, uh, GoDaddy. But didn't you say to stay away from them?

&ndash; *Ah, GoDaddy isn't my favorite registrar but, if it's already registered there, that's cool. The main thing is that you don't want to **host** on GoDaddy.*

It's not the same thing?

&ndash; *No, not at all.*

Okay. I don't understand, but---

&ndash; *This is how I explain it to people. There are car dealerships where you wouldn't mind **parking** your car but you wouldn't **buy** a car from ’em in a million years. Right?*

Yeah---I guess.

&ndash; *Same deal. You can use GoDaddy as your domain registrar, at least until you have a chance to do better next time it comes up for renewal, but you want to host the actual website somewhere else that's Jamstack-oriented.*

Why does it matter?

&ndash; *The old-line hosts aren't up to the job, and they charge you extra for everything. But the Jamstack-oriented hosts have tons of back-end tooling and, probably, won't cost you a thing.*

*(Mumbling)* Tooling--- Wait, you mean it'll be free?

&ndash; *Yeah, should be.*

Okay, well, that's certainly a positive. *[Sighs.]* Finally. Who are some of the hosts?

&ndash; *Ah, there are plenty. Netlify, Vercel, Render, GitHub Pages, GitLab Pages---hey, even DigitalOcean and Cloudflare are getting into this now. It's a great time to be building websites.*

Okay. *[The noise of a piece of paper being flipped over.]* So, once you pick one of those as the host, what's the process?

&ndash; *For most of ’em, it's pretty simple. Every time you push a commit to---*

Every time I do what?

&ndash; *Oh.* [Pause.] *Um, would I be correct in assuming you've never heard of version control?*

Ah, that would be a "yes."

&ndash; *Right. Hm. Well, back in 2000 when you were doing those web files and, uh, emailing ZIPs of them to your cousin&nbsp;.&nbsp;.&nbsp;.*

Yeah?

&ndash; *&nbsp;.&nbsp;.&nbsp;. how did you keep track of older versions of the files? You know, in case you wanted to revert, uh, backtrack to an earlier version? Like, if you had a mistake you wanted to fix, or you had old content you wanted to bring back?*

Wow. Guess I didn't worry about that.

&ndash; *Gotcha. Well, in web development, like in all software dev stuff, you've gotta do version control. That means you can essentially keep all versions of all files, as far back as possible.*

But how do you keep them straight? I know you can't even have **two** files with the same name, so---?

&ndash; *No, no, you don't keep the older versions of the files, at least not the way you mean. That's why you use Git.*

Git?

&ndash; *Yeah. Used to be, we used something called Subversion, but everything's been Git for a long time now.*

Okay&nbsp;.&nbsp;.&nbsp;.

&ndash; *So, you install Git on your computer, whichever one you're gonna be doing the web page building on, then you go to the directory where the files will be and go "git init."*

*[Mumbling]* "git init"&nbsp;.&nbsp;.&nbsp;.

&ndash; *Yeah. That'll set up the repo---*

Repo? **Repossession**?

&ndash; *No, no, "repo" is short for* repository. *It's how Git keeps track of your files. It stores compressed versions of everything, going back as far as you need. You make changes and then you commit them, and it tracks it all. It's really cool.*

And you said something about "pushing."

&ndash; *Right. For your repo, you set up a **remote** repo, like on GitHub, or GitLab, or---*

*[Mumbling]* Git&nbsp;.&nbsp;.&nbsp;. Hub---

&ndash; *Yeah. Then, when you make any commits on your **local** repo, you push ’em out to your **remote** repo, and that's when the magic happens.*

Hm. What "magic"?

&ndash; *Well, you'll have connected your host to your remote repo, so every push to that remote repo builds your site out on the host.*

Even if it's already there?

&ndash; *Right.*

Hm. *[Pause.]* Well, look, I've taken enough of your time, especially on your lunch hour. But I've been taking notes, or at least **trying** to, so let me see if I have it straight. Okay?

&ndash; *Sure.*

I'll pick a "Jamstack-oriented" host. I'll use, um, "admin-level access" to log into GoDaddy, the "registrar" for the website domain, and I'll "point" the  domain to whichever "IP address" the host gives me. Then I'll do a "Git init" on my local computer to create a "local repo." Then I'll make web files there, using a "static site generator" and some "markup" that's called "Markdown" and some "templating" that includes "HTML" and "CSS"---and "responsive design," too, so it looks right on a phone or a tablet or a big monitor. Then I'll "commit" the changes. And I have to create a "**remote** repo," and set the host to "build" the site every time I "push" changes to that "remote repo." *[Pause.]* Oh, and the site won't have "cross-site scripting exploits" and its "Core Vitals" will be good. So, is that about it?

&ndash; *Yeah, pretty much. Good job. So when---?*

You know what? *[Sound of paper being crumpled.]* I think I'm gonna tell my cousin to give me control over that frickin’ Facebook page and I'll take my chances with it. But, hey, thanks, and have a good rest-of-your-lunch. *[Click.]*