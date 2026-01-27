---
title: "Orthographic Camera and Perspective Camera in 3D Modelling"
description: "Understanding the key differences between orthographic and perspective cameras in 3D graphics, with practical Three.js examples for choosing the right projection."
pubDate: 2021-05-28
author: "Xiande Wen"
tags: ["threejs", "3d-graphics", "cameras", "webgl", "tutorial"]
---

When working with 3D graphics, choosing the right camera type is crucial for achieving the desired visual effect. In Three.js and most 3D engines, there are two fundamental camera projection types: **Orthographic** and **Perspective**. Understanding when and why to use each can significantly impact your 3D application's appearance and user experience.

# **What is a Perspective Camera?**

A **perspective camera** mimics how the human eye perceives the world. Objects farther from the camera appear smaller, creating a sense of depth and realism. This is the most common camera type for 3D games, simulations, and immersive experiences.

## **Key Characteristics:**

- Objects shrink as they move away from the camera
- Parallel lines converge at a vanishing point
- Creates realistic depth perception
- Natural for first-person and third-person views

## **Three.js Example:**

```javascript
const camera = new THREE.PerspectiveCamera(
    75,                                      // Field of view (FOV) in degrees
    window.innerWidth / window.innerHeight,  // Aspect ratio
    0.1,                                     // Near clipping plane
    1000                                     // Far clipping plane
);
camera.position.z = 5;
```

## **When to Use Perspective Camera:**

- **Games:** First-person shooters, racing games, 3D platformers
- **Architectural visualization:** Walkthrough experiences
- **VR/AR applications:** Immersive environments
- **Product showcases:** When realism matters

# **What is an Orthographic Camera?**

An **orthographic camera** uses parallel projection, meaning objects remain the same size regardless of their distance from the camera. There's no perspective distortion—what you see is a true-to-scale representation.

## **Key Characteristics:**

- No size changes based on distance
- Parallel lines stay parallel (no vanishing point)
- Preserves accurate measurements and proportions
- Ideal for technical and strategic views

## **Three.js Example:**

```javascript
const camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,   // Left boundary
    window.innerWidth / 2,    // Right boundary
    window.innerHeight / 2,   // Top boundary
    window.innerHeight / -2,  // Bottom boundary
    0.1,                      // Near clipping plane
    1000                      // Far clipping plane
);
camera.position.z = 5;
```

## **When to Use Orthographic Camera:**

- **2D games in 3D space:** Platformers like *Fez*, strategy games
- **CAD/Engineering applications:** Blueprints, schematics, technical drawings
- **Isometric games:** Classic RTS games, simulation games
- **UI elements in 3D:** HUD overlays, inventory systems
- **Data visualization:** Charts, graphs in 3D space

# **Side-by-Side Comparison**

| Aspect | Perspective Camera | Orthographic Camera |
|--------|-------------------|---------------------|
| **Depth Perception** | Strong (objects shrink with distance) | None (constant size) |
| **Realism** | High (mimics human vision) | Low (technical view) |
| **Measurements** | Distorted by perspective | Accurate and preserved |
| **Vanishing Point** | Yes (parallel lines converge) | No (parallel lines stay parallel) |
| **Use Cases** | Games, VR, immersive experiences | Strategy games, CAD, technical views |

# **Practical Tips**

## **Switching Between Camera Types**

You might want to dynamically switch between camera types based on user interaction:

```javascript
let isPerspective = true;

function toggleCamera() {
    if (isPerspective) {
        camera = new THREE.OrthographicCamera(/*...*/);
    } else {
        camera = new THREE.PerspectiveCamera(/*...*/);
    }
    isPerspective = !isPerspective;
}
```

## **Common Pitfalls**

1. **Orthographic Frustum Size:** The frustum boundaries must match your scene scale. If set incorrectly, objects may be clipped or appear too small.
2. **Perspective FOV:** A FOV too wide (>90°) creates a "fisheye" effect; too narrow (<30°) feels zoomed in and flat.
3. **Aspect Ratio:** Always update camera aspect ratio when the window resizes to avoid stretching.

## **Handling Window Resize**

```javascript
window.addEventListener('resize', () => {
    // For Perspective Camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // For Orthographic Camera
    const aspect = window.innerWidth / window.innerHeight;
    camera.left = -frustumSize * aspect / 2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = -frustumSize / 2;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
});
```

# **Conclusion**

Both camera types serve distinct purposes:

- Use **Perspective** when you want immersion, realism, and a sense of depth.
- Use **Orthographic** when you need accurate measurements, isometric views, or a strategic overview.

Many applications use both—perspective for the main view and orthographic for mini-maps, UI overlays, or blueprint modes. Understanding the strengths of each allows you to make informed design decisions for your 3D projects.

# **References**

- [Three.js基础探寻二——正交投影照相机](https://www.cnblogs.com/xulei1992/p/5707733.html)
- [Three.js基础探寻三——透视投影照相机](https://www.cnblogs.com/xulei1992/p/5709677.html)
- [Three.js PerspectiveCamera Documentation](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera)
- [Three.js OrthographicCamera Documentation](https://threejs.org/docs/#api/en/cameras/OrthographicCamera)