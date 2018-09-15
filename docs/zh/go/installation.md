
# 安装

1. 到官网下载安装包来安装。[https://golang.org/dl/](https://golang.org/dl/)

2. 安装好之后设置GOPATH，这个就是设置你的go运行工作区。

编辑`~/.zshrc`或者`~/.bash_profile`，加入以下设置：

```bash
export GOPATH=$HOME/go
```

之后你的代码都统一放到`~/go/src`目录下面，具体见 [https://golang.org/doc/code.html#Workspaces](https://golang.org/doc/code.html#Workspaces)

保存好之后记得执行

```bash
source ~/.zshrc # 或 source ~/.bash_profile
```

3. 最后运行 `go` 命令看是否展示出了一份所有可用命令的帮助信息。

运行以下命令检查其是否是最新版：

```bash
go version
```