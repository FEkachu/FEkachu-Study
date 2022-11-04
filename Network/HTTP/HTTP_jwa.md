# 📍 HTTP

HTTP(Hypertext Transfer Protocol)는 TCP/IP의 하위 항목 중 하나로, 웹 상에서 클라이언트-서버 간 데이터를 주고 받기 위해 사용되는 프로토콜이다.

웹에 있는 모든 것은 자원이다. 어떤 자원에 접근하거나 추가, 수정하는 등의 행위는 모두 웹에 있는 자원을 다루는 것이며 HTTP는 그것을 위한 규칙이다.

## HTTP 프로토콜 특징

### 비연결성 (Connectionless)

비연결성은 클라이언트가 서버에게 리소스를 요청한 후 응답을 받으면 연결을 끊어버리는 것을 말한다.

서버에서 다수의 클라이언트와 계속 연결을 유지한다면 그에 따른 많은 리소스가 발생하기 때문에 응답을 처리한 후 연결을 끊어 서버의 부담을 줄이는 것이다.

하지만 연결을 끊기 때문에 서버가 클라이언트를 기억하고 있지 않으므로 매번 새로운 연결/해제에 대한 오버헤드가 발생한다는 단점이 있다. 이에 대한 해결책으로는 요청 헤더의 `Connection: keep-alive` 속성을 사용해 연결을 유지할 수 있다.

### 무상태성 (Stateless)

상태가 없다는 말은 각각의 데이터 요청이 서로 독립적으로 관리가 된다는 말이다. 즉, 이전 데이터 요청과 다음 데이터 요청이 서로 관련이 없다는 것이다.

따라서 서버는 클라이언트의 상태를 유지하지 않기 때문에 각 클라이언트에 맞게 리소스를 응답하는 것이 불가능하다.

클라이언트의 상태를 유지하지 않는다면 다음과 같은 일이 벌어진다.

1. 쇼핑몰 접속
2. 로그인
3. 상품 상세 페이지 이동
4. 로그인
5. 주문
6. 로그인
7. …

→ 매번 새로운 인증을 해야 하는 번거로움

이를 해결하기 위해 쿠키나 세션 또는 토큰 방식의 OAuth 및 JWT가 사용된다.

- 서버가 클라이언트를 기억할 수 있는 방법
  - 쿠키
    브라우저 단에 저장되어 서버가 클라이언트를 식별할 수 있도록 한다.
    사용자 정보가 브라우저에 저장되기 때문에 보안에 취약하다.
  - 세션
    쿠키와 달리 세션은 브라우저가 아닌 서버 단에 사용자 정보를 저장하는 구조이다.
    쿠키보다는 안전하지만 세션 정보도 중간에 탈취 당할 수 있기 때문에 보안에 완벽하다고는 할 수 없다.
    또한 서버에 사용자 정보를 저장하므로 서버의 메모리를 차지하게 되고, 동시 접속자 수가 많으면 서버 과부하의 원인이 된다.
  - 토큰 방식의 OAuth, JWT
    쿠키, 세션 문제점을 보완하기 위해 토큰 기반의 인증 방식이 도입되었다.
    토큰 인증 방식의 핵심은 보호할 데이터를 토큰으로 치환하여 원본 데이터 대신 토큰을 사용하는 것이다.
    따라서 중간에 토큰이 탈취 당하더라도 데이터에 대한 정보는 알 수 없으므로 보안성이 높다고 할 수 있다.
    하지만 꼭 토큰 기반 인증이 가장 좋다고는 할 수 없기 때문에 서비스에 따라 쿠키, 세션, 토큰 방식을 적절히 사용하는 것이 좋다.

---

## HTTP Reqest & Response

