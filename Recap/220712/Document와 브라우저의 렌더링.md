<aside>
💡 Document란 무엇인가요?

</aside>

Document란 웹사이트 그 자체다. HTML(Hyper Text Markup Language)은 본래 문서(논문)를 읽기 위한 용도로 생겨났다. 그렇기 때문에 웹사이트 그 자체를 Document라고 부르게 되었다.

<aside>
💡 DOM과 Tag는 무엇이며 어떤 차이점이 있나요?

</aside>

```html
<!DOCTYPE>
<head>
</head>
<body>
	<div id='root'>
		<h1>title</h1>
	</div>
</body>
```

위와 같은 HTML 코드가 있을때 Tag는 `<div>, <h1>`과 같은 일종의 ‘날개'이고, DOM(Document Object Model)은 그 ‘날개'를 type으로 갖는 녀석이라고 볼 수 있다. 그렇다면 위 코드에서 DOM의 예시로는 `<h1>title</h1>`을 들 수 있다. DOM은 type(날개_tag), text(내용), attributes를 갖는 객체라고 생각하면 편하다.

<aside>
💡 그렇다면 element는 무엇인가요?

</aside>

MDN 문서에 따르면 `element`는 Document 안의 모든 객체가 상속하는 제일 범용적인 기반 클래스로 공통 메서드와 속성만 가지고 있으며, 특정 요소를 더 상세하게 표현하는 클래스가 `element`를 상속한다. 예를 들어 HTMLElement 인터페이스는 HTML 요소의 기반 인터페이스이고 SVGElement 인터페이스는 모든 SVG 요소의 기초이다. 상속 관계는 아래와 같다.

![스크린샷 2022-07-13 오전 10.25.08.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/87adbeaf-ad70-4e7f-9e1c-e6acbcb72f78/스크린샷_2022-07-13_오전_10.25.08.png)

DOM은 HTML만을 제어하기 위한 모델이 아니다. HTML이나 XML, SVG, XUL과 같이 마크업 형태의 언어를 제어하기 위한 규격이기 때문에 Element는 마크업 언어의 일반적인 규격에 대한 속성을 정의하고 있고, 각각의 구체적인 언어를 위한 기능은 HTMLElement, SVGElement와 같은 객체를 통해서 추가해서 사용하고 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f26c3d48-302c-41d2-a6c6-e111962268c8/Untitled.png)

[Element - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/Element)

