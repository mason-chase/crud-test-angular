
const Firstname = '[formControlName="Firstname"]';
const Lastname = '[formControlName="Lastname"]';
const DateOfBirth = '[formControlName="DateOfBirth"]';
const PhoneNumber = '[formControlName="PhoneNumber"]';
const Email = '[formControlName="Email"]';
const BankAccountNumber = '[formControlName="BankAccountNumber"]';
const submit = '[data-cy="submit-customer-form"]';

const customer = {
    Firstname: 'Ali',
    Lastname: 'shoghian',
    DateOfBirth: '992-12-30',
    PhoneNumber: '2025550195',
    Email: 'shoghianpoorali@gmail.com',
    BankAccountNumber: '322',
}
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
        cy.get(Firstname).type(customer.Firstname);
        cy.get(Lastname).type(customer.Lastname);
        cy.get(DateOfBirth).type(customer.DateOfBirth);
        cy.get(PhoneNumber).type(customer.PhoneNumber);
        cy.get(Email).type(customer.Email)
        cy.get(BankAccountNumber).type(customer.BankAccountNumber);
        cy.get(submit).should('not.be.disabled')
    })
    it('Success the customer information create', () => {
        cy.clearLocalStorage('customer')
        cy.get(submit).click()
    })
    it('should the customer information were duplicated', () => {
        cy.get(Firstname).type(customer.Firstname);
        cy.get(Lastname).type(customer.Lastname);
        cy.get(DateOfBirth).type(customer.DateOfBirth);
        cy.get(PhoneNumber).type(customer.PhoneNumber);
        cy.get(Email).type(customer.Email)
        cy.get(BankAccountNumber).type(customer.BankAccountNumber);
        cy.get(submit).click();
        cy.get('[data-cy="duplicated-customer-info"]').should('exist')
    })

    it('should the customer information were duplicated whit different email', () => {
        cy.get(Email).clear();
        cy.get(Email).type('anyEmail.address@gmail.com')
        cy.get(submit).click();
        cy.get('[data-cy="duplicated-customer-info"]').should('exist');
    })
    it('Success the customer information create again', () => {
        cy.get(Email).clear();
        cy.get(Firstname).clear();
        cy.get(Lastname).clear()
        cy.get(DateOfBirth).clear()
        cy.get(PhoneNumber).clear()
        cy.get(BankAccountNumber).clear()
        cy.get(Firstname).type(customer.Firstname + '_2')
        cy.get(Lastname).type(customer.Lastname);
        cy.get(DateOfBirth).type(customer.DateOfBirth);
        cy.get(PhoneNumber).type(customer.PhoneNumber);
        cy.get(Email).type('anyEmail.address@gmail.com');
        cy.get(BankAccountNumber).type(customer.BankAccountNumber);
        cy.get(submit).click();
        cy.get('[data-cy="duplicated-customer-info"]').should('not.exist');
    })
    it('should the customer information were duplicated, email already is exist', () => {
        cy.get(Email).type('anyEmail.address@gmail.com');
        cy.get(Firstname).type(customer.Firstname + '_3')
        cy.get(Lastname).type(customer.Lastname);
        cy.get(DateOfBirth).type(customer.DateOfBirth);
        cy.get(PhoneNumber).type(customer.PhoneNumber);
        cy.get(BankAccountNumber).type(customer.BankAccountNumber);
        cy.get(submit).click();
        cy.get('[data-cy="duplicated-customer-info"]').should('exist');
    })
    it('should the columns were exist', () => {
        cy.get('[data-cy="th-Firstname"]').should('exist')
        cy.get('[data-cy="th-Lastname"]').should('exist')
        cy.get('[data-cy="th-DateOfBirth"]').should('exist')
        cy.get('[data-cy="th-PhoneNumber"]').should('exist')
        cy.get('[data-cy="th-DateOfBirth"]').should('exist')
        cy.get('[data-cy="th-BankAccountNumber"]').should('exist')
        cy.get('[data-cy="th-action"]').should('exist')
    })

    it('should edit the first row', () => {
        let listLength = Cypress.$('[data-cy="customer-tbl"]').find('tbody').children().length
        if (listLength > 0) {
            let edit = cy.get('[data-cy="customer-list-index-0"]').find('[data-cy="customer-edit"]')
            edit.should('exist')
            edit.click();
            const editBtn = cy.get('[data-cy="edit-customer-form"]');
            editBtn.should('exist');
            cy.get(Lastname).type(' poor');
            editBtn.click()
        }
    })
    it('should delete the second row', () => {
        let listLength = Cypress.$('[data-cy="customer-tbl"]').find('tbody').children().length
        if (listLength > 1) {
            let deleteRow = cy.get('[data-cy="customer-list-index-1"]').find('[data-cy="customer-delete"]')
            deleteRow.should('exist')
            deleteRow.click();
            cy.get('[data-cy="customer-tbl"]').find('tbody').children().should('have.length',listLength-1);
        }
    })
})