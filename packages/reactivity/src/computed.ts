import { isFunction } from "@hpstream/shared";
import { ReactiveEffect, trackEffects, triggerEffects } from "./effect";

class ComputedRefImpl {
  public effect;
  public _value;
  public dirty = true;
  public deps = new Set();
  constructor(public getter, public setter) {
    this.effect = new ReactiveEffect(getter, () => {
      if (!this.dirty) {
        this.dirty = true;
        triggerEffects(this.deps);
      }
    });
  }

  get value() {
    trackEffects(this.deps);
    // debugger;
    if (this.dirty) {
      this.dirty = false;
      this._value = this.effect.run();
    }
    return this._value;
  }

  set value(val) {
    this.setter(val);
  }
}
export function computed(getterOrOptions: any) {
  var setter, getter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
    setter = () => {};
  } else {
    setter = getterOrOptions.set;
    getter = getterOrOptions.get;
  }
  return new ComputedRefImpl(getter, setter);
}
