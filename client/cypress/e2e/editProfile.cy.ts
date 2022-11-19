describe("Edit user profile", () => {
  before(() => {
    cy.loggedIn();
  });

  it("user can update its netflix subscription ", () => {
    // cy.visit("http://localhost:3000/browse", {
    //   headers: { Authorization: "Bearer faepko87faegeakngkak621eg97g" },
    // });
    // cy.intercept("GET", "/auth/valid", { isSuccess: true });

    // cy.findByRole("img", {
    //   name: /profile icon/i,
    // }).click();

    cy.visit("http://localhost:3000/profile", {
      headers: { Authorization: "Bearer faepko87faegeakngkak621eg97g" },
    });

    cy.location("pathname").should("eq", "/profile");

    cy.intercept("GET", "/user/profile", {
      isSuccess: true,
      email: "hugo@orange.fr",
      netflixPlan: "Basic",
    });

    cy.get(":nth-child(4) > [data-testid='subscribeBtn']").click();

    cy.origin("checkout.stripe.com", () => {
      cy.visit(
        "/c/pay/ppage_1M5sAOFxdiVTh0ld3I7AqWwa#fidkdWxOYHwnPyd1blpxYHZxWjA0SXxxfF9DfWFsU1FtNWlhZGc0SUM8aFVjX39wZ05qQUdvM3RGS3BfPFJpMVFvajJfQW5tYEB1SHRzZFR%2FNlxxf0N9dH1cMVc1R21GaUF8YTczQUJRSn1RNTV9d3xVZzNcMycpJ2hsYXYnP34nYnBsYSc%2FJ0tEJyknaHBsYSc%2FJ0tEJykndmxhJz8nS0QneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXU%2FKippamZkaW1qdnE%2FNjU1NScpJ2lqZmRpYCc%2Fa3BpaXgl"
      );
    });

    // cy.request(
    //   "https://checkout.stripe.com/c/pay/ppage_1M5sAOFxdiVTh0ld3I7AqWwa#fidkdWxOYHwnPyd1blpxYHZxWjA0SXxxfF9DfWFsU1FtNWlhZGc0SUM8aFVjX39wZ05qQUdvM3RGS3BfPFJpMVFvajJfQW5tYEB1SHRzZFR%2FNlxxf0N9dH1cMVc1R21GaUF8YTczQUJRSn1RNTV9d3xVZzNcMycpJ2hsYXYnP34nYnBsYSc%2FJ0tEJyknaHBsYSc%2FJ0tEJykndmxhJz8nS0QneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXU%2FKippamZkaW1qdnE%2FNjU1NScpJ2lqZmRpYCc%2Fa3BpaXgl"
    // );

    // cy.visit(
    //   "https://checkout.stripe.com/c/pay/ppage_1M5sAOFxdiVTh0ld3I7AqWwa#fidkdWxOYHwnPyd1blpxYHZxWjA0SXxxfF9DfWFsU1FtNWlhZGc0SUM8aFVjX39wZ05qQUdvM3RGS3BfPFJpMVFvajJfQW5tYEB1SHRzZFR%2FNlxxf0N9dH1cMVc1R21GaUF8YTczQUJRSn1RNTV9d3xVZzNcMycpJ2hsYXYnP34nYnBsYSc%2FJ0tEJyknaHBsYSc%2FJ0tEJykndmxhJz8nS0QneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXU%2FKippamZkaW1qdnE%2FNjU1NScpJ2lqZmRpYCc%2Fa3BpaXgl"
    // );
  });
});
