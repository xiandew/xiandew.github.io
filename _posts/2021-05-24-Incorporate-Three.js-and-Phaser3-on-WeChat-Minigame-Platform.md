---
  layout: post
  title: Incorporate Three.js and Phaser3 on WeChat Minigame Platform
  tags:
  categories:
      - Game Dev
---

Recently we want to build a 3D minigame. We thought to use Three.js but found that Three.js provides far less supports on Game Dev than Phaser. So we came up with the idea to incorporate both Three.js and Phaser3. After doing some research, we read that there is actually "Phaser 3D" ( [devlog #144](https://phaser.io/phaser3/devlog/144) ) written by Richard Davey himself but it's not publicly accessible. What's more important is that it said explicitly that Phaser3D is made by incorporating Three.js with Phaser3 so we're sure there's a possibility, although the ideal case would be using Phaser3D (hopefully one day it'll be publicly accessible).

Nevertheless, Richard does post one piece of code for using Three.js in Phaser3 ( [issue #4490](https://github.com/photonstorm/phaser/issues/4490) ). Works like a charm!

Basically what we need to do is that:

# **1. Setup Phaser3 on WeChat Minigame Platform**

Please refer to [ Run Phaser3 on WeChat Minigame Platform ](/game dev/2021/01/04/Run-Phaser3-on-WeChat-Minigame-Platform.html).

*Note： It is important to set the `type` in the game config to `Phaser.WEBGL` since we can only draw Three.js onto Phaser when they're on the same context*

# **2. Add Three.js Scene within Phaser Scene**

For example,

```javascript
import Phaser from "../libs/phaser-full.min";
import * as THREE from "../libs/three.min";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    create() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.sys.game.canvas,
            context: this.sys.game.context,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.autoClear = false;

        let scene = new THREE.Scene();
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        scene.add(this.cube);

        let view = this.add.extern();
        view.render = () => {
            this.renderer.state.reset();
            this.renderer.render(scene, this.camera);
        };
    }

    update() {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }
}
```

# **3. Make sure to turn on "WebGL 2" for Phaser if your Three.js >= r118**

According to [WebGL1Renderer – three.js docs](https://threejs.org/docs/#api/en/renderers/WebGL1Renderer):
> Since r118 WebGLRenderer automatically uses a WebGL 2 rendering context.

So we need to make sure Phaser uses WebGL 2 as well.

According to [Phaser 3 :: src\game config\custom webgl2 canvas.js](http://labs.phaser.io/view.html?src=src\game%20config\custom%20webgl2%20canvas.js&v=3.55.2):

We need to add the following to Phaser game config:
```javascript
// ...
const contextCreationConfig = {
    alpha: false,
    depth: false,
    antialias: true,
    premultipliedAlpha: true,
    stencil: true,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: false,
    powerPreference: 'default'
};

const config = {
    type: Phaser.WEBGL,
    canvas: canvas,
    context: canvas.getContext('webgl2', contextCreationConfig),
    // ...
}
// ...
```


One thing worth to mention here, for others who are the same new to Three.js, is that Three.js doesn't provide physics supports. For that, you might want to look at "ammo.js" which is used in most Three.js's official examples. Of course, there are planty of other physics libs for Three.js.


# **References**
- [Mixing 2D and 3D using Phaser3 and Three.js](https://github.com/photonstorm/phaser/issues/4490)
