---
sidebar: auto
---

# Redis

[Redis](https://redis.io)是一个key-value数据库，用于做分布式缓存。

## 安装

### MacOS

```bash
brew install redis
```

### Amazon Linux

```bash
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make distclean
make install
make test
cp src/redis-server src/redis-cli /usr/bin
redis-server --daemonize yes --bind 0.0.0.0
```

## 运行

```bash
redis-server # 运行Redis Server

redis-cli # 连接本地Redis Server

redis-cli -h <remote-host> -p 6379 # 连接远程Redis Server
```

## 命名

Key的命名用 `:` 连接。比如 `object-type:id:field`。

## 操作

### AUTH 

`CONFIG SET requirepass <password>` 使用密码来保护Redis服务器。之后需要 `AUTH <password>` 才能使用其他命令。

```bash
127.0.0.1:6379> CONFIG SET requirepass 123456 # 设置密码
127.0.0.1:6379> AUTH 123456
```

`CONFIG SET requirepass ""` 可以清除密码。

### 常用命令

`PING` `SET` `GET` `DEL` `KEYS` `MONITOR` `EXPIRE` `EXPIREAT` `RPUSH` `HGET` `HSET`...

命令都很简单, 具体见 [https://redis.io/commands](https://redis.io/commands)

::: warning 注意
`LIST` 和 `HASH` 上面的item是不能单独设置过期时间的，但是可以利用 `EXPIRE` 或 `EXPIREAT` 给 `LIST` 和 `HASH` 设置过期时间。
:::