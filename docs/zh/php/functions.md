# 函数

定义和使用

```php
function add($x, $y) 
{
    return $x + $y;
}

$sum = add(1, 2);
```

```php
function printHello()
{
    echo 'Hello';
}

printHello();
```

函数入口参数是可以约定类型的。可以设置参数默认值。

```php
function hello(array $arr, $isValid = false) 
{
    print_r($arr);
}
```