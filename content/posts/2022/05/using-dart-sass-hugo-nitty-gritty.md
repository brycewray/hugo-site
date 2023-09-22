---
title: "Using Dart Sass with Hugo: the nitty-gritty"
description: "We go under the hood with the installation process for the Dart Sass binary."
author: Bryce Wray
date: 2022-05-22T10:06:00-05:00
#initTextEditor: iA Writer
---

<strong class="red">Important note, 2023-06-20</strong>: There has been a [breaking change in how Embedded Dart Sass is packaged](https://sass-lang.com/blog/rfc-embedded-protocol-2), and [Hugo 0.114.0](https://github.com/gohugoio/hugo/releases/tag/v0.114.0) is the first version that supports the new packaging, which uses the [Dart Sass package](https://github.com/sass/dart-sass#embedded-dart-sass). I have revised this post's instructions for Hugo 0.114.0 and newer. If forced to use an older version of Hugo, you must continue with the [older, archived Embedded Dart Sass packaging](https://github.com/sass/dart-sass-embedded/releases/tag/1.62.1) and the former versions of the instructions, which you can find in [this page's history](https://github.com/brycewray/hugo-site/commits/main/content/posts/2022/05/using-dart-sass-hugo-nitty-gritty/index.md).\
\
<strong class="red">Also</strong>: while these instructions are about installing a **prebuilt Sass binary**, please note that you may find it considerably more convenient to use a **package manager**, instead, as explained in [this comprehensive post](https://discourse.gohugo.io/t/using-the-dart-sass-transpiler/41878) by Joe Mooring on the [Hugo Discourse forum](https://discourse.gohugo.io). *(I personally prefer installing a prebuilt binary, mainly because I'd rather not wait for a package manager to update its repository whenever there's a new release of the binary --- but, if that doesn't concern you, you'll likely prefer using a package manager.)*
{.box}

Some of the responses I got to my recent post, "[Using Dart Sass with Hugo: the GitHub Actions edition](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/)," made it clear that there needs to be a one-stop guide that tells how to set up [the Dart Sass binary](https://github.com/sass/dart-sass) in the `PATH` on one's *local* machine for use with the [Hugo](https://gohugo.io) [static site generator](https://github.com/myles/awesome-static-generators) (SSG).

So let's take care of that right now, shall we?

---

## Introduction

There are four tasks to perform, the first of which you should need to do only once:

- Create a `bin` folder in your user directory and add it (and a designated subfolder-to-come) to your system `PATH`.
- Download/unpack the Dart Sass archive file.
- Move the resulting `dart-sass` folder --- the aforementioned "subfolder-to-come" --- to the `bin` folder.
- Confirm that the system detects the `dart-sass` folder as being in the `PATH`.

With that established, let's break this up into three sections that you can toggle to expand or compress so you'll be looking at only what applies to you and your OS/device combo.

**Note from the future**: The reason we'll be adding **both** `bin` and `bin/dart-sass` to the `PATH` is so that, if you also like to download and install the Hugo binary rather than depending on a package manager (*e.g.*, as explained in my later post, "[How I install Hugo](/posts/2022/10/how-i-install-hugo/)"), you can use `bin` for that purpose. It seems to me that the two installations --- the Hugo binary and the Dart Sass binary --- are sufficiently akin as to suggest such a method.
{.box}

---

## Linux

<details><summary>Click/tap here to toggle open/close.</summary>

Throughout these instructions, we will pretend that your user name is `JohnDoe`. Thus, your user directory (`{$HOME}`) will be `/home/JohnDoe/`.

### Add a folder and subfolder to your `PATH`

1. Create `/home/JohnDoe/bin/` if it doesn't already exist. This `bin` folder will be the **target folder** where you'll store the contents of the Dart Sass archive file you'll be getting shortly.
2. Determine which shell your setup is using, `bash` or `zsh`:
{{< highlight bash "linenos=false" >}}
echo $0
{{< /highlight >}}
This will return either `bash` or `zsh`.

3. Use your preferred terminal-level text editor to open the appropriate file --- either `/home/JohnDoe/.bashrc` or `/home/JohnDoe/.zshrc` --- and add the following lines:
{{< highlight bash "linenos=false" >}}
export PATH="$HOME/bin:$PATH"
export PATH="$HOME/bin/dart-sass:$PATH"
{{< /highlight >}}

4. Restart the terminal app, and check that `PATH` now includes your entries:
{{< highlight bash "linenos=false" >}}
echo $PATH
{{< /highlight >}}

### Get the archive file

1. Navigate to your *default* downloads destination, `/home/JohnDoe/Downloads/`.

2. To get the latest version of Dart Sass, go to its [GitHub releases page](https://github.com/sass/dart-sass/releases) and download the corresponding `tar.gz` archive file for your particular system architecture:
	- 64-bit ARM (`linux-arm64`)
	- 32-bit ARM (`linux-arm`)
	- x64 (`linux-x64`)
	- IA-32 (`linux-ia32`)

3. To unpack the `.tar.gz` archive file to retrieve its contents, enter `tar -xf ` followed by the name of the `.tar.gz` file. (As an alternative, depending on your particular Linux distribution and windows manager, you **may** also be able to use a GUI to perform this operation.) This will result in a `sass_embedded` folder, the contents of which will depend on which `tar.gz` archive file you chose.

### Move the `dart-sass` folder to `bin`

**Note**: If you've done this before and *already* have a `dart-sass` folder within `bin`, you **do** want to delete the existing one in favor of what you'll be moving below.
{.box}

Enter the following in your terminal app:

```bash
mv $HOME/Downloads/dart-sass $HOME/bin/dart-sass
```

### Confirm `dart-sass` is in the `PATH`

Finally, to confirm that the `dart-sass` folder and its contents are in the `PATH`, enter the following in your terminal app:

```plaintext
sass --embedded --version
```
This will run the `sass` shell script included in the `dart-sass` folder. The result **should** look something like this example from Dart Sass v.1.63.4:

```bash
{
  "protocolVersion": "2.1.0",
  "compilerVersion": "1.63.4",
  "implementationVersion": "1.63.4",
  "implementationName": "Dart Sass",
  "id": 0
}
```

If you get any other kind of response, it means the `dart-sass` folder **isn't** in the `PATH`, after all, so you'll have to go back through the procedure and figure out what you missed.

**Note**: If you get a response that shows a wrong version number in `compilerVersion` and/or `implementationVersion`, you apparently haven't moved over the *entire* `dart-sass` folder that you got from unpacking the `.tar.gz` archive file.
{.box}

---

And that's it. I hope this has spared you some searching. If you encounter errors in any of the above information, please [let me know](/contact/) so I can fix it ASAP!

**Reminder**: In a worst-case scenario in which you can't get this to work no matter what you do, there's always the option of using the Node.js Sass package, instead, as I described in the [original article in this series](/posts/2022/03/using-dart-sass-hugo/). It's not quite as elegant for Hugo's purposes, and it definitely is slower than using the Dart Sass binary, but it works.
{.box}

</details>

## macOS

<details><summary>Click/tap here to toggle open/close.</summary>

Throughout these instructions, we will pretend that your user name is `JohnDoe`. Thus, your user directory (`{$HOME}`) will be `/Users/JohnDoe/`.

### Add a folder and subfolder to your `PATH`

1. Create `/Users/JohnDoe/bin/` if it doesn't already exist. This `bin` folder will be the **target folder** where you'll store the contents of the Dart Sass archive file you'll be getting shortly.
2. Determine which shell your setup is using, `bash` or `zsh`:
{{< highlight bash "linenos=false" >}}
echo $0
{{< /highlight >}}
This will return either `bash` or `zsh`.

3. Use your preferred terminal-level text editor to open the appropriate file --- either `/Users/JohnDoe/.bashrc` or `/Users/JohnDoe/.zshrc` --- and add the following lines:
{{< highlight bash "linenos=false" >}}
export PATH="$HOME/bin:$PATH"
export PATH="$HOME/bin/dart-sass:$PATH"
{{< /highlight >}}

4. Restart the terminal app, and check that `PATH` now includes your entries:
{{< highlight bash "linenos=false" >}}
echo $PATH
{{< /highlight >}}

### Get the archive file

1. Navigate to your *default* downloads destination, `/Users/JohnDoe/Downloads/`.

2. To get the latest version of Dart Sass, go to its [GitHub releases page](https://github.com/sass/dart-sass/releases/) and download the corresponding `tar.gz` archive file for your particular system architecture:
	- Apple Silicon (`macos-arm64`)
	- Intel (`macos-x64`)

3. To unpack the `.tar.gz` archive file to retrieve its contents, enter `tar -xf ` followed by the name of the `.tar.gz` file. (As an alternative, you can double-click the `.tar.gz` file in the Finder.)\
The resulting contents should be as shown inside your downloads folder:
{{< highlight plaintext "linenos=false" >}}
dart-sass
└─ dart-sass-embedded
└─ src
		└─ dart
		└─ LICENSE
		└─ sass.snapshot
{{< /highlight >}}
Even though it lacks an extension, `dart-sass/sass` is a shell script that works with the actual binary, `dart-sass/src/dart`.

### Move the `dart-sass` folder to `bin`

**Note**: If you've done this before and *already* have a `dart-sass` folder within `bin`, you **do** want to delete the existing one in favor of what you'll be moving below.
{.box}

Enter the following in your terminal app:

```bash
mv $HOME/Downloads/dart-sass $HOME/bin/dart-sass
```

### Confirm `dart-sass` is in the `PATH`

Finally, to confirm that the `dart-sass` folder and its contents are in the `PATH`, enter the following in your terminal app:

```plaintext
sass --embedded --version
```
This will run the `sass` shell script included in the `sass_embedded` folder. The result **should** look something like this example from Dart Sass v.1.63.4:

```bash
{
  "protocolVersion": "2.1.0",
  "compilerVersion": "1.63.4",
  "implementationVersion": "1.63.4",
  "implementationName": "Dart Sass",
  "id": 0
}
```

If you get any other kind of response, it means the `dart-sass` folder **isn't** in the `PATH`, after all, so you'll have to go back through the procedure and figure out what you missed.

---

And that's it. I hope this has spared you some searching. If you encounter errors in any of the above information, please [let me know](/contact/) so I can fix it ASAP!

**Reminder**: In a worst-case scenario in which you can't get this to work no matter what you do, there's always the option of using the Node.js Sass package, instead, as I described in the [original article in this series](/posts/2022/03/using-dart-sass-hugo/). It's not quite as elegant for Hugo's purposes, and it definitely is slower than using the Dart Sass binary, but it works.
{.box}

</details>

## Windows

<details><summary>Click/tap here to toggle open/close.</summary>

Throughout these instructions, we will pretend that your user name is `JohnDoe`. Thus, your user directory will be `C:\Users\JohnDoe\`.

### Add a folder and subfolder to your `PATH`

<strong class="red">IMPORTANT</strong>: Because Windows truncates `PATH` to 1,024 characters, **first** open Command Prompt and make a text backup of `PATH`:\
   `echo %PATH% > C:\path-backup.txt`\
If you need to restore the `PATH` later, enter:\
   `set %PATH%=>C:\path-backup.txt`
{.box}

1. Create `C:\Users\JohnDoe\bin\` if it doesn't already exist. This `bin` folder will be the **target folder** where you'll store the contents of the Dart Sass archive file you'll be getting shortly.
2. In the Windows Taskbar search box, search for `cmd`.
3. Select the **Command Prompt** result and click the **Run as administrator** option.
4. In Command Prompt, enter:
{{< highlight powershell "linenos=false" >}}
setx PATH "C:\Users\JohnDoe\bin;%PATH%"
{{< /highlight >}}
5. Close Command Prompt.
6. Repeat steps 2--3 to reload Command Prompt with **Run as administrator** again.
7. In Command Prompt, enter:
{{< highlight powershell "linenos=false" >}}
setx PATH "C:\Users\JohnDoe\bin\dart-sass;%PATH%"
{{< /highlight >}}
8. Repeat step 2--3 to reload Command Prompt (with or without **Run as administrator** this time) and check the `PATH` to confirm your new entries are there:
{{< highlight powershell "linenos=false" >}}
echo %PATH%
{{< /highlight >}}

### Get the archive file

1. Navigate to your *default* downloads destination, `C:\Users\JohnDoe\Downloads\`.

2. To get the latest version of Dart Sass, go to its [GitHub releases page](https://github.com/sass/dart-sass/releases) and download the corresponding `tar.gz` archive file for your particular system architecture:
	- x64 (`windows-x64`)
	- IA-32 (`windows-ia32`)
3. In the Windows Taskbar search box, search for `cmd`.
4. Open `Command Prompt` (with or without `Run as administrator`).
5. In Command Prompt, enter `tar -xf ` followed by the name of the `.tar.gz` file.\
The resulting contents should be as shown (inside the regular downloads folder):
{{< highlight plaintext "linenos=false" >}}
dart-sass
└─ sass.bat
└─ src
		└─ dart.exe
		└─ LICENSE
		└─ sass.snapshot
{{< /highlight >}}
The `dart-sass\sass.bat` batch file works with the actual binary, `dart-sass\src\dart.exe`.

### Move the `dart-sass` folder to `bin`

**Note**: If you've done this before and *already* have a `dart-sass` folder within `bin`, you **do** want to delete the existing one in favor of what you'll be moving below.
{.box}

Enter the following in Command Prompt:

```powershell
move C:\Users\JohnDoe\Downloads\dart-sass C:\Users\JohnDoe\bin\dart-sass
```

### Confirm `dart-sass` is in the `PATH`

Finally, to confirm that the `dart-sass` folder and its contents are in the `PATH`, enter the following in Command Prompt:

```plaintext
sass --embedded --version
```
This will run the `sass.bat` batch file included in the `dart-sass` folder. The result **should** look something like this example from Dart Sass v.1.63.4:

```bash
{
  "protocolVersion": "2.1.0",
  "compilerVersion": "1.63.4",
  "implementationVersion": "1.63.4",
  "implementationName": "Dart Sass",
  "id": 0
}
```

If you get any other kind of response, it means the `dart-sass` folder **isn't** in the `PATH`, after all, so you'll have to go back through the procedure and figure out what you missed.

And that's it. I hope this has spared you some searching. If you encounter errors in any of the above information, please [let me know](/contact/) so I can fix it ASAP!

**Reminder**: In a worst-case scenario in which you can't get this to work no matter what you do, there's always the option of using the Node.js Sass package, instead, as I described in the [original article in this series](/posts/2022/03/using-dart-sass-hugo/). It's not quite as elegant for Hugo's purposes, and it definitely is slower than using the Dart Sass binary, but it works.
{.box}

</details>
&nbsp;

---

## References

- Zachary Betz, "[How to Add a Binary (or Executable, or Program) to Your PATH on macOS, Linux, or Windows](https://zwbetz.com/how-to-add-a-binary-to-your-path-on-macos-linux-windows/)" (<span class="nobrk">2021-06-23</span>).
- Talha Saif Malik, "[How do I know if I have bash or zsh?](https://linuxhint.com/know-bash-or-zsh/)" (<span class="nobrk">2021-06-06</span>).
- "Srini," "[Move files and directories to another location](https://www.windows-commandline.com/move-files-directories/)" (<span class="nobrk">2014-01-05</span>).
- [Apple Support website](https://support.apple.com), "[Use zsh as the default shell on your Mac](https://support.apple.com/en-us/HT208050)" (<span class="nobrk">2020-01-28</span>).
- [JavaTpoint website](https://www.javatpoint.com), "[Linux Home Directory](https://www.javatpoint.com/linux-home-directory) (retrieved <span class="nobrk">2022-05-22</span>).
- [ShellHacks website](https://www.shellhacks.com/), "[Windows CMD: PATH Variable — Add To PATH — Echo PATH](https://www.shellhacks.com/windows-cmd-path-variable-add-to-path-echo-path/)" (<span class="nobrk">2019-04-19</span>).
- [tar(1) Linux manual page](https://man7.org/linux/man-pages/man1/tar.1.html) (retrieved <span class="nobrk">2022-05-22</span>).
- [TheWindowsClub website](https://www.thewindowsclub.com/), "[How to Run Command Prompt as an Administrator in Windows 11/10](https://www.thewindowsclub.com/how-to-run-command-prompt-as-an-administrator)" (<span class="nobrk">2019-04-18</span>).
