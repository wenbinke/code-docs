# 并发

## Goroutine

`goroutine` 是一种轻量的线程。用 `go` 关键字相当于让方法在另外一个线程异步执行。

```go
func say(s string) {
  for i := 0; i < 5; i++ {
    time.Sleep(100 * time.Millisecond)
    fmt.Println(s)
  }
}

func main() {
  go say("world")
  say("hello2")
}
```

## Channel

`channel` 用于存储异步线程计算的结果。可以认为是一个栈。

`ch := make(chan int)` 声明一个存储 `int` 值的 `channel`。

`ch <- value` 把 `value` 压栈到 `channel` 上面。

`value := <-ch` 把 `channel` 里面的值出栈到 `value` 上。

```go
package main

import "fmt"

func sum(s []int, ch chan int) {
  sum := 0
  for _, v := range s {
    sum += v
  }
  ch <- sum // send sum to ch
}

func main() {
  s := []int{7, 2, 8, -9, 4, 0}

  ch := make(chan int)
  go sum(s[:len(s)/2], ch)
  go sum(s[len(s)/2:], ch)
  x, y := <-ch, <-ch // receive from ch

  fmt.Println(x, y, x+y)
}
```

发送者可以调用 `close(ch)` 来关闭 `channel`。一般情况下是不需要主动关闭 `channel` 的。

接收者可以用 `for i := range ch` 来遍历 `channel`。这种情况下必须让发送者主动关闭 `channel`, `range` 循环才会结束, 否则会死锁。

```go
package main

import (
  "fmt"
)

func fibonacci(n int, ch chan int) {
  x, y := 0, 1
  for i := 0; i < n; i++ {
    ch <- x
    x, y = y, x+y
  }
  close(ch)
}

func main() {
  ch := make(chan int, 10)
  go fibonacci(cap(ch), ch)
  for i := range ch {
    fmt.Println(i)
  }
}
```

`select` 语句可以让任意一个 `channel` 能取到数据的时候执行相应的代码, 没有的话就执行 `default` 代码。

```go
package main

import (
  "fmt"
  "time"
)

func main() {
  tick := time.Tick(100 * time.Millisecond)
  boom := time.After(500 * time.Millisecond)

  for {
    select {
    case <-tick:
      fmt.Println("tick.")
    case <-boom:
      fmt.Println("BOOM!")
      return
    default:
      fmt.Println("    .")
      time.Sleep(50 * time.Millisecond)
    }
  }
}

```

## sync.Mutex

`sync.Mutex` 用于保证值在并发的情况下不会同时被多个线程修改。常见的场景就是做计数器。

```go
package main

import (
  "fmt"
  "sync"
  "time"
)

// SafeCounter is safe to use concurrently.
type SafeCounter struct {
  v   map[string]int
  mux sync.Mutex
}

// Inc increments the counter for the given key.
func (c *SafeCounter) Inc(key string) {
  c.mux.Lock()
  // Lock so only one goroutine at a time can access the map c.v.
  c.v[key]++
  c.mux.Unlock()
}

// Value returns the current value of the counter for the given key.
func (c *SafeCounter) Value(key string) int {
  c.mux.Lock()
  // Lock so only one goroutine at a time can access the map c.v.
  defer c.mux.Unlock()
  return c.v[key]
}

func main() {
  c := SafeCounter{v: make(map[string]int)}
  for i := 0; i < 1000; i++ {
    go c.Inc("somekey")
  }

  time.Sleep(time.Second)
  fmt.Println(c.Value("somekey"))
}
```