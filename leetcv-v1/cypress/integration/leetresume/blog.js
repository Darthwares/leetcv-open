describe(" Testing for LeetCV - Blog", () => {
    it('test to the blog feature (redirect)', async () => {
        cy.visit("http://localhost:3000")
        cy.get('a.app-bar-btn').contains('Blogs');
        cy.wait(5000)
        cy.get('a.app-bar-btn').click()
    })
})