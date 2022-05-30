### 스코프(Scope)

: 변수에 접근 할 수 있는 범위 

- 참조 대상 식별자(변수나 함수 이름이과 같이 어떤 대상을 다른 대상과 구분하여 식별할 수 있는 이름)을 찾아내기 위한 규칙. 자바스크립트는 스코프로 식별자를 찾음

→ 같은 이름의 변수가 두번 선언되었을 때 어떤 변수를 참조해야 하는지, 이를 JS가 어떻게 식별하는지 정해진 규칙이 스코프

---

- 모든 변수는 스코프를 갖음
- 변수는 선언된 위치에서 스코프를 갖음.
    
    : 전역으로 선언된 변수는 전역 스코프를 갖는 전역변수, local에서 선언된 변수는 지역 스코프를 갖는 지역변수
    

---

- **global(전역) 스코프**
    
    : 전역에 선언되어 있어 어느 곳에서든지 해당 변수에 접근가능의 의미
    
    - C 와의 차이점
        
        C :  main함수가 실행 시작점이 되기 때문에 전역 변수를 선언 하려면 main밖에 선언해야함
        
        JS : 별다른 시작점이 존재 X. → 코드가 나타나는 부분이 바로 해석되고 실행
        
        ⇒ 전역 변수의 남발이 쉬움 (주의! 변수이름 중복, 의도치 않은 값 재할당으로 코드를 예측하기 어렵게 만듦)
        
    - 비 블록 레벨 스코프
        
        ```jsx
        if (true) {
          var num = 7;
        }
        console.log(num); // 7
        ```
        
        : JS는 블록 레벨 스코프가 아닌 함수 레벨 스코프이므로 블록내에 변수가 선언 되었다 하더라도 함수 외부에 있으면 전역 스코프를 가짐
        
    
    ---
    
- **local(지역) 스코프**
    
    : 해당 지역에서만 접근할 수 있어 지역을 벗어난 곳에서는 접근할 수 없다는 의미
    
    → 자바스크립트에서 함수를 선언할 때마다 새로운 스코프를 생성(선언 후 실행 과정에서)
    
    → 함수 body에서 선언된 변수는 해당 body에만 접근 가능 : ‘함수 스코프'라고 부름
    
    ```jsx
    var x = 20;     // 전역변수
    
    (function () {
      var y = 10;   // 지역변수
    })();
    
    console.log(x); // 20
    console.log(y); // "y" is not defined
    ```
    
    : b는 함수 내에서 선언되었으므로 지역 변수!
    

---

**자바스크립트 스코프의 특징**

- 대부분의 C-family-language는 블록 레벨 스코프를 따름
    
    (블록 레벨 스코프 : 코드 블록 내에서 유효한 스코프)
    
    ```c
    int main(void) {
    
      if (1) {
        int num = 4;
        printf("num = %d\n", num);
      }
    
      printf("num = %d\n", num); // 오류!!
    
      return 0;
    }
    ```
    
     : if문에서 사용된 변수는 if문 밖에서 사용 불가
    
- 자바스크립트 스코프 : 함수 레벨 스코프
    
    ```jsx
    var x = 0;
    {
      var x = 1;
      console.log(x); // 1
    }
    console.log(x);   // 1
    
    let y = 0;
    {
      let y = 1;
      console.log(y); // 1
    }
    console.log(y);   // 0
    ```
    
    : 함수 블록 내에서 선언된 변수는 함수 내에서만 유효
    
    화살표 함수(익명함수)는 블록 스코프로 취급!
    

**렉시컬 스코프**

: 프로그램 언어의 상위 스코프를 결정하는 방식

- 동적 스코프    : 함수를 어디서 호출하는 지에 따라 상위 스코프 결정
- 렉시컬 스코프 : 함수를 어디서 선언하는 지에 따라 상위 스코프 결정

```jsx
var name = 'haen'; // (1)변수 선언 (6)변수 대입
function hello(word) { // (2)변수 선언 (3)변수 대입
  console.log(word + ' ' + name); // (11)
}
function say () { // (4)변수 선언 (5)변수 대입
  var name = 'nico'; // (8)
  console.log(name); // (9)
  hello('hello'); // (10)
}
say(); // (7)
// 결과 : nico hello haen
```

**변수에 따른 스코프 범위**

- const : 블록 스코프 / 함수 스코프
- let :  블록 스코프 / 함수 스코프
    
    ```jsx
    for(let i=0; i<10; i++) {
      console.log(i);
    }
    // 전역스코프에서 선언한 변수 i 는 존재하지 않음으로 아래에서 ReferenceErrer을 일으킨다.
    console.log(i); // ReferenceErrer
    ```
    
- var : 함수 스코프
    
    ```jsx
    for(var i=0; i<10; i++) {
      console.log(i);
    }
    // var 키워드로 선언한 변수 i 는 지역 스코프에서 선언되었지만 모든 스코프에서 접근 가능하다.
    console.log(i); // 10
    ```
    

⁉️ 스코프가 없다면?

: 같은 변수, 같은 함수 이름은 충돌을 일으키므로 프로그램 전체에서 하나밖에 사용할 수 없음.