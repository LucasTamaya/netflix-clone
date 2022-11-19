describe("Register", () => {
  beforeEach(() => {
    cy.navigateToRegister();
  });

  it("user can register and access to the SelectPlansScreen", () => {
    cy.findByPlaceholderText(/email address/i).type("hugo@orange.fr");
    cy.findByPlaceholderText(/password/i).type("123456");
    cy.findByRole("button", { name: /register/i }).click();

    cy.intercept("POST", "/auth/register", { isSuccess: true });

    cy.location("pathname").should("eq", "/select-plans");
    cy.findByRole("heading", { name: /select a plan/i }).should("exist");
    cy.findAllByTestId("subscribeBtn").should("have.length", 3);
  });

  it("user can navigate to the LoginScreen", () => {
    cy.findByRole("button", {
      name: /login/i,
    }).click();

    cy.location("pathname").should("eq", "/login");
  });
});
