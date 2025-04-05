context('LeetCV', () => {
    describe("End to End Testing for LeetCV", () => {
        it('test to check passcode and view resume Scenario - Recruiter', async () => {
            cy.visit("http://localhost:3000")
            cy.get('[data-testid="primaryAction"]').click({ force: true })
            cy.get('[data-testid="myRequestId"]').click({ force: true })
            cy.log(cy.get('tbody > tr > :nth-child(2)'))
            cy.get('.cl-user-button-trigger > .y1F8Ig41MnUi739C58EhN').click({ force: true })
            cy.get('.cl-active-account-buttonset > :nth-child(2)').click({ force: true })
        })
    })
});

