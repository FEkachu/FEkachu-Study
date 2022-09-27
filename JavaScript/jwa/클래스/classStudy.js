class Car {
  #carName;
  #color;
  #year;
  #fuel = 50;
  #fuelEfficiency = 15;
  #wiper = false;
  #light = false;

  constructor(carName, color, year) {
    this.#carName = carName;
    this.#color = color;
    this.#year = year;
  }

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
  static #instance;
  #batteryWeight;

  // Singleton
  constructor(carName, color, year) {
    if (ElectronicCar.#instance) return ElectronicCar.#instance;
    super(carName, color, year);
    ElectronicCar.#instance = this;
  }
}

class Driver {
  #name;
  #age;
  #license;
  #drivingExperience;
  car;
  constructor(name, age, license, drivingExperience, car) {
    this.#name = name;
    this.#age = age;
    this.#license = license;
    this.#drivingExperience = drivingExperience;
    this.car = car;
  }

  judgeBeginner() {
    if (this.#drivingExperience <= 1) console.log("초보운전입니다.");
    else console.log(`운전 경력 : ${this.#drivingExperience}년`);
  }

  changeCar(newCar) {
    this.car = newCar;
    console.log("차 바꿈");
    console.log(this.car);
  }
}

const myElectronicCar = new ElectronicCar("붕붕이", "white", 2020);
const jeonghyeon = new Driver("정현", 25, false, 0, myElectronicCar);

console.log(jeonghyeon);
jeonghyeon.car.controlWiper();

const newCar = new Car("뉴카", "black", 2022);

setTimeout(() => {
  jeonghyeon.changeCar(newCar);
}, 3000);
