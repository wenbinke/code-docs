# JSON

## 序列化

```php
$data = [
    'id' => 1,
    'name' => 'iPhone'
];
echo json_encode($data);  // {"id":1,"name":"iPhone"} 
```

## 反序列化

```php
$result = json_decode('{"id":1,"name":"iPhone"}', true);
print_r($result);
```
