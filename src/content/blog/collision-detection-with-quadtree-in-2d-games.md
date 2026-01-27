---
title: "Collision detection with QuadTree in 2D games"
description: "A quick primer on using QuadTrees as a broad-phase spatial partitioning strategy to reduce collision checks in 2D games, with references for deeper dives and implementations."
pubDate: 2019-04-15
author: "Xiande Wen"
tags: ["game-development", "algorithms", "data-structures", "collision-detection", "quadtree"]
---

Collision detection is an essential part in game development, whose computations
often involves inefficient complexity. Many algorithms have been introduced for
optimisation. One of the algorithms that I found simple to adopt is QuadTree.

# **Introduction**

> A quadtree is a tree data structure in which each internal node has exactly four children. Quadtrees are the two-dimensional analog of octrees and are most often used to partition a two-dimensional space by recursively subdividing it into four quadrants or regions. The data associated with a leaf cell varies by application, but the leaf cell represents a "unit of interesting spatial information".




# **References**

- [Quadtree - wikipedia](https://en.wikipedia.org/wiki/Quadtree)
- [JavaScript QuadTree Implementation](http://www.mikechambers.com/blog/2011/03/21/javascript-quadtree-implementation/)
- [Quick Tip: Use Quadtrees to Detect Likely Collisions in 2D Space](https://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374)