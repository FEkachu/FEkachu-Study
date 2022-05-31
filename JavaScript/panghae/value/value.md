## JavaScript Value

### Array

- JS는 다른 타입이 엄격한 언어와 달리 문자열, 숫자, 객체, 다른 배열 등 어떤 타입의 값이라도 담을 수 있다. 또한 크기를 정하지 않고도 선언이 가능하다.

    ```jsx
    let a = [1,'2',[3,4]]; // 크기를 정하고 선언
    let b = []; // 크기를 정하지 않고 선언
    
    a.length // 3
    a[0] // 1
    a[2][0] // 3
    ```

  배열에는 delete라는 연산자가 존재하는데, 마지막 값까지 모두 제거해도 length 값은 바뀌지 않는다.

    ```jsx
    let a = [1,2,3];
    
    console.log(a.length); // 3
    
    delete a[0]; // []
    
    console.log(a); // [ <1 empty item>, 2, 3 ]
    console.log(a.length); // 3
    
    delete a[1];
    delete a[2];
    
    console.log(a); // [ <3 empty items> ]
    console.log(a.length); // 3
    ```

- 빈 배열에 인덱스를 통해서 값을 할당할 수 있는데, 할당하지 않은 배열들에 대해서는 undefined가 된다.
  배열의 key값을 String으로 설정할 수는 있으나, length 프로퍼티에는 반영이 되지 않는다.

    ```jsx
    let a = [];
    
    a[1] = 3;
    a[4] = 7;
    console.log(a[0]); // undefined
    
    a['hello'] = 5;
    console.log(a.length); // 5
    console.log(a['hello']); // 5
    ```


### Array-like Object(유사 배열)

- 유사 배열이 되기 위한 최소 조건
    1. 숫자 형태의 indexing이 가능해야한다.
    2. length 속성을 포함해야한다.
- 유사 배열을 배열처럼 사용하는 방법
    1. Array.from(ES6 ~ )

        ```jsx
        console.log(Array.from('foo')); // Array['f','o','o'];
        
        console.log(Array.from([1,2,3], x => x + x)); // Array[2,4,6]
        ```

    2. call, apply, bind
        - 들어가기 전에 this

          JS는 내부적으로 함수가 생성될 때, this라고 불리는 키워드가 생성된다. 기본적으로 함수가 호출된 방식에 따라 this가 가리키는게 달라진다. → 묵시적 Binding(implicit binding)

        - call, apply

          둘은 매우 유사한데, 차이점으로는 call은 첫 인자 이후에는 인수 리스트를 받고, apply는 단일 배열을 받는다. 둘 모두 첫 번째 인자는 this binding이다.

            ```jsx
            const numbers = [5, 6, 2, 3, 7];
            
            const max = Math.max.apply(null,numbers);
            
            const max1 = Math.max.call(null, 5,6,2,3,7);
            
            console.log(max, max1);// 7, 7
            ```

          위의 함수들을 이용해 아래와 같이 유사 배열을 사용할 수 있다.

            ```jsx
            let arrayLikeObject = {
            	0 : '1 Row',
            	1 : '2 Row',
            	2 : '3 Row',
            	length : 3,
            	splice : function() {}
            }
            
            Array.prototype.forEach.call( arrayLikeObject, row => {
            	console.log( 'row', row )
            });
            // row 1 Row
            // row 2 Row
            // row 3 Row
            
            arrayLikeObject.forEach( row => {
            	console.log( 'row', row )
            });
            // Error
            //  - arrayLikeObject.forEach is not a function
            ```

        - bind

          bind는 call, apply와 다르게 실행하지 않고 가리키는 this만 바꿔준다. 이때 바인딩 된 함수는 함수 내부적으로 call을 이용해 호출하게 된다고 한다.


### String

- 문자열 ≠ 문자 배열

  문자열과 문자 배열 모두 length, indexOf(), concat() method를 가진다. 이 때문에 별반 다르지 않다고 생각할 수도 있지만, 문자열은 불변값, 문자 배열은 가변값이다.

    ```jsx
    let a = 'hello';
    let b = ['h','e','l','l','o'];
    
    a[1] = 'y';
    b[1] = 'y';
    
    console.log(a); // hello
    console.log(b); // [ 'h', 'y', 'l', 'l', 'o' ]
    ```

  또한 문자열은 내용을 변경하는 것이 아닌, 새로운 문자열을 생성한 후에 반환하는 형식을 가진다. 하지만 문자 배열은 곧바로 원소를 바꾼다. → 문자열이 불변이기 때문에 일반 메소드는 사용할 수 없지만 불변 배열 메소드는 사용할 수 있다.

    ```jsx
    let a = 'foo';
    
    a.join // undefined
    a.map // undefined
    
    let c = Array.prototype.join.call(a, "-");
    let d = Array.prototype.map.call(a, (letter) =>{
      return letter.toUpperCase() + ".";
    }).join("");
    
    console.log(c); // f-o-o
    console.log(d); // F.O.O.
    ```


### Number

JS는 정수, 부동 소수점 숫자를 모두 아우르는 Number라는 타입을 사용한다.
IEEE 754 표준을 따르며, 이중에서도 `‘Double Precision’ 표준 포멧`을 따른다.(64비트 바이너리)

- 정수(부동 소수점 값이 아닌 수)

  JS에서 정수는 부동 소수점 값이 없는 값을 의미한다. (42.0 또한 정수이다.)

  해당 수가 정수인지 아닌지 여부는 아래와 같은 함수로 확인한다.

    ```jsx
    console.log(Number.isInteger(42)); // 정수인지 여부 true
    console.log(Number.isSafeInteger(42.0)); // 안전 정수인지 여부 true
    ```

