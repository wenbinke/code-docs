# 函数

## 函数定义

```py
def print_hello():
    print('hello')

# 空函数
def nop():
    pass
```

::: tip 提示
- `pass` 是一个占位符，空语句。可以用在 `if` 中。

```py
if age >= 18:
    pass
```

- 如果没有 `return` 语句，函数执行完毕后也会返回结果，只是结果为 `None`。`return None` 可以简写为 `return`。
:::

## 函数参数

```py
import math

def move(x, y, step, angle):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny

x, y = move(100, 100, 60, math.pi / 6) # 返回 x=151.96152422706632 y=70.0

r = move(100, 100, 60, math.pi / 6) # 返回 r=(151.96152422706632, 70.0) 
```

### 默认参数 

```py
def enroll(name, gender, age=6, city='Beijing'):
    print('name:', name)
    print('gender:', gender)
    print('age:', age)
    print('city:', city)

enroll('Bob', 'M', 7)
enroll('Adam', 'M', city='Tianjin')
```

::: danger 注意

默认参数必须指向不变对象！`def add_end(L=[]):` 是有问题，多次调用 `add_end()` L的初始值会是上一次调用修改后的值。

```py
# 正确写法
def add_end(L=None):
    if L is None:
        L = []
    L.append('END')
    return L
```
:::

### 可变参数

```py
def calc(*args):
    sum = 0
    for n in args:
        sum = sum + n * n
    return sum

calc(1, 2, 3)

nums = [1, 2, 3]
calc(*nums)
```

### 关键字参数

`kw` 实际上被转化成一个 `dictionary`。

```py
def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)

person('Adam', 45, gender='M', job='Engineer')

extra = {'city': 'Beijing', 'job': 'Engineer'}
person('Jack', 24, **extra)
```
