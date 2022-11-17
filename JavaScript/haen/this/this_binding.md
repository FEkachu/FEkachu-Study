## 함수 호출 시 This

: 전역객체(global Objecg)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 브라우저 관점에서 봤을 때 `window` 객체를 의미한다. (Server관점-node.js 에서는 global 객체)

전역객체는 전역 스코프를 갖는 전역 변수를 프로퍼티로 소유하며, 글로벌 영역에서 선언한 함수는 전역객체의 프로퍼티로 접근 할 수 있는 전역변수의 메소드이다.

- 기본적으로 `this`는 전역객체에 바인딩 된다. 전역함수는 물론이고 내부함수의 경우 `this`는 외부함수가 아닌 전역객체에 바인딩된다

    ```jsx
    this === window //true
    ```

    - 내부함수 확인

        ```jsx
        function foo() {
            console.log("foo : ", this); //window
            function bar() {
                console.log("bar : ",this); //window
            }
            bar();
        }
        
        foo()
        ```

- 이 밖에도 내부함수는 일반함수, 메소드, 콜백함수 어디에서 선언되었든 관계없이 this는 전역 객체를 바인딩한다.
    - 메소드의 내부함수

        ```jsx
        var value = 1;
        
        var obj = {
          value: 100,
          foo: function() {
            console.log("foo's this: ",  this);  // obj
            console.log("foo's this.value: ",  this.value); // 100
            function bar() {
              console.log("bar's this: ",  this); // window
              console.log("bar's this.value: ", this.value); // 1
            }
            bar();
          }
        };
        
        obj.foo();
        ```

    - 콜백함수의 내부함수

        ```jsx
        var value = 1;
        
        var obj = {
          value: 100,
          foo: function() {
            setTimeout(function() {
              console.log("callback's this: ",  this);  // window
              console.log("callback's this.value: ",  this.value); // 1
            }, 100);
          }
        };
        
        obj.foo();
        ```

- 그렇다면 다른 객체로 바인딩 해주려면 어떻게 해야할까⁉️

  : 자바스크립트에서는 this를 명시적으로 바인딩 할 수 있는 apply, call, bind 메소드를 제공한다.


---

## 메소드 호출 시 this

: 메소드 호출이란⁉️

→ 함수가 객체의 프로퍼티 값일때 함수는 메소드로 호출된다. 이때, 메소드 내부의 `this`는 해당 메소드를 소유한 객체, 즉 해당 메소드를 호출한 객체에 바인딩 된다.

```jsx
var obj1 = {
    name: 'Lee',
    sayName: function() {
        console.log(this.name); // Lee
    }
}

var obj2 = {
    name: 'Kim'
}

obj2.sayName = obj1.sayName; // obj2에 sayName이 생김, 
// sayName안의 this는 obj2를 가리킴

obj1.sayName(); //Lee
obj2.sayName(); //Kim
```

- 프로토타입 객체도 메소드를 가질 수 있으며, 프로토타입 객체 메소드 내부에서 사용된 this도 일반 메소드 방식과 마찬가지로 해당 메소드를 호출한 객체에 바인딩 된다.

---

## 생성자 함수 호출 시 this

자바스크립트에서 생성자 함수는 객체를 생성하는 역할을 한다. 기존함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작한다. 일반함수에 new를 붙여 호출하면 생성자 함수도 동작할 수 도 있기에 생성자 함수명은 첫문자를 대문자로 하여 혼란을 방지한다.

```jsx
// 생성자 함수
function Person(name) {
  this.name = name;
}

var me = new Person('Lee');
console.log(me); // Person&nbsp;{name: "Lee"}

// new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수로 동작하지 않는다.
var you = Person('Kim');
console.log(you); // undefined
```

new 연산자와 함께 생성자 함수를 호출하면 다음과 같은 순서로 동작한다.

**1. 빈 객체 생성 및 this 바인딩**

생성자 함수의 코드가 실행되기 전 빈 객체가 생성된다. 이 빈 객체가 생성자 함수가 새로 생성하는 객체이다. 이후 **생성자 함수 내에서 사용되는 this는 이 빈 객체를 가리킨다.** 그리고 생성된 빈 객체는 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정한다

**2. this를 통한 프로퍼티 생성**

생성된 빈 객체에 this를 사용하여 동적으로 프로퍼티나 메소드를 생성할 수 있다. this는 새로 생성된 객체를 가리키므로 this를 통해 생성한 프로퍼티와 메소드는 새로 생성된 객체에 추가된다.

