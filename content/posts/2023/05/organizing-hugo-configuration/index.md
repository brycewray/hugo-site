---
title: "Organizing your Hugo configuration"
description: "Config files tend to get nasty over time. Hugo’s configuration folder can help you clean up the mess."
author: Bryce Wray
date: 2023-05-02T11:46:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

The strangest little things can set one off to changing a project's settings. In my case, it was a red squiggly line in [Visual Studio Code](https://code.visualstudio.com/) that I absolutely hated to see, especially because I was pretty sure I hadn't earned it.

As a result, my [Hugo](https://gohugo.io) project now has a much better-organized configuration, which is today's subject.

<!--more-->

One welcome new wrinkle that came with [last December's release of Hugo 0.108.0](https://github.com/gohugoio/hugo/releases/tag/v0.108.0) was the ability to add an image in Markdown **without** having the image wrapped within a paragraph in the resulting HTML. This required making the following setting[^default] in one's [Hugo configuration](https://gohugo.io/getting-started/configuration/):

```bash
markup.goldmark.parser.wrapStandAloneImageWithinParagraph = false
```

[^default]: This item's default setting is `true`.

A Hugo config file can be in one of three formats: TOML, YAML, or JSON. I'd long preferred YAML --- more on that later --- so, in my case, this meant (I'm editing out other settings for easier reading):

```yaml
markup:
  goldmark:
    parser:
      wrapStandAloneImageWithinParagraph: false
```

However, VS Code's infamous red squiggly line[^ext] marked the setting as non-kosher:

[^ext]: I assume the error indication came from the [YAML Language Support extension](https://github.com/redhat-developer/vscode-yaml) I'd long ago installed in VS Code.

{{< imgh src="2023-05-02_screenshot_hugo-yaml-vsc_non-error_edit_2514x176.png" alt="Screenshot of VS Code erroneously marking a Hugo configuration setting as a YAML violation" width=2514 height=176 >}}

. . . with this not-so-informative error message: 

> Property wrapStandAloneImageWithinParagraph is not allowed. yaml-schema: parser options

Yet, this definitely *is* how a YAML-format Hugo config file should specify that setting, according to the [Hugo documentation](https://gohugo.io/getting-started/configuration-markup/#goldmark).

I put up with this for a while, especially since I rarely looked at that part of the config file. Then, one day, I got to wondering: would the setting be okay in a TOML-format config file? So, just to see what I'd get, I created a TOML file with the same settings (I'll show you later how that would look); and, sure enough, VS Code apparently had no problem with the TOML version of the same setting.

And, odd as it may seem, that started me thinking about something I'd tried some months back but quickly abandoned: switching my project config from YAML to TOML. Hugo's default config format is TOML, and most articles I see about Hugo configs tend to assume that format's use --- not to mention that the configs of most Hugo project repos I examine online seem to be overwhelmingly in TOML --- so, I guessed, my using TOML rather than YAML could mean somewhat less mental friction during my usual research.

But why *had* I "quickly abandoned" going with TOML rather than YAML? After all, I'd used TOML for the first two years of my work with Hugo (although much of that had been during times when I was using other [static site generators](https://jamstack.org/generators), so it's more accurate to say that I'd used TOML *actively* for about a year).

The truth is that I don't recall why I switched from TOML to YAML. However, I *definitely* remember why, early this year, I abandoned a try at returning to TOML: I found YAML easier to maintain. Or, perhaps, a more honest way to say it is that my configuration had become messy over the years, and TOML doesn't play nicely with messes.

Specifically, I'd gotten in the habit of sticking stuff all over the YAML config file rather than organizing it properly. With TOML, that's a no-no. Here's a short example of a messy, but acceptable, Hugo config in YAML:

```yaml
baseURL: https://www.example.com/
title: example.com
timeZone: America/Chicago

params:
  AuthorEmail: 'johndoe@johndoe.com'
  Description: 'John Doe’s website'

enableRobotsTXT: true
```

That looks innocent enough, but if you tried it in TOML **in the same order**, like this:

```toml
baseURL = 'https://www.example.com'
title = 'example.com'
timeZone = 'America/Chicago'

[params]
	AuthorEmail = 'johndoe@johndoe.com'
	Description = 'John Doe’s website'
	
enableRobotsTXT = true	
```

. . . the `enableRobotsTXT` setting would be ignored, because it came *after* the hierarchical setting, `params`. A *correct* version for TOML would be:

```toml
baseURL = 'https://www.example.com'
title = 'example.com'
timeZone = 'America/Chicago'
enableRobotsTXT = true	

[params]
	AuthorEmail = 'johndoe@johndoe.com'
	Description = 'John Doe’s website'
```

In other words, you have to do all your *non*-hierarchical stuff *before* you get to hierarchies. YAML doesn't care about that, but TOML absolutely does.

Okay, fair enough, I decided --- except for three things:

1. My YAML config file had grown to over 160 lines, although some were empty lines to facilitate easy reading.
2. The file had a *lot* of non-hierarchical settings sprinkled around the hierarchies. Still, that wasn't so bad; I'd simply move them up to the top, before any of the hierarchies.\
***But . . .***
3. I'd then need to deal with how you have to format multi-level hierarchies. *That* was still going to be a major pain.

To prove my point, **now** I'll show you the TOML version of the original, small example:

```toml
[markup]
  [markup.goldmark]
    [markup.goldmark.parser]
      wrapStandAloneImageWithinParagraph = false
```

As you can see, the level-jumping that YAML does just with spaces is quite a bit more verbose in TOML.[^spaces] And it can go deeper than that. Try this on for size:

[^spaces]: Speaking of spaces: in TOML, you really don't have to have those indents (as you do in YAML). However, you *can* have them in TOML if you wish, and I find they make for easier reading through the hierarchies.

```toml
[markup]
  [markup.goldmark]
    [markup.goldmark.parser]
      [markup.goldmark.parser.attribute]
        block = true
        title = true
```

. . . as compared to its YAML equivalent:

```yaml
markup:
	goldmark:
		parser:
			attribute:
				block: true
				title: true
```

I could certainly *read* the TOML version, but I didn't *like* it as well. (There also are cases where [TOML requires *double* brackets](https://toml.io/en/v1.0.0#array-of-tables) but, fortunately, my setup was sufficiently simple as not to need them.)

While I was mulling over these changes, I took a look at some other Hugo repos to see how they dealt with such verbosity. It was then that I realized the conversion to TOML shouldn't be my stopping point. Instead, I also needed to take advantage of a [long-extant](https://github.com/gohugoio/hugo/releases/tag/v0.53) Hugo option: the *[configuration directory](https://gohugo.io/getting-started/configuration/#configuration-directory)*. This allows you to put separate sections in separate files, cutting down considerably on the reading clutter. (With TOML, you'll want to keep the non-hierarchical items in your base config file, such as `hugo.toml`.) As the documentation says:

> Each file represents a configuration root object, such as `params.toml` for `[Params]`, `menu(s).toml` for `[Menu]`, `languages.toml` for `[Languages]` . . .

The original example would look like this in a `markup.toml` file:

```toml
[goldmark]
	[goldmark.parser]
	  wrapStandAloneImageWithinParagraph = false
```

Still verbose? Yes. But *less* verbose than the one-file alternative, since the top-level setting --- in this case, `markup` --- is understood from the get-go? Again, yes.

So that's the way I went. I now have the following setup in my Hugo project:

```plaintext
.
└── config
		└── default
				└── build.toml
				└── caches.toml
				└── frontmatter.toml
				└── hugo.toml
				└── imaging.toml
				└── markup.toml
				└── minify.toml
				└── outputformats.toml
				└── outputs.toml
				└── params.toml
				└── privacy.toml
				└── security.toml
				└── services.toml
				└── taxonomies.toml
		└── production
				└── caches.toml
				└── hugo.toml
```

**Note**: The items in the `config/production/` folder contain the very small number of settings that are different in production mode than in dev mode; in production, they override the appropriate settings from their counterpart files in `config/default/`.
{.box}

----

While I initially dreaded trying once again to go from YAML to TOML, I found that using the configuration folder made the transition considerably easier, especially for settings with fairly involved hierarchies. Better yet, I can keep all the *non*-hierarchical stuff together in `hugo.toml`, safe from possible interference with hierarchies elsewhere.

If your own Hugo project's configuration has become messy over time, a similar approach might help you clean it up.

## References and related reading

- Hugo documentation, "[Configure Hugo](https://gohugo.io/getting-started/configuration/)" (last updated <span class="nobrk">2023-04-15</span>).
- [TOML repo](https://github.com/toml-lang/toml).
- [TOML website](https://toml.io).
- Igor Baiborodine, "[Manage Environment-Specific Settings for Hugo-Based Website](https://www.kiroule.com/article/manage-environment-specific-settings-for-hugo-based-website/)" (<span class="nobrk">2020-07-27</span>).
- Colm O'Connor, "[What is wrong with TOML?](https://hitchdev.com/strictyaml/why-not/toml/)" (date unknown).
- J. P. Droege, "[The complete guide to Hugo file structure and code organization](https://jpdroege.com/blog/hugo-file-organization/)" (2019).
- Siddharth Shyniben, "[Why not TOML?](https://dev.to/siddharthshyniben/why-not-toml-1fj9)" (<span class="nobrk">2021-09-22</span>).
- Martin Ueding, "[JSON vs. YAML vs. TOML](https://martin-ueding.de/posts/json-vs-yaml-vs-toml/)" (<span class="nobrk">2022-08-31</span>).
