describe('Smoke Test - Boutons Ajouter au Panier', () => {

  it('Vérifie la présence des boutons Ajouter au panier après connexion', () => {

    // 1. Aller sur la page login
    cy.visit('http://localhost:4200/#/login');

    // 2. Connexion
    cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
    cy.get('[data-cy="login-input-password"]').type('testtest');
    cy.get('[data-cy="login-submit"]').click();

    // 3. Vérifier qu’on est sur la home
    cy.url().should('eq', 'http://localhost:4200/#/');

    // 4. Aller sur la page produits
    cy.contains('Voir les produits').click();
    cy.url().should('include', 'http://localhost:4200/#/products');

    // 5. Vérifier présence des boutons "Consulter"
    cy.get('[data-cy="product-link"]').should('have.length.at.least', 1);

    // 6. Cliquer sur un produit pour afficher le détail
    cy.get('[data-cy="product-link"]').first().click();

    // 7. Vérifier présence du bouton "Ajouter au panier"
    cy.get('[data-cy="detail-product-add"]').should('be.visible');
    cy.get('[data-cy="detail-product-add"]').should('be.enabled');
  });

});
