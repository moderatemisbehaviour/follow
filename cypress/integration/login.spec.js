beforeEach(() => cy.clearCookies())

describe('When there is no session for the user', () => {
  // TODO: Figure out how to test this without actual token and Google OAuth API.
  it.skip('creates a session for the user and tells the browser to set it as a cookie', () => {
    cy.request('POST', '/login', { idToken: 'validToken' })
      .its('headers.set-cookie')
      .should('match', /connect.sid=.*/)
    // TODO: Check session is created in database.
    cy.getCookies().should('have.length', 1)
  })

  it('returns a 400 if no ID token is provided', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: '/login'
    })
      .its('status')
      .should('eq', 400)
  })

  // TODO: Figure out how to test this without actual token and Google OAuth API.
  it.skip('returns a 401 if ID token is invalid', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      url: '/login',
      body: {
        idToken: 'invalidToken'
      }
    })
      .its('status')
      .should('eq', 401)
  })
})

describe('When there is a session for the user', () => {
  beforeEach(() => {
    cy.task('resetDatabase')
    cy.login()
    cy.fixture('users/dan.json').as('dan')
    cy.visit('/')
  })

  it('replaces the home icon with the user image that acts as a link to the home page', function() {
    cy.get('#user-home')
      .find('.image')
      .should('have.css', 'background-image', `url("${this.dan.image}")`)
    cy.get('#user-home')
      .find('.image')
      .click()
    cy.location('pathname').should('eq', '/home')
  })

  // TODO: Figure out how to test this without actual token and Google OAuth API.
  it.skip('refreshes the expiration of the session and tells the browser', () => {})

  it('displays a sign out button underneath the user image', function() {
    cy.get('#signout')
      .should('have.text', 'Sign out')
      .click()
    cy.get('#user-home').should('not.exist')
    cy.get('#home').should('exist')
    cy.getCookie('isLoggedIn').should('be.null')
    cy.getCookie('connect.sid').should('be.null')
  })
})
