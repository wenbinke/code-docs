# 更多类型

## String

高级用法请看 [https://golang.org/pkg/fmt/](https://golang.org/pkg/fmt/)

```go
// 类似 C# `string.Format("There are {0} reasons to code!", num)`
fmt.Sprintf("There are %v reasons to code!", num)
fmt.Sprintf("%d %d", 11, 22)
fmt.Sprintf("hello %s", "world")

// 类似 javascript 用 `` 包含字符串
str := `
hello

world
`
// 获取 unicode 字符串长度，需 import "unicode/utf8"
utf8.RuneCountInString("世界")
```

## Array

### 定义数组

注意空数组实际上等于 `nil`

```go
// 类似 javascript `let a = [0 0 0 0 0 0 0 0 0 0]`
var a [10]int

// 类似 javascript `let c = ['', '']`
var b [2]string

// 类似 javascript `let c = []`
var c []int

primes := [6]int{2, 3, 5, 7, 11, 13}

// s值为[3 5]。修改s, 数组primes的值也会相应改变。
var s []int = primes[1:3]

q := []int{2, 3, 5, 7, 11, 13}
r := []bool{true, false, true, true, false, true}
```

### 操作数组

```go
// 类似 javascript `arr.push(0)`
arr = append(arr, 0)
arr = append(arr, 2, 3, 4)

// 遍历数组
for i, v := range arr {
  fmt.Printf("2**%d = %d\n", i, v)
}

for i := range pow {
  pow[i] = 1 << uint(i) // == 2**i
}

for _, value := range pow {
  fmt.Printf("%d\n", value)
}
```

## Map

```go
// 类似 javascript `let m = {}`
m := make(map[string]string)

m["key"] = "hello world"

elem := m["key"]

delete(m, "key")
fmt.Println("The value:", m["Answer"])

// key不存在的时候，ok 为false
v, ok := m["Answer"]
```

## Struct

go 没有类只有结构体。

```go
type Vertex struct {
  X int
  Y int
}

// 初始化结构体
v := Vertex{1, 2}

// 也可以这样子初始化
y := Vertex{
  X: 1,
  Y: 2
}

v.X = 3
```

## Pointers

```go
v := Vertex{1, 2}
p := &v // p 是一个指向 v 地址的指针，p 的类型为 `*Vertex`

// go 在语言层面帮我们处理了，以下写法跟 `(*p).X = 1e9` 是一样的
p.X = 1e9 
```