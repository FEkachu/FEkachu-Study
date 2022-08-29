# 📍 this

C++, JAVA 등 다른 언어에 존재하는 this는 객체 자신을 나타내는 포인터, 레퍼런스이다. 하지만 자바스크립트에서의 `this`는 조금 다르다. 자바스크립트에서 `this` 는 **함수의 호출 맥락(Context)**를 의미한다. 즉, 함수를 어떻게 호출하냐에 따라 this가 가리키는 대상이 달라질 수 있다.

❓ 함수를 어떻게 호출하냐에 따라 this가 달라진다는 게 무슨 말이지

아래 코드에서 같은 `func` 함수를 호출하지만 전역에 선언된 함수를 그대로 호출하는지, 객체 안에 있는 메소드를 호출하는지에 따라 this가 가리키는 대상이 달라짐

```jsx
let func = function () {
  console.log(this);
};

let obj = {
  objFunc: func,
};

console.log(func === obj.objFunc);
//true
func();
//this 값: window 객체
obj.objFunc();
//this 값: obj 객체
```

## this를 왜 사용할까?

먼저 this가 사용된 코드를 보자.

```jsx
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = `Hello I'm ${identify.call(this)}`;
  console.log(greeting);
}

var me = {
  name: "Jwa",
};

var you = {
  name: "Reader",
};

identify.call(me); // "JWA"
identify.call(you); // "READER"

speak.call(me); // "Hello, I'm JWA"
speak.call(you); // "Hello I'm READER"
```

`identify()`와 `speak()` 두 함수는 객체 별로 따로 함수를 작성할 필요 없이 객체 `me`와 `you` 모두에서 재사용할 수 있다.

`this` 를 사용하지 않고 함수에 명시적으로 객체를 넘기는 방법도 있다.

```jsx
function identify(context) {
  return context.name.toUpperCase();
}

function speak(context) {
  var greeting = `Hello I'm ${identify(context)}`;
  console.log(greeting);
}

var me = {
  name: "Jwa",
};

var you = {
  name: "Reader",
};

identify(me); // "JWA"
identify(you); // "READER"

speak(me); // "Hello I'm JWA"
speak(you); // "Hello, I'm READER"
```

사용 패턴이 복잡해질수록 보통 명시적 인자로 context를 넘기는 방법이 this를 사용하는 것보다 더 지저분해지는 경향이 있다.(고 한다.. 어떤 경우를 말하는지 모르겠어서 약간 와닿지 않는다

## 헷갈리지 말 것 !

1. this는 자기 자신을 가리키는 게 아니다.
2. this는 함수의 스코프를 가리키는 게 아니다.

### this는 자기 자신을 가리킨다?

→ 잘못된 생각이다.

```jsx
function foo(num) {
  console.log("foo: ", num);
  this.count++;
}

foo.count = 0;

var i;
for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

console.log(foo.count); // 0
```

위 예제에서 `this` 가 자기 자신을 가리킨다면, `foo.count` 는 마지막에 함수가 호출된 횟수만큼 증가해있어야 하는데, 0으로 찍힌다. 이는 ‘this가 자기 자신을 가리킨다’고 판단하는 게 틀렸다는 증거이다.

### this가 함수의 스코프를 가리킨다?

→ 흔한 오해이다. this는 어떤 식으로도 함수의 렉시컬 스코프를 참조하지 않는다.

내부적으로 스코프는 객체의 일종이지만, 스코프 객체는 자바스크립트 엔진의 내부 부품이기 때문에 일반적인 자바스크립트 코드로는 접근할 수 없다.

아래 코드는 this가 함수의 렉시컬 스코프를 가리키도록 시도했지만 애초에 잘못된 코드이다.

```jsx
function foo() {
  var a = 2;
  this.bar();
}

function bar() {
  console.log(this.a);
}

