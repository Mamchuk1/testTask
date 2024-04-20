import { baseUrl } from "../../data/urls";
import * as reg from "../../tests/registerFn";
import { firstName } from "../../data/testData";


describe('Registration', () => {
    it('Registration KZ, Individual entrepreneur', () => {
        cy.visit(baseUrl)

        reg.moveToRegisterPage();

        // checking that you are on the right page
        cy.url().should('eq', 'https://demo.zveno.io/reg');


    })
})
