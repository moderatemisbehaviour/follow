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
  it.skip('refreshes the expiration of the session and tells the browser', () => {})
})
