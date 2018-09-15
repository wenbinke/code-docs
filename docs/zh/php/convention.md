# 约定

```php
<?php
echo 'hello world!';
```

1. 注释符号采用 `/* */` 或者 `//`。

2. 输出内容基本靠 `echo`。打印变量可以用 `print_r`。`var_dump` 函数返回变量的数据类型和值。

3. 方法名变量名一般情况下采用 `Camel` 命名法，类名命和名空间名采用 `Pascal` 命名法，常量名全大写。规则跟 `javascript` 一样。

4. php 字符串连接符用 `.` 而不是 `+`。

5. php 跟 javascript 一样有 `===` 和 `!==` 用于判断是否绝对相等，这两个只要类型不一样就不会相等。`==` 和 `!=` 会先做类型转换。

6. 缩进用4个空格，一般情况用单引号，字符串里面带变量用双引号。

7. php 代码都是同步执行的，没有异步。

8. `??` 运算符

```php
$username = $_GET['user'] ?? 'nobody';

// 等价于
$username = isset($_GET['user']) ? $_GET['user'] : 'nobody';
```

9. `?:` 运算符

::: warning 注意
如果变量不存在会抛一个 "PHP Notice:  Undefined variable" 错误。
:::

```php
$username = $hello ?: 'nobody';

// 等价于
$username = $hello ? $hello : 'nobody';
```