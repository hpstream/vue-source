import { isObject } from "@hpstream/shared";
import { baseHandler } from "./baseHandler";

export function reactive(target: any) {
  if (!isObject(target)) {
    return;
  }

  const proxy = new Proxy(target, baseHandler);
  return proxy;
}
