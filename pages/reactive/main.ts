import { effect, reactive } from "@hpstream/reactivity";

const state = reactive({ name: "jw", age: 30 });

effect(() => {
  var app = document.querySelector("#app");
  app.innerHTML = state.name + "今年" + state.age + "岁了";
  // console.log(state);
});
setTimeout(() => {
  state.age++;
}, 1000);

// state.name = "hp";

// console.log(state.name);
// console.log();
