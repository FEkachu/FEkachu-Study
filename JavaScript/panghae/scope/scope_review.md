### 

## Scope란 무엇인가?

- 특정 장소에 변수를 저장하고 나중에 그 변수를 찾는데에 쓰일 잘 정의된 규칙이 필요하다. 이를 스코프라고 한다.
- 참조 대상 식별자(Identifier: 변수, 함수의 이름과 같이 어떤 대상을 다른 대상과 구분해 식별할 수 있는 유일한 이름)을 찾아내기 위한 규칙이다.

## Scope의 종류

1. Lexical Scope : 정적 스코프 → 함수나 변수가 선언된 위치에 관심을 두는 Scope. 함수가 선언된, 즉 Compile 시에 결정되는 Scope를 말한다.
2. Dynamic Scope : 동적 스코프 → 함수나 변수가 호출된 위치에 관심을 두는 Scope. 함수가 호출된, 즉 Runtime에 결정되는 Scope를 말한다.

Dynamic Scope를 채택한 언어로는 bash, LaTeX 등이 있는데 bash 외에는 들어본 적이 없다.

JS는 Lexical Scope를 채택한 언어이다. 이 말은 Compile 과정을 가진다는 의미로 해석이 가능한데, Javascript는 익히 인터프리터 언어로 유명한 언어이다. 이게 뭘까?

## Compile vs Interpreter

- 컴파일은 우리가 작성한 소스 코드를 오브젝트 코드로 변환시키는 과정을 의미한다. 컴파일 언어는 실행에 들어가기에 앞서 기계 언어로 미리 바꿔두기 때문에, 런타임 환경에서 매우 빠르게 동작한다. 컴파일 시간이 소요되지만, Syntax Error나 Type Error를 감지해 실제 동작에서 예상치 못한 에러를 마주할 일이 적다.
- 인터프리터 언어는 실행과 동시에 한 줄 씩 중간 언어로 해석한 다음에 실행한다. 별도의 컴파일 과정 없이 고급 언어를 바로 실행할 수 있어 변경 사항을 빠르게 테스트하기 좋고, 대화식으로 사용이 가능하다.

### Javascript는 인터프리터 언어인가?

- 자바스크립트는 실질적으론 컴파일이 되지만, 편의 및 문맥상 인터프리터 언어로 분류된다. 모던 자바스크립트 컴파일러는 `runtime 내에서 빠르게 컴파일(Just In Time Compilation)`을 수행한다.
- 자바스크립트의 목적은 웹 문서 구조를 동적으로 나타내기 위함이다. 이 때문에 목적에 맞게 인터프리터 언어로 만들어졌는데, 유저와 상호작용이 많아지면서 빠른 시간 내에 웹 페이지를 띄우고자 하는 수요가 많아졌다.
- 2009년에 등장한 구글의 V8 엔진은 필요에 따라 컴파일 과정을 거쳐서 자바스크립트의 실행 성능을 높이는 방식을 사용한다. → 런타임 환경에서 가장 많이 발생하는 브라우저의 작업은 변수, 객체, 함수 등의 메모리 상에서 위치를 탐색하는 작업이다.

[JS 성능 비교](https://12bme.tistory.com/134)

### Compile 과정

1. 토크나이징(Tokenizing)/렉싱(Lexing)

   문자열을 나눠 ‘토큰’이라고 불리는 가장 작은 단위의 의미 있는 조각으로 만드는 과정이다. 이때 ‘토크나이저’가 상태 유지 파싱 규칙을 적용해 토큰과 토큰 간의 관계를 파악한다면 렉싱이라고 부른다.

2. 파싱(parsing)

   토큰 배열을 프로그램의 문법 구조를 반영해 중첩 원소를 갖는 트리 형태로 바꾸는 과정을 말한다.

   → 파싱의 결과로 생성되는 트리를 AST(Abstract Syntax Tree) 추상 구문 트리라고 부른다.

   ### AST?

   프로그래밍 언어의 문법에 따라 소스 코드 구조를 표시하는 계층적 프로그램 표현을 말한다. AST의 노드는 소스 코드의 항목에 해당한다.

    ```jsx
    function square(n){
    	return n * n;
    }
    // 아래와 같으 구조를 가진다. 
    // {
    	// type : "FunctionDeclaration",
    	// id: {
    	// type : "Identifier",
    	// name : "square"
    	// },
    	// params : [
    		// {
    			// type : "Identifier",
    			// name : "n"
    		// }
    	// ],
    		// body: [
    			// type : "BlockStatement",
    			// body : [
    				// {
    					// type : "ReturnStatement",
    					// argument: {
    						// type : "BinaryExpression",
    						// operator: "*",
    						// ...
    ```

   [자바스크립트 개발자를 위한 AST(번역)](https://gyujincho.github.io/2018-06-19/AST-for-JS-devlopers)

3. 코드 생성

   AST를 컴퓨터에서 실행 코드로 바꾸는 과정을 말한다.


## 중첩 스코프

하나의 블록이나 함수는 다른 블록이나 함수 안에 중첩될 수 있으므로 스코프도 다른 스코프 안에 중첩될 수 있다.

중첩 스코프를 탐사하는 규칙은

1. 엔진은 현재 스코프에서 변수를 찾기 시작하고, 찾지 못하면 한 단계 씩 올라간다.
2. 최상위 글로벌 스코프에 도달하면 변수를 찾았든, 못 찾았든 검색을 멈춘다.