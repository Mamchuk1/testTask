import { baseUrl } from "../../data/urls";
import * as reg from "../../tests/registerFn";
import { firstName, secondName, email, password, phoneNumber, fullCompany, shortCompany, tgnl, iin, okpo } from "../../data/testData";


describe('Registration', () => {
    it('Registration KZ, Individual entrepreneur', () => {
        cy.visit(baseUrl)

        reg.moveToRegisterPage();

        // checking that you are on the right page
        cy.url().should('eq', 'https://demo.zveno.io/reg');

        reg.fillPersonalData(firstName, secondName, email, password, phoneNumber);

        // move to registration step 2
        cy.get('#app > div > div.login-overlay > div.login-card > div > div.login-form-container > div._input-group._input-group__buttons-row > button').should('not.have.attr', 'disabled');
        cy.get('#app > div > div.login-overlay > div.login-card > div > div.login-form-container > div._input-group._input-group__buttons-row > button > span').click();

        // select country
        cy.get('#app > div.v-application--wrap > div.login-overlay > div.login-card > div > div.login-form-container > div.v-stepper.no-border.no-shadow.v-stepper--is-booted.theme--dark > div > div:nth-child(2) > div > form > div:nth-child(2) > div > div.v-input.v-input--hide-details.v-input--is-label-active.v-input--is-dirty.v-input--dense.theme--dark.v-text-field.v-text-field--solo-flat.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select > div > div > div.v-select__slot > div.v-select__selections').click();
        cy.get('#list-item-130-1 > div > div').should('have.text', 'Казахстан').click();

        // fill company names(full, short)
        cy.get('#input-83').type(fullCompany);
        cy.get('#input-86').type(shortCompany);

        // select type of ownership
        cy.get('#app > div.v-application--wrap > div.login-overlay > div.login-card > div > div.login-form-container > div.v-stepper.no-border.no-shadow.v-stepper--is-booted.theme--dark > div > div:nth-child(2) > div > form > div:nth-child(5) > div > div.v-input.v-input--hide-details.v-input--dense.theme--dark.v-text-field.v-text-field--solo-flat.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select > div > div > div.v-select__slot').click();
        cy.get('#list-item-155-0 > div > div').should('have.text', 'ИП').click();

        // select company type and close list
        cy.get('#app > div.v-application--wrap > div.login-overlay > div.login-card > div > div.login-form-container > div.v-stepper.no-border.no-shadow.v-stepper--is-booted.theme--dark > div > div:nth-child(2) > div > form > div:nth-child(7) > div > div.v-input.v-input--hide-details.v-input--dense.theme--dark.v-text-field.v-text-field--solo-flat.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select.v-select--is-multi').click();
        cy.get('#list-item-185-0 > div.v-list-item__content > div').should('have.text', 'Отправитель').click();
        cy.get('body').click(0, 0);

        // fill documents ids
        cy.get('#input-213').type(tgnl);
        cy.get('#input-167').type(iin);
        cy.get('#input-170').type(okpo);

        // upload id image
        cy.get('#input-172').attachFile('../../img/test.jpg');

        // checkbox
        cy.get('#input-179').click();

        // finish the registration
        cy.get('#app > div.v-application--wrap > div.login-overlay > div.login-card > div > div.login-form-container > div._input-group._input-group__buttons-row > button').should('not.have.attr', 'disabled');
        cy.get('#app > div.v-application--wrap > div.login-overlay > div.login-card > div > div.login-form-container > div._input-group._input-group__buttons-row > button > span').click();

        // check and close modal
        cy.get('#app > div.v-dialog__content.v-dialog__content--active > div > div').should('be.visible');
        cy.get('#app > div.v-dialog__content.v-dialog__content--active > div > div > div._modal-actions > button > span').click();
    })
})
