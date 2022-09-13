describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.location('pathname').should('eq','/customer/create')
  })
  it('visit the create customer page',()=>{
    cy.visit('/customer/create');
  })
  it('check all of form controls are exist',()=>{
    
    cy.get('[formControlName="Firstname"]').should('exist')
    cy.get('[formControlName="Lastname"]').should('exist')
    cy.get('[formControlName="DateOfBirth"]').should('exist')
    cy.get('[formControlName="PhoneNumber"]').should('exist')
    cy.get('[formControlName="Email"]').should('exist')
    cy.get('[formControlName="BankAccountNumber"]').should('exist')
  })
})
