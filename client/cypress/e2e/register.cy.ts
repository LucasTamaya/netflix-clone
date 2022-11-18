import { mockedSuccessResponse } from "../fixtures/authFixture";

describe("Register", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByRole("button", {
      name: /get started/i,
    }).click();
    cy.findByRole("button", {
      name: /register/i,
    }).click();
  });

  it("should be able to register and access to the SelectPlansScreen", () => {
    cy.findByPlaceholderText(/email address/i).type("hugo@orange.fr");
    cy.findByPlaceholderText(/password/i).type("123456");
    cy.findByRole("button", { name: /register/i }).click();

    cy.intercept("POST", "/auth/register", mockedSuccessResponse);

    cy.location("pathname").should("eq", "/select-plans");
  });

  it("should be able to navigate to the LoginScreen", () => {
    cy.findByRole("button", {
      name: /login/i,
    }).click();

    cy.location("pathname").should("eq", "/login");
  });
});
