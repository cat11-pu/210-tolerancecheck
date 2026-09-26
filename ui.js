// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let tolerance = spec.tolerance || 5;
  parts.log.textContent = "数值 " + (spec.values || []).length + " 个，容差 " + tolerance + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { tolerance: tolerance }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.gaps.forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 与 " + (spot + 2);
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (view.over.indexOf(spot) !== -1 ? " bad" : " ok");
      mark.textContent = "差 " + value + (view.over.indexOf(spot) !== -1 ? "（超容差）" : "（在容差内）");
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "超容差 " + view.over_count + " 处，最大差 " + view.biggest;
    parts.log.textContent = "容差 " + tolerance;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "查相邻差";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "容差加五";
  moreButton.addEventListener("click", function () {
    tolerance = tolerance + 5;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "容差减五";
  lessButton.addEventListener("click", function () {
    tolerance = Math.max(0, tolerance - 5);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "容差";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(tolerance);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 0) { tolerance = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看超容差几处";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { tolerance: tolerance }));
    parts.out.textContent = "超容差 " + view.over_count + " 处，最大差 " + view.biggest;
  });
  parts.controls.appendChild(readButton);

  draw();
}
