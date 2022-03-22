// import { effect, reactive } from "@hpstream/reactivity";
let age, effect;
class Effect {
  constructor(public fn) {}
  deps = [];
  run() {
    const { deps } = this; // deps 里面装的是name对应的effect, age对应的effect
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect); // 解除effect，重新依赖收集
    }
    this.deps.length = 0;
    this.fn();
  }
}

function fn() {
  effect.deps.push(age);
  age.add(effect);
  // this.fn();
}
age = new Set();
effect = new Effect(fn);
effect.run();
// age.forEach((effect) => {
//   // 导致循环停不下来
//   // console.log(1);
//   effect.run(); // 由于run函数删除了age,又重新添加了age所以导致循环不会停止
// });

// 解决办法
var age1 = new Set(age);
age1.forEach((effect) => {
  // 导致循环停不下来
  effect.run(); // 由于run函数删除了age,又重新添加了age所以导致循环不会停止
});
