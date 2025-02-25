

describe('burger-constructor is working correctly', function() {
  const ingredientSelector = '[draggable="true"]'
  const closeButtonSelector = '[data-cy=on-close]'
  const constructorDropTarget= '[data-cy=constructorDropTarget]'
  const orderNumberSelector = '[data-cy="order-number"]'
  const nutritionFactSelector = '[data-cy=nutrition-fact]'
  const emailInputSelector = '[data-cy="E-mail"]'
  const passwordInputSelector = '[data-cy="password"]'
  const loginOkSelector = '[data-cy="enter"]'
  const orderCreationButtonSelector = '[data-cy="orderCreation"]'

  before(function() {
    cy.visit('/')
  });

  it('should drag ingredient to constructor and drop', function() {

    // Open modal window with order details
    cy.get(ingredientSelector).first().click()
    cy.get(nutritionFactSelector);
    cy.get(closeButtonSelector) 
    .click(); 
    cy.get(closeButtonSelector).should("not.exist")


  // Drag and drop for ingredients and bun seperatly
  // Bun:
    cy.get(ingredientSelector).first()
      .trigger('dragstart');

    cy.get(constructorDropTarget)
      .trigger('dragover')
      .trigger('drop');

  // other ingredients:
    cy.get(ingredientSelector).eq(5)
      .trigger('dragstart');

    cy.get(constructorDropTarget)
      .trigger('dragover')
      .trigger('drop');

    // Click to order page
    cy.contains('Оформить заказ').click();


    // Log in 
    cy.log('Ввод e-mail');
    cy.get(emailInputSelector).type('gfhjgfjh@mail.ru', { timeout: 3000 });

    cy.log('Ввод пароля');
    cy.get(passwordInputSelector).type('000000', { timeout: 3000 });
    cy.get(loginOkSelector).click();

    //order-creation process
    cy.get(orderCreationButtonSelector).click();
    cy.log('Waiting for createOrder request...');
    cy.get(orderNumberSelector, {timeout: 30000})

    cy.get(orderNumberSelector).contains("Идентификатор заказа")
    cy.get(closeButtonSelector)
    .click();
    cy.get(orderNumberSelector).should("not.exist")
  });
});
