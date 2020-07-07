describe("User can see the menu", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:product_list.json",
    });

    cy.visit("/");
  });

  it("successfully", () => {
    cy.get("#menu").within(() => {
      cy.get("#product-1").should("contain", "Pizza")
      cy.get("#product-2").should("contain", "Nachos")
      cy.get("#product-3").should("contain", "Pie")
    });
  });
});