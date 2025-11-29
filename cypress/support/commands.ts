 // cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
      resetCart(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email = 'test2@test.fr', password = 'testtest') => {
  cy.request('POST', `${Cypress.env('apiUrl')}/login`, { email, password })
    .its('status').should('eq', 200);
});

Cypress.Commands.add('resetCart', () => {
  // à adapter si ton API expose un endpoint de reset; sinon, vide localStorage/session
  cy.window().then((win) => {
    win.localStorage.removeItem('cart');
  });
});

export {};
