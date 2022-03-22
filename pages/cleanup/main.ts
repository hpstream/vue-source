import { effect, reactive } from "@hpstream/reactivity";

const state = reactive({ flag: true, name: "jw", age: 30 });
effect(() => {
  // 副作用函数 (effect执行渲染了页面)
  console.log("render");
  document.body.innerHTML = state.flag ? state.name : state.age;
});
setTimeout(() => {
  state.flag = false;
  setTimeout(() => {
    console.log("修改name，原则上不更新");
    state.name = "zf";
  }, 1000);
}, 1000);
