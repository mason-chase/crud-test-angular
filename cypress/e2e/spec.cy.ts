describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.url().should('include', '/create');
  });
});
