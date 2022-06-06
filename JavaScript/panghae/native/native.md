## JavaScript Native

- 시작하기 전에..
  - Property란?
    해당 Object의 특징이다. Property는 보통 데이터 구조와 연관된 속성을 얘기한다.
  - Property의 종류
    1. Instance Property - 특정 object instance의 특정한 데이터를 가지고 있다.
    2. Static Propery - 모든 object instance들에게 공유되는 데이터를 가지고 있다.
  - Property의 구성
    Property는 이름(Symbol or string)과 값(primitive, method, object reference)를 가지고 있다.
  - Property & Method
    ```jsx
    let person = {
      name: "Jason",
      age: 25,
      occupation: "Student",
      getPersonProfile:
        function () {
          return (
            "Name : " +
            this.name +
            "\nAge : " +
            this.age +
            "\nOccupation : " +
            this.occupation
          );
        },
    };
    ```
    위 코드에서 person의 데이터를 저장하는 name, age, occupation은 property로 판단된다. getPersonProfile은 property이자 method라고할 수 있다.
    > 프로퍼티는 object를 위해서 데이터를 저장한다.
    > 메소드는 object가 요청 받을 수 있는 액션이다.
- JavaScript에서 가장 많이 쓰는 Native
  - String()
  - Number()
  - Boolean()
  - Object()
  - Function()
  - RegExp()
  - Date()
  - Error()
  - Symbol()
- Native와 Primitive 타입의 차이?
  ```jsx
  let a = new String("wow");
  console.log(a); //String {"w","o","w"}
  console.log(typeof a); // Object
  console.log(a.toString()); // wow
  console.log(
    typeof a.toString()
  ); // string
  ```
  실제로 생성되는 결과물에 차이가 존재한다. `new String(”wow”)`의 결과는 원시값 `“wow”`를 감싼 객체 래퍼다.

### 내부 [[Class]]

typeof가 ‘object’인 값에는 [[Class]]라는 내부 프로퍼티가 추가로 붙는다.

모든 원시값에도 내부 [[Class]]가 있는가?

```jsx
console.log(
  Object.prototype.toString.call(
    null
  )
); // [object Null]

console.log(
  Object.prototype.toString.call(
    undefined
  )
); // [object Undefined]

console.log(
  Object.prototype.toString.call(
    "wow"
  )
); // [object String]

console.log(
  Object.prototype.toString.call(
    42
  )
); // [object Number]

console.log(
  Object.prototype.toString.call(
    true
  )
); // [object Boolean]
```

Null(), Undefined()와 같이 네이티브 생성자는 없지만 내부 [[Class]]를 살펴보면 Null, Undefined로 출력된다. 이외의 문자열, 숫자,불리언과 같은 단순 원시값은 Boxing이라는 과정을 거친다. → 내부 [[Class]]가 String, Number, Boolean으로 출력되기 때문이다.

### 래퍼 박싱하기

원시값에 프로퍼티나 메소드가 존재하지 않는다. 그렇기 때문에 .length, .toString과 같은 프로퍼티에 접근하려면 원시값을 객체 래퍼로 감싸줘야 한다. 이 과정을 자동으로 자바스크립트에서 해준다.
→ 명시적으로 하지 않는 것은 브라우저가 스스로 최적화하기 때문에 직접 선 최적화할 시, 프로그램이 느려질 수 있다.

- 주의할 점
  ```jsx
  let a = new Boolean(false);

  if (a) {
    console.log("im true!");
  } else {
    console.log("im false!");
  }
  // im true!
  ```
  a에 Boolean으로 false 값을 수동 박싱 했는데 실행은 true로 실행되었다. 이는 객체가 truthy한 값이기 때문이다.

### 언박싱

객체 래퍼의 원시 값은 `valueOf()` 메소드로 추출한다.

```jsx
let a = new String("hello");

console.log(a.valueOf()); // hello
```

valueOf로 수동 언박싱 하는 방법 말고도 암시적인 언박싱 방법도 있다.

```jsx
console.log(a); // String{"hello"}
console.log(a + ""); // hello
```

### 네이티브는 생성자

배열, 객체, 함수, 정규식 값은 리터럴 형태로 생성하는 것이 일반적인데, 리터럴은 생성자 형식으로 만든 것과 동일한 종류의 객체를 생성한다. → 래핑 되지 않는 값은 없다.

