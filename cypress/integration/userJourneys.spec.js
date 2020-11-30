describe('User journeys', function() {
  beforeEach(function() {
    cy.task('resetDatabase')
    cy.login()
    cy.fixture('people/dan.json').as('dan')
    cy.visit('/')
  })

  describe('Create a new person, search for them, then share them', function() {
    it('Happy path with mouse', function() {
      cy.get('#the-input')
        .type('Da')
        .get('#create-suggested-person')
      cy.get('#create-suggested-person').click()

      cy.get('#the-input').type('niel Metcalfe')
      cy.get('.add-profile').click()
      cy.get('#the-input').type(this.dan.profiles[0])
      cy.get('.add-profile').click()
      cy.get('#the-input').type('https://twitter.com/mrdanmetcalfe')
      cy.get('.add-profile').click()
      cy.get('#the-input').type('https://www.facebook.com/moderatemisbehaviour')
      cy.get('.add-image').click()
      cy.get('#the-input').type(this.dan.image)
      cy.get('.save').click()

      cy.url().should('match', /person\/[\d\w]+/)
      cy.get('.name').should('have.text', 'Daniel Metcalfe')
      cy.get('.profile').should('have.length', 3)

      cy.visit('/')
      cy.get('#the-input').type('Da')
      cy.get('.result')
        .its('length')
        .should('be.greaterThan', 0)

      cy.get('.result')
        .first()
        .click()

      cy.get('#share').click()

      cy.get('#sharing-link  input')
        .eq(0)
        .should('have.attr', 'value')
        .should('match', /person\/[\d\w]+\/view/)
      cy.get('#sharing-link  input')
        .eq(1)
        .should('have.attr', 'value', 'Copied!')
      cy.get('#copy-button').click()
    })

    it.skip('Happy path with keyboard', () => {})
  })
})
