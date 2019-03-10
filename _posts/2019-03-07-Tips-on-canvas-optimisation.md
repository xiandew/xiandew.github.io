---
  layout: post
  title: Tips on canvas optimisation
  tags:
  categories:
    - Canvas
    - JavaScript
---

When developing games with canvas, the frame rate matters the most if the game
requires many animation effects. So optimising the efficiency and
improving the frame rate are always important aspects to consider along canvas
game development. I found the following tips are particularly useful for doing
canvas optimisation.


# **Minimise draw calls**

Constantly drawing and redrawing images consume the most RAM so minimising draw
calls can give it a obviously improved performence. When calling draw functions
inside loops, you should be sure always checking if any functions can be placed
outside the loop. For an obvious instance, if the background are not changed, we
only need to draw it once instead of putting it in loops.

# **Minimise the clear area**

> if you can figure out which parts of your canvas have changed since the last frame,
> and only redraw those parts (by using 'dirty rectangles'), your game should see
> a huge performance boost.

That is every time clearing the canvas, instead of clearing it all, only clearing
area that have changed. For example, there is no need redrawing the background
every time if it is not changed.

# **Use cached canvas**

The cached (off-screen) canvas has the following advantages.

- Drawing identical images

  If a complex image requires multiple calls to different canvas API and it is
  drawn more than once, you could draw it first on a off-screen canvas and
  only draw the off-screen canvas when drawing ths image. In this case, the
  cached canvas simplifies the complexity and also reduces calls to API.

- Scaling images

  As we mentioned before, the costs to the draw functions can be quite expensive
  so do not try to put too much weight on them. When you need to scale an image,
  instead of scaling it with `drawImage()` every time, you can scale and draw it
  first on a off-screen canvas and only draw the canvas later.

*Note*

  When creating off-screen canvas, make sure its size is not wasted. That means
  if an off-screen canvas only renders a small sprite, there is no need to make
  it the same size as the screen. Changing the size of off-screen canvases so
  that keeping it just suitable for the rendered image will also save unnecessary
  costs.

# **Use more than one canvas**

> If you draw too many pixels to the same canvas at the same time, your frame rate will fall through the floor. In these circumstances, it's better to use multiple canvasses layered on top of one another. If you draw too many pixels to the same canvas at the same time, your frame rate will fall through the floor. In these circumstances, it's better to use multiple canvasses layered on top of one another.

For example:
{% highlight html %}
{% raw %}
<div id="stage">
  <canvas id="ui-layer" width="480" height="320"></canvas>
  <canvas id="game-layer" width="480" height="320"></canvas>
  <canvas id="background-layer" width="480" height="320"></canvas>
</div>
{% endraw %}
{% endhighlight %}

# **Avoid constantly changing the canvas state**

When changing `fillStyle`, `globalAlpha` and using `save()` and `restore()`,
the state of the whole canvas is also changed. Changing the state of the canvas
is also an expensive decision.

For example, if you have codes like:

```javascript
{% raw %}
for (var i = 0; i < STRIPES; i++) {
    context.fillStyle = (i % 2 ? COLOR1 : COLOR2);
    context.fillRect(i * GAP, 0, GAP, 480);
}
{% endraw %}
```

you can change it as following:

```javascript
{% raw %}
context.fillStyle = COLOR1;
for (var i = 0; i < STRIPES / 2; i++) {
    context.fillRect((i * 2) * GAP, 0, GAP, 480);
}
context.fillStyle = COLOR2;
for (var i = 0; i < STRIPES / 2; i++) {
    context.fillRect((i * 2 + 1) * GAP, 0, GAP, 480);
}
{% endraw %}
```

# **Avoid floating-point coordinates and use integers instead**

Sub-pixel rendering occurs when you render objects on a canvas without whole values.
Using float numbers forces the browser to do extra calculations to create the
anti-aliasing effect. To avoid this, make sure to round all co-ordinates used
in calls to `drawImage()` using `Math.floor()`.

# **Batch canvas calls together**

> Since drawing is an expensive operation, it’s more efficient to load the drawing state machine with a long set of commands, and then have it dump them all onto the video buffer.
>
> For example, when drawing multiple lines, it's more efficient to create one path with all the lines in it and draw it with a single draw call.

For instance, rather than drawing separate lines:

```javascript
{% raw %}
for (var i = 0; i < points.length - 1; i++) {
  var p1 = points[i];
  var p2 = points[i+1];
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.stroke();
}
{% endraw %}
```

instead, we can do the following:

```javascript
{% raw %}
context.beginPath();
for (var i = 0; i < points.length - 1; i++) {
  var p1 = points[i];
  var p2 = points[i+1];
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
}
context.stroke();
{% endraw %}
```

# **More tips**

- Avoid the `shadowBlur` property whenever possible.
- Avoid text rendering whenever possible.
- Clear the canvas with `clearRect()`.
- With animations, use `requestAnimationFrame()` instead of `setInterval()`.
- Be careful with heavy physics libraries.

# **References**
- [Improving HTML5 Canvas Performance](https://www.html5rocks.com/en/tutorials/canvas/performance/){:target='_blank'}
- [Optimizing canvas - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas){:target='_blank'}
- [ Optimising HTML5 Canvas games](https://nicolahibbert.com/optimising-html5-canvas-games/){:target='_blank'}
- [提高HTML5 canvas性能的几种方法！](https://my.oschina.net/aaronzh/blog/132346){:target='_blank'}
