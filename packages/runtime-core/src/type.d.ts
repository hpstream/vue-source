export interface VNode {
  _v_isVnode: boolean;
  type: string | symbol;
  props: Record<string, any>;
  key: string;
  el: HTMLElement;
  children: VNode[];
  shapeFlag: number | ShapeFlags;
}

export interface RendererOptions {
  insert(child: any, parent: any, anchor?: any): void;
  remove(child: any): void;
  setElementText(el: any, text: any): void;
  setText(node: any, text: any): void;
  querySelector(selector: any): any;
  parentNode(node: any): any;
  nextSibling(node: any): any;
  createElement(tagName: any): any;
  createText(text: any): Text;
  patchProp: (
    el: HTMLElement,
    key: string,
    prevValue: any,
    nextValue: any
  ) => void;
}
