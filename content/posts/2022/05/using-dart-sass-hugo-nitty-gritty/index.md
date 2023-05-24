---
title: "Using Dart Sass with Hugo: the nitty-gritty"
description: "We go under the hood with the installation process for the Dart Sass binary."
author: Bryce Wray
date: 2022-05-22T10:06:00-05:00
#initTextEditor: iA Writer
---

<strong class="red">Important note, 2023-05-24</strong>: I am revising this to reflect a [breaking change in how Embedded Dart Sass is packaged](https://sass-lang.com/blog/rfc-embedded-protocol-2). However, you should **keep using the current/archived Embedded Dart Sass binary** ([v.1.62.1](https://github.com/sass/dart-sass-embedded/releases/tag/1.62.1)) until there's an update to the Dart Sass binary that truly does provide the full capability of Embedded Dart Sass. I learned the hard way that the **current** Dart Sass binary (also v.1.62.1) **doesn't yet** support Embedded Dart Sass fully --- *e.g.*, it doesn't "watch" files properly for when you make edits to your `.scss` files. (This is despite the fact that the Sass team has already changed the Dart Sass README to say that commands such as `sass --embedded` and `sass --embedded --version` will work; they **don't** with the current Dart Sass binary --- which makes sense, given that v.1.62.1 was released weeks before the Sass team made this change.)
{.box}

Some of the responses I got to my recent post, "[Using Dart Sass with Hugo: GitHub Actions edition](/posts/2022/05/using-dart-sass-hugo-github-actions-edition/)," made it clear that there needs to be a one-stop guide that tells how to set up [the Dart Sass binary](https://github.com/sass/dart-sass) in the `PATH` on one's *local* machine for use with the [Hugo](https://gohugo.io) [static site generator](https://jamstack.org/generators) (SSG).

So let's take care of that right now, shall we?

---

## Introduction

There are four tasks to perform, the first of which you should need to do only once:

- Create a `bin` folder in your user directory and add it (and a designated subfolder-to-come) to your system `PATH`.
- Download/unpack the Dart Sass archive file.
- Move the resulting `dart-sass` folder --- the aforementioned "subfolder-to-come" --- to the `bin` folder.
- Confirm that the system detects the `dart-sass` folder as being in the `PATH`.

With that established, let's break this up into three sections that you can toggle to expand or compress so you'll be looking at only what applies to you and your OS/device combo. I have successfully tested these procedures in all three OSs mentioned, using macOS natively and running Linux and Windows in virtual machines.

**Note from the future**: The reason we'll be adding **both** `bin` and `bin/dart-sass` to the `PATH` is so that, if you also like to download and install the Hugo binary rather than depending on a package manager (*e.g.*, as explained in my later post, "[How I install Hugo](/posts/2022/10/how-i-install-hugo/)"), you can use `bin` for that purpose. It seems to me that the two installations --- the Hugo binary and the Embedded Dart Sass binary --- are sufficiently akin as to suggest such a method.
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
	- x64 (`linux-x64`)
	- 64-bit ARM (`linux-arm64`)
	- IA-32 (`linux-ia32`)
	- 32-bit ARM (`linux-arm`)

3. To unpack the `.tar.gz` archive file to retrieve its contents, enter `tar -xf ` followed by the name of the `.tar.gz` file. (As an alternative, depending on your particular Linux distribution and windows manager, you **may** also be able to use a GUI to perform this operation.) This will result in a `dart-sass` folder, the contents of which will depend on which `tar.gz` archive file you chose.

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
sass --version
```
This will run the `sass` shell script included in the `dart-sass` folder. The result **should** look something like this example from Embedded Dart Sass v.1.62.1:

```bash
1.62.1
```

If you get any other kind of response, it means the `dart-sass` folder **isn't** in the `PATH`, after all, so you'll have to go back through the procedure and figure out what you missed.

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

2. To get the latest version of Dart Sass, go to its [GitHub releases page](https://github.com/sass/dart-sass/releases) and download the corresponding `tar.gz` archive file for your particular system architecture:
	- Apple Silicon (`macos-arm64`)
	- Intel (`macos-x64`)

3. To unpack the `.tar.gz` archive file to retrieve its contents, enter `tar -xf ` followed by the name of the `.tar.gz` file. (As an alternative, you can double-click the `.tar.gz` file in the Finder.)\
The resulting contents should be as shown inside your downloads folder:
{{< highlight plaintext "linenos=false" >}}
dart-sass
└─ sass
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
sass --version
```
This will run the `sass` shell script included in the `dart-sass` folder. The result **should** look something like this example from Embedded Dart Sass v.1.62.1:

```bash
1.62.1
```

If you get any other kind of response, it means the `dart-sass` folder **isn't** in the `PATH`, after all, so you'll have to go back through the procedure and figure out what you missed.

---

And that's it. I hope this has spared you some searching. If you encounter errors in any of the above information, please [let me know](/contact/) so I can fix it ASAP!

**Reminder**: In a worst-case scenario in which you can't get this to work no matter what you do, there's always the option of using the Node.js Sass package, instead, as I described in the [original article in this series](/posts/2022/03/using-dart-sass-hugo/). It's not quite as elegant for Hugo's purposes, and it definitely is slower than using the Embedded Dart Sass binary, but it works.
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

1. Create `C:\Users\JohnDoe\bin\` if it doesn't already exist. This `bin` folder will be the **target folder** where you'll store the contents of the Embedded Dart Sass archive file you'll be getting shortly.
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
sass --version
```
This will run the `sass.bat` batch file included in the `sass_embedded` folder. The result **should** look something like this example from Dart Sass v.1.62.1:

```bash
1.62.1
```

If you get any other kind of response, it means the `dart-sass` folder **isn't** in the `PATH`, after all, so you'll have to go back through the procedure and figure out what you missed.

And that's it. I hope this has spared you some searching. If you encounter errors in any of the above information, please [let me know](/contact/) so I can fix it ASAP!

**Reminder**: In a worst-case scenario in which you can't get this to work no matter what you do, there's always the option of using the Node.js Sass package, instead, as I described in the [original article in this series](/posts/2022/03/using-dart-sass-hugo/). It's not quite as elegant for Hugo's purposes, and it definitely is slower than using the Embedded Dart Sass binary, but it works.
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
