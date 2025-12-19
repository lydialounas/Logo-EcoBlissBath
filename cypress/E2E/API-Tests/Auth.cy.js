  
  
 
 
 describe('post /auth/login', () => {
    it('email et mot de passe non valides', () => {
      
        cy.request({
          method: 'POST',
          url: 'http://localhost:8081/login',
          body: {
            username: 'test236@test.fr',
            password: 'wrongpassword'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body.message).to.eq('Invalid credentials.');
        });
      });
    });
    it('email valide et mot de passe non valides', () => {
       
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/login',
            body: {
              username: 'test2@test.fr',
              password: 'wrongpassword'
            },
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq('Invalid credentials.');
          });
        });
      ;
    ;
    it('email non valide et mot de passe valides', () => {
     
        cy.request({
          method: 'POST',
          url:'http://localhost:8081/login',
          body: {
            username: 'test332@test.fr',
            password: 'testtest'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body.message).to.eq('Invalid credentials.');
        });
      });
    ;
    it('email valide et mot de passe valide', () => {
     
        cy.request({
          method: 'POST',
          url:  'http://localhost:8081/login',
          body: {
            username: 'test2@test.fr',
            password: 'testtest'
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('token');
        });
      });
    ;
  ;