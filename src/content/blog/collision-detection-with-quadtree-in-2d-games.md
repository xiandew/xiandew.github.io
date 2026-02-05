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

# **Why QuadTrees?**

In a game with many moving objects, checking every object against every other object for collision (checking $N$ objects against $N-1$ others) results in a time complexity of $O(N^2)$. As the number of objects increases, performance drops drastically.

A **QuadTree** helps by solving the "broad-phase" of collision detection. Instead of checking everything, we only check objects that are near each other. It does this by recursively dividing spatial regions into four quadrants.

1.  **Partitioning**: The 2D space is divided into four squares.
2.  **Insertion**: Objects are inserted into the node that contains them.
3.  **Subdivision**: If a node contains too many objects, it splits into four sub-nodes, and objects are moved into children nodes.
4.  **Retrieval**: To check for collisions for a specific object, you allow the QuadTree to return only the objects located in the same quadrant(s).

This reduces the number of checks significantly, typically to $O(N \log N)$ or better depending on distribution.

# **Introduction**

> A quadtree is a tree data structure in which each internal node has exactly four children. Quadtrees are the two-dimensional analog of octrees and are most often used to partition a two-dimensional space by recursively subdividing it into four quadrants or regions. The data associated with a leaf cell varies by application, but the leaf cell represents a "unit of interesting spatial information".




# **References**

- [Quadtree - wikipedia](https://en.wikipedia.org/wiki/Quadtree)
- [JavaScript QuadTree Implementation](http://www.mikechambers.com/blog/2011/03/21/javascript-quadtree-implementation/)
- [Quick Tip: Use Quadtrees to Detect Likely Collisions in 2D Space](https://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374)