`async`와 `await`라는 특별한 문법을 사용하면 프라미스를 좀 더 편하게 사용할 수 있다.

# [async 함수](https://ko.javascript.info/async-await#ref-2088)

`async`는 function 앞에 위치한다.

```jsx
async function f() {
  return 1;
}
```

function 앞에 `async`를 붙이면 해당 함수는 항상 프라미스를 반환한다. 프라미스가 아닌 값을 반환하더라도 이행 상태의 프라미스(resolved promise)로 값을 감싸 이행된 프라미스가 반환되도록 한다.

아래 예시의 함수를 호출하면 `result`가 `1`인 이행 프라미스가 반환된다.

```jsx
async function f() {
  return 1;
}

f().then(alert); // 1
```

명시적으로 프라미스를 반환하는 것도 가능한데, 결과는 동일하다.

```jsx
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

`async`가 붙은 함수는 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸 반환한다.

# [await](https://ko.javascript.info/async-await#ref-2089)

`await`는 `async` 함수 안에서만 동작하며, `await` 문법은 다음과 같다.

```jsx
let value = await promise;
```

자바스크립트는 `await` 키워드를 만나면 프라미스가 처리될 때까지 기다린 후 결과가 반환된다.

```jsx
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000)
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)
  alert(result); // "완료!"
}

f();
```

위에 예제를 보면 함수를 호출하고, 함수 본문이 실행되는 도중에 `(*)`로 표시한 줄에서 실행이 잠시 '중단’되었다가 프라미스가 처리되면 실행이 재개된다. 이때 프라미스 객체의 `result` 값이 변수 result에 할당되고 위 예시를 실행하면 1초 뒤에 '완료!'가 출력된다.

`await`는 말 그대로 프라미스가 처리될 때까지 함수 실행을 기다리게 만든다. 프라미스가 처리되면 그 결과와 함께 실행이 재개된다. 프라미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트를 실행, 이벤트 처리 등)을 할 수 있기 때문에, CPU 리소스가 낭비되지 않는다.

`await`는 `promise.then`보다 좀 더 세련되게 프라미스의 `result` 값을 얻을 수 있도록 해주는 문법이기에`promise.then`보다 가독성 좋고 쓰기도 쉽다.

**일반 함수엔 `await`을 사용할 수 없습니다.**

`async` 함수가 아닌데 `await`을 사용하면 문법 에러가 발생한다.

```jsx
function f() {
  let promise = Promise.resolve(1);
  let result = await promise; // Syntax error}
```

function 앞에 `async`를 붙이지 않으면 이런 에러가 발생할 수 있다. 앞서 설명해 드린 바와 같이 `await`는 `async` 함수 안에서만 동작한다.

**async 클래스 메서드**

메서드 이름 앞에 `async`를 추가하면 async 클래스 메서드를 선언할 수 있다.

```jsx
class Waiter {
  *async wait() {*return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1
```

`async` 메서드와 `async` 함수는 프라미스를 반환하고 `await`를 사용할 수 있다는 점에서 동일하다.

# [에러 핸들링](https://ko.javascript.info/async-await#ref-2090)

프라미스가 정상적으로 이행되면 `await promise`는 프라미스 객체의 `result`에 저장된 값을 반환한다. 반면 프라미스가 reject되면 마치 `throw`문을 작성한 것처럼 에러가 처리된다.

```jsx
async function f() {
  await Promise.reject(new Error("에러 발생!"));}
```

위 코드는 아래 코드와 동일하다.

```jsx
async function f() {
  throw new Error("에러 발생!");}
```

실제 상황에선 프라미스가 reject 되기 전에 약간의 시간이 지체되는 경우가 있다. 이런 경우에는 `await`가 에러를 던지기 전에 지연이 발생한다.

`await`가 throw한 에러는  `try..catch`를 사용해 잡을 수 있다.

```jsx
async function f() {

  try {
    let response = await fetch('http://유효하지-않은-주소');
  } catch(err) {
    *alert(err); // TypeError: failed to fetch*}
}

f();
```

에러가 발생하면 제어 흐름이 `catch` 블록으로 넘어가며, 여러 줄의 코드를 `try`로 감싸는 것도 가능하다.

```jsx
async function f() {

  try {
    let response = await fetch('http://유효하지-않은-주소');
    let user = await response.json();
  } catch(err) {
    // fetch와 response.json에서 발행한 에러 모두를 여기서 처리한다.
    alert(err);
  }
}

f();
```

`try..catch`가 없으면 아래 예시의 async 함수 `f()`를 호출해 만든 프라미스가 reject 상태가 된다. `f()`에 `.catch`를 추가하면 거부된 프라미스를 처리할 수 있다.

```jsx
async function f() {
  let response = await fetch('http://유효하지-않은-주소');
}

// f()는 거부 상태의 프라미스가 됩니다.
f().catch(alert); // TypeError: failed to fetc
```

`.catch`를 추가하는 걸 잊으면 처리되지 않은 프라미스 에러가 발생한다.

**`async/await`는 `Promise.all`과도 함께 쓸 수 있다.**

여러 개의 프라미스가 모두 처리되길 기다려야 하는 상황이라면 이 프라미스들을 `Promise.all`로 감싸고 여기에 `await`를 붙여 사용할 수 있다.

```jsx
// 프라미스 처리 결과가 담긴 배열을 기다립니다.
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

실패한 프라미스에서 발생한 에러는 보통 에러와 마찬가지로 `Promise.all`로 전파됩니다. 에러 때문에 생긴 예외는 `try..catch`로 감싸 잡을 수 있다.

# [요약](https://ko.javascript.info/async-await#ref-2091)

function 앞에 `async` 키워드를 추가하면 두 가지 효과가 있다.

1. 함수는 언제나 프라미스를 반환한다.
2. 함수 안에서 `await`를 사용할 수 있다.

프라미스 앞에 `await` 키워드를 붙이면 자바스크립트는 프라미스가 처리될 때까지 대기한다. 처리가 완료되면 조건에 따라 아래와 같은 동작이 이어진다.

1. 에러 발생 – 예외가 생성됨(에러가 발생한 장소에서 `throw error`를 호출한 것과 동일함)
2. 에러 미발생 – 프라미스 객체의 result 값을 반환