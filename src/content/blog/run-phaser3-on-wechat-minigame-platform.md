---
title: "Run Phaser3 on WeChat Minigame Platform"
description: "A field guide to running Phaser 3 on WeChat Minigame: patching image loading (no blob support), updating touch event targets, adding a DOMParser shim for bitmap fonts, and handling sharedCanvas limitations."
pubDate: 2021-01-10
author: "Xiande Wen"
tags: ["phaser", "wechat", "game-development", "javascript", "tutorial"]
---

# **1. Customise Image loader**

WeChat platform doesn't support `blob` for the time being hence Phaser's way of
loading images won't work here. Some modifications to the source code are neccessary.

```console
> git clone https://github.com/photonstorm/phaser3-custom-build
> cd phaser3-custom-build
> npm install
```

Go to `node_modules/phaser/src/loader/filetypes/ImageFile.js` and change it as following:

```javascript
...
+   load: function()
+   {
+       this.loader.nextFile(this, true);
+   },

    onProcess: function ()
    {
        this.state = CONST.FILE_PROCESSING;

        this.data = new Image();

        this.data.crossOrigin = this.crossOrigin;

        var _this = this;

        this.data.onload = function ()
        {
            File.revokeObjectURL(_this.data);

            _this.onProcessComplete();
        };


        this.data.onerror = function ()
        {
            File.revokeObjectURL(_this.data);

            _this.onProcessError();
        };

-       File.createObjectURL(this.data, this.xhrLoader.response, 'image/png');
+       this.data.src = this.url;
    },
...
```

Save it and then:
```console
> cd phaser3-custom-build
> npm run buildfull
```

Copy `./dist/phaser-full.min.js` to your libs directory, in my case, `./js/libs/`.

# **2. Update weapp-adapter**

```console
> git clone https://github.com/xiandew/weapp-adapter
> cd weapp-adapter
> npm install
> npm run build
```

Copy `./dist/weapp-adapter.js` to your libs directory.

# **2.1. If you want to use Phaser's scene level input manager**

If you want Phaser's `scene.input.on("pointerup")` (or plugins that relies on that, e.g. `rexvirtualjoystickplugin`) to work properly, you need to add `target` to `changedTouches`:

Locate the following line in `src/EventIniter/TouchEvent.js`:
```javascript
event.changedTouches = rawEvent.changedTouches
```
and change it to
```javascript
event.changedTouches = rawEvent.changedTouches.map((touch) => {
    touch.target = event.target
    return touch
})
```
Rebundle the file and copy it to you libs directory.


# **3. Introduce DOMParser**
WeChat minigame doesn't support DOMParser, which will cause problem if you
want to use Phaser's Bitmap fonts.

`xmldom.DOMParser` is used for the DOMParser. I made a custom build to it
so we only need to put a single file under our libs directory rather than a folder.

```console
> git clone https://github.com/xiandew/xmldom-custom-build
> cd xmldom-custom-build
> npm install
> npm run build
```

Copy `./dist/dom-parser.min.js` to your libs directory.

# **4. Import**

Import the following to whichever file you want to use Phaser.

```javascript
import './js/libs/weapp-adapter';
import Phaser from './js/libs/phaser.min';

// Only required if you're having issue with parsing XML files.
window.DOMParser = require('./js/libs/dom-parser.min');
```

# **5. Expose the global canvas to Phaser**

When setup Phaser, make sure to expose WeChat's global canvas.

```javascript
var config = {
    type: Phaser.CANVAS,
    canvas: canvas,
    ...
};
```

# **6. Make sure to switch on touch support**

You have to specify `input.touch = true` explicitly in `config` for Phaser's touch support.

```javascript
var config = {
    type: Phaser.CANVAS,
    canvas: canvas,
    input: {
        touch: true
    }
    ...
};
```

# **7. If you want to make use of WeChat Relationship Chain Data**

Making use of WeChat Relationship Chain Data involves sensative privacy of WeChat users
so WeChat introduces the idea of "open data domain (ODD)" which is the only place that the
relationship chain data can exist.

There are lots of [limitations](https://developers.weixin.qq.com/minigame/en/dev/guide/open-ability/open-data.html#Limits) after enabling the ODD. One of them is that the [sharedCanvas](https://developers.weixin.qq.com/minigame/en/dev/guide/open-ability/open-data.html#Displaying-Relationship-Chain-Data) cannot call `getContext` and it breaks Phaser3's way of rendering `CanvasTexture`.

So as a work-around, we need set the `sharedCanvas` as the texture directly using `texImage2D`
(since I'm on `WebGL` mode) instead of setting its pixels which are not available in this case.

Once we are clear of that, modifications are pretty simple.
Goto `node_modules/phaser/src/textures/CanvasTexture.js` and change as following:

```javascript
    ...
    function CanvasTexture (manager, key, source, width, height)
    {
        Texture.call(this, manager, key, source, width, height);

        this.add('__BASE', 0, 0, 0, width, height);

        /** ... */
        this._source = this.frames['__BASE'].source;

        /** ... */
        this.canvas = this._source.image;

        /** ... */
        this.context = this.canvas.getContext('2d');

        /** ... */
        this.width = width;

        /** ... */
        this.height = height;

+       this.pixels = this.canvas;
+       return;

        /** ... */
        this.imageData = this.context.getImageData(0, 0, width, height);

        /** ... */
        this.data = null;

        if (this.imageData)
        {
            this.data = this.imageData.data;
        }

        /** ... */
        this.pixels = null;

        /** ... */
        this.buffer;

        if (this.data)
        {
            if (this.imageData.data.buffer)
            {
                this.buffer = this.imageData.data.buffer;
                this.pixels = new Uint32Array(this.buffer);
            }
            else if (window.ArrayBuffer)
            {
                this.buffer = new ArrayBuffer(this.imageData.data.length);
                this.pixels = new Uint32Array(this.buffer);
            }
            else
            {
                this.pixels = this.imageData.data;
            }
        }
    },
    ...
```

One thing that might be worth mentioning here: don't expect there are anyhting on the `sharedCanvas`
after you set its size since resizing it will clear everything drawn.

Ready to go!

# **References**
- [Relationship Chain Data \| Weixin public doc](https://developers.weixin.qq.com/minigame/en/dev/guide/open-ability/open-data.html)
- [利用 Phaser 开发微信小游戏的尝试](https://indienova.com/indie-game-development/run-phaser-on-wechat-game-platform/)
- [phaser3 微信小游戏若干问题](https://www.cnblogs.com/honghong87/p/9592680.html)