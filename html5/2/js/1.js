function SuperClass() {
  this.name = "women";
  this.bra = ["a", "b"];
}
function SubClass() {
  this.subname = "your sister";
  //将SuperClass的作用域赋予当前构造函数，实现继承
  SuperClass.call(this);
}
var sub1 = new SubClass();
console.log(sub1)