export const isObject = (value) => {
  return typeof value === "object" && value !== null;
};

export const isString = (value) => {
  return typeof value === "string";
};

export const isNumber = (value) => {
  return typeof value === "number";
};

export const isFunction = (value) => {
  return typeof value === "function";
};

// 判断是不是数组
export const isArray = Array.isArray;
// 浅拷贝
export const assign = Object.assign;

export const enum ShapeFlags { // vue3提供的形状标识
  ELEMENT = 1, // element
  FUNCTIONAL_COMPONENT = 1 << 1, // functional component
  STATEFUL_COMPONENT = 1 << 2, // stateful component
  TEXT_CHILDREN = 1 << 3, // text children
  ARRAY_CHILDREN = 1 << 4, // array children
  SLOTS_CHILDREN = 1 << 5, // slots children
  TELEPORT = 1 << 6, // teleport
  SUSPENSE = 1 << 7, // suspense
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8, // component should keep alive
  COMPONENT_KEPT_ALIVE = 1 << 9, // component kept alive
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
}
