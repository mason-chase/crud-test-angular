
const Firstname = '[formControlName="Firstname"]';
const Lastname = '[formControlName="Lastname"]';
const DateOfBirth = '[formControlName="DateOfBirth"]';
const PhoneNumber = '[formControlName="PhoneNumber"]';
const Email = '[formControlName="Email"]';
const BankAccountNumber = '[formControlName="BankAccountNumber"]';
const submit = '[data-cy="submit-customer-form"]';

describe('visit the create customer ', () => {

    it('visit the create customer page', () => {
        cy.visit('/customer/create');
    })
    it('check all of form controls are exist', () => {
        cy.get(Firstname).should('exist')
        cy.get(Lastname).should('exist')
        cy.get(DateOfBirth).should('exist')
        cy.get(PhoneNumber).should('exist')
        cy.get(Email).should('exist')
        cy.get(BankAccountNumber).should('exist')
    })
    it('Invalid phone number formate message is exist', () => {
        cy.get(PhoneNumber).type('sdf23432424');
        cy.get(Email).focus().then(() => {
            cy.get('[data-cy="invalid-phone-number"]').should('exist')
        });
    })
    it('Invalid email address formate message is exist', () => {
        cy.get(Email).type('sdf23432424@');
        cy.get(PhoneNumber).focus().then(() => {
            cy.get('[data-cy="invalid-email"]').should('exist');

        });
    })
    it('Enabled save button after form is valid', () => {
        cy.get(PhoneNumber).clear();
        cy.get(Email).clear();
        cy.get(Firstname).type('Ali');
        cy.get(Lastname).type('shoghian');
        cy.get(DateOfBirth).type('1992-12-30');
        cy.get(PhoneNumber).type('2025550195');
        cy.get(Email).type('shoghianpoorali@gmail.com')
        cy.get(BankAccountNumber).type('322');
        cy.get(submit).should('not.be.disabled')
    })
    it('Success the customer information create', () => {
        cy.clearLocalStorage('customer')
        cy.get(submit).click()
    })
    it('should the customer information were duplicated', () => {
        cy.get(submit).click();
        cy.get('[data-cy="duplicated-customer-info"]').should('exist')
    })

    it('should the customer information were duplicated whit different email', () => {
        cy.get(Email).clear();
        cy.get(Email).type('anyEmail.address@gmail.com')
        cy.get(submit).click();
        cy.get('[data-cy="duplicated-customer-info"]').should('exist');
    })
    it('should the customer information were duplicated whit different email', () => {
        cy.get(Email).clear();
        cy.get(Email).type('anyEmail.address@gmail.com');
        cy.get(Firstname).type('_2')
        cy.get(submit).click();
        cy.get('[data-cy="duplicated-customer-info"]').should('not.exist');
    })
})