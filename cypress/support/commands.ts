import { email, password } from "../fixtures/form.json";

Cypress.Commands.add("toggleLocale", (shouldWaitRequests) => {
  if (shouldWaitRequests) cy.wait(5000);
  cy.get('button[aria-label="Toggle Language Mode"]').as("toggleLocaleButton");
  cy.get("@toggleLocaleButton").contains("あ").click();
  if (shouldWaitRequests) cy.wait(5000);
  cy.contains("アカウントをお持ちでないですか？").should("be.visible");
  cy.url().should("eq", Cypress.config().baseUrl + "ja/");
  cy.get("@toggleLocaleButton").contains("A").click();
  if (shouldWaitRequests) cy.wait(5000);
  cy.contains("Don't have an account?").should("be.visible");
  cy.url().should("eq", Cypress.config().baseUrl);
});

Cypress.Commands.add("toggleDarkMode", (shouldWaitRequests) => {
  if (shouldWaitRequests) cy.wait(5000);
  cy.get('button[aria-label="Toggle Dark Mode"]').as("toggleDarkMode");
  cy.get("@toggleDarkMode").click();
  if (shouldWaitRequests) cy.wait(5000);
  cy.get("body").should("have.class", "chakra-ui-dark");
  cy.get("@toggleDarkMode").click();
  if (shouldWaitRequests) cy.wait(5000);
  cy.get("body").should("have.class", "chakra-ui-light");
});

Cypress.Commands.add("transitionBetweenAuthPages", (shouldWaitRequests) => {
  if (shouldWaitRequests) cy.wait(5000);
  cy.contains("Sign up").click();
  if (shouldWaitRequests) cy.wait(5000);
  cy.contains("Have an account?").should("be.visible");
  cy.url().should("eq", Cypress.config().baseUrl + "signup/");
  cy.contains("Log in").click();
  if (shouldWaitRequests) cy.wait(5000);
  cy.contains("Don't have an account?").should("be.visible");
  cy.url().should("eq", Cypress.config().baseUrl);
});

Cypress.Commands.add("fillLoginFormAndSubmit", () => {
  cy.get('[type="email"]').type(email).should("have.value", email);
  cy.get('[type="password"]').type(password).should("have.value", password);
  cy.get("form").submit();
  cy.contains("Recommend").should("be.visible");
  cy.url().should("eq", Cypress.config().baseUrl);
  cy.getCookie("accessToken").should("exist");
});
