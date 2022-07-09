# 📍 타입(type)

## 1. 동적 타입

자바스크립트는 동적 타입(dynamic/weak type) 언어이다. 변수의 타입 지정(type annotation) 없이 값이 할당되는 과정에서 자동으로 변수의 타입이 결정(타입 추론, type inference)된다. 따라서 모든 타입의 값으로 할당 및 재할당이 가능하다.

```jsx
let foo = 42;
foo = "bar";
foo = true;
```

## 2. 자바스크립트의 데이터 타입

데이터타입(Data Type)은 **한정된 메모리 공간을 효율적으로 사용하기 위해서, 그리고 2진수 데이터로 메모리에 저장된 데이터를 다양한 형태로 사용하기 위해** 존재한다.

자바스크립트에서 제공하는 7개의 데이터 타입은 크게 원시 타입과 객체 타입으로 구분할 수 있다.

- 원시 타입 (primitive data type)
  - `boolean`
  - `null`
  - `undefined`
  - `number`
  - `string`
  - `symbol` (ES6에서 추가)
  - `BigInt`
- 객체/참조 타입 (object/reference type)
  - `object`

### 2.1 원시 타입 (Primitive Data Type)

원시 타입의 값은 **변경 불가능한 값(immutable value)** 이며, **pass-by-value(값에 의한 전달)** 이다.

원시 타입은 변수에 할당될 때 메모리의 고정 크기로 원시 값을 저장하고, 해당 저장된 값을 변수가 직접적으로 가리키는 형태를 띈다.

값이 절대 변하지 않는 불변성을 가지고 있기 때문에 재할당 시 기존 값이 변하는 것처럼 보이지만 사실 **새로운 메모리에 재할당한 값이 저장되고 변수가 가리키는 메모리가 달라졌을 뿐**이다.

즉, 재할당 시 기존 값과 변경된 값 모두 메모리에 존재하고 있으며, 기존에 메모리에 생성된 값들은 그 자체가 변경될 수 없다.

- `number`  
  C나 Java의 경우 정수와 실수를 구분하여 int, long, float, double 등 다양한 숫자 타입이 존재한다. 하지만 자바스크립트는 하나의 숫자 타입만 존재한다.
  ECMAScript 표준에 따르면 숫자 타입의 값은 배정밀도 64비트 부동소수점 형((2^53 − 1) ~ 2^53 − 1)을 따른다. 즉, **모든 수를 실수로 처리**하며 정수만을 표현하기 위한 특별한 데이터 타입은 없다.

  자바스크립트는 2진수, 8진수, 16진수 데이터 타입을 제공하지 않기 때문에 이들 값을 참조하면 **모두 10진수로 해석**된다.

  모든 수가 실수이기 때문에 정수로 표시되는 수끼리 나누더라도 실수가 나올 수 있다.

  추가적으로 3가지 특별한 값들도 표현할 수 있다.

  - `Infinity` : 양의 무한대
  - `-Infinity` : 음의 무한대
  - `NaN` : 산술 연산 불가

- `BigInt`  
  `BigInt` 타입은 임의 정밀도로 정수를 나타낼 수 있는 숫자 원시 값이다. `number` 의 안전 한계를 넘어서는 큰 정수도 안전하게 저장하고 연산할 수 있다.

  `BigInt`는 정수 끝에 `n` 을 추가하거나 생성자를 호출해 생성할 수 있다.

  `BigInt` 는 `number` 와 혼합해 연산할 수 없으며, 이때 `TypeError` 가 발생한다.

- `string`  
  C와 같은 언어와는 다르게, 자바스크립트의 문자열은 **원시 타입이며 변경 불가능**하다.

  문자열은 배열처럼 인덱스를 통해 접근할 수 있는데, 이와 같은 특성을 갖는 데이터를 **유사 배열**이라 한다.

  `str[0] = 'S'` 처럼 이미 생성된 문자열의 일부를 변경해도 반영되지 않는다. (오류는 발생하지 않음) 한번 생성된 문자열은 read only로서 변경할 수 없다.

  ```jsx
  var str = "string";
  for (var i = 0; i < str.length; i++) {
    console.log(str[i]);
  }

  str[0] = "S";
  console.log(str); // string
  ```

  문자열을 재할당하는 것은 새로운 문자열을 새롭게 할당하는 것이기 때문에 가능하다.

  ```jsx
  var str = "string";

  str = "String";
  console.log(str); //String

  str += " test";
  console.log(str); //String test

  str = str.substring(0, 3);
  console.log(str); //Str

  str = str.toUpperCase();
  console.log(str); //STR
  ```

