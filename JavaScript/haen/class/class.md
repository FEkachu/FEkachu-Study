# 클래스

자바스크립트는 프로토타입 기반 언어이므로 클래스의 개념이 존재하지 않는다. 그렇지만 프로토타입을 일반적인 의미에서의 클래스 관점에서 접근해보면 비슷하게 해석할 수도 있다.

예를 들어, 생성자 함수 Array를 new 연산자와 함께 호출하면 인스턴스가 생성된다. 이때 Array를 일종의 클래스라고 하면, Array의 prototype 객체 내부 요소들이 인스턴스에 상속된다고 볼 수 있다.

(엄밀히는 상속이 아닌 프로토타입 체이닝에 의한 참조)

한편 Array 내부 프로퍼티들 중 prototype 프로퍼티를 제외한 나머지는 인스턴스에 상속되지 않는다.

인스턴스에 상속되는지 (인스턴스가 참조하는지) 여부에 따라 `static member`와 `instance member`로 나뉜다. 자바스크립트에서는 인스턴스에서도 직접 메서드를 정의할 수 있기 때문에 '인스턴스 메서드'라는 명칭은 혼란스러움을 야기할 수 있다. (프로토타입에 정의한 메서드를 지칭하는 건지, 인스턴스에 정의한 메서드를 지칭하는 건지 등) 따라서 위 명칭 대신에 '프로토타입 메서드'라고 부르는 편이 더 좋을 수 있다.

예시

- static method, prototype method

    ```jsx
    	// 생성자
    var Rectangle = function (width, height) {
      this.width = width;
      this.height = height;
    };
    
    // prototype method
    Rectangle.prototype.getArea = function () {
      return this.width * this.height;
    };
    
    // static method
    Rectangle.isRectangle = function (instance) {
      return instance instanceof Rectangle && instance.width > 0 && instance.height > 0;
    };
    
    var rect1 = new Rectangle(3, 4);
    
    console.log(rect1.getArea());  // 12
    console.log(rect1.isRectangle(rect1));  // error
    console.log(Rectangle.isRectangle(rect1));  // true
    
    ```


프로토타입 객체에 할당한 메서드는 인스턴스가 마치 자신의 것처럼 호출할 수 있다. 따라서 `rect1.getArea()`은 `Rectangle.prototype.getArea`을 실행시킨다. 이처럼 **인스턴스에서 직접 호출할 수 있는 메서드가 프로토타입 메서드**이다.

이와 다르게 `rect1.isRectangle(rect1)`은 접근이 불가능하여 에러를 발생시킨다. 이처럼 **인스턴스에서 직접 접근할 수 없는 메서드가 스태틱 메서드**이다. 스태틱 메서드는 `Rectangle.isRectangle(rect1)`처럼 생성자 함수를 this로 지정해야만 호출할 수 있다.

---

# 2. 클래스 상속

: 클래스 상속은 객체지향에서 가장 중요한 요소 중 하나이다. 때문에 ES5까지의 자바스크립트 커뮤니티에서는 클래스 상속을 다른 객체지향 언어에 익숙한 개발자들에게 최대한 친숙한 형태로 흉내 내는 것이 주요한 관심사였으며 다중 프로토타입 체인으로 구현하였다. ES6에서는 클래스 문법이 도입되었지만 일단 클래스 문법을 사용하지 않고 구현해보자.

예시

```jsx
// Grade 생성자 함수 및 인스턴스

var Grade = function () {
  var args = Array.prototype.slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
  this.length = args.length;
};

Grade.prototype = [];
var g = new Grade(100, 80);
```

자바스크립트에서 클래스 상속을 구현했다는 것은 결국 프로토타입 체이닝을 잘 연결한 것과 같다. 다만, 아무리 체이닝을 잘 연결했다고 하더라도 세부적으로 완벽하게 superclass와 subclass의 구현이 이뤄진 것은 아니다.

예를 들면 다음 나올 예시(length 프로퍼티가 삭제 가능 하다는 점)와, Grade.prototype에 빈 배열을 참조시켰다는 점이 큰 문제이다.

예시

length 프로퍼티를 삭제한 경우

```jsx
...

g.push(90);
console.log(g);
/* Array {
  '0': 100,
  '1': 80,
  '2': 90,
  length: 3,
  __proto__: { length: 3 }
} */

delete g.length;
g.push(70);
console.log(g);
/* Array {
  '0': 70,
  '1': 80,
  '2': 90,
  length: 1,
  __proto__: { length: 1 }
} */
```

length 프로퍼티를 삭제하고 다시 push를 하니, push한 값이 0번째 인덱스에 들어가고 length는 1이 되었다.

내장객체인 배열 인스턴스의 length 프로퍼티는 configurable 속성이 false라서 삭제가 불가능한 반면, Grade 클래스의 인스턴스는 배열 메서드를 상속하지만 기본적으로 일반 객체의 성질을 그대로 지니기에 삭제가 가능해서 문제가 된다.

