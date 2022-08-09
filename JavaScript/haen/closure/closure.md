## 5.1 클로저

- 클로저: 함수가 속한 **렉시컬 스코프를 기억하여 함수가 렉시컬 스코프 밖에서 실행될 때에도 이 스코프에 접근할 수 있게** 하는 기능
- MDN 정의
    - 클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.
- 클로저는 렉시컬 스코프에 의존해 코드를 작성한 결과로 발생
- 예시

    ```jsx
    function hello(){
        var x = 2;
        function bye(){
            console.log(x);
        }
        return bye;
    }
    
    var hi = hello();
    console.log(hi); // funcion : bye
    hi(); //2
    ```

  : 위의 코드를 보면 `hello()`라는 함수안에 `변수 x`와 `함수 bye`가 선언되어있다. `bye`는 자신의 외부 스코프인 변수 `x`를 접근하며, `hello()`는 `함수 bye`를 반환하는 함수이다.

  `var hi = hello();` 라는 구문에서 hello()는 실행 컨텍스트에서 제거되어 더이상 접근할 수 없는 것 처럼 보인다. 그러나 `hi();` 를 실행하면 hello()의 반환값으로 내부함수인 bye()가 실행되었고 `변수 x`가 출력되었다. 어떻게 이러한 결과가 가능한 것일까?

  우선 `var hi =  hello();` 에서 hello()는 그 안의 내부함수인 bye를 반환하기에 변수 hi에 bye가 저장되어있다. bye는 아직 존재하고 있고, bye는 자신의 외부 스코프에 존재하는 x를 참조하므로 hello가 사라지지 않고 유지 되고 있는 것이다.

  이와같이 **자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우, 외부 함수 밖에서 내부함수가 호출되더라도 외부함수의 지역 변수에 접근**할 수 있는데 이러한 함수를 **클로저(Closure)**라고 부른다.

    - 위의 MDN의 정의에서
        - 클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.

      라고 되어있는데 위의 예시와 함께 알기 쉽도록

      → 클로저는 내부함수와 그 함수가 선언됐을 때의 렉시컬 환경, 즉 내부함수를 포함하는 외부함수의 스코프의 조합을 뜻하며 이는 내부함수가 자신이 선언되었을 때의 스코프를 기억하여 자신이 선언된 스코프 밖에서 호출되어도 그 스코프에 접근할 수 있는 함수를 말한다.
  
    - 위의 코드에서 hello()의 변수 x는 bye에 의해 참조되는데, 이처럼 **클로저가 참조하는 외부함수의 변수**를 **자유변수(free variavle)**이라 한다. 이때 참조하는 변수는 복사본이 아닌 실제 변수에 접근한다는 것을 주의하자‼️

- 클로저는 자신이 생성된 스코프을 기억해야하기에 메모리차원에서 손해를 볼 수 있다. 그렇다면 클로저가 필요한 이유/유용하게 사용할 수 있는 방법은 무엇일까⁉️
    1. 상태 유지 : 현재상태를 기억하고 변경된 최신 상태를 유지할 수 있다.
    2. 전역변수의 사용 억제
        - 버튼이 클릭될 때마다 클릭한 횟수가 누적되어 화면에 표시되는 카운터가 있다

            ```jsx
            <!DOCTYPE html>
            <html>
            <body>
              <p>전역 변수를 사용한 Counting</p>
              <button id="inclease">+</button>
              <p id="count">0</p>
              <script>
                var incleaseBtn = document.getElementById('inclease');
                var count = document.getElementById('count');
            
                // 카운트 상태를 유지하기 위한 전역 변수
                var counter = 0;
            
                function increase() {
                  return ++counter;
                }
            
                incleaseBtn.onclick = function () {
                  count.innerHTML = increase();
                };
              </script>
            </body>
            </html>
            ```

          : 위 코드는 잘 동작하지만 변수 counter는 전역 변수이기 때문에 언제든지 누구나 접근할 수 있고 변경할 수 있다. 이는 의도치 않게 값이 변경될 수 있다는 것을 의미한다. 만약 누군가에 의해 의도치 않게 전역 변수 counter의 값이 변경됐다면 이는 오류로 이어진다

          따라서 이를 클로저를 통해 수정을 하면 아래와 같다.

            ```jsx
            <!DOCTYPE html>
            <html>
              <body>
              <p>클로저를 사용한 Counting</p>
              <button id="inclease">+</button>
              <p id="count">0</p>
              <script>
                var incleaseBtn = document.getElementById('inclease');
                var count = document.getElementById('count');
            
                var increase = (function () {
                  // 카운트 상태를 유지하기 위한 자유 변수
                  var counter = 0;
                  // 클로저를 반환
                  return function () {
                    return ++counter;
                  };
                }());
            
                incleaseBtn.onclick = function () {
                  count.innerHTML = increase();
                };
              </script>
            </body>
            </html>
            ```

          : 위의 코드에서 `increase()` 는 클로저를 반환하기에 클로저에 의해 렉시컬스코프가 계속 남아있다. 그렇기에 반환되는 함수는 increase의 스코프를 기억하고 있고, counter변수에도 접근할 수 있다. 또한  `increase()` 는 즉시실행함수이기에 한번만 실행이 된다. 따라서 `increase`가 호출되더라도 `var counter` 가 0으로 초기화 되지 않고 이전값을 바로 ++해서 반환해준다.

          이와같이 변수 counter는 increase에서만 존재하는 변수이기에 전역변수를 사용하는 것 보다 훨씬 안정적으로 사용할 수 있다.


### 5.2 반복문
    
아래의 코드는 반복문을 사용할 때 많이 볼 수 있는 오류이다.
    
```jsx
    var arr = [];
    
    for (var i = 0; i < 5; i++) {
      arr[i] = function () {
        return i;
      };
    }
    
    for (var j = 0; j < arr.length; j++) {
      console.log(arr[j]());
    }
   ```
    
: 아마 위의 코드는 0,1,2,3,4 를 출력하기 위해 사용한 코드 일 것이나, 출력결과는 5가 5번 출력된다.
    
이를 클로저를 이용해 수정하면 아래와 같다.
    
```jsx
    var arr = [];
    
    for (var i = 0; i < 5; i++){
      arr[i] = (function (id) {
        return function () {
          return id;
        };
      }(i));
    }
    
    for (var j = 0; j < arr.length; j++) {
      console.log(arr[j]());
    }
   ```
    
: 배열 arr에는 즉시실행함수에 의해 함수가 반환된다. 이때 즉시실행함수는 i를 인자로 전달받고 매개변수 id에 할당한 후 내부 함수를 반환하고 life-cycle이 종료된다. 매개변수 id는 자유변수가 된다. 배열 arr에 할당된 함수는 id를 반환한다. 이때 id는 상위 스코프의 자유변수이므로 그 값이 유지된다.
    
위 예제는 자바스크립트의 함수 레벨 스코프 특성으로 인해 for 루프의 초기문에서 사용된 변수의 스코프가 전역변수가 되기 때문에 발생하는 현상이다. [ES6의 let 키워드](https://poiemaweb.com/es6-block-scope)를 사용하면 이와 같은 문제는 말끔히 해결된다.
    
### Reference
    
[Closure | PoiemaWeb](https://poiemaweb.com/js-closure)