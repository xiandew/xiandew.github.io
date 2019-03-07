---
  layout: post
  title: Default parameters in JavaScript
  tags:
  categories:
    - JavaScript
---

**Default function parameters** allow named parameters to be initialized with default values if no value or `undefined` is passed.

<!--more-->

# **Syntax**

```javascript
function [name]([param1[ = defaultValue1 ][, ..., paramN[ = defaultValueN ]]]) {
   statements
}
```

# **Description**

In JavaScript, function parameters default to `undefined`. However, it's often useful to set a different default value. This is where default parameters can help.

In the past, the general strategy for setting defaults was to test parameter values in the function body and assign a value if they are `undefined`.

In the following example, if no value is provided for b when `multiply` is called, b's value would be `undefined` when evaluating `a * b` and `multiply` would return `NaN`.

```javascript
function multiply(a, b) {
  return a * b;
}

multiply(5, 2); // 10
multiply(5);    // NaN !
```

To guard against this, something like the second line would be used, where b is set to 1 if `multiply` is called with only one argument:

```javascript
function multiply(a, b) {
  b = (typeof b !== 'undefined') ?  b : 1;
  return a * b;
}

multiply(5, 2); // 10
multiply(5);    // 5
```

With default parameters in ES2015, checks in the function body are no longer necessary. Now, you can assign 1 as the default value for b in the function head:

```javascript
function multiply(a, b = 1) {
  return a * b;
}

multiply(5, 2); // 10
multiply(5);    // 5
```

# **References**

- [Default parameters - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters){:target='_blank'}
