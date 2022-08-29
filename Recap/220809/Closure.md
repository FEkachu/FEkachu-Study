<aside>
💡 휴먼에러 : 자유도가 높아지면 사람은 실수 → 클로저를 이용해서 자유도를 낮춤, 오류의 가능성을 낮춤

</aside>

<aside>
💡 클로저를 주로 사용하는 곳 → utils (토글, 날짜를 받아서 format 변경 등…)

</aside>

<aside>
💡 React의 useState ⇒ 클로저의 원리를 이용함.

</aside>

- useState는 state와 dispather를 사용
- state의 값은 직접변경불가, 디스패처를 이용해 값을 변경
    
    → 자유도를 제한
    
- dispather는 리랜더링!!

<aside>
💡 아래의 코드에서 EC는 어떻게 되는가?

</aside>

```jsx
function foo() {
	var a = 2;
	function bar() {
		console.log(a);
	}
	return bar;
}

var baz = foo();

baz(); // 2

// 1)
// global EC
  // foo : function
  // baz : undefined

// 2)
// global EC
  // foo : functuon
  // baz : (foo 실행 후) bar
    // foo EC
    // a : undefined -> 2
    // bar : function
    // foo 함수 종료 후 실행 컨텍스트 소멸

// 3) 
// baz EC
// baz() 실행(콘솔에 2 출력) 후 실행 컨텍스트 소멸
```

<aside>
💡 또한 foo 실행이 끝난 뒤 foo의 EC가 POP이 되었는데, 어떻게 외부 EC에서 foo 내부 변수에 접근할 수 있는가?

</aside>

컴파일러가 함수 내부 변수가 외부에서 참조되는 것을 감지하면, 실행컨텍스트 내부에 Closure 라는 것이 생성된다. 

따라서 위 예시에서는 foo의 내부 변수를 외부에서 참조하고 있으므로 bar 함수의 클로저에 foo의 EC가 저장되어 있고, 그 덕분에 baz가 실행되고 a 변수를 참조할 때 foo의 스코프에 접근할 수 있는 것이다.

- EC의 구조
    - VariableEnvironment
        - environmentRecord (snapshot)
        - outerEnvironmentReference (snapshot)
    - LexicalEnvironment
        - environmentRecord
        - outerEnvironmentReference
    - ThisBinding

[](https://velog.io/@modolee/core-javascript-02#lexicalenvironment)

- foo 내부에서 bar가 외부에서 사용된다는 것을 컴파일러가 인지하는 순간 foo 외부의 스코프(글로벌 스코프)의 LexicalEnvironment에 클로저가 생성되어 foo를 저장
    - 스코프를 확인해보자 → `console.dir(baz);` : Read Only! (사용불가)

![스크린샷 2022-08-10 오후 1.40.46.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1faec030-efc4-4dd9-947f-7cee1be1b97e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-08-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.40.46.png)

<aside>
💡 커링함수?

</aside>

다음 코드가 실행가능하게 구현하라 `add(4)(2)`

```jsx
const add = (x) => (y) => x + y;

function add(x) {
	return function (y) {
		return x + y;
	}
}
```

실제로 사용 : 특정라이브러리

concat된 경우`,`를 통해 분리하는 것보다 이러한 커링함수를 이용해 표시하는 것이 가독성이 좋다고 판단해 라이브러리 개발시 사용하기도 한다.

[커링](https://ko.javascript.info/currying-partials)

<aside>
💡 클로저는 메모리 누수의 관점에서 보는 것이 중요하다. 클로저를 사용했을 때, 왜 메모리 누수 위험이 있는지, 또 어떻게 하면 GC가 클로저를 컬렉팅하게 할 수 있을지가 가장 중요하다.

</aside>

클로저는 그 클로저 함수에 대한 참조가 남아 있다면 가비지 콜렉팅되지 않고 계속 남아서 참조된다. 이 때문에 메모리 누수 위험이 발생한다. DOM 요소에 이벤트리스너를 통해 그에 대한 콜백 함수로 클로저 함수를 지정하였다면, 이벤트리스너가 해제되기 전까지 클로저 함수에 대한 메모리는 그대로 남아 있다. 따라서 이벤트를 더 이상 발생시키지 않는 상황이 오게되면 이벤트리스너를 해제하여 클로저 함수에 대한 참조를 끊는 것이 필요하다.

다시 말해, 클로저의 필요성을 마친 뒤에는 가비지 컬렉터에게 ‘필요 없음'을 알려야하는데, 그 방법을 알 필요가 있다. 그 방법은 클로저를 담고있는 객체를 다른 값으로 초기화 시켜 더 이상 참조되지 않는 클로저를 가비지 컬렉터가 메모리 해제하게 하는 방법이다.

```jsx
function makeClosureFunc(hi) {
    const name = "peter";
    return function () {
        console.log(`${hi} ${name}~!`);
    };
}

const sayHiToPeter = makeClosureFunc("Good morning!");
sayHiToPeter(); //Good morning! peter~!

// ~ 함수의 필요성이 완료됨 ~

sayHiToPeter = null;
// 가비지 컬렉터가 이전 할당 값인 Closure의 reachable이 false 된 것을 확인하고 메모리에서 해제 함
```

[[JS] Closure와 Garbage Collection - 어? 쓰흡... 하아.... | Dev X](https://dkje.github.io/2020/09/18/Closure/)

[코어 자바스크립트 - YES24](http://www.yes24.com/Product/Goods/78586788)
