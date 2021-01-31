# Repo for brycewray.com

This is the repository from which the [Hugo](https://gohugo.io)-generated version of [brycewray.com](https://brycewray.com) is built. I suggest you use it **only for reference** and, rather than cloning or forking it, use one of the **starter sets** based on it (see below).

![CI-Hugo-site-to-Cloudflare-Workers](https://github.com/brycewray/hugo_site/workflows/CI-Hugo-site-to-Cloudflare-Workers/badge.svg)

## Starter sets based on this repo

The site built by this repo has a considerably sparer look-and-feel than before, but there are two **starter sets** based on the site’s **former** layout and design. Each uses Hugo’s [built-in image processing capabilities](https://gohugo.io/content-management/image-processing/) (as compared to this repo, which uses [Cloudinary](https://cloudinary.com) rather than having the images in the repo and processing them as such).
- [hugo_site_css-grid](https://github.com/brycewray/hugo_site_css-grid) — Uses [PostCSS](https://postcss.org) and [TailwindCSS](https://tailwindcss.com) (and, thus, has more dependencies than you might want to handle, if coming from a Hugo-centric background).
- [hugo_solo](https://github.com/brycewray/hugo_solo) — Handles styling [through SCSS via Hugo Pipes](https://gohugo.io/hugo-pipes/scss-sass/) and, thus, has **no** external dependencies.