---
#layout: singlepost
title: "Lessons learned"
tags:
- post
- code
description: "During my ill-fated (and ultimately wrong-headed) attempt to convert this site from Hugo to Gatsby, I learned a few interesting things."
date: 2019-07-21T18:43:00-05:00
lastmod: 2021-05-16T10:17:00-05:00
discussionId: "2019-07-lessons-learned"
featured_image: "binoculars-4143165_4000x2248.jpg"
featured_image_width: 4000
featured_image_height: 2248
featured_image_alt: "A binocular telescope on a stand near a body of water"
featured_image_caption: |
  <span class="caption">Image: <a href="https://pixabay.com/users/kisistvan77-8062321/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4143165">kisistvan77</a>; <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4143165">Pixabay</a></span>
oldComments: |
    <div class="container-oldComments">
      <p class="commentDisclaimer">
        <em>(Older comments imported from previous comments host, <a href="https://www.talkyard.io" target="_blank" rel="noopener">Talkyard</a>.)</em>
      </p>
      <p class="commentName"><strong>Magnus Lindberg</strong> <span class="commentDate"><em>2019-09-30</em></span></p>
      <p class="comment">Hi Bryce, I found a way to use both Git and cloud sync at the same time, for the same directory :- )<br />
      I <em>exclude</em> the <code>.git</code> directory from the cloud sync &mdash; that's why this works. (Otherwise I think the Git repo would &quot;self destruct&quot; itself, when <code>.git</code> internal changes from one laptop, attempts to sync with changes from another laptop :- ))</p>
      <p class="comment">I use Syncthing, here's my Syncthing config that excludes <code>.git</code> and other auto generated / downloaded things:</p>
      <pre class="language-bash"><code class="language-bash">$ cat .stignore-synced
      // Add this single line to .stignore:
      // #include .stignore-synced
      .git/
      node_modules/</code></pre>
      <p class="comment">Actually, it's a bit more complicated:</p>
      <pre class="language-bash"><code class="language-bash">sync-root/
        project-X-laptop-A/
          .git/  &lt;— ignored
          project files ...
        project-X-laptop-B/
          .git/  &lt;— ignored
          ...</code></pre>
      <p class="comment">So, I have one synced root folder, and each laptop has its own sub folder, which is a Git repo with <code>.git/</code>excluded. And from laptop A, I work only in the <code>..-laptop-A</code> folder.  So as to not accidentally overwrite things I was working with on laptop B.</p>
      <p class="comment">... And every few days I Git-merge/rebase changes the two directories onto each other.</p>
      <p class="comment">Cheers</p>

      <p class="commentName"><strong>Bryce Wray</strong> <span class="commentDate"><em>2019-09-30</em></span></p>
      <p class="comment">Very interesting! Will check into this.</p>
      <p class="comment">(To other readers: this gentleman is the creator and developer of the Talkyard platform that powers these comments. If you have your own SSG-based site and need a way to provide comments, I highly recommend both Talkyard and this extremely helpful dev.)</p>
    </div>
---

{{% disclaimer %}}

Before I delve into today's clambake, I must extend my hearty thanks to the [Hugo](https://gohugo.io) community for its friendly reaction to my [last post](/posts/2019/07/why-staying-with-hugo/), which concerned my abortive and, ultimately, wrong-headed attempt to migrate this site from Hugo to [Gatsby](https://www.gatsbyjs.org). The day after I published the post, the [Hugo Twitter account](https://twitter.com/gohugoio) retweeted my announcement of the post, provoking a big spike in readership[^NetlifyAnalytics] --- and quite a few retweets and friendly tweets from Hugo aficionados.

[^NetlifyAnalytics]: I'd just dumped both Google Analytics and a much lesser-known competitor for the brand-new [Netlify Analytics](https://netlify.com/products/analytics), and it was really cool to watch the data come in on this new, tracking code-free platform.

Thanks, folks. I had feared you might not appreciate my attempt to stray from the ranch, but you were very accepting of my reasoning and, to be sure, kind in your replies. I do appreciate it.

As for the dalliance itself: it wasn't a total waste of my time. I learned some valuable lessons, which I want to share in this post. Not all are specific to a question of one SSG *vs.* another, mind you.

In fact, that's the case for the first item.

## Don't mix Git and cloud sync

From the beginning, I'd had my local Hugo directory set up for cloud storage --- first with Dropbox, which I've since punted[^Dropbox], then with iCloud Drive --- and hadn't encountered any issues. However, it turns out I'd been lucky.

[^Dropbox]: As I [noted](/posts/2019/02/back-up-jack/) earlier this year, Dropbox had already ceased to be my go-to cloud sync vendor, and I was keeping only a small quantity of files on there, none of which *had* to be there. Then, a few days ago, Dropbox unexpectedly revamped how it works on the Mac in a way I --- and [others](https://www.inc.com/jason-aten/dropbox-just-announced-a-major-redesign-that-youre-going-to-love-until-you-realize-it-has-a-fatal-flaw.html) --- found objectionable, so I decided to cut the cord, moving my remaining files away and killing the account.

While I was trying Gatsby, I had its directory in iCloud Drive also, and soon saw that, occasionally, files I killed would come back, irrespective of what I'd done in the [Git](https://git-scm.com) [repository](https://www.sbf5.com/~cduan/technical/git/git-1.shtml). Mystified, I did some research and found that there was a very good reason not to do that: in essence, using cloud sync with a Git repo is [a bad idea](https://stackoverflow.com/questions/35853139/can-git-and-icloud-drive-be-effectively-used-together).

So, now, I keep my Hugo directory in a drive that's not sync'd with the cloud. [Of course](/posts/2019/02/back-up-jack/), it definitely is fully backed up as well as pushed to a remote repo. In fact, I now have it in three different remote repos: not only the original [Bitbucket](https://bitbucket.org) repo which feeds the site to [Netlify](https://www.netlify.com) but also repos on [GitHub](https://github.com) and [GitLab](https://gitlab.com).[^NetlifyHost]

[^NetlifyHost]: Why three remote repos? Hey, why not? All three sites host private repos for free; and Netlify supports all three, just in case I ever change my mind about the site to which I want to point Netlify. Also, it's just a little more security.

## Oh, the typography

If you read [that last post](/posts/2019/07/why-staying-with-hugo/), you know the ultimate straw that caused me to cancel the whole thing with Gatsby came when I found its handling of on-screen typography to be erratic after I'd attempted to install [MDX](https://mdxjs.com) compatibility. As I made clear last year, typography is a [big](/posts/2018/10/web-typography-part-1/) [deal](/posts/2018/10/web-typography-part-2/) with me, no less on the web than anywhere else, so that was the final show-stopper.

Well, I want to tell you: in my admittedly limited research, I found this  to be a problem with many of the newer SSGs.

More often than not, they lack --- and their developers show almost a nonchalance about the importance of --- "smart" typography (*e.g.*, see [this](https://github.com/getzola/zola/issues/740) regarding the oddly Hugo-like [Zola](https://www.getzola.org) SSG). So, if *you* can put up with&nbsp;.&nbsp;.&nbsp;.

<p class="punctuationExample">goofy-lookin' &quot;punctuation&quot; like this</p>

.&nbsp;.&nbsp;. as opposed to .&nbsp;.&nbsp;.

<p class="punctuationExample">nice-lookin&rsquo; &ldquo;punctuation&rdquo; like this</p>

.&nbsp;.&nbsp;. fine. I choose otherwise.

Then there's the whole issue of how the newer SSGs handle CSS and SCSS/Sass.

First, understand how easy we Hugo users have it where SCSS/Sass compatibility is concerned. Thanks to the out-of-the-box [Hugo Pipes](https://gohugo.io/hugo-pipes) functionality, [all](https://gohugo.io/hugo-pipes/scss-sass) you have to do is put your SCSS/Sass files in your Hugo install's `/assets` directory and then call to them in templates like this (this is from my own templates, with *ofotigrid.scss*[^ofoti] being the name of my primary SCSS file that `@import`s in content from its fellow SCSS files within `/assets/scss`):

[^ofoti]: That weird file name is from when I originally had considered calling this site *ofoti.com* --- a domain which I own --- with *OFOTI* standing whimsically for *Old Fart on the Internet*. However, I thought better of it, especially after I learned that the name *Ofoti* had, in fact, [already been used as the title of a prize-winning play](https://en.wikipedia.org/wiki/John_Wheatcroft).

```html
<!-- CSS/SCSS -->
{{ $sass := resources.Get "scss/ofotigrid.scss" }}
{{ $style := $sass | resources.ToCSS }}
<link rel="stylesheet" href="{{ $style.RelPermalink }}">
```

(**Note**: If you're bothered by the Go code in there, you're apparently not alone. I'll address that below.)

Many other SSGs make this sort of thing considerably more problematic, especially if you're not willing to craft your own pipeline between the SSG and the CSS or SCSS/Sass files, through either [plugins](https://www.npmjs.com/package/gatsby-plugin-sass) or other methods. ([I already told you my luck](/posts/2019/07/why-staying-with-hugo/) with plugins, especially when there are a whole slew of them in the SSG's config files.) Believe me, I am neither willing nor (likely) able.

Even the documentation for an SSG like [Eleventy](https://11ty.dev) that claims to be much easier and more more logically configured than other JavaScript-based SSGs --- and, in many ways, it is --- makes it highly obscure in how you're supposed to make that capability work, at least if you want to follow (in my opinion) good form and have separate files for your CSS and SCSS/Sass, rather than [inlining](https://www.11ty.dev/docs/quicktips/inline-css/) that code. Indeed, if you go poking around the page source from numerous sites built on the newer SSGs, you'll find a ton of inline CSS in the `<head>` section. Argggh.

I'll have more to say later about the shortcomings of SSGs’ documentation. Even Hugo's.

Because, so far, I've been able to land punches with glee on The Other Guys; but, unfortunately, the latter two main points leave their marks on Hugo, too.

## Language barriers

In case you've been under the impression that SSGs are built for developers and not for "normal" people, you're not alone. [This article](https://fvsch.com/static-site-generators/) makes a number of good points, and some of them hurt because the author steps on many toes, including Hugo's.

One of those toe-thumpers is about the templating languages involved, and the [Go](https://go.dev) language on which Hugo is based catches a lot of heat from many. If you want a few examples, some of which are complimentary of Hugo itself but not the need to deal with Go: look [here](https://news.ycombinator.com/item?id=17951110) and [here](https://dev.to/tylerlwsmith/my-impressions-of-hugo-as-a-wordpress-developer-1hho) and [here](https://www.michaelbromley.co.uk/blog/going-static-with-hugo/) and [here](https://bluxte.net/musings/2018/04/10/go-good-bad-ugly/) (that last one is really about Go itself and mentions Hugo only once, but is still germane to this topic).

I grant you that Go isn't pretty for those of us who have no reason to deal with it *except* when we make changes to Hugo templates. However, in Hugo's defense, I would only suggest to you [these](https://jenniferwadella.com/blog/all-the-dumb-mistakes-i-made-building-my-first-gatsby-site) [examples](https://charge.js.org/) of how even code-savvy people, much less *non*-devs, can come a-cropper when trying to configure some of the newer SSGs.

In short: it's not just a Hugo problem. It's a problem with SSGs themselves. And I doubt it'll go away any time soon. **However**, to be fair: if you're gonna do any serious configuration of [WordPress](https://wordpress.org) or [Drupal](https://drupal.org), just to name two of the Old Guard, you need to use [PHP](https://php.net). Good luck with that to This Generation Which Knoweth Not Server-Side Languages. Until and unless somebody invents an SSG that is designed for *non*-devs, this is going to keep being a fly in the ointment for those folks, and even some devs.

Which brings me, finally, to&nbsp;.&nbsp;.&nbsp;.

## Docs are a nearly universal problem

Yes, we have to talk about SSGs’ documentation. It pretty much all sucks *for non-devs* --- Hugo's, too, although I would say Hugo's sucks *less*, probably because it's been around several more years than many of the other SSGs that hold more prominence these days, and thus there's been more time for people to write and tweak the docs.

In one of my past Work Lives, I wrote user manuals for fax machines. (Obviously, this was a *long* time ago.) Our team prided ourselves on "writing for Grandma," as we put it then, because our products were bought by people of all ages and experience levels.[^ageism] Thus, I am acutely aware how far short SSGs’ docs fall when it comes to being understandable by people outside the narrow circle of their own community, and sometimes even some *within* it.

[^ageism]: Lest I let that "Grandma" reference go unaddressed, please note that now I'm in my mid-sixties and doing my best to keep up with the technical acumen of my colleagues who are half my age or younger. I also encourage others in my age bracket to keep learning, too, even if they're no longer required to do so by a Day Job. The world is changing too fast to make any other approach a wise one, as I try to impress on my peers who persist in thinking (*e.g.*) that they'll always be able to pay for stuff with checks, or use paper coupons, or do other once-commonplace things that are going away Real Soon Now.

For example, here's an excerpt from the [Gridsome](https://gridsome.org) documentation for doing [layouts](https://gridsome.org/docs/layouts), surely a core part of learning to use an SSG:

> Layout components are used to wrap pages and templates. Layouts should contain components like headers, footers or sidebars that will be used across the site.

So far, fine. Then&nbsp;.&nbsp;.&nbsp;.

> Layouts are *just* .vue components located in `src/layouts` and need to be declared as a global component or imported per page to be used.

Assuming you're not a dev, go ahead and re-read that. I'll wait.

At some point, the SSG folks will have to decide whether they do indeed want to maintain their role as [Merlin](https://en.wikipedia.org/wiki/Merlin)s rather than making SSGs accessible to ordinary users, particularly in corporate life. I mean, WordPress is a God-awful, performance-eating, security-defying thing --- but at least your average Joe or Jane, and most notably your average Joe or Jane in corporate settings that **aren't going to hire dev help for them**, can use it. Try that with **any** SSG.

## A parting shot

So, yes, I learned a lot of things I hadn't expected to learn, or in some cases wanted to learn. But I thought they were worth bringing to your attention, so there you are. I hope you find them useful.

I have no particular place for this one last note, so I'll just toss it in here at the end: you'll find either insight, or humor, or perhaps both in [this Twitter thread](https://twitter.com/stowball/status/1151314822400577536) about the drawbacks of the many JavaScript "framework"-based SSGs that are Kewl today.

Discuss.
