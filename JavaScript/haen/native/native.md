## 네이티브

: 특정 환경(브라우저 등의 클라이언트 프로그램)에 종속되지 않은 ECAMScript 명세의 **내장 객체**

---

흔하게 쓰이는 네이티브

- `String()`
- `Number()`
- `Boolean()`
- `Array()`
- `Object()`
- `Function()`
- `RegExp()`
- `Date()`
- `Error()`
- `Symbol()`

---

### 1. 내부 Class

: `typeof`가 `object` 인 값 (`array` 등)에 존재하는 내부 프로퍼티

- 직접 접근 ❌
- `Object.prototype.toString()`에 값을 넣어 호출
- 대부분은 해당 값과 관련된 내장 네이티브 생성자를 가리킴
    
    ```jsx
    var a = Object.prototype.toString.call([1,2,3]);
    console.log(a); //[object Array]
    ```
    
- ⁉️원시 값에도 내부 Class가 존재하는가⁉️
    - 네이티브 값은 없지만 `내부 class`값은 존재‼️
    - **원시값** : 프로퍼티, 메소드 존재 ❌  → ‘**박싱(Boxing)**’과정을 거침
        
        ```jsx
        var a = Object.prototype.toString.call(null);
        console.log(a); //[object Null]
        
        var b = Object.prototype.toString.call(undefined);
        console.log(b); //[object Undefined]
        
        var c = Object.prototype.toString.call("1231");
        console.log(c); //[object String]
        
        var d = Object.prototype.toString.call(1231);
        console.log(d); //[object Number]
        ```
        
        - 원시값은 해당 객체 래퍼로 자동 박싱

---

### 2. 레퍼 박싱(Boxing)

: 자바스크립트는 원시값을 알아서 박싱(래핑)

- 문자열로 선언한 변수에 대해 `length`와 같은 메소드 사용 가능
- 직접 객체를 써야 할 이유는 거의 없기에 원시값 사용을 권장
    
    ```jsx
    var a = "abc";
    
    console.log(a.length);  //3
    console.log(a.toUpperCase());   //ABC
    ```
    
    - 우리가 흔히 사용하는 위와 같은 방식이 가능
    - 자바스크립트는 이런 경우 스스로 최적화
    - 객체로 선언하는 방식은 사용 ❌
- 객체를 직접 박싱하는 경우 `Object()` 함수를 이용
    - 해당 객체를 직접 new 생성자를 이용해 박싱하는 경우 (string →String()) 주의 사항 존재
    - ex) Boolean()
    - false를 직접 new Boolean을 통해 래핑하는 경우 true값 리턴

---

### 3. 언박싱

: 객체 래퍼의 원시값 추출

- `valueof()` 메서드 이용
    
    ```jsx
    var a = new String("123");
    console.log(a.valueOf());   //123
    
    var b = new Boolean(false);
    console.log(b.valueOf());   //false
    ```
    
    : 암시적인 언박싱 발생
    

---

### 4. 네이티브 == 생성자

: 리터럴은 생성자 형식으로 만든 것ㄷ과 동일한 종류의 객체를 생성

- **1) Array()**
    - `Array()` 와 `new Array()`는 결과적으로 같음
    - 인자로 **숫자를 하나** 받으면 그 숫자는 **배열의 크기**
        
        ```jsx
        var a = new Array(3);
        
        var b = [undefined,undefined,undefined];
        var c = [];
        
        console.log(a);   //[ <3 empty items> ]
        console.log(b);   //[ undefined, undefined, undefined ]
        console.log(c);   //[ <3 empty items>
        ```
        
    - 빈 슬롯의 배열은 만들지 ❌
    
    ---
    
- **2) Object(),Function(), RegExp()**
    - 생성자는 선택사항 : 분명한 의도가 아니라면 사용 ❌
    - 리터럴 이용 → 거의 사용할 일 없음
    
    ---
    
- **3) Date(), Error()**
    
    : 리터럴 형식 ❌
    
    - date 객체
        - `new Date()`로 생성
        - 유닉스 타임스탬프 값(1970 1월 1일부터 현재까지 흐른 시간을 초단위로 환산)을 얻는 용도로 가장 많이 쓰임
        - `new` 키워드 없이 `Date()호출` 시 현재 날짜/시각에 해당하는 문자열 반환
            
            ```jsx
            var a = Date();
            
            console.log(a);   //Tue Jun 07 2022 04:28:22 GMT+0900 (Korean Standard Time)
            ```
            
    - Error 생성자
        - `new`의 유무에 상관없이 같은 결과
        - 현재 실행 컨텍스트를 포착하여 객체에 담는 것
        - 보통 `throw 연산자`와 함께 사용
        - 프로퍼디로 `message`가 있지만 `error.toString()`이 여러사람이 읽기에 좋음

---

- **4)Symbol()**
    
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

---

### 5. 네이티브 프로토타입

: 내장 네이티브 생성자는 각자의 `.prototype`객체를 가짐

- `prototype` 객체에는 해당 객체의 하위 타입별로 고유한 로직이 존재
- `참고`객체 리터럴 vs 배열 리터럴(프로토타입의 차이)
    
    ![스크린샷 2022-05-31 오전 1.59.30.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d34f76b6-e0dc-4a80-8b4f-045598e200cb/스크린샷_2022-05-31_오전_1.59.30.png)
    
    - 근본적 차이
        - 배열 리터럴 `arr`의 프로토타입 객체는 `Array.prototype`
        - 객체 리터럴 `obj`의 프로토타입 객체는 `Object.prototype`
- `prototype`은 이미 생성되어 내장된 상태 → 한번만 생성