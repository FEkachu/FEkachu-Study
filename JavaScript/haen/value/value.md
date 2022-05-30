### 1. 배열

 : 1개의 변수에 여러개의 값을 순차적으로 저장할 때 사용

- 타입 : `객체(Object)`
- `Array` 생성자로 생성된 `Array타입`의 객체

---

**(1 )배열 생성** 

- 배열 리터럴
    
    (➕ 리터럴 : 프로그램의 코드상에 데이터의 값을 표현하는 방식)
    
    - 0개 이상의 data를 []로 묶음
    - 첫번째 값은 인덱스 ‘`0`’으로 접근
    - **빈슬롯** 주의! → 존재하지 않는 요소에 접근하면  `undefined` 반환
        
        ```jsx
        var a = ['red','yellow','orange','green','blue','purple'];
        console.log(a.length);  //6
        console.log(a[7]);  //undefined
        ```
        
    - 대부분의 언어는 같은 타입만 가능 → **JS** : `여러 데이터 타입`의 조합 가능
    - 배열도 하나의 `객체` : 키/ 프로퍼티 추가 가능
        - 객체 리터럴로 표기
            
            ```jsx
            const a = {
                '0':"red",
                '1':'yellow',
                '2':'orange',
                '3':'green',
                '4':'blue',
                '5':'purple'};
            
            console.log(a["0"]);  //red
            ```
            
        - 인덱스안에 문자열 형태로 `키` 추가
        - ex ) `a[”haen”] = 3`;
        - ❗️주의❗️
        - 키로 넣은 문자열이 `숫자형태(10진수)`이면 `인덱스`를 넣을 것과 **같은** 결과 초래
        
        ```jsx
        var arr = [];
        arr["13"] = 1;
        
        console.log(arr.length);    //14
        console.log(arr[13]);   //1
        ```
        
        → 배열에 문자열 타입의 키/ 프로퍼티 사용을 추천❌
        
        → 만일 사용한다면 : 객체를 대용하고, 원소의 인덱스는 숫자만 쓰도록
        
        <aside>
        💡 객체 리터럴 vs 배열 리터럴
        
        ![스크린샷 2022-05-31 오전 1.59.30.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d34f76b6-e0dc-4a80-8b4f-045598e200cb/스크린샷_2022-05-31_오전_1.59.30.png)
        
        - 근본적 차이
            - 배열 리터럴 `arr`의 프로토타입 객체는 `Array.prototype`
            - 객체 리터럴 `obj`의 프로토타입 객체는 `Object.prototype`
        </aside>
        

[유사배열]

- 유사배열을 진짜 배열로 바꾸고 싶을때 : 배열 유틸리티 함수 사용(`indexof()`, `concat()`, `forEach()`)

---

### 2. 문자열

- **문자열**과 **문자인 배열**은 **다름**!!
    - 문자열 : 불변값
        - 새로운 값을 재할당 했을 때, 문자열 메서드는 새로운 문자열을 생성 후 반환
    - 문자인 배열 : 가변값
        - 새로운 값을 재할당 했을 때, 곧바로 원소를 수정

---

