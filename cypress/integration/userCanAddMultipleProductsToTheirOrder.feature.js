describe("User can add a product to his/her order", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/products",
      response: "fixture:product_list.json",
    });

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/orders",
      response: {
        message: "The product has been added to your order",
        order_id: 1,
      },
    });

    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/v1/orders/1",
      response: {
        message: "The product has been added to your order",
        order_id: 1,
      },
    });
    cy.login("user@mail.com", "password");
  });

  it("user get a confirmation message when adding product to order", () => {
    cy.get("#product-2").within(() => {
      cy.get("button").contains("Add to order").click();
      cy.get("#order-message").should(
        "contain",
        "The product has been added to your order"
      );
    });

    cy.get("#product-3").within(() => {
      cy.get("button").contains("Add to order").click();
      cy.get("#order-message").should(
        "contain",
        "The product has been added to your order"
      );
    });
  });
});