/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    visitRoot(): Chainable<any>;
    toggleLocale(): Chainable<any>;
    toggleDarkMode(): Chainable<any>;
    transitionBetweenAuthPages(): Chainable<any>;
    visitHome(): Chainable<any>;
    fillLoginFormAndSubmit(): Chainable<any>;
  }
}
