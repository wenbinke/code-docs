# 类与对象

## 定义

1. 实例的变量名如果以`__`开头，就变成了一个私有变量（private）。

2. `__init__` 是构造函数。

```python
class Student(object):

    def __init__(self, name, score):
        self.name = name
        self.score = score

    def print_score(self):
        print('%s: %s' % (self.name, self.score))

    def get_grade(self):
        if self.score >= 90:
            return 'A'
        elif self.score >= 60:
            return 'B'
        else:
            return 'C'

bart = Student('Bart Simpson', 59)
bart.name
bart.print_score()
print(bart.name, bart.get_grade())
```

## 继承

同名方法会被覆盖。`super().functionName` 可以直接调用父类方法。

```php
class Animal(object):
    def run(self):
        print('Animal is running...')

class Dog(Animal):
    def run(self):
        print('Dog is running...')

    def eat(self):
        print('Eating meat...')

class Cat(Animal):
    pass
```

