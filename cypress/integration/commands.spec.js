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
      .find('a')
      .should('have.attr', 'href', 'mailto:features@peoplenotplatforms.com')

    cy.get('.result')
      .eq(1)
      .should('have.text', '🐛Report a bug')
      .find('a')
      .should('have.attr', 'href', 'mailto:bugs@peoplenotplatforms.com')

    cy.get('.result')
      .eq(2)
      .should('have.text', '🗣Make a general enquiry')
      .find('a')
      .should('have.attr', 'href', 'mailto:support@peoplenotplatforms.com')

    cy.location('pathname').should('eq', '/')
    cy.get('#omnibox input').should('have.value', '/contact')
  })
})

describe("when typing '/' into the omnibox", () => {
  beforeEach(() => {
    cy.get('#omnibox input').type('/')
    cy.get('.result')
  })

  it('should display shortcuts to available commands', () => {
    cy.get('.result').should('have.length', 1)
    cy.get('.result')
      .eq(0)
      .should('have.text', '/contact')
  })

  describe('when clicking an available command', () => {
    it('should type the command into the omnibox for the user', () => {
      cy.get('.result')
        .eq(0)
        .should('have.text', '/contact')
        .click()

      cy.get('#omnibox input').should('have.value', '/contact')
    })
  })

  describe('when selecting a command using the keyboard', () => {
    // TODO: Fix flakey test
    it.skip('should type the command into the omnibox for the user', () => {
      // cy.get('.result').should('have.text', '/contact')
      cy.focused().type('{downarrow}{enter}')

      cy.get('#omnibox input').should('have.value', '/contact')
    })
  })
})
