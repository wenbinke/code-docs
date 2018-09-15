# 数据库

## 初始化

```php
$mysqli = new mysqli('127.0.0.1', 'root', '123456', 'test_db');
$mysqli->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, true);

// 操作数据库代码...

$mysqli->close();
```

## 增删改查

### 插入数据

```php
$mysqli->query("INSERT INTO users (name) VALUES('hello')");

var_dump($mysqli->insert_id);
```

### 删除数据

```php
$mysqli->query('DELETE FROM users WHERE id=3');

var_dump($mysqli->affected_rows);
```

### 更新数据

```php
$mysqli->query("UPDATE users SET name='hello'");

var_dump($mysqli->affected_rows);
```

### 获取单个

```php
$result = $mysqli->query('SELECT * FROM users LIMIT 1');
$row = $result->fetch_assoc();
$result->close();

var_dump($row);
```

### 获取多个

```php
$result = $mysqli->query('SELECT * FROM users');

$list = [];
while ($row = $result->fetch_assoc()) { 
    $list[] = $row;
}
$result->close();

var_dump($list);
```

## 错误排查

```php
if ($mysqli->connect_errno) {
    printf('Connect failed: %s\n', $mysqli->connect_error);
    exit();
}

if (!$mysqli->query('SET a=1')) {
    printf('Errormessage: %s\n', $mysqli->error);
}
```

## 高级用法

如果需要绑定参数, 防止SQL注入的使用 `prepare` -> `bind_param` -> `execute`。方法相对复杂难用。

[https://secure.php.net/manual/en/mysqli-stmt.execute.php](https://secure.php.net/manual/en/mysqli-stmt.execute.php)