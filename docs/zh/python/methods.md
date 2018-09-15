# 方法

## 方法

- go 没有类, `struct` 可以当作类来组织代码给他添加方法。

```go
type Vertex struct {
  X, Y float64
}

func (v Vertex) Abs() float64 {
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

// 注意只有把方法加到指针上面才能修改 v 的字段值
func (v *Vertex) Scale(f float64) {
  v.X = v.X * f
  v.Y = v.Y * f
}

v := Vertex{3, 4}
fmt.Println(v.Abs())
```

- 非 `struct` 也是可以添加方法的

```go
type MyFloat float64

func (f MyFloat) Abs() float64 {
  if f < 0 {
    return float64(-f)
  }
  return float64(f)
}

f := MyFloat(-math.Sqrt2)
fmt.Println(f.Abs())
```

- 方法要修改传入的结构体的字段值, 必须传指针才行。

如果你需要修改 `v` 的字段, 那么就用 `*Vertex` 当作入口参数类型, 否则就是 `Vertex`。

```go
func ScaleFunc(v *Vertex, f float64) {
  v.X = v.X * f
  v.Y = v.Y * f
}

v := Vertex{3, 4}
ScaleFunc(&v, 10)
fmt.Println(v)
```

## 接口

- 结构体并不需要显示的实现接口, 接口只管声明就是了。

```go
type I interface {
  M()
}

type T struct {
  S string
}

func (t T) M() {
  fmt.Println(t.S)
}

var i I = T{"hello"}
i.M()

// 接口主要用于方法参数类型声明使用。跟 C# 类似。
func describe(i I) {
  fmt.Printf("(%v, %T)\n", i, i)
}
```

- `interface{}` 表示任意类型, 跟 `TypeScript` 里面的 `any` 类型效果一样。

```go
var i interface{}
var j interface{} = "hello"
```

- Stringer

实现 `Stringer` 的方法 `String` 可以在调用 `fmt.Println` 的时候打印想要的格式。类似 C# 的 `ToString` 方法。 

```go
type Stringer interface {
    String() string
}
```

- Error

```go
type error interface {
    Error() string
}
```