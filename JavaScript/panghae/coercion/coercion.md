## Coercion

- Type 변경의 종류
    - 명시적 타입 변경 : Type Casting(타입 캐스팅)
    - 암시적 타입 변경 : Coercion(강제 변환) → 다른 작업 도중 불분명한 부수 효과로부터 발생하는 타입 변환

    ```jsx
    let a = 42;
    
    let b = a + ''; // 암시적 강제 변환
    
    let c = String(a); // 명시적 강제 변환
    
    console.log(
      `b : ${b}, c : ${c}, type of e is ${typeof b}, type of f is ${typeof c}`,
    ); // b : 42, c : 42, type of e is string, type of f is string
    
    let d = '42';
    
    let e = +d;
    
    let f = Number(d);
    
    console.log(
      `e : ${e}, f : ${f}, type of e is ${typeof e}, type of f is ${typeof f}`,
    ); // e : 42, f : 42, type of e is number, type of f is number
    ```

  → 명시적 : 암시적 = 명백한 : 숨겨진 부수 효과 같은 용어 대응 관계가 성립한다.

- 추상 연산

  어떻게 값이 문자열, 숫자, 불리언 등의 타입이 되는지, 그 기본 규칙을 알아보자.

  `테스트 환경 : Node 환경`

    - ToString

      문자열이 아닌 값 → 문자열 변환 작업은 ToString 추상 연산 로직이 담당한다.

      null, undefined는 toString() 메소드 사용 불가능

        ```jsx
        null.toString(); // TypeError
        undefined.toString(); // TypeError
        
        true.toString(); // "true"
        (1.12512412412412125125125121512).toString();
        // 1.1251241241241212, 일정 자리 이하 숫자는 표현되지 않음.
        [1, 2, 3].toString(); // 1,2,3
        
        function hello() {
          return 'changing hello function to string';
        }
        
        console.log(hello.toString());
        // function hello() {
        //  return 'changing hello function to string';
        // }
        
        let json = {
          a : 1,
          b : 2
        };
        
        console.log(json.toString()); // [object Object]
        ```

        - 일반 객체는 특별히 지정하지 않으면 기본적으로 Object.prototype.toString() 메서드가 내부 [[Class]]를 반환한다.
        - 배열에는 기본적으로 재정의된 toString() 메소드를 가지고 있다. 그렇기 때문에 배열을 문자열로 변환할 시 모든 원소 값이 콤마(,)로 분리된 형태로 이어진다. \

      ### JSON 문자열화

      toString()은 JSON 문자열화 기본적으로 같은 로직이다.

        ```jsx
        JSON.stringify(42); // "42"
        JSON.stringify('42'); // ""42""
        JSON.stringify(null); // "null"
        JSON.stringify(true); // "true"
        ```

      JSON 안전 값은 모두 `JSON.stringify()`로 문자열화 할 수 있다.

      JSON 안전 값이 아닌 것들

        - undefined
        - function
        - Symbol
        - Circular references(환형 참조)

      `JSON.stringify()`하면 자동으로 값을 누락시키고, 배열에 이들 값이 포함되어 있으면 인덱스 정보가 뒤바뀌지 않도록 null값으로 바꾼다.

    - ToNumber

      숫자가 아닌 값 → 수식 연산이 가능한 숫자

      e.g. `true` : 1, `false` : 0, `undefined` : NaN, `null` : 0

      변환에 실패할 시, 결과는 NaN을 반환한다. 문자열 값에 toNumber를 적용하면 대부분 숫자 리터럴 규칙/구문과 비슷하게 작동하지만, 0이 붙은 8진수는 toNumber에서 올바른 숫자 리터럴이라도 8진수로 처리하지 않는다.

        - 객체는 동등한 원시 값으로 변환한 후, 그 결과값을 toNumber 규칙에 의해 강제 변환한다.
    - ToBoolean

      Falsy한 값 ⇒ Boolean으로 강제 변환 시, false가 되는 값들

        - undefined
        - null
        - false
        - +0, -0, NaN
        - “”

      → 이 외의 값들은 Boolean으로 강제 변환 시 true가 되는 truthy 값이다.

      Falsy 객체

      → 일반적인 자바스크립트의 의미뿐만 아니라 브라우저만의 특이한 작동 방식을 가진 값을 생성하는 경우가 있다. 그 예로 document.all은 현재 ‘비표준'이고 비 권장/폐기되었다. document.all을 false인 것 처럼 돌아가게 해서 표준을 지향하지 않던 IE에서 작동을 유지하는 방법으로 사용되었다.


    ### 명시적 강제 변환
    
    분명하고 확실한 타입 변환이다. 
    
    문자열 ↔ 숫자
    
    String()과 Number()을 이용하는데 new가 붙지 않기 때문에 객체 래퍼를 생성하는 것이 아니다.
    
    ```jsx
    let a = 42;
    let b = String(a);
    
    console.log(typeof a, typeof b) // number string 
    let c = '3.14';
    let d = Number(c);
    
    console.log(typeof c, typeof d) // string number
    ```
    
    날짜 → 숫자
    
    +는 Date 객체 → 숫자의 강제 변환 용도로도 많이 쓰인다. 결괏값이 날짜/시각 값을 유닉스 타임스탬프 표현형이다. 
    
    ```jsx
    let date = new Date();
    console.log(date);
    // Tue Jun 28 2022 14:45:27 GMT+0900 (Eastern Indonesia Time) 14:45:27.929
    console.log(+date);
    // 1656395127929
    ```
    
    숫자 형태의 문자열 파싱
    
    앞에 등장한 Number()와 parseInt() or parseFloat()이 다른 점은 Number()는 강제 변환 시, 비 숫자형 문자를 허용하지 않기 때문에 NaN을 발생 시키지만, 비 숫자형 문자를 숫자로 파싱한다. 
    
    → 문자열 시작이 숫자로 시작하는 경우에 숫자가 아닌 문자를 만날 때까지 숫자로 파싱한다.
    
    ```jsx
    console.log(parseInt('182xysdjs')); // 182
    console.log(parseInt('ndwqe')) // NaN
    console.log(parseInt('ndw12412qe')) // NaN
    ```
    
    * → boolean
    
    !을 사용하거나 Boolean()을 사용한다. 단 !을 사용해 원래 값을 얻기 위해서는 !!을 사용해야한다.
    
    ```jsx
    console.log(Boolean([])); // true
    console.log(!![]); // true
    ```
    
    ### && 와 || 그리고 ??
    
    &&와 ||의 결과값은 true, false의 평가값이 아니고 피연산자 값이다.
    
    ```jsx
    console.log(1 || 0); // 1
    console.log("wow" && "hello"); // hello
    ```
    
    || 연산은 그 결과가 true면 첫 번째 피연산자, false일 시 두 번째 피연산자를 반환한다. 
    
    && 연산은 그 결과가 true이면 두 번째 피연산자, false일 시 첫 번째 피연산자를 반환한다. 
    
    ?? 연산은 첫 번째 피연산자가 undefined나 null 일 시, 두 번째 피연산자를 반환하고, 아닐 시 첫 번째 피연산자를 반환한다.
    
    ```jsx
    const a = undefined;
    const b = null;
    const c = false;
    
    console.log(a ?? "wow"); // wow
    console.log(b ?? "wow"); // wow
    console.log(c ?? "wow"); // false
    ```
    
    아래와 비슷한 연산이라고 생각할 수 있다.
    
    `a || b ⇒ a ? a : b;`
    
    `a && b ⇒ a ? b : a;`
    
    ### ===, ==
    
    ===과 ==은 모두 동등 비교를 한다는 점에서 같지만 ==은 느슨한 동등비교, ===은 엄격한 동등 비교를 의미한다.
    
    여기서 == 은 타입 강제 변환을 허용하는 동등 비교 연산자, ===은 강제 변환을 허용하지 않는 동등 비교 연산자이다.