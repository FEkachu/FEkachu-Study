- 의존이란 무엇인가?
    
    “A가 B에 의존한다.”는 표현은 추상적인 표현이지만, 토비의 스프링에서 다음과 같이 정의한다.
    
    > 의존대상 B가 변하면, 그것이 A에 영향을 미친다.
    > 
    
    즉, B의 기능이 추가 또는 변경되거나 형식이 바뀐다면, 그 영향이 A에 미친다는 의미이다. 
    
    예시로 `햄버거 가게 요리사는 햄버거 레시피에 의존한다.` 햄버거 레시피가 변화하게 되었을 때, 변화된 레시피에 따라서 요리사는 햄버거 만드는 방법을 수정해야하기 때문이다. 이에 “요리사는 레시피에 의존한다.”라고 말할 수 있다. 
    
    [의존관계 주입(Dependency Injection) 쉽게 이해하기](https://tecoble.techcourse.co.kr/post/2021-04-27-dependency-injection/)
    

- 의존성 주입이란 무엇인가?
    
    의존성 주입은 하나의 패턴이다. 의존되는 클래스를 매개변수로 전달해준다면, 모듈 안에서 의존성들을 불러오거나 새로 만드는 것을 피할 수 있다. 
    
- 예시
    
    ```jsx
    //users-service.js
    const User = require('./User');
    const UsersRepository = require('./users-repository');
    
    async function getUsers() {
      return UsersRepository.findAll();
    }
    
    async function addUser(userData) {
      const user = new User(userData);
    
      return UsersRepository.addUser(user);
    }
    
    module.exports = {
      getUsers,
      addUser
    }
    ```
    
    위 `users-service.js`는 비즈니스 로직을 책임지고 있고, `user-repository`는 데이터들을 책임지고 있다. 하지만 위의 코드에는 2가지 문제가 존재한다.
    
    1. service가 특정 repository와 연결되어 있다는 것이다. 만약에 코드를 다른 repository로 바꾸고 싶다면, 위의 코드를 전부 교체해야한다. 이때 전부 교체한다는 의미는 결합성이 강하다는 것이고, 확정성이 떨어진다는 것을 의미한다.
    2. 테스트 코드 작성이 힘들다. getUser 메소드가 잘 작동하는지 확인하기 위해서는 테스트 라이브러리 jest를 사용한다 할 때, userRepository에 Mocking된 객체를 만들어줘야한다.
    
    위 코드를 DI를 사용해 수정하면 다음과 같이 작성할 수 있다.
    
    ```jsx
    const User = require('./User');
    
    function UsersService(usersRepository) { // 매개 변수로 넘긴다.
      async function getUsers() {
        return usersRepository.findAll();
      }
    
      async function addUser(userData) {
        const user = new User(userData);
    
        return usersRepository.addUser(user);
      }
    
      return {
        getUsers,
        addUser
      };
    }
    
    module.exports = UsersService
    ```
    
    위와 같이 수정하게 되면 `UsersService`는 `user-repository`와 약결합한 형태가 된다. 
    
    [[Spring] 의존성 주입(Dependency Injection, DI)이란? 및 Spring이 의존성 주입을 지원하는 이유](https://mangkyu.tistory.com/150)
    
    [[node.js] DI(의존성 주입) 구현하기](https://charming-kyu.tistory.com/17)
    
- 내가 구현한 DI
    
    ```jsx
    class Car{
      #name;
      #companyName;
      #totalFuel = 80;
      #fuelEfficiency = 15;
      #speed;
      driver;
      carStatusOn = false;
    
      constructor(name, companyName, driver){
        this.#name = name;
        this.#companyName = companyName;
        this.driver = driver;
      }
      static draggedByRekCar(instance){
        return `${instance.#companyName} car is dragged by RekCar. ${instance.#name} so sad`;
      }
      getPosibleTotalDistanceTravel() {
        return this.#totalFuel * this.#fuelEfficiency;
      }
      getName = () =>{
        return this.#name;
      }
      getCompanyName = () =>{
        return this.#companyName;
      }
    
      startCar = () =>{
        this.carStatusOn = true;
        return `${this.driver.getDriverName()}이 시동을 켰습니다.`;
      }
    
      pushAccelerator = () =>{
        const driverLocation = this.driver.getDriverLocation();
        if(driverLocation){
          if(!this.carStatusOn){
            return `${this.driver.getDriverName()}은 차의 시동을 켜야합니다.`;
          }
          this.#speed = 100;
          return `${this.driver.getDriverName()}은 시속 100km/h로 과속 중입니다.`;
        }else{
          return `${this.driver.getDriverName()}은 아직 차에 타있지 않습니다.`;
        }
      }
    }
    
    class ElectronicCar extends Car {
      #governmentSubsidy = 1000;
      static #instance;
      constructor(name, companyName, driver){
        if(ElectronicCar.#instance){
          return ElectronicCar.#instance;
        } 
        super(name, companyName, driver);
        ElectronicCar.#instance = this; 
      }
      decreaseGovernmentSubsidy = (amount) => {
        this.#governmentSubsidy -= amount;
      }
      increaseGovernmentSubsidy = (amount) => {
        this.#governmentSubsidy += amount;
      }
    
    }
    
    const driver = new Driver('해인');
    const elec1 = new ElectronicCar('붕붕이', '아우디', driver);
    console.log(elec1.pushAccelerator()); 
    console.log(driver.getInCar());
    console.log(elec1.pushAccelerator());
    console.log(elec1.startCar());
    console.log(elec1.pushAccelerator());
    
    // 실행 결과
    // 해인은 아직 차에 타있지 않습니다.
    // 해인이 차에 탑승했습니다.
    // 해인은 차의 시동을 켜야합니다.
    // 해인이 시동을 켰습니다.
    // 해인은 시속 100km/h로 과속 중입니다.
    ```

- extends <br/>
  [JavaScript 문법 - Class 상속 구현](https://velog.io/@onejaejae/JavaScript-%EB%AC%B8%EB%B2%95-Class-%EC%83%81%EC%86%8D-%EA%B5%AC%ED%98%84)