---
sidebar: auto
---

# MySQL

## 安装

```bash
brew install mysql
```

- 管理工具使用 [Sequel Pro](https://www.sequelpro.com)。

- 通过命令行连接数据库

```bash
mysql -h localhost -uroot -p123456
```

## 数据库与表

### 创建数据库

::: danger 注意
不论是通过SQL还是管理界面创建数据库，务必保证编码格式为 **utf8mb4**，否则数据库表字段如果包含了Unicode字符会乱码。
:::

```sql
CREATE DATABASE `sample_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE sample_db;
```

### 创建表

| 类型 | 使用场景 |
| --- | --- |
| <nobr>INT UNSIGNED</nobr> | `id` 统一采用 `INT UNSIGNED` 类型，`INT UNSIGNED` 最大值约43亿。|
| <nobr>TINYINT UNSIGNED</nobr> | `TINYINT UNSIGNED` 最大值为255，用于存整型枚举。|
| <nobr>TIMESTAMP</nobr> | 大部分情况下使用 `TIMESTAMP` 作为时间字段类型。虽然 `TIMESTAMP` 有 [2038年问题](https://zh.wikipedia.org/wiki/2038%E5%B9%B4%E9%97%AE%E9%A2%98)，但是技术更新非常快，MySQL在十年之后是否会被淘汰仍然是个未知数，所以不必担心过多。 |
| <nobr>DATE</nobr> | 存储一个固定的日期比如生日 |
| POINT | 值格式: `POINT(<longitude>, <latitude>)` |
| BIT | BOOL型统一用这个。MySQL中关于BOOL字段类型表示十分混乱，这些估计都是早期遗留下来的问题。 |

::: warning 注意
`TINYINT(N)` 和 `INT(N)` 实际上并不是限制这个字段存储最大值。这个需要跟 `ZEROFILL` 配合使用。比如 `INT(4) ZEROFILL` 类型，值为5显示的时候会填充3个0为 `0005`。
:::

[ZEROFILL相关文档](https://dev.mysql.com/doc/refman/5.5/en/numeric-type-attributes.html)

```sql
CREATE TABLE IF NOT EXISTS users
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(250) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  avatar_url VARCHAR(250) DEFAULT '' NULL,
  sex TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '性别 0=not known | 1=male | 2=female | 9=not applicable',
  points INT DEFAULT 10000 NOT NULL,
  location POINT NULL COMMENT '用户地理位置',
  deleted_at TIMESTAMP NULL,
  is_admin BIT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uix_email (email)
) COMMENT '用户表';
```

### 命名规范

1. 所有的名字统一使用 `snake_case` 命名法。表名为复数。

2. 使用全名，例如使用 `article_id` 而不是 `aid`，在不影响可读性的前提下，命名尽可能简短。

3. 索引名称以 `ix_{字段1}_{字段2}` 的形式命名。普通索引加 `ix_` 前缀，唯一索引加 `uix_` 前缀。

4. bool类型字段统一加 `is_` 或 `has_` 前缀。如 `is_enabled`、`is_activated`。

5. 时间戳使用 `xxx_at` 的形式命名，例如 `created_at`、`updated_at`。

6. 操作人字段使用 `xxx_by_id` 的形式命名，例如 `created_by_id`、`updated_by_id`。

7. 状态字段使用 `status` 或 `xxx_status`，不使用 `state`。

8. 排序字段使用 `display_order`。

### 常用命令

```sql
DROP TABLE users; -- 删除表

ALTER TABLE users
  ADD COLUMN nickname VARCHAR(50) NOT NULL COMMENT '昵称' AFTER last_name; -- 添加字段

ALTER TABLE users
  MODIFY COLUMN last_name VARCHAR(75) NOT NULL; -- 修改字段

ALTER TABLE users DROP COLUMN nickname; -- 删除字段

ALTER TABLE products ADD KEY `ix_shop_id` (`shop_id`); -- 添加索引

ALTER TABLE members ADD UNIQUE KEY `uix_phone` (`phone`); -- 添加索引

ALTER TABLE products DROP KEY `ix_shop_id`; -- 删除索引
```

## 枚举

- 表数据量很大的项目统一用整型存储，省存储空间，查询更快。数据量不大的项目可使用字符串存储，可读性更高，代码更好维护。

```sql
sex VARCHAR(20) NOT NULL DEFAULT 'unknown' COMMENT '性别 unknown | male | female | unapplicable'
```

- 有些整型枚举是有通用的标准，建议设计字段的时候多查查资料。[性别标准](https://en.wikipedia.org/wiki/ISO/IEC_5218)

```
The four codes specified in ISO/IEC 5218 are:

0 = not known,
1 = male,
2 = female,
9 = not applicable.
```

## 索引

- 对于数据量非常大的表，索引通常可以大幅度缩小查询范围，数据量不大的表没必要建索引。

- 联合索引创建需要知道 `最左前缀匹配原则`。比如有一张表 `products(id, name, shop_id, category_id)`，如果查询语句是 `SELECT * FROM products WHERE shop_id=? AND category_id=?`，只需要添加 `ix_shop_id_category_id` 索引，这时候MySQL会按照 `最左前缀匹配原则` 通过 `shop_id` 过滤掉大部分数据，然后通过 `category_id` 再过滤一部分数据。

- 查询语句里面的查询条件先后顺序不影响查询性能。

::: warning 注意
- 即使是查询 `SELECT * FROM products WHERE shop_id=?` 也不需要再单独创建 `shop_id` 索引了，因为 `ix_shop_id_category_id` 已经包含了 `shop_id` 索引。

- `SELECT * FROM products WHERE category_id=?` 因为语句没有 `shop_id`，所以按照 `最左前缀匹配原则` 是用不到任何索引的。
:::

```sql
ALTER TABLE products ADD KEY `ix_shop_id_category_id` (`shop_id`, `category_id`); -- 添加联合索引
```

- `EXPLAIN` 可以清晰的评估加索引之后查询影响的行数。

```sql
EXPLAIN SELECT * FROM products WHERE shop_id=? AND category_id=?;
```

## 地理位置

- 存储位置信息统一使用 `POINT` 字段类型。

```sql
-- 更新用户地理位置
UPDATE `users` SET `location`=POINT(119.2604007, 38.0396771) where id=?
```

- 常见的场景是根据当前用户地理位置找出附近的店铺，按最近距离排序。`ST_Distance_Sphere` 用于计算两个位置之间的距离，单位为米。

```sql
SELECT `id`, `name`, ST_Distance_Sphere(`location`, ST_GeomFromText('POINT(119.2604007, 38.0396771)')) AS `distance`
FROM `stores` 
ORDER BY `distance` DESC
LIMIT 100;
```

## JSON

- 简单查询

```sql
-- points_config: {"award_points": 10, "punish_points": 30}
SELECT * FROM `books` WHERE `points_config`->'$.award_points' > 5;
```

- 构建JSON对象

大数据项目 `JOIN` 语句基本是用不上了，不过对于小型项目还是实用的。

```sql
SELECT p.id, JSON_OBJECT('id', s.id, 'name', s.name) AS store 
FROM prices p
LEFT JOIN stores s ON p.store_id=s.id
LIMIT 10;

-- 返回数据
-- 49640 | {"id": 8, "name": "Walmart"}
-- 49672 | {"id": 12, "name": "Safeway"}
```

## 金额

金额由于涉及到小数，为了避免业务计算可能产生的误差，通常有两种存储设计，使用 `INT` 类型或者使用 `DECIMAL` 类型。

1. **推荐：** 使用 `INT` 类型实际上就是存的金额单位是分，界面显示的时候再除于100。这种 `INT` 类型代码实际上比较好写，跟其他组件（比如 elasticsearch）数据类型也好转换。

2. `DECIMAL` 数据库实际上是按照字符串存储的，不存在精度损失。`DECIMAL(5, 2)` 意思是说这是一个5位数（含小数位）带2位小数，最大值应该是 `999.99`。

## 时间

### 查询时区

```sql
SELECT @@system_time_zone, @@global.time_zone, @@session.time_zone;
```

- `CURRENT_TIMESTAMP` 和 `now()` 是一样的。[Date and Time Functions](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html)

```sql
SELECT DATE_SUB(now(), INTERVAL 1 DAY); -- 昨天开始
SELECT DATE_SUB(now(), INTERVAL 1 WEEK); -- 上星期开始
SELECT DATE_SUB(now(), INTERVAL 1 MONTH); -- 上个月开始
SELECT DATE_SUB(now(), INTERVAL 1 YEAR); -- 去年开始
```

### 带时间查询

```sql
WHERE created_at > now() -- 按now()做查询

WHERE created_at > '2018-07-11T06:45:43Z' -- 按'2018-07-11T06:45:43Z'做查询
```

## 性能调试

适用于本地开发数据库。

```sql
SET GLOBAL log_output='TABLE';
SET GLOBAL general_log='ON';

TRUNCATE TABLE mysql.general_log;

SELECT * FROM mysql.general_log; -- 之后所有的查询语句都会记录在这张log表里面
```

## 分表分库

TODO