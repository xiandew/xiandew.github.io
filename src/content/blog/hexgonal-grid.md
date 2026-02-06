---
title: "Hexagonal grid"
description: "A short reference to Red Blob Games' excellent hex grid guide, with a practical rule of thumb for choosing offset/doubled coordinates vs axial/cube coordinates."
pubDate: 2019-11-25
author: "Xiande Wen"
tags: ["game-development", "hexagonal-grid", "algorithms", "coordinate-systems", "reference"]
---

Hexagonal grids are common in strategy games like Civilization because they offer uniform distance between all neighbors and cleaner movement paths than square grids. However, representing them in code is less straightforward than working with standard 2D arrays.

# **The Challenge**

Unlike rectangular grids that map naturally to arrays, hexagonal grids require careful thought about coordinate systems. The wrong choice can make simple operations (like "find neighbors" or "calculate distance") unnecessarily complex.

# **Coordinate System Options**

There are several ways to represent hexagonal coordinates, each with distinct trade-offs:

## Offset Coordinates

Similar to traditional 2D arrays with `(row, col)` indexing, but every other row is shifted horizontally.

**Pros:**
- Familiar array-like structure
- Straightforward storage
- Easy to map to rectangular data structures

**Cons:**
- Distance calculations are awkward
- Neighbor finding requires special cases for odd/even rows
- Mathematical operations become unnecessarily complicated

## Cube Coordinates

Uses three axes `(x, y, z)` with the constraint $x + y + z = 0$, treating the hex grid as if it's embedded in 3D space.

**Pros:**
- Distance calculation is simple: $\text{distance} = \frac{|x_1 - x_2| + |y_1 - y_2| + |z_1 - z_2|}{2}$
- Line drawing and pathfinding algorithms become elegant
- Neighbor operations are uniform (no special cases)

**Cons:**
- Requires storing three coordinates instead of two
- The redundant third axis feels unintuitive at first

## Axial Coordinates

Essentially cube coordinates with one axis dropped (since $z = -x - y$ is always derivable). Uses just `(q, r)`.

**Pros:**
- Compact two-coordinate representation
- Retains most mathematical elegance of cube coordinates
- Can calculate the third cube coordinate when needed

**Cons:**
- Slightly less intuitive than cube for some algorithms
- Still doesn't align naturally with rectangular maps

# **Which Should You Use?**

**Use offset/doubled coordinates if:**
- Your map is strictly rectangular and never rotates
- You're working with existing rectangular map data
- You rarely need distance calculations or pathfinding

**Use axial coordinates (recommended) if:**
- You need distance calculations, pathfinding, or field-of-view
- Your map might rotate or wrap
- You want cleaner, more maintainable algorithm implementations

> **Practical tip**: Use axial as your primary coordinate system. When you need cube coordinate elegance for specific algorithms (like line drawing), compute the third coordinate on-the-fly with $z = -x - y$. This gives you both storage efficiency and mathematical simplicity.

# **References**

- [Hexagonal Grids from Red Blob Games](https://www.redblobgames.com/grids/hexagons/) — The definitive guide to hex grid implementations, with interactive examples and code samples