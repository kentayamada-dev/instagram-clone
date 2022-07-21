import { email, password } from "../fixtures/form.json";

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("Toggle Locale", () => {
    let times = 3;
    cy.get('button[aria-label="Toggle Language Mode"]').as("toggleLocaleButton");
    while (times--) {
      cy.contains("Email");
      cy.get("@toggleLocaleButton").contains("A").click();
      cy.url().should("eq", Cypress.config().baseUrl + "ja/");
      cy.contains("メールアドレス");
      cy.get("@toggleLocaleButton").contains("あ").click();
      cy.url().should("eq", Cypress.config().baseUrl);
    }
  });

  it("Fill Login Form", () => {
    cy.get('[type="email"]').type(email).should("have.value", email);
    cy.get('[type="password"]').type(password).should("have.value", password);
    cy.get("form").submit();
    cy.contains("p", "Recommend");
    cy.url().should("eq", Cypress.config().baseUrl);
    cy.getCookie("accessToken").should("exist");
  });

  it("Toggle Dark Mode", () => {
    let times = 3;
    cy.get('button[aria-label="Toggle Dark Mode"]').as("toggleDarkMode");
    while (times--) {
      cy.get("body").should("have.class", "chakra-ui-light");
      cy.get("@toggleDarkMode").click();
      cy.get("body").should("have.class", "chakra-ui-dark");
      cy.get("@toggleDarkMode").click();
    }
  });

  it("Transition To Signup Page", () => {
    cy.get('a[href="/signup/"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "signup/");
  });
});
