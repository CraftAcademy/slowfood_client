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
      response: { 
        message: 'A product has been added to your order',
        order: {
          id: 1
        }
      }
    })

    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/v1/orders/1",
      response: { 
        message: 'Another product has been added to your order',
        order: {
          id: 1
        }
      }
    })

    cy.login("user@mail.com", "password")
  })

  it('user gets a confirmation messafe when adding product to order', () => {
    cy.get('#product-1').within(() => {
      cy.get('button').contains('Add to order').click()
      cy.get("#order-message").contains("A product has been added to your order")
    })

    cy.get('#product-2').within(() => {
      cy.get('button').contains('Add to order').click()
      cy.get("#order-message").contains("Another product has been added to your order")
    })
  });
})
