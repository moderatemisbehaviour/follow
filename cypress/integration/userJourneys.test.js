describe('User journeys', function () {
  beforeEach(function () {
    cy.task('resetDb')
    cy.visit('/')
  })

  describe('Create a new person then search for them', function () {
    it('Happy path with mouse', () => {
      cy.get('#the-input').type('Si').get('#create-suggested-person')
      cy.get('#create-suggested-person').click()

      cy.get('#the-input').type('obhan Wilson')
      cy.get('#add-profile').click()
      cy.get('#the-input').type('https://twitter.com/siobhanisback')
      cy.get('#add-profile').click()
      cy.get('#the-input').type('https://www.youtube.com/user/siobhanwilsonmusic')
      cy.get('#add-profile').click()
      cy.get('#the-input').type('https://www.facebook.com/siobhanwilsonmusic')
      cy.get('#add-image').click()
      cy.get('#the-input').type('https://pbs.twimg.com/profile_images/1102783358973677569/qEt61Ej8_400x400.jpg')
      cy.get('#save').click()

      cy.url().should('match', /person\/[\d\w]+/)
      cy.get('.name').should('have.text', 'Siobhan Wilson')
      cy.get('.profile').should('have.length', 3)
      cy.get('.person img')

      cy.visit('/')
      cy.get('#the-input').type('Si')
      cy.get('.SearchResult').should('have.length', 1)
    })

    it.skip('Happy path with keyboard', () => {})
  })
})
