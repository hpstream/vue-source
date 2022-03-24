import { effect, toRefs, toRef, reactive } from "@hpstream/reactivity";

const state = reactive({ name: "jw", age: 30 });

let person = toRefs(state); // 解构的时候将所有的属性都转换成ref即可
let name = toRef(state, "name");
effect(() => {
  document.body.innerHTML =
    person.name.value + "今年" + person.age.value + "岁了";
});
setTimeout(() => {
  name.value = 31;
}, 1000);