- 숫자 표현 방법

  10진수 리터럴로 표기한다.

    ```jsx
    let a = 10;
    
    0.42 === .42
    42.0 === 42.
    ```

  아주 크거나 작은 숫자에 대해서는 지수형으로 표기한다. ⇒ toExponential()의 결과값과 동일

    ```jsx
    let a = 5E10;
    console.log(a); // 50000000000
    console.log(a.toExponential()); // 5e+10
    ```

- 부동 소수점 숫자 부작용

    ```jsx
    console.log(0.1 + 0.2 === 0.3) // false
    console.log(0.1 + 0.2); // 0.30000000000000004
    ```

  수식은 매우 같아 보이지만, 실제 console에 찍으면 다르다는 것을 알 수 있다. 이를 해결하는 방법으로 `Number.EPSILON`으로 정의되어 있다.(ES6 ~ ) ⇒ 이와 같이 미세한 오차를 머신 입실론이라고 한다.
  JS에선 `2^-52`이다.

- 안전한 정수 범위

  연산을 안전하게 보장할 수 있는 범위를 MAX_SAFE_INTEGER로 정의 해놓았다. (ES6 ~ )
  이보다 큰 수를 사용할 경우에는 string값으로 변환해서 저장해야한다.

    ```jsx
    console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
    console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
    ```


### Special Value

- 값이 아닌 값

  undefined type의 값은 undefined, null type의 값은 null 밖에 존재하지 않는다.

    - undefined는 전역 스코프에서 undefined라는 식별자에 값을 할당할 수 있다.(느슨한 모드)
    - undefined라는 이름을 가진 지역 변수를 생성할 수 있다.

      → 위 두 가지 방법은 모두 추천하지 않는다.

- 특수 숫자

  수학 연산 시, 두 피연산자가 전부 숫자가 아닐 경우에 유효한 숫자가 나올 수 없으면 결과는 `NaN`이다.

  NaN : Not A Number 말 그대로 숫자가 아닌 값을 의미한다. 하지만 `NaN의 타입은 Number`이다.  숫자가 아니라는 의미 보단 `유효하지 않은 숫자`, `잘못된 숫자`에 더 가깝다.

    ```jsx
    console.log(typeof NaN); // number
    ```

  NaN은 그 어떤 NaN + NaN 본인하고도 동등하지 않다. 그렇기 때문에 NaN임을 확인하기 위해서는 isNaN()을 사용해야한다.

    ```jsx
    let a = 2/'hello';
    console.log(a === NaN); // false
    console.log(a === a); // false
    console.log(isNaN(a)); // true
    console.log(isNaN('hello')); // true
    console.log(Number.isNaN('hello')) // false
    ```

  문제는 숫자인지 여부만 판단하기 때문에 string 값도 true를 반환한다. 이를 방지하기 위해 ES6부터 Number.isNaN()이 대체한다.

- 무한대

  JS는 0으로 나누기 연산 정의가 매우 잘 되어 있어서 오류 없이 Infinity라는 결과값이 나온다.

  연산 결과가 너무 커서 표현할 수 없을 때, 좀 더 가까운 값으로 반올림을 진행한다.

    ```jsx
    let a = 1 / 0; // Infinity
    let b = -1 / 0; // -Infinity
    
    let a = Number.MAX_VALUE;
    console.log(a + a); // Infinity
    console.log(a + Math.pow(2, 970)); // Infinity, 1)
    console.log(a + Math.pow(2, 969)); // 1.7976931348623157e+308, 2)
    ```

  1)번의 경우 a보다 무한대에 가깝기 때문에 무한대로 올림된 것이고, 2)번의 경우 a가 무한대보다 가깝기 때문에 버림된 것이다.

- 0

  위에서 음수를 무한대로 나누면 어떤 값이 나올까?

    ```jsx
    console.log(-1/ Infinity); // -0
    ```

  연산 결과는 -0으로 표현되지만 문자열화 할땐 ‘0’으로 표현된다.

- 특이한 동등 비교

  특이한 동등 값을 비교할 땐, Object.is(비교값1, 비교값2) 사용하면 된다. 다만 `==` 나 `===`가 안전하고 정확하다면 굳이 사용하지 않는 것이 효율이 좋고 일반적이다.


### Value vs Reference

JS에서 복사의 방식은 결정이 불가능하다. 엔진에서 타입을 보고 어떤 방식의 복사를 할지 자동으로 결정해준다.

- Value 값 복사(깊은 복사, Value)

  단순 값(스칼라 원시값)은 언제나  값-복사 방식으로 할당, 전달된다.

  깊은 복사란 복사하고 값을 변경 하였을 때, 다른 값에 영향을 주지 않는 것을 말한다.

- Object 복사(얕은 복사, Reference)

  객체나 함수 등의 합성 값은 할당, 전달 시에 반드시 레퍼런스 사본을 생성한다.

  얕은 복사란 복사하고 값을 변경 하였을 때, 다른 값에 영향을 주는 것을 말한다.


```jsx
const a = {
  wow : 1,
  yeah : 2
};

const b = a;
console.log(a); // { wow: 1, yeah: 2 }
console.log(a === b); // true, 얕은 복사

let c = {};
for (const [key, value] of Object.entries(a)){
  c[key] = value;
}

console.log(c); // { wow: 1, yeah: 2 }
console.log(c === a); // false, 깊은 복사
```