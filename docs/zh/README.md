---
sidebar: auto
---

# 前言

在这个信息过载的互联网时代，大部分文章和文档都是冗余繁杂的。虽然开发场景总是相似的，但是开发人员通常需要花费大量的时间去筛选出那20%有价值的信息。

本文档列出了一个开发人员可能需要知道的内容来帮助他们避免花费大量时间从头开始踩坑，加快学习进程，增强自身综合能力，规范自己的代码，避免给他人造成麻烦和困扰。

::: warning 注意
完成一件事情可能有多种代码写法，本文档一般情况下只列出本人认为的最佳写法。水平有限，文档有错误在所难免。
:::

## 基础

### 存储

1TB=1024GB 1GB=1024MB 1MB=1024KB 1KB=1024Byte。Byte是字节。一个汉字占两个字节。一个英文字母占一个字节。

### 时间

::: tip 提示
不同的应用程序接口之间通讯应统一采用 `UTC` 时间格式。比如API返回给APP端或Web端的时间格式应为 `UTC` 格式。
:::

- `UTC` 时间格式为 `2018-08-22T06:53:54Z`。这是 [ISO 8601](https://zh.wikipedia.org/wiki/ISO_8601) 规范。

- `Unix Timestamp` 是指UTC时间 `1970-01-01T00:00:00Z` 到现在的 `秒数`。例如: `1534930509`。

- 本地时间格式为 `2018-08-02T22:57:16+08:00`。表示东8区（北京时间）此时的时间。`T` 前面是日期后面是时间。

- [W3C NOTE datetime](https://www.w3.org/TR/NOTE-datetime) 对于时间这块做了约定，在 [ISO 8601](https://zh.wikipedia.org/wiki/ISO_8601) 规范上增加了秒是可以带小数的，例如 `{{new Date().toISOString()}}`。

### 常用命名

`display_order`（排序号），`first_name`（名），`last_name`（姓），`nickname`（昵称），`sex`（性别），`date_of_birth`（生日），`status`（状态）。

命名神器：[https://unbug.github.io/codelf](https://unbug.github.io/codelf)。

## 语言

[Go](/zh/go/) [PHP](/zh/php/) [Bash](/zh/bash.html) [Python](/zh/python/) [Node.js](/zh/js/)

## 工具

[代理抓包](/zh/tools/proxy.html) [Tmux](/zh/tmux.html) [Git](/zh/git.html)

## 规范与约定

[RESTful API](/zh/restful.html)

## 其他

[MySQL](/zh/mysql.html) [SSH](/zh/ssh.html) [Redis](/zh/redis.html) [Docker](/zh/docker.html) [VPN](/zh/vpn.html) [Nginx](/zh/nginx.html) [AWS](/zh/aws.html) [Vim](/zh/vim.html) [逆向工程](/zh/reverse-engineering.html) [常见问题](/zh/issues.html) [解决方案](/zh/solutions/)  [Network](/zh/network.html)  [杂项](/zh/misc.html) 

## TODO

Kotlin，C#，Elasticsearch，Rabbitmq，Exception，Regex
