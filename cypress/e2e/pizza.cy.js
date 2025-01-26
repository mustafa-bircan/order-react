describe('Pizza Order Form Tests', () => {

  it('Ad input alanı en az 3 karakter olmalı', () => {
    cy.visit('http://localhost:5181/OrderPage');
    cy.get('[data-cy="name-input"]').type('Al');
    cy.get('[data-cy="submit-button"]').should('be.disabled');
    cy.get('[data-cy="name-input"]').clear().type('Ali Veli');
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });

  it('Pizza malzemeleri seçilmeden form gönderilemez', () => {
    cy.visit('http://localhost:5181/OrderPage');
    cy.get('[data-cy="name-input"]').type('Ali Veli');
    cy.get('[data-cy="dough-selection"]').select('İnce Hamur');
    cy.get('[data-cy="size-small"]').check();
    cy.get('[data-cy="submit-button"]').should('be.disabled');
    cy.get('[data-cy="ingredients-checkbox"]').first().click();
    cy.get('[data-cy="ingredients-checkbox"]').eq(1).click();
    cy.get('[data-cy="ingredients-checkbox"]').eq(2).click();
    cy.get('[data-cy="ingredients-checkbox"]').eq(3).click();
    cy.get('[data-cy="submit-button"]').should('not.be.disabled');
  });

  it('Pizza boyutu seçilmeden form gönderilemez', () => {
    cy.visit('http://localhost:5181/OrderPage');
    cy.get('[data-cy="name-input"]').type('Ali Veli');
    cy.get('[data-cy="dough-selection"]').select('İnce Hamur');
    cy.get('[data-cy="submit-button"]').should('be.disabled');
    cy.get('[data-cy="size-small"]').check();
    cy.get('[data-cy="submit-button"]').should('not.be.disabled');
  });

  it('Form başarıyla gönderilmeli', () => {
    cy.visit('http://localhost:5181/OrderPage');
    cy.get('[data-cy="name-input"]').type('Ali Veli');
    cy.get('[data-cy="dough-selection"]').select('İnce Hamur');
    cy.get('[data-cy="size-small"]').check();
    cy.get('[data-cy="ingredients-checkbox"]').first().click();
    cy.get('[data-cy="ingredients-checkbox"]').eq(1).click();
    cy.get('[data-cy="ingredients-checkbox"]').eq(2).click();
    cy.get('[data-cy="ingredients-checkbox"]').eq(3).click();
    cy.get('[data-cy="submit-button"]').should('not.be.disabled');
    cy.get('[data-cy="submit-button"]').click();
    cy.url().should('include', '/Success');
  });

  it('Pizza sayısı doğru şekilde arttırılmalı ve azaltılmalı', () => {
    cy.visit('http://localhost:5181/OrderPage');
    cy.get('[data-cy="increment-button"]').click();
    cy.get('.pizza-count').should('contain', '2');
    cy.get('[data-cy="decrement-button"]').click();
    cy.get('.pizza-count').should('contain', '1');
    cy.get('[data-cy="decrement-button"]').click(); 
    cy.get('.pizza-count').should('contain', '1');
  });

  it('Pizza malzemeleri en az 4 olmalı', () => {
    cy.visit('http://localhost:5181/OrderPage');
    cy.get('[data-cy="name-input"]').type('Ali Veli');
    cy.get('[data-cy="dough-selection"]').select('İnce Hamur');
    cy.get('[data-cy="size-small"]').check();
    cy.get('[data-cy="ingredients-checkbox"]').first().click();
    cy.get('[data-cy="ingredients-checkbox"]').eq(1).click();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="ingredients-error"]').should('be.visible')
      .and('contain', 'En az 4 malzeme seçilmesi gerekiyor.');

    cy.get('[data-cy="ingredients-checkbox"]').eq(2).click();
    cy.get('[data-cy="ingredients-checkbox"]').eq(3).click();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="ingredients-error"]').should('not.exist');
  });

  it('Form tüm zorunlu alanlar doldurulmadan gönderilemez', () => {
    cy.visit('http://localhost:5181/OrderPage');

    cy.get('[data-cy="submit-button"]').should('be.disabled');
    
    cy.get('[data-cy="name-input"]').type('Ali Veli');
    cy.get('[data-cy="dough-selection"]').select('İnce Hamur');
    cy.get('[data-cy="size-small"]').check();
    cy.get('[data-cy="ingredients-checkbox"]').first().click();
    cy.get('[data-cy="ingredients-checkbox"]').eq(1).click();
    cy.get('[data-cy="ingredients-checkbox"]').eq(2).click();
    cy.get('[data-cy="ingredients-checkbox"]').eq(3).click();
    cy.get('[data-cy="submit-button"]').should('not.be.disabled');
  });

});
