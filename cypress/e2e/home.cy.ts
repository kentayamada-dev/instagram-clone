import { email, password } from "../fixtures/form.json";

describe("Form Test", () => {
  it("Login Test", () => {
    cy.visit("/");
    cy.get('[type="email"]').type(email).should("have.value", email);
    cy.get('[type="password"]').type(password).should("have.value", password);
    cy.get("form").submit();
    cy.wait(10000);
  });
});
