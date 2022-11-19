/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

// to avoid error: Argument of type '"login"' is not assignable to parameter of type 'keyof Chainable<any>'
declare global {
  namespace Cypress {
    interface Chainable {
      navigateToRegister(): Chainable<Element>;
      register(): Chainable<Element>;
      loggedIn(): Chainable<Element>;
      isOnBrowseScreen(): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("navigateToRegister", () => {
  cy.visit("/");
  cy.findByRole("button", {
    name: /get started/i,
  }).click();
  cy.findByRole("button", {
    name: /register/i,
  }).click();
});

Cypress.Commands.add("register", () => {
  cy.findByPlaceholderText(/email address/i).type("hugo@orange.fr");
  cy.findByPlaceholderText(/password/i).type("123456");
  cy.findByRole("button", { name: /register/i }).click();
  cy.intercept("POST", "/auth/register", {
    fixture: "../fixtures/authFixture.json",
  });
});

Cypress.Commands.add("loggedIn", () => {
  window.localStorage.setItem("token", "jVUfYw92zjFCtGMTZilctw");
});

Cypress.Commands.add("isOnBrowseScreen", () => {
  cy.location("pathname").should("eq", "/browse");

  cy.findByRole("img", {
    name: /profile icon/i,
  }).should("exist");

  cy.findAllByRole("heading").should("have.length", 9);
});
