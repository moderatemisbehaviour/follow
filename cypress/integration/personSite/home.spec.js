describe('When the user is not logged in', () => {
  beforeEach(() => {
    cy.visit('/home')
  })

  it('prompts the user to create an account', () => {
    cy.contains("Once you login we'll show your stuff here 🙂")
  })
})

describe('When the user is logged in', () => {
  beforeEach(() => {
    cy.task('resetDatabase')
    cy.login()
    cy.visit('/home')
  })

  describe('and has never logged in before', () => {
    it.skip('creates a user in the database', () => {
      cy.task('findUser', 'mrdanielmetcalfe@gmail.com').should('exist')
    })
  })

  describe('and has no created profiles', () => {
    it('prompts the user to create a profile for themselves', () => {
      cy.get('.create-profile-prompt').contains(
        'To get started create a profile that you can share with others and embed in your personal site.'
      )
      cy.get('.create-profile-prompt')
        .find('input')
        .click()

      cy.location('pathname').should('eq', '/person/create')
    })
  })

  describe('and has created one profile', () => {
    it('displays that profile')
  })

  describe('and has created three profiles', () => {
    it('displays a list of the three profiles')
  })

  describe.skip('and has no starred profiles', () => {
    it('suggests some cool people the user could star')
  })
})
