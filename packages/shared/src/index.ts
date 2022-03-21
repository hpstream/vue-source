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
