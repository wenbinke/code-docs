# 变量

## 基本类型

- int (整数)，如 1。

- bool (布尔)，如 `True`，`False`。

- float (浮点数)，如 1.23、3E-2。

- complex (复数)，如 1 + 2j、 1.1 + 2.2j。

## 更多类型

### String

用 `'` 或 `"`。内容需要换行使用 `'''` 或者 `"""` 包住内容。

string类型格式化方式为string模板和参数之间用 `%` 隔开。

```py
print('%2d-%02d' % (3, 1))

print('%s %s' % ('hello', 'world'))

# 类似 javascript 用 `` 包含字符串
str = '''
hello

world
'''
```

### List

#### 定义数组

```py
classmates = ['Michael', 'Bob', 'Tracy']

len(classmates)
```

#### 操作数组

```py
list = [ 'Michael', 786, 2.23, 'Bob', 70.2 ]
tinylist = [123, 'Bob']

print(list) # 输出完整列表
print(list[0]) # 输出列表第一个元素
print(list[1:3]) # 输出第二个至第三个元素 
print(list[2:]) # 输出从第三个开始至列表末尾的所有元素
print(list[-2:]) # 输出最后两个元素
print(tinylist * 2) # 输出列表两次
print(list + tinylist) # 打印组合的列表

list.append('Adam') # 添加元素
list.insert(1, 'Jack') # 插到指定位置，参数是index
list.pop() # 删除list末尾的元素
list.pop(1) # 删除指定位置的元素，参数是index

list(range(1, 11)) # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### Tuple

tuple和list非常类似，但是tuple一旦初始化就不能修改。其他使用均相同。

```py
classmates = ('Michael', 'Bob', 'Tracy')
print(classmates[0]) # 输出元组第一个元素

classmates = () # 空元组
classmates = ('Michael',) # 只有一个元素的时候必须加 `,`
```

### Dictionary

```py
dict = {}
dict['one'] = "This is one"
dict[2] = "This is two"
 
tinydict = {'name': 'john', 'code': 6734, 'dept': 'sales'}
 
print dict['one'] # 输出键为'one' 的值
print dict[2] # 输出键为 2 的值
print tinydict # 输出完整的字典
print tinydict.keys() # 输出所有键
print tinydict.values() # 输出所有值
```

## 声明

变量无需声明, 直接可以赋值。

## 转换

```py
int('123')
int(12.34)

float('12.34')

str(1.23)
str(100)

# 注意 bool('0') 返回 True，bool(0) 返回 False
bool(1)
bool('')
```