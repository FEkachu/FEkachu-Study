# HTTP의 역사

## HTTP란?

팀 버너스 리에 의해 발명된 월드 와이드 웹에 내재된 프로토콜

## HTTP 0.9 - 원 라인 프로토콜

- 초기에는 버전 번호가 없었으나 차후 버전과 구분하기 위해 0.9로 불림
- 오로지 GET만 가능
- 헤더가 없었음 ⇒ 오로지 HTML 파일만 전송 가능 (Header의 Content-Type 부재)

## HTTP 1.0 - 기능을 추가했지만 아직 표준은 아님

- 버전 정보 전송 (GET HTTP/1.0)
- 상태 코드가 응답에 함께 전송
- HTTP 헤더 개념 도임
	- 메타 데이터 전송 허용
	- HTML외 다른 파일들 전송 가능

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a7e3cea3-5de5-40fd-9a9b-7183be9079f1/Untitled.png)

## HTTP 1.1 - 표준 프로토콜 (HTTP의 첫번째 표준 버전)

1. **커넥션 유지 (Persistent Connection)**
	1. HTTP를 이용한 데이터 전달은 TCP 세션 기반
	2. 1.0과 1.1의 차이는 TCP 세션을 지속적으로 유지할 수 없느냐 있느냐의 차이

	 ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/15d48b60-d02d-4da3-94ec-bb8eaf93012f/Untitled.png)

	  <aside>
	  💡 RTT 증가 해결 방법은 무엇이 있을까?

	  </aside>

	 **파이프라이닝**

	 ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/57550fe6-1f4f-46bd-b515-a8deb6d467e0/Untitled.png)

	 파이프라이닝이 없을 경우 왼쪽과 같이 각 요청에 대한 응답을 받아야만 다음 요청이 이루어짐

2. **호스트 헤더**
	1. HTTP 1.0 환경에서는 하나의 IP에 여러 개의 도메인을 운영할 수 없음
	2. HTTP 1.1에서는 Host 헤더의 추가를 통해 Virtual Hosting이 가능해짐
3. **강력한 인증 절차**
	1. proxy-authentication과 proxy-authorization의 추가
	2. www-authentication은 1.0부터 있었으나, 클라이언트와 서버 사이에 프록시가 위치하는 경우 프록시가 사용자의 인증을 요구할 수 있는 방법이 없었음

## HTTP 2

HTTP / 1.x 보다 지연 시간을 줄이고 응답 시간을 더 빠르게 할 수 있으며 멀티플렉싱, 헤더 압축, 서버 푸시를 지원하는 프로토콜

1. 멀티플렉싱
	1. 여러 개의 스트림을 사용하여 송수신
	2. 특정 스트림의 패킷이 손실되더라도 해당 스트림에만 영향
2. 서버 푸시

   ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5b1798ed-cca0-4824-bbdc-357bfef435dc/Untitled.png)

3. 헤더 압축
	1. HTTP / 1.x 는 헤더의 크기가 큼
	2. 같은 종류의 요청을 반복한다면 같은 헤더를 계속 보내는 낭비가 발생
	3. 허프만 코딩 압축 알고리즘을 사용하여 헤더의 변경된 부분만 알아내어 변경함

	 ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/68293970-cff2-481d-8377-fb29e6e322d7/Untitled.png)


## HTTP 3

- 가장 큰 차이점은 UDP를 사용한다는 점
- 처음에는 HTTP-over-QUIC이라는 이름 (QUIC은 Quick UDP Internet Connection)

  ### UDP를 사용하면서 오는 이득은?

	- TCP의 핸드쉐이크 과정 자체를 날려버림
	- TCP 통신 중에 패킷 손실이 발생하면 순서를 보장하는 TCP의 특성상 HOLB 현상 발생 가능

	### QUIC은?

	- 처음부터 핸드쉐이크 과정 최적화에 중점

	### UDP?

	- User Datagram Protocol
	- 패킷 간의 순서가 존재하지 않는 독립적인 패킷 사용
	- 목적지만 정해져 있다면 중간 경로는 상관 x, 종단간 연결 설정 x

	### 그렇다면 UDP를 채용했다는 것은 신뢰성과 패킷의 무결함을 포기했다는 것일까?

	- UDP의 진짜 장점은 커스터마이징
		- 기존의 TCP가 지닌 기능을 모두 구현 가능
	- UDP는 하얀 도화지 같은 프로토콜
		- 애초에 데이터 전송을 제외한 그 어떠한 기능도 정의되지 않음

	따라서 커스터마이징의 편리함 때문에 UDP를 채택한 것이지 신뢰성과 패킷의 무결함을 포기했다고 말할 수 없음
