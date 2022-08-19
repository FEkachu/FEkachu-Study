### this의 두 가지 오해

1. this는 자기 자신을 가리킨다.
    
    ```jsx
    function foo(num){
    	console.log("foo : " + num);
    	this.count++;
    }
    
    foo.count = 0;
    
    var i ;
    
    for(i=0; i < 10; i++){
    	if(i > 5){
    		foo(i);
    	}
    }
    
    console.log(foo.count); // 0
    console.log(this.count); // NaN
    ```
    
    위와 같은 예시에서 this가 자기 자신을 가리켰다면, foo.count는 4라는 값을 가졌어야한다. 하지만 그렇지 않다. 이는 this가 자기 자신인 foo를 가리키지 않았다는 의미이다. 
    
2. this는 자신의 스코프를 가리킨다.
    
    **this는 어떤 방식을 사용해도 렉시컬 스코프를 참조할 수 없다.** 내부적으로 스코프는 별개의 식별자가 달린 property로 구성된 객체의 일종이나 스코프 객체는 자바스크립트 엔진의 내부 부품이어서 일반적인 자바스크립트 코드로는 접근이 불가능하다.
    

### this란 무엇인가?

this는 작성 시점이 아닌, 런타임 시점에서 바인딩되며(실행 컨텍스트 내부에 binding된다.) 함수 선언 위치와 관계 없이 오로지 함수를 어떻게 호출했냐에 따라 정해진다. this는 함수가 실행되는 동안 이용할 수 있다. 

```jsx
function speak () {
  console.log(this.sound)
}
var realDuck = {
  sound: 'quack!',
  speak: speak
}
var rubberDuck = {
  sound: 'beep beep',
  speak: speak
}
realDuck.speak()   // quack!
rubberDuck.speak() // beep beep
```

함수 내부에서 this 키워드는 호출 시점에서 이 함수를 property로 가지는 객체를 의미한다. 

[this가 뭐죠?](https://medium.com/@nemo1275/this%EA%B0%80-%EB%AD%90%EC%A3%A0-81698d54c808)