따라서 length 값을 삭제한 후에 `g.__proto__` 즉 `Grade.prototype`이 빈 배열을 가리키고 있기 때문에 자바스크립트가 push 명령에 의해 g.length를 읽고자 했을 때 g.length가 없었고, 자바스크립트는 프로토타입 체이닝을 타고`g.__proto__.length`를 읽어왔다.

이처럼 ES5까지의 클래스 상속 구현은 문제가 발생할 여지가 있었고, 이에 ES6에서는 본격적으로 클래스 문법이 도입되었다.

---

## 3. ES6의 클래스 및 클래스 상속

ES6에서는 본격적으로 클래스 문법이 도입되었다.

```jsx
var ES5 = function(name) {
  console.log(name)  // 'es5'
  this.name = name;
};

ES5.staticMethod = function () {
  console.log(this.name)  // 'ES5'
  return this.name + ' staticMethod';
};

ES5.prototype.method = function () {
  return this.name + ' method';
};

var es5Instance = new ES5('es5');
console.log(ES5.staticMethod());  // 'ES5 staticMethod'
console.log(es5Instance.method());  // 'es5 method'

------------------------------------------------

var ES6 = class {
  constuctor (name) {
    this.name = name;
  }

  static staticMethod () {
    console.log(this.name);  // 'ES6'
    return this.name + ' staticMethod';
  }

  method () {
    console.log(this.name);  // undefined
    return this.name + ' method';
  }
};

var es6Instance = new ES6('es6');
console.log(ES6.staticMethod());  // 'ES6 staticMethod'
console.log(es6Instance.method());  // 'undefined method'

```

ES6의 constructor는 ES5에서의 생성자 함수와 동일한 역할을 수행한다.

static 키워드는 해당 메서드가 static 메서드임을 알리는 내용으로, 생성자 함수(클래스) 자신만이 호출할 수 있다.

method는 자동으로 prototype 객체 내부에 할당되는 메서드이다. 인스턴스가 프로토타입 체이닝을 통해 마치 자신의 것처럼 호출할 수 있는 메서드이다.

### 클래스 상속

예시

```jsx
var Rectangle = class {
  constructor (width, height) {
    this.width = width;
    this.height = height;
  }

  getArea () {
    return this.width * this.height;
  }
};

var Square = class extends Rectangle {
  constructor (width) {
    super (width, width);
  }

 getArea () {
    console.log('Size is : ' + super.getArea());
  }
};

const square = new Square(5);
square.getArea();  // 'Size is : 25'
```

Square를 Rectangle 클래스를 상속받는 하위클래스로 만들기 위해 class 명령어 뒤에 단순히 'extends Rectagle'이라는 내용을 추가하여 상속 관계를 설정했다.

하위 클래스 내부에서 super 키워드는 함수처럼 사용되며, super는 Superclass의 constuctor를 실행한다.

constructor 메서드를 제외한 다른 메서드에서는 super 키워드를 마치 객체처럼 사용할 수 있고 이때 super는 SuperClass.prototype을 바라보는데, 호출한 메서드의 this는 'super'가 아닌 원래(SuperClass)의 this를 그대로 따른다.

---

## 클래스 상속구조의 붕괴

코드 재사용을 목적으로 **상부 클래스 계통이 지나치게 많은 책임과 기능을 부여하게되면 미래의 변화에 대응할 유연성을 잃게 됩니다.** 변화에 대응하려면 전체 클래스 계통의 영향도를 고려해야하는데 이는 굉장히 고통스러운 작업입니다.

만약 행위(기능)들이 클래스 계통에서 분리되어 있다면 어떨까요? 새로운 행위가 추가되고 수정되야 할 때 전체 클래스 계통을 살펴볼 필요가 없어집니다.

## 행위의 분리 - 믹스인(Mixins)

필요한 행위를 클래스 계통과 상관없이 독립된 클래스로부터 얻어와 행위를 탑재할 수 있다면 훨씬 유연한 코드 재사용 패턴이 됩니다. 소프트웨어 업계의 경험많은 선배들은 비슷한 문제를 이미 경험했고 후배 세대들을 위해 해결책을 남겨놓았습니다. 그들은 이를 **믹스인(Mixins)** 이라 불렀습니다.

믹스인은 **특정 기능(행위)만을 담당하는 클래스**로, 단독 사용(Stand-alone use)이 아닌 다른 클래스에 탑재되어 사용될 목적으로 작성된 **(조각) 클래스**를 의미합니다.

