함수와 객체(메서드)의 구분이 느슨한 자바스크립트에서 this는 실질적으로 이 둘을 구분하는 거의 유일한 기능이다.

자바스크립트에서 this는 기본적으로 실행 컨텍스트가 생성될 때 함께 결정된다. 실행 컨텍스트는 함수를 호출할 때 생성되므로, 바꿔 말하면 this는 함수를 호출할 때 결정된다고 말할 수 있다.

## 1. 전역 공간에서의 this

전역 공간에서 this는 전역 객체를 가리킨다. 전역 객체는 런타임 환경에 따라 다른 이름과 정보를 가지고 있다. 브라우저 환경에서 전역객체는 window이고, Node.js 환경에서는 global이다.

```jsx
var a = 1;
console.log(a);
console.log(window.a);
console.log(this.a);
```

위 예시의 세 콘솔문은 모두 같은 결과가 나온다. 전역 변수로 선언된 a는 곧 전역 객체의 프로퍼티이기 때문이다. 자바스크립트의 모든 변수는 실은 특정 객체의 프로퍼티로서 동작한다. 여기서 말하는 특정 객체란 바로 실행 컨텍스트의 Lexcial Environment로 실행 컨텍스트는 변수를 수집해서 렉시컬 환경의 프로퍼티로 저장한다. 이후 어떤 변수를 호출하면 렉시컬 환경을 조회해서 일치하는 프로퍼티가 있을 경우 그 값을 반환한다. 전역 컨텍스트의 경우 렉시컬 환경은 전역 객체를 그대로 참조한다.

## 2. 함수 vs 메서드

서두에서 함수와 객체를 구분하는 거의 유일한 기능이 this라고 하였다. 프로그래밍 언어에서 함수와 메서드는 미리 정의한 동작을 수행하는 코드 뭉치로, 이 둘을 구분하는 유일한 차이는 독립성에 있다.

함수는 그 자체로 독립적인 기능을 수행하는 반면, 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행한다. 메서드가 무엇이냐고 묻는다면 나는 객체의 프로퍼티에 할당된 함수라고 말하곤 했다. 하지만 이는 반은 맞고 반은 틀린 말이다. 어떤 함수를 객체의 프로퍼티에 할당한다고 해서 그 자체로서 무조건 메서드가 되는 것이 아니라 객체의 메서드로서 호출할 경우에만 메서드로 동작하고, 그렇지 않으면 함수로 동작한다.

```jsx
var func = function (x) {
	console.log(this.x);
};
func(1);

var obj = {
	method: func
};
obj.method(2);
```

### 2-1. 메서드로서 호출할 때 그 메서드 내부에서의 this

**this에는 호출한 주체에 대한 정보가 담긴다.**

### 2-2. 함수로서 호출할 때 그 함수 내부에서의 this

메서드는 호출하는 주체(객체)가 있다. 반면 함수는 호출하는 주체를 명시하지 않고 개발자가 코드에 직접 관여해서 실행한다. 따라서 호출 주체의 정보를 알 수 없다.

함수를 호출할 때 실행 컨텍스트가 활성화되고 그 당시에 this가 지정되지 않은 경우 this는 전역 객체를 바라본다. 따라서 함수에서의 this는 전역 객체를 가리킨다. 하지만 이를 더글라스 크락포드는 명백한 설계상의 오류라고 지적한다.

[더글라스 크록포드 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%EB%8D%94%EA%B8%80%EB%9D%BC%EC%8A%A4_%ED%81%AC%EB%A1%9D%ED%8F%AC%EB%93%9C)

## 3. 설계상의 오류?

this가 전역 객체를 가리키는지 아니면 호출한 주체를 가리키는지는 함수를 실행하는 당시의 주변 환경은 중요하지 않고, 오직 해당 함수를 호출하는 구문 앞에 점 또는 대괄호 표기가 있는지 없는지가 관건이다. 지금까지 공부한 바에 따르면 변수를 검색하면 우선 가장 가까운 스코프의 렉시컬 환경을 찾고 없으면 상위 스코프를 탐색하는 스코프 체인처럼 호출 주체가 없을 때는 자동으로 전역객체를 바인딩하지 않고 호출 당시 주변 환경의 this를 그대로 상속받아 사용하는 설계가 더 자연스럽다. 바로 이 부분을 더글라스 크락포드가 설계상의 오류라고 지적한 것이 아닐까?

## 4. 화살표 함수

ES6에서 도입된 화살표 함수를 통해 함수 내부에서 this가 전역 객체를 바라보는 문제를 보완할 수 있다. 화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지게 되어, 상위 스코프의 this를 그대로 활용할 수 있다.

```jsx
var obj = {
	outer: function() {
				console.log(this); // (1) { outer: f }
				var innerFunc = () => {
					console.log(this); // (2) { outer: f }
				};
				innerFunc();
			}
};

obj.outer();
```

## 5. 엄격 모드와 비엄격 모드

MDN 문서에 따르면 자바스크립트에서 함수의 this 키워드는 엄격 모드와 비엄격 모드에서 일부 차이가 있다고 한다. 이 차이는 무엇일까?

```jsx
function f1() {
  return this;
}

// 브라우저
f1() === window; // true

// Node.js
f1() === global; // true
```

위의 예제는 비엄격 모드이다. 또한 this의 값이 호출에 의해 설정되지 않으므로, 기본값으로 브라우저에서는 window인 전역 객체를 참조하고 node 환경에서는 global인 전역 객체를 참조한다.

```jsx
function f2(){
  "use strict"; // 엄격 모드 참고
  return this;
}

f2() === undefined; // true
```

반면에 엄격 모드에서 this 값은 실행 문맥에 진입하며 설정되는 값을 유지하므로 위 예시처럼 this가 undefined로 남아있다. 위에 작성한 바에 따르면 함수를 객체의 메서드나 프로퍼티가 아닌 직접 호출을 하게되면 this가 전역 객체를 반환해야 하는데 이는 비엄격 모드에서의 경우를 말하는 것이다. 엄격 모드를 처음 지원하기 시작한 초기 브라우저에서는 window 객체를 잘못 반환하였다.

[this - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)