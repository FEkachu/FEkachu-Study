# 📍 함수 VS 블록스코프

## 함수 스코프

자바스크립트 스코프는 함수 스코프를 따른다.

`var` 키워드는 함수 스코프이다. `var` 키워드로 선언된 변수는 함수 내에서만 사용할 수 있으며, 함수 내부에서 생성되지 않은 경우 전역 변수가 된다.

### 렉시컬 스코프로부터 숨기

코드를 숨기는 기법은 최소 권한의 원칙을 적용하는데 유용하다.

외부에서 접근해도 되는 데이터와 접근해서는 안되는 데이터들을 알맞게 배치하고, 필요없는 노출 자체를 줄여 위험한 코드의 생성을 막을 수 있다.

또한, 중복되는 이름을 가진 변수들을 분리하여 사용할 수 있다. 서로 다른 함수에서 같은 이름의 변수를 사용하는 경우(섀도잉), 의도치 않은 값을 참조하게 되는 문제가 발생할 수 있다. 이를 막기 위해 코드 숨기기를 통해 스코프를 분리해 데이터 사이의 충돌을 방지할 수 있다.

### 함수 스코프에 숨기

```jsx
function sumFunction(a) {
  sum = a + minusFunction(a, 1);
}

function minusFunction(a, b) {
  return a - b;
}

let sum;

sumFunction(5);
```

위와 같은 코드는 글로벌 스코프에서 `sumFunction` `minusFunction` `sum` 에 접근이 가능하다. 이는 최소 권한의 원칙에 위배된다.

해당 코드를 아래와 같이 하나의 함수 스코프에 넣음으로써 식별자들을 글로벌 스코프로부터 숨길 수 있다.

```jsx
function func1(a) {
  function fun2(a, b) {
    return a - b;
  }
  const sum = a + func2(a, 1);
}

func1(5);
```

### 즉시 실행 함수 (IIFE)

```jsx
// 함수 선언문
function foo() {
  let str = "abc";
  console.log(str);
}

abc();

// 즉시 실행 함수 (함수 표현식)
(function foo() {
  let str = "abc";
  console.log(str);
})();
```

바로 사용해야 하는 함수는 괄호를 통해 즉시 실행 함수로 만들어주는 것이 더 효율적이다. 글로벌 스코프에 영향을 미치지 않고, 추가적으로 함수 호출을 해줄 필요가 없기 때문이다. 이러한 형식은 함수 선언문이 아니라 함수 표현식이다.

즉시 실행 함수는 선언과 동시에 실행되기 때문에 이름을 통해 호출할 필요가 없다. 따라서 주로 익명 함수로 사용된다.

```jsx
setTimeout(function () {
  let str = "abc";
  console.log(str);
}, 1000);
```

### 글로벌 네임스페이스

```jsx
const MyLibrary = {
	hello: "hi",
	doSomething: function() {
		//...
	}
	doAnother: function() {
		//...
	}
	//...
};
```

네임스페이스를 사용하여 충돌을 회피하는 방식이다.

내부/비공개 함수와 변수가 적절하게 숨겨져 있지 않은 여러 라이브러리들을 한 프로그램에서 불러오면 충돌이 발생할 수 있다.

이러한 경우 글로벌 스코프에 고유한 이름의 객체를 선언하고 객체 속성에 라이브러리의 기능들을 넣는다. 렉시컬 스코프는 일차 식별자에 대한 검색만 수행하기 때문에 객체 내부의 기능은 객체 속성 접근을 통해서만 가능하므로 스코프에 의한 충돌이 발생하지 않는다.

네임스페이스를 통해 속성 형태로 라이브러리의 모든 기능이 노출된다.

최근에는 네임스페이스 패턴이 아닌 스코프 클로저를 이용한 모듈 패턴이 많이 사용된다.

※ **모듈 패턴**에 대한 내용은 다음 주제인 클로저 학습 후에 따로 정리해볼 예정

## 블록 스코프

블록 스코프를 사용하는 것의 가장 큰 목적은 변수를 **실제 사용하는 곳에서 가깝게 배치하여 최대한 작은 유효 범위를 갖도록 하는 것**이다.

블록 스코프를 구성하는 방법은 크게 세 가지가 있다.

- with
- try/catch
- let/const

### with

`with` 문 안에서 생성된 객체는 바깥 스코프에 영향을 미치지 않고, 문 안에서만 존재하다가 문이 끝남과 동시에 사라진다.

### try/catch

```jsx
try {
  //...
} catch (e) {
  console.log(e);
}

console.log(e); // Reference Error
```

try/catch 구문 중 `catch` 문에서 선언된 변수는 `catch` 블록 스코프에 속한다.

### let/const

ES6에서 변수를 선언하는 방법으로 `let`, `const` 키워드가 도입되었으며 이 둘은 블록 스코프를 가진다.

### ※ 최소 권한의 원칙

최소 권한 원칙이란, 권한을 부여할 때 권한 범위를 명확히 하여 지정 사용자에게 어떤 조건에서 어떤 작업을 수행하고 어떤 리소스에 엑세스할지에 대해 권한을 명확하게 부여하는 것을 의미한다.

글로벌 스코프에 식별자들이 무분별하게 생성되지 않도록 변수가 사용되는 위치에서 최소한의 유효 범위만을 갖도록 코드를 짜는 것이 중요하다.

### Reference

함수 vs 블록 스코프  
https://usage.tistory.com/102
https://blog.dongmin.dev/11

최소 권한의 원칙  
https://intl.cloud.tencent.com/ko/document/product/436/32972
