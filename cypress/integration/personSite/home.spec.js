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
    cy.login().as('user')
    cy.visit('/home')
  })

  context('and has never logged in before', () => {
    it('creates a user in the database', () => {
      cy.task('findUser', 'mrdanielmetcalfe@gmail.com').should('exist')
    })
  })

  it('prompts the user to create a profile for themselves', function() {
    cy.get('.create-profile-prompt').contains(
      'To get started create a profile that you can share with others and embed in your personal site.'
    )
    cy.get('.create-profile-prompt')
      .find('input')
      .click()

    cy.location('pathname').should('eq', '/person/create')

    cy.get('.name').should('have.text', this.user.name)
    cy.get('.image').should(
      'have.css',
      'background-image',
      `url("${this.user.image}")`
    )
    cy.get('.profile-0 a').should(
      'have.attr',
      'href',
      `mailto:${this.user.email}`
    )

    cy.get('.save').click()
    cy.get('#edit-person')

    cy.get('#user-home a').click({ force: true })

    cy.get('.created-profiles')
      .find('li')
      .should('have.length', 1)
  })

  describe.skip('and has no starred profiles', () => {
    it('suggests some cool people the user could star')
  })
})
