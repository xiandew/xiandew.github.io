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



# **References**

- [wikipedia](https://en.wikipedia.org/wiki/Computer_font#Bitmap_fonts)
- [gamedev.net](https://www.gamedev.net/forums/topic/284560-bmfont-and-how-to-interpret-the-fnt-file/#comment-2785731_wrap)
