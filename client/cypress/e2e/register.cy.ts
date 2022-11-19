describe("Register", () => {
  beforeEach(() => {
    cy.navigateToRegister();
  });

  it("should be able to register and access to the SelectPlansScreen", () => {
    cy.findByPlaceholderText(/email address/i).type("hugo@orange.fr");
    cy.findByPlaceholderText(/password/i).type("123456");
    cy.findByRole("button", { name: /register/i }).click();

    cy.intercept("POST", "/auth/register", {
      fixture: "../fixtures/authFixture.json",
    });

    cy.location("pathname").should("eq", "/select-plans");
  });

  it("should be able to navigate to the LoginScreen", () => {
    cy.findByRole("button", {
      name: /login/i,
    }).click();

    cy.location("pathname").should("eq", "/login");
  });
});
