describe('Pizza Sipariş Formu Testleri', () => {
  it('Buton görünür ve  OrderPage sayfasına yönlendiriyor mu?', () => {
    cy.visit('http://localhost:5174/')

    cy.get('[data-cy="aciktim-button"]').should('be.visible');
    cy.get('[data-cy="aciktim-button"]').click(); 

    cy.url().should('eq', 'http://localhost:5174/OrderPage');
  });

  

  it('En az 3 karakter gerektiren bir isim inputu var mı?', () => {
    cy.visit('http://localhost:5174/OrderPage')

    cy.get('[data-cy="name-input"]').type('m');
    cy.get('[data-cy="name-error"]').should('be.visible').and('contain','İsim en az 3 karakter olmalı.');
    cy.get('[data-cy="name-input"]').clear().type('mustafa');
    cy.get('[data-cy="name-input"]').should('exist');
  });
  

  it('Malzemeler için en az 4 en fazla 10 seçim yapılıyor mu', () => {
    cy.visit('http://localhost:5174/OrderPage')

    cy.get('[data-cy="ingredient-checkbox-Pepperoni"]').check();
    cy.get('[data-cy="ingredient-checkbox-Sosis"]').check();
    cy.get('[data-cy="ingredient-checkbox-Kanada Jambonu"]').check();
    cy.get('[data-cy="ingredient-checkbox-Tavuk Izgara"]').check();

    cy.get('[data-cy="ingredients-error"]').should('exist');

    cy.get('[data-cy="ingredient-checkbox-Soğan"]').check();
    cy.get('[data-cy="ingredient-checkbox-Domates"]').check();
    cy.get('[data-cy="ingredient-checkbox-Mısır"]').check();
    cy.get('[data-cy="ingredient-checkbox-Sucuk"]').check();
    cy.get('[data-cy="ingredient-checkbox-Jalepeno"]').check();
    cy.get('[data-cy="ingredient-checkbox-Sarımsak"]').check();
    cy.get('[data-cy="ingredient-checkbox-Biber"]').check();

    cy.get('[data-cy="ingredients-error"]').should('be.visible').and('contain','En fazla 10 malzeme seçebilirsiniz.');

    cy.get('[data-cy="submit-button"]').should('be.disabled');

  });


  it('Zorunlu alanlar doldurulup Sipariş Ver butonu aktif oluyor mu?', () => {
    cy.visit('http://localhost:5174/OrderPage');

    cy.get('[data-cy="submit-button"]').should('be.disabled');

    cy.get('[data-cy="pizza-type"]').select('Margarita');
    cy.get('[data-cy="size-medium"]').check();
    cy.get('[data-cy="pizza-type"]').select('Margarita');
    cy.get('[data-cy="dough-selection"]').select('İnce Hamur');
    
    cy.get('[data-cy="ingredient-checkbox-Kanada Jambonu"]').check();
    cy.get('[data-cy="ingredient-checkbox-Tavuk Izgara"]').check();
    cy.get('[data-cy="ingredient-checkbox-Sarımsak"]').check();
    cy.get('[data-cy="ingredient-checkbox-Biber"]').check();

    cy.get('[data-cy="name-input"]').type('Mustafa');
    
    cy.get('[data-cy="ingredients-error"]').should('exist');

    cy.get('[data-cy="submit-button"]').should('be.visible');
    cy.get('[data-cy="submit-button"]').click();

    cy.url().should('eq', 'http://localhost:5174/success/Mustafa/Medium/%C4%B0nce%20Hamur/Kanada%20Jambonu%2CTavuk%20Izgara%2CSar%C4%B1msak%2CBiber//Margarita/20.00/95.50');
  });

});
