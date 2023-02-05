const Firstname = '[formControlName="Firstname"]';
const Lastname = '[formControlName="Lastname"]';
const DateOfBirth = '[formControlName="DateOfBirth"]';
const PhoneNumber = '[formControlName="PhoneNumber"]';
const Email = '[formControlName="Email"]';
const BankAccountNumber = '[formControlName="BankAccountNumber"]';
const submit = '[data-cy="submit-customer-form"]';
const customerTest = {
  Firstname: 'Kevin',
  Lastname: 'Marvin',
  DateOfBirth: '1990-12-25',
  PhoneNumber: '2365417893',
  Email: 'Kevin@yahoo.com',
  BankAccountNumber: '2635225142365',
};

describe('view customer create', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/create');
  });

  it('view customer page', () => {
    cy.visit('/create');
  });

  it('check all of form controls are exist', () => {
    cy.get(Firstname).should('exist');
    cy.get(Lastname).should('exist');
    cy.get(DateOfBirth).should('exist');
    cy.get(PhoneNumber).should('exist');
    cy.get(Email).should('exist');
    cy.get(BankAccountNumber).should('exist');
  });

  it('phone number formate is Invalid', () => {
    cy.get(PhoneNumber).type('dfs236541789');
    cy.get(Email)
      .focus()
      .then(() => {
        cy.get('[data-cy="invalid-phone-number"]').should('exist');
      });
  });

  it('check email address format message', () => {
    cy.get(Email).type('sdf236541789@');
    cy.get(PhoneNumber)
      .focus()
      .then(() => {
        cy.get('[data-cy="invalid-email"]').should('exist');
      });
  });

  it('customer info created successfully', () => {
    cy.clearLocalStorage('customer');
    cy.get(submit).click();
  });


  // it('customer information duplicated', () => {
  //   cy.get(Firstname).type(customerTest.Firstname);
  //   cy.get(Lastname).type(customerTest.Lastname);
  //   cy.get(DateOfBirth).type(customerTest.DateOfBirth);
  //   cy.get(PhoneNumber).type(customerTest.PhoneNumber);
  //   cy.get(Email).type(customerTest.Email);
  //   cy.get(BankAccountNumber).type(customerTest.BankAccountNumber);
  //   cy.get(submit).click()
  //   cy.get('[data-cy="customer-info-duplicated"]').should('exist');
  // });

  it('create another customer information', () => {
    cy.get(Email).clear();
    cy.get(Firstname).clear();
    cy.get(Lastname).clear();
    cy.get(DateOfBirth).clear();
    cy.get(PhoneNumber).clear();
    cy.get(BankAccountNumber).clear();
    cy.get(Firstname).type(customerTest.Firstname + 'Nick');
    cy.get(Lastname).type(customerTest.Lastname);
    cy.get(DateOfBirth).type(customerTest.DateOfBirth);
    cy.get(PhoneNumber).type(customerTest.PhoneNumber);
    cy.get(Email).type('KEmail.Marv@gmail.com');
    cy.get(BankAccountNumber).type(customerTest.BankAccountNumber);
    cy.get(submit).click();
    cy.get('[data-cy="customer-info-duplicated"]').should('not.exist');
  });


  it('customer information duplicated, email already is exist', () => {
    cy.get(Email).type('KEmail.Marv@gmail.com');
    cy.get(Firstname).type(customerTest.Firstname + 'dav');
    cy.get(Lastname).type(customerTest.Lastname);
    cy.get(DateOfBirth).type(customerTest.DateOfBirth);
    cy.get(PhoneNumber).type(customerTest.PhoneNumber);
    cy.get(BankAccountNumber).type(customerTest.BankAccountNumber);
    cy.get(submit).click();
    cy.get('[data-cy="customer-info-duplicated"]').should('exist');
  });
});
