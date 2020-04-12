beforeEach(function() {
  cy.task('resetDatabase')
  cy.visit('/')
})

describe("when typing '/contact' into the omnibox", () => {
  it('should display links to different contact options', () => {
    cy.get('#omnibox input').type('/contact')

    cy.get('.result').should('have.length', 3)
    cy.get('.result')
      .eq(0)
      .should('have.text', '💡Submit a feature request')
    cy.get('.result')
      .eq(1)
      .should('have.text', '🐛Report a bug')
    cy.get('.result')
      .eq(2)
      .should('have.text', '🗣Make a general enquiry')
  })
})
