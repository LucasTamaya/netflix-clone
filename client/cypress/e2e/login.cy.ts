describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByRole("button", {
      name: /get started/i,
    }).click();
  });

  it("should be able to login and access to BrowseScreen", () => {
    cy.findByPlaceholderText(/email address/i).type("hugo@orange.fr");
    cy.findByPlaceholderText(/password/i).type("123456");
    cy.findByRole("button", { name: /login/i }).click();

    cy.intercept("POST", "/auth/login", {
      fixture: "../fixtures/authFixture.json",
    });

    cy.location("pathname").should("eq", "/browse");
    cy.findByRole("img", {
      name: /profile icon/i,
    }).should("exist");

    cy.visit("/browse");

    // cy.intercept("GET", "/auth/valid", {
    //   fixture: "../fixtures/authFixture.json",
    // });
  });

  it("should be able to navigate to the RegisterScreen", () => {
    cy.findByRole("button", {
      name: /register/i,
    }).click();

    cy.location("pathname").should("eq", "/register");
  });
});