- Array
  ```jsx
  let a = new Array(1, 2, 3);
  let b = Array(1, 2, 3);
  let c = [1, 2, 3];

  console.log(a); // [1,2,3]
  console.log(b); // [1,2,3]
  console.log(c); // [1,2,3]
  ```
  `Array()` 는 생성자 앞에 `new`를 붙이지 않아도 붙인 것처럼 동작한다.
  - Array 생성자에는 배열의 크리를 미리 정하는 특별한 기능을 가지고 있다.
    ```jsx
    let a = Array(3);
    let b = [
      undefined,
      undefined,
      undefined,
    ];
    console.log(a); // [empty * 3]
    console.log(b); // [undefined * 3]

    console.log(a.join("-"));
    console.log(b.join("-"));

    console.log(
      a.map(
        (value, index) => {
          return index;
        }
      )
    ); // [empty * 3]

    console.log(
      b.map(
        (value, index) => {
          return index;
        }
      )
    ); // [0,1,2]
    ```
    위와 같이 함수 작동 로직에 따라 생각하는대로 작동하는 함수도 있고 그렇지 않은 함수도 있다. 그러나 빈 배열을 사용하는 것은 어떤 경우에도 바람직하지 않다.
- Object(), Function(), RegExp()
  - Object - 거의 사용할 일이 없다.(리터럴 형태로 한 번에 여래 프로퍼티 지정이 가능하기 때문)
  - Function - 함수의 인자나 내용을 동적으로 정의 해야하는, 매우 드문 경우에 한해 유용하다.
  - RegExp - 리터럴 형식으로 사용하는 것이 권장된다. 구문이 쉽고, 자바스크립트 엔진이 실행 전에 정규 표현식을 미리 컴파일한 후 캐시 해놓기 때문에 성능상에 이점이 있다. 패턴을 동적으로 정의하는 경우에 생성자를 사용한다.
- Date(), Error()
  `Date()`와 `Error()`는 리터럴 형식이 없기 때문에 다른 네이티브들에 비해 유용하게 사용된다.
  - Date
    `new Date()`로 생성하며 날짜/시각을 인자로 받는다. default는 현재 시간/날짜를 받는다.
    ```jsx
    let b = new Date();
    console.log(b);
    // Mon Jun 06 2022 18:32:14 GMT+0900 (Eastern Indonesia Time)

    console.log(b.getTime()); // 1654508715275
    console.log(Date.now()); // 1654508715275
    ```
    `getTime()` 메소드는 유닉스 타임스탬프 값을 얻는 용도로 많이 사용된다. 또 다른 방법으로 `Date.now()` 메소드를 사용할 수 있다.
  - Error
    `Error()` 생성자는 new가 없어도 결과가 같다.
    error 객체는 현재의 `실행 컨텍스트`를 포착하여 객체에 담는다. → 디버깅에 도움될 만한 요소들을 담고 있다.
    throw 연산자와 함께 사용한다.
    ```jsx
    function errorMan(x) {
      if (!x) {
        console.log(
          "no error"
        );
      } else {
        throw Error(
          "im so error man"
        );
      }
    }

    errorMan("plz no error");
    // Uncaught Error: im so error man
    // at errorMan (index.js:81:11)
    // at index.js:87:1
    ```
- Symbol()
  - Symbol이란?
    Symbol은 충돌 염려 없이 객체 프로퍼티로 사용 가능한, 특별한 ‘고유 값’이다. Symbol은 객체가 아닌 스칼라 원시 값이다!
    Symbol 정의에는 직접 정의할 땐, `Symbol()` 네이티브를 사용한다. new를 붙일 시에는 error가 발생한다.
    ```jsx
    console.log(Symbol("a")); // Symbol(a)
    console.log(
      new Symbol("a")
    );
    // TypeError :  Symbol is not a constructor
    ```
- Native Prototype
  내장 네이티브 생성자들은 각자의 `.prototype` 을 가진다. prototype 객체에는 해당 객체의 하위 타입별로 고유한 로직이 담겨 있다. → 프로토타입은 디폴트이다! 예시로 Array.prototype : 빈 배열 로 표현된다. 그러나 prototype은 변경하지 않는 것이 바람직하다.
  예시로 문자열 원시 값(박싱해서) 확장한 것까지 포함하여 모든 String 객체는 기본적으로 String.prototype 객체에 정의된 메서드에 접근할 수 있다.
  ```jsx
  String.prototype.charAt
  String.prototype.indexOf
  ...

  Array.prototype.isHaen =
    function (x) {
      return [1, 0, 0];
    };

  let a = [2, 3, 4];
  console.log(a.isHaen()); // [1,0,0]
  ```
