### 자바스크립트의 타입

 : 원시값과 객체로 나뉨. JavaScript는 느슨한 타입(loosely typed)의 동적(dynamic) 언어

JavaScript의 변수는 어떤 특정 타입과 연결되지 않으며, 모든 타입의 값으로 할당 (및 재할당) 가능

`원시값`

- undefined
- null
- Boolean
- String
- Number
- Bigint
- symbol
- Object `객체`

(원시값 : 객체를 제외한 모든 타입은 불변 값(변경할 수 없는 값)을 정의.  이런 일련의 타입을 "원시 값"이라 함)

---

### 1. undefined

 : 변수 선언 후 **값이 할당되지 않은 상태**의 타입 혹은 **값이 주어지지 않은 인수**에 할당되는 값

<aside>
💡 - 선언되지 않은 변수의 경우 원래 `undeclared`가 맞으나 `typeof`로 선언되지 않은 변수를 출력하면 `undefined`로 나옴.  
- error를 따로 처리하지 않도록 `typeof`만의 독특한  safety guard

</aside>

```tsx
var a;
console.log(a); // undefined
console.log(typeof b);  //undefined
```

---

### 2. null

: 값이 의도적으로 비어있음을 의미하며 (= 아무것도 참조하지 않음), 연산에서는 **거짓** 취급.

- 주로 값을 초기화 할 때 많이 사용
- `typeof`로 `null`을 찍으면 `object`로 나옴
    
    ```jsx
    var haen= null;
    console.log(typeof haen); // object
    ```
    
    ---
    
    <aside>
    💡 `undefined` vs `null`
    이 둘의 차이는 등록, 저장의 여부
    ****     - `null`은 값은 값이지만, 의미없는 특별한 값이 저장되어 있는 것
         - `undefined`은 값 자체가 없음
    **→ `undefined`는 변수 선언 시 할당, `Null`은 변수 선언 후 null로 값을 바꿈**
    
    이런 차이에도 **`==` (동등 연산자)**로 `null`과 `undefined`를 비교하면 둘다 값이 없다는 것을 의미하기에 **같다고 간주**
    
    → 조건절, 반복문 등 `boolean`값이 필요한 경우 **형변환**을 진행하기 때문 (falsy)
    
    → 그렇기에 두 값 비교시 `===` (일치 연산자)를 사용해야 함
    
    ```jsx
    var haen= null;
    var lee;
    var flag= false;
    console.log(haen); // null
    console.log(lee); //undefined
    if(haen==lee)
    	flag= true;
    console.log(flag); // true
    ```
    
    - **falsy** : boolean 문맥에서 특정 값을 `false` 로 형변환
        - `false`
        - `0`
        - `-0` : 음수 0
        - `0n` : Bigint
        - `“”` : 빈 String
        - `null`
        - `undefined`
        - `NaN`
        
        → 이 falsy가 아닌 값을 가지면 boolean에서는 모두 `true`
        
        → 빈 배열([])은 `true`로 변환❗️
        
        ```jsx
        if(false)
            console.log("hello false");
        if(0)
            console.log("hello 0");
        if(-0)
            console.log("hello -0");
        if(0n)
            console.log("hello 0n");
        if(null)
            console.log("hello null");
        if(undefined)
            console.log("hello undefined");
        if(NaN)
            console.log("hello NaN");
        if ("")
            console.log("hello");
        ```
        
        *️⃣ 참고 *️⃣
        
        - 빈 배열의 `false` 반환 방법
            
            → `length` 프로퍼티 이용 : 빈 배열.length = 0을 반환
            
            ```jsx
            var arr = [];
            
            if(arr)
                console.log("arr is not empty");  
            		// 빈 배열이지만 arr is not empty 출력
            if(arr.length)
                console.log("arr is not empty"); 
            		// arr.lenth = 0 이기에 if 안이 false, 출력 X
            ```
            
    </aside>
    

---

### 3. Boolean

: 논리요소를 나타내며 `true`, `false` 두 가지 값을 가짐

- 주로 JS의 제어구조에 사용
    
    (제어구조 : if, switch, while, try-catch-finally, break 등 상호작용을 추가하기 위한 일련의 제어 흐름 명령문) 
    
- boolean 값이 숫자 연산에 사용되면 true는 1로, false는 0으로 변환
- 문자열 연산에 사용되면 각자의 문자열로 반환 → “true”, “false”
    
    ---
    
    <aside>
    💡 ❗️중요❗️
    
    Boolean객체의 true, false와 Boolean값의 true, false (위의 falsy값을 가지는 것들) 혼동 ❌
    
    : 값이 `undefined`, `null`이 아닌 **모든 객체**는 조건문에서 `true`로 취급, 이는 `false`값을 가진 **Boolean 객체**도 마찬가지❗️
    
    - 값이 `false`인 `Boolean`객체를 포함한 어떠한 객체를 `Boolean`객체의 초기값으로 넘겨주더라도 새로운 `Boolean` 객체는 `true`를 가짐(Object 이기에)
    </aside>
    
