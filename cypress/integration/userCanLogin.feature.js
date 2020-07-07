describe("User authenticates", () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:successfull_login.json",
      headers: {
        uid: "user@mail.com"
      }
    });
    cy.visit("/");
  });

  it("successfully with valid credentials", () => {
    cy.get("#login").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get('button').contains('Submit').click()
    });
    cy.get("#message").should("contain", "You are currently logged in as user@mail.com");
  });

});