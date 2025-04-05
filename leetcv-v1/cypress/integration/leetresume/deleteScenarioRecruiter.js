context('Testing for LeetCV', () => {
    describe("End to End Testing for LeetCV", () => {
        it('block testing of Deleting Scenario - Recruiter', async () => {
            cy.visit("http://localhost:3000")
            cy.get('[data-testid="primaryAction"]').click()
            cy.get('[data-testid="myRequestId"]').click()
            cy.wait(4000)
            cy.get('.cl-user-button-trigger > .y1F8Ig41MnUi739C58EhN').click()
            cy.get('.cl-active-account-buttonset > :nth-child(2)').click()
        })
    })
});