# 函数

函数返回值可以是一个或者多个变量。

```go
func add(x int, y int) int {
	return x + y
}

// add 函数的简化版
func add2(x, y int) int {
	return x + y
}

func swap(x, y string) (string, string) {
	return y, x
}

a, b := swap("hello", "world")

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

// 对于不需要的返回值可以用 `_` 变量名来抛弃
c, _ := split(17)
```