// 🛡️ Vérifie qu'on ne peut PAS lire le panier sans jeton
describe('Orders - accès non authentifié', () => {
  const api = Cypress.env('apiUrl') || 'http://localhost:8081';

  it('GET /orders sans Authorization -> 401 ou 403', () => {
    cy.request({
      method: 'GET',
      url: `${api}/orders`,
      // 👇 important : on n’envoie PAS de header Authorization
      failOnStatusCode: false, // on s’attend à une erreur contrôlée
    }).then(({ status }) => {
      // Suivant les configs c'est 401 (Unauthorized) ou 403 (Forbidden)
      expect([401, 403]).to.include(status);
    });
  });
});
