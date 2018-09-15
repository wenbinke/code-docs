# 时间

## 获取时间

```php
// Unix Timestamp
echo time();  // 1534935333

// 当前UTC时间
echo gmdate('Y-m-d\TH:i:s\Z'); // 2018-08-23T08:12:13Z
```

## 设置默认时区

::: warning 注意
运行环境应统一设置默认 **Timezone** 为 **UTC**，所有读写数据库的时间都应该是 **UTC时间** 或者 **Timestamp**。需要显示到界面的时间再根据指定的 **Timezone** 转换。
:::

```php
// date_default_timezone_set('UTC');
date_default_timezone_set('America/Los_Angeles');

echo date('c'); // 2018-08-22T03:57:57-07:00
```

## 常用时间计算

[DateTime](http://php.net/manual/zh/class.datetime.php)
 
```php
$now = new DateTime();
$now->setTimeZone(new DateTimeZone('America/Los_Angeles'));

echo $now->format('c'); // 2018-08-22T04:10:52-07:00

$today = (clone $now)->modify('today');
echo $today->format('c'); // 2018-08-22T00:00:00-07:00

$tomorrow = (clone $now)->modify('tomorrow');
echo $tomorrow->format('c'); // 2018-08-23T00:00:00-07:00

$theEndOfDay = (clone $tomorrow)->modify('1 second ago');
echo $theEndOfDay->format('c'); // 2018-08-22T23:59:59-07:00

// Local Time 转 UTC 时间
$theEndOfDay->setTimeZone(new DateTimeZone('UTC'));
echo $theEndOfDay->format('c'); // 2018-08-23T06:59:59+00:00
```