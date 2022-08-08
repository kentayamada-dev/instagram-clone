describe("Requests", () => {
  describe("Auth Page", () => {
    beforeEach(() => {
      cy.intercept("POST", "https://api.instagram-clone.net/graphql").as("post_req");
      cy.visit("/");
    });

    it("Toggle Locale", () => {
      cy.toggleLocale(true);
      cy.get("@post_req.all")
        .should("have.length", 3)
        .then((xhr) => {
          // @ts-ignore
          expect(xhr[0].request.body.operationName).to.eq("CurrentUser");
          // @ts-ignore
          expect(xhr[1].request.body.operationName).to.eq("CurrentUser");
          // @ts-ignore
          expect(xhr[2].request.body.operationName).to.eq("CurrentUser");
        });
    });

    it("Toggle Dark Mode", () => {
      cy.toggleDarkMode(true);
      cy.get("@post_req.all")
        .should("have.length", 1)
        .then((xhr) => {
          // @ts-ignore
          expect(xhr[0].request.body.operationName).to.eq("CurrentUser");
        });
    });

    it("Transition Between Root And Signup Page", () => {
      cy.transitionBetweenAuthPages(true);
      cy.get("@post_req.all")
        .should("have.length", 1)
        .then((xhr) => {
          // @ts-ignore
          expect(xhr[0].request.body.operationName).to.eq("CurrentUser");
        });
    });
  });

  describe("Home Page", () => {
    before(() => {
      cy.visit("/");
      cy.fillLoginFormAndSubmit();
    });

    beforeEach(() => {
      cy.reload(true);
      cy.intercept("POST", "https://api.instagram-clone.net/graphql").as("post_req");
    });

    it.only("Feed", () => {
      cy.wait(5000);
      cy.contains("Test User").click();
      cy.wait(5000);
      cy.get('a[href="/"]').click();
      cy.wait(5000);
      cy.get("@post_req.all")
        .should("have.length", 4)
        .then((xhr) => {
          // @ts-ignore
          const elsText = xhr.map((el) => el.request.body.operationName);
          // @ts-ignore
          expect(elsText.sort()).to.deep.eq(["CurrentUser", "Posts", "UserPosts", "Users"].sort());
        });
    });
  });
});
