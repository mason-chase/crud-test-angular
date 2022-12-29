describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.location('pathname').should('eq','/customer/create')  })
})
