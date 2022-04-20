// import { createRenderer } from "@hpstream/runtime-core";
import { renderOptions, h, render } from "@hpstream/runtime-dom";

// 准备好所有渲染时所需要的的属性
var app = document.getElementById("app")
render(
  h('h1', { style: {} }, [
    h('li', { key: 'a' }, 'a'),
    h('li', { key: 'b' }, 'b'),
    h('li', { key: 'c' }, 'c'),
    h('li', { key: 'd' }, 'd'),
    h('li', { key: 'e', style: { color: 'red' } }, 'e'),
    h('li', { key: 'f' }, 'f'),
    h('li', { key: 'g' }, 'g')
  ]
  ), app);

setTimeout(() => {
  render(
    h('h1', {}, [
      h('li', { key: 'a' }, 'a'),
      h('li', { key: 'b' }, 'b'),
      h('li', { key: 'e' }, 'e'),
      h('li', { key: 'c' }, 'c'),
      h('li', { key: 'd' }, 'd'),
      h('li', { key: 'h' }, 'h'),
      h('li', { key: 'f' }, 'f'),
      h('li', { key: 'g' }, 'g')
    ]
    ), app);
}, 1000)