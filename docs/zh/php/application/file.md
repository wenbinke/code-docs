# 读写文件

```php
$path = '/tmp/test.txt';
file_put_contents($path, 'Hello');

$str = file_get_contents($path);
echo $str;
```
