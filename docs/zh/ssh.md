---
sidebar: auto
---

# SSH

SSH是一种网络协议，用于计算机之间的加密登录。

## 基本

- `ssh` 默认端口号是22, 如果远程服务器修改了端口号则命令后面加参数 `-p <port>`。

```bash
ssh root@192.168.1.121

ssh -i dev.pem ec2-user@<ip-address> # 使用pem文件方式登录
```

- 生成公钥私钥

```bash
ssh-keygen -t rsa
```

文件路径在 `~/.ssh`。私钥文件是 `id_rsa`, 公钥文件是 `id_rsa.pub`。公钥内容需加入远程服务器文件 `~/.ssh/authorized_keys` 里面方能连接。

## 高级

对于登录频率非常高的服务器有必要修改下 `~/.ssh/config` 文件, 避免每次都要通过命令 `ssh root@<ip-address>` 来登录。

### 基本配置

配置 `~/.ssh/config` 文件, 可以使用命令 `ssh codedocs-test` 和 `ssh codedocs-staging` 登录服务器。可读性高, 而且有智能提示。

```yaml
# 最简单的配置
Host codedocs-test
    HostName test.codedocs.io
    User ec2-user

# 带pem文件和自定义PORT
Host codedocs-staging
    HostName staging.codedocs.io
    User ec2-user
    Port 2200
    IdentityFile ~/pems/codedocs-staging.pem
```

::: tip 提示
不修改 `~/.ssh/config` 也可以直接指定一个config文件。

```bash
ssh -F ./ssh-config codedocs-staging
```
:::

### 跳板加速

从中国直接ssh美国的服务器很慢, 以下配置通过首尔服务器做跳板可以达到加速访问的效果。

```yaml
Host codedocs-dev
    HostName dev.codedocs.io
    User ec2-user
    ProxyCommand ssh codedocs-us-vpn nc %h %p

Host codedocs-us-vpn
    HostName us.vpn.codedocs.io
    User ubuntu
    ProxyCommand ssh codedocs-seoul-vpn nc %h %p

Host codedocs-seoul-vpn
    HostName seoul.vpn.codedocs.io
    User ubuntu
```

`ssh codedocs-us-vpn` 命令会先连到 `codedocs-seoul-vpn` 再连到 `codedocs-us-vpn` 服务器。

`ssh codedocs-dev` 命令则是通过 `codedocs-seoul-vpn` 和 `codedocs-us-vpn` 最后连到 `codedocs-dev` 服务器。

### 执行命令

- 登录 `codedocs-dev` 后自动进入 `/var/www` 目录并列出目录。

```bash
ssh codedocs-dev -t "cd /var/www; ls; bash"
```

- 以下代码为ssh执行代码块的示例。代码保存为 `tmp.sh` 文件执行 `ssh tmp.sh <env>`。

```bash
env=$1

scripts=$(cat <<EOF
    cd /tmp
    mv bash-$env.config bash.config

    bash update-env.sh

    rm -f /tmp/update-env.sh
    rm -f /tmp/bash.config
EOF
)

ssh codedocs-dev -t "sudo sh -c '$scripts'"
```

### 端口转发

```bash
ssh -L [listening port]:[REMOTE_MYSQL_HOST]:[REMOTE_MYSQL_PORT] [SSH_USER]@[SSH_HOST]
```

**场景描述**

`dev.codedocs.io` 服务器出于安全考虑只开放了 `80/443/22` 端口。`dev.codedocs.io` 服务器可以访问RDS `db.codedocs.io`。本地电脑无法直接访问 `db.codedocs.io`。本地电脑可以ssh上 `dev.codedocs.io`。

本地电脑希望能通过本地 `127.0.0.1:3308` 连接上远程数据库。

1. 如下配置

```yaml
Host codedocs-dev-db-tunnel
    HostName dev.codedocs.io
    User ec2-user
    LocalForward 3308 db.codedocs.io:3306
```

2. 运行命令

```bash
ssh -f -N codedocs-dev-db-tunnel

# -f puts ssh in background
# -N makes it not execute a remote command
```

3. 连接数据库

1, 2 两步等价于 `ssh -f -N -L 3308:db.codedocs.io:3306 ec2-user@dev.codedocs.io`。

```bash
mysql -h 127.0.0.1  -uroot -p123456 -Ddemo_db -A --port=3308

# -A no-auto-rehash 禁用智能提示, 加快敲命令速度
```

