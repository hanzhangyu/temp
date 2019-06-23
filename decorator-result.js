// 为每个属性做一些初始化（如decorator是一个curry函数）以及添加descriptor（编译时）
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc, // 获取默认的属性描述符
      curDecorator;
    // region 搜集descriptor至 r
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((curDecorator = decorators[i]))
          r =
            (c < 3
              ? curDecorator(r)
              : c > 3
              ? curDecorator(target, key, r)
              : curDecorator(target, key)) || r;
    // endregion

    // defineProperty
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

function f(name) {
  console.log("f(): evaluated " + name);
  return function(target, propertyKey, descriptor) {
    console.log("f(): called " + name);
  };
}
function g() {
  console.log("g(): evaluated");
  return function(target, propertyKey, descriptor) {
    console.log("g(): called");
  };
}
function log(target, name, descriptor) {
  var oldValue = descriptor.value;
  descriptor.value = function() {
    console.log("Calling " + name + " with", arguments);
    return oldValue.apply(this, arguments);
  };
  return descriptor;
}
function clsD() {
  return function(target) {
    target.prototype.add = function(a, b) {
      return a + b;
    };
  };
}
var C = /** @class */ (function() {
  function C() {
    console.log("constructor");
  }
  Object.defineProperty(C.prototype, "data", {
    get: function() {
      return this._data;
    },
    set: function(val) {
      this._data = val;
    },
    enumerable: true,
    configurable: true
  });
  C.staticMethod = function() {};
  C.prototype.method = function() {};
  C.prototype.minus = function(a, b) {
    return this.add(a, -b);
  };
  // region 1. 实例方法
  __decorate(
    [
      f() // 访问描述符只能应用一个装饰器，因为对于装饰器来说set/get是一体的
    ],
    C.prototype,
    "data",
    null
  );
  __decorate([f(), g()], C.prototype, "method", null);
  __decorate([log], C.prototype, "minus", null);
  // endregion
  // region 2. 静态方法
  __decorate([f("static")], C, "staticMethod", null);
  // endregion
  // region 3. 类
  C = __decorate([clsD()], C);
  // endregion
  return C;
})();
var c = new C();
c.minus(3, 1);
function testAble() {
  return function(target) {
    target.prototype.someValue = true;
  };
}
var SomeClass = /** @class */ (function() {
  function SomeClass() {}
  SomeClass = __decorate([testAble()], SomeClass);
  return SomeClass;
})();
var someClass = new SomeClass();
someClass.someValue; // true
// endregion
// reflect-metadata
// 属性描述符
