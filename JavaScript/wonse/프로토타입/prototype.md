## 1. 프로토타입이란

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2140e56a-34bf-48ad-91fe-e5cff6431960/Untitled.png)

이 도식을 보고 프로토타입에 대해 정확하지는 않지만 어느 정도의 그림이 그려지기 시작했다. 위 그림은 다음의 코드 내용을 추상화한 그림이다.

```jsx
var instance = new Constructor();
```

그림을 말로 풀어 설명하자면, 어떤 생성자 함수(`Constructor`)를 `new` 연산자와 함께 호출하면 `instance`가 생성되고, 이때 `instance`에는 `__proto__`라는 프로퍼티가 자동으로 부여된다. 이 때 `__proto__` 프로퍼티는 `Constructor`의 `prototype`이라는 프로토타입을 참조한다.

`prototype` 객체 내부에는 인스턴스가 사용할 메서드를 저장한다. 따라서 생성자 함수 호출에 의해 생성된 `instance` 또한 `__proto__` 를 통해 이 메서드들에 접근할 수 있게 되는 것이다.

```jsx
var Person = function (name) {
	this._name = name;
};
Person.prototype.getName = function() {
	return this._name;
}

var suzi = new Person('Suzi');
suzi.__proto__.getName(); // undefined
suzi.getName(); // Suzi
```

이제 Person의 인스턴스가 getName을 호출할 수 있는 과정에 대해 알게 되었다. 위 예시 코드에서 당연하게도 `suzi.__proto__.getName();` 코드를 실행하면 ‘Suzi’ 라는 이름을 얻을 것이라고 예측하고 있었다. 하지만 애석하게도 undefined가 호출되고 말았다. 하지만 일단 에러 없이 실행은 됐다는 점에 주목해야 한다. 어떤 변수를 실행해 undefined가 나왔다는 것은 이 변수가 ‘호출할 수 있는 함수'에 해당한다는 것을 의미한다. 만약 실행할 수 없는, 즉 함수가 아닌 다른 데이터 타입이었다면 TypeError가 발생했을 것이다.

getName 함수 내부를 살펴보면 `this._name` 값을 리턴하고 있다. 그렇다는 것은 혹시 this에 이상한 값이 할당된 것이 아닐까라고 의심해볼 수 있다. 어떤 함수를 메서드로서 호출할 때는 메서드명 바로 앞의 객체가 this가 된다. 그러므로 `suzi.__proto__.getName()` 에서 getName 함수 내부에서의 this는 suzi가 아니라 `suzi.__proto__`라는 객체가 된다. 그리고 **그 객체 내부에는 name 프로퍼티가 없으므로** 찾고자하는 식별자가 정의돼 있지 않을 때 undefined를 반환하게 되는 것이다.

```jsx
var suzi = new Person('Suzi', 28);
suzi.getName(); // Suzi
```

그래서 우리는 이렇게 사용한다. __proto__를 빼면 this는 instance가 된다. 그리고 예외없이 잘 실행되는데 그 이유는 __proto__가 생략 가능한 프로퍼티이기 때문이다. 어 그럼 생략하지 않게 설계됐다면, suzi.__proto__.getName() 이라고 작성해야할 것이고 그럼 계속 undefined를 반환받지 않을까? 하지만 이는 언어를 창시하고 전체 구조를 설계한 브랜든 아이크가 생각한 아이디어로 그냥 그런가보다하고 넘어가야한다. 정리하자면 suiz.getName()으로 호출하더라도 suzi.__proto__에 있는 메서드인 getName을 실행하지만 this는 suzi를 바라보게 할 수 있는 것이다.

<aside>
💡 new 연산자로 Constructor를 호출하면 instance가 만들어지는데, 이 instance의 생략 가능한 프로퍼티인 __proto__는 Constructor의 prototype을 참조한다!

</aside>

## 2. 만약 인스턴스가 prototype 객체가 가지고 있는 프로퍼티 또는 메서드와 동일한 이름의 것을 가지고 있다면?

