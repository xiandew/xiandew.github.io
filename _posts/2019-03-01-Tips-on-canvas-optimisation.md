---
  layout: post
  title: Tips on canvas optimisation
  tags:
  categories:
    - Canvas
    - JavaScript
---

When writing games with canvas, the frame rate matters the most if the game
requires many animation effects. So how to optimising the efficiency and
improve the frame rate is always an important aspect to consider along canvas
game development. I found the following tips are pretty usefull when doing
canvas optimisation.


# **Minimise draw calls**

Constantly drawing and redrawing images consume the most RAM so minimising draw
calls can give it a obviously improved performence. When calling draw functions
inside loops, you should be sure always checking if any functions can be placed
outside the loop. For an obvious instance, if the background are not changed, we
only need to draw it once instead of putting it in loops. Further, if you can
figure out which parts of your canvas have changed since the last frame, and
only redraw those parts (by using ‘dirty rectangles‘), your game should see
a huge performance boost.

# **Use cached canvas to draw identical images**


# **Avoid constantly changing the canvas state**

When changing `fillStyle`, `globalAlpha` and using `save()` and `restore()`,
the state of the whole canvas is also changed.


So I did a lots of seerching and had tried the following approaches:
- drawing all images on an offscreen 'cached' canvas first.
- drawing each image on an offscreen canvas of the same size first and then drawing each
  of the offscreen canvases on the onscreen canvas just like drawing all the images.
- combine the two approaches above.
- All sorts of optimasition tips.

One that I am going to do is using more than one canvas layers to draw different
things of the game. I am also going to use dirty rectangle tech to clear the canvas
rather than clear the whole canvas every frame.
https://nicolahibbert.com/optimising-html5-canvas-games/
http://blog.sklambert.com/html5-canvas-game-the-player-ship/
https://github.com/straker/galaxian-canvas-game/blob/master/part2/space_shooter_part_two.js
