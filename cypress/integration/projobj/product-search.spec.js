context('Product search', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/search-products')
    })

    it('user enters existing product name and submit', () => {
        cy.get('input[name="search"]').type('productName').should('have.value', 'productName')
        cy.get('button').contains('Search').click()
        cy.get('div.products').should('have.text',"productName")
    })

    it('user enters nonexisting product name and submit', () => {
        cy.get('input[name="search"]').type('nonexistingProductName').should('have.value', 'productName')
        cy.get('button').contains('Search').click()
        cy.get('div.products').should('not.exist')
        cy.get('title').should('have.text',"no results")
    })

    it('user clicks \'search many \' button and pick \'add another\'', () => {

    })

    it('user clicks \'search many \' button,enters two existing products name and submit', () => {

    })

})