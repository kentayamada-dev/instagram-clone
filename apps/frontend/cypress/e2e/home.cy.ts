describe("Home Test", () => {
  it("open", () => {
    cy.visit("/");
    cy.wait(3000);
  });
});
