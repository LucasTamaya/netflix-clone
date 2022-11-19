describe("Logout", () => {
  beforeEach(() => {
    cy.navigateToUserProfile();
  });

  it("user can logout", () => {
    cy.findByRole("button", {
      name: /logout/i,
    }).click();

    cy.findByTestId("logoutConfirmBtn").click();

    cy.location("pathname").should("eq", "/");
  });

  it("user can cancel the logout proccess", () => {
    cy.findByRole("button", {
      name: /logout/i,
    }).click();

    cy.findByRole("button", {
      name: /cancel/i,
    }).click();

    cy.location("pathname").should("eq", "/profile");
  });
});
