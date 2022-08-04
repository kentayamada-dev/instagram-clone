describe("Storybook", () => {
  it("Can Open Storybook", () => {
    cy.visit("/storybook/index.html");
    cy.url().should("include", "/storybook/");
    cy.get("input").should("have.id", "storybook-explorer-searchfield");
  });
});
