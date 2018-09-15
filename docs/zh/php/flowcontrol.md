# 逻辑

## For

```php
$sum = 0;
for ($i = 0; $i < 10; $i++) {
  $sum += $i;
}
```

## If

```php
if ($x < 0) {
  return true;
}

if ($error) {
  echo $error;
} else {
  return true;
}
```

## Switch

```php
switch ($os) {
  case 'darwin':
    echo 'OS X.';
    break;
  case 'linux':
    echo 'Linux.';
    break;
  default:
    echo $os;
}
```

## While

```php
$i = 1;
while ($i <= 5) {
    echo 'The number is ' . $i . '<br>';
    $i++;
}

// do ... while
$i=1;
do {
    $i++;
    echo 'The number is ' . $i . '<br>';
}
while ($i <= 5);
```

## try, catch

```php
try {
    // try body
} catch (FirstExceptionType $e) {
    // catch body
} catch (Throwable $e) {
    // catch body
}
```
