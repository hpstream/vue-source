import { isArray, isString, ShapeFlags } from "@hpstream/shared";
import { VNode } from "./type";
export const Text = Symbol("Text");
export function isSameVnode(n1: VNode, n2: VNode) {
  // 判断两个虚拟节点是否是相同节点，套路是1）标签名相同 2） key是一样的
  return n1.type === n2.type && n1.key === n2.key;
}
export function createVNode(type, props, children) {
  const shapeFlag = isString(type) ? ShapeFlags.ELEMENT : 0;
  const vnode: VNode = {
    _v_isVnode: true,
    type,
    props,
    key: props?.["key"],
    el: null,
    children,
    shapeFlag,
  };
  if (children) {
    type = 0;
    if (isArray(children)) {
      type = ShapeFlags.ARRAY_CHILDREN;
    } else {
      children = String(children);
      type = ShapeFlags.TEXT_CHILDREN;
    }
  }
  // 如果 shapeFlag为9，说明元素的children是一个文本；
  // 如果 shapeFlag为17，说明元素的children是一个数组；
  vnode.shapeFlag |= type;

  return vnode;
}
export function isVnode(value) {
  return !!(value && value.__v_isVnode);
}
