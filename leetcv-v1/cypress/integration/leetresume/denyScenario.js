context('LeetCV', () => {
    describe("End to End Testing for LeetCV", () => {

        it('test with Deny Scenario - Candidate C1', async () => {
            cy.visit("http://localhost:3000")
            cy.get('[data-testid="primaryAction"]').click({ force: true })
            cy.get('[data-testid="listOfRecruitersId"]').click({ force: true })
            cy.get(':nth-child(1) > .px-2 > [data-testid="denyId"]').click({ force: true })
            cy.wait(1000)
            cy.get('.bg-white > .h-5').click({ force: true })
            cy.get('.cl-user-button-trigger > .cl-user-button-avatar > circle').click({ force: true })
            cy.get('.cl-active-account-buttonset > :nth-child(2)').click({ force: true })
        })

    })
});

