---
sidebar: auto
---

# Git

[Git](https://git-scm.com) 是一个分布式版本管理工具。通常采用git命令行工具跟 [Smartgit](https://www.syntevo.com/smartgit) 混合使用。
Smartgit用来看log和处理版本冲突非常简单。

## 常用命令

### 初始化

```bash
git init
``` 

### 提交代码

```bash
git add -A
git commit -m "First commit"
git push
```

### Pull

```bash
git pull
```

### Merge

::: warning 注意
通常情况下请不要使用 `git rebase` 命令来合并分支，它会修改commit记录顺序，多人合作中容易产生冲突。请使用 `git merge`。
:::

```bash
git merge orgin/master # 将master分支代码合并到本分支
```

#### Squash Merge

`Squash Merge` 类似Cherry-pick，提交之后只会有一条commit记录，这样子才能保证git log是一条直线。

`git commit` 加author参数保证xxx-branch分支原始作者仍然存在在log中。

```bash
git merge origin/xxx-branch —squash 
git commit -m "Test message" --author="My Nick <my.adress@email.com>"
git push
```

### Branch

```bash
git branch wbk-fix-product-add-error # 创建wbk-fix-product-add-error分支

git checkout test # 切换到test分支

git branch wbk-fix-product-add-error -D # 删除wbk-fix-product-add-error分支

git reset --hard origin/master # 重置当前目录代码跟远程分支master保持一致
```

### Config

```bash
git config --local user.email "wenbinke@gmail.com"
git config --local user.name "wenbinke"

git config --local --get user.email
git config --local --get user.name
```

### 其他

```bash
git status # 查看当前目录git状态

git checkout . # 撤销修改

git clone git@github.com:git/git.git # clone远程代码

git fetch --prune # 获取代码，更新remote branch列表
```

## Git-flow

### master

`master` 是稳定分支，这上面的代码一定是稳定可发布的。

`staging` 和 `production` 环境均使用 `master` 分支代码。

### test

所有需要测试的开发分支均合并到 `test` 分支上并部署到 `test` 环境。

::: danger 注意
`test` 分支是一个只进不出的分支。勿把 `test` 分支上的代码切去做开发或合并到 `master`。
:::

### 开发分支

开发分支都从 `master` 切出新分支来开发，并且定期把 `master` 上最新代码合并到自己的分支上。

开发分支在经过 `test` 环境和 `code review` 之后通过 `squash` 的方式合并到 `master` 分支，然后上 `staging` 环境测试通过之后再发布到 `production` 环境。稳定的master版本可以打 `tag`。

::: tip 约定
1. 分支名字统一采用小写加 `-` 相连。

2. 多人合作中建议采用开发者姓名第一个字母做为分支前缀，比如开发者 `Wenbin Ke` 创建的branch名为 `wbk-test-branch`，这样子可以清晰的知道谁创建了哪几个分支，开发人员自己切换分支敲前缀的时候就可以根据智能提示快速切换到自己的分支。

3. 所有的开发分支在合并之后都要被删除。
:::

## 合并Commits

::: warning 注意
修改commit记录非常规操作，没事不要去修改commit记录和做 `force push` 操作，多人合作中容易冲突。
:::

```bash
git rebase -i HEAD~2 # 合并最后两条commit记录
```

运行以上命令出现以下界面:

```bash
pick 3de8ed0 Fix it # 最后一个commit记录
pick 32584e5 Fix # 倒数第二个commit记录

# Rebase d284beb..32584e5 onto d284beb (2 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
```

将第二行 `pick` 改成 `f` 保存退出后执行 `git push -f` 即可。放弃操作则执行 `git rebase --abort`。