- ❗️문자열의 유용한 점❗️
    
    : 대부분의 `배열 메소드`는 사용 ❌ (문자열은 불변, 배열은 가변값이기 때문)
    
    - `불변 배열 메소드`는 사용가능❗️❕
        
        ```jsx
        var a = "haen"
        
        //join 메서드는 배열의 원소를 문자열로 합침
        var b = Array.prototype.join.call(a, "-");
            //Aarry.prototype.join에서 Function.prototype.call을 호출
            // -> call(arguments) : argument안의 원소들을 합침
            // 배열 안의 모든 원소에 접근하기 위해 call 사용
        **// a는 문자열이지만 배열 메소드를 가져옴!**
        
        //map 메서드 : 배열내의 모든 원소에 대해 주어진 함수를 호출한 결과를 모아 새 배열로 반환
        var c = Array.prototype.map.call(a, function (v){
            return v.toUpperCase()+".";
        }).join(""); //""없이 join()으로만 호출하면 H.,A.,E.,N. 으로 출력
        **// a는 문자열이지만 배열 메소드를 가져옴!**
        
        console.log(a); //haen
        console.log(b); //h-a-e-n
        console.log(c); //H.A.E.N
        ```
        
    - `가변 메소드`는 불가
        - ex ) `reverse()`
            
            ```jsx
            var a = "haen"
            
            //join 메서드는 배열의 원소를 문자열로 합침
            var b = a.reverse();
            
            console.log(a);
            console.log(b); // TypeError : a.reverse is not a function
            ```
            
        - 문자열은 불변값이라 바로 변경 ❌ → 배열 가변메소드 사용 ❌
        - 사용하고 싶다면⁉️
            - **문자열**을 **배열**로 바꾼 후 작업 수행
            - → 이후 다시 문자열로 바꿈 (꼼수, 핵 Hack(전문용어))
            
            ```jsx
            var a = "haen"
            
            //join 메서드는 배열의 원소를 문자열로 합침
            var b = a
                .split("")  // 배열로 전환
                .reverse()  // reverse() 메서드 수행
                .join("");  // 다시 문자열로 전환
            
            console.log(a); //haen
            console.log(b); //neah
            ```
            
            ❗️주의❗️유니코드(특수문자, 멀티바이트) 문자가 섞여있는 경우 이 방법은 통하지 ❌
            
            (이를 사용하고 싶은 경우 `Esrever(에스레베르)`이용 (`reverse()`를 거꾸로 뒤집음))
            
        
        <aside>
        💡 문자열 자체에 어떤 작업을 빈번하게 수행하는 경우 
        **문자열을 문자단위의 배열로 취급**하는 것이 더 사용하기 좋음!
        -  문자열 → 배열 변환을 번거롭게 신경쓰지 않아도 됨 : 시간 절약
        -  배열 → 문자열 은 join(””)을 통해 간단히 가능
        
        </aside>
        

---

### 3. 숫자

 : 자바스크립트의 숫자타입은 `정수`와 `부동 소숫점 숫자`를 모두 아우름

→ `정수` =  `부동 소수점` 값이 없는 값 (12 = 12.0)

---

**(1) 숫자 구문**

- `소숫점 앞 정수`가 **0이면 생략 가능**
    
    ```jsx
    var a = 0.31;
    var b = .31;
    
    console.log(a); //0.31
    console.log(b); //0.31
    console.log(a === b); //true
    ```
    
- `소숫점 이하`가 **0이면 생략 가능**
    
    ```jsx
    var a = 12.0;
    var b = 12.;
    
    console.log(a); //12
    console.log(b); //12
    console.log(a===b); //true
    ```
    
    `12.` 같은 경우는 코드를 읽을때 혼동을 줄 수 있으니 추천❌ (틀린 코드는 아님)
    
- 아주 큰값 / 아주 작은 값 : `지수형`으로 표시
    
    : `toExponentioal()`의 결과값과 같음
    
    ```jsx
    var a = 2e7; //지수형으로 표기
    
    console.log(a); //20000000
    console.log(a.toExponential()); //2e+7
    ```
    
