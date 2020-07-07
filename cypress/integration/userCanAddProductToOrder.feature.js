describe("User can add a product to their order", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:product_list.json",
    });

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/orders",
      response: { message: "A product has been added to your order" },
    });

    cy.login("user@mail.com", "password")
  });

  it("user gests a confirmation messsage when adding a a producut to order", () => {
    cy.get("#product-1").within(() => {
      cy.get("button").contains("Add to order").click();
    });
    cy.get("#order-message").contains("A product has been added to your order");
  });
});