- `boolean`  
  boolean 타입의 값은 `true` 와 `false` 뿐이다. 비어있는 문자열(`’’`)과 `null`, `NaN`, `undefined`, `0` 은 `false` 로 간주된다.

  `Boolean` 객체의 `true` , `false` 값을 원시 `boolean` 값과 혼동하면 안된다. 값이 `undefined`, `null` 이 아닌 모든 객체는 `true` 로 계산된다. 따라서 `false`로 초기화되어도 `Boolean` 객체는 `true`이다.

  ```jsx
  var x = false;
  if (x) {
    // 조건이 거짓이므로 실행되지 않음
  }
  var x = new Boolean(false);
  if (x) {
    // 조건이 참이므로 실행됨
  }
  ```

- `undefined`  
  undefined 타입의 값은 `undefined` 가 유일하다. 선언 이후 값을 할당하지 않은 변수는 `undefined` 값을 가진다.

  선언은 되었지만 값을 할당하지 않은 변수에 접근하거나 존재하지 않는 객체 프로퍼티에 접근할 경우 undefined가 반환된다. 이는 변수 선언에 의해 확보된 메모리 공간을 처음 할당이 이루어질 때까지 내버려두지 않고 자바스크립트 엔진이 undefined로 초기화하기 때문이다.

  변수에 값이 없다는 것을 명시하고 싶은 경우에는 `undefined`가 아니라 `null`을 할당해야 한다.

- `null`  
  null 타입의 값은 `null` 이 유일하다. 자바스크립트는 대소문자를 구별(case-sensitive)하므로 null은 Null, NULL 등과 다르다.

  `null` 은 의도적으로 변수에 값이 없다는 것을 명시할 때 사용한다. 이는 **변수가 기억하는 메모리 주소의 참조 정보를 제거**하는 것을 의미하며, 참조되지 않는 메모리 영역은 가비지 콜렉터에 의해 제거된다.

  또는 함수가 호출되었으나 유효한 값을 반환할 수 없는 경우 명시적으로 null을 반환하기도 한다.

  ```jsx
  var element = document.querySelector(".myElem");
  // HTML 문서에 해당 요소가 없다면
  console.log(element); // null
  ```

  `typeof` 연산자로 null 값을 연산해보면 null이 아닌 object가 나온다. 따라서 **null 타입을 확인할 때는 일치 연산자(===)를 사용**해야 한다.

- `symbol`
  심볼은 ES6에서 추가된 7번째 타입으로 변경 불가능한 원시 타입 값이다. 심볼은 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키(property key)를 만들기 위해 사용한다.

  심볼은 Symbol 함수를 호출해 생성한다. 이때 생성된 심볼 값은 다른 심볼 값들과 다른 유일한 심볼 값이다.

  ```jsx
  var key = Symbol("key");

  var obj = {};
  obj[key] = "value";
  console.log(obj[key]); // value
  ```

### 2.2 객체/참조 타입 (object/reference type)

객체는 데이터와 그 데이터에 관련한 동작을 모두 포함할 수 있는 개념적 존재이다. 즉, 프로퍼티(property)와 메소드(method)를 포함할 수 있는 독립적 주체이다.

자바스크립트는 객체(object) 기반의 스크립트 언어로서 자바스크립트를 이루고 있는 **거의 모든 것이 객체**이다. 원시 타입을 제외한 나머지 값들(배열, 함수, 정규표현식 등)은 모두 객체 타입이다.

객체 타입의 값은 **pass-by-reference(참조에 의한 전달)** 방식으로 전달된다.

원시 타입과 가장 큰 차이점은 **변수의 크기가 동적으로 변한다는 것**이다.

객체의 데이터 자체는 별도의 메모리 공간(heap)에 저장되며, 변수에 할당 시 데이터에 대한 주소(힙 메모리 주소 값)가 저장되기 때문에 자바스크립트 엔진이 변수가 가지고 있는 메모리 주소를 이용해서 변수에 값에 접근한다.

## 3. 원시/객체 타입 데이터의 저장과 참조

**💡 원시 타입은 콜스택에 저장되고, 객체 타입은 메모리 힙에 저장된다.**

