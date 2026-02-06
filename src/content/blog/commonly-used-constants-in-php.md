---
title: "Commonly used constants in PHP"
description: "A quick reference of commonly used PHP core constants (EOL markers, integer limits, float ranges) and why they matter for portable code."
pubDate: 2019-03-11
author: "Xiande Wen"
tags: ["php", "constants", "reference", "best-practices", "tutorial"]
---

Hardcoding values like `"\n"` or `2147483647` in your PHP code is a subtle way to introduce platform-specific bugs. PHP's predefined constants exist to save you from these headaches.

# **Why This Matters**

Consider this seemingly innocent code:

```php
file_put_contents('output.txt', "Line 1\nLine 2\nLine 3");
```

On Linux, this works perfectly. On Windows, it creates a file that confuses text editors because Windows expects `\r\n` line endings, not just `\n`. Your logs look fine on your development machine but break when deployed.

Or imagine checking if a number exceeds the maximum integer:

```php
if ($value > 2147483647) {
    // Handle large number
}
```

This breaks on 64-bit systems where integers can be much larger. Your "safe" boundary check becomes meaningless.

# **The Essential Constants**

## Platform-Specific Constants

**`PHP_EOL`** — The correct line ending for the current platform
- `\n` on Unix/Linux/macOS
- `\r\n` on Windows
- Available since PHP 5.0.2

```php
// ✅ Portable
$log = "Error occurred" . PHP_EOL . "Stack trace:" . PHP_EOL;

// ❌ Platform-specific
$log = "Error occurred\n" . "Stack trace:\n";
```

## Integer Boundaries

**`PHP_INT_MAX`** — Largest possible integer
- `2,147,483,647` on 32-bit systems
- `9,223,372,036,854,775,807` on 64-bit systems
- Available since PHP 5.0.5

**`PHP_INT_MIN`** — Smallest possible integer (usually `-PHP_INT_MAX - 1`)
- Available since PHP 7.0.0

**`PHP_INT_SIZE`** — Integer size in bytes (4 or 8)
- Available since PHP 5.0.5

```php
// Check if a value will overflow
if ($value > PHP_INT_MAX) {
    // Use arbitrary precision math instead
    $result = bcmul($value, $multiplier);
}
```

## Floating Point Precision

**`PHP_FLOAT_EPSILON`** — The smallest difference between 1.0 and the next representable float
- Useful for comparing floats with tolerance
- Available since PHP 7.2.0

**`PHP_FLOAT_MIN`** / **`PHP_FLOAT_MAX`** — Smallest and largest representable floats
- Available since PHP 7.2.0

```php
// ✅ Correct float comparison
if (abs($a - $b) < PHP_FLOAT_EPSILON) {
    // Numbers are equal within precision limits
}

// ❌ Unreliable
if ($a == $b) {
    // Can fail due to floating point rounding
}
```

# **When to Use These**

**Use `PHP_EOL` when:**
- Writing to text files that humans will read
- Generating CSV files
- Creating log files
- Building email bodies

**Use integer constants when:**
- Validating numeric input ranges
- Deciding between int and string storage
- Implementing overflow-safe arithmetic
- Supporting both 32-bit and 64-bit environments

**Use float constants when:**
- Comparing decimal numbers
- Implementing scientific calculations
- Detecting precision loss

# **References**
- [Predefined Constants](http://php.net/manual/en/reserved.constants.php)
- [When do I use the PHP constant "PHP_EOL"](https://stackoverflow.com/questions/128560/when-do-i-use-the-php-constant-php-eol)