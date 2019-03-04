describe('User journeys', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  describe('Create a new person then search for them', function () {
    it('Happy path with mouse', () => {
      cy.get('#the-input').type('Si').get('.CreatePersonButton')
      cy.get('.CreatePersonButton').click()
      cy.get('#the-input').type('Siobhan Wilson')
      cy.get('.next').click()
      cy.get('#the-input').type('https://twitter.com/siobhanisback')
      cy.get('.next').click()
      cy.get('#the-input').type('https://www.youtube.com/user/siobhanwilsonmusic')
      cy.get('.next').click()
      cy.get('#the-input').type('https://www.facebook.com/siobhanwilsonmusic')
      cy.get('.next').click()
      cy.get('.add-profile-image').click()
      cy.get('#the-input').type('https://pbs.twimg.com/profile_images/950898677991780353/7sbTf7Wl_400x400.jpg')
      cy.get('.save').click()

      cy.url().should('match', /person\/create\/\d+/)
      cy.get('.name').should('have.text', 'Siobhan Wilson')
      cy.get('.profile').should('have.length', 3)

      // Search for them
    })

    it.skip('Happy path with keyboard', () => {})
  })
})
