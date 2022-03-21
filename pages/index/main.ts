import { reactive } from "@hpstream/reactivity";

const state = reactive({ name: "jw", age: 30 });

state.name = "hp";
console.log(state.name);
// console.log();
