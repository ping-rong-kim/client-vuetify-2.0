// https://docs.cypress.io/api/introduction/api.html

describe("Checks homepage content", () => {
  it("Visits the homepage", () => {
    cy.visit("http://local-casafi6.firmview.co.uk/");
    cy.contains("h1", "mortgage");
    cy.contains(".Cookie__content", "cookies");
  });
});

describe("Chks about page content", () => {
  it("Visits the about page", () => {
    cy.visit("http://local-casafi6.firmview.co.uk/about");
    cy.contains("h1", "Domun");
  });
});

describe("Checks glossary page content", () => {
  it("Visits the glossary page", () => {
    cy.visit("http://local-casafi6.firmview.co.uk/glossary");
    cy.contains("h1", "Glossary");
  });
});

describe("Checks privacy-policy page content", () => {
  it("Visits the privacy-policy page", () => {
    cy.visit("http://local-casafi6.firmview.co.uk/privacy-policy");
    cy.contains("h1", "Privacy policy");
  });
});

describe("Checks signup page content", () => {
  it("Visits the signup page", () => {
    cy.visit("http://local-casafi6.firmview.co.uk/signup");
    cy.contains(".app-page__title", "Mortgage");
  });
});

describe("Checks login page content", () => {
  it("Visits the login page", () => {
    cy.visit("http://local-casafi6.firmview.co.uk/login");
    cy.contains("#signupAddressTitle", "Sign in");
  });
});
