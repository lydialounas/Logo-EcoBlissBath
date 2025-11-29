describe('Smoke Test - Page de connexion', () => {

  it('Vérifie la présence des champs et du bouton de connexion', () => {

    // 1. Aller sur la page login
    cy.visit('http://localhost:4200/#/login');

    // 2. Vérifier que le formulaire s’affiche
    cy.get('[data-cy="login-form"]').should('be.visible');

    // 3. Vérifier la présence des champs
    cy.get('[data-cy="login-input-username"]').should('be.visible');
    cy.get('[data-cy="login-input-password"]').should('be.visible');

    // 4. Vérifier la présence du bouton "Se connecter"
    cy.get('[data-cy="login-submit"]').should('be.visible');
    cy.get('[data-cy="login-submit"]').should('be.enabled');
  });

});
