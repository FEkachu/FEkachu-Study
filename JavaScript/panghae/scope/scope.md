## JavaScript Scope

- Javascript는 lexical scope를 채택한 언어이다.
  - lexical scope에서 lex가 무엇인가?
    lex는 컴파일 과정에서 발생한다. javascirpt의 compile은 총 세 가지 단계로 이루어진다.
    1. tokenizing

       token은 JS에서 의미를 가지는 최소 단위를 의미한다. 구문을 token으로 자르는 행위를 tokenizing이라고 한다.

    2. lexing

       token들을 합쳐서 조금 더 의미 있는 lex라는 단위로 만드는 과정이다. 예를 들어 H, H, O가 있을 때 H,H,O 각각은 원자(token)이고 H~2~O는 분자(lex)이다.

    3. parsing

       lex들을 프로그램의 문법 구조를 반영하여 중첩 원소를 갖는 트리 형태로 바꾸는 과정을 말한다. 쉽게 말해 lexing을 통해 생성된 lex들을 관계 맺는 과정이다. ⇒ Abstract Syntax Tree(추상 구문 트리)를 생성한다
    - 예시
      ```jsx
      <h1>
        <div>FEkachu</div>
      </h1>

      // 1. tokenizing
      // <, div, >, FEkachu, </, div, >

      // 2. lexing
      // lex {
        // type : div
        // text : h1
      // },
      // lex {
        // type : h1
      // }

      // 3. parsing
      // lex {
        // type : h1
        // children : lex {
          // type : div
          // text : FEkachu
        // }
      // }
      ```
  - 그렇다면 lexical scope란?
    lexing 과정(lexing time)에서 정해지는 scope를 의미하고, 이는 개발자가 코드를 짤 때 변수와 scope 블록을 어디서 작성하는가에 기초해 lexer가 코드를 처리할 때 확정되는 scope를 의미한다.  

- scope의 해석
  - 규칙의 관점
    lexical scope, dynamic scope
  - 범위의 관점
    function-level scope(Local scope), global scope
    - Local Scope
      - function-level scope
        함수 내부에서 사용 가능한 scope
      - block-level scope( ES6 ~ )
        block 단위 안에서 사용 가능한 scope
        ```jsx
        {
          const a = 1;
          console.log(a); // 1
        }
        console.log(a); // ReferenceError
        ```
    - Global scope
      - 전역에 선언되는 변수 and 함수를 제외한 곳에 선언된 var가 속하는 scope
        ```jsx
        var a = 1;
        if (true) {
          var b = 2;
        }
        console.log(b);
        ```
  - 또는 현상이라고 보는 관점이 있다.
- scope chaining
  - scope chaining은 실행 시, EC에서 일어난다.
    ## 실행 컨택스트(Execution Context)
    - 실행 컨텍스트란?
      실행 컨텍스트는 4가지 환경에서 생성된다.
      1. 실행(전역 코드)
      2. 블록 생성 시(ES6 ~ , 블록코드)
      3. 함수 실행(함수 내부 코드)
      4. eval()
      EC는 함수 실행할 때 참조를 위해 생성되며, 실행 때의 전반적인 상황을 파악하기 위해 생성되는 자료구조이다. EC는 실행 시, scope가 참조하는 대상이 된다.
    - 실행 컨텍스트는 각각 따로 생성되며, global ec를 제외한 ec들은 부모 ec를 담고 있다.
    ```jsx
    var i = 0; // 1

    function runA() {
      // 2
      console.log(i); // 4
    }
    runA(); // 3

    // global EC
    // variables : {i (1 실행 시 담김), runA : 함수 내용 (2 실행 시 담김)}

    // runA EC (3 실행 시 생성)
    // parents : global EC
    // variables : {}

    // log EC (4 실행 시 생성)
    // parents : runA EC
    // variables : {data : i}
    // 해당 블록에서 설명하는 EC는 간단한 버전

    // EC
    // lexical environment : 값이 변경되는 것이 기록된다.
    // variable environment : snapshot(원본이 담겨있다. ,[environmentRecord, outer-environmentRecord])
    // 해당 EC의 this
    ```
    위의 예제 코드에서 console.log()가 실행되면 log EC가 생성되고, i를 검색하는데 해당 EC에서 찾을 수 없을 시, 부모 EC로 이동하면서 i를 탐색한다. 이를 스코프 체이닝이라고 한다.
