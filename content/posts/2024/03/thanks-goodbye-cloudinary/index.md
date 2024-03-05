---
title: "Thanks and goodbye, Cloudinary"
description: "After my code exceeds the limits of an already overly generous Free Plan, I again process all images locally."
author: Bryce Wray
date: 2024-03-05T06:50:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

Just for the record, I closed my [Cloudinary](https://cloudinary.com) account today, over three-and-a-half years after [getting started](/posts/2020/07/transformed/) with it. It definitely wasn't because of any shortcomings I'd found in Cloudinary's amazingly generous Free Plan; quite the opposite is true. Instead, my own wonky code had finally pushed that Plan beyond its limits, forcing my hand. The few images I was still serving by Cloudinary are now once again handled entirely locally by [Hugo](https://gohugo.io)'s built-in [image processing](https://gohugo.io/content-management/image-processing/).

<!--more-->

The root of the problem lay in my using Cloudinary not only to store and serve normal-sized images but also to generate low-quality image placeholders (LQIPs) --- and, to a much lesser extent, automated social media images --- as I'd discussed in these past posts:

- "[Fetching remote stuff with Hugo 0.90+](/posts/2021/12/fetching-remote-stuff-hugo-0-90-plus/)" (<span class="nobrk">2021-12-11</span>).
- "[Fetching remote images with Eleventy](/posts/2022/01/fetching-remote-images-eleventy/)" (<span class="nobrk">2022-01-25</span>).
- "[Using Cloudinary with Astro and Eleventy](/posts/2022/08/using-cloudinary-astro-eleventy/)" (<span class="nobrk">2022-08-27</span>).
- "[Automated social media images with Cloudinary and Hugo](/posts/2022/10/automated-social-media-images-cloudinary-hugo/)" (<span class="nobrk">2022-10-15</span>).
- "[Using Hugo Pipes with Cloudinary](/posts/2023/07/hugo-pipes-cloudinary/)" (<span class="nobrk">2023-07-16</span>).
- "[Using Hugo Pipes with Cloudinary: a follow-up](/posts/2023/07/hugo-pipes-cloudinary-follow-up/)" (<span class="nobrk">2023-07-23</span>).

You see, two of the factors that count against the Free Plan's limits are image *transformations* and bandwidth; and, a few weeks ago, I had briefly changed nearly all the site's images from local, processed-by-Hugo status to Cloudinary-processed. Particularly because of all my additional tinkering, this move apparently triggered many transformations and accompanying leaps in bandwidth usage. Even though I un-did the images' status changes only days later, the Cloudinary account still bore the scars of my earlier actions (usage is based on your activity during the last thirty days).

Then, sure enough, I got advisories from Cloudinary about my excesses: first that I was nearing the Free Plan's limits, and then that I'd exceeded them. This had never happened to me before. Indeed, over the years, I'd gained so many additional "credits" on the Plan --- partly through (*e.g.*) people using an invite link formerly sprinkled throughout the site --- that I'd long felt my fairly spartan little site could never get anywhere close to bursting the Free Plan's balloon.

And, had I never started all those additional machinations, perhaps that would've been the case; but I had, so it wasn't.

I still recommend Cloudinary, Free Plan or otherwise, for *normal* uses. Its many services are amazing, the support teams are unfailingly helpful and courteous, and the Free Plan will likely be more than enough for just about any *normal* (note my reiteration of that word) static website. However, if you intend to augment your Cloudinary usage with any of the geeky additional processes about which I wrote in those posts linked above, be forewarned that things may go awry.
