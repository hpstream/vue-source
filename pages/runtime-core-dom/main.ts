// import { createRenderer } from "@hpstream/runtime-core";
import { renderOptions, h, render } from "@hpstream/runtime-dom";

// 准备好所有渲染时所需要的的属性

render(
  h(
    "h1",
    {
      className: "ss1",
      style: { color: "red" },
      onClick: () => console.log(1),
    },
    ["jw1", h("span", {}, ["hp"])]
  ),
  document.getElementById("app")
);
