describe('formtester', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3001/form/pizza')
    })

    it('texttest',()=>{
        cy.get('input[name="name"]').type('Name goes here!')
        cy.get('input[name="name"]').should('have.value', 'Name goes here!')
        cy.get('input[name="specialInstructions"]').type('Special instructions go here!')
        cy.get('input[name="specialInstructions"]').should('have.value','Special instructions go here!')
    })
    it('checktest',()=>{
        cy.get('input[name="pepperoni"]').click()
        cy.get('input[name="sausage"]').click()
        cy.get('input[name="pepperoni"]').should('have.value','on')
        cy.get('input[name="sausage"]').should('have.value','on')

    })
    it('submittest',()=>{
        cy.get('.submitButton').should('not.be.disabled')
        

    })
})
