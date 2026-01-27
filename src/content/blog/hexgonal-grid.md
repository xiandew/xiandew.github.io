---
title: "Hexagonal grid"
description: "A short reference to Red Blob Games' excellent hex grid guide, with a practical rule of thumb for choosing offset/doubled coordinates vs axial/cube coordinates."
pubDate: 2019-11-25
author: "Xiande Wen"
tags: ["game-development", "hexagonal-grid", "algorithms", "coordinate-systems", "reference"]
---

> My recommendation: if you are only going to use rectangular maps, and never rotate the map, consider the doubled or offset coordinates, as they will line up with your map better than axial or cube. In all other cases, use **axial** as the primary system, and calculate the third cube coordinate only for those algorithms where cube is easier to work with.


# **References**
- [Hexagonal Grids from Red Blob Games](https://www.redblobgames.com/grids/hexagons/)