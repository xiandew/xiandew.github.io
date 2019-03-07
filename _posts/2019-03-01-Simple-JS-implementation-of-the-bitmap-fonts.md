---
  layout: post
  title: Simple JS implementation of the bitmap fonts
  tags:
  categories:
    - JavaScript
---

When writing WeChat games, one of the problems that I often encountered was using various custom fonts
that are not pre-installed by most user devices. Since Wechat game platform have not give us the privilidge
to import those custom font files directly, we have no choice but using Bitmap font. I had done lots of
searching but there is hardly a concrete implements of the bitmap font in JavaScript on the Internet that
could be used by simply import a bitmap font class. So here is how I implement it in JavaScript. Feel free
to post any possible corrections or improvements.

# **What is Bitmap Font**

>A bitmap font is one that stores each glyph as an array of pixels (that is, a bitmap). It is less commonly known as a raster font. Bitmap fonts are simply collections of raster images of glyphs. For each variant of the font, there is a complete set of glyph images, with each set containing an image for each character. For example, if a font has three sizes, and any combination of bold and italic, then there must be 12 complete sets of images.

# **Pseudo code**

Here's a short description of each attribute in the .fnt file:

| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **lineHeight**              | how much to move the cursor when going to the next line.                                                                                              |
| **base**                    | this is the offset from the top of line, to where the base of each character is.                                                                      |
| **scaleW and scaleH**       | This is the size of the texture.                                                                                                                      |
| **pages**                   | gives how many textures that are used for the font.                                                                                                   |
| **id**                      | is the character number in the ASCII table.                                                                                                           |
| **x, y, width, and height** | give the position and size of the character image in the texture.                                                                                     |
| **xoffset and yoffset**     | hold the offset with which to offset the cursor position when drawing the character image. Note, these shouldn't actually change the cursor position. |
| **xadvance**                | is how much the cursor position should be moved after each character.                                                                                 |
| **page**                    | gives the texture where the character image is found.                                                                                                 |

Here's some pseudo code for rendering a character:

```java
// Compute the source rect
Rect src;
src.left   = x;
src.top    = y;
src.right  = x + width;
src.bottom = y + height;

// Compute the destination rect
Rect dst;
dst.left   = cursor.x + xoffset;
dst.top    = cursor.y + yoffset;
dst.right  = dst.left + width;
dst.bottom = dst.top + height;

// Draw the image from the right texture
DrawRect(page, src, dst);

// Update the position
cursos.x += xadvance;
```

# **JS implement**

In the following illustration, I will use the black impact font as an example.
Just note that the codes may not work by just copying and pasting. It's just for
your reference and you may need some necessary modifications for it to work.

