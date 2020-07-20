import "../scss/index.scss";
class Student {
  name: string
  age: Number
  constructor(name: string, age: Number) {
    this.name = name
    this.age = age
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`)
  }
};

let student:Student = new Student("张三", 20);
student.greet();