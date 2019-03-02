---
  layout: post
  title: Drawing a clear image on the canvas
  tags:
  categories:
    - Canvas
    - JavaScript
---

// draw a circle shape instead of image. Not display well on the phone

```JavaScript
render(ctx) {
	ctx.beginPath()
			ctx.fillStyle = this.colour
			ctx.arc(this.getX(), this.getY(), this.size / 2, 0, 2 * Math.PI)
			ctx.fill()
			ctx.closePath()

			ctx.beginPath()
			ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
			ctx.arc(
				this.getX() - this.size / 6,
				this.getY() + this.size / 6,
				this.size / 6, 0, 2 * Math.PI
			)
			ctx.fill()
			ctx.closePath()
	}
```
