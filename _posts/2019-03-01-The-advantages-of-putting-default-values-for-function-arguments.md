---
  layout: post
  title: The advantages of putting default values for function arguments
  tags:
  categories:
    - Canvas
    - JavaScript
---

When write a class with arguments involving attributes of image objects,
make sure give each argument an initial value in case of the error
'[wxgl] load image fail', which will be involked when try to draw an image that
has not been loaded. That error is viewed most frequently on Apple devices.
