---
title: "Hugo-like archetypes in other SSGs, take two"
description: "A little JavaScript can give JS-based website builders a more automated file-creation process."
author: Bryce Wray
date: 2022-12-12T11:53:00-06:00
# draft: true
# initTextEditor: iA Writer # default --- change if needed
---

**Note**: In order to avoid more repetition than is utterly necessary, this post assumes at least some familiarity with the content of its [predecessor from earlier this year](/posts/2022/09/hugo-like-archetypes-other-ssgs/).
{.box}

While the shell script I described some months ago in "Hugo-like archetypes in other SSGs" will surely do the job to a minimal extent --- that job being automatically generating content files for use in JavaScript-based [static site generators](https://jamstack.org/generators) (SSGs), similar to how [Hugo](https://gohugo.io)'s [archetypes](https://gohugo.io/content-management/archetypes/) work --- I decided I could do better.

<!--more-->

Now, in a [Node.js](https://nodejs.org)-based SSG, you can do something like this from the command line:

```bash
node newfile.js posts/2022/12/this-is-my-new-post.md
```

. . . to get:

```plaintext
 src/
 └─ posts/
    └─ 2022/
        └─ 12/
            ├── this-is-my-new-post.md
```

. . . with the following content (assuming someone named John Doe had entered that command at 10:18:47 AM U.S. Central Standard Time today):

```plaintext
----
title: "This is my new post"
description: "DESCRIPTION TO COME."
author: John Doe
date: 2022-12-12T10:18:47-06:00
draft: true
---

Text begins here.
```

This leaves only the immediate task of slightly improving the `title`'s punctuation and capitalization, if necessary (as you see, a simpler title doesn't need any help). You could wait until later to firm up the `description`; and, of course, the `date` timestamp doesn't matter until it's actually time to publish to the website. The `draft` item is valid in some JS-based SSGs out of the box, while others require some additional work to make the SSG know how to handle it.

The point, however, is that doing it this way, as opposed to using the simpler shell-script method from my earlier post on this subject, allows for more easily including variables which further automate the job.[^varShells]

[^varShells]: And, yes, I know there are ways to inject at least some variables into shell scripts to achieve *somewhat* similar results; but, in the end, I preferred going this route in order to achieve its greater flexibility and extensibility.

Here's the top-level JavaScript file, `newfile.js`, that came from all this noodgering on my part; the comments provide annotation and give credit to those sources from which I gratefully grabbed and/or adapted helpful code:

{{< labeled-highlight lang="js" filename="newfile.js" >}}
const fs = require("fs")
const { mkdir } = require("fs/promises")
const path = require("path")
const authorName = "John Doe"
// ^ ^ substitute your own name there, of course!

/*
	To read the argument added to the
	invocation of the file
	(e.g., after `node newfile.js`),
	we use `process.argv`, which returns
	an array. The element we need is
	`process.argv[2]`, i.e., the string
	we need further down for the file path.
	- https://nodejs.org/docs/latest/api/process.html#processargv

	We then pull from it the desired title,
	and --- for use in handling the final path later ---
	the `yyyy` and `mm` parts of the path.
	If you **don't** arrange your posts via
	a `/yyyy/mm/` scheme, you'll want to make
	appropriate changes within.
*/

let
	desiredPath = process.argv[2],
	desiredTitle = desiredPath.slice(14),
	yearSlice = desiredPath.slice(6, 10),
	monthSlice = desiredPath.slice(11, 13)

/*
	Now we'll clean up the desired title
	for use in the post itself:
	- Remove hyphens and the `.md` extension.
	- Convert it to sentence case.
*/

desiredTitle = desiredTitle.replaceAll('-', ' ')
desiredTitle = desiredTitle.replaceAll('.md', '')

function toSentenceCase(str){
	return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1)
}
// https://javascriptf1.com/snippet/convert-a-string-to-sentence-case-in-javascript

desiredTitle = toSentenceCase(desiredTitle)

/*
	==========================
	Now, we start creating the timestamp
	in the format that most SSGs want to see.
	This was adapted slightly from:
	https://usefulangle.com/post/30/javascript-get-date-time-with-offset-hours-minutes
*/

let
	timezone_offset_min = new Date().getTimezoneOffset(),
	offset_hrs = parseInt(Math.abs(timezone_offset_min/60)),
	offset_min = Math.abs(timezone_offset_min%60),
	timezone_standard

if(offset_hrs < 10) {
	offset_hrs = '0' + offset_hrs
}

if(offset_min < 10) {
	offset_min = '0' + offset_min
}

// Add an opposite sign to the offset
// If offset is 0, it means timezone is UTC
if(timezone_offset_min < 0) {
	timezone_standard = '+' + offset_hrs + ':' + offset_min
} else if(timezone_offset_min > 0) {
	timezone_standard = '-' + offset_hrs + ':' + offset_min
} else if(timezone_offset_min == 0) {
	timezone_standard = 'Z'
}

let
	dt = new Date(),
	current_date = dt.getDate(),
	current_month = dt.getMonth() + 1,
	current_year = dt.getFullYear(),
	current_hrs = dt.getHours(),
	current_mins = dt.getMinutes(),
	current_secs = dt.getSeconds(),
	current_datetime

// Leading zeroes
current_date = current_date < 10
	? '0' + current_date
	: current_date
current_month = current_month < 10
	? '0' + current_month
	: current_month
current_hrs = current_hrs < 10
	? '0' + current_hrs
	: current_hrs
current_mins = current_mins < 10
	? '0' + current_mins
	: current_mins
current_secs = current_secs < 10
	? '0' + current_secs
	: current_secs

/*
	Current date/time ---
	a string such as:
	2022-07-08T09:49:04-05:00
	(July 8, 2022, at 9:49:04 AM,
	if one is in U.S. Central Time
	in an area observing Daylight
	Saving Time)
*/
current_datetime = current_year + '-' + current_month + '-' + current_date + 'T' + current_hrs + ':' + current_mins + ':' + current_secs

let timeStamp = current_datetime + timezone_standard

/*
	End of the timestamp stuff.
	==========================
*/

/*
	Now we create the string that
	will go in the actual post.
*/

let fileContents = `---
title: "${desiredTitle}"
description: "DESCRIPTION TO COME."
author: ${authorName}
date: ${timeStamp}
draft: true
---

Text begins here.
`

/*
	Finally, we create the file.
	It's necessary to check for the
	existence of each folder level
	(and, if necessary, create that level).
	h/t: https://www.webmound.com/nodejs-create-directory-recursively/
*/

let outputPath = path.join(__dirname, 'src/', desiredPath)

const createFolder = async (path) => {
	try {
		if (!fs.existsSync(path)) {
			await mkdir(path, {
				recursive: true,
			})
			console.log('Folder created successfully')
		} else {
			console.log('Folder already exists')
		}
		fs.writeFile(outputPath, fileContents, function (err) {
			if (err) {
				return console.log(err)
			}
			console.log(outputPath + ' - file generated')
		})
	} catch (error) {
			console.log(error)
	}
}

/*
	And here's where we use those `yearSlice'
	and `monthSlice` items.
*/

let createPath = __dirname + '/src/posts/' + yearSlice + '/' + monthSlice

createFolder(createPath)
{{</ labeled-highlight >}}
