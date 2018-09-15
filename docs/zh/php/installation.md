
# 安装

- MacOS 虽然自带了 `php`，但是版本过低，不适合开发和学习。我们通过 `brew install` 来安装最新版。

```bash
brew update && brew upgrade
brew install php@7.2
brew services start php
```

- AmazonLinux 安装 `php`

```bash
yum upgrade -y
yum update -y
yum install -y php72 php72-fpm php72-mysqlnd
yum remove -y httpd
echo '[Date]
date.timezone="UTC"
upload_max_filesize=100M
post_max_size=100M
memory_limit=1024M' > /etc/php.ini
```

- 在命令行中访问 `php -v` 命令来验证它是否安装成功。

```bash
php -v

// 获取 php.ini 路径
php -i | grep php.ini
```

- 开发环境采用 [VSCode](https://code.visualstudio.com) + `PHP IntelliSense`，`PHP Debug` 插件。