위의 예시부터 이어서 만약 생성자의 prototype 객체도 getName 메서드를 가지고있고, 인스턴스도 getName 메서드를 가지고 있다면 인스턴스의 메소드로서의 호출로 getName 을 호출했을 때, 누구의 getName이 호출될까? 직관적으로 생각할 수 있듯이 인스턴스의 getName이 호출된다. 인스턴스의 getName 메서드가 __proto__.getName을 덮어버린다. 원본을 제거하고 그 자리를 대체하는 것이 아닌 원본은 그대로 있고 그 위에 얹어서 덮어지는 이미지로 생각하면 정확하다. 그리고 이를 **메서드 오버라이드**라고 한다.

자바스크립트 엔진이 getName이라는 메서드를 찾는 방식은 가장 가까운 대상인 자신의 프로퍼티를 검색하고, 없으면 그 다음으로 가까운 대상인 __proto__를 검색하는 순서로 진행된다.

어쨌든 원본을 교체하는 것이 아닌 덮어 버리는 것이기 때문에 원본은 남아있다. 그렇다는건 원본에 접근할 수 있는 방법도 있다는 것 아닐까? 바로 앞에서 공부했던 call이나 apply 메서드를 통해 해결할 수 있다.

```python
console.log(iu.__proto__.getName.call(iu)); // 지금
```

원래는 this가 prototype을 바라보고 있고 그 prototype에 name이 없기 때문에 getName 메서드를 사용하더라도 undefined 결과가 출력되었지만, call 메서드를 통해 this가 가리키는 대상을 인스턴스로 바꾸어 원하는 결과를 이끌어낼 수 있다.

## 3. 프로토타입 체인이 진짜다

소제목을 이렇게 지은 이유는 프로토타입 체인에 대해 공부하고 속이 뻥 뚫린 느낌을 받았기 때문이다. 왜 나는 진작 공부를 꼼꼼히 하지 않았을까, 왜 현실을 피해다니면서 공부를 했을까… 후회는 되지만 이제 와서 어쩌겠나 이제라도 알아가는 재미에 꼼꼼히 하면 되지.

프로토타입 체인에 대해 알아보기 전에 `console.dir` 을 통해 객체와 배열의 내부 구조에 대해 살펴보도록 한다.

![스크린샷 2022-08-27 오전 1.00.53.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/891be6bc-5bb3-45ea-915a-a7f29b7fb131/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-08-27_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_1.00.53.png)

먼저 객체의 내부 구조이다. 첫 줄은 Object의 인스턴스다를 보여주는 줄이고, 그 다음엔 프로퍼티 a도 보인다. __proto__ 내부를 살펴보면 꽤 익숙한 메서드들이 보이며, constructor는 생성자 함수인 Object를 가리키고 있다. 이번엔 배열의 내부 구조를 살펴보겠다.

![스크린샷 2022-08-27 오전 1.05.58.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4a586830-6f95-44cc-888b-393f8b4aab05/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-08-27_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_1.05.58.png)

![스크린샷 2022-08-27 오전 1.06.08.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91655cfd-d303-4e86-82fe-f3e120ba55ea/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-08-27_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_1.06.08.png)

__proto__ 에 메서드가 너무 많아서 일부는 생략하였다. 배열 리터럴의 __proto__에는 당연하게도 pop, push 등의 익숙한 배열 메서드 및 constructor가 있다. 여기서 특이한 점은 __proto__안에 또 다시 __proto__가 등장한다는 것이다. 또 그리고 그것을 열어보니 위에서 살펴본 객체의 __proto__와 동일한 내용으로 이뤄져 있다. 그 이유는 바로 prototype 객체가 ‘객체'이기 때문이다. 기본적으로 모든 객체의 __proto__에는 Object.prototype이 연결된다. 이를 그림으로 보면 더욱 쉽다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a646dd86-9093-4aac-aab9-4bbaaa1d8ace/Untitled.png)

