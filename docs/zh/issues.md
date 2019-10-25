---
sidebar: auto
---

# 常见问题

## 服务器无翻墙解决境外资源文件无法访问

### 问题

比如服务器上无法访问域名为 `github.com` 的资源文件。

### 解决办法

1. 打开 `https://www.ipaddress.com/`, 查询 `github.com` 的IP地址。

2. `/etc/hosts` 加入查询到的IP地址，如 `140.82.114.4 github.com` 即可。

## 境外npm资源因翻墙问题无法安装

### 问题

比如服务器安装 `node-sass`，错误显示如下：

> Cannot download "https://github.com/sass/node-sass/releases/download/v3.5.1/win32-ia32-47_binding.node": 
>
> getaddrinfo ENOTFOUND github.com github.com:443

[https://github.com/lmk123/blog/issues/28](https://github.com/lmk123/blog/issues/28)

### 解决办法

**方法一**

直接执行 `SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass`。

**方法二**

项目中添加 `.npmrc` 文件加入以下内容：

```conf
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
registry=https://registry.npm.taobao.org
```