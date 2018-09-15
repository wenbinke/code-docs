# 更多类型

## String

```php
$txt1 = 'Hello world!'; 
$txt2 = 'What a nice day!';

// 用 . 连接字符串
echo $txt1 . ' ' . $txt2; 

// 类似 javascript 的 `${txt1} ${txt2}`
echo "$txt1 $txt2";

// 获取 hello 在 $txt1 的位置, 类似 javascript 的 txt1.indexOf('Hello')
echo strpos($txt1, 'Hello');

// 获取 unicode 字符串长度
echo mb_strlen('世界');
```

## Array

php 除了基本类型外可以做到其他类型都用数组表示。

```php
// 定义空数组
$arr = [];
$arr = [1, 2, 3];

$arr2 = [
    'id' => 1
];
$arr2['type'] = 'a type';
```

操作数组

```php
// 计算数组长度
count($arr);

// 往数组添加元素 'hello'。
$arr[] = 'hello';
```

遍历数组

```php
$ages = [
    'Peter' => 35,
    'Ben' => 37, 
    'Joe' => 43
];

foreach ($ages as $key => $value) {
    echo 'Key=' . $key . ', Value=' . $value;
    echo '<br>';
}

foreach ($ages as $value) {
    echo 'Value=' . $value;
    echo '<br>';
}
```