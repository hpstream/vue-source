// h 函数是对createVode的一个兼容，可以兼容各种参数；
// 可以兼容如下情况：
// 两个参数的情况
// h("div", "hello");
// h('div',h('span'))
// h('div',{style:{"color"：“red”}})
// h('div',[h('span'),h('span')])
// 三个参数的情况
// h('div',null,h('span'))
// h('div',{style:{"color"：“red”}},'hello')
// h('div',null,[h('span')])
// 大于三个参数的情况
// h('div',null,'hello','world')

import { isArray, isObject } from "@hpstream/shared";
import { createVNode, isVnode } from "./vnode";

export function h(type, propsOrChildren, children) {
  if (arguments.length == 2) {
    if (isArray(propsOrChildren)) {
      return createVNode(type, null, propsOrChildren);
    } else {
      if (isVnode(propsOrChildren)) {
        children = [propsOrChildren];
        return createVNode(type, null, children);
      } else {
        if (isObject(propsOrChildren)) {
          return createVNode(type, propsOrChildren, []);
        } else {
          return createVNode(type, null, propsOrChildren);
        }
      }
    }
  } else {
    if (arguments.length == 3) {
      if (isVnode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    } else {
      children = Array.from(arguments).slice(2);
      return createVNode(type, propsOrChildren, children);
    }
  }
}
