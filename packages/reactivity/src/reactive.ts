import { isObject } from "@hpstream/shared";
import { baseHandler } from "./baseHandler";

export function reactive<T>(target: T): T {
  if (!isObject(target)) {
    return;
  }

  const proxy = new Proxy(target, baseHandler);
  return proxy;
}
