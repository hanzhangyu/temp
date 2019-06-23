var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("f(): called");
    };
}
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("g(): called");
    };
}
function log(target, name, descriptor) {
    var oldValue = descriptor.value;
    descriptor.value = function () {
        console.log("Calling " + name + " with", arguments);
        return oldValue.apply(this, arguments);
    };
    return descriptor;
}
function clsD(target) {
    target.add = function (a, b) {
        return a + b;
    };
}
let C = class C {
    constructor() {
        console.log('constructor');
    }
    method() { }
    minus(a, b) {
        return this.add(a, -b);
    }
};
__decorate([
    f(),
    g()
], C.prototype, "method", null);
__decorate([
    log
], C.prototype, "minus", null);
C = __decorate([
    clsD
], C);
const c = new C();
c.minus(3, 1);
//# sourceMappingURL=decorator.js.map