foo(); // a is not defined
```

foo 내부에서 this를 통해 bar를 호출하고, bar 내부에서 this를 통해 foo 내부 스코프의 변수 a를 접근하려는 의도였겠지만 그런 연결 통로는 만들어지지 않는다.

❓ 함수 내부에서 this를 콘솔에 찍으면 뭐가 나올까?

```jsx
// strict mode가 아닐 때
function foo() {
  console.log(this);
}

foo(); // Window { ... }

// strict mode일 때
("use strict");
function foo() {
  console.log(this);
}

foo(); // undefined
```

## 정리

- this는 함수가 호출되어 활성 레코드(Activation Record) 즉, 실행 컨텍스트가 만들어질 때 결정된다. (활성 레코드 = 실행 컨텍스트)
- this는 함수 자기 자신이나 함수의 렉시컬 스코프를 가리키는 레퍼런스가 아니다.
- this는 작성 시점이 아닌 런타임 시점에 바인딩 된다.
- this는 함수 호출 당시 상황에 따라 context가 결정된다.
- this 바인딩은 함수 선언 위치와 관계없이 어떻게 함수를 호출했느냐에 따라 달라진다.

## this의 동작 방식

1. 기본 바인딩
2. 암시적 바인딩
3. 명시적 바인딩
4. new 바인딩

### 기본 바인딩(전역 객체)

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b6b39b93-be49-4070-aefd-85fca91dc186/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220823%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220823T070759Z&X-Amz-Expires=86400&X-Amz-Signature=45fcb567b1586e04819f5e50ca086192d820dd09118177e1093d88419fcabf43&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

크롬에서 `this`를 찍으면 자바스크립트 실행 환경의 전역 객체인 `Window` 객체가 나온다.

this의 첫번째 동작 방식은, **this가 전역 객체 window를 context 객체로 갖는 것**이다.

```jsx
var g = 20;
console.log(this.g); // 20

function doSomething() {
  this.dummy2 = "foo";
  console.log(this);
}

console.log(this.dummy1); // undefined
console.log(this.dummy2); // undefined

this.dummy1 = "bar";

console.log(this.dummy1); // bar
console.log(this.dummy2); // undefined

doSomething();

console.log(this.dummy1); // bar
console.log(this.dummy2); // foo
```

**전역 스코프에서 정의한 변수들은 전역 객체에 등록된다.** 따라서 `var g = 20` 은 `window.g = 20` 과 같고, this 객체에 dummy1, dummy2 프로퍼티를 등록하는 것은 사실상 전역 스코프에 변수를 선언한 것과 같다.

### 암시적 바인딩

```jsx
function test() {
  console.log(this.a);
}

var obj = {
  a: 20,
  func1: test,
  func2: function () {
    console.log(this.a);
  },
};

obj.func1(); // 20
obj.func2(); // 20
```

**어떤 객체를 통해 함수가 호출된다면 그 객체가 바로 this의 context 객체가 된다.** 위 코드에서 func1, func2는 obj를 통해 호출되었으므로 obj가 this가 된다.

이 말을 그대로 위에서 말한 기본 바인딩과 연관 지을 수 있다.

```jsx
var b = 100;

function test() {
  console.log(this.b);
}

var obj = {
  a: 20,
  func1: test,
  func2: function () {
    console.log(this.b);
  },
};

obj.func1(); // undefined
obj.func2(); // undefined

var gFunc = obj.func1;
gFunc(); // 100
```

전역 스코프에서 생성한 변수는 전역 객체에 등록되기 때문에, `var gFunc` 은 `window.gFunc` 과 같다. 따라서 `gFunc` 에서 this context는 전역 객체 window가 되고, `gFunc()` 을 실행할 때의 this는 window이므로 전역 변수 b에 접근해 100을 출력하는 것이다.

### 명시적 바인딩

함수는 `call`, `apply`, `bind` 메소드를 가지고 있는데, 첫번째 인자로 넘겨주는 것이 this context 객체가 된다. 메소드들을 이용해 객체를 넘겨주는 것을 명시적 바인딩이라고 한다.

```jsx
function test() {
  console.log(this);
}

