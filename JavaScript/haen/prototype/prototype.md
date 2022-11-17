# 프로토타입

자바스크립트는 프로토타입 기반 언어이다. 클래스 기반 언어에서는 '상속'을 사용하지만 프로토타입 기반 언어에서는 **어떤 객체를 원형으로 삼고 이를 복제(참조)함**으로써 상속과 비슷한 효과를 얻는다.

## 프로토타입의 개념과 이해

### constructor, prototype, instance

```jsx
let instance = new Constructor
```

![https://velog.velcdn.com/images%2Fhyounglee%2Fpost%2Fc3a4c65b-6071-4805-9fb5-99fb7dba9d80%2Fimage.png](https://velog.velcdn.com/images%2Fhyounglee%2Fpost%2Fc3a4c65b-6071-4805-9fb5-99fb7dba9d80%2Fimage.png)

- 어떤 생성자 함수(Constructor)를 `new` 연산자와 함께 호출하면
- Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스가 생성된다.
- 이때 instance에는 `__proto__` 라는 프로퍼티가 자동을 부여되는데
- 이 프로퍼티는 Constructor의 prototype라는 프로퍼티를 참조한다.

prototype와 이를 참조하는 `__proto__`는 모두 **객체**이다. prototype 객체 내부에는 인스턴스가 사용할 메서드를 저장한다.

Person이라는 생성자 함수의 prototype에 getName이라는 메서드를 지정했다.

```jsx
let Person = function(name) {
  this.name = name;
};
Person.prototype.getName = function() {
  return this.name;
};
```

아래와 같이 Person의 인스턴스는 proto 프로퍼티로 getName을 호출할 수 있다. `undefined`가 출력되는 이유는 함수를 메서드로서 호출하면 바로 앞의 객체가 곧 `this`가 되기 때문이다. 즉, 아래 코드에서 `suzi.__proto__.getName()` 은 `this.name`을 반환하는데 this에 suzi가 아닌 __proto__가 할당되고,

`__proto__` 객체에는 name 프로터티가 없기 때문에 `undefined`가 반환된다.

```jsx
let suzi = new Person('Suzi');
suzi.__proto__.getName(); // undefined

Person.prototype === suzi.__proto__ // true
```

this를 인스턴스로 사용하고 싶다면 `__proto__`를 생략하면 된다. 원래부터 생략 가능하도록 정의되어있다. 이런 점 때문에 **생성자 함수의 prototype에 어떤 메서드나 프로퍼티가 있다면 인스턴스에서도 마치 자신의 것처럼 해당 메서드나 프로퍼티에 접근할 수 있게 된다.**

```jsx
suzi.__proto__.getName
=> suzi(.__proto__).getName
=> suzi.getName
```

한편 prototype 프로퍼티 내부에 있지 않은 메서드들은 인스턴스가 직접 호출할 수 없기 때문에 생성자 함수에서 직접 접근해야 실행이 가능하다.

### constructor 프로퍼티

생성자 함수의 프로퍼티인 Prototype 내부에는 consturctor라는 프로퍼티가 있다. 인스턴스의 `__proto__` 객체에도 마찬가지이다. 원래의 **생성자 함수(자기 자신)을 참조**하는데, 인스턴스로부터 그 원형을 알 수 있는 수단이기 때문이다.

```jsx
let arr = [1, 2];
Array.prototype.constructor == Array // true
arr.__proto__.constructor == Array // true
arr.constructor == Array // true

let arr2 = new arr.constructor(3, 4);
console.log(arr2); // [3, 4]
```

constructor는 읽기 전용 속성(기본형 리터럴 변수 - number, string, boolean)이 부여된 예외적인 경우를 제외하고는 값을 바꿀 수 있다.

```jsx
let NewConstructor = function() {
  console.log('this is new constructor!');
};
let dataTypes = [
  1, // Number & false
  'test', // String & false
  true, // Boolean & false
  {}, // NewConstructor & false
  [], // NewConstructor & false
  function () {}, // NewConstructor & false
  /test/, // NewConstructor & false
  new Number(), // NewConstructor & false
  new String(), // NewConstructor & false
  new Boolean, // NewConstructor & false
  new Object(), // NewConstructor & false
  new Array(), // NewConstructor & false
  new Function(), // NewConstructor & false
  new RegExp(), // NewConstructor & false
  new Date(), // NewConstructor & false
  new Error() // NewConstructor & false
];

dataTypes.forEach(function(d) {
  d.constructor = NewConstructor;
  console.log(d.constructor.name, '&', d instanceof NewConstructor);
});
```

모든 데이터가 `d instanceof NewConstructor` 명령어에 대해 false를 반환하는데, constructor를 변경하더라도 참조하는 대상이 변경될 뿐 **이미 만들어진 인스턴스의 원형이 바뀐다거나 데이터 타입이 변하는 것은 아님**을 알 수 있다. 어떤 인스턴스의 생성자 정보를 알아내기 위해 constructor 프로퍼티에 의존하는 것이 항상 안전하지는 않다는 것을 알 수 있다.

정리

다음 각 줄은 모두 동일한 대상을 가르킨다.

```jsx
[Constructor]
[instance].__proto__.constructor
[instance].constructor
Object.getPrototypeOf([instance]).constructor
[Constructor].prototype.constructor
```

다음 각 줄은 모두 동일한 객체에 접근할 수 있다.

```jsx
[constructor].prototype
[instance].__proto__
[instance]
Object.getPrototypeOf([instance])
```

## 프로토타입 체인

### 메서드 오버라이드

인스턴스가 동일한 이름의 프로퍼티나 메소드를 가지게 되면 **메소드 오버라이드**가 일어난다.

```jsx
let Person = function(name) {
  this.name = name;
};
Person.prototype.getName = function() {
  return this.name;
};

let iu = new Person('지금');
iu.getName = function() {
  return '바로 ' + this.name;
};
console.log(iu.getName()); // 바로 지금
```

원본이 제거되고 다른 대상으로 교체되는 것이 아니라, 원본이 그대로 있는 상태에서 다른 대상을 그 위에 얹는다고 생각하면 쉽다. 자바스크립트 엔진이 getName 메소드를 찾는 방식은, 가장 가까운 대상인 자신의 프로퍼티를 검색하고, 없으면 다음으로 가까운 대상인 `__proto__`를 검색하는 순서로 진행된다. 즉 순서가 밀리기 때문에 `__proto__` 의 메소드가 노출되지 않는 것이다.

만일 인스턴스를 바라보도록 바꿔주고 싶다면 call 이나 apply를 사용하면 된다.

```jsx
console.log(iu.__proto__.getName.call(iu)); // 지금
```

### 프로토타입 체인

```jsx
console.dir([1, 2]);
```

배열의 내부 구조를 보면 `__proto__` 안에 다시 `__proto__`가 있는 것을 확인할 수 있는데, 이는 prototype 객체가 **객체**이기 때문이다.

![https://velog.velcdn.com/images%2Fhyounglee%2Fpost%2F93a641aa-05b5-433d-9233-2c925082cc12%2Fimage.png](https://velog.velcdn.com/images%2Fhyounglee%2Fpost%2F93a641aa-05b5-433d-9233-2c925082cc12%2Fimage.png)

`__proto__`는 생략이 가능하기 때문에, 배열은 `Array.prototype` 내부의 메서드를 자신의 것처럼 사용할 수 있다. 즉, 객체 메서드로 실행이 가능한 것이다.

```jsx
let arr = [1, 2];
arr(.__proto__).push(3);
arr(.__proto__)(.__proto__).hasOwnProperty(2); // true
```

> 프로토타입 체인 : 어떤 데이터의 __proto__ 프로퍼티 내부에 다시 __proto__ 프로퍼티가 연쇄적으로 이어진 것.
프로토타입 체이닝 : 프로토타입 체인을 따라가며 검색하는 것.
>

메서드 오버라이드와 프로토타입 체이닝 예시

```jsx
let arr = [1, 2];
// arr의 __proto__는 Array의 prototype을 참조
//Array의 prototype또한 객체 이므로 Array.__proto__는 Object.prototype을 참조 
//Array와 Object 둘다 toString을 가지고 있으므로 추후 실행시 결과를 비교하기 위해 출력

Array.prototype.toString.call(arr); // 1, 2
Object.prototype.toString.call(arr); // [object Array]

arr.toString();  // 1, 2 

arr.toString = function() { //메소드 오버라이드
  return this.join('_');
};
arr.toString(); // 1_2
```

### 객체 전용 메소드의 예외사항

어떤 생성자 함수이든 prototype은 반드시 객체이기 때문에 Object.prototype이 언제나 프로토타입 체인의 최상단에 존재한다. 따라서 객체에서만 사용할 메소드는 다른 여느 데이터 타입처럼 프로토타입 객체 안에 정의할 수 없다. 객체에서만 사용할 메서드를 `Objcet.prototype` 내부에 정의한다면 다른 데이터타입도 해당 메서드를 사용할 수 있게 되기 때문이다.

```jsx
Object.prototype.getEntries = function() { //객체에서만 사용할 의도로 만듦
  let res = [];
  for (let prop in this) {
    if (this.hasOwnProperty(prop)) {
      res.push([prop, this[prop]]);
    }
  }
  return res;
};
let data = [
  ['object', { a: 1, b: 2, c: 3 }], //[["a",1], ["b",2],["c",3]]
  ['number', 345], // []
  ['string', 'abc'], //[["0","a"], ["1","b"], ["2","c"]] 
  ['boolean', false], //[]
  ['func', function () {}], //[]
  ['array', [1, 2, 3]]
 // [["0", 1], ["1", 2], ["2", 3]]
  ];
data.forEach(function(datum) {
  console.log(datum[1].getEntries())
}); //프로토타입 체이닝을 통해 다른 데이터 타입에서도 동작
```

의도대로라면 객체가 아닌 다른 데이터타입에 대해서는 오류를 던져야 하는데, 어떤 데이터 타입이건 거의 무조건 프로토타입 체이닝을 통해 `getEntries` 메서드에 접근할 수 있으니 그렇게 동작하지 않는다.

이러한 이유로 객체만을 대상으로 동작하는 메서드들은 **`Object.prototype`이 아닌 Objcet에 스태틱 메서드(static method)로 부여할 수 밖에 없다.** 또한 생성자 함수인 Object와 인스턴스인 객체 리터럴 사이에는 this를 통한 연결이 불가능하기 때문에 여느 전용 메서드처럼 "메서드 명 앞의 대상이 곧 this"가 되는 방식 대신 this의 사용을 포기하고 대상 인스턴스를 인자로 직접 주입해야하는 방식으로 구현돼있다.

같은 이유에서 `Object.prototype`에는 어떤 데이터에서도 활용할 수 있는 범용적인 메서드들만 있다. `toString`, `hasOwnProperty`, `valueOf`, `isPrototypeOf` 등은 변수가 마치 자신의 메서드인 것처럼 호출할 수 있다.

### Object.create

'프로토타입 체인상 가장 마지막에는 언제나 `Object.prototype`이 있다'고 했는데,예외적으로 **`Object.create`**를 이용하면 `Object.prototype`에 접근할 수 없는 경우가 있다. `Object.create(null)`은 `__proto__`가 없는 객체를 생성한다.

```jsx
let _proto = Object.create(null);
_proto.getValue = function(key) {
  return this[key];
};
let obj = Object.create(_proto);
obj.a = 1;
console.log(obj.getValue('a')); // 1
console.dir(obj);
```

`_proto`에는 `__proto__`프로퍼티가 없는 객체를 할당했다.다시 obj는 앞서 만든 `_proto`를 `__proto__`로 하는 객체를 할당했다.obj를 출력해보면, `__proto__`에는 오직 `getValue` 메소드만 존재하며, `__proto__` 및 `constructor` 프로퍼티 등은 보이지 않는다.이 방식으로 만든 객체는 **일반적인 데이터에서 반드시 존재하던 내장 메소드 및 프로퍼티들이 제거됨으로써 기본 기능 제약이 생긴 대신, 객체 자체의 무게가 가벼워짐으로써 성능상 이점**을 가진다.

### 다중 프로토타입 체인

자바스크립트의 기본 내장 데이터 타입들은 모두 프로토타입 체인이 1-2 단계로 끝나는 경우만 있었지만, 사용자가 새롭게 만드는 경우 그 이상도 얼마든지 가능하다. 대각선의 `__proto__`를 연결해 나가기만 하면 무한대로 체인 관계를 만들 수 있는데, 이 방식으로 다른 언어의 **클래스**와 비슷하게 동작하는 구조를 만들 수 있다.

대각선의 `__proto__`를 연결하는 방법은 `__proto__`가 가리키는 대상, 즉 생성자 함수의 prototype이 연결하고자 하는 상위 생성자 함수의 인스턴스를 바라보게끔 해주면 된다.

```jsx
let Grade = function() {
  let args = Array.prototype.slice.call(arguments);
  for(let i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
  this.length = args.length;
};
let g = new Grade(100, 80);
```

변수 g는 Grade의 인스턴스를 바라본다. Grade의 인스턴스는 여러 개의 인자를 받아 각각 순서대로 인덱싱하여 저장하고 length 프로퍼티가 존재하는 등 배열의 형태를 지니지만 배열 메서드를 사용할 수 없는 유사배열객체이다. 이 인스턴스에서 배열 메소드를 직접 쓸 수 있게끔 하고 싶다면 `g.__proto__`, 즉 Grade.prototype이 배열의 인스턴스를 바라보게 하면 된다.

```jsx
Grade.prototype = [];
```

이렇게 g 인스턴스는 프로토타입 체인에 따라 g 객체 자신이 지니는 멤버, Grade의 prototype에 있는 멤버, Array.prototype에 있는 멤버, 끝으로 Object.prototype에 있는 멤버에까지 모두 접근할 수 있게 된다.

```jsx
console.log(g); // Grade(2) [100, 80]
g.pop()
console.log(g) // Grade(1) [100]
g.push(90)
console.log(g) // Grade(2) [100, 90]
```

-