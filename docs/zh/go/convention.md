# 约定

```go
package main
  
import "fmt"

func main() {
  /* 这是我的第一个GO程序 */
  fmt.Println("Hello, World!")  // 打印 Hello, World!
}
```

1. 注释符号采用 `/* */` 或 `//`。

2. `package main` 定义了包名，同个目录下的 `go` 文件包名一样。

3. `import "fmt"` 引入 `fmt` 包，类似 `nodejs` 的 `require('xxx')`。也可采用以下方式简化代码：

```go
import (
  "encoding/json"
  "fmt"
  "github.com/go-redis/redis"
  "math"
)
```

4. `func main()` 是程序入口函数。

5. `fmt.Println` 类似 `C#` 的 `Console.WriteLine`。

6. 方法名、变量名一般情况下采用 `Camel` 命名法，这点跟 `javascript` 类似。方法名、结构体、常量采用 `Pascal` 命名法表示可以被外部包引用。利用不同命名法来限制作用域。

7. go用 `nil` 关键字来表示 `null`。

8. 代码全部采用 `gofmt` 命令来格式化代码。不需要人工手动对齐代码。

```bash
find ~/go/src/github.com/codedocs/go-hello-world -name '*.go' | xargs gofmt -w
```

9. `go get` 命令用于安装第三方包。类似 `nodejs` 的 `npm install`。

```bash
go get golang.org/x/tour/gotour
```