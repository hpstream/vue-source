import { effect, ref } from "@hpstream/reactivity";

const flag = ref(false);
effect(() => {
  document.body.innerHTML = flag.value ? "30" : "hp";
});
setTimeout(() => {
  flag.value = true;
}, 1000);
