export function patchProp(el: HTMLElement, key: string, prevValue, nextValue) {
  if (key == "className") {
    patchClass(el, key, prevValue, nextValue); // 类名  el.className
  } else if (key == "style") {
    patchStyle(el, key, prevValue, nextValue); // 样式  el.style
  } else if (/^on[^a-z]/.test(key)) {
    // events
    patchEvent(el, key, prevValue, nextValue);
  } else {
    patchAttr(el, key, prevValue, nextValue);
    // 普通属性
  }
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
function patchAttr(
  el: HTMLElement,
  key: string,
  prevValue: any,
  nextValue: any
) {
  if (nextValue) {
    el.setAttribute(key, nextValue);
  } else {
    el.removeAttribute(key);
  }
}

function createInvoker(fn: (e: Event) => void) {
  let invoker: any = (e: Event) => invoker.value(e);
  invoker.value = fn;
  return invoker;
}
function patchEvent(
  el: any,
  rawName: string, // 事件名称
  prevValue: any,
  nextValue: any
) {
  let invokers = el._vei || (el._vei = {});
  var exisitingInvoker = invokers[rawName];

  if (exisitingInvoker && nextValue) {
    invokers[rawName].fn = nextValue;
  } else {
    const name = rawName.slice(2).toLowerCase(); // 转化事件是小写的
    if (nextValue) {
      let fn = createInvoker(nextValue);
      invokers[rawName] = fn;
      el.addEventListener(name, fn);
    } else {
      el.removeEventListener(name, exisitingInvoker);
      invokers[rawName] = null;
    }
  }
}