To generate bitmap font, you can use the [Bitmap Font Generator](http://www.angelcode.com/products/bmfont/){:target='_blank'}
which will produce a `.fnt` file and an image containing your choosing characters.

You can find a tutorial on how to use the Bitmap Font Generator [here](http://www.anbsoft.com/content/ezgui/docs/page28/page30/page30.html){:target='_blank'}.

Since we are processing the bitmap font with JS, you need to convert the format of the `.fnt`
file to `JSON`. You can achieve the by first generating the `.fnt` file in `XML` format
and then convert it to `JSON`.

There is an awesome tool for you to convert `XML` to `JSON` online. You can find it
[here](https://www.freeformatter.com/xml-to-json-converter.html){:target='_blank'}

After getting the `JSON` data, you can place it in a `.js` file and store it as a
constant, which will be easier for us to use. Of course, you can place it in a `.json`
file as it should be and import it when needed. I put it in `.js` file because I had to
since WeChat platform does not support read file API of JS.

**The bitmap font file and corresponding image**

Here is my `impact_black.js`:

```javascript

const IMPACT_BLACK_JSON = '{"info":{"face":"Impact","size":"-96","bold":"0","italic":"0","charset":"","unicode":"1","stretchH":"100","smooth":"1","aa":"1","padding":"0,0,0,0","spacing":"1,1","outline":"0"},"common":{"lineHeight":"117","base":"97","scaleW":"256","scaleH":"256","pages":"1","packed":"0","alphaChnl":"0","redChnl":"0","greenChnl":"0","blueChnl":"0"},"pages":{"page":{"id":"0","file":"impact_black_0.png"}},"chars":{"count":"11","char":[{"id":"43","x":"0","y":"157","width":"47","height":"45","xoffset":"2","yoffset":"37","xadvance":"51","page":"0","chnl":"15"},{"id":"48","x":"191","y":"0","width":"45","height":"78","xoffset":"3","yoffset":"20","xadvance":"51","page":"0","chnl":"15"},{"id":"49","x":"181","y":"79","width":"34","height":"76","xoffset":"0","yoffset":"21","xadvance":"37","page":"0","chnl":"15"},{"id":"50","x":"48","y":"79","width":"44","height":"77","xoffset":"2","yoffset":"20","xadvance":"48","page":"0","chnl":"15"},{"id":"51","x":"144","y":"0","width":"46","height":"78","xoffset":"2","yoffset":"20","xadvance":"51","page":"0","chnl":"15"},{"id":"52","x":"93","y":"79","width":"48","height":"76","xoffset":"0","yoffset":"21","xadvance":"48","page":"0","chnl":"15"},{"id":"53","x":"0","y":"79","width":"47","height":"77","xoffset":"2","yoffset":"21","xadvance":"52","page":"0","chnl":"15"},{"id":"54","x":"0","y":"0","width":"47","height":"78","xoffset":"3","yoffset":"20","xadvance":"52","page":"0","chnl":"15"},{"id":"55","x":"142","y":"79","width":"38","height":"76","xoffset":"0","yoffset":"21","xadvance":"38","page":"0","chnl":"15"},{"id":"56","x":"48","y":"0","width":"47","height":"78","xoffset":"2","yoffset":"20","xadvance":"51","page":"0","chnl":"15"},{"id":"57","x":"96","y":"0","width":"47","height":"78","xoffset":"3","yoffset":"20","xadvance":"52","page":"0","chnl":"15"}]}}';

export default IMPACT_BLACK_JSON;

```

Here is my bitmap image:

![](https://i.loli.net/2019/03/07/5c805faf7aa8f.png)

I generated the `JSON` data in one line and export it as a constant for later import.
One thing to note that make sure you put the bitmap image in the same directory as
the font file.

**Processing the font file**

Create a class called `BitmapFont`, which will parse the `JSON` data for string to
`JS` object and store information including the positions of the characters on the
bitmap image and the image itself. Note after the font image loaded, the passing
function `onloaded` will be executed.

```javascript
let instance;
export default class BitmapFont {
        constructor() {
                if (instance) {
                        return instance;
                }
                instance = this;
        }

        loadFont(jsonData, onloaded) {
                let bitmapFont = JSON.parse(jsonData);
                this.defaultSize = Math.abs(parseInt(bitmapFont.info.size));

                this.chars = {};
                bitmapFont.chars.char.forEach(ch => {
                        this.chars[String.fromCharCode(ch.id)] = ch;
                });

                this.bitmap = wx.createImage();
                this.bitmap.onload = function() {
                        onloaded();
                };
                this.bitmap.src = bitmapFont.pages.page.file;
        }
}
```

Create a class called `BitmapText`, which will take use of information stored in
`BitmapFont` and draw the characters on the canvas.

```javascript
export default class BitmapText {
        constructor(bitmapFont) {
                this.bitmapFont = bitmapFont;
                this.fontSize = 96;
        }
        // only for drawing a single line of numbers and not support the font colour option
        draw(ctx, text, x = 0, y = 0) {
                let fontScale = this.fontSize / this.bitmapFont.defaultSize;
                let charArr = text.toString().split("");

                if (this.textAlign == "center") {
                        let textWidth = 0;
                        charArr.forEach(n => {
                                let ch = this.bitmapFont.chars[n];
                                textWidth += fontScale * parseInt(ch.xadvance);
                        });
                        x -= 0.5 * textWidth;
                }

                if (this.textAlign == "right") {
                        charArr = charArr.reverse();
                }

                charArr.map(n => {
                        let ch = this.bitmapFont.chars[n];
                        let xadvance = fontScale * parseInt(ch.xadvance);
                        ctx.drawImage(
                                this.bitmapFont.bitmap,
                                parseInt(ch.x),
                                parseInt(ch.y),
                                parseInt(ch.width),
                                parseInt(ch.height),
                                fontScale * parseInt(ch.xoffset) + (this.textAlign == "right" ? -xadvance : 0) + x,
                                fontScale * parseInt(ch.yoffset) + y,
                                fontScale * parseInt(ch.width),
                                fontScale * parseInt(ch.height)
                        );
                        x += xadvance * (this.textAlign == "right" ? -1 : 1);
                });
        }
}
```

Then these two classes can be used by:

```javascript
import IMPACT_BLACK_JSON from './fonts/impact_black';
import BitmapFont from "./bitmapFont";
import BitmapText from "./bitmapText";

let impact_black = new BitmapFont();
let fontLoaded = false;
let txt;
impact_black.loadFont(IMPACT_BLACK_JSON, function() {
        fontLoaded = true;
        txt = new BitmapText(impact_black);
});

function renderBitmapText() {
        if (fontLoaded) {
                // set font size
                txt.fontSize = 16;
                // set alignment
                txt.textAlign = "center"
                txt.draw(ctx, gameInfo.score, SCORE_X, SCORE_Y);
        }
}
```

# **References**

- [Computer fonts > Bitmap fonts](https://en.wikipedia.org/wiki/Computer_font#Bitmap_fonts){:target="_blank"}
- [Bmfont and how to interpret the .fnt file](https://www.gamedev.net/forums/topic/284560-bmfont-and-how-to-interpret-the-fnt-file/#comment-2785731_wrap){:target="_blank"}
