import "./commands";
import addContext from "mochawesome/addContext";

Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    addContext({ test }, `../screenshots/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`);
  }
  addContext({ test }, `../videos/${Cypress.spec.name}.mp4`);
});
