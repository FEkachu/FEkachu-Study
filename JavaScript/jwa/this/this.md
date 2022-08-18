# this

C++, JAVA 등 다른 언어에 존재하는 this는 객체 자신을 나타내는 포인터, 레퍼런스이다. 하지만 자바스크립트에서의 `this`는 조금 다르다. 자바스크립트에서 `this` 는 **함수의 호출 맥락(Context)** 을 의미한다. 즉, 함수를 어떻게 호출하냐에 따라 this가 가리키는 대상이 달라질 수 있다.

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

사용 패턴이 복잡해질수록 보통 명시적 인자로 context를 넘기는 방법이 this를 사용하는 것보다 더 지저분해지는 경향이 있다.  
(어떤 경우를 말하는지 모르겠어서 약간 와닿지 않는다..)

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

### Reference

https://eomtttttt-develop.tistory.com/132#recentComments  
https://nuhends.tistory.com/38  
https://blog.leehov.in/29  
https://blog.rhostem.com/posts/2018-07-20-this-in-javascript
