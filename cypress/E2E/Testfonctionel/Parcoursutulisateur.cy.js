describe('Parcours Utilisateur', () => {
  it('Vérifie le parcours utilisateur complet', () => {

    // 1. Page d’accueil
    cy.visit('http://localhost:4200/#/');

    // 2. Cliquer sur "Connexion" dans le header
    cy.get('[data-cy="nav-link-login"]').click();

    // 3. On doit être sur /login
    cy.url().should('include', '#/login');

    // 4. Formulaire de connexion
    cy.get('[data-cy="login-form"]').should('be.visible');
    cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
    cy.get('[data-cy="login-input-password"]').type('testtest');
    cy.get('[data-cy="login-submit"]').click();

    // 5. Après connexion : retour sur la home "#/"
    cy.url().should('eq', 'http://localhost:4200/#/');

    // 6. Cliquer sur le bouton "Voir les produits"
    cy.contains('button', 'Voir les produits').click();

    // 7. Page liste produits
    cy.url().should('include', '#/products');

    // 8. Choisir un produit : bouton "Consulter"
    cy.get('[data-cy="product-link"]').first().click();

    // 9. On doit être sur une page détail produit /products/:id
    cy.url().should('include', '#/products/');

    // 10. Ajouter au panier (ON NE VÉRIFIE PLUS L’URL ICI)
    cy.get('[data-cy="detail-product-add"]').should('be.visible').click();

    // 11. Aller au panier via le header "Mon panier"
    cy.get('[data-cy="nav-link-cart"]').click();

    // 12. On doit être sur la page de panier "#/cart"
    cy.url().should('include', '#/cart');

    // 13. Vérifier qu'il y a au moins une ligne de produit dans le panier
    cy.get('[data-cy="cart-line"]').should('have.length.at.least', 1);

    // 14. Vérifier la présence du formulaire de commande
    cy.get('[data-cy="cart-input-lastname"]').type('Dupont');         // Nom
    cy.get('[data-cy="cart-input-firstname"]').type('Lydia');         // Prénom
    cy.get('[data-cy="cart-input-address"]').type('10 rue de Paris'); // Adresse
    cy.get('[data-cy="cart-input-zipcode"]').type('78390');           // Code postal
    cy.get('[data-cy="cart-input-city"]').type('Trappes');            // Ville


    // 15. Cliquer sur "Validez votre commande"
    cy.get('[data-cy="cart-submit"]').click();

    // 16. Vérifier la page de confirmation
    cy.url().should('include', 'http://localhost:4200/#/confirmation');
    cy.contains('Merci !').should('be.visible');
  });
});
