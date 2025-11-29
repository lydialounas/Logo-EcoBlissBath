describe('Panier', () => {

    beforeEach(() => {

        cy.visit('http://localhost:4200/#/');
        it(' le bouton est visible', () => {
            cy.get( '[data-cy="nav-link-cart"]')
            .should('be.visible')
            .and('contain', 'Mon panier');

        });
    });

})
