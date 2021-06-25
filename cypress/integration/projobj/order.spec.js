context('Buy products', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/orderId')
    })

    it('user enters correct order data and submits ', () => {
        cy.get('input[name="firstName"]').type('firstName').should('have.value', 'firstName')
        cy.get('input[name="lastName"]').type('lastName').should('have.value', 'lastName')
        cy.get('input[name="addres"]').type('addres').should('have.value', 'addres')
        cy.get('input[name="postalCode"]').type('postalCode').should('have.value', 'postalCode')
        cy.get('input[name="city"]').type('city').should('have.value', 'city')
        cy.get('submit').click()
        cy.location('pathname').should('eq', 'http://localhost:3000/orderSummary')
    })

    it('user increases product quantity', () => {
        cy.get('div.products.productName').should('have.text',"productName")
        cy.get('div.products.productName.quantity').should('have.text',"quantity: 1")
        cy.get('div.products.productName.price').should('have.text',"price: $40")
        cy.get('div.products.totalPrice').should('have.text',"total: $40")
        cy.get('div.products.productName.addButton').click()
        cy.get('div.products.productName.quantity').should('have.text',"quantity: 2")
        cy.get('div.products.totalPrice').should('have.text',"total: $80")
    })

    it('user deletes product from order', () => {
        cy.get('div.products.productName').should('have.text',"productName")
        cy.get('div.products.productName.price').should('have.text',"price: $20")
        cy.get('div.products.productName.quantity').should('have.text',"quantity: 1")
        cy.get('div.products.productName2').should('have.text',"productName2")
        cy.get('div.products.productName.price').should('have.text',"price: $30")
        cy.get('div.products.productName2.quantity').should('have.text',"quantity: 1")
        cy.get('div.products.totalPrice').should('have.text',"total: $50")
        cy.get('div.products.productName.deleteButton').click()
        cy.get('div.products.productName').should('not.exist')
        cy.get('div.products.totalPrice').should('have.text',"total: $30")
    })

    it('user leaves first name field empty (required) ', () => {
        cy.get('input[name="firstName"]').should('have.value', 'firstName')
        cy.get('input[name="lastName"]').type('lastName').should('have.value', 'lastName')
        cy.get('input[name="addres"]').type('addres').should('have.value', 'addres')
        cy.get('input[name="postalCode"]').type('postalCode').should('have.value', 'postalCode')
        cy.get('input[name="city"]').type('city').should('have.value', 'city')
        cy.get('submit').click()
        cy.get('.error-popup').should('be.visible').then((popup)=>{
            cy.get('span').should('have.text',"enter correct first name")
            cy.wrap(popup).find('button').contains("Close").click()
        })
    })

    it('user enters discount code', () => {
        cy.get('div.products.productName').should('have.text',"productName")
        cy.get('div.products.productName.quantity').should('have.text',"quantity: 1")
        cy.get('div.products.productName.price').should('have.text',"price: $40")
        cy.get('div.products.totalPrice').should('have.text',"total: $40")
        cy.get('input[name="discount"]').type('DISCOUNT_CODE_10').should('have.value', 'DISCOUNT_CODE_10')
        cy.get('submit-discount').click()
        cy.get('div.products.totalPrice').should('have.text',"total: $36")
    })

})