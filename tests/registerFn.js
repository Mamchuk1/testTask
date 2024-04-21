export function moveToRegisterPage() {
    cy.get('div.login-form-sub-title a').click();
};

export function fillPersonalData(firstName, secondName, email, password, phoneNumber) {
    cy.get('#input-48').type(secondName);
    cy.get('#input-51').type(firstName);
    cy.get('#input-57').type(email);
    cy.get('#input-64').type(phoneNumber);
    cy.get('#input-67').type(password);
    cy.get('#input-71').type(password);
}