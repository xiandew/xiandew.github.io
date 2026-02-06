---
title: "Collision detection with QuadTree in 2D games"
description: "A quick primer on using QuadTrees as a broad-phase spatial partitioning strategy to reduce collision checks in 2D games, with references for deeper dives and implementations."
pubDate: 2019-04-15
author: "Xiande Wen"
tags: ["game-development", "algorithms", "data-structures", "collision-detection", "quadtree"]
---

Collision detection is essential in game development, but naive implementations often suffer from inefficient $O(N^2)$ complexity. QuadTrees offer an elegant spatial partitioning solution to dramatically reduce the number of checks needed.

# **The Problem**

In a game with many moving objects, checking every object against every other object for collision (checking $N$ objects against $N-1$ others) results in a time complexity of $O(N^2)$. As the number of objects increases, performance drops drastically.

For example:
- 10 objects = 45 collision checks
- 100 objects = 4,950 collision checks  
- 1,000 objects = 499,500 collision checks

This quickly becomes untenable.

# **The Solution: QuadTrees**

A **QuadTree** solves the "broad-phase" of collision detection by spatially partitioning the game world. Instead of checking everything against everything, we only check objects that are spatially near each other.

## How it works

1. **Partitioning**: The 2D space is divided into four quadrants (think of a grid being recursively subdivided).
2. **Insertion**: Objects are inserted into the node that spatially contains them.
3. **Subdivision**: If a node contains too many objects (exceeds a capacity threshold), it splits into four child nodes, and objects are redistributed into the appropriate children.
4. **Retrieval**: To check for collisions for a specific object, you query the QuadTree to return only the objects located in the same quadrant(s).

This reduces the number of checks significantly — typically to $O(N \log N)$ or better depending on spatial distribution.

## What is a QuadTree?

> A quadtree is a tree data structure in which each internal node has exactly four children. Quadtrees are the two-dimensional analog of octrees and are most often used to partition a two-dimensional space by recursively subdividing it into four quadrants or regions. The data associated with a leaf cell varies by application, but the leaf cell represents a "unit of interesting spatial information".
>
> — Wikipedia

In game development, QuadTrees excel when:
- Objects are distributed unevenly across the map
- You need fast spatial queries ("what's near this object?")
- The number of moving objects varies over time

# **When to Use QuadTrees**

**Good fit:**
- Games with many dynamic objects (bullet hell, particle systems, RTS games)
- Open-world environments with sparse object distribution
- Scenarios where objects cluster in certain areas

**Alternatives to consider:**
- **Uniform grid**: Better for evenly distributed objects
- **Spatial hash**: Simpler implementation for certain use cases
- **BVH (Bounding Volume Hierarchy)**: Better for 3D or when objects vary greatly in size

# **References**

- [Quadtree - Wikipedia](https://en.wikipedia.org/wiki/Quadtree)
- [JavaScript QuadTree Implementation](http://www.mikechambers.com/blog/2011/03/21/javascript-quadtree-implementation/)
- [Quick Tip: Use Quadtrees to Detect Likely Collisions in 2D Space](https://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374)