### 4.1 선언문이 먼저인가? 대입문이 먼저인가?

- `var a = 2;`라는 구문은 자바스크립트는 아래와 같은 두개의 구문으로 인식
    - 선언문 : `var a;`
    - 대입문 : `a = 2;`

  → 이러한 과정에서 변수와 함수 선언문은 코드(해당 스코프)의 꼭대기로 끌어 올려진다.

  → 이것이 바로 **호이스팅(hoistong)‼️**

  ➡️ 호이스팅으로 인해 아래코드가 오류나지 않음

    ```jsx
    hello();
    
    function hello(){
        console.log(a); //undefined
        var a = 2;
    }
    ```

  : `함수의 선언문`과 `var a;` 는 호이스팅으로 끌어올려졌으므로 첫째줄에 바로 `hello()`를 호출 가능하다.

    - 이 코드에서 호이스팅이 적용된 상황을 구체적으로 표현하면 아래와 같다.

        ```jsx
        function hello(){
            var a;
            console.log(a); //undefined
            a = 2;
        }
        hello();
        ```

    - 위와같은 물리적인 이동은 실제로 일어나지는 않으며, 자바스크립트 엔진은 코드의 위치를 변경시키지 않는다.
    - 그렇다면 호이스팅은?
        1. 컴파일 단계에서, 코드가 실행되기 바로 직전에 변수와 함수의 선언부들이 쭉 스캔 됩니다.
        2. 스캔 된 변수와 함수의 선언부들은 **Lexical Environment**로 불리는 자바스크립트의 자료구조 메모리상에 추가된다

      → 따라서 메모리에 존재하는 변수와 함수는 실제 선언 이전에 사용될 수 있다.
    
      <aside>
        💡 렉시컬 환경(Lexical Environment) 이란?

      : Lexical Environment는 **identifier-variable** 쌍을 매핑하여 저장하는 자료구조

        - identifier : 변수나 함수의 이름
        - variable : 타입을 나타냅니다.

      추상적으로 아래와 같은 구조를 하고 있다.

        ```jsx
        LexicalEnvironment = {
          myVar: <value>,
          myFunc: <func>
        }
        ```

      즉, **Lexical Environment**는 프로그램 실행 중에 변수와 함수들이 들어있는 공간으로 볼 수 있다.

      위의 예시에 대한 렉시컬 환경은 아래와 같다.

        - 예시 코드

        ```jsx
        hello();
        
        function hello(){
            console.log(a); //undefined
            var a = 2;
        }
        ```

        - 렉시컬 환경

         ```jsx
            LexicalEnvironment = {
              hello: <func>
            }
        ```


  </aside>


- 함수 선언식은 호이스팅이 되지만 함수 표현식은 다르다‼️

    ```jsx
    hello();    //TypeError: hello is not a function
    
    var hello = function hi(){
        //
    }
    ```

  : 자바스크립트는 오직 **선언만 호이스팅** 할 뿐, 초기값 할당에 관한 부분은 호이스팅 하지 않기 때문에 위에서는 `var hello;` 만 호이스팅이 된 상황(함수 표현식은 호이스팅이 되지 않음)

  → 따라서 `var 로 인식한 변수`가 함수로 호출이 되었기에 `TypeError`를 발생

- 함수 표현식이 이름을 가져도 그 이름 확인자는 해당 스코프에서 찾을 수 없다.

    ```jsx
    hello();    //TypeError: hello is not a function
    hi();   //ReferenceError
    
    var hello = function hi(){
        //
    }
    ```

    - 호이스팅이 적용되었을 때로 표현하면 아래와 같다

        ```jsx
        var hello;
        
        hello();    //TypeError: hello is not a function
        hi();   //ReferenceError
        
        hello = function(){
            var hi;
            hi = //
        }
        ```

- 호이스팅시 변수보다 함수가 먼저 호이스팅 된다.

### 4.2 변수의 호이스팅

### 1. var

```jsx
console.log(a); // 'undefined' 출력
var a = 3;
```

위의 코드에서 왜 undefined를 출력하는가?

자바스크립트 엔진이 `var`변수 선언부를 컴파일 단계에서 찾았을 때, 그 변수는 Lexical Environment에 추가되고 undefined로 초기화된다. 그리고 실행시간 동안, 코드에서 실제로 할당이 이루어진 지점에 도달하게 되면 해당 값으로 다시 할당된다.

따라서 변수 선언 이후 Lexical Environment의 모습을 보면 아래와 같다.

```jsx
LexicalEnvironment: {
  a: undefined
}
```

이것이 `3`이 아니라 `undefined`를 출력하는 이유입니다. 그리고 엔진이 실행시간 동안 실제로 할당이 이루어진 지점에 도달하게되면, Lexical Environment에 저장된 값을 수정한다.

할당 이후 Lexical Environment의 모습을 보면 아래와 같다.

```jsx
LexicalEnvironment: {
  a: 3
}
```

### 2. let/const

```jsx
console.log(a); //ReferenceError: a is not defined
let a = 3;실행 결과는 아래와 같습니다.
```

- ReferenceError: a is not defined가 출력
- 위 예시에 따라 `let` 변수와 `const` 변수는 호이스팅이 되지 않는 것인가?

  `모든 선언부는(함수, var, let, const, class)는 호이스팅이 됩니다. 하지만 var선언부는 undefined로 초기화되는 반면에 let과 const의 선언부는 uninitialized로 초기화된다.`


let과 const의 값은 실제로 할당이 이루어진 지점에 도달해야 이루어진다. 즉, 실제로 할당이 이루어진 지점 이전에는 해당 변수에 접근할 수 없다는 것을 의미

- 변수의 선언과 변수의 초기화 사이의 변수에 접근할 수 없는 지점 :  **"Temporal Dead Zone"**
- 만약 자바스크립트 엔진이 `let`과 `const` 변수가 선언된 지점에서 값을 찾을 수 없다면 `undefined`로 할당을 하거나 에러를 발생 시킴

    ```jsx
    let a;
    console.log(a); // 'undefined' 출력
    a = 5;
    ```

  : 컴파일 단계 동안, 자바스크립트 엔진은 변수 a를 발견해 Lexical Environment에 a를 저장하지만 `let` 변수이기 때문에 어떠한 값으로도 초기화하지 않는다. 따라서 컴파일 단계에서의 Lexical Environment은 아래와 같다.

    ```jsx
    LexicalEnvironment: {
      a: <uninitialized>
    }
    ```

  만약 우리가 a 변수가 선언되기 이전에 접근하려고 하면, 자바스크립트 엔진은 Lexical Environment에서 값을 가져오려고 할 것이다. 하지만 a 변수는 `uninitialized`이기 때문에 Reference error를 발생.

  실행시간 동안, 엔진이 변수 선언부에 도달하게 되면, 변수의 값을 다시 바인딩하려고 하지만 초기값이 할당되지 않았기 때문에 `undefined`를 할당

  따라서 첫번째 줄을 실행하고 난 후에 Lexical Environment의 모습은 아래와 같다.

    ```jsx
    LexicalEnvironment: {
      a: undefined
    }
    ```

  그리고 `undefined`가 콘솔창에 출력이 되고, 변수 a에 `5`가 할당. 이후에 Lexical Environment에 저장된 `a`의 값을 `undefined`에서 `5`로 바꿈


### Reference

[모던 자바스크립트에서의 호이스팅(Hoisting)](https://velog.io/@cada/%EB%AA%A8%EB%8D%98-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C%EC%9D%98-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85Hoisting)