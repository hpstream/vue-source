import { isObject } from "@hpstream/shared";
import { track, trigger } from "./effect";
import { reactive } from "./reactive";

export const baseHandler = {
  get(target, key, receiver) {
    let res = Reflect.get(target, key, receiver);

    track(target, "get", key);

    if (isObject(res)) {
      // 如果是对象，则进行深度响应式
      return reactive(res);
    }
    return res;
  },

  set(target, key, value, receiver) {
    let oldvalue = target[key];
    let result = Reflect.set(target, key, value, receiver);
    if (oldvalue !== value) {
      // 触发更新逻辑
      trigger(target, "set", key, value);
    }

    return result;
  },
};
