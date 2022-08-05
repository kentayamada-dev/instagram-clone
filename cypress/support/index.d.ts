/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    toggleLocale(shouldWaitRequests?: boolean): Chainable<any>;
    toggleDarkMode(shouldWaitRequests?: boolean): Chainable<any>;
    transitionBetweenAuthPages(shouldWaitRequests?: boolean): Chainable<any>;
    fillLoginFormAndSubmit(): Chainable<any>;
  }
}