var obj = { name: "jwa" };
test.call(obj); // { name: 'jwa' }
```

### `bind` `call` `apply`

- `bind()`
  bind의 리턴값은 함수이다. 함수가 가리키고 있는 this를 바꾸고 새롭게 바인딩 된 함수를 리턴한다. 주의할 점은 bind 함수는 call, apply 와 달리 호출되지는 않는다는 것이다.

  ```jsx
  num = 0;

  function sum(a, b) {
    return console.log(this.num + a + b);
  }

  const obj = { num: 100 };

  const sum2 = sum.bind(obj); // 함수가 호출되지 않고 this만 바꿈
  sum(1, 2); // 3
  sum2(1, 2); // 103
  ```

- `call()`, `apply()`
  `call`, `apply` 두 메소드의 유일한 차이점은, 바인딩할 함수에 인자가 있을 때 파라미터를 배열로 넣느냐, 여러개의 파라미터로 넣느냐이다. `apply`는 배열을 인자로 받고, `call`은 다수의 파라미터를 인자로 받는다.

  ```jsx
  num = 0;

  function sum(a, b) {
    return console.log(this.num + a + b);
  }

  const obj = { num: 100 };

  sum(1, 2); // 3
  sum.call(obj, 1, 2); // 103
  sum.apply(obj, [1, 2]); // 103
  ```

### new 바인딩

new 바인딩은 클래스 디자인 패턴 형태를 띄고 있다.

```jsx
function foo(a) {
  this.a = a;
  this.qwer = 20;
}

var bar = new foo(2);
console.log(bar.a); // 2
console.log(bar.qwer); // 20
```

- new 바인딩의 동작 순서
  1. 새 객체가 만들어진다.
  2. 새로 생성된 객체의 프로토타입 체인이 호출 함수의 프로토타입과 연결된다.
  3. 1에서 생성된 객체를 this context 객체로 사용(명시적 바인딩)하여 함수가 실행된다.
  4. 함수가 객체를 반환하지 않는 한 1에서 생성된 객체가 반환된다.

위 과정을 코드로 표현해보면 다음과 같다.

```jsx
function foo(a) {
  this.a = a;
  this.qwer = 20;
}

var bar1 = new foo(2);
console.log(bar1.a); // 2
console.log(bar1.qwer); // 20

// --- 위 코드가 실행되는 과정 ---

// 1. 새 객체가 만들어짐
var obj = {};
// 2. 새로 생성된 객체의 프로토타입 체인이 호출 함수의 프로토타입과 연결됨
Object.setPrototypeOf(obj, foo.prototype); // 프로토타입 연결
// 3. 1에서 생성된 객체를 context 객체로 사용(명시적 바인딩)하여 함수가 실행됨
foo.call(obj, 2);
// 4. 이 함수가 객체를 반환하지 않는 한 1에서 생성된 객체가 반환됨
var bar1 = obj; // 여기서 foo는 return이 없으므로 인스턴스가 생성된 것처럼 동작
```

만약 함수가 객체를 반환하는 함수라면 어떻게 될까?

```jsx
function foo(a) {
  this.a = a;
  this.qwer = 20;

  console.log("foo 함수 실행됨");
  return { dummy: "foo 함수가 반환하는 객체" };
}

