# 逻辑

## For

```go
for i := 0; i < 10; i++ {
  sum += i
}

for ; sum < 1000; {
  sum += sum
}

// 类似其他语言的 while (sum < 1000)
for sum < 1000 {
  sum += sum
}

// 类似其他语言的 while (true)
for {
}

// 遍历Array或者Map
for k, v := range kvs {
}
```

## If

```go
if x < 0 {
  return sqrt(-x) + "i"
}

// 可以创建临时变量 v
if v := math.Pow(x, n); v < lim {
  return v
}

if err != nil {
  fmt.Printf("error: %s", err)
} else {
  return v
}
```

## Switch

无需像其他语言一样每个 `case` 下面都加break，语言层面自动支持。

```go
switch os := runtime.GOOS; os {
case "darwin":
  fmt.Println("OS X.")
case "linux":
  fmt.Println("Linux.")
default:
  fmt.Printf("%s.", os)
}

switch time.Saturday {
case today + 0:
  fmt.Println("Today.")
case today + 1:
  fmt.Println("Tomorrow.")
case today + 2:
  fmt.Println("In two days.")
default:
  fmt.Println("Too far away.")
}

switch {
case t.Hour() < 12:
  fmt.Println("Good morning!")
case t.Hour() < 17:
  fmt.Println("Good afternoon.")
default:
  fmt.Println("Good evening.")
}
```

## Defer

`defer` 语句在函数结束前自动调用，可以用于释放资源，比如数据库连接。

```go
package main

import "fmt"

func main() {
	defer fmt.Println("world")

	fmt.Println("hello")
}
```