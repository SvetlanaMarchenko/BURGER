
describe('service is available', function() {
  it('should be available on localhost:5173', function() {
    cy.visit('http://localhost:5173');
  });
}); 

describe('burger-constructor is working correctly', function() {
  it('should be available on localhost:5173', function() {
    cy.visit('http://localhost:5173');
  });

  it('should drag ingredients', function() {
    cy.visit('http://localhost:5173');
  });
}); 

