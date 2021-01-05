---
  layout: post
  title: Run Phaser3 on WeChat Minigame Platform
  tags:
  categories:
      - Game Dev
---

# **1. Customise Image loader**

WeChat platform doesn't support `blob` for the time being hence Phaser's way of
loading images won't work here. Some modifications to the source code are neccessary.

```
> git clone https://github.com/photonstorm/phaser3-custom-build
> cd phaser3-custom-build
> npm install
```

Go to `node_modules/phaser/src/loader/filetypes/ImageFile.js` and change it as following:

```
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
```
> cd phaser3-custom-build
> npm run buildfull
```

Copy `./dist/phaser-full.min.js` to your libs directory, in my case, `./js/libs/`.

# **2. Update weapp-adapter**

```
> git clone https://github.com/xiandew/weapp-adapter
> cd weapp-adapter
> npm run build
```

Copy `./dist/weapp-adapter.js` to your libs directory.

# **3. Import**

Import the following to whichever file you want to use Phaser.

```
import './js/libs/weapp-adapter';
import Phaser from './js/libs/phaser.min';
```

# **4. Expose the global canvas to Phaser**

When setup Phaser, make sure to expose WeChat's global canvas.

```
var config = {
    type: Phaser.CANVAS,
    canvas: canvas,
    ...
};
```

Ready to go!

# **References**
- [利用 Phaser 开发微信小游戏的尝试](https://indienova.com/indie-game-development/run-phaser-on-wechat-game-platform/)
- [phaser3 微信小游戏若干问题](https://www.cnblogs.com/honghong87/p/9592680.html)
