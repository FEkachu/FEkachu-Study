## 콜백 함수를 통한 비동기 처리

비동기(Asynchronous) 함수란 쉽게 설명하면 호출부에서 실행 결과를 가다리지 않아도 되는 함수이다. 반대로 동기 함수(Synchronous) 함수는 호출부에서 실행 결과가 리턴될 때 까지 기다려야 하는 함수다.

비동기 함수의 이러한 Non-blocking 이점 때문에, 자바스크립트처럼 싱글 쓰레드 환경에서 실행되는 언어에서 광범위하게 사용된다. 예를 들어, 브라우져에서 어떤 로직이 동기 함수만으로 실행될 경우, 기다리는 시간이 많아져서 사용자 경험에 부정적인 영향을 미칠 것 이다. 또한, 비동기 함수를 사용하면 로직을 순차적으로 처리할 필요가 없기 때문에 동시 처리에서도 동기 함수 대비 유리한 것으로 알려져있다.

아래와 같은 예시가 있을 때 결과는 console.log()부터 실행하게 된다.

```jsx
function findUser(id) {
  let user;
  setTimeout(function () {
    console.log("waited 0.1 sec.");
    user = {
      id: id,
      name: "User" + id,
      email: id + "@test.com",
    };
  }, 100);
  return user;
}

const user = findUser(1);
console.log("user:", user);

//user: undefined
//waited 0.1 sec.
```

따라서 이를 콜백함수로 실행시켜주면 아래와 같다.

```jsx
findUserAndCallBack(1, function (user) {
  console.log("user:", user);
});

function findUserAndCallBack(id, cb) {
  setTimeout(function () {
    console.log("waited 0.1 sec.");
    const user = {
      id: id,
      name: "User" + id,
      email: id + "@test.com",
    };
    cb(user);
  }, 100);
}

//
//waited 0.1 sec.
//user: {id: 1, name: "User1", email: "1@test.com"}
```

하지만 자바스크립트 프로젝트가 점점 더 복잡해지면서 최근에는 콜백 함수를 인자로 넘겨서 비동기 처리를 하는 스타일을 피하는 추세이다. 왜냐하면 콜백 함수를 중첩해서 사용하게 되면 계속해서 코드를 들여쓰기 해야하고 그러다보면 코드 가독성이 현저하게 떨어지게 되기 때문이다.

결국, 많은 개발자들이 콜백 지옥이라고 불리는 끔찍한 상황을 겪게 되었고 최근에는 `Promise`나 `async/await`를 이용하는 방법들로 대체되고 있다.

## Promise를 통한 비동기 처리

## Promise 생성 방법

먼저 Promise 객체를 리턴하는 함수를 작성하는 방법에 대해서 알아보자.

Promise는 객체는 `new` 키워드와 생성자를 통해서 생성할 수 있는데 이 생성자는 함수를 인자로 받는다. 그리고 이 함수 인자는 `reslove`와 `reject`라는 2개의 함수형 파라미터를 가진다.

따라서 아래와 같은 모습으로 Promise 객체를 생성해서 변수에 할당할 수 있다.

```jsx
const promise = new Promise(function(resolve, reject) { ... } );
```

실제로는 변수에 할당하기 보다는 어떤 함수의 리턴값으로 바로 사용되는 경우가 많고, ES6의 화살표 함수 키워드를 더 많이 사용하는 것 같다.

## 프로미스의 3가지 상태(states)

프로미스를 사용할 때 알아야 하는 가장 기본적인 개념이 바로 프로미스의 상태(states)이다. 여기서 말하는 상태란 프로미스의 처리 과정을 의미한다. `new Promise()`로 프로미스를 생성하고 종료될 때까지 3가지 상태를 갖습니다.

- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

### Pending(대기)

먼저 아래와 같이 `new Promise()` 메서드를 호출하면 대기(Pending) 상태가 된다.

```jsx
new Promise();
```

`new Promise()` 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 `resolve`, `reject` 이다.

```jsx
new Promise(function(resolve, reject) {
// ...
});
```

### Fulfilled(이행)

여기서 콜백 함수의 인자 `resolve`를 아래와 같이 실행하면 이행(Fulfilled) 상태가 된다.

```jsx
new Promise(function(resolve, reject) {
  resolve();
});

```

그리고 이행 상태가 되면 아래와 같이 `then()`을 이용하여 처리 결과 값을 받을 수 있다.

```jsx
function getData() {
  return new Promise(function(resolve, reject) {
    var data = 100;
    resolve(data);
  });
}

// resolve()의 결과 값 data를 resolvedData로 받음getData().then(function(resolvedData) {
  console.log(resolvedData);// 100});

```

※ 프로미스의 '이행' 상태를 좀 다르게 표현해보면 '완료'

### Rejected(실패)

`new Promise()`로 프로미스 객체를 생성하면 콜백 함수 인자로 `resolve`와 `reject`를 사용할 수 있다. 여기서 `reject`를 아래와 같이 호출하면 실패(Rejected) 상태가 된다.

```jsx
new Promise(function(resolve, reject) {
  reject();
});
```

그리고, 실패 상태가 되면 실패한 이유(실패 처리의 결과 값)를 `catch()`로 받을 수 있다.

```jsx
function getData() {
  return new Promise(function(resolve, reject) {
    reject(new Error("Request is failed"));
  });
}

// reject()의 결과 값 Error를 err에 받음getData().then().catch(function(err) {
  console.log(err);// Error: Request is failed});
Js
Copy

```

![https://joshua1988.github.io/images/posts/web/javascript/promise.svg](https://joshua1988.github.io/images/posts/web/javascript/promise.svg)

프로미스 처리 흐름 - 출처 : MDN

## Promise의 메서드 체이닝(method chaining)

`then()`과 `catch()` 메서드는 또 다른 Promise 객체를 리턴한다. 그리고 이 Promise 객체는 인자로 넘긴 콜백 함수의 리턴값을 다시 `then()`과 `catch()` 메서드를 통해 접근할 수 있도록 해준다. 다시 말하면 `then()`과 `catch()` 메서드는 마치 사슬처럼 계속 연결하여 연쇄적으로 호출을 할 수 있다.

- 예제

```jsx
new Promise(function(resolve, reject){
  setTimeout(function() {
    resolve(1);
  }, 2000);
})
.then(function(result) {
  console.log(result); // 1
  return result + 10;
})
.then(function(result) {
  console.log(result); // 11
  return result + 20;
})
.then(function(result) {
  console.log(result); // 31
});
```

위 코드는 프로미스 객체를 하나 생성하고 `setTimeout()`을 이용해 2초 후에 `resolve()`를 호출하는 예제다.

`resolve()`가 호출되면 프로미스가 대기 상태에서 이행 상태로 넘어가기 때문에 첫 번째 `.then()`의 로직으로 넘어간다. 첫 번째 `.then()`에서는 이행된 결과 값 1을 받아서 10을 더한 후 그다음 `.then()` 으로 넘겨준다. 두 번째 `.then()`에서도 마찬가지로 바로 이전 프로미스의 결과 값 11을 받아서 20을 더하고 다음 `.then()`으로 넘겨준다. 마지막 `.then()`에서 최종 결과 값 31을 출력한다.

### Reference

[[JS] 비동기(async) 프로그래밍 이해하기[1]](https://medium.com/@kwoncharles/js-%EB%B9%84%EB%8F%99%EA%B8%B0-async-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-1-7dc99ecf4ca6)

[[자바스크립트] 비동기 처리 1부 - Callback](https://www.daleseo.com/js-async-callback/)

[자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)