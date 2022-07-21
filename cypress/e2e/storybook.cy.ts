describe("Storybook", () => {
  beforeEach(() => {
    cy.visit("/storybook/index.html");
    cy.url().should("include", "/storybook/");
  });

  it("Can Open Storybook", () => {
    cy.get("input").should("have.id", "storybook-explorer-searchfield");
  });
});
