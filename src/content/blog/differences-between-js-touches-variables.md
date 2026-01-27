---
title: "Differences between JS touches variables"
description: "A clear explanation of TouchEvent `touches`, `targetTouches`, and `changedTouches`, with practical scenarios for multi-touch and gesture-heavy interactions."
pubDate: 2019-03-25
author: "Xiande Wen"
tags: ["javascript", "touch-events", "mobile", "web-development", "tutorial"]
---

There are three common touches variables in JS, which is `touches`, `targetTouches`
and `changedTouches` when developing JS applications. Sometimes you can achieve
the same effects without regarding what they represent. However, when your design
involves massive touching interactions with users, things can be complex and
messy if you do not take care when to use each `touches` variables.

Here are the definitions of these touches variables and hope you can get a sense of
how they are differed from each other and when should each be used.

# **Definitions**

**touches**

> A `TouchList` listing all the `Touch` objects for touch points that are still in contact with the touch surface, regardless of whether or not they've changed or what their target element was at `touchstart` time.

**targetTouches**

> A `TouchList` listing all the `Touch` objects for touch points that are still in contact with the touch surface and whose `touchstart` event occurred inside the same target `element` as the current target element.

**changedTouches**

> A `TouchList` whose `Touch` objects include all the touch points that contributed to this touch event.

# **Illustration with examples**

- When only one finger touches the screen, all three variables will have the same value, that is one touch object.
- When one finger has been on the screen and the other finger touches a different element on the screen, `touches` will have two touch objects and each object represent a touch point and `targetTouches` will have the same values as `touches`. If the two fingers touch the same element on the screen, `targetTouches` will only have one touch variable. In both cases, whether the two fingers on the same element or not, `changedTouches` will have one touch object that represent the second finger touch point since it is the cause of event.
- When two fingers touch the screen at the same time, `changedTouches` have two touch objects because each finger touch point corresponds one objects.
- When the finger slides the screen, all three variables will change.
- When one finger is off screen, the corresponding touch object in `touches` and `targetTouches` will be removed while the corresponding object in `changedTouches` remains and the position is the last touch point before the finger off screen.
- When all fingers are off screen, `touches` and `targetTouches` will be empty while `changedTouches` remains one object that corresponds the last touch point before the last finger off the screen.

# **References**

- [touch事件中的touches、targetTouches和changedTouches详解](https://www.jianshu.com/p/5562ea676744)
- [TouchEvent.touches - MDN](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches)
- [TouchEvent.targetTouches - MDN](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/targetTouches)
- [TouchEvent.changedTouches - MDN](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/changedTouches)