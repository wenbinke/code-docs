# 类与对象

## 定义

1. `private`，`protected`，`public` 用于定义字段和方法的可访问权限。没有指定的话默认是 `public`。

2. `__construct` 是构造函数。类似 javascript 的 `constructor`。

```php
class SimpleClass 
{
    private $var2 = 'private value';
    public $var = 'a default value';

    public function __construct($var4) 
    {
        $this->var2 = $var4;
    }
  
    public function displayVar() 
    {
        echo $this->var2;
    }
}

$simple = new SimpleClass();

$simple->displayVar();  
echo $simple->var;
```

静态方法

```php
class SimpleClass 
{
    public static function printHello() 
    {
        echo 'Hello';
    }
}

SimpleClass::printHello();
```

静态属性与常量

```php
class SimpleClass 
{
    public static $myStatic = 'foo';
    const CONST_VALUE = 'A constant value';

    public function staticValue() 
    {
        return self::$myStatic;
    }
}

echo SimpleClass::$myStatic;
echo SimpleClass::CONST_VALUE;
```

final

```php
final class SimpleClass 
{
    public function staticValue() 
    {
        return self::$myStatic;
    }
}

class SimpleClass2
{
    final public function staticValue() 
    {
        return self::$myStatic;
    }
}
```

## 继承

同名方法会被覆盖。`parent::functionName` 可以直接调用父类方法。

```php
class Bar extends Foo 
{
    public function __construct($var4) 
    {
        parent::__construct($var4);
    }
}
```

如果子类中定义了构造函数则不会隐式调用其父类的构造函数，需要主动调用父类的构造函数。

```php
class Foo 
{
    public function printItem($string) 
    {
        echo 'Foo: ' . $string;
    }
    
    public function printPHP() 
    {
        echo 'PHP is great.';
    }
}

class Bar extends Foo 
{
    public function printItem($string)
    {
        parent::printItem($string);
        echo 'Bar: ' . $string;
    }
}
```

## 抽象类

某个抽象方法被声明为 `protected`，那么子类中实现的方法应声明为 `protected` 或 `public`，不能定义为 `private`。

```php
abstract class AbstractClass 
{
    abstract protected function getValue();
    abstract protected function prefixValue($prefix);

    public function printOut() 
    {
        echo $this->getValue();
    }
}

class ConcreteClass1 extends AbstractClass 
{
    protected function getValue() 
    {
        return 'ConcreteClass1';
    }

    public function prefixValue($prefix) 
    {
        return "{$prefix}ConcreteClass1";
    }
}
```

## 接口

```php
interface ITemplate 
{
    public function setVariable($name, $var);
}

class Template implements ITemplate 
{
    public function setVariable($name, $var) 
    {
        echo 'Hello';
    }
}

// 接口可以继承接口
interface b extends ITemplate 
{
    public function baz($baz);
}
```

```php
class ClassName extends ParentClass implements ArrayAccess, Countable
{
    // constants, properties, methods
}
```

## 命名空间

### 定义

```php
<?php
namespace Foo\Bar;

class Foo 
{
    public static function staticmethod() 
    {
        
    }
}
```

### 使用

```php
use Foo\Bar\Foo;

Foo::staticmethod();
```