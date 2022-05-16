# 📍 스코프(Scope)

## 1. 스코프란?

모든 식별자는 자신이 선언된 위치에 의해 **다른 코드가 식별자 자신을 참조할 수 있는 유효 범위**가 결정되는데 이러한 범위를 **스코프(scope)** 라고 한다. 즉, 스코프는 **변수에 접근할 수 있는 범위**이다.

한 스코프 내에서는 식별자가 유일해야 하지만, 다른 스코프에서는 동명의 식별자를 사용할 수 있다. (네임스페이스)

식별자 결정(identifier resolution) :
자바스크립트 엔진은 스코프를 통해 어떤 변수를 참조할 것인지 결정한다.

```JS
var x = 'global'

function foo () {
    var x = 'function scope';
    console.log(x);
}

foo();
console.log(x);
```

위 코드에서 전역에 선언된 변수 x는 어디에서든 참조할 수 있다. 하지만 함수 foo 내에서 선언된 변수 x는 함수 foo 내부에서만 참조 가능하다. 이러한 규칙을 **스코프**라고 한다.

## 2. 자바스크립트의 스코프

대부분의 C-family language는 **블록 레벨 스코프**를 따른다.

- 블록 레벨 스코프  
  `if, for, while, try/catch` 등 코드 블록({...})이 지역 스코프를 생성

🍎 하지만 자바스크립트는 **함수 레벨 스코프**를 따른다.

- 함수 레벨 스코프  
  함수가 지역 스코프를 생성

  ```js
  var x = 0;
  {
    var x = 1;
    console.log(x); //1
  }
  console.log(x); //1
  ```

💡 ECMAScript6에서 도입된 `let`과 `const` 키워드를 사용하면 자바스립트에서도 블록 레벨 스코프 사용 가능.  
함수 레벨 스코프만 지원하는 `var` 대신, `let`과 `const`을 사용하는 것을 권장함

```js
let y = 0;
{
  let y = 1;
  console.log(y); //1
}
console.log(y); //0
```

```js
const y = 0;
{
  const y = 1;
  console.log(y); //1
}
console.log(y); //0
```

## 3. 전역 스코프(Global scope)

`var` 키워드로 선언한 전역 변수는 전역 객체 `window` 의 프로퍼티이다.

자바스크립트는 타 언어와 달리 특별한 시작점이 없어서 전역 변수나 함수를 선언하기 쉬우며 전역 변수를 남발하게 하는 문제를 야기시킨다.

하지만 전역 변수로 인해 의도치 않은 재할당이 발생하거나 동일한 이름으로 인해 예상치 못한 결과를 가져올 수 있으므로 **전역 변수의 사용을 억제해야 한다.**

## 4. 비 블록 레벨 스코프

```js
if (true) {
  var x = 5; //x는 전역변수
}
console.log(x);
```

자바스크립트는 블록 레벨 스코프를 사용하지 않으므로 **함수 밖에서 선언된 변수는 코드 블록 내에서 선언되었다해도 모두 전역 스코프**를 갖게 된다.

## 5. 함수 레벨 스코프

- 함수 내에서 선언된 매개변수와 변수는 함수 외부에서는 유효하지 않다.

  ```js
  var a = 10; //전역

  (function () {
    var b = 20; //지역
  })();

  console.log(a); //10
  console.log(b); //not defined
  ```

- 변수명이 중복된 경우, 지역변수를 우선하여 참조한다.

  ```js
  var x = "global";

  function foo() {
    var x = "local";
    console.log(x);
  }

  foo(); // local
  console.log(x); //global
  ```

- 함수 내에 존재하는 내부 함수

  ```js
  var x = "global";

  function foo() {
    var x = "local";
    console.log(x); //local

    function bar() {
      console.log(x);
    }

    bar(); // local
  }
  foo();
  console.log(x); //global
  ```

  함수 bar에서 참조하는 변수 x는 함수 foo에서 선언된 지역변수이다.

- 함수 영역에서 전역변수 참조 가능하므로 값 변경 가능, 내부 함수의 경우 전역변수는 물론 상위 함수에서 선언한 변수 접근/변경 가능

  ```js
  var x = 10;

  function foo() {
    x = 100;
    console.log(x);
  }
  foo(); //100
  console.log(x); //100
  ```

- 중첩 스코프는 가장 인접한 지역 우선 참조

  ```js
  var x = 10;

  function foo() {
    var x = 100;
    console.log(x); //100

    function bar() {
      x = 1000;
      console.log(x); //1000
    }

    bar();
  }
  foo();
  console.log(x); //10
  ```

  ```js
  var foo = function () {
    var a = 3,
      b = 5;

    var bar = function () {
      var b = 7,
        c = 11;

      // a는 3, b는 7, c는 11

      a += b + c;

      // a는 21, b는 7, c는 11
    };

    // a는 3, b는 5, c는 not defined

    bar();

    // a는 21, b는 5, c는 not defined
  };
  ```

## 6. 스코프 체인(scope chain)

자바스크립트의 모든 코드는 **스코프 체인**을 갖고 있다. 스코프 체인은 해당 코드의 유효 범위(scope)안에 있는 변수를 정의하는 객체의 리스트이다.

내부 함수에서는 외부 함수의 변수에 접근 가능하지만 외부 함수에서는 내부 함수의 변수에 접근할 수 없다. 또한 모든 함수들은 전역 객체에 접근할 수 있다.

```js
var x = "global";
function outer() {
  console.log(x);
  function inner() {
    var y = "local";
    console.log(x);
  }
  inner();
}
outer();
console.log(y);
```

위 코드에서 inner 함수는 변수 x를 먼저 자신의 inner 스코프에서 찾고, 없으면 한 단계 올라가 outer 스코프에서 찾고, 없으면 또 한 단계 올라가 전역 스코프에서 찾는다. 끝까지 찾지 못하면 참조 에러가 발생한다.

이렇게 한 단계씩 범위를 넓히면서 변수를 찾는 관계를 **스코프 체인**이라고 한다.

- 함수가 _정의_ 될 때 함수는 스코프 체인을 저장하며,
- 함수가 _호출_ 될 때 함수는 지역 변수를 보관하는 새로운 객체를 만들어 기존에 만들어둔 스코프 체인에 추가한다.

## 7. 렉시컬 스코프

자바스크립트를 비롯한 대부분의 언어는 **렉시컬 스코프**를 따르므로 **함수를 호출할 때가 아닌 함수를 선언한 시점에 상위 스코프가 결정된다.**

- 렉시컬 스코프  
  함수를 **어디에 선언하였는지**에 따라 상위 스코프를 결정한다.

- 동적 스코프  
  함수를 **어디서 호출하였는지**에 따라 상위 스코프를 결정한다.

함수의 상위 스코프는 함수 정의가 실행될 때 정적으로 결정되며, 함수 정의가 실행되어 생성된 함수 객체는 상위 스코프를 기억한다.  
➡️ 클로저와 깊은 연관

```js
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); //1
bar(); //1
```
