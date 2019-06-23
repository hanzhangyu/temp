function f(name?: string) {
    console.log("f(): evaluated " + name);
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called " + name);
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}


function log(target, name, descriptor) {
    var oldValue = descriptor.value;
    descriptor.value = function () {
        console.log("Calling " + name + " with", arguments);
        return oldValue.apply(this, arguments);
    };
    return descriptor;
}

function clsD(): ClassDecorator {
    return function (target) {
        target.prototype.add = function (a, b) {
            return a + b;
        }
    }
}

function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

interface IC {
    method(): void;
    minus(a: number, b: number): number;
    add(a: number, b: number): number;
}


@classDecorator
@clsD()
class C implements IC {
    // 显式赋值断言修饰符，组织ts不识别decorator注入的类成员
    public add!: (a: number, b: number) => number;

    private _data: number;

    @f() // 访问描述符只能应用一个装饰器，因为对于装饰器来说set/get是一体的
    get data() {
        return this._data;
    }
    set data(val: number) {
        this._data = val;
    }

    @f("static")
    static staticMethod() {};

    @f()
    @g()
    method() { }

    @log
    minus(a, b) {
        return this.add(a, -b);
    }

    hello: string;
    constructor(m: string) {
        this.hello = m;
        console.log('constructor')
    }
}

const c = new C("hello");
c.minus(3, 1);



// region 使用声明合并？
interface SomeClass {
    someValue: boolean;
}

function testAble(): ClassDecorator {
    return target => {
        target.prototype.someValue = true
    }
}

@testAble()
class SomeClass { }

const someClass = new SomeClass();
someClass.someValue // true
// endregion


// reflect-metadata

// 属性描述符