---
title: "The big rebundle"
description: "Aided by an AI-generated script, I undo my hasty action from earlier this year."
author: Bryce Wray
date: 2023-10-06T12:08:00-05:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
# imgs:
# -
---

I'll cut to the chase: after an [admittedly rash decision](/posts/2023/07/big-unbundle/) of a few months ago, I've reverted to an [earlier choice](/posts/2022/07/bundling-up-rebuilding-my-hugo-site) in favor of using [page bundles](https://gohugo.io/content-management/page-bundles/) for managing this [Hugo](https://gohugo.io)-based website.

But how did I handle that without a whole lot of manual agony? That's the real story of this post because, although I'm [on record](/posts/2023/03/no-ai-here-thanks-very-much/) as not being in favor of AI-generated *content*, an AI-generated *script* saved me from hours of trouble.

<!--more-->

I started in on changing my content back to the bundled setup --- over 300 posts, one frickin’ post at a time. After getting a few posts into the process, I stopped briefly to review a post by fellow Hugo user [Pawel Grzybek](https://github.com/pawelgrzybek), "[Migration from single content files to Hugo page bundles](https://pawelgrzybek.com/migration-from-single-content-files-to-hugo-page-bundles/)," which had been instrumental in convincing me to rebundle the site. Down in the post's comments section, a reader asked how long the operation had taken. Grzybek's reply, in part:

> It was actually a very quick process. I wrote a small Node.js script that moved all the files to a new location for me. Writing the script didn't take me longer than 30 minutes, and the script execution took only a few hundred milliseconds.

"A *script*," I muttered, doing a mental facepalm, and added to myself: "--- of *course*, you moron."

Only thing was, given my own limited skill set, I knew it would take *me* quite a while to write a script to handle this for my purposes. In fact, I figured, I could manually complete all the necessary file renames and moves well before I could arrive at a script that not only did them for me but also *didn't* eat my files in the process. So I went the lazy route and asked [Google's Bard AI product](https://bard.google.com) to write me a Bash script to accomplish what I wanted. To my surprise, given how skeptical I've become of AI's ability to do things without "hallucinating," Bard produced *exactly* what I wanted.

I first prompted Bard with:

> Write a Bash script that will look through directories and move each .md file into a subfolder with the same name (except for the .md extension), then move the .md file into the subfolder and rename the .md file "index.md" — for example, if it finds /content/posts/2018/09/my-post.md, it should create /content/posts/2018/09/my-post/, then `mv` the .md file to /content/posts/2018/09/my-post/index.md. It should do this recursively.

It responded with one that would do that, but would have to be moved into each directory to handle the moves for that directory. That was my fault; I hadn't been sufficiently specific about what I wanted. So, then, I further prompted:

> Alter the Bash script so that it prompts me for the directory and then does the same thing I've described, so I don't have to manually move it into directories.

. . . and Bard provided this final script, which worked like a dream after I assigned it the proper permissions[^permissions]:

[^permissions]: `chmod +x move-to-bundles.sh` --- and Bard even reminded me to do that.

```bash{filename="move-to-bundles.sh" bigdiv=true}
#!/bin/bash

# Prompt the user for the directory to scan
echo "Enter the directory to scan:"
read dir

# Check if the directory exists
if [ ! -d "$dir" ]; then
	echo "Directory does not exist."
	exit 1
fi

# Change to the specified directory
cd "$dir"

# Recursively find all .md files in the current directory and subdirectories
for file in $(find . -name "*.md"); do

	# Get the directory containing the file
	dir=$(dirname "$file")
	
	# Get the filename without the .md extension
	filename=$(basename "$file" .md)
	
	# Create a subfolder with the same name as the file, if it doesn't exist yet
	if [ ! -d "$dir/$filename" ]; then
		mkdir "$dir/$filename"
	fi
	
	# Move the .md file to the subfolder and rename it "index.md"
	mv "$file" "$dir/$filename/index.md"
done
```

With this, I simply ran the script within the site repo and, when prompted, specified (*e.g.*) `content/posts/2019/` --- I went one year at a time, to minimize the potential chaos if it *didn't* do what I wanted --- and let the script handle the rest.

Now, of course, this didn't do *everything* I needed; I still had to move related image files into the same folders with those content files that called them.[^graphics] However, the script had taken care of the real grunt work, so moving the image files was a piece of cake compared to what I'd otherwise have endured.

[^graphics]: I also had to revert the minor graphics-related code changes to which I referred in a footnote to "[The big unbundle](/posts/2023/07/big-unbundle/)." (Thank goodness for Git.)

I suspect going back in the other direction --- *i.e.*, unbundling the site once again --- wouldn't be as neatly scriptable as the rebundling proved to be. Perhaps that'll provide a sufficiently strong incentive for me *not* to futz with this again.