- 원시값에는 프로퍼티나 메소드가 존재❌
    - ex) `var a = “abc”`
    - `.length()`, `.toString()` 으로 접근하려면 객체 래퍼로 감싸주어야 함 (다른 언어에서는)
    - → `new String(”abc”)`
    - 자바스크립트는 원시값을 알아서 `박싱`해줌!
        
        ```jsx
        var a = "abc";
        
        console.log(a.length);  //3
        console.log(a.toUpperCase());   //ABC
        ```
        
        - 우리가 흔히 사용하는 위와 같은 방식이 가능
        - 자바스크립트는 이런 경우 스스로 최적화
        - 객체로 선언하는 방식은 사용 ❌
    - ∴ `숫자`값은 `Number.prototype 메서드`로 접근 가능
        - ex) `.toFixed()` : 지정한 소수점 이하 자릿수까지 나타냄
            
            ```jsx
            var a = 31;
            
            console.log(a.toFixed(0));  //31
            console.log(a.toFixed(1));  //31.0
            console.log(a.toFixed(2));  //31.00
            ```
            
            : 원래 값의 소수점 이하 숫자보다 더 많은 자릿수를 지정하면 그만큼 0이 우측에 붙음
            
        - `.toPrecision()` : 유효숫자 갯수 지정
            
            ```jsx
            var a = 31;
            
            console.log(a.toPrecision(1));  //3e+1
            console.log(a.toPrecision(2));  //31
            console.log(a.toPrecision(3));  //31.0
            ```
            
        - ❗️주의❗️
        - 값이 `소수`인 경우 .이 `프로퍼티 접근자`가 아닌(`.toFixed()`의 `.` 이 아니라) `숫자 리터럴`의 일부로 해석
            
            ```jsx
            console.log(12.toFixed(3)); //틀림
            
            //맞게 고치기
            console.log((12).toFixed(3));   //(1)12.000
            console.log(0.12.toFixed(3));   //(2)0.120
            console.log(12..toFixed(3));    //(3)12.000
            console.log(12 .toFixed(3));    //(4)12.000 //. 앞에 공백 존재
            ```
            
            → (1)에서 에러가 난 이유
            
            : `.`이 `12.리터럴` 의 일부가 되어 `.toFixed`메서드에 접근할 수단 ❌
            
            →(4) 같은 경우 다른 개발자들에게 혼란을 줄 수 있으므로 지양하는게 좋음
            
- 2진수, 8진수, 16진수 표기 가능
    
    : 2진수 - `0b`, 8진수 - `0o`, 16진수 - `0x`
    
    ---
    

**(2) 작은 소숫값**

- 부동 소숫점의 문제
    
    ```jsx
    console.log(0.1+0.2 == 0.3)    //false
    ```
    
    : `0.1`과 `0.2`도 원래 숫자와 일치 ❌ 
    
    → `0.1+0.2`도 `0.3과 가까운 값`일뿐 `0.3`은 ❌(0.300000004)
    
    - 이런 미세한 오차를 `머신 입실론` 이라 함 → `Number.EPSILON` 으로 정의 됨
        
        (`참고` JS의 머신 입실론 : 2의 -52제곱 )
        
    - `0.1+0.2`와 `0.3`을 비교하려면⁉️
        - 반올림 오차를 허용공차(tolerance)로 처리
            
            ```jsx
            console.log(0.1+0.2 == 0.3)    //false
            
            function numberToEqual(num1, num2){
                return Math.abs(num1-num2)<Number.EPSILON;
            }
            var a = 0.1 + 0.2;
            var b = 0.3;
            console.log(numberToEqual(a, b)); //true
            ```
            
- 부동 소수점의 범위
    - 최댓값 - `Number.MAX_VALUE` : 약 1.798e+308
    - 최솟값 - `Number.MIN_VALUE` : 약 5e-324
    - `정수`는 `Number.MIN_VALUE`보다 훨씬 작은 수준에서 `안전 범위`가 정해짐
        - 정수 최댓값 - `Number.MAX_SAFE_INTEGER` : `2^53-1` (약 9천조)
        - 정수 최솟값 - `Number.MIN_SAFE_INTEGER` : `-2^53-1` (약 -9천조)

---

**(3)정수**

- `Number.isInteger()`
    
    : 정수인지 확인하는 메소드
    
    ```jsx
    console.log(Number.isInteger(33)); //true
    console.log(Number.isInteger(33.1)); //false
    ```
    
- `Number.isSafeInteger()`
    
    : 안전한 정수인지 확인하는 메소드
    
    ```jsx
    console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER)); //true
    console.log(Number.isSafeInteger(Math.pow(2, 60))); //false
    ```
    
- 정수의 안전범위
    
    : `Number.MAX_SAFE_INTEGER` 와`Number.MIN_SAFE_INTEGER` 의 사이지만 비트연산과 같은 32비트 숫자에만 가능한 연산이 있으므로 실제 범위는 감소
    
    - 32비트연산을 고려한 정수의 안전범위
        - 최댓값 : `Math.pow(2,31)-1`
        - 최솟값 : `Math.pow(-2,31)`
    - 32비트 부호있는 정수로 강제변환 : `|0`

