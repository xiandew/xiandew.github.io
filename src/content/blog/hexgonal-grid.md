---
title: "Hexagonal grid"
description: "A short reference to Red Blob Games' excellent hex grid guide, with a practical rule of thumb for choosing offset/doubled coordinates vs axial/cube coordinates."
pubDate: 2019-11-25
author: "Xiande Wen"
tags: ["game-development", "hexagonal-grid", "algorithms", "coordinate-systems", "reference"]
---

Hexagonal grids are common in strategy games (like Civilization) because they offer uniform distance between neighbors and cleaner movement paths than square grids. However, representing them in code is trickier than standard 2D arrays.

There are several coordinate systems for hex grids, each with pros and cons:

*   **Offset coordinates**: Similar to 2D arrays (row, col) but every other row is shifted. Simple to store, hard to do math with.
*   **Cube coordinates**: Uses three axes (x, y, z) where $x + y + z = 0$. This makes algorithms for distane and line drawing much simpler and more elegant, at the cost of storage.
*   **Axial coordinates**: Essentially cube coordinates but dropping one redundant axis.

> My recommendation: if you are only going to use rectangular maps, and never rotate the map, consider the doubled or offset coordinates, as they will line up with your map better than axial or cube. In all other cases, use **axial** as the primary system, and calculate the third cube coordinate only for those algorithms where cube is easier to work with.


# **References**
- [Hexagonal Grids from Red Blob Games](https://www.redblobgames.com/grids/hexagons/)