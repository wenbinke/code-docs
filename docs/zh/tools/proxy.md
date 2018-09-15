# 代理抓包

[mitmproxy](https://mitmproxy.org/) 是一款免费开源的HTTP(S)代理抓包工具。可用于抓取手机APP API请求进行分析。

## 安装

```bash
brew install mitmproxy
```

## 运行

运行 `mitmproxy -p <port>` 命令，去掉 `-p <port>` 默认监听端口号为 `8080`。

::: tip 常用界面切换命令
q - 返回上一层

l - 设置URL地址过滤（小写L）

Enter - 查看内容

Tab - 切换看request/response/detail

C - 清空（大写C）
:::

## 设置手机

运行 `ipconfig getifaddr en0` 命令获取本机IP。

在手机网络设置里面找到已连接的网络，里面有个代理选项，输入前面获取的IP和 `mitmproxy` 监听的端口号 `8080` 保存即可。

