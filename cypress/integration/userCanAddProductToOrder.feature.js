describe('User can add products to their order', () => {
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
      response: "fixture:order_post_response.json"
    })

    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/v1/orders/1",
      response: "fixture:order_put_response.json"
    })

    cy.login("user@mail.com", "password")
  })

  it('user gets a confirmation message when adding product to order and see their current order', () => {
    cy.get('#product-1').within(() => {
      cy.get('button').contains('Add to order').click()
      cy.get("#order-message").contains("A product has been added to your order")
    })

    cy.get('#product-2').within(() => {
      cy.get('button').contains('Add to order').click()
      cy.get("#order-message").contains("A product has been added to your order")
    })

    cy.get('button').contains('View order').click()

    cy.get('#order-details').within(() => {
      cy.get('li')
        .should('have.length', 2)
        .first().should('have.text', '1 x Pizza')
        .next().should('have.text', '1 x Nachos')

    })

    cy.get('button').contains('View order').click()
    cy.get('#order-details').should('not.exist')
  });
})
