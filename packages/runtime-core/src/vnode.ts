import { isArray, isString, ShapeFlags } from "@hpstream/shared";
import { VNode } from "./type";

export function createVNode(type, props, children) {
  const shapeFlags = isString(type) ? ShapeFlags.ELEMENT : 0;
  const vnode: VNode = {
    _v_isVnode: true,
    type,
    props,
    key: props.key,
    el: null,
    children,
    shapeFlags,
  };
  if (children) {
    let type = 0;
    if (isArray(children)) {
      type = ShapeFlags.ARRAY_CHILDREN;
    } else {
      children = String(children);
      type = ShapeFlags.TEXT_CHILDREN;
    }
  }
  // 如果 shapeFlag为9，说明元素的children是一个文本；
  // 如果 shapeFlag为17，说明元素的children是一个数组；
  vnode.shapeFlags += type;
  return vnode;
}
export function isVnode(value) {
  return !!(value && value.__v_isVnode);
}
