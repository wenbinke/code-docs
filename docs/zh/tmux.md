---
sidebar: auto
---

# Tmux 

tmux 是一款终端复用命令行工具，一般用于Terminal 的窗口管理。

## 安装

**Macos**

```bash
brew install tmux
```

**Ubuntu**

```bash
sudo apt install -y tmux
```

[配置](https://github.com/gpakosz/.tmux)

## 基本

```bash
tmux # 新建session
tmux new -s myname # 新建session并命名为myname
tmux a # 打开最近使用的session
tmux a -t myname # 打开名为myname的session
tmux ls # 列出所有session
tmux kill-session -t myname # 关闭名为`myname`的session
```

::: tip 提示
tmux快捷键前缀为`ctrl+b`，执行以下命令都需先敲`ctrl+b`。
:::

## Sessions

```bash
:new  # new session
s  # list sessions
$  # rename session
```

## Windows

```bash
c # new window
, # name window
w # list windows
f # find window
& # kill window
{number} # press number to swap windows
```

## Panes

```bash
%  # horizontal split
"  # vertical split
o  # swap panes, can also use [hijk] to swap panes
q  # show pane numbers
x  # kill pane
z  # focus on current pane
⍽  # space - toggle between layouts
```

## 其他

```bash
:joinp -s :2  # 移动window 2到当前window
:joinp -t :1  # 移动当前pane到window 1
d  # quit session
t  # show time
?  # show help
```
