context('Add product', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/addNewProduct')
    })

    it('logged user enters correct data and clicks \'add product \' button', () => {
        cy.get('input[name="productTitle"]').type('productTitle').should('have.value', 'productTitle')
        cy.get('dropdown[name="categories"]').click()
        cy.get('product-category').contains('Product category').click();
        const photo = 'photo.png';
        cy.get('[data-cy="file-photo"]').attachFile(photo);
        cy.get('input[name="description"]').type('description').should('have.value', 'description')
        cy.get('submit').click()
        cy.location('pathname').should('eq', 'http://localhost:3000/newProductSummary')
    })

    it('user is not logged', () => {
        cy.contains('Log in')
        cy.get('login-button').click()
        cy.location('pathname').should('eq', 'http://localhost:3000/login')
    })

    it('logged user deletes uploaded image', () => {
        const photo = 'photo.png';
        cy.get('[data-cy="file-photo"]').attachFile(photo);
        cy.get('delete-photo-button').click()
        cy.get('[data-cy=""]')
    })

    it('logged user enters correct data and selects \'promote product\' option', () => {
        cy.get('input[name="productTitle"]').type('productTitle').should('have.value', 'productTitle')
        cy.get('dropdown[name="categories"]').click()
        cy.get('product-category').contains('Product category').click();
        const photo = 'photo.png';
        cy.get('[data-cy="file-photo"]').attachFile(photo);
        cy.get('input[name="description"]').type('description').should('have.value', 'description')
        cy.get('[name="promote-checkbox"]').check()
        cy.get('submit').click()
        cy.location('pathname').should('eq', 'http://localhost:3000/promoteProduct')
    })

    it('logged user leaves description field empty (required)', () => {
        const stub = cy.stub()
        cy.on ('window:alert', stub)
        cy.get('input[name="productTitle"]').type('productTitle').should('have.value', 'productTitle')
        cy.get('dropdown[name="categories"]').click()
        cy.get('product-category').contains('Product category').click();
        const photo = 'photo.png';
        cy.get('[data-cy="file-photo"]').attachFile(photo);
        cy.get('input[name="description"]').should('have.value', 'description')
        cy.get('submit').click().then(()=>{expect(stub.getCall(0)).to.be.calledWith('Description is required')})
    })
})