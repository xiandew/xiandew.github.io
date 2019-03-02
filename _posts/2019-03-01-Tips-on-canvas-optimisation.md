---
  layout: post
  title: Tips on canvas optimisation
  tags:
  categories:
    - Canvas
    - JavaScript
---

Recently I am trying to optimising my wechat game which takes use of canvas.
The original approach is simply drawing all images on to the onscreen canvas and
redraw everything every frame, even without any scaling to do the antialias. I
turned on imageSmoothingEnabled and all images are displaying very well. With the
original approach, the game works very well on the wechat with versions before
7.0.3.

Things changed after wechat gets updated to 7.0.3. The game gets blurring and very slow.
Wechat official has warned that the reason that simply turning on imageSmoothingQuality
makes images clear enough is because they are doing the job in the android adapter level which
the developers are not aware of. And the new version is going to be align evrything up
for both ios and android so scaling is necessary for devices with a high pixel ratio.
I haven't tested my game on an Apple before. I thought they were the same. So when I
tested on an iphone, I was shocked that how bad the little game has been on ios devices!

The blurring was not the problem. With simplying enlarging and scaling, everything gets
clear again. My headache is the frame rate of the game. It gets slowing down dramatically
when the images on the single canvas get a few more.

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

The speed of the game does not improve significantly after rendering multiple
offscreen canvas. So I reinstalled the previous version of Wechat and everything
goes well as before. I concluded that the slow problem has few thing to do with
the game code itself, instead, the wechat platform.、

Recently, I'm trying to complete a practice by separating the physical and
animation components. Hoping that could bring more delegant coding structure and
boost it a better performance.
