import { mockedSuccessResponse } from "../fixtures/authFixture";

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

    cy.intercept("POST", "/auth/login", mockedSuccessResponse);

    cy.location("pathname").should("eq", "/browse");
  });

  it("should be able to navigate to the RegisterScreen", () => {
    cy.findByRole("button", {
      name: /register/i,
    }).click();

    cy.location("pathname").should("eq", "/register");
  });
});
