describe("Page Panier - Navigation depuis la home", () => {

  // Avant chaque test : on se connecte et on arrive sur la home
  beforeEach(() => {
    // 1. Aller sur la page de login
    cy.visit("/#/login");

    // 2. Remplir le formulaire de connexion
    cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
    cy.get('[data-cy="login-input-password"]').type("testtest");
    cy.get('[data-cy="login-submit"]').click();

    // 3. Vérifier qu'on est bien sur la home
    cy.url().should("eq", "http://localhost:4200/#/");
  });

  it("affiche le panier avec les produits et le formulaire après clic sur 'Mon panier'", () => {
 

    // 2. Cliquer sur le lien 'Mon panier' dans le header
    cy.get('[data-cy="nav-link-cart"]').click();

    // 3. Vérifier la redirection vers la page panier
    cy.url().should("include", "/#/cart");

    // 4. Vérifier qu'il y a au moins un produit dans le panier
    // (adapter si ton data-cy est différent)
    cy.get('[data-cy="cart-line"]').should("have.length.at.least", 1);

    // 5. Vérifier l'affichage du total
    cy.contains("Total").should("be.visible");
    cy.get('[data-cy="cart-total"]')
      .should("be.visible")
      .invoke("text")
      .should("match", /\d/); // contient au moins un chiffre

    // 6. Vérifier la présence du formulaire "Vos informations"
    cy.contains("Vos informations").should("be.visible");
    cy.get('[data-cy="cart-input-lastname"]').should("be.visible");
    cy.get('[data-cy="cart-input-firstname"]').should("be.visible");
    cy.get('[data-cy="cart-input-address"]').should("be.visible");
    cy.get('[data-cy="cart-input-zipcode"]').should("be.visible");
    cy.get('[data-cy="cart-input-city"]').should("be.visible");

    // 7. Vérifier le bouton "Validez votre commande"
    cy.get('[data-cy="cart-submit"]').should("be.visible").and("be.enabled");
  });
});
