import { createRenderer, h } from "@hpstream/runtime-core";
import { renderOptions } from "@hpstream/runtime-dom";

// 准备好所有渲染时所需要的的属性
createRenderer(renderOptions as any).render(
  h("h1", { className: "ss", style: { color: "red" } }, "jw"),
  document.getElementById("app")
);
