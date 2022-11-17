## HSTS 란??

Web Site에 접속할 때, 강제적으로 HTTPS Protocol로만 접속하게 하는 기능이다.

즉 HTTPS Protocol을 지원하는 Web Site 에서, 자신은 HTTPS Protocol만 사용해서 통신할 수 있음을, 접속하고자 하는 Web Browser에게 알려 주는 기능이다.

요약하면, 보안을 강화시킬 목적으로, Web Browser에게 HTTPS Protocol만 사용하도록 강제하는 기능이다.

Web Browser에서도 HSTS 기능을 지원해야, HSTS 기능이 제대로 동작한다. 2010년 이후에 출시된 대부분의 Web Browser 버전에서는 HSTS 기능을 지원하고 있다. 참고로, IE는 11 버전부터, Chrome은 4 버전부터 지원하고 있다.

HSTS 기능을 사용하려면, Web Server 및 Web Browser 둘 다 기능을 지원해야 한다. HSTS 기능을 지원하는 Web Server 를 “HSTS enabled Server” 라고 부른다.

HSTS 기능은, Web Site의 보안에 관련된 Policy를 설정하는 기능에 속한다.

## HSTS를 사용하는 목적

사용자가 특정 Web Site에 접속할 때, 해당 Web Site가 HTTPS Protocol을 지원하는 지, 하지 않는 지 알지 못하는 경우가 대부분이다. 따라서 Web Browser로 접속 시, 주소창에 “https://” 또는 “http://” 와 같은 Protocol 이름을 입력하지 않고, 단지 도메인 이름(예를 들면, [www.naver.com](http://www.naver.com/))만 입력한다.

그러면, Web Browser는 먼저 HTTP Protocol(“http://” 사용)로 해당 도메인에 접속을 시도합니다. 해당 도메인이 HTTPS Protocol만을 지원하는 Web Site라면, ”301 Redirect” 또는 ”302 Redirect”   response를 보내어, Web Browser로 하여금 HTTPS Protocol로 다시 접속하라고 지시합니다.

사용자는 접속한 후에, 주소창 옆에 있는 자물쇠 아이콘 또는 접속된 URL주소 앞에 있는 “https://”를 보고, 해당 Web Site가 지원하는 Protocol이 HTTPS Protocol 인지 인식하게 됩니다.

만약 해커와 같은 공격자가, 중간자공격(MITM attack)을 하여, 중간에 Proxy Server를 두고, 사용자와는 HTTP 통신을 하고, 실제 Site 와는 HTTPS 통신을 해도, 사용자는 전혀 인식을 하지 못하게 됩니다. 즉 사용자가 실제 Site 와 주고 받는 모든 정보는 공격자에게 노출이 되게 됩니다. 이러한 공격을 “SSL Stripping” 공격(attack)이라고 부르며, 이러한 공격을 방지하기 위하여 HSTS 기능을 사용합니다. SSL Stripping은 SSL/TLS Hijacking이라고도 부릅니다.

즉 사용자가 실수로 HTTPS Protocol을 지원하는 Site를, HTTP Protocol로 접속 했을 때, 중간자 공격에 의해, HTTP Protocol을 사용한 통신을 하게 되고, 이로 인해 통신 정보가 공격자에게 노출이 되는 것을 방지하고자 하는 목적입니다.

## TLS

![IMG_7AFF1A08B397-1.jpeg](../img/http3.jpeg)

### Reference

[HSTS(HTTP Strict Transport Security) 기능](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=aepkoreanet&logNo=221575708943)

