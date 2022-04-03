import { isString, ShapeFlags } from "@hpstream/shared";
import { RendererOptions, VNode } from "./type";
import { createVNode, isSameVnode, Text } from "./vnode";

export function createRenderer(options: RendererOptions) {
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
  } = options;
  const processElement = (n1, n2, container, anchor) => {
    // console.log(container);
    if (n1 === null) {
      mountElement(n2, container, anchor);
    } else {
      // 元素比对
      // patchElement(n1, n2);
    }
  };
  const processText = (n1, n2, container) => {
    if (n1 === null) {
      hostInsert((n2.el = hostCreateText(n2.children)), container);
    } else {
      // 文本的内容变化了，我可以复用老的节点
      const el = (n2.el = n1.el);
      if (n1.children !== n2.children) {
        hostSetText(el, n2.children); // 文本的更新
      }
    }
  };

  const patch = (
    oldvnode: VNode,
    newvnode: VNode,
    container: HTMLElement,
    anchor?: HTMLElement
  ) => {
    if (oldvnode == newvnode) return;
    if (oldvnode && !isSameVnode(oldvnode, newvnode)) {
      // 判断两个元素是否相同，不相同卸载在添加
      unmount(oldvnode); // 删除老的
      oldvnode = null;
    }
    // console.log(newvnode);
    const { type, shapeFlag } = newvnode;
    // console.log(newvnode);
    switch (type) {
      case Text:
        processText(oldvnode, newvnode, container);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(oldvnode, newvnode, container, anchor);
        }
    }
  };
  const mountElement = (
    newvnode: VNode,
    container: HTMLElement,
    anchor?: HTMLElement
  ) => {
    let { type, props, children, shapeFlag } = newvnode;
    let el = (newvnode.el = hostCreateElement(type)); // 将真实元素挂载到这个虚拟节点上，后续用于复用节点和更新
    if (props) {
      for (let key in props) {
        hostPatchProp(el, key, null, props[key]);
      }
    }
    // console.log(shapeFlag, ShapeFlags.TEXT_CHILDREN);
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      //文本
      hostSetElementText(el, children);
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 数组
      mountedChildren(children, el);
    }
    hostInsert(el, container, anchor);
  };
  const normalize = (children, i: number) => {
    if (isString(children[i])) {
      let vnode = createVNode(Text, null, children[i]);
      children[i] = vnode;
    }
    return children[i];
  };
  var mountedChildren = (children: VNode[], container: any) => {
    for (let i = 0; i < children.length; i++) {
      let child = normalize(children, i);
      patch(null, child, container);
    }
  };

  const render = (vnode: VNode, container: any) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode);
      } // 卸载
    } else {
      patch(container._vnode || null, vnode, container); // 初始化和更新
    }
    container._vnode = vnode;
  };
  return {
    render,
  };
}

function unmount(_vnode: VNode) {
  throw new Error("Function not implemented.");
}
