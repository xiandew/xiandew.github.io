---
  layout: post
  title: Commonly used constants in PHP
  tags:
  categories:
    - PHP
---

> These constants are defined by the PHP core.

<!--more-->

| ---                   | ---                                                                                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **PHP_EOL**           | The correct 'End Of Line' symbol for this platform. Available since PHP 5.0.2                                                                                                                                      |
| **PHP_INT_MAX**       | The largest integer supported in this build of PHP. Usually int(2147483647) in 32 bit systems and int(9223372036854775807) in 64 bit systems. Available since PHP 5.0.5                                            |
| **PHP_INT_MIN**       | The smallest integer supported in this build of PHP. Usually int(-2147483648) in 32 bit systems and int(-9223372036854775808) in 64 bit systems. Available since PHP 7.0.0. Usually, PHP_INT_MIN === ~PHP_INT_MAX. |
| **PHP_INT_SIZE**      | The size of an integer in bytes in this build of PHP. Available since PHP 5.0.5                                                                                                                                    |
| **PHP_FLOAT_EPSILON** | Smallest representable positive number x, so that x + 1.0 != 1.0. Available as of PHP 7.2.0.                                                                                                                       |
| **PHP_FLOAT_MIN**     | Smallest representable floating point number. Available as of PHP 7.2.0.                                                                                                                                           |
| **PHP_FLOAT_MAX**     | Largest representable floating point number. Available as of PHP 7.2.0.                                                                                                                                            |

*Note*

*It is better to use `PHP_EOL` when you need to put new line characters. Since the difference between new line characters in different systems, `PHP_EOL` can improve the portability of your codes to some extent.*

# **References**
- [Predefined Constants](http://php.net/manual/en/reserved.constants.php){:target='_blank'}
- [When do I use the PHP constant "PHP_EOL"](https://stackoverflow.com/questions/128560/when-do-i-use-the-php-constant-php-eol){:target='_blank'}