var bar1 = new foo(2); // foo 함수 실행됨
console.log(bar1); // { dummy: foo 함수가 반환하는 객체 }
```

위 코드를 보면 `new foo()` 의 실행은 그저 foo 함수를 실행하는 것과 다를 게 없다는 것을 알 수 있다. 또한 함수가 return 하는 객체가 반환된다. 즉, 자바스크립트의 new 키워드는 클래스의 인스턴스화가 아니라, 그와 유사하게 동작하도록 되어있다는 것을 알아야 한다.

### this 바인딩 우선순위

네 가지의 바인딩에 순위를 매기자면 new 바인딩 ≥ 명시적 바인딩 >>>>> 암시적 바인딩 ≥ 기본 바인딩 으로 볼 수 있다.

### Arrow Function

Arrow Function(화살표 함수)에서의 this는 특별하게 동작한다.

**화살표 함수는 자신의 this가 없고, 화살표 함수를 둘러싸는 렉시컬 스코프의 this**를 사용한다.

```jsx
var a = 10;
var b = 20;
var obj = {
  a: 1,
  func: () => console.log(this.a),
};

// (1) 암시적 바인딩
obj.func(); // 10

function test() {
  console.log(this);
  return () => console.log(this.b);
}

var context = { b: 999 };

// (2) 명시적 바인딩, 화살표 함수
var f1 = test.call(context); // { b: 999 }
f1(); // 999

function test2() {
  console.log(this);
  return function () {
    console.log(this.b);
  };
}

var f2 = test2(); // window
f2(); // 20
// (3) 명시적 바인딩, 함수선언식
var f3 = test2.call(context); // { b: 999 }
f3(); // 20 <- window.f3()과 같으므로
```

(1)은 암시적 바인딩 상황이지만, 화살표 함수는 자신의 바깥 스코프인 obj의 this를 사용하므로, 전역 객체를 참조한다.

(2)는 명시적으로 test 함수에 context 객체를 전달하였고 화살표함수는 자신의 바깥 스코프인 test 함수 스코프의 this를 사용하므로 context 객체를 this로 사용한다.

(3)은 test2에 context를 명시적으로 바인딩했으나 `f3()` 이 실행될 때의 this는 window이므로 익명함수의 this는 window를 가리킨다.

또다른 예시 코드를 보자.

```jsx
function Person() {
  // Person() 생성자는 `this`를 자신의 인스턴스로 정의.
  this.age = 0;

  setInterval(function growUp() {
    // 비엄격 모드에서, growUp() 함수는 `this`를
    // 전역 객체로 정의하고, 이는 Person() 생성자에
    // 정의된 `this`와 다름.
    this.age++;
  }, 1000);
}

var p = new Person();
```

setInterval에 전달된 growUp 함수 내에서 Person에 있는 this를 사용하기 위해서는 아래와 같이 따로 변수에 저장해 놓고 쓸 수 있다.

```jsx
function Person() {
  var that = this;
  that.age = 0;

  setInterval(function growUp() {
    // 콜백은  `that` 변수를 참조하고 이것은 값이 기대한 객체이다.
    that.age++;
  }, 1000);
}
```

위 방법 대신 화살표 함수를 사용할 수 있다.

```jsx
function Person() {
  this.age = 0;

  setInterval(() => {
    this.age++; // |this|는 Person 객체를 참조
  }, 1000);
}

var p = new Person();
```

이러한 이유로 react나 vue에서 하위 컴포넌트로 함수를 전달할 때, 상위 컴포넌트의 this를 사용하기 위해 화살표 함수가 사용되는 모습을 자주 볼 수 있다. (예시 찾아보기)

### Reference

[[You don't know JS] - this라나 뭐라나](https://eomtttttt-develop.tistory.com/132#recentComments)

[[YOU DON'T KNOW JS 정리] THIS (1)](https://nuhends.tistory.com/38)

[[JavaScript] 자바스크립트 this의 모든 것](https://blog.leehov.in/29)

[자바스크립트의 this가 가리키는 것](https://blog.rhostem.com/posts/2018-07-20-this-in-javascript)

[javascript this의 4가지 동작 방식](https://yuddomack.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-this%EC%9D%98-4%EA%B0%80%EC%A7%80-%EB%8F%99%EC%9E%91-%EB%B0%A9%EC%8B%9D)
