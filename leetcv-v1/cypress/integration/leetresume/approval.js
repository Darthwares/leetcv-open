describe("End to End Testing for LeetCV for Approval Scenario - Candidate C1", () => {
    it('block testing of Approval Scenario - Candidate C1', async () => {
        cy.visit("http://localhost:3000")
        cy.get('[data-testid="primaryAction"]').contains('Dashboard');
        cy.get('[data-testid="primaryAction"]').click()
        cy.get('[data-testid="listOfRecruitersId"]').click({ force: true })
        cy.get(':nth-child(1) > .px-2 > [data-testid="approveId"]').click({ force: true })
        cy.wait(3000)
        cy.get('.bg-white > .h-5').click()
        cy.get('.cl-user-button-trigger > .cl-user-button-avatar > circle').click({ force: true })
        cy.get('.cl-active-account-buttonset > :nth-child(2)').click()
    })
})

