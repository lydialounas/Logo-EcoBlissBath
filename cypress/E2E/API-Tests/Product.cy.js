// ✅ Tests READ-ONLY des produits :
// - GET /products          : liste complète
// - GET /products/random   : 3 produits aléatoires
// - GET /products/{id}     : détail d'un produit existant (+ cas 404)

describe('Produits – lecture (GET)', () => {
  const api = Cypress.env('apiUrl') || 'http://localhost:8081';
  const username = Cypress.env('username') || 'test2@test.fr';
  const password = Cypress.env('password') || 'testtest';
  const auth = (t) => ({ Authorization: `Bearer ${t}` });

  let token;        // JWT récupéré au login
  let anyId;        // id pris dans la liste pour tester /products/{id}

  // 🔐 Login une fois avant tous les tests
  before(() => {
    cy.request('POST', `${api}/login`, { username, password })
      .then(({ status, body }) => {
        expect(status).to.eq(200);
        token = body.token;
        expect(token, 'JWT reçu').to.exist;
      });
  });
// Vérifier que la liste des produits est bien accessible et exploitable
  it('GET /products -> renvoie une liste non vide avec champs clés', () => {             
    cy.request({
      method: 'GET',
      url: `${api}/products`,
      headers: auth(token),
    }).then(({ status, body }) => {
      expect(status).to.eq(200);

      // La réponse est une liste de produits
      const list = Array.isArray(body) ? body : (body.items || []);
      expect(list, 'liste produits').to.be.an('array').and.have.length.greaterThan(0);

      // Vérifie quelques champs clés du premier élément
      const p = list[0];
      expect(p).to.have.property('id');
      expect(p).to.have.property('name');
      expect(p).to.have.property('price');

       // expect(p).to.have.property('availableStock');

      anyId = p.id; // mémorise un id existant pour le test suivant
    });
  });
// On teste aussi l’endpoint random pour vérifier qu’il renvoie bien trois produits aléatoires que l'api choisi elle meme !
  it('GET /products/random -> renvoie exactement 3 produits', () => {
    cy.request({
      method: 'GET',
      url: `${api}/products/random`,
      headers: auth(token),
    }).then(({ status, body }) => {
      expect(status).to.eq(200);

      const list = Array.isArray(body) ? body : (body.items || []);
      expect(list, 'liste random').to.be.an('array').and.have.length(3);

      // chaque item ressemble à un produit
      list.forEach((p) => {
        expect(p).to.have.property('id');
        expect(p).to.have.property('name');
        expect(p).to.have.property('price');
      });
    });
  });
// Vérifier que le détail d'un produit fonctionne correctement
  it('GET /products/{id} -> détail cohérent avec la liste', () => {
    // Sécurité : si anyId n’est pas défini, relit la liste
    const ensureId = anyId
      ? cy.wrap(anyId)
      : cy.request({ method: 'GET', url: `${api}/products`, headers: auth(token) })
          .then(({ body }) => (Array.isArray(body) ? body[0].id : body.items[0].id));

    ensureId.then((id) => {
      cy.request({
        method: 'GET',
        url: `${api}/products/${id}`,
        headers: auth(token),
      }).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body).to.be.an('object');
        expect(body).to.have.property('id', id);
        expect(body).to.have.property('name');
        expect(body).to.have.property('price');
      });
    });
  });

  it('GET /products/{id} (inexistant) -> 404 attendu', () => {
    // Choisit un id très grand pour simuler l’absence
    const unknownId = 999999;
    cy.request({
      method: 'GET',
      url: `${api}/products/${unknownId}`,
      headers: auth(token),
      failOnStatusCode: false, // on attend 404 sans casser le test
    }).then(({ status }) => {
      expect(status, 'statut 404 attendu pour id inconnu').to.eq(404);
    });
  });
});
