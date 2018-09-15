---
sidebar: auto
---

# Docker

## 安装

下载安装包安装。[Docker Community Edition for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac)

## 使用

以安装运行mysql-server为例。[mysql/mysql-server](https://store.docker.com/community/images/mysql/mysql-server)

```bash
docker pull mysql/mysql-server

docker run --name=mysql1 -d mysql/mysql-server

docker ps # 查看已运行的docker容器。

docker logs mysql1 2>&1 | grep GENERATED # 查看运行log获取mysql初始密码
```

```bash
docker stop <container ID> # 停止运行

docker inspect <container ID> # 获取容器具体信息。
```