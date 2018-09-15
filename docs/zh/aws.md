---
sidebar: auto
---

# AWS

## 网络

1. 两个VPC，`prod-vpc` 用于 `production` 环境，`dev-vpc` 用于开发测试环境。

2. 大部分服务器都在 `private subnet` 下，不对外开放。内部服务器通过 `load balancer` 对外提供服务，或者通过自己搭建的 `proxy` 服务器提供服务。

3. `private subnet` 内服务器需要访问外部网络资源则通过 `nat gateway`，外部无法直接访问到 `private subnet` 下的资源。

4. `public subnet` 连的是 `internate gateway`，直接跟外部连接。查看 `Subnets > [Choose item] > Route table`。`load balancer` 和 `proxy` 服务器在此网络下。

5. `subnet` 命名示例: `[dev]public us-west-2a`，`[prod]private us-west-2a`。

## EC2

1. 统一使用 `Amazon Linux`。

2. `EC2 Instance` 命名示例: `[dev]codedocs-test`，`[prod]codedocs-api`。

3. `Security Group` 命名示例: `[dev]allow-all-traffic`，`[prod]mysql`，`[prod]load-balancer`，`[prod]api-server`。

## SSL证书

通配符证书需添加root域名(不含www，如codedocs.io)。

```
codedocs.io
*.codedocs.io
```