[Element 객체 - 생활코딩](https://opentutorials.org/course/1375/6681)

<aside>
💡 DOM Node vs DOM Element

</aside>

- DOM Node

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Page</title>
      </head>
      <body>
        <!-- Page Body -->
        <h2>My Page</h2>
        <p id="content">Thank you for visiting my web page!</p>
      </body>
    </html>
    ```

  위 HTML은 아래와 같이 노드들의 계층으로 구성되어 있다.

  ![https://i.imgur.com/RL1IrMs.png](https://i.imgur.com/RL1IrMs.png)

  HTML에 있는 tag들은 node들을 표현하게 된다. 여기서 그저 text이더라도 node가 된다는 것을 알 수 있다.

- DOM Element

  Element는 node의 특정 타입, 즉 Node.ELEMENT_NODE인 것이다. element는 HTML에서 태그로 적은 노드들을 지칭한다. 예를 들어 `<html>, <div>, <title>`과 같은 태그로 나타낸 것들은 전부 element이다.

    ```jsx
    const paragraph = document.querySelector('p');
    
    paragraph instanceof Node; // true
    paragraph instanceof HTMLElement; // true
    ```

  paragraph는 node이자 element이다.

- DOM 프로퍼티

  node에만 있는 DOM 프로퍼티와 element에만 있는 DOM 프로퍼티를 구분할 줄 알아야 한다.

    ```html
    <p>
      <b>Thank you</b> for visiting my web page!
    </p>
    ```

    ```jsx
    const paragraph = document.querySelector('p');
    
    paragraph.childNodes; // NodeList:       [HTMLElement, Text]
    paragraph.children;   // HTMLCollection: [HTMLElement]
    ```

  `p` 태그를 `childNodes` 와 `children` 으로 접근하였을 때, 그 결과가 달라진다.

  childNodes로 접근하면 **NodeList** 형태로 **HTMLElement와 Text**를 가져온다. 이는 p 태그 안에 자식 노드로 태그가 있는 elemenet인 `<b>Thank you</b>` 와 text node인 `for visiting my web page!` 가 있음을 나타낸 것이다.

  children으로 접근하면 **HTMLCollection** 형태, 즉 element만 가져오므로 text node인 `for visiting my web page!` 는 빠지고, element node인 `<b>Thank you</b>` 만 가져오게 된다.


[DOM은 무엇인가? DOM Node와 Element의 차이](https://velog.io/@yejineee/DOM%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-DOM-Node%EC%99%80-Element%EC%9D%98-%EC%B0%A8%EC%9D%B4)

<aside>
💡 웹페이지가 렌더링되는 과정을 설명해주세요!

</aside>

브라우저가 HTML 파일을 다운로드받아 파싱을 진행한다. HTML element들을 Node라는 JavaScript 객체로 변환하고, 이 노드 객체들로 트리 구조를 생성한다. 이것이 바로 `DOM 트리`다.

> 이때 DOM 트리를 구성하는 Node들이 반드시 HTML element여야하는 것은 아니다. 브라우저가 DOM 트리를 만들 때에는 comments, attributes, text 같은 것들을 트리의 분리된 노드에 저장한다.
>

다음으로 브라우저는 CSS 파일을 다운받아 파싱을 진행한다. 이후 브라우저는 `CSSOM이라는 트리 구조`를 생성한다. CSSOM의 각 노드는 DOM elements에 적용될 CSS style 정보를 가지고 있다. 하지만 <meta>, <script>, <title> 과 같이 스크린에 표시되지 않을 DOM elements에 대해서는 정보를 가지고 있지 않다.

브라우저가 Script 태그를 만나면 어떻게 될까? 브라우저는 이 Script를 자바스크립트 엔진에게 처리를 맡긴다. 엔진은 토크나이징/렉싱, 파싱을 거쳐서 `AST라는 추상 구문 트리`를 생성한다. 이 후 코드 생성 과정에서 AST를 컴퓨터가 실행할 수 있는 기계어로 바꾼다.

다음으로 브라우저는 HTML과 CSS가 파싱된 결과인 DOM 트리와 CSSOM 트리를 조합해서 `Render 트리`를 생성한다. 브라우저는 이 렌더 트리를 이용하여 `layout을 계산`한다. 이 과정에서 상대 값(vw, vh, %, rem, em)을 절대 값(px)로 변환한다. 또한 이 과정을 `reflow`라고도 한다. 렌더 트리는 pixel matrix의 어떠한 부분도 차지하지 않는, 그러니까 화면에 보이지 않을 노드들을 포함하지 않는다.

이제 계산된 값을 이용해 각 노드를 화면상의 실제 픽셀로 변환하고, 레이어를 만든다. 이 과정을 `repaint`라고 한다.

그리고 마지막으로 레이어를 합성하여 실제 화면에 나타내며 이 과정을 `Composite`라고 한다.

<aside>
💡 script 태그의 async, defer 속성을 아시나요? 각각의 기능을 설명해주세요!

</aside>

```html
<!DOCTYPE>
<head>
</head>
<body>
	<script src='index.js'/>
	<div id='root'>
		<h1>title</h1>
	</div>
</body>
```

위와 같은 코드가 있을 때, 만약 index.js에서 root div에 접근하려 한다면 성공할까? 브라우저는 HTML 파일을 다운로드 받고 파싱을 진행하는데 이때 도중에 script 태그를 만나면 HTML 파싱을 멈추고 script를 다운받는다. 이때 브라우저는 계속 HTML을 파싱하는 것이 아닌 블락 상태이다. 따라서 먼저 파싱이 끝난 script가 root div에 접근하려한다면 ReferenceError를 뱉을 것이다. 만약 HTML 파싱이 완전히 끝나고 script를 파싱한다면 이러한 사고를 막을 수 있지 않을까?

```html
<!DOCTYPE>
<head>
</head>
<body>
	<script src='index.js' defer/>
	<div id='root'>
		<h1>title</h1>
	</div>
</body>
```

놀랍게도 위의 코드는 정상 작동한다. defer 속성은 페이지가 모드 로드된 후에 해당 스크립트가 실행됨을 명시한다. 브라우저는 defer 속성이 있는 스크립트를 백그라운드에서 다운로드한다. 따라서 스크립트를 다운로드하는 도중에도 HTML 파싱이 멈추지 않는다. 그리고 defer 스크립트 실행은 페이지 구성이 끝날 때까지 지연된다. 그렇다면 defer 속성이 있는 스크립트를 head 태그 안에 써도 위 코드는 정상 작동하게 된다.

```html
<!DOCTYPE>
<head>
</head>
<body>
	<script src='index.js' async/>
	<div id='root'>
		<h1>title</h1>
	</div>
</body>
```

그렇다면 async 속성은 어떨까? async 속성이 있는 스크립트 또한 HTML의 파싱을 블락하지 않고 다운로드된다. 하지만 만약 HTML의 파싱이 끝나기 전에 스크립트가 실행된다면 위 코드는 오류를 뱉을 것이다. 이렇게 async 스크립트는 HTML의 파싱을 블락하지는 않지만 스크립트의 정상 작동 또한 보장하지 않는다. 하지만 이를 활용할 수 있는 곳이 있다. 만약 스크립트의 실행이 DOM 트리와 관계가 없다면? 그럼 스크립트가 먼저 실행되더라도 전혀 문제가 없을 것이다. 그러한 상용 서비스로 구글 애널리틱스가 있다.

<aside>
💡 자바스크립트는 인터프리터 언어인가요 컴파일 언어인가요? 만약 어느 쪽이라고 확정지어 말하지 못한다면 그에 대한 이유를 자바스크립트 엔진인 V8과 함께 설명해주세요!

</aside>

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/09dce5b0-d54b-4780-b581-f0d2c2301b44/Untitled.png)

![https://evan-moon.github.io/static/27979b3d2674a00f5b68af5f303fb27c/159fb/v8compiler-pipeline.png](https://evan-moon.github.io/static/27979b3d2674a00f5b68af5f303fb27c/159fb/v8compiler-pipeline.png)

`V8` 엔진은 실행할 자바스크립트 파일을 받아 `Parser`에게 넘기고, `Parser`가 소스 코드를 분석한 후 `AST`를 생성한다.

그 다음에 이 `AST`를 `Interpreter`에게 넘기는데, `Interpreter`는 자바스크립트 코드를 `바이트 코드`로 변환한다.

이후 코드를 수행하는 과정에서 `Profiler` 가 지켜보며 자주 사용되는 코드를  `Compiler`에게 전달한다. 전달된 코드는 `Compiler` 에 의해 `Optimized Machine Code` , 즉 최적화된 코드로 `Compile` 된다. 그러다가 다시 사용이 덜 된다 싶으면 `Decompile` 되기도 한다. (사용이 덜 되는지도 profiler가 지켜보며 판단)

코드를 우선 인터프리터 방식으로 실행하고 필요할 때 컴파일 하는 방법을 JIT(Just-In-Time) 컴파일러라고 부른다.

[JavaScript, 인터프리터 언어일까?](https://www.oowgnoj.dev/review/advanced-js-1)

[V8 엔진은 어떻게 내 코드를 실행하는 걸까?](https://evan-moon.github.io/2019/06/28/v8-analysis/)

<aside>
💡 모듈이란 무엇일까?

</aside>

### ESM(ECMA Script Module)

ESM은 ES6부터 지원하고 있는 표준 모듈 시스템이다. 그 이전까지는 필요한 파일(모듈)을 만들어서 같이 배포하고, `<script src="script.js">` 의 형태로 파일을 직접 불러오는 방법을 사용했다. 각각의 script 파일은 전역 스코프처럼 사용됐다. 이런 방식은 하위 script가 상위 script의 값을 쉽게 변경시키는 전역 오염이 발생하기 쉬우며 해당 script가 어떤 script에 의존성을 갖고 있는지 파악하기 힘들다.

이러한 문제 속에서 모듈화의 필요성이 높아져 ES6부터 ESM이 정식으로 도입된 것.

### Module

- `<script>` 태그에 `type=”module”`을 선언하면 자바스크립트 파일은 모듈로 동작하게 된다.
- 또한, 모듈을 사용하게 되면 별다른 처리를 하지 않아도 엄격 모드(strict mode)로 동작한다.
- 모듈의 가장 바깥쪽에서 선언된 이름은 전역 스코프가 아니라 모듈 스코프에서 선언된다.
- **export**로 해당 변수, 함수를 다른 모듈에서 **import**를 통해 의존할 수 있도록 지정할 수 있다.
