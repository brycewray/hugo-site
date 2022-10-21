---
title: "Hugo-like archetypes in other SSGs"
description: "A short shell script extends to the competition an obscure but cool feature in Hugo."
author: Bryce Wray
date: 2022-09-06T13:30:00-05:00
#draft: true
#initTextEditor: iA Writer
---

Perhaps you've just had some inspiration and want to get started with a new post in your favorite static site generator (SSG). In just about every SSG except [Hugo](https://gohugo.io), you usually end up doing the following:

1. Finding an **earlier** post's Markdown file.
2. Copying the file's front matter and perhaps a word or two.
3. Creating the **new** post's Markdown file.
4. Pasting the copied text into the new post.
5. Editing the copied front matter so you don't accidentally leave it the same as the earlier post's.

But, in Hugo, you can take advantage of its [**archetypes**](https://gohugo.io/content-management/archetypes/), about which I [wrote](https://cloudcannon.com/blog/maximizing-the-convenience-factor-archetypes-in-hugo/) for the [CloudCannon Blog](https://cloudcannon.com/blog/) several months ago. With a Hugo archetype set correctly, you can turn those steps above into a simple one-line command:

```plaintext
hugo new posts/2022/09/hugo-like-archetypes-other-ssgs/index.md
```

. . . instantly creating:

```plaintext
 content/
 └─ posts/
    └─ 2022/
        └─ 09/
            ├── hugo-like-archetypes-other-ssgs/
            │   ├── index.md
```

This works because, in this example, I already have an `archetypes/posts.md` file with the following content:

```md
---
title: "TITLE TO COME"
description: "DESCRIPTION TO COME."
author: Bryce Wray
date: {{ .Date }}
draft: true
---

Text begins here.
```

**However**, for those of you using other SSGs, you can do something very similar to this neat shortcut, and without a lot of trouble.

Let's say your SSG's main files live in a `src` directory at the project's top level. This is a standard convention among SSGs. Create a top-level `archetypes/` folder and put within it a file, `posts.md`, with the following content:

```md
---
title: "TITLE TO COME"
description: "DESCRIPTION TO COME."
author: # fill in your name
draft: true
date: 2022-05-01T11:00:00-05:00
---

Text begins here.
```

- For `author`, substitute your name for my `# fill in your name` comment.
- The `draft` item may not necessarily mean anything to your SSG but, in case you *are* using an SSG which distinguishes between drafts and ready-to-publish files, I included `draft` for safety's sake (as a Hugo archetype typically does) so you don't accidentally post anything before you're ready.
- As for `date`, use a placeholder that works for your date and time zone.

**Note to Windows users**: From here on, you're probably best advised to use [WSL](https://www.thewindowsclub.com/how-to-run-sh-or-shell-script-file-in-windows-10).
{.yellowBox}

Then, in your project's top level, create a shell script, which I'll call `newfile.sh`:

```bash
#!/bin/sh
echo "Provide path/filename in the format: posts/yyyy/mm/filename.md"
read filepath
cp -v "archetypes/posts.md" "src/$filepath"
```

Of course, feel free to make the `cp -v` line conform to how your site and SSG arrange content. (For a typical [Eleventy](https://11ty.dev) or [Jekyll](https://jekyllrb.com) site, `src/$filepath` should work fine. However, SSGs like [Astro](https://astro.build) and [Next.js](https://nextjs.org) probably expect `src/pages/$filepath`. If necessary, consult your SSG's documentation to make sure you know the right place to target.)

Finally, give `newfile.sh` the necessary permissions:

```bash
chmod 0755 newfile.sh
```

Done! Now, when you want to create a new Markdown file, just enter:

```bash
./newfile.sh
```

The resulting prompt will ask for a path and filename in the proper format (which you can, of course, tailor to the arrangement of your own site's content). If you then enter `posts/2022/09/my-post.md`, the script will copy the contents of `archetypes/post.md` to a new file, `src/posts/2022/09/my-post.md`. Then, all you have to do is open that file, quickly edit the front matter as desired for the new post, and start writing!
