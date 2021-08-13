// https://docs.cypress.io/api/introduction/api.html

describe("Checks login", () => {
  it("Submits login", () => {
    cy.visit("http://local-casafi6.firmview.co.uk/login");
    cy.get(".Cookie__button").click();
    cy.get("#email").type("paul@firmview.co.uk");
    cy.get("#password").type("Password123!");
    cy.get("#login").click();
    cy.get(".warning").contains("valid");
    cy.get("#email")
      .clear()
      .type("paul+apr04@firmview.co.uk");
    cy.get("#password")
      .clear()
      .type("GpcPtX0gYFcvm6!");
    cy.get("#login").click();
    cy.get("#mortgageDesktopNav").contains("Mortgage");

    //Checks homepage after login
    cy.visit("http://local-casafi6.firmview.co.uk");
    cy.contains("h1", "Domun");

    //Checks logout
    cy.visit("http://local-casafi6.firmview.co.uk/");
    cy.get("#logoutDesktopNav").click();

    //Checks homepage after logout
    cy.visit("http://local-casafi6.firmview.co.uk");
    cy.contains("h1", "mortgage");
  });
});
