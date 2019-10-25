---
sidebar: auto
---

# 逆向工程

主要用于对付费软件的破解，使之可以免费使用。

## 工具

[Hopper Disassembler](https://www.hopperapp.com/index.html)

## 使用

1. 打开`Hopper Disassembler`将二进制文件拖入工具打开。比如破解文件为`/Applications/Dash.app/Contents/MacOS/Dash`。
2. 分析反编译的代码，找到需要破解的逻辑。
3. 通过`Modify > NOP Region`将汇编代码逻辑里面的指令改为`nop`指令。`nop`指令相当于什么也不做，类似`Python`语言中的`pass`占位符。
4. 通过`File > Produce New Executable`导出新的二进制文件。