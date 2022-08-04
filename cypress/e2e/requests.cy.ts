describe("Requests", () => {
  describe("Auth Page", () => {
    beforeEach(() => {
      cy.intercept("POST", "https://api.instagram-clone.net/graphql").as("post_req");
      cy.visitRoot();
    });

    it("Toggle Locale", () => {
      cy.toggleLocale();
      cy.wait(5000)
        .get("@post_req.all")
        .should("have.length", 3)
        .then((node) => {
          // @ts-ignore
          expect(node[0].request.body.operationName).to.eq("CurrentUser");
          // @ts-ignore
          expect(node[1].request.body.operationName).to.eq("CurrentUser");
          // @ts-ignore
          expect(node[2].request.body.operationName).to.eq("CurrentUser");
        });
    });

    it("Toggle Dark Mode", () => {
      cy.toggleDarkMode();
      cy.wait(5000)
        .get("@post_req.all")
        .should("have.length", 1)
        .then((node) => {
          // @ts-ignore
          expect(node[0].request.body.operationName).to.eq("CurrentUser");
        });
    });

    it("Transition Between Root And Signup Page", () => {
      cy.transitionBetweenAuthPages();
      cy.wait(5000)
        .get("@post_req.all")
        .should("have.length", 1)
        .then((node) => {
          // @ts-ignore
          expect(node[0].request.body.operationName).to.eq("CurrentUser");
        });
    });
  });

  describe("Home Page", () => {
    before(() => {
      cy.visitRoot();
      cy.fillLoginFormAndSubmit();
      cy.reload();
      cy.intercept("POST", "https://api.instagram-clone.net/graphql").as("post_req");
    });

    it("Feed", () => {
      cy.wait(5000)
        .get("@post_req.all")
        .should("have.length", 4)
        .then((node) => {
          // @ts-ignore
          const elsText = node.map((el) => el.request.body.operationName);
          // @ts-ignore
          expect(elsText.sort()).to.deep.eq(["CurrentUser", "Posts", "UserPosts", "Users"].sort());
        });
    });
  });
});
