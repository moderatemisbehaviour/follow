describe('User journeys', function() {
  beforeEach(function() {
    cy.task('resetDatabase')
    cy.fixture('siobhan.json').as('siobhan')
    cy.visit('/')
  })

  describe('Create a new person, search for them, then share them', function() {
    it('Happy path with mouse', function() {
      cy.get('#the-input')
        .type('Si')
        .get('#create-suggested-person')
      cy.get('#create-suggested-person').click()

      cy.get('#the-input').type('obhan Wilson')
      cy.get('.add-profile').click()
      cy.get('#the-input').type(this.siobhan.profiles[0])
      cy.get('.add-profile').click()
      cy.get('#the-input').type(
        'https://www.youtube.com/user/siobhanwilsonmusic'
      )
      cy.get('.add-profile').click()
      cy.get('#the-input').type('https://www.facebook.com/siobhanwilsonmusic')
      cy.get('.add-image').click()
      cy.get('#the-input').type(this.siobhan.image)
      cy.get('.save').click()

      cy.url().should('match', /person\/[\d\w]+/)
      cy.get('.name').should('have.text', 'Siobhan Wilson')
      cy.get('.profile').should('have.length', 3)

      cy.visit('/')
      cy.get('#the-input').type('Si')
      cy.get('.result')
        .its('length')
        .should('be.greaterThan', 0)

      cy.get('.result')
        .first()
        .click()

      cy.get('#share').click()

      cy.get('#sharing-link input')
        .should('have.attr', 'value')
        .should('match', /person\/[\d\w]+\/view/)
      cy.get('#copy-button').click()

      cy.get('#sharing-link input').should('have.attr', 'value', 'Copied!')
    })

    it.skip('Happy path with keyboard', () => {})
  })
})
