---
  layout: post
  title: Install and configure PHP with httpd in Linux
  tags:
  categories:
    - PHP
    - Linux
---

# **Download PHP package**

```bash
wget "http://cn2.php.net/distributions/php-7.0.6.tar.gz"
```

# **Decompress PHP package**

```bash
tar -zxvf php-7.0.6.tar.gz
```
# **Check if httpd_devel installed**

if not, install it as following,

```bash
yum install httpd-devel
```

or using `apt-get`.

It is important to check the existence of `httpd_devel` before installing PHP.
Because if there is no `httpd_devel`, related `.so` files for PHP will not be
generated, which is essential for configuring PHP with httpd.

# **PHP configuration**

After decompressing the PHP package, go to that directory to configure PHP
installation.

You can configure it as following. Some configurations may not be necessary. It
is better to add only necessary configurations since each configuration parameter
may require some dependencies and you need to install those dependencies before
configuring.

```bash
./configure \
--prefix=/usr/local/php7 \
--exec-prefix=/usr/local/php7 \
--bindir=/usr/local/php7/bin \
--sbindir=/usr/local/php7/sbin \
--includedir=/usr/local/php7/include \
--libdir=/usr/local/php7/lib/php \
--mandir=/usr/local/php7/php/man \
--with-config-file-path=/usr/local/php7/etc \
--with-mysql-sock=/var/run/mysql/mysql.sock \
--with-mcrypt=/usr/include \
--with-mhash \
--with-openssl \
--with-pdo-mysql=shared,mysqlnd \
--with-mysqli=shared,mysqlnd \
--with-pdo-mysql=shared,mysqlnd \
--with-apxs2\
--with-gd \
--with-iconv \
--with-zlib \
--enable-zip \
--enable-inline-optimization \
--disable-debug \
--disable-rpath \
--enable-shared \
--enable-xml \
--enable-bcmath \
--enable-shmop \
--enable-sysvsem \
--enable-mbregex \
--enable-mbstring \
--enable-ftp \
--enable-gd-native-ttf \
--enable-pcntl \
--enable-sockets \
--with-xmlrpc \
--enable-soap \
--without-pear \
--with-gettext \
--enable-session \
--with-curl \
--with-jpeg-dir \
--with-freetype-dir \
--enable-fpm \
--without-gdbm \
--enable-opcache=no \
--disable-fileinfo
```

# **Install PHP**

If it is configured successfully, install it as following:

```bash
make && make install
```

If there is any warnings or errors, look into that, see if any dependencies
needed and install them. If you have installed required dependencies, before
you try to install again, run `make clean` first and then `make && make install`.

# **Copy PHP configuration file**

Locate `php.ini-production` or `php.ini-development` and copy it as `php.ini`
in the same directory.

# **Configure path**

Add the directory of PHP executable to the end of `/etc/profile` like:
```bash
PATH=$PATH:/usr/local/php/bin
```
save it and then run:
```bash
export PATH
```
then reload the configuration file:
```bash
source /etc/profile
```
test it with:
```bash
echo $PATH
```

# **Configure with httpd.conf**

**AddTYPE**

Search for `AddType` and at the end, add following:
```bash
AddType application/x-httpd-php .php
AddType application/x-httpd-php .php .phtml .php3
AddType application/x-httpd-php-source .phps
```
If you don't add those three lines, httpd will print the content of the PHP
rahter then execute it.

**DirectoryIndex**

Search for `DirectoryIndex` and append `index.php` at the end if there isn't.

**LoadModule**

Search for `LoadModule`, append at the end:
```bash
LoadModule php7_module modules/libphp7.so
```
If there is not `libphp7.so`, then it means that something wrong with the
configuration. You should make sure to add `--with-apxs2` when configuring PHP
installation. Check any other possible problem and fix it and see if the `.so`
file for PHP present. You should repeat the procedure and even reinstalling PHP
till there is `.so` file.

# **Test**
After the above steps, you should have PHP running on your server. You can test
it by creating an `index.php` with the following content and visit it from
localhost. If it doesn't work, try again with firewall closed.

```php
<?php
phpinfo();
?>
```

# **References**

- [centos7 php7 httpd](https://www.cnblogs.com/likui360/p/5511909.html){:target="_blank"}