---

**(4) 특수 값**

- `undefined`
    - `void`연산
        
        : 어떤 값을 고의로 undefined로 만들 때 사용
        
        ```jsx
        var a = 43;
        
        console.log(a);     //43
        console.log(void a);    //undefined
        ```
        
- `null`
- `NaN`
    
    : 유효하지 않은 숫자, 연산 시 실패한 숫자
    
    - `NaN`의 `type`은 `Number`
        
        ```jsx
        console.log(typeof NaN);    //number1
        ```
        
    - **비교불능** : `NaN`는 다른 `NaN`의 값과 같지 않음‼️
        
        ```jsx
        var a = 1/"haen";
        var b = 1/"haen";
        
        console.log(a);     //NaN
        console.log(b);     //NaN
        console.log(a === b);    //false
        ```
        
    - ⁉️NaN인지 식별하는 방법은⁉️
        - `isNaN()`이용
            
            ❗️주의❗️
            
            `isNaN()`은 숫자가 아닌지만 판별 → 문자열도 숫자가 아니기에 `true`로 판별!
            
            - **제대로** `NaN`을 판별하려면⁉️
                
                → `Number.isNaN()`이용(ES6부터)
                
                ```jsx
                var a = 1/"haen";
                var b = "haen";
                
                console.log(isNaN(a));     //true
                console.log(isNaN(b));     //true
                
                console.log(Number.isNaN(a));    //true
                console.log(Number.isNaN(b));    //false
                ```
                
- `infinity` , `-infinity`
- `0`,`-0`
    
    : `-0`을 사용하는 이유
    
    → 어떤 변수값이 0에 도달하여 부호가 바뀌는 순간, 그 직전의 이동방향을 보존하기 위해
    
    (잠재적 정보 소실 방지를 위해)
    

---

(5) **특수 값의 동등 비교 : `Object.is()`이용**

```jsx
var a = 1/"haen";
var b = -3*0;

console.log(Object.is(a,NaN));     //true
console.log(Object.is(b,-0));     //true
console.log(Object.is(b,0));     //false
```

---

### 4. 값 vs 레퍼런스

:자바스크립트는 `포인터` 존재 ❌

→ 자바스크립트에서 레퍼런스 : 공유된 값을 가리킴

 `원시값`은 **값** 복사, `객체`/`함수` 등의 `합성값`은 **레퍼런스** 복사

![스크린샷 2022-05-31 오전 2.25.14.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d9db28c9-34c5-40d0-8c65-8607cdcdbbec/스크린샷_2022-05-31_오전_2.25.14.png)

- 원시값은 콜스택에 저장, 이미 콜스택에 저장되어 있는 값이면 그 값의 주소를 가리킴
- 메모리 힙은 항상 새로운 주소를 만듦
    
    ```jsx
    var a = [1,2,3];
    
    function hello(x){
        console.log(x.length);  //3
        x.push(7);
    
        x = [4,5,6];
        x.push(8);
    }
    
    hello(a);
    
    console.log(a); // [1,2,3,7]
    ```
    
    - 위 코드의 메모리 구조
        1. 초기
        
        ![IMG_0116.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/28176a71-c3eb-4aaa-b09b-7f22c8b965ee/IMG_0116.jpg)
        
        1. `hello(a)` : `hello()`함수에 들어감
            
            ![IMG_0117.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cab5c14b-4c7a-4e4e-9034-c33703bcb9a9/IMG_0117.jpg)
            
        2. x.push(7);
            
            ![IMG_0118.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c2031736-0d9a-49ff-a69f-0cc8cc2878a5/IMG_0118.jpg)
            
        3. x=[4,5,6];
            
            ![IMG_0119.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f6393f08-f7b6-43bf-9e2a-235bd8ef5495/IMG_0119.jpg)
            
        4. x.push(8);
            
            ![IMG_0120.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff13da0b-01c4-4159-978c-bad3b8f8658a/IMG_0120.jpg)
            
        
        → **결과**
            ![IMG_0121.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b1ea314d-f613-47e2-8d6f-322819229d52/IMG_0121.jpg)