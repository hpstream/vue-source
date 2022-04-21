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
  const processElement = (n1: VNode, n2: VNode, container, anchor) => {
    // console.log(container);
    if (n1 === null) {
      mountElement(n2, container, anchor);
    } else {
      // console.log(n1, n2)
      // 元素比对
      patchElement(n1, n2);
    }
  };
  function patchElement(oldvnode: VNode, newnode: VNode) {
    let el = (newnode.el = oldvnode.el)
    const oldProps = oldvnode.props || {};
    const newProps = newnode.props || {};


    patchProps(oldProps, newProps, el);
    patchChildren(oldvnode, newnode, el)

  }


  function patchProps(oldProps: Record<string, any>, newProps: Record<string, any>, el: HTMLElement) {
    for (let key in newProps) {
      hostPatchProp(el, key, oldProps[key], newProps[key])
    }
    for (let key in oldProps) {
      if (oldProps[key] === null) {
        console.log(oldProps[key])
        hostPatchProp(el, key, oldProps[key], undefined)
      }
    }

  }

  function patchChildren(oldvnode: VNode, newnode: VNode, el: HTMLElement) {
    // 比较两个虚拟节点的儿子的差异 ， el就是当前的父节点
    const c1 = oldvnode.children;
    const c2 = newnode.children;
    const prevShapeFlag = oldvnode.shapeFlag; // 之前的
    const shapeFlag = newnode.shapeFlag; // 之后的

    if (shapeFlag && ShapeFlags.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 删除所有子节点
        unmountChildren(oldvnode)  // 文本	数组	（删除老儿子，设置文本内容）
      }
      if (c1 !== c2) { // 文本	文本	（更新文本即可）  包括了文本和空
        hostSetElementText(el, c2)
      }

    } else {
      // 现在为数组或者为空
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {  // 数组	数组	（diff算法）
          // diff算法
          // patchKeyedChildren(c1, c2, el); // 全量比对
        } else {
          // 现在不是数组 （文本和空 删除以前的）
          unmountChildren(oldvnode); // 空	数组	（删除所有儿子）
        }
      } else {
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          hostSetElementText(el, '')   // 数组	文本	（清空文本，进行挂载）
        }   // 空	文本	（清空文本）
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          mountChildren(c2, el)   // 数组	文本	（清空文本，进行挂载）
        }
      }
    }
  }

  const mountChildren = (children: VNode[], container) => {
    for (let i = 0; i < children.length; i++) {
      let child = normalize(children, i); // 处理后要进行替换，否则childrne中存放的已经是字符串
      patch(null, child, container)
    }
  }
  const unmountChildren = (oldvnode: VNode) => {
    oldvnode.children.forEach((child) => {
      unmount(child);
    })

  }


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
  function unmount(_vnode: VNode) {
    hostRemove(_vnode.el);
  }

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



