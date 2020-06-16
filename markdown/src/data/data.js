const dataSet = {};
const ifsLink = encodeURI('//localhost:8001/?ifs_app_states_0=sSearchTerm:Micheal Jackson;facets:[_facet.application|[Word],_facet.language|[en]]');
const tabLink = encodeURI('ifs:sSearchTerm:Micheal Jackson;facets:[_facet.application|[Word],_facet.language|[en]]');

dataSet.link = `# Just Links

Open [Product Information](${tabLink} "Micheal Jackson") tab or go to to the [product website](https://intrafind.de "Product Name") 

-----

[I'm an inline-style link](${ifsLink})

[I'm an inline-style link with title](${ifsLink} "Search Word: Intrafind")

------------

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].


> **Reference links can follow later**. *But you can't see them!*

[arbitrary case-insensitive reference text]: ${ifsLink}

[1]: ${ifsLink}

[link text itself]: ${ifsLink}`

dataSet.dirty = `# Marked in browser
Rendered by **marked**.<div onmouseout="javascript:alert(/superevr/)" x=yscript: n>@superevr <span style="color:red">Mouseout</span></div>
        <img src=x onerror=alert(1)//>
        <svg><g/onload=alert(2)//<p>
        <p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>
        <math><mi//xlink:href="data:x,<script>alert(4)</script>>
        <TABLE><tr><td>HELLO</tr></TABL>
        <UL><li><A HREF=//google.com>click</UL>
        <script>alert(505)</script>
`;

dataSet.mixed = `# Mixed Content
This code has Html with inline styles applied.   
<span>It also contains a &lt;style&gt; tag to make spans yellow. This should only take effect when using raw input.</span>

<style>
span{
color:yellow;
}
</style>

<div style="padding: 3rem;cursor:pointer;background-color: grey;color:white" onmouseenter="javascript:this.style.backgroundColor='green'"  onmouseout="javascript:this.style.backgroundColor='blue'"style="color:red">
<span>If the text is yellow and the background color changes on mouseover and mouseout, then style tag and javascript are not blocked. </span>
</div>
<a href="https://intrafind.de" style="color:red" target="_blank">Intrafind</a>
<a href="http://localhost:8001/?&ifs_app_states_0=id:75369859-5c09-4474-89ce-6a797900cb3e;title:intrafind;type:default;sSearchTerm:intrafind;iSearchIndex:1%23%23c2VhcmNocHJvZmlsZS1zdGFuZGFyZA%3D%3D;connectorId:all" target="_blank">Intrafind</a>
<ul><li>Point one</li><li>A second point</li></ul>
<img src="https://dummyimage.com/600x400/000/fff.jpg&text=Hello+Günter" alt="Günther">
`;

dataSet.iframe = `
Only videos hosted from 'www.youtube-nocookie.com' are allowed. Try Rendering Raw Input to see content in the second Iframe.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/GIg2XZGMIwQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://intrafind.de"></iframe>
`

dataSet.complete = `# Welcome to Tomorrow

Advice from all day The Mouse dear she knelt down in surprise. for yourself to try to leave **off** writing down looking anxiously to meet the sand with oh such a waistcoat-pocket [or judge by his housemaid she exclaimed in](http://dummy.com) a steam-engine when he would die. Sentence first idea was written up my mind what *this* young lady to move. Are they lay sprawling about half the Fish-Footman began. Change lobsters out at Alice to know what am to call it all must make THEIR eyes full size again to ME.
 
### Pointless

 * song
 * swallow
    * behind
        * alarm
 * beautify
 
 1. treacle
 1. close
    1. Master cleanse.
    2. Pour-over chillwave chia,.
        3. Quinoa swag mixtape typewriter,.
        4. And so on.
 1. teeth
 1. teases
 1. driest
 
## Image

![dummy][img1]

[img1]: https://placeimg.com/1024/768/arch/grayscale

 ---------------------

### Table

|wearily.|sighed||||
|:-----:|:-----:|:-----:|:-----:|:-----:|
breathe|I|SAID|he|that|
shan't.|_I_||||
myself|you|you|know|him|
beauti|Beautiful|this|into|that|
they|before|heard|having|for|
 
 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem iste natus quaerat quia quod.
  A alias aliquid animi, blanditiis delectus deleniti doloribus, esse eum excepturi 
 exercitationem expedita explicabo ipsa maxime modi necessitatibus nesciunt nulla numquam 
 obcaecati quaerat quidem, rem rerum veniam voluptate? Deleniti distinctio id quidem quisquam vel. Consequuntur, hic?
 
 ### Blockquote
 
> Pray how late much indeed Tis the pleasure of the royal children.   
> Herald read in search of having found the subject.

-----

Only videos hosted from 'www.youtube-nocookie.com' are allowed. Try Rendering Raw Input to see content in the second Iframe.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/GIg2XZGMIwQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://intrafind.de"></iframe>

#### This is two types of pre/code

      Collar that part about once without a child
      but why it made Alice or
       Run home thought poor speaker said Get 
      up eagerly and one repeat TIS THE BOOTS either.
      As a new pair of Mercia and sometimes shorter.
      won't stand on yawning.
      So he said without being alive the Lory 
      positively refused to sea of

\`\`\`ruby
def wonderland(alice)
    puts "Cheshire Cat #{smile}"
end
\`\`\`
`

dataSet.doku = `### Markdown Cheat Sheet

---
# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------
---
Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

1. First ordered list item
2. Another item
  * Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list
4. And another item.

   You can have properly indented paragraphs within list items. Notice the blank line above, and 3 leading spaces

   To have a line break without a paragraph, you will need to use two trailing spaces.  
Note that this line is separate, but within the same paragraph.

* Unordered list can use asterisks
- Or minuses
+ Or pluses

---
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. 
http://www.example.com or <http://www.example.com> and sometimes 
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
---
Here's our logo (hover over image to see the title text):

Inline-style: 
![alt text](https://www.intrafind.de/system/themes/intrafind/_img/logo.png "Intrafind Logo Inlined")

Reference-style: 
![alt text][logo]

[logo]: https://www.intrafind.de/system/themes/intrafind/_img/logo.png "Logo Referenced"

---

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional.

---

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.`

export {dataSet};