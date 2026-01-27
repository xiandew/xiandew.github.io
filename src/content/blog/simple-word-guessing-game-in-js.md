---
title: "Simple word guessing game in JS"
description: "A simple JavaScript word guessing game spec: how words are chosen, how letters are hidden, and how scoring and remaining guesses drive the game loop."
pubDate: 2019-03-19
author: "Xiande Wen"
tags: ["javascript", "game", "web-development", "project", "tutorial"]
---

You can play it [here]({{ site.url | append: '/GuessTheWord/' }}).

# **Specification**

This is a simple word guessing game. It is intended to focus on the logic rather
than the game itself. Only 50 words are included and answers that are not included
in these 50 words are considered to be incorrect. The guessing word is selected randomly from these 50 words repeatedly. And for each guessing word, no more than
half its letters are chosen randomly to be hidden for the player to guess.

You can find all words [here](https://xiandew.github.io/GuessTheWord/js/words.js).

Three components are recorded in the game board.

| Component | Description |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Your current score** | Initially zero and will be incremented by one if you guess one word right.                                                                                                                                                                |
| **Incorrect guesses**  | Initially zero and incremented by one when you submited a worng answer.                                                                                                                                                                   |
| **Remaining guesses**  | Initially ten and decremented by one when you submited a wrong answer. The game is meant to be over when no remaining guesses are left. And at that time, the game board will be resumed to the current state and a new game is restarted |