- var, let, const
  - 변수 선언 과정
    1. 변수 선언 → 스코프, EC에 등록된다.
    2. 메모리 할당
    3. 변수 대입
  - var
    - 변수 선언과 메모리 할당까지 일어난다.
    - 변수 재선언, 재할당도 자유롭게 가능하다.
    - 블록을 스코프로 인식하지 않는다.
    ```jsx
    console.log(a); // undefined
    var a = 0;

    var b = 1;
    console.log(b); // 1
    ```
    변수 선언과 메모리 할당까지 일어나지만, 대입하는 과정이 일어나지 않아 undefined가 출력 되고 아래 코드는 정상적으로 출력된다.
    ```jsx
    var a = 1;
    var a = 3;
    console.log(a); // 3

    function checkA() {
      console.log(a); // undefined
      var a = 2;
      console.log(a); // 2
    }

    checkA();
    ```
    자유롭게 재할당이 가능한 것 확인할 수 있다.
    undefined,2를 출력한 console.log()의 모두 해당 scope안에서 a의 해당하는 값을 찾았으므로 스코프 체이닝이 일어나지 않는다.
  - let
    - 변수 선언만 일어난다.
    - 변수 재할당은 가능하지만, 재선언은 불가능하다.
    - 함수, 블록을 스코프로 인식한다.
    ```jsx
    console.log(a);
    let a = 0; // ReferenceError : cannot access before initialization
    ```
    변수 선언만 일어나기 때문에 메모리가 확보되지 않아 ReferenceError가 발생한다.
    ```jsx
    let a = 1;
    let a = 2;
    console.log(a); // SyntaxError : Identifier has already declared

    ---

    let a = 1;
    a = 2;
    console.log(a); // 2
    ```
    재선언이 불가능한 것을 볼 수 있다.
  - const - block-level scope
    - 변수 선언만 일어난다.
    - 변수 재할당, 재선언 모두 불가능하다.
    - 함수, 블록을 스코프로 인식한다.
    ```jsx
    console.log(a);
    const a = 0; // ReferenceError : cannot access before initialization
    ```
    변수 선언만 일어나기 때문에 메모리가 확보되지 않아 ReferenceError가 발생한다.
    ```jsx
    const a = 1;
    const a = 2;
    console.log(a); // SyntaxError : Identifier has already declared

    const a = 1;
    a = 2;
    console.log(a); // TypeError : Assignment to constant variable.
    ```
    재선언, 재할당 모두 불가능한 것을 확인할 수 있다.
  - function
    function은 변수 선언, 메모리 할당, 변수 대입이 한 번에 일어난다.
    ```jsx
    hello(); // hello world!
    function hello(){
        console.log('hello world!');
    }
    hello(); // hello world!
    // 위치와 관계 없이 잘 실행된다.

    ---

    hello(); // TypeError
    var hello = () =>{
        console.log('hello world!');
    }
    hello(); // hello world!
    // 함수 표현식과 같은 경우, var, let, const의 변수 생성 규칙을 따른다.
    // 해당 식의 경우 var hello -> var은 선언과 할당만 일어나기 때문에 error가 발생
    ```
  - Hoisting
    - var, let, const, function 모두 호이스팅 대상이다. 보통 ‘호이스팅'이라고 하면 ‘변수의 선언과 대입을 분리한 후, 선언만 코드의 최상단으로 옮기는 작업’을 말한다.
    - 이때 var은 메모리 할당까지 일어났기 때문에 undefined로 초기화되었고 함수는 대입까지 이뤄지기 때문에 문제없이 실행된다. let과 const는 Error을 발생시킨다.
      - 해당 Error가 발생하는 장소를 scope에서 TDZ(Temporal Dead Zone)라고 한다. TDZ의 범위는 scope의 시작 ~ 변수 선언부 까지이다.
        ```jsx
        function tdz() {
          // TDZ start
          console.log(tdzTest); // ReferenceError: Cannot access before initialization
          // TDZ finish
          let tdzTest = 0;
          console.log(tdzTest); // 0
        }
        tdz();
        ```
