import { reactive, watch } from "@hpstream/reactivity";
// const state = reactive({ flag: true, name: "jw", age: 30, adds: { age: 3 } });
// // console.log((window.state = state));
// watch(
//   () => {
//     return {
//       ...state,
//     };
//   },
//   async (newValue, oldValue, onCleanup) => {
//     // console.log(newValue, oldValue);
//   }
// );

// state.age = 31;
// state.age = 32;

const state = reactive({ flag: true, name: "jw", age: 30 });
let i = 5000;
function getData(timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(timer);
    }, timer);
  });
}
watch(
  () => state.age,
  async (newValue, oldValue, onCleanup) => {
    let clear = false;
    onCleanup(() => {
      console.log(1);
      clear = true;
    });
    i -= 1000;
    let r: any = await getData(i); // 第一次执行1s后渲染1000， 第二次执行0s后渲染0， 最终应该是0
    if (!clear) {
      document.body.innerHTML = r;
    }
  }
);
state.age = 31;
state.age = 32;
state.age = 33;
state.age = 34;
