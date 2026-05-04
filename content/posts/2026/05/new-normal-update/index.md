---
title: "A “new normal” update"
description: "Improving my scripting following hvm’s recent changes."
author: Bryce Wray
date: 2026-05-04T15:29:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

[Late last year](/posts/2025/12/new-normal-starting-hugo-0.153.x/), I had to adapt this website's repository to accommodate a change in how [Hugo](https://gohugo.io)'s macOS version is packaged. In short, I started to use the [hvm (Hugo Version Manager) app](https://github.com/jmooring/hvm/) to manage my computer's use of the Hugo binary. More recently, after a change to hvm itself, I made a further adaptation. Fortunately for me, as in the case of that earlier post, Hugo maintainer and hvm creator [Joe Mooring](https://github.com/jmooring) gave me help in overcoming, as I described to him, "my embarrassing lack of [scripting-fu](https://english.stackexchange.com/questions/47694/when-did-things-like-fu-start-to-spread)."

<!--more-->

I will assume you've already read the [aforementioned post from last December](/posts/2025/12/new-normal-starting-hugo-0.153.x/); that way, I needn't go into a huge amount of detail about why I switched to hvm, how it works, and so on. Instead, this post is about the latest incarnation of hvm, how *it* works, and what that meant --- and, to be fair, made possible --- for my purposes.

When I first began using hvm, it was at [v.0.9.0](https://github.com/jmooring/hvm/releases/tag/v0.9.0). At that point, and for a few versions thereafter, it was providing only one [edition](https://gohugo.io/installation/linux/) of Hugo, the extended one. As a result, hvm's auto-generated `.hvm` file needed to give you only the Hugo version number being used by your repo, such as:

```plaintext
v0.153.0
```

Then, a few weeks ago, Mooring released [hvm v.0.14.0](https://github.com/jmooring/hvm/releases/tag/v0.14.0), the first version which allowed the user to choose from among multiple different Hugo editions. Currently, those are standard, standard-with-deploy, extended, and extended-with-deploy.[^extended] This change in hvm, thus, would require the resulting `.hvm` file to provide more information. For example, as I write, here is the content of my repo's `.hvm` file:

```plaintext
v0.161.1/standard
```

[^extended]: Hugo's extended edition (and, presumably, its extended-with-deploy edition) will be deprecated [sometime within the next year or so](https://github.com/jmooring/hvm/issues/218#issue-4165637816). With the [recent deprecation of its embedded LibSass](https://github.com/gohugoio/hugo/releases/tag/v0.153.0) (which itself is [long since gone](https://sass-lang.com/blog/libsass-is-deprecated/)), the extended edition's only remaining *raison d'être* has ended, so removing that edition from the list of regular releases will ease the Hugo team's maintenance burdens.

I initially thought this change would bollix up the local scripting I described in that previous post, but it didn't *because* hvm 0.14.0+ installs the user-specified Hugo binary in a directory structure that corresponds exactly to the mini-path in that `.hvm` file. In other words, this:

```plaintext
/Users/$USERNAME/Library/Caches/hvm/$HUGO_VERSION/hugo
```

. . . still works the same, because `$HUGO_VERSION` *continues to be* the same as what's in `.hvm`:

```plaintext
/Users/$USERNAME/Library/Caches/hvm/v0.161.1/standard/hugo
```

I got an additional benefit from hvm 0.14.0+, thanks to Mooring's [helpful suggestion](https://github.com/jmooring/hvm/issues/218#issuecomment-4180516808): it now makes my site-deployment CI/CD a little less needful of my attention. (After all, automation is supposed to be *less* troublesome, not *more* so, than doing everything manually.) He showed me, in [part of a demo repo he maintains](https://github.com/jmooring/hosting-github-pages-hvm/blob/main/.github/workflows/hugo.yaml#L54-L74), how he uses the `.hvm` output to tell a [GitHub Action](https://docs.github.com/en/actions/get-started/understand-github-actions) which version of Hugo it should download. Previously, I'd always provided that information through manually updating my GitHub Actions workflow file whenever I updated Hugo. Now, with a slight variation[^edition] on Mooring's code, the workflow file gets that info from `.hvm`:

```yaml{bigdiv=true}
- name: Hugo download/install
  run: |
    if [ -f .hvm ]; then
      hvm_raw=$(cat .hvm)
      HUGO_VERSION=$(echo "${hvm_raw%/*}" | tr -d 'v')
    fi
    wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-amd64.deb -O hugo_${HUGO_VERSION}_linux-amd64.deb
    sudo dpkg -i hugo*.deb
```

[^edition]: I now always use the standard edition of Hugo, so I didn't need an additional line from Mooring's code that also pulled the Hugo edition. Instead, my script simply gets the standard edition of whatever Hugo version is mentioned in `.hvm`.

In the third line of that `if`/`fi` loop, `${hvm_raw%/*}` reads the `.hvm` file's contents [up to the slash](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html), while [`tr -d 'v'`](https://linuxize.com/post/linux-tr-command/) removes the `v` that precedes the version number (since that `v` isn't used in the actual file names for the [Hugo release](https://github.com/gohugoio/hugo/releases/) assets). The result provides **only** the Hugo version number as `HUGO_VERSION`, which the succeeding lines use to download the desired version of Hugo onto the GitHub Actions runner.

Incidentally, if you prefer a [GitLab CI/CD](https://docs.gitlab.com/ci/) version of this, here's one I've used:

```yaml{bigdiv=true}
- >
  if [ -f .hvm ]; then
    hvm_raw=$(cat .hvm)
    HUGO_VERSION=$(echo "${hvm_raw%/*}" | tr -d 'v')
  fi
- echo "Downloading and installing Hugo v.$HUGO_VERSION ..."
- curl -LJO https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-amd64.deb
- apt install -y ./hugo_${HUGO_VERSION}_linux-amd64.deb
```

Of course, given how the various CI/CD platforms [seem increasingly overwhelmed by AI-created traffic](https://daringfireball.net/linked/2026/05/04/commits-on-github-are-up-14x-year-over-year), I may end up reverting to [my previously used direct deployment method](/posts/2023/10/direct-deployments-quicker-slicker/) --- in which case, I wouldn't have to inform *any* remote code runner of the Hugo version I'm using. However, while I'm still using remotely hosted CI/CD, I'm pleased to use these methods to simplify things just a tad.
