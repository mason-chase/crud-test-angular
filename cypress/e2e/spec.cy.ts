describe('test initial app', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.location('pathname').should('eq','/customer/create')
  })
})
