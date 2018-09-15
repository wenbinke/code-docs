# 变量

## 类型

```go
bool string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32, represents a Unicode code point

float32 float64

complex64 complex128
```
## 声明

变量声明采用 `var` 或者 `:=` 方式。

`var` 声明的基本变量自带默认值。数字变量默认值为 `0`, `string` 默认值为 `""`, `bool` 默认值为 `false`。

```go
var i int
var f float64
var s string
var csharp, python, java bool

var x, y int = 1, 2
var a, b, c = true, false, "no!"

k := 3
t1, t2, t3 := true, false, "no!"

var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(-5 + 12i)
)

// 常量声明
const Pi = 3.14
const World = "世界"
const Truth = true

const (
	Big = 1 << 100
	Small = Big >> 99
)
```

## 转换

`string` 类型转换需 `import "strconv"`。

```go
i := 42
f := float64(i)
u := uint(f)

str := strconv.Itoa(i)
intVal := strconv.Atoi(str)
```