믹스인 클래스를 다른 클래스에 담는 방법은 프로그래밍 언어별로 다양합니다. 컴파일 언어와 인터프리터 언어는 믹스인 적용방식에 있어서 구조적으로 큰 차이를 보입니다. 같은 언어라 할지라도 사용하는 객체와 선호하는 구문에 따라 다양한 기법이 만들어지게 됩니다. 자바스크립트의 경우, **클래스 문법**을 이용할 수도 있고, 기존 **prototype** 기반 모델을 이용할 수도 있으며, **Object.assign** 를 이용해 객체에 직접 행위를 붙이는 작업을 할 수도 있습니다.

---

### Class는 syntactic sugar, 그럼에도 쓰는 이유는⁉️

- 기존 class 기반 프로그래밍을 사용하던 사람들의 유입을 증가시킬 수 있음
- 프로토타입 기반 언어가 클래스 기반 언어보다 널리 퍼지지 못해서(아직까지 우세한 클래스 기반 언어 때문)

---

### 클래스기반의 상속과 자바스크립트 기반의 상속의 차이

### 클래스 상속

- 클래스
    - 설계도 - 생성된 object에 관한 설명

  > **“Classes inherit from classes and 
  create subclass relationships
  : hierarchical class taxonomies.”**
  >
    - 클래스는 클래스로부터 상속되고 하위클래스 관계(즉, 계층적 클래스 분류법)를 만든다

- 인스턴스
    - new 키워드와 함께 생성자 함수를 통해서 인스턴스화 된다

자바에서와 같은 클래스는 JS에서는 기술적으로 존재하지 않는다.

### 자바스크립트의 상속

자바스크립트에서 클래스 상속은 프로토타입 상속위에 구현되지만 같은 동작을 하는 것은 아니다.

: 자바스크립트의 클래스 상속은 프로토 타입 체인을 이용한다.(기능/속성 위임을 위해 자신의 Constructor.prototype과 부모의 자신의 Constructor.prototype(- 일반적으로 super()이라고 불림)을 연결)

이러한 단계는 단일 부모/자녀 계층 구조를 형성하며 OO 설계에서 사용할 수 있는 가장 긴밀한 결합을 형성한다.

> **Prototypal Inheritance:** ***A prototype is a working object instance.*** Objects inherit directly from other objects.
>
- 프로토타입 상속 : 프로토타입의 동작 대상은 인스턴스이다. object는 직접적으로 다른 object로부터 상속된다.

인스턴스는 많은 다른 객체들로부터 구성될수 있고, 이는 선택적인 상속과 [[Prototype]]위임 계층이 가능하게 하였다. 즉, 클래스 분류는 프로토타입 적 OO의 자동적으로 생긴 부수적 효과가 아니다.(이는 가장 중요한 차이점이다)

인스턴스는 전형적으로 생성자함수, 객체 리터럴, Object.create()를 통해 인스턴스화 된다.

### 그렇다면 클래스에서 무엇이 문제인가?

: 상속은 근본적으로 매커니즘을 재사용을 하기위한 코드이다. 서로 다른 종류의 object끼리 코드를 공유하는 방법이기도 하다. 이러한 방식은 클래스가 잘못되었다면 이를 통해 생성되는 클래스도 오류를 가지고 있기 때문에다.

클래스 상속은 부수적으로 부모/자식 객체 분류가 생성된다.

이러한 분류법은 모든 새로운 사용 사례에 대해 올바른 선택을 하는 것은 사실상 불가능하며, 기본 클래스를 광범위하게 사용하면 새로운 클래스에 대한 다양성이 떨어지는 문제로 이어지며, 이는 잘못 이해했을 때 수정하기 어렵게 만든다. 실제로, 클래스 상속은 OO 설계에서 잘 알려진 많은 문제를 야기한다.

이러한 문제들을 해결하는 방법은 클래스 상속보자는 객체 구성을 선호하는 것이다.

### 모든 상속은 안좋은 것일까?

사람들이 대부부분 상속에 대해 얘기할때 상속 앞에 클래스 라는 말을 생략하기에 모든 상속이 안좋은 것 처럼 들이나 그렇지 않다.

실제로는 여러종류의 상속이 존재하고, 대부분은 여러 요소를 가진 개체에서 개체를 구성하는 데 적합하다.

- 디슈가링(Desugaring)
- 한국말로 직역하면 “무설탕” 혹은 “설탕은 빼주세요” 정도가 되는 디슈가링은 프로그래밍 언어의 새로운 기능을 기존에 알고 있는 다른 기능으로 풀어서 해석하는 방법 (또한 실제로 컴파일러 작성 시 새로운 기능을 기존 기능의 조합으로 구현하는 방식)

### Reference

[자바스크립트 Class 와 편의문법, 그리고 믹스인(Mixins) 기법](https://velog.io/@moggy/Javascript-%EB%AF%B9%EC%8A%A4%EC%9D%B8-%EA%B8%B0%EB%B2%95Mixin-technique)

[Master the JavaScript Interview: What's the Difference Between Class & Prototypal Inheritance?](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)