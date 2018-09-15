# 逻辑

## For

```py
names = ['Michael', 'Bob', 'Tracy']
for name in names:
    print(name)

for i, value in enumerate(names):
    print(i, value)

for ch in 'ABC':
    print(ch)

for x, y in [(1, 1), (2, 4), (3, 9)]:
    print(x, y)

L = []
for x in range(1, 11):
    L.append(x * x)

d = {'x': 'A', 'y': 'B', 'z': 'C' }
for k, v in d.items():
    print(k, '=', v)
```

::: tip 提示
通过collections模块的Iterable类型判断一个对象是可迭代对象。

```py
from collections import Iterable

isinstance('abc', Iterable) # str是否可迭代
isinstance([1,2,3], Iterable) # list是否可迭代
```
:::

### 列表生成式

```py
[x * x for x in range(1, 11)] # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

[x * x for x in range(1, 11) if x % 2 == 0] # [4, 16, 36, 64, 100]

[m + n for m in 'ABC' for n in 'XYZ'] # ['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']

[k + '=' + v for k, v in d.items()] # ['y=B', 'x=A', 'z=C']

L = ['Hello', 'World', 'IBM', 'Apple']
[s.lower() for s in L] # ['hello', 'world', 'ibm', 'apple']
```

### Generator

用列表生成式生成的list在数据量大的情况下可能白白浪费内存。用 `generator` 可以避免这个问题。 

```py
g = (x * x for x in range(10)) # 只需把 `[]` 换成 `()` 即可

next(g) # 获取一个值

for n in g:
    print(n)
```

## If

```py
age = 3
if age >= 18:
    print('adult')
elif age >= 6:
    print('teenager')
else:
    print('kid')
```

## While

```py
count = 0
while (count < 9):
   print('The count is: ', count)
   count = count + 1
```