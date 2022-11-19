describe("User already logged in", () => {
  before(() => {
    cy.loggedIn();
  });

  it("should redirects the user to the BrowseScreen if he is already logged in", () => {
    cy.visit("/", {
      headers: { Authorization: "Bearer faepko87faegeakngkak621eg97g" },
    });

    cy.intercept("GET", "/auth/valid", { isSuccess: true });

    cy.isOnBrowseScreen();
  });
});
