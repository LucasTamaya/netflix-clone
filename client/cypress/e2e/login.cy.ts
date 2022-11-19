describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByRole("button", {
      name: /get started/i,
    }).click();
  });

  it("user can log in and access the BrowseScreen", () => {
    cy.findByPlaceholderText(/email address/i).type("hugo@orange.fr");
    cy.findByPlaceholderText(/password/i).type("123456");
    cy.findByRole("button", { name: /login/i }).click();

    cy.intercept("POST", "/auth/login", { isSuccess: true });

    // simulate JWT token
    cy.loggedIn();

    cy.intercept("GET", "/auth/valid", { isSuccess: true });

    cy.isOnBrowseScreen();
  });

  it("user can to navigate to the RegisterScreen", () => {
    cy.findByRole("button", {
      name: /register/i,
    }).click();

    cy.location("pathname").should("eq", "/register");
  });
});
