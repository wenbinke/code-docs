# JSON

## 序列化

```go
package main
  
import "fmt"
import "encoding/json"

type dataModel struct {
    ID   int      `json:"id"`
    Name string   `json:"name"`
}

func main() {
    data := dataModel{
        ID: 1,
        Name: "iPhone",
    }

    result, _ := json.Marshal(data)
    fmt.Println(string(result))
}
```

## 反序列化

```go
package main
  
import "fmt"
import "encoding/json"

type dataModel struct {
    ID   int      `json:"id"`
    Name string   `json:"name"`
}

func main() {
    str := `{"id":1,"name":"iPhone"}`
    res := dataModel{}
    json.Unmarshal([]byte(str), &res)
    fmt.Println(res)
}
```