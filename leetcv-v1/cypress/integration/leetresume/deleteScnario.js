describe("End to End Testing of LeetCV for Delete Scenario - Candidate C1", () => {
    it('block testing of Delete Scenario - Candidate C1', async () => {
        cy.visit("http://localhost:3000")
        cy.get('[data-testid="primaryAction"]').click()
        cy.get('[data-testid="listOfRecruitersId"]').click({ force: true })
        cy.get(':nth-child(1) > .px-2 > [data-testid="deleteId"]').click()
        cy.wait(5000)
        cy.get('.cl-user-button-trigger > .cl-user-button-avatar > circle').click({ force: true })
        cy.get('.cl-active-account-buttonset > :nth-child(2)').click()
    })
})


