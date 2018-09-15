---
sidebar: auto
---

# VPN

VPN英文全称是 `Virtual Private  Network`，翻译过来就是 `虚拟专用网络`。搭建一个VPN服务器，连接上这个VPN相当于进入这台VPN服务器所在的局域网，具备了和VPN服务器同等访问网络资源的权限。


## 搭建VPN

参考文档 [IPsec VPN Server Auto Setup Scripts](https://github.com/hwdsl2/setup-ipsec-vpn)

以下脚本在 `Ubuntu` 上通过。

```bash
scp -r ./create-credentials.sh codedocs-vpn:/tmp

scripts=$(cat <<EOF
    cd /tmp

    wget https://git.io/vpnsetup -O vpnsetup.sh
    bash vpnsetup.sh

    bash create-credentials.sh wenbinke

    rm -rfv /tmp/*
EOF
)

ssh codedocs-vpn -t "sudo sh -c '$scripts'" # 运行后会在Console打印出VPN_IPSEC_PSK。
```

- `ssh codedocs-vpn` 参考 [SSH](/zh/ssh.html)。

- 以下为 `create-credentials.sh` 源码。用于创建VPN账号。

```bash
#!/bin/bash

vpn_user=$1
vpn_password=$2

if [ -z "$vpn_password" ]; then
    vpn_password="$(LC_CTYPE=C tr -dc 'A-HJ-NPR-Za-km-z2-9' < /dev/urandom | head -c 16)"
    echo "$vpn_user $vpn_password"
fi

cat >> /etc/ppp/chap-secrets <<EOF
"$vpn_user" l2tpd "$vpn_password" *
EOF

vpn_password_enc=$(openssl passwd -1 "$vpn_password")
cat >> /etc/ipsec.d/passwd <<EOF
$vpn_user:$vpn_password_enc:xauth-psk
EOF
```

## 连接VPN

MacOS 下点击网络设置新增VPN网络。配置如下信息即可。

`Send all trafic over VPN connection` 需勾选。

```
VPN Type: L2TP over IPSec
Server Address: <VPN_HOST>
Shared Secret: <VPN_IPSEC_PSK>
Username: <USERNAME>
Password: <PASSWORD>
```