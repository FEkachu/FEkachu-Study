class Car {
  static #instance;
  // Singleton
  // Car 인스턴스는 하나만 생성된다
  constructor() {
    if (Car.#instance) return Car.#instance;
    Car.#instance = this;
  }

  #color = "White";
  #year = 2020;
  #fuel = 50;
  #fuelEfficiency = 15;
  #wiper = false;
  #light = false;

  #checkFuel() {
    if (this.#fuel < 10) return "기름 부족 !!";
    else return "기름 충분 ~~";
  }

  controlWiper() {
    if (this.#wiper === false) {
      this.#wiper = true;
      console.log("와이퍼 켜짐");
    } else {
      this.#wiper = false;
      console.log("와이퍼 꺼짐");
    }
  }

  // 화살표 함수
  controlLight = () => {
    if (this.#light === false) {
      this.#light = true;
      console.log("라이트 켜짐");
    } else {
      this.#light = false;
      console.log("라이트 꺼짐");
    }
  };

  static compareColor(car1, car2) {
    return `${car1.#color} & ${car2.#color}`;
  }
}

class ElectronicCar extends Car {
  #batteryWeight;
  constructor() {
    super();
  }
}

const myCar = new Car();
const yourCar = new Car();
console.log(myCar === yourCar);
console.dir(myCar);
myCar.controlLight();
myCar.controlWiper();
yourCar.controlWiper();
const car2 = new ElectronicCar();
console.log(Car.compareColor(myCar, car2));
