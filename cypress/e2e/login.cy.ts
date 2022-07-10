import { email, password } from "../fixtures/form.json";

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("include", "/");
  });

  it("Locale", () => {
    let times = 3;
    cy.get('[type="button"][aria-label="Toggle Language Mode"]').as("toggleLocaleButton");
    while (times--) {
      cy.contains("Email");
      cy.get("@toggleLocaleButton").contains("A").click();
      cy.url().should("include", "/ja/");
      cy.contains("メールアドレス");
      cy.get("@toggleLocaleButton").contains("あ").click();
      cy.url().should("include", "/");
    }
  });

  it("Login", () => {
    cy.get('[type="email"]').type(email).should("have.value", email);
    cy.get('[type="password"]').type(password).should("have.value", password);
    cy.get("form").submit();
    cy.contains("p", "Recommend");
    cy.location("pathname").should("include", "/");
    cy.getCookie("accessToken").should("exist");
  });
});
