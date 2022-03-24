import { isFunction, isObject } from "@hpstream/shared";
import { ReactiveFlags } from "./baseHandler";
import { ReactiveEffect } from "./effect";

export function isReactive(value) {
  return !!(value && value[ReactiveFlags.IS_REACTIVE]);
}
export function watch(source, cb: Function) {
  let getter;
  if (isReactive(source)) {
    getter = () => traverse(source);
  }
  if (isFunction(source)) {
    getter = source;
  }
  let oldValue;
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = fn;
  };
  const job = () => {
    const newValue = effect.run(); // 值变化时再次运行effect函数,获取新值
    if (cleanup) cleanup();
    cb(newValue, oldValue, onCleanup);
    oldValue = newValue;
  };
  const effect = new ReactiveEffect(getter, job);
  oldValue = effect.run();
}
function traverse(value: any, seen = new Set()) {
  if (!isObject(value)) {
    return value;
  }
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  for (const k in value) {
    // 递归访问属性用于依赖收集
    traverse(value[k], seen);
  }

  return value;
}
