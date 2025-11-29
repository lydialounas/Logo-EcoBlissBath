describe('Affichage des produits', () => {
  it('doit afficher la liste des produits avec au moins un produit consultable', () => {

    // Aller directement sur la page liste produits
    // grâce au baseUrl = "http://localhost:4200"
    cy.visit('/#/products');

    // Attendre que la liste de produits se charge
    // on laisse 10 secondes max pour être tranquille
    cy.get('[data-cy="product-link"]', { timeout: 10000 })
      .should('have.length.at.least', 1);   // au moins un bouton "Consulter"

    // Vérifier que le premier bouton contient bien le texte "Consulter"
    cy.get('[data-cy="product-link"]')
      .first()
      .should('contain', 'Consulter');
  });
});
