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
        cy.get('button').contains('Search many').click()
        cy.get('.modal-dialog').should('be.visible').then(($dialog)=>{
            cy.wrap($dialog).find('button').contains("Add another").click()
            cy.wrap($dialog).find('input[name="dialoganother2"]').should('exist')
        })
    })

    it('user clicks \'search many \' button and pick \'cancel\'', () => {
        cy.get('button').contains('Search many').click()
        cy.get('.modal-dialog').should('be.visible').then(($dialog)=>{
            cy.wrap($dialog).find('button').contains("Cancel").click()
        })
        cy.location('pathname').should('eq', 'http://localhost:3000/search-products')
    })

    it('user clicks \'search many \' button,enters two existing products name and submit', () => {
        cy.get('button').contains('Search many').click()
        cy.get('.modal-dialog').should('be.visible').then(($dialog)=>{
            cy.wrap($dialog).find('button').contains("Add another").click()
            cy.wrap($dialog).find('input[name="dialoganother1"]').should('have.value', 'productName').type('productName')
            cy.wrap($dialog).find('input[name="dialoganother2"]').should('exist').type('productName2')
            cy.get('button').contains('Search').click()
        })
        cy.get('.modal-dialog').should('not.be.visible')
        cy.get('div.products').contains("productName")
        cy.get('div.products').contains("productName2")
    })

})