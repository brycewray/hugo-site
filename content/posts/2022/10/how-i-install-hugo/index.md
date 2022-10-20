---
title: "How I install Hugo"
description: "Here’s how to bypass package managers and “go direct” when it’s time to install or upgrade Hugo."
author: Bryce Wray
tags: [web-development, static-site-generators, ssg, hugo, github, macos, linux, windows]
date: 2022-10-12T12:15:00-05:00
#draft: true
initTextEditor: iA Writer
---

When I [indicated](/posts/2022/07/really-getting-started-hugo) how I thought newcomers to the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG) should proceed --- *i.e.*, as opposed to the [official path](https://gohugo.io/getting-started/quick-start/) --- I said this about the process of actually installing Hugo on one's system:

> Hugo is an app that you install on your computer. You can do that by either (a.) relying on a *package manager* app or (b.) directly downloading from the Hugo GitHub repository. Although I personally prefer the second method, most new users likely will find the first easier; so let’s go with package managers.

. . . and, in a footnote, I explained *why* I prefer the second method as opposed to using package managers:

> The main thing I like about the direct-download method is that I can get a new Hugo version as soon as it's available in the GitHub repo. With a package manager, you have to wait for the new version to be added to that app's collection; although the accompanying delay often is only a few hours, it has occasionally stretched to multiple days.

That's why, here, I'm going to explain how to employ that direct-download method.

*(I base the following on my "[Using Dart Sass with Hugo: the nitty-gritty](/posts/2022/05/using-dart-sass-hugo-nitty-gritty/)," which I note just in case you find any of it oddly familiar.)*

---

## Introduction

There are four tasks to perform, the first of which you should need to do only once:

- Create a `bin` folder in your user directory and add it to your system `PATH`.
- Download/unpack the Hugo archive file, from which you'll get the Hugo binary file.
- Move the Hugo binary to the `bin` folder.
- Confirm that the system detects the Hugo binary as being in the `PATH`. *(With macOS, this will include getting the binary "blessed," as I'll explain.)*

With that established, let's break this up into three sections that you can toggle to expand or compress so you'll be looking at only what applies to you and your OS/device combo.

---

## Linux

<details><summary>Click/tap here to toggle open/close.</summary>

Throughout these instructions, we will pretend that your user name is `JohnDoe`. Thus, your user directory (`{$HOME}`) will be `/home/JohnDoe/`.

**Update**: [Daniel F. Dickinson](https://www.wildtechgarden.ca/about/) was kind enough to pass along these additional notes regarding Linux use, so please take them into account as you view the steps below.\
\
• If `$HOME` is mounted with the [`noexec` option](https://linux.die.net/man/1/noexec), you must put the Hugo binary in a supported system location, and that will require root (or equivalent) access.\
\
• The suggested procedure can also run into trouble if (a.) protection mechanisms like [SELinux](https://github.com/SELinuxProject/selinux) are in use, (b.) one is using an [OSTree](https://ostreedev.github.io/ostree/introduction/)-based distribution, which may not allow the procedure, and/or (c.) one is within an **enterprise**-based Linux setup, which may have even more lockdown options and their associated complications.
{.yellowBox}

### Add a folder to your `PATH`

1. Create `/home/JohnDoe/bin/` if it doesn't already exist. This `bin` folder will be the **target folder** where you'll store the Hugo binary.
2. Determine which shell your setup is using, `bash` or `zsh`:
{{< highlight bash "linenos=false" >}}
echo $0
{{< /highlight >}}
This will return either `bash` or `zsh`.

3. Use your preferred terminal-level text editor to open the appropriate file --- either `/home/JohnDoe/.bashrc` or `/home/JohnDoe/.zshrc` --- and add the following:
{{< highlight bash "linenos=false" >}}
export PATH="$HOME/bin:$PATH"
{{< /highlight >}}

4. Restart the terminal app, and check that `PATH` now includes your entry:
{{< highlight bash "linenos=false" >}}
echo $PATH
{{< /highlight >}}

### Get the archive file

1. Navigate to your *default* downloads destination, `/home/JohnDoe/Downloads/`.

2. To get the latest version of Hugo, go to its [GitHub releases page](https://github.com/gohugoio/hugo/releases) and download the corresponding `tar.gz` archive file for your particular system architecture, either 64-bit ARM (`linux-arm64`) or 64-bit Intel/AMD (`linux-amd64`).\
**Important**: Always be sure to get the **extended** version, which usually will be found nearer to the bottom of the list of archives (you sometimes may have to click a link to show the entire list).

3. To unpack the `.tar.gz` archive file to retrieve its contents, enter `tar -xf ` followed by the name of the `.tar.gz` file. (As an alternative, depending on your particular Linux distribution and windows manager, you **may** also be able to use a GUI to perform this operation.)\
The resulting contents should be as shown in your downloads folder **(here and below, for examples, we're using Hugo 0.104.3 and the Linux version for 64-bit Intel/AMD CPUs)**:
{{< highlight plaintext "linenos=false" >}}
hugo_extended_0.104.3_Linux-64bit
└─ hugo   <-- the Hugo binary
└─ LICENSE
└─ README.md
{{< /highlight >}}

### Move the Hugo binary to `bin`

**Note**: If you've done this before and *already* have a Hugo binary within `bin`, you **do** want to delete the existing one in favor of what you'll be moving below.
{.yellowBox}

Enter the following in your terminal app:

```bash
mv $HOME/Downloads/hugo_extended_0.104.3_Linux-64bit/hugo $HOME/bin
```

(As an alternative, depending on your particular Linux distribution and windows manager, you **may** also be able to use a GUI to perform this operation.)

### Confirm the Hugo binary is in the `PATH`

Finally, to confirm that the Hugo binary is in the `PATH`, enter the following in your terminal app:

```plaintext
hugo version
```

The result **should** look something like this:

```bash
hugo v0.104.3-58b824581360148f2d91f5cc83f69bd22c1aa331+extended linux/amd64 BuildDate=2022-10-04T14:25:23Z VendorInfo=gohugoio
```

If you get any other kind of response, it means the Hugo binary **isn't** in the `PATH`, after all, so you'll have to go back through the procedure and figure out what you missed.

---

And that's it. If you encounter errors in any of the above information, please [let me know](/contact/) so I can fix it ASAP!

</details>

## macOS

<details><summary>Click/tap here to toggle open/close.</summary>

Throughout these instructions, we will pretend that your user name is `JohnDoe`. Thus, your user directory (`{$HOME}`) will be `/Users/JohnDoe/`.

### Add a folder to your `PATH`

1. Create `/Users/JohnDoe/bin/` if it doesn't already exist. This `bin` folder will be the **target folder** where you'll store the Hugo binary you'll be getting shortly.
2. Determine which shell your setup is using, `bash` or `zsh`:
{{< highlight bash "linenos=false" >}}
echo $0
{{< /highlight >}}
This will return either `bash` or `zsh`.

3. Use your preferred terminal-level text editor to open the appropriate file --- either `/Users/JohnDoe/.bashrc` or `/Users/JohnDoe/.zshrc` --- and add the following:
{{< highlight bash "linenos=false" >}}
export PATH="$HOME/bin:$PATH"
{{< /highlight >}}

4. Restart the terminal app, and check that `PATH` now includes your entry:
{{< highlight bash "linenos=false" >}}
echo $PATH
{{< /highlight >}}

### Get the archive file

1. Navigate to your *default* downloads destination, `/Users/JohnDoe/Downloads/`.

2. To get the latest version of Hugo, go to its [GitHub releases page](https://github.com/gohugoio/hugo/releases) and download the `tar.gz` archive file for the macOS universal binary, which was available beginning with Hugo 0.102.0; for an earlier version, select either Apple Silicon (`macos-arm64`) or Intel (`macos-x64`).\
**Important**: Always be sure to get the **extended** version, which usually will be found nearer to the bottom of the list of archives (you sometimes may have to click a link to show the entire list).

3. To unpack the `.tar.gz` archive file to retrieve its contents, double-click the `.tar.gz` file.\
The resulting contents should be as shown inside your downloads folder **(here and below, for examples, we're using Hugo 0.104.3)**:
{{< highlight plaintext "linenos=false" >}}
hugo_extended_0.104.3_darwin-universal
└─ hugo   <-- the Hugo binary
└─ LICENSE
└─ README.md
{{< /highlight >}}

### Move the Hugo binary to `bin`

Use the macOS Finder to move the `hugo` file to the `bin` folder.

**Note**: If you've done this before and *already* have a Hugo binary within `bin`, you **do** want to delete the existing one in favor of the latest version.
{.yellowBox}

### Get macOS to “bless” the Hugo binary

You'll now have to get macOS to allow the use of the Hugo binary, which macOS considers to be from an *unidentified developer* (see "[Open a Mac app from an unidentified developer](https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac)" on the [Apple Support site](https://support.apple.com)).

First, open the Mac **System Preferences** app and click the **Security and Privacy** settings icon. If necessary, click on its **General** tab. Then click its *lock* icon and enter your user password. This unlocks the "Allow apps downloaded from" area for a few minutes. **Keep this open for now.**

Next, in your terminal app, enter the following, which attempts to run the Hugo binary only to show its version:

```plaintext
hugo version
```

You'll get a macOS warning about the file; click **Cancel**. Then, back in the **Security and Privacy** settings window, approve the use of the Hugo binary by clicking **Allow Anyway**. *‌(If desired, you can now close the Mac **System Preferences** app.)*

**Note**: If you get no such warning, it means the Hugo binary **isn't** in the `PATH`, after all, so you'll have to go back through the procedure and figure out what you missed.
{.yellowBox}

Go back to the terminal app and, once again, enter:

```plaintext
hugo version
```

This time, you'll get a minor macOS warning but, this time, just click **Open** to bypass it --- and this will tell macOS to stop such warnings in the future about *this* particular Hugo binary file. Now, in the terminal app, you'll see something like this, which confirms not only the version info for the Hugo binary you installed but also that macOS has "blessed" it:

```bash
hugo v0.104.3-58b824581360148f2d91f5cc83f69bd22c1aa331+extended darwin/amd64 BuildDate=2022-10-04T14:25:23Z VendorInfo=gohugoio
```

---

And that's it. If you encounter errors in any of the above information, please [let me know](/contact/) so I can fix it ASAP!

</details>

## Windows

<details><summary>Click/tap here to toggle open/close.</summary>

Throughout these instructions, we will pretend that your user name is `JohnDoe`. Thus, your user directory will be `C:\Users\JohnDoe\`.

### Add a folder to your `PATH`

<strong class="red">IMPORTANT</strong>: Because Windows truncates `PATH` to 1,024 characters, **first** open Command Prompt and make a text backup of `PATH`:\
   `echo %PATH% > C:\path-backup.txt`\
If you need to restore the `PATH` later, enter:\
   `set %PATH%=>C:\path-backup.txt`
{.yellowBox}

1. Create `C:\Users\JohnDoe\bin\` if it doesn't already exist. This `bin` folder will be the **target folder** where you'll store the Hugo binary you'll be getting shortly.
2. In the Windows Taskbar search box, search for `cmd`.
3. Select the **Command Prompt** result and click the **Run as administrator** option.
4. In Command Prompt, enter:
{{< highlight powershell "linenos=false" >}}
setx PATH "C:\Users\JohnDoe\bin;%PATH%"
{{< /highlight >}}
5. Close Command Prompt.
6. Repeat steps 2--3 to reload Command Prompt (with or without **Run as administrator** this time) and check the `PATH` to confirm your new entry is there:
{{< highlight powershell "linenos=false" >}}
echo %PATH%
{{< /highlight >}}

### Get the archive file

1. Navigate to your *default* downloads destination, `C:\Users\JohnDoe\Downloads\`.

2. To get the latest version of Hugo, go to its [GitHub releases page](https://github.com/gohugoio/hugo/releases) and download the `.zip` archive file for Windows.\
**Important**: Always be sure to get the **extended** version, which usually will be found nearer to the bottom of the list of archives (you sometimes may have to click a link to show the entire list); at this writing, there is **no** extended version for Windows ARM.
3. In Windows Explorer, double-click the `.zip` file and choose to *extract* its contents, which should be as shown inside the regular downloads folder **(here and below, for examples, we're using Hugo 0.104.3)**:
{{< highlight plaintext "linenos=false" >}}
hugo_extended_0.104.3_windows-amd64
└─ hugo.exe   <-- the Hugo binary
└─ LICENSE
└─ README.md
{{< /highlight >}}

### Move the Hugo binary to `bin`

Use Windows Explorer to move the `hugo.exe` file to the `bin` folder.

**Note**: If you've done this before and *already* have a Hugo binary within `bin`, you **do** want to delete the existing one in favor of the latest version.
{.yellowBox}

### Confirm the Hugo binary is in the `PATH`

Finally, to confirm that the Hugo binary is in the `PATH`, enter the following in Command Prompt:

```plaintext
hugo version
```

The result **should** look something like this:

```bash
hugo v0.104.3-58b824581360148f2d91f5cc83f69bd22c1aa331+extended windows/amd64 BuildDate=2022-10-04T14:25:23Z VendorInfo=gohugoio
```

If you get any other kind of response, it means the Hugo binary **isn't** in the `PATH`, after all, so you'll have to go back through the procedure and figure out what you missed.

And that's it. If you encounter errors in any of the above information, please [let me know](/contact/) so I can fix it ASAP!

</details>
&nbsp;

---

## References

- Zachary Betz, "[How to Add a Binary (or Executable, or Program) to Your PATH on macOS, Linux, or Windows](https://zwbetz.com/how-to-add-a-binary-to-your-path-on-macos-linux-windows/)."
- Talha Saif Malik, "[How do I know if I have bash or zsh?](https://linuxhint.com/know-bash-or-zsh/)"
- "Srini," "[Move files and directories to another location](https://www.windows-commandline.com/move-files-directories/)."
- [Apple Support website](https://support.apple.com), "[Use zsh as the default shell on your Mac](https://support.apple.com/en-us/HT208050)," January 28, 2020.
- [JavaTpoint website](https://www.javatpoint.com), "[Linux Home Directory](https://www.javatpoint.com/linux-home-directory)."
- [ShellHacks website](https://www.shellhacks.com/), "[Windows CMD: PATH Variable — Add To PATH — Echo PATH](https://www.shellhacks.com/windows-cmd-path-variable-add-to-path-echo-path/)."
- [tar(1) Linux manual page](https://man7.org/linux/man-pages/man1/tar.1.html).
- [TheWindowsClub website](https://www.thewindowsclub.com/), "[How to Run Command Prompt as an Administrator in Windows 11/10](https://www.thewindowsclub.com/how-to-run-command-prompt-as-an-administrator)."
