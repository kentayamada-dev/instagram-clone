import { email, password, errorMessage, invalidEmailMessage, invalidPasswordMessage } from "../fixtures/form.json";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Success", () => {
    it("Correct email and password", () => {
      cy.get('[type="email"]').type(email).should("have.value", email);
      cy.get('[type="password"]').type(password).should("have.value", password);
      cy.get("form").submit();
      cy.contains("p", "Recommend");
      cy.location("pathname").should("include", "/");
      cy.getCookie("accessToken").should("exist");
    });
  });

  describe("Invalid", () => {
    it("Email", () => {
      const invalidEmail = "invalid@gmail";
      cy.get('[type="email"]').type(invalidEmail).should("have.value", invalidEmail);
      cy.get('[type="password"]').type(password).should("have.value", password);
      cy.get("form").submit();
      cy.contains("div", invalidEmailMessage);
    });

    it("Password", () => {
      const invalidPassword = "invalidPassword";
      cy.get('[type="email"]').type(email).should("have.value", email);
      cy.get('[type="password"]').type(invalidPassword).should("have.value", invalidPassword);
      cy.get("form").submit();
      cy.contains("div", invalidPasswordMessage);
    });
  });

  describe("Fail", () => {
    afterEach(() => {
      cy.get("form").submit();
      cy.contains("div", errorMessage);
    });

    it("Wrong email", () => {
      const wrongEmail = email + "wrong";
      cy.get('[type="email"]').type(wrongEmail).should("have.value", wrongEmail);
      cy.get('[type="password"]').type(password).should("have.value", password);
    });

    it("Wrong password", () => {
      const wrongPassword = password + "wrong";
      cy.get('[type="email"]').type(email).should("have.value", email);
      cy.get('[type="password"]').type(wrongPassword).should("have.value", wrongPassword);
    });
  });
});
