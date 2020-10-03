# Repo for brycewray.com

This is the repository from which the [Hugo](https://gohugo.io)-generated version of [brycewray.com](https://brycewray.com) is built.

## What&rsquo;s under the hood

- Hugo, of course.
- [PostCSS](https://postcss.org) and [Tailwind CSS](https://tailwindcss.com).
- [Cloudinary](https://www.cloudinary.com)’s free tier for handling the site’s images, controlling their sizes, and working with my `imgc` shortcode to make them [responsive](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images).

There are two **starter sets** based on this repo’s layout and design. Each uses Hugo’s [built-in image processing capabilities](https://gohugo.io/content-management/image-processing/) (as compared to this repo, which uses [Cloudinary](https://cloudinary.com) rather than having the images in the repo and processing them as such).
- [hugo_site_css-grid](https://github.com/brycewray/hugo_site_css-grid) — Like this site, uses PostCSS and TailwindCSS (and, thus, has more dependencies than you might want to handle, if coming from a Hugo-centric background).
- [hugo_solo](https://github.com/brycewray/hugo_solo) — Handles styling [through SCSS via Hugo Pipes](https://gohugo.io/hugo-pipes/scss-sass/) and, thus, has **no** external dependencies.

As for this repo, I suggest you use it **only for reference**.
