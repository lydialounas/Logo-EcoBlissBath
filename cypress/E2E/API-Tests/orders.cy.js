 
describe('Panier complet via API (avec orderLines)', () => {

  // 🌐 Déclaration des constantes utilisées tout au long du test
  const api = Cypress.env('apiUrl') || 'http://localhost:8081'; // URL de ton API locale
  const username = Cypress.env('username') || 'test2@test.fr';  // Identifiant utilisateur (si non défini dans .env)
  const password = Cypress.env('password') || 'testtest';       // Mot de passe
  const auth = (t) => ({ Authorization: `Bearer ${t}` });       // Fonction utilitaire pour créer le header d'auth JWT

  // 🧪 Un seul test global : il couvre tout le scénario
  it('login -> purge -> add in-stock -> verify -> try add out-of-stock', () => {

    // 1️⃣ ETAPE LOGIN → on se connecte pour obtenir le token JWT
    cy.request('POST', `${api}/login`, { username, password }).then(({ body }) => {
      const token = body.token;                         // on récupère le token dans la réponse
      expect(token, 'JWT reçu').to.exist;               // on vérifie qu'il existe

      // 2️⃣ ETAPE PRODUITS → on récupère la liste pour trouver un produit en stock et un hors stock
      cy.request('GET', `${api}/products`, { headers: auth(token) }).then(({ body }) => {
        const list = Array.isArray(body) ? body : [];   // on s'assure que la réponse est bien une liste
        const inStock = list.find(p => (p.availableStock ?? 0) > 0); // produit avec stock > 0
        const outStock = list.find(p => (p.availableStock ?? 0) <= 0); // produit avec stock <= 0
        expect(inStock, 'produit en stock').to.exist;   // on vérifie qu'on a trouvé au moins un produit dispo

        // 3️⃣ ETAPE PURGE → on vérifie le panier existant et on le vide
        cy.request({
          method: 'GET',
          url: `${api}/orders`,
          headers: auth(token),
          failOnStatusCode: false,                      // permet de ne pas échouer si l'API renvoie 404 (panier vide ce qui est normal )
        }).then((res) => {
          if (res.status === 404) return;               // si aucun panier, on passe
          expect(res.status).to.eq(200);                // sinon on vérifie qu'on a bien reçu 200 OK
          const lines = res.body.orderLines || [];      // récupération des lignes de commande
          
          // Boucle pour supprimer chaque produit du panier un par un
          lines.forEach((line) => {
            cy.request({
              method: 'DELETE',
              url: `${api}/orders/${line.id}/delete`,   // suppression via l’id de la ligne
              headers: auth(token),
            }).its('status').should('be.oneOf', [200, 204]); // on attend une réponse 200 ou 204
          });
        });

        // 4️⃣ ETAPE AJOUT → on ajoute un produit disponible dans le panier
        cy.request({
          method: 'PUT',
          url: `${api}/orders/add`,
          headers: auth(token),
          body: { product: inStock.id, quantity: 1 },   // ⚠️ format exact attendu par ton API
        }).its('status').should('be.oneOf', [200, 201]); // on attend un 200 ou 201 en retour

        // 5️⃣ ETAPE VÉRIFICATION → on lit le panier et on vérifie que le produit ajouté est bien présent
        cy.request({
          method: 'GET',
          url: `${api}/orders`,
          headers: auth(token),
        }).then(({ body }) => {
          const lines = body.orderLines || [];          // on lit les orderLines
          const found = lines.find(l =>
            l.product === inStock.id ||                 // certains backends renvoient directement l’id
            (l.product && l.product.id === inStock.id)  // d’autres renvoient un objet product
          );
          expect(found, 'produit ajouté présent dans orderLines').to.exist; // on confirme qu’il est bien dans le panier
        }); 
       
       
       
        // 6️⃣ ETAPE HORS STOCK → on vérifie que l'API renvoie 200 même pour un produit épuisé (BUG métier)
if (outStock) {
  cy.request({
    method: 'PUT',
    url: `${api}/orders/add`,
    headers: auth(token),
    body: { product: outStock.id, quantity: 1 },
    failOnStatusCode: false,         // on veut juste lire le status
  })
    .its('status')
    .should('eq', 200);               // on s'attend à un 400 Bad Request (ou 409 Conflict selon l'API)
      });
    });
  });
});