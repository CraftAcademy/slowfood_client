
Cypress.Commands.add("login", (email, password) => {
  cy.route({
    method: "POST",
    url: "http://localhost:3000/api/v1/auth/sign_in",
    response: "fixture:successfull_login.json",
    headers: {
      uid: email
    }
  });
  cy.visit("/");

  cy.get("#login").click();
  cy.get("#login-form").within(() => {
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get('button').contains('Submit').click()
  });
})