describe("User is not yet connected", () => {
  it("should redirects the user to the HomeScreen if he tries to access the BrowseScreen when is not logged in", () => {
    cy.visit("/browse");

    cy.intercept("GET", "/auth/valid", {
      statusCode: 401,
    });

    cy.findByRole("heading", { name: /unauthorized access/i }).should("exist");
    cy.findByRole("heading", {
      name: /you are going to be redirected/i,
    }).should("exist");

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);

    cy.location("pathname").should("eq", "/");
  });
});