__proto__는 생략이 가능하다. 그렇기 때문에 배열이 Array.prototype 내부의 메서드를 자신의 것처럼 사용할 수 있었고 마찬가지로 Object.prototype 내부의 메서드도 자신의 것처럼 실행할 수 있는 것이다.

```python
var add = [1, 2];
arr(.__proto__).push(3);
arr(.__proto__).(.__proto__).hasOwnProperty(2); // true
```

이처럼 어떤 데이터의 __proto__ 프로퍼티 내부에 다시 __proto__ 프로퍼티가 연쇄적으로 이어진 것을 프로토타입 체인이라고 하고, 이 체인을 따라가며 검색하는 것을 프로토타입 체이닝이라고 한다. 메서드 오버라이드와 같은 맥락으로 **어떤 메서드를 호출하면 자바스크립트 엔진은 데이터 자신의 프로퍼티들을 우선 검색하고 거기에 없으면 __proto__를 검색하고 없으면 또 다시 그 __proto__ 의 __proto__를 검색하여 실행하는 식으로 진행한다.**

그렇다는 것은 이렇게 생각할 수 있지 않을까? 어떤 데이터든 prototype은 반드시 객체이기 때문에 Object.prototype이 언제나 프로토타입 체인의 최상단에 존재하고 있다. 따라서 어떤 생성자로 만든 인스턴스던 최상단에 존재하고 있는 Object.prototype의 메서드를 모두가 사용할 수 있는 것이다. 그러면 객체에서만 사용할 메서드는 프로토타입 객체 내부가 아닌 어디에 정의해야할까? 어쩔 수 없이 대상 인스턴스를 인자로 직접 주입하는 방식으로 구현해야한다.

<aside>
💡 Object.create(null)은 __proto__가 없는 객체를 생성한다. 그 객체의 내부를 살펴보면 __proto__ 및 constructor를 찾아볼 수 없다. 이 방식으로 만든 객체는 일반적인 데이터에서 반드시 존재한던 빌트인 메서드 및 프로퍼티들이 제거됨으로써 기본 기능에 제약이 생긴 대신, 객체 자체의 무게가 가벼워짐으로써 성능상 이점을 가진다.

</aside>

## 4. 다중 프로토타입 체인

위의 예시에서는 어떠한 데이터 타입에 대한 그 내부의 모습과 최상위 객체인 Object.prototype 간의 프로토타입 체인만 살펴보았다. 하지만 사용자가 새롭게 만드는 인스턴스의 경우에는 그 이상도 얼마든지 가능하다. (무한대로)

대각선의 __proto__를 연결하면 되는데 __proto__가 가리키는 대상, 즉 생성자 함수의 prototype이 연결하고자 하는 상위 생성자 함수의 인스턴스를 바라보게끔 해주면 된다.

```python
var Grade = function() {
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < args.length; i++) {
		this[i] = args[i];
	}
	this.length = args.length;
};
var g = new Grade(100, 80);
```

Grade의 인스턴스를 살펴보면 배열의 형태를 지니지만, 배열의 메서드를 사용할 수 없는 유사배열객체이다. 배열 메서드를 직접 쓸 수 있게 하기 위해서는 물론 call이나 apply 메서드를 사용하는 방법도 있지만, Grade.prototype이 배열의 인스턴스를 바라보게 하면 된다.

```python
Grade.prototype = [];
```

이 한 줄의 코드로 서로 별개로 분리돼 있던 데이터가 연결되어 아래와 같은 프로토타입 체인의 형태를 띠게 된다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0d78a81f-dd15-438d-b25d-c781d52593bd/Untitled.png)

결과적으로 인스턴스 g는 프로토타입 체인에 따라 g 객체 자신이 지니는 멤버, Grade의 prototype에 있는 멤버, Array.prototype에 있는 멤버 마지막으로 Object.prototype에 있는 멤버까지 자신의 것처럼 접근 가능하게 된다.
