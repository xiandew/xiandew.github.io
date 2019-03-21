---
  layout: post
  title: Simple word guessing game in JS
  tags:
  categories:
    - JavaScript
---

Play it [here]({{ site.url | append: '/projects/WordGuessingGame/index.html' }}){:target="_blank"}.

# **Specification**

This is a simple word guessing game. It is intended to focus on the logic rather
than the game itself. Only 50 words are included and answers that are not included
in these 50 words are considered to be incorrect. The guessing word is selected randommly from these 50 words repeatedly. And for each guessing word, no more than
half its letters are chosen randomly to be hidden for the player to guess.

You can find all words [here](https://github.com/xiandew/WordGuessingGame/blob/master/words.js){:target="_blank"}.

Three components are recorded in the game board.

| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Your current score | Initially zero and will be incremented by one if you guess one word right.                                                                                                                                                                |
| Incorrect guesses  | Initially zero and incremented by one when you submited a worng answer.                                                                                                                                                                   |
| Remaining guesses  | Initially ten and decremented by one when you submited a wrong answer. The game is meant to be over when no remaining guesses are left. And at that time, the game board will be resumed to the current state and a new game is restarted |
