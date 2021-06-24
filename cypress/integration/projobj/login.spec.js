context('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
    })

    it('user enters correct data and submits form', () => {
        cy.get('input[name="login"]').type('correctLogin').should('have.value', 'correctLogin')
        cy.get('input[name="password"]').type('correctPassword').should('have.value', 'correctPassword')
        cy.get('button').click()
        cy.location('pathname').should('eq', 'http://localhost:3000/')
    })

    it('user enters incorrect login', () => {
        const stub = cy.stub()
        cy.on ('window:alert', stub)
        cy.get('input[name="login"]').type('incorrectLogin').should('have.value', 'correctLogin')
        cy.get('input[name="password"]').type('correctPassword').should('have.value', 'correctPassword')
        cy.get('button').click().then(()=>{expect(stub.getCall(0)).to.be.calledWith('User doesn\'t exist')})
        cy.location('pathname').should('eq', 'http://localhost:3000/login')
    })

    it('user enters incorrect password', () => {
        const stub = cy.stub()
        cy.on ('window:alert', stub)
        cy.get('input[name="login"]').type('correctLogin').should('have.value', 'correctLogin')
        cy.get('input[name="password"]').type('incorrectPassword').should('have.value', 'correctPassword')
        cy.get('button').click().then(()=>{expect(stub.getCall(0)).to.be.calledWith('This password is incorrect')})
        cy.location('pathname').should('eq', 'http://localhost:3000/login')
    })

    it('user clicks cancel login button', () => {
        cy.get('button').contains('Cancel').click()
        cy.location('pathname').should('eq', 'http://localhost:3000/')
    })

    it('user clicks \'Remind password\' button', () => {
        const stub = cy.stub()
        cy.on ('window:alert', stub)
        cy.get('button').contains('Remind password').click()
        cy.location('pathname').should('eq', 'http://localhost:3000/remind-password')
        cy.get('input[name="login"]').type('correctLogin').should('have.value', 'correctLogin')
        cy.get('submit').click().then(()=>{expect(stub.getCall(0)).to.be.calledWith('Check email with new password')})
    })

})