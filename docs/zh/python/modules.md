# 模块

Python本身就内置了很多非常有用的模块，只要安装完毕，这些模块就可以立刻使用。

## 使用

```python
import sys
from datetime import datetime
```

## 安装第三方模块

```bash
pip install Pillow
```

## 依赖管理

生成requirements.txt文件

```bash
pip freeze > requirements.txt
```

安装requirements.txt依赖

```bash
pip install -r requirements.txt
```