- boolean 객체로 형변환시 `new Boolean`을 통한 객체 생성은 금지
    
    : 객체 생성시 값에 상관없이 무조건 `true`값을 가짐. 기존의 `false` 값이 변질(굳이 사용할 필요도 ❌) 
    
    → 객체 형변환시 `Boolean()` 생성자 함수 이용❗️
    
    ```jsx
    var haen = false    // boolean 타입 선언 방법 1
    if(haen)    // false
        console.log("hello false"); // 출력 X
    
    var lee = new Boolean(false);   //방법 2 Boolean 객체로 랩핑 => 지양
    if(lee) //true
        console.log("hello Boolean false"); // 출력
    
    var a = Boolean(false);    // 명시적 형변환 (생성자 함수 호출)
    if (a)  //false
        console.log("hello a false");   // 출력 X
    
    console.log(haen.toString());  //자신을 문자열로 변환
    console.log(lee.toString());
    ```
    

---

### 4. String

: text 데이터를 나타낼 때 사용

(16비트 부호없는 정수값 “요소"로 이루어진 집합)

- ~~c와 같은 언어들과 달리 JS에서는 문자열 생성 후 **변경 불가**~~
    
    (라고 [https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures#string_타입](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures#string_%ED%83%80%EC%9E%85)이 링크에 나와있으나 아래 코드가 잘 실행됨)
    
    ```jsx
    var haen = "hello";
    console.log(haen);
    
    haen = "haen";
    console.log(haen);
    ```
    
- 문자열 선언 방법
    - 문자열 리터럴
    - String 객체
    - 템플릿 리터럴
    
    ```jsx
    var haen = "hello"; //문자열 리터럴
    console.log(haen);      // hello
    
    var a = String("abc"); //String 객체이용
    console.log(a);         // abc
    
    var b = `${a}_text`; //템플릿 리터럴
    console.log(b);         // abc_text
    ```
    

---

### 4. Number

: FP64비트 IEEE 754값을 가짐((2^53 − 1)부터 2^53 − 1까지의 수)

- 부동 소수점 말고도 `infinity`, `-infinity`, `NaN`가 존재
- 두가지 방법으로 표현 할 수 있는 값은 유일하게 `0` : `0`과 `-0`
    
    : 이 두 값은 나누었을 때 차이 발생 → 7/0 = `infinity`, 7/-0 = `-infinity`
    

---

### 5. Bigint

 : Number의 범위를 벗어나는 큰 수도 안전하게 저장 가능

- 생성
    - n을 뒤에 붙여 사용
    - 생성자를 이용해 사용

❗️주의❗️

number처럼 `+`,`-`,`*`,`/`,`**` 연산 가능하지만 **Number와 혼합해서 연산** ❌ (Typeerror 발생)

---

### 6. Symbol

: 이름의 충돌위험이 없는 유일한 객체의 프로퍼티 키를 만들기 위해 사용

- Symbol은 Symbol() 함수로 생성. Symbol() 함수는 호출될 때마다 Symbol 값을 생성
    
    이때 생성된 Symbol은 객체가 아니라 변경 불가능한 원시 타입의 값이다.
    
    ```jsx
    var haen = Symbol();
    console.log(haen); // Symbol()
    ```
    
- Symbol()은 다른 Number, String, Boolean과 다르게 new를 사용 ❌(new 사용시 Typeerror)
- Sysbol()생성시 문자열을 값으로 전달 가능 → 디버깅 용도로만 사용
- Symbol 값을 키로 갖는 프로퍼티는 어떤 프로퍼티와도 충돌 ❌
    
    ```jsx
    const object = {};
    
    const haen = Symbol('haenSymbol');
    object[haen] = 1234;
    
    console.log(object); // { [Symbol(haenSymbol)]: 1234 }
    console.log(object[haen]); // 1234
    ```
    

---

### 7. Object

: 자바스크립트의 객체는 키(key)과 값(value)으로 구성된 프로퍼티(Property)들의 집합. 원시 타입(Primitives)을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 객체

- 프로퍼티 : **프로퍼티 키(이름)+ 프로퍼티 값**으로 구성
    
    : 프로퍼티는 프로퍼티 키로 유일하게 식별.
    
    - 프로퍼티 키 : 프로퍼티를 식별하기 위한 식별자(identifier), 빈 문자열을 포함하는 모든 문자열 또는 symbol 값으로 이름이 정해짐
    - 프로퍼티 값 : 모든 값
- 프로퍼티 키에 문자열이나 symbol 값 이외의 값을 지정 : **문자열**로 암묵적 변환.
- 이미 존재하는 프로퍼티 키 중복 선언 : 나중에 선언한 프로퍼티가 덮어 씀
- 객체는 프로퍼티를 열거할 때 순서 보장 ❌
- 메소드 : 프로퍼티의 값이 함수 = 객체에 제한된 함수