![Untitled](https://blog.kakaocdn.net/dn/kF7gU/btq1Xlwhaaz/MAR4LAk3Tbj254Lp0fZK9k/img.png)

### 3.1 원시 타입 변수 데이터

1. 원시 타입 변수 생성

   ![Untitled](https://blog.kakaocdn.net/dn/4vFmN/btq128vr2np/fPicalzn5hKOmAtmmbstb0/img.png)

   원시 타입의 데이터 값은 콜스택에 저장되고, 데이터 값이 저장된 콜스택의 주소값은 변수 a, b에 각각 저장된다. (변수 a, b 식별자 자체는 실행 컨텍스트의 렉시컬 환경에 저장)

2. 원시 타입 재할당

   1. Case 1

      ![Untitled](https://blog.kakaocdn.net/dn/d9uqHj/btq13AFhNgh/janHYKlsIlOPOtuF65DOS1/img.png)

      변수 a에 20을 재할당하면 메모리 값을 변경하는 것이 아니라, 기존에 20을 저장하고 있는 메모리의 주소 값으로 교체한다.

      즉, a에 저장된 주소값 == b에 저장된 주소값

   2. Case 2

      ![Untitled](https://blog.kakaocdn.net/dn/NEpV4/btq127iXj4k/K6R4OyGRknUe7fGj2xnHeK/img.png)

      변수 b에 30을 재할당하면, 변수 b가 가리키는 메모리에 저장된 값을 바꾸는 것이 아니라 새로운 메모리에 30을 저장하고 변수 b에 저장된 주소값을 해당 주소값으로 교체한다.

3. 가비지 컬렉터
   더이상 참조되지 않는 데이터는 가비지 컬렉터(garbage collector)에 의해 적절한 시점에 메모리에서 자동으로 해제된다.

### 3.2 객체 타입 변수 데이터

1. 객체 타입 변수 생성

   ![Untitled](https://blog.kakaocdn.net/dn/czfA3r/btq11AsofeV/dDpZVC5zgThkkr9Y06knQK/img.png)

   배열과 같은 객체 타입 데이터는 메모리 힙에 저장된다. 메모리 힙의 주소값은 콜 스택에 저장되고, a와 b에는 해당 콜 스택의 주소값이 각각 저장된다.

2. 객체 타입 데이터 값 변경

   ![Untitled](https://blog.kakaocdn.net/dn/kE7Bh/btq11ztu4Pn/rCm9mPHKh1XCKaxVXDbemk/img.png)

   메모리 힙에 저장된 배열의 값을 변경하더라도 메모리 힙의 주소는 그대로이므로 콜 스택에 저장된 메모리 힙의 주소는 변경되지 않는다. 변수 a, b 입장에선 사실상 변한 게 없는 것이다. 따라서 재할당이 필요 없는 경우 객체 타입은 `const` 로 선언하는 것이 좋다.

3. 객체 타입 재할당

   ![img](https://blog.kakaocdn.net/dn/dvN7ow/btq10KvvJLJ/FGgTfds2Kfvg7Pw3NFbeOk/img.png)

   let으로 선언된 b에 다른 배열을 할당하면 메모리 힙에 새로운 주소가 확보되고, 새로운 배열이 저장된다.

   콜스택에 저장되는 메모리 힙의 주소값도 새로운 주소로 변경이 필요한데, 이때 기존 저장되어 있던 주소값을 바꾸는 게 아니라 새로운 메모리를 확보해서 새로운 메모리 힙의 주소값을 저장한다.

   따라서 변수 b에 저장되는 콜스택 주소값도 변경된다.

   💡 **객체 타입은 동일한 구성의 객체를 생성하더라도 매번 새 메모리를 확보하여 새 객체를 생성한다.**

## 5/24 스터디 내용 추가

- 자바스크립트에서는 `var`, `let`, `const` 로 변수를 선언하므로 변수가 타입을 갖는 것이 아니라 **값이 타입을 가진다.**

- falsy  
  falsy 란 '거짓 같은 값'을 말한다. 즉, `boolean` 문맥에서 `false`로 평가되는 값이다.

  - `false`
  - `0`
  - `-0`
  - `0n`
  - `''`
  - `null`
  - `undefined`
  - `NaN`

  위의 값들을 제외한 다른 값은 모두 `true`로 평가된다.  
   \* 빈 배열(`[]`)은 `true`이다.

- `null` 타입 파악 방법

  ```js
  // 정확한 null 타입 파악 방법
  let a = null;
  if (!a && typeof a === "object") {
    console.log(true);
  } else {
    console.log(false);
  } // true
  ```

  `null`은 falsy 값이면서 `object` 타입이다.

- 값이 없는 vs 선언되지 않은  
  값이 없는 변수의 값은 `undefined`이며, `typeof` 결과는 `'undefined'`이다.
  'undefined'(값이 없는)과 'undefined'(선언되지 않은)는 자바스크립트에서 완전히 다른 개념이다.

  - 'undefined'(값이 없는) : 접근 가능한 스코프에 변수가 선언되었으나 현재 아무런 값도 할당되지 않은 상태

  - 'undefined'(선언되지 않은) : 접근 가능한 스코프에 변수 자체가 선언조차 되지 않은 상태

  ```js
  var a;

  a; //undefined
  b; // ReferenceError: b is undefined]

  typeof a; // 'undefined'
  typeof b; // 'undefined'
  ```

  선언조차 하지 않은 변수 b를 `typeof` 해도 브라우저는 오류 처리를 하지 않고 'undefined'로 나온다. 이것이 `typeof`만의 독특한 안전가드이다.

- `function`은 일급 객체이다.

  - 일급 객체의 조건
    1. 변수에 저장할 수 있어야 한다.
    2. 함수의 파라미터로 전달할 수 있어야 한다.
    3. 함수의 반환값으로 사용할 수 있어야 한다.
    4. 자료구조에 저장할 수 있어야 한다.