![Untitled](https://joshua1988.github.io/images/posts/web/http/http-full-structure.png)

클라이언트에서는 URL과 HTTP 요청 메서드를 이용해 서버에 자원을 요청하며, 서버는 요청에 대한 응답으로 상태 코드와 응답 Body를 보낸다.

## URL

URL(Uniform Resource Locators)은 웹 상에 있는 자원의 위치를 나타낸다.

- URL의 구조
  ![Untitled](https://joshua1988.github.io/images/posts/web/http/url-structure.png)

## HTTP 요청 메서드

클라이언트가 서버에 요청할 때, 어떤 동작을 수행할 건지 메서드를 통해 알린다.

- **GET**  
  서버에게 리소스를 요청한다. (READ, 조회)
- **POST**  
  생성할 데이터를 요청 body에 담아 서버에 전송한다. (CREATE, 생성)
- **PUT**  
  수정할 데이터를 요청 body에 담아 서버에 전송한다. (UPDATE, 수정)
- **DELETE**  
  서버에게 요청 URI 리소스를 삭제하도록 요청한다. (DELETE, 삭제)
- **PATCH**  
  PUT과 비슷하지만 리소스 일부만 수정한다는 점에서 차이가 있다.
- HEAD  
  서버 헤더 정보 요청, GET과 비슷하나 Response Body를 반환하지 않음
- OPTIONS  
  서버 옵션들을 확인하기 위한 요청. CORS에서 사용

## 응답 상태 코드

URL과 요청 메서드가 클라이언트에서 설정해야 되는 정보라면, HTTP 상태 코드는 서버에서 설정해주는 응답 정보이다.

이 상태 코드로 에러를 처리할 수 있기 때문에 프론트엔트 개발자 입장에서 꼭 알아야 하는 정보이다.

### 2xx : 성공

200번대 코드는 대부분 성공을 의미한다.

- 200 : GET 요청 성공
- 204 : No Content, 성공했으나 응답 body에 데이터가 없음
- 205 : Reset Content, 성공했으나 클라이언트 화면을 새로고침하도록 권고
- 206 : Partial Content, 성공했으나 일부 범위의 데이터마 반환

### 3xx : 리다이렉션

300번대 코드는 대부분 클라이언트가 이전 주소로 데이터를 요청해 서버에서 새 URL로 리다이렉트를 유도하는 경우이다.

- 301 : Moved Permanently, 요청한 자원이 새 URL에 존재
- 303 : See Other, 요청한 자원이 임시 주소에 존재
- 304 : Not Modified, 요청한 자원이 변경되지 않았으므로 캐싱된 자원을 사용하도록 권고. ETag 정보를 활용해 변경 여부 확인 가능

### 4xx : 클라이언트 에러

400번대 코드는 대부분 클라이언트의 코드가 잘못된 경우이다. 유효하지 않은 자원을 요청했거나 요청/권한이 잘못된 경우 발생한다.

- 400 : Bad Request, 잘못된 요청
- 401 : Unauthorized, 권한 없음, Authorization 헤더가 잘못된 경우
- 403 : Forbidden, 리소스에 대한 권한 없음
- 404 : Not Found, 서버에 없는 페이지

### 5xx : 서버 에러

500번대 코드는 서버 쪽에서 오류가 난 경우이다.

- 501 : Not Implemented, 요청한 동작에 대해 서버가 수행할 수 없는 경우
- 503 : Service Unavailable, 서버가 과부하 또는 유지 보수로 내려간 경우

## HTTP 헤더

헤더는 클라이언트와 서버가 요청 또는 응답으로 부가적인 정보를 전송할 수 있도록 해준다.

- General Header : 요청과 응답 모두 적용되지만 바디에서 최종적으로 전송되는 데이터와는 관련이 없는 헤더
- Request Header : 리소스나 클라이언트에 대한 자세한 정보를 포함하는 헤더
- Response Header : 응답에 대한 부가적인 정보를 갖는 헤더
- Entity Header : 엔티티 바디에 대한 자세한 정보를 포함하는 헤더

대표적인 속성들을 살펴보자.

### General Header (공통 헤더)

- Date
- Connection
  - close : 메세지 교환 후 TCP 연결 종료
  - Keep-Alive : 연결 유지

### Request Header (요청 헤더)

- Host
  요청하는 자의 호스트명, 포트 번호를 포함한다.  
  `Host: wein.konkuk.ac.kr`
- User-Agent
  요청자의 소프트웨어 정보를 표현한다. (os, 브라우저, 기타 버전 정보)  
  `User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36`
- Accept
  요청자가 원하는 미디어 타입 및 우선순위를 표현한다.
  - Accept-Language : 사용자가 원하는 언어셋
  - Accept-Encoding : 사용자가 원하는 인코딩 방식
    `Accept: application/json, text/plain, */*` : json → text → all type 순으로 받는다.  
    `Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7` : q는 가중치  
    `Accept-Encoding: ****gzip, deflate, br` : gzip, deflate, br 등등의 압축 포맷을 받는다.
- Content-Type
  POST/PUT 메서드를 사용할 때 본문의 타입
- If-Modified-Since
  명시한 날짜 이후로 변경된 리소스만 획득
- Origin
  요청이 어느 도메인에서 왔는지 명시, 서버의 `Access-Control-*` 속성에 필요
- Cookie
  서버의 `Set-Cookie` 로 설정된 쿠키 값

### Response Header (응답 헤더)

- Access-Control-\*
  CORS를 허용하기 위한 웹사이트 명시  
  `Access-Control-Allow-Origin: *`
- Set-Cookie
  클라이언트에 쿠키 설정  
  `Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1`
- Last-Modified
  요청한 리소스가 마지막으로 변경된 시각
- Location
  3xx 상태 코드일 때, 리다이렉션 되는 주소
- Allow
  요청한 리소스에 대해 가능한 메서드들  
  `Allow: GET, HEAD`

### Reference

[[HTTP] HTTP 특성(비연결성, 무상태)과 구성요소 그리고 Restful API](https://victorydntmd.tistory.com/286#recentComments)

[프런트엔드 개발자가 알아야하는 HTTP 프로토콜 Part 1](https://joshua1988.github.io/web-development/http-part1/)

[Must-Know-About-Frontend/http.md at main · baeharam/Must-Know-About-Frontend](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/network/http.md)

[프런트엔드 개발자를 위한 HTTP 프로토콜 기초](https://leehwarang.github.io/docs/tech/http.html)
