import { computed, effect, reactive } from "@hpstream/reactivity";

const state = reactive({ flag: true, name: "jw", age: 30 });
let valueStr = computed(() => {
  return `姓名：${state.name},年龄：${state.age}`;
});

// console.log(valueStr);

setTimeout(() => {
  // state.age = 100;
  state.flag = false;
}, 1000);

effect(() => {
  // 副作用函数 (effect执行渲染了页面)
  // console.log("render");
  document.body.innerHTML = valueStr.value;
});
