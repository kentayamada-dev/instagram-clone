describe("Home Page", () => {
  beforeEach(() => {
    cy.visitRoot();
  });

  it("Toggle Locale", () => {
    let times = 2;
    while (times--) {
      cy.toggleLocale();
    }
  });

  it("Fill Login Form And Submit", () => {
    cy.fillLoginFormAndSubmit();
  });

  it("Toggle Dark Mode", () => {
    let times = 2;
    while (times--) {
      cy.toggleDarkMode();
    }
  });

  it("Transition To Signup Page", () => {
    let times = 2;
    while (times--) {
      cy.transitionBetweenAuthPages();
    }
  });
});
