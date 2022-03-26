export function patchProp(el: HTMLElement, key: string, prevValue, nextValue) {
  if (key == "className") {
    patchClass(el, key, prevValue, nextValue);
  }
  if (key == "style") {
    patchStyle(el, key, prevValue, nextValue);
  }
  // el.setAttribute
  // 类名  el.className
  // 样式  el.style
  // events
  // 普通属性
}
// var s = document.createElement("div");
function patchClass(
  el: HTMLElement,
  key: string,
  prevValue: any,
  nextValue: any
) {
  // debugger;
  if (!nextValue) {
    el.removeAttribute(key);
  } else {
    el.className = nextValue;
    console.log(el);
  }
}
function patchStyle(
  el: HTMLElement,
  key: string,
  prevValue: any,
  nextValue: any
) {
  const style = el.style;
  if (!prevValue) {
    if (nextValue) {
      for (let key in nextValue) {
        style[key] = nextValue[key];
      }
    }
  } else {
    if (!nextValue) {
      for (let key in prevValue) {
        style[key] = null;
      }
    } else {
      for (let key in prevValue) {
        if (!nextValue[key]) {
          style[key] = null;
        }
      }
      for (let key in nextValue) {
        el.style[key] = nextValue[key];
      }
    }
  }
}
