# 时间

```go
package main
  
import "fmt"
import "time"

func main() {
  // Unix Timestamp
  fmt.Println(time.Now().Unix())  // 1535205410

  // 当前UTC时间
  fmt.Println(time.Now().UTC().Format(time.RFC3339))  // 2018-08-25T14:01:11Z
}
```
