---
sidebar: auto
---

# Bash

基本命令有 `ls`，`dir`，`mkdir`，`ll`，`mv`，`cp`，`cd`，`rm`，`curl`，`pwd`。

`man <command>` 命令查看帮助信息。

## 网络

```bash
ipconfig getifaddr en0 # 获取本机IP

lsof -i :8080 # 找出使用了8080端口号的进程

ssh root@<remote-ip> # 登录远程服务器

scp -r root@<remote-ip>:/tmp/app.log ~/Downloads # 将远程服务器上的文件下载到本机Downloads目录下

scp ~/Downloads/go.tar.gz root@<remote-ip>:/tmp # 将本机文件上传到远程服务器上

scp -F ./ssh-config -r workers/sample.sh xiaoke-dev:/tmp # 指定ssh config文件

netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}' # 查看服务器TCP连接状态统计
```

## 文件

### 查看

```bash
tail –f /tmp/app.log # 监听app.log并打印内容，用于查看log

tail –5 /tmp/app.log # 打印app.log最后5行内容

tail –n +50 /tmp/app.log # 打印app.log从第50行开始的内容

cat /tmp/app.log | grep graphql # 列出app.log含有graphql的片段

df -h # 查看剩余磁盘空间

du -h /etc # 文件夹大小

du -ah /etc/ | sort -n -r | head -n 10 # 显示前10个吃存储的文件
```

### 创建

```bash
echo 'hello' > test.txt # 往test.txt写入hello

echo 'world' >> test.txt # 往test.txt添加world

mkdir -p logs # 创建logs目录，目录已存在不报错
```

### 搜索

```bash
grep -r graphql . # 列出当前目录下文件含有graphql字眼的文件

grep '2018-07-04' dev.log -A 3 -B 3 # 找出dev.log中含有2018-07-04的前后3行

find ./ -name '*.go' # 找出当前目录下所有go文件

fgrep '2018-07-04' dev.log -c # 搜索dev.log文件里面含有`2018-07-04`的行的计数

fgrep '2018-07-04' dev.log | grep 'error' -c # 在上面命令的基础上增加行内含有`error`的条件
```

### 权限

```bash
chown -r www-data:www-data logs # 更改文件Owner

chmod 600 aws-dev.pem # 设置为拥有者可读写。777表示所有人可以读写及执行。
```

### 删除

```bash
rm ./test.txt # 删除test.txt文件
rm -rfv ./node_modules # 删除整个node_modules目录
```

## 可执行文件

这是一个简单的含有if和外传变量的bash文件代码示例。保存为 `run.sh` 文件后执行 `bash run.sh test` 命令。

```bash
#!/bin/bash
env=$1 # example: test, staging, sandbox

if [ "$env" = "" ]; then
    echo "'env' should be test, staging or sandbox"
    exit
fi

echo $env
```

## 时间

```bash
date +%s # Timestamp: 1535723215 

date -u +"%Y-%m-%dT%H:%M:%SZ" # UTC: 2018-08-31T13:50:55Z

date +%Y-%m-%dT%H:%M:%S%z # Local: 2018-08-31T21:52:17+0800
```

## 其他

```bash
sudo su # 切换到root权限

ln -s /usr/local/etc/php/7.1/php.ini /etc/php # php.ini 链到 /etc/php 目录下

ps aux | grep php # 找出还有php字眼的进程

kill 16969 # 干掉PID为16969的进程

kill `ps aux | grep vscode | awk '{print \$2}'` # 干掉vscode相关的进程

history | grep php # 查看最近含有php字眼的命令记录

whereis openssl

which nginx

node app.js > /dev/null 2>&1 # 不输出执行内容，包括出错信息

nohup redis-server & # 不挂断运行命令
```

