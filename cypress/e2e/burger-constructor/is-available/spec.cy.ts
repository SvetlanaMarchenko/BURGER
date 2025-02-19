describe('burger-constructor is working correctly', function() {
  before(function() {
    cy.visit('http://localhost:5173');
  });

  it('should drag ingredient to constructor and drop', function() {

    // Open modal window with order details
    cy.get('[draggable="true"]').first().click()
    cy.get('[data-cy=nutrition-fact]');
    cy.get('[data-cy=on-close]') 
    .click(); 
    cy.get('[data-cy=on-close]').should("not.exist")


  // Drag and drop for ingredients and bun seperatly
  // Bun:
    cy.get('[draggable="true"]').first()
      .trigger('dragstart');

    cy.get('[data-cy=constructorDropTarget]')
      .trigger('dragover')
      .trigger('drop');

  // other ingredients:
    cy.get('[draggable="true"]').eq(5)
      .trigger('dragstart');

    cy.get('[data-cy=constructorDropTarget]')
      .trigger('dragover')
      .trigger('drop');

    // Click to order page
    cy.contains('Оформить заказ').click();


    // Log in 
    cy.log('Ввод e-mail');
    cy.get('[data-cy="E-mail"]').type('gfhjgfjh@mail.ru', { timeout: 3000 });

    cy.log('Ввод пароля');
    cy.get('[data-cy="password"]').type('000000', { timeout: 3000 });
    cy.get('[data-cy="enter"]').click();

    //order-creation process
    cy.get('[data-cy="orderCreation"]').click();
    cy.log('Waiting for createOrder request...');
    cy.get('[data-cy="order-number"]', {timeout: 30000})

    cy.get('[data-cy="order-number"]').contains("Идентификатор заказа")
    cy.get('[data-cy=on-close]')
    .click();
    cy.get('[data-cy="order-number"]').should("not.exist")
  });
});