**3. 생성된 객체 반환**

- 반환문이 없는 경우, this에 바인딩된 새로 생성한 객체가 반환된다. 명시적으로 this를 반환하여도 결과는 같다.
- 반환문이 this가 아닌 다른 객체를 명시적으로 반환하는 경우, this가 아닌 해당 객체가 반환된다. 이때 this를 반환하지 않은 함수는 생성자 함수로서의 역할을 수행하지 못한다. 따라서 생성자 함수는 반환문을 명시적으로 사용하지 않는다.


- 객체 리터럴 방식 vs 생성자 함수 방식

    ```jsx
    // 객체 리터럴 방식
    var foo = {
      name: 'foo',
      gender: 'male'
    }
    
    console.dir(foo);
    
    // 생성자 함수 방식
    function Person(name, gender) {
      this.name = name;
      this.gender = gender;
    }
    
    var me  = new Person('Lee', 'male');
    console.dir(me);
    
    var you = new Person('Kim', 'female');
    console.dir(you);
    ```

  : 객체 리터럴 방식과 생성자 함수 방식의 차이는 [프로토타입 객체([[Prototype]])](https://poiemaweb.com/js-prototype#4-prototype-chain)에 있다.

    - 객체 리터럴 방식의 경우, 생성된 객체의 프로토타입 객체는 `Object.prototype`이다.
    - 생성자 함수 방식의 경우, 생성된 객체의 프로토타입 객체는 `Person.prototype`이다.

- 생성자 함수를 new 없이 호출

    ```jsx
    function Person(name) {
      // new없이 호출하는 경우, 전역객체에 name 프로퍼티를 추가
      this.name = name;
    };
    
    // 일반 함수로서 호출되었기 때문에 객체를 암묵적으로 생성하여 반환하지 않는다.
    // 일반 함수의 this는 전역객체를 가리킨다.
    var me = Person('Lee');
    
    console.log(me); // undefined
    console.log(window.name); // Lee
    ```

  : 생성자 함수를 new 없이 호출한 경우, 내부함수 this는 전역객체를 가리키므로 name은 전역변수(window)에 바인딩된다. 또한 new와 함께 생성자 함수를 호출하는 경우에 암묵적으로 반환하던 this도 반환하지 않으며, 반환문이 없으므로 undefined를 반환하게 된다.

  일반함수와 생성자 함수에 특별한 형식적 차이는 없기 때문에 일반적으로 생성자 함수명은 첫문자를 대문자로 기술하여 혼란을 방지하려는 노력을 한다. 그러나 이러한 규칙을 사용한다 하더라도 실수는 발생할 수 있다.

  이러한 위험성을 회피하기 위해 사용되는 패턴(Scope-Safe Constructor)은 다음과 같다. 이 패턴은 대부분의 라이브러리에서 광범위하게 사용된다.

  참고로 대부분의 빌트인 생성자(Object, Regex, Array 등)는 new 연산자와 함께 호출되었는지를 확인한 후 적절한 값을 반환한다.

  다시 말하지만 new 연산자와 함께 생성자 함수를 호출하는 경우, 생성자 함수 내부의 this는 생성자 함수에 의해 생성된 인스턴스를 가리킨다. 따라서 아래 A 함수가 new 연산자와 함께 생성자 함수로써 호출되면 A 함수 내부의 this는 A 생성자 함수에 의해 생성된 인스턴스를 가리킨다.

    ```jsx
    // Scope-Safe Constructor Pattern
    function A(arg) {
      // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈객체를 생성하고 this에 바인딩한다.
    
      /*
      this가 호출된 함수(arguments.callee, 본 예제의 경우 A)의 인스턴스가 아니면 new 연산자를 사용하지 않은 것이므로 이 경우 new와 함께 생성자 함수를 호출하여 인스턴스를 반환한다.
      arguments.callee는 호출된 함수의 이름을 나타낸다. 이 예제의 경우 A로 표기하여도 문제없이 동작하지만 특정함수의 이름과 의존성을 없애기 위해서 arguments.callee를 사용하는 것이 좋다.
      */
      if (!(this instanceof arguments.callee)) {
        return new arguments.callee(arg);
      }
    
      // 프로퍼티 생성과 값의 할당
      this.value = arg ? arg : 0;
    }
    
    var a = new A(100);
    var b = A(10);
    
    console.log(a.value);
    console.log(b.value);
    ```