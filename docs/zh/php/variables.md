# 变量

## 类型

```php
bool string int float array
```

## 声明

变量无需声明，直接可以赋值。

```php
$x = 123;
$y = 10.2;

$str = 'Hello';

$b = true;
$b = false;

$z = null;

// 常量定义之后就可以全局使用 GREETING 了。
define('GREETING', 'Welcome');

echo GREETING;
```

## 转换

```php
$i = '42';
$f = intVal($i); // 转换成 int 类型
$u = floatVal($i); // 转换成 float 类型
```