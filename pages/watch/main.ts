import { reactive, watch } from "@hpstream/reactivity";
const state = reactive({ flag: true, name: "jw", age: 30, adds: { age: 3 } });
// console.log((window.state = state));
watch(
  () => {
    return {
      ...state,
    };
  },
  async (newValue, oldValue, onCleanup) => {
    // console.log(newValue, oldValue);
  }
);

state.age = 31;
state.age = 32;
