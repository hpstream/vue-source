import { isObject } from "@hpstream/shared";
import { trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

function toReactive(value) {
  // 将对象转化为响应式的
  return isObject(value) ? reactive(value) : value;
}
class RefImpl {
  public __v_isRef = true;
  public _value;
  public deps = new Set();
  constructor(public rawValue) {
    this._value = toReactive(rawValue);
  }
  get value() {
    trackEffects(this.deps);
    return this._value;
  }

  set value(newVal) {
    if (this._value != newVal) {
      this._value = toReactive(newVal);
      triggerEffects(this.deps);
    }
  }
}

export function ref(source) {
  return new RefImpl(source);
}

class ObjectRefImpl {
  constructor(private source, private key: string) {}
  get value() {
    return this.source[this.key];
  }

  set value(newVal) {
    if (this.source[this.key] !== newVal) {
      this.source[this.key] = toReactive(newVal);
    }
  }
}

export function toRefs<T>(
  source: T
): T extends any[] ? ObjectRefImpl[] : Record<keyof T, ObjectRefImpl> {
  if (Array.isArray(source)) {
    let result: any = [];
    for (let item of source) {
      result.push(item);
    }
    return result;
  } else {
    let result: any = {};
    for (let key in source) {
      result[key] = toRef(source, key);
    }
    return result;
  }
}

export function toRef(source, key: string) {
  return new ObjectRefImpl(source, key);
}
