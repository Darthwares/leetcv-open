describe('test with Approval Scenario - Candidate C1', () => {
    it('block testing of Approval Scenario - Candidate C1', async () => {
        cy.visit("https://accounts.g0bzk.y94ew.lcl.dev/sign-in")
        cy.get('input#text-field-identifier').type("wifafoc410@kingsready.com")
        cy.get('._2lCuylJYKUHfqmT7CR2s5E > ._2PInu8iBQ3AhaYJXSEDqmx').click()
        cy.wait(2000)
        cy.get('._2hZhZBtdTbgzL_7MNAy357').type("dosaMaster!123")
        cy.get('._2lCuylJYKUHfqmT7CR2s5E > ._2PInu8iBQ3AhaYJXSEDqmx').click({ force: true })
        cy.wait(3000)
        cy.visit("http://localhost:3000")

    })
});