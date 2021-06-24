context('Register', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register')
    })

    it('user enters correct data and submits form', () => {
        cy.get('input[name="login"]').type('sample').should('have.value', 'sample')
        cy.get('input[name="password"]').type('samplePassword').should('have.value', 'samplePassword')
        cy.get('button').click()
        cy.location('pathname').should('eq', 'http://localhost:3000/')
    })

    it('user enters incorrect login - already taken', () => {
        const stub = cy.stub()
        cy.on ('window:alert', stub)
        cy.get('input[name="login"]').type('sampleTaken').should('have.value', 'sample')
        cy.get('input[name="password"]').type('samplePassword').should('have.value', 'samplePassword')
        cy.get('button').click().then(()=>{expect(stub.getCall(0)).to.be.calledWith('This login is already taken')})
        cy.location('pathname').should('eq', 'http://localhost:3000/register')
    })

    it('user enters incorrect password - too short', () => {
        const stub = cy.stub()
        cy.on ('window:alert', stub)
        cy.get('input[name="login"]').type('sample').should('have.value', 'sample')
        cy.get('input[name="password"]').type('pass').should('have.value', 'samplePassword')
        cy.get('button').click().then(()=>{expect(stub.getCall(0)).to.be.calledWith('This password is too short')})
        cy.location('pathname').should('eq', 'http://localhost:3000/register')
    })

    it('user enters incorrect login - too short', () => {
        const stub = cy.stub()
        cy.on ('window:alert', stub)
        cy.get('input[name="login"]').type('sa').should('have.value', 'sample')
        cy.get('input[name="password"]').type('samplePassword').should('have.value', 'samplePassword')
        cy.get('button').click().then(()=>{expect(stub.getCall(0)).to.be.calledWith('This login is too short')})
        cy.location('pathname').should('eq', 'http://localhost:3000/register')
    })

    it('user enters incorrect login - too long', () => {
        const stub = cy.stub()
        cy.on ('window:alert', stub)
        cy.get('input[name="login"]').type('sampleverylongandcomplicatedlogin').should('have.value', 'sample')
        cy.get('input[name="password"]').type('samplePassword').should('have.value', 'samplePassword')
        cy.get('button').click().then(()=>{expect(stub.getCall(0)).to.be.calledWith('This login is too long')})
        cy.location('pathname').should('eq', 'http://localhost:3000/register')
    })

})