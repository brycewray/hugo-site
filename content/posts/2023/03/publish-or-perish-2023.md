---
title: "“Publish or perish” in 2023"
description: "Where the deployment of one’s static website is concerned, there’s a lot more to consider than in 2019."
author: Bryce Wray
date: 2023-03-01T07:24:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

The landscape for static websites has changed quite a bit in the nearly four years since I first issued "[Publish or perish](/posts/2019/04/publish-or-perish/)." While it's now an even greater time to have a site of one's own, you have more options and, as a result, more decisions to make.

<!--more-->

<strong class="red">Important note, 2023-05-18</strong>: I am updating this post because some [recently announced improvements](https://blog.cloudflare.com/moderizing-cloudflare-pages-builds-toolbox/) in [Cloudflare Pages](https://pages.cloudflare.com) required a big change in how I rated that platform herein.
{.box}

The original "Publish or perish" was a follow-up to "[Ec-static](/posts/2019/04/ec-static/)," which briefly explained the benefits of static websites and then described what then was my recommended procedure for getting started in building such a site with the [Hugo](https://gohugo.io) [static site generator](https://github.com/myles/awesome-static-generators) (SSG). I reprised the latter part considerably in last year's "[Really getting started with Hugo](/posts/2022/07/really-getting-started-hugo/)," and now it's time for a fresh treatment of the subject of "Publish or perish" --- namely, how to deploy one's static site to the web.

In the 2019 version, I covered the only hosting solution I'd ever used and about which I had a passable amount of knowledge: [Netlify](https://netlify.com). It would be well into 2020 before I'd decide to [try other hosts](/posts/2020/07/goodbye-hello/) (and [review them](/posts/2020/09/normal-persons-guide-static-website-hosting/)), but that was just as well because the marketplace was changing rapidly, as the once-dominant Netlify gained multiple competitors. So, here in 2023, I'm changing the basis of "Publish or perish" to cover not just *how* to deploy but the more important consideration of with *whom* to deploy.

## The "how" of deployment

As was the case four years ago, this is still the recommended way to deploy:

- Push a [Git](https://git-scm.com) commit from your local repository to an online repository.
- Your host should then "see" the commit and, using a relatively simple GUI through which you'll have set up your options rather than having to write any complicated scripts, automatically build your website with whatever changes you've just committed.

However, unlike in 2019, I no longer recommend using the [Sourcetree](https://www.sourcetreeapp.com/) app as a GUI for handling Git commands. (My use of it at that time reflected my own lack of experience.) Instead, it's likely you're already wrangling your project with a code editor, such as the seemingly ubiquitous [Visual Studio Code](https://code.visualstudio.com/), which has fine Git management capabilities built right in.[^Fork]

[^Fork]: Still, if you must have a separate GUI app just for the Git stuff and are using either macOS or Windows, my recommendation is [Fork](https://git-fork.com) --- which, although not free, is superb.

Beyond that, you're good to go with any of the hosts I'll discuss next, so I needn't spend more time discussing this aspect.

## The "who" of deployment

The push-to-deploy part, perhaps not surprisingly, has changed little since 2019. The difference today is that there are more hosts which work that way. In 2019, there were only Netlify and ZEIT; and, even then, ZEIT hadn't yet fully enabled the easy-as-pie, GUI-powered approach to deploys. Only in 2020, when ZEIT [changed its name](https://vercel.com/blog/zeit-is-now-vercel) to [Vercel](https://vercel.com), did it introduce that capability rather than relying mainly on users' giving commands in the terminal.

And there were even more players coming. By early 2021, the list would be pretty much the same as today, shown in the order in which they appeared in the static-site-building arena:

- Netlify
- Vercel
- [Render](https://render.com)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)
- Cloudflare Pages

Note that I am **not** listing [GitHub Pages](https://pages.github.com) or [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/), because they require some degree of [CI/CD](https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html) involvement. I am purposely discussing only hosts where one can completely "go GUI," setting up deployments without scripting.[^config]

[^config]: This doesn't exclude the *optional* ability to configure deployments, such as through having a `netlify.toml` or `vercel.json` file in one's repository.

With those ground rules established, I'll provide facts and some opinions regarding each host's **free** tier where the following are concerned:

- **Content delivery network (CDN)** --- This is in lieu of the performance charts some other reviews provide. In my experience, the host's CDN matters more than any sequence of performance tests. Given how network conditions and a host's processing load can change from one moment to the next, your site's *average*, long-term performance will depend in great measure on how close your visitors are to the CDN's nearest point of presence (PoP); so, the more PoPs the CDN has and the more widely distributed they are, the better.
- **UI**.
- **Build speed**.
- **Limits**.
- **Other considerations** --- This category includes which repository hosting services the host supports. It also includes what happens when you assign a custom domain to your deployment, which typically is going to be just once. Please note that, regardless of host choice, that assignment will go through a lot more quickly if you (a.) use [Cloudflare DNS](https://www.cloudflare.com/dns/), since it seems to have the "world's ear" more than do many other DNS providers, **and** (b.) [purge certain providers' caches](/posts/2020/12/gems-in-rough/#dns-cache-whatnbspdnsnbspcache) after making the necessary DNS entries.

### Netlify

Netlify's free-tier CDN primarily uses [AWS](https://aws.amazon.com). It has [only six PoPs](https://answers.netlify.com/t/is-there-a-list-of-where-netlifys-cdn-pops-are-located/855/2) worldwide. Of these hosts, Netlify is the only one whose free-tier CDN is so limited *vs.* what it provides in its for-pay plans.

The Netlify UI is probably the easiest to use of all of these, benefitting from Netlify's industry-leading experience with this deployment process.

Builds are reasonably fast, especially after the first.

Limits:
- 300 build minutes per month.
- 100 GB of bandwidth per month.

Other considerations:
- Netlify supports repositories from [GitHub](https://github.com), [GitLab](https://gitlab.com), and [Bitbucket](https://bitbucket.org).
- Assigning a custom domain to a Netlify-hosted site is easy and fast. Although Netlify documentation once suggested that it was necessary to use Netlify's own DNS setup to make the process go smoothly, that's not the case.
- If desired, you can switch a deployed site between two different repos.

### Vercel

Vercel's CDN uses AWS. It includes [nineteen](https://vercel.com/docs/concepts/edge-network/regions) of AWS's *Regions*; so, given how AWS [describes its Regions](https://aws.amazon.com/about-aws/global-infrastructure/), it's unclear how many PoPs Vercel's CDN actually covers.

The Vercel UI is reasonably easy to use, although somewhat more opaque than Netlify's.

Builds are *very* fast, especially after the first --- indeed, Vercel is, and has long been, the fastest in this category.

Limits:
- 100 deployments per day.
- 6,000 build minutes per month.
- 100 GB of bandwidth per month.

Other considerations:
- Vercel supports repositories from GitHub, GitLab, and Bitbucket.
- You're not allowed to conduct business activities on your site in Vercel's free tier.
- Assigning a custom domain to a Vercel-hosted site is incredibly easy and fast; the user experience for this operation is outstanding.
- If desired, you can switch a deployed site between two different repos.
- Of these five hosts, Vercel is the only one without an official online community forum where users can ask for help.

### Render

Render's CDN uses [Cloudflare](https://www.cloudflare.com/cdn/) and its [hundreds of PoPs](https://www.cloudflare.com/network/).

The Render UI ranks about the same as Vercel's: not bad, but not as easy as Netlify's.

Builds are reasonably fast, especially after the first.

Limits:
- 500 build minutes per month.
- 100 GB of bandwidth per month.

Other considerations:
- Render supports repositories from GitHub and GitLab.
- In the past, there have been issues with how quickly Render handles assignment of a custom domain; I've seen it take hours, although that's not the norm.
- **Update, 2023-03-05**: [Starting today](https://feedback.render.com/features/p/interchangeable-repos-per-project), Render allows you to switch a deployed site between two different repos.

### DigitalOcean App Platform

DOAP's CDN uses Cloudflare and its hundreds of PoPs.

The DOAP UI is the worst among these hosts. It makes it somewhat difficult (by design?) to get started with a new site without inadvertently picking a paid plan. Indeed, it reminded me a little of the bad old days of trying to deal with an old-school host like GoDaddy, which never tires of trying to sell you one or two or eighty-five things you didn't come there to buy. If you insist on trying DOAP, refer to [Frank Corso](https://frankcorso.dev)'s "[Deploying a Static Site to Digital Ocean's App Platform](https://frankcorso.dev/deploy-static-site-digital-ocean-app-platform.html)."

DOAP builds are somewhat sluggish compared to others' speeds in this category, although they improve a bit after the first time.

Limits (easily the most restrictive in this group):
- Only 100 build minutes per month.
- Only one GB of bandwidth per month.

Other considerations:
- DOAP supports repositories from GitHub and GitLab.
- I have no experience in having DOAP assign a custom domain. Given that DigitalOcean has many other services to which one can assign custom domains, I *suspect* it's not a problem, if for no other reason than DO's scale in general; but I can cite no data about this. In the same vein, I have no experience in switching a deployed DOAP site between two different repos, so I don't know whether that's possible.
- **I don't recommend** using DOAP. Between its "gotcha" startup process and its very restrictive limits, you can do better with one of the other hosts.

### Cloudflare Pages

Obviously, CFP uses Cloudflare and its hundreds of PoPs.

The CFP UI is just a little less intuitive than Vercel's, but still not bad.

Until a major change [announced](https://blog.cloudflare.com/moderizing-cloudflare-pages-builds-toolbox/) several weeks after I initially published this post, CFP suffered greatly from an incredibly outdated build image and, as a result, I severely downrated the platform in the post's original version. But, with the new "v2" build image --- now in public beta, but performing quite well so far --- CFP builds are snappy, albeit not as quick as Vercel's.[^buildCaching] More to the point: the new build image, unlike its predecessor, supports current [Node.js](https://nodejs.org/) versions and usually **doesn't** install things you don't want, so its initialization process is much quicker. Also, Hugo users will benefit especially from the new build image's ability to load the [Embedded Dart Sass](https://github.com/sass/dart-sass-embedded) binary, as I [have described elsewhere](/posts/2023/05/cloudflare-pages-more-attractive-home-hugo-sites/). Currently, CFP is the only host with that capability.

[^buildCaching]: Cloudflare says build caching, one of the things that *make* Vercel builds fast, is on the CFP roadmap ("if your framework supports it") and probably will emerge later this year.

Limits:
- 500 deployments per month.
- **Unlimited** bandwidth.

Other considerations:
- CFP supports repositories from GitHub and GitLab.
- Assigning a custom domain to a CFP site is easy and usually quite fast, especially (of course) if you're using Cloudflare DNS.
- You cannot switch a deployed site between two different repos. Instead, you'll have to create a new project off the second repo and then, if applicable, point your custom domain to the new project.

## Final thoughts

In summary, I'd rank the hosts as follows for a typical new SSG user who plans to deploy via the native UI of each host:

1. Before its build image revamp went public, I ranked Cloudflare Pages fourth out of the five, with the vast Cloudflare CDN being essentially its only saving grace. Now, things are very different: with its previous problems solved by the so-called "v2" build image, CFP leads the pack ([especially for Hugo users](/posts/2023/05/cloudflare-pages-more-attractive-home-hugo-sites/)). Also, its allowance of unlimited bandwidth for even free-tier users is far and away the friendliest such provision in this group.
2. Vercel is an extremely strong second --- **unless** you're going to do any business whatsoever with your site, which bars you from the free tier. While its CDN is pedestrian compared to Cloudflare's, Vercel's build speed and generous limits put it very close otherwise. However, keep in mind that it's the only one of these without an official place (other than [Vercel's GitHub repo](https://github.com/vercel/vercel), perhaps) where you can ask for help.
3. Render is a solid player in the middle of this pack. It fails to finish higher mainly because its builds aren't as quick as Vercel's or CFP's while its limits are considerably tighter, although 500 build minutes a month may be enough for the vast majority of cases. *(I didn't downrate Render for its custom-domain-assignment issues, which likely would bite you only once, if at all.)*
4. Netlify, essentially The Original Player in this field, now manages to show up in next-to-last place only because it's not as bad as DigitalOcean App Platform. Although Netlify's UI probably is still the best of this bunch, its free-tier CDN is the *worst* of them and its limits, while not horrible, tend to restrict active development.
5. DigitalOcean App Platform ranks as high as fifth only because I can't rank it lower in a five-item list! The only thing DOAP has going for it is the Cloudflare CDN, and you can get that with CFP or Render. Otherwise, DOAP's limits are far too tight and the startup process with its native UI is manipulative, to say the least.

Or, if you prefer a chart:

| Host | Rank | CDN | UI | Builds | Limits | *Etc.* |
|----|----|----|----|----|----|----|
| **CFP** | 1 | <span class="emojis">✅</span> | <span class="emojis">☑️</span> | <span class="emojis">✅</span> | <span class="emojis">☑️</span> | <span class="emojis">☑️</span> |
| **Vercel** | 2 | <span class="emojis">😕</span> | <span class="emojis">☑️</span> | <span class="emojis">✅</span> | <span class="emojis">☑️</span> | <span class="emojis">☑️</span> |
| **Render** | 3 | <span class="emojis">✅</span> | <span class="emojis">☑️</span> | <span class="emojis">☑️</span> | <span class="emojis">😕</span> | <span class="emojis">☑️</span> |
| **Netlify** | 4 | <span class="emojis">😡</span> | <span class="emojis">✅</span> | <span class="emojis">☑️</span> | <span class="emojis">😕</span> | <span class="emojis">😕</span> |
| **DOAP** | 5 | <span class="emojis">✅</span> | <span class="emojis">😡</span> | <span class="emojis">☑️</span> | <span class="emojis">😡</span> | <span class="emojis">😕</span> |
{.ulysses}

<span class="emojis">✅</span> Excellent&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="emojis">☑️</span> Good&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="emojis">😕</span> Fair&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="emojis">😡</span> Poor
{.ctr .legal}
