## Javascript Type

- JavaScript는 Type을 가지는 언어다.
    - 타입이란?

      JavaScript 엔진과 개발자 모두에게 어떤 값을 다른 값과 분별할 수 있는 고유한 내부 특성 집합

    - 보통 자바스크립트는 var, let, const를 사용해 변수를 선언하기 때문에 타입이 없다고 생각하는 경우가 많다. But! JavaScript는 type을 가지는 언어이다. JavaScript의 타입은 원시 타입과 객체 타입으로 나뉜다.

      원시 타입

        - String
        - Number
        - Boolean
        - undefined
        - null
        - Symbol ( ES6 ~ )
        - BigInt ( ES2020 ~ )
          - BigInt란?

            BigInt는 Number type이 안정적으로 나타낼 수 있는 값인 2^53-1보다 큰 수를 표현할 수 있도록 추가됨.

            Javascript는 특정 값을 얻을 때, 정확성 여부를 판별할 수 있는 방법이 없음. 따라서 안전한 정수 범위를 벗어나는 수에 대한 계산은 정밀도를 잃게 된다.

            ```jsx
            const num = Number.MAX_SAFE_INTEGER;
            // 9007199254740991
            console.log(num + 1);
            // 9007199254740992
            console.log(num + 2);
            // 9007199254740992
            ```

          - 사용 방법
            1. 정수 리터럴 + n
            2. BigInt() 호출

            ```jsx
            console.log(typeof 10n); // bigint
            console.log(BigInt(10) === 10n); /// true
            ```

          - 주의할 점
            - BigInt는 Number와 연산 혼합이 불가능하다.
            - 내장 Math 객체의 메서드와 함께 사용이 불가능하다.
            - 비교 연산 사용(===, ==, >, <) 시에는 정밀도 손실 위험 없이 사용 가능하다.

            ```jsx
            console.log(10n + 2.5); // TypeError
            console.log(2.5n); // SyntaxError
      
            console.log(3n > 2); // true
            console.log(2n > 2); // false
            ```

      객체 타입

        - Object

            ```jsx
            function checkType(variable ,checkTypeName){
              console.log(typeof variable === checkTypeName);
            }
            
            checkType(undefined, "undefined"); // true
            checkType(true, "boolean"); // true
            checkType(42, "number"); // true
            checkType("42", "string"); // true
            checkType({life : 42}, "object"); // true
            checkType(null, "null"); // false
            checkType(null, "object"); // true
            
            ---
            // 정확한 null 타입 파악 방법
            let a = null;
            if(!a && typeof a === "object"){
                console.log(true);
            }else{
                console.log(false);
            }; // true
            ```

          위 코드에서 주의할 점은 null의 type이 object라는 것이다.
          이는 js 버그인데 이걸 고치면 잘 돌아가던 웹사이트들이 붕괴될 수 있어 고치지 않는 것!

        - function

            ```jsx
            function hello(){
              console.log("hello world!");
            }
            
            console.log(typeof hello); // function
            ```

          typeof의 결과가 function 이라고 나오는데 위에 function이라는 타입은 존재하지 않는다. 그렇다면 이 function이라는 것은 무엇일까?

            - Javascript에서 함수는 first-class **object**다.

              first-class object(일급 객체)는 다음 항목들을 **모두** 충족해야한다.

                1. 변수에 저장할 수 있어야 한다.
                2. 함수의 파라미터로 전달할 수 있어야 한다.
                3. 함수의 반환값으로 사용할 수 있어야 한다.
                4. 자료구조에 저장할 수 있어야 한다.

                ```jsx
                const hello = (cb) =>{
                  console.log("hello world");
                  cb();
                
                  function runB(){
                    console.log("im runB");
                  }
                
                  return runB; // 3
                } // 1
                
                function runA(){
                  console.log("im runA");
                }
                
                const retHello = hello(runA); // 2
                
                retHello();
                
                const funObj = {func : hello}; // 4
                
                // 실행 결과
                // hello world
                // im runA
                // im runB
                ```

- 값이 타입을 가진다.

  var, let, const로 선언하기 때문에 변수가 타입을 갖는 것이 아니고 해당 변수에 대입하는 값이 타입을 가진다.

    ```jsx
    console.log(typeof var); // SyntaxError : unexpected token
    console.log(42); // number
    ```

  typeof를 사용하면 해당 변수의 타입을 물어보는 것 같지만 해당 변수에 들어있는 값의 타입을 물어보는 것이다.

- 선언되지 않은 변수(undeclared), 값이 할당되지 않은 변수(undefined)

  이 둘은 헷갈리기 쉬운 내용인데, 내용이 아래와 같다.

    ```jsx
    let a = undefined;
    let b;
    console.log(a); // undefined
    console.log(b); // undefined
    console.log(typeof a); // undefined
    console.log(typeof b); // undefined
    console.log(c); // ReferenceError : c is undefined
    ```

  undefined는 접근 가능한 스코프에 변수가 선언은 되어 있으나 값이 할당되지 않은 것이고, undeclared는 접근 가능한 스코프에 변수 자체가 선언조차 되지 않은 상태를 의미한다.
### After Study

- JS는 메모리에 변수가 저장되는 부분과 데이터가 저장되는 부분이 구분된다.
    - 원시 타입

      변수명, 실제 값이 모두 Call Stack에 저장

    - 객체 타입
        1. 변수명, 실제값이 저장되는 Heap공간의 주소값이 Call Stack에 저장
        2. Heap공간에 실제값이 저장
- JS는 변수를 재할당할 때, 새로운 공간에 값을 저장하고 기존에 저장하고 있던 주소값을 바꾼다.

    ```jsx
    let a = 1;
    a = 2;
    // 위와 같은 상황에서
    // a : 1000(주소값), 1000 : 1을 저장하고 있는데,
    // a : 1000(주소값), 1000 : 1, 1001 : 2
    // a : 1001(주소값), 1001 : 2 이와 같이 기존에 저장하고 있던 주소값을 바꾼다.
    ```

  이때 const와 let을 연관지어서 얘기해보자.

    - let, const

      const는 재할당이 불가능한 값이다. 이때 재할당이 불가능하다는 것은 a에 저장되어 있는 주소값을 바꿀 수 없다는 이야기이다.

      반대로 let은 재할당이 가능하다. 이는 a에 저장되어 있는 주소값을 변경할 수 있다는 이야기이다.

- Garbage collecting은 직접해주는 것이 메모리 누수를 방지하는데 좋다.

  JS는 참조가 완전히 끊어진 주소값에 대해 Garbage Collecting을 해 메모리 관리를 하는데, Garbage Collector가 언제 작동할지 모르기 때문이다.

- NaN(Not a Number)이라는 값은 그 어떤 값과도 동등 비교할 수 없다.