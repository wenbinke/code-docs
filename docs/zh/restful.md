---
sidebar: auto
---

# API RESTful

此篇列出常用的API设计。

API URL中间加个 `api` 以免将来此域名要划分出其他子目录。通常API功能是不停迭代上去的，涉及到数据库结构的考虑维护成本的情况下极少同时存在两个版本的api，所以并不建议在URL上加类似 `v1` 的版本号。

## GET

`GET` 用于获取数据。

**Request**

```bash
# 创建数据示例
curl --request GET \
  --url http://api.adoc.ink/api/items?q=:q&page_index=0&page_size=20 \
  --header 'content-type: application/json' \
  --header 'authorization: Bearer <token>'
```

**Response**

> Response status 200 OK

```js
{
    "count": 1,
    "items": [{ 
        "id": 1,
        "name": "Sample 1",
        "category": "Foo"
    }]
}
```

**Request**

```bash
# 创建数据示例
curl --request GET \
  --url http://api.adoc.ink/api/items/:id \
  --header 'content-type: application/json' \
  --header 'authorization: Bearer <token>'
```

**Response**

> Response status 200 OK

```js
{ 
    "id": 1,
    "name": "Sample 1",
	"category": "Foo"
}
```

> 找不到资源约定返回400错误

## POST

`POST` 用于创建数据或者执行某个动作。

**Request**

```bash
# 创建数据示例
curl --request POST \
  --url http://api.adoc.ink/api/items \
  --header 'content-type: application/json' \
  --header 'authorization: Bearer <token>' \
  --data '{
	"name": "Sample 1",
	"category": "Foo"
}'
```

**Response**

> Response status 201 Created 

```js
{ 
    "id": 1
}
```

## PATCH

`PATCH` 可更新数据部分字段。

**Request**

```bash
# 更新数据示例
curl --request PATCH \
  --url http://api.adoc.ink/api/items/:id \
  --header 'content-type: application/json' \
  --header 'authorization: Bearer <token>' \
  --data '{
	"name": "Sample 2",
}'
```

**Response**

> Response status 204 No Content

## PUT

`PUT` 用于更新单个数据的所有字段数据。

**Request**

```bash
# 更新数据示例
curl --request PUT \
  --url http://api.adoc.ink/api/items/:id \
  --header 'content-type: application/json' \
  --header 'authorization: Bearer <token>' \
  --data '{
	"name": "Sample 2",
	"category": "Bar",
}'
```

**Response**

> Response status 204 No Content

## DELETE

`DELETE` 用于删除数据。

**Request**

```bash
# 更新数据示例
curl --request DELETE \
  --url http://api.adoc.ink/api/items/:id \
  --header 'content-type: application/json' \
  --header 'authorization: Bearer <token>'
```

**Response**

> Response status 204 No Content

## Error

**出错Response格式**

一般来说简单的api有 `code` 和 `message` 就可以了。

```js
{
  "error": {
    "code": "BadArgument",
    "message": "Multiple errors in ContactInfo data",
    "details": [
      {
        "code": "NullValue",
        "target": "PhoneNumber",
        "message": "Phone number must not be null"
      },
      {
        "code": "NullValue",
        "target": "LastName",
        "message": "Last name must not be null"
      },
    ]
  }
}
```

**未登录**

> Response status 401 Unauthorized

**禁止访问**

> Response status 403 Forbidden

**其他**

> Response status 400
