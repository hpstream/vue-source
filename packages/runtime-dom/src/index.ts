import { createRenderer, VNode } from "@hpstream/runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";

const renderOptions = Object.assign(nodeOps, { patchProp });

export { renderOptions };

export function render(vnode: VNode, container) {
  // 在创建渲染器的时候 传入选项
  createRenderer(renderOptions).render(vnode, container);
}

export * from "@hpstream